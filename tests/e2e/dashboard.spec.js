import { expect, test } from "@playwright/test";

test("dashboard resumes the active lesson and exposes today's personalized plan", async ({ page }) => {
  const date = await page.evaluate(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  await page.route("**/api/progress/**", (route) => route.fulfill({ json: null }));
  await page.route("**/api/profile/**", (route) => route.fulfill({ json: {
    displayName: "Maya",
    user: { weeklyMinutes: 140 },
    certificates: [],
    summary: {}
  } }));
  await page.route("**/api/path/**", (route) => route.fulfill({ json: { nextLessons: [{
    id: "css-selectors-colors-color",
    title: { fr: "Choisir une couleur lisible", en: "Choose a readable color" },
    trackLabel: { fr: "CSS interactif", en: "Interactive CSS" },
    durationMin: 15,
    xp: 25,
    href: "#/learn/css/css-selectors-colors/css-selectors-colors-color"
  }] } }));
  await page.addInitScript(({ date }) => {
    localStorage.setItem("pulsateach-learning-progress", JSON.stringify({
      xp: 25,
      completed: { "html-00-what-html-does": { passedAt: `${date}T08:00:00.000Z`, xp: 25 } },
      activity: [],
      streak: { count: 1, longest: 1, lastDate: date, totalActiveDays: 1, recentDates: [date] },
      lastOpenedLesson: {
        trackId: "html",
        moduleId: "html-getting-started",
        lessonId: "html-00-install-toolkit",
        openedAt: `${date}T09:00:00.000Z`
      },
      daily: { date, lessonMinutes: { "html-00-what-html-does": 12 } }
    }));
  }, { date });

  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { level: 1, name: /Maya, voici ta prochaine étape|Maya, here is your next step/ })).toBeVisible();
  const resume = page.getByRole("link", { name: /Reprendre la leçon|Resume lesson/ });
  await expect(resume).toHaveAttribute("href", "/learn/html/html-getting-started/html-00-install-toolkit");
  await expect(page.getByRole("progressbar", { name: /Objectif quotidien|Daily goal/ })).toHaveAttribute("aria-valuenow", "12");
  await expect(page.getByText(/Choisir une couleur lisible|Choose a readable color/)).toBeVisible();

  await resume.click();
  await expect(page).toHaveURL(/\/learn\/html\/html-getting-started\/html-00-install-toolkit$/);
  await expect(page.getByRole("textbox", { name: /Éditeur de code PulsaTeach|PulsaTeach code editor/ })).toBeVisible();
});
