import { expect, test } from "@playwright/test";

test("clean routes expose canonical metadata and structured data", async ({ page }) => {
  await page.goto("/glossary");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page).toHaveURL(/\/glossary$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/glossary");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index,follow");
  const schema = JSON.parse(await page.locator("#pulsateach-route-schema").textContent());
  expect(schema).toMatchObject({ "@type": "CollectionPage", url: "https://pulsateach.vercel.app/glossary" });

  await page.goto("/dashboard");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
});

test("legacy hash route keeps its destination while becoming canonical", async ({ page }) => {
  await page.goto("/#/privacy");
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pulsateach.vercel.app/privacy");
});
