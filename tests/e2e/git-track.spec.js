import { expect, test } from "@playwright/test";

test("Git track appears in the catalog and validates a terminal lesson", async ({ page }) => {
  await page.goto("/#/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Git et GitHub|Git and GitHub/).first()).toBeVisible();

  await page.goto("/#/learn/git/git-foundations/git-01-terminal", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Se repérer dans le terminal|Navigate the terminal/ }).first()).toBeVisible();
  const editor = page.getByLabel(/Éditeur de code|Code editor/);
  await editor.fill("pwd\nls\nmkdir pulsa-git\ncd pulsa-git");
  await page.getByRole("button", { name: /Lancer|Run/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await expect(page.getByText(/Terminal simulé|Simulated terminal/)).toBeVisible();
});
