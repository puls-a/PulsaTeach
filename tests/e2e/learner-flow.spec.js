import { expect, test } from "@playwright/test";

test("account, onboarding, lesson and progress dashboard", async ({ page }) => {
  await page.goto("/#/signup");
  await page.getByLabel("Email").fill(`learner-${Date.now()}@example.test`);
  await page.getByLabel(/Mot de passe|Password/).fill("TestPassword123!");
  await page.getByRole("button", { name: /Créer mon compte|Create my account/ }).click();

  await expect(page).toHaveURL(/#\/onboarding/);
  await page.getByLabel(/Nom affiché|Display name/).fill("Learner E2E");
  await page.getByRole("button", { name: /Continuer|Continue/ }).click();
  await page.getByRole("button", { name: /Comprendre les bases|Learn foundations/ }).click();
  await page.getByRole("button", { name: /Continuer|Continue/ }).click();
  await page.getByRole("button", { name: /120 min/ }).click();
  await page.getByRole("button", { name: /Commencer mon parcours|Start my path/ }).click();

  await expect(page).toHaveURL(/#\/dashboard/);
  await page.evaluate(() => {
    globalThis.localStorage.setItem("pulsateach-learning-progress", JSON.stringify({
      xp: 25,
      completed: {
        "html-01-document-skeleton": {
          passedAt: new Date().toISOString(),
          xp: 25,
          passedTests: 5
        }
      },
      activity: []
    }));
  });
  await page.reload();
  await expect(page.getByText("25", { exact: true }).first()).toBeVisible();

  await page.goto("/#/learn/html/html-foundations/html-01-document-skeleton");
  await expect(page.getByText(/Le squelette d'une page|Document skeleton/).first()).toBeVisible();
  await expect(page.getByText(/Aperçu live|Live preview/).first()).toBeVisible();
});

test("mobile navigation exposes the essential learner routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/#/catalog");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("link", { name: /Formations|Courses/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Continuer|Continue/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Progrès|Progress/ }).first()).toBeVisible();
});
