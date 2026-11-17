import { expect, test } from "@playwright/test";
import { cssTrackSelectorsChunk } from "../../src/content/cssTrackSelectorsChunk.js";

const lesson = cssTrackSelectorsChunk.modules[0].lessons.find((item) => item.id === "css-01-specificity");
const route = "/learn/css/css-selectors/css-01-specificity";

test("selector architecture preserves scope, Grid, and keyboard focus", async ({ page }, testInfo) => {
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
  const targetedCard = preview.locator(".session-card").first();
  const sponsorCard = preview.locator(".sponsor-card");
  await expect(targetedCard).toHaveCSS("border-color", "rgb(129, 140, 248)");
  await expect(sponsorCard).not.toHaveCSS("border-color", "rgb(129, 140, 248)");
  await expect(targetedCard.locator(":scope > .session-title")).toHaveCSS("font-size", "20px");
  await expect(targetedCard.locator(".session-meta .session-title")).not.toHaveCSS("font-size", "20px");

  const action = preview.locator(".session-action").first();
  await action.focus();
  await expect(action).toHaveCSS("outline-style", "solid");
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
