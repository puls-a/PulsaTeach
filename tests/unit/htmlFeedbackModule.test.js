// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const module = htmlPulsaConfModules.find((item) => item.id === "html-accessible-feedback");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "html");

describe("HTML accessible feedback module", () => {
  test("preserves the feedback sequence and stable identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "html-07-help-describedby", "html-07-error-message", "html-07-fieldset-legend",
      "html-07-disabled-state", "html-07-status-live", "html-07-busy-alert"
    ]);
    expect(module.lessons.at(-2).id).toBe("html-07-feedback-quiz");
    expect(module.lessons.at(-1).id).toBe("html-07-project-robust-form");
  });

  test("carries every accessible relationship into the next lesson", () => {
    for (let index = 1; index < practice.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(practice[index].starterCode, locale)).toBe(resolveLocaleValue(practice[index - 1].solution, locale));
      }
    }
  });

  test("requires work and validates every localized solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 30000);

  test("keeps initial, invalid, busy, and failure states temporally distinct", () => {
    const markup = resolveLocaleValue(byId("html-07-project-robust-form").solution, "en");
    const document = new DOMParser().parseFromString(markup, "text/html");

    expect(document.querySelector("#register form [aria-invalid]")).toBeNull();
    expect(document.querySelector("#register form [role=alert]")).toBeNull();
    expect(document.querySelector("#register[aria-busy]")).toBeNull();
    expect(document.querySelector("#form-status[role=status][aria-live=polite][aria-atomic=true]")).not.toBeNull();
    expect(document.querySelector("#email-error-after-validation")?.content.querySelector("[aria-invalid=true]")).not.toBeNull();
    expect(document.querySelector("#registration-busy-state")?.content.querySelector("[aria-busy=true] [role=status]")).not.toBeNull();
    expect(document.querySelector("#registration-failure-state")?.content.querySelector("[aria-busy=false] [role=alert]")).not.toBeNull();
  });

  test("keeps English artifacts authored and examples separate", () => {
    for (const lesson of practice) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      expect(solution).not.toMatch(/Utilise l'adresse|Saisis une adresse|Niveau actuel|Liste d'attente|Cette option ouvrira|Envoi de l'inscription|Réessaie/);
      expect(lesson.course.en.sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(solution);
    }
  });

  test("rejects missing relationships and mistimed feedback states", async () => {
    const cases = [
      [byId("html-07-help-describedby"), ["en", 'id="email-help"', 'id="missing-help"']],
      [byId("html-07-error-message"), ["en", 'id="email-error-after-validation"', 'id="missing-error-state"']],
      [byId("html-07-fieldset-legend"), ["en", "<fieldset>", "<div>"]],
      [byId("html-07-disabled-state"), ["en", "<fieldset disabled", "<fieldset"]],
      [byId("html-07-status-live"), ["en", 'role="status"', 'role="alert"']],
      [byId("html-07-busy-alert"), ["en", 'aria-busy="true"', 'aria-busy="false"']]
    ];

    for (const [lesson, [locale, search, replacement]] of cases) {
      const answer = resolveLocaleValue(lesson.solution, locale).replace(search, replacement);
      expect((await validateLesson(lesson, answer, locale)).some((result) => !result.pass), lesson.id).toBe(true);
    }
  });

  test("covers every timing and relationship outcome in the project", () => {
    const project = byId("html-07-project-robust-form");
    const starter = resolveLocaleValue(project.starterCode, "en");

    expect(project.tests.length).toBeGreaterThanOrEqual(16);
    expect(starter).not.toContain("email-error-after-validation");
    expect(starter).not.toContain("registration-busy-state");
    expect(starter).not.toContain("form-status");
  });

  test("aligns the feedback quiz with interaction timing", () => {
    const quiz = byId("html-07-feedback-quiz");

    expect(quiz.questions[0].answer).toBe("relationship");
    expect(quiz.questions[1].answer).toBe("polite");
    expect(quiz.questions[2].answer).toEqual(["help", "error", "invalid", "alert"]);
    expect(quiz.questions[3].answer).toBe("false");
    expect(quiz.questions[4].answer).toEqual(["input", "validate", "invalid", "announce"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["disabled", "aria-describedby", "waitlist-help"]));
  });
});
