/** Single source for URL patterns (lowercase, hyphenated, no trailing slash). */
export const urls = {
  resumeSampleCategory: (slug: string) => `/resume/samples/${slug}`,
  resumeStartWithTemplate: (id: string) => `/resume/start?template=${encodeURIComponent(id)}`,
  resumeTemplates: "/resume/templates",
} as const;
