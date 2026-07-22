import { expect, test } from "@playwright/test";

test("TypeScript track loads on demand and validates a typed contract", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/TypeScript professionnel|Professional TypeScript/).first()).toBeVisible();

  await page.goto("/learn/typescript/typescript-foundations/ts-01-unions", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Unions littérales et raffinement|Literal unions and narrowing/ }).first()).toBeVisible();
  await expect(page.getByText("script.ts", { exact: true })).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "type LoadState = { status: 'success'; data: string[] } | { status: 'error'; message: string };\nfunction label(state: LoadState) {\n  if (state.status === 'success') return state.data.length;\n  return state.message;\n}"
  );
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();
  await expect(page.locator("#lesson-panel-results").getByText(/Contrat TypeScript|TypeScript contract/)).toBeVisible();
});
