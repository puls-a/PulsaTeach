import { expect, test } from "@playwright/test";

test("Workstation persists a real edit through save and preview reload", async ({ page }) => {
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");

  await page.getByRole("button", { name: /Créer le dossier|Create folder/ }).click();
  await page.getByRole("button", { name: /Créer index.html|Create index.html/ }).click();

  const editor = page.getByRole("textbox", { name: "index.html" });
  await editor.fill("<main><h1>Preuve réelle</h1></main>");
  await page.getByRole("button", { name: /Enregistrer|Save/ }).click();
  await page.getByRole("button", { name: /Recharger l'aperçu|Reload preview/ }).click();

  const preview = page.frameLocator('iframe[title="Aperçu index.html"]');
  await expect(preview.getByRole("heading", { name: "Preuve réelle" })).toBeVisible();
  await expect(page.getByText(/Observer le résultat|Observe result/).first().locator("..")).toHaveClass(/emerald/);

  await page.reload();
  await expect(page.getByRole("textbox", { name: "index.html" })).toHaveValue("<main><h1>Preuve réelle</h1></main>");
  await expect(page.frameLocator('iframe[title="Aperçu index.html"]').getByRole("heading", { name: "Preuve réelle" })).toBeVisible();
});
