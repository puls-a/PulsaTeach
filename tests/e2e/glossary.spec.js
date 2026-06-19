import { expect, test } from "@playwright/test";

test("glossary searches, filters and opens a lesson-linked term", async ({ page }) => {
  await page.goto("/#/glossary");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page.getByRole("heading", { name: /Retrouve chaque notion|Find every concept/ })).toBeVisible();
  await page.getByPlaceholder(/Ex\. DOM|e\.g\. DOM/).fill("Balise");
  const termLink = page.getByRole("link", { name: /Voir le terme|View term/ }).first();
  await expect(termLink).toBeVisible();
  await termLink.click();

  await expect(page).toHaveURL(/#\/glossary\//);
  await expect(page.getByRole("heading", { level: 2, name: /Leçons associées|Related lessons/ })).toBeVisible();
  const lessonLink = page.getByRole("link", { name: /html-01-document-skeleton/ });
  await expect(lessonLink).toHaveAttribute("href", /#\/learn\/html\/html-foundations\/html-01-document-skeleton/);
});
