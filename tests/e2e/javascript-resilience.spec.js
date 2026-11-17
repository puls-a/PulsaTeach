import { expect, test } from "@playwright/test";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";

const project = javascriptTrack.modules.find((item) => item.id === "js-async-resilience")
  .lessons.find((lesson) => lesson.id === "js-hardening-api-lab");
const route = "/learn/javascript/js-async-resilience/js-hardening-api-lab";
const counter = javascriptTrack.modules.find((item) => item.id === "js-dom-events")
  .lessons.find((lesson) => lesson.id === "js-04-dom-project");
const productionModule = javascriptTrack.modules.find((item) => item.id === "js-dom-production");
const modalLesson = productionModule.lessons.find((lesson) => lesson.id === "js-hardening-accessible-modal");
const taskLesson = productionModule.lessons.find((lesson) => lesson.id === "js-hardening-task-renderer");
const domFormsLesson = javascriptTrack.modules.find((item) => item.id === "js-dom-forms")
  .lessons.find((lesson) => lesson.id === "js-dom-forms-click-count");
const clickLesson = javascriptTrack.modules.find((item) => item.id === "js-dom-events")
  .lessons.find((lesson) => lesson.id === "js-04-events-manual");
const legacyDomModule = javascriptTrack.modules.find((item) => item.id === "js-dom-events");

test("API resilience project validates async behavior with the isolated mock network", async ({ page }, testInfo) => {
  await page.goto(route, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") {
    await page.getByRole("tab", { name: /Coder|Code/ }).click();
  }

  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(project.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${project.tests.length}/${project.tests.length}`, { exact: true })).toBeVisible();
  await expect(page.getByText(/Le dashboard termine le chargement|The dashboard finishes loading/)).toBeVisible();
});

test("counter project checks its state transition instead of code markers alone", async ({ page }, testInfo) => {
  await page.goto("/learn/javascript/js-dom-events/js-04-dom-project", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") {
    await page.getByRole("tab", { name: /Coder|Code/ }).click();
  }

  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(counter.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${counter.tests.length}/${counter.tests.length}`, { exact: true })).toBeVisible();
  await expect(page.getByText(/Le compteur augmente depuis son état courant|The counter increments from its current state/)).toBeVisible();
});

