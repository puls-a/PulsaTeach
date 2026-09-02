import { pathToFileURL } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";

// Floors are intentionally explicit: staged tracks cannot lose existing scope while
// comprehensive rewrites have realistic targets instead of one arbitrary global count.
export const trackFloors = {
  tools: { stage: "primer", modules: 1, lessons: 6, quizzes: 0, projects: 1, averageTests: 4, testedPracticeRatio: 1 },
  html: { stage: "comprehensive", modules: 10, lessons: 75, quizzes: 10, projects: 10, averageTests: 4.5, testedPracticeRatio: 0.95 },
  css: { stage: "comprehensive", modules: 15, lessons: 120, quizzes: 15, projects: 15, averageTests: 4.5, testedPracticeRatio: 0.95 },
  javascript: { stage: "comprehensive", modules: 18, lessons: 135, quizzes: 18, projects: 16, averageTests: 4.5, testedPracticeRatio: 0.95 },
  git: { stage: "professional", modules: 8, lessons: 40, quizzes: 8, projects: 7, averageTests: 5, testedPracticeRatio: 0.95 },
  accessibility: { stage: "professional", modules: 8, lessons: 40, quizzes: 8, projects: 7, averageTests: 4.5, testedPracticeRatio: 0.95 },
  testing: { stage: "professional", modules: 7, lessons: 35, quizzes: 7, projects: 7, averageTests: 4.5, testedPracticeRatio: 0.95 },
  typescript: { stage: "expanded", modules: 10, lessons: 65, quizzes: 10, projects: 9, averageTests: 7, testedPracticeRatio: 0.95 },
  react: { stage: "expanded", modules: 12, lessons: 80, quizzes: 12, projects: 12, averageTests: 6.5, testedPracticeRatio: 0.95 },
  "node-api": { stage: "expanded", modules: 10, lessons: 65, quizzes: 10, projects: 10, averageTests: 8, testedPracticeRatio: 0.95 },
  "sql-postgresql": { stage: "expanded", modules: 9, lessons: 60, quizzes: 9, projects: 9, averageTests: 8, testedPracticeRatio: 0.95 },
  "web-security": { stage: "expanded", modules: 9, lessons: 60, quizzes: 9, projects: 9, averageTests: 10, testedPracticeRatio: 0.95 },
  "web-performance": { stage: "professional", modules: 7, lessons: 35, quizzes: 7, projects: 7, averageTests: 5, testedPracticeRatio: 0.95 },
  "devops-deployment": { stage: "professional", modules: 7, lessons: 35, quizzes: 7, projects: 7, averageTests: 5, testedPracticeRatio: 0.95 }
};

export const debtBaseline = {
  nearDuplicatePromptPairs: { css: 0 },
  duplicateLessons: new Set()
};

export function auditCurriculumDepth(tracks, floors = trackFloors, baseline = debtBaseline) {
  const failures = [];
  const rows = [];
  const debt = { nearDuplicatePromptPairs: {}, duplicateLessons: [] };
  const seenTrackIds = new Set();
  const seenModuleIds = new Map();
  const seenLessonIds = new Map();

  for (const track of tracks) {
    const floor = floors[track.id];
    if (!floor) failures.push(`${track.id}: unsupported track; add an explicit staged floor to trackFloors`);
    if (seenTrackIds.has(track.id)) failures.push(`${track.id}: duplicate track ID`);
    seenTrackIds.add(track.id);

    const lessons = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id })));
    const practice = lessons.filter((lesson) => lesson.type !== "quiz");
    const quizzes = lessons.filter(isQuiz);
    const projects = lessons.filter(isProject);
    const tests = practice.reduce((total, lesson) => total + (lesson.tests?.length || 0), 0);
    const testedPractice = practice.filter((lesson) => lesson.tests?.length).length;
    const averageTests = practice.length ? tests / practice.length : 0;
    const testedPracticeRatio = practice.length ? testedPractice / practice.length : 0;

    for (const module of track.modules) {
      reportDuplicate(seenModuleIds, module.id, `${track.id}/${module.id}`, "module", failures);
      if (floor?.stage !== "primer") {
        if (!module.lessons.some((lesson) => !isQuiz(lesson))) failures.push(`${track.id}/${module.id}: module has no practice lesson`);
        if (!module.lessons.some((lesson) => isQuiz(lesson) || isProject(lesson))) failures.push(`${track.id}/${module.id}: module has no quiz or assessment`);
      }
      for (const lesson of module.lessons) reportDuplicate(seenLessonIds, lesson.id, `${track.id}/${module.id}/${lesson.id}`, "lesson", failures, baseline, debt);
      reportNearDuplicatePrompts(track.id, module, debt);
    }

    const row = { id: track.id, stage: floor?.stage || "unsupported", modules: track.modules.length, lessons: lessons.length, quizzes: quizzes.length, projects: projects.length, averageTests, testedPracticeRatio };
    rows.push(row);
    if (!floor) continue;
    for (const metric of ["modules", "lessons", "quizzes", "projects"]) {
      if (row[metric] < floor[metric]) failures.push(`${track.id}: ${metric} ${row[metric]} is below the ${floor.stage} floor ${floor[metric]} (add ${floor[metric] - row[metric]})`);
    }
    if (averageTests < floor.averageTests) failures.push(`${track.id}: ${averageTests.toFixed(1)} tests/practice lesson is below the ${floor.stage} floor ${floor.averageTests}`);
    if (testedPracticeRatio < floor.testedPracticeRatio) failures.push(`${track.id}: ${(testedPracticeRatio * 100).toFixed(0)}% of practice lessons have tests; floor is ${(floor.testedPracticeRatio * 100).toFixed(0)}%`);
  }

  for (const trackId of Object.keys(floors)) {
    if (!seenTrackIds.has(trackId)) failures.push(`${trackId}: track with configured ${floors[trackId].stage} floor is missing`);
  }
  for (const [trackId, pairs] of Object.entries(debt.nearDuplicatePromptPairs)) {
    const allowed = baseline.nearDuplicatePromptPairs?.[trackId] || 0;
    if (pairs.length > allowed) {
      const examples = pairs.slice(allowed, allowed + 3).map((pair) => `${pair.left}/${pair.right} (${pair.similarity}%)`).join(", ");
      failures.push(`${trackId}: ${pairs.length} near-duplicate lesson prompt pairs exceed the staged baseline ${allowed}; new pairs: ${examples}`);
    }
  }
  return { failures, rows, debt };
}

