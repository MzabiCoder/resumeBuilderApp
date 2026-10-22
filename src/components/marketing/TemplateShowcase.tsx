import { ArrowRight } from "lucide-react";
import type { SectionHeader, TemplateMeta } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Link";
import { TemplateCard } from "./TemplateCard";
import { TemplateFilter } from "./TemplateFilter";

export interface TemplateShowcaseProps extends SectionHeader {
  templates: readonly TemplateMeta[];
  filters: ReadonlyArray<{ value: string; label: string }>;
  hrefFor: (id: string) => string;
  galleryCta?: { label: string; href: string };
}

const LIST_ID = "template-showcase-list";

/** #templates — horizontally scrollable on mobile, grid on desktop, filterable by style. */
export function TemplateShowcase({
  eyebrow,
  title,
  intro,
  templates,
  filters,
  hrefFor,
  galleryCta,
}: TemplateShowcaseProps) {
  const tagLabels = Object.fromEntries(filters.map((f) => [f.value, f.label]));
  return (
    <Section id="templates" eyebrow={eyebrow} title={title} intro={intro}>
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <TemplateFilter listId={LIST_ID} filters={filters} />
        {galleryCta ? (
          <ButtonLink href={galleryCta.href} variant="ghost" className="self-start">
            {galleryCta.label}
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        ) : null}
      </div>
      {/* Focusable so keyboard users can scroll it (axe: scrollable-region-focusable). */}
      <div
        role="region"
        tabIndex={0}
        aria-label={`${title} (scrollable)`}
        className="-mx-5 overflow-x-auto px-5 pt-1 pb-4 sm:mx-0 sm:overflow-visible sm:px-0"
      >
        <ul
          id={LIST_ID}
          className="flex snap-x snap-mandatory gap-5 sm:grid sm:snap-none sm:grid-cols-2 lg:grid-cols-4"
        >
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} href={hrefFor(t.id)} tagLabels={tagLabels} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
