import { expect, test } from "@playwright/test";

test("security track validates strict untrusted input handling", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Sécurité web appliquée|Applied web security/).first()).toBeVisible();

  await page.goto("/learn/web-security/security-threats-input/sec-01-validation", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Valider une entrée non fiable|Validate untrusted input/ }).first()).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "function isHttpUrl(value) { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } }\nconst httpUrl = z.string().url().max(500).refine(isHttpUrl);\nconst schema = z.object({ projectId: z.string().uuid(), repositoryUrl: httpUrl, note: z.string().max(2000), visibility: z.enum(['private']) }).strict();\nconst result = schema.safeParse(request.body);\nif (!result.success) return response.status(400).json({ error: 'VALIDATION_ERROR' });\nrequest.body = result.data;"
  );
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
