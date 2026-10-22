import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/** Decorative loading placeholder. Pair with a live "Loading…" message elsewhere. */
export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-surface-sunken motion-reduce:animate-none",
        className,
      )}
      {...rest}
    />
  );
}
