import { createHash } from "node:crypto";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { certificates, legacyProjectAliases } from "./certificateCatalog.js";

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

function privacyMetric(id, label, count) {
  const value = privacyValue(count);
  return { id, label, value, suppressed: value === null };
}

function privacyValue(count) {
  const numeric = Number(count) || 0;
  return numeric > 0 && numeric < 3 ? null : numeric;
}

function analyticsUserKey(userId) {
  return createHash("sha256")
    .update(`${process.env.PULSATEACH_ANALYTICS_SALT || "pulsateach-analytics"}:${userId || "anonymous"}`)
    .digest("hex")
    .slice(0, 16);
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
  const completedLessonIds = Object.keys(completed).filter((lessonId) => Boolean(completed[lessonId]));
  const quizEvidence = isObject(progress?.quizEvidence) ? progress.quizEvidence : {};

  return {
    userId,
    certificates: certificates.map((certificate) => {
      const requiredLessons = getLessonsForTracks(certificate.requiredTracks);
      const requiredExams = requiredLessons.filter((lesson) => lesson.purpose === "exam" || /final-exam|exam/i.test(lesson.id));
      const requiredExamIds = new Set(requiredExams.map((lesson) => lesson.id));
      const completedRequiredLessons = requiredLessons.filter((lesson) => completedLessonIds.includes(lesson.id) && (!requiredExamIds.has(lesson.id) || quizEvidence[lesson.id]?.passed));
      const completedExams = requiredExams.filter((lesson) => completedRequiredLessons.includes(lesson));
      const demonstratedSkills = [...new Set(requiredLessons.flatMap((lesson) => lesson.skills || []))].sort();
      const projectEvidence = certificate.requiredProjects.map((projectId) => {
        const submission = userSubmissions
          .filter((item) => matchesProjectId(projectId, item.projectId) && item.status === "approved" && (item.score ?? 0) >= certificate.minProjectScore)
          .sort((left, right) => Number(right.version || 1) - Number(left.version || 1))[0];
        return submission ? { projectId, submissionId: submission.id, version: submission.version || 1, score: submission.score } : { projectId, submissionId: null };
      });
      const approvedProjects = projectEvidence.filter((project) => project.submissionId);
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

function matchesProjectId(requiredId, submittedId) {
  return requiredId === submittedId || (legacyProjectAliases[requiredId] || []).includes(submittedId);
}

function mergeProgress(remoteProgress, localProgress) {
  const remote = isObject(remoteProgress) ? remoteProgress : {};
  const local = isObject(localProgress) ? localProgress : {};
  const activity = [...(local.activity || []), ...(remote.activity || [])]
    .filter((item, index, items) => items.findIndex((candidate) => `${candidate.id}-${candidate.at}` === `${item.id}-${item.at}`) === index)
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")))
    .slice(0, 100);
  const localStreak = isObject(local.streak) ? local.streak : {};
  const remoteStreak = isObject(remote.streak) ? remote.streak : {};
  return {
    ...local,
    ...remote,
    xp: Math.max(Number(local.xp) || 0, Number(remote.xp) || 0),
    streak: {
      ...localStreak,
      ...remoteStreak,
      count: Math.max(Number(localStreak.count) || 0, Number(remoteStreak.count) || 0),
      longest: Math.max(Number(localStreak.longest) || 0, Number(remoteStreak.longest) || 0),
      totalActiveDays: Math.max(Number(localStreak.totalActiveDays) || 0, Number(remoteStreak.totalActiveDays) || 0),
      recentDates: [...new Set([...(localStreak.recentDates || []), ...(remoteStreak.recentDates || [])])].sort().slice(-30)
    },
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

export { analyticsUserKey, buildCertificatesForUser, buildProfileSummary, buildStudyPlan, createDefaultUser, getCatalogStats, getLessonsForTracks, isObject, mergeProgress, normalizeLocalizedText, parseImageDataUrl, privacyMetric, privacyValue, slugify, summarizeTrack, uniqueSlug };
