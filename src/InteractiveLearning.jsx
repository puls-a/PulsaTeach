import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CheckCircle2,
  Code2,
  Copy,
  Eye,
  Lightbulb,
  Play,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Terminal,
  XCircle
} from "lucide-react";
import { learningTracks } from "./content/trackRegistry.js";
import { getQuizSession, loadRemoteProgress, recordAttempt, recordLearningEvent, saveQuizSession, saveRemoteProgress } from "./apiClient.js";
import { createPreview, displayTestLabel, getPreviewKind, runJavaScriptWithConsole, testFailureHelp, validateLesson } from "./lessonRuntime.js";
import { createQuizDraft, evaluateQuestion, normalizeQuizLesson, scoreQuiz } from "./features/quizzes/quizEngine.js";
import { scheduleQuizReview } from "./features/review/spacedRepetition.js";

const progressKey = "pulsateach-learning-progress";
const bookmarksKey = "pulsateach-learning-bookmarks";
const colorClasses = {
  html: { card: "bg-orange-50", button: "bg-orange-500" },
  css: { card: "bg-indigo-50", button: "bg-indigoPop" },
  javascript: { card: "bg-amber-50", button: "bg-amber-500" },
  git: { card: "bg-rose-50", button: "bg-rose-600" },
  accessibility: { card: "bg-emerald-50", button: "bg-emerald-600" },
  testing: { card: "bg-cyan-50", button: "bg-cyan-700" }
};

export default function InteractiveLearning({ locale, tracks = learningTracks, onRequireTrack }) {
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

  const selectedTrack = tracks.find((track) => track.id === activeTrackId);
  const trackLoading = Boolean(selectedTrack?.isSummary);
  const activeTrack = (!selectedTrack?.isSummary ? selectedTrack : null) ?? tracks.find((track) => !track.isSummary) ?? learningTracks[0];
  const activeModule = activeTrack.modules.find((module) => module.id === activeModuleId) ?? activeTrack.modules[0];
  const activeLesson = activeModule.lessons.find((lesson) => lesson.id === activeLessonId) ?? activeModule.lessons[0];

  useEffect(() => {
    const requestedTrack = tracks.find((track) => track.id === requestedRoute.current.trackId);
    if (requestedTrack?.isSummary) return;
    const requestedModule = requestedTrack?.modules.find((module) => module.id === requestedRoute.current.moduleId);
    const requestedLesson = requestedModule?.lessons.find((lesson) => lesson.id === requestedRoute.current.lessonId);
    if (requestedTrack && requestedModule && requestedLesson) {
      setActiveTrackId(requestedTrack.id);
      setActiveModuleId(requestedModule.id);
      setActiveLessonId(requestedLesson.id);
    }
  }, [tracks]);

  useEffect(() => {
    if (trackLoading) return;
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

  const activeTrackCompleted = activeTrack.modules.reduce((sum, module) => sum + module.lessons.filter((lesson) => progress.completed[lesson.id]).length, 0);
  const activeTrackTotal = activeTrack.modules.reduce((sum, module) => sum + module.lessons.length, 0);

  useEffect(() => {
    if (trackLoading) return;
    window.history.replaceState(null, "", `/learn/${activeTrackId}/${activeModuleId}/${activeLessonId}`);
    recordLearningEvent({
      eventType: "lesson_opened",
      lessonId: activeLessonId,
      trackId: activeTrackId
    }).catch(() => {});
  }, [activeTrackId, activeModuleId, activeLessonId, trackLoading]);

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
    setActiveTrackId(track.id);
    try {
      const fullTrack = track.isSummary && onRequireTrack ? await onRequireTrack(track.id) : track;
      setActiveModuleId(fullTrack.modules[0].id);
      setActiveLessonId(fullTrack.modules[0].lessons[0].id);
    } catch {
      setTrackLoadError(locale === "fr" ? "Impossible de charger cette formation." : "Unable to load this course.");
    }
  };

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
      onOpenLesson={(moduleId, lessonId) => {
        setActiveModuleId(moduleId);
        setActiveLessonId(lessonId);
      }}
      onToggleBookmark={() => toggleBookmark(activeLesson.id)}
      onComplete={completeLesson}
      onQuizResult={handleQuizResult}
      onNext={() => {
        const next = getNextLesson(activeTrack, activeModule.id, activeLesson.id);
        if (next) {
          setActiveModuleId(next.moduleId);
          setActiveLessonId(next.lessonId);
        }
      }}
      hasNext={Boolean(getNextLesson(activeTrack, activeModule.id, activeLesson.id))}
    />
  );

}

