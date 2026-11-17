import { expect, test } from "@playwright/test";
import { cssTrackBoxModelChunk } from "../../src/content/cssTrackBoxModelChunk.js";

const lesson = cssTrackBoxModelChunk.modules[0].lessons.find((item) => item.id === "css-02-box-model-project");
const route = "/learn/css/css-box-model/css-02-box-model-project";

test("box system preserves content, scope, Grid, and keyboard focus", async ({ page }, testInfo) => {
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
  const card = preview.locator(".session-card").first();
  const partner = preview.locator(".sponsor-card");
  const code = card.locator(".session-code");
  await expect(preview.locator(":root")).toHaveCSS("--session-space", "1.25rem");
  await expect(card).toHaveCSS("box-sizing", "border-box");
  await expect(card).toHaveCSS("padding-left", "20px");
  await expect(card).toHaveCSS("min-inline-size", "0px");
  await expect(card).toHaveCSS("border-radius", "24px");
  await expect(partner).not.toHaveCSS("border-radius", "24px");
  expect(await card.evaluate((element) => element.getBoundingClientRect().width <= element.parentElement.getBoundingClientRect().width)).toBe(true);
  expect(await code.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  const action = card.locator(".session-action");
  await action.focus();
  await expect(action).toHaveCSS("outline-style", "solid");
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
