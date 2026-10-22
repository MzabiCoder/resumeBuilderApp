import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StarRatingProps {
  /** 0–max, whole stars. */
  value: number;
  max?: number;
  className?: string;
}

/** Read-only rating, exposed to assistive tech as a single labelled image. */
export function StarRating({ value, max = 5, className }: StarRatingProps) {
  const rating = Math.min(max, Math.max(0, Math.round(value)));
  return (
    <span
      role="img"
      aria-label={`${rating} out of ${max} stars`}
      className={cn("inline-flex gap-0.5 text-accent", className)}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="size-4"
          fill={i < rating ? "currentColor" : "none"}
          strokeWidth={i < rating ? 0 : 1.5}
        />
      ))}
    </span>
  );
}
