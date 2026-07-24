import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Play,
  XCircle
} from "lucide-react";
import { getQuizSession, loadRemoteProgress, recordAttempt, recordLearningEvent, saveQuizSession, saveRemoteProgress } from "./apiClient.js";
import { getDeferredTrackGroupModuleId, hasDeferredTrackGroup } from "./content/localTrackLoader.js";
import { createQuizDraft, evaluateQuestion, normalizeQuizLesson, scoreQuiz } from "./features/quizzes/quizEngine.js";
import QuizModal from "./features/quizzes/QuizModal.jsx";
import { scheduleQuizReview } from "./features/review/spacedRepetition.js";
import { getNextLesson, getPreviousLesson, hasResponse, localize, markLessonCompleted, markLessonOpened, mergeProgress, readBookmarks, readLessonRoute, readProgress, readStoredJson } from "./features/learn/learningState.js";
import { CompletionBanner, difficultyLabel, NotesPanel, SkillChips } from "./features/learn/LearningShared.jsx";
import { CourseChapter } from "./features/learn/LearningPedagogy.jsx";
import { FocusedLearningLayout } from "./features/learn/LearningLayout.jsx";
import { useLessonRouteSync } from "./features/learn/useLessonRouteSync.js";
import { updatePageMetadata } from "./appMetadata.js";

