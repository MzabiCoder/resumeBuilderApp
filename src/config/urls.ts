/** Single source for URL patterns (lowercase, hyphenated, no trailing slash). */
export const urls = {
  resumeSampleCategory: (slug: string) => `/resume/samples/${slug}`,
  /** Straight into the builder; unbuilt template ids fall back to Clarity with a notice. */
  resumeStartWithTemplate: (id: string) =>
    `/resume/builder/contact?template=${encodeURIComponent(id)}`,
  resumeStart: "/resume/start",
  resumeTemplates: "/resume/templates",
} as const;
