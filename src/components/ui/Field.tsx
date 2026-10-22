"use client";

import { createContext, useContext, useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldContextValue {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Read by Input/Textarea/Select so labelling and error wiring is automatic. */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  /** Error message; presence marks the control invalid and announces it. */
  error?: ReactNode;
  required?: boolean;
  /** Override the generated control id. */
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Visible label + hint + error for a single control (WCAG 1.3.1, 3.3.1, 3.3.2).
 * Required fields are marked in text, not just colour.
 */
export function Field({
  label,
  hint,
  error,
  required = false,
  id,
  className,
  children,
}: FieldProps) {
  const generated = useId();
  const controlId = id ?? `field-${generated}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldContext.Provider
      value={{ id: controlId, describedBy, invalid: Boolean(error), required }}
    >
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={controlId} className="text-sm font-semibold text-ink">
          {label}
          {required ? <span className="ml-1 font-normal text-ink-muted">(required)</span> : null}
        </label>
        {hint ? (
          <p id={hintId} className="text-sm text-ink-muted">
            {hint}
          </p>
        ) : null}
        {children}
        {error ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-danger">
            <span aria-hidden="true">⚠ </span>
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