function reportDuplicate(seen, id, location, kind, failures, baseline, debt) {
  if (!id) {
    failures.push(`${location}: missing ${kind} ID`);
    return;
  }
  if (seen.has(id)) {
    const firstLocation = seen.get(id);
    const baselineKey = `${location}|${firstLocation}`;
    if (kind === "lesson" && baseline.duplicateLessons?.has(baselineKey)) debt.duplicateLessons.push(baselineKey);
    else failures.push(`${location}: duplicate ${kind} ID "${id}" (first used at ${firstLocation})`);
  }
  else seen.set(id, location);
}

function reportNearDuplicatePrompts(trackId, module, debt) {
  const prompts = module.lessons.filter((lesson) => !isQuiz(lesson)).map((lesson) => ({
    id: lesson.id,
    tokens: tokenSet(`${localizedText(lesson.title)} ${localizedText(lesson.brief)}`)
  }));
  for (let left = 0; left < prompts.length; left += 1) {
    for (let right = left + 1; right < prompts.length; right += 1) {
      if (prompts[left].tokens.size < 6 || prompts[right].tokens.size < 6) continue;
      const similarity = jaccard(prompts[left].tokens, prompts[right].tokens);
      if (similarity >= 0.88) {
        debt.nearDuplicatePromptPairs[trackId] ||= [];
        debt.nearDuplicatePromptPairs[trackId].push({ left: prompts[left].id, right: prompts[right].id, similarity: (similarity * 100).toFixed(0) });
      }
    }
  }
}

function localizedText(value) {
  if (!value) return "";
  if (Array.isArray(value)) return value.join(" ");
  if (typeof value === "object") return `${value.fr || ""} ${value.en || ""}`;
  return String(value);
}

function tokenSet(value) {
  return new Set(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((token) => token.length > 2));
}

function jaccard(left, right) {
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / new Set([...left, ...right]).size;
}

function isQuiz(lesson) {
  return lesson.type === "quiz" || Array.isArray(lesson.questions);
}

function isProject(lesson) {
  return lesson.type === "project" || lesson.project === true;
}

export function runCurriculumDepthAudit(tracks = learningTracks) {
  const result = auditCurriculumDepth(tracks);
  console.table(result.rows.map((row) => ({
    track: row.id,
    stage: row.stage,
    modules: row.modules,
    lessons: row.lessons,
    quizzes: row.quizzes,
    projects: row.projects,
    "tests/practice": row.averageTests.toFixed(1),
    "tested practice": `${(row.testedPracticeRatio * 100).toFixed(0)}%`
  })));
  if (result.failures.length) {
    console.error(`\nCurriculum depth audit failed (${result.failures.length}):\n- ${result.failures.join("\n- ")}`);
    process.exitCode = 1;
    return result;
  }
  const stagedDebt = Object.entries(result.debt.nearDuplicatePromptPairs).filter(([trackId, pairs]) => pairs.length && trackFloors[trackId]);
  if (stagedDebt.length || result.debt.duplicateLessons.length) {
    const promptDebt = stagedDebt.map(([trackId, pairs]) => `${trackId}: ${pairs.length} near-duplicate prompt pairs`).join(", ");
    console.warn(`\nStaged curriculum debt (must not increase): ${[promptDebt, `${result.debt.duplicateLessons.length} baseline duplicate lesson ID`].filter(Boolean).join(", ")}.`);
  }
  console.log(`\nCurriculum depth audit passed for ${result.rows.length} staged tracks.`);
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCurriculumDepthAudit();
