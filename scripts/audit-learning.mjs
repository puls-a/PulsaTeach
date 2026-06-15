import { learningTracks } from "../src/learningContent.js";

const requiredPedagogy = [
  "why",
  "objectives",
  "prerequisites",
  "vocabulary",
  "comparison",
  "guided",
  "autonomous",
  "hints",
  "correction",
  "summary",
  "next"
];

const richTracks = ["html", "css", "javascript"];
const failures = [];

for (const trackId of richTracks) {
  const track = learningTracks.find((item) => item.id === trackId);
  if (!track) {
    failures.push(`Missing track: ${trackId}`);
    continue;
  }

  if (!track.profession?.fr) failures.push(`${trackId}: missing profession presentation`);
  if (!track.certification?.fr?.length) failures.push(`${trackId}: missing certification criteria`);
  const lessons = track.modules.flatMap((module) => module.lessons);
  const uniqueIntroductions = new Set(lessons.map((lesson) => lesson.course?.fr?.introduction));
  const uniqueMistakes = new Set(lessons.map((lesson) => lesson.guide?.fr?.mistakes?.[0]));
  if (uniqueIntroductions.size !== lessons.length) failures.push(`${trackId}: course introductions are repeated`);
  if (uniqueMistakes.size !== lessons.length) failures.push(`${trackId}: lesson mistakes are repeated`);

  for (const module of track.modules) {
    for (const field of ["importance", "prerequisites", "outcomes", "vocabulary", "mastery"]) {
      if (!module[field]) failures.push(`${trackId}/${module.id}: missing module ${field}`);
    }

    for (const lesson of module.lessons) {
      for (const field of requiredPedagogy) {
        if (!lesson.pedagogy?.fr?.[field]) failures.push(`${lesson.id}: missing pedagogy ${field}`);
      }
      if ((lesson.pedagogy?.fr?.objectives?.length || 0) < 3) failures.push(`${lesson.id}: needs at least 3 precise objectives`);
      if ((lesson.pedagogy?.fr?.vocabulary?.length || 0) < 3) failures.push(`${lesson.id}: needs at least 3 vocabulary terms`);
      if ((lesson.pedagogy?.fr?.guided?.length || 0) < 3) failures.push(`${lesson.id}: guided practice is too short`);
      if ((lesson.pedagogy?.fr?.hints?.length || 0) < 3) failures.push(`${lesson.id}: needs at least 3 progressive hints`);
      if ((lesson.pedagogy?.fr?.correction?.length || 0) < 3) failures.push(`${lesson.id}: explained correction is too short`);
      if (!lesson.course?.fr?.introduction) failures.push(`${lesson.id}: missing course introduction`);
      if ((lesson.course?.fr?.sections?.length || 0) < 3) failures.push(`${lesson.id}: course needs at least 3 specific sections`);
      if (lesson.type === "project" && (lesson.rubric?.fr?.length || 0) < 4) failures.push(`${lesson.id}: project rubric needs at least 4 criteria`);
      if (lesson.type === "project" && lesson.durationMin < 90) failures.push(`${lesson.id}: project duration is not realistic`);
      if (lesson.type !== "project" && lesson.durationMin < 15) failures.push(`${lesson.id}: lesson duration is not realistic`);
    }
  }
}

const cssTrack = learningTracks.find((item) => item.id === "css");
for (const lesson of cssTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  for (const test of lesson.tests) {
    if (!passesStaticCssTest(lesson.solution, test)) failures.push(`${lesson.id}: solution fails "${test.label}"`);
  }
}

const jsTrack = learningTracks.find((item) => item.id === "javascript");
for (const lesson of jsTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  for (const test of lesson.tests) {
    if (!passesJavaScriptTest(lesson.solution, test)) failures.push(`${lesson.id}: solution fails "${test.label}"`);
  }
}

if (failures.length) {
  console.error(`Learning audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const totals = richTracks.map((trackId) => {
  const track = learningTracks.find((item) => item.id === trackId);
  return `${trackId.toUpperCase()} ${track.modules.flatMap((module) => module.lessons).length} lessons`;
});

console.log(`Learning audit passed: ${totals.join(", ")}.`);

function passesStaticCssTest(code, test) {
  const activeCode = stripCodeComments(code);
  if (test.type === "contains") return normalize(activeCode).includes(normalize(test.value));
  if (test.type !== "cssDeclaration") return true;

  const { selector, property } = test.value;
  if (selector === "@media") return normalize(activeCode).includes(normalize(property));

  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escaped}\\s*\\{[^}]*${property}\\s*:`, "i").test(activeCode);
}

function passesJavaScriptTest(code, test) {
  if (test.type === "contains") return normalize(stripCodeComments(code)).includes(normalize(test.value));
  if (test.type !== "jsExpression") return true;

  try {
    const silentConsole = { log() {}, warn() {}, error() {} };
    const values = new Map();
    const localStorage = {
      getItem(key) { return values.has(key) ? values.get(key) : null; },
      setItem(key, value) { values.set(key, String(value)); },
      removeItem(key) { values.delete(key); }
    };
    return Boolean(new Function("console", "localStorage", `${code}\n${test.value}`)(silentConsole, localStorage));
  } catch {
    return false;
  }
}

function normalize(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function stripCodeComments(value) {
  return String(value)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}
