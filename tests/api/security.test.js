import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import { rm } from "node:fs/promises";
import path from "node:path";

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
    expect(response.body.tracks[0].isSummary).toBe(true);
    expect(response.body.tracks[0].modules[0].lessons[0].course).toBeUndefined();

    const fullTrack = await request(app).get("/api/catalog/git").expect(200);
    expect(fullTrack.body.track.id).toBe("git");
    expect(fullTrack.body.track.modules[0].lessons[0].course).toBeDefined();

    await request(app).get("/api/catalog/unknown-track").expect(404);
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
});
