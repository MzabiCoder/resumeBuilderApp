import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Every route that exists. Phases append here; CI fails on ANY axe violation. */
const routes = [
  "/",
  "/resume/start",
  "/sign-in",
  "/sign-up",
  "/resume/upload",
  "/this-page-does-not-exist",
];

for (const route of routes) {
  test(`axe: ${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    // Audit the resting state. Showpieces are SSR'd in their final state and only animate
    // opacity from it; under load axe could otherwise sample a mid-fade frame (flaky contrast).
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => [v.id, v.nodes.map((n) => n.target)]),
        null,
        2,
      ),
    ).toEqual([]);
  });
}

test("skip link is the first focusable element and moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test.describe("home without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("every section and showpiece renders complete content", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "hero",
      "free-promise",
      "how-it-works",
      "build-paths",
      "ai-writer",
      "categories",
      "templates",
      "cover-letters",
      "tips",
      "faq",
      "get-started",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator('[data-anim="ai-score"]')).toHaveText(/\d+/);
    await expect(page.locator('#hero [data-anim="score"]')).toHaveText(/\d+/);
    // Unverified social proof must not render.
    await expect(page.locator("#testimonials, #trusted-by")).toHaveCount(0);
  });
});

test("reduced motion: showpiece chunks are never requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const gsapRequests: string[] = [];
  page.on("response", async (res) => {
    if (res.url().endsWith(".js") && (await res.text()).includes("ScrollTrigger"))
      gsapRequests.push(res.url());
  });
  await page.goto("/");
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(800);
  expect(gsapRequests).toEqual([]);
});

test("template filter chips work by keyboard", async ({ page }) => {
  await page.goto("/#templates");
  const chip = page.getByRole("button", { name: "Creative" });
  await chip.focus();
  await page.keyboard.press("Enter");
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#template-showcase-list > li:not([hidden])")).toHaveCount(1);
});

test("no horizontal scroll at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("desktop nav dropdown is keyboard operable", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Resume" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: /Resume Samples/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