function FocusedLearningLayout({
  locale,
  tracks,
  activeTrack,
  activeModule,
  activeLesson,
  activeTrackId,
  activeTrackCompleted,
  activeTrackTotal,
  progress,
  bookmarks,
  lessonQuery,
  statusFilter,
  syncState,
  trackLoadError,
  onTrackChange,
  onQueryChange,
  onFilterChange,
  onOpenLesson,
  onToggleBookmark,
  onComplete,
  onQuizResult,
  onNext,
  hasNext
}) {
  return (
    <section id="learn" className="min-h-screen bg-slate-100 px-3 pb-5 pt-24 sm:px-5">
      <div className="mx-auto max-w-[1800px]">
        <header className="mb-3 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <a href="/catalog" className="hover:text-indigoPop">{locale === "fr" ? "Formations" : "Courses"}</a>
              <span>/</span><span>{activeTrack.title[locale]}</span><span>/</span><span>{activeModule.title[locale]}</span>
            </div>
            <h1 className="mt-1 truncate font-display text-xl font-bold text-ink sm:text-2xl">{activeLesson.title[locale]}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg bg-slate-100 px-3 py-2 font-bold text-slate-600">{activeTrackCompleted}/{activeTrackTotal} {locale === "fr" ? "leçons" : "lessons"}</span>
            <span className="rounded-lg bg-indigo-50 px-3 py-2 font-bold text-indigoPop">{progress.xp} XP</span>
            <span className={`rounded-lg px-3 py-2 font-bold ${syncState === "synced" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{syncState}</span>
          </div>
        </header>
        {trackLoadError && <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800" role="alert">{trackLoadError}</p>}

        <div className="grid gap-3 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="min-w-0 max-h-[calc(100vh-7.5rem)] overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-24">
            <div className="grid grid-cols-3 gap-1">
              {tracks.map((track) => (
                <button key={track.id} type="button" onClick={() => onTrackChange(track)} title={track.label} className={`min-w-0 truncate rounded-lg px-2 py-2 text-xs font-bold ${activeTrackId === track.id ? "bg-indigoPop text-white" : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigoPop"}`}>{track.label}</button>
              ))}
            </div>
            <label className="relative mt-3 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input type="search" value={lessonQuery} onChange={(event) => onQueryChange(event.target.value)} placeholder={locale === "fr" ? "Chercher une leçon" : "Search lessons"} className="min-h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold outline-none focus:border-indigoPop" />
            </label>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {["all", "todo", "done", "saved"].map((filter) => <button type="button" key={filter} onClick={() => onFilterChange(filter)} className={`rounded-lg px-1 py-2 text-[11px] font-bold ${statusFilter === filter ? "bg-ink text-white" : "text-slate-500 hover:bg-slate-100"}`}>{filterLabel(filter, locale)}</button>)}
            </div>
            <div className="mt-4 grid gap-4">
              {activeTrack.modules.map((module) => (
                <div key={module.id}>
                  <div className="mb-1 flex items-center justify-between px-2"><h2 className="text-xs font-bold uppercase tracking-[.1em] text-slate-600">{module.title[locale]}</h2><span className="text-xs text-slate-600">{module.lessons.length}</span></div>
                  <div className="grid gap-1">
                    {module.lessons.filter((lesson) => isVisibleLesson(lesson, progress, bookmarks, lessonQuery, statusFilter, locale)).map((lesson) => {
                      const active = lesson.id === activeLesson.id;
                      return (
                        <button key={lesson.id} type="button" onClick={() => onOpenLesson(module.id, lesson.id)} className={`flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left text-sm font-semibold ${active ? "bg-indigo-50 text-indigoPop" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>
                          {progress.completed[lesson.id] ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" /> : <Code2 className="mt-0.5 size-4 shrink-0 text-slate-400" />}
                          <span>{lesson.title[locale]}</span>
                          {bookmarks.includes(lesson.id) && <BookmarkCheck className="ml-auto size-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <LessonWorkspace
            activeTrack={activeTrack}
            activeModule={activeModule}
            lesson={activeLesson}
            locale={locale}
            isCompleted={Boolean(progress.completed[activeLesson.id])}
            isBookmarked={bookmarks.includes(activeLesson.id)}
            onToggleBookmark={onToggleBookmark}
            onComplete={onComplete}
            onQuizResult={onQuizResult}
            onNext={onNext}
            hasNext={hasNext}
          />
        </div>
      </div>
    </section>
  );
}

function MissionBoard({ locale, progress, onOpenLesson }) {
  const missions = [
    {
      trackId: "html",
      moduleId: "html-a11y-final",
      lessonId: "html-12-final-project",
      title: { fr: "Publier PulsaConf", en: "Ship PulsaConf" },
      text: { fr: "Assemble une page HTML complète avec navigation, programme, formulaire et footer.", en: "Assemble a complete HTML page with navigation, schedule, form, and footer." }
    },
    {
      trackId: "css",
      moduleId: "css-responsive-motion",
      lessonId: "css-06-final-project",
      title: { fr: "Styliser une landing", en: "Style a landing" },
      text: { fr: "Crée les règles CSS qui donnent une vraie structure responsive à une landing.", en: "Create CSS rules that give a landing page a real responsive structure." }
    },
    {
      trackId: "javascript",
      moduleId: "js-storage-async",
      lessonId: "js-07-final-project",
      title: { fr: "Coder un dashboard", en: "Code a dashboard" },
      text: { fr: "Pose le squelette logique avec state, render, addTask et sauvegarde locale.", en: "Build the logic skeleton with state, render, addTask, and local save." }
    }
  ];

  return (
    <section className="mt-8 rounded-[30px] bg-white p-5 text-ink clay">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Missions de projet" : "Project missions"}</p>
          <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Saute directement vers un livrable." : "Jump straight into a deliverable."}</h3>
        </div>
        <p className="max-w-xl font-bold leading-7 text-ink/62">
          {locale === "fr" ? "Ces missions reprennent les projets du rapport et valident plusieurs compétences à la fois." : "These missions reuse the report projects and validate several skills at once."}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {missions.map((mission) => {
          const done = Boolean(progress.completed[mission.lessonId]);
          return (
            <button
              type="button"
              key={mission.lessonId}
              onClick={() => onOpenLesson(mission)}
              className="cursor-pointer rounded-[24px] bg-cloud p-5 text-left transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop clay-soft"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-2xl bg-indigoPop px-3 py-2 text-sm font-extrabold text-white">{mission.trackId.toUpperCase()}</span>
                {done ? <CheckCircle2 className="size-6 text-mintPop" /> : <Code2 className="size-6 text-indigoPop" />}
              </div>
              <h4 className="font-display text-2xl font-bold">{mission.title[locale]}</h4>
              <p className="mt-2 font-bold leading-7 text-ink/68">{mission.text[locale]}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function LessonWorkspace({ activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onComplete, onQuizResult, onNext, hasNext }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [result, setResult] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`pulsateach-code-${lesson.id}`);
    setCode(saved || lesson.starterCode);
    setResult(null);
    setHintLevel(0);
    setShowCorrection(false);
    setConsoleOutput("");
    setNote(localStorage.getItem(`pulsateach-note-${lesson.id}`) || "");
  }, [lesson]);

  useEffect(() => {
    if (lesson.type === "quiz") return undefined;
    const timeout = window.setTimeout(() => {
      localStorage.setItem(`pulsateach-code-${lesson.id}`, code);
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [code, lesson.id, lesson.type]);

  const preview = useMemo(() => createPreview(lesson, code), [code, lesson]);
  const previewKind = getPreviewKind(lesson);

  const runTests = async () => {
    const checks = await validateLesson(lesson, code);
    setResult(checks);
    recordAttempt({
      lessonId: lesson.id,
      trackId: activeTrack.id,
      moduleId: activeModule.id,
      passed: checks.filter((check) => check.pass).length,
      total: checks.length
    }).catch(() => {});
    recordLearningEvent({
      eventType: checks.every((check) => check.pass) ? "lesson_completed" : "tests_failed",
      lessonId: lesson.id,
      trackId: activeTrack.id,
      payload: {
        passed: checks.filter((check) => check.pass).length,
        total: checks.length,
        failedTests: checks.filter((check) => !check.pass).map((check) => check.label || check.id)
      }
    }).catch(() => {});
    if (checks.every((check) => check.pass)) {
      onComplete(lesson, checks.length);
    }
  };

  const runCode = async () => {
    setConsoleOutput(locale === "fr" ? "Exécution en cours…" : "Running…");
    setConsoleOutput(await runJavaScriptWithConsole(code, locale));
  };

  const passed = result?.filter((check) => check.pass).length ?? 0;

  if (lesson.type === "quiz") {
    return <QuizWorkspace activeTrack={activeTrack} activeModule={activeModule} lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} onQuizResult={onQuizResult} onNext={onNext} hasNext={hasNext} />;
  }

  return (
    <section className="focused-workspace min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-ink shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">{lesson.type}</span>
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{lesson.xp} XP</span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
            {isCompleted && <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">{locale === "fr" ? "Validé" : "Passed"}</span>}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold">{lesson.title[locale]}</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">{lesson.brief[locale]}</p>
          <SkillChips skills={lesson.skills} />
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={() => setHintLevel((value) => Math.min(value + 1, lesson.pedagogy?.hints?.length || 1))} icon={Lightbulb}>
            {locale === "fr" ? `Indice ${Math.min(hintLevel + 1, lesson.pedagogy?.hints?.length || 1)}` : "Next hint"}
          </ActionButton>
          <ActionButton
            onClick={() => {
              copyLessonLink();
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            }}
            icon={Copy}
          >
            {copied ? (locale === "fr" ? "Copié" : "Copied") : (locale === "fr" ? "Lien" : "Link")}
          </ActionButton>
          <ActionButton onClick={onToggleBookmark} icon={isBookmarked ? BookmarkCheck : Bookmark}>
            {isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}
          </ActionButton>
          <ActionButton onClick={() => setShowCorrection((value) => !value)} icon={Eye}>
            {locale === "fr" ? "Correction expliquée" : "Explained correction"}
          </ActionButton>
          {previewKind === "javascript" && (
            <ActionButton onClick={runCode} icon={Terminal}>
              {locale === "fr" ? "Exécuter" : "Run code"}
            </ActionButton>
          )}
          <ActionButton onClick={() => setCode(lesson.starterCode)} icon={RotateCcw}>
            Reset
          </ActionButton>
        </div>
      </div>

      <CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} />
      <PedagogyWorkshop pedagogy={lesson.pedagogy} locale={locale} />
      <LessonGuide guide={lesson.guide} locale={locale} />
      <ProgressiveHints pedagogy={lesson.pedagogy} fallback={lesson.hint} level={hintLevel} locale={locale} />
      <div className="mt-4"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
      {lesson.type === "project" && <ProjectRubric lesson={lesson} locale={locale} />}
      {result?.every((check) => check.pass) && (
        <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />
      )}

      <div className="mt-8 border-t border-slate-200 pt-6">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-indigoPop">{locale === "fr" ? "Exercice autonome" : "Independent exercise"}</p>
        <h4 className="mt-2 font-display text-2xl font-bold">{lesson.brief[locale]}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-500">{locale === "fr" ? "Travaille dans l'éditeur, observe l'aperçu puis lance les tests. Utilise les indices progressivement si tu bloques." : "Work in the editor, inspect the preview, then run the tests. Use hints progressively if needed."}</p>
      </div>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-ink">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
            <span className="font-mono text-sm font-bold text-slate-300">{lesson.id}.{lesson.type === "css" ? "css" : lesson.type === "sql" || lesson.runtime === "sql" ? "sql" : lesson.type === "js" || lesson.type === "node" || lesson.runtime === "node" ? "js" : lesson.type === "typescript" || lesson.runtime === "typescript" ? "ts" : lesson.type === "react" || lesson.runtime === "react" ? "jsx" : lesson.type === "terminal" || lesson.runtime === "terminal" ? "sh" : lesson.type === "text" || lesson.runtime === "text" ? "md" : "html"}</span>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem(`pulsateach-code-${lesson.id}`, code);
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"
            >
              <Save className="size-4" />
              {locale === "fr" ? "Sauver" : "Save"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck="false"
            className="min-h-[480px] w-full resize-y bg-ink p-5 font-mono text-sm leading-7 text-indigo-100 outline-none"
            aria-label={locale === "fr" ? "Éditeur de code" : "Code editor"}
          />
        </div>

        <div className="grid gap-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 text-sm font-bold">
              <Eye className="size-5 text-indigoPop" />
              {locale === "fr" ? "Aperçu live" : "Live preview"}
            </div>
            {previewKind === "javascript" ? (
              <div className="grid gap-0">
                <div className="min-h-[170px] bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-500">{locale === "fr" ? "Ce fichier ne produit pas d'interface visuelle." : "This file does not produce a visual interface."}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{locale === "fr" ? "Exécute le code pour afficher ses sorties dans la console." : "Run the code to display its output in the console."}</p>
                </div>
                <div className="border-t-[3px] border-ink/20 bg-ink p-4 text-white">
                  <div className="mb-2 flex items-center gap-2 font-display text-lg font-bold">
                    <Terminal className="size-5 text-lemonPop" />
                    Console
                  </div>
                  <pre className="min-h-20 whitespace-pre-wrap font-mono text-sm text-indigo-100">{consoleOutput || (locale === "fr" ? "Clique Exécuter pour voir les logs." : "Click Run code to see logs.")}</pre>
                </div>
              </div>
            ) : previewKind === "terminal" ? (
              <div className="min-h-[300px] bg-slate-950 p-5 text-slate-100">
                <div className="flex items-center gap-2 font-display text-lg font-bold"><Terminal className="size-5 text-lemonPop" />{locale === "fr" ? "Terminal simulé" : "Simulated terminal"}</div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{locale === "fr" ? "Écris la suite de commandes demandée. Les tests vérifient l’intention sans modifier ton ordinateur." : "Write the requested command sequence. Tests verify intent without changing your computer."}</p>
                <pre className="mt-5 whitespace-pre-wrap rounded-lg bg-black/30 p-4 font-mono text-sm text-green-300">$ {code || "…"}</pre>
              </div>
            ) : ["typescript", "react", "node", "sql"].includes(previewKind) ? (
              <div className="min-h-[300px] bg-slate-950 p-5 text-slate-100">
                <div className="flex items-center gap-2 font-display text-lg font-bold"><Code2 className="size-5 text-sky-400" />{previewKind === "react" ? (locale === "fr" ? "Composant React" : "React component") : previewKind === "node" ? (locale === "fr" ? "Module Node.js" : "Node.js module") : previewKind === "sql" ? (locale === "fr" ? "Migration PostgreSQL" : "PostgreSQL migration") : (locale === "fr" ? "Contrat TypeScript" : "TypeScript contract")}</div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{previewKind === "react" ? (locale === "fr" ? "Les tests inspectent la structure JSX, les hooks et les contrats demandés. Le composant sera exécuté dans le projet final assemblé." : "Tests inspect the requested JSX structure, hooks, and contracts. The component will run in the assembled final project.") : previewKind === "node" ? (locale === "fr" ? "Les tests vérifient le contrat serveur sans exécuter ce module privilégié dans le navigateur." : "Tests verify the server contract without executing this privileged module in the browser.") : previewKind === "sql" ? (locale === "fr" ? "Les tests inspectent tables, contraintes, requêtes et politiques sans modifier une base locale." : "Tests inspect tables, constraints, queries, and policies without modifying a local database.") : (locale === "fr" ? "Les tests vérifient les types, signatures et mécanismes demandés sans exécuter ce code dans le navigateur." : "Tests verify the requested types, signatures, and mechanisms without executing this code in the browser.")}</p>
                <pre className="mt-5 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-4 font-mono text-sm text-sky-200">{code || "…"}</pre>
              </div>
            ) : previewKind === "text" ? (
              <div className="min-h-[300px] bg-slate-50 p-5 text-slate-700">
                <div className="flex items-center gap-2 font-display text-lg font-bold text-ink"><BookOpen className="size-5 text-indigoPop" />{locale === "fr" ? "Réponse structurée" : "Structured response"}</div>
                <p className="mt-4 text-sm leading-6">{locale === "fr" ? "Rédige une décision, un diagnostic ou un plan vérifiable. Les critères recherchent les notions essentielles." : "Write a verifiable decision, diagnosis, or plan. Criteria look for essential concepts."}</p>
                <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-4 font-mono text-sm">{code || "…"}</pre>
              </div>
            ) : (
              <iframe key={`${lesson.id}-${preview}`} title="PulsaTeach preview" srcDoc={preview} sandbox="allow-scripts" className="h-[300px] w-full bg-white" />
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-display text-xl font-bold">{locale === "fr" ? "Tests automatiques" : "Automated tests"}</h4>
              <button
                type="button"
                onClick={runTests}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800"
              >
                <Play className="size-5" />
                {locale === "fr" ? "Lancer" : "Run"}
              </button>
            </div>
            <p className="mt-2 font-bold text-ink/62">
              {result ? `${passed}/${result.length}` : locale === "fr" ? "Lance les tests pour vérifier ton code." : "Run tests to check your code."}
            </p>
            <div className="mt-4 space-y-3">
              {(result || lesson.tests.map((item) => ({ ...item, pass: false, waiting: true }))).map((check) => (
                <div className={`flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold ${check.pass ? "text-ink" : "text-slate-500"}`} key={check.label}>
                  {check.waiting ? <Code2 className="mt-0.5 size-5 shrink-0 text-indigoPop" /> : check.pass ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-rosePop" />}
                  <span>
                    <span className="block">{displayTestLabel(check, locale)}</span>
                    {!check.waiting && !check.pass && <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{testFailureHelp(check, locale)}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {(showCorrection || result?.every((check) => check.pass)) && <ExplainedCorrection lesson={lesson} locale={locale} onLoadSolution={() => setCode(lesson.solution)} />}
    </section>
  );
}

function MasteryDashboard({ locale, progress, onOpenLesson }) {
  return (
    <section className="mb-8 rounded-[30px] bg-white p-5 text-ink clay">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Maîtrise par parcours" : "Track mastery"}</p>
          <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Vois où concentrer ton prochain effort." : "See where to focus your next effort."}</h3>
        </div>
        <p className="font-extrabold text-ink/60">{locale === "fr" ? "Calculé depuis tes validations locales." : "Calculated from your local passes."}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {learningTracks.map((track) => {
          const total = track.modules.reduce((sum, module) => sum + module.lessons.length, 0);
          const done = track.modules.reduce((sum, module) => sum + module.lessons.filter((lesson) => progress.completed[lesson.id]).length, 0);
          const percent = Math.round((done / total) * 100);
          return (
            <article className={`rounded-[24px] p-4 clay-soft ${colorClasses[track.id].card}`} key={track.id}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className={`rounded-2xl px-3 py-2 text-sm font-extrabold text-white ${colorClasses[track.id].button}`}>{track.label}</span>
                <span className="font-display text-2xl font-bold">{percent}%</span>
              </div>
              <p className="font-display text-xl font-bold">{track.title[locale]}</p>
              <div className="mt-4 h-4 rounded-full bg-white clay-soft">
                <div className={`h-full rounded-full ${colorClasses[track.id].button}`} style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 text-sm font-extrabold text-ink/62">{done}/{total} {locale === "fr" ? "leçons" : "lessons"}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
        <DailyPlan locale={locale} progress={progress} onOpenLesson={onOpenLesson} />
        <ActivityLog locale={locale} activity={progress.activity || []} />
      </div>
    </section>
  );
}

function DailyPlan({ locale, progress, onOpenLesson }) {
  const plan = learningTracks.flatMap((track) =>
    track.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({ track, module, lesson }))
    )
  ).filter((item) => !progress.completed[item.lesson.id]).slice(0, 3);

  if (!plan.length) {
    return (
      <div className="rounded-[24px] bg-green-100 p-4 clay-soft">
        <p className="font-display text-2xl font-bold">{locale === "fr" ? "Parcours terminé" : "Path complete"}</p>
        <p className="mt-2 font-bold text-ink/65">{locale === "fr" ? "Tu as validé toutes les leçons disponibles." : "You passed every available lesson."}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] bg-cloud p-4 clay-soft">
      <p className="font-display text-2xl font-bold">{locale === "fr" ? "Plan du jour" : "Daily plan"}</p>
      <div className="mt-4 grid gap-3">
        {plan.map(({ track, module, lesson }) => (
          <button
            type="button"
            key={lesson.id}
            onClick={() => onOpenLesson({ trackId: track.id, moduleId: module.id, lessonId: lesson.id })}
            className="cursor-pointer rounded-2xl bg-white p-3 text-left font-extrabold transition-colors hover:bg-lemonPop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop clay-soft"
          >
            <span className="text-xs uppercase tracking-[.12em] text-indigoPop">{track.label} · {lesson.durationMin} min</span>
            <span className="mt-1 block">{lesson.title[locale]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityLog({ locale, activity }) {
  return (
    <div className="rounded-[24px] bg-cloud p-4 clay-soft">
      <p className="font-display text-2xl font-bold">{locale === "fr" ? "Journal récent" : "Recent activity"}</p>
      <div className="mt-4 grid gap-3">
        {activity.length === 0 && (
          <p className="rounded-2xl bg-white p-3 font-extrabold text-ink/60">
            {locale === "fr" ? "Valide une leçon pour remplir ce journal." : "Pass a lesson to fill this log."}
          </p>
        )}
        {activity.map((item) => (
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 font-extrabold clay-soft" key={`${item.id}-${item.at}`}>
            <span>{item.title?.[locale] || item.id}</span>
            <span className="rounded-xl bg-lemonPop px-2 py-1 text-xs">{item.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseChapter({ course, theory, locale }) {
  if (!course) return null;
  const content = course[locale] || course.en;
  const reminder = theory?.[locale] || theory?.en;

  return (
    <article className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-indigoPop">{locale === "fr" ? "Cours" : "Lesson"}</p>
        <h4 className="mt-2 font-display text-2xl font-bold text-ink">{locale === "fr" ? "Comprendre avant de pratiquer" : "Understand before practicing"}</h4>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">{content.introduction}</p>
      </header>

      <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-8">
          {content.sections.map((section, index) => (
            <section key={section.title}>
              <div className="flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-indigoPop text-xs font-bold text-white">{index + 1}</span>
                <div>
                  <h5 className="font-display text-xl font-bold text-ink">{section.title}</h5>
                  <div className="mt-3 grid gap-3">
                    {section.paragraphs.map((paragraph) => <p className="leading-7 text-slate-600" key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.example && <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-6 text-indigo-100">{section.example}</pre>}
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="grid content-start gap-4">
          {content.vocabulary?.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h5 className="font-display text-lg font-bold">{locale === "fr" ? "Vocabulaire" : "Vocabulary"}</h5>
              <dl className="mt-3 grid gap-3">
                {content.vocabulary.map(([term, definition]) => <div key={term}><dt className="text-sm font-bold text-indigoPop">{term}</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{definition}</dd></div>)}
              </dl>
            </section>
          )}
          <section className="rounded-xl border border-green-200 bg-green-50 p-4">
            <h5 className="font-display text-lg font-bold text-green-900">{locale === "fr" ? "Avant de pratiquer" : "Before practicing"}</h5>
            <ul className="mt-3 grid gap-2">
              {content.check.map((item) => <li className="flex gap-2 text-sm leading-6 text-green-800" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0" />{item}</li>)}
            </ul>
          </section>
          {reminder?.points?.length > 0 && (
            <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <h5 className="font-display text-lg font-bold text-indigo-950">{locale === "fr" ? "À retenir" : "Key takeaways"}</h5>
              <ul className="mt-3 grid gap-2">
                {reminder.points.map((point) => <li className="flex gap-2 text-sm leading-6 text-indigo-900" key={point}><Sparkles className="mt-1 size-4 shrink-0" />{point}</li>)}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </article>
  );
}

function PedagogyWorkshop({ pedagogy, locale }) {
  if (!pedagogy) return null;
  const content = pedagogy[locale] || pedagogy.fr;
  if (!content) return null;

  return (
    <section className="mt-5 grid gap-4">
      <details className="rounded-xl border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Préparer la pratique : prérequis et objectifs" : "Prepare for practice: prerequisites and objectives"}</summary>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Prérequis" : "Prerequisites"}</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {content.prerequisites.map((item) => <li className="flex gap-2" key={item}><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Objectifs précis" : "Precise objectives"}</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {content.objectives.map((item) => <li className="flex gap-2" key={item}><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigoPop" />{item}</li>)}
            </ul>
          </article>
        </div>
      </details>

      <details className="rounded-xl border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Comparer bonne et mauvaise pratique" : "Compare good and bad practice"}</summary>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <ComparisonCard title={locale === "fr" ? "Bonne pratique" : "Good practice"} item={content.comparison.good} tone="good" />
          <ComparisonCard title={locale === "fr" ? "À éviter" : "Avoid this"} item={content.comparison.bad} tone="bad" />
        </div>
      </details>

      <article className="rounded-xl border border-green-200 bg-green-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[.12em] text-green-700">{locale === "fr" ? "Pratique guidée" : "Guided practice"}</p>
        <h5 className="mt-2 font-display text-xl font-bold text-green-950">{locale === "fr" ? "Construis une première version avec ces étapes" : "Build a first version with these steps"}</h5>
        <ol className="mt-4 grid gap-3">
          {content.guided.map((step, index) => <li className="flex gap-3 text-sm leading-6 text-green-900" key={step}><span className="grid size-6 shrink-0 place-items-center rounded-full bg-green-700 text-xs font-bold text-white">{index + 1}</span>{step}</li>)}
        </ol>
      </article>

      <article className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[.12em] text-amber-800">{locale === "fr" ? "Défi autonome complémentaire" : "Additional independent challenge"}</p>
        <p className="mt-2 leading-7 text-amber-950">{content.autonomous}</p>
      </article>
    </section>
  );
}

function ComparisonCard({ title, item, tone }) {
  const good = tone === "good";
  return (
    <article className={`overflow-hidden rounded-xl border ${good ? "border-green-200" : "border-red-200"}`}>
      <header className={`px-4 py-3 text-sm font-bold ${good ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{title} : {item.title}</header>
      <pre className="overflow-x-auto bg-ink p-4 font-mono text-xs leading-6 text-indigo-100">{item.code}</pre>
      <p className="border-t border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">{item.explanation}</p>
    </article>
  );
}

function ProgressiveHints({ pedagogy, fallback, level, locale }) {
  if (level < 1) return null;
  const hints = pedagogy?.[locale]?.hints || pedagogy?.fr?.hints || [fallback?.[locale] || fallback?.en];
  return (
    <section className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h5 className="font-display text-lg font-bold text-amber-950">{locale === "fr" ? "Indices débloqués progressivement" : "Progressive hints"}</h5>
      <ol className="mt-3 grid gap-2">
        {hints.slice(0, level).map((hint, index) => <li className="flex gap-3 text-sm leading-6 text-amber-900" key={hint}><span className="font-bold">{index + 1}.</span>{hint}</li>)}
      </ol>
    </section>
  );
}

function ExplainedCorrection({ lesson, locale, onLoadSolution }) {
  const pedagogy = lesson.pedagogy?.[locale] || lesson.pedagogy?.fr;
  return (
    <details className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5" open>
      <summary className="cursor-pointer font-display text-xl font-bold text-indigo-950">{locale === "fr" ? "Correction expliquée" : "Explained correction"}</summary>
      {pedagogy && (
        <>
          <ol className="mt-4 grid gap-2">
            {pedagogy.correction.map((item, index) => <li className="flex gap-3 text-sm leading-6 text-indigo-900" key={item}><span className="font-bold">{index + 1}.</span>{item}</li>)}
          </ol>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-indigo-700">{locale === "fr" ? "Synthèse" : "Summary"}</p><p className="mt-2 text-sm leading-6 text-slate-700">{pedagogy.summary}</p></div>
            <div className="rounded-lg bg-white p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-indigo-700">{locale === "fr" ? "Ensuite" : "Next"}</p><p className="mt-2 text-sm leading-6 text-slate-700">{pedagogy.next}</p></div>
          </div>
        </>
      )}
      <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-6 text-indigo-100">{lesson.solution}</pre>
      <button type="button" onClick={onLoadSolution} className="secondary-button mt-4 min-h-10 py-2 text-sm">{locale === "fr" ? "Charger cette solution dans l'éditeur" : "Load this solution in the editor"}</button>
    </details>
  );
}

function LessonGuide({ guide, locale }) {
  if (!guide) return null;
  const localized = guide[locale] || guide.en;
  const sections = [
    { title: locale === "fr" ? "Objectifs" : "Objectives", items: localized.objectives, tone: "bg-indigo-50 text-indigo-700" },
    { title: locale === "fr" ? "Méthode" : "Method", items: localized.steps, tone: "bg-green-50 text-green-700" },
    { title: locale === "fr" ? "Erreurs fréquentes" : "Common mistakes", items: localized.mistakes, tone: "bg-amber-50 text-amber-800" }
  ];

  return (
    <section className="mt-4 grid gap-3 lg:grid-cols-3" aria-label={locale === "fr" ? "Guide de leçon" : "Lesson guide"}>
      {sections.map((section) => (
        <article className="rounded-xl border border-slate-200 bg-white p-4" key={section.title}>
          <h4 className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-[.08em] ${section.tone}`}>{section.title}</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
            {section.items.map((item, index) => <li className="flex gap-2" key={item}><span className="font-bold text-slate-600">{index + 1}.</span><span>{item}</span></li>)}
          </ol>
        </article>
      ))}
    </section>
  );
}

function ProjectRubric({ lesson, locale }) {
  const rubric = lesson.rubric?.[locale] || lesson.rubric?.en || [
    "Pass every required test.",
    "Keep the code readable.",
    "Use semantic names and structure."
  ];

  return (
    <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
      <p className="font-display text-xl font-bold">{locale === "fr" ? "Rubrique de validation" : "Validation rubric"}</p>
      <ul className="mt-3 grid gap-2">
        {rubric.map((item) => (
          <li className="flex gap-2 text-sm font-semibold text-slate-700" key={item}>
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuizWorkspace({ activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onQuizResult, onNext, hasNext }) {
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

  return (
    <section className="surface text-ink">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">quiz</span>
        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{lesson.xp} XP</span>
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
      <h3 className="mt-4 font-display text-4xl font-bold">{lesson.title[locale]}</h3>
      <p className="mt-3 max-w-3xl text-lg font-bold leading-8 text-ink/70">{lesson.brief[locale]}</p>
      <SkillChips skills={lesson.skills} />
      <CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} />
      <PedagogyWorkshop pedagogy={lesson.pedagogy} locale={locale} />
      <div className="muted-surface mt-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-indigoPop">{locale === "fr" ? "Question" : "Question"} {draft.currentIndex + 1}/{quiz.questions.length}</p>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigoPop" style={{ width: `${((draft.currentIndex + 1) / quiz.questions.length) * 100}%` }} /></div>
        </div>
        <p className="mt-4 font-display text-2xl font-bold">{localize(question.prompt, locale)}</p>
        {question.code && <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-indigo-100"><code>{question.code}</code></pre>}
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
        <button
          type="button"
          disabled={!canValidate}
          onClick={validateCurrent}
          className="primary-button mt-5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="size-5" />
          {locale === "fr" ? "Valider" : "Check"}
        </button>
        {questionFeedback && draft.currentIndex < quiz.questions.length - 1 && (
          <button type="button" onClick={() => setDraft((current) => ({ ...current, currentIndex: current.currentIndex + 1 }))} className="secondary-button ml-3 mt-5">
            {locale === "fr" ? "Question suivante" : "Next question"}
          </button>
        )}
      </div>
      {questionFeedback && (
        <div className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${questionFeedback.correct ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`} role="status">
          {questionFeedback.correct ? <CheckCircle2 className="mb-2 size-6 text-green-700" /> : <XCircle className="mb-2 size-6 text-red-700" />}
          {localize(question.explanation, locale)}
        </div>
      )}
      {finalScore && <div className={`mt-5 rounded-xl border p-4 font-bold ${finalScore.passed ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}>{locale === "fr" ? `Score final : ${finalScore.percent} %` : `Final score: ${finalScore.percent}%`}</div>}
      {finalScore?.passed && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
      <NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} />
    </section>
  );
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

function SkillChips({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigoPop" key={skill}>
          {skill}
        </span>
      ))}
    </div>
  );
}

function NotesPanel({ lessonId, locale, note, setNote }) {
  const [saved, setSaved] = useState(false);

  return (
    <details className="rounded-xl border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer font-display text-lg font-bold">{locale === "fr" ? "Notes personnelles" : "Personal notes"}</summary>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(`pulsateach-note-${lessonId}`, note);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 1600);
          }}
          className="primary-button min-h-10 px-3 py-2 text-sm"
        >
          <Save className="size-4" />
          {saved ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Sauver" : "Save")}
        </button>
      </div>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder={locale === "fr" ? "Écris ce que tu veux retenir..." : "Write what you want to remember..."}
        className="mt-3 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm font-semibold text-ink outline-none focus:border-indigoPop"
      />
    </details>
  );
}

function difficultyLabel(difficulty, locale) {
  const labels = {
    quick: { fr: "Rapide", en: "Quick" },
    starter: { fr: "Départ", en: "Starter" },
    core: { fr: "Essentiel", en: "Core" },
    stretch: { fr: "Défi", en: "Stretch" },
    project: { fr: "Projet", en: "Project" }
  };
  return labels[difficulty]?.[locale] || difficulty;
}

function CompletionBanner({ locale, onNext, hasNext }) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
      <span>{locale === "fr" ? "C'est validé. XP ajouté à ta progression." : "Passed. XP has been added to your progress."}</span>
      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          className="primary-button"
        >
          {locale === "fr" ? "Leçon suivante" : "Next lesson"}
        </button>
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigoPop"
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}

function getNextLesson(track, moduleId, lessonId) {
  const flat = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })));
  const index = flat.findIndex((item) => item.moduleId === moduleId && item.lessonId === lessonId);
  return index >= 0 ? flat[index + 1] : null;
}

function readLessonRoute() {
  const fallbackTrack = learningTracks[0];
  const fallbackModule = fallbackTrack.modules[0];
  const fallback = {
    trackId: fallbackTrack.id,
    moduleId: fallbackModule.id,
    lessonId: fallbackModule.lessons[0].id
  };

  const cleanMatch = window.location.pathname.match(/^\/learn\/([^/]+)\/([^/]+)\/([^/]+)\/?$/);
  const legacyMatch = window.location.hash.match(/^#\/?learn\/([^/]+)\/([^/]+)\/([^/]+)$/);
  const match = cleanMatch || legacyMatch;
  if (!match) return fallback;

  const [, trackId, moduleId, lessonId] = match;
  return { trackId, moduleId, lessonId };
}

function copyLessonLink() {
  navigator.clipboard?.writeText(window.location.href);
}

function isVisibleLesson(lesson, progress, bookmarks, query, filter, locale) {
  const isDone = Boolean(progress.completed[lesson.id]);
  if (filter === "todo" && isDone) return false;
  if (filter === "done" && !isDone) return false;
  if (filter === "saved" && !bookmarks.includes(lesson.id)) return false;

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [lesson.title?.[locale], lesson.title?.en, lesson.brief?.[locale], lesson.brief?.en, lesson.id, lesson.type]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
}

function filterLabel(filter, locale) {
  const labels = {
    all: { fr: "Tout", en: "All" },
    todo: { fr: "À faire", en: "Todo" },
    done: { fr: "Validé", en: "Done" }
    ,
    saved: { fr: "Favoris", en: "Saved" }
  };
  return labels[filter][locale];
}

function readStoredJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.en || value.fr || "";
  return String(value || "");
}

function hasResponse(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0 && Object.values(value).every(Boolean);
  return String(value ?? "").trim().length > 0;
}

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(bookmarksKey)) || [];
  } catch {
    return [];
  }
}

function readProgress() {
  try {
    return { ...createEmptyProgress(), ...JSON.parse(localStorage.getItem(progressKey)) };
  } catch {
    return createEmptyProgress();
  }
}

function createEmptyProgress() {
  return { xp: 0, completed: {}, activity: [], streak: { count: 0, lastDate: null } };
}

function markLessonCompleted(progress, lesson, passedCount, now = new Date()) {
  const alreadyCompleted = Boolean(progress.completed?.[lesson.id]);
  const completed = {
    ...(progress.completed || {}),
    [lesson.id]: {
      passedAt: now.toISOString(),
      xp: Number(lesson.xp || 0),
      passedTests: Number(passedCount || 0)
    }
  };

  return {
    ...progress,
    xp: Number(progress.xp || 0) + (alreadyCompleted ? 0 : Number(lesson.xp || 0)),
    completed,
    activity: alreadyCompleted
      ? progress.activity || []
      : [
          {
            id: lesson.id,
            title: lesson.title,
            type: lesson.type,
            xp: Number(lesson.xp || 0),
            at: now.toISOString()
          },
          ...(progress.activity || [])
        ].slice(0, 8),
    streak: updateStreak(progress.streak)
  };
}

function updateStreak(current = { count: 0, lastDate: null }) {
  const today = new Date().toISOString().slice(0, 10);
  if (current.lastDate === today) return current;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return {
    count: current.lastDate === yesterday ? current.count + 1 : 1,
    lastDate: today
  };
}

function mergeProgress(local, remote) {
  const completed = { ...local.completed, ...remote.completed };
  const activity = [...(remote.activity || []), ...(local.activity || [])]
    .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id && candidate.at === item.at) === index)
    .slice(0, 8);

  return {
    ...createEmptyProgress(),
    ...local,
    ...remote,
    xp: Math.max(local.xp || 0, remote.xp || 0),
    completed,
    activity,
    streak: remote.streak || local.streak || createEmptyProgress().streak,
    review: {
      ...(local.review || {}),
      ...(remote.review || {}),
      items: {
        ...(local.review?.items || {}),
        ...(remote.review?.items || {})
      }
    },
    quizEvidence: {
      ...(local.quizEvidence || {}),
      ...(remote.quizEvidence || {})
    }
  };
}
