export const supportedQuestionTypes = [
  "single",
  "multiple",
  "true-false",
  "matching",
  "ordering",
  "fill-blank",
  "code-reading",
  "error-identification",
  "code-correction",
  "short-open"
];

export function normalizeQuizLesson(lesson) {
  const questions = Array.isArray(lesson.questions) && lesson.questions.length
    ? lesson.questions
    : [{
        id: `${lesson.id}-question-1`,
        type: "single",
        prompt: lesson.question,
        choices: lesson.options || [],
        answer: lesson.answer,
        explanation: lesson.explanation,
        points: 1,
        skills: lesson.skills || [],
        requiresRationale: true
      }];

  return {
    id: lesson.id,
    title: lesson.title,
    passingScore: Number(lesson.passingScore ?? 70),
    randomizeQuestions: Boolean(lesson.randomizeQuestions),
    feedbackMode: lesson.feedbackMode || "immediate",
    questions: questions.map((question, index) => ({
      points: 1,
      choices: [],
      skills: [],
      glossaryTerms: [],
      ...question,
      id: question.id || `${lesson.id}-question-${index + 1}`,
      type: supportedQuestionTypes.includes(question.type) ? question.type : "single"
    }))
  };
}

export function evaluateQuestion(question, response) {
  const type = question.type || "single";
  let correct = false;

  if (["single", "true-false", "code-reading", "error-identification"].includes(type)) {
    correct = normalize(response) === normalize(question.answer);
  } else if (type === "multiple") {
    correct = sameSet(array(response), array(question.answer));
  } else if (type === "ordering") {
    correct = sameOrder(array(response), array(question.answer));
  } else if (type === "matching") {
    correct = sameRecord(response, question.answer);
  } else if (["fill-blank", "code-correction"].includes(type)) {
    const accepted = array(question.acceptedAnswers?.length ? question.acceptedAnswers : question.answer);
    correct = accepted.some((answer) => normalizeCode(response) === normalizeCode(answer));
  } else if (type === "short-open") {
    const value = normalize(response);
    const keywords = array(question.keywords || question.answer).map(normalize).filter(Boolean);
    correct = keywords.length > 0 && keywords.every((keyword) => value.includes(keyword));
  }

  return {
    questionId: question.id,
    correct,
    earnedPoints: correct ? Number(question.points || 1) : 0,
    availablePoints: Number(question.points || 1),
    skills: question.skills || [],
    glossaryTerms: question.glossaryTerms || []
  };
}

export function scoreQuiz(quiz, responses = {}) {
  const results = quiz.questions.map((question) => evaluateQuestion(question, responses[question.id]));
  const earned = results.reduce((sum, result) => sum + result.earnedPoints, 0);
  const available = results.reduce((sum, result) => sum + result.availablePoints, 0);
  const percent = available ? Math.round((earned / available) * 100) : 0;
  return {
    earned,
    available,
    percent,
    passed: percent >= Number(quiz.passingScore ?? 70),
    results,
    skills: aggregateSkills(results)
  };
}

export function shuffleQuestions(questions, random = Math.random) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function createQuizDraft(quiz, saved = {}) {
  const validQuestionIds = new Set(quiz.questions.map((question) => question.id));
  const responses = Object.fromEntries(
    Object.entries(saved.responses || {}).filter(([questionId]) => validQuestionIds.has(questionId))
  );
  return {
    quizId: quiz.id,
    currentIndex: Math.min(Math.max(Number(saved.currentIndex) || 0, 0), Math.max(quiz.questions.length - 1, 0)),
    responses,
    rationales: Object.fromEntries(
      Object.entries(saved.rationales || {}).filter(([questionId]) => validQuestionIds.has(questionId))
    ),
    updatedAt: saved.updatedAt || new Date().toISOString()
  };
}

export function buildReviewQueue(quiz, score) {
  const failedIds = new Set(score.results.filter((result) => !result.correct).map((result) => result.questionId));
  return quiz.questions.filter((question) => failedIds.has(question.id)).map((question) => ({
    questionId: question.id,
    skills: question.skills || [],
    glossaryTerms: question.glossaryTerms || []
  }));
}

function aggregateSkills(results) {
  const totals = new Map();
  for (const result of results) {
    for (const skill of result.skills) {
      const current = totals.get(skill) || { earned: 0, available: 0 };
      current.earned += result.earnedPoints;
      current.available += result.availablePoints;
      totals.set(skill, current);
    }
  }
  return Object.fromEntries([...totals].map(([skill, value]) => [
    skill,
    {
      ...value,
      percent: value.available ? Math.round((value.earned / value.available) * 100) : 0
    }
  ]));
}

function array(value) {
  return Array.isArray(value) ? value : value === undefined || value === null ? [] : [value];
}

function sameSet(left, right) {
  const a = [...new Set(left.map(normalize))].sort();
  const b = [...new Set(right.map(normalize))].sort();
  return sameOrder(a, b);
}

function sameOrder(left, right) {
  return left.length === right.length && left.every((value, index) => normalize(value) === normalize(right[index]));
}

function sameRecord(left, right) {
  if (!left || !right || typeof left !== "object" || typeof right !== "object") return false;
  const keys = Object.keys(right);
  return keys.length === Object.keys(left).length && keys.every((key) => normalize(left[key]) === normalize(right[key]));
}

function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

function normalizeCode(value) {
  return normalize(value).replace(/\s+/g, " ").replace(/\s*([{}();,:=<>+\-*/])\s*/g, "$1");
}

