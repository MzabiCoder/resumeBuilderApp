"use client";

import type { ReactNode } from "react";
import { Tooltip as T } from "radix-ui";

export interface TooltipProps {
  /** Supplementary text only — never the sole accessible name of a control. */
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

/** Hover/focus tooltip; dismissible with Esc and hoverable (WCAG 1.4.13). */
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  return (
    <T.Provider delayDuration={300}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content
            side={side}
            sideOffset={6}
            className="z-50 max-w-64 rounded-md bg-surface-inverse px-3 py-2 text-sm text-ink-inverse shadow-md"
          >
            {content}
            <T.Arrow className="fill-surface-inverse" />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}
