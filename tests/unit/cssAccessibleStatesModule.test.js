// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-a11y-states");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS accessible interactive states module", () => {
  test("preserves public IDs while making eight cumulative practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-a11y-states-focus-visible", "css-a11y-states-outline", "css-a11y-states-outline-offset", "css-a11y-states-hover",
      "css-a11y-states-disabled", "css-a11y-states-cursor", "css-a11y-states-contrast-color", "css-a11y-states-forced-color-adjust"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-a11y-states-quiz");
    expect(module.lessons.at(-1).id).toBe("css-a11y-states-lab");
  });

  test("starts from the responsive lab and keeps earlier rules cumulative", () => {
    const responsiveProject = cssTrack.modules.find((item) => item.id === "css-responsive").lessons.at(-1);
    expect(practice[0].starterCode.startsWith(responsiveProject.solution)).toBe(true);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires work and validates all French and English solutions", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects weak focus, wrong state targets, hidden outlines, and missing forced-colors rule", async () => {
    const mutations = [
      ["css-a11y-states-focus-visible", "outline-style: solid", "outline-style: none"],
      ["css-a11y-states-outline", ".a11y-action:focus-visible {\n  outline: 3px solid #4338ca;", ".a11y-action:hover {\n  outline: 3px solid #4338ca;"],
      ["css-a11y-states-outline-offset", ".a11y-action:focus-visible {\n  outline-offset: 4px;", ".a11y-action:focus-visible {\n  outline-offset: 0;"],
      ["css-a11y-states-hover", ".a11y-action:hover {\n  transform: translateY(-2px);", ".a11y-action {\n  transform: translateY(-2px);"],
      ["css-a11y-states-disabled", ".a11y-action:disabled {\n  cursor: not-allowed;", ".a11y-action:hover {\n  cursor: not-allowed;"],
      ["css-a11y-states-cursor", ".a11y-action:disabled {\n  border-style: dashed;", ".a11y-action:disabled {\n  border-style: solid;"],
      ["css-a11y-states-contrast-color", "opacity: 1", "opacity: .2"],
      ["css-a11y-states-forced-color-adjust", "forced-color-adjust: auto", "forced-color-adjust: none"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
    const forcedRule = practice.at(-1);
    const missingForcedColors = forcedRule.solution.replace("@media (forced-colors: active) {", "@media (prefers-color-scheme: dark) {");
    expect((await validateLesson(forcedRule, missingForcedColors, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("keeps localized navigation and a genuinely disabled native button in the preview", () => {
    const english = createPreview(module.lessons.at(-1), module.lessons.at(-1).solution, "en");
    expect(english).toContain("aria-label=\"Session navigation\"");
    expect(english).toContain("Registration closed");
    expect(english).toMatch(/<button[^>]*disabled/);
    expect(english).not.toMatch(/États accessibles|Navigation de session|Inscription fermée/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("quiz checks state distinctions, disabled actions, and forced colors", () => {
    const quiz = byId("css-a11y-states-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "focus", ["cursor", "contrast"], "false", ["native", "keyboard", "state", "forced"], "auto",
      expect.objectContaining({ fr: ["clavier", "lien"], en: ["keyboard", "link"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["keyboard", "link"]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("project preserves responsive, Grid, Flexbox, and forced-color states", () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssDeclaration")).toHaveLength(11);
    expect(project.tests.filter((item) => item.type === "cssMediaDeclaration")).toHaveLength(1);
    for (const value of ["outline: 3px solid #4338ca", "outline-offset: 4px", "transform: translateY(-2px)", "cursor: not-allowed", "min-height: 44px", "forced-color-adjust: auto", "opacity: 1"]) {
      expect(project.solution).toContain(value);
    }
    expect(project.solution).toContain("@media (forced-colors: active)");
    expect(project.solution).toContain("grid-template-areas");
    expect(project.solution).toContain("display: flex");
    expect(project.solution).not.toContain("outline: none");
  });

  test("static and runtime track contain the same accessible-states module", async () => {
    const staticModule = cssTrack.modules.find((item) => item.id === "css-a11y-states");
    const full = await loadLocalTrack("css", { moduleId: "css-a11y-states" });
    const runtimeModule = full.modules.find((item) => item.id === "css-a11y-states");
    expect(runtimeModule.lessons.map((lesson) => lesson.id)).toEqual(staticModule.lessons.map((lesson) => lesson.id));
    expect(runtimeModule.lessons.at(-1).id).toBe("css-a11y-states-lab");
  });
});
