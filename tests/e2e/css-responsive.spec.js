import { expect, test } from "@playwright/test";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-responsive");
const lesson = module.lessons.find((item) => item.id === "css-responsive-lab");
const route = "/learn/css/css-responsive/css-responsive-lab";

test("responsive page adapts to viewport and card size without losing content", async ({ page }, testInfo) => {
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
  const responsivePage = preview.locator(".responsive-page");
  const layout = preview.locator(".responsive-layout");
  const card = preview.locator(".responsive-card").first();
  const details = card.locator(".responsive-card__body");
  const image = card.locator(".responsive-image");
  await expect(layout).toHaveCSS("display", "grid");
  await expect(responsivePage).toHaveCSS("box-sizing", "border-box");
  await expect(responsivePage.locator("h1")).toHaveCSS("font-size", /px$/);
  await expect(image).toHaveCSS("aspect-ratio", "16 / 9");
  await expect(image).toHaveCSS("object-fit", "cover");
  expect(await image.evaluate((element) => element.naturalWidth > 0)).toBe(true);
  expect(await responsivePage.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  await card.evaluate((element) => { element.style.width = "15rem"; });
  await expect(details).toHaveCSS("display", "block");
  await card.evaluate((element) => { element.style.width = "22rem"; });
  await expect(details).toHaveCSS("display", "grid");
  await card.evaluate((element) => { element.style.removeProperty("width"); });

  const actions = preview.locator(".site-nav__actions .action");
  await actions.nth(0).focus();
  await expect(actions.nth(0)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
  await expect(actions.nth(1)).toHaveCSS("outline-style", "solid");
  const overflow = await preview.locator("body").evaluate((body) => {
    const width = document.documentElement.clientWidth;
    return [...body.querySelectorAll("*")].map((element) => {
      const rect = element.getBoundingClientRect();
      return { element: element.tagName.toLowerCase(), className: element.className?.toString(), left: rect.left, right: rect.right, width: rect.width };
    }).filter((item) => item.right > width + 1 || item.left < -1);
  });
  expect(overflow).toEqual([]);
});
