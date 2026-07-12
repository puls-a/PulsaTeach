import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";

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
    expect(source).toContain("chaque outil a une responsabilité claire");
    expect(source).toContain("le navigateur a vraiment compris");
    expect(source).toContain("PulsaTeach ne te demande pas de deviner");
  });
});
