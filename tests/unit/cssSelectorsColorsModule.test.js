// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackSelectorsColorsChunk } from "../../src/content/cssTrackSelectorsColorsChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackSelectorsColorsChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS selectors, cascade, and colors module", () => {
  test("preserves all public lesson, quiz, and project identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-selectors-colors-color", "css-selectors-colors-background", "css-selectors-colors-border-color",
      "css-selectors-colors-font-weight", "css-selectors-colors-text-decoration", "css-selectors-colors-outline",
      "css-selectors-colors-box-shadow", "css-selectors-colors-opacity"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-selectors-colors-quiz");
    expect(module.lessons.at(-1).id).toBe("css-selectors-colors-lab");
  });

  test("starts from CSS 00 and carries every selector decision forward", () => {
    const setupProject = cssTrack.modules.find((item) => item.id === "css-getting-started").lessons.at(-1);
    expect(practice[0].starterCode).toBe(setupProject.solution);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires work and validates every reference solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 15000);

  test("rejects token soup, broad targets, and plausible wrong values", async () => {
    const tokenSoup = ".course-card .lead color #334155 @media max-width 42rem";
    expect((await validateLesson(practice[0], tokenSoup, "en")).some((result) => result.type === "cssDeclaration" && !result.pass)).toBe(true);
    const cases = [
      ["css-selectors-colors-color", "#334155", "#475569"],
      ["css-selectors-colors-background", "#f8fafc", "#ffffff"],
      ["css-selectors-colors-border-color", "#4338ca", "#4f46e5"],
      ["css-selectors-colors-font-weight", "font-weight: 800", "font-weight: 700"],
      ["css-selectors-colors-text-decoration", ".course-card .action", ".course-card"],
      ["css-selectors-colors-outline", "3px solid #4338ca", "3px solid hotpink"],
      ["css-selectors-colors-box-shadow", "0 10px 30px", "0 2px 4px"],
      ["css-selectors-colors-opacity", ".72", ".3"]
    ];
    for (const [id, search, replacement] of cases) {
      const lesson = byId(id);
      const answer = lesson.solution.replace(search, replacement);
      expect((await validateLesson(lesson, answer, "en")).some((result) => !result.pass), id).toBe(true);
    }
  });

  test("keeps localized previews and teaching examples separate from corrections", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, lesson.solution, "en");
      expect(englishPreview).toContain("Recommended workshop");
      expect(englishPreview).not.toMatch(/Atelier recommandé|Voir les détails|Cette variante/);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.hints.join(" ")).not.toMatch(/Commence|échoue|Évite|déclaration/);
    }
  });

  test("aligns the quiz with selector, cascade, color, and focus decisions", () => {
    const quiz = byId("css-selectors-colors-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "action", ["values", "contrast"], "false", ["scope", "base", "variant", "inspect"], "variant",
      expect.objectContaining({ fr: ["sélecteur", "contraste", "focus"], en: ["selector", "contrast", "focus"] })
    ]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("ships the same complete module through static and runtime tracks", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-selectors-colors");
    const full = await loadLocalTrack("css", { moduleId: "css-selectors-colors" });
    const runtimeModule = full.modules.find((item) => item.id === "css-selectors-colors");
    expect(staticModule.lessons.map((lesson) => lesson.id)).toEqual(runtimeModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-selectors-colors-lab");
    expect(full.modules.slice(0, 3).map((item) => item.id)).toEqual(["css-getting-started", "css-selectors-colors", "css-box-type"]);
  });

  test("makes the project cover every practiced selector and preserve CSS 00", () => {
    const project = byId("css-selectors-colors-lab");
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(8);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration")).toBe(true);
    expect(project.solution).toContain(".course-card .action:focus-visible");
    expect(project.solution).toContain(".course-card.is-muted");
    expect(project.solution).toContain("@media (min-width: 760px)");
  });
});
