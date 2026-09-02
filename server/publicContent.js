import { createHmac, randomBytes } from "node:crypto";
import { normalizeQuizLesson } from "../src/features/quizzes/quizEngine.js";
import { getQuestionSetVersion, isProtectedExamLesson } from "../src/features/quizzes/examPolicy.js";

export function projectPublicTrack(track, examTokenSecret) {
  return {
    ...track,
    modules: (track.modules || []).map((module) => ({
      ...module,
      lessons: (module.lessons || []).map((lesson) => projectPublicLesson(lesson, examTokenSecret))
    }))
  };
}

export function encodeProtectedExamResponses(quiz, responses, examTokenSecret) {
  return Object.fromEntries(quiz.questions.map((question) => [
    question.id,
    transformResponse(question, responses[question.id], examTokenSecret, true)
  ]));
}

export function decodeProtectedExamResponses(quiz, responses, examTokenSecret) {
  return Object.fromEntries(quiz.questions.map((question) => [
    question.id,
    transformResponse(question, responses[question.id], examTokenSecret, false)
  ]));
}

function projectPublicLesson(lesson, examTokenSecret) {
  if (!isProtectedExamLesson(lesson)) return lesson;
  const quiz = normalizeQuizLesson(lesson, { expand: false });
  const titleFr = lesson.title?.fr || lesson.title?.[0] || lesson.id;
  const titleEn = lesson.title?.en || lesson.title?.[1] || titleFr;
  return {
    id: lesson.id,
    type: lesson.type,
    title: lesson.title,
    brief: {
      fr: `Passe le bilan « ${titleFr} » puis envoie tes réponses pour notation.`,
      en: `Complete “${titleEn}” and submit your answers for grading.`
    },
    skills: lesson.skills || [],
    difficulty: lesson.difficulty,
    durationMin: lesson.durationMin,
    xp: lesson.xp,
    purpose: lesson.purpose,
    gradingMode: "server",
    questionSetVersion: getQuestionSetVersion(lesson),
    passingScore: quiz.passingScore,
    tests: [],
    questions: quiz.questions.map((question) => projectPublicQuestion(question, examTokenSecret))
  };
}

function projectPublicQuestion(question, examTokenSecret) {
  const publicQuestion = { ...question };
  for (const field of ["answer", "acceptedAnswers", "keywords", "explanation"]) delete publicQuestion[field];
  const sourceChoices = question.choices?.length ? question.choices : question.type === "true-false" ? defaultBooleanChoices : [];
  publicQuestion.choices = permuteChoices(question, sourceChoices, examTokenSecret);
  if (question.pairs) {
    publicQuestion.pairs = question.pairs.map((pair) => ({
      ...pair,
      choices: permuteChoices(question, pair.choices || sourceChoices, examTokenSecret)
    }));
  }
  return publicQuestion;
}

function permuteChoices(question, choices, examTokenSecret) {
  const orderNonce = randomBytes(9).toString("base64url");
  const projected = choices.map((choice) => ({
    ...choice,
    id: choiceToken(examTokenSecret, question.id, choice.id)
  })).sort((left, right) => choiceRank(examTokenSecret, question.id, left.id, orderNonce).localeCompare(choiceRank(examTokenSecret, question.id, right.id, orderNonce)));
  return projected;
}

function transformResponse(question, response, examTokenSecret, encode) {
  if (response === undefined || response === null) return response;
  const transform = encode
    ? (value) => choiceToken(examTokenSecret, question.id, value)
    : (value) => decodeChoiceToken(question, value, examTokenSecret);
  if (Array.isArray(response)) return response.map(transform);
  if (question.type === "matching" && response && typeof response === "object") {
    return Object.fromEntries(Object.entries(response).map(([key, value]) => [key, transform(value)]));
  }
  if (["single", "true-false", "code-reading", "error-identification"].includes(question.type)) return transform(response);
  return response;
}

function decodeChoiceToken(question, token, examTokenSecret) {
  const choices = [
    ...(question.choices?.length ? question.choices : question.type === "true-false" ? defaultBooleanChoices : []),
    ...(question.pairs || []).flatMap((pair) => pair.choices || [])
  ];
  const choice = choices.find((item) => choiceToken(examTokenSecret, question.id, item.id) === token);
  if (!choice) throw invalidChoiceTokenError();
  return choice.id;
}

function choiceToken(secret, questionId, choiceId) {
  return createHmac("sha256", secret)
    .update(`choice\u001f${questionId}\u001f${String(choiceId)}`)
    .digest("base64url")
    .slice(0, 24);
}

function choiceRank(secret, questionId, choiceId, nonce) {
  return createHmac("sha256", secret).update(`order\u001f${nonce}\u001f${questionId}\u001f${choiceId}`).digest("hex");
}

function invalidChoiceTokenError() {
  return Object.assign(new Error("Invalid protected exam choice token."), { code: "INVALID_QUIZ_RESPONSE" });
}

const defaultBooleanChoices = [
  { id: "true", label: { fr: "Vrai", en: "True" } },
  { id: "false", label: { fr: "Faux", en: "False" } }
];
