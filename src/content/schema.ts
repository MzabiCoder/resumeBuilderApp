import { z } from "zod";

/**
 * Shapes for everything in /content. Content files are typed against these
 * (`satisfies`) and validated at test time (src/content/content.test.ts), so a
 * copy edit that breaks a shape fails CI instead of production.
 *
 * Rich text fields accept a tiny markdown subset: **bold** and *italic*.
 */

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase-hyphenated slug");
const href = z.string().startsWith("/");

export const iconKey = z.enum([
  "briefcase",
  "settings",
  "compass",
  "sprout",
  "heart-handshake",
  "hard-hat",
  "graduation-cap",
  "calculator",
  "utensils",
  "sparkles",
  "file-up",
  "layout-template",
  "wand",
  "download",
  "credit-card",
  "badge-check",
  "target",
  "list-checks",
  "pen-line",
  "search-check",
  "shield-check",
  "file-text",
]);
export type IconKey = z.infer<typeof iconKey>;

export const cta = z.object({ label: z.string().min(1), href });
export type Cta = z.infer<typeof cta>;

/** Documented image slot: swap `src` for custom art without touching components. */
export const imageSlot = z.object({
  src: z.string().optional(),
  alt: z.string(),
  note: z.string().optional(),
});

export const featureItem = z.object({ title: z.string(), body: z.string(), icon: iconKey });
export type FeatureItem = z.infer<typeof featureItem>;

export const sectionHeader = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  intro: z.string().optional(),
});
export type SectionHeader = z.infer<typeof sectionHeader>;

export const sampleResume = z.object({
  label: z.string(), // "Sample" badge text — samples are always labelled
  name: z.string(),
  title: z.string(),
  contact: z.array(z.string()),
  summary: z.string(),
  experience: z.array(
    z.object({
      role: z.string(),
      org: z.string(),
      dates: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  skills: z.array(z.string()),
  strength: z.object({ label: z.string(), value: z.number().min(0).max(100) }),
  badges: z.array(z.string()),
});
export type SampleResume = z.infer<typeof sampleResume>;

export const heroContent = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  headlineAccent: z.string(), // trailing words styled with the accent swash
  subhead: z.string(),
  points: z.array(z.string()).min(1),
  primaryCta: cta,
  secondaryCta: cta,
  visual: imageSlot,
  resume: sampleResume,
});

export const aiDemoContent = sectionHeader.extend({
  beforeLabel: z.string(),
  afterLabel: z.string(),
  before: z.string(),
  after: z.string(),
  placeholderNote: z.string(),
  scoreLabel: z.string(),
  scoreFrom: z.number().min(0).max(100),
  scoreTo: z.number().min(0).max(100),
  cta,
});

export const category = z.object({
  slug,
  name: z.string(),
  blurb: z.string(),
  icon: iconKey,
  sampleCount: z.number().int().nonnegative(),
});
export type Category = z.infer<typeof category>;

export const templateStyle = z.enum(["modern", "professional", "simple", "creative", "ats"]);
export type TemplateStyle = z.infer<typeof templateStyle>;

export const templateMeta = z.object({
  id: slug,
  name: z.string(),
  description: z.string(),
  tags: z.array(templateStyle).min(1),
  layout: z.enum(["single", "sidebar", "band"]),
  accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  preview: imageSlot,
});
export type TemplateMeta = z.infer<typeof templateMeta>;

export const tip = z.object({ title: z.string(), body: z.string(), href, icon: iconKey });
export type Tip = z.infer<typeof tip>;

export const faqItem = z.object({
  id: slug,
  question: z.string(),
  answer: z.array(z.string()).min(1), // paragraphs, rich text
  /** Internal pre-launch note — never rendered. */
  todo: z.string().optional(),
});
export type FaqItem = z.infer<typeof faqItem>;

export const trustEntry = z.object({
  id: z.string(),
  kind: z.enum(["stat", "employer"]),
  value: z.string(),
  label: z.string(),
  source: z.string(),
  verified: z.boolean(),
});
export type TrustEntry = z.infer<typeof trustEntry>;

export const testimonial = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  rating: z.number().int().min(1).max(5),
  consentRef: z.string(), // where the signed consent is stored
  verified: z.boolean(),
});
export type Testimonial = z.infer<typeof testimonial>;
