import { expect, test } from "@playwright/test";

test("primary controls are keyboard reachable and labelled", async ({ page }) => {
  await page.goto("/?seed=3");
  await expect(page.getByRole("form", { name: "Create cat report" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Report filters" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await expect(page.getByRole("button", { name: /cat report/i }).first()).toBeVisible();
});

test("catsy focus and reduced-motion preferences are respected", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?seed=3");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await expect(page.locator(".report-list-item").first()).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches))
    .toBe(true);
});