test("accessible modal supports focus return, Escape, and a live status", async ({ page }, testInfo) => {
  await page.goto("/learn/javascript/js-dom-production/js-hardening-accessible-modal", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(modalLesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${modalLesson.tests.length}/${modalLesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  const trigger = preview.getByRole("button", { name: "Ouvrir" });
  const dialog = preview.getByRole("dialog", { name: "Aide" });
  await expect(trigger).toHaveCount(1);
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(preview.getByRole("button", { name: "Fermer" })).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(preview.getByRole("status")).toHaveText("Aide ouverte");
  await preview.getByRole("button", { name: "Fermer" }).press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("task renderer adds, completes, removes, and announces a task", async ({ page }, testInfo) => {
  await page.goto("/learn/javascript/js-dom-production/js-hardening-task-renderer", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(taskLesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${taskLesson.tests.length}/${taskLesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  const input = preview.getByRole("textbox");
  const submit = preview.getByRole("button", { name: "Ajouter" });
  await expect(submit).toBeDisabled();
  await input.fill("Réviser les tests navigateur");
  await expect(submit).toBeEnabled();
  await submit.click();
  const task = preview.getByRole("listitem");
  await expect(task).toContainText("Réviser les tests navigateur");
  await expect(preview.getByRole("status")).toHaveText("Tâche ajoutée");
  await task.getByRole("button", { name: "Terminer" }).click();
  await expect(task).toHaveClass(/is-done/);
  await task.getByRole("button", { name: "Supprimer" }).click();
  await expect(preview.getByRole("listitem")).toHaveCount(0);
});

test("DOM lesson updates its visible counter in the isolated preview", async ({ page }, testInfo) => {
  await page.goto("/learn/javascript/js-dom-forms/js-dom-forms-click-count", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(domFormsLesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${domFormsLesson.tests.length}/${domFormsLesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  await preview.locator("#plus").click();
  await expect(preview.locator("#count")).toHaveText("1");
  await preview.locator("#plus").click();
  await expect(preview.locator("#count")).toHaveText("2");
});

test("legacy DOM lesson produces visible feedback on a real click", async ({ page }, testInfo) => {
  await page.goto("/learn/javascript/js-dom-events/js-04-events-manual", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(clickLesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${clickLesson.tests.length}/${clickLesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  await preview.locator("#plus").click();
  await expect(preview.getByRole("status")).toHaveText("Hello");
});

test("legacy DOM selection and text updates reach real preview elements", async ({ page }, testInfo) => {
  for (const [lessonId, selector, expectedText] of [
    ["js-04-dom-select-manual", "#app", "PulsaTeach app"],
    ["js-04-update-dom-manual", "#title", "PulsaTeach"]
  ]) {
    const lesson = legacyDomModule.lessons.find((item) => item.id === lessonId);
    await page.goto(`/learn/javascript/${legacyDomModule.id}/${lessonId}`, { waitUntil: "networkidle" });
    if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
    const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
    await editor.fill(lesson.solution);
    await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
    await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
    await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();
    await expect(page.frameLocator('iframe[title="PulsaTeach preview"]').locator(selector)).toHaveText(expectedText);
  }
});

test("DOM forms module lessons produce their promised browser-visible effects", async ({ page }, testInfo) => {
  const module = javascriptTrack.modules.find((item) => item.id === "js-dom-forms");
  const cases = [
    ["js-dom-forms-select-title", async (preview) => await expect(preview.locator("#title")).toHaveText("PulsaTeach JS")],
    ["js-dom-forms-render-list", async (preview) => await expect(preview.locator("#list li")).toHaveCount(2)],
    ["js-dom-forms-form-prevent", async (preview) => { await preview.locator("#form button").click(); await expect(preview.getByRole("status")).toHaveText("Submitted without reload"); }],
    ["js-dom-forms-input-value", async (preview) => await expect(preview.getByRole("status")).toHaveText("draft")],
    ["js-dom-forms-status-region", async (preview) => await expect(preview.getByRole("status")).toHaveText("Task added")],
    ["js-dom-forms-toggle-invalid", async (preview) => { const email = preview.locator("#email"); await expect(email).toHaveClass(/is-invalid/); await email.fill("learner@example.com"); await expect(email).not.toHaveClass(/is-invalid/); }],
    ["js-dom-forms-delegation", async (preview) => { await preview.locator("#tasks button").click(); await expect(preview.getByRole("status")).toHaveText("Task selected"); }]
  ];

  for (const [lessonId, verify] of cases) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    await page.goto(`/learn/javascript/${module.id}/${lessonId}`, { waitUntil: "networkidle" });
    if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
    const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
    await editor.fill(lesson.solution);
    await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
    await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
    await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();
    await verify(page.frameLocator('iframe[title="PulsaTeach preview"]'));
  }
});

test("storage event announces cross-tab changes in the DOM preview", async ({ page }, testInfo) => {
  const module = javascriptTrack.modules.find((item) => item.id === "js-storage-state");
  const lesson = module.lessons.find((item) => item.id === "js-storage-state-storage-event");
  await page.goto(`/learn/javascript/${module.id}/${lesson.id}`, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(lesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  await preview.locator("body").evaluate((body) => body.ownerDocument.defaultView.dispatchEvent(new StorageEvent("storage", { key: "progress" })));
  await expect(preview.getByRole("status")).toHaveText("progress");
});

test("capstone render lesson updates a real question card", async ({ page }, testInfo) => {
  const module = javascriptTrack.modules.find((item) => item.id === "js-capstone");
  const lesson = module.lessons.find((item) => item.id === "js-capstone-render-card");
  await page.goto(`/learn/javascript/${module.id}/${lesson.id}`, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(lesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const question = page.frameLocator('iframe[title="PulsaTeach preview"]').locator("#question");
  await question.evaluate((element) => element.ownerDocument.defaultView.renderCard({ question: "How does a closure retain state?" }));
  await expect(question).toHaveText("How does a closure retain state?");
});
