import { Fraunces, Inter } from "next/font/google";

/**
 * Two self-hosted variable families (next/font downloads at build time — no runtime
 * request to Google). Fraunces: characterful optical-size serif for display.
 * Inter: highly legible UI/body sans.
 */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
