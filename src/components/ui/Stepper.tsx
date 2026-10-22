"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: readonly StepperStep[];
  currentIndex: number;
  /** IDs of steps that are complete (shown with a checkmark + "completed" text). */
  completed?: ReadonlySet<string>;
  onStepSelect?: (index: number) => void;
  label?: string;
  className?: string;
}

/**
 * Clickable step navigation. Step changes are announced via a polite live region.
 * Horizontal scroll on narrow screens; the current step is marked with aria-current.
 */
export function Stepper({
  steps,
  currentIndex,
  completed,
  onStepSelect,
  label = "Progress",
  className,
}: StepperProps) {
  const current = steps[currentIndex];
  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      <ol className="flex snap-x gap-1 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isDone = completed?.has(step.id) ?? false;
          return (
            <li key={step.id} className="snap-start">
              <button
                type="button"
                onClick={() => onStepSelect?.(index)}
                disabled={!onStepSelect}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  isCurrent
                    ? "bg-primary text-on-primary"
                    : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-6 place-items-center rounded-full border-2 text-xs tabular-nums",
                    isCurrent
                      ? "border-on-primary"
                      : isDone
                        ? "border-success bg-success text-surface-raised"
                        : "border-border-strong",
                  )}
                >
                  {isDone && !isCurrent ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </span>
                {step.label}
                {isDone ? <span className="sr-only"> (completed)</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
      <p aria-live="polite" className="sr-only">
        {current ? `Step ${currentIndex + 1} of ${steps.length}: ${current.label}` : ""}
      </p>
    </nav>
  );
}
