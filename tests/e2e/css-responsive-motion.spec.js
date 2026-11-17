import { expect, test } from "@playwright/test";
import { cssTrackResponsiveMotionChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackResponsiveMotionChunk.modules[0];
const lesson = module.lessons.find((item) => item.id === "css-responsive-motion-media");
const route = "/learn/css/css-responsive-motion/css-responsive-motion-media";

test("responsive motion lesson composes narrow cards, media, and reduced motion", async ({ page }, testInfo) => {
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
  const surface = preview.locator(".responsive-page");
  const card = preview.locator(".story-card").first();
  const body = card.locator(".story-card__body");
  const image = card.locator(".story-media");
  await expect(surface).toBeVisible();
  await expect(image).toHaveCSS("aspect-ratio", "16 / 9");
  await expect(image).toHaveCSS("object-fit", "cover");
  expect(await surface.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  await card.evaluate((element) => { element.style.width = "20rem"; });
  await expect(body).toHaveCSS("display", "block");
  await card.evaluate((element) => { element.style.width = "30rem"; });
  await expect(body).toHaveCSS("display", "grid");
  await card.evaluate((element) => { element.style.removeProperty("width"); });

  await page.emulateMedia({ reducedMotion: "reduce" });
  const action = card.locator(".story-action");
  await expect(action).toBeVisible();
  await action.hover();
  await expect(action).toHaveCSS("transform", "none");
  await expect(preview.getByRole("status")).toBeVisible();
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
