// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackBoxTypeChunk } from "../../src/content/cssTrackBoxTypeChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackBoxTypeChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS box model and typography module", () => {
  test("preserves all public lesson, quiz, and project identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-box-type-box-sizing", "css-box-type-padding", "css-box-type-margin", "css-box-type-max-width",
      "css-box-type-line-height", "css-box-type-font-size", "css-box-type-overflow-wrap", "css-box-type-border-radius"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-box-type-quiz");
    expect(module.lessons.at(-1).id).toBe("css-box-type-lab");
  });

  test("starts from CSS 01 and carries every box-model decision forward", () => {
    const selectorsProject = cssTrack.modules.find((item) => item.id === "css-selectors-colors").lessons.at(-1);
    expect(practice[0].starterCode).toBe(selectorsProject.solution);
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
    const tokenSoup = ".course-card box-sizing border-box color #334155 max-width 42rem";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const cases = [
      ["css-box-type-box-sizing", "box-sizing: border-box", "box-sizing: content-box"],
      ["css-box-type-padding", "padding: 1.5rem", "padding: 1rem"],
      ["css-box-type-margin", "margin: 1.5rem auto", "margin: 0 auto"],
      ["css-box-type-max-width", "max-width: 60ch", "max-width: 72rem"],
      ["css-box-type-line-height", "line-height: 1.65", "line-height: 1.2"],
      ["css-box-type-font-size", "clamp(2rem, 5vw, 3.5rem)", "clamp(1rem, 2vw, 2rem)"],
      ["css-box-type-overflow-wrap", "overflow-wrap: anywhere", "overflow-wrap: normal"],
      ["css-box-type-border-radius", "border-radius: 1.25rem", "border-radius: 50%"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const wrongTarget = practice[3].solution.replace(".course-card .lead {\n  max-width: 60ch;", ".course-card {\n  max-width: 60ch;");
    expect((await validateLesson(practice[3], wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses localized extreme-content previews without leaking corrections", () => {
    for (const lesson of practice) {
      const preview = createPreview(lesson, lesson.solution, "en");
      expect(preview).toContain("extremely-long-identifier");
      expect(preview).not.toMatch(/Atelier|Cette description|Voir l'archive|Une seconde carte/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with box model and typography decisions", () => {
    const quiz = byId("css-box-type-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "border-box", ["measure", "leading"], "false", ["min", "fluid", "max"], "wrap",
      expect.objectContaining({ fr: ["padding", "margin"], en: ["padding", "margin"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["padding", "margin"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("makes the lab cover every decision and retain prior modules", () => {
    const project = byId("css-box-type-lab");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(10);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration")).toBe(true);
    for (const value of ["box-sizing: border-box", "padding: 1.5rem", "margin: 1.5rem auto", "max-width: 60ch", "line-height: 1.65", "font-size: clamp", "overflow-wrap: anywhere", "border-radius: 1.25rem"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain(".course-card .action:focus-visible");
    expect(project.solution).toContain("@media (min-width: 760px)");
  });

  test("ships the same lab through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-box-type");
    const full = await loadLocalTrack("css", { moduleId: "css-box-type" });
    const runtimeModule = full.modules.find((item) => item.id === "css-box-type");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-box-type-lab");
    expect(runtimeModule.lessons.some((lesson) => lesson.id === "css-box-type-lab")).toBe(true);
  });
});
