// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { JSDOM } from "jsdom";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";
import { normalizeQuizLesson } from "../../src/features/quizzes/quizEngine.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

globalThis.DOMParser = new JSDOM("").window.DOMParser;

const modules = javascriptTrack.modules;
const lessons = modules.flatMap((item) => item.lessons);

describe("JavaScript public track transverse audit", () => {
  test("all localized solutions pass runtime tests and all starters leave at least one meaningful task", async () => {
    const failures = [];
    for (const lesson of lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const solution = localized(lesson.solution, locale);
        const solutionResults = await runTests(lesson, solution);
        if (!solutionResults.every(Boolean)) failures.push(`${lesson.id} ${locale} solution: ${lesson.tests.filter((_, index) => !solutionResults[index]).map((item) => item.label?.[locale] || item.label || item.type).join(", ")}`);
        const starter = localized(lesson.starterCode, locale);
        if (normalizeCode(starter) === normalizeCode(solution)) failures.push(`${lesson.id} ${locale} starter exactly copies solution`);
        if ((await runTests(lesson, starter)).every(Boolean)) failures.push(`${lesson.id} ${locale} starter passes every check`);
      }
    }
    expect(failures).toEqual([]);
  }, 60000);

  test("every quiz has answerable prompts, localized feedback, and varied question types", () => {
    for (const lesson of lessons.filter((item) => item.type === "quiz")) {
      const quiz = normalizeQuizLesson(lesson);
      expect(quiz.questions.length, `${lesson.id} question count`).toBeGreaterThanOrEqual(4);
      expect(new Set(quiz.questions.map((item) => item.type)).size, `${lesson.id} question variety`).toBeGreaterThanOrEqual(2);
      const ids = new Set();
      for (const question of quiz.questions) {
        expect(question.prompt.fr, `${question.id} French prompt`).toBeTruthy();
        expect(question.prompt.en, `${question.id} English prompt`).toBeTruthy();
        expect(question.explanation?.fr, `${question.id} French feedback`).toBeTruthy();
        expect(question.explanation?.en, `${question.id} English feedback`).toBeTruthy();
        expect(ids.has(question.id), `${lesson.id} duplicate question ID`).toBe(false);
        ids.add(question.id);
        if (question.choices?.length) {
          const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
          expect(answers.every((answer) => question.choices.some((choice) => choice.id === answer)), `${question.id} answer choice`).toBe(true);
        } else {
          expect(question.keywords?.length || Array.isArray(question.answer) || typeof question.answer === "object", `${question.id} open-answer contract`).toBeTruthy();
        }
      }
    }
  });

  test("course examples and pedagogical comparisons do not copy exercise solutions", () => {
    for (const lesson of lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const solution = normalizeCode(resolveLocaleValue(lesson.solution, locale));
        for (const section of lesson.course?.[locale]?.sections || []) {
          const example = section.example;
          if (typeof example === "string" && example.trim()) {
            expect(normalizeCode(example), `${lesson.id} ${locale} example`).not.toBe(solution);
          }
        }
        const comparisonCode = lesson.pedagogy?.[locale]?.comparison?.good?.code;
        if (typeof comparisonCode === "string" && comparisonCode.trim()) {
          expect(normalizeCode(comparisonCode), `${lesson.id} ${locale} comparison`).not.toBe(solution);
        }
      }
    }
  });

  test("projects expose four rubric criteria and at least one executable behavior assertion", () => {
    const projects = lessons.filter((lesson) => lesson.type === "project");
    expect(projects).toHaveLength(16);
    for (const project of projects) {
      expect(project.rubric?.fr?.length, `${project.id} French rubric`).toBeGreaterThanOrEqual(4);
      expect(project.rubric?.en?.length, `${project.id} English rubric`).toBeGreaterThanOrEqual(4);
      expect(project.tests.some((item) => item.type === "jsExpression"), `${project.id} executable behavior`).toBe(true);
    }
  });

  test("module names, lesson paths, and flagship sequence remain internally consistent", () => {
    expect(modules).toHaveLength(18);
    expect(lessons).toHaveLength(141);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    for (const item of modules) {
      expect(item.title.fr, `${item.id} French title`).toBeTruthy();
      expect(item.title.en, `${item.id} English title`).toBeTruthy();
      expect(item.prerequisites?.fr?.length, `${item.id} French prerequisites`).toBeGreaterThan(0);
      expect(item.prerequisites?.en?.length, `${item.id} English prerequisites`).toBeGreaterThan(0);
      expect(item.outcomes?.fr?.length, `${item.id} French outcomes`).toBeGreaterThan(0);
      expect(item.outcomes?.en?.length, `${item.id} English outcomes`).toBeGreaterThan(0);
    }
    expect(javascriptTrack.flagshipPath.lessonIds).toEqual(modules.find((item) => item.id === "js-functions-scope").lessons.map((lesson) => lesson.id));
  });
});

function localized(value, locale) {
  if (typeof value === "string") return value;
  return value?.[locale] ?? "";
}

async function runTests(lesson, code) {
  const results = [];
  for (const check of lesson.tests) {
    if (check.type === "contains") {
      results.push(stripComments(code).includes(String(check.value)));
    } else if (check.type === "jsExpression") {
      results.push(await runExpression(code, check.value));
    } else if (check.type === "consoleIncludes") {
      results.push(await runConsoleIncludes(code, check.value));
    } else {
      results.push(true);
    }
  }
  return results;
}

async function runConsoleIncludes(code, expectedMessages) {
  const logs = [];
  const expected = (Array.isArray(expectedMessages) ? expectedMessages : Object.values(expectedMessages || {}).flat()).filter((item, index, values) => values.indexOf(item) === index);
  const push = (level, values) => logs.push(`${level}${values.map((value) => typeof value === "string" ? value : JSON.stringify(value)).join(" ")}`);
  const console = { log: (...values) => push("", values), info: (...values) => push("[info] ", values), warn: (...values) => push("[attention] ", values), error: (...values) => push("[error] ", values), table: (...values) => push("[table] ", values), group() {}, groupEnd() {} };
  try {
    const execute = new Function("console", `return (async () => {\n${code}\n})();`);
    await execute(console);
    return expected.every((message) => logs.some((line) => line.includes(message)));
  } catch {
    return false;
  }
}

function stripComments(code) {
  return String(code).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

function normalizeCode(code) {
  return stripComments(code).replace(/\s+/g, " ").trim();
}

async function runExpression(code, expression) {
  const values = new Map();
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    clear() { values.clear(); }
  };
  const silentConsole = { log() {}, info() {}, warn() {}, error() {}, table() {}, group() {}, groupEnd() {} };
  const fetch = async (url) => ({ ok: true, status: 200, async json() { return { url: String(url), items: [], courses: [] }; } });
  try {
    const execute = new Function("console", "localStorage", "fetch", `return (async () => {\n${code}\n${expression}\n})();`);
    return Boolean(await execute(silentConsole, localStorage, fetch));
  } catch {
    return false;
  }
}
