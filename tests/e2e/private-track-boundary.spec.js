import { expect, test } from "@playwright/test";

test("private tracks are not exposed through public formation routes", async ({ page }) => {
  for (const trackId of ["accessibility", "devops-deployment", "git", "node-api", "react", "sql-postgresql", "testing", "typescript", "web-performance", "web-security"]) {
    await page.goto(`/formations/${trackId}`);
    await expect(page.getByRole("heading", { name: /Formation introuvable|Formation not found/ })).toBeVisible();
  }
});
