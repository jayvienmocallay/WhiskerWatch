import { expect, test } from "@playwright/test";

test("map remains usable with 100 reports and filters respond", async ({ page }) => {
  const start = Date.now();
  await page.goto("/?seed=100");
  await expect(page.getByRole("button", { name: /cat report/i }).first()).toBeVisible();
  expect(Date.now() - start).toBeLessThan(3000);
  await page.getByRole("checkbox", { name: "Needs food" }).check();
  await expect(page.getByRole("button", { name: /needs food cat report/i }).first()).toBeVisible();
});

test("patrol logs remain usable with 100 reports", async ({ page }) => {
  await page.goto("/?seed=100&page=patrol");
  await expect(page.getByRole("heading", { name: "Patrol Logs" })).toBeVisible();
  await expect(page.locator(".patrol-row").first()).toBeVisible();
  await expect(page.locator(".patrol-row")).toHaveCount(100);
});
