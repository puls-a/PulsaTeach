import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";

const curriculumPath = new URL("../../src/content/htmlPulsaConfCurriculum.js", import.meta.url);

describe("HTML curriculum copy integrity", () => {
  test("does not contain the automated accent regressions", async () => {
    const source = await readFile(curriculumPath, "utf8");
    const forbidden = [
      /\bn'à\b/i,
      /\b(?:the|with|as|into|not|ship|has|is|being|like|from|install|connect|diagnose|mark|disable|stabilize)\s+à\b/i,
      /\b(?:You prépare|This step préparés)\b/i,
      /\b(?:HTML éléments?|native HTML élément|verifiable élément|meaningful élément)\b/i,
      /\b(?:Ignored décorative|Complète Open Graph|Set up the complète)\b/i,
      /\b(?:texte à une intention|outil à une responsabilité|zone à une raison)\b/i
    ];

    for (const pattern of forbidden) {
      expect(source, `Forbidden copy regression: ${pattern}`).not.toMatch(pattern);
    }
  });

  test("keeps the corrected French onboarding sentences", async () => {
    const source = await readFile(curriculumPath, "utf8");

    expect(source).toContain("chaque morceau de texte a une intention lisible");
    expect(source).toContain("Un manifeste plutôt qu'une installation simulée");
    expect(source).toContain("le navigateur a vraiment compris");
    expect(source).toContain("PulsaTeach ne te demande pas de deviner");
  });

  test("uses module-specific pedagogy instead of the legacy universal boilerplate", async () => {
    const source = await readFile(curriculumPath, "utf8");

    expect(source).not.toContain("doit être compréhensible par un navigateur, un moteur de recherche");
    expect(source).not.toContain("must be understandable by browsers, search engines");
    expect(source).toContain("Construire une méthode de travail fiable");
    expect(source).toContain("Transformer le contenu en plan lisible");
    expect(source).toContain("Construire une saisie exploitable");
    expect(source).toContain("Passer d'exercices isolés à un produit cohérent");
  });

  test("uses authored English copy for learner-facing starter and reference artifacts", () => {
    const englishArtifacts = htmlPulsaConfModules
      .flatMap((module) => module.lessons)
      .filter((lesson) => lesson.type !== "quiz")
      .flatMap((lesson) => [resolveLocaleValue(lesson.starterCode, "en"), resolveLocaleValue(lesson.solution, "en")]);
    const corruptedPatterns = [
      /\b(?:Write|Open|Choose|Submit|Download)\s+(?:à|le|les|un|une|l')/i,
      /\b(?:freee|frees)\b/i,
      /\b(?:Maya présente|Samir relie|Utilise l'adresse|Aller au contenu principal)\b/i,
      /<!--\s*(?:Assemble|Construis|Décris)\b/i
    ];

    expect(englishArtifacts.every((artifact) => artifact.trim().length > 0)).toBe(true);
    for (const pattern of corruptedPatterns) {
      expect(englishArtifacts.join("\n"), `Corrupted English artifact: ${pattern}`).not.toMatch(pattern);
    }
  });

  test("keeps French prose out of generated English artifacts", () => {
    const englishArtifacts = htmlPulsaConfModules
      .flatMap((module) => module.lessons)
      .filter((lesson) => lesson.type !== "quiz")
      .flatMap((lesson) => [resolveLocaleValue(lesson.starterCode, "en"), resolveLocaleValue(lesson.solution, "en")])
      .join("\n")
      // URLs and filenames may intentionally preserve French routes or asset names.
      .replace(/\b(?:action|href|src)=(?:"[^"]*"|'[^']*')/gi, "");
    const frenchProse = [
      /\b(?:le|la|les|des|une|un|pour|avec|dans|sur|est|sont|pas|que|qui|vous|tu|ton|ta|tes|je|au|aux|cet|cette)\b/i,
      /\b(?:ajoute|assemble|construis|décris|écrire|sauvegarder|recharger|ouvrir|vérifier|modifier|apprendre|inscription|programme|intervenants|atelier|formulaire|journée|gratuit(?:e)?|débutants?)\b/i,
      /(?:à|é|è|ê|ç|ù|œ)/i
    ];

    for (const pattern of frenchProse) {
      expect(englishArtifacts, `French prose in English artifact: ${pattern}`).not.toMatch(pattern);
    }
  });

  test("does not generate English artifacts from broad token translations", async () => {
    const source = await readFile(curriculumPath, "utf8");

    expect(source).not.toContain("function translateArtifact");
    expect(source).toContain("Artifact copy is authored as complete learner-facing phrases");
  });
});
