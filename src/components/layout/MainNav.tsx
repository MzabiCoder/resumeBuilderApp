"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavGroup } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { NavDropdown } from "./NavDropdown";

export interface MainNavProps {
  groups: readonly NavGroup[];
  className?: string;
}

/**
 * Desktop primary navigation — WAI-ARIA "disclosure navigation" pattern.
 * Deliberately not a Radix NavigationMenu: this keeps ~25 KB gz off the
 * initial load (LCP budget). Links are always in the HTML (hidden when
 * closed) so they stay crawlable.
 *
 * Click-to-open only (no hover-open): avoids accidental opens and the
 * hover/click toggle conflict; matches the WAI disclosure guidance.
 *
 * Keyboard: Enter/Space toggles, ArrowDown opens + focuses first link,
 * ArrowUp/Down/Home/End move within a panel, Esc closes and restores focus,
 * moving focus out of the nav closes it.
 */
export function MainNav({ groups, className }: MainNavProps) {
  const [open, setOpen] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (open === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const panelLinks = (i: number) =>
    Array.from(
      navRef.current?.querySelectorAll<HTMLAnchorElement>(`#${CSS.escape(`${baseId}-${i}`)} a`) ??
        [],
    );
  const trigger = (i: number) =>
    navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="${baseId}-${i}"]`);

  const onKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key === "Escape" && open !== null) {
      e.preventDefault();
      const i = open;
      setOpen(null);
      trigger(i)?.focus();
      return;
    }
    const target = e.target as HTMLElement;
    const triggerIndex = target.dataset.navTrigger;
    if (triggerIndex !== undefined && e.key === "ArrowDown") {
      e.preventDefault();
      const i = Number(triggerIndex);
      setOpen(i);
      // Panel becomes visible on the next frame.
      requestAnimationFrame(() => panelLinks(i)[0]?.focus());
      return;
    }
    if (open === null || target.tagName !== "A") return;
    const links = panelLinks(open);
    const idx = links.indexOf(target as HTMLAnchorElement);
    if (idx === -1) return;
    const next =
      e.key === "ArrowDown"
        ? links[(idx + 1) % links.length]
        : e.key === "ArrowUp"
          ? links[(idx - 1 + links.length) % links.length]
          : e.key === "Home"
            ? links[0]
            : e.key === "End"
              ? links[links.length - 1]
              : undefined;
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };

  // Native listeners: keyboard + focus-out handling delegated from the landmark.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onFocusOut = (e: FocusEvent) => {
      if (!nav.contains(e.relatedTarget as Node | null)) setOpen(null);
    };
    nav.addEventListener("keydown", onKeyDown);
    nav.addEventListener("focusout", onFocusOut);
    return () => {
      nav.removeEventListener("keydown", onKeyDown);
      nav.removeEventListener("focusout", onFocusOut);
    };
  });

  return (
    <nav ref={navRef} aria-label="Main" className={cn("relative", className)}>
      <ul className="flex items-center gap-1">
        {groups.map((group, i) => {
          const panelId = `${baseId}-${i}`;
          const isOpen = open === i;
          return (
            <li key={group.label} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-nav-trigger={i}
                data-state={isOpen ? "open" : "closed"}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-semibold text-ink",
                  "hover:bg-surface-sunken data-[state=open]:bg-surface-sunken",
                )}
              >
                {group.label}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-(--duration-base) group-data-[state=open]:rotate-180"
                />
              </button>
              <div id={panelId} hidden={!isOpen} className="absolute top-full left-0 z-50 pt-2">
                <div className="rounded-xl border border-border bg-surface-raised shadow-lg">
                  <NavDropdown links={group.links} onNavigate={() => setOpen(null)} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
