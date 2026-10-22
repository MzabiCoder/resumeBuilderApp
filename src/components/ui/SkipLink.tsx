import { cn } from "@/lib/cn";

export interface SkipLinkProps {
  /** ID of the target element, without `#`. */
  targetId?: string;
  label?: string;
  className?: string;
}

/** First focusable element on every page; visible only when focused. */
export function SkipLink({
  targetId = "main",
  label = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-ink-inverse shadow-lg",
        "transition-transform duration-(--duration-base) focus-visible:translate-y-0",
        className,
      )}
    >
      {label}
    </a>
  );
}
