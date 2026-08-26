import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createLessonDraft, createModuleDraft } from "../../src/courseSchema.js";
import { learningTracks } from "../../src/content/allTrackRegistry.js";
import { normalizeQuizLesson } from "../../src/features/quizzes/quizEngine.js";
import { getQuestionSetVersion } from "../../src/features/quizzes/examPolicy.js";
import { certificates } from "../../server/certificateCatalog.js";
import { encodeProtectedExamResponses } from "../../server/publicContent.js";

const testDataDir = path.join(process.cwd(), "test-results", "api-security-data");
let app;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.PULSATEACH_STORAGE = "json";
  process.env.PULSATEACH_ALLOW_LOCAL_IDENTITY = "true";
  process.env.PULSATEACH_DATA_DIR = testDataDir;
  process.env.PULSATEACH_ADMIN_KEY = "test-admin-key";
  process.env.PULSATEACH_EXAM_SECRET = "test-exam-secret";
  ({ default: app } = await import("../../server/index.js"));
});

afterAll(async () => {
  await rm(testDataDir, { recursive: true, force: true });
});

describe("API security boundaries", () => {
  test("keeps public catalog readable and emits security headers", async () => {
    const response = await request(app).get("/api/catalog").expect(200);
    expect(response.headers["content-security-policy"]).toContain("default-src 'none'");
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers["cache-control"]).toContain("public");
    expect(response.headers.etag).toBeTruthy();
    expect(response.body.tracks[0].isSummary).toBe(true);
    expect(response.body.tracks[0].modules[0].lessons[0].course).toBeUndefined();

    const fullTrack = await request(app).get("/api/catalog/git").expect(200);
    expect(fullTrack.body.track.id).toBe("git");
    expect(fullTrack.body.track.modules[0].lessons[0].course).toBeDefined();
    const publicExam = fullTrack.body.track.modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === "git-final-exam");
    expect(publicExam).toMatchObject({ gradingMode: "server", questionSetVersion: "git-final-exam:2" });
    expect(publicExam.questions[0]).not.toHaveProperty("answer");
    expect(publicExam.questions[0]).not.toHaveProperty("explanation");

    await request(app).get("/api/catalog/unknown-track").expect(404);
  });

  test("lists canonical curriculum projects and rejects unknown project submissions", async () => {
    const catalog = await request(app).get("/api/projects/catalog").expect(200);
    expect(catalog.headers["cache-control"]).toContain("public");
    expect(catalog.body).toContainEqual(expect.objectContaining({ id: "html-09-final-project-pulsaconf", trackId: "html" }));

    const rejected = await request(app)
      .post("/api/submissions")
      .set("X-PulsaTeach-User-Id", "unknown-project-user")
      .send({ projectId: "unknown-project", title: "Unknown project", repositoryUrl: "https://github.com/example/unknown" })
      .expect(400);
    expect(rejected.body.error.code).toBe("PROJECT_NOT_FOUND");
  });

  test("exposes separate liveness and readiness probes", async () => {
    const live = await request(app).get("/api/health/live").expect(200);
    expect(live.body).toMatchObject({ ok: true, service: "pulsateach-api" });
    expect(live.headers["cache-control"]).toBe("no-store");

    const ready = await request(app).get("/api/health/ready").expect(200);
    expect(ready.body).toMatchObject({
      ok: true,
      checks: { database: { ok: false } }
    });
    expect(ready.body.checks.database).not.toHaveProperty("error");
  });

  test("sanitizes request IDs and accepts privacy-preserving telemetry", async () => {
    const response = await request(app)
      .post("/api/telemetry")
      .set("X-Request-Id", "bad")
      .send({ type: "web_vital", name: "LCP", value: 2100, rating: "good", route: "/catalog", navigationType: "navigate" })
      .expect(202);
    expect(response.headers["x-request-id"]).toMatch(/^[a-f0-9-]{36}$/);

    await request(app)
      .post("/api/telemetry")
      .send({ type: "client_error", name: "TypeError", route: "/catalog", fingerprint: "abc123" })
      .expect(400);
  });

  test("rejects oversized standard JSON payloads", async () => {
    await request(app)
      .post("/api/telemetry")
      .set("Content-Type", "application/json")
      .send({ type: "client_error", name: "x".repeat(300_000), route: "/" })
      .expect(413);
  });

  test("rejects a disallowed browser origin", async () => {
    const response = await request(app)
      .get("/api/catalog")
      .set("Origin", "https://evil.example")
      .expect(403);
    expect(response.body.error.code).toBe("CORS_ORIGIN_DENIED");
  });

  test("allows cache-bypass headers for an approved browser origin", async () => {
    const response = await request(app)
      .options("/api/catalog")
      .set("Origin", "http://127.0.0.1:5190")
      .set("Access-Control-Request-Method", "GET")
      .set("Access-Control-Request-Headers", "cache-control,pragma")
      .expect(204);

    expect(response.headers["access-control-allow-origin"]).toBe("http://127.0.0.1:5190");
    expect(response.headers["access-control-allow-headers"]).toContain("Cache-Control");
    expect(response.headers["access-control-allow-headers"]).toContain("Pragma");
  });

  test("requires an identity for private learner reads", async () => {
    const response = await request(app).get("/api/progress/user-a").expect(401);
    expect(response.body.error.code).toBe("AUTH_REQUIRED");
  });

  test("allows a local development identity to read only its own data", async () => {
    await request(app)
      .get("/api/progress/user-a")
      .set("X-PulsaTeach-User-Id", "user-a")
      .expect(200);

    const denied = await request(app)
      .get("/api/progress/user-b")
      .set("X-PulsaTeach-User-Id", "user-a")
      .expect(403);
    expect(denied.body.error.code).toBe("USER_ACCESS_DENIED");
  });

  test("never exposes the global attempts list to a learner", async () => {
    await request(app).get("/api/attempts").expect(401);
    await request(app)
      .get("/api/attempts")
      .set("X-PulsaTeach-User-Id", "user-a")
      .expect(200);
  });

  test("rejects writes attributed to another learner", async () => {
    const response = await request(app)
      .post("/api/attempts")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ userId: "user-b", lessonId: "lesson-1", passed: 1, total: 1 })
      .expect(403);
    expect(response.body.error.code).toBe("USER_ACCESS_DENIED");
  });

  test("validates sensitive payloads and rejects unknown fields", async () => {
    const response = await request(app)
      .post("/api/submissions")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ projectId: "project-1", title: "Projet", url: "not-a-url", unexpected: true })
      .expect(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  test("rejects non-http project URLs", async () => {
    const response = await request(app)
      .post("/api/submissions")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ projectId: "project-1", title: "Projet", url: "javascript:alert(1)" })
      .expect(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  test("persists quiz drafts without exposing them to another learner", async () => {
    await request(app)
      .put("/api/quizzes/git-final-exam/session")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ questionSetVersion: "git-final-exam:2", currentIndex: 1, responses: { q1: "label" }, rationales: {} })
      .expect(200);

    const forgedScore = await request(app)
      .put("/api/quizzes/git-final-exam/session")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ questionSetVersion: "git-final-exam:2", currentIndex: 1, responses: {}, rationales: {}, status: "completed", score: { passed: true } })
      .expect(400);
    expect(forgedScore.body.error.code).toBe("VALIDATION_ERROR");

    const staleDraft = await request(app)
      .put("/api/quizzes/git-final-exam/session")
      .set("X-PulsaTeach-User-Id", "user-c")
      .send({ questionSetVersion: "git-final-exam:1", currentIndex: 0, responses: {}, rationales: {} })
      .expect(409);
    expect(staleDraft.body.error.code).toBe("QUIZ_VERSION_CONFLICT");

    const unknownQuiz = await request(app)
      .post("/api/quizzes/unknown-quiz/submit")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ responses: {}, rationales: {} })
      .expect(404);
    expect(unknownQuiz.body.error.code).toBe("QUIZ_NOT_FOUND");

    const own = await request(app)
      .get("/api/quizzes/git-final-exam/session")
      .set("X-PulsaTeach-User-Id", "user-a")
      .expect(200);
    expect(own.body.responses).toEqual({ q1: "label" });

    const other = await request(app)
      .get("/api/quizzes/git-final-exam/session")
      .set("X-PulsaTeach-User-Id", "user-b")
      .expect(200);
    expect(other.body).toBeNull();

    await request(app).get("/api/quizzes/git-final-exam/session").expect(401);
  });

  test("does not reveal whether an enrollment email already exists", async () => {
    const payload = { email: "privacy@example.com", locale: "fr", source: "landing" };
    const created = await request(app).post("/api/enrollments").send(payload).expect(202);
    const duplicate = await request(app).post("/api/enrollments").send(payload).expect(202);
    expect(created.body).toEqual({ accepted: true });
    expect(duplicate.body).toEqual(created.body);
  });

  test("returns only aggregate protected exam results", async () => {
    const learner = { "X-PulsaTeach-User-Id": "protected-quiz-user" };
    const lesson = learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons))
      .find((item) => item.id === "git-final-exam");
    const question = normalizeQuizLesson(lesson, { expand: false }).questions[0];
    const forged = await request(app)
      .post(`/api/quizzes/${lesson.id}/submit`)
      .set("X-PulsaTeach-User-Id", "forged-token-user")
      .send({ questionSetVersion: getQuestionSetVersion(lesson), responses: { [question.id]: "forged-token" }, rationales: {} })
      .expect(400);
    expect(forged.body.error.code).toBe("INVALID_QUIZ_RESPONSE");
    await request(app)
      .post(`/api/quizzes/${lesson.id}/submit`)
      .set("X-PulsaTeach-User-Id", "forged-token-user")
      .send({ questionSetVersion: getQuestionSetVersion(lesson), responses: {}, rationales: {} })
      .expect(200);
    const graded = await request(app)
      .post(`/api/quizzes/${lesson.id}/submit`)
      .set(learner)
      .send({
        questionSetVersion: getQuestionSetVersion(lesson),
        responses: encodeProtectedExamResponses(normalizeQuizLesson(lesson, { expand: false }), { [question.id]: question.answer }, "test-exam-secret"),
        rationales: {}
      })
      .expect(200);
    expect(graded.body.score).toMatchObject({ passed: false, percent: expect.any(Number) });
    expect(graded.body.score).not.toHaveProperty("results");
    expect(graded.body).not.toHaveProperty("bestScore");

    const retake = await request(app)
      .post(`/api/quizzes/${lesson.id}/submit`)
      .set(learner)
      .send({ questionSetVersion: getQuestionSetVersion(lesson), responses: {}, rationales: {} })
      .expect(429);
    expect(retake.body.error).toMatchObject({ code: "QUIZ_RETAKE_COOLDOWN", details: { retryAt: expect.any(String) } });

    const stale = await request(app)
      .post(`/api/quizzes/${lesson.id}/submit`)
      .set(learner)
      .send({ questionSetVersion: `${lesson.id}:stale`, responses: {} })
      .expect(409);
    expect(stale.body.error.code).toBe("QUIZ_VERSION_CONFLICT");
  });

  test("scrubs protected answer keys from synchronized progress", async () => {
    const userId = "protected-progress-user";
    const headers = { "X-PulsaTeach-User-Id": userId };
    await request(app).put(`/api/progress/${userId}`).set(headers).send({
      review: {
        items: {
          legacy: {
            id: "legacy",
            kind: "quiz-question",
            quizId: "git-final-exam",
            questionId: "git-final-exam-1",
            trackId: "git",
            moduleId: "git-final",
            lessonId: "git-final-exam",
            prompt: "Prompt",
            choices: [],
            pairs: [],
            answer: "secret",
            acceptedAnswers: ["secret"],
            keywords: ["secret"],
            questionType: "single",
            skills: [],
            glossaryTerms: [],
            intervalDays: 0,
            ease: 2.5,
            repetitions: 0,
            lapses: 1,
            confidence: 0,
            dueAt: "2026-07-30T12:00:00.000Z",
            lastReviewedAt: null,
            updatedAt: "2026-07-30T12:00:00.000Z"
          }
        }
      }
    }).expect(200);
    const progress = await request(app).get(`/api/progress/${userId}`).set(headers).expect(200);
    expect(progress.body.review.items).toEqual({});
  });

  test("keeps role routes protected and accepts the development admin key", async () => {
    await request(app).get("/api/lesson-drafts").expect(401);
    await request(app)
      .get("/api/lesson-drafts")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .expect(200);
  });

  test("versions, reviews, publishes and rolls back a Course Studio course", async () => {
    const headers = { "X-PulsaTeach-Admin-Key": "test-admin-key" };
    const module = createModuleDraft(0);
    module.title = { fr: "Fondations workflow", en: "Workflow foundations" };
    const lesson = createLessonDraft("html", 0);
    lesson.title = { fr: "Leçon workflow", en: "Workflow lesson" };
    lesson.brief = { fr: "Construis une structure valide.", en: "Build a valid structure." };
    lesson.course.fr.introduction = "Une introduction suffisamment complète pour publier.";
    lesson.tests = [{ type: "selector", label: "Titre principal", value: "h1", amount: 1 }];
    module.lessons = [lesson];

    const created = await request(app)
      .post("/api/courses")
      .set(headers)
      .send({
        title: { fr: "Formation workflow", en: "Workflow course" },
        description: { fr: "Apprendre le workflow éditorial.", en: "Learn the editorial workflow." },
        curriculum: { modules: [module] }
      })
      .expect(201);
    const id = created.body.id;
    expect(created.body).toMatchObject({ status: "draft", version: 1 });

    const noChanges = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ expectedVersion: 1 })
      .expect(400);
    expect(noChanges.body.error.code).toBe("COURSE_NO_CHANGES");

    const denied = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ status: "published", expectedVersion: 1 })
      .expect(403);
    expect(denied.body.error.code).toBe("COURSE_TRANSITION_DENIED");

    const edited = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ title: { fr: "Formation workflow v2", en: "Workflow course v2" }, expectedVersion: 1 })
      .expect(200);
    expect(edited.body.version).toBe(2);

    const review = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ status: "review", comment: "Prête pour relecture", expectedVersion: 2 })
      .expect(200);
    const approved = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ status: "approved", comment: "Contenu validé", expectedVersion: review.body.version })
      .expect(200);
    const published = await request(app)
      .patch(`/api/courses/${id}`)
      .set(headers)
      .send({ status: "published", comment: "Publication validée", expectedVersion: approved.body.version })
      .expect(200);
    expect(published.body).toMatchObject({ status: "published", version: 5 });

    const versions = await request(app).get(`/api/courses/${id}/versions`).set(headers).expect(200);
    expect(versions.body).toHaveLength(5);
    const diff = await request(app).get(`/api/courses/${id}/versions/2/diff?against=1`).set(headers).expect(200);
    expect(diff.body.changes.some((change) => change.path === "title.fr")).toBe(true);

    const rolledBack = await request(app)
      .post(`/api/courses/${id}/rollback`)
      .set(headers)
      .send({ version: 1, comment: "Retour à la version initiale" })
      .expect(200);
    expect(rolledBack.body).toMatchObject({
      status: "draft",
      version: 6,
      title: { fr: "Formation workflow", en: "Workflow course" }
    });
    expect(rolledBack.body.workflowLog[0]).toMatchObject({ kind: "rollback", sourceVersion: 1 });

    await request(app).delete(`/api/courses/${id}`).set(headers).expect(200);
  });

  test("keeps immutable project versions and a contextual review journal", async () => {
    const learner = { "X-PulsaTeach-User-Id": "project-user" };
    const reviewer = { "X-PulsaTeach-Admin-Key": "test-admin-key" };
    const first = await request(app)
      .post("/api/submissions")
      .set(learner)
      .send({
        projectId: "html-09-final-project-pulsaconf",
        title: "Version 1",
        repositoryUrl: "https://github.com/example/project",
        deliverables: ["README", "Application"],
        selfAssessment: "La structure est terminée.",
        visibility: "unlisted"
      })
      .expect(201);
    expect(first.body).toMatchObject({ version: 1, reviewRevision: 0, status: "submitted", rootId: first.body.id });

    await request(app)
      .patch(`/api/submissions/${first.body.id}/review`)
      .set(reviewer)
      .send({ status: "in_review", expectedVersion: 1, expectedReviewRevision: 0, feedback: "Review started" })
      .expect(200);
    const changes = await request(app)
      .patch(`/api/submissions/${first.body.id}/review`)
      .set(reviewer)
      .send({
        status: "changes_requested",
        expectedVersion: 1,
        expectedReviewRevision: 1,
        score: 58,
        feedback: "Corrige la navigation clavier.",
        rubric: { accessibility: 50, codeQuality: 66 },
        contextualComments: { accessibility: "Le focus doit rester visible." }
      })
      .expect(200);
    expect(changes.body).toMatchObject({ reviewRevision: 2 });
    expect(changes.body.reviewLog).toHaveLength(2);

    const second = await request(app)
      .post("/api/submissions")
      .set(learner)
      .send({
        projectId: "html-09-final-project-pulsaconf",
        title: "Version 2",
        repositoryUrl: "https://github.com/example/project",
        selfAssessment: "La navigation clavier est corrigée."
      })
      .expect(201);
    expect(second.body).toMatchObject({
      version: 2,
      rootId: first.body.id,
      supersedesId: first.body.id,
      status: "submitted"
    });

    const reviewerWithIdentity = { ...reviewer, "X-PulsaTeach-User-Id": "reviewer-user" };
    const reviewQueue = await request(app).get("/api/submissions").set(reviewerWithIdentity).expect(200);
    expect(reviewQueue.body.some((submission) => submission.id === second.body.id)).toBe(true);
    const filteredQueue = await request(app).get("/api/submissions?userId=project-user").set(reviewerWithIdentity).expect(200);
    expect(filteredQueue.body.every((submission) => submission.userId === "project-user")).toBe(true);
    await request(app).get("/api/submissions?userId=other-user").set(learner).expect(403);

    const missingScore = await request(app)
      .patch(`/api/submissions/${second.body.id}/review`)
      .set(reviewerWithIdentity)
      .send({ status: "approved", expectedVersion: 2, expectedReviewRevision: 0 })
      .expect(400);
    expect(missingScore.body.error.code).toBe("REVIEW_SCORE_REQUIRED");
    const superseded = await request(app)
      .patch(`/api/submissions/${first.body.id}/review`)
      .set(reviewerWithIdentity)
      .send({ status: "approved", expectedVersion: 1, expectedReviewRevision: 2, score: 90 })
      .expect(409);
    expect(superseded.body.error.code).toBe("SUBMISSION_SUPERSEDED");
    const approved = await request(app)
      .patch(`/api/submissions/${second.body.id}/review`)
      .set(reviewerWithIdentity)
      .send({ status: "approved", expectedVersion: 2, expectedReviewRevision: 0, score: 85 })
      .expect(200);
    expect(approved.body).toMatchObject({ reviewer: "reviewer-user", score: 85 });
  });

  test("serializes duplicate submissions and rejects stale concurrent reviews", async () => {
    const learner = { "X-PulsaTeach-User-Id": "concurrent-project-user" };
    const reviewer = { "X-PulsaTeach-Admin-Key": "test-admin-key" };
    const payload = { projectId: "html-09-final-project-pulsaconf", title: "Concurrent project", repositoryUrl: "https://github.com/example/concurrent" };
    const creations = await Promise.all(Array.from({ length: 4 }, () => request(app).post("/api/submissions").set(learner).send(payload)));
    expect(creations.map((result) => result.status).sort()).toEqual([201, 409, 409, 409]);
    expect(creations.filter((result) => result.status === 409).every((result) => result.body.error.code === "SUBMISSION_ALREADY_ACTIVE")).toBe(true);
    const submission = creations.find((result) => result.status === 201).body;

    const missingRevision = await request(app)
      .patch(`/api/submissions/${submission.id}/review`)
      .set(reviewer)
      .send({ status: "in_review", expectedVersion: 1 })
      .expect(400);
    expect(missingRevision.body.error.code).toBe("VALIDATION_ERROR");

    const reviews = await Promise.all([
      request(app).patch(`/api/submissions/${submission.id}/review`).set(reviewer)
        .send({ status: "in_review", expectedVersion: 1, expectedReviewRevision: 0 }),
      request(app).patch(`/api/submissions/${submission.id}/review`).set(reviewer)
        .send({ status: "changes_requested", expectedVersion: 1, expectedReviewRevision: 0, score: 55 })
    ]);
    expect(reviews.map((result) => result.status).sort()).toEqual([200, 409]);
    expect(reviews.find((result) => result.status === 409).body.error).toMatchObject({
      code: "SUBMISSION_REVIEW_REVISION_CONFLICT",
      details: { expectedReviewRevision: 0, currentReviewRevision: 1 }
    });
    expect(reviews.find((result) => result.status === 200).body).toMatchObject({ reviewRevision: 1 });
    expect(reviews.find((result) => result.status === 200).body.reviewLog).toHaveLength(1);
  });

  test("issues one publicly verifiable certificate and blocks post-revocation reissue", async () => {
    const userId = "certificate-flow-user";
    const learner = { "X-PulsaTeach-User-Id": userId };
    const reviewer = { "X-PulsaTeach-Admin-Key": "test-admin-key" };
    const definition = certificates.find((certificate) => certificate.id === "frontend-foundations");
    const requiredLessons = learningTracks
      .filter((track) => definition.requiredTracks.includes(track.id))
      .flatMap((track) => track.modules.flatMap((module) => module.lessons));
    const completed = Object.fromEntries(requiredLessons.map((lesson) => [lesson.id, { passedAt: new Date().toISOString() }]));
    const quizEvidence = Object.fromEntries(requiredLessons
      .filter((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id))
      .map((lesson) => [lesson.id, { percent: 100, passed: true, skills: {}, attemptedAt: new Date().toISOString() }]));

    await request(app).put(`/api/progress/${userId}`).set(learner).send({ completed, quizEvidence }).expect(200);
    const forgedEvaluation = await request(app).get(`/api/certificates/${userId}`).set(learner).expect(200);
    const forgedCertificate = forgedEvaluation.body.certificates.find((certificate) => certificate.id === definition.id);
    expect(forgedCertificate.eligible).toBe(false);
    expect(forgedCertificate.evidence.exams.completed).toEqual([]);
    await request(app).post("/api/certificates/frontend-foundations/issue").set(learner).expect(409);

    const requiredExams = requiredLessons.filter((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id));
    for (const lesson of requiredExams) {
      const quiz = normalizeQuizLesson(lesson, { expand: false });
      const canonicalResponses = Object.fromEntries(quiz.questions.map((question) => [
        question.id,
        question.type === "short-open" ? (question.keywords || question.answer).join(" ") : question.answer
      ]));
      const responses = encodeProtectedExamResponses(quiz, canonicalResponses, "test-exam-secret");
      const graded = await request(app)
        .post(`/api/quizzes/${lesson.id}/submit`)
        .set(learner)
        .send({ questionSetVersion: getQuestionSetVersion(lesson), responses, rationales: {} })
        .expect(200);
      expect(graded.body).toMatchObject({ gradingVersion: 1, status: "completed", score: { passed: true } });
    }
    const gradedEvaluation = await request(app).get(`/api/certificates/${userId}`).set(learner).expect(200);
    expect(gradedEvaluation.body.certificates.find((certificate) => certificate.id === definition.id).evidence.exams.completed)
      .toHaveLength(requiredExams.length);
    for (const projectId of definition.requiredProjects) {
      const submission = await request(app)
        .post("/api/submissions")
        .set(learner)
        .send({ projectId, title: projectId, repositoryUrl: `https://github.com/example/${projectId}` })
        .expect(201);
      await request(app)
        .patch(`/api/submissions/${submission.body.id}/review`)
        .set(reviewer)
        .send({ status: "approved", expectedVersion: 1, expectedReviewRevision: 0, score: 85 })
        .expect(200);
    }

    const issueResponses = await Promise.all(Array.from({ length: 10 }, () =>
      request(app).post("/api/certificates/frontend-foundations/issue").set(learner)
    ));
    expect(issueResponses.filter((result) => result.status === 201)).toHaveLength(1);
    expect(issueResponses.filter((result) => result.status === 200)).toHaveLength(9);
    const firstIssue = issueResponses[0];
    expect(new Set(issueResponses.map((result) => result.body.verificationCode)).size).toBe(1);
    expect(firstIssue.body.evidence.projects.every((project) => project.score === 85)).toBe(true);

    const profile = await request(app).get(`/api/profile/${userId}`).set(learner).expect(200);
    expect(profile.body.certificates.find((certificate) => certificate.id === "frontend-foundations").issued.verificationCode)
      .toBe(firstIssue.body.verificationCode);
    const publicCertificate = await request(app).get(`/api/certificates/public/${firstIssue.body.verificationCode}`).expect(200);
    expect(publicCertificate.body).toMatchObject({ valid: true, status: "valid" });
    expect(publicCertificate.body.certificate.evidence.projects).toEqual({ approved: definition.requiredProjects.length, required: definition.requiredProjects.length });
    expect(JSON.stringify(publicCertificate.body)).not.toContain("submissionId");

    const revoked = await request(app)
      .patch(`/api/certificates/${firstIssue.body.id}/revoke`)
      .set(reviewer)
      .send({ reason: "Certificate evidence was invalidated." })
      .expect(200);
    const repeatedRevocation = await request(app)
      .patch(`/api/certificates/${firstIssue.body.id}/revoke`)
      .set(reviewer)
      .send({ reason: "A later reason must not replace the first." })
      .expect(200);
    expect(repeatedRevocation.body).toMatchObject({ revokedAt: revoked.body.revokedAt, revocationReason: revoked.body.revocationReason });
    const reissue = await request(app).post("/api/certificates/frontend-foundations/issue").set(learner).expect(409);
    expect(reissue.body.error.code).toBe("CERTIFICATE_REVOKED");
  });

  test("publishes minimal certificate evidence and exposes revocation status", async () => {
    await mkdir(testDataDir, { recursive: true });
    await writeFile(path.join(testDataDir, "issued-certificates.json"), JSON.stringify([{
      id: "certificate-test",
      verificationCode: "verify-test",
      userId: "user-a",
      certificateId: "frontend-foundations",
      certificateVersion: 1,
      learnerName: "Test Learner",
      title: { fr: "Fondations", en: "Foundations" },
      evidence: {
        skills: ["semantic-html"],
        trackVersions: { html: "2026.06" },
        progress: { lessonsCompleted: 1, lessonsRequired: 1, projectsApproved: 1, projectsRequired: 1 }
      },
      issuedAt: new Date().toISOString(),
      expiresAt: null,
      revokedAt: null,
      revocationReason: null
    }, {
      id: "certificate-expired",
      verificationCode: "verify-expired",
      userId: "user-b",
      certificateId: "git-github-practitioner",
      certificateVersion: 1,
      learnerName: "Expired Learner",
      title: { fr: "Git", en: "Git" },
      evidence: {},
      issuedAt: "2025-01-01T00:00:00.000Z",
      expiresAt: "2025-02-01T00:00:00.000Z",
      revokedAt: null,
      revocationReason: null
    }], null, 2));

    const valid = await request(app).get("/api/certificates/public/verify-test").expect(200);
    expect(valid.body).toMatchObject({ valid: true, status: "valid" });
    expect(valid.body.certificate.evidence.skills).toEqual(["semantic-html"]);
    expect(valid.body.certificate.evidence.exams).toEqual({ completed: null, required: null });
    expect(valid.body.certificate.evidence.projects).toEqual({ approved: 1, required: 1 });
    expect(await request(app).get("/api/certificates/public/verify-missing").expect(404).then((result) => result.body.error.code)).toBe("CERTIFICATE_NOT_FOUND");
    expect(await request(app).get("/api/certificates/public/verify-expired").expect(200).then((result) => result.body.status)).toBe("expired");

    await request(app)
      .patch("/api/certificates/certificate-test/revoke")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .send({ reason: "Evidence invalidated by reviewer." })
      .expect(200);
    const revoked = await request(app).get("/api/certificates/public/verify-test").expect(200);
    expect(revoked.body).toMatchObject({ valid: false, status: "revoked" });
    expect(revoked.body.certificate).not.toHaveProperty("revocationReason");
  });

  test("pseudonymizes learning events and documents aggregate privacy rules", async () => {
    await request(app)
      .post("/api/events")
      .set("X-PulsaTeach-User-Id", "analytics-user")
      .send({ eventType: "lesson_opened", lessonId: "lesson-1", trackId: "html" })
      .expect(201);

    const events = await request(app)
      .get("/api/admin/learning-events")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .expect(200);
    const event = events.body.find((item) => item.lessonId === "lesson-1");
    expect(event.userId).toBeUndefined();
    expect(event.userKey).toMatch(/^[a-f0-9]{16}$/);

    const identified = await request(app)
      .get("/api/admin/learning-events?includeIdentity=true")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .expect(200);
    expect(identified.body.find((item) => item.lessonId === "lesson-1").userId).toBe("analytics-user");

    const analytics = await request(app)
      .get("/api/analytics")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .expect(200);
    expect(analytics.body.privacy).toMatchObject({
      aggregation: "cohort",
      minimumCohort: 3,
      identifiersExposed: false,
      eventRetentionDays: 180
    });
  });
});
