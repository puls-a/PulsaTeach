import { expect, test } from "@playwright/test";

test.skip("Performance track is private until its public release", async ({ page }) => {
  await page.goto("/catalog");
  const consent = page.getByRole("button", { name: /Tout accepter|Accept all/ });
  if (await consent.isVisible()) await consent.click();
  await expect(page.getByText(/Performance web mesurable|Measurable web performance/).first()).toBeVisible();

  await page.goto("/learn/web-performance/performance-javascript-react/perf-02-splitting", {
    waitUntil: "networkidle"
  });
  await expect(page.getByRole("heading", { name: /Découper par route|Split by route/ }).first()).toBeVisible();

  await page.getByLabel(/Éditeur de code|Code editor/).fill(
    "const CourseStudio = lazy(() => import('./CourseStudio.jsx'));\nconst AnalyticsPage = lazy(() => import('./AnalyticsPage.jsx'));\nfunction RouteView() {\n return <Suspense fallback={<p role=\"status\">Chargement</p>}><CourseStudio /><AnalyticsPage /></Suspense>;\n}"
  );
  await page.getByRole("button", { name: /Lancer les tests|Run tests/ }).click();
  await expect(page.getByText(/C'est validé|Passed\. XP/)).toBeVisible();
});
