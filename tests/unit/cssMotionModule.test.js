// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrackMotionChunk, cssTrackAccessibleStatesChunk, cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackMotionChunk.modules.find((item) => item.id === "css-motion");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS responsible motion module", () => {
  test("preserves the established public practice identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-motion-transition", "css-motion-transform", "css-motion-hover", "css-motion-prefers-reduced-motion",
      "css-motion-animation", "css-motion-transform-origin", "css-motion-will-change", "css-motion-transition-none"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-motion-quiz");
    expect(module.lessons.at(-1).id).toBe("css-motion-lab");
  });

  test("starts from accessible states and retains all previous decisions", () => {
    const statesProject = cssTrackAccessibleStatesChunk.modules[0].lessons.at(-1);
    expect(practice[0].starterCode.startsWith(statesProject.solution)).toBe(true);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires work and validates localized solutions", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects layout animation, unbounded repetition, and missing reduced-motion overrides", async () => {
    const mutations = [
      ["css-motion-transition", "transform 180ms ease-out", "all 1s linear"],
      ["css-motion-transform", ".motion-card:hover {\n  transform: translateY(-2px);", ".motion-card:hover {\n  margin-top: 2rem;"],
      ["css-motion-hover", ".motion-action:hover {\n  text-decoration: underline;", ".motion-action:hover {\n  text-decoration: none;"],
      ["css-motion-prefers-reduced-motion", "@media (prefers-reduced-motion: reduce)", "@media (min-width: 40rem)"],
      ["css-motion-animation", "pulse 1.2s ease-in-out 2", "pulse 1.2s ease-in-out infinite"],
      ["css-motion-transform-origin", "transform-origin: center;", "transform-origin: top left;"],
      ["css-motion-will-change", "will-change: auto;", "will-change: transform;"],
      ["css-motion-transition-none", ".motion-action {\n  transition: transform 160ms ease-out;", ".motion-action {\n  transition: transform 1s linear;"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
    const reduced = byId("css-motion-transition-none");
    const withoutQuery = reduced.solution.replace("@media (prefers-reduced-motion: reduce)", "@media (min-width: 20rem)");
    expect((await validateLesson(reduced, withoutQuery, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses localized real controls and keeps motion examples distinct", () => {
    const english = createPreview(module.lessons.at(-1), module.lessons.at(-1).solution, "en");
    expect(english).toContain("Registration open · 12 seats");
    expect(english).toContain("role=\"status\"");
    expect(english).not.toMatch(/Feuille CSS|Commandes perceptibles|Inscription ouverte/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("quiz covers transforms, finite animation, and user preference", () => {
    const quiz = byId("css-motion-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "transform", ["short", "finite"], "false", ["intent", "motion", "bound", "reduce"], "bound",
      ["prefers-reduced-motion"]
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["prefers-reduced-motion"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("lab retains accessible states and removes every optional motion channel", () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssDeclaration").length).toBeGreaterThanOrEqual(9);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration").length).toBeGreaterThanOrEqual(4);
    for (const value of ["transition: transform 180ms ease-out", "transform: translateY(-2px)", "animation: pulse 1.2s ease-in-out 2", "transform-origin: center", "will-change: auto"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("@media (prefers-reduced-motion: reduce)");
    expect(project.solution).toContain("outline: 3px solid #4338ca");
    expect(project.solution).toContain("animation: none");
    expect(project.solution).toContain("transform: none");
    expect(project.solution).not.toContain("will-change: transform");
  });

  test("static and runtime tracks expose the same motion lab", async () => {
    const staticModule = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-motion");
    const full = await loadLocalTrack("css", { moduleId: "css-motion" });
    const runtimeModule = full.modules.find((item) => item.id === "css-motion");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-motion-lab");
  });
});
