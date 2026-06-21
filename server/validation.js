import { z } from "zod";

const id = z.string().trim().min(1).max(160);
const localizedText = z.union([
  z.string().max(5000),
  z.object({
    fr: z.string().max(5000).optional(),
    en: z.string().max(5000).optional()
  }).strict()
]);
const curriculum = z.object({
  modules: z.array(z.unknown()).max(100)
}).passthrough();
const reviewItemSchema = z.object({
  id,
  kind: z.literal("quiz-question"),
  quizId: id,
  questionId: id,
  trackId: z.string().max(160),
  moduleId: z.string().max(160),
  lessonId: id,
  prompt: localizedText,
  choices: z.array(z.unknown()).max(100),
  pairs: z.array(z.unknown()).max(100),
  answer: z.unknown(),
  acceptedAnswers: z.array(z.unknown()).max(100),
  keywords: z.array(z.string().max(200)).max(100),
  explanation: localizedText.optional(),
  questionType: z.string().max(80),
  skills: z.array(z.string().max(160)).max(100),
  glossaryTerms: z.array(z.string().max(160)).max(100),
  intervalDays: z.coerce.number().min(0).max(36_500),
  ease: z.coerce.number().min(1.3).max(3),
  repetitions: z.coerce.number().int().min(0).max(100_000),
  lapses: z.coerce.number().int().min(0).max(100_000),
  confidence: z.coerce.number().min(0).max(1),
  dueAt: z.string().datetime(),
  lastReviewedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime()
}).strict();
const quizEvidenceSchema = z.object({
  percent: z.coerce.number().min(0).max(100),
  passed: z.boolean(),
  skills: z.record(z.string(), z.object({
    earned: z.coerce.number().min(0),
    available: z.coerce.number().min(0),
    percent: z.coerce.number().min(0).max(100)
  }).strict()),
  attemptedAt: z.string().datetime()
}).strict();

export const courseCreateSchema = z.object({
  title: localizedText,
  slug: z.string().trim().max(160).optional(),
  description: localizedText.optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  language: z.enum(["fr", "en"]).optional(),
  curriculum: curriculum.optional()
}).strict();

export const courseUpdateSchema = z.object({
  title: localizedText.optional(),
  description: localizedText.optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  status: z.enum(["draft", "review", "changes_requested", "approved", "scheduled", "published", "archived"]).optional(),
  curriculum: curriculum.optional(),
  comment: z.string().trim().max(4000).optional(),
  scheduledAt: z.string().datetime().nullable().optional(),
  expectedVersion: z.coerce.number().int().min(1).optional()
}).strict();

export const courseRollbackSchema = z.object({
  version: z.coerce.number().int().min(1),
  comment: z.string().trim().min(3).max(4000)
}).strict();

export const certificateRevokeSchema = z.object({
  reason: z.string().trim().min(5).max(1000)
}).strict();

export const userSettingsSchema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  goal: z.string().trim().min(1).max(80).optional(),
  weeklyMinutes: z.coerce.number().int().min(15).max(2520).optional(),
  locale: z.enum(["fr", "en"]).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.union([z.literal(""), z.string().url().max(500)]).optional(),
  onboardingCompleted: z.boolean().optional()
}).strict();

export const progressSchema = z.object({
  xp: z.coerce.number().int().min(0).max(10_000_000).optional(),
  completed: z.record(z.string(), z.unknown()).optional(),
  activity: z.array(z.unknown()).max(5000).optional(),
  streak: z.object({
    count: z.coerce.number().int().min(0).max(100_000).optional(),
    lastDate: z.string().max(40).nullable().optional()
  }).strict().optional(),
  review: z.object({
    items: z.record(z.string(), reviewItemSchema).refine((items) => Object.keys(items).length <= 5000, "Too many review items"),
    updatedAt: z.string().datetime().optional()
  }).strict().optional(),
  quizEvidence: z.record(z.string(), quizEvidenceSchema).refine((items) => Object.keys(items).length <= 5000, "Too much quiz evidence").optional()
}).passthrough();

export const progressMigrationSchema = z.object({
  progress: progressSchema
}).strict();

