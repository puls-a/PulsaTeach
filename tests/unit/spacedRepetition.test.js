import { describe, expect, test } from "vitest";
import { applyReviewRating, buildReviewSession, getReviewStats, reviewMastery, scheduleQuizReview } from "../../src/features/review/spacedRepetition.js";

const quiz = {
  id: "quiz-1",
  questions: [
    { id: "q1", type: "single", answer: "a", prompt: { fr: "Q1", en: "Q1" }, choices: [{ id: "a" }], skills: ["html"] },
    { id: "q2", type: "single", answer: "b", prompt: { fr: "Q2", en: "Q2" }, choices: [{ id: "b" }], skills: ["a11y"] }
  ]
};
const now = new Date("2026-06-21T10:00:00.000Z");

describe("spaced repetition", () => {
  test("adds only failed quiz questions to the immediate review queue", () => {
    const items = scheduleQuizReview({}, quiz, {
      results: [
        { questionId: "q1", correct: true },
        { questionId: "q2", correct: false }
      ]
    }, { trackId: "html", moduleId: "forms", lessonId: "quiz-1" }, now);

    expect(Object.keys(items)).toEqual(["quiz-1:q2"]);
    expect(items["quiz-1:q2"]).toMatchObject({
      dueAt: now.toISOString(),
      lapses: 1,
      confidence: 0,
      skills: ["a11y"]
    });
  });

  test("uses progressive intervals and resets a forgotten item", () => {
    const initial = { id: "quiz-1:q2", intervalDays: 0, repetitions: 0, ease: 2.5, lapses: 1 };
    const good = applyReviewRating(initial, "good", now);
    const secondGood = applyReviewRating(good, "good", new Date("2026-06-22T10:00:00.000Z"));
    const forgotten = applyReviewRating(secondGood, "again", new Date("2026-06-25T10:00:00.000Z"));

    expect(good.intervalDays).toBe(1);
    expect(secondGood.intervalDays).toBe(3);
    expect(forgotten).toMatchObject({ intervalDays: 0, repetitions: 0, confidence: 0, lapses: 2 });
    expect(new Date(forgotten.dueAt).getTime()).toBe(new Date("2026-06-25T10:10:00.000Z").getTime());
  });

  test("prioritizes overdue low-confidence items and respects session size", () => {
    const items = Object.fromEntries(Array.from({ length: 8 }, (_, index) => [
      `q${index}`,
      {
        id: `q${index}`,
        dueAt: new Date(now.getTime() - index * 24 * 60 * 60 * 1000).toISOString(),
        lapses: index,
        confidence: index / 10
      }
    ]));
    const session = buildReviewSession(items, 5, now);
    expect(session).toHaveLength(5);
    expect(session[0].id).toBe("q7");
  });

  test("marks repeated, recent and not-due evidence as mastered", () => {
    const item = applyReviewRating(
      applyReviewRating(
        applyReviewRating({ id: "q", intervalDays: 0, repetitions: 0, ease: 2.5 }, "easy", now),
        "easy",
        new Date("2026-06-24T10:00:00.000Z")
      ),
      "easy",
      new Date("2026-07-01T10:00:00.000Z")
    );
    const mastery = reviewMastery(item, new Date("2026-07-02T10:00:00.000Z"));
    expect(mastery.status).toBe("mastered");
    expect(getReviewStats({ q: item }, new Date("2026-07-02T10:00:00.000Z"))).toMatchObject({ total: 1, due: 0, mastered: 1 });
  });
});
