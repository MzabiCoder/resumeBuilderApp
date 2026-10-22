import type { FaqItem, SectionHeader } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { Disclosure } from "@/components/ui/Disclosure";
import { RichText } from "@/components/ui/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/structured-data";
import { toPlainText } from "@/lib/rich-text";

export interface FaqSectionProps extends SectionHeader {
  items: readonly FaqItem[];
  id?: string;
}

/** #faq — native disclosure accordion (zero JS) + FAQPage JSON-LD from the same content. */
export function FaqSection({ id = "faq", eyebrow, title, intro, items }: FaqSectionProps) {
  const jsonLd = faqJsonLd(items.map((i) => ({ question: i.question, answer: i.answer.map(toPlainText).join(" ") })));
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-24">
      <JsonLd data={jsonLd} />
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <header className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          {eyebrow ? <p className="text-sm font-semibold tracking-[0.14em] text-accent-strong uppercase">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="text-display-md font-semibold">
            {title}
          </h2>
          {intro ? <p className="text-lead text-ink-muted">{intro}</p> : null}
        </header>
        <div className="border-t border-border">
          {items.map((item) => (
            <Disclosure key={item.id} id={`faq-${item.id}`} group={id} summary={item.question}>
              {item.answer.map((para) => (
                <p key={para}>
                  <RichText text={para} />
                </p>
              ))}
            </Disclosure>
          ))}
        </div>
      </Container>
    </section>
  );
}
