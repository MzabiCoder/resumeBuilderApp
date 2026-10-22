"use client";

import type { ComponentProps, ReactNode } from "react";
import { Dialog as D } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

export interface DialogContentProps extends Omit<ComponentProps<typeof D.Content>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** `center` modal or `sheet` sliding in from the right (mobile nav, panels). */
  layout?: "center" | "sheet";
  hideTitle?: boolean;
  closeLabel?: string;
}

/** Focus is trapped while open and returned to the trigger on close (Radix). */
export function DialogContent({
  title,
  description,
  layout = "center",
  hideTitle = false,
  closeLabel = "Close",
  className,
  children,
  ...rest
}: DialogContentProps) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[2px] motion-reduce:backdrop-blur-none" />
      <D.Content
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-surface-raised text-ink shadow-lg focus-visible:outline-none",
          layout === "center"
            ? "top-1/2 left-1/2 max-h-[90dvh] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl p-6"
            : "inset-y-0 right-0 w-[min(24rem,100vw)] overflow-y-auto p-5",
          className,
        )}
        {...(description ? {} : { "aria-describedby": undefined })}
        {...rest}
      >
        <div className="flex items-start justify-between gap-4">
          <D.Title
            className={cn("font-display text-display-sm font-semibold", hideTitle && "sr-only")}
          >
            {title}
          </D.Title>
          <D.Close
            className="-m-2 ml-auto grid size-11 place-items-center rounded-full text-ink-muted hover:bg-surface-sunken hover:text-ink"
            aria-label={closeLabel}
          >
            <X aria-hidden="true" className="size-5" />
          </D.Close>
        </div>
        {description ? (
          <D.Description className="text-ink-muted">{description}</D.Description>
        ) : null}
        {children}
      </D.Content>
    </D.Portal>
  );
}
