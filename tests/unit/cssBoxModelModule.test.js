// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackBoxModelChunk } from "../../src/content/cssTrackBoxModelChunk.js";
import { cssTrackSelectorsChunk } from "../../src/content/cssTrackSelectorsChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackBoxModelChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS advanced box model module", () => {
  test("preserves public IDs while expanding to eight cumulative practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-02-box-model", "css-02-typography", "css-02-custom-properties", "css-02-sizing",
      "css-02-overflow", "css-02-logical-padding", "css-02-min-inline-size", "css-02-radius"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-02-box-model-quiz");
    expect(module.lessons.at(-1).id).toBe("css-02-box-model-project");
  });

  test("starts from CSS 05 and carries every box decision forward", () => {
    const selectorsProject = cssTrackSelectorsChunk.modules[0].lessons.at(-1);
    expect(practice[0].starterCode.startsWith(selectorsProject.solution)).toBe(true);
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

  test("rejects token soup, wrong targets, wrong values, and hidden overflow", async () => {
    const tokenSoup = ".session-card box-sizing border-box inline-size min overflow-wrap anywhere";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const cases = [
      ["css-02-box-model", ".session-card {\n  box-sizing: border-box;", ".session-card {\n  box-sizing: content-box;"],
      ["css-02-typography", ".session-copy {\n  line-height: 1.65;", ".session-copy {\n  line-height: 1.2;"],
      ["css-02-custom-properties", ":root {\n  --session-space: 1.25rem;", ":root {\n  --session-space: 12px;"],
      ["css-02-sizing", ".session-card {\n  inline-size: min(100%, 42rem);", ".session-card {\n  inline-size: 900px;"],
      ["css-02-overflow", ".session-code {\n  overflow-wrap: anywhere;", ".session-code {\n  overflow-wrap: normal;"],
      ["css-02-logical-padding", ".session-card {\n  padding-inline: var(--session-space);", ".session-card {\n  padding-left: 1.25rem;"],
      ["css-02-min-inline-size", ".session-card {\n  min-inline-size: 0;", ".session-card {\n  min-inline-size: min-content;"],
      ["css-02-radius", ".session-card {\n  border-radius: 1.5rem;", ".session-card {\n  border-radius: 50%;"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const wrongTarget = practice[4].solution.replace(".session-code {\n  overflow-wrap: anywhere;", ".session-card {\n  overflow-wrap: anywhere;");
    expect((await validateLesson(practice[4], wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
    const hidden = module.lessons.at(-1).solution.concat("\n.session-code { overflow: hidden; }");
    expect((await validateLesson(module.lessons.at(-1), hidden, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses localized extreme-content previews without leaking corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("unbroken-identifier");
      expect(englishPreview).toContain("This component stays outside the session system");
      expect(englishPreview).not.toMatch(/Feuille CSS|Boîtes robustes|Carte voisine|Voir la session/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with box geometry and intrinsic sizing", () => {
    const quiz = byId("css-02-box-model-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "border", ["min", "wrap"], "true", ["reproduce", "inspect", "fix", "verify"], "token",
      expect.objectContaining({ fr: ["visible", "sans débordement"], en: ["visible", "no overflow"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["visible", "overflow"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("makes the project cover all decisions and retain selectors and Grid", () => {
    const project = byId("css-02-box-model-project");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(11);
    for (const value of ["box-sizing: border-box", "line-height: 1.65", "--session-space: 1.25rem", "inline-size: min(100%, 42rem)", "overflow-wrap: anywhere", "padding-inline: var(--session-space)", "min-inline-size: 0", "border-radius: 1.5rem"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("display: grid");
    expect(project.solution).toContain(".session-action:focus-visible");
    expect(project.starterCode).not.toContain(".session-card {\n  box-sizing: border-box;");
    expect(project.solution).not.toContain("overflow: hidden");
  });

  test("ships the same project through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-box-model");
    const full = await loadLocalTrack("css", { moduleId: "css-box-model" });
    const runtimeModule = full.modules.find((item) => item.id === "css-box-model");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-02-box-model-project");
  });
});
