import { expect, test } from "@playwright/test";

test("volunteer can monitor seeded reports and inspect details", async ({ page }) => {
  await page.goto("/?seed=25");
  await expect(page.getByRole("button", { name: /injured cat report/i }).first()).toBeVisible();
  await page.getByRole("button", { name: /injured cat report/i }).first().click();
  await expect(page.getByRole("article", { name: "Report detail" })).toContainText("Injured");
  await expect(page.getByRole("article", { name: "Report detail" })).toContainText("approx");
});

test("patrol logs dashboard supports report activity scanning", async ({ page }) => {
  await page.goto("/?seed=25&page=patrol");
  await expect(page.locator(".patrol-dashboard .ww-logo")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Patrol Logs" })).toBeVisible();
  await expect(page.getByLabel("Patrol summary")).toContainText("Reporting now");
  await expect(page.getByRole("list", { name: "Patrol report activity" })).toBeVisible();
  await expect(page.locator(".patrol-row").first()).toContainText(/Reported|Monitoring|Helped/);
});
