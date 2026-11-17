import { expect, test } from "@playwright/test";
import { cssTrackAdvancedResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackAdvancedResponsiveChunk.modules[0];
const lesson = module.lessons.find((item) => item.id === "css-07-container-queries");
const route = "/learn/css/css-advanced-responsive/css-07-container-queries";

test("advanced responsive audit adapts to card width and preserves media and navigation", async ({ page }, testInfo) => {
  await page.goto(route, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") {
    await page.getByRole("tab", { name: /Coder|Code/ }).click();
  }

  const editor = page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ });
  await editor.fill(lesson.solution);
  await page.getByRole("button", { name: /Vérifier mon code|Check my code/ }).click();
  await expect(page.getByText(`${lesson.tests.length}/${lesson.tests.length}`, { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();

  const preview = page.frameLocator('iframe[title="PulsaTeach preview"]');
  const surface = preview.locator(".audit-page");
  const card = preview.locator(".audit-card").first();
  const body = card.locator(".audit-card__body");
  const image = card.locator(".audit-card__media");
  await expect(surface).toBeVisible();
  await expect(image).toHaveCSS("aspect-ratio", "3 / 2");
  await expect(image).toHaveCSS("object-fit", "cover");
  expect(await image.evaluate((element) => element.naturalWidth > 0)).toBe(true);

  await card.evaluate((element) => { element.style.width = "16rem"; });
  await expect(body).toHaveCSS("display", "block");
  expect(await surface.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await card.evaluate((element) => { element.style.width = "20rem"; });
  await expect(body).toHaveCSS("display", "grid");
  expect(await surface.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expect(preview.locator(".audit-nav")).toHaveCSS("overflow-x", "auto");
  const links = preview.locator(".audit-nav a");
  await links.first().focus();
  await expect(links.first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(links.nth(1)).toBeFocused();
  await expect(preview.getByText("pulsa-conf-session-identifier-extremely-long-without-spaces-2026")).toBeVisible();
});
