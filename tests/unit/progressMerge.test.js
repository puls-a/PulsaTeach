import { describe, expect, test } from "vitest";
import { mergeProgress } from "../../server/domainHelpers.js";

describe("server progress merge", () => {
  test("preserves rich lesson completion evidence", () => {
    const remote = { completed: { lesson: { passedAt: "2026-09-15T10:00:00.000Z", xp: 20, passedTests: 2 } } };
    const local = { completed: { lesson: true, newer: { passedAt: "2026-09-16T10:00:00.000Z", xp: 30, passedTests: 3 } } };
    const merged = mergeProgress(remote, local);
    expect(merged.completed.lesson).toEqual(remote.completed.lesson);
    expect(merged.completed.newer).toEqual(local.completed.newer);
  });

  test("unions game missions and computes canonical rewards", () => {
    const merged = mergeProgress(
      { game: { missions: { "arrow-target-horizontal": true } } },
      { game: { xp: 5000, missions: { "arrow-target-vertical": 5000 } } }
    );
    expect(merged.game).toMatchObject({
      xp: 50,
      missions: { "arrow-target-horizontal": 20, "arrow-target-vertical": 30 },
      badges: {}
    });
  });

  test("keeps the newest quiz evidence by attemptedAt", () => {
    const newer = { attemptedAt: "2026-09-16T10:00:00.000Z", percent: 90, passed: true };
    const older = { attemptedAt: "2026-09-15T10:00:00.000Z", percent: 40, passed: false };
    expect(mergeProgress({ quizEvidence: { quiz: newer } }, { quizEvidence: { quiz: older } }).quizEvidence.quiz).toEqual(newer);
  });
});
