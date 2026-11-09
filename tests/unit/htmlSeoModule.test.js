// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const module = htmlPulsaConfModules.find((item) => item.id === "html-seo-publication");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "html");

describe("HTML SEO and publishing module", () => {
  test("preserves the publishing sequence and stable identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "html-08-seo-title", "html-08-meta-description", "html-08-canonical",
      "html-08-open-graph", "html-08-favicon-hreflang", "html-08-json-ld"
    ]);
    expect(module.lessons.at(-2).id).toBe("html-08-seo-quiz");
    expect(module.lessons.at(-1).id).toBe("html-08-project-head");
  });

  test("carries every head decision into the next lesson", () => {
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
  }, 15000);

  test("keeps search, social, language, and structured event data coherent", () => {
    const project = byId("html-08-project-head");
    for (const locale of ["fr", "en"]) {
      const document = new DOMParser().parseFromString(resolveLocaleValue(project.solution, locale), "text/html");
      const data = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
      expect(document.documentElement.lang).toBe(locale);
      expect(document.title).toBe(document.querySelector('meta[property="og:title"]').content);
      expect(document.querySelector('link[rel="canonical"]').href).toBe(document.querySelector('meta[property="og:url"]').content);
      expect(data.name).toBe(document.querySelector("h1").textContent);
      expect(data.inLanguage).toBe(locale);
      expect(document.body.textContent).toContain(data.location.name);
      expect(data.eventAttendanceMode).toContain("OfflineEventAttendanceMode");
    }
    expect(resolveLocaleValue(byId("html-08-canonical").solution, "fr")).toContain("example.com est réservé à la documentation");
    expect(resolveLocaleValue(byId("html-08-canonical").solution, "en")).toContain("example.com is reserved for documentation");
  });

  test("references social and favicon assets that exist in public", () => {
    expect(existsSync(resolve(process.cwd(), "public/assets/og-pulsateach-v2.png"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "public/assets/favicon.ico"))).toBe(true);
  });

  test("keeps English publishing artifacts authored and examples separate", () => {
    for (const lesson of practice) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      expect(solution).not.toMatch(/Ateliers HTML|formulaires accessibles|inscription|réservé à la documentation|Une journée|Auditorium principal/);
      expect(lesson.course.en.sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(solution);
    }
  });

  test("rejects missing or incoherent publishing metadata", async () => {
    const cases = [
      [byId("html-08-seo-title"), ["en", "Accessible HTML workshops", "Home"]],
      [byId("html-08-meta-description"), ["en", "semantic HTML", "cooking"]],
      [byId("html-08-canonical"), ["en", "https://example.com/en/pulsaconf", "/en/pulsaconf"]],
      [byId("html-08-open-graph"), ["en", "https://pulsateach.com/assets/og-pulsateach-v2.png", "/assets/share.png"]],
      [byId("html-08-favicon-hreflang"), ["en", 'hreflang="en" href="https://example.com/en/pulsaconf"', 'hreflang="en" href="/en/pulsaconf"']],
      [byId("html-08-json-ld"), ["en", "OfflineEventAttendanceMode", "OnlineEventAttendanceMode"]]
    ];
    for (const [lesson, [locale, search, replacement]] of cases) {
      const answer = resolveLocaleValue(lesson.solution, locale).replace(search, replacement);
      expect((await validateLesson(lesson, answer, locale)).some((result) => !result.pass), lesson.id).toBe(true);
    }
  });

  test("aligns quiz answers with publishing decisions", () => {
    const quiz = byId("html-08-seo-quiz");
    expect(quiz.questions[0].answer).toBe("generic");
    expect(quiz.questions[1].answer).toBe("canonical");
    expect(quiz.questions[2].answer).toEqual(["title", "description", "social"]);
    expect(quiz.questions[3].answer).toBe("false");
    expect(quiz.questions[4].answer).toEqual(["visible", "search", "canonical", "social", "structured"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["name", "startdate", "location", "inlanguage"]));
  });
});
