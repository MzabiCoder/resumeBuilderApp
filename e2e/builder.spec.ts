import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Next 16 keeps the previous route mounted but hidden (<Activity>): only target visible controls. */
const field = (page: Page, label: string) =>
  page.getByLabel(label, { exact: true }).filter({ visible: true });

const steps = ["contact", "experience", "education", "skills", "summary", "finalize"];

async function axe(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  return results.violations.map((v) => [v.id, v.nodes.map((n) => n.target)]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/resume/start");
  await page.evaluate(() => localStorage.clear());
});

test("axe: /resume/start", async ({ page }) => {
  expect(await axe(page)).toEqual([]);
});

for (const step of steps) {
  test(`axe: builder step ${step}`, async ({ page }) => {
    await page.goto(`/resume/builder/${step}`);
    await expect(page.getByRole("status").filter({ visible: true }).first()).toBeVisible();
    // Give each list step content so item cards are audited too.
    const add = page.getByRole("button", { name: /^Add (a|an)? ?(position|education|skill)/ });
    if (await add.count()) await add.first().click();
    expect(await axe(page)).toEqual([]);
  });
}

test("start → builder applies the template; edits autosave and survive reload", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Use Ledger" }).click();
  await expect(page).toHaveURL(/\/resume\/builder\/contact\?template=ledger/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How can employers reach you?");

  await field(page, "First name").fill("Ada");
  await field(page, "Last name").fill("Lovelace");
  await field(page, "Email").fill("ada@example.com");
  await expect(page.getByText("Saved on this device").first()).toBeAttached();

  await page.reload();
  await expect(field(page, "First name")).toHaveValue("Ada");
  const draft = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("hireready:resume:draft")!),
  );
  expect(draft.templateId).toBe("ledger");

  await page.getByRole("link", { name: "Next: Experience" }).click();
  await expect(page).toHaveURL(/\/resume\/builder\/experience$/);
  await page.getByRole("button", { name: "Add a position" }).click();
  await expect(field(page, "Job title")).toBeFocused();
  await field(page, "Job title").fill("Analyst");
  await field(page, "What did you achieve?").fill("Wrote the first algorithm");
});

test("live preview updates as you type (desktop) / opens in a sheet (mobile)", async ({
  page,
  isMobile,
}) => {
  await page.goto("/resume/builder/contact");
  await field(page, "First name").fill("Grace");
  if (isMobile) {
    await page.getByRole("button", { name: "Preview resume" }).click();
    const dialog = page.getByRole("dialog", { name: "Resume preview" });
    await expect(dialog.locator("[data-template] h2")).toHaveText("Grace");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Preview resume" })).toBeFocused();
  } else {
    const preview = page.getByRole("complementary", { name: "Live preview" });
    await expect(preview.getByRole("heading", { level: 2 })).toHaveText("Grace");
    await preview.getByLabel("Template").selectOption("baseline");
    await expect(preview.locator("[data-template]")).toHaveAttribute("data-template", "baseline");
  }
});

test("PDF export prints only the resume, unscaled, with real text", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "page.pdf is Chromium-only");
  await page.goto("/resume/builder/finalize");
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto("/resume/builder/contact");
  await field(page, "First name").fill("Katherine");
  await page.goto("/resume/builder/finalize");
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  await page.emulateMedia({ media: "print" });
  const root = page.locator("#resume-print-root");
  await expect(root).toBeVisible();
  await expect(root.getByRole("heading", { level: 2 })).toHaveText("Katherine");
  await expect(page.locator("main#main")).toBeHidden();
  expect(await page.title()).toBe("Katherine – Resume");
  const box = await root.locator(".resume-paper").boundingBox();
  expect(box?.width).toBeCloseTo(816, 0);
  const pdf = await page.pdf({ format: "Letter", printBackground: true, preferCSSPageSize: true });
  expect(pdf.byteLength).toBeGreaterThan(5_000);
  expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
});

test("unknown step shows not-found (noindex); builder is noindex", async ({ page }) => {
  // Streaming has started (layout Suspense) so Next keeps 200 + injects noindex — documented behaviour.
  await page.goto("/resume/builder/nope");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/couldn.t find that page/i);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await page.goto("/resume/builder/contact");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
});
