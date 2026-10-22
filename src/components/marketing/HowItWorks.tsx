import type { FeatureItem, SectionHeader } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { howToJsonLd } from "@/lib/seo/structured-data";
import { FeatureIcon } from "./FeatureIcon";

export interface HowItWorksProps extends SectionHeader {
  steps: readonly FeatureItem[];
  /** ISO-8601 duration for HowTo structured data, e.g. "PT15M". */
  totalTime?: string;
}

/** #how-it-works — numbered steps + HowTo JSON-LD from the same content. */
export function HowItWorks({ eyebrow, title, intro, steps, totalTime }: HowItWorksProps) {
  return (
    <Section id="how-it-works" eyebrow={eyebrow} title={title} intro={intro} tone="raised">
      <JsonLd data={howToJsonLd({ name: title, totalTime, steps })} />
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex flex-col gap-4 rounded-xl border border-border bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <FeatureIcon icon={step.icon} />
              <span
                aria-hidden="true"
                className="font-display text-6xl leading-none font-semibold text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-display-sm font-semibold">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
