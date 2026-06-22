import { learningTracks } from "../../content/trackRegistry.js";

const progressKey = "pulsateach-learning-progress";
const bookmarksKey = "pulsateach-learning-bookmarks";

export function getNextLesson(track, moduleId, lessonId) {
  const flat = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })));
  const index = flat.findIndex((item) => item.moduleId === moduleId && item.lessonId === lessonId);
  return index >= 0 ? flat[index + 1] : null;
}

export function readLessonRoute() {
  const fallbackTrack = learningTracks[0];
  const fallbackModule = fallbackTrack.modules[0];
  const fallback = { trackId: fallbackTrack.id, moduleId: fallbackModule.id, lessonId: fallbackModule.lessons[0].id };
  const cleanMatch = window.location.pathname.match(/^\/learn\/([^/]+)\/([^/]+)\/([^/]+)\/?$/);
  const legacyMatch = window.location.hash.match(/^#\/?learn\/([^/]+)\/([^/]+)\/([^/]+)$/);
  const match = cleanMatch || legacyMatch;
  if (!match) return fallback;
  const [, trackId, moduleId, lessonId] = match;
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
  return { xp: 0, completed: {}, activity: [], streak: { count: 0, lastDate: null } };
}

export function markLessonCompleted(progress, lesson, passedCount, now = new Date()) {
  const alreadyCompleted = Boolean(progress.completed?.[lesson.id]);
  const completed = {
    ...(progress.completed || {}),
    [lesson.id]: { passedAt: now.toISOString(), xp: Number(lesson.xp || 0), passedTests: Number(passedCount || 0) }
  };
  return {
    ...progress,
    xp: Number(progress.xp || 0) + (alreadyCompleted ? 0 : Number(lesson.xp || 0)),
    completed,
    activity: alreadyCompleted
      ? progress.activity || []
      : [{ id: lesson.id, title: lesson.title, type: lesson.type, xp: Number(lesson.xp || 0), at: now.toISOString() }, ...(progress.activity || [])].slice(0, 8),
    streak: updateStreak(progress.streak)
  };
}

export function updateStreak(current = { count: 0, lastDate: null }) {
  const today = new Date().toISOString().slice(0, 10);
  if (current.lastDate === today) return current;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { count: current.lastDate === yesterday ? current.count + 1 : 1, lastDate: today };
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
    streak: remote.streak || local.streak || createEmptyProgress().streak,
    review: { ...(local.review || {}), ...(remote.review || {}), items: { ...(local.review?.items || {}), ...(remote.review?.items || {}) } },
    quizEvidence: { ...(local.quizEvidence || {}), ...(remote.quizEvidence || {}) }
  };
}
