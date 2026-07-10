import { expect, test } from "@playwright/test";

const widths = [375, 768, 1024, 1440];
const routes = ["/catalog", "/signup", "/glossary", "/review", "/projects", "/certification", "/studio", "/privacy", "/cookies", "/terms", "/legal", "/learn/tools/tools-setup/tools-01-vscode", "/formations/tools", "/learn/html/html-foundations/html-01-document-skeleton", "/learn/html/html-a11y-final/html-10-accessibility-quiz", "/learn/git/git-foundations/git-01-terminal", "/learn/accessibility/a11y-foundations/a11y-01-semantics", "/learn/testing/testing-strategy/testing-01-vitest", "/learn/typescript/typescript-foundations/ts-01-unions", "/learn/react/react-components/react-01-component", "/learn/node-api/node-http/node-02-validation", "/learn/sql-postgresql/sql-foundations/sql-01-tables", "/learn/web-security/security-threats-input/sec-01-validation", "/learn/web-performance/performance-javascript-react/perf-02-splitting", "/learn/devops-deployment/ops-foundations/ops-01-build", "/playground"];

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
  await page.goto("/learn/html/html-a11y-final/html-10-accessibility-quiz");
  const quizDialog = page.getByRole("dialog", { name: /Quiz accessibilité|Accessibility quiz/ });
  await expect(quizDialog).toBeVisible();
  await expect(page.getByText(/Quel élément rend un input|Which element makes an input/)).toBeVisible();
  const bounds = await quizDialog.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.width).toBeLessThanOrEqual(430);
  await page.keyboard.press("Escape");
  await expect(quizDialog).toBeHidden();
});

test("tools lesson rich content stays inside mobile viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/learn/tools/tools-setup/tools-01-vscode");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();

  await expect(page.getByRole("heading", { name: /Éditeur : VS Code & Cursor|Editor: VS Code & Cursor/ }).first()).toBeVisible();
  await expect(page.getByRole("img", { name: "VS Code Logo" })).toHaveAttribute("src", /\/assets\/tool-vscode\.svg$/);
  await expect(page.getByRole("link", { name: "cursor.sh" })).toHaveAttribute("rel", /noopener noreferrer/);
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("captures long learning pages on desktop and mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  for (const target of [
    { name: "tools-mobile", route: "/learn/tools/tools-setup/tools-01-vscode", width: 390, height: 900 },
    { name: "html-desktop", route: "/learn/html/html-foundations/html-01-document-skeleton", width: 1440, height: 1100 }
  ]) {
    await page.setViewportSize({ width: target.width, height: target.height });
    await page.goto(target.route);
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.locator("main").screenshot({ path: testInfo.outputPath(`${target.name}.png`) });
    await testInfo.attach(target.name, { path: testInfo.outputPath(`${target.name}.png`), contentType: "image/png" });
  }
});
