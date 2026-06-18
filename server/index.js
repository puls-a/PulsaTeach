import "dotenv/config";
import cors from "cors";
import express from "express";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/learningContent.js";
import { productRoadmap } from "./roadmap.js";
import { deleteSupabaseRecord, getSupabaseStatus, getUserFromAccessToken, readSupabaseStore, requireSupabaseStorage, supabaseAdmin, supabaseEnabled, writeSupabaseStore } from "./supabaseServer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.PULSATEACH_DATA_DIR || (process.env.VERCEL ? "/tmp/pulsateach-data" : path.join(__dirname, "..", "data"));
const progressFile = path.join(dataDir, "progress.json");
const submissionsFile = path.join(dataDir, "submissions.json");
const attemptsFile = path.join(dataDir, "attempts.json");
const enrollmentsFile = path.join(dataDir, "enrollments.json");
const draftsFile = path.join(dataDir, "lesson-drafts.json");
const usersFile = path.join(dataDir, "users.json");
const coursesFile = path.join(dataDir, "course-drafts.json");
const issuedCertificatesFile = path.join(dataDir, "issued-certificates.json");
const learningEventsFile = path.join(dataDir, "learning-events.json");
const port = process.env.PORT || 4174;
const adminAccessKey = process.env.PULSATEACH_ADMIN_KEY || (process.env.PULSATEACH_STORAGE === "json" ? "dev-admin-key" : "");
const supabaseRetryDelayMs = 5 * 60 * 1000;
let supabaseFallbackUntil = 0;
const projectLessonIds = ["html-12-final-project", "css-06-final-project", "js-07-final-project"];
const certificates = [
  {
    id: "frontend-foundations",
    title: { fr: "Frontend Foundations", en: "Frontend Foundations" },
    description: {
      fr: "Valide les bases HTML, CSS et JavaScript avec des exercices et projets portfolio.",
      en: "Validate HTML, CSS, and JavaScript foundations through exercises and portfolio projects."
    },
    requiredTracks: ["html", "css", "javascript"],
    requiredProjects: projectLessonIds,
    minProjectScore: 70
  }
];

const app = express();

if (requireSupabaseStorage && !supabaseEnabled) {
  throw new Error("Supabase storage is required. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(attachRequestContext);
app.use(attachAuthUser);

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "pulsateach-api",
    storage: requireSupabaseStorage ? "supabase-strict" : shouldTrySupabase() ? "supabase-with-json-fallback" : "json-fallback",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/supabase/status", async (_request, response) => {
  if (!shouldTrySupabase()) {
    response.json({
      enabled: supabaseEnabled,
      mode: "json",
      ok: true,
      message: "PulsaTeach is using local JSON storage. Supabase can be enabled when the configured project is reachable."
    });
    return;
  }
  response.json(await getSupabaseStatus());
});

app.get("/api/me", (request, response) => {
  if (!request.authUser) {
    response.status(401).json({ error: "Authentication required." });
    return;
  }
  response.json({
    userId: request.authUserId,
    email: request.authUser.email,
    roles: request.authRoles || [],
    appMetadata: request.authUser.app_metadata || {},
    userMetadata: request.authUser.user_metadata || {}
  });
});

app.get("/api/catalog", (_request, response) => {
  response.json({
    tracks: learningTracks.map((track) => ({
      id: track.id,
      label: track.label,
      title: track.title,
      summary: track.summary,
      modules: track.modules.map((module) => ({
        id: module.id,
        title: module.title,
        lessons: module.lessons.map((lesson) => ({
          id: lesson.id,
          type: lesson.type,
          title: lesson.title,
          xp: lesson.xp,
          difficulty: lesson.difficulty,
          durationMin: lesson.durationMin,
          skills: lesson.skills
        }))
      }))
    }))
  });
});

app.get("/api/courses", async (request, response) => {
  const courses = await readJsonStore(coursesFile, []);
  const canReview = hasRole(request, "admin", "author", "reviewer");
  response.json(canReview ? courses : courses.filter((course) => course.status === "published"));
});

app.post("/api/courses", requireRole("admin", "author"), async (request, response) => {
  const payload = request.body;
  if (!isObject(payload) || !payload.title) {
    response.status(400).json({ error: "Course requires a title.", requestId: request.requestId });
    return;
  }
  const store = await readJsonStore(coursesFile, []);
  const now = new Date().toISOString();
  const title = normalizeLocalizedText(payload.title);
  const baseSlug = slugify(payload.slug || title.fr || title.en || "formation");
  const slug = uniqueSlug(baseSlug, store);
  const course = {
    id: `course-${randomUUID()}`,
    slug,
    title,
    description: normalizeLocalizedText(payload.description || ""),
    level: String(payload.level || "beginner"),
    language: String(payload.language || "fr"),
    status: "draft",
    authorUserId: request.authUserId || "admin",
    curriculum: isObject(payload.curriculum) ? payload.curriculum : { modules: [] },
    createdAt: now,
    updatedAt: now,
    publishedAt: null
  };
  store.unshift(course);
  await writeJsonStore(coursesFile, store);
  response.status(201).json(course);
});

