import { describe, expect, test } from "vitest";
import { buildSkillIndex, computeSkillProgress } from "../../src/features/skills/skillIndex.js";

const tracks = [{
  id: "html",
  modules: [{
    id: "foundations",
    lessons: [
      { id: "l1", skills: ["Semantic HTML", "Accessibility"] },
      { id: "l2", skills: ["Accessibility"] }
    ]
  }]
}];

describe("skill index", () => {
  test("deduplicates skills and keeps lesson evidence", () => {
    const skills = buildSkillIndex(tracks);
    expect(skills).toHaveLength(2);
    expect(skills.find((skill) => skill.id === "accessibility").lessonRefs).toHaveLength(2);
  });

  test("computes discovered, practicing and mastered states", () => {
    const practicing = computeSkillProgress(tracks, { completed: { l1: {} } });
    expect(practicing.find((skill) => skill.id === "accessibility")).toMatchObject({ percent: 50, status: "practicing" });
    expect(practicing.find((skill) => skill.id === "semantic-html")).toMatchObject({ percent: 100, status: "mastered" });
  });

  test("combines lesson, quiz and spaced-review evidence", () => {
    const now = new Date();
    const result = computeSkillProgress(tracks, {
      completed: { l1: {} },
      quizEvidence: {
        quiz: { skills: { Accessibility: { percent: 100 } } }
      },
      review: {
        items: {
          question: {
            skills: ["Accessibility"],
            confidence: 1,
            repetitions: 3,
            lastReviewedAt: now.toISOString(),
            dueAt: new Date(now.getTime() + 86400000).toISOString()
          }
        }
      }
    });

    expect(result.find((skill) => skill.id === "accessibility")).toMatchObject({
      lessonPercent: 50,
      quizEvidence: 1,
      reviewEvidence: 1,
      percent: 75,
      status: "practicing"
    });
  });
});
