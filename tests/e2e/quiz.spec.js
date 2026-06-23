import { expect, test } from "@playwright/test";

test("quiz scores a focused answer and completes the lesson", async ({ page }) => {
  await page.goto("/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /label relié|label connected/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /ne traite pas correctement|does not address/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Vrai|True/, exact: true }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Relire le contexte|Review the context/ }).click();
  await page.getByRole("button", { name: /preuve observable|observable evidence/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();

  await expect(page.getByText(/Score final : 100|Final score: 100/)).toBeVisible();
  await expect(page.getByText(/4\/4 réponses correctes|4\/4 correct answers/)).toBeVisible();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
