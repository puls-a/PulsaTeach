import { expect, test } from "@playwright/test";

test("quiz saves a reasoned answer, scores it and completes the lesson", async ({ page }) => {
  await page.goto("/#/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /label relié|label connected/ }).click();
  await page.getByLabel(/Explique ton choix|Explain your choice/).fill("Un label reste annoncé et décrit clairement le champ.");
  await page.getByRole("button", { name: /Valider|Check/ }).click();

  await expect(page.getByText(/Score final : 100|Final score: 100/)).toBeVisible();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
