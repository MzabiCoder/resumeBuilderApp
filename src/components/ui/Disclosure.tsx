import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  /** Items sharing a `group` name behave as an exclusive accordion (native `name`). */
  group?: string;
  id?: string;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Native <details>/<summary>: keyboard + screen-reader support built in, zero JS,
 * and the answer text is always in the server HTML (good for SEO / FAQPage).
 * Use `ui/Accordion` (Radix) only when you need controlled state.
 */
export function Disclosure({
  summary,
  children,
  group,
  id,
  defaultOpen,
  className,
}: DisclosureProps) {
  return (
    <details
      id={id}
      name={group}
      open={defaultOpen}
      className={cn("group border-b border-border", className)}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink hover:text-primary [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform duration-(--duration-base) group-open:rotate-180"
        />
      </summary>
      <div className="flex max-w-prose flex-col gap-3 pb-6 leading-relaxed text-ink-muted">
        {children}
      </div>
    </details>
  );
}
