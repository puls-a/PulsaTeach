// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackGridChunk } from "../../src/content/cssTrackGridChunk.js";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-responsive");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS responsive module", () => {
  test("preserves public IDs and exposes eight cumulative practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-responsive-width", "css-responsive-max-width", "css-responsive-media", "css-responsive-min-width",
      "css-responsive-clamp", "css-responsive-container-type", "css-responsive-container", "css-responsive-auto-fit"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-responsive-quiz");
    expect(module.lessons.at(-1).id).toBe("css-responsive-lab");
  });

  test("starts from the named-area Grid lab and preserves the cumulative chain", () => {
    const gridProject = cssTrackGridChunk.modules[0].lessons.at(-1);
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

  test("rejects wrong values and targets, unsupported breakpoints, and invalid container-query rules", async () => {
    const tokenSoup = ".responsive-page width min max-width 65ch media clamp container-type @container auto-fit";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => !result.pass)).toBe(true);
    const mutations = [
      ["css-responsive-width", "width: min(100%, 72rem)", "width: 1200px"],
      ["css-responsive-max-width", "max-width: 65ch", "max-width: 72rem"],
      ["css-responsive-media", "@media (min-width: 24rem) {\n  .responsive-layout {\n    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);", "@media (min-width: 80rem) {\n  .responsive-layout {\n    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);"],
      ["css-responsive-min-width", ".responsive-card {\n  min-width: 0;", ".responsive-card {\n  min-width: min-content;"],
      ["css-responsive-clamp", "clamp(1.75rem, 1.2rem + 2vw, 3rem)", "clamp(1rem, 1vw, 6rem)"],
      ["css-responsive-container-type", "container-type: inline-size", "container-type: size"],
      ["css-responsive-container", "@container (min-width: 18rem)", "@container (min-width: 90rem)"],
      ["css-responsive-auto-fit", "@media (min-width: 24rem) {\n  .responsive-layout {\n    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));", "@media (min-width: 24rem) {\n  .responsive-layout {\n    grid-template-columns: repeat(4, 16rem);" ]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
    const queryTarget = byId("css-responsive-container");
    const wrongContainer = queryTarget.solution.replace(".responsive-card__body {\n    display: grid;", ".responsive-card {\n    display: grid;");
    expect((await validateLesson(queryTarget, wrongContainer, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("localizes responsive preview, media, and long-copy evidence", () => {
    const englishPreview = createPreview(module.lessons.at(-1), module.lessons.at(-1).solution, "en");
    expect(englishPreview).toContain("Continuing education schedule");
    expect(englishPreview).toContain("aspect-ratio: 16 / 9");
    expect(englishPreview).not.toMatch(/Feuille CSS|Atelier accessibilité|12 places|Salle Indigo/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("quiz aligns fluid sizing, media, and container-query reasoning", () => {
    const quiz = byId("css-responsive-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "clamp", ["ratio", "fit"], "true", ["mobile", "content", "breakpoint", "verify"], "container",
      expect.objectContaining({ fr: ["mobile", "contenu long"], en: ["mobile", "long content"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["mobile", "content"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("project includes viewport and container proofs while preserving prior Grid", () => {
    const project = byId("css-responsive-lab");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(15);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(2);
    expect(project.tests.filter((item) => item.type === "cssContainerDeclaration")).toHaveLength(1);
    for (const value of ["width: min(100%, 72rem)", "max-width: 65ch", "aspect-ratio: 16 / 9", "object-fit: cover", "font-size: clamp", "container-type: inline-size", "@container (min-width: 18rem)", "repeat(auto-fit, minmax(16rem, 1fr))"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("grid-template-areas");
    expect(project.solution).toContain("display: flex");
    expect(project.solution).not.toContain("overflow: hidden");
  });

  test("serves the same responsive lab through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-responsive");
    const full = await loadLocalTrack("css", { moduleId: "css-responsive" });
    const runtimeModule = full.modules.find((item) => item.id === "css-responsive");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-responsive-lab");
  });
});
