// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrackAdvancedResponsiveChunk, cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackAdvancedResponsiveChunk.modules[0];
const practice = module.lessons.filter((lesson) => lesson.type === "css");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);

describe("advanced responsive CSS module", () => {
  test("preserves public practice, quiz, project, and route IDs", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-07-fluid-type", "css-07-fluid-spacing", "css-07-responsive-images", "css-07-container-queries", "css-07-responsive-navigation"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-07-advanced-responsive-quiz");
    expect(module.lessons.at(-1).id).toBe("css-07-responsive-audit-project");
    expect(cssTrackResponsiveChunk.modules.filter((item) => item.id === "css-advanced-responsive")).toHaveLength(1);
  });

  test("starts from the integrated responsive-motion project and advances cumulatively", () => {
    const prior = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-responsive-motion").lessons.at(-1);
    expect(practice[0].starterCode.startsWith(prior.solution)).toBe(true);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires useful work and validates French and English solutions", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((item) => !item.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((item) => item.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects unbounded type and spacing and incorrect media, container, and navigation decisions", async () => {
    const mutations = [
      ["css-07-fluid-type", ".audit-page h2 {\n  font-size: clamp(1.2rem, 1rem + 1vw, 1.8rem);", ".audit-page h2 {\n  font-size: 48px;"],
      ["css-07-fluid-spacing", "--audit-space: clamp(1rem, 2vw, 2rem)", "--audit-space: 100px"],
      ["css-07-responsive-images", ".audit-card__media {\n  max-width: 100%;\n  aspect-ratio: 3 / 2;\n  object-fit: cover;\n  object-position: center;", ".audit-card__media {\n  max-width: 100%;\n  aspect-ratio: 3 / 2;\n  object-fit: fill;\n  object-position: center;"],
      ["css-07-container-queries", "@container audit-card (min-width: 20rem) {\n  .audit-card__body", "@container audit-card (min-width: 90rem) {\n  .audit-card__body"],
      ["css-07-responsive-navigation", ".audit-nav {\n    justify-content: space-between;\n    overflow-x: visible;", ".audit-nav {\n    justify-content: space-between;\n    overflow-x: hidden;"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
  });

  test("preview contains full English content and lessons do not expose their solution as an example", () => {
    const project = module.lessons.at(-1);
    const preview = createPreview(project, project.solution, "en");
    expect(preview).toContain("responsive-audit-session-identifier-extremely-long-without-spaces-2026");
    expect(preview).toContain("Responsive crop workshop");
    expect(preview).toContain("object-fit: cover");
    expect(preview).not.toMatch(/Feuille CSS|Atelier de cadrage|Salle Indigo/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
    }
  });

  test("quiz answers its advanced responsive questions and project proves each contract", async () => {
    const quiz = byId("css-07-advanced-responsive-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((item) => item.answer)).toEqual(["container", ["ratio", "crop"], "false", ["content", "slot", "rule", "verify"], "bounds", expect.objectContaining({ fr: ["375 px", "20rem", "overflow"], en: ["375px", "20rem", "overflow"] })]);
    for (const question of quiz.questions.filter((item) => item.choices.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssContainerDeclaration")).toHaveLength(1);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration" && item.value.query === "(min-width: 48rem)")).toBe(true);
    expect(project.rubric.fr).toHaveLength(4);
    for (const locale of ["fr", "en"]) {
      const result = await validateLesson(project, resolveLocaleValue(project.solution, locale), locale);
      expect(result.every((item) => item.pass), `${locale} project solution`).toBe(true);
    }
  }, 20000);

  test("dedicated loader returns only this module while its public project ID remains stable", async () => {
    const loaded = await loadLocalTrack("css", { moduleId: "css-advanced-responsive" });
    expect(loaded.modules.map((item) => item.id)).toEqual(["css-advanced-responsive"]);
    expect(loaded.modules[0].lessons.map((item) => item.id)).toEqual(module.lessons.map((item) => item.id));
    expect(loaded.modules[0].lessons.at(-1).id).toBe("css-07-responsive-audit-project");
  });
});
