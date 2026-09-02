import { describe, expect, test } from "vitest";
import { auditCurriculumDepth } from "../../scripts/audit-curriculum-depth.mjs";
import { cssTrack } from "../../src/content/cssTrack.js";

const floor = { demo: { stage: "professional", modules: 1, lessons: 3, quizzes: 1, projects: 1, averageTests: 1, testedPracticeRatio: 1 } };

function lesson(id, title, brief, extra = {}) {
  return { id, title: { fr: title, en: title }, brief: { fr: brief, en: brief }, tests: [{ type: "contains", value: id }], ...extra };
}

function validTrack() {
  return {
    id: "demo",
    modules: [{
      id: "demo-module",
      lessons: [
        lesson("demo-practice", "Model a stable contract", "Implement explicit states and verify each transition"),
        lesson("demo-project", "Deliver the production workflow", "Combine validation, recovery, and observable evidence", { type: "project" }),
        lesson("demo-quiz", "Review decisions", "Explain the safest implementation", { type: "quiz", questions: [{ id: "q1" }] })
      ]
    }]
  };
}

describe("curriculum depth audit", () => {
  test("keeps active CSS lesson prompts concept-specific", () => {
    const result = auditCurriculumDepth([cssTrack], { css: {
      stage: "comprehensive",
      modules: 15,
      lessons: 120,
      quizzes: 15,
      projects: 15,
      averageTests: 4.5,
      testedPracticeRatio: 0.95
    } }, { nearDuplicatePromptPairs: { css: 0 }, duplicateLessons: new Set() });

    expect(result.debt.nearDuplicatePromptPairs.css ?? []).toEqual([]);
    expect(result.failures).toEqual([]);
  });

  test("accepts a track that meets its staged quality floor", () => {
    expect(auditCurriculumDepth([validTrack()], floor).failures).toEqual([]);
  });

  test("reports unsupported tracks and actionable floor gaps", () => {
    const weak = validTrack();
    weak.id = "unknown";
    weak.modules[0].lessons = weak.modules[0].lessons.slice(0, 1);
    const failures = auditCurriculumDepth([weak], floor).failures.join("\n");
    expect(failures).toContain("unsupported track; add an explicit staged floor");
    expect(failures).toContain("demo: track with configured professional floor is missing");
  });

  test("rejects duplicate IDs, missing assessment progression, and repeated prompts", () => {
    const track = validTrack();
    track.modules[0].lessons[1] = lesson("demo-practice", "Model a stable contract", "Implement explicit states and verify each transition");
    track.modules[0].lessons = track.modules[0].lessons.slice(0, 2);
    const failures = auditCurriculumDepth([track], floor).failures.join("\n");
    expect(failures).toContain("duplicate lesson ID");
    expect(failures).toContain("module has no quiz or assessment");
    expect(failures).toContain("near-duplicate lesson prompt pairs");
    expect(failures).toContain("quizzes 0 is below the professional floor 1");
  });
});
