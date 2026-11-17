import { describe, expect, test } from "vitest";
import { jsValidationHardeningModule } from "../../src/content/jsValidationModule.js";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";
import { evaluateQuestion } from "../../src/features/quizzes/quizEngine.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const module = jsValidationHardeningModule;
const practice = module.lessons.filter((lesson) => lesson.type === "js");
const project = module.lessons.find((lesson) => lesson.type === "project");
const quiz = module.lessons.find((lesson) => lesson.type === "quiz");

function run(code, expression) {
  try { return Boolean(new Function(`${code}\n${expression}`)()); }
  catch { return false; }
}

describe("robust validation curriculum", () => {
  test("retains public routes and teaches three distinct decisions and a final enrollment", () => {
    expect(javascriptTrack.modules.filter((item) => item.id === module.id)).toHaveLength(1);
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "js-hardening-validate-profile", "js-hardening-normalize-course", "js-hardening-score-boundaries"
    ]);
    expect(project.id).toBe("js-hardening-validation-lab");
    expect(quiz.id).toBe("js-hardening-validation-quiz");
    expect(module.lessons).toHaveLength(5);
  });

  test("all French and English starters fail usefully and solutions pass real happy and rejection scenarios", () => {
    for (const lesson of [...practice, project]) {
      expect(lesson.tests.every((check) => check.type === "jsExpression"), lesson.id).toBe(true);
      for (const locale of ["fr", "en"]) {
        const solution = resolveLocaleValue(lesson.solution, locale);
        const starter = resolveLocaleValue(lesson.starterCode, locale);
        expect(lesson.tests.every((check) => run(solution, check.value)), `${lesson.id} ${locale} solution`).toBe(true);
        expect(lesson.tests.some((check) => !run(starter, check.value)), `${lesson.id} ${locale} starter`).toBe(true);
        expect(lesson.course[locale].sections.every((section) => section.example !== solution), `${lesson.id} ${locale} examples`).toBe(true);
        expect(lesson.pedagogy[locale].comparison.good.code, `${lesson.id} ${locale} comparison`).not.toBe(solution);
        if (locale === "en") expect(starter).not.toMatch(/Retourne|Vérifie|Nettoie|N'inscris/);
      }
    }
  });

  test("rejects plausible hardcoded outcomes, negative XP, empty slugs, inflated scores, and fractional passes", () => {
    const mutations = [
      [practice[0], "xp < 0", "xp < -1"],
      [practice[1], "!title || !/", "!title && !/"],
      [practice[2], "correct > total", "correct > total + 1"],
      [practice[2], "passed: correct / total >= 0.7", "passed: percent >= 70"],
      [project, "if (!learner.ok) return { ok: false, error: learner.error };", "if (!learner.ok) return { ok: true, learner };"],
      [project, "if (!result.ok) return { ok: false, error: result.error };", "if (!result.ok) return { ok: true, result };"]
    ];
    for (const [lesson, original, replacement] of mutations) {
      const mutated = lesson.solution.replace(original, replacement);
      expect(mutated, lesson.id).not.toBe(lesson.solution);
      expect(lesson.tests.some((check) => !run(mutated, check.value)), `${lesson.id}: ${original}`).toBe(true);
    }
  });

  test("quiz and project assess their stated boundary contracts", () => {
    expect(quiz.questions).toHaveLength(6);
    expect(new Set(quiz.questions.map((question) => question.type)).size).toBe(6);
    for (const question of quiz.questions) {
      expect(question.prompt.fr && question.prompt.en && question.explanation.fr && question.explanation.en).toBeTruthy();
      if (question.choices.length) {
        const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
        expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), question.id).toBe(true);
      }
    }
    expect(evaluateQuestion(quiz.questions[2], "false").correct).toBe(true);
    expect(evaluateQuestion(quiz.questions[2], "true").correct).toBe(false);
    expect(project.rubric.fr).toHaveLength(4);
    expect(project.rubric.en).toHaveLength(4);
  });
});
