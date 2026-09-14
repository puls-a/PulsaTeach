import { expect, test } from "@playwright/test";
import axe from "axe-core";

async function openReference(page, id) {
  await page.goto(`/learn/html/html-transfer-projects/${id}`, { waitUntil: "networkidle" });
  const learnTab = page.getByRole("tab", { name: /^(Comprendre|Learn)$/ });
  if (await learnTab.isVisible()) await learnTab.click();
  await page.getByRole("button", { name: "Correction", exact: true }).click();
  await page.getByRole("button", { name: /Charger cette solution|Load this solution/ }).click();
  const resultsTab = page.getByRole("tab", { name: /^(Résultats|Results)$/ });
  if (await resultsTab.isVisible()) await resultsTab.click();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();
  const iframe = page.locator('iframe[title="PulsaTeach preview"]');
  await expect(iframe).toBeVisible();
  return (await iframe.elementHandle()).contentFrame();
}

test("documentation skip link transfers keyboard focus inside the sandbox", async ({ page }) => {
  const frame = await openReference(page, "html-transfer-documentation");
  const skip = frame.getByRole("link", { name: "Aller au contenu" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(frame.locator("main")).toBeFocused();
  await frame.getByRole("link", { name: "Erreurs", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(frame.locator("#errors")).toBeInViewport();
});

test("product delivery disclosure responds to Enter and Space", async ({ page }) => {
  const frame = await openReference(page, "html-transfer-product");
  const summary = frame.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(frame.locator("details")).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(frame.locator("details")).not.toHaveAttribute("open", "");
  expect(await frame.locator("img").evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test("survey blocks invalid submissions and exposes the expected payload", async ({ page }) => {
  const frame = await openReference(page, "html-transfer-survey");
  const submit = frame.getByRole("button", { name: "Envoyer" });
  await submit.click();
  await expect(frame.getByLabel("Email", { exact: true })).toBeFocused();
  await frame.getByLabel("Email", { exact: true }).fill("invalid");
  expect(await frame.locator("form").evaluate((form) => form.checkValidity())).toBe(false);
  await frame.getByLabel("Email", { exact: true }).fill("reader@example.com");
  await frame.getByRole("checkbox").check();
  expect(await frame.locator("form").evaluate((form) => ({ valid: form.checkValidity(), data: Object.fromEntries(new FormData(form)) })))
    .toEqual({ valid: true, data: { email: "reader@example.com", workshop: "html", consent: "on" } });
  await frame.getByLabel("Email", { exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(frame.getByRole("status")).toContainText("Aucune donnée envoyée");
  await expect(frame.getByRole("status")).toContainText("email, workshop, consent");
});

for (const id of ["survey", "documentation", "product", "legacy-repair"]) {
  test(`${id} reference has no automated WCAG A/AA violations inside the preview`, async ({ page }) => {
    const frame = await openReference(page, `html-transfer-${id}`);
    await frame.evaluate(axe.source);
    const results = await frame.evaluate(async () => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } }));
    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  });
}
