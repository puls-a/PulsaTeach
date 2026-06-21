import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "catalog", path: "/#/catalog" },
  { name: "signup", path: "/#/signup" },
  { name: "glossary", path: "/#/glossary" },
  { name: "review", path: "/#/review" },
  { name: "projects", path: "/#/projects" },
  { name: "certification", path: "/#/certification" },
  { name: "studio", path: "/#/studio" },
  { name: "lesson", path: "/#/learn/html/html-foundations/html-01-document-skeleton" },
  { name: "playground", path: "/#/playground" }
];

for (const entry of pages) {
  test(`${entry.name} has no serious automated accessibility violation`, async ({ page }) => {
    await page.goto(entry.path);
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();

    const results = await new AxeBuilder({ page })
      .exclude("iframe")
      .analyze();
    const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));

    expect(blocking, blocking.map(formatViolation).join("\n\n")).toEqual([]);
  });
}

function formatViolation(violation) {
  const targets = violation.nodes.flatMap((node) => node.target).join(", ");
  return `${violation.id}: ${violation.help}\n${targets}`;
}
