// @vitest-environment jsdom
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { moduleLearningMeta } from "../../src/content/moduleMetadata.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const module = htmlPulsaConfModules.find((item) => item.id === "html-final-audit");
const seoModule = htmlPulsaConfModules.find((item) => item.id === "html-seo-publication");
const byId = (id) => module.lessons.find((lesson) => lesson.id === id);
const practice = module.lessons.filter((lesson) => lesson.type === "html");

describe("HTML final audit module", () => {
  test("preserves the final sequence and stable identifiers", () => {
    expect(practice.map((lesson) => lesson.id)).toEqual([
      "html-09-assemble-shell", "html-09-assemble-navigation", "html-09-assemble-content",
      "html-09-assemble-form-media", "html-09-audit-antipatterns"
    ]);
    expect(module.lessons.at(-2).id).toBe("html-09-final-exam");
    expect(module.lessons.at(-1).id).toBe("html-09-final-project-pulsaconf");
  });

  test("starts from the SEO project and carries each release decision forward", () => {
    for (const locale of ["fr", "en"]) {
      expect(resolveLocaleValue(practice[0].starterCode, locale)).toBe(resolveLocaleValue(seoModule.lessons.at(-1).solution, locale));
      for (let index = 1; index < practice.length; index += 1) {
        expect(resolveLocaleValue(practice[index].starterCode, locale)).toBe(resolveLocaleValue(practice[index - 1].solution, locale));
      }
    }
  });

  test("requires work and validates every localized release solution", async () => {
    for (const lesson of module.lessons.filter((item) => item.type !== "quiz")) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  }, 15000);

  test("keeps the final DOM, metadata, and structured event coherent", () => {
    const project = byId("html-09-final-project-pulsaconf");
    for (const locale of ["fr", "en"]) {
      const document = new DOMParser().parseFromString(resolveLocaleValue(project.solution, locale), "text/html");
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const data = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
      expect(new Set(ids).size).toBe(ids.length);
      expect(document.documentElement.lang).toBe(locale);
      expect(document.title).toBe(document.querySelector('meta[property="og:title"]').content);
      expect(document.querySelector('link[rel="canonical"]').href).toBe(document.querySelector('meta[property="og:url"]').content);
      expect(data.name).toBe(document.querySelector("h1").textContent);
      expect(data.inLanguage).toBe(locale);
      for (const link of document.querySelectorAll('a[href^="#"]')) {
        expect(document.querySelector(link.getAttribute("href"))).not.toBeNull();
      }
    }
  });

  test("references final media and downloads that exist in public", () => {
    const document = new DOMParser().parseFromString(resolveLocaleValue(byId("html-09-final-project-pulsaconf").solution, "fr"), "text/html");
    const paths = [...document.querySelectorAll("img[src], source[src], track[src], a[download][href]")]
      .map((element) => element.getAttribute("src") || element.getAttribute("href"));
    for (const path of paths) {
      expect(existsSync(resolve(process.cwd(), "public", path.replace(/^\//, ""))), path).toBe(true);
    }
  });

  test("keeps English artifacts authored and examples separate", () => {
    for (const lesson of practice) {
      const solution = resolveLocaleValue(lesson.solution, "en");
      expect(solution).not.toMatch(/Aller au contenu|Une journée gratuite|Programme|Intervenants|Planning|Inscription|Coordonnées|Adresse email|Écrire à l'équipe|Télécharger/);
      expect(lesson.course.en.sections.every((section) => section.example !== solution)).toBe(true);
      expect(lesson.pedagogy.en.comparison.good.code).not.toBe(solution);
    }
    expect(moduleLearningMeta("html-final-audit").importance.en).not.toContain("à complète");
    expect(moduleLearningMeta("html-final-audit").mastery.en.join(" ")).not.toContain("à purpose");
  });

  test("rejects broken cross-cutting relationships", async () => {
    const cases = [
      [byId("html-09-assemble-shell"), ["en", '<footer id="contact">', "<div>"]],
      [byId("html-09-assemble-navigation"), ["en", 'href="#program"', 'href="#missing"']],
      [byId("html-09-assemble-content"), ["en", 'scope="col"', 'scope="row"']],
      [byId("html-09-assemble-form-media"), ["en", 'for="final-email"', 'for="missing-email"']],
      [byId("html-09-audit-antipatterns"), ["en", 'href="mailto:team@pulsateach.dev"', 'href="#"']]
    ];
    for (const [lesson, [locale, search, replacement]] of cases) {
      const answer = resolveLocaleValue(lesson.solution, locale).replace(search, replacement);
      expect((await validateLesson(lesson, answer, locale)).some((result) => !result.pass), lesson.id).toBe(true);
    }
  });

  test("aligns final exam answers with the displayed audit questions", () => {
    const exam = byId("html-09-final-exam");
    expect(exam.questions).toHaveLength(7);
    expect(exam.questions[0].answer).toBe("targets");
    expect(exam.questions[1].answer).toBe("align");
    expect(exam.questions[2].answer).toEqual(["navigation", "table", "form"]);
    expect(exam.questions[3].answer).toBe("false");
    expect(exam.questions[4].answer).toEqual(["human", "keyboard", "dom", "automated", "metadata"]);
    expect(exam.questions[5].answer).toEqual(expect.arrayContaining(["keyboard", "browser", "mobile", "dynamic"]));
    expect(exam.questions[6].answer).toBe("keyboard");
  });
});
