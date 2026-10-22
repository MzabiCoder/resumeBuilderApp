import { ArrowRight } from "lucide-react";
import type { Cta, FeatureItem, SectionHeader } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";
import { FeatureIcon } from "./FeatureIcon";

export interface BuildPath extends FeatureItem {
  cta: Cta;
  tone: "primary" | "raised";
}

export interface BuildPathsProps extends SectionHeader {
  paths: readonly BuildPath[];
}

/** #build-paths — the two ways to start, as large contrasting cards. */
export function BuildPaths({ eyebrow, title, intro, paths }: BuildPathsProps) {
  return (
    <Section id="build-paths" eyebrow={eyebrow} title={title} intro={intro}>
      <ul className="grid gap-6 md:grid-cols-2">
        {paths.map((path) => {
          const primary = path.tone === "primary";
          return (
            <li
              key={path.title}
              className={cn(
                "flex flex-col items-start gap-5 rounded-xl p-8 sm:p-10",
                primary ? "bg-primary text-on-primary" : "border border-border bg-surface-raised",
              )}
            >
              <FeatureIcon icon={path.icon} tone={primary ? "inverse" : "accent"} className={primary ? "bg-on-primary/15 text-on-primary" : ""} />
              <h3 className="text-display-sm font-semibold">{path.title}</h3>
              <p className={cn("text-lead", primary ? "opacity-90" : "text-ink-muted")}>{path.body}</p>
              <ButtonLink
                href={path.cta.href}
                variant={primary ? "accent" : "outline"}
                size="lg"
                className="mt-auto"
              >
                {path.cta.label}
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
