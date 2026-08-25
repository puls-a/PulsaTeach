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

  test("uses stateful workstation contracts instead of HTML keyword checks", () => {
    for (const lesson of lessons) {
      expect(lesson.runtime).toBe("workstation");
      expect(lesson.workstation.required.length).toBeGreaterThan(1);
      expect(lesson.tests.every((check) => check.type === "workstation")).toBe(true);
      expect(lesson.tests.map((check) => check.value)).toEqual(lesson.workstation.required);
      expect(resolveLocaleValue(lesson.solution, "fr")).not.toMatch(/>\s*OK\s*</i);
      expect(resolveLocaleValue(lesson.solution, "en")).not.toMatch(/>\s*OK\s*</i);
    }
  });

  test("requires increasingly complete evidence through the capstone", () => {
    const byId = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));
    expect(byId["tools-01-vscode"].workstation.required).toEqual(["folder", "file", "environment", "observe"]);
    expect(byId["tools-02-php"].workstation.required).toContain("terminal");
    expect(byId["tools-03-postgresql"].workstation.required).toEqual(["file", "save", "reload", "observe"]);
    expect(byId["tools-05-troubleshooting"].workstation.required).toContain("diagnosis");
    expect(byId["tools-06-workstation-project"].workstation.required).toEqual(["folder", "file", "terminal", "save", "reload", "diagnosis"]);
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
