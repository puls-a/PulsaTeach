import { normalizeQuizLesson } from "../src/features/quizzes/quizEngine.js";
import { getQuestionSetVersion, isProtectedExamLesson } from "../src/features/quizzes/examPolicy.js";

export function projectPublicTrack(track) {
  return {
    ...track,
    modules: (track.modules || []).map((module) => ({
      ...module,
      lessons: (module.lessons || []).map(projectPublicLesson)
    }))
  };
}

function projectPublicLesson(lesson) {
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
    questions: quiz.questions.map(projectPublicQuestion)
  };
}

function projectPublicQuestion(question) {
  const publicQuestion = { ...question };
  for (const field of ["answer", "acceptedAnswers", "keywords", "explanation"]) delete publicQuestion[field];
  return publicQuestion;
}
