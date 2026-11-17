// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackFlexboxChunk } from "../../src/content/cssTrackFlexboxChunk.js";
import { cssTrackGridChunk } from "../../src/content/cssTrackGridChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackGridChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS Grid named areas module", () => {
  test("preserves established public lesson IDs while expanding to eight practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-04-grid", "css-04-template-columns", "css-04-place-intro", "css-04-grid-gap",
      "css-04-place-aside", "css-04-grid-footer", "css-04-align-self", "css-04-responsive-areas"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-grid-quiz");
    expect(module.lessons.at(-1).id).toBe("css-04-grid-project");
  });

  test("starts from navigation Flexbox and carries every named-area decision forward", () => {
    const flexProject = cssTrackFlexboxChunk.modules[0].lessons.at(-1);
    expect(practice[0].starterCode.startsWith(flexProject.solution)).toBe(true);
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

  test("rejects token soup, malformed areas, wrong values, targets, and dense packing", async () => {
    const tokenSoup = ".programme-grid grid-template-areas intro sessions aside grid-area footer dense";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const mutations = [
      ["css-04-grid", "grid-template-areas: \"intro intro\" \"sessions aside\" \"footer footer\"", "grid-template-areas: \"intro\""],
      ["css-04-template-columns", "minmax(0, 2fr) minmax(14rem, 1fr)", "20rem 20rem"],
      ["css-04-place-intro", ".programme-intro {\n  grid-area: intro;", ".programme-intro {\n  grid-area: sessions;"],
      ["css-04-grid-gap", ".session-list {\n  grid-area: sessions;", ".session-list {\n  grid-area: aside;"],
      ["css-04-place-aside", ".programme-aside {\n  grid-area: aside;", ".programme-aside {\n  grid-area: footer;"],
      ["css-04-grid-footer", ".programme-footer {\n  grid-area: footer;", ".programme-footer {\n  grid-area: intro;"],
      ["css-04-align-self", ".programme-aside {\n  align-self: start;", ".programme-aside {\n  align-self: stretch;"],
      ["css-04-responsive-areas", ".programme-grid {\n  grid-template-areas: \"intro\"", ".programme-grid {\n  grid-template-areas: \"intro intro\""]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const finalLesson = practice.at(-1);
    const wrongTarget = finalLesson.solution.replace(".programme-grid {\n  grid-template-areas: \"intro\"", ".programme-intro {\n  grid-template-areas: \"intro\"");
    expect((await validateLesson(finalLesson, wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("localizes schedule regions and keeps examples distinct from corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("aria-label=\"PulsaConf schedule\"");
      expect(englishPreview).toContain("grid");
      expect(englishPreview).not.toMatch(/Feuille CSS|Plan de session|Filtrer les sessions|Tous les ateliers/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with named areas, valid rows, and source order", () => {
    const quiz = byId("css-grid-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "dot", ["rows", "cells"], "false", ["regions", "rows", "place", "verify"], "area",
      expect.objectContaining({ fr: ["ordre source", "clavier"], en: ["source order", "keyboard"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["source", "keyboard"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("project covers every region and retains prior Grid, Flexbox, and focus", () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(12);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(1);
    for (const value of ["grid-template-areas", "grid-template-columns: minmax(0, 2fr)", "grid-area: intro", "grid-area: sessions", "grid-area: aside", "grid-area: footer", "align-self: start"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("display: grid");
    expect(project.solution).toContain("display: flex");
    expect(project.solution).toContain(".session-action:focus-visible");
    expect(project.solution).not.toContain("dense");
  });

  test("serves the same named-area project through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-grid");
    const full = await loadLocalTrack("css", { moduleId: "css-grid" });
    const runtimeModule = full.modules.find((item) => item.id === "css-grid");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-04-grid-project");
  });
});
