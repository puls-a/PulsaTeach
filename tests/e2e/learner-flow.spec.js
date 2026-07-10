import { expect, test } from "@playwright/test";

test("account, onboarding, lesson and progress dashboard", async ({ page }) => {
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

  await page.goto("/learn/html/html-foundations/html-01-document-skeleton");
  await expect(page.getByText(/Le squelette d'une page|Document skeleton/).first()).toBeVisible();
  await expect(page.getByText(/Aperçu live|Live preview/).first()).toBeVisible();
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
  await expect(page.getByRole("heading", { name: /Choisis une formation|Choose a course/ })).toBeVisible();
});

test("tools lesson opens without guide rendering errors", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");
  await acceptPrivacy(page);
  await expect(page.getByRole("heading", { name: /Éditeur : VS Code & Cursor|Editor: VS Code & Cursor/ }).first()).toBeVisible();
  await expect(page.getByText(/Installer l'outil sans étape cachée|Install the tool without hidden steps/)).toBeVisible();
  await expect(page.getByRole("img", { name: "VS Code Logo" })).toBeVisible();
  await expect(page.getByRole("img", { name: "VS Code Logo" })).toHaveAttribute("src", /\/assets\/tool-vscode\.svg$/);
  await expect(page.getByRole("link", { name: "cursor.sh" })).toHaveAttribute("href", "https://cursor.sh");
  await expect(page.getByRole("link", { name: "cursor.sh" })).toHaveAttribute("rel", /noopener noreferrer/);
  await expect(page.getByText("<img", { exact: false })).toHaveCount(0);
  await page.getByRole("button", { name: /Indice 1|Next hint/ }).click();
  await page.getByRole("button", { name: /Indice 2|Next hint/ }).click();
  const hints = page.getByRole("heading", { name: /Indices débloqués progressivement|Progressive hints/ }).locator("xpath=ancestor::section[1]");
  await expect(hints.locator("li")).toHaveCount(2);
  await expect(hints).toContainText(/Ouvre le lien|Click link/);
  await expect(hints).toContainText(/Suis l'installateur|Install/);
  expect(pageErrors).toEqual([]);
});

async function acceptPrivacy(page) {
  const button = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await button.isVisible()) await button.click();
}
