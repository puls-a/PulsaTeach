import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createLessonDraft, createModuleDraft } from "../../src/courseSchema.js";

const testDataDir = path.join(process.cwd(), "test-results", "api-security-data");
let app;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.PULSATEACH_STORAGE = "json";
  process.env.PULSATEACH_ALLOW_LOCAL_IDENTITY = "true";
  process.env.PULSATEACH_DATA_DIR = testDataDir;
  process.env.PULSATEACH_ADMIN_KEY = "test-admin-key";
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

    await request(app).get("/api/catalog/unknown-track").expect(404);
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

  test("persists quiz drafts without exposing them to another learner", async () => {
    await request(app)
      .put("/api/quizzes/html-quiz/session")
      .set("X-PulsaTeach-User-Id", "user-a")
      .send({ currentIndex: 1, responses: { q1: "label" }, rationales: {}, status: "draft", score: null })
      .expect(200);

    const own = await request(app)
      .get("/api/quizzes/html-quiz/session")
      .set("X-PulsaTeach-User-Id", "user-a")
      .expect(200);
    expect(own.body.responses).toEqual({ q1: "label" });

    const other = await request(app)
      .get("/api/quizzes/html-quiz/session")
      .set("X-PulsaTeach-User-Id", "user-b")
      .expect(200);
    expect(other.body).toBeNull();

    await request(app).get("/api/quizzes/html-quiz/session").expect(401);
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
        projectId: "project-versioned",
        title: "Version 1",
        repositoryUrl: "https://github.com/example/project",
        deliverables: ["README", "Application"],
        selfAssessment: "La structure est terminée.",
        visibility: "unlisted"
      })
      .expect(201);
    expect(first.body).toMatchObject({ version: 1, status: "submitted", rootId: first.body.id });

    await request(app)
      .patch(`/api/submissions/${first.body.id}/review`)
      .set(reviewer)
      .send({ status: "in_review", expectedVersion: 1, feedback: "Review started" })
      .expect(200);
    const changes = await request(app)
      .patch(`/api/submissions/${first.body.id}/review`)
      .set(reviewer)
      .send({
        status: "changes_requested",
        expectedVersion: 1,
        score: 58,
        feedback: "Corrige la navigation clavier.",
        rubric: { accessibility: 50, codeQuality: 66 },
        contextualComments: { accessibility: "Le focus doit rester visible." }
      })
      .expect(200);
    expect(changes.body.reviewLog).toHaveLength(2);

    const second = await request(app)
      .post("/api/submissions")
      .set(learner)
      .send({
        projectId: "project-versioned",
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
    }], null, 2));

    const valid = await request(app).get("/api/certificates/public/verify-test").expect(200);
    expect(valid.body).toMatchObject({ valid: true, status: "valid" });
    expect(valid.body.certificate.evidence.skills).toEqual(["semantic-html"]);

    await request(app)
      .patch("/api/certificates/certificate-test/revoke")
      .set("X-PulsaTeach-Admin-Key", "test-admin-key")
      .send({ reason: "Evidence invalidated by reviewer." })
      .expect(200);
    const revoked = await request(app).get("/api/certificates/public/verify-test").expect(200);
    expect(revoked.body).toMatchObject({ valid: false, status: "revoked" });
    expect(revoked.body.certificate.revocationReason).toContain("invalidated");
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