app.patch("/api/courses/:id", requireRole("admin", "author", "reviewer"), async (request, response) => {
  const store = await readJsonStore(coursesFile, []);
  const index = store.findIndex((course) => course.id === request.params.id);
  if (index === -1) {
    response.status(404).json({ error: "Course not found.", requestId: request.requestId });
    return;
  }
  const payload = isObject(request.body) ? request.body : {};
  const allowedStatuses = new Set(["draft", "review", "published"]);
  const nextStatus = allowedStatuses.has(payload.status) ? payload.status : store[index].status;
  if (nextStatus === "published" && !hasRole(request, "admin", "reviewer")) {
    response.status(403).json({ error: "Reviewer role required to publish.", requestId: request.requestId });
    return;
  }
  store[index] = {
    ...store[index],
    ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
    ...(payload.description ? { description: normalizeLocalizedText(payload.description) } : {}),
    ...(payload.curriculum && isObject(payload.curriculum) ? { curriculum: payload.curriculum } : {}),
    ...(payload.level ? { level: String(payload.level) } : {}),
    status: nextStatus,
    updatedAt: new Date().toISOString(),
    publishedAt: nextStatus === "published" ? store[index].publishedAt || new Date().toISOString() : null
  };
  await writeJsonStore(coursesFile, store);
  response.json(store[index]);
});

app.delete("/api/courses/:id", requireRole("admin", "author"), async (request, response) => {
  const store = await readJsonStore(coursesFile, []);
  const course = store.find((item) => item.id === request.params.id);
  if (!course) {
    response.status(404).json({ error: "Course not found.", requestId: request.requestId });
    return;
  }
  if (course.status === "published" && !hasRole(request, "admin")) {
    response.status(403).json({ error: "Only an admin can delete a published course.", requestId: request.requestId });
    return;
  }
  if (shouldTrySupabase()) await deleteSupabaseRecord("course-drafts.json", course.id);
  else await writeJsonStore(coursesFile, store.filter((item) => item.id !== course.id));
  response.json({ ok: true, id: course.id });
});

app.get("/api/roadmap", (_request, response) => {
  response.json(productRoadmap);
});

app.get("/api/stats", async (_request, response) => {
  const progressStore = await readProgressStore();
  const submissions = await readJsonStore(submissionsFile, []);
  const attempts = await readJsonStore(attemptsFile, []);
  const enrollments = await readJsonStore(enrollmentsFile, []);
  const drafts = await readJsonStore(draftsFile, []);
  const catalogStats = getCatalogStats();
  const learnerIds = new Set([...Object.keys(progressStore), ...submissions.map((item) => item.userId).filter(Boolean)]);

  response.json({
    ...catalogStats,
    learners: learnerIds.size,
    submissions: submissions.length,
    approvedSubmissions: submissions.filter((item) => item.status === "approved").length,
    attempts: attempts.length,
    enrollments: enrollments.length,
    lessonDrafts: drafts.length,
    publishedDrafts: drafts.filter((item) => item.status === "published").length,
    certificates: certificates.length,
    generatedAt: new Date().toISOString()
  });
});

app.get("/api/analytics", requireRole("admin", "reviewer", "author"), async (_request, response) => {
  const progressStore = await readProgressStore();
  const submissions = await readJsonStore(submissionsFile, []);
  const attempts = await readJsonStore(attemptsFile, []);
  const enrollments = await readJsonStore(enrollmentsFile, []);
  const drafts = await readJsonStore(draftsFile, []);
  const progressItems = Object.values(progressStore);

  response.json({
    funnel: [
      { id: "enrolled", label: "Enrolled", value: enrollments.length },
      { id: "attempted", label: "Ran tests", value: new Set(attempts.map((item) => item.userId)).size },
      { id: "completed", label: "Completed lesson", value: progressItems.filter((item) => Object.keys(item.completed || {}).length > 0).length },
      { id: "submitted", label: "Submitted project", value: new Set(submissions.map((item) => item.userId)).size },
      { id: "approved", label: "Approved project", value: new Set(submissions.filter((item) => item.status === "approved").map((item) => item.userId)).size }
    ],
    tracks: learningTracks.map((track) => {
      const lessonIds = track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
      const completed = progressItems.reduce((sum, progress) => sum + lessonIds.filter((id) => progress.completed?.[id]).length, 0);
      return {
        id: track.id,
        label: track.label,
        lessons: lessonIds.length,
        completions: completed,
        attempts: attempts.filter((attempt) => attempt.trackId === track.id).length
      };
    }),
    content: {
      drafts: drafts.length,
      review: drafts.filter((item) => item.status === "review").length,
      published: drafts.filter((item) => item.status === "published").length
    },
    generatedAt: new Date().toISOString()
  });
});

