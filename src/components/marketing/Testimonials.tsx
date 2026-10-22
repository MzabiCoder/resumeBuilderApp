import type { SectionHeader, Testimonial } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { TestimonialCard } from "./TestimonialCard";

export interface TestimonialsProps extends SectionHeader {
  items: readonly Testimonial[];
}

/**
 * #testimonials — renders NOTHING unless entries are verified (real + consented).
 * Deliberately emits no Review/AggregateRating structured data.
 */
export function Testimonials({ eyebrow, title, intro, items }: TestimonialsProps) {
  const verified = items.filter((t) => t.verified);
  if (verified.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow={eyebrow} title={title} intro={intro} tone="sunken">
      <ul className="grid gap-6 md:grid-cols-3">
        {verified.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </ul>
    </Section>
  );
}
