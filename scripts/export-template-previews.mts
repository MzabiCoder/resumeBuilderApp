/**
 * Export template preview images from the real template components.
 *
 *   npm run build && npm run previews
 *
 * Starts `next start` on PREVIEW_PORT, renders /template-preview/<id> (sample
 * resume at print size, 816×1056 CSS px) in Chromium at 2× DPR, screenshots the
 * first page and writes public/templates/<id>.avif + .webp (640 px wide).
 * Deterministic: fixed sample data, fonts loaded before capture, animations off.
 */
import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const PORT = Number(process.env.PREVIEW_PORT ?? 3300);
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = new URL("../public/templates/", import.meta.url);
const WIDTH = 640;

async function waitForServer(url: string, timeoutMs = 30_000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // not up yet
    }
    await sleep(300);
  }
  throw new Error(`Server did not start at ${url}`);
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
try {
  await waitForServer(`${BASE}/robots.txt`);
  // Built template ids = statically generated /template-preview/<id> routes.
  const manifest = JSON.parse(
    await readFile(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"),
  ) as { routes: Record<string, unknown> };
  const ids = Object.keys(manifest.routes)
    .filter((r) => r.startsWith("/template-preview/"))
    .map((r) => r.split("/").pop()!);
  if (ids.length === 0)
    throw new Error("No /template-preview routes found — run `npm run build` first.");
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  for (const id of ids) {
    await page.goto(`${BASE}/template-preview/${id}`, { waitUntil: "networkidle" });
    // The root layout's skip link sits at the top-left (visually hidden, 1px clip) and bled into captures.
    await page.addStyleTag({ content: 'a[href="#main"] { display: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page
      .locator("[data-preview-root] .resume-paper")
      .screenshot({ animations: "disabled" });
    const first = sharp(png).extract({ left: 0, top: 0, width: 816 * 2, height: 1056 * 2 });
    const resized = first.resize({ width: WIDTH });
    await resized
      .clone()
      .avif({ quality: 60, effort: 6 })
      .toFile(new URL(`${id}.avif`, OUT_DIR).pathname);
    await resized
      .clone()
      .webp({ quality: 80 })
      .toFile(new URL(`${id}.webp`, OUT_DIR).pathname);
    console.log(`✓ ${id}`);
  }
  await browser.close();
} finally {
  server.kill();
}
