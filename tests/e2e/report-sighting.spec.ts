import { expect, test } from "@playwright/test";

test("visitor can submit a report and see it on the map", async ({ page }) => {
  await page.goto("/");
  await page.locator(".leaflet-map").click({ position: { x: 220, y: 180 } });
  await expect(page.getByTestId("selected-location")).toContainText("approx");
  await page.getByRole("radio", { name: "Injured" }).check();
  await page.getByLabel("Notes").fill("Orange cat near the market entrance.");
  await page.getByRole("button", { name: "Submit report" }).click();
  await expect(page.getByRole("heading", { name: "Help Signal Sent" })).toBeVisible();
  await expect(page.getByLabel("Help Signal Sent").getByText(/Report submitted/)).toBeVisible();
  await expect(page.getByRole("button", { name: /Create another report/i })).toBeVisible();
  await page.getByRole("button", { name: /Continue monitoring/i }).click();
  await expect(page.locator(".report-list").getByRole("button", { name: /injured cat report/i })).toBeVisible();
});