app.get("/api/admin/export", requireRole("admin"), async (_request, response) => {
  const [progress, submissions, attempts, enrollments, drafts, users, courses, issuedCertificates, learningEvents] = await Promise.all([
    readJsonStore(progressFile, {}),
    readJsonStore(submissionsFile, []),
    readJsonStore(attemptsFile, []),
    readJsonStore(enrollmentsFile, []),
    readJsonStore(draftsFile, []),
    readJsonStore(usersFile, {}),
    readJsonStore(coursesFile, []),
    readJsonStore(issuedCertificatesFile, []),
    readJsonStore(learningEventsFile, [])
  ]);
  response.json({
    exportedAt: new Date().toISOString(),
    progress,
    submissions,
    attempts,
    enrollments,
    drafts,
    users,
    courses,
    issuedCertificates,
    learningEvents
  });
});

app.get("/api/admin/users", requireRole("admin"), async (_request, response) => {
  if (!supabaseAdmin) {
    response.json([]);
    return;
  }
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  response.json((data.users || []).map((user) => ({
    id: user.id,
    email: user.email,
    roles: rolesFromUser(user),
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at
  })));
});

app.patch("/api/admin/users/:id/roles", requireRole("admin"), async (request, response) => {
  if (!supabaseAdmin) {
    response.status(503).json({ error: "Supabase admin unavailable.", requestId: request.requestId });
    return;
  }
  const allowed = new Set(["admin", "author", "reviewer"]);
  const roles = Array.from(new Set((Array.isArray(request.body?.roles) ? request.body.roles : [])
    .map((role) => String(role).trim())
    .filter((role) => allowed.has(role))));
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(request.params.id, {
    app_metadata: { roles }
  });
  if (error) throw error;
  await supabaseAdmin.from("profiles").update({ roles, updated_at: new Date().toISOString() }).eq("auth_user_id", request.params.id);
  response.json({ id: data.user.id, email: data.user.email, roles });
});

app.get("/api/path/:userId", async (request, response) => {
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const progressStore = await readProgressStore();
  const attempts = await readJsonStore(attemptsFile, []);
  const progress = progressStore[userId] || {};
  const userAttempts = attempts.filter((item) => item.userId === userId);
  response.json(buildStudyPlan(progress, userAttempts));
});

app.get("/api/profile/:userId", async (request, response) => {
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const progressStore = await readProgressStore();
  const submissions = await readJsonStore(submissionsFile, []);
  const attempts = await readJsonStore(attemptsFile, []);
  const users = await readJsonStore(usersFile, {});
  const progress = progressStore[userId] || null;
  const userSubmissions = submissions.filter((item) => item.userId === userId);
  const userAttempts = attempts.filter((item) => item.userId === userId);
  const user = users[userId] || createDefaultUser(userId);

  response.json({
    userId,
    displayName: user.displayName,
    user,
    progress,
    submissions: userSubmissions,
    attempts: userAttempts.slice(0, 20),
    certificates: buildCertificatesForUser(request.params.userId, progress, userSubmissions).certificates,
    summary: buildProfileSummary(progress, userSubmissions, userAttempts)
  });
});

app.get("/api/users/:userId", async (request, response) => {
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const users = await readJsonStore(usersFile, {});
  response.json(users[userId] || createDefaultUser(userId));
});

app.put("/api/users/:userId", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const payload = request.body;
  if (!isObject(payload)) {
    response.status(400).json({ error: "User payload must be an object." });
    return;
  }
  const users = await readJsonStore(usersFile, {});
  const current = users[userId] || createDefaultUser(userId);
  const next = {
    ...current,
    displayName: String(payload.displayName || current.displayName).slice(0, 80),
    goal: String(payload.goal || current.goal || "frontend-foundations").slice(0, 80),
    weeklyMinutes: Number.isFinite(Number(payload.weeklyMinutes)) ? Number(payload.weeklyMinutes) : current.weeklyMinutes,
    locale: String(payload.locale || current.locale || "en").slice(0, 8),
    bio: String(payload.bio ?? current.bio ?? "").slice(0, 500),
    avatarUrl: String(payload.avatarUrl ?? current.avatarUrl ?? "").slice(0, 500),
    onboardingCompleted: payload.onboardingCompleted === undefined ? Boolean(current.onboardingCompleted) : Boolean(payload.onboardingCompleted),
    roles: current.roles || [],
    updatedAt: new Date().toISOString()
  };
  users[userId] = next;
  await writeJsonStore(usersFile, users);
  response.json(users[userId]);
});

app.get("/api/enrollments", requireRole("admin", "reviewer"), async (_request, response) => {
  response.json(await readJsonStore(enrollmentsFile, []));
});

app.post("/api/enrollments", async (request, response) => {
  const payload = request.body;
  if (!isObject(payload) || !payload.email) {
    response.status(400).json({ error: "Enrollment requires an email." });
    return;
  }

  const email = String(payload.email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    response.status(400).json({ error: "Enrollment email is invalid." });
    return;
  }

  const store = await readJsonStore(enrollmentsFile, []);
  const existing = store.find((item) => item.email === email);
  if (existing) {
    response.json({ ...existing, duplicate: true });
    return;
  }

  const enrollment = {
    id: `enr-${Date.now()}`,
    email,
    locale: String(payload.locale || "en"),
    source: String(payload.source || "landing"),
    status: "active",
    createdAt: new Date().toISOString()
  };
  store.unshift(enrollment);
  await writeJsonStore(enrollmentsFile, store.slice(0, 2000));
  response.status(201).json(enrollment);
});

