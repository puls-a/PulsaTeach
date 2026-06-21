import { expect, test } from "@playwright/test";

test("a failed quiz question enters spaced review and receives a new due date", async ({ page }) => {
  await page.goto("/#/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /placeholder seulement|placeholder only/ }).click();
  await page.getByLabel(/Explique ton choix|Explain your choice/).fill("Je vérifie volontairement le chemin de reprise après une erreur.");
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await expect(page.getByText(/Score final : 0|Final score: 0/)).toBeVisible();

  await page.goto("/#/review");
  await expect(page.getByRole("heading", { name: /Révisions espacées|Spaced reviews/ })).toBeVisible();
  await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: /Commencer la révision|Start review/ }).click();
  await expect(page.getByRole("heading", { name: /Quel élément rend|Which element makes/ })).toBeVisible();

  await page.getByRole("button", { name: /label relié|label connected/ }).click();
  await page.getByRole("button", { name: /Vérifier ma réponse|Check my answer/ }).click();
  await expect(page.getByText(/Bonne réponse|Correct answer/)).toBeVisible();
  await page.getByRole("button", { name: /Facile|Easy/ }).click();
  await expect(page.getByRole("heading", { name: /Session terminée|Session complete/ })).toBeVisible();

  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem("pulsateach-learning-progress")));
  expect(progress.review.items["html-10-accessibility-quiz:html-10-accessibility-quiz-question-1"]).toMatchObject({
    repetitions: 1,
    intervalDays: 3,
    confidence: 1
  });
});
