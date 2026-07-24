import { describe, expect, test } from "vitest";
import { buildDailyDashboard, getDailyGoal } from "../../src/features/dashboard/dashboardModel.js";

const lessons = [
  { id: "lesson-1", title: "One", href: "/learn/html/module/lesson-1" },
  { id: "lesson-2", title: "Two", href: "/learn/html/module/lesson-2" },
  { id: "lesson-3", title: "Three", href: "/learn/html/module/lesson-3" }
];

describe("daily dashboard model", () => {
  test("resumes the last incomplete lesson and keeps a distinct recommendation", () => {
    const model = buildDailyDashboard({
      progress: { completed: {}, lastOpenedLesson: { lessonId: "lesson-2", openedAt: "2026-07-24T09:00:00.000Z" } },
      plannedLessons: [lessons[1], lessons[2]],
      lessons
    });
    expect(model.primaryKind).toBe("resume");
    expect(model.primaryLesson.id).toBe("lesson-2");
    expect(model.recommendedLesson.id).toBe("lesson-3");
  });

  test("continues after the most recently completed lesson", () => {
    const model = buildDailyDashboard({
      progress: { completed: { "lesson-1": { passedAt: "2026-07-24T08:00:00.000Z" } } },
      lessons
    });
    expect(model.primaryKind).toBe("continue");
    expect(model.primaryLesson.id).toBe("lesson-2");
  });

  test("ignores a stale resume pointer", () => {
    const model = buildDailyDashboard({
      progress: { completed: { "lesson-2": { passedAt: "2026-07-24T08:00:00.000Z" } }, lastOpenedLesson: { lessonId: "lesson-2" } },
      plannedLessons: [lessons[0]],
      lessons
    });
    expect(model.primaryLesson.id).toBe("lesson-3");
    expect(model.primaryKind).toBe("continue");
  });

  test("derives a rounded daily target and resets yesterday's minutes", () => {
    const now = new Date(2026, 6, 24, 12, 0);
    expect(getDailyGoal({ date: "2026-07-24", lessonMinutes: { one: 12, two: 8 } }, 120, now)).toMatchObject({ targetMinutes: 20, completedMinutes: 20, percent: 100, complete: true });
    expect(getDailyGoal({ date: "2026-07-23", lessonMinutes: { one: 30 } }, 120, now)).toMatchObject({ completedMinutes: 0, percent: 0, complete: false });
  });
});
