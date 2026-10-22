import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "prose" | "default" | "wide";
}

const sizes = {
  prose: "max-w-3xl",
  default: "max-w-(--container-max)",
  wide: "max-w-[90rem]",
} as const;

/** Horizontally centred, padded content column. */
export function Container({ size = "default", className, ...rest }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)} {...rest} />;
}
