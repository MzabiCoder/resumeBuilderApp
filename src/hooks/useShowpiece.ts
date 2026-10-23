"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

export type Cleanup = () => void;
export interface ShowpieceModule {
  init: (root: HTMLElement) => Cleanup | Promise<Cleanup>;
}

export interface UseShowpieceOptions {
  /** How far before the viewport to start loading (IntersectionObserver rootMargin). */
  rootMargin?: string;
  /**
   * "idle": wait for the window `load` event + an idle period before observing.
   * Use for above-the-fold showpieces so their chunk never competes with the
   * first render (LCP).
   */
  defer?: "idle";
}

/** Resolves after `load` and the next idle period (max ~1.5 s wait for idle). */
function whenIdleAfterLoad(signal: { cancelled: boolean }, run: () => void): () => void {
  let idleHandle: number | undefined;
  // Non-narrowed reference: `"requestIdleCallback" in window` narrows `window` to never.
  const w: Window = window;
  const schedule = () => {
    if (signal.cancelled) return;
    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(run, { timeout: 1500 });
    } else {
      idleHandle = w.setTimeout(run, 200);
    }
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleHandle === undefined) return;
    if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
    else w.clearTimeout(idleHandle);
  };
}

/**
 * Lazily attaches a motion module to the server-rendered section `#targetId`:
 *  - skipped entirely under prefers-reduced-motion (static, complete content remains)
 *  - the module chunk is only fetched when the section nears the viewport
 *    (optionally only after load + idle, see `defer`)
 *  - any load/init failure is reported and swallowed: content is never affected
 *  - cleanup (timelines, ScrollTriggers, listeners) runs on unmount
 */
export function useShowpiece(
  targetId: string,
  load: () => Promise<ShowpieceModule>,
  { rootMargin = "200px", defer }: UseShowpieceOptions = {},
): void {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: Cleanup | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        load()
          .then((mod) => mod.init(root))
          .then((fn) => {
            if (disposed) fn();
            else cleanup = fn;
          })
          .catch((error: unknown) => {
            root.dataset.motion = "failed";
            reportError(error);
          });
      },
      { rootMargin },
    );
    const signal = { cancelled: false };
    const cancelDefer =
      defer === "idle"
        ? whenIdleAfterLoad(signal, () => observer.observe(root))
        : (observer.observe(root), undefined);

    return () => {
      disposed = true;
      signal.cancelled = true;
      cancelDefer?.();
      observer.disconnect();
      try {
        cleanup?.();
      } catch (error) {
        reportError(error);
      }
    };
  }, [targetId, load, rootMargin, defer]);
}
