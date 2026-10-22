import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "li" | "section";
  /** Adds hover lift. Use with a stretched link inside (`after:absolute after:inset-0`). */
  interactive?: boolean;
}

export function Card({ as: Tag = "div", interactive = false, className, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-lg border border-border bg-surface-raised p-6 shadow-sm",
        interactive &&
          "transition-[box-shadow,transform] duration-(--duration-base) ease-out focus-within:shadow-md hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
      {...rest}
    />
  );
}
