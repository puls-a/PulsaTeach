import { expect, test } from "@playwright/test";

test("local learner data stays isolated while accounts switch", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());

  await signIn(page, "learner-a@example.com");
  const learnerAOwner = await page.evaluate(() => localStorage.getItem("pulsateach-user-id"));
  await page.evaluate(() => {
    const owner = localStorage.getItem("pulsateach-user-id");
    localStorage.setItem(`pulsateach-note-isolation:owner:${encodeURIComponent(owner)}`, "learner a note");
  });

  await signOut(page);
  await signIn(page, "learner-b@example.com");
  const learnerBOwner = await page.evaluate(() => localStorage.getItem("pulsateach-user-id"));
  expect(learnerBOwner).not.toBe(learnerAOwner);
  expect(await readCurrentNote(page)).toBeNull();

  await signOut(page);
  await signIn(page, "learner-a@example.com");
  expect(await readCurrentNote(page)).toBe("learner a note");
});

async function signIn(page, email) {
  await page.goto("/auth");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel(/Mot de passe|Password/).fill("Password1");
  await page.getByRole("button", { name: /Se connecter|Sign in/ }).last().click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signOut(page) {
  await page.goto("/auth");
  await page.getByRole("button", { name: /Se déconnecter|Sign out/ }).click();
  await expect(page.getByRole("heading", { name: /Bon retour|Welcome back/ })).toBeVisible();
}

function readCurrentNote(page) {
  return page.evaluate(() => {
    const owner = localStorage.getItem("pulsateach-user-id");
    return localStorage.getItem(`pulsateach-note-isolation:owner:${encodeURIComponent(owner)}`);
  });
}
