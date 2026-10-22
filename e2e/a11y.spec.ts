import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Every route that exists. Phases append here; CI fails on ANY axe violation. */
const routes = ["/", "/this-page-does-not-exist"];

for (const route of routes) {
  test(`axe: ${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
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
