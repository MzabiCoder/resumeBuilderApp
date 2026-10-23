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

/**
 * Body font uses `optional`: it is preloaded so it is normally ready inside the
 * ~100 ms block period, and on slow first visits the metric-adjusted fallback is
 * kept instead of swapping — a late swap re-wraps hero copy and shifted the
 * resume art (measured CLS 0.07 under DevTools throttling; budget 0.05).
 */
export const fontBody = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});
