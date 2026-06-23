import { expect, test } from "@playwright/test";

test("clean routes expose canonical metadata and structured data", async ({ page }) => {
  await page.goto("/glossary");
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

  await page.goto("/dashboard");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
});

test("lesson routes expose unique course metadata", async ({ page }) => {
  await page.goto("/learn/html/html-a11y-final/html-10-accessibility-quiz");
  await expect(page).toHaveTitle(/HTML.*PulsaTeach/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const schema = JSON.parse(await page.locator("#pulsateach-route-schema").textContent());
  expect(schema["@graph"]).toEqual(expect.arrayContaining([
    expect.objectContaining({ "@type": "Course", isAccessibleForFree: true }),
    expect.objectContaining({ "@type": "BreadcrumbList" })
  ]));
});

test("legacy hash route keeps its destination while becoming canonical", async ({ page }) => {
  await page.goto("/#/privacy");
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/privacy");
});
