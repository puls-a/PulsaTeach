const DAY_MS = 24 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

export const reviewRatings = ["again", "hard", "good", "easy"];
export const reviewSessionSizes = [5, 10, 20];

export function scheduleQuizReview(currentItems = {}, quiz, score, context = {}, now = new Date()) {
  const next = { ...currentItems };
  const questionById = new Map(quiz.questions.map((question) => [question.id, question]));

  for (const result of score.results || []) {
    const question = questionById.get(result.questionId);
    if (!question) continue;
    const id = reviewItemId(quiz.id, question.id);
    const existing = next[id];

    if (result.correct) {
      if (existing) next[id] = applyReviewRating(existing, "good", now);
      continue;
    }

    next[id] = {
      id,
      kind: "quiz-question",
      quizId: quiz.id,
      questionId: question.id,
      trackId: context.trackId || "",
      moduleId: context.moduleId || "",
      lessonId: context.lessonId || quiz.id,
      prompt: question.prompt,
      choices: question.choices || [],
      pairs: question.pairs || [],
      answer: question.answer,
      acceptedAnswers: question.acceptedAnswers || [],
      keywords: question.keywords || [],
      explanation: question.explanation,
      questionType: question.type || "single",
      skills: question.skills || [],
      glossaryTerms: question.glossaryTerms || [],
      intervalDays: 0,
      ease: clamp(Number(existing?.ease) || 2.5, 1.3, 3),
      repetitions: 0,
      lapses: Number(existing?.lapses || 0) + 1,
      confidence: 0,
      dueAt: now.toISOString(),
      lastReviewedAt: existing?.lastReviewedAt || null,
      updatedAt: now.toISOString()
    };
  }

  return next;
}

export function applyReviewRating(item, rating, now = new Date()) {
  if (!reviewRatings.includes(rating)) throw new Error(`Unsupported review rating: ${rating}`);

  const previousInterval = Math.max(0, Number(item.intervalDays) || 0);
  const previousRepetitions = Math.max(0, Number(item.repetitions) || 0);
  const previousEase = clamp(Number(item.ease) || 2.5, 1.3, 3);
  let intervalDays;
  let repetitions;
  let ease = previousEase;
  let lapses = Number(item.lapses) || 0;
  let confidence;
  let dueAt;

  if (rating === "again") {
    intervalDays = 0;
    repetitions = 0;
    ease = clamp(previousEase - 0.2, 1.3, 3);
    lapses += 1;
    confidence = 0;
    dueAt = new Date(now.getTime() + 10 * MINUTE_MS);
  } else if (rating === "hard") {
    intervalDays = Math.max(1, Math.round(previousInterval ? previousInterval * 1.2 : 1));
    repetitions = previousRepetitions + 1;
    ease = clamp(previousEase - 0.15, 1.3, 3);
    confidence = 0.4;
    dueAt = addDays(now, intervalDays);
  } else if (rating === "good") {
    intervalDays = previousRepetitions === 0 ? 1 : previousRepetitions === 1 ? 3 : Math.max(4, Math.round(previousInterval * ease));
    repetitions = previousRepetitions + 1;
    confidence = 0.75;
    dueAt = addDays(now, intervalDays);
  } else {
    intervalDays = previousRepetitions === 0 ? 3 : previousRepetitions === 1 ? 7 : Math.max(8, Math.round(previousInterval * (ease + 0.5)));
    repetitions = previousRepetitions + 1;
    ease = clamp(previousEase + 0.1, 1.3, 3);
    confidence = 1;
    dueAt = addDays(now, intervalDays);
  }

  return {
    ...item,
    intervalDays,
    repetitions,
    ease,
    lapses,
    confidence,
    dueAt: dueAt.toISOString(),
    lastReviewedAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export function buildReviewSession(items = {}, requestedSize = 10, now = new Date()) {
  const size = reviewSessionSizes.includes(Number(requestedSize)) ? Number(requestedSize) : 10;
  return Object.values(items)
    .filter((item) => item?.dueAt && new Date(item.dueAt).getTime() <= now.getTime())
    .sort((left, right) => reviewPriority(right, now) - reviewPriority(left, now) || String(left.id).localeCompare(String(right.id)))
    .slice(0, size);
}

export function getReviewStats(items = {}, now = new Date()) {
  const values = Object.values(items);
  const due = values.filter((item) => item?.dueAt && new Date(item.dueAt).getTime() <= now.getTime());
  const mastered = values.filter((item) => reviewMastery(item, now).status === "mastered");
  return {
    total: values.length,
    due: due.length,
    mastered: mastered.length,
    nextDueAt: values
      .map((item) => item?.dueAt)
      .filter(Boolean)
      .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())[0] || null
  };
}

export function reviewMastery(item, now = new Date()) {
  const confidence = clamp(Number(item?.confidence) || 0, 0, 1);
  const lastReviewedAt = item?.lastReviewedAt ? new Date(item.lastReviewedAt).getTime() : 0;
  const ageDays = lastReviewedAt ? Math.max(0, (now.getTime() - lastReviewedAt) / DAY_MS) : Infinity;
  const recency = Number.isFinite(ageDays) ? Math.max(0.35, Math.exp(-ageDays / 45)) : 0.35;
  const score = Math.round(confidence * recency * 100);
  const overdue = Boolean(item?.dueAt && new Date(item.dueAt).getTime() <= now.getTime());
  const status = score >= 75 && Number(item?.repetitions || 0) >= 3 && !overdue
    ? "mastered"
    : score > 0 || Number(item?.lapses || 0) > 0
      ? "practicing"
      : "discovered";
  return { score, status, overdue, recency };
}

export function reviewItemId(quizId, questionId) {
  return `${quizId}:${questionId}`;
}

function reviewPriority(item, now) {
  const overdueHours = Math.max(0, (now.getTime() - new Date(item.dueAt).getTime()) / (60 * MINUTE_MS));
  return overdueHours + Number(item.lapses || 0) * 24 + (1 - clamp(Number(item.confidence) || 0, 0, 1)) * 48;
}

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}
