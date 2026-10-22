import { describe, expect, it } from "vitest";
import {
  aiDemoContent,
  category,
  faqItem,
  heroContent,
  templateMeta,
  testimonial,
  tip,
  trustEntry,
} from "./schema";
import { aiDemo, hero } from "./home";
import { homeFaq } from "./faq";
import { categories } from "./categories";
import { templates } from "./templates";
import { tips } from "./tips";
import { trustEntries } from "./trust";
import { testimonials } from "./testimonials";

describe("content validates against its schema", () => {
  it("hero + AI demo", () => {
    expect(() => heroContent.parse(hero)).not.toThrow();
    expect(() => aiDemoContent.parse(aiDemo)).not.toThrow();
  });
  it.each([
    ["faq", faqItem, homeFaq],
    ["categories", category, categories],
    ["templates", templateMeta, templates],
    ["tips", tip, tips],
    ["trust", trustEntry, trustEntries],
    ["testimonials", testimonial, testimonials],
  ] as const)("%s", (_name, schema, items) => {
    for (const item of items) expect(() => schema.parse(item)).not.toThrow();
  });
});

describe("content integrity rules", () => {
  it("has exactly the 9 required categories with unique slugs", () => {
    expect(categories).toHaveLength(9);
    expect(new Set(categories.map((c) => c.slug)).size).toBe(9);
  });
  it("has at least 8 templates covering 3 ATS, 2 modern, 2 professional, 1 creative", () => {
    const count = (tag: string) => templates.filter((t) => t.tags.includes(tag as never)).length;
    expect(templates.length).toBeGreaterThanOrEqual(8);
    expect(count("ats")).toBeGreaterThanOrEqual(3);
    expect(count("modern")).toBeGreaterThanOrEqual(2);
    expect(count("professional")).toBeGreaterThanOrEqual(2);
    expect(count("creative")).toBeGreaterThanOrEqual(1);
  });
  it("ships placeholder trust claims and testimonials as unverified", () => {
    for (const e of [...trustEntries, ...testimonials]) {
      if (JSON.stringify(e).includes("PLACEHOLDER")) expect(e.verified).toBe(false);
    }
  });
  it("labels the sample and uses obviously fictional contact details", () => {
    expect(hero.resume.label).toBe("Sample");
    const contact = hero.resume.contact.join(" ");
    expect(contact).toMatch(/example\.com/);
    expect(contact).toMatch(/555[-) ]*01\d\d/);
  });
  it("never renders internal TODO notes in FAQ answers", () => {
    for (const f of homeFaq) expect(f.answer.join(" ")).not.toMatch(/TODO/i);
  });
});
