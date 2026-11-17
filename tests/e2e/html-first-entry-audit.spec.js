import { expect, test } from "@playwright/test";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const first = htmlPulsaConfModules[0].lessons[0];
const next = htmlPulsaConfModules[0].lessons[1];
const route = `/learn/html/html-getting-started/${first.id}`;

for (const locale of ["fr", "en"]) {
  test(`first HTML exercise explains failed checks and passes the official correction in a fresh ${locale} session`, async ({ page }, testInfo) => {
    await page.goto("/");
    if (locale === "en") await page.getByRole("button", { name: "Passer en anglais" }).click();
    const start = page.getByRole("link", { name: locale === "fr" ? /Premier exercice HTML · ~15 min/ : /First HTML exercise · ~15 min/ });
    await expect(start).toHaveAttribute("href", route);
    await start.click();
    await expect(page.getByRole("heading", { level: 1, name: first.title[locale] })).toBeVisible();
    await expect(page.getByText(locale === "fr" ? "Étape 1/79 du projet PulsaConf" : "Step 1/79 of the PulsaConf project")).toBeVisible();
    await expect(page.getByText(locale === "fr" ? /distincte des 83 leçons.*Fusionner l'étape.*sans être obligatoire/ : /separate from the 83 course lessons.*Merge step.*not required/)).toBeVisible();
    if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
    const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
    await expect(editor).toBeVisible();
    await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
    await expect(page.getByText("3/5", { exact: true })).toBeVisible();
    await expect(page.getByText(locale === "fr" ? /Entoure « PulsaConf 2026 » avec <h1>/ : /Wrap ‘PulsaConf 2026’ in <h1>/)).toBeVisible();
    await expect(page.getByText(locale === "fr" ? /Entoure la phrase de présentation avec <p>/ : /Wrap the introductory sentence in <p>/)).toBeVisible();
    await expect(page.getByText("Contrôle main titre")).toHaveCount(0);
    await expect(page.getByText("Contrôle event name")).toHaveCount(0);
    if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Comprendre|Learn/ }).click();
    await page.getByRole("button", { name: "Correction", exact: true }).click();
    await page.getByRole("button", { name: locale === "fr" ? "Charger cette solution dans l'éditeur" : "Load this solution in the editor" }).click();
    if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
    await expect(editor).toContainText("<h1>PulsaConf 2026</h1>");
    await expect(editor).toContainText(locale === "fr" ? "<p>Une journée pour apprendre le web.</p>" : "<p>A day to learn the web.</p>");
    await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
    await expect(page.getByText("5/5", { exact: true })).toBeVisible();
    await expect(page.getByText(locale === "fr" ? /Aucun main n'est demandé ici/ : /A main element is not required yet/)).toBeVisible();
    await page.getByRole("button", { name: /Leçon suivante|Next lesson/ }).click();
    await expect(page).toHaveURL(new RegExp(`${next.id}$`));
    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: next.title[locale] })).toBeVisible();
  });
}

test("autosave, optional merge and repeat validation preserve code and XP", async ({ page }, testInfo) => {
  await page.goto(route);
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  const code = `<main>${resolveLocaleValue(first.solution, "fr")}</main>`;
  await editor.fill(code);
  await expect(page.getByText("Sauvegardé", { exact: true })).toBeVisible();
  const snapshot = () => page.evaluate(() => {
    const owner = localStorage.getItem("pulsateach-user-id");
    return {
      progress: JSON.parse(localStorage.getItem(`pulsateach-learning-progress:owner:${encodeURIComponent(owner)}`) || "{}"),
      document: JSON.parse(localStorage.getItem(`pulsateach-project-thread-html-pulsaconf-premium:owner:${encodeURIComponent(owner)}`) || "{}")?.documents?.fr
    };
  });
  await expect.poll(async () => (await snapshot()).document?.code).toBe(code);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText("5/5", { exact: true })).toBeVisible();
  const afterPass = await snapshot();
  expect(afterPass.progress.completed[first.id]).toBeTruthy();
  await page.getByRole("button", { name: /Leçon suivante|Next lesson/ }).click();
  await expect(page).toHaveURL(new RegExp(`${next.id}$`));
  await page.goto(route);
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  await expect(editor).toContainText("<main>");
  await page.getByRole("button", { name: /Fusionner l'étape|Merge step/ }).click();
  const merged = await snapshot();
  expect(merged.document.version).toBe(afterPass.document.version + 1);
  await page.getByRole("button", { name: /Fusionner l'étape|Merge step/ }).click();
  const repeated = await snapshot();
  expect(repeated.document.version).toBe(merged.document.version);
  expect(repeated.document.checkpoints).toHaveLength(1);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText("5/5", { exact: true })).toBeVisible();
  expect((await snapshot()).progress.xp).toBe(afterPass.progress.xp);
});

test("validating immediately after editing flushes the shared document before moving on", async ({ page }, testInfo) => {
  await page.goto(route);
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  const code = `<main>${resolveLocaleValue(first.solution, "fr")}</main>`;
  await editor.fill(code);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText("5/5", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Leçon suivante|Next lesson/ }).click();
  await expect(page).toHaveURL(new RegExp(`${next.id}$`));
  await page.reload();
  await page.goto(route);
  const stored = await page.evaluate(() => {
    const owner = localStorage.getItem("pulsateach-user-id");
    const document = JSON.parse(localStorage.getItem(`pulsateach-project-thread-html-pulsaconf-premium:owner:${encodeURIComponent(owner)}`) || "{}");
    return document.documents?.fr?.code;
  });
  expect(stored).toBe(code);
});

test("catalog course links identify their destination and the lesson title is localized", async ({ page }) => {
  for (const [locale, switchButton, linkName, title] of [
    ["fr", null, "Voir le programme : HTML interactif", first.title.fr],
    ["en", "Passer en anglais", "View curriculum: Interactive HTML", first.title.en]
  ]) {
    await page.goto("/catalog");
    if (switchButton) await page.getByRole("button", { name: switchButton }).click();
    const curriculum = page.getByRole("link", { name: linkName });
    await expect(curriculum).toHaveAttribute("href", "/formations/html");
    await curriculum.click();
    await page.getByRole("link", { name: /Démarrer maintenant|Start now/ }).click();
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page).toHaveTitle(new RegExp(title));
    if (locale === "en") await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
});
