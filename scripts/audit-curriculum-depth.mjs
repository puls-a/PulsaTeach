import { learningTracks } from "../src/content/allTrackRegistry.js";

const minimums = {
  targetLessons: 35,
  targetProjects: 4,
  targetQuizzes: 4,
  targetAverageTests: 5
};

const rows = learningTracks.map((track) => {
  const lessons = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id })));
  const tests = lessons.reduce((total, lesson) => total + (lesson.tests?.length || 0), 0);
  const quizzes = lessons.filter((lesson) => lesson.type === "quiz" || lesson.quiz || lesson.questions).length;
  const projects = lessons.filter((lesson) => lesson.type === "project" || /project|projet/i.test(lesson.id || "")).length;
  const averageTests = lessons.length ? tests / lessons.length : 0;

  return {
    id: track.id,
    modules: track.modules.length,
    lessons: lessons.length,
    quizzes,
    projects,
    tests,
    averageTests: Number(averageTests.toFixed(1)),
    depthReady:
      lessons.length >= minimums.targetLessons &&
      projects >= minimums.targetProjects &&
      quizzes >= minimums.targetQuizzes &&
      averageTests >= minimums.targetAverageTests
  };
});

const gaps = rows.filter((row) => !row.depthReady);

console.table(rows.map(({ id, modules, lessons, quizzes, projects, tests, averageTests, depthReady }) => ({
  track: id,
  modules,
  lessons,
  quizzes,
  projects,
  tests,
  "tests/lesson": averageTests,
  "fcc-style-depth": depthReady ? "ok" : "to strengthen"
})));

if (gaps.length) {
  console.log("\nCurriculum depth opportunities inspired by the freeCodeCamp benchmark:");
  for (const gap of gaps) {
    const missing = [];
    if (gap.lessons < minimums.targetLessons) missing.push(`${minimums.targetLessons - gap.lessons}+ micro-lessons`);
    if (gap.projects < minimums.targetProjects) missing.push(`${minimums.targetProjects - gap.projects}+ projects`);
    if (gap.quizzes < minimums.targetQuizzes) missing.push(`${minimums.targetQuizzes - gap.quizzes}+ module quizzes`);
    if (gap.averageTests < minimums.targetAverageTests) missing.push(`raise tests/lesson from ${gap.averageTests} to ${minimums.targetAverageTests}`);
    console.log(`- ${gap.id}: ${missing.join(", ")}`);
  }
}

console.log("\nAudit is informational for now. It should become blocking once the course rewrite starts.");
