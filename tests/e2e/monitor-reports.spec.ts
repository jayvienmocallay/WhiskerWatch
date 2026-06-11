import { expect, test } from "@playwright/test";

test("volunteer can monitor seeded reports and inspect details", async ({ page }) => {
  await page.goto("/?seed=25");
  await expect(page.getByRole("button", { name: /injured cat report/i }).first()).toBeVisible();
  await page.getByRole("button", { name: /injured cat report/i }).first().click();
  await expect(page.getByRole("article", { name: "Report detail" })).toContainText("Injured");
  await expect(page.getByRole("article", { name: "Report detail" })).toContainText("approx");
});
