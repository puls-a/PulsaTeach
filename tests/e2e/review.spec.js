import { expect, test } from "@playwright/test";

test("a failed quiz question enters spaced review and receives a new due date", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /placeholder seulement|placeholder only/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /réponse est recommandée|answer is recommended/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /Faux|False/, exact: true }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /uniquement à l’apparence|only on appearance/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByRole("button", { name: /Descendre|Move down/ }).first().click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();

  await page.getByLabel(/Ta réponse|Your answer/).fill("apparence uniquement");
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await expect(page.getByText(/Score final : 0|Final score: 0/)).toBeVisible();
  await page.waitForFunction(() => {
    const progress = JSON.parse(localStorage.getItem("pulsateach-learning-progress") || "{}");
    return Object.keys(progress.review?.items || {}).length === 6;
  });

  await page.goto("/review");
  await expect(page.getByRole("heading", { name: /Révisions espacées|Spaced reviews/ })).toBeVisible();
  await expect(page.getByText("6", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: /Commencer la révision|Start review/ }).click();
  await expect(page.getByRole("heading", { name: /Quel élément rend|Which element makes/ })).toBeVisible();

  await page.getByRole("button", { name: /label relié|label connected/ }).click();
  await page.getByRole("button", { name: /Vérifier ma réponse|Check my answer/ }).click();
  await expect(page.getByText(/Bonne réponse|Correct answer/)).toBeVisible();
  await page.getByRole("button", { name: /Facile|Easy/ }).click();
  await expect(page.getByText(/Question 2 sur 6|Question 2 of 6/)).toBeVisible();

  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem("pulsateach-learning-progress")));
  expect(progress.review.items["html-10-accessibility-quiz:html-10-accessibility-quiz-question-1"]).toMatchObject({
    repetitions: 1,
    intervalDays: 3,
    confidence: 1
  });
});
