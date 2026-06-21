import { reviewMastery } from "../review/spacedRepetition.js";

export function buildSkillIndex(tracks) {
  const skills = new Map();
  for (const track of tracks) {
    for (const module of track.modules || []) {
      for (const lesson of module.lessons || []) {
        for (const rawSkill of lesson.skills || []) {
          const id = slugify(rawSkill);
          if (!id) continue;
          const skill = skills.get(id) || {
            id,
            label: humanize(rawSkill),
            trackIds: [],
            lessonRefs: []
          };
          addUnique(skill.trackIds, track.id);
          if (!skill.lessonRefs.some((reference) => reference.lessonId === lesson.id)) {
            skill.lessonRefs.push({ trackId: track.id, moduleId: module.id, lessonId: lesson.id });
          }
          skills.set(id, skill);
        }
      }
    }
  }
  return [...skills.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function computeSkillProgress(tracks, progress = {}) {
  const completed = progress.completed || {};
  return buildSkillIndex(tracks).map((skill) => {
    const completedLessons = skill.lessonRefs.filter((reference) => completed[reference.lessonId]).length;
    const lessonPercent = Math.round((completedLessons / skill.lessonRefs.length) * 100);
    const quizScores = Object.values(progress.quizEvidence || {})
      .map((evidence) => findSkillScore(evidence?.skills, skill.id))
      .filter((score) => score !== null);
    const reviewScores = Object.values(progress.review?.items || {})
      .filter((item) => (item.skills || []).some((rawSkill) => slugify(rawSkill) === skill.id))
      .map((item) => reviewMastery(item).score);
    const evidence = [
      { score: lessonPercent, weight: 0.5, available: true },
      { score: average(quizScores), weight: 0.3, available: quizScores.length > 0 },
      { score: average(reviewScores), weight: 0.2, available: reviewScores.length > 0 }
    ].filter((item) => item.available);
    const weight = evidence.reduce((sum, item) => sum + item.weight, 0);
    const percent = Math.round(evidence.reduce((sum, item) => sum + item.score * item.weight, 0) / weight);
    return {
      ...skill,
      completedLessons,
      totalLessons: skill.lessonRefs.length,
      quizEvidence: quizScores.length,
      reviewEvidence: reviewScores.length,
      lessonPercent,
      percent,
      status: percent >= 80 ? "mastered" : percent > 0 ? "practicing" : "discovered"
    };
  }).sort((a, b) => b.percent - a.percent || b.totalLessons - a.totalLessons || a.label.localeCompare(b.label));
}

function findSkillScore(skills, targetId) {
  for (const [rawSkill, evidence] of Object.entries(skills || {})) {
    if (slugify(rawSkill) === targetId) return Math.max(0, Math.min(100, Number(evidence?.percent) || 0));
  }
  return null;
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function slugify(value) {
  return String(value || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function humanize(value) {
  return String(value || "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function addUnique(values, value) {
  if (!values.includes(value)) values.push(value);
}
