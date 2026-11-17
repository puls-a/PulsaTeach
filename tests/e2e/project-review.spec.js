import { expect, test } from "@playwright/test";
import { htmlTrack } from "../../src/content/htmlTrack.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

test("learner resubmits a project after contextual review", async ({ page, request }) => {
  const stamp = Date.now();
  const projectId = "html-09-final-project-pulsaconf";
  const title = `Portfolio ${stamp}`;
  const headers = { "X-PulsaTeach-Admin-Key": "dev-admin-key" };
  const createdIds = [];

  try {
    await page.goto("/projects");
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.getByLabel(/Projet du parcours|Curriculum project/).selectOption(projectId);
    await page.getByLabel(/Titre|Title/).fill(title);
    await page.getByLabel(/Dépôt Git|Git repository/).fill("https://github.com/example/portfolio");
    await page.getByLabel(/Auto-évaluation|Self-assessment/).fill("Le projet respecte sa première définition de terminé.");
    await page.getByRole("button", { name: /Soumettre|Submit/ }).click();
    await expect(page.getByText("v1", { exact: true })).toBeVisible();

    let submissions = await (await request.get("http://127.0.0.1:4188/api/submissions", { headers })).json();
    const first = submissions.find((item) => item.projectId === projectId && item.title === title);
    expect(first.reviewRevision).toBe(0);
    createdIds.push(first.id);
    await request.patch(`http://127.0.0.1:4188/api/submissions/${first.id}/review`, {
      headers: { ...headers, "Content-Type": "application/json" },
      data: {
        status: "changes_requested",
        expectedVersion: 1,
        expectedReviewRevision: 0,
        score: 60,
        feedback: "Documente le focus clavier et le responsive.",
        rubric: { accessibility: 55, responsiveness: 65 },
        contextualComments: { accessibility: "Ajoute une preuve clavier." }
      }
    });

    await page.reload();
    await expect(page.getByText("Documente le focus clavier et le responsive.").first()).toBeVisible();
    await page.getByLabel(/Projet du parcours|Curriculum project/).selectOption(projectId);
    await page.getByLabel(/Titre|Title/).fill(`${title} corrigé`);
    await page.getByLabel(/Dépôt Git|Git repository/).fill("https://github.com/example/portfolio");
    await page.getByLabel(/Auto-évaluation|Self-assessment/).fill("Les preuves clavier et responsive sont maintenant documentées.");
    await page.getByRole("button", { name: /Soumettre|Submit/ }).click();
    await expect(page.getByText("v2", { exact: true })).toBeVisible();

    submissions = await (await request.get("http://127.0.0.1:4188/api/submissions", { headers })).json();
    const second = submissions.find((item) => item.projectId === projectId && item.title === `${title} corrigé` && item.version === 2);
    createdIds.push(second.id);
    expect(second.supersedesId).toBe(first.id);
    expect(second.reviewRevision).toBe(0);
    await request.patch(`http://127.0.0.1:4188/api/submissions/${second.id}/review`, {
      headers: { ...headers, "Content-Type": "application/json" },
      data: { status: "approved", expectedVersion: 2, expectedReviewRevision: 0, score: 85, feedback: "Version approuvée." }
    });
    await page.reload();
    await expect(page.getByRole("link", { name: "Certification" })).toHaveAttribute("href", "/certification");
  } finally {
    for (const id of createdIds) {
      await request.delete(`http://127.0.0.1:4188/api/submissions/${id}`, { headers });
    }
  }
});

test("a passed lesson project carries its canonical identity into submission", async ({ page }, testInfo) => {
  const lesson = htmlTrack.modules.flatMap((module) => module.lessons).find((item) => item.id === "html-09-final-project-pulsaconf");
  await page.goto("/learn/html/html-final-audit/html-09-final-project-pulsaconf", { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(resolveLocaleValue(lesson.solution, "fr"));
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
  const submit = page.getByRole("link", { name: /Soumettre|Submit/ });
  await expect(submit).toHaveAttribute("href", "/projects?projectId=html-09-final-project-pulsaconf#nouvelle-soumission");
  await submit.click();
  await expect(page).toHaveURL(/\/projects\?projectId=html-09-final-project-pulsaconf#nouvelle-soumission$/);
  await expect(page.getByLabel(/Projet du parcours|Curriculum project/)).toHaveValue("html-09-final-project-pulsaconf");

  await page.getByLabel(/Titre|Title/).fill("PulsaConf");
  await page.getByRole("button", { name: /Soumettre|Submit/ }).click();
  await expect(page.getByLabel(/Dépôt Git|Git repository/)).toBeFocused();
});
