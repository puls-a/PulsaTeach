import { describe, expect, test } from "vitest";
import { toolsTrack } from "../../src/content/toolsTrack.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const lessons = toolsTrack.modules.flatMap((item) => item.lessons);

describe("tools track editorial contract", () => {
  test("preserves existing progress anchors while providing a full onboarding sequence", () => {
    expect(lessons.slice(0, 3).map((lesson) => lesson.id)).toEqual([
      "tools-01-vscode",
      "tools-02-php",
      "tools-03-postgresql"
    ]);
    expect(lessons.length).toBeGreaterThanOrEqual(6);
    expect(lessons.some((lesson) => lesson.type === "project")).toBe(true);
  });

  test("keeps French and English course structures at parity and substantial depth", () => {
    for (const lesson of lessons) {
      expect(lesson.course.fr.sections.length).toBeGreaterThanOrEqual(4);
      expect(lesson.course.en.sections).toHaveLength(lesson.course.fr.sections.length);
      expect(lesson.course.en.vocabulary).toHaveLength(lesson.course.fr.vocabulary.length);
      expect(lesson.pedagogy.en.guided).toHaveLength(lesson.pedagogy.fr.guided.length);
      expect(lesson.course.fr.sections.flatMap((section) => section.paragraphs).join(" ").length).toBeGreaterThan(450);
      expect(lesson.course.en.sections.flatMap((section) => section.paragraphs).join(" ").length).toBeGreaterThan(400);
    }
  });

  test("uses artifact-based checks instead of self-reported completion", () => {
    for (const lesson of lessons) {
      expect(lesson.tests.length).toBeGreaterThanOrEqual(4);
      expect(lesson.tests.every((check) => check.type === "contains")).toBe(true);
      expect(lesson.tests.some((check) => /^ok$/i.test(String(check.value).trim()))).toBe(false);
      expect(resolveLocaleValue(lesson.solution, "fr")).not.toMatch(/>\s*OK\s*</i);
      expect(resolveLocaleValue(lesson.solution, "en")).not.toMatch(/>\s*OK\s*</i);
    }
  });

  test("is platform-inclusive, supports constrained environments, and avoids promotion", () => {
    const copy = JSON.stringify(toolsTrack);
    expect(copy).toMatch(/Windows/);
    expect(copy).toMatch(/macOS/);
    expect(copy).toMatch(/Linux/);
    expect(copy).toMatch(/sans installation|no-install/i);
    expect(copy).toMatch(/verrouillé|locked-down/i);
    expect(copy).not.toMatch(/recommandé|recommended|parfait|perfect|roi des|king of|dominent le marché|market leader/i);
    expect(copy).not.toMatch(/plus de 70%|over 70%/i);
  });
});