app.get("/api/lesson-drafts", requireRole("admin", "author", "reviewer"), async (request, response) => {
  const store = await readJsonStore(draftsFile, []);
  const status = Array.isArray(request.query.status) ? request.query.status[0] : request.query.status;
  const normalizedStatus = typeof status === "string" ? status.trim() : "";
  response.json(normalizedStatus ? store.filter((item) => item.status === normalizedStatus) : store);
});

app.post("/api/lesson-drafts", requireRole("admin", "author"), async (request, response) => {
  const payload = request.body;
  if (!isObject(payload) || !payload.trackId || !payload.title) {
    response.status(400).json({ error: "Lesson draft requires trackId and title." });
    return;
  }

  const store = await readJsonStore(draftsFile, []);
  const now = new Date().toISOString();
  const draft = {
    id: `draft-${Date.now()}`,
    trackId: String(payload.trackId),
    moduleId: String(payload.moduleId || "backlog"),
    title: normalizeLocalizedText(payload.title),
    objective: normalizeLocalizedText(payload.objective || ""),
    prompt: normalizeLocalizedText(payload.prompt || ""),
    type: String(payload.type || "html"),
    difficulty: String(payload.difficulty || "starter"),
    skills: Array.isArray(payload.skills) ? payload.skills.map(String) : [],
    xp: Number.isFinite(Number(payload.xp)) ? Number(payload.xp) : 25,
    status: "draft",
    createdAt: now,
    updatedAt: now
  };
  store.unshift(draft);
  await writeJsonStore(draftsFile, store.slice(0, 1000));
  response.status(201).json(draft);
});

app.patch("/api/lesson-drafts/:id", requireRole("admin", "author", "reviewer"), async (request, response) => {
  const payload = request.body;
  if (!isObject(payload)) {
    response.status(400).json({ error: "Draft update requires an object." });
    return;
  }

  const allowedStatuses = new Set(["draft", "review", "published"]);
  const store = await readJsonStore(draftsFile, []);
  const index = store.findIndex((item) => item.id === request.params.id);
  if (index === -1) {
    response.status(404).json({ error: "Lesson draft not found." });
    return;
  }

  store[index] = {
    ...store[index],
    ...(payload.status && allowedStatuses.has(payload.status) ? { status: payload.status } : {}),
    ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
    ...(payload.objective ? { objective: normalizeLocalizedText(payload.objective) } : {}),
    ...(payload.prompt ? { prompt: normalizeLocalizedText(payload.prompt) } : {}),
    updatedAt: new Date().toISOString()
  };
  await writeJsonStore(draftsFile, store);
  response.json(store[index]);
});

app.delete("/api/lesson-drafts/:id", requireRole("admin", "author"), async (request, response) => {
  const store = await readJsonStore(draftsFile, []);
  const next = store.filter((item) => item.id !== request.params.id);
  if (next.length === store.length) {
    response.status(404).json({ error: "Lesson draft not found." });
    return;
  }
  if (shouldTrySupabase()) {
    try {
      await deleteSupabaseRecord("lesson-drafts.json", request.params.id);
      response.json({ ok: true, id: request.params.id });
      return;
    } catch (error) {
      if (requireSupabaseStorage) throw error;
      markSupabaseUnavailable();
    }
  }
  await writeJsonStore(draftsFile, next);
  response.json({ ok: true, id: request.params.id });
});

app.get("/api/progress/:userId", async (request, response) => {
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const store = await readProgressStore();
  response.json(store[userId] || null);
});

app.put("/api/progress/:userId", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  if (!isObject(request.body)) {
    response.status(400).json({ error: "Progress payload must be an object." });
    return;
  }
  const store = await readProgressStore();
  store[userId] = {
    ...request.body,
    userId,
    updatedAt: new Date().toISOString()
  };
  await writeProgressStore(store);
  response.json(store[userId]);
});

app.post("/api/progress/migrate", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const localProgress = request.body?.progress;
  if (!isObject(localProgress)) {
    response.status(400).json({ error: "Migration requires a progress object.", requestId: request.requestId });
    return;
  }
  const userId = request.authUserId;
  const store = await readProgressStore();
  const merged = mergeProgress(store[userId], localProgress);
  store[userId] = { ...merged, userId, updatedAt: new Date().toISOString() };
  await writeProgressStore(store);
  response.json({ migrated: true, progress: store[userId] });
});

app.get("/api/submissions", async (request, response) => {
  const store = await readJsonStore(submissionsFile, []);
  const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
  const requestedUserId = typeof userId === "string" ? userId.trim() : "";
  const normalizedUserId = request.authUserId || requestedUserId;
  if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
    response.status(403).json({ error: "Authenticated user cannot access another learner." });
    return;
  }
  if (!normalizedUserId && !hasRole(request, "admin", "reviewer")) {
    response.status(403).json({ error: "Reviewer role required to list all submissions." });
    return;
  }
  response.json(normalizedUserId ? store.filter((item) => item.userId === normalizedUserId) : store);
});

