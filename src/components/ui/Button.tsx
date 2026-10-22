import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "radix-ui";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./button-variants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  /** Render the single child element with button styles (e.g. a link). */
  asChild?: boolean;
  /** Shows a spinner, sets aria-busy and blocks clicks while keeping the label readable. */
  loading?: boolean;
  /** Optional leading icon (decorative). */
  icon?: ReactNode;
}

export function Button({
  asChild = false,
  loading = false,
  icon,
  variant,
  size,
  className,
  children,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot.Root className={classes} {...rest}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 aria-hidden="true" className="animate-spin" />
      ) : icon ? (
        <span aria-hidden="true" className="contents">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
}
