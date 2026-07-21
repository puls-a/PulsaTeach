import { expect, test } from "@playwright/test";

test("testing track exposes a practical lesson and validates its evidence", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Testing frontend|Frontend testing/).first()).toBeVisible();

  await page.goto("/learn/testing/testing-strategy/testing-01-vitest", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Écrire un test Vitest|Write a Vitest test/ }).first()).toBeVisible();
  await page.getByRole("tab", { name: /Coder|Code/ }).click();

  const editor = page.getByLabel(/Éditeur de code|Code editor/);
  await editor.fill(
    "describe('total', () => { it('calcule', () => { expect(total()).toBe(25); }); });"
  );
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
