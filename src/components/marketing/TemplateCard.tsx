import NextLink from "next/link";
import type { TemplateMeta } from "@/content/schema";
import { Badge } from "@/components/ui/Badge";
import { TemplateThumbnail } from "./TemplateThumbnail";

export interface TemplateCardProps {
  template: TemplateMeta;
  href: string;
  tagLabels: Readonly<Record<string, string>>;
}

/** One gallery item. `data-tags` is the hook TemplateFilter uses to show/hide it. */
export function TemplateCard({ template, href, tagLabels }: TemplateCardProps) {
  return (
    <li
      data-tags={template.tags.join(" ")}
      className="group relative flex w-[15rem] shrink-0 snap-start flex-col gap-4 sm:w-auto"
    >
      <div className="rounded-lg bg-surface-sunken p-5 transition-transform duration-(--duration-base) ease-out group-hover:-translate-y-1">
        {template.preview.src ? (
          // Pre-encoded, deterministic assets (npm run previews) — no runtime optimizer needed.
          <picture>
            <source srcSet={`${template.preview.src}.avif`} type="image/avif" />
            <img
              src={`${template.preview.src}.webp`}
              alt={template.preview.alt}
              width={640}
              height={828}
              loading="lazy"
              decoding="async"
              className="h-auto w-full bg-white"
            />
          </picture>
        ) : (
          <TemplateThumbnail layout={template.layout} accent={template.accent} />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-sans text-lg font-semibold">
          <NextLink href={href} className="after:absolute after:inset-0 after:rounded-lg">
            {template.name}
            <span className="sr-only"> template</span>
          </NextLink>
        </h3>
        <p className="text-sm text-ink-muted">{template.description}</p>
        <p className="flex flex-wrap gap-1.5">
          {template.tags.map((t) => (
            <Badge key={t} tone={t === "ats" ? "success" : "neutral"}>
              {tagLabels[t] ?? t}
            </Badge>
          ))}
        </p>
      </div>
    </li>
  );
}
