import { describe, expect, test } from "vitest";
import { createLessonDraft, createModuleDraft, validateCourseForPublication } from "../../src/courseSchema.js";

describe("course publication schema", () => {
  test("creates a quiz with a multi-question authoring baseline", () => {
    const quiz = createLessonDraft("quiz", 0);
    expect(quiz.questions).toHaveLength(2);
    expect(quiz.passingScore).toBe(70);
  });

  test("requires complete quiz questions before publication", () => {
    const module = createModuleDraft(0);
    module.title.fr = "Module quiz";
    const quiz = createLessonDraft("quiz", 0);
    quiz.title.fr = "Évaluation";
    quiz.brief.fr = "Réponds aux questions.";
    quiz.course.fr.introduction = "Cette évaluation vérifie les acquis du module.";
    quiz.questions[0].explanation.fr = "Une explication utile.";
    quiz.questions[1].explanation.fr = "";
    module.lessons = [quiz];

    const errors = validateCourseForPublication({
      title: { fr: "Formation" },
      description: { fr: "Promesse" },
      curriculum: { modules: [module] }
    });
    expect(errors.some((error) => error.includes("question 2") && error.includes("explication"))).toBe(true);
  });
});

