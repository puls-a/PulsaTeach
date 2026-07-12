import { describe, expect, test } from "vitest";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";

const modules = javascriptTrack.modules;
const lessons = modules.flatMap((module) => module.lessons);

describe("active JavaScript curriculum quality", () => {
  test("preserves the public inventory and follows foundation-to-professional progression", () => {
    expect(modules).toHaveLength(18);
    expect(lessons).toHaveLength(141);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(141);
    expect(modules.map((module) => module.id)).toEqual([
      "js-variables-strings", "js-basics", "js-booleans-numbers", "js-functions-scope",
      "js-functions", "js-collections-loops", "js-arrays", "js-strings-regex-errors",
      "js-validation-hardening", "js-dom-forms", "js-dom-events", "js-storage-state",
      "js-async-fetch", "js-storage-async", "js-async-resilience", "js-debugging",
      "js-dom-production", "js-capstone"
    ]);
  });

  test("keeps learner-facing fields bilingual and distinct", () => {
    for (const lesson of lessons) {
      expect(lesson.title.fr, lesson.id).toBeTruthy();
      expect(lesson.title.en, lesson.id).toBeTruthy();
      expect(lesson.brief.fr, lesson.id).toBeTruthy();
      expect(lesson.brief.en, lesson.id).toBeTruthy();
      expect(lesson.brief.en, lesson.id).not.toBe(lesson.title.en);
      expect(lesson.course.fr.introduction, lesson.id).toBeTruthy();
      expect(lesson.course.en.introduction, lesson.id).toBeTruthy();
      expect(lesson.guide.fr.objectives.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.guide.en.objectives.length, lesson.id).toBeGreaterThan(0);
    }
  });

  test("uses unique assessment prompts and behavior checks in generated projects", () => {
    const generatedProjects = lessons.filter((lesson) => lesson.id.endsWith("-lab") && lesson.id !== "js-hardening-validation-lab" && lesson.id !== "js-hardening-api-lab" && lesson.id !== "js-hardening-final-lab");
    expect(generatedProjects).toHaveLength(8);
    expect(generatedProjects.every((lesson) => lesson.tests.some((check) => check.type === "jsExpression"))).toBe(true);
    expect(new Set(generatedProjects.map((lesson) => lesson.solution)).size).toBe(8);

    const prompts = lessons.filter((lesson) => lesson.type === "quiz").flatMap((lesson) => lesson.questions || []).map((question) => question.prompt.en);
    expect(new Set(prompts).size).toBe(prompts.length);
  });

  test("validates hardening functions through observable scenarios", () => {
    const hardeningPractice = lessons.filter((lesson) => lesson.id.startsWith("js-hardening-") && lesson.type === "js");
    expect(hardeningPractice).toHaveLength(7);
    expect(hardeningPractice.every((lesson) => lesson.tests.some((check) => check.type === "jsExpression"))).toBe(true);
  });
});
