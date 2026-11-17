import { learningTracks } from "../src/content/allTrackRegistry.js";
import { normalizeQuizLesson } from "../src/features/quizzes/quizEngine.js";
import { JSDOM } from "jsdom";
import { HTML_TEST_TYPES, validateLesson } from "../src/lessonRuntime.js";
import { resolveLocaleValue } from "../src/localeValue.js";

globalThis.DOMParser = new JSDOM("").window.DOMParser;

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

const richTracks = ["html", "css", "javascript", "git", "accessibility", "testing", "typescript", "react", "node-api", "sql-postgresql", "web-security", "web-performance", "devops-deployment"];
const failures = [];
const forbiddenBoilerplate = [
  "répond à un problème concret du parcours",
  "partir du besoin utilisateur.",
  "applique la correction minimale.",
  "conserver une preuve reproductible."
];

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
      const serializedLesson = JSON.stringify({ course: lesson.course?.fr, pedagogy: lesson.pedagogy?.fr }).toLowerCase();
      for (const phrase of forbiddenBoilerplate) {
        if (serializedLesson.includes(phrase)) failures.push(`${lesson.id}: generic boilerplate remains: "${phrase}"`);
      }
      if ((lesson.course?.fr?.sections?.length || 0) < 3) failures.push(`${lesson.id}: course needs at least 3 specific sections`);
      if (lesson.type === "project" && (lesson.rubric?.fr?.length || 0) < 4) failures.push(`${lesson.id}: project rubric needs at least 4 criteria`);
      if (lesson.type === "project" && lesson.durationMin < 90) failures.push(`${lesson.id}: project duration is not realistic`);
      if (lesson.type !== "project" && lesson.durationMin < 15) failures.push(`${lesson.id}: lesson duration is not realistic`);
      if (lesson.type === "quiz") {
        const normalizedQuiz = normalizeQuizLesson(lesson);
        const minimum = lesson.purpose === "exam" ? 7 : 4;
        if (normalizedQuiz.questions.length < minimum) failures.push(`${lesson.id}: quiz needs at least ${minimum} questions`);
        if (new Set(normalizedQuiz.questions.map((question) => question.type)).size < 2) failures.push(`${lesson.id}: quiz needs varied question types`);
        if (normalizedQuiz.questions.some((question) => !question.explanation?.fr || !question.explanation?.en)) failures.push(`${lesson.id}: every question needs bilingual feedback`);
      }
    }
  }
}

const cssTrack = learningTracks.find((item) => item.id === "css");
for (const lesson of cssTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  for (const locale of ["fr", "en"]) {
    const results = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
    for (const result of results) {
      if (!result.pass) failures.push(`${lesson.id} (${locale}): solution fails "${result.label}"`);
    }
  }
}

const jsTrack = learningTracks.find((item) => item.id === "javascript");
for (const lesson of jsTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  for (const test of lesson.tests) {
    if (!await passesJavaScriptTest(lesson.solution, test)) failures.push(`${lesson.id}: solution fails "${test.label}"`);
  }
}

const htmlTrack = learningTracks.find((item) => item.id === "html");
for (const lesson of htmlTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  const unsupported = lesson.tests.filter((test) => !HTML_TEST_TYPES.has(test.type));
  for (const test of unsupported) failures.push(`${lesson.id}: unsupported HTML test type "${test.type}"`);
  if (unsupported.length) continue;

  for (const locale of ["fr", "en"]) {
    const results = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
    for (const result of results) {
      if (!result.pass) failures.push(`${lesson.id} (${locale}): solution fails "${result.label}"`);
    }
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

async function passesJavaScriptTest(code, test) {
  if (test.type === "contains") return normalize(stripCodeComments(code)).includes(normalize(test.value));
  if (test.type === "consoleIncludes") return runConsoleIncludes(code, test.value);
  if (test.type !== "jsExpression") return true;

  try {
    const silentConsole = { log() {}, info() {}, warn() {}, error() {}, table() {}, group() {}, groupEnd() {} };
    const values = new Map();
    const localStorage = {
      getItem(key) { return values.has(key) ? values.get(key) : null; },
      setItem(key, value) { values.set(key, String(value)); },
      removeItem(key) { values.delete(key); },
      clear() { values.clear(); }
    };
    const mockCatalog = [{ id: "html", title: "HTML" }, { id: "css", title: "CSS" }, { id: "javascript", title: "JavaScript" }];
    const fetch = async (url) => {
      const normalizedUrl = String(url || "");
      if (!["/api/catalog", "/api/courses", "/api/data", "/api/schedule", "/api/profile", "/api/progress", "/api/recommendations", "mock:catalog"].includes(normalizedUrl)) {
        throw new Error("Network access is disabled inside PulsaTeach exercises.");
      }
      return { ok: true, status: 200, async json() { return { url: normalizedUrl, items: mockCatalog, courses: mockCatalog, tracks: mockCatalog }; } };
    };
    const execute = new Function("console", "localStorage", "fetch", `return (async () => {\n${code}\n${test.value}\n})();`);
    return Boolean(await execute(silentConsole, localStorage, fetch));
  } catch {
    return false;
  }
}

function runConsoleIncludes(code, expectedMessages) {
  const logs = [];
  const expected = (Array.isArray(expectedMessages) ? expectedMessages : Object.values(expectedMessages || {}).flat()).filter((item, index, values) => values.indexOf(item) === index);
  const push = (level, values) => logs.push(`${level}${values.map((value) => typeof value === "string" ? value : JSON.stringify(value)).join(" ")}`);
  const silentConsole = { log: (...values) => push("", values), info: (...values) => push("[info] ", values), warn: (...values) => push("[attention] ", values), error: (...values) => push("[error] ", values), table: (...values) => push("[table] ", values), group() {}, groupEnd() {} };
  try {
    new Function("console", code)(silentConsole);
    return expected.every((message) => logs.some((line) => line.includes(message)));
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
