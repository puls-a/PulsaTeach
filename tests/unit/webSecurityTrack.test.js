import { describe, expect, test } from "vitest";
import { webSecurityTrack } from "../../src/content/tracks/web-security.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const expectedModuleIds = [
  "sec-risk-modeling", "sec-browser-defenses", "sec-api-abuse", "sec-files-secrets", "sec-monitoring-incident",
  "security-threats-input", "security-identity", "security-platform", "security-incident"
];
const lessons = webSecurityTrack.modules.flatMap((module) => module.lessons);

describe("active web security curriculum", () => {
  test("preserves stable IDs and counts", () => {
    expect(webSecurityTrack.modules.map((module) => module.id)).toEqual(expectedModuleIds);
    expect(webSecurityTrack.modules).toHaveLength(9);
    expect(lessons).toHaveLength(60);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(60);
  });

  test("progresses from threat modeling through layered defense to incident response", () => {
    const sequence = webSecurityTrack.modules.map((module) => `${module.title.en} ${module.description.en}`).join(" | ");
    expect(sequence).toMatch(/defender.*Browser defenses.*APIs.*supply chain.*incident/is);
    expect(webSecurityTrack.modules.at(-1).lessons.some((lesson) => lesson.id === "sec-04-capstone")).toBe(true);
  });

  test("keeps authored French and English at structural parity", () => {
    for (const module of webSecurityTrack.modules) {
      expect(module.title.fr).toBeTruthy();
      expect(module.title.en).toBeTruthy();
      for (const lesson of module.lessons) {
        expect(lesson.title.fr).toBeTruthy();
        expect(lesson.title.en).toBeTruthy();
        expect(lesson.brief.fr).toBeTruthy();
        expect(lesson.brief.en).toBeTruthy();
        if (lesson.type === "quiz") {
          for (const question of lesson.questions) {
            expect(question.prompt.fr).toBeTruthy();
            expect(question.prompt.en).toBeTruthy();
            expect(question.choices.every((choice) => choice.label.fr && choice.label.en)).toBe(true);
          }
        }
      }
    }
    const generated = webSecurityTrack.modules.slice(0, 5).flatMap((module) => module.lessons);
    expect(generated.filter((lesson) => lesson.title.fr === lesson.title.en).length).toBeLessThan(4);
  });

  test("resolves learner artifacts in both locales across every module", () => {
    const practices = lessons.filter((lesson) => lesson.type !== "quiz");
    for (const lesson of practices) {
      for (const locale of ["fr", "en"]) {
        const solution = resolveLocaleValue(lesson.solution, locale);
        const starterCode = resolveLocaleValue(lesson.starterCode, locale);
        expect(typeof solution, `${lesson.id} ${locale} solution`).toBe("string");
        expect(typeof starterCode, `${lesson.id} ${locale} starter`).toBe("string");
        expect(solution.trim(), `${lesson.id} ${locale} solution`).not.toBe("");
        for (const check of lesson.tests) {
          const localized = resolveLocaleValue(check, locale);
          expect(typeof localized.label, `${lesson.id} ${locale} test label`).toBe("string");
          expect(localized.label.trim(), `${lesson.id} ${locale} test label`).not.toBe("");
        }
      }
    }
  });

  test("ships English text artifacts without French headings or validation copy", () => {
    const englishArtifacts = lessons.filter((lesson) => lesson.type !== "quiz").map((lesson) => ({
      id: lesson.id,
      solution: resolveLocaleValue(lesson.solution, "en"),
      starterCode: resolveLocaleValue(lesson.starterCode, "en"),
      labels: lesson.tests.map((check) => resolveLocaleValue(check.label, "en")).join("\n")
    }));
    const forbiddenFrench = /(^|\n)#{1,3}\s+(actifs|frontières|risques prioritaires|correctifs|preuves)\b|\b(implémente le contrôle|évalue chaque scénario|le livrable contient)\b/i;
    for (const artifact of englishArtifacts) {
      expect(`${artifact.solution}\n${artifact.starterCode}\n${artifact.labels}`, artifact.id).not.toMatch(forbiddenFrench);
    }
    const capstone = englishArtifacts.find((artifact) => artifact.id === "sec-04-capstone");
    expect(capstone.solution).toContain("## Assets and boundaries");
    expect(capstone.solution).toContain("## Incident");
    expect(capstone.solution).not.toContain("## Actifs et frontières");
  });

  test("uses language-neutral quiz answer identifiers in all modules", () => {
    for (const lesson of lessons.filter((item) => item.type === "quiz")) {
      for (const question of lesson.questions) {
        expect(question.choices.some((choice) => choice.id === question.answer)).toBe(true);
        expect(question.answer).toMatch(new RegExp(`^${question.id}-\\d+$`));
        expect(question.answer).not.toMatch(/[àâçéèêëîïôùûüÿœ]|\s/i);
      }
    }
  });

  test("uses unique assessment prompts with plausible alternatives", () => {
    const questions = lessons.filter((lesson) => lesson.type === "quiz").flatMap((lesson) => lesson.questions);
    const prompts = questions.map((question) => question.prompt.fr.toLowerCase());
    expect(new Set(prompts).size).toBe(prompts.length);
    const authoredQuestions = webSecurityTrack.modules.slice(0, 5).flatMap((module) => module.lessons).filter((lesson) => lesson.type === "quiz").flatMap((lesson) => lesson.questions);
    for (const question of authoredQuestions) {
      expect(question.choices.length).toBeGreaterThanOrEqual(3);
      expect(question.choices.every((choice) => choice.label.fr.length > 8 && choice.label.en.length > 8)).toBe(true);
    }
  });

  test("validates hostile behavior and keeps defensive ethical framing", () => {
    const generatedPractice = webSecurityTrack.modules.slice(0, 5).flatMap((module) => module.lessons).filter((lesson) => lesson.type !== "quiz");
    expect(generatedPractice.every((lesson) => lesson.tests.length >= 2)).toBe(true);
    expect(generatedPractice.every((lesson) => lesson.tests.every((check) => check.type === "jsExpression"))).toBe(true);
    expect(generatedPractice.every((lesson) => lesson.tests.some((check) => /refus|hostile|attaque|invalide|expurg|compromis|manquante|denied|missing/i.test(resolveLocaleValue(check.label, "fr"))))).toBe(true);
    const copy = JSON.stringify(webSecurityTrack);
    expect(copy).toMatch(/défenseur|defender/i);
    expect(copy).toMatch(/préserv|preserv/i);
    expect(copy).toMatch(/sans blâme|without assigning blame/i);
    expect(copy).not.toMatch(/voler un mot de passe|steal a password|contourner l'authentification|bypass authentication/i);
  });
});
