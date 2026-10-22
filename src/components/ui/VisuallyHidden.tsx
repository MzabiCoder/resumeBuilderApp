import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>;

/** Content for assistive tech only. Server-safe (no Radix client code needed). */
export function VisuallyHidden({ className, ...rest }: VisuallyHiddenProps) {
  return <span className={cn("sr-only", className)} {...rest} />;
}
