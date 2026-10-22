"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import type { NavGroup } from "@/config/navigation";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

export interface MobileNavSheetProps {
  groups: readonly NavGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after close so the caller can restore focus to its trigger. */
  onClosed: () => void;
  children?: ReactNode;
}

/** Sheet dialog content for MobileNav. Focus is trapped while open (Radix). */
export function MobileNavSheet({
  groups,
  open,
  onOpenChange,
  onClosed,
  children,
}: MobileNavSheetProps) {
  const close = () => onOpenChange(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="Menu"
        layout="sheet"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          onClosed();
        }}
      >
        <nav aria-label="Main">
          {groups.map((group) => (
            <section
              key={group.label}
              className="border-b border-border py-4"
              aria-labelledby={`m-${group.label}`}
            >
              <h2
                id={`m-${group.label}`}
                className="mb-2 font-sans text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase"
              >
                {group.label}
              </h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NextLink
                      href={link.href}
                      onClick={close}
                      className="flex min-h-12 items-center rounded-md px-2 text-lg font-semibold text-ink hover:bg-surface-sunken"
                    >
                      {link.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
        {/* Close the sheet when any account link is followed (event delegation, not an interactive div). */}
        <div
          className="flex flex-col gap-3 pt-2"
          onClickCapture={(e) => {
            if ((e.target as HTMLElement).closest("a")) close();
          }}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
