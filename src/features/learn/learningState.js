import { learningTracks } from "../../content/allTrackRegistry.js";

const progressKey = "pulsateach-learning-progress";
const bookmarksKey = "pulsateach-learning-bookmarks";

export function getNextLesson(track, moduleId, lessonId) {
  const flat = track.modules.flatMap((module) => module.lessons
    .filter((lesson) => lesson.type !== "quiz" || lesson.purpose === "exam")
    .map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })));
  const index = flat.findIndex((item) => item.moduleId === moduleId && item.lessonId === lessonId);
  if (index < 0) {
    const moduleIndex = track.modules.findIndex((module) => module.id === moduleId);
    const next = track.modules.slice(moduleIndex + 1)
      .flatMap((module) => module.lessons.filter((lesson) => lesson.type !== "quiz").map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })))[0];
    return next || null;
  }
  return index >= 0 ? flat[index + 1] : null;
}

export function getPreviousLesson(track, moduleId, lessonId) {
  const flat = track.modules.flatMap((module) => module.lessons.map((lesson) => ({
    moduleId: module.id,
    lessonId: lesson.id,
    type: lesson.type
  })));
  const index = flat.findIndex((item) => item.moduleId === moduleId && item.lessonId === lessonId);
  return flat.slice(0, Math.max(0, index)).reverse().find((item) => item.type !== "quiz") || null;
}

export function readLessonRoute() {
  const fallbackTrack = learningTracks[0];
  const fallbackModule = fallbackTrack.modules[0];
  const fallback = { trackId: fallbackTrack.id, moduleId: fallbackModule.id, lessonId: fallbackModule.lessons[0].id };
  const cleanMatch = window.location.pathname.match(/^\/learn\/([^/]+)\/([^/]+)\/([^/]+)\/?$/);
  const hashMatch = window.location.hash.match(/^#\/?learn\/([^/]+)\/([^/]+)\/([^/]+)$/);
  const finalMatch = cleanMatch || hashMatch;
  if (!finalMatch) return fallback;
  const [, trackId, moduleId, lessonId] = finalMatch;
  return { trackId, moduleId, lessonId };
}

export function copyLessonLink() {
  navigator.clipboard?.writeText(window.location.href);
}

export function isVisibleLesson(lesson, progress, bookmarks, query, filter, locale) {
  const isDone = Boolean(progress.completed[lesson.id]);
  if (filter === "todo" && isDone) return false;
  if (filter === "done" && !isDone) return false;
  if (filter === "saved" && !bookmarks.includes(lesson.id)) return false;
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return [lesson.title?.[locale], lesson.title?.en, lesson.brief?.[locale], lesson.brief?.en, lesson.id, lesson.type]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
}

export function filterLabel(filter, locale) {
  return {
    all: { fr: "Tout", en: "All" },
    todo: { fr: "À faire", en: "Todo" },
    done: { fr: "Validé", en: "Done" },
    saved: { fr: "Favoris", en: "Saved" }
  }[filter][locale];
}

export function readStoredJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

export function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.en || value.fr || "";
  return String(value || "");
}

export function hasResponse(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0 && Object.values(value).every(Boolean);
  return String(value ?? "").trim().length > 0;
}

export function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(bookmarksKey)) || [];
  } catch {
    return [];
  }
}

export function readProgress() {
  try {
    return { ...createEmptyProgress(), ...JSON.parse(localStorage.getItem(progressKey)) };
  } catch {
    return createEmptyProgress();
  }
}

export function createEmptyProgress() {
  return { xp: 0, completed: {}, activity: [], streak: { count: 0, longest: 0, lastDate: null, totalActiveDays: 0, recentDates: [] } };
}

export function markLessonCompleted(progress, lesson, passedCount, now = new Date()) {
  const alreadyCompleted = Boolean(progress.completed?.[lesson.id]);
  const previousStreakDate = progress.streak?.lastDate || null;
  const streak = updateStreak(progress.streak, now);
  const dailyBonus = !alreadyCompleted && previousStreakDate !== streak.lastDate ? 10 : 0;
  const completed = {
    ...(progress.completed || {}),
    [lesson.id]: { passedAt: now.toISOString(), xp: Number(lesson.xp || 0), passedTests: Number(passedCount || 0) }
  };
  return {
    ...progress,
    xp: Number(progress.xp || 0) + (alreadyCompleted ? 0 : Number(lesson.xp || 0) + dailyBonus),
    completed,
    activity: alreadyCompleted
      ? progress.activity || []
      : [{ id: lesson.id, title: lesson.title, type: lesson.type, xp: Number(lesson.xp || 0), bonusXp: dailyBonus, at: now.toISOString() }, ...(progress.activity || [])].slice(0, 8),
    streak
  };
}

export function updateStreak(current = createEmptyProgress().streak, now = new Date()) {
  const today = localDateKey(now);
  if (current.lastDate === today) return current;
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = localDateKey(yesterdayDate);
  const count = current.lastDate === yesterday ? Number(current.count || 0) + 1 : 1;
  const recentDates = [today, ...(current.recentDates || []).filter((date) => date !== today)].slice(0, 14);
  return {
    count,
    longest: Math.max(Number(current.longest || 0), count),
    lastDate: today,
    totalActiveDays: Number(current.totalActiveDays || 0) + 1,
    recentDates
  };
}

export function streakStatus(streak = createEmptyProgress().streak, now = new Date()) {
  const normalized = { ...createEmptyProgress().streak, ...(streak || {}) };
  const today = localDateKey(now);
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const activeToday = normalized.lastDate === today;
  const atRisk = !activeToday && normalized.lastDate === localDateKey(yesterdayDate) && normalized.count > 0;
  const milestones = [3, 7, 14, 30, 60, 100];
  return {
    ...normalized,
    activeToday,
    atRisk,
    nextMilestone: milestones.find((value) => value > Number(normalized.count || 0)) || null
  };
}

function localDateKey(date) {
  const parts = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  return `${parts.find((part) => part.type === "year").value}-${parts.find((part) => part.type === "month").value}-${parts.find((part) => part.type === "day").value}`;
}

export function mergeProgress(local, remote) {
  const completed = { ...local.completed, ...remote.completed };
  const activity = [...(remote.activity || []), ...(local.activity || [])]
    .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id && candidate.at === item.at) === index)
    .slice(0, 8);
  return {
    ...createEmptyProgress(),
    ...local,
    ...remote,
    xp: Math.max(local.xp || 0, remote.xp || 0),
    completed,
    activity,
    streak: {
      ...createEmptyProgress().streak,
      ...(local.streak || {}),
      ...(remote.streak || {}),
      count: Math.max(Number(local.streak?.count) || 0, Number(remote.streak?.count) || 0),
      longest: Math.max(Number(local.streak?.longest) || 0, Number(remote.streak?.longest) || 0),
      totalActiveDays: Math.max(Number(local.streak?.totalActiveDays) || 0, Number(remote.streak?.totalActiveDays) || 0),
      recentDates: [...new Set([...(local.streak?.recentDates || []), ...(remote.streak?.recentDates || [])])].sort().slice(-30)
    },
    review: { ...(local.review || {}), ...(remote.review || {}), items: { ...(local.review?.items || {}), ...(remote.review?.items || {}) } },
    quizEvidence: { ...(local.quizEvidence || {}), ...(remote.quizEvidence || {}) }
  };
}
