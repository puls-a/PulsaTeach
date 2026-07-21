import { expect, test } from "@playwright/test";

test("DevOps track validates a deterministic release command sequence", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Déploiement et DevOps web|Web deployment and DevOps/).first()).toBeVisible();

  await page.goto("/learn/devops-deployment/ops-foundations/ops-01-build", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Créer un build déterministe|Create a deterministic build/ }).first()).toBeVisible();
  await page.getByRole("tab", { name: /Coder|Code/ }).click();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "node --version\nnpm ci\nnpm audit --audit-level=high\nnpm run lint\nnpm test\nnpm run build\nnpm run audit:bundle\nGet-FileHash package-lock.json\nGet-ChildItem dist -Recurse"
  );
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await expect(page.locator("#lesson-panel-results").getByText(/Terminal simulé|Simulated terminal/)).toBeVisible();
});