app.post("/api/submissions", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const payload = request.body;
  if (!isObject(payload) || !payload.projectId || !payload.title) {
    response.status(400).json({ error: "Submission requires userId, projectId and title." });
    return;
  }
  const userId = request.authUserId || payload.userId;
  if (!userId || !authorizePayloadUser(request, response, payload.userId)) return;

  const store = await readJsonStore(submissionsFile, []);
  const submission = {
    id: `sub-${Date.now()}`,
    userId: String(userId),
    projectId: String(payload.projectId),
    title: String(payload.title),
    description: String(payload.description || ""),
    url: String(payload.url || ""),
    status: "submitted",
    createdAt: new Date().toISOString()
  };
  store.unshift(submission);
  await writeJsonStore(submissionsFile, store.slice(0, 500));
  response.status(201).json(submission);
});

app.get("/api/attempts", async (request, response) => {
  const store = await readJsonStore(attemptsFile, []);
  const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
  const lessonId = Array.isArray(request.query.lessonId) ? request.query.lessonId[0] : request.query.lessonId;
  const requestedUserId = typeof userId === "string" ? userId.trim() : "";
  const normalizedUserId = request.authUserId || requestedUserId;
  if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
    response.status(403).json({ error: "Authenticated user cannot access another learner." });
    return;
  }
  const normalizedLessonId = typeof lessonId === "string" ? lessonId.trim() : "";
  response.json(
    store.filter((item) =>
      (!normalizedUserId || item.userId === normalizedUserId) &&
      (!normalizedLessonId || item.lessonId === normalizedLessonId)
    )
  );
});

app.post("/api/attempts", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const payload = request.body;
  if (!isObject(payload) || !payload.lessonId) {
    response.status(400).json({ error: "Attempt requires userId and lessonId." });
    return;
  }
  const userId = request.authUserId || payload.userId;
  if (!userId || !authorizePayloadUser(request, response, payload.userId)) return;

  const store = await readJsonStore(attemptsFile, []);
  const passed = Number(payload.passed || 0);
  const total = Number(payload.total || 0);
  const attempt = {
    id: `att-${Date.now()}`,
    userId: String(userId),
    lessonId: String(payload.lessonId),
    trackId: String(payload.trackId || ""),
    moduleId: String(payload.moduleId || ""),
    passed,
    total,
    success: total > 0 && passed === total,
    createdAt: new Date().toISOString()
  };
  store.unshift(attempt);
  await writeJsonStore(attemptsFile, store.slice(0, 1000));
  response.status(201).json(attempt);
});

app.patch("/api/submissions/:id/review", requireRole("admin", "reviewer"), async (request, response) => {
  const payload = request.body;
  const allowedStatuses = new Set(["approved", "changes_requested", "submitted"]);
  if (!isObject(payload) || !allowedStatuses.has(payload.status)) {
    response.status(400).json({ error: "Review requires a valid status." });
    return;
  }

  const store = await readJsonStore(submissionsFile, []);
  const index = store.findIndex((submission) => submission.id === request.params.id);
  if (index === -1) {
    response.status(404).json({ error: "Submission not found." });
    return;
  }

  const review = {
    status: payload.status,
    feedback: String(payload.feedback || ""),
    reviewer: String(payload.reviewer || "PulsaTeach reviewer"),
    score: Number.isFinite(Number(payload.score)) ? Number(payload.score) : null,
    rubric: isObject(payload.rubric) ? payload.rubric : {},
    reviewedAt: new Date().toISOString()
  };
  store[index] = {
    ...store[index],
    ...review
  };
  await writeJsonStore(submissionsFile, store);
  response.json(store[index]);
});

app.get("/api/certificates/:userId", async (request, response) => {
  if (!authorizeUserParam(request, response)) return;
  const userId = request.authUserId || request.params.userId;
  const progressStore = await readProgressStore();
  const submissions = await readJsonStore(submissionsFile, []);
  const progress = progressStore[userId] || {};
  const userSubmissions = submissions.filter((item) => item.userId === userId);
  const issued = await readJsonStore(issuedCertificatesFile, []);
  response.json(buildCertificatesForUser(userId, progress, userSubmissions, issued));
});

