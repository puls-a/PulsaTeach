import "dotenv/config";
import express from "express";
import { copyFile, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";
import { normalizeQuizLesson, scoreQuiz } from "../src/features/quizzes/quizEngine.js";
import { getQuestionSetVersion, isProtectedExamLesson, sanitizeProgressExamEvidence } from "../src/features/quizzes/examPolicy.js";
import { normalizePublishedCourse, validateCourseForPublication } from "../src/courseSchema.js";
import { appendWorkflowLog, authorizeCourseTransition, createCourseVersion, diffCourseVersions, restoreCourseVersion } from "./courseWorkflow.js";
import { productRoadmap } from "./roadmap.js";
import { decodeProtectedExamResponses, projectPublicTrack } from "./publicContent.js";
import { sendWelcomeEmail, transactionalEmailEnabled } from "./emailService.js";
import { applySecurity, localIdentityEnabled, sensitiveRateLimit } from "./security.js";
import { checkSupabaseReadiness, deleteSupabaseRecord, getSupabaseStatus, getUserFromAccessToken, readSupabaseProgressForUser, readSupabaseStore, requireSupabaseStorage, saveSupabaseProgressAtomic, supabaseAdmin, supabaseEnabled, writeSupabaseStore } from "./supabaseServer.js";
import { createSupabaseSubmission, findSupabaseIssuedCertificateByVerificationCode, findSupabaseQuizSession, issueSupabaseCertificateAtomic, listSupabaseIssuedCertificatesForUser, listSupabaseQuizSessionsForUser, reviewSupabaseSubmission, revokeSupabaseIssuedCertificate, saveSupabaseQuizDraft, submitSupabaseQuizSession } from "./supabaseSensitiveOperations.js";
import { accountDeletionSchema, attemptSchema, avatarUploadSchema, certificateRevokeSchema, courseCreateSchema, courseRollbackSchema, courseUpdateSchema, enrollmentSchema, eventSchema, lessonDraftSchema, lessonDraftUpdateSchema, progressMigrationSchema, progressSchema, quizSessionSchema, quizSubmissionSchema, reviewSchema, roleUpdateSchema, submissionSchema, telemetrySchema, userSettingsSchema, validateBody } from "./validation.js";

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
const examTokenSecret = process.env.PULSATEACH_EXAM_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || adminAccessKey || "pulsateach-local-exam-token";
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
import { registerQuizSessionRoutes } from "./routes/quizSessions.js";
import { registerCertificateRoutes } from "./routes/certificates.js";
import { rolesFromUser } from "./authRoles.js";
import { createAuthService } from "./authService.js";

const app = express();
const productionRuntime = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

if (requireSupabaseStorage && !supabaseEnabled) {
  throw new Error("Supabase storage is required. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
}
if (productionRuntime && !requireSupabaseStorage) {
  throw new Error("Production requires PULSATEACH_STORAGE=supabase-strict.");
}

const {
  attachAuthUser,
  authorizePayloadUser,
  authorizeUserParam,
  hasRole,
  requireAuthenticatedRequest,
  requireAuthenticatedWrite,
  requireRole,
  sendApiError
} = createAuthService({
  adminAccessKey,
  getUserFromAccessToken,
  localIdentityEnabled,
  shouldTrySupabase
});

app.use(attachRequestContext);
applySecurity(app);
app.use("/api/account/avatar", express.json({ limit: "1200kb", strict: true }));
app.use(express.json({ limit: "256kb", strict: true }));
app.use(attachAuthUser);

const routeContext = {
  learningTracks,
  buildGlossaryIndex,
  normalizeQuizLesson,
  scoreQuiz,
  getQuestionSetVersion,
  isProtectedExamLesson,
  sanitizeProgressExamEvidence,
  normalizePublishedCourse,
  validateCourseForPublication,
  appendWorkflowLog,
  authorizeCourseTransition,
  createCourseVersion,
  diffCourseVersions,
  restoreCourseVersion,
  productRoadmap,
  projectPublicTrack,
  decodeProtectedExamResponses,
  examTokenSecret,
  sendWelcomeEmail,
  transactionalEmailEnabled,
  sensitiveRateLimit,
  deleteSupabaseRecord,
  getSupabaseStatus,
  checkSupabaseReadiness,
  readSupabaseProgressForUser,
  saveSupabaseProgressAtomic,
  supabaseAdmin,
  supabaseEnabled,
  requireSupabaseStorage,
  createSupabaseSubmission,
  findSupabaseIssuedCertificateByVerificationCode,
  findSupabaseQuizSession,
  issueSupabaseCertificateAtomic,
  listIssuedCertificatesForUser,
  listSupabaseQuizSessionsForUser,
  reviewSupabaseSubmission,
  revokeSupabaseIssuedCertificate,
  saveSupabaseQuizDraft,
  submitSupabaseQuizSession,
  shouldUseSupabaseMutations,
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
  quizSubmissionSchema,
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
registerQuizSessionRoutes(app, routeContext);
registerCertificateRoutes(app, routeContext);
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
    status === 500 ? "Internal server error." : error.message,
    error?.details
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

function shouldUseSupabaseMutations() {
  return process.env.PULSATEACH_STORAGE !== "json" && supabaseEnabled;
}

async function listIssuedCertificatesForUser(userId) {
  if (shouldUseSupabaseMutations()) return listSupabaseIssuedCertificatesForUser(userId);
  const issued = await readJsonStore(issuedCertificatesFile, []);
  return issued.filter((certificate) => certificate.userId === userId);
}

function markSupabaseUnavailable() {
  supabaseFallbackUntil = Date.now() + supabaseRetryDelayMs;
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
