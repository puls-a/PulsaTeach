import { describe, expect, test } from "vitest";
import { buildCertificatesForUser } from "../../server/domainHelpers.js";
import { certificates } from "../../server/certificateCatalog.js";
import { learningTracks } from "../../src/content/allTrackRegistry.js";

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

  test("requires passing quiz evidence for completed exams", () => {
    const gitTrack = learningTracks.find((track) => track.id === "git");
    const exam = gitTrack.modules.flatMap((module) => module.lessons).find((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id));
    const progress = { completed: { [exam.id]: { passedAt: new Date().toISOString() } }, quizEvidence: { [exam.id]: { passed: false } } };

    const failed = buildCertificatesForUser("learner", progress, []).certificates.find((item) => item.id === "git-github-practitioner");
    expect(failed.evidence.exams.completed).not.toContain(exam.id);
    progress.quizEvidence[exam.id].passed = true;
    const passed = buildCertificatesForUser("learner", progress, []).certificates.find((item) => item.id === "git-github-practitioner");
    expect(passed.evidence.exams.completed).toContain(exam.id);
  });

  test("uses the latest project version that meets the certificate score", () => {
    const submissions = [
      { id: "qualifying", projectId: "git-04-capstone", version: 1, status: "approved", score: 90 },
      { id: "below-threshold", projectId: "git-04-capstone", version: 2, status: "approved", score: 60 }
    ];
    const certificate = buildCertificatesForUser("learner", { completed: {} }, submissions)
      .certificates.find((item) => item.id === "git-github-practitioner");

    expect(certificate.evidence.projects.find((project) => project.projectId === "git-04-capstone"))
      .toMatchObject({ submissionId: "qualifying", version: 1, score: 90 });
    expect(certificate.progress.projectsApproved).toBe(1);
  });
});
