import { readFile } from "node:fs/promises";
import path from "node:path";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { isProtectedExamLesson } from "../src/features/quizzes/examPolicy.js";
import { normalizeQuizLesson } from "../src/features/quizzes/quizEngine.js";
import { projectPublicTrack } from "../server/publicContent.js";

const root = process.cwd();
const failures = [];
let protectedCount = 0;

for (const sourceTrack of learningTracks) {
  const publicTrack = projectPublicTrack(sourceTrack);
  const publicLessons = new Map(publicTrack.modules.flatMap((module) => module.lessons).map((lesson) => [lesson.id, lesson]));
  for (const sourceLesson of sourceTrack.modules.flatMap((module) => module.lessons)) {
    if (!isProtectedExamLesson(sourceLesson)) continue;
    const lesson = publicLessons.get(sourceLesson.id);
    protectedCount += 1;
    if (!lesson.questionSetVersion) failures.push(`${lesson.id}: missing questionSetVersion`);
    const canonicalQuiz = normalizeQuizLesson(sourceLesson, { expand: false });
    if (JSON.stringify(lesson.questions.map((question) => question.id)) !== JSON.stringify(canonicalQuiz.questions.map((question) => question.id))) {
      failures.push(`${lesson.id}: public projection changed the canonical question set`);
    }
    const publicJson = JSON.stringify({ ...lesson, questions: lesson.questions.map(({ choices: _choices, ...question }) => question) });
    for (const question of canonicalQuiz.questions) {
      const explanations = Array.isArray(question.explanation)
        ? question.explanation
        : question.explanation && typeof question.explanation === "object" ? Object.values(question.explanation) : [question.explanation];
      for (const explanation of explanations) {
        if (explanation && publicJson.includes(JSON.stringify(explanation).slice(1, -1))) failures.push(`${lesson.id}/${question.id}: public content contains canonical feedback`);
      }
    }
    for (const question of lesson.questions || []) {
      for (const field of ["answer", "acceptedAnswers", "keywords", "explanation"]) {
        if (field in question) failures.push(`${lesson.id}/${question.id}: public question exposes ${field}`);
      }
    }
    for (const field of ["answer", "solution", "hint", "explanation"]) {
      if (field in lesson) failures.push(`${lesson.id}: public lesson exposes ${field}`);
    }
    if (lesson.tests?.length) failures.push(`${lesson.id}: public lesson exposes grading tests`);
  }
}

if (protectedCount !== 14) failures.push(`Expected 14 protected exams, found ${protectedCount}.`);
const loader = await readFile(path.join(root, "src", "content", "localTrackLoader.js"), "utf8");
if (!loader.includes("loadRemoteTrack")) failures.push("Protected tracks are not loaded from the public API.");
for (const sourceImport of ["./htmlTrack.js", "./javascriptTrack.js", "./tracks/"]) {
  if (loader.includes(sourceImport)) failures.push(`Local track loader still imports canonical content: ${sourceImport}`);
}

try {
  const manifest = JSON.parse(await readFile(path.join(root, "dist", ".vite", "manifest.json"), "utf8"));
  for (const key of Object.keys(manifest)) {
    if (/src\/content\/(?:htmlTrack|javascriptTrack|tracks\/)/.test(key)) failures.push(`Browser manifest contains canonical content: ${key}`);
  }
} catch {
  // Semantic public-content checks still run before the first build.
}

if (failures.length) {
  console.error(`Exam privacy audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Exam privacy audit passed: ${protectedCount} exams use key-free API content outside the browser bundle.`);
