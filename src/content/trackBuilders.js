import { getPedagogy } from "./pedagogy.js";

function module(id, fr, en, lessons) {
  const totalMinutes = lessons.reduce((sum, item) => sum + item.durationMin, 0);
  return { id, title: { fr, en }, lessons, totalMinutes, ...moduleMeta(id), ...moduleLearningMeta(id) };
}

import { moduleLearningMeta, moduleMeta } from "./moduleMetadata.js";
import { courseFor, difficultyFor, durationFor, guideFor, projectDurationFor, projectRubricFor, skillsFor, theoryFor } from "./lessonMetadata.js";
import { cssSolution, isCssConceptCheck } from "./cssBuilders.js";
import { jsCheckLabel, jsRuntimeTests, jsSolution } from "./jsBuilders.js";

function lesson({ id, title, brief, course, starterCode, solution, tests, hint, xp }) {
  const resources = lessonResources(id, "html", title, brief, course);
  return {
    id,
    type: "html",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course: resources.course,
    pedagogy: resources.pedagogy,
    theory: theoryFor(id),
    guide: resources.guide,
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution,
    tests,
    hint: { fr: hint[0], en: hint[1] },
    xp
  };
}

function quizLesson({ id, title, brief, question, options, answer, explanation, xp }) {
  const resources = lessonResources(id, "quiz", title, brief);
  const primaryQuestion = {
    id: `${id}-question-1`,
    type: "single",
    prompt: question,
    choices: options,
    answer,
    explanation,
    requiresRationale: false,
    points: 1
  };
  return {
    id,
    type: "quiz",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course: resources.course,
    pedagogy: resources.pedagogy,
    theory: theoryFor(id),
    guide: resources.guide,
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    question,
    options,
    answer,
    explanation,
    questions: [primaryQuestion],
    passingScore: 70,
    randomizeQuestions: false,
    feedbackMode: "immediate",
    starterCode: "",
    solution: "",
    tests: [test("quiz", "correct answer", answer)],
    hint: {
      fr: "Cherche la réponse qui reste utile pour tous les utilisateurs, pas seulement visuelle.",
      en: "Look for the answer that remains useful for every user, not only visually."
    },
    xp
  };
}

function projectLesson({ id, title, brief, starterCode, solution, tests, xp }) {
  const resources = lessonResources(id, "project", title, brief);
  return {
    id,
    type: "project",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course: resources.course,
    pedagogy: resources.pedagogy,
    theory: theoryFor(id),
    guide: resources.guide,
    skills: skillsFor(id),
    difficulty: "project",
    durationMin: projectDurationFor(id),
    starterCode,
    solution,
    tests,
    rubric: projectRubricFor(id),
    hint: {
      fr: "Commence par les grandes zones, puis remplis les détails.",
      en: "Start with the large regions, then fill in the details."
    },
    xp
  };
}


function cssLesson(id, title, brief, starterCode, target, checks, xp) {
  const solution = cssSolution(id, target, checks);
  const resources = lessonResources(id, "css", title, [brief, ""]);

  return {
    id,
    type: "css",
    title: { fr: title[0], en: title[1] },
    brief: resources.brief,
    theory: theoryFor(id),
    course: resources.course,
    pedagogy: resources.pedagogy,
    guide: resources.guide,
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution,
    previewHtml: `<main class="demo-surface">
  <section class="panel">
    <article class="card course-card">HTML Quest</article>
    <article class="card course-card">CSS Lab</article>
    <article class="card course-card">JS Arena</article>
  </section>
  <div class="toolbar">
    <button>Run</button><button>Hint</button><button>Ship</button>
  </div>
  <div class="gallery"><span></span><span></span><span></span><span></span></div>
</main>`,
    tests: [
      test("contains", "target selector", target),
      ...checks.map((check) => isCssConceptCheck(id, check)
        ? test("contains", check, check)
        : test("cssDeclaration", check, { selector: target, property: check })),
      ...(id === "css-04-grid" ? [test("computedStyle", "rendered grid", { selector: ".gallery", property: "display", equals: "grid" })] : [])
    ],
    hint: { fr: "Regarde le sélecteur demandé puis ajoute chaque propriété attendue.", en: "Look at the required selector, then add each expected property." },
    xp
  };
}


function jsLesson(id, title, brief, starterCode, checks, xp) {
  const resources = lessonResources(id, "javascript", title, [brief, ""]);
  return {
    id,
    type: "js",
    title: { fr: title[0], en: title[1] },
    brief: resources.brief,
    theory: theoryFor(id),
    course: resources.course,
    pedagogy: resources.pedagogy,
    guide: resources.guide,
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution: jsSolution(id, starterCode),
    tests: [...checks.map((check) => test("contains", jsCheckLabel(check), check)), ...jsRuntimeTests(id)],
    hint: { fr: "Les tests vérifient les mots-clés importants de la solution.", en: "The tests check the important keywords in the solution." },
    xp
  };
}

function domLesson(id, title, brief, starterCode, checks, xp) {
  return {
    ...jsLesson(id, title, brief, starterCode, checks, xp),
    type: "dom"
  };
}

function test(type, label, value, amount = 1) {
  return { type, label, value, amount };
}

function lessonResources(id, type, title, brief, courseOverride) {
  const titleObject = { fr: title[0], en: title[1] };
  const course = courseOverride || courseFor(id, type);
  const guide = guideFor(id, type);
  const briefObject = {
    fr: brief[0],
    en: brief[1] || guide?.en?.objectives?.[0] || course?.en?.introduction || title[1]
  };
  return {
    course,
    guide,
    brief: briefObject,
    pedagogy: getPedagogy(id, { course, guide, title: titleObject, brief: briefObject, type })
  };
}

export { module, lesson, quizLesson, projectLesson, cssLesson, jsLesson, domLesson, test };
