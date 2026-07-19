import { expect, test } from "@playwright/test";

const widths = [375, 768, 1024, 1440];
const routes = ["/", "/catalog", "/signup", "/glossary", "/review", "/projects", "/certification", "/studio", "/privacy", "/cookies", "/terms", "/legal", "/learn/tools/tools-setup/tools-01-vscode", "/formations/tools", "/learn/html/html-getting-started/html-00-what-html-does", "/learn/html/html-final-audit/html-09-final-exam", "/learn/git/git-foundations/git-01-terminal", "/learn/accessibility/a11y-foundations/a11y-01-semantics", "/learn/testing/testing-strategy/testing-01-vitest", "/learn/typescript/typescript-foundations/ts-01-unions", "/learn/react/react-components/react-01-component", "/learn/node-api/node-http/node-02-validation", "/learn/sql-postgresql/sql-foundations/sql-01-tables", "/learn/web-security/security-threats-input/sec-01-validation", "/learn/web-performance/performance-javascript-react/perf-02-splitting", "/learn/devops-deployment/ops-foundations/ops-01-build", "/playground"];

test.describe("responsive layout", () => {
  for (const width of widths) {
    test(`critical pages do not overflow at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium");
      await page.setViewportSize({ width, height: 900 });

      for (const route of routes) {
        await page.goto(route);
        const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
        if (await consent.isVisible()) await consent.click();
        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth
        }));
        expect(dimensions.scrollWidth, `${route} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth);
      }
    });
  }
});

test("mobile menu traps focus and restores it when closed", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Menu mobile|Mobile menu/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: /Fermer le menu|Close menu/ })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("iPhone Pro Max displays the quiz as a centered, closable dialog", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/learn/html/html-final-audit/html-09-final-exam");
  const quizDialog = page.getByRole("dialog", { name: /Examen final HTML|Final HTML exam/ });
  await expect(quizDialog).toBeVisible();
  await expect(page.getByText(/menu vise des id absents|menu targets missing ids/)).toBeVisible();
  const bounds = await quizDialog.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.width).toBeLessThanOrEqual(430);
  await page.keyboard.press("Escape");
  await expect(quizDialog).toBeHidden();
});

test("homepage and footer stay composed at 390px", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Choisir une formation|Choose a course/ })).toBeVisible();
  const constrainedElements = [
    page.locator("header nav"),
    page.getByRole("heading", { level: 1 }),
    page.locator("main dl"),
    page.locator("footer")
  ];
  for (const element of constrainedElements) {
    const bounds = await element.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
  }

  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Menu mobile|Mobile menu/ });
  const dialogBounds = await dialog.boundingBox();
  expect(dialogBounds.x).toBe(0);
  expect(dialogBounds.width).toBe(390);
  await page.keyboard.press("Escape");

  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.getByRole("navigation", { name: /Réseaux sociaux PulsaTeach|PulsaTeach social media/ })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("homepage-390.png"), fullPage: true });
  await testInfo.attach("homepage-390", { path: testInfo.outputPath("homepage-390.png"), contentType: "image/png" });
});

test("tools lesson rich content stays inside mobile viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page.getByRole("heading", { name: /Choisir son espace de travail|Choose your workspace/ }).first()).toBeVisible();
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("captures long learning pages on desktop and mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  for (const target of [
    { name: "tools-mobile", route: "/learn/tools/tools-setup/tools-01-vscode", width: 390, height: 900 },
    { name: "html-desktop", route: "/learn/html/html-getting-started/html-00-what-html-does", width: 1440, height: 1100 }
  ]) {
    await page.setViewportSize({ width: target.width, height: target.height });
    await page.goto(target.route);
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.locator("main").screenshot({ path: testInfo.outputPath(`${target.name}.png`) });
    await testInfo.attach(target.name, { path: testInfo.outputPath(`${target.name}.png`), contentType: "image/png" });
  }
});
