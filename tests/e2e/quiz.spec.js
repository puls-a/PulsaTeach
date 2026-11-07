import { expect, test } from "@playwright/test";

test("quiz scores a focused answer and completes the lesson", async ({ page }) => {
  await page.goto("/learn/html/html-final-audit/html-09-final-exam");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await page.getByRole("button", { name: /présence du menu ne prouve pas|menu's presence does not prove/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Choisir les informations réelles|Choose the real visible-content facts/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Chaque fragment vise un id|Every fragment targets/ }).click();
  await page.getByRole("button", { name: /Caption, th scope, time et data|Caption, th scope, time, and data/ }).click();
  await page.getByRole("button", { name: /Labels, name et aria-describedby|Labels, name, and aria-describedby/ }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Faux|False/, exact: true }).click();
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await orderChoices(page, [
    /Lire le livrable comme une personne|Read the deliverable as a person/,
    /Parcourir les actions au clavier|Navigate actions with the keyboard/,
    /Inspecter les relations dans le DOM|Inspect relationships in the DOM/,
    /Exécuter les tests automatiques|Run automated tests/,
    /Comparer les métadonnées au contenu|Compare metadata with content/
  ]);
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByLabel(/Ta réponse|Your answer/).fill("Le clavier réel reste à tester dans le navigateur.");
  await page.getByRole("button", { name: /Valider|Check/ }).click();
  await page.getByRole("button", { name: /Question suivante|Next question/ }).click();
  await page.getByRole("button", { name: /Tester la navigation réelle au clavier|Test real keyboard navigation/ }).click();
  await page.getByRole("checkbox", { name: /Je confirme|I confirm/ }).check();
  const submissionRequest = page.waitForRequest((request) => request.method() === "POST" && request.url().includes("/api/quizzes/html-09-final-exam/submit"));
  await page.getByRole("button", { name: /Envoyer l’examen|Submit exam/ }).click();
  const payload = (await submissionRequest).postDataJSON();

  expect(payload).toEqual({ questionSetVersion: "html-09-final-exam:3", responses: expect.any(Object), rationales: expect.any(Object) });
  expect(payload).not.toHaveProperty("score");
  expect(payload).not.toHaveProperty("status");
  await expect(page.getByText(/Score final : 86|Final score: 86/)).toBeVisible();
  await expect(page.getByText(/6\/7 réponses correctes|6\/7 correct answers/)).toHaveCount(0);
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
