import { expect, test } from "@playwright/test";
import { jsValidationHardeningModule } from "../../src/content/jsValidationModule.js";

const module = jsValidationHardeningModule;
const score = module.lessons.find((lesson) => lesson.id === "js-hardening-score-boundaries");
const project = module.lessons.find((lesson) => lesson.id === "js-hardening-validation-lab");

async function editorFor(page, lesson, testInfo) {
  await page.goto(`/learn/javascript/${module.id}/${lesson.id}`, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  return page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
}

test("scoring rejects a rounded 69.5% before accepting the actual 70% threshold", async ({ page }, testInfo) => {
  const editor = await editorFor(page, score, testInfo);
  await editor.fill(score.solution.replace("passed: correct / total >= 0.7", "passed: percent >= 70"));
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText("2/3", { exact: true })).toBeVisible();
  await expect(page.getByText(/L'arrondi n'abaisse pas le seuil réel|Rounding never lowers the real threshold/)).toBeVisible();
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  await editor.fill(score.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText("3/3", { exact: true })).toBeVisible();
});

test("enrollment lab refuses invalid inputs and accepts the composed solution", async ({ page }, testInfo) => {
  const editor = await editorFor(page, project, testInfo);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`0/${project.tests.length}`, { exact: true }).first()).toBeVisible();
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  await editor.fill(project.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${project.tests.length}/${project.tests.length}`, { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Soumettre|Submit/ })).toHaveAttribute("href", `/projects?projectId=${project.id}#nouvelle-soumission`);
});
