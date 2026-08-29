import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "homepage", path: "/" },
  { name: "catalog", path: "/catalog" },
  { name: "dashboard", path: "/dashboard" },
  { name: "path", path: "/path" },
  { name: "profile", path: "/profile" },
  { name: "signup", path: "/signup" },
  { name: "glossary", path: "/glossary" },
  { name: "review", path: "/review" },
  { name: "projects", path: "/projects" },
  { name: "certification", path: "/certification" },
  { name: "studio", path: "/studio" },
  { name: "privacy", path: "/privacy" },
  { name: "legal", path: "/legal" },
  { name: "lesson", path: "/learn/html/html-getting-started/html-00-what-html-does" },
  { name: "tools lesson", path: "/learn/tools/tools-setup/tools-01-vscode" },
  { name: "tools formation", path: "/formations/tools" },
  { name: "playground", path: "/playground" },
  { name: "Flexbox Arena", path: "/flexbox-arena" },
  { name: "JavaScript Arena", path: "/js-arena" }
];

for (const entry of pages) {
  test(`${entry.name} has no serious automated accessibility violation`, async ({ page }) => {
    await page.goto(entry.path);
    const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.waitForTimeout(350);

    const results = await new AxeBuilder({ page })
      .exclude("iframe")
      .analyze();
    const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));

    expect(blocking, blocking.map(formatViolation).join("\n\n")).toEqual([]);
  });
}

test("lesson code and result modes have no serious automated accessibility violation", async ({ page }) => {
  await page.goto("/learn/javascript/js-functions-scope/js-functions-scope-declare-function");
  await expect(page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ })).toBeVisible();

  for (const mode of ["code", "results"]) {
    if (mode === "results") await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
    const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
    const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    expect(blocking, blocking.map(formatViolation).join("\n\n")).toEqual([]);
  }
});

function formatViolation(violation) {
  const targets = violation.nodes.flatMap((node) => node.target).join(", ");
  return `${violation.id}: ${violation.help}\n${targets}`;
}
