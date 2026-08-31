import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";

describe("PulsaConf cumulative project metadata", () => {
  const lessons = htmlPulsaConfModules.flatMap((module) => module.lessons);

  test("uses one continuous project thread and document across every HTML lesson", () => {
    const threadIds = new Set(lessons.map((lesson) => lesson.projectThreadId));
    expect(threadIds).toEqual(new Set(["html-pulsaconf-premium"]));
    expect(new Set(lessons.map((lesson) => lesson.projectDocument.id))).toEqual(threadIds);
    expect(new Set(lessons.map((lesson) => lesson.projectDocument.fileName))).toEqual(new Set(["pulsaconf.html"]));
  });

  test("chains every step and declares the same total for merge checkpoints", () => {
    expect(lessons.map((lesson) => lesson.stepNumber)).toEqual(lessons.map((_lesson, index) => index + 1));
    expect(lessons.every((lesson) => lesson.stepCount === lessons.length)).toBe(true);
    expect(lessons[0].buildsOn).toBeNull();
    expect(lessons.slice(1).every((lesson, index) => lesson.buildsOn === lessons[index].id)).toBe(true);
  });
});
