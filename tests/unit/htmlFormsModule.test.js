// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const module = htmlPulsaConfModules.find((item) => item.id === "html-native-forms");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "html");

describe("HTML native forms module", () => {
  test("preserves the cumulative form sequence and identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "html-06-form-action-method", "html-06-label-input-text", "html-06-email-required",
      "html-06-textarea-select", "html-06-radio-checkbox", "html-06-submit-button"
    ]);
    expect(module.lessons.at(-2).id).toBe("html-06-forms-quiz");
    expect(module.lessons.at(-1).id).toBe("html-06-project-registration-form");
  });

  test("carries every form control into the following lesson", () => {
    for (let index = 1; index < practice.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(practice[index].starterCode, locale)).toBe(resolveLocaleValue(practice[index - 1].solution, locale));
      }
    }
  });

  test("requires work and validates each localized reference solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 15000);

  test("keeps English artifacts authored and examples separate from corrections", () => {
    for (const lesson of practice) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      expect(solution).not.toMatch(/Inscription à|Nom complet|Adresse email|Atelier souhaité|Besoins d'accessibilité|Je débute|Demander mon invitation/);
      expect(lesson.course.en.sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(solution);
    }
  });

  test("covers the complete native submission contract in the project", () => {
    const project = byId("html-06-project-registration-form");
    const solution = resolveLocaleValue(project.solution, "en");
    const starter = resolveLocaleValue(project.starterCode, "en");

    expect(solution).toMatch(/action="\/api\/pulsaconf\/register"|method="post"|type="email"|autocomplete="email"|<select|<textarea|type="radio"|type="checkbox"|type="submit"/g);
    expect(project.tests.length).toBeGreaterThanOrEqual(15);
    expect(starter).not.toContain("<select");
    expect(starter).not.toContain('type="submit"');
  });

  test("rejects broken submission, naming, grouping, and action semantics", async () => {
    const cases = [
      [byId("html-06-form-action-method"), ["en", 'method="post"', 'method="get"']],
      [byId("html-06-label-input-text"), ["en", 'for="full-name"', 'for="missing-name"']],
      [byId("html-06-email-required"), ["en", 'type="email"', 'type="text"']],
      [byId("html-06-textarea-select"), ["en", 'name="workshop"', ""]],
      [byId("html-06-radio-checkbox"), ["en", 'name="level" value="practice"', 'name="experience" value="practice"']],
      [byId("html-06-submit-button"), ["en", 'button type="submit"', 'button type="button"']]
    ];

    for (const [lesson, [locale, search, replacement]] of cases) {
      const answer = resolveLocaleValue(lesson.solution, locale).replace(search, replacement);
      expect((await validateLesson(lesson, answer, locale)).some((result) => !result.pass), lesson.id).toBe(true);
    }
  });

  test("aligns the forms quiz with native browser behavior", () => {
    const quiz = byId("html-06-forms-quiz");

    expect(quiz.questions[0].answer).toBe("names");
    expect(quiz.questions[1].answer).toBe("native");
    expect(quiz.questions[2].answer).toEqual(["destination", "labels", "names", "constraints"]);
    expect(quiz.questions[3].answer).toBe("false");
    expect(quiz.questions[4].answer).toEqual(["label", "control", "constraint", "submit"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["for", "full-name", "id"]));
  });
});
