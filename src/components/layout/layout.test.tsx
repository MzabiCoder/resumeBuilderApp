import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { HeaderScrollBehavior } from "./HeaderScrollBehavior";
import { MobileNav } from "./MobileNav";
import { SignedOutActions } from "./SignedOutActions";
import { SocialLinks } from "./SocialLinks";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch: _p,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("MobileNav", () => {
  it("opens a dialog with all nav groups and returns focus on close", async () => {
    render(
      <MobileNav groups={mainNav}>
        <SignedOutActions layout="stacked" />
      </MobileNav>,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    for (const link of mainNav.flatMap((g) => g.links)) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
    expect(screen.getByRole("link", { name: "Get Started" })).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

describe("SocialLinks", () => {
  it("gives every icon link an accessible name", () => {
    render(<SocialLinks />);
    for (const network of ["X", "Facebook", "Instagram", "YouTube"]) {
      expect(
        screen.getByRole("link", { name: new RegExp(`${siteConfig.name} on ${network}`) }),
      ).toBeInTheDocument();
    }
  });
});

describe("HeaderScrollBehavior", () => {
  it("toggles data-scrolled on the target and cleans up on unmount", () => {
    const header = document.createElement("header");
    header.id = "h";
    document.body.append(header);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<HeaderScrollBehavior targetId="h" />);
    expect(header.dataset.scrolled).toBe("false");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 200, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.dataset.scrolled).toBe("true");
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    header.remove();
  });

  it("does nothing if the target is missing", () => {
    expect(() => render(<HeaderScrollBehavior targetId="missing" />)).not.toThrow();
  });
});
