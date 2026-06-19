import { expect, test } from "@playwright/test";

const widths = [375, 768, 1024, 1440];
const routes = ["/#/catalog", "/#/signup", "/#/glossary", "/#/learn/html/html-foundations/html-01-document-skeleton", "/#/learn/html/html-a11y-final/html-10-accessibility-quiz", "/#/learn/git/git-foundations/git-01-terminal", "/#/learn/accessibility/a11y-foundations/a11y-01-semantics", "/#/learn/testing/testing-strategy/testing-01-vitest", "/#/learn/typescript/typescript-foundations/ts-01-unions", "/#/learn/react/react-components/react-01-component", "/#/learn/node-api/node-http/node-02-validation", "/#/learn/sql-postgresql/sql-foundations/sql-01-tables", "/#/learn/web-security/security-threats-input/sec-01-validation", "/#/learn/web-performance/performance-javascript-react/perf-02-splitting", "/#/learn/devops-deployment/ops-foundations/ops-01-build", "/#/playground"];

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
  await page.goto("/#/catalog");
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
