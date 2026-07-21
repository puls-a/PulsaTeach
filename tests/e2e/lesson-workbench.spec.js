import { expect, test } from "@playwright/test";

const pilotRoute = "/learn/javascript/js-functions-scope/js-functions-scope-declare-function";

test("lesson modes and CodeMirror support keyboard work without trapping focus", async ({ page }) => {
  await page.goto(pilotRoute, { waitUntil: "networkidle" });
  const learnTab = page.getByRole("tab", { name: /Comprendre|Learn/ });
  const codeTab = page.getByRole("tab", { name: /Coder|Code/ });
  const resultsTab = page.getByRole("tab", { name: /Résultats|Results/ });

  await expect(codeTab).toHaveAttribute("aria-selected", "true");
  await expect(codeTab).toHaveAttribute("tabindex", "0");
  await codeTab.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(learnTab).toBeFocused();
  await expect(learnTab).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(codeTab).toBeFocused();
  await expect(codeTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#lesson-panel-code")).toBeVisible();

  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await expect(editor).toHaveAttribute("aria-multiline", "true");
  await editor.fill("function getCurrencyLabel(code) { return code; }");
  await editor.press("Control+s");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("pulsateach-code-js-functions-scope-declare-function-fr"))).toContain("getCurrencyLabel");

  await editor.focus();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Tab");
  await expect(editor).not.toBeFocused();

  await resultsTab.focus();
  await page.keyboard.press("Home");
  await expect(learnTab).toBeFocused();
  await expect(learnTab).toHaveAttribute("aria-selected", "true");
});

test("curriculum lesson links open the editor and preserve browser history", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.goto("/learn/css/css-selectors-colors/css-selectors-colors-color", { waitUntil: "networkidle" });
  await expect(page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ })).toBeVisible();

  const nextLesson = page.getByRole("link", { name: /2\. Distinguer la carte par son fond|2\. Distinguish the card with its background/ });
  await expect(nextLesson).toHaveAttribute("href", "/learn/css/css-selectors-colors/css-selectors-colors-background");
  await nextLesson.click();
  await expect(page).toHaveURL(/css-selectors-colors-background$/);
  await expect(page.getByRole("heading", { level: 1, name: /2\. Distinguer la carte par son fond|2\. Distinguish the card with its background/ })).toBeVisible();
  await expect(page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/css-selectors-colors-color$/);
  await expect(page.getByRole("heading", { level: 1, name: /1\. Choisir une couleur de texte lisible|1\. Choose a readable text color/ })).toBeVisible();
});

test("the functions pilot starts with a real failure and ends with behavioral proof", async ({ page }) => {
  await page.goto(pilotRoute, { waitUntil: "networkidle" });
  await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });

  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  const resultsTab = page.getByRole("tab", { name: /Résultats|Results/ });
  await expect(resultsTab).toHaveAttribute("aria-selected", "true");
  await expect(resultsTab).toBeFocused();
  await expect(page.getByText("2/3", { exact: true })).toBeVisible();
  await expect(page.getByText(/EUR produit le symbole euro|EUR produces the euro symbol/)).toBeVisible();

  await page.getByRole("button", { name: /Retour au code|Back to code/ }).click();
  await editor.fill("function getCurrencyLabel(code) {\n  if (code === 'EUR') return '€';\n  return code;\n}");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("pulsateach-code-js-functions-scope-declare-function-fr"))).toContain("if (code === 'EUR')");
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText("3/3", { exact: true })).toBeVisible();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});

test("the mobile code mode keeps editor and preview inside the viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto(pilotRoute, { waitUntil: "networkidle" });
  await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await expect(editor).toBeVisible();
  const bounds = await page.locator(".cm-editor").boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);

  await page.getByRole("button", { name: /Aperçu|Preview/ }).click();
  await expect(editor).toBeHidden();
  await expect(page.getByText(/Aperçu live|Live preview/)).toBeVisible();
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});
