import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { privateRoutePrefixes } from "@/config/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [...privateRoutePrefixes] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
