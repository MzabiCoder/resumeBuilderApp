import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio, hexToRgb } from "./contrast";

const css = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");

/** Extract `--name: #hex` pairs from the first block matching `selector {`. */
function tokensFor(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`Selector ${selector} not found`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const block = css.slice(open + 1, close);
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{3,6})\b/gi)].map((m) => [m[1]!, m[2]!]),
  );
}

const themes = {
  light: tokensFor(":root {"),
  dark: tokensFor('[data-theme="dark"] {'),
};

// [foreground, background, minimum ratio]
const pairs: Array<[string, string, number]> = [
  ["ink", "surface", 4.5],
  ["ink", "surface-raised", 4.5],
  ["ink", "surface-sunken", 4.5],
  ["ink-muted", "surface", 4.5],
  ["ink-muted", "surface-raised", 4.5],
  ["ink-muted", "surface-sunken", 4.5],
  ["ink-inverse", "surface-inverse", 4.5],
  ["on-primary", "primary", 4.5],
  ["on-primary", "primary-hover", 4.5],
  ["primary", "surface", 4.5],
  ["primary", "surface-raised", 4.5],
  ["ink", "primary-soft", 4.5],
  ["primary", "primary-soft", 4.5],
  ["accent-strong", "surface", 4.5],
  ["accent-strong", "accent-soft", 4.5],
  ["on-accent", "accent", 4.5],
  ["success", "surface", 4.5],
  ["success", "success-soft", 4.5],
  ["warning", "surface", 4.5],
  ["warning", "warning-soft", 4.5],
  ["danger", "surface", 4.5],
  ["danger", "danger-soft", 4.5],
  ["border-strong", "surface-raised", 3],
  ["border-strong", "surface", 3],
  ["focus-ring", "surface", 3],
  ["focus-ring", "surface-raised", 3],
];

describe("contrast()", () => {
  it("computes known ratios", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#fff", "#fff")).toBe(1);
  });
  it("rejects invalid colours", () => {
    expect(() => hexToRgb("nope")).toThrow();
  });
});

describe.each(Object.entries(themes))("%s theme tokens meet WCAG AA", (_name, tokens) => {
  it.each(pairs)("%s on %s ≥ %d:1", (fg, bg, min) => {
    const f = tokens[fg];
    const b = tokens[bg];
    expect(f, `missing --${fg}`).toBeDefined();
    expect(b, `missing --${bg}`).toBeDefined();
    expect(contrastRatio(f!, b!)).toBeGreaterThanOrEqual(min);
  });
});
