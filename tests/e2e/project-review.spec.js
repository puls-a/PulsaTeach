import { expect, test } from "@playwright/test";

test("learner resubmits a project after contextual review", async ({ page, request }) => {
  const stamp = Date.now();
  const projectId = `portfolio-${stamp}`;
  const title = `Portfolio ${stamp}`;
  const headers = { "X-PulsaTeach-Admin-Key": "dev-admin-key" };
  const createdIds = [];

  try {
    await page.goto("/projects");
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.getByLabel("Project ID").fill(projectId);
    await page.getByLabel(/Titre|Title/).fill(title);
    await page.getByLabel(/Dépôt Git|Git repository/).fill("https://github.com/example/portfolio");
    await page.getByLabel(/Auto-évaluation|Self-assessment/).fill("Le projet respecte sa première définition de terminé.");
    await page.getByRole("button", { name: /Soumettre|Submit/ }).click();
    await expect(page.getByText("v1", { exact: true })).toBeVisible();

    let submissions = await (await request.get("http://127.0.0.1:4188/api/submissions", { headers })).json();
    const first = submissions.find((item) => item.projectId === projectId);
    createdIds.push(first.id);
    await request.patch(`http://127.0.0.1:4188/api/submissions/${first.id}/review`, {
      headers: { ...headers, "Content-Type": "application/json" },
      data: {
        status: "changes_requested",
        expectedVersion: 1,
        score: 60,
        feedback: "Documente le focus clavier et le responsive.",
        rubric: { accessibility: 55, responsiveness: 65 },
        contextualComments: { accessibility: "Ajoute une preuve clavier." }
      }
    });

    await page.reload();
    await expect(page.getByText("Documente le focus clavier et le responsive.").first()).toBeVisible();
    await page.getByLabel("Project ID").fill(projectId);
    await page.getByLabel(/Titre|Title/).fill(`${title} corrigé`);
    await page.getByLabel(/Auto-évaluation|Self-assessment/).fill("Les preuves clavier et responsive sont maintenant documentées.");
    await page.getByRole("button", { name: /Soumettre|Submit/ }).click();
    await expect(page.getByText("v2", { exact: true })).toBeVisible();

    submissions = await (await request.get("http://127.0.0.1:4188/api/submissions", { headers })).json();
    const second = submissions.find((item) => item.projectId === projectId && item.version === 2);
    createdIds.push(second.id);
    expect(second.supersedesId).toBe(first.id);
  } finally {
    for (const id of createdIds) {
      await request.delete(`http://127.0.0.1:4188/api/submissions/${id}`, { headers });
    }
  }
});