app.post("/api/certificates/:certificateId/issue", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const userId = request.authUserId;
  const progressStore = await readProgressStore();
  const submissions = await readJsonStore(submissionsFile, []);
  const users = await readJsonStore(usersFile, {});
  const issued = await readJsonStore(issuedCertificatesFile, []);
  const existing = issued.find((item) => item.userId === userId && item.certificateId === request.params.certificateId && !item.revokedAt);
  if (existing) {
    response.json(existing);
    return;
  }
  const evaluation = buildCertificatesForUser(userId, progressStore[userId] || {}, submissions.filter((item) => item.userId === userId), issued)
    .certificates.find((item) => item.id === request.params.certificateId);
  if (!evaluation) {
    response.status(404).json({ error: "Certificate not found.", requestId: request.requestId });
    return;
  }
  if (!evaluation.eligible) {
    response.status(409).json({ error: "Certificate requirements are not complete.", progress: evaluation.progress, requestId: request.requestId });
    return;
  }
  const now = new Date().toISOString();
  const certificate = {
    id: randomUUID(),
    verificationCode: randomUUID().replaceAll("-", ""),
    userId,
    certificateId: evaluation.id,
    learnerName: users[userId]?.displayName || request.authUser?.email || "PulsaTeach Learner",
    title: evaluation.title,
    evidence: evaluation.progress,
    issuedAt: now,
    revokedAt: null
  };
  issued.unshift(certificate);
  await writeJsonStore(issuedCertificatesFile, issued);
  response.status(201).json(certificate);
});

app.get("/api/certificates/public/:verificationCode", async (request, response) => {
  const issued = await readJsonStore(issuedCertificatesFile, []);
  const certificate = issued.find((item) => item.verificationCode === request.params.verificationCode);
  if (!certificate) {
    response.status(404).json({ error: "Certificate not found.", requestId: request.requestId });
    return;
  }
  response.json({
    valid: !certificate.revokedAt,
    certificate: {
      verificationCode: certificate.verificationCode,
      learnerName: certificate.learnerName,
      title: certificate.title,
      evidence: certificate.evidence,
      issuedAt: certificate.issuedAt,
      revokedAt: certificate.revokedAt
    }
  });
});

app.post("/api/events", async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const payload = request.body;
  if (!isObject(payload) || !payload.eventType) {
    response.status(400).json({ error: "Event type is required.", requestId: request.requestId });
    return;
  }
  const allowedEvents = new Set(["lesson_opened", "tests_run", "tests_failed", "lesson_completed", "hint_opened", "progress_migrated"]);
  if (!allowedEvents.has(payload.eventType)) {
    response.status(400).json({ error: "Unsupported event type.", requestId: request.requestId });
    return;
  }
  const store = await readJsonStore(learningEventsFile, []);
  const event = {
    id: randomUUID(),
    userId: request.authUserId,
    eventType: payload.eventType,
    lessonId: payload.lessonId ? String(payload.lessonId) : "",
    trackId: payload.trackId ? String(payload.trackId) : "",
    payload: isObject(payload.payload) ? payload.payload : {},
    requestId: request.requestId,
    createdAt: new Date().toISOString()
  };
  store.unshift(event);
  await writeJsonStore(learningEventsFile, store.slice(0, 10000));
  response.status(201).json(event);
});

app.get("/api/admin/learning-events", requireRole("admin", "reviewer", "author"), async (request, response) => {
  const store = await readJsonStore(learningEventsFile, []);
  const failedOnly = request.query.failed === "true";
  response.json((failedOnly ? store.filter((event) => event.eventType === "tests_failed") : store).slice(0, 500));
});

app.use((error, request, response, _next) => {
  console.error(JSON.stringify({
    level: "error",
    message: error?.message || "Unhandled API error",
    requestId: request.requestId,
    method: request.method,
    path: request.path,
    stack: process.env.NODE_ENV === "production" ? undefined : error?.stack
  }));
  response.status(500).json({ error: "Internal server error.", requestId: request.requestId });
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`PulsaTeach API ready on http://127.0.0.1:${port}`);
  });
}

export default app;

async function readProgressStore() {
  return readJsonStore(progressFile, {});
}

async function writeProgressStore(store) {
  return writeJsonStore(progressFile, store);
}

