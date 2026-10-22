import { absoluteUrl, siteConfig } from "@/config/site";

export interface Crumb {
  label: string;
  href: string;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo.light),
    sameAs: Object.values(siteConfig.social).filter((u) => u.startsWith("http")),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function howToJsonLd(input: {
  name: string;
  totalTime?: string;
  steps: ReadonlyArray<{ title: string; body: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}

/** Answers must be plain text — pass rich-text strings through toPlainText first. */
export function faqJsonLd(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}
