import { expect, test } from "@playwright/test";

test("accessibility track appears in the catalog and validates a semantic lesson", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Accessibilité web|Web accessibility/).first()).toBeVisible();

  await page.goto("/learn/accessibility/a11y-foundations/a11y-01-semantics", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Choisir le HTML sémantique|Choose semantic HTML/ }).first()).toBeVisible();

  const editor = page.getByLabel(/Éditeur de code|Code editor/);
  await editor.fill(
    '<header></header>\n<nav aria-label="Navigation principale"></nav>\n<main><h1>Tableau de bord</h1></main>\n<footer></footer>'
  );
  await page.getByRole("button", { name: /Lancer|Run/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
