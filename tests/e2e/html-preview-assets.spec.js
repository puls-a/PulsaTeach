import { expect, test } from "@playwright/test";
import { htmlTrack } from "../../src/content/htmlTrack.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const lesson = htmlTrack.modules.find((module) => module.id === "html-final-audit")
  .lessons.find((item) => item.id === "html-09-assemble-form-media");

test("HTML preview loads its local speaker images and media under the sandbox CSP", async ({ page }, testInfo) => {
  const blockedAssets = [];
  page.on("console", (message) => { if (message.type() === "error" && /pulsaconf-(maya|samir|demo|captions)/.test(message.text())) blockedAssets.push(message.text()); });
  await page.goto(`/learn/html/html-final-audit/${lesson.id}`, { waitUntil: "networkidle" });
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("tab", { name: /Coder|Code/ }).click();
  await page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ })
    .fill(resolveLocaleValue(lesson.solution, "fr"));
  if (testInfo.project.name === "mobile-chromium") await page.getByRole("button", { name: /^Aperçu$|^Preview$/ }).click();
  else await page.getByRole("tab", { name: /Aperçu live|Live preview/ }).click();
  const images = page.frameLocator('iframe[title="PulsaTeach preview"]').locator('img[src^="/assets/"]');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  const video = page.frameLocator('iframe[title="PulsaTeach preview"]').locator('video source[src*="pulsaconf-demo.webm"]');
  await expect(video).toHaveCount(1);
  await expect.poll(() => video.evaluate((element) => element.parentElement.readyState >= 1)).toBe(true);
  const captions = page.frameLocator('iframe[title="PulsaTeach preview"]').locator('video track[src*="pulsaconf-captions-fr.vtt"]');
  await expect(captions).toHaveCount(1);
  await expect.poll(() => captions.evaluate((element) => element.readyState)).toBe(2);
  expect(await video.evaluate((element) => element.parentElement.crossOrigin)).toBe("anonymous");
  expect(blockedAssets).toEqual([]);
});
