import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { staticIndexableRoutes } from "@/config/routes";

/** Grows with each phase (samples, help articles). Split via generateSitemaps() past ~10k URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return staticIndexableRoutes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority,
  }));
}
