import { expect, test } from "@playwright/test";

test("home route exposes canonical metadata", async ({ page }) => {
  test.setTimeout(60_000);
  await gotoRoute(page, "/");
  await expect(page.getByRole("heading", { name: /apprends le web en construisant des preuves/i })).toBeVisible({ timeout: 45_000 });
  await expect(page).toHaveTitle(/PulsaTeach : Apprendre le Développement Web Gratuitement/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/");
});

test("about route exposes canonical metadata", async ({ page }) => {
  await gotoRoute(page, "/about");
  await expect(page).toHaveTitle(/À propos de PulsaTeach/);
  await expect(page.getByRole("heading", { name: /passer du/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/about");
});

test("glossary route exposes indexable collection metadata", async ({ page }) => {
  await gotoRoute(page, "/glossary");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page).toHaveURL(/\/glossary$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/glossary");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index,follow/);
  const schema = JSON.parse(await page.locator("#pulsateach-route-schema").textContent());
  expect(schema["@graph"]).toEqual(expect.arrayContaining([
    expect.objectContaining({ "@type": "CollectionPage", url: "https://pulsateach.vercel.app/glossary" }),
    expect.objectContaining({ "@type": "BreadcrumbList" })
  ]));
});

test("private dashboard route stays noindex", async ({ page }) => {
  await gotoRoute(page, "/dashboard");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
});

test("lesson routes expose unique course metadata", async ({ page }) => {
  await gotoRoute(page, "/learn/html/html-final-audit/html-09-final-exam");
  await expect(page).toHaveTitle(/Examen final HTML — HTML interactif gratuit \| PulsaTeach/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Examen final HTML|Final HTML exam/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/learn/html/html-final-audit/html-09-final-exam");
  const schema = JSON.parse(await page.locator("#pulsateach-route-schema").textContent());
  expect(schema["@graph"]).toEqual(expect.arrayContaining([
    expect.objectContaining({ "@type": "Course", isAccessibleForFree: true }),
    expect.objectContaining({ "@type": "BreadcrumbList" })
  ]));
});

test("canonical CSS intro route opens the requested lesson", async ({ page }) => {
  await gotoRoute(page, "/learn/css/css-getting-started/css-00-what-css-does");
  await expect(page.getByRole("heading", { level: 1, name: /Ce que CSS fait vraiment|What CSS really does/ })).toBeVisible();
});

test("tools formation links to a valid first lesson", async ({ page }) => {
  await page.goto("/formations/tools", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Premiers outils de développement|First development tools/ })).toBeVisible();
  await expect(page.locator('a[href*="undefined"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Démarrer avec des outils fiables|Start with reliable tools/ }).first()).toHaveAttribute("href", /\/learn\/tools\/tools-setup\/tools-01-vscode$/);
});

test("unknown formation returns an explicit catalog 404", async ({ page }) => {
  await page.goto("/formations/unknown-track", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Formation introuvable|Course not found/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Retour aux formations|Back to courses/ })).toHaveAttribute("href", "/catalog");
});

test("legal pages are reachable and indexable", async ({ page }) => {
  for (const route of ["/privacy", "/cookies", "/terms", "/legal"]) {
    await gotoRoute(page, route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://pulsateach.vercel.app${route}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index,follow/);
  }
});

test("legacy hash route keeps its destination while becoming canonical", async ({ page }) => {
  await gotoRoute(page, "/#/privacy");
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/privacy");
});

async function gotoRoute(page, route) {
  await page.goto(route, { waitUntil: "commit" });
}
