"use client";

import type { ComponentProps } from "react";
import { DropdownMenu as M } from "radix-ui";
import { cn } from "@/lib/cn";

export const DropdownMenu = M.Root;
export const DropdownMenuTrigger = M.Trigger;
export const DropdownMenuGroup = M.Group;

export type DropdownMenuContentProps = ComponentProps<typeof M.Content>;

export function DropdownMenuContent({
  className,
  sideOffset = 8,
  align = "end",
  ...rest
}: DropdownMenuContentProps) {
  return (
    <M.Portal>
      <M.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 min-w-52 rounded-lg border border-border bg-surface-raised p-1.5 text-ink shadow-lg",
          className,
        )}
        {...rest}
      />
    </M.Portal>
  );
}

export type DropdownMenuItemProps = ComponentProps<typeof M.Item> & { tone?: "default" | "danger" };

export function DropdownMenuItem({ className, tone = "default", ...rest }: DropdownMenuItemProps) {
  return (
    <M.Item
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 text-sm font-medium outline-none select-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-sunken [&_svg]:size-4",
        tone === "danger" && "text-danger",
        className,
      )}
      {...rest}
    />
  );
}

export function DropdownMenuLabel({ className, ...rest }: ComponentProps<typeof M.Label>) {
  return (
    <M.Label
      className={cn("px-3 py-2 text-xs font-semibold text-ink-muted", className)}
      {...rest}
    />
  );
}

export function DropdownMenuSeparator({ className, ...rest }: ComponentProps<typeof M.Separator>) {
  return <M.Separator className={cn("my-1 h-px bg-border", className)} {...rest} />;
}
