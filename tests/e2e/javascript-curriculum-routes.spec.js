import { expect, test } from "@playwright/test";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";

test("every public JavaScript module's opening lesson resolves to the editor", async ({ page }, testInfo) => {
  for (const module of javascriptTrack.modules) {
    const lesson = module.lessons[0];
    const route = `/learn/javascript/${module.id}/${lesson.id}`;
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: lesson.title.fr }), `${route} heading`).toBeVisible();
    if (testInfo.project.name === "mobile-chromium") {
      await expect(page.getByRole("tab", { name: /Comprendre|Learn/ })).toBeVisible();
      await expect(page.getByRole("tab", { name: /Coder|Code/ })).toBeVisible();
      await page.getByRole("tab", { name: /Coder|Code/ }).click();
    }
    await expect(page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ }), `${route} editor`).toBeVisible();
  }
});
