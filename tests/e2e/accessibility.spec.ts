import { expect, test } from "@playwright/test";

test("primary controls are keyboard reachable and labelled", async ({ page }) => {
  await page.goto("/?seed=3");
  await expect(page.getByRole("form", { name: "Create cat report" })).toBeVisible();
  await expect(page.getByRole("img", { name: /WhiskerWatch neighborhood lookout/i })).toBeVisible();
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

test("keyboard users can reach workbench, patrol, and success actions", async ({ page }) => {
  await page.goto("/?page=success");
  await expect(page.getByRole("heading", { name: "Help Signal Sent" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await page.getByRole("button", { name: /Continue monitoring/i }).click();
  await page.getByRole("button", { name: "Patrol Logs" }).click();
  await expect(page.getByRole("heading", { name: "Patrol Logs" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
});
