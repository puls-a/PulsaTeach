import { expect, test } from "@playwright/test";

const lessonPath = "/learn/html/html-getting-started/html-00-what-html-does";

test("desktop learning navigation remains available in the compact header", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.goto(lessonPath);
  await acceptPrivacy(page);

  await expect(page.getByRole("button", { name: /Apprendre|Learn/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Pratiquer|Practice/ })).toBeVisible();
});

test("curriculum drawer manages focus and closes with Escape", async ({ page }) => {
  await page.goto(lessonPath);
  await acceptPrivacy(page);
  const trigger = page.getByRole("button", { name: /Programme|Curriculum/ });
  await trigger.click();

  const drawer = page.getByRole("dialog", { name: /Programme|Curriculum/ });
  const closeButton = drawer.getByRole("button", { name: /Fermer|Close/ });
  await expect(drawer).toBeVisible();
  await expect(closeButton).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Shift+Tab");
  expect(await drawer.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Tab");
  expect(await drawer.evaluate((element) => element.contains(document.activeElement))).toBe(true);

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

async function acceptPrivacy(page) {
  const button = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await button.isVisible()) await button.click();
}
