import { expect, test } from "@playwright/test";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-capstone");
const lesson = module.lessons.find((item) => item.id === "css-capstone-lab");
const route = "/learn/css/css-capstone/css-capstone-lab";

test("CSS capstone composes responsive cards, containers, and reduced motion", async ({ page }, testInfo) => {
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
  const pageSurface = preview.locator(".capstone-page");
  const layout = preview.locator(".capstone-layout");
  const card = preview.locator(".capstone-card").first();
  const body = card.locator(".capstone-card__body");
  const image = card.locator(".capstone-image");
  await expect(layout).toHaveCSS("display", "grid");
  await expect(pageSurface).toHaveCSS("box-sizing", "border-box");
  await expect(image).toHaveCSS("aspect-ratio", "16 / 9");
  await expect(image).toHaveCSS("object-fit", "cover");
  expect(await image.evaluate((element) => element.naturalWidth > 0)).toBe(true);
  expect(await pageSurface.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  await card.evaluate((element) => { element.style.width = "20rem"; });
  await expect(body).toHaveCSS("display", "block");
  await card.evaluate((element) => { element.style.width = "30rem"; });
  await expect(body).toHaveCSS("display", "grid");
  await card.evaluate((element) => { element.style.removeProperty("width"); });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(preview.getByRole("status")).toBeVisible();
  await expect(preview.getByRole("status")).toHaveCSS("animation-name", "none");
  const motionLink = preview.locator(".motion-card").first();
  await motionLink.hover();
  await expect(motionLink).toHaveCSS("transform", "none");

  const actions = preview.locator(".site-nav__actions .a11y-action[href]");
  await actions.first().focus();
  await expect(actions.first()).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
  expect(await preview.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});
