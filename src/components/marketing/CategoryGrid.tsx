import type { Category, SectionHeader } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { CategoryCard } from "./CategoryCard";

export interface CategoryGridProps extends SectionHeader {
  categories: readonly Category[];
  /** Builds the link for a category (keeps URL policy out of the component). */
  hrefFor: (slug: string) => string;
}

/** #categories */
export function CategoryGrid({ eyebrow, title, intro, categories, hrefFor }: CategoryGridProps) {
  return (
    <Section id="categories" eyebrow={eyebrow} title={title} intro={intro} tone="sunken">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} href={hrefFor(c.slug)} />
        ))}
      </ul>
    </Section>
  );
}
