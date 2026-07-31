import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Play, XCircle } from "lucide-react";
import { getQuizSession, loadRemoteProgress, recordAttempt, recordLearningEvent, saveQuizSession, saveRemoteProgress, submitQuiz } from "./apiClient.js";
import { getDeferredTrackGroupModuleId, hasDeferredTrackGroup } from "./content/localTrackLoader.js";
import { createQuizDraft, evaluateQuestion, normalizeQuizLesson, scoreQuiz } from "./features/quizzes/quizEngine.js";
import QuizModal from "./features/quizzes/QuizModal.jsx";
import { QuestionInput, QuizHeader, QuizResults } from "./features/quizzes/QuizPresentation.jsx";
import { scheduleQuizReview } from "./features/review/spacedRepetition.js";
import { getNextLesson, getPreviousLesson, hasResponse, localize, markLessonCompleted, markLessonOpened, mergeProgress, readBookmarks, readLessonRoute, readProgress, readStoredJson } from "./features/learn/learningState.js";
import { CompletionBanner, NotesPanel } from "./features/learn/LearningShared.jsx";
import { FocusedLearningLayout } from "./features/learn/LearningLayout.jsx";
import { useLessonRouteSync } from "./features/learn/useLessonRouteSync.js";
import { updatePageMetadata } from "./appMetadata.js";
import { getLearnerItem, removeLearnerItem, setLearnerItem } from "./learnerStorage.js";

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
      setLearnerItem(progressKey, JSON.stringify(next));
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
            setLearnerItem(progressKey, JSON.stringify(merged));
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
    setLearnerItem(progressKey, JSON.stringify(next));
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
            skills: score.skills || {},
            attemptedAt: now.toISOString()
          }
        }
      };
      if (score.passed) next = markLessonCompleted(next, lesson, score.results?.filter((item) => item.correct).length ?? score.earned, now);
      persistProgress(next);
      return next;
    });
  };

  const toggleBookmark = (lessonId) => {
    const next = bookmarks.includes(lessonId)
      ? bookmarks.filter((item) => item !== lessonId)
      : [...bookmarks, lessonId];
    setBookmarks(next);
    setLearnerItem(bookmarksKey, JSON.stringify(next));
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
  const serverGraded = quiz.gradingMode === "server";
  const storageKey = `pulsateach-quiz-draft-${lesson.id}`;
  const [draft, setDraft] = useState(() => createQuizDraft(quiz, readStoredJson(storageKey)));
  const [feedback, setFeedback] = useState({});
  const [finalScore, setFinalScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [note, setNote] = useState("");
  const [hydratedKey, setHydratedKey] = useState("");
  const [confirmedFinal, setConfirmedFinal] = useState(false);
  const [retryAt, setRetryAt] = useState(0);
  const [clock, setClock] = useState(Date.now());
  const questionHeadingRef = useRef(null);
  const shouldFocusQuestionRef = useRef(false);
  const question = quiz.questions[draft.currentIndex];
  const response = draft.responses[question.id];
  const rationale = draft.rationales[question.id] || "";
  const questionFeedback = feedback[question.id];
  const isLastQuestion = draft.currentIndex === quiz.questions.length - 1;
  const cooldownSeconds = Math.max(0, Math.ceil((retryAt - clock) / 1000));
  const canValidate = hasResponse(response)
    && (!question.requiresRationale || rationale.trim().length >= 12)
    && (!serverGraded || !isLastQuestion || confirmedFinal)
    && hydratedKey === storageKey
    && cooldownSeconds === 0;
  const answeredCount = quiz.questions.filter((item) => hasResponse(draft.responses[item.id])).length;

  useEffect(() => {
    let active = true;
    const storedDraft = readStoredJson(storageKey);
    const localDraft = createQuizDraft(quiz, storedDraft);
    setHydratedKey("");
    setNote(getLearnerItem(`pulsateach-note-${lesson.id}`) || "");
    setDraft(localDraft);
    setFeedback({});
    setFinalScore(null);
    setIsSubmitting(false);
    setSubmissionError("");
    setConfirmedFinal(false);
    setRetryAt(0);
    if (!serverGraded) {
      setHydratedKey(storageKey);
      return () => {
        active = false;
      };
    }
    getQuizSession(lesson.id).then((remote) => {
      if (!active || !remote) return;
      const localTime = storedDraft.questionSetVersion === quiz.questionSetVersion && localDraft.updatedAt
        ? new Date(localDraft.updatedAt).getTime()
        : 0;
      const remoteTime = remote.updatedAt ? new Date(remote.updatedAt).getTime() : 0;
      if (remote.draftQuestionSetVersion === quiz.questionSetVersion && remoteTime > localTime) {
        setDraft(createQuizDraft(quiz, { ...remote, questionSetVersion: remote.draftQuestionSetVersion }));
      }
      if (remote.questionSetVersion === quiz.questionSetVersion && remote.gradingVersion === 1 && remote.status === "completed" && remote.score) {
        setFinalScore(remote.score);
      }
      if (remote.gradedAt) setRetryAt(new Date(remote.gradedAt).getTime() + 15 * 60 * 1000);
    }).catch(() => {}).finally(() => {
      if (active) setHydratedKey(storageKey);
    });
    return () => {
      active = false;
    };
  }, [lesson.id, quiz, serverGraded, storageKey]);

  useEffect(() => {
    if (hydratedKey !== storageKey) return;
    setLearnerItem(storageKey, JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }));
  }, [draft, hydratedKey, storageKey]);

  useEffect(() => {
    if (!serverGraded || hydratedKey !== storageKey) return undefined;
    const timeout = window.setTimeout(() => {
      saveQuizSession(lesson.id, {
        questionSetVersion: quiz.questionSetVersion,
        currentIndex: draft.currentIndex,
        responses: draft.responses,
        rationales: draft.rationales
      }).catch(() => {});
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [draft, hydratedKey, lesson.id, quiz.questionSetVersion, serverGraded, storageKey]);

  useEffect(() => {
    if (retryAt <= Date.now()) return undefined;
    const interval = window.setInterval(() => {
      const now = Date.now();
      setClock(now);
      if (now >= retryAt) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [retryAt]);

  useEffect(() => {
    if (hydratedKey === storageKey && shouldFocusQuestionRef.current) {
      shouldFocusQuestionRef.current = false;
      questionHeadingRef.current?.focus();
    }
  }, [draft.currentIndex, hydratedKey, storageKey]);

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
    setSubmissionError("");
    setConfirmedFinal(false);
  };

  const validateCurrent = async () => {
    if (isSubmitting || cooldownSeconds > 0 || hydratedKey !== storageKey) return;
    setSubmissionError("");
    try {
      const result = serverGraded ? { submitted: true } : evaluateQuestion(question, response);
      setFeedback((current) => ({ ...current, [question.id]: result }));
      if (draft.currentIndex < quiz.questions.length - 1) return;

      if (serverGraded) setIsSubmitting(true);
      const gradedSession = serverGraded
        ? await submitQuiz(lesson.id, { questionSetVersion: quiz.questionSetVersion, responses: draft.responses, rationales: draft.rationales })
        : null;
      const score = gradedSession?.score || scoreQuiz(quiz, draft.responses);
      if (gradedSession?.gradedAt) setRetryAt(new Date(gradedSession.gradedAt).getTime() + 15 * 60 * 1000);
      setFinalScore(score);
      recordAttempt({
        lessonId: lesson.id,
        trackId: activeTrack.id,
        moduleId: activeModule.id,
        passed: score.results?.filter((item) => item.correct).length ?? score.earned,
        total: score.results?.length ?? score.available
      }).catch(() => {});
      recordLearningEvent({
        eventType: score.passed ? "lesson_completed" : "tests_failed",
        lessonId: lesson.id,
        trackId: activeTrack.id,
        payload: { passed: score.earned, total: score.available, percent: score.percent, kind: "quiz" }
      }).catch(() => {});
      if (score.passed) removeLearnerItem(storageKey);
      onQuizResult?.(lesson, quiz, score);
    } catch (error) {
      const nextRetryAt = error?.payload?.error?.details?.retryAt;
      if (nextRetryAt) setRetryAt(new Date(nextRetryAt).getTime());
      setSubmissionError(error?.code === "QUIZ_VERSION_CONFLICT"
        ? (locale === "fr" ? "Ce bilan a changé. Recharge la page avant de recommencer." : "This assessment changed. Reload the page before restarting.")
        : error?.code === "AUTH_REQUIRED"
          ? (locale === "fr" ? "Connecte-toi avant d’envoyer cet examen. Ton brouillon reste enregistré sur cet appareil." : "Sign in before submitting this exam. Your draft remains saved on this device.")
        : error?.code === "QUIZ_RETAKE_COOLDOWN"
          ? (locale === "fr" ? "Ce bilan vient d’être noté. Attends 15 minutes avant une nouvelle tentative." : "This assessment was just graded. Wait 15 minutes before another attempt.")
        : (locale === "fr" ? "La notation serveur a échoué. Réessaie sans quitter le quiz." : "Server grading failed. Try again without leaving the quiz."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    if (retryAt > Date.now()) return;
    removeLearnerItem(storageKey);
    setDraft(createQuizDraft(quiz));
    setFeedback({});
    setFinalScore(null);
    setSubmissionError("");
    setConfirmedFinal(false);
  };

  return (
    <QuizModal titleId={`quiz-title-${lesson.id}`} locale={locale} onClose={onCloseQuiz}>
      <QuizHeader lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} />
      {hydratedKey !== storageKey && <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700" role="status">{locale === "fr" ? "Chargement de ta tentative…" : "Loading your attempt…"}</p>}
      {hydratedKey === storageKey && (!finalScore || !serverGraded) && <div className="muted-surface mt-4 min-w-0 p-3 sm:mt-6 sm:p-5">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <p className="text-sm font-bold text-indigoPop">{locale === "fr" ? "Question" : "Question"} {draft.currentIndex + 1}/{quiz.questions.length} · {answeredCount} {locale === "fr" ? "répondues" : "answered"}</p>
          <div className="h-2 min-w-16 flex-1 overflow-hidden rounded-full bg-slate-200 sm:max-w-40"><div className="h-full rounded-full bg-indigoPop" style={{ width: `${((draft.currentIndex + 1) / quiz.questions.length) * 100}%` }} /></div>
        </div>
        <p ref={questionHeadingRef} tabIndex={-1} className="mt-4 break-words font-display text-xl font-bold leading-snug outline-none sm:text-2xl">{localize(question.prompt, locale)}</p>
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
        {serverGraded && isLastQuestion && <label className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-950"><input type="checkbox" checked={confirmedFinal} onChange={(event) => setConfirmedFinal(event.target.checked)} className="mt-0.5 size-5" />{locale === "fr" ? `Je confirme l’envoi de mes ${answeredCount} réponses pour notation.` : `I confirm submitting my ${answeredCount} answers for grading.`}</label>}
        <div className="mt-5 grid gap-2 sm:flex">
          {draft.currentIndex > 0 && <button type="button" onClick={() => { shouldFocusQuestionRef.current = true; setDraft((current) => ({ ...current, currentIndex: current.currentIndex - 1 })); }} className="secondary-button w-full sm:w-auto">{locale === "fr" ? "Question précédente" : "Previous question"}</button>}
          <button type="button" disabled={!canValidate || isSubmitting} aria-busy={isSubmitting} onClick={validateCurrent} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"><Play className="size-5" />{isSubmitting ? (locale === "fr" ? "Notation…" : "Grading…") : serverGraded && isLastQuestion ? (locale === "fr" ? "Envoyer l’examen" : "Submit exam") : (locale === "fr" ? "Valider" : "Check")}</button>
          {questionFeedback && draft.currentIndex < quiz.questions.length - 1 && <button type="button" onClick={() => { shouldFocusQuestionRef.current = true; setDraft((current) => ({ ...current, currentIndex: current.currentIndex + 1 })); }} className="secondary-button w-full sm:w-auto">{locale === "fr" ? "Question suivante" : "Next question"}</button>}
        </div>
      </div>}
      {submissionError && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">{submissionError}</p>}
      {questionFeedback && !questionFeedback.submitted && (
        <div className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${questionFeedback.correct ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`} role="status">
          {questionFeedback.correct ? <CheckCircle2 className="mb-2 size-6 text-green-700" /> : <XCircle className="mb-2 size-6 text-red-700" />}
          {localize(questionFeedback.feedback || question.explanation, locale)}
        </div>
      )}
      {submissionError && submissionError.includes(locale === "fr" ? "Connecte-toi" : "Sign in") && <a className="secondary-button mt-3" href="/auth">{locale === "fr" ? "Se connecter" : "Sign in"}</a>}
      {finalScore && <QuizResults quiz={quiz} score={finalScore} locale={locale} onRestart={restartQuiz} restartDisabled={cooldownSeconds > 0} retrySeconds={cooldownSeconds} />}
      {finalScore?.passed && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
      <div className="mt-5"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
    </QuizModal>
  );
}
