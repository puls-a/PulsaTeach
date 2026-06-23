import { describe, expect, test } from "vitest";
import { buildReviewQueue, createQuizDraft, evaluateQuestion, normalizeQuizLesson, scoreQuiz, shuffleQuestions } from "../../src/features/quizzes/quizEngine.js";

describe("quiz engine", () => {
  test("expands a legacy single-question lesson into a fuller diagnostic", () => {
    const quiz = normalizeQuizLesson({
      id: "legacy",
      title: { fr: "Quiz", en: "Quiz" },
      question: { fr: "Question", en: "Question" },
      options: [
        { id: "a", label: { fr: "A", en: "A" } },
        { id: "b", label: { fr: "B", en: "B" } }
      ],
      answer: "a",
      explanation: { fr: "Oui", en: "Yes" }
    });
    expect(quiz.questions).toHaveLength(6);
    expect(quiz.questions[0].type).toBe("single");
    expect(quiz.questions[1].type).toBe("error-identification");
    expect(quiz.questions.map((question) => question.type)).toEqual([
      "single",
      "error-identification",
      "true-false",
      "multiple",
      "ordering",
      "short-open"
    ]);
  });

  test.each([
    [{ id: "single", type: "single", answer: "b" }, "b", true],
    [{ id: "multiple", type: "multiple", answer: ["a", "c"] }, ["c", "a"], true],
    [{ id: "ordering", type: "ordering", answer: ["a", "b"] }, ["b", "a"], false],
    [{ id: "matching", type: "matching", answer: { a: "1", b: "2" } }, { a: "1", b: "2" }, true],
    [{ id: "blank", type: "fill-blank", acceptedAnswers: ["const total = 2;"] }, " const total=2; ", true],
    [{ id: "open", type: "short-open", keywords: ["label", "input"] }, "Le label décrit l'input.", true]
  ])("evaluates supported question responses", (question, response, expected) => {
    expect(evaluateQuestion({ points: 1, ...question }, response).correct).toBe(expected);
  });

  test("scores weighted questions and creates a focused review queue", () => {
    const quiz = {
      id: "quiz",
      passingScore: 70,
      questions: [
        { id: "q1", type: "single", answer: "a", points: 2, skills: ["html"], glossaryTerms: ["label"] },
        { id: "q2", type: "single", answer: "b", points: 1, skills: ["a11y"], glossaryTerms: ["aria"] }
      ]
    };
    const score = scoreQuiz(quiz, { q1: "a", q2: "x" });
    expect(score.percent).toBe(67);
    expect(score.passed).toBe(false);
    expect(buildReviewQueue(quiz, score)).toEqual([{ questionId: "q2", skills: ["a11y"], glossaryTerms: ["aria"] }]);
  });

  test("restores only answers belonging to the current quiz", () => {
    const draft = createQuizDraft(
      { id: "quiz", questions: [{ id: "q1" }, { id: "q2" }] },
      { currentIndex: 99, responses: { q1: "a", removed: "x" }, rationales: { q2: "Because", removed: "No" } }
    );
    expect(draft.currentIndex).toBe(1);
    expect(draft.responses).toEqual({ q1: "a" });
    expect(draft.rationales).toEqual({ q2: "Because" });
  });

  test("shuffles deterministically when a random source is supplied", () => {
    const values = [0, 0];
    expect(shuffleQuestions(["a", "b", "c"], () => values.shift())).toEqual(["b", "c", "a"]);
  });
});
