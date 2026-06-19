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
});

