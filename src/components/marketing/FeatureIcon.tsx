import type { IconKey } from "@/content/schema";
import { cn } from "@/lib/cn";
import { iconMap } from "./icon-map";

export interface FeatureIconProps {
  icon: IconKey;
  tone?: "primary" | "accent" | "inverse";
  className?: string;
}

const tones = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent-strong",
  inverse: "bg-ink-inverse/10 text-accent",
} as const;

/** Decorative icon tile. */
export function FeatureIcon({ icon, tone = "primary", className }: FeatureIconProps) {
  const Glyph = iconMap[icon];
  return (
    <span aria-hidden="true" className={cn("grid size-12 shrink-0 place-items-center rounded-lg", tones[tone], className)}>
      <Glyph className="size-6" strokeWidth={1.8} />
    </span>
  );
}
