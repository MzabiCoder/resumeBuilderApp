import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { fontBody, fontDisplay } from "@/styles/fonts";
import { SkipLink } from "@/components/ui/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free AI Resume Builder`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { siteName: siteConfig.name, locale: siteConfig.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1120" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {/* Chrome lives in route-group layouts: (marketing) → MarketingShell, (builder) → BuilderShell.
            <Toaster /> is mounted by app layouts only. Every layout must render <main id="main">. */}
        {children}
      </body>
    </html>
  );
}
