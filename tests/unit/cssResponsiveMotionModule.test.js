// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrackResponsiveMotionChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackResponsiveMotionChunk.modules[0];
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS integrated responsive-motion module", () => {
  test("preserves public IDs and extends the legacy sequence to eight practices", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-05-responsive", "css-05-mobile-first", "css-responsive-motion-container", "css-responsive-motion-media",
      "css-05-motion", "css-responsive-motion-fluid-type", "css-responsive-motion-overflow", "css-05-reduced-motion"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-responsive-motion-quiz");
    expect(module.lessons.at(-1).id).toBe("css-06-final-project");
  });

  test("starts from the capstone landing and carries each composition decision forward", () => {
    expect(practice[0].starterCode).toContain(".capstone-layout");
    expect(practice[0].starterCode).toContain(".capstone-card");
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires useful edits and validates French and English solutions", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects wrong breakpoints, container target, media ratio, motion, and reduced mode", async () => {
    const mutations = [
      ["css-05-responsive", "@media (min-width: 24rem) {\n  .story-layout {\n    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);", "@media (min-width: 80rem) {\n  .story-layout {\n    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);"],
      ["css-05-mobile-first", "gap: var(--space)", "gap: 0"],
      ["css-responsive-motion-container", "@container (min-width: 24rem) {\n  .story-card__body", "@container (min-width: 90rem) {\n  .story-card__body"],
      ["css-responsive-motion-media", ".story-media {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;", ".story-media {\n  max-width: 100%;\n  aspect-ratio: 1 / 1;\n  object-fit: fill;"],
      ["css-05-motion", ".story-action:hover {\n  transform: translateY(-2px);", ".story-action:hover {\n  margin-top: 2rem;"],
      ["css-responsive-motion-fluid-type", "font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem)", "font-size: 40px"],
      ["css-responsive-motion-overflow", ".story-card {\n  overflow-wrap: anywhere;", ".story-card {\n  overflow-wrap: normal;"],
      ["css-05-reduced-motion", "@media (prefers-reduced-motion: reduce) {\n  .story-action", "@media (min-width: 48rem) {\n  .story-action"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
  });

  test("preview keeps the English scenario and motion-free content visible", () => {
    const project = module.lessons.at(-1);
    const english = createPreview(project, project.solution, "en");
    expect(english).toContain("responsive-motion-extremely-long-session-identifier");
    expect(english).toContain("Registration open");
    expect(english).toContain("aspect-ratio: 16 / 9");
    expect(english).not.toMatch(/Feuille CSS|Atelier accessibilité|12 places · Salle Indigo/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
    }
  });

  test("aligns the integrated quiz to container, motion, and keyboard evidence", () => {
    const quiz = byId("css-responsive-motion-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "container", ["hover", "reduce"], "false", ["viewport", "container", "motion", "keyboard"], "transform",
      expect.objectContaining({ fr: ["viewport", "conteneur", "mouvement réduit"], en: ["viewport", "container", "reduced motion"] })
    ]);
    for (const question of quiz.questions.filter((item) => item.choices?.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("final project keeps responsive composition and motion preference evidence", async () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssContainerDeclaration")).toHaveLength(1);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration" && item.value.query === "(prefers-reduced-motion: reduce)")).toBe(true);
    expect(project.rubric.fr).toHaveLength(4);
    for (const locale of ["fr", "en"]) {
      const result = await validateLesson(project, resolveLocaleValue(project.solution, locale), locale);
      expect(result.every((item) => item.pass), `${locale} project solution`).toBe(true);
    }
  }, 20000);

  test("runtime loader serves the same project and established project ID", async () => {
    const full = await loadLocalTrack("css", { moduleId: "css-responsive-motion" });
    const runtime = full.modules.find((item) => item.id === "css-responsive-motion");
    expect(runtime.lessons.map((lesson) => lesson.id)).toEqual(module.lessons.map((lesson) => lesson.id));
    expect(runtime.lessons.at(-1).id).toBe("css-06-final-project");
  });
});
