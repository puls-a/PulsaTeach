import { expect, test } from "@playwright/test";
import { cssTrackGridChunk } from "../../src/content/cssTrackGridChunk.js";

const lesson = cssTrackGridChunk.modules[0].lessons.find((item) => item.id === "css-04-grid-project");
const route = "/learn/css/css-grid/css-04-grid-project";

test("named-area schedule adapts without changing source or keyboard order", async ({ page }, testInfo) => {
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
  const grid = preview.locator(".programme-grid");
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("grid-template-areas", testInfo.project.name === "mobile-chromium"
    ? '"intro" "sessions" "aside" "footer"'
    : '"intro intro" "sessions aside" "footer footer"');
  await expect(preview.locator(".programme-intro")).toHaveCSS("grid-area", "intro");
  await expect(preview.locator(".session-list")).toHaveCSS("grid-area", "sessions");
  await expect(preview.locator(".programme-aside")).toHaveCSS("grid-area", "aside");
  await expect(preview.locator(".programme-footer")).toHaveCSS("grid-area", "footer");
  expect(await preview.locator(".programme-grid > *").evaluateAll((items) => items.map((item) => item.className)))
    .toEqual(["programme-intro", "session-list", "programme-aside", "programme-footer"]);
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  const actions = preview.locator(".site-nav__actions .action");
  await actions.nth(0).focus();
  await expect(actions.nth(0)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
  await expect(actions.nth(1)).toHaveCSS("outline-style", "solid");
});
