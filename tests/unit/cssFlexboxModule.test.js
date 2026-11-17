// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackFlexboxChunk } from "../../src/content/cssTrackFlexboxChunk.js";
import { cssTrackBoxModelChunk } from "../../src/content/cssTrackBoxModelChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackFlexboxChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS navigation Flexbox module", () => {
  test("preserves established public IDs while expanding to eight practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-03-flexbox", "css-03-gap", "css-03-align-items", "css-03-space-between",
      "css-03-flex-wrap", "css-03-flex-basis", "css-03-action-sizing", "css-03-responsive-axis"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-flexbox-quiz");
    expect(module.lessons.at(-1).id).toBe("css-03-mini-project-navbar");
  });

  test("starts from Box Model and carries each navigation decision forward", () => {
    const boxProject = cssTrackBoxModelChunk.modules[0].lessons.at(-1);
    expect(practice[0].starterCode.startsWith(boxProject.solution)).toBe(true);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires work and validates each localized solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects token soup, wrong target/value, fixed axis, and hidden overflow", async () => {
    const tokenSoup = ".site-nav display flex gap align-items space-between wrap flex-basis order";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const mutations = [
      ["css-03-flexbox", ".site-nav {\n  display: flex;", ".site-nav {\n  display: block;"],
      ["css-03-gap", ".site-nav {\n  gap: 1rem;", ".site-nav {\n  gap: 0;"],
      ["css-03-align-items", ".site-nav {\n  align-items: center;", ".site-nav {\n  align-items: stretch;"],
      ["css-03-space-between", ".site-nav {\n  justify-content: space-between;", ".site-nav {\n  justify-content: center;"],
      ["css-03-flex-wrap", ".site-nav {\n  flex-wrap: wrap;", ".site-nav {\n  flex-wrap: nowrap;"],
      ["css-03-flex-basis", ".site-nav__identity {\n  flex: 1 1 14rem;", ".site-nav__identity {\n  flex: 0 0 14rem;"],
      ["css-03-action-sizing", ".site-nav__actions {\n  flex: 0 0 auto;", ".site-nav__actions {\n  flex: 1 1 auto;"],
      ["css-03-responsive-axis", ".site-nav {\n  flex-direction: column;", ".site-nav {\n  flex-direction: row;"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const wrongTarget = practice[1].solution.replace(".site-nav {\n  gap: 1rem;", ".site-nav__actions {\n  gap: 1rem;");
    expect((await validateLesson(practice[1], wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
    const hidden = module.lessons.at(-1).solution.concat("\n.site-nav { overflow: hidden; }");
    expect((await validateLesson(module.lessons.at(-1), hidden, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses a localized navigation preview and keeps examples distinct", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("pulsaconf-accessibility-workshop-session-extremely-long-identifier");
      expect(englishPreview).toContain("aria-label=\"Session actions\"");
      expect(englishPreview).not.toMatch(/Navigation de session|12 places|Réserver|Programme/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz to navigation symptoms and keyboard order", () => {
    const quiz = byId("css-flexbox-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "gap", ["wrap", "keyboard"], "false", ["content", "axis", "wrap", "keyboard"], "flex",
      expect.objectContaining({ fr: ["principal", "transversal"], en: ["main", "cross"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["main", "cross"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("project covers every decision and preserves Box Model, focus, and DOM order", () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(11);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(1);
    for (const value of ["display: flex", "gap: 1rem", "align-items: center", "justify-content: space-between", "flex-wrap: wrap", "flex: 1 1 14rem", "flex: 0 0 auto", "flex-direction: column"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("@media (min-width: 24rem)");
    expect(project.solution).toContain("padding-inline: var(--session-space)");
    expect(project.solution).toContain(".session-action:focus-visible");
    expect(project.solution).not.toContain(".site-nav__actions {\n  order:");
  });

  test("serves the same module through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-flexbox");
    const full = await loadLocalTrack("css", { moduleId: "css-flexbox" });
    const runtimeModule = full.modules.find((item) => item.id === "css-flexbox");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-03-mini-project-navbar");
  });
});
