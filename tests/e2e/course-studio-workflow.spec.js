import { expect, test } from "@playwright/test";
import { createLessonDraft, createModuleDraft } from "../../src/courseSchema.js";

test("Course Studio reviews, publishes and rolls back an immutable version history", async ({ page, request }) => {
  test.setTimeout(45_000);
  const headers = { "X-PulsaTeach-Admin-Key": "dev-admin-key", "Content-Type": "application/json" };
  const titlePrefix = `Formation workflow E2E ${test.info().project.name}-`;
  const existingResponse = await request.get("http://127.0.0.1:4188/api/courses", { headers });
  for (const course of await existingResponse.json()) {
    if (course.title?.fr?.startsWith(titlePrefix)) {
      await request.delete(`http://127.0.0.1:4188/api/courses/${course.id}`, { headers });
    }
  }
  const title = `${titlePrefix}${Date.now()}`;
  const module = createModuleDraft(0);
  module.title = { fr: "Module versionné", en: "Versioned module" };
  const lesson = createLessonDraft("html", 0);
  lesson.title = { fr: "Leçon versionnée", en: "Versioned lesson" };
  lesson.brief = { fr: "Crée un titre principal.", en: "Create a main heading." };
  lesson.course.fr.introduction = "Cette leçon vérifie le workflow éditorial complet.";
  lesson.tests = [{ type: "selector", label: "Titre h1", value: "h1", amount: 1 }];
  module.lessons = [lesson];

  const createdResponse = await request.post("http://127.0.0.1:4188/api/courses", {
    headers,
    data: {
      title: { fr: title, en: `E2E workflow course ${test.info().project.name}` },
      description: { fr: "Publier et restaurer sans perdre l’historique.", en: "Publish and restore without losing history." },
      curriculum: { modules: [module] }
    }
  });
  expect(createdResponse.ok()).toBeTruthy();
  const created = await createdResponse.json();

  try {
    await page.goto("/#/studio");
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();

    await page.getByText(title).first().click();
    await expect(page.getByRole("heading", { name: /Historique · version 1|History · version 1/ })).toBeVisible();
    await page.getByRole("button", { name: "Review", exact: true }).click();
    await expect(page.getByText("review", { exact: true }).last()).toBeVisible();

    await page.getByRole("button", { name: /Approuver|Approve/ }).click();
    await expect(page.getByText("approved", { exact: true }).last()).toBeVisible();
    await page.getByRole("button", { name: /Publier|Publish/ }).click();
    await expect(page.getByText("published", { exact: true }).last()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Historique · version 4|History · version 4/ })).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());
    const versionOne = page.getByRole("button", { name: /v1 · draft/ }).locator("..");
    const rollback = versionOne.getByRole("button", { name: "Rollback" });
    await rollback.scrollIntoViewIfNeeded();
    await rollback.click();
    await expect(page.getByRole("heading", { name: /Historique · version 5|History · version 5/ })).toBeVisible();
    await expect(page.getByText("draft", { exact: true }).last()).toBeVisible();
  } finally {
    await request.delete(`http://127.0.0.1:4188/api/courses/${created.id}`, { headers });
  }
});
