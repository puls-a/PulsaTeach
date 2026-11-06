// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { cssGettingStartedChunk } from "../../src/content/cssTrackFoundationChunk.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { moduleLearningMeta } from "../../src/content/moduleMetadata.js";
import { publicTrackCatalog } from "../../src/content/publicTrackCatalog.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const module = cssGettingStartedChunk.modules.find((item) => item.id === "css-getting-started");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "css");

describe("CSS getting started module", () => {
  test("preserves the setup sequence and stable identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "css-00-what-css-does", "css-00-create-stylesheet", "css-00-link-stylesheet",
      "css-00-devtools-styles", "css-00-cascade-method", "css-00-responsive-check-loop"
    ]);
    expect(module.lessons.at(-2).id).toBe("css-00-setup-quiz");
    expect(module.lessons.at(-1).id).toBe("css-00-project-style-setup");
  });

  test("carries each stylesheet decision into the next lesson", () => {
    for (let index = 1; index < practice.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(practice[index].starterCode, locale)).toBe(resolveLocaleValue(practice[index - 1].solution, locale));
      }
    }
    expect(resolveLocaleValue(module.lessons.at(-1).starterCode, "en")).toBe(resolveLocaleValue(practice.at(-1).solution, "en"));
  });

  test("requires work and validates every localized CSS solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  });

  test("rejects token soup, wrong values, and misplaced responsive rules", async () => {
    const tokenSoup = ".course-card color background padding border-radius .stylesheet-status font-weight";
    const firstResults = await validateLesson(practice[0], tokenSoup, "en");
    expect(firstResults.filter((result) => result.type === "cssDeclaration").every((result) => !result.pass)).toBe(true);

    const cases = [
      [byId("css-00-what-css-does"), ["#1f2937", "red"]],
      [byId("css-00-create-stylesheet"), ["padding: 1rem", "padding: 0"]],
      [byId("css-00-link-stylesheet"), ["font-weight: 700", "font-weight: 400"]],
      [byId("css-00-devtools-styles"), ["border-color: #4f46e5", "border-color: transparent"]],
      [byId("css-00-cascade-method"), ["color: #111827", "color: #374151"]],
      [byId("css-00-project-style-setup"), ["padding: var(--space)", "padding: 1rem"]]
    ];
    for (const [lesson, [search, replacement]] of cases) {
      const answer = resolveLocaleValue(lesson.solution, "en").replace(search, replacement);
      expect((await validateLesson(lesson, answer, "en")).some((result) => !result.pass), lesson.id).toBe(true);
    }

    const responsive = byId("css-00-responsive-check-loop");
    const outsideMedia = resolveLocaleValue(responsive.solution, "en")
      .replace('@media (min-width: 760px) {\n  .course-card {\n    max-width: 42rem;\n  }\n}', ".course-card { max-width: 42rem; }");
    expect((await validateLesson(responsive, outsideMedia, "en")).some((result) => result.type === "cssMediaDeclaration" && !result.pass)).toBe(true);
  });

  test("keeps previews, starters, hints, and teaching examples bilingual and distinct", () => {
    for (const lesson of practice) {
      const englishPreview = createPreview(lesson, resolveLocaleValue(lesson.solution, "en"), "en");
      expect(englishPreview).toContain("CSS file loaded");
      expect(englishPreview).not.toMatch(/Feuille CSS|Voir les ateliers|Donner une forme/);
      expect(resolveLocaleValue(lesson.starterCode, "en")).not.toMatch(/Décris|règle|variante|préparer/);
      expect(lesson.hint.fr).not.toBe(lesson.hint.en);
      expect(lesson.course.fr.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.course.en.sections.every((section) => section.example !== lesson.solution)).toBe(true);
      expect(lesson.pedagogy.fr.comparison.good.code).not.toBe(lesson.solution);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(lesson.solution);
    }
  });

  test("aligns the quiz, including locale-specific open answers", () => {
    const quiz = byId("css-00-setup-quiz");
    expect(quiz.questions).toHaveLength(6);
    expect(resolveLocaleValue(quiz.questions[5].answer, "fr")).toEqual(["sélecteur", "responsive", "focus", "contraste"]);
    expect(resolveLocaleValue(quiz.questions[5].answer, "en")).toEqual(["selector", "responsive", "focus", "contrast"]);
    expect(quiz.questions[5].prompt.fr).toContain("quatre preuves");
    expect(quiz.questions[5].prompt.en).toContain("four complementary");
    for (const question of quiz.questions.filter((item) => item.choices.length)) {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
    }
  });

  test("uses one consistent public entry point and loader", async () => {
    const catalog = publicTrackCatalog.find((track) => track.id === "css");
    const direct = await loadLocalTrack("css", { moduleId: "css-getting-started" });
    const full = await loadLocalTrack("css");
    expect(catalog.firstHref).toBe("/learn/css/css-getting-started/css-00-what-css-does");
    expect(direct.modules[0].id).toBe("css-getting-started");
    expect(full.modules[0].id).toBe("css-getting-started");
    expect(full.modules[0].lessons[0].id).toBe("css-00-what-css-does");
  });

  test("states honest bilingual outcomes for the CSS-only lab", () => {
    const metadata = moduleLearningMeta("css-getting-started");
    expect(metadata.outcomes.fr).toContain("Écrire dans styles.css et confirmer son chargement");
    expect(metadata.outcomes.en).toContain("Write in styles.css and confirm that it loads");
    expect(JSON.stringify(metadata.en || metadata)).not.toMatch(/à complète|Complète the/);
  });
});
