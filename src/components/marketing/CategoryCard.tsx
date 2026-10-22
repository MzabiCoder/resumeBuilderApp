import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/content/schema";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "./FeatureIcon";

export interface CategoryCardProps {
  category: Category;
  href: string;
  sampleLabel?: (count: number) => string;
}

/** Whole card is clickable via a stretched link; the link text is the category name. */
export function CategoryCard({ category, href, sampleLabel = (n) => `${n} samples` }: CategoryCardProps) {
  return (
    <Card as="li" interactive className="group flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <FeatureIcon icon={category.icon} />
        <ArrowUpRight aria-hidden="true" className="size-5 text-ink-muted transition-transform duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>
      <h3 className="font-sans text-lg font-semibold">
        <NextLink href={href} className="after:absolute after:inset-0 after:rounded-lg">
          {category.name}
        </NextLink>
      </h3>
      <p className="text-ink-muted">{category.blurb}</p>
      <p className="mt-auto text-sm font-semibold text-primary">{sampleLabel(category.sampleCount)}</p>
    </Card>
  );
}
