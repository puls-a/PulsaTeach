// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackFlexLayoutChunk } from "../../src/content/cssTrackFlexLayoutChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackFlexLayoutChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS Flexbox and layout module", () => {
  test("preserves all public lesson, quiz, and project identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-flex-layout-display-flex", "css-flex-layout-gap", "css-flex-layout-align-items", "css-flex-layout-justify-content",
      "css-flex-layout-flex-wrap", "css-flex-layout-flex-direction", "css-flex-layout-order", "css-flex-layout-min-width"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-flex-layout-quiz");
    expect(module.lessons.at(-1).id).toBe("css-flex-layout-lab");
  });

  test("starts from CSS 02 and carries every Flexbox decision forward", () => {
    const boxProject = cssTrack.modules.find((item) => item.id === "css-box-type").lessons.at(-1);
    expect(practice[0].starterCode).toBe(boxProject.solution);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires work and validates every localized solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects token soup, wrong targets, and plausible wrong values", async () => {
    const tokenSoup = ".toolbar display flex gap 1rem align-items center justify-content space-between";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const cases = [
      ["css-flex-layout-display-flex", "display: flex", "display: block"],
      ["css-flex-layout-gap", "gap: 1rem", "gap: 0"],
      ["css-flex-layout-align-items", "align-items: center", "align-items: stretch"],
      ["css-flex-layout-justify-content", "justify-content: space-between", "justify-content: center"],
      ["css-flex-layout-flex-wrap", "flex-wrap: wrap", "flex-wrap: nowrap"],
      ["css-flex-layout-flex-direction", "flex-direction: column", "flex-direction: row"],
      ["css-flex-layout-order", "\n  order: 2", "\n  order: -1"],
      ["css-flex-layout-min-width", "min-width: 0", "min-width: auto"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const responsive = byId("css-flex-layout-flex-direction");
    const wrongBreakpoint = responsive.solution.replace("@media (min-width: 48rem)", "@media (min-width: 80rem)");
    expect((await validateLesson(responsive, wrongBreakpoint, "en")).some((result) => !result.pass)).toBe(true);
    const wrongTarget = practice.at(-1).solution.replace(".toolbar__label {\n  min-width: 0;", ".toolbar {\n  min-width: 0;");
    expect((await validateLesson(practice.at(-1), wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses localized extreme-content previews without leaking corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("long-identifier");
      expect(englishPreview).not.toMatch(/Feuille CSS|Salle Indigo|Session active|Réserver|Programme/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with Flexbox, responsive, and keyboard decisions", () => {
    const quiz = byId("css-flex-layout-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "wrap", ["widths", "keyboard"], "false", ["content", "narrow", "axis", "keyboard"], "min",
      expect.objectContaining({ fr: ["principal", "transversal"], en: ["main", "cross"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["main", "cross"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("makes the lab cover every decision and retain prior modules", () => {
    const project = byId("css-flex-layout-lab");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(10);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(2);
    for (const value of ["display: flex", "gap: 1rem", "align-items: center", "justify-content: space-between", "flex-wrap: wrap", "flex-direction: column", "order: 2", "min-width: 0"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("box-sizing: border-box");
    expect(project.solution).toContain("@media (min-width: 48rem)");
    expect(project.starterCode).not.toContain("display: flex");
  });

  test("ships the same lab through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-flex-layout");
    const full = await loadLocalTrack("css", { moduleId: "css-flex-layout" });
    const runtimeModule = full.modules.find((item) => item.id === "css-flex-layout");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-flex-layout-lab");
  });
});
