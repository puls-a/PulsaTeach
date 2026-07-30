import { expect, test } from "@playwright/test";

test("a failed protected exam does not expose questions in spaced review", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/learn/html/html-final-audit/html-09-final-exam");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /code est prêt|code is ready/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /balises au hasard|random tags/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /rendu qui semble correct|rendering that looks right/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /Vrai|True/, exact: true }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /Descendre|Move down/ }).first().click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByLabel(/Ta réponse|Your answer/).fill("apparence uniquement");
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await expect(page.getByText(/Score final : 0|Final score: 0/)).toBeVisible();
  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem("pulsateach-learning-progress") || "{}"));
  expect(progress.review?.items || {}).toEqual({});

  await page.goto("/review");
  await expect(page.getByRole("heading", { name: /Révisions espacées|Spaced reviews/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Aucune révision en attente|No reviews due/ })).toBeDisabled();
});