export const quizSessionSchema = z.object({
  currentIndex: z.coerce.number().int().min(0).max(1000).optional().default(0),
  responses: z.record(z.string(), z.unknown()).optional().default({}),
  rationales: z.record(z.string(), z.string().max(4000)).optional().default({}),
  status: z.enum(["draft", "completed"]).optional().default("draft"),
  score: z.object({
    earned: z.number().min(0),
    available: z.number().min(0),
    percent: z.number().min(0).max(100),
    passed: z.boolean()
  }).strict().nullable().optional()
}).strict();

export const submissionSchema = z.object({
  userId: id.optional(),
  projectId: id,
  title: z.string().trim().min(1).max(160),
  description: z.string().max(4000).optional().default(""),
  url: z.union([z.literal(""), z.string().url().max(1000)]).optional().default(""),
  repositoryUrl: z.union([z.literal(""), z.string().url().max(1000)]).optional().default(""),
  archiveUrl: z.union([z.literal(""), z.string().url().max(1000)]).optional().default(""),
  screenshots: z.array(z.string().url().max(1000)).max(8).optional().default([]),
  deliverables: z.array(z.string().trim().min(1).max(500)).max(30).optional().default([]),
  selfAssessment: z.string().max(4000).optional().default(""),
  visibility: z.enum(["private", "unlisted", "public"]).optional().default("private")
}).strict();

export const attemptSchema = z.object({
  userId: id.optional(),
  lessonId: id,
  trackId: z.string().max(160).optional().default(""),
  moduleId: z.string().max(160).optional().default(""),
  passed: z.coerce.number().int().min(0).max(10_000).optional().default(0),
  total: z.coerce.number().int().min(0).max(10_000).optional().default(0)
}).strict().refine((value) => value.passed <= value.total, {
  message: "passed cannot exceed total",
  path: ["passed"]
});

export const enrollmentSchema = z.object({
  email: z.string().trim().email().max(320),
  locale: z.enum(["fr", "en"]).optional().default("en"),
  source: z.string().trim().min(1).max(80).optional().default("landing")
}).strict();

export const eventSchema = z.object({
  eventType: z.enum(["lesson_opened", "tests_run", "tests_failed", "lesson_completed", "hint_opened", "progress_migrated", "review_started", "review_answered", "review_completed"]),
  lessonId: z.string().max(160).optional(),
  trackId: z.string().max(160).optional(),
  payload: z.record(z.string(), z.unknown()).optional().default({})
}).strict();

export const reviewSchema = z.object({
  status: z.enum(["in_review", "approved", "changes_requested"]),
  feedback: z.string().max(4000).optional().default(""),
  reviewer: z.string().max(160).optional().default("PulsaTeach reviewer"),
  score: z.coerce.number().min(0).max(100).nullable().optional(),
  rubric: z.record(z.string(), z.coerce.number().min(0).max(100)).optional().default({}),
  contextualComments: z.record(z.string(), z.string().max(2000)).optional().default({}),
  expectedVersion: z.coerce.number().int().min(1).optional()
}).strict();

export const roleUpdateSchema = z.object({
  roles: z.array(z.enum(["admin", "author", "reviewer"])).max(3)
}).strict();

export const lessonDraftSchema = z.object({
  trackId: id,
  moduleId: z.string().max(160).optional(),
  title: localizedText,
  objective: localizedText.optional(),
  prompt: localizedText.optional(),
  type: z.enum(["html", "css", "js", "dom", "typescript", "react", "node", "sql", "terminal", "text", "quiz", "project"]).optional(),
  difficulty: z.enum(["starter", "intermediate", "advanced"]).optional(),
  skills: z.array(z.string().trim().min(1).max(80)).max(30).optional(),
  xp: z.coerce.number().int().min(0).max(1000).optional()
}).strict();

export const lessonDraftUpdateSchema = z.object({
  status: z.enum(["draft", "review", "published"]).optional(),
  title: localizedText.optional(),
  objective: localizedText.optional(),
  prompt: localizedText.optional()
}).strict();

export const avatarUploadSchema = z.object({
  dataUrl: z.string().max(1_500_000)
}).strict();

export const accountDeletionSchema = z.object({
  confirmation: z.literal("DELETE")
}).strict();

export function validateBody(schema) {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Request payload is invalid.",
          details: result.error.flatten()
        },
        requestId: request.requestId
      });
      return;
    }
    request.body = result.data;
    next();
  };
}
