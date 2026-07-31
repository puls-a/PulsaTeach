import { expect, test } from "@playwright/test";

test("quiz scores a focused answer and completes the lesson", async ({ page }) => {
  await page.goto("/learn/html/html-final-audit/html-09-final-exam");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /livrable final mélange|final deliverable mixes/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Auditer landmarks|Audit landmarks/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /projet final réussi|successful final project/ }).click();
  await page.getByRole("button", { name: /impact concret|concrete impact/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Faux|False/, exact: true }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await orderChoices(page, [
    /Identifier le contenu|Identify the content/,
    /Appliquer|Apply/,
    /Inspecter la preuve|Inspect the evidence/,
    /Expliquer l['’]impact|Explain the user impact/
  ]);
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByLabel(/Ta réponse|Your answer/).fill("Le DOM fournit une preuve observable.");
  await page.getByRole("checkbox", { name: /Je confirme|I confirm/ }).check();
  const submissionRequest = page.waitForRequest((request) => request.method() === "POST" && request.url().includes("/api/quizzes/html-09-final-exam/submit"));
  await page.getByRole("button", { name: /Envoyer l’examen|Submit exam/ }).click();
  const payload = (await submissionRequest).postDataJSON();

  expect(payload).toEqual({ questionSetVersion: "html-09-final-exam:2", responses: expect.any(Object), rationales: expect.any(Object) });
  expect(payload).not.toHaveProperty("score");
  expect(payload).not.toHaveProperty("status");
  await expect(page.getByText(/Score final : 83|Final score: 83/)).toBeVisible();
  await expect(page.getByText(/5\/6 réponses correctes|5\/6 correct answers/)).toHaveCount(0);
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});

async function orderChoices(page, labels) {
  const list = page.getByRole("dialog").locator("ol").last();
  for (const [targetIndex, label] of labels.entries()) {
    const item = list.getByRole("listitem").filter({ hasText: label });
    let currentIndex = await item.evaluate((element) => Array.from(element.parentElement.children).indexOf(element));
    while (currentIndex > targetIndex) {
      await item.getByRole("button", { name: /Monter|Move .+ up/ }).click();
      currentIndex -= 1;
    }
  }
}
