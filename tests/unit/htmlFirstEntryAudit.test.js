// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { displayTestLabel, testFailureHelp, validateLesson } from "../../src/lessonRuntime.js";

const lesson = htmlPulsaConfModules[0].lessons[0];

describe("HTML first entry contract (PT-01/PT-02)", () => {
  test("advertises one approximately 15-minute exercise, distinct from the 79-step project", () => {
    expect(lesson.id).toBe("html-00-what-html-does");
    expect(lesson.durationMin).toBe(15);
    expect(lesson.stepNumber).toBe(1);
    expect(lesson.stepCount).toBe(79);
    expect(lesson.brief.fr).toContain("titre h1");
    expect(lesson.brief.en).toContain("h1 heading");
  });

  test("the initial code fails only the two required structures; a fresh solution passes with or without main", async () => {
    for (const locale of ["fr", "en"]) {
      const starter = resolveLocaleValue(lesson.starterCode, locale);
      const solution = resolveLocaleValue(lesson.solution, locale);
      expect((await validateLesson(lesson, starter, locale)).map((check) => check.pass)).toEqual([false, false, true, true, true]);
      for (const code of [solution, `<main>${solution}</main>`]) {
        expect((await validateLesson(lesson, code, locale)).every((check) => check.pass)).toBe(true);
      }
      expect(lesson.pedagogy[locale].correction.join(" ")).toMatch(locale === "fr" ? /h1.*p.*main/ : /h1.*p.*main/);
      expect(lesson.course[locale].sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy[locale].comparison.good.code).not.toBe(solution);
    }
  });

  test("rejects text in the wrong element, a missing role, and forbidden tags", async () => {
    const intro = "Une journée pour apprendre le web.";
    for (const code of [
      `<h1>Un autre événement</h1><p>PulsaConf 2026 ${intro}</p>`,
      `<h1>PulsaConf 2026</h1>${intro}`,
      `PulsaConf 2026<p>${intro}</p>`,
      `<h1>PulsaConf 2026</h1><p>${intro}</p><style>h1 { color: red }</style>`,
      `<h1>PulsaConf 2026</h1><p>${intro}</p><script>console.log('x')</script>`
    ]) {
      expect((await validateLesson(lesson, code, "fr")).some((check) => !check.pass), code).toBe(true);
    }
  });

  test("failure labels and actionable help are localized without exposing the lesson slug", () => {
    for (const locale of ["fr", "en"]) {
      for (const check of lesson.tests) {
        expect(displayTestLabel(check, locale)).not.toContain(lesson.id);
      }
      for (const check of lesson.tests.slice(0, 2)) {
        const label = displayTestLabel(check, locale);
        const help = testFailureHelp(check, locale);
        expect(label).toMatch(locale === "fr" ? /titre h1|paragraphe p/ : /h1 heading|p paragraph/);
        expect(help).toContain(check.value.selector === "h1" ? "<h1>" : "<p>");
      }
      expect(lesson.course[locale].sections.flatMap((section) => section.paragraphs).join(" ")).not.toContain(lesson.id);
    }
  });
});