async function readJsonStore(file, fallback) {
  if (shouldTrySupabase()) {
    try {
      return await readSupabaseStore(path.basename(file), fallback);
    } catch (error) {
      if (requireSupabaseStorage) throw error;
      markSupabaseUnavailable();
      console.warn(`Supabase read failed for ${path.basename(file)}; using local JSON fallback.`);
    }
  }

  if (requireSupabaseStorage) {
    throw new Error(`Supabase is required, but ${path.basename(file)} was requested without a Supabase client.`);
  }

  try {
    await mkdir(dataDir, { recursive: true });
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJsonStore(file, store) {
  if (shouldTrySupabase()) {
    try {
      const written = await writeSupabaseStore(path.basename(file), store);
      if (written) return;
    } catch (error) {
      if (requireSupabaseStorage) throw error;
      markSupabaseUnavailable();
      console.warn(`Supabase write failed for ${path.basename(file)}; using local JSON fallback.`);
    }
  }

  if (requireSupabaseStorage) {
    throw new Error(`Supabase is required, but ${path.basename(file)} could not be written through Supabase.`);
  }

  await mkdir(dataDir, { recursive: true });
  await writeFile(file, JSON.stringify(store, null, 2));
}

async function attachAuthUser(request, _response, next) {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice("Bearer ".length).trim() : "";
  request.authRoles = [];

  if (token && shouldTrySupabase()) {
    const user = await getUserFromAccessToken(token);
    if (user?.id) {
      request.authUser = user;
      request.authUserId = `supabase-${user.id}`;
      request.authRoles = rolesFromUser(user);
      if (supabaseAdmin) {
        const { data: profile } = await supabaseAdmin.from("profiles").select("roles").eq("auth_user_id", user.id).maybeSingle();
        request.authRoles = Array.from(new Set([...request.authRoles, ...(profile?.roles || [])]));
      }
    }
  }

  const providedAdminKey = request.headers["x-pulsateach-admin-key"];
  if (adminAccessKey && typeof providedAdminKey === "string" && providedAdminKey === adminAccessKey) {
    request.authRoles = Array.from(new Set([...(request.authRoles || []), "admin", "author", "reviewer"]));
  }

  next();
}

function attachRequestContext(request, response, next) {
  const startedAt = Date.now();
  request.requestId = String(request.headers["x-request-id"] || randomUUID());
  response.setHeader("X-Request-Id", request.requestId);
  response.on("finish", () => {
    console.log(JSON.stringify({
      level: response.statusCode >= 500 ? "error" : response.statusCode >= 400 ? "warn" : "info",
      requestId: request.requestId,
      method: request.method,
      path: request.path,
      status: response.statusCode,
      durationMs: Date.now() - startedAt,
      userId: request.authUserId || null
    }));
  });
  next();
}

function shouldTrySupabase() {
  return process.env.PULSATEACH_STORAGE !== "json" && supabaseEnabled && (requireSupabaseStorage || Date.now() >= supabaseFallbackUntil);
}

function markSupabaseUnavailable() {
  supabaseFallbackUntil = Date.now() + supabaseRetryDelayMs;
}

function authorizeUserParam(request, response) {
  if (request.authUserId && request.params.userId !== request.authUserId) {
    response.status(403).json({ error: "Authenticated user cannot access another learner." });
    return false;
  }
  return true;
}

function authorizePayloadUser(request, response, payloadUserId) {
  if (request.authUserId && payloadUserId && payloadUserId !== request.authUserId) {
    response.status(403).json({ error: "Authenticated user cannot write another learner." });
    return false;
  }
  return true;
}

function requireAuthenticatedWrite(request, response) {
  if (!requireSupabaseStorage || request.authUserId || request.authRoles?.includes("admin")) return true;
  response.status(401).json({ error: "Authentication required for remote writes.", requestId: request.requestId });
  return false;
}

function requireRole(...roles) {
  return (request, response, next) => {
    if (hasRole(request, ...roles)) {
      next();
      return;
    }
    response.status(request.authUser || request.authRoles?.length ? 403 : 401).json({
      error: `Required role: ${roles.join(" or ")}.`
    });
  };
}

function hasRole(request, ...roles) {
  const granted = new Set(request.authRoles || []);
  return roles.some((role) => granted.has(role));
}

function rolesFromUser(user) {
  const metadata = {
    ...(user.app_metadata || {}),
    ...(user.user_metadata || {})
  };
  const rawRoles = metadata.roles || metadata.role || [];
  const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
  return roles.map((role) => String(role).trim()).filter(Boolean);
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeLocalizedText(value) {
  if (isObject(value)) {
    return {
      fr: String(value.fr || value.en || ""),
      en: String(value.en || value.fr || "")
    };
  }
  return {
    fr: String(value || ""),
    en: String(value || "")
  };
}

function createDefaultUser(userId) {
  return {
    userId,
    displayName: "PulsaTeach Learner",
    goal: "frontend-foundations",
    weeklyMinutes: 120,
    locale: "en",
    bio: "",
    avatarUrl: "",
    onboardingCompleted: false,
    roles: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function getCatalogStats() {
  return learningTracks.reduce(
    (stats, track) => {
      const lessons = track.modules.flatMap((module) => module.lessons);
      stats.tracks += 1;
      stats.modules += track.modules.length;
      stats.lessons += lessons.length;
      stats.projects += lessons.filter((lesson) => lesson.type === "project").length;
      stats.xp += lessons.reduce((sum, lesson) => sum + (lesson.xp || 0), 0);
      return stats;
    },
    { tracks: 0, modules: 0, lessons: 0, projects: 0, xp: 0 }
  );
}

function getLessonsForTracks(trackIds) {
  return learningTracks
    .filter((track) => trackIds.includes(track.id))
    .flatMap((track) => track.modules.flatMap((module) => module.lessons));
}

function buildCertificatesForUser(userId, progress, userSubmissions, issuedCertificates = []) {
  const completed = isObject(progress?.completed) ? progress.completed : {};
  const completedLessonIds = Object.keys(completed);

  return {
    userId,
    certificates: certificates.map((certificate) => {
      const requiredLessons = getLessonsForTracks(certificate.requiredTracks);
      const approvedProjects = certificate.requiredProjects.filter((projectId) =>
        userSubmissions.some((submission) => submission.projectId === projectId && submission.status === "approved" && (submission.score ?? 0) >= certificate.minProjectScore)
      );
      const completedRequiredLessons = requiredLessons.filter((lesson) => completedLessonIds.includes(lesson.id));
      const lessonPercent = requiredLessons.length ? Math.round((completedRequiredLessons.length / requiredLessons.length) * 100) : 0;
      const projectPercent = certificate.requiredProjects.length ? Math.round((approvedProjects.length / certificate.requiredProjects.length) * 100) : 0;
      const eligible = lessonPercent === 100 && projectPercent === 100;

      return {
        ...certificate,
        eligible,
        issued: issuedCertificates.find((item) => item.userId === userId && item.certificateId === certificate.id && !item.revokedAt) || null,
        progress: {
          lessonPercent,
          projectPercent,
          lessonsCompleted: completedRequiredLessons.length,
          lessonsRequired: requiredLessons.length,
          projectsApproved: approvedProjects.length,
          projectsRequired: certificate.requiredProjects.length
        }
      };
    })
  };
}

function mergeProgress(remoteProgress, localProgress) {
  const remote = isObject(remoteProgress) ? remoteProgress : {};
  const local = isObject(localProgress) ? localProgress : {};
  const activity = [...(local.activity || []), ...(remote.activity || [])]
    .filter((item, index, items) => items.findIndex((candidate) => `${candidate.id}-${candidate.at}` === `${item.id}-${item.at}`) === index)
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")))
    .slice(0, 100);
  return {
    ...local,
    ...remote,
    xp: Math.max(Number(local.xp) || 0, Number(remote.xp) || 0),
    streak: Math.max(Number(local.streak) || 0, Number(remote.streak) || 0),
    completed: { ...(local.completed || {}), ...(remote.completed || {}) },
    activity
  };
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "formation";
}

function uniqueSlug(baseSlug, courses) {
  let slug = baseSlug;
  let suffix = 2;
  while (courses.some((course) => course.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

function buildProfileSummary(progress, submissions, attempts) {
  const completed = isObject(progress?.completed) ? Object.keys(progress.completed).length : 0;
  return {
    xp: progress?.xp || 0,
    completedLessons: completed,
    submittedProjects: submissions.length,
    approvedProjects: submissions.filter((item) => item.status === "approved").length,
    attempts: attempts.length,
    successfulAttempts: attempts.filter((item) => item.success).length
  };
}

function buildStudyPlan(progress, attempts) {
  const completed = isObject(progress?.completed) ? progress.completed : {};
  const completedIds = new Set(Object.keys(completed));
  const allLessons = learningTracks.flatMap((track) =>
    track.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        ...lesson,
        trackId: track.id,
        trackLabel: track.label,
        moduleId: module.id,
        moduleTitle: module.title
      }))
    )
  );
  const pending = allLessons.filter((lesson) => !completedIds.has(lesson.id));
  const recentFailures = attempts
    .filter((attempt) => !attempt.success)
    .slice(0, 20)
    .reduce((counts, attempt) => {
      counts[attempt.trackId] = (counts[attempt.trackId] || 0) + 1;
      return counts;
    }, {});
  const weakTrackId = Object.entries(recentFailures).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  const weakTrackLessons = weakTrackId ? pending.filter((lesson) => lesson.trackId === weakTrackId).slice(0, 2) : [];
  const nextLessons = [...weakTrackLessons, ...pending.filter((lesson) => lesson.trackId !== weakTrackId)].slice(0, 6);
  const weeklyPlan = nextLessons.map((lesson, index) => ({
    day: index + 1,
    lessonId: lesson.id,
    trackId: lesson.trackId,
    title: lesson.title,
    durationMin: lesson.durationMin,
    xp: lesson.xp,
    href: `#/learn/${lesson.trackId}/${lesson.moduleId}/${lesson.id}`
  }));

  return {
    completed: completedIds.size,
    total: allLessons.length,
    percent: allLessons.length ? Math.round((completedIds.size / allLessons.length) * 100) : 0,
    focusTrack: weakTrackId || pending[0]?.trackId || null,
    nextLessons: nextLessons.map((lesson) => ({
      id: lesson.id,
      trackId: lesson.trackId,
      trackLabel: lesson.trackLabel,
      moduleId: lesson.moduleId,
      title: lesson.title,
      type: lesson.type,
      difficulty: lesson.difficulty,
      durationMin: lesson.durationMin,
      xp: lesson.xp,
      href: `#/learn/${lesson.trackId}/${lesson.moduleId}/${lesson.id}`
    })),
    weeklyPlan,
    milestones: [
      { id: "first-lesson", label: { fr: "Première leçon validée", en: "First passed lesson" }, done: completedIds.size >= 1 },
      { id: "ten-lessons", label: { fr: "10 leçons validées", en: "10 passed lessons" }, done: completedIds.size >= 10 },
      { id: "first-project", label: { fr: "Premier projet portfolio", en: "First portfolio project" }, done: Object.keys(completed).some((id) => id.includes("final-project")) }
    ]
  };
}
