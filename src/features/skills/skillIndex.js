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
    const percent = Math.round((completedLessons / skill.lessonRefs.length) * 100);
    return {
      ...skill,
      completedLessons,
      totalLessons: skill.lessonRefs.length,
      percent,
      status: percent === 100 ? "mastered" : percent > 0 ? "practicing" : "discovered"
    };
  }).sort((a, b) => b.percent - a.percent || b.totalLessons - a.totalLessons || a.label.localeCompare(b.label));
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

