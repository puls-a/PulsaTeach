import { expect, test } from "@playwright/test";

test("React track loads on demand and validates a semantic component", async ({ page }) => {
  await page.goto("/#/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/React pour applications métier|React for business applications/).first()).toBeVisible();

  await page.goto("/#/learn/react/react-components/react-01-component", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Créer un composant sémantique|Create a semantic component/ }).first()).toBeVisible();
  await expect(page.getByText(/react-01-component\.jsx/)).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "function CourseCard({ title, href }) {\n  return <article><h2>{title}</h2><a href={href}>Ouvrir {title}</a></article>;\n}"
  );
  await page.getByRole("button", { name: /Lancer|Run/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
  await expect(page.getByText(/Composant React|React component/)).toBeVisible();
});
