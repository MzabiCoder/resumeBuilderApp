"use client";

import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";
import { useFieldContext } from "./Field";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

/** Text input. Inside a `<Field>`, id / aria-describedby / aria-invalid / required are wired automatically. */
export function Input({ className, id, required, ...rest }: InputProps) {
  const field = useFieldContext();
  return (
    <input
      id={id ?? field?.id}
      required={required ?? field?.required}
      aria-describedby={rest["aria-describedby"] ?? field?.describedBy}
      aria-invalid={rest["aria-invalid"] ?? (field?.invalid || undefined)}
      className={cn(controlStyles, "min-h-11", className)}
      {...rest}
    />
  );
}
