import { describe, expect, test } from "vitest";
import { buildCertificatesForUser } from "../../server/domainHelpers.js";
import { certificates } from "../../server/certificateCatalog.js";
import { learningTracks } from "../../src/content/allTrackRegistry.js";
import { getQuestionSetVersion } from "../../src/features/quizzes/examPolicy.js";

describe("certificate evidence", () => {
  test("requires only active project lessons", () => {
    const projectLessons = new Set(learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons
      .filter((lesson) => lesson.type === "project")
      .map((lesson) => lesson.id))));

    for (const certificate of certificates) {
      expect(certificate.requiredProjects.every((projectId) => projectLessons.has(projectId)), certificate.id).toBe(true);
    }
  });

  test("ignores falsy lesson completion markers", () => {
    const certificate = buildCertificatesForUser("learner", {
      completed: { "git-01-terminal": false }
    }, []).certificates.find((item) => item.id === "git-github-practitioner");

    expect(certificate.progress.lessonsCompleted).toBe(0);
  });

  test("requires a server-graded passing session for completed exams", () => {
    const gitTrack = learningTracks.find((track) => track.id === "git");
    const exam = gitTrack.modules.flatMap((module) => module.lessons).find((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id));
    const progress = { completed: { [exam.id]: { passedAt: new Date().toISOString() } }, quizEvidence: { [exam.id]: { passed: true } } };

    const forged = buildCertificatesForUser("learner", progress, []).certificates.find((item) => item.id === "git-github-practitioner");
    expect(forged.evidence.exams.completed).not.toContain(exam.id);
    const sessions = [{
      userId: "learner",
      quizId: exam.id,
      status: "completed",
      gradingVersion: 1,
      gradedAt: "2026-07-30T12:00:00.000Z",
      questionSetVersion: getQuestionSetVersion(exam),
      score: { percent: 80, passed: true }
    }];
    const passed = buildCertificatesForUser("learner", progress, [], [], sessions).certificates.find((item) => item.id === "git-github-practitioner");
    expect(passed.evidence.exams.completed).toContain(exam.id);
    expect(passed.evidence.exams.scores).toContainEqual({ quizId: exam.id, percent: 80, gradedAt: sessions[0].gradedAt });

    sessions[0].score = { percent: 20, passed: false };
    sessions[0].bestScore = { percent: 80, passed: true };
    sessions[0].qualifiedAt = sessions[0].gradedAt;
    sessions[0].qualifiedQuestionSetVersion = sessions[0].questionSetVersion;
    const failedRetake = buildCertificatesForUser("learner", progress, [], [], sessions).certificates.find((item) => item.id === "git-github-practitioner");
    expect(failedRetake.evidence.exams.scores).toContainEqual({ quizId: exam.id, percent: 80, gradedAt: sessions[0].gradedAt });
    sessions[0].score = { percent: 80, passed: true };
    delete sessions[0].bestScore;
    delete sessions[0].qualifiedAt;
    delete sessions[0].qualifiedQuestionSetVersion;

    sessions[0].questionSetVersion = `${exam.id}:stale`;
    const staleSession = buildCertificatesForUser("learner", progress, [], [], sessions).certificates.find((item) => item.id === "git-github-practitioner");
    expect(staleSession.evidence.exams.completed).not.toContain(exam.id);
    sessions[0].questionSetVersion = getQuestionSetVersion(exam);

    sessions[0].gradingVersion = null;
    const legacySession = buildCertificatesForUser("learner", progress, [], [], sessions).certificates.find((item) => item.id === "git-github-practitioner");
    expect(legacySession.evidence.exams.completed).not.toContain(exam.id);

    sessions[0].gradingVersion = 1;
    sessions[0].userId = "another-learner";
    const wrongOwner = buildCertificatesForUser("learner", progress, [], [], sessions).certificates.find((item) => item.id === "git-github-practitioner");
    expect(wrongOwner.evidence.exams.completed).not.toContain(exam.id);
  });

  test("does not trust browser-declared lesson completion for issuance", () => {
    const definition = certificates.find((item) => item.id === "git-github-practitioner");
    const lessons = learningTracks.find((track) => track.id === "git").modules.flatMap((module) => module.lessons);
    const forgedProgress = { completed: Object.fromEntries(lessons.map((lesson) => [lesson.id, true])) };
    const evaluation = buildCertificatesForUser("learner", forgedProgress, [])
      .certificates.find((item) => item.id === definition.id);
    expect(evaluation.progress.lessonPercent).toBeGreaterThan(0);
    expect(evaluation.progress.examPercent).toBe(0);
    expect(evaluation.eligible).toBe(false);
  });

  test("requires the latest project version to meet the certificate score", () => {
    const submissions = [
      { id: "qualifying", projectId: "git-04-capstone", version: 1, status: "approved", score: 90 },
      { id: "below-threshold", projectId: "git-04-capstone", version: 2, status: "approved", score: 60 }
    ];
    const certificate = buildCertificatesForUser("learner", { completed: {} }, submissions)
      .certificates.find((item) => item.id === "git-github-practitioner");

    expect(certificate.evidence.projects.find((project) => project.projectId === "git-04-capstone"))
      .toMatchObject({ submissionId: null, minimumScore: 70 });
    expect(certificate.progress.projectsApproved).toBe(0);
  });
});
