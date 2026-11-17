import { expect, test } from "@playwright/test";
import { htmlTrack } from "../../src/content/htmlTrack.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

test("account creation and onboarding reach the learner dashboard", async ({ page }) => {
  await page.goto("/signup");
  await acceptPrivacy(page);
  await page.getByLabel(/Nom affiché|Display name/).fill("Learner E2E");
  await page.getByLabel("Email").fill(`learner-${Date.now()}@example.test`);
  await page.getByLabel(/Mot de passe|Password/).fill("TestPassword123!");
  await page.getByRole("checkbox", { name: /J’accepte les|I accept the/ }).check();
  await page.getByRole("button", { name: /Créer mon compte gratuit|Create my free account/ }).click();

  await expect(page).toHaveURL(/\/onboarding$/);
  await page.getByLabel(/Nom affiché|Display name/).fill("Learner E2E");
  await page.getByRole("button", { name: /Continuer|Continue/ }).click();
  await page.getByRole("button", { name: /Comprendre les bases|Learn foundations/ }).click();
  await page.getByRole("button", { name: /Continuer|Continue/ }).click();
  await page.getByRole("button", { name: /120 min/ }).click();
  await page.getByRole("button", { name: /Commencer mon parcours|Start my path/ }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: /voici ta prochaine étape|here is your next step/i })).toBeVisible();
});

test("catalog entry, first lesson completion, and dashboard resume use real learner progress", async ({ page }, testInfo) => {
  const firstModule = htmlTrack.modules[0];
  const firstLesson = firstModule.lessons[0];
  const nextLesson = firstModule.lessons[1];
  await page.goto("/catalog");
  await acceptPrivacy(page);

  const htmlCourse = page.locator("article").filter({ has: page.getByRole("heading", { name: /HTML interactif|Interactive HTML/ }) });
  await htmlCourse.getByRole("link", { name: /Voir le programme|View curriculum/ }).click();
  await expect(page).toHaveURL(/\/formations\/html$/);
  await page.getByRole("link", { name: /Démarrer maintenant|Start now/ }).click();
  await expect(page).toHaveURL(new RegExp(`/learn/html/${firstModule.id}/${firstLesson.id}$`));
  await expect(page.getByRole("heading", { level: 1, name: firstLesson.title.fr })).toBeVisible();

  if (testInfo.project.name === "mobile-chromium") {
    await expect(page.getByRole("tab", { name: /Comprendre|Learn/ })).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: /Coder|Code/ }).click();
  }
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await expect(editor).toBeVisible();
  await editor.fill(resolveLocaleValue(firstLesson.solution, "fr"));
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${firstLesson.tests.length}/${firstLesson.tests.length}`, { exact: true })).toBeVisible();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();

  const progressStored = await page.evaluate((lessonId) => {
    const owner = localStorage.getItem("pulsateach-user-id");
    const progress = JSON.parse(localStorage.getItem(`pulsateach-learning-progress:owner:${encodeURIComponent(owner)}`) || "{}");
    return Boolean(progress.completed?.[lessonId]);
  }, firstLesson.id);
  expect(progressStored).toBe(true);

  await page.goto("/dashboard");
  const resume = page.locator(`a[href="/learn/html/${firstModule.id}/${nextLesson.id}"]`);
  await expect(resume).toBeVisible();
  await resume.click();
  await expect(page).toHaveURL(new RegExp(`/learn/html/${firstModule.id}/${nextLesson.id}$`));
  await expect(page.getByRole("heading", { level: 1, name: nextLesson.title.fr })).toBeVisible();
});

test("direct auth callback route loads the application instead of a 404", async ({ page }) => {
  await page.goto("/auth/callback");
  await acceptPrivacy(page);
  await expect(page).toHaveURL(/\/auth\/callback/);
  await expect(page.getByText(/Connecte-toi pour personnaliser|Sign in to personalize/)).toBeVisible();
});

test("signup form explains validation and login methods", async ({ page }) => {
  await page.goto("/signup");
  await acceptPrivacy(page);
  await expect(page.getByRole("tab", { name: /Connexion|Sign in/ })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Créer un compte|Create account/ })).toBeVisible();
  await page.getByLabel(/Nom affiché|Display name/).fill("Camille");
  await page.getByLabel("Email").fill("camille@example.test");
  await page.getByLabel(/Mot de passe|Password/).fill("court");
  await page.getByRole("checkbox", { name: /J’accepte les|I accept the/ }).check();
  await page.getByRole("button", { name: /Créer mon compte gratuit|Create my free account/ }).click();
  await expect(page.getByText(/ne respecte pas encore|does not meet/)).toBeVisible();

  await page.getByRole("tab", { name: /Connexion|Sign in/ }).click();
  await page.getByRole("button", { name: /Lien magique|Magic link/ }).click();
  await expect(page.getByRole("button", { name: /Recevoir mon lien|Send my link/ })).toBeVisible();
});

test("mobile navigation exposes the essential learner routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/catalog");
  await acceptPrivacy(page);
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("link", { name: /Formations|Courses/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Continuer|Continue/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Progrès|Progress/ }).first()).toBeVisible();
});

test("legacy hash links migrate to clean URLs", async ({ page }) => {
  await page.goto("/#/catalog");
  await acceptPrivacy(page);
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.getByRole("heading", { name: /Choisis selon ce que tu veux faire|Choose based on what you want to do/ })).toBeVisible();
});

test("tools lesson opens without workstation rendering errors", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");
  await acceptPrivacy(page);
  await expect(page.getByRole("heading", { name: /Choisir son espace de travail|Choose your workspace/ }).first()).toBeVisible();
  await expect(page.getByText("<img", { exact: false })).toHaveCount(0);
  await page.getByRole("button", { name: /Créer le dossier|Create folder/ }).click();
  await expect(page.getByRole("button", { name: /Créer index.html|Create index.html/ })).toBeEnabled();
  expect(pageErrors).toEqual([]);
});

test("browser history navigation synchronizes the active lesson", async ({ page }) => {
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");
  await acceptPrivacy(page);
  await expect(page.getByRole("heading", { name: /Choisir son espace de travail|Choose your workspace/ }).first()).toBeVisible();
  await page.evaluate(() => {
    window.history.pushState(null, "", "/learn/html/html-getting-started/html-00-what-html-does");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(page.getByRole("heading", { name: /Ce que HTML fait vraiment|What HTML really does/ }).first()).toBeVisible();
});

async function acceptPrivacy(page) {
  const button = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await button.isVisible()) await button.click();
}
