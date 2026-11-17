// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackGridLayoutChunk } from "../../src/content/cssTrackGridLayoutChunk.js";
import { cssTrackSelectorsChunk } from "../../src/content/cssTrackSelectorsChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackSelectorsChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS selector architecture module", () => {
  test("preserves public IDs while expanding to eight cumulative practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-01-selectors", "css-01-combinators", "css-01-variant", "css-01-attribute",
      "css-01-grouping", "css-01-exclusion", "css-01-states", "css-01-specificity"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-01-specificity-quiz");
    expect(module.lessons.at(-1).id).toBe("css-01-selectors-project");
  });

  test("starts from CSS 04 and carries every selector decision forward", () => {
    const gridProject = cssTrackGridLayoutChunk.modules[0].lessons.at(-1);
    expect(practice[0].starterCode.startsWith(gridProject.solution)).toBe(true);
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

  test("rejects token soup, property prefixes, wrong targets, and hidden focus", async () => {
    const tokenSoup = ".session-list .session-card border-color #818cf8 child variant attribute focus";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const prefixed = practice[0].solution.replace("border-color: #818cf8", "not-border-color: #818cf8");
    expect((await validateLesson(practice[0], prefixed, "en")).some((result) => !result.pass)).toBe(true);

    const cases = [
      ["css-01-selectors", ".session-list .session-card {", "article {"],
      ["css-01-combinators", ".session-card > .session-title {", ".session-card .session-title {"],
      ["css-01-variant", ".session-card.session-card--featured {", ".session-card {"],
      ["css-01-attribute", ".session-card[data-level=\"advanced\"] {", ".session-card {"],
      ["css-01-grouping", ":is(.session-action, .session-filter) {", "button {"],
      ["css-01-exclusion", ".session-card:not(.session-card--archived) {", ".session-card {"],
      ["css-01-states", "outline: 3px solid #4338ca", "outline: none"],
      ["css-01-specificity", ":where(.session-list) .session-note {", ".session-note {"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
  });

  test("uses localized counterexamples without leaking corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("This component is not a session");
      expect(englishPreview).toContain("Internal action");
      expect(englishPreview).not.toMatch(/Feuille CSS|Session archivée|Niveau avancé|Voir la session/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with scope, relationships, and specificity", () => {
    const quiz = byId("css-01-specificity-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "child", ["target", "neighbor"], "true", ["dom", "target", "rule", "inspect"], "is",
      expect.objectContaining({ fr: ["cible", "surcharge"], en: ["target", "override"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["target", "override"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("makes the project cover all decisions and retain Grid", () => {
    const project = byId("css-01-selectors-project");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(9);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(1);
    for (const value of [".session-list .session-card", "> .session-title", "[data-level=\"advanced\"]", ":is(", ":not(", ":focus-visible", ":where("]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("display: grid");
    expect(project.starterCode).not.toContain(".session-list .session-card {");
    expect(project.solution).not.toContain("!important");
  });

  test("ships the same project through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-selectors");
    const full = await loadLocalTrack("css", { moduleId: "css-selectors" });
    const runtimeModule = full.modules.find((item) => item.id === "css-selectors");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-01-selectors-project");
  });
});
