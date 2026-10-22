import type { SectionHeader, Tip } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { TipCard } from "./TipCard";

export interface TipsGridProps extends SectionHeader {
  tips: readonly Tip[];
}

/** #tips */
export function TipsGrid({ eyebrow, title, intro, tips }: TipsGridProps) {
  return (
    <Section id="tips" eyebrow={eyebrow} title={title} intro={intro} tone="raised">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t) => (
          <TipCard key={t.href} tip={t} />
        ))}
      </ul>
    </Section>
  );
}
