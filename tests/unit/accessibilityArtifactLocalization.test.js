// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { accessibilityTrack } from "../../src/content/tracks/accessibility.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const lessons = accessibilityTrack.modules.flatMap((module) => module.lessons);

describe("Accessibility curriculum artifact localization", () => {
  test("preserves the active curriculum shape", () => {
    expect(accessibilityTrack.modules).toHaveLength(8);
    expect(lessons).toHaveLength(40);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(40);
  });

  test("localizes learner artifacts and quiz choices", () => {
    for (const lesson of lessons) {
      if (lesson.starterCode && (lesson.type === "html" || lesson.type === "text" || lesson.type === "project")) {
        expect(lesson.starterCode).toMatchObject({ fr: expect.any(String), en: expect.any(String) });
      }
      if (lesson.solution && (lesson.type === "html" || lesson.type === "text" || lesson.type === "project")) {
        expect(lesson.solution).toMatchObject({ fr: expect.any(String), en: expect.any(String) });
      }
      for (const question of lesson.questions || []) {
        for (const choice of question.choices) {
          expect(choice.label.fr).toBeTruthy();
          expect(choice.label.en).toBeTruthy();
        }
      }
    }
  });

  test("passes localized HTML tests with English reference solutions", async () => {
    const failures = [];
    for (const lesson of lessons.filter((item) => item.type !== "quiz" && (item.type === "html" || item.runtime === "html"))) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      const results = await validateLesson(lesson, solution, "en");
      failures.push(...results.filter((result) => !result.pass).map((result) => `${lesson.id}: ${result.label}`));
    }
    expect(failures).toEqual([]);
  });

  test("uses English document language without changing French", () => {
    const language = lessons.find((lesson) => lesson.id === "a11y-01-language");
    expect(resolveLocaleValue(language.solution, "fr")).toContain('lang="fr"');
    expect(resolveLocaleValue(language.solution, "en")).toContain('lang="en"');
    expect(resolveLocaleValue(language.solution, "en")).toContain("Account settings");
  });
});
