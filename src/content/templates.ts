import type { TemplateMeta, TemplateStyle } from "./schema";

export const templateFilters: Array<{ value: TemplateStyle | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "modern", label: "Modern" },
  { value: "professional", label: "Professional" },
  { value: "simple", label: "Simple" },
  { value: "creative", label: "Creative" },
  { value: "ats", label: "ATS-optimized" },
];

const previewNote =
  "Image slot: replaced by scripts/export-template-previews output (AVIF/WebP) in Phase 3.";

/** Gallery metadata. The template components themselves arrive in Phase 3 (`resume-templates/`). */
export const templates: TemplateMeta[] = [
  {
    id: "clarity",
    name: "Clarity",
    description: "Single column, generous spacing. The safest ATS choice.",
    tags: ["ats", "simple"],
    layout: "single",
    accent: "#2f3bc9",
    preview: { alt: "Clarity template preview", note: previewNote },
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "Traditional serif headings for finance, law and government.",
    tags: ["ats", "professional"],
    layout: "single",
    accent: "#141726",
    preview: { alt: "Ledger template preview", note: previewNote },
  },
  {
    id: "baseline",
    name: "Baseline",
    description: "Plain, compact and scannable. Fits a lot on one page.",
    tags: ["ats", "simple"],
    layout: "single",
    accent: "#1c7346",
    preview: { alt: "Baseline template preview", note: previewNote },
  },
  {
    id: "meridian",
    name: "Meridian",
    description: "A slim sidebar for skills and contact details.",
    tags: ["modern"],
    layout: "sidebar",
    accent: "#2f3bc9",
    preview: { alt: "Meridian template preview", note: previewNote },
  },
  {
    id: "horizon",
    name: "Horizon",
    description: "Bold colour header band with a clean body.",
    tags: ["modern"],
    layout: "band",
    accent: "#b23c15",
    preview: { alt: "Horizon template preview", note: previewNote },
  },
  {
    id: "executive",
    name: "Executive",
    description: "Understated and confident for senior roles.",
    tags: ["professional"],
    layout: "single",
    accent: "#4a5068",
    preview: { alt: "Executive template preview", note: previewNote },
  },
  {
    id: "counsel",
    name: "Counsel",
    description: "Two-column header, classic body. Polished and calm.",
    tags: ["professional"],
    layout: "sidebar",
    accent: "#1c4f73",
    preview: { alt: "Counsel template preview", note: previewNote },
  },
  {
    id: "studio",
    name: "Studio",
    description: "Expressive type and colour for creative roles.",
    tags: ["creative"],
    layout: "band",
    accent: "#7a2fc9",
    preview: { alt: "Studio template preview", note: previewNote },
  },
];
