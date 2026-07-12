import "dotenv/config";
import express from "express";
import { copyFile, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";
import { normalizePublishedCourse, validateCourseForPublication } from "../src/courseSchema.js";
import { appendWorkflowLog, authorizeCourseTransition, createCourseVersion, diffCourseVersions, restoreCourseVersion } from "./courseWorkflow.js";
import { productRoadmap } from "./roadmap.js";
import { sendWelcomeEmail, transactionalEmailEnabled } from "./emailService.js";
import { applySecurity, localIdentityEnabled, sensitiveRateLimit } from "./security.js";
import { checkSupabaseReadiness, deleteSupabaseRecord, getSupabaseStatus, getUserFromAccessToken, readSupabaseStore, requireSupabaseStorage, supabaseAdmin, supabaseEnabled, writeSupabaseStore } from "./supabaseServer.js";
import { accountDeletionSchema, attemptSchema, avatarUploadSchema, certificateRevokeSchema, courseCreateSchema, courseRollbackSchema, courseUpdateSchema, enrollmentSchema, eventSchema, lessonDraftSchema, lessonDraftUpdateSchema, progressMigrationSchema, progressSchema, quizSessionSchema, reviewSchema, roleUpdateSchema, submissionSchema, telemetrySchema, userSettingsSchema, validateBody } from "./validation.js";

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
import { certificates, projectLessonIds } from "./certificateCatalog.js";
import { analyticsUserKey, buildCertificatesForUser, buildProfileSummary, buildStudyPlan, createDefaultUser, getCatalogStats, getLessonsForTracks, isObject, mergeProgress, normalizeLocalizedText, parseImageDataUrl, privacyMetric, privacyValue, slugify, summarizeTrack, uniqueSlug } from "./domainHelpers.js";

import { registerSystemRoutes } from "./routes/system.js";
import { registerCoursesRoutes } from "./routes/courses.js";
import { registerAdministrationRoutes } from "./routes/administration.js";
import { registerAccountsRoutes } from "./routes/accounts.js";
import { registerAuthoringRoutes } from "./routes/authoring.js";
import { registerLearningRoutes } from "./routes/learning.js";

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
app.use("/api/account/avatar", express.json({ limit: "1200kb", strict: true }));
app.use(express.json({ limit: "256kb", strict: true }));
app.use(attachAuthUser);

const routeContext = {
  learningTracks,
  buildGlossaryIndex,
  normalizePublishedCourse,
  validateCourseForPublication,
  appendWorkflowLog,
  authorizeCourseTransition,
  createCourseVersion,
  diffCourseVersions,
  restoreCourseVersion,
  productRoadmap,
  sendWelcomeEmail,
  transactionalEmailEnabled,
  sensitiveRateLimit,
  deleteSupabaseRecord,
  getSupabaseStatus,
  checkSupabaseReadiness,
  supabaseAdmin,
  supabaseEnabled,
  requireSupabaseStorage,
  accountDeletionSchema,
  attemptSchema,
  avatarUploadSchema,
  certificateRevokeSchema,
  courseCreateSchema,
  courseRollbackSchema,
  courseUpdateSchema,
  enrollmentSchema,
  eventSchema,
  lessonDraftSchema,
  lessonDraftUpdateSchema,
  progressMigrationSchema,
  progressSchema,
  quizSessionSchema,
  reviewSchema,
  roleUpdateSchema,
  submissionSchema,
  telemetrySchema,
  userSettingsSchema,
  validateBody,
  progressFile,
  submissionsFile,
  attemptsFile,
  enrollmentsFile,
  draftsFile,
  usersFile,
  coursesFile,
  courseVersionsFile,
  issuedCertificatesFile,
  learningEventsFile,
  quizSessionsFile,
  projectLessonIds,
  certificates,
  readProgressStore,
  writeProgressStore,
  readJsonStore,
  writeJsonStore,
  withStoreMutation,
  authorizeUserParam,
  authorizePayloadUser,
  requireAuthenticatedWrite,
  requireAuthenticatedRequest,
  requireRole,
  sendApiError,
  hasRole,
  isObject,
  normalizeLocalizedText,
  createDefaultUser,
  getCatalogStats,
  privacyMetric,
  privacyValue,
  analyticsUserKey,
  summarizeTrack,
  getLessonsForTracks,
  buildCertificatesForUser,
  mergeProgress,
  slugify,
  uniqueSlug,
  parseImageDataUrl,
  buildProfileSummary,
  buildStudyPlan,
  publishDueScheduledCourses,
  deleteLocalAccountData,
  shouldTrySupabase,
  markSupabaseUnavailable,
  rolesFromUser,
  randomUUID,
  createHash
};

registerSystemRoutes(app, routeContext);
registerCoursesRoutes(app, routeContext);
registerAdministrationRoutes(app, routeContext);
registerAccountsRoutes(app, routeContext);
registerAuthoringRoutes(app, routeContext);
registerLearningRoutes(app, routeContext);

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
  const providedRequestId = String(request.headers["x-request-id"] || "");
  request.requestId = /^[a-zA-Z0-9._:-]{8,100}$/.test(providedRequestId) ? providedRequestId : randomUUID();
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
  // Authorization data must only come from server-controlled metadata.
  // Supabase users can update user_metadata themselves, so trusting roles from
  // that object would allow privilege escalation.
  const appMetadata = user.app_metadata || {};
  const rawRoles = appMetadata.roles || appMetadata.role || [];
  const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
  return roles.map((role) => String(role).trim()).filter(Boolean);
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
