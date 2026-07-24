import { describe, expect, test } from "vitest";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";
import { worldZones } from "../../src/gameContent.js";
import { evaluateQuestion } from "../../src/features/quizzes/quizEngine.js";
import { getNextLesson } from "../../src/features/learn/learningState.js";
import { projectLessonIds } from "../../server/certificateCatalog.js";
import { buildCertificatesForUser } from "../../server/domainHelpers.js";

const modules = javascriptTrack.modules;
const lessons = modules.flatMap((module) => module.lessons);

describe("active JavaScript curriculum quality", () => {
  test("preserves the public inventory and follows foundation-to-professional progression", () => {
    expect(modules).toHaveLength(18);
    expect(lessons).toHaveLength(141);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(141);
    expect(modules.map((module) => module.id)).toEqual([
      "js-variables-strings", "js-basics", "js-booleans-numbers", "js-functions-scope",
      "js-functions", "js-collections-loops", "js-arrays", "js-strings-regex-errors",
      "js-validation-hardening", "js-dom-forms", "js-dom-events", "js-storage-state",
      "js-async-fetch", "js-storage-async", "js-async-resilience", "js-debugging",
      "js-dom-production", "js-capstone"
    ]);
  });

  test("keeps learner-facing fields bilingual and distinct", () => {
    for (const lesson of lessons) {
      expect(lesson.title.fr, lesson.id).toBeTruthy();
      expect(lesson.title.en, lesson.id).toBeTruthy();
      expect(lesson.brief.fr, lesson.id).toBeTruthy();
      expect(lesson.brief.en, lesson.id).toBeTruthy();
      expect(lesson.brief.en, lesson.id).not.toBe(lesson.title.en);
      expect(lesson.course.fr.introduction, lesson.id).toBeTruthy();
      expect(lesson.course.en.introduction, lesson.id).toBeTruthy();
      expect(lesson.guide.fr.objectives.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.guide.en.objectives.length, lesson.id).toBeGreaterThan(0);
    }
  });

  test("uses unique assessment prompts and behavior checks in generated projects", () => {
    const generatedProjects = lessons.filter((lesson) => lesson.id.endsWith("-lab") && lesson.id !== "js-hardening-validation-lab" && lesson.id !== "js-hardening-api-lab" && lesson.id !== "js-hardening-final-lab");
    expect(generatedProjects).toHaveLength(8);
    expect(generatedProjects.every((lesson) => lesson.tests.some((check) => check.type === "jsExpression"))).toBe(true);
    expect(new Set(generatedProjects.map((lesson) => lesson.solution)).size).toBe(8);

    const prompts = lessons.filter((lesson) => lesson.type === "quiz").flatMap((lesson) => lesson.questions || []).map((question) => question.prompt.en);
    expect(new Set(prompts).size).toBe(prompts.length);
  });

  test("validates hardening functions through observable scenarios", () => {
    const hardeningPractice = lessons.filter((lesson) => lesson.id.startsWith("js-hardening-") && lesson.type === "js");
    expect(hardeningPractice).toHaveLength(7);
    expect(hardeningPractice.every((lesson) => lesson.tests.some((check) => check.type === "jsExpression"))).toBe(true);
  });

  test("uses the functions pilot as executable pedagogy rather than source matching", () => {
    const module = modules.find((item) => item.id === "js-functions-scope");
    const practice = module.lessons.filter((lesson) => lesson.type === "js");
    const project = module.lessons.find((lesson) => lesson.id === "js-functions-scope-lab");
    const quiz = module.lessons.find((lesson) => lesson.id === "js-functions-scope-quiz");

    expect(practice).toHaveLength(8);
    for (const lesson of practice) {
      expect(() => new Function(lesson.starterCode), lesson.id).not.toThrow();
      expect(lesson.tests.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.tests.every((check) => check.type === "jsExpression"), lesson.id).toBe(true);
      expect(lesson.tests.some((check) => runExpression(lesson.starterCode, check.value) === false), lesson.id).toBe(true);
      expect(lesson.tests.every((check) => runExpression(lesson.solution, check.value)), lesson.id).toBe(true);
      expect(JSON.stringify(lesson.pedagogy), lesson.id).not.toContain("<div>Contenu</div>");
    }

    expect(project.tests).toHaveLength(9);
    expect(project.tests.every((check) => runExpression(project.solution, check.value))).toBe(true);
    expect(quiz.questions).toHaveLength(8);
    expect(quiz.questions.every((question) => question.skills?.length > 0)).toBe(true);
    const openQuestion = quiz.questions.find((question) => question.type === "short-open");
    expect(evaluateQuestion(openQuestion, "Deux arguments prouvent que la fonction utilise son argument.").correct).toBe(true);
    expect(evaluateQuestion(openQuestion, "Two arguments prove that the function uses its argument.").correct).toBe(true);
  });

  test("encodes the functions pilot as a continuous flagship path", () => {
    const path = javascriptTrack.flagshipPath;
    const module = modules.find((item) => item.id === path.moduleId);
    expect(path.id).toBe("pulsaconf-ticket-quote");
    expect(path.lessonIds).toEqual(module.lessons.map((lesson) => lesson.id));
    expect(path.capstoneLessonId).toBe("js-functions-scope-lab");

    module.lessons.forEach((lesson, index) => {
      expect(lesson.projectThreadId, lesson.id).toBe(path.id);
      expect(lesson.stepNumber, lesson.id).toBe(index + 1);
      expect(lesson.stepCount, lesson.id).toBe(path.lessonIds.length);
      expect(lesson.buildsOn, lesson.id).toBe(index ? path.lessonIds[index - 1] : null);
      expect(lesson.prerequisiteLessonIds, lesson.id).toEqual(index ? [path.lessonIds[index - 1]] : []);
      expect(lesson.outcomeIds?.length, lesson.id).toBeGreaterThan(0);
    });

    for (const milestone of path.milestones) {
      const evidence = module.lessons.find((lesson) => lesson.id === milestone.evidenceLessonId);
      expect(evidence, milestone.id).toBeTruthy();
      expect(evidence.milestoneId, milestone.id).toBe(milestone.id);
      expect(milestone.outcomeIds.every((id) => path.outcomeIds.includes(id)), milestone.id).toBe(true);
    }
    expect(module.lessons.find((lesson) => lesson.id === "js-functions-scope-quiz").purpose).toBe("exam");
    expect(getNextLesson(javascriptTrack, module.id, "js-functions-scope-pure-helper")).toEqual({ moduleId: module.id, lessonId: "js-functions-scope-quiz" });
  });

  test("keeps JavaScript product links and certificate evidence on active lessons", () => {
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    expect(projectLessonIds).toContain("js-capstone-lab");
    expect(projectLessonIds).not.toContain("js-07-final-project");
    for (const zone of worldZones.filter((item) => item.href.startsWith("/learn/javascript/"))) {
      expect(lessonIds.has(zone.href.split("/").at(-1)), zone.id).toBe(true);
    }
  });

  test("accepts legacy JavaScript project evidence for the canonical capstone", () => {
    const submissions = [
      { id: "html-proof", projectId: "html-12-final-project", status: "approved", score: 100 },
      { id: "css-proof", projectId: "css-06-final-project", status: "approved", score: 100 },
      { id: "js-proof", projectId: "js-07-final-project", status: "approved", score: 100 }
    ];
    const certificate = buildCertificatesForUser("legacy-learner", { completed: {} }, submissions).certificates.find((item) => item.id === "frontend-foundations");
    expect(certificate.progress.projectPercent).toBe(100);
    expect(certificate.evidence.projects.find((project) => project.projectId === "js-capstone-lab")).toMatchObject({ submissionId: "js-proof", score: 100 });
  });
});

function runExpression(code, expression) {
  try {
    return Boolean(new Function(`${code}\n${expression}`)());
  } catch {
    return false;
  }
}
