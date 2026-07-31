export const protectedExamIds = new Set([
  "html-09-final-exam",
  "js-functions-scope-quiz",
  "git-release-quiz",
  "git-final-exam",
  "a11y-remediation-final-exam",
  "a11y-final-exam",
  "testing-final-exam",
  "ts-final-exam",
  "react-final-exam",
  "node-final-exam",
  "sql-final-exam",
  "security-final-exam",
  "performance-final-exam",
  "ops-final-exam"
]);

export function isProtectedExamId(quizId) {
  return protectedExamIds.has(String(quizId || ""));
}

export function isProtectedExamLesson(lesson) {
  return lesson?.type === "quiz" && (lesson.purpose === "exam" || isProtectedExamId(lesson.id));
}

export function getQuestionSetVersion(lesson) {
  return `${lesson.id}:${lesson.examVersion || 2}`;
}

export function sanitizeProtectedReviewItems(items = {}) {
  return Object.fromEntries(Object.entries(items)
    .filter(([, item]) => item && !isProtectedExamId(item.quizId) && item.gradingMode !== "server"));
}

export function sanitizeProgressExamEvidence(progress) {
  if (!progress?.review?.items) return progress;
  return {
    ...progress,
    review: { ...progress.review, items: sanitizeProtectedReviewItems(progress.review.items) }
  };
}
