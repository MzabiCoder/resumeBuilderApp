import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useShowpiece, type ShowpieceModule } from "./useShowpiece";

let trigger: (() => void) | undefined;
class IO {
  constructor(private cb: IntersectionObserverCallback) {
    trigger = () =>
      this.cb(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
  }
  observe() {}
  disconnect() {}
}

function Probe({ load }: { load: () => Promise<ShowpieceModule> }) {
  useShowpiece("target", load);
  return <section id="target">Content</section>;
}

afterEach(() => {
  vi.unstubAllGlobals();
  trigger = undefined;
});

function DeferredProbe({ load }: { load: () => Promise<ShowpieceModule> }) {
  useShowpiece("target", load, { defer: "idle" });
  return <section id="target">Content</section>;
}

describe("useShowpiece", () => {
  it('with defer: "idle", observes only after load + idle and cancels on unmount', async () => {
    const observe = vi.fn();
    class DeferIO extends IO {
      override observe = observe;
    }
    vi.stubGlobal("IntersectionObserver", DeferIO);
    let idle: IdleRequestCallback | undefined;
    const cancel = vi.fn();
    vi.stubGlobal("requestIdleCallback", (cb: IdleRequestCallback) => ((idle = cb), 7));
    vi.stubGlobal("cancelIdleCallback", cancel);
    const load = vi.fn(async () => ({ init: () => () => {} }));

    const { unmount } = render(<DeferredProbe load={load} />);
    expect(observe).not.toHaveBeenCalled();
    idle?.({ didTimeout: false, timeRemaining: () => 10 });
    expect(observe).toHaveBeenCalledOnce();
    trigger?.();
    await waitFor(() => expect(load).toHaveBeenCalledOnce());
    unmount();
    expect(cancel).toHaveBeenCalledWith(7);
  });

  it("loads only when the section nears the viewport and cleans up on unmount", async () => {
    vi.stubGlobal("IntersectionObserver", IO);
    const cleanup = vi.fn();
    const load = vi.fn(async () => ({ init: () => cleanup }));
    const { unmount } = render(<Probe load={load} />);
    expect(load).not.toHaveBeenCalled();
    trigger?.();
    await waitFor(() => expect(load).toHaveBeenCalledOnce());
    await Promise.resolve();
    unmount();
    await waitFor(() => expect(cleanup).toHaveBeenCalledOnce());
  });

  it("never loads motion under prefers-reduced-motion", () => {
    vi.stubGlobal("IntersectionObserver", IO);
    vi.spyOn(window, "matchMedia").mockReturnValueOnce({ matches: true } as MediaQueryList);
    const load = vi.fn();
    render(<Probe load={load} />);
    expect(trigger).toBeUndefined();
    expect(load).not.toHaveBeenCalled();
  });

  it("keeps content intact when the motion chunk fails to load", async () => {
    vi.stubGlobal("IntersectionObserver", IO);
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<Probe load={() => Promise.reject(new Error("chunk failed"))} />);
    trigger?.();
    await waitFor(() =>
      expect(container.querySelector<HTMLElement>("#target")!.dataset.motion).toBe("failed"),
    );
    expect(container).toHaveTextContent("Content");
  });
});
