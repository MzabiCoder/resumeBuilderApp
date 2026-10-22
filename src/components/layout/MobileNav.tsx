"use client";

import { useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import type { NavGroup } from "@/config/navigation";

// The Radix dialog code is only fetched the first time the menu is opened.
const MobileNavSheet = dynamic(() => import("./MobileNavSheet").then((m) => m.MobileNavSheet), {
  ssr: false,
});

export interface MobileNavProps {
  groups: readonly NavGroup[];
  /** Account actions (signed in/out), rendered on the server and slotted in. */
  children?: ReactNode;
  openLabel?: string;
}

/** Menu button for small screens; focus returns to it when the sheet closes. */
export function MobileNav({ groups, children, openLabel = "Open menu" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => setLoaded(true)}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-sunken"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>
      {loaded ? (
        <MobileNavSheet
          groups={groups}
          open={open}
          onOpenChange={setOpen}
          onClosed={() => triggerRef.current?.focus()}
        >
          {children}
        </MobileNavSheet>
      ) : null}
    </>
  );
}
