import { expect, test } from "@playwright/test";

test("map remains usable with 100 reports and filters respond", async ({ page }) => {
  const start = Date.now();
  await page.goto("/?seed=100");
  await expect(page.getByRole("button", { name: /cat report/i }).first()).toBeVisible();
  expect(Date.now() - start).toBeLessThan(3000);
  await page.getByRole("checkbox", { name: "Needs food" }).check();
  await expect(page.getByRole("button", { name: /needs food cat report/i }).first()).toBeVisible();
});
