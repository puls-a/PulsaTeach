import { describe, expect, test } from "vitest";
import { createEmptyProgress, markLessonCompleted, markLessonOpened, mergeProgress, streakStatus, updateStreak } from "../../src/features/learn/learningState.js";

const lesson = { id: "lesson-1", type: "lesson", xp: 25, durationMin: 18, title: { fr: "Leçon", en: "Lesson" } };

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

  test("does not display an expired streak as current", () => {
    const status = streakStatus(
      { count: 8, longest: 8, lastDate: "2026-06-20", totalActiveDays: 8, recentDates: ["2026-06-20"] },
      new Date(2026, 5, 23, 12, 0)
    );
    expect(status).toMatchObject({ count: 0, longest: 8, atRisk: false, activeToday: false, nextMilestone: 3 });
  });

  test("credits daily minutes once and does not extend a streak by repeating a lesson", () => {
    const first = markLessonCompleted(createEmptyProgress(), lesson, 1, new Date(2026, 5, 20, 9, 0));
    const repeated = markLessonCompleted(first, lesson, 1, new Date(2026, 5, 21, 9, 0));
    expect(first.daily.lessonMinutes).toEqual({ "lesson-1": 18 });
    expect(repeated).toBe(first);
    expect(repeated.streak.count).toBe(1);
  });

  test("keeps the newest resume pointer and merges same-day lesson minutes", () => {
    const local = markLessonOpened(createEmptyProgress(), { trackId: "html", moduleId: "one", lessonId: "lesson-1" }, new Date("2026-07-24T08:00:00.000Z"));
    local.daily = { date: "2026-07-24", lessonMinutes: { "lesson-1": 18 } };
    const remote = markLessonOpened(createEmptyProgress(), { trackId: "css", moduleId: "two", lessonId: "lesson-2" }, new Date("2026-07-24T09:00:00.000Z"));
    remote.daily = { date: "2026-07-24", lessonMinutes: { "lesson-2": 12 } };
    expect(mergeProgress(local, remote)).toMatchObject({
      lastOpenedLesson: { lessonId: "lesson-2" },
      daily: { lessonMinutes: { "lesson-1": 18, "lesson-2": 12 } }
    });
  });

  test("keeps the streak count paired with its newest date", () => {
    const local = { ...createEmptyProgress(), streak: { count: 10, longest: 10, lastDate: "2026-06-01", totalActiveDays: 10, recentDates: ["2026-06-01"] } };
    const remote = { ...createEmptyProgress(), streak: { count: 2, longest: 4, lastDate: "2026-06-22", totalActiveDays: 6, recentDates: ["2026-06-22"] } };
    expect(mergeProgress(local, remote).streak).toMatchObject({ count: 2, lastDate: "2026-06-22", longest: 10, totalActiveDays: 10 });
  });

  test("keeps the richest and newest completion evidence while syncing", () => {
    const local = { ...createEmptyProgress(), completed: {
      rich: { passedAt: "2026-06-22T10:00:00.000Z", xp: 30, passedTests: 3 },
      stale: { passedAt: "2026-06-22T10:00:00.000Z", xp: 20 }
    } };
    const remote = { ...createEmptyProgress(), completed: {
      rich: true,
      stale: { passedAt: "2026-06-21T10:00:00.000Z", xp: 10 },
      remote: { passedAt: "2026-06-23T10:00:00.000Z", xp: 40 }
    } };
    expect(mergeProgress(local, remote).completed).toEqual({
      rich: local.completed.rich,
      stale: local.completed.stale,
      remote: remote.completed.remote
    });
  });

  test("keeps the newest quiz evidence while syncing", () => {
    const newer = { attemptedAt: "2026-09-16T10:00:00.000Z", percent: 90, passed: true };
    const older = { attemptedAt: "2026-09-15T10:00:00.000Z", percent: 40, passed: false };
    const merged = mergeProgress({ ...createEmptyProgress(), quizEvidence: { quiz: newer } }, { ...createEmptyProgress(), quizEvidence: { quiz: older } });
    expect(merged.quizEvidence.quiz).toEqual(newer);
  });
});
