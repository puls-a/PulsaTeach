import { describe, expect, test } from "vitest";
import { learningTracks } from "../../src/content/allTrackRegistry.js";
import { protectedExamIds, sanitizeProgressExamEvidence } from "../../src/features/quizzes/examPolicy.js";
import { normalizeQuizLesson } from "../../src/features/quizzes/quizEngine.js";
import { scheduleQuizReview } from "../../src/features/review/spacedRepetition.js";
import { projectPublicTrack } from "../../server/publicContent.js";

describe("protected exam privacy", () => {
  test("projects every protected exam without browser grading keys", () => {
    const projected = learningTracks.map(projectPublicTrack);
    const exams = projected.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .filter((lesson) => lesson.gradingMode === "server");
    expect(new Set(exams.map((lesson) => lesson.id))).toEqual(protectedExamIds);
    for (const exam of exams) {
      const source = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons)).find((lesson) => lesson.id === exam.id);
      const canonical = normalizeQuizLesson(source, { expand: false });
      expect(exam.questionSetVersion).toBe(`${exam.id}:1`);
      expect(exam.tests).toEqual([]);
      expect(exam.questions.map((question) => question.id)).toEqual(canonical.questions.map((question) => question.id));
      const publicJson = JSON.stringify({ ...exam, questions: exam.questions.map(({ choices: _choices, ...question }) => question) });
      for (const question of canonical.questions) {
        const explanations = Array.isArray(question.explanation)
          ? question.explanation
          : question.explanation && typeof question.explanation === "object" ? Object.values(question.explanation) : [question.explanation];
        for (const explanation of explanations.filter(Boolean)) expect(publicJson).not.toContain(explanation);
      }
      for (const question of exam.questions) {
        expect(question).not.toHaveProperty("answer");
        expect(question).not.toHaveProperty("acceptedAnswers");
        expect(question).not.toHaveProperty("keywords");
        expect(question).not.toHaveProperty("explanation");
      }
    }
  });

  test("does not store protected exam questions in spaced review", () => {
    const lesson = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .find((item) => item.id === "html-09-final-exam");
    const quiz = { ...normalizeQuizLesson(lesson), gradingMode: "server", questionSetVersion: `${lesson.id}:1` };
    const question = quiz.questions[0];
    const items = scheduleQuizReview({}, quiz, {
      results: [{ questionId: question.id, correct: false, feedback: { en: "Review the scenario." } }]
    });
    expect(items).toEqual({});
  });

  test("scrubs grading keys from legacy protected progress", () => {
    const progress = sanitizeProgressExamEvidence({ review: { items: {
      legacy: { quizId: "git-final-exam", answer: "secret", acceptedAnswers: ["secret"], keywords: ["secret"] }
    } } });
    expect(progress.review.items).toEqual({});
  });
});
