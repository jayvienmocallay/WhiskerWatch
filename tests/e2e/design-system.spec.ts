import { expect, test } from "@playwright/test";

test("catsy desktop states are represented", async ({ page }) => {
  await page.goto("/?seed=25");
  await expect(page.locator(".app-header")).toBeVisible();
  await expect(page.locator(".map-panel")).toBeVisible();
  await expect(page.locator(".cat-marker").first()).toBeVisible();
  await page.getByRole("button", { name: /injured cat report/i }).first().click();
  await expect(page.getByRole("article", { name: "Report detail" })).toContainText("Cat case card");
  await expect(page.locator(".report-list-item.selected").first()).toBeVisible();
});

test("catsy validation, success, and filter-empty states are visible", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /submit report/i }).click();
  await expect(page.locator(".state-error, .field-error").first()).toBeVisible();
  await page.locator(".leaflet-map").click({ position: { x: 220, y: 180 } });
  await page.getByRole("radio", { name: "Injured" }).check();
  await page.getByRole("button", { name: /submit report/i }).click();
  await expect(page.locator(".state-success")).toBeVisible();
  await page.goto("/?seed=12");
  await page.getByRole("checkbox", { name: "Reported" }).uncheck();
  await page.getByRole("checkbox", { name: "Monitoring" }).uncheck();
  await page.getByRole("checkbox", { name: "Helped" }).uncheck();
  await page.getByRole("checkbox", { name: "Resolved" }).check();
  await expect(page.getByText("No reports match this view.")).toBeVisible();
});

test("mobile layout stacks map before form and detail", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile project only");
  await page.goto("/?seed=3");
  const mapBox = await page.locator(".map-stack").boundingBox();
  const formBox = await page.locator(".sidebar").boundingBox();
  const detailBox = await page.locator(".detail-pane").boundingBox();
  expect(mapBox?.y ?? 0).toBeLessThan(formBox?.y ?? 0);
  expect(formBox?.y ?? 0).toBeLessThan(detailBox?.y ?? 0);
});