const progressKey = "pulsateach-learning-progress";
const bookmarksKey = "pulsateach-learning-bookmarks";
export default function InteractiveLearning({ locale, tracks = [], onRequireTrack }) {
  const initialRoute = readLessonRoute();
  const requestedRoute = useRef(initialRoute);
  const [activeTrackId, setActiveTrackId] = useState(initialRoute.trackId);
  const [activeModuleId, setActiveModuleId] = useState(initialRoute.moduleId);
  const [activeLessonId, setActiveLessonId] = useState(initialRoute.lessonId);
  const [progress, setProgress] = useState(() => readProgress());
  const [bookmarks, setBookmarks] = useState(() => readBookmarks());
  const [lessonQuery, setLessonQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [syncState, setSyncState] = useState("local");
  const [trackLoadError, setTrackLoadError] = useState("");
  const selectLesson = useLessonRouteSync({ locale, onRequireTrack, requestedRoute, setActiveTrackId, setActiveModuleId, setActiveLessonId, setTrackLoadError });

  const selectedTrack = tracks.find((track) => track.id === activeTrackId);
  const trackLoading = Boolean(selectedTrack?.isSummary);
  const activeTrack = (!selectedTrack?.isSummary ? selectedTrack : null) ?? tracks.find((track) => !track.isSummary) ?? null;
  const activeModule = activeTrack?.modules.find((module) => module.id === activeModuleId) ?? activeTrack?.modules[0] ?? null;
  const activeLesson = activeModule?.lessons.find((lesson) => lesson.id === activeLessonId) ?? activeModule?.lessons[0] ?? null;

  useEffect(() => {
    if (!activeTrack) return;
    const requestedTrack = tracks.find((track) => track.id === requestedRoute.current.trackId);
    if (requestedTrack?.isSummary) return;
    const requestedModule = requestedTrack?.modules.find((module) => module.id === requestedRoute.current.moduleId);
    const requestedLesson = requestedModule?.lessons.find((lesson) => lesson.id === requestedRoute.current.lessonId);
    if (requestedTrack && requestedModule && requestedLesson) {
      setActiveTrackId(requestedTrack.id);
      setActiveModuleId(requestedModule.id);
      setActiveLessonId(requestedLesson.id);
    }
  }, [activeTrack, tracks]);

  useEffect(() => {
    if (!activeTrack || trackLoading) return;
    const requested = requestedRoute.current;
    const requestedModule = activeTrack.id === requested.trackId
      ? activeTrack.modules.find((module) => module.id === requested.moduleId)
      : null;
    const requestedLessonExists = requestedModule?.lessons.some(
      (lesson) => lesson.id === requested.lessonId
    );
    if (requestedLessonExists) return;

    const firstModule = activeTrack.modules[0];
    const hasModule = activeTrack.modules.some((module) => module.id === activeModuleId);
    if (!hasModule) {
      setActiveModuleId(firstModule.id);
      setActiveLessonId(firstModule.lessons[0].id);
    }
  }, [activeModuleId, activeTrack, trackLoading]);

  const activeTrackCompleted = activeTrack?.modules.reduce((sum, module) => sum + module.lessons.filter((lesson) => progress.completed[lesson.id]).length, 0) ?? 0;
  const activeTrackTotal = activeTrack?.modules.reduce((sum, module) => sum + module.lessons.length, 0) ?? 0;

  useEffect(() => {
    if (!activeTrack || !activeModule || !activeLesson || trackLoading) return;
    window.history.replaceState(null, "", `/learn/${activeTrackId}/${activeModuleId}/${activeLessonId}`);
    updatePageMetadata("learn", locale, "PulsaTeach", { trackName: localize(activeTrack.title, locale), moduleName: localize(activeModule.title, locale), lessonName: localize(activeLesson.title, locale), description: localize(activeLesson.brief, locale) || localize(activeTrack.summary, locale) });
    setProgress((current) => {
      const next = markLessonOpened(current, { trackId: activeTrackId, moduleId: activeModuleId, lessonId: activeLessonId });
      localStorage.setItem(progressKey, JSON.stringify(next));
      return next;
    });
    recordLearningEvent({ eventType: "lesson_opened", lessonId: activeLessonId, trackId: activeTrackId }).catch(() => {});
  }, [activeLesson, activeLessonId, activeModule, activeModuleId, activeTrack, activeTrackId, locale, trackLoading]);

  useEffect(() => {
    let cancelled = false;
    loadRemoteProgress()
      .then((remote) => {
        if (cancelled) return;
        if (remote?.completed) {
          setProgress((current) => {
            const merged = mergeProgress(current, remote);
            localStorage.setItem(progressKey, JSON.stringify(merged));
            return merged;
          });
          setSyncState("synced");
        } else {
          setSyncState("local");
        }
      })
      .catch(() => {
        if (!cancelled) setSyncState("offline");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleTrackChange = async (track) => {
    setTrackLoadError("");
    try {
      const fullTrack = track.isSummary && onRequireTrack ? await onRequireTrack(track.id) : track;
      const firstModule = fullTrack.modules[0];
      selectLesson(fullTrack.id, firstModule.id, firstModule.lessons[0].id);
    } catch {
      setTrackLoadError(locale === "fr" ? "Impossible de charger cette formation." : "Unable to load this course.");
    }
  };

  const openLesson = async (moduleId, lessonId) => {
    setTrackLoadError("");
    if (!activeTrack) return;
    const previousRoute = requestedRoute.current;
    requestedRoute.current = { trackId: activeTrack.id, moduleId, lessonId };
    try {
      if (activeTrack.id === "css" && !activeTrack.modules.some((module) => module.id === moduleId) && onRequireTrack) {
        await onRequireTrack(activeTrack.id, { moduleId });
      }
      selectLesson(activeTrack.id, moduleId, lessonId);
    } catch {
      requestedRoute.current = previousRoute;
      setTrackLoadError(locale === "fr" ? "Impossible de charger cette lecon." : "Unable to load this lesson.");
    }
  };

  const goToNextLesson = async () => {
    if (!activeTrack || !activeModule || !activeLesson) return;
    let next = getNextLesson(activeTrack, activeModule.id, activeLesson.id);
    if (!next && hasDeferredTrackGroup(activeTrack, activeModule.id) && onRequireTrack) {
      const deferredModuleId = getDeferredTrackGroupModuleId(activeTrack, activeModule.id);
      if (deferredModuleId) {
        const expandedTrack = await onRequireTrack(activeTrack.id, { moduleId: deferredModuleId });
        next = getNextLesson(expandedTrack, activeModule.id, activeLesson.id);
      }
    }
    if (next) {
      selectLesson(activeTrack.id, next.moduleId, next.lessonId);
    }
  };

  const hasNextLesson = Boolean(activeTrack && activeModule && activeLesson && (
    getNextLesson(activeTrack, activeModule.id, activeLesson.id) || hasDeferredTrackGroup(activeTrack, activeModule.id)
  ));

  const persistProgress = (next) => {
    localStorage.setItem(progressKey, JSON.stringify(next));
    saveRemoteProgress(next)
      .then(() => setSyncState("synced"))
      .catch(() => setSyncState("offline"));
  };

  const completeLesson = (lesson, passedCount) => {
    setProgress((current) => {
      const next = markLessonCompleted(current, lesson, passedCount);
      persistProgress(next);
      return next;
    });
  };

  const handleQuizResult = (lesson, quiz, score) => {
    setProgress((current) => {
      const now = new Date();
      const reviewItems = scheduleQuizReview(
        current.review?.items || {},
        quiz,
        score,
        { trackId: activeTrack.id, moduleId: activeModule.id, lessonId: lesson.id },
        now
      );
      let next = {
        ...current,
        review: {
          ...(current.review || {}),
          items: reviewItems,
          updatedAt: now.toISOString()
        },
        quizEvidence: {
          ...(current.quizEvidence || {}),
          [lesson.id]: {
            percent: score.percent,
            passed: score.passed,
            skills: score.skills,
            attemptedAt: now.toISOString()
          }
        }
      };
      if (score.passed) next = markLessonCompleted(next, lesson, score.results.filter((item) => item.correct).length, now);
      persistProgress(next);
      return next;
    });
  };

  const toggleBookmark = (lessonId) => {
    const next = bookmarks.includes(lessonId)
      ? bookmarks.filter((item) => item !== lessonId)
      : [...bookmarks, lessonId];
    setBookmarks(next);
    localStorage.setItem(bookmarksKey, JSON.stringify(next));
  };

  if (!activeTrack || !activeModule || !activeLesson) {
    return (
      <section className="grid min-h-screen place-items-center bg-slate-100 px-4 pt-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm" role="status">
          <p className="font-display text-xl font-bold">{locale === "fr" ? "Préparation de la formation…" : "Preparing course…"}</p>
        </div>
      </section>
    );
  }

  if (trackLoading) {
    return (
      <section className="grid min-h-screen place-items-center bg-slate-100 px-4 pt-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm" role="status">
          <p className="font-display text-xl font-bold">{locale === "fr" ? "Chargement de la formation…" : "Loading course…"}</p>
          <p className="mt-2 text-sm text-slate-600">{selectedTrack?.title?.[locale]}</p>
        </div>
      </section>
    );
  }

  return (
    <FocusedLearningLayout
      QuizComponent={QuizWorkspace}
      locale={locale}
      tracks={tracks}
      activeTrack={activeTrack}
      activeModule={activeModule}
      activeLesson={activeLesson}
      activeTrackId={activeTrackId}
      activeTrackCompleted={activeTrackCompleted}
      activeTrackTotal={activeTrackTotal}
      progress={progress}
      bookmarks={bookmarks}
      lessonQuery={lessonQuery}
      statusFilter={statusFilter}
      syncState={syncState}
      trackLoadError={trackLoadError}
      onTrackChange={handleTrackChange}
      onQueryChange={setLessonQuery}
      onFilterChange={setStatusFilter}
      onOpenLesson={openLesson}
      onToggleBookmark={() => toggleBookmark(activeLesson.id)}
      onComplete={completeLesson}
      onQuizResult={handleQuizResult}
      onCloseQuiz={() => {
        const previous = getPreviousLesson(activeTrack, activeModule.id, activeLesson.id);
        if (previous) {
          selectLesson(activeTrack.id, previous.moduleId, previous.lessonId);
        } else {
          window.location.assign("/catalog");
        }
      }}
      onNext={goToNextLesson}
      hasNext={hasNextLesson}
    />
  );

}

function QuizWorkspace({ activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onQuizResult, onCloseQuiz, onNext, hasNext }) {
  const quiz = useMemo(() => normalizeQuizLesson(lesson), [lesson]);
  const storageKey = `pulsateach-quiz-draft-${lesson.id}`;
  const [draft, setDraft] = useState(() => createQuizDraft(quiz, readStoredJson(storageKey)));
  const [feedback, setFeedback] = useState({});
  const [finalScore, setFinalScore] = useState(null);
  const [note, setNote] = useState("");
  const question = quiz.questions[draft.currentIndex];
  const response = draft.responses[question.id];
  const rationale = draft.rationales[question.id] || "";
  const questionFeedback = feedback[question.id];
  const canValidate = hasResponse(response) && (!question.requiresRationale || rationale.trim().length >= 12);
  const answeredCount = quiz.questions.filter((item) => hasResponse(draft.responses[item.id])).length;

  useEffect(() => {
    setNote(localStorage.getItem(`pulsateach-note-${lesson.id}`) || "");
    setDraft(createQuizDraft(quiz, readStoredJson(storageKey)));
    setFeedback({});
    setFinalScore(null);
  }, [lesson.id, quiz, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }));
  }, [draft, storageKey]);

  useEffect(() => {
    let active = true;
    const localDraft = readStoredJson(storageKey);
    getQuizSession(lesson.id).then((remote) => {
      if (!active || !remote) return;
      const useRemote = !localDraft.updatedAt || new Date(remote.updatedAt).getTime() > new Date(localDraft.updatedAt).getTime();
      if (useRemote) setDraft(createQuizDraft(quiz, remote));
      if (remote.status === "completed" && remote.score) setFinalScore(remote.score);
    }).catch(() => {});
    return () => {
      active = false;
    };
  }, [lesson.id, quiz, storageKey]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      saveQuizSession(lesson.id, {
        currentIndex: draft.currentIndex,
        responses: draft.responses,
        rationales: draft.rationales,
        status: finalScore?.passed ? "completed" : "draft",
        score: finalScore ? {
          earned: finalScore.earned,
          available: finalScore.available,
          percent: finalScore.percent,
          passed: finalScore.passed
        } : null
      }).catch(() => {});
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [draft, finalScore, lesson.id]);

  useEffect(() => {
    if (question.type === "ordering" && !Array.isArray(response)) {
      setDraft((current) => ({
        ...current,
        responses: { ...current.responses, [question.id]: question.choices.map((choice) => choice.id) }
      }));
    }
  }, [question, response]);

  const setResponse = (value) => {
    setDraft((current) => ({ ...current, responses: { ...current.responses, [question.id]: value } }));
    setFeedback((current) => ({ ...current, [question.id]: undefined }));
    setFinalScore(null);
  };

  const validateCurrent = () => {
    const result = evaluateQuestion(question, response);
    setFeedback((current) => ({ ...current, [question.id]: result }));
    if (draft.currentIndex < quiz.questions.length - 1) return;

    const score = scoreQuiz(quiz, draft.responses);
    setFinalScore(score);
    recordAttempt({
      lessonId: lesson.id,
      trackId: activeTrack.id,
      moduleId: activeModule.id,
      passed: score.results.filter((item) => item.correct).length,
      total: score.results.length
    }).catch(() => {});
    recordLearningEvent({
      eventType: score.passed ? "lesson_completed" : "tests_failed",
      lessonId: lesson.id,
      trackId: activeTrack.id,
      payload: { passed: score.earned, total: score.available, percent: score.percent, kind: "quiz" }
    }).catch(() => {});
    if (score.passed) {
      localStorage.removeItem(storageKey);
    }
    onQuizResult?.(lesson, quiz, score);
  };

  const restartQuiz = () => {
    localStorage.removeItem(storageKey);
    setDraft(createQuizDraft(quiz));
    setFeedback({});
    setFinalScore(null);
  };

  return (
    <QuizModal titleId={`quiz-title-${lesson.id}`} locale={locale} onClose={onCloseQuiz}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">quiz</span>
        <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-emerald-300">{lesson.xp} XP</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
        {isCompleted && <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">{locale === "fr" ? "Validé" : "Passed"}</span>}
        <button
          type="button"
          onClick={onToggleBookmark}
          className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-cloud px-4 py-2 text-sm font-extrabold text-ink shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
        >
          {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          {isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}
        </button>
      </div>
      <h3 id={`quiz-title-${lesson.id}`} className="mt-4 pr-12 font-display text-3xl font-bold leading-tight sm:text-4xl">{lesson.title[locale]}</h3>
      <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-ink/70 sm:text-lg">{lesson.brief[locale]}</p>
      <SkillChips skills={lesson.skills} />
      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-sm font-bold text-slate-700">{locale === "fr" ? "Besoin de réviser avant le bilan ?" : "Need a quick review first?"}</summary>
        <CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} />
      </details>
      <div className="muted-surface mt-4 min-w-0 p-3 sm:mt-6 sm:p-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <p className="text-sm font-bold text-indigoPop">{locale === "fr" ? "Question" : "Question"} {draft.currentIndex + 1}/{quiz.questions.length} · {answeredCount} {locale === "fr" ? "répondues" : "answered"}</p>
          <div className="h-2 min-w-16 flex-1 overflow-hidden rounded-full bg-slate-200 sm:max-w-40"><div className="h-full rounded-full bg-indigoPop" style={{ width: `${((draft.currentIndex + 1) / quiz.questions.length) * 100}%` }} /></div>
        </div>
        <p className="mt-4 break-words font-display text-xl font-bold leading-snug sm:text-2xl">{localize(question.prompt, locale)}</p>
        {question.code && <pre tabIndex={0} aria-label={locale === "fr" ? "Code de question scrollable" : "Scrollable question code"} className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-indigo-100"><code>{question.code}</code></pre>}
        <QuestionInput question={question} response={response} locale={locale} onChange={setResponse} />
        {question.requiresRationale && <>
          <label className="mt-5 block text-sm font-bold text-slate-700" htmlFor={`quiz-rationale-${question.id}`}>
            {locale === "fr" ? "Explique ton choix en une phrase" : "Explain your choice in one sentence"}
          </label>
          <textarea
            id={`quiz-rationale-${question.id}`}
            value={rationale}
            onChange={(event) => {
              setDraft((current) => ({ ...current, rationales: { ...current.rationales, [question.id]: event.target.value } }));
              setFeedback((current) => ({ ...current, [question.id]: undefined }));
            }}
            placeholder={locale === "fr" ? "Cette réponse est la plus adaptée parce que…" : "This answer is the best choice because…"}
            className="mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm font-semibold outline-none focus:border-indigoPop"
          />
          <p className="mt-2 text-xs font-semibold text-slate-600">{locale === "fr" ? "La justification force à raisonner au-delà de la mémorisation." : "The explanation makes you reason beyond memorization."}</p>
        </>}
        <div className="mt-5 grid gap-2 sm:flex">
          {draft.currentIndex > 0 && <button type="button" onClick={() => setDraft((current) => ({ ...current, currentIndex: current.currentIndex - 1 }))} className="secondary-button w-full sm:w-auto">{locale === "fr" ? "Question précédente" : "Previous question"}</button>}
          <button type="button" disabled={!canValidate} onClick={validateCurrent} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"><Play className="size-5" />{locale === "fr" ? "Valider" : "Check"}</button>
          {questionFeedback && draft.currentIndex < quiz.questions.length - 1 && <button type="button" onClick={() => setDraft((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))} className="secondary-button w-full sm:w-auto">{locale === "fr" ? "Question suivante" : "Next question"}</button>}
        </div>
      </div>
      {questionFeedback && (
        <div className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${questionFeedback.correct ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`} role="status">
          {questionFeedback.correct ? <CheckCircle2 className="mb-2 size-6 text-green-700" /> : <XCircle className="mb-2 size-6 text-red-700" />}
          {localize(question.explanation, locale)}
        </div>
      )}
      {finalScore && <QuizResults quiz={quiz} score={finalScore} locale={locale} onRestart={restartQuiz} />}
      {finalScore?.passed && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
      <div className="mt-5"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
    </QuizModal>
  );
}

function QuizResults({ quiz, score, locale, onRestart }) {
  const correctCount = score.results.filter((result) => result.correct).length;
  return <section className={`mt-5 rounded-xl border p-4 ${score.passed ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`} aria-label={locale === "fr" ? "Résultats du quiz" : "Quiz results"}>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div><p className={`font-display text-2xl font-bold ${score.passed ? "text-green-900" : "text-amber-950"}`}>{locale === "fr" ? `Score final : ${score.percent} %` : `Final score: ${score.percent}%`}</p><p className="mt-1 text-sm font-semibold text-slate-700">{correctCount}/{score.results.length} {locale === "fr" ? "réponses correctes" : "correct answers"} · {locale === "fr" ? `seuil ${quiz.passingScore} %` : `${quiz.passingScore}% required`}</p></div>
      <button type="button" onClick={onRestart} className="secondary-button">{locale === "fr" ? "Recommencer le bilan" : "Restart check"}</button>
    </div>
    <ol className="mt-4 grid gap-2">{quiz.questions.map((question, index) => {
      const result = score.results.find((item) => item.questionId === question.id);
      return <li className={`rounded-lg border bg-white p-3 text-sm ${result?.correct ? "border-green-200" : "border-red-200"}`} key={question.id}><div className="flex items-start gap-2">{result?.correct ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-700" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-red-700" />}<div><p className="font-bold text-ink">{index + 1}. {localize(question.prompt, locale)}</p><p className="mt-1 leading-6 text-slate-600">{localize(question.explanation, locale)}</p></div></div></li>;
    })}</ol>
  </section>;
}

function QuestionInput({ question, response, locale, onChange }) {
  const choices = question.choices?.length ? question.choices : question.type === "true-false"
    ? [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }]
    : [];

  if (["single", "true-false", "code-reading", "error-identification"].includes(question.type)) {
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <button type="button" aria-pressed={response === choice.id} key={choice.id} onClick={() => onChange(choice.id)} className={`rounded-xl border p-4 text-left text-sm font-semibold ${response === choice.id ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"}`}>{localize(choice.label, locale)}</button>)}</div>;
  }
  if (question.type === "multiple") {
    const selected = Array.isArray(response) ? response : [];
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <button type="button" aria-pressed={selected.includes(choice.id)} key={choice.id} onClick={() => onChange(selected.includes(choice.id) ? selected.filter((id) => id !== choice.id) : [...selected, choice.id])} className={`rounded-xl border p-4 text-left text-sm font-semibold ${selected.includes(choice.id) ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"}`}>{localize(choice.label, locale)}</button>)}</div>;
  }
  if (question.type === "ordering") {
    const order = Array.isArray(response) ? response : choices.map((choice) => choice.id);
    return <ol className="mt-5 grid gap-2">{order.map((id, index) => {
      const choice = choices.find((item) => item.id === id);
      const move = (offset) => {
        const target = index + offset;
        if (target < 0 || target >= order.length) return;
        const next = [...order];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      return <li className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3" key={id}><span className="flex-1 font-semibold">{index + 1}. {localize(choice?.label, locale)}</span><button type="button" className="icon-button min-h-9 px-2" onClick={() => move(-1)} aria-label={locale === "fr" ? "Monter" : "Move up"}>↑</button><button type="button" className="icon-button min-h-9 px-2" onClick={() => move(1)} aria-label={locale === "fr" ? "Descendre" : "Move down"}>↓</button></li>;
    })}</ol>;
  }
  if (question.type === "matching") {
    const matches = response && typeof response === "object" && !Array.isArray(response) ? response : {};
    return <div className="mt-5 grid gap-3">{(question.pairs || []).map((pair) => <label className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-2 sm:items-center" key={pair.id}><span className="font-semibold">{localize(pair.label, locale)}</span><select className="form-control" value={matches[pair.id] || ""} onChange={(event) => onChange({ ...matches, [pair.id]: event.target.value })}><option value="">{locale === "fr" ? "Choisir" : "Choose"}</option>{(pair.choices || choices).map((choice) => <option value={choice.id} key={choice.id}>{localize(choice.label, locale)}</option>)}</select></label>)}</div>;
  }
  return <label className="mt-5 block"><span className="text-sm font-bold text-slate-700">{locale === "fr" ? "Ta réponse" : "Your answer"}</span><textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm outline-none focus:border-indigoPop" value={typeof response === "string" ? response : ""} onChange={(event) => onChange(event.target.value)} /></label>;
}
