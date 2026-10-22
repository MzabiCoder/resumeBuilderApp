"use client";

import type { Ref, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";
import { useFieldContext } from "./Field";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  placeholder?: string;
  ref?: Ref<HTMLSelectElement>;
}

/**
 * Styled *native* select: best screen-reader/mobile support and zero extra JS.
 * Use DropdownMenu for action menus, not for form values.
 */
export function Select({ options, placeholder, className, id, required, ...rest }: SelectProps) {
  const field = useFieldContext();
  return (
    <div className="relative">
      <select
        id={id ?? field?.id}
        required={required ?? field?.required}
        aria-describedby={rest["aria-describedby"] ?? field?.describedBy}
        aria-invalid={rest["aria-invalid"] ?? (field?.invalid || undefined)}
        className={cn(controlStyles, "min-h-11 appearance-none pr-10", className)}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}
