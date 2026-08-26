// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { validateLesson } from "../../src/lessonRuntime.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const lastFive = htmlPulsaConfModules.slice(5, 10);
const lessons = lastFive.flatMap((module) => module.lessons);

describe("last five active HTML modules", () => {
  test("preserves module identifiers and unique lesson identifiers", () => {
    expect(lastFive.map((module) => module.id)).toEqual([
      "html-data-tables", "html-native-forms", "html-accessible-feedback",
      "html-seo-publication", "html-final-audit"
    ]);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(lessons.map((lesson) => lesson.id)).toContain("html-09-final-project-pulsaconf");
  });

  test("keeps learner-facing content substantial and bilingual", () => {
    for (const lesson of lessons) {
      expect(lesson.title.fr).toBeTruthy();
      expect(lesson.title.en).toBeTruthy();
      expect(lesson.brief.fr.length).toBeGreaterThan(40);
      expect(lesson.brief.en.length).toBeGreaterThan(40);
      expect(lesson.course.fr.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.course.en.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("gives every module a richer project with distinct semantic tests", () => {
    const projects = lastFive.map((module) => module.lessons.at(-1));
    expect(projects.every((project) => project.type === "project")).toBe(true);
    expect(projects.every((project) => resolveLocaleValue(project.solution, "en").length > 900)).toBe(true);
    expect(projects.every((project) => project.tests.length >= 6)).toBe(true);
    expect(new Set(projects.map((project) => project.tests.map((item) => resolveLocaleValue(item.label, "en")).join("|"))).size).toBe(5);
    expect(projects.flatMap((project) => project.tests).some((item) => item.type === "referenceExists")).toBe(true);
  });

  test("passes production validation for every active reference solution", async () => {
    for (const lesson of lessons.filter((item) => item.type !== "quiz")) {
      const results = await validateLesson(lesson, resolveLocaleValue(lesson.solution, "fr"), "fr");
      expect(results.filter((result) => !result.pass), lesson.id).toEqual([]);
    }
  });

  test("passes every localized test with every English reference solution", async () => {
    const failures = [];
    for (const lesson of htmlPulsaConfModules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      const results = await validateLesson(lesson, solution, "en");
      failures.push(...results.filter((result) => !result.pass).map((result) => `${lesson.id}: ${result.label}`));
    }
    expect(failures).toEqual([]);
  });

  test("keeps publishing URLs honest and static forms pristine", () => {
    const byId = (id) => lessons.find((lesson) => lesson.id === id);
    const canonical = resolveLocaleValue(byId("html-08-canonical").solution, "fr");
    const openGraph = resolveLocaleValue(byId("html-08-open-graph").solution, "fr");
    const errorLesson = resolveLocaleValue(byId("html-07-error-message").solution, "fr");
    const formProject = resolveLocaleValue(byId("html-07-project-robust-form").solution, "fr");

    expect(canonical).toContain("https://example.com/pulsaconf");
    expect(canonical).toContain("reserved for documentation");
    expect(openGraph).toContain("https://pulsateach.vercel.app/assets/og-pulsateach-v2.png");
    for (const markup of [errorLesson, formProject]) {
      const document = new DOMParser().parseFromString(markup, "text/html");
      expect(document.querySelector("form [aria-invalid]")).toBeNull();
      expect(document.querySelector("form [role=alert]")).toBeNull();
      expect(document.querySelector("template#email-error-after-validation")?.content.querySelector("[aria-invalid=\"true\"]")).not.toBeNull();
      expect(document.querySelector("template#email-error-after-validation")?.content.querySelector("[role=\"alert\"]")).not.toBeNull();
    }
  });

  test("uses diversified module-specific quiz scenarios", () => {
    const quizzes = lastFive.map((module) => module.lessons.find((lesson) => lesson.type === "quiz"));
    expect(quizzes.every((quiz) => quiz.questions.length >= 6)).toBe(true);
    expect(quizzes.every((quiz) => new Set(quiz.questions.map((question) => question.type)).size >= 5)).toBe(true);
    for (let index = 0; index < 6; index += 1) {
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.fr)).size).toBe(5);
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.en)).size).toBe(5);
    }
  });
});
