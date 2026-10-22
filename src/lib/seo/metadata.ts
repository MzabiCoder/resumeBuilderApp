import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface PageMetaInput {
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/resume/samples". */
  path: string;
  /** App/builder/auth routes: keep out of search indexes. */
  noindex?: boolean;
  ogImage?: string;
}

/** Build consistent per-route metadata (canonical, OG, Twitter, robots). */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
