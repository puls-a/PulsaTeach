// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssTrackResponsiveChunk } from "../../src/content/cssTrackResponsiveChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-capstone");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("PulsaTeach CSS capstone", () => {
  test("preserves public capstone practice, quiz, and lab IDs", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-capstone-space", "css-capstone-clamp", "css-capstone-display-grid", "css-capstone-auto-fit",
      "css-capstone-object-fit", "css-capstone-container", "css-capstone-media", "css-capstone-overflow-wrap"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-capstone-quiz");
    expect(module.lessons.at(-1).id).toBe("css-capstone-lab");
  });

  test("starts from Motion lab and carries the capstone decisions forward", () => {
    const motionProject = cssTrackResponsiveChunk.modules.find((item) => item.id === "css-motion").lessons.at(-1);
    expect(practice[0].starterCode.startsWith(motionProject.solution)).toBe(true);
    for (let index = 1; index < practice.length; index += 1) {
      expect(practice[index].starterCode).toBe(practice[index - 1].solution);
    }
  });

  test("requires meaningful work and validates each localized solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starter = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solution = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starter.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solution.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 20000);

  test("rejects weak, missing, or mis-targeted decisions", async () => {
    const mutations = [
      ["css-capstone-space", "--page-gutter: clamp(1rem, 4vw, 3rem)", "--page-gutter: 96px"],
      ["css-capstone-clamp", "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)", "clamp(1rem, 1vw, 5rem)"],
      ["css-capstone-display-grid", ".capstone-layout {\n  display: grid;", ".capstone-layout {\n  display: block;"],
      ["css-capstone-auto-fit", "repeat(auto-fit, minmax(17rem, 1fr))", "repeat(4, 17rem)"],
      ["css-capstone-object-fit", ".capstone-image {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;", ".capstone-image {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: fill;"],
      ["css-capstone-container", ".capstone-card {\n  container-type: inline-size;", ".capstone-card {\n  container-type: normal;"],
      ["css-capstone-media", "gap: var(--page-gutter)", "gap: 0"],
      ["css-capstone-overflow-wrap", ".capstone-card {\n  overflow-wrap: anywhere;", ".capstone-card {\n  overflow-wrap: normal;"]
    ];
    for (const [id, search, replacement] of mutations) {
      const lesson = byId(id);
      const mutated = lesson.solution.replace(search, replacement);
      expect(mutated).not.toBe(lesson.solution);
      expect((await validateLesson(lesson, mutated, "en")).some((result) => !result.pass), id).toBe(true);
    }
    const containerLesson = byId("css-capstone-container");
    const wrongContainer = containerLesson.solution.replace(".capstone-card__body {\n    display: grid;", ".capstone-card {\n    display: grid;");
    expect((await validateLesson(containerLesson, wrongContainer, "en")).some((result) => !result.pass)).toBe(true);
  });

  test("preview contains localized project content and distinct instructional examples", () => {
    const english = createPreview(module.lessons.at(-1), module.lessons.at(-1).solution, "en");
    expect(english).toContain("pulsaconf-capstone-extremely-long-project-identifier-2026");
    expect(english).toContain("CSS capstone");
    expect(english).toContain("aspect-ratio: 16 / 9");
    expect(english).not.toMatch(/Feuille CSS|Un système cohérent|Programme de formation/);
    for (const lesson of practice) {
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("capstone quiz checks integrated viewport, container, keyboard, and preference evidence", () => {
    const quiz = byId("css-capstone-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions.map((question) => question.answer)).toEqual([
      "resize-card", ["viewport", "container", "keyboard"], "false", ["baseline", "content", "adapt", "states"], "preserve",
      expect.objectContaining({ fr: ["viewport", "conteneur", "mouvement réduit"], en: ["viewport", "container", "reduced motion"] })
    ]);
    expect(quiz.questions.at(-1).keywords).toEqual(["viewport", "container", "motion"]);
  });

  test("final project keeps all prior states and tests every integrated system", async () => {
    const project = module.lessons.at(-1);
    expect(project.tests.filter((item) => item.type === "cssContainerDeclaration")).toHaveLength(1);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration" && item.value.query === "(prefers-reduced-motion: reduce)")).toBe(true);
    expect(project.tests.some((item) => item.type === "cssMediaDeclaration" && item.value.query === "(forced-colors: active)")).toBe(true);
    for (const value of ["--page-gutter: clamp", "grid-area: intro", "display: flex", "forced-color-adjust: auto", "transition: transform 180ms ease-out", "container-type: inline-size", "overflow-wrap: anywhere"]) {
      expect(project.solution).toContain(value);
    }
    for (const locale of ["fr", "en"]) {
      const result = await validateLesson(project, resolveLocaleValue(project.solution, locale), locale);
      expect(result.every((item) => item.pass), `${locale} capstone solution`).toBe(true);
    }
  }, 20000);

  test("runtime loader returns the same final project", async () => {
    const full = await loadLocalTrack("css", { moduleId: "css-capstone" });
    const runtime = full.modules.find((item) => item.id === "css-capstone");
    expect(runtime.lessons.map((lesson) => lesson.id)).toEqual(module.lessons.map((lesson) => lesson.id));
    expect(runtime.lessons.at(-1).id).toBe("css-capstone-lab");
  });
});
