import { describe, expect, test } from "vitest";
import { createEmptyProgress, markLessonCompleted, streakStatus, updateStreak } from "../../src/features/learn/learningState.js";

const lesson = { id: "lesson-1", type: "lesson", xp: 25, title: { fr: "Leçon", en: "Lesson" } };

describe("learning streak", () => {
  test("increments on consecutive local days and tracks the record", () => {
    const first = updateStreak(undefined, new Date(2026, 5, 20, 23, 30));
    const second = updateStreak(first, new Date(2026, 5, 21, 8, 0));
    expect(second).toMatchObject({ count: 2, longest: 2, totalActiveDays: 2 });
    expect(second.recentDates).toHaveLength(2);
  });

  test("does not count multiple completions on the same day", () => {
    const first = updateStreak(undefined, new Date(2026, 5, 20, 8, 0));
    expect(updateStreak(first, new Date(2026, 5, 20, 20, 0))).toEqual(first);
  });

  test("resets after a missed day while preserving the longest streak", () => {
    const current = { count: 5, longest: 5, lastDate: "2026-06-18", totalActiveDays: 5, recentDates: ["2026-06-18"] };
    expect(updateStreak(current, new Date(2026, 5, 20, 9, 0))).toMatchObject({ count: 1, longest: 5, totalActiveDays: 6 });
  });

  test("grants the daily XP bonus only once", () => {
    const first = markLessonCompleted(createEmptyProgress(), lesson, 1, new Date(2026, 5, 20, 9, 0));
    const second = markLessonCompleted(first, { ...lesson, id: "lesson-2" }, 1, new Date(2026, 5, 20, 12, 0));
    expect(first.xp).toBe(35);
    expect(first.activity[0].bonusXp).toBe(10);
    expect(second.xp).toBe(60);
    expect(second.activity[0].bonusXp).toBe(0);
  });

  test("reports an at-risk streak and its next milestone", () => {
    const status = streakStatus(
      { count: 6, longest: 6, lastDate: "2026-06-22", totalActiveDays: 6, recentDates: ["2026-06-22"] },
      new Date(2026, 5, 23, 12, 0)
    );
    expect(status).toMatchObject({ count: 6, atRisk: true, activeToday: false, nextMilestone: 7 });
  });
});
