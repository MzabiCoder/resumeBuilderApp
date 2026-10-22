"use client";

import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "./control-styles";
import { useFieldContext } from "./Field";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, id, required, rows = 4, ...rest }: TextareaProps) {
  const field = useFieldContext();
  return (
    <textarea
      id={id ?? field?.id}
      rows={rows}
      required={required ?? field?.required}
      aria-describedby={rest["aria-describedby"] ?? field?.describedBy}
      aria-invalid={rest["aria-invalid"] ?? (field?.invalid || undefined)}
      className={cn(
        controlStyles,
        "field-sizing-content min-h-24 py-2.5 leading-relaxed",
        className,
      )}
      {...rest}
    />
  );
}
