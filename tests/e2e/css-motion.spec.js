import { expect, test } from "@playwright/test";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-motion");
const lesson = module.lessons.find((item) => item.id === "css-motion-lab");
const route = "/learn/css/css-motion/css-motion-lab";

test("decorative motion is bounded and respects reduced-motion preference", async ({ page }, testInfo) => {
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
  const card = preview.locator(".motion-card").first();
  const motionAction = preview.locator(".motion-action").first();
  const status = preview.getByRole("status");
  await expect(card).toHaveCSS("transition-property", "transform");
  await expect(card).toHaveCSS("will-change", "auto");
  await expect(motionAction).toHaveCSS("transition-property", "transform");
  await expect(status).toHaveCSS("animation-name", "pulse");
  await expect(status).toHaveCSS("animation-iteration-count", "2");

  await card.hover();
  await expect(card).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -2)");
  await expect(motionAction).toHaveCSS("text-decoration-line", "underline");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("transition-duration", "0s");
  await expect(card).toHaveCSS("transform", "none");
  await expect(motionAction).toHaveCSS("transition-duration", "0s");
  await expect(motionAction).toHaveCSS("transform", "none");
  await expect(status).toHaveCSS("animation-name", "none");
  await expect(status).toContainText(/Inscription ouverte|Registration open/);

  const action = preview.locator(".session-action").first();
  await action.focus();
  await expect(action).toHaveCSS("outline-style", "solid");
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
