import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ErrorStateProps {
  title?: string;
  message?: ReactNode;
  /** Recovery actions (retry button, links). */
  actions?: ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

/** Friendly, announced error panel used by error boundaries across the app. */
export function ErrorState({
  title = "Something went wrong",
  message = "Don’t worry — nothing you typed has been lost. Please try again.",
  actions,
  className,
  headingLevel: Heading = "h2",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-start gap-4 rounded-lg border-2 border-danger/40 bg-danger-soft p-6",
        className,
      )}
    >
      <AlertTriangle aria-hidden="true" className="size-7 text-danger" />
      <Heading className="text-display-sm font-semibold">{title}</Heading>
      <div className="text-ink">{message}</div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
