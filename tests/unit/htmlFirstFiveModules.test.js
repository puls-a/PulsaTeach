import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const firstFive = htmlPulsaConfModules.slice(0, 5);
const lessons = firstFive.flatMap((module) => module.lessons);
const byId = (id) => lessons.find((lesson) => lesson.id === id);

describe("first five active HTML modules", () => {
  test("preserves module and lesson identifiers", () => {
    expect(firstFive.map((module) => module.id)).toEqual([
      "html-getting-started", "html-modern-document", "html-text-sections",
      "html-navigation-links", "html-media-content"
    ]);
    expect(byId("html-04-décorative-image-alt-empty")).toBeDefined();
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
  });

  test("keeps every learner-facing lesson bilingual and substantial", () => {
    for (const lesson of lessons) {
      expect(lesson.title.fr).toBeTruthy();
      expect(lesson.title.en).toBeTruthy();
      expect(lesson.brief.fr.length).toBeGreaterThan(25);
      expect(lesson.brief.en.length).toBeGreaterThan(25);
      expect(lesson.course.fr.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.course.en.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("does not pre-solve the viewport exercise", () => {
    const viewport = byId("html-01-viewport-mobile");
    expect(resolveLocaleValue(viewport.starterCode, "fr")).not.toContain('name="viewport"');
    expect(resolveLocaleValue(viewport.solution, "fr")).toContain('name="viewport"');
  });

  test("uses location for same-document current links and avoids redundant ARIA", () => {
    const navigation = byId("html-03-current-external-safe");
    expect(resolveLocaleValue(navigation.solution, "fr")).toContain('aria-current="location"');
    expect(resolveLocaleValue(navigation.solution, "fr")).not.toContain('aria-current="page"');
    expect(resolveLocaleValue(byId("html-04-décorative-image-alt-empty").solution, "fr")).not.toContain("aria-hidden");
  });

  test("provides equivalent transcripts for audio and video", () => {
    expect(resolveLocaleValue(byId("html-04-audio-fallback").solution, "fr")).toContain("Transcription");
    expect(resolveLocaleValue(byId("html-04-video-captions").solution, "fr")).toContain("Transcription de la vidéo");
    const project = byId("html-04-project-speakers-gallery");
    expect(resolveLocaleValue(project.solution, "fr")).toContain("Transcription de la vidéo");
    expect(resolveLocaleValue(project.solution, "fr")).toContain("Transcription de l'annonce");
  });

  test("gives each project module-specific tests and a richer solution", () => {
    const projects = firstFive.map((module) => module.lessons.at(-1));
    expect(projects.every((project) => project.type === "project")).toBe(true);
    expect(projects.every((project) => project.tests.length >= 5)).toBe(true);
    expect(new Set(projects.map((project) => project.tests.map((item) => resolveLocaleValue(item.label, "en")).join("|"))).size).toBe(5);
    expect(projects.every((project) => resolveLocaleValue(project.solution, "en").length > 500)).toBe(true);
  });

  test("uses concept-specific quiz scenarios instead of a repeated template", () => {
    const quizzes = firstFive.map((module) => module.lessons.find((lesson) => lesson.type === "quiz"));
    expect(quizzes.every((quiz) => quiz.questions.length === 6)).toBe(true);
    expect(quizzes.every((quiz) => new Set(quiz.questions.map((question) => question.type)).size >= 5)).toBe(true);
    for (let index = 0; index < 6; index += 1) {
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.fr)).size).toBe(5);
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.en)).size).toBe(5);
    }
  });
});
