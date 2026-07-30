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

export function normalizeQuizLesson(lesson, { expand = true } = {}) {
  const sourceQuestions = Array.isArray(lesson.questions) && lesson.questions.length
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
  const targetCount = lesson.purpose === "exam" ? 10 : 6;
  const questions = expand ? expandQuizQuestions(sourceQuestions, targetCount) : sourceQuestions;

  return {
    id: lesson.id,
    title: lesson.title,
    gradingMode: lesson.gradingMode || "client",
    questionSetVersion: lesson.questionSetVersion || null,
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

function expandQuizQuestions(sourceQuestions, targetCount) {
  const questions = [...sourceQuestions];
  let sourceIndex = 0;
  while (questions.length < targetCount && sourceQuestions.length) {
    const source = sourceQuestions[sourceIndex % sourceQuestions.length];
    const correct = (source.choices || []).find((choice) => normalize(choice.id) === normalize(source.answer));
    const wrong = (source.choices || []).find((choice) => normalize(choice.id) !== normalize(source.answer));
    if (!correct || !wrong) break;
    const variation = sourceIndex % 5;
    const shared = {
      id: `${source.id || "question"}-extension-${sourceIndex + 1}`,
      points: source.points || 1,
      skills: source.skills || [],
      glossaryTerms: source.glossaryTerms || [],
      requiresRationale: false
    };
    if (variation === 1) {
      questions.push({
        ...shared,
        type: "true-false",
        prompt: localizedPair(
          `Vrai ou faux : pour « ${localizedText(source.prompt, "fr")} », « ${localizedText(correct.label, "fr")} » répond au besoin.`,
          `True or false: for “${localizedText(source.prompt, "en")}”, “${localizedText(correct.label, "en")}” addresses the need.`
        ),
        answer: "true",
        explanation: source.explanation
      });
    } else if (variation === 2) {
      questions.push({
        ...shared,
        type: "multiple",
        prompt: localizedPair(
          "Quels réflexes permettent de confirmer la réponse dans un cas réel ?",
          "Which practices confirm the answer in a real situation?"
        ),
        choices: [
          { id: "context", label: localizedPair("Relire le contexte et la contrainte", "Review the context and constraint") },
          { id: "evidence", label: localizedPair("Vérifier avec une preuve observable", "Verify with observable evidence") },
          { id: "appearance", label: localizedPair("Se fier uniquement à l’apparence", "Rely only on appearance") }
        ],
        answer: ["context", "evidence"],
        explanation: localizedPair(
          `${localizedText(source.explanation, "fr")} Le contexte et une preuve évitent une réponse mémorisée sans compréhension.`,
          `${localizedText(source.explanation, "en")} Context and evidence prevent a memorized answer without understanding.`
        )
      });
    } else if (variation === 3) {
      questions.push({
        ...shared,
        type: "ordering",
        prompt: localizedPair(
          "Remets la méthode de résolution dans l'ordre le plus fiable.",
          "Put the resolution method in the most reliable order."
        ),
        choices: [
          { id: "context", label: localizedPair("Relire le scénario et identifier la contrainte", "Reread the scenario and identify the constraint") },
          { id: "decision", label: localizedPair(`Choisir « ${localizedText(correct.label, "fr")} »`, `Choose “${localizedText(correct.label, "en")}”`) },
          { id: "evidence", label: localizedPair("Vérifier avec une preuve observable", "Verify with observable evidence") },
          { id: "explain", label: localizedPair("Expliquer pourquoi les distracteurs échouent", "Explain why distractors fail") }
        ],
        answer: ["context", "decision", "evidence", "explain"],
        explanation: localizedPair(
          `${localizedText(source.explanation, "fr")} Une bonne réponse suit une méthode : contexte, décision, preuve, explication.`,
          `${localizedText(source.explanation, "en")} A strong answer follows a method: context, decision, evidence, explanation.`
        )
      });
    } else if (variation === 4) {
      questions.push({
        ...shared,
        type: "short-open",
        prompt: localizedPair(
          `Explique en une phrase pourquoi « ${localizedText(correct.label, "fr")} » est la meilleure décision.`,
          `Explain in one sentence why “${localizedText(correct.label, "en")}” is the best decision.`
        ),
        answer: keywordsFromAnswer(correct.label),
        keywords: keywordsFromAnswer(correct.label),
        explanation: localizedPair(
          `${localizedText(source.explanation, "fr")} La réponse attendue doit citer la décision et la relier à la contrainte du scénario.`,
          `${localizedText(source.explanation, "en")} The expected answer should name the decision and connect it to the scenario constraint.`
        )
      });
    } else questions.push({
      ...shared,
      type: "error-identification",
      prompt: localizedPair(
        `Une personne répond « ${localizedText(wrong.label, "fr")} » à la question « ${localizedText(source.prompt, "fr")} ». Quel diagnostic est juste ?`,
        `Someone answers “${localizedText(wrong.label, "en")}” to “${localizedText(source.prompt, "en")}”. What is the correct diagnosis?`
      ),
      choices: [
        { id: "reject", label: localizedPair("La réponse ne traite pas correctement le problème", "The answer does not address the problem correctly") },
        { id: "accept", label: localizedPair("La réponse est recommandée", "The answer is recommended") },
        { id: "neutral", label: localizedPair("Les réponses sont équivalentes", "The answers are equivalent") }
      ],
      answer: "reject",
      explanation: localizedPair(
        `${localizedText(source.explanation, "fr")} La réponse attendue était « ${localizedText(correct.label, "fr")} ».`,
        `${localizedText(source.explanation, "en")} The expected answer was “${localizedText(correct.label, "en")}”.`
      ),
    });
    sourceIndex += 1;
  }
  return questions;
}

function keywordsFromAnswer(label) {
  const text = `${localizedText(label, "fr")} ${localizedText(label, "en")}`;
  const words = text
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4);
  return [...new Set(words)].slice(0, 2);
}

function localizedPair(fr, en) {
  return { fr, en };
}

function localizedText(value, locale) {
  if (Array.isArray(value)) return String(value[locale === "fr" ? 0 : 1] || value[0] || "");
  if (value && typeof value === "object") return String(value[locale] || value.fr || value.en || "");
  return String(value || "");
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
