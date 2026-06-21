import "dotenv/config";
import express from "express";
import { copyFile, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";
import { normalizePublishedCourse, validateCourseForPublication } from "../src/courseSchema.js";
import { appendWorkflowLog, authorizeCourseTransition, createCourseVersion, diffCourseVersions, restoreCourseVersion } from "./courseWorkflow.js";
import { productRoadmap } from "./roadmap.js";
import { sendWelcomeEmail, transactionalEmailEnabled } from "./emailService.js";
import { applySecurity, localIdentityEnabled, sensitiveRateLimit } from "./security.js";
import { deleteSupabaseRecord, getSupabaseStatus, getUserFromAccessToken, readSupabaseStore, requireSupabaseStorage, supabaseAdmin, supabaseEnabled, writeSupabaseStore } from "./supabaseServer.js";
import { accountDeletionSchema, attemptSchema, avatarUploadSchema, certificateRevokeSchema, courseCreateSchema, courseRollbackSchema, courseUpdateSchema, enrollmentSchema, eventSchema, lessonDraftSchema, lessonDraftUpdateSchema, progressMigrationSchema, progressSchema, quizSessionSchema, reviewSchema, roleUpdateSchema, submissionSchema, userSettingsSchema, validateBody } from "./validation.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.PULSATEACH_DATA_DIR || (process.env.VERCEL ? "/tmp/pulsateach-data" : path.join(__dirname, "..", "data"));
const progressFile = path.join(dataDir, "progress.json");
const submissionsFile = path.join(dataDir, "submissions.json");
const attemptsFile = path.join(dataDir, "attempts.json");
const enrollmentsFile = path.join(dataDir, "enrollments.json");
const draftsFile = path.join(dataDir, "lesson-drafts.json");
const usersFile = path.join(dataDir, "users.json");
const coursesFile = path.join(dataDir, "course-drafts.json");
const courseVersionsFile = path.join(dataDir, "course-versions.json");
const issuedCertificatesFile = path.join(dataDir, "issued-certificates.json");
const learningEventsFile = path.join(dataDir, "learning-events.json");
const quizSessionsFile = path.join(dataDir, "quiz-sessions.json");
const port = process.env.PORT || 4174;
const adminAccessKey = localIdentityEnabled ? process.env.PULSATEACH_ADMIN_KEY || "dev-admin-key" : "";
const supabaseRetryDelayMs = 5 * 60 * 1000;
let supabaseFallbackUntil = 0;
const localWriteQueues = new Map();
const storeMutationQueues = new Map();
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
  },
  {
    id: "git-github-practitioner",
    title: { fr: "Git & GitHub Practitioner", en: "Git & GitHub Practitioner" },
    description: {
      fr: "Valide un historique propre, les branches, la collaboration par pull request et une première CI.",
      en: "Validate clean history, branches, pull-request collaboration, and a first CI workflow."
    },
    requiredTracks: ["git"],
    requiredProjects: ["git-02-conflict-project", "git-03-pr-project", "git-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-accessibility-practitioner",
    title: { fr: "Web Accessibility Practitioner", en: "Web Accessibility Practitioner" },
    description: {
      fr: "Valide la structure, le clavier, les formulaires et un audit WCAG reproductible.",
      en: "Validate structure, keyboard use, forms, and a reproducible WCAG audit."
    },
    requiredTracks: ["accessibility"],
    requiredProjects: ["a11y-02-keyboard-project", "a11y-03-form-project", "a11y-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "frontend-testing-practitioner",
    title: { fr: "Frontend Testing Practitioner", en: "Frontend Testing Practitioner" },
    description: {
      fr: "Valide une stratégie de tests couvrant unités, composants, E2E, accessibilité et CI.",
      en: "Validate a testing strategy covering units, components, E2E, accessibility, and CI."
    },
    requiredTracks: ["testing"],
    requiredProjects: ["testing-01-unit-project", "testing-02-component-project", "testing-03-e2e-project", "testing-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "typescript-practitioner",
    title: { fr: "TypeScript Practitioner", en: "TypeScript Practitioner" },
    description: {
      fr: "Valide la modélisation, les génériques, les frontières runtime et une migration stricte.",
      en: "Validate modeling, generics, runtime boundaries, and a strict migration."
    },
    requiredTracks: ["typescript"],
    requiredProjects: ["ts-01-model-project", "ts-03-api-project", "ts-04-migration-project"],
    minProjectScore: 70
  },
  {
    id: "react-application-developer",
    title: { fr: "React Application Developer", en: "React Application Developer" },
    description: {
      fr: "Valide composants, état, données asynchrones, routing, accessibilité, tests et performance.",
      en: "Validate components, state, asynchronous data, routing, accessibility, tests, and performance."
    },
    requiredTracks: ["react"],
    requiredProjects: ["react-01-library-project", "react-02-form-project", "react-03-data-project", "react-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "node-api-developer",
    title: { fr: "Node.js API Developer", en: "Node.js API Developer" },
    description: {
      fr: "Valide une API modulaire avec validation, autorisation, tests et observabilité.",
      en: "Validate a modular API with validation, authorization, tests, and observability."
    },
    requiredTracks: ["node-api"],
    requiredProjects: ["node-01-cli-project", "node-02-api-project", "node-03-auth-project", "node-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "postgresql-data-modeler",
    title: { fr: "PostgreSQL Data Modeler", en: "PostgreSQL Data Modeler" },
    description: {
      fr: "Valide schéma relationnel, requêtes, transactions, migrations, index et RLS.",
      en: "Validate relational schema, queries, transactions, migrations, indexes, and RLS."
    },
    requiredTracks: ["sql-postgresql"],
    requiredProjects: ["sql-01-catalog-project", "sql-02-learning-project", "sql-03-quiz-project", "sql-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-security-practitioner",
    title: { fr: "Web Security Practitioner", en: "Web Security Practitioner" },
    description: {
      fr: "Valide menaces, validation, identité, headers, uploads, tests d’abus et incident.",
      en: "Validate threats, input handling, identity, headers, uploads, abuse tests, and incident response."
    },
    requiredTracks: ["web-security"],
    requiredProjects: ["sec-01-boundary-project", "sec-02-access-project", "sec-03-hardening-project", "sec-04-capstone"],
    minProjectScore: 75
  },
  {
    id: "web-performance-practitioner",
    title: { fr: "Web Performance Practitioner", en: "Web Performance Practitioner" },
    description: {
      fr: "Valide Web Vitals, ressources critiques, bundles, React, API, SQL et budgets CI.",
      en: "Validate Web Vitals, critical resources, bundles, React, APIs, SQL, and CI budgets."
    },
    requiredTracks: ["web-performance"],
    requiredProjects: ["perf-01-render-project", "perf-02-bundle-project", "perf-03-api-project", "perf-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-deployment-operator",
    title: { fr: "Web Deployment Operator", en: "Web Deployment Operator" },
    description: {
      fr: "Valide build déterministe, CI/CD, migrations, monitoring, runbooks et rollback.",
      en: "Validate deterministic builds, CI/CD, migrations, monitoring, runbooks, and rollback."
    },
    requiredTracks: ["devops-deployment"],
    requiredProjects: ["ops-01-release-project", "ops-02-delivery-project", "ops-03-monitoring-project", "ops-04-capstone"],
    minProjectScore: 70
  }
];

const app = express();
const productionRuntime = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

if (requireSupabaseStorage && !supabaseEnabled) {
  throw new Error("Supabase storage is required. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
}
if (productionRuntime && !requireSupabaseStorage) {
  throw new Error("Production requires PULSATEACH_STORAGE=supabase-strict.");
}

app.use(attachRequestContext);
applySecurity(app);
app.use(express.json({ limit: "2mb" }));
app.use(attachAuthUser);

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "pulsateach-api",
    storage: requireSupabaseStorage ? "supabase-strict" : shouldTrySupabase() ? "supabase-with-json-fallback" : "json-fallback",
    email: transactionalEmailEnabled ? "resend" : "disabled",
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

app.get("/api/catalog", async (_request, response) => {
  await publishDueScheduledCourses();
  const courses = await readJsonStore(coursesFile, []);
  const publishedTracks = courses.filter((course) => course.status === "published").map(normalizePublishedCourse);
  response.json({
    tracks: [...learningTracks, ...publishedTracks].map(summarizeTrack)
  });
});

app.get("/api/catalog/:trackId", async (request, response) => {
  await publishDueScheduledCourses();
  const courses = await readJsonStore(coursesFile, []);
  const publishedTracks = courses.filter((course) => course.status === "published").map(normalizePublishedCourse);
  const track = [...learningTracks, ...publishedTracks].find((item) => item.id === request.params.trackId);
  if (!track) {
    response.status(404).json({ error: "Track not found.", requestId: request.requestId });
    return;
  }
  response.json({ track });
});

app.get("/api/glossary", (_request, response) => {
  response.json({ terms: buildGlossaryIndex(learningTracks) });
});

app.get("/api/courses", async (request, response) => {
  await publishDueScheduledCourses();
  const courses = await readJsonStore(coursesFile, []);
  const canReview = hasRole(request, "admin", "author", "reviewer");
  response.json(canReview ? courses : courses.filter((course) => course.status === "published"));
});

app.post("/api/courses", requireRole("admin", "author"), validateBody(courseCreateSchema), async (request, response) => {
  await withStoreMutation("courses", async () => {
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
    version: 1,
    authorUserId: request.authUserId || "admin",
    curriculum: isObject(payload.curriculum) ? payload.curriculum : { modules: [] },
    workflowLog: [{
      from: null,
      to: "draft",
      actor: request.authUserId || "admin",
      comment: "Course created",
      at: now,
      kind: "created"
    }],
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    scheduledAt: null,
    archivedAt: null
  };
  store.unshift(course);
  const versions = await readJsonStore(courseVersionsFile, []);
  versions.unshift(createCourseVersion(course, request.authUserId || "admin", "created", "Course created", new Date(now)));
  await writeJsonStore(coursesFile, store);
  await writeJsonStore(courseVersionsFile, versions);
  response.status(201).json(course);
  });
});

app.patch("/api/courses/:id", requireRole("admin", "author", "reviewer"), validateBody(courseUpdateSchema), async (request, response) => {
  await withStoreMutation("courses", async () => {
  const store = await readJsonStore(coursesFile, []);
  const index = store.findIndex((course) => course.id === request.params.id);
  if (index === -1) {
    response.status(404).json({ error: "Course not found.", requestId: request.requestId });
    return;
  }
  const payload = isObject(request.body) ? request.body : {};
  const current = store[index];
  if (payload.expectedVersion && Number(payload.expectedVersion) !== Number(current.version || 1)) {
    sendApiError(response, request, 409, "COURSE_VERSION_CONFLICT", "Course was updated by another editor.", { currentVersion: current.version || 1 });
    return;
  }
  const nextStatus = payload.status || current.status;
  const transition = authorizeCourseTransition(current.status, nextStatus, request.authRoles || []);
  if (!transition.allowed) {
    sendApiError(response, request, 403, "COURSE_TRANSITION_DENIED", `Transition ${current.status} → ${nextStatus} is not allowed for this role.`, { requiredRoles: transition.requiredRoles });
    return;
  }
  const hasContentChanges = ["title", "description", "curriculum", "level"].some((field) => payload[field] !== undefined);
  if (hasContentChanges && !hasRole(request, "admin", "author")) {
    sendApiError(response, request, 403, "COURSE_EDIT_DENIED", "Author role required to edit course content.");
    return;
  }
  if (hasContentChanges && !["draft", "changes_requested"].includes(current.status)) {
    sendApiError(response, request, 409, "COURSE_CONTENT_LOCKED", "Course content can only be edited in draft or changes_requested status.");
    return;
  }
  if (nextStatus === "changes_requested" && !payload.comment?.trim()) {
    sendApiError(response, request, 400, "REVIEW_COMMENT_REQUIRED", "A review comment is required when changes are requested.");
    return;
  }
  const candidate = {
    ...current,
    ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
    ...(payload.description ? { description: normalizeLocalizedText(payload.description) } : {}),
    ...(payload.curriculum && isObject(payload.curriculum) ? { curriculum: payload.curriculum } : {}),
    ...(payload.level ? { level: String(payload.level) } : {})
  };
  if (["approved", "scheduled", "published"].includes(nextStatus)) {
    const validationErrors = validateCourseForPublication(candidate);
    if (validationErrors.length) {
      response.status(422).json({ error: "Course is not ready for publication.", validationErrors, requestId: request.requestId });
      return;
    }
  }
  if (nextStatus === "scheduled" && (!payload.scheduledAt || new Date(payload.scheduledAt).getTime() <= Date.now())) {
    sendApiError(response, request, 400, "INVALID_SCHEDULE", "A future scheduledAt value is required.");
    return;
  }
  const now = new Date();
  const changedStatus = nextStatus !== current.status;
  const nextVersion = Number(current.version || 1) + 1;
  store[index] = {
    ...candidate,
    status: nextStatus,
    version: nextVersion,
    updatedAt: now.toISOString(),
    publishedAt: nextStatus === "published" ? current.publishedAt || now.toISOString() : nextStatus === "archived" ? current.publishedAt : null,
    scheduledAt: nextStatus === "scheduled" ? payload.scheduledAt : null,
    archivedAt: nextStatus === "archived" ? now.toISOString() : null,
    workflowLog: changedStatus
      ? appendWorkflowLog(current.workflowLog, {
          from: current.status,
          to: nextStatus,
          actor: request.authUserId || request.authRoles?.join(",") || "system",
          comment: payload.comment || "",
          at: now.toISOString(),
          kind: "transition"
        })
      : current.workflowLog || []
  };
  const versions = await readJsonStore(courseVersionsFile, []);
  if (!versions.some((entry) => entry.courseId === current.id)) {
    versions.unshift(createCourseVersion({ ...current, version: Number(current.version || 1) }, current.authorUserId || "system", "created", "Legacy baseline"));
  }
  versions.unshift(createCourseVersion(store[index], request.authUserId || "admin", changedStatus ? "transition" : "content", payload.comment, now));
  await writeJsonStore(coursesFile, store);
  await writeJsonStore(courseVersionsFile, versions.slice(0, 5000));
  response.json(store[index]);
  });
});

app.get("/api/courses/:id/versions", requireRole("admin", "author", "reviewer"), async (request, response) => {
  const courses = await readJsonStore(coursesFile, []);
  if (!courses.some((course) => course.id === request.params.id)) {
    sendApiError(response, request, 404, "COURSE_NOT_FOUND", "Course not found.");
    return;
  }
  const versions = await readJsonStore(courseVersionsFile, []);
  response.json(versions.filter((version) => version.courseId === request.params.id).map(({ snapshot: _snapshot, ...version }) => version));
});

app.get("/api/courses/:id/versions/:version/diff", requireRole("admin", "author", "reviewer"), async (request, response) => {
  const versions = (await readJsonStore(courseVersionsFile, [])).filter((entry) => entry.courseId === request.params.id);
  const target = versions.find((entry) => entry.version === Number(request.params.version));
  const againstVersion = Number(request.query.against) || Number(request.params.version) - 1;
  const against = versions.find((entry) => entry.version === againstVersion);
  if (!target || !against) {
    sendApiError(response, request, 404, "COURSE_VERSION_NOT_FOUND", "Course version not found.");
    return;
  }
  response.json(diffCourseVersions(against, target));
});

app.post("/api/courses/:id/rollback", requireRole("admin", "reviewer"), validateBody(courseRollbackSchema), async (request, response) => {
  await withStoreMutation("courses", async () => {
  const store = await readJsonStore(coursesFile, []);
  const index = store.findIndex((course) => course.id === request.params.id);
  if (index === -1) {
    sendApiError(response, request, 404, "COURSE_NOT_FOUND", "Course not found.");
    return;
  }
  const versions = await readJsonStore(courseVersionsFile, []);
  const source = versions.find((entry) => entry.courseId === request.params.id && entry.version === request.body.version);
  if (!source) {
    sendApiError(response, request, 404, "COURSE_VERSION_NOT_FOUND", "Course version not found.");
    return;
  }
  const now = new Date();
  store[index] = restoreCourseVersion(store[index], source, request.authUserId || "admin", request.body.comment, now);
  versions.unshift(createCourseVersion(store[index], request.authUserId || "admin", "rollback", request.body.comment, now));
  await writeJsonStore(coursesFile, store);
  await writeJsonStore(courseVersionsFile, versions.slice(0, 5000));
  response.json(store[index]);
  });
});

app.delete("/api/courses/:id", requireRole("admin", "author"), async (request, response) => {
  await withStoreMutation("courses", async () => {
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
  const versions = await readJsonStore(courseVersionsFile, []);
  const remainingVersions = versions.filter((entry) => entry.courseId !== course.id);
  if (shouldTrySupabase()) {
    for (const entry of versions.filter((item) => item.courseId === course.id)) {
      await deleteSupabaseRecord("course-versions.json", entry.id);
    }
  } else {
    await writeJsonStore(courseVersionsFile, remainingVersions);
  }
  response.json({ ok: true, id: course.id });
  });
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
  const [progress, submissions, attempts, enrollments, drafts, users, courses, issuedCertificates, learningEvents, quizSessions] = await Promise.all([
    readJsonStore(progressFile, {}),
    readJsonStore(submissionsFile, []),
    readJsonStore(attemptsFile, []),
    readJsonStore(enrollmentsFile, []),
    readJsonStore(draftsFile, []),
    readJsonStore(usersFile, {}),
    readJsonStore(coursesFile, []),
    readJsonStore(issuedCertificatesFile, []),
    readJsonStore(learningEventsFile, []),
    readJsonStore(quizSessionsFile, [])
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
    learningEvents,
    quizSessions
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

app.patch("/api/admin/users/:id/roles", requireRole("admin"), validateBody(roleUpdateSchema), async (request, response) => {
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

app.put("/api/users/:userId", requireAuthenticatedRequest, validateBody(userSettingsSchema), async (request, response) => {
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
  const completedOnboardingNow = !current.onboardingCompleted && Boolean(payload.onboardingCompleted);
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
  if (completedOnboardingNow && request.authUser?.email) {
    sendWelcomeEmail({
      email: request.authUser.email,
      displayName: next.displayName,
      locale: next.locale
    }).catch((error) => console.warn(JSON.stringify({
      level: "warn",
      message: "Welcome email failed",
      requestId: request.requestId,
      error: error.message
    })));
  }
  response.json(users[userId]);
});

app.post("/api/account/avatar", sensitiveRateLimit(20), requireAuthenticatedRequest, validateBody(avatarUploadSchema), async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  if (!supabaseAdmin || !request.authUser?.id) {
    response.status(503).json({ error: "Avatar storage unavailable.", requestId: request.requestId });
    return;
  }
  const parsed = parseImageDataUrl(request.body?.dataUrl);
  if (!parsed) {
    response.status(400).json({ error: "Avatar must be a JPEG, PNG, or WebP data URL under 1 MB.", requestId: request.requestId });
    return;
  }
  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[parsed.mime];
  const objectPath = `${request.authUser.id}/avatar-${Date.now()}.${extension}`;
  const { error: uploadError } = await supabaseAdmin.storage.from("avatars").upload(objectPath, parsed.buffer, {
    contentType: parsed.mime,
    upsert: true,
    cacheControl: "3600"
  });
  if (uploadError) throw uploadError;
  const { data } = supabaseAdmin.storage.from("avatars").getPublicUrl(objectPath);
  const users = await readJsonStore(usersFile, {});
  const userId = request.authUserId;
  users[userId] = {
    ...(users[userId] || createDefaultUser(userId)),
    avatarUrl: data.publicUrl,
    updatedAt: new Date().toISOString()
  };
  await writeJsonStore(usersFile, users);
  response.status(201).json({ avatarUrl: data.publicUrl });
});

app.get("/api/account/export", requireAuthenticatedRequest, async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const userId = request.authUserId;
  const [progress, submissions, attempts, users, issuedCertificates, learningEvents, quizSessions] = await Promise.all([
    readProgressStore(),
    readJsonStore(submissionsFile, []),
    readJsonStore(attemptsFile, []),
    readJsonStore(usersFile, {}),
    readJsonStore(issuedCertificatesFile, []),
    readJsonStore(learningEventsFile, []),
    readJsonStore(quizSessionsFile, [])
  ]);
  response.json({
    exportedAt: new Date().toISOString(),
    account: {
      userId,
      email: request.authUser?.email,
      profile: users[userId] || createDefaultUser(userId)
    },
    progress: progress[userId] || null,
    submissions: submissions.filter((item) => item.userId === userId),
    attempts: attempts.filter((item) => item.userId === userId),
    certificates: issuedCertificates.filter((item) => item.userId === userId),
    learningEvents: learningEvents.filter((item) => item.userId === userId),
    quizSessions: quizSessions.filter((item) => item.userId === userId)
  });
});

app.delete("/api/account", sensitiveRateLimit(10), requireAuthenticatedRequest, validateBody(accountDeletionSchema), async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  if (String(request.body?.confirmation || "") !== "DELETE") {
    response.status(400).json({ error: "Type DELETE to confirm account deletion.", requestId: request.requestId });
    return;
  }
  const userId = request.authUserId;
  if (supabaseAdmin && request.authUser?.id) {
    const deletes = [
      supabaseAdmin.from("learning_events").delete().eq("user_id", userId),
      supabaseAdmin.from("issued_certificates").delete().eq("user_id", userId),
      supabaseAdmin.from("submissions").delete().eq("user_id", userId),
      supabaseAdmin.from("attempts").delete().eq("user_id", userId),
      supabaseAdmin.from("quiz_sessions").delete().eq("user_id", userId),
      supabaseAdmin.from("progress").delete().eq("user_id", userId),
      supabaseAdmin.from("profiles").delete().eq("local_user_id", userId)
    ];
    const results = await Promise.all(deletes);
    const failed = results.find((result) => result.error);
    if (failed?.error) throw failed.error;
    const { data: avatarFiles } = await supabaseAdmin.storage.from("avatars").list(request.authUser.id);
    if (avatarFiles?.length) {
      await supabaseAdmin.storage.from("avatars").remove(avatarFiles.map((file) => `${request.authUser.id}/${file.name}`));
    }
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(request.authUser.id);
    if (authError) throw authError;
  } else {
    await deleteLocalAccountData(userId);
  }
  response.json({ deleted: true });
});

app.get("/api/enrollments", requireRole("admin", "reviewer"), async (_request, response) => {
  response.json(await readJsonStore(enrollmentsFile, []));
});

app.post("/api/enrollments", sensitiveRateLimit(20), validateBody(enrollmentSchema), async (request, response) => {
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

app.post("/api/lesson-drafts", requireRole("admin", "author"), validateBody(lessonDraftSchema), async (request, response) => {
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

app.patch("/api/lesson-drafts/:id", requireRole("admin", "author", "reviewer"), validateBody(lessonDraftUpdateSchema), async (request, response) => {
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

app.put("/api/progress/:userId", requireAuthenticatedRequest, validateBody(progressSchema), async (request, response) => {
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

app.post("/api/progress/migrate", requireAuthenticatedRequest, validateBody(progressMigrationSchema), async (request, response) => {
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

app.get("/api/quizzes/:quizId/session", requireAuthenticatedRequest, async (request, response) => {
  const store = await readJsonStore(quizSessionsFile, []);
  const session = store.find((item) => item.userId === request.authUserId && item.quizId === request.params.quizId);
  response.json(session || null);
});

app.put("/api/quizzes/:quizId/session", requireAuthenticatedRequest, validateBody(quizSessionSchema), async (request, response) => {
  const store = await readJsonStore(quizSessionsFile, []);
  const id = `${request.authUserId}:${request.params.quizId}`;
  const index = store.findIndex((item) => item.id === id);
  const session = {
    id,
    userId: request.authUserId,
    quizId: request.params.quizId,
    ...request.body,
    updatedAt: new Date().toISOString()
  };
  if (index === -1) store.unshift(session);
  else store[index] = session;
  await writeJsonStore(quizSessionsFile, store.slice(0, 5000));
  response.json(session);
});

app.get("/api/submissions", async (request, response) => {
  const store = await readJsonStore(submissionsFile, []);
  const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
  const requestedUserId = typeof userId === "string" ? userId.trim() : "";
  const canReview = hasRole(request, "admin", "reviewer");
  if (!request.authUserId && !canReview) {
    sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
    return;
  }
  if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
    sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
    return;
  }
  const normalizedUserId = request.authUserId || requestedUserId;
  if (!normalizedUserId && !canReview) {
    sendApiError(response, request, 403, "ROLE_REQUIRED", "Reviewer role required to list all submissions.");
    return;
  }
  response.json(normalizedUserId ? store.filter((item) => item.userId === normalizedUserId) : store);
});

app.post("/api/submissions", requireAuthenticatedRequest, validateBody(submissionSchema), async (request, response) => {
  await withStoreMutation("submissions", async () => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const payload = request.body;
  if (!isObject(payload) || !payload.projectId || !payload.title) {
    response.status(400).json({ error: "Submission requires userId, projectId and title." });
    return;
  }
  const userId = request.authUserId || payload.userId;
  if (!userId || !authorizePayloadUser(request, response, payload.userId)) return;

  const store = await readJsonStore(submissionsFile, []);
  const previous = store
    .filter((item) => item.userId === userId && item.projectId === payload.projectId)
    .sort((left, right) => Number(right.version || 1) - Number(left.version || 1))[0];
  if (previous && !["changes_requested", "approved"].includes(previous.status)) {
    sendApiError(response, request, 409, "SUBMISSION_ALREADY_ACTIVE", "Wait for review before submitting a new version.");
    return;
  }
  const now = new Date().toISOString();
  const submission = {
    id: `sub-${randomUUID()}`,
    rootId: previous?.rootId || previous?.id || null,
    supersedesId: previous?.id || null,
    version: Number(previous?.version || 0) + 1,
    userId: String(userId),
    projectId: String(payload.projectId),
    title: String(payload.title),
    description: String(payload.description || ""),
    url: String(payload.url || ""),
    repositoryUrl: String(payload.repositoryUrl || ""),
    archiveUrl: String(payload.archiveUrl || ""),
    screenshots: payload.screenshots || [],
    deliverables: payload.deliverables || [],
    selfAssessment: String(payload.selfAssessment || ""),
    visibility: payload.visibility || "private",
    status: "submitted",
    reviewLog: [],
    createdAt: now,
    updatedAt: now
  };
  if (!submission.rootId) submission.rootId = submission.id;
  store.unshift(submission);
  await writeJsonStore(submissionsFile, store.slice(0, 500));
  response.status(201).json(submission);
  });
});

app.get("/api/attempts", async (request, response) => {
  const store = await readJsonStore(attemptsFile, []);
  const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
  const lessonId = Array.isArray(request.query.lessonId) ? request.query.lessonId[0] : request.query.lessonId;
  const requestedUserId = typeof userId === "string" ? userId.trim() : "";
  const canReview = hasRole(request, "admin", "reviewer");
  if (!request.authUserId && !canReview) {
    sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
    return;
  }
  if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
    sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
    return;
  }
  const normalizedUserId = request.authUserId || requestedUserId;
  const normalizedLessonId = typeof lessonId === "string" ? lessonId.trim() : "";
  response.json(
    store.filter((item) =>
      (!normalizedUserId || item.userId === normalizedUserId) &&
      (!normalizedLessonId || item.lessonId === normalizedLessonId)
    )
  );
});

app.post("/api/attempts", requireAuthenticatedRequest, validateBody(attemptSchema), async (request, response) => {
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

app.patch("/api/submissions/:id/review", requireRole("admin", "reviewer"), validateBody(reviewSchema), async (request, response) => {
  await withStoreMutation("submissions", async () => {
  const payload = request.body;
  const allowedStatuses = new Set(["in_review", "approved", "changes_requested"]);
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
  if (payload.expectedVersion && payload.expectedVersion !== Number(store[index].version || 1)) {
    sendApiError(response, request, 409, "SUBMISSION_VERSION_CONFLICT", "Submission version changed before this review was saved.");
    return;
  }

  const reviewedAt = new Date().toISOString();
  const review = {
    status: payload.status,
    feedback: String(payload.feedback || ""),
    reviewer: String(payload.reviewer || "PulsaTeach reviewer"),
    score: Number.isFinite(Number(payload.score)) ? Number(payload.score) : null,
    rubric: isObject(payload.rubric) ? payload.rubric : {},
    contextualComments: isObject(payload.contextualComments) ? payload.contextualComments : {},
    reviewedAt,
    updatedAt: reviewedAt
  };
  store[index] = {
    ...store[index],
    ...review,
    reviewLog: [{
      status: review.status,
      feedback: review.feedback,
      reviewer: review.reviewer,
      score: review.score,
      rubric: review.rubric,
      contextualComments: review.contextualComments,
      at: reviewedAt
    }, ...(store[index].reviewLog || [])].slice(0, 100)
  };
  await writeJsonStore(submissionsFile, store);
  response.json(store[index]);
  });
});

app.delete("/api/submissions/:id", requireRole("admin"), async (request, response) => {
  await withStoreMutation("submissions", async () => {
  const store = await readJsonStore(submissionsFile, []);
  const submission = store.find((item) => item.id === request.params.id);
  if (!submission) {
    sendApiError(response, request, 404, "SUBMISSION_NOT_FOUND", "Submission not found.");
    return;
  }
  if (shouldTrySupabase()) await deleteSupabaseRecord("submissions.json", submission.id);
  else await writeJsonStore(submissionsFile, store.filter((item) => item.id !== submission.id));
  response.json({ ok: true, id: submission.id });
  });
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

app.post("/api/certificates/:certificateId/issue", requireAuthenticatedRequest, async (request, response) => {
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
    certificateVersion: evaluation.certificateVersion,
    evidence: evaluation.evidence,
    issuedAt: now,
    expiresAt: null,
    revokedAt: null,
    revocationReason: null
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
    valid: !certificate.revokedAt && (!certificate.expiresAt || new Date(certificate.expiresAt).getTime() > Date.now()),
    status: certificate.revokedAt ? "revoked" : certificate.expiresAt && new Date(certificate.expiresAt).getTime() <= Date.now() ? "expired" : "valid",
    certificate: {
      verificationCode: certificate.verificationCode,
      learnerName: certificate.learnerName,
      title: certificate.title,
      certificateVersion: certificate.certificateVersion || 1,
      evidence: certificate.evidence,
      issuedAt: certificate.issuedAt,
      expiresAt: certificate.expiresAt || null,
      revokedAt: certificate.revokedAt,
      revocationReason: certificate.revocationReason || null
    }
  });
});

app.patch("/api/certificates/:id/revoke", requireRole("admin", "reviewer"), validateBody(certificateRevokeSchema), async (request, response) => {
  const issued = await readJsonStore(issuedCertificatesFile, []);
  const index = issued.findIndex((certificate) => certificate.id === request.params.id);
  if (index === -1) {
    sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
    return;
  }
  issued[index] = {
    ...issued[index],
    revokedAt: new Date().toISOString(),
    revocationReason: request.body.reason
  };
  await writeJsonStore(issuedCertificatesFile, issued);
  response.json(issued[index]);
});

app.post("/api/events", sensitiveRateLimit(120), requireAuthenticatedRequest, validateBody(eventSchema), async (request, response) => {
  if (!requireAuthenticatedWrite(request, response)) return;
  const payload = request.body;
  if (!isObject(payload) || !payload.eventType) {
    response.status(400).json({ error: "Event type is required.", requestId: request.requestId });
    return;
  }
  const allowedEvents = new Set(["lesson_opened", "tests_run", "tests_failed", "lesson_completed", "hint_opened", "progress_migrated", "review_started", "review_answered", "review_completed"]);
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
  const status = Number(error?.status) >= 400 && Number(error?.status) < 600 ? Number(error.status) : 500;
  console.error(JSON.stringify({
    level: status >= 500 ? "error" : "warn",
    message: error?.message || "Unhandled API error",
    requestId: request.requestId,
    method: request.method,
    path: request.path,
    stack: status >= 500 && process.env.NODE_ENV !== "production" ? error?.stack : undefined
  }));
  sendApiError(
    response,
    request,
    status,
    error?.code || (status === 500 ? "INTERNAL_ERROR" : "REQUEST_REJECTED"),
    status === 500 ? "Internal server error." : error.message
  );
});

if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
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

  await writeLocalJson(file, store);
}

async function writeLocalJson(file, store) {
  const previous = localWriteQueues.get(file) || Promise.resolve();
  const next = previous.catch(() => {}).then(async () => {
    await mkdir(dataDir, { recursive: true });
    const temporaryFile = `${file}.${process.pid}.${randomUUID()}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(store, null, 2), "utf8");
    try {
      await rename(temporaryFile, file);
    } catch (error) {
      if (!["EACCES", "EPERM"].includes(error?.code)) throw error;
      await copyFile(temporaryFile, file);
      await unlink(temporaryFile);
    }
  });
  localWriteQueues.set(file, next);
  try {
    await next;
  } finally {
    if (localWriteQueues.get(file) === next) localWriteQueues.delete(file);
  }
}

async function withStoreMutation(key, operation) {
  const previous = storeMutationQueues.get(key) || Promise.resolve();
  const next = previous.catch(() => {}).then(operation);
  storeMutationQueues.set(key, next);
  try {
    return await next;
  } finally {
    if (storeMutationQueues.get(key) === next) storeMutationQueues.delete(key);
  }
}

async function attachAuthUser(request, _response, next) {
  try {
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

    const localUserId = request.headers["x-pulsateach-user-id"];
    if (!request.authUserId && localIdentityEnabled && typeof localUserId === "string" && /^[a-z0-9][a-z0-9._:@-]{2,159}$/i.test(localUserId)) {
      request.authUserId = localUserId;
      request.authUser = {
        id: localUserId,
        email: localUserId.startsWith("local-") ? localUserId.slice(6).replaceAll("-", ".") : null,
        app_metadata: {},
        user_metadata: {},
        provider: "local-development"
      };
    }

    const providedAdminKey = request.headers["x-pulsateach-admin-key"];
    if (adminAccessKey && typeof providedAdminKey === "string" && providedAdminKey === adminAccessKey) {
      request.authRoles = Array.from(new Set([...(request.authRoles || []), "admin", "author", "reviewer"]));
    }

    next();
  } catch (error) {
    next(error);
  }
}

function attachRequestContext(request, response, next) {
  const startedAt = Date.now();
  request.requestId = String(request.headers["x-request-id"] || randomUUID());
  response.setHeader("X-Request-Id", request.requestId);
  response.on("finish", () => {
    if (process.env.PULSATEACH_LOG_LEVEL === "silent") return;
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
  if (!request.authUserId) {
    sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
    return false;
  }
  if (request.params.userId !== request.authUserId) {
    sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
    return false;
  }
  return true;
}

function authorizePayloadUser(request, response, payloadUserId) {
  if (request.authUserId && payloadUserId && payloadUserId !== request.authUserId) {
    sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot write another learner.");
    return false;
  }
  return true;
}

function requireAuthenticatedWrite(request, response) {
  if (request.authUserId || request.authRoles?.includes("admin")) return true;
  sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
  return false;
}

function requireAuthenticatedRequest(request, response, next) {
  if (request.authUserId) {
    next();
    return;
  }
  sendApiError(response, request, 401, "AUTH_REQUIRED", "A learner identity is required.");
}

function requireRole(...roles) {
  return (request, response, next) => {
    if (hasRole(request, ...roles)) {
      next();
      return;
    }
    sendApiError(
      response,
      request,
      request.authUser || request.authRoles?.length ? 403 : 401,
      request.authUser || request.authRoles?.length ? "ROLE_REQUIRED" : "AUTH_REQUIRED",
      `Required role: ${roles.join(" or ")}.`
    );
  };
}

function sendApiError(response, request, status, code, message, details) {
  response.status(status).json({
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details })
    },
    requestId: request.requestId
  });
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

async function publishDueScheduledCourses(now = new Date()) {
  await withStoreMutation("courses", async () => {
  const courses = await readJsonStore(coursesFile, []);
  const due = courses.filter((course) =>
    course.status === "scheduled"
    && course.scheduledAt
    && new Date(course.scheduledAt).getTime() <= now.getTime()
  );
  if (!due.length) return;

  const versions = await readJsonStore(courseVersionsFile, []);
  for (const course of due) {
    course.status = "published";
    course.version = Number(course.version || 1) + 1;
    course.publishedAt = course.publishedAt || now.toISOString();
    course.scheduledAt = null;
    course.updatedAt = now.toISOString();
    course.workflowLog = appendWorkflowLog(course.workflowLog, {
      from: "scheduled",
      to: "published",
      actor: "system",
      comment: "Scheduled publication",
      at: now.toISOString(),
      kind: "transition"
    });
    versions.unshift(createCourseVersion(course, "system", "transition", "Scheduled publication", now));
  }
  await writeJsonStore(coursesFile, courses);
  await writeJsonStore(courseVersionsFile, versions.slice(0, 5000));
  });
}

function summarizeTrack(track) {
  return {
    id: track.id,
    label: track.label,
    title: track.title,
    summary: track.summary,
    level: track.level,
    profession: track.profession,
    prerequisites: track.prerequisites,
    outcomes: track.outcomes,
    capstone: track.capstone,
    certification: track.certification,
    source: track.source,
    version: track.version,
    isSummary: true,
    modules: (track.modules || []).map((module) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      importance: module.importance,
      deliverable: module.deliverable,
      prerequisites: module.prerequisites,
      outcomes: module.outcomes,
      vocabulary: module.vocabulary,
      mastery: module.mastery,
      totalMinutes: module.totalMinutes,
      lessons: (module.lessons || []).map((lesson) => ({
        id: lesson.id,
        type: lesson.type,
        runtime: lesson.runtime,
        title: lesson.title,
        brief: lesson.brief,
        skills: lesson.skills,
        difficulty: lesson.difficulty,
        durationMin: lesson.durationMin,
        xp: lesson.xp
      }))
    }))
  };
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
      const requiredExams = requiredLessons.filter((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id));
      const completedExams = requiredExams.filter((lesson) => completedLessonIds.includes(lesson.id));
      const demonstratedSkills = [...new Set(requiredLessons.flatMap((lesson) => lesson.skills || []))].sort();
      const projectEvidence = certificate.requiredProjects.map((projectId) => {
        const submission = userSubmissions
          .filter((item) => item.projectId === projectId && item.status === "approved")
          .sort((left, right) => Number(right.version || 1) - Number(left.version || 1))[0];
        return submission ? { projectId, submissionId: submission.id, version: submission.version || 1, score: submission.score } : { projectId, submissionId: null };
      });
      const trackVersions = Object.fromEntries(certificate.requiredTracks.map((trackId) => {
        const track = learningTracks.find((item) => item.id === trackId);
        return [trackId, track?.version || "2026.06"];
      }));
      const lessonPercent = requiredLessons.length ? Math.round((completedRequiredLessons.length / requiredLessons.length) * 100) : 0;
      const projectPercent = certificate.requiredProjects.length ? Math.round((approvedProjects.length / certificate.requiredProjects.length) * 100) : 0;
      const eligible = lessonPercent === 100 && projectPercent === 100;

      return {
        ...certificate,
        certificateVersion: 1,
        eligible,
        issued: issuedCertificates.find((item) => item.userId === userId && item.certificateId === certificate.id && !item.revokedAt) || null,
        progress: {
          lessonPercent,
          projectPercent,
          lessonsCompleted: completedRequiredLessons.length,
          lessonsRequired: requiredLessons.length,
          projectsApproved: approvedProjects.length,
          projectsRequired: certificate.requiredProjects.length
        },
        evidence: {
          certificateVersion: 1,
          trackVersions,
          skills: demonstratedSkills,
          exams: {
            completed: completedExams.map((lesson) => lesson.id),
            required: requiredExams.map((lesson) => lesson.id)
          },
          projects: projectEvidence,
          progress: {
            lessonsCompleted: completedRequiredLessons.length,
            lessonsRequired: requiredLessons.length,
            projectsApproved: approvedProjects.length,
            projectsRequired: certificate.requiredProjects.length
          }
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

function parseImageDataUrl(value) {
  const match = String(value || "").match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > 1024 * 1024) return null;
  return { mime: match[1], buffer };
}

async function deleteLocalAccountData(userId) {
  const progress = await readJsonStore(progressFile, {});
  delete progress[userId];
  await writeJsonStore(progressFile, progress);
  const users = await readJsonStore(usersFile, {});
  delete users[userId];
  await writeJsonStore(usersFile, users);
  for (const [file, fallback] of [[attemptsFile, []], [submissionsFile, []], [learningEventsFile, []], [issuedCertificatesFile, []], [quizSessionsFile, []]]) {
    const items = await readJsonStore(file, fallback);
    await writeJsonStore(file, items.filter((item) => item.userId !== userId));
  }
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
