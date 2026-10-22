import { cn } from "@/lib/cn";

export interface ProgressBarProps {
  /** 0–100. Values outside the range are clamped. */
  value: number;
  /** Accessible + visible label, e.g. "Step 3 of 8 — Experience". */
  label: string;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
  className?: string;
}

const fills = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
} as const;

export function ProgressBar({
  value,
  label,
  showValue = true,
  tone = "primary",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium text-ink">{label}</span>
        {showValue ? (
          <span aria-hidden="true" className="font-semibold text-ink tabular-nums">
            {clamped}%
          </span>
        ) : null}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-valuetext={`${clamped}% complete`}
        className="h-2.5 w-full overflow-hidden rounded-full bg-surface-sunken"
      >
        <div
          className={cn(
            "h-full origin-left rounded-full transition-transform duration-(--duration-slow) ease-out",
            fills[tone],
          )}
          style={{ transform: `scaleX(${clamped / 100})` }}
        />
      </div>
    </div>
  );
}
