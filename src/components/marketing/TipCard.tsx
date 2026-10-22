import NextLink from "next/link";
import type { Tip } from "@/content/schema";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "./FeatureIcon";

export interface TipCardProps {
  tip: Tip;
  readMoreLabel?: string;
}

export function TipCard({ tip, readMoreLabel = "Read the guide" }: TipCardProps) {
  return (
    <Card as="li" interactive className="flex flex-col gap-4">
      <FeatureIcon icon={tip.icon} tone="accent" />
      <h3 className="font-sans text-lg font-semibold">
        <NextLink href={tip.href} className="after:absolute after:inset-0 after:rounded-lg">
          {tip.title}
        </NextLink>
      </h3>
      <p className="text-ink-muted">{tip.body}</p>
      <p aria-hidden="true" className="mt-auto text-sm font-semibold text-primary">
        {readMoreLabel} →
      </p>
    </Card>
  );
}
