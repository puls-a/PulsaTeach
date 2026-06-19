import { expect, test } from "@playwright/test";

test("Node API track validates a strict request schema", async ({ page }) => {
  await page.goto("/#/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Node\.js et API sécurisées|Node\.js and secure APIs/).first()).toBeVisible();

  await page.goto("/#/learn/node-api/node-http/node-02-validation", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Valider paramètres et body|Validate parameters and body/ }).first()).toBeVisible();
  await expect(page.getByText(/node-02-validation\.js/)).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "const schema = z.object({ name: z.string() }).strict();\nfunction validateBody(schema) {\n  return (request, response, next) => {\n    const result = schema.safeParse(request.body);\n    if (!result.success) return response.status(400).json({ error: { code: 'VALIDATION_ERROR' } });\n    request.body = result.data;\n    next();\n  };\n}"
  );
  await page.getByRole("button", { name: /Lancer|Run/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await expect(page.getByText(/Module Node\.js|Node\.js module/)).toBeVisible();
});
