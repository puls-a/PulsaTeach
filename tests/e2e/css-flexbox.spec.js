import { expect, test } from "@playwright/test";
import { cssTrackFlexboxChunk } from "../../src/content/cssTrackFlexboxChunk.js";

const lesson = cssTrackFlexboxChunk.modules[0].lessons.find((item) => item.id === "css-03-mini-project-navbar");
const route = "/learn/css/css-flexbox/css-03-mini-project-navbar";

test("responsive navigation wraps groups while preserving keyboard order", async ({ page }, testInfo) => {
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
  const nav = preview.locator(".site-nav");
  const label = preview.locator(".site-nav__label");
  const actions = preview.locator(".site-nav__actions .action");
  await expect(nav).toHaveCSS("display", "flex");
  await expect(nav).toHaveCSS("flex-wrap", "wrap");
  await expect(nav).toHaveCSS("flex-direction", testInfo.project.name === "mobile-chromium" ? "column" : "row");
  await expect(preview.locator(".site-nav__identity")).toHaveCSS("flex", "1 1 224px");
  await expect(preview.locator(".site-nav__actions")).toHaveCSS("flex", "0 0 auto");
  expect(await label.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(await actions.allTextContents()).toEqual(["Programme", "Réserver"]);

  await actions.nth(0).focus();
  await expect(actions.nth(0)).toBeFocused();
  await expect(actions.nth(0)).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
