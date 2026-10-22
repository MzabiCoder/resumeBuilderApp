"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TemplateFilterProps {
  /** ID of the list whose `[data-tags]` children are filtered. */
  listId: string;
  filters: ReadonlyArray<{ value: string; label: string }>;
  groupLabel?: string;
  /** e.g. (n) => `Showing ${n} templates` */
  resultLabel?: (count: number) => string;
}

/**
 * Behaviour + chip UI only: toggles `hidden` on items rendered by the server.
 * Without JS every template stays visible.
 */
export function TemplateFilter({
  listId,
  filters,
  groupLabel = "Filter templates by style",
  resultLabel = (n) => `Showing ${n} template${n === 1 ? "" : "s"}`,
}: TemplateFilterProps) {
  const [active, setActive] = useState(filters[0]?.value ?? "all");
  const [message, setMessage] = useState("");

  function apply(value: string) {
    setActive(value);
    const items =
      document.getElementById(listId)?.querySelectorAll<HTMLElement>("[data-tags]") ?? [];
    let shown = 0;
    items.forEach((item) => {
      const match = value === "all" || (item.dataset.tags ?? "").split(" ").includes(value);
      item.hidden = !match;
      if (match) shown++;
    });
    setMessage(resultLabel(shown));
  }

  return (
    <div className="flex flex-col gap-2">
      <div role="group" aria-label={groupLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const pressed = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={pressed}
              aria-controls={listId}
              onClick={() => apply(f.value)}
              className={cn(
                "min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition-colors",
                pressed
                  ? "border-ink bg-ink text-ink-inverse"
                  : "border-border-strong text-ink hover:border-ink",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </div>
  );
}
