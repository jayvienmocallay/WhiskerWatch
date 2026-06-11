import { expect, test } from "@playwright/test";

test("user can filter reports and reset empty states", async ({ page }) => {
  await page.goto("/?seed=12");
  await page.getByRole("checkbox", { name: "Injured" }).check();
  await expect(page.getByRole("button", { name: /injured cat report/i }).first()).toBeVisible();
  await page.getByRole("checkbox", { name: "Injured" }).uncheck();
  await page.getByRole("checkbox", { name: "Reported" }).uncheck();
  await page.getByRole("checkbox", { name: "Monitoring" }).uncheck();
  await page.getByRole("checkbox", { name: "Helped" }).uncheck();
  await page.getByRole("checkbox", { name: "Resolved" }).check();
  await expect(page.getByText("No reports match this view.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).first().click();
  await expect(page.getByRole("button", { name: /cat report/i }).first()).toBeVisible();
});
