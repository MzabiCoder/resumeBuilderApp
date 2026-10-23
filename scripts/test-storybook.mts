/**
 * Story smoke + accessibility sweep over the static Storybook build.
 *
 *   npm run build-storybook && npm run test:storybook
 *
 * Serves storybook-static/, renders every story in light and dark themes and fails on
 * page errors, empty renders or any axe WCAG 2.2 AA violation.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROOT = "storybook-static";
const PORT = Number(process.env.STORYBOOK_TEST_PORT ?? 6107);
const TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

const server = createServer(async (req, res) => {
  const path = decodeURIComponent((req.url ?? "/").split("?")[0] ?? "/");
  try {
    const file = join(ROOT, path.endsWith("/") ? `${path}index.html` : path);
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
}).listen(PORT);

const index = JSON.parse(await readFile(join(ROOT, "index.json"), "utf8")) as {
  entries: Record<string, { id: string; type: string }>;
};
const stories = Object.values(index.entries).filter((e) => e.type === "story");

const browser = await chromium.launch();
const context = await browser.newContext();
let failures = 0;
try {
  for (const theme of ["light", "dark"]) {
    for (const story of stories) {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(
        `http://localhost:${PORT}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`,
        { waitUntil: "networkidle" },
      );
      await page
        .waitForSelector("#storybook-root > *", { timeout: 10_000 })
        .catch(() => errors.push("story rendered nothing"));
      const result = await new AxeBuilder({ page })
        .include("#storybook-root")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const violations = result.violations.map(
        (v) => `${v.id} ×${v.nodes.length} (${v.nodes[0]?.target.join(" ")})`,
      );
      if (errors.length || violations.length) {
        failures++;
        console.log(`✘ [${theme}] ${story.id}`, ...errors, ...violations);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`${stories.length} stories × 2 themes — ${failures} failing`);
if (failures > 0) process.exit(1);
