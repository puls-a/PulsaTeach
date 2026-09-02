import { describe, expect, test } from "vitest";
import { learningTracks } from "../../src/content/allTrackRegistry.js";
import { getQuestionSetVersion, protectedExamIds, sanitizeProgressExamEvidence } from "../../src/features/quizzes/examPolicy.js";
import { normalizeQuizLesson } from "../../src/features/quizzes/quizEngine.js";
import { scheduleQuizReview } from "../../src/features/review/spacedRepetition.js";
import { decodeProtectedExamResponses, projectPublicTrack } from "../../server/publicContent.js";

const examTokenSecret = "privacy-test-secret";

describe("protected exam privacy", () => {
  test("projects every protected exam without browser grading keys", () => {
    const projected = learningTracks.map((track) => projectPublicTrack(track, examTokenSecret));
    const exams = projected.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .filter((lesson) => lesson.gradingMode === "server");
    expect(new Set(exams.map((lesson) => lesson.id))).toEqual(protectedExamIds);
    for (const exam of exams) {
      const source = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons)).find((lesson) => lesson.id === exam.id);
      const canonical = normalizeQuizLesson(source, { expand: false });
      expect(exam.questionSetVersion).toBe(getQuestionSetVersion(source));
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
        const canonicalQuestion = canonical.questions.find((item) => item.id === question.id);
        if (canonicalQuestion.choices?.length) {
          expect(question.choices.map((choice) => choice.id)).not.toEqual(canonicalQuestion.choices.map((choice) => choice.id));
        }
      }
      const sourceTrack = learningTracks.find((track) => track.modules.some((module) => module.lessons.some((lesson) => lesson.id === source.id)));
      const repeatedExams = Array.from({ length: 32 }, () => projectPublicTrack(sourceTrack, examTokenSecret))
        .flatMap((track) => track.modules.flatMap((module) => module.lessons))
        .filter((lesson) => lesson.id === exam.id);
      for (const canonicalQuestion of canonical.questions.filter((question) => ["single", "true-false", "code-reading", "error-identification"].includes(question.type))) {
        const answerPositions = new Set(repeatedExams.map((repeatedExam) => {
          const publicQuestion = repeatedExam.questions.find((question) => question.id === canonicalQuestion.id);
          return publicQuestion.choices.findIndex((choice) => decodeProtectedExamResponses(
            canonical,
            { [canonicalQuestion.id]: choice.id },
            examTokenSecret
          )[canonicalQuestion.id] === canonicalQuestion.answer);
        }));
        expect(answerPositions.size, `${exam.id}/${canonicalQuestion.id} must vary correct-answer position`).toBeGreaterThan(1);
      }
    }
  });

  test("rejects forged protected choice tokens", () => {
    const lesson = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .find((item) => item.id === "git-final-exam");
    const quiz = normalizeQuizLesson(lesson, { expand: false });
    expect(() => decodeProtectedExamResponses(quiz, { [quiz.questions[0].id]: "forged.token" }, examTokenSecret))
      .toThrow("Invalid protected exam choice token");
  });

  test("does not store protected exam questions in spaced review", () => {
    const lesson = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .find((item) => item.id === "html-09-final-exam");
    const quiz = { ...normalizeQuizLesson(lesson), gradingMode: "server", questionSetVersion: `${lesson.id}:2` };
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
