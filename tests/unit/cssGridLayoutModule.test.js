// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackGridLayoutChunk } from "../../src/content/cssTrackGridLayoutChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackGridLayoutChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS Grid and compositions module", () => {
  test("preserves all public lesson, quiz, and project identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-grid-layout-display-grid", "css-grid-layout-grid-template-columns", "css-grid-layout-repeat", "css-grid-layout-minmax",
      "css-grid-layout-gap", "css-grid-layout-grid-auto-flow", "css-grid-layout-place-items", "css-grid-layout-align-content"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-grid-layout-quiz");
    expect(module.lessons.at(-1).id).toBe("css-grid-layout-lab");
  });

  test("starts from CSS 03 and carries every Grid decision forward", () => {
    const flexProject = cssTrack.modules.find((item) => item.id === "css-flex-layout").lessons.at(-1);
    expect(practice[0].starterCode.startsWith(flexProject.solution)).toBe(true);
    expect(practice[0].starterCode).toContain(".gallery__card");
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

  test("rejects token soup, wrong targets, rigid tracks, and dense packing", async () => {
    const tokenSoup = ".gallery display grid repeat auto-fit minmax gap grid-auto-flow row place-items start stretch";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const cases = [
      ["css-grid-layout-display-grid", "display: grid", "display: block"],
      ["css-grid-layout-grid-template-columns", "grid-template-columns: 1fr 1fr", "grid-template-columns: 20rem 20rem"],
      ["css-grid-layout-repeat", "grid-template-columns: repeat(2, 1fr)", "grid-template-columns: 1fr 1fr"],
      ["css-grid-layout-minmax", "repeat(auto-fit, minmax(14rem, 1fr))", "repeat(3, 14rem)"],
      ["css-grid-layout-gap", ".gallery {\n  gap: 1rem", ".gallery {\n  gap: 0"],
      ["css-grid-layout-grid-auto-flow", "grid-auto-flow: row", "grid-auto-flow: dense"],
      ["css-grid-layout-place-items", "place-items: start stretch", "place-items: center"],
      ["css-grid-layout-align-content", "align-content: start", "align-content: stretch"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      expect((await validateLesson(lesson, lesson.solution.replace(search, replacement), "en")).some((result) => !result.pass), id).toBe(true);
    }
    const finalLesson = practice.at(-1);
    const wrongTarget = finalLesson.solution.replace(".gallery {\n  align-content: start;", ".gallery__card {\n  align-content: start;");
    expect((await validateLesson(finalLesson, wrongTarget, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("uses localized extreme-content previews without leaking corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("extremely-long-identifier");
      expect(englishPreview).not.toMatch(/Feuille CSS|Programme|Parcours actif|Filtrer|Imprimer|Quatrième/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz with tracks, intrinsic sizing, and source order", () => {
    const quiz = byId("css-grid-layout-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "fit", ["widths", "order"], "true", ["source", "space", "tracks", "extreme"], "share",
      expect.objectContaining({ fr: ["pistes", "cellules"], en: ["tracks", "cells"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["tracks", "cells"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("makes the lab cover every decision and retain prior modules", () => {
    const project = byId("css-grid-layout-lab");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(8);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(1);
    for (const value of ["display: grid", "1fr 1fr", "repeat(2, 1fr)", "repeat(auto-fit, minmax(14rem, 1fr))", "gap: 1rem", "grid-auto-flow: row", "place-items: start stretch", "align-content: start"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("display: flex");
    expect(project.solution).toContain("box-sizing: border-box");
    expect(project.starterCode).not.toContain("display: grid");
    expect(project.solution).not.toContain("dense");
  });

  test("ships the same lab through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-grid-layout");
    const full = await loadLocalTrack("css", { moduleId: "css-grid-layout" });
    const runtimeModule = full.modules.find((item) => item.id === "css-grid-layout");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-grid-layout-lab");
  });
});
