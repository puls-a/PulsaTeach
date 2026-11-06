// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const module = htmlPulsaConfModules.find((item) => item.id === "html-data-tables");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "html");

describe("HTML data and tables module", () => {
  test("preserves the module progression and stable identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "html-05-unordered-benefits", "html-05-ordered-steps", "html-05-definition-list",
      "html-05-table-caption", "html-05-thead-tbody-scope", "html-05-time-data"
    ]);
    expect(module.lessons.at(-2).id).toBe("html-05-data-quiz");
    expect(module.lessons.at(-1).id).toBe("html-05-project-schedule");
  });

  test("carries each data decision into the next lesson", () => {
    for (let index = 1; index < practice.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(practice[index].starterCode, locale)).toBe(resolveLocaleValue(practice[index - 1].solution, locale));
      }
    }
  });

  test("requires real work and validates every French and English solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 15000);

  test("keeps English artifacts authored and teaching examples distinct", () => {
    for (const lesson of practice) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      expect(solution).not.toMatch(/Pourquoi venir|Étapes d'inscription|Choisir un atelier|Glossaire du planning|Horaires et capacité|Places|Formulaires accessibles/);
      expect(lesson.course.en.sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(solution);
    }
  });

  test("covers lists, table relationships, and machine values in the project", () => {
    const project = byId("html-05-project-schedule");
    const solution = resolveLocaleValue(project.solution, "en");
    const starter = resolveLocaleValue(project.starterCode, "en");

    expect(solution).toMatch(/<ul>|<ol>|<dl>|<caption>|<thead>|<tbody>|scope="col"|<time |<data /g);
    expect(project.tests.length).toBeGreaterThanOrEqual(12);
    expect(starter).not.toContain('<section id="schedule"');
  });

  test("rejects structurally plausible but semantically incomplete answers", async () => {
    const unordered = byId("html-05-unordered-benefits");
    const structured = byId("html-05-thead-tbody-scope");
    const machine = byId("html-05-time-data");
    const project = byId("html-05-project-schedule");
    const cases = [
      [unordered, resolveLocaleValue(unordered.solution, "en").replace("<ul>", "<ol>").replace("</ul>", "</ol>")],
      [structured, resolveLocaleValue(structured.solution, "en").replaceAll(' scope="col"', "")],
      [machine, resolveLocaleValue(machine.solution, "en").replace(' datetime="2026-09-18T09:30"', "")],
      [project, resolveLocaleValue(project.solution, "en").replace("<dl>", "<div>").replace("</dl>", "</div>")]
    ];

    for (const [lesson, answer] of cases) {
      expect((await validateLesson(lesson, answer, "en")).some((result) => !result.pass), lesson.id).toBe(true);
    }
  });

  test("aligns every data quiz answer with its displayed question", () => {
    const quiz = byId("html-05-data-quiz");

    expect(quiz.questions[0].answer).toBe("relationships");
    expect(quiz.questions[1].answer).toBe("table");
    expect(quiz.questions[2].answer).toEqual(["headers", "scope", "groups"]);
    expect(quiz.questions[3].answer).toBe("false");
    expect(quiz.questions[4].answer).toEqual(["caption", "thead", "tbody"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["time", "datetime", "2026-09-18T09:30"]));
  });
});
