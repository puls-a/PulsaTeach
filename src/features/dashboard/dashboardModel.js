import { getLocalDateKey } from "../learn/learningState.js";

export function buildDailyDashboard({ progress = {}, profile = {}, plannedLessons = [], lessons = [], now = new Date() }) {
  const completed = progress.completed || {};
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const available = lessons.filter((lesson) => !completed[lesson.id]);
  const storedResume = progress.lastOpenedLesson;
  const resumeLesson = storedResume && !completed[storedResume.lessonId]
    ? lessonById.get(storedResume.lessonId) || null
    : null;
  const continuation = resumeLesson || findCompletionSuccessor(completed, lessons);
  const recommendedLesson = plannedLessons
    .map((lesson) => ({ ...(lessonById.get(lesson.id) || {}), ...lesson }))
    .find((lesson) => lesson.id && !completed[lesson.id] && lesson.id !== continuation?.id)
    || available.find((lesson) => lesson.id !== continuation?.id)
    || null;

  return {
    primaryLesson: continuation || recommendedLesson,
    primaryKind: resumeLesson ? "resume" : continuation ? "continue" : recommendedLesson ? "start" : "catalog",
    recommendedLesson: continuation ? recommendedLesson : null,
    dailyGoal: getDailyGoal(progress.daily, profile.weeklyMinutes, now)
  };
}

export function getDailyGoal(daily = {}, weeklyMinutes = 120, now = new Date()) {
  const normalizedWeeklyMinutes = Math.max(15, Number(weeklyMinutes) || 120);
  const targetMinutes = Math.max(5, Math.ceil(normalizedWeeklyMinutes / 7 / 5) * 5);
  const lessonMinutes = daily?.date === getLocalDateKey(now) ? daily.lessonMinutes || {} : {};
  const completedMinutes = Object.values(lessonMinutes).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  return {
    targetMinutes,
    completedMinutes,
    percent: Math.min(100, Math.round((completedMinutes / targetMinutes) * 100)),
    complete: completedMinutes >= targetMinutes
  };
}

function findCompletionSuccessor(completed, lessons) {
  const latestId = Object.entries(completed)
    .sort(([, left], [, right]) => Date.parse(right?.passedAt || 0) - Date.parse(left?.passedAt || 0))[0]?.[0];
  if (!latestId) return null;
  const index = lessons.findIndex((lesson) => lesson.id === latestId);
  return lessons.slice(index + 1).find((lesson) => !completed[lesson.id]) || null;
}
