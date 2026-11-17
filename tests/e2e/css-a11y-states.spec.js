import { expect, test } from "@playwright/test";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-a11y-states");
const lesson = module.lessons.find((item) => item.id === "css-a11y-states-lab");
const route = "/learn/css/css-a11y-states/css-a11y-states-lab";

test("interactive states remain perceivable to keyboard, pointer, and forced-colors users", async ({ page }, testInfo) => {
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
  const link = preview.locator(".site-nav__actions .a11y-action[href]").first();
  const disabled = preview.locator("button.a11y-action:disabled");
  await link.hover();
  await expect(link).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
  await expect(disabled).toHaveCSS("cursor", "not-allowed");
  await expect(disabled).toHaveCSS("opacity", "1");
  await expect(disabled).toHaveCSS("min-height", "44px");

  await link.focus();
  await expect(link).toHaveCSS("outline-style", "solid");
  await expect(link).toHaveCSS("outline-width", "3px");
  await expect(link).toHaveCSS("outline-offset", "4px");
  await page.keyboard.press("Tab");
  const nextLink = preview.locator(".site-nav__actions .a11y-action[href]").nth(1);
  await expect(nextLink).toBeFocused();

  await page.emulateMedia({ forcedColors: "active" });
  await nextLink.focus();
  await expect(nextLink).toHaveCSS("outline-style", "solid");
  await expect(link).toHaveCSS("forced-color-adjust", "auto");
  await expect(disabled).toHaveCSS("forced-color-adjust", "auto");
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
