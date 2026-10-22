/**
 * Brand values. Import from here — never hardcode the name, URL, tagline or logo.
 * See README "Pre-launch checklist" before going live.
 */
export const siteConfig = {
  name: "HireReady", // TODO: final brand name
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: final domain
  tagline: "Create a resume that gets noticed. Simple, easy, fast — and free.",
  description:
    "Build a professional, ATS-friendly resume and cover letter in minutes with a free AI writer. No credit card, no watermark, free PDF and Word downloads.",
  logo: { light: "/brand/logo.svg", dark: "/brand/logo-white.svg", width: 152, height: 32 },
  social: { x: "#", facebook: "#", instagram: "#", youtube: "#" },
  copyrightYear: 2026,
  locale: "en_US",
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for canonical links, sitemaps and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
