import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  Eye,
  Lightbulb,
  Play,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Terminal,
  Trash2,
  Upload,
  XCircle
} from "lucide-react";
import { learningTracks } from "./learningContent.js";
import { getUserId, loadRemoteProgress, recordAttempt, saveRemoteProgress } from "./apiClient.js";

const progressKey = "pulsateach-learning-progress";
const bookmarksKey = "pulsateach-learning-bookmarks";

const colorClasses = {
  html: {
    card: "bg-orange-100",
    button: "bg-orangePop",
    text: "text-orangePop"
  },
  css: {
    card: "bg-cyan-100",
    button: "bg-aquaPop",
    text: "text-aquaPop"
  },
  javascript: {
    card: "bg-green-100",
    button: "bg-mintPop",
    text: "text-mintPop"
  }
};

export default function InteractiveLearning({ locale }) {
  const initialRoute = readLessonRoute();
  const [activeTrackId, setActiveTrackId] = useState(initialRoute.trackId);
  const [activeModuleId, setActiveModuleId] = useState(initialRoute.moduleId);
  const [activeLessonId, setActiveLessonId] = useState(initialRoute.lessonId);
  const [progress, setProgress] = useState(() => readProgress());
  const [bookmarks, setBookmarks] = useState(() => readBookmarks());
  const [lessonQuery, setLessonQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [syncState, setSyncState] = useState("local");

  const activeTrack = learningTracks.find((track) => track.id === activeTrackId) ?? learningTracks[0];
  const activeModule = activeTrack.modules.find((module) => module.id === activeModuleId) ?? activeTrack.modules[0];
  const activeLesson = activeModule.lessons.find((lesson) => lesson.id === activeLessonId) ?? activeModule.lessons[0];

  useEffect(() => {
    const firstModule = activeTrack.modules[0];
    const hasModule = activeTrack.modules.some((module) => module.id === activeModuleId);
    if (!hasModule) {
      setActiveModuleId(firstModule.id);
      setActiveLessonId(firstModule.lessons[0].id);
    }
  }, [activeModuleId, activeTrack]);

  const completedCount = Object.keys(progress.completed).length;
  const totalLessons = learningTracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);
  const activeTrackCompleted = activeTrack.modules.reduce((sum, module) => sum + module.lessons.filter((lesson) => progress.completed[lesson.id]).length, 0);
  const activeTrackTotal = activeTrack.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const unlockedBadges = getUnlockedBadges(progress, completedCount, totalLessons);

  useEffect(() => {
    window.history.replaceState(null, "", `#/learn/${activeTrackId}/${activeModuleId}/${activeLessonId}`);
  }, [activeTrackId, activeModuleId, activeLessonId]);

  useEffect(() => {
    loadRemoteProgress()
      .then((remote) => {
        if (remote?.completed) {
          const merged = mergeProgress(progress, remote);
          setProgress(merged);
          localStorage.setItem(progressKey, JSON.stringify(merged));
          setSyncState("synced");
        } else {
          setSyncState("local");
        }
      })
      .catch(() => setSyncState("offline"));
  }, []);

  const handleTrackChange = (track) => {
    setActiveTrackId(track.id);
    setActiveModuleId(track.modules[0].id);
    setActiveLessonId(track.modules[0].lessons[0].id);
  };

  const openLesson = ({ trackId, moduleId, lessonId }) => {
    setActiveTrackId(trackId);
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
  };

  const resumeNext = () => {
    const next = findFirstTodo(progress);
    if (next) openLesson(next);
    setTimeout(() => document.getElementById("learn-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const completeLesson = (lesson, passedCount) => {
    const next = {
      ...progress,
      xp: progress.completed[lesson.id] ? progress.xp : progress.xp + lesson.xp,
      streak: updateStreak(progress.streak),
      completed: {
        ...progress.completed,
        [lesson.id]: {
          passedAt: new Date().toISOString(),
          xp: lesson.xp,
          passedTests: passedCount
        }
      }
    };
    if (!progress.completed[lesson.id]) {
      next.activity = [
        {
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          xp: lesson.xp,
          at: new Date().toISOString()
        },
        ...(progress.activity || [])
      ].slice(0, 8);
    }
    setProgress(next);
    localStorage.setItem(progressKey, JSON.stringify(next));
    saveRemoteProgress(next)
      .then(() => setSyncState("synced"))
      .catch(() => setSyncState("offline"));
  };

  const toggleBookmark = (lessonId) => {
    const next = bookmarks.includes(lessonId)
      ? bookmarks.filter((item) => item !== lessonId)
      : [...bookmarks, lessonId];
    setBookmarks(next);
    localStorage.setItem(bookmarksKey, JSON.stringify(next));
  };

  return (
    <FocusedLearningLayout
      locale={locale}
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
      onTrackChange={handleTrackChange}
      onQueryChange={setLessonQuery}
      onFilterChange={setStatusFilter}
      onOpenLesson={(moduleId, lessonId) => {
        setActiveModuleId(moduleId);
        setActiveLessonId(lessonId);
      }}
      onToggleBookmark={() => toggleBookmark(activeLesson.id)}
      onComplete={completeLesson}
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

  /*
  return (
    <section id="learn" className="bg-indigoPop px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="font-display text-lg font-bold text-lemonPop">
              {locale === "fr" ? "Learning Lab interactif" : "Interactive Learning Lab"}
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-normal sm:text-5xl">
              {locale === "fr" ? "Clique un cours, écris du code, lance les tests." : "Click a course, write code, run the tests."}
            </h2>
          </div>
          <div className="clay rounded-[28px] bg-white p-5 text-ink">
            <div className="grid gap-4 sm:grid-cols-3">
              <ProgressKpi icon={BadgeCheck} value={`${completedCount}/${totalLessons}`} label={locale === "fr" ? "leçons validées" : "lessons passed"} />
              <ProgressKpi icon={Save} value={progress.xp} label="XP" />
              <ProgressKpi icon={CheckCircle2} value={levelFromXp(progress.xp)} label={locale === "fr" ? "niveau" : "level"} />
            </div>
            <div className="mt-4 rounded-[18px] bg-cloud p-3 text-sm font-extrabold text-ink/70 clay-soft">
              API: {syncState} · {getUserId()}
            </div>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm font-extrabold text-ink/65">
                <span>{activeTrack.label}</span>
                <span>{activeTrackCompleted}/{activeTrackTotal}</span>
              </div>
              <div className="h-4 rounded-full bg-cloud clay-soft">
                <div className="h-full rounded-full bg-mintPop" style={{ width: `${Math.round((activeTrackCompleted / activeTrackTotal) * 100)}%` }} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] bg-cloud p-4 clay-soft">
              <div>
                <p className="font-display text-xl font-bold">{locale === "fr" ? "Série" : "Streak"}: {progress.streak?.count ?? 0}</p>
                <p className="text-sm font-extrabold text-ink/62">{locale === "fr" ? "Valide une leçon par jour pour la garder." : "Pass one lesson per day to keep it alive."}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const fresh = createEmptyProgress();
                  setProgress(fresh);
                  localStorage.setItem(progressKey, JSON.stringify(fresh));
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
              >
                <Trash2 className="size-4" />
                {locale === "fr" ? "Reset" : "Reset"}
              </button>
              <button
                type="button"
                onClick={resumeNext}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orangePop px-4 py-3 text-sm font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigoPop"
              >
                <Play className="size-4" />
                {locale === "fr" ? "Reprendre" : "Resume"}
              </button>
              <button
                type="button"
                onClick={() => exportProgress(progress)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
              >
                <Download className="size-4" />
                Export
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-orangePop">
                <Upload className="size-4" />
                Import
                <input
                  type="file"
                  accept="application/json"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) importProgress(file, setProgress);
                    event.target.value = "";
                  }}
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {unlockedBadges.map((badge) => (
                <span className="inline-flex items-center gap-2 rounded-xl bg-lemonPop px-3 py-2 text-xs font-extrabold clay-soft" key={badge}>
                  <Sparkles className="size-4 text-orangePop" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <MasteryDashboard locale={locale} progress={progress} onOpenLesson={openLesson} />

        <div className="grid gap-4 lg:grid-cols-3">
          {learningTracks.map((track) => (
            <button
              type="button"
              key={track.id}
              onClick={() => handleTrackChange(track)}
              className={`cursor-pointer rounded-[28px] p-5 text-left text-ink transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemonPop focus-visible:ring-offset-4 focus-visible:ring-offset-indigoPop clay ${activeTrackId === track.id ? "bg-lemonPop" : colorClasses[track.id].card}`}
            >
              <span className={`inline-flex rounded-2xl px-4 py-2 text-sm font-extrabold text-white clay-soft ${colorClasses[track.id].button}`}>
                {track.label}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold">{track.title[locale]}</h3>
              <p className="mt-2 font-bold leading-7 text-ink/70">{track.summary[locale]}</p>
            </button>
          ))}
        </div>

        <MissionBoard
          locale={locale}
          progress={progress}
          onOpenLesson={({ trackId, moduleId, lessonId }) => {
            openLesson({ trackId, moduleId, lessonId });
            setTimeout(() => document.getElementById("learn-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
        />

        <div id="learn-workspace" className="mt-8 grid gap-6 scroll-mt-28 xl:grid-cols-[.55fr_1.45fr]">
          <aside className="clay rounded-[30px] bg-white p-5 text-ink">
            <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Plan du parcours" : "Track plan"}</h3>
            <div className="mt-5 grid gap-3">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-indigoPop" />
                <input
                  type="search"
                  value={lessonQuery}
                  onChange={(event) => setLessonQuery(event.target.value)}
                  placeholder={locale === "fr" ? "Chercher une leçon" : "Search lessons"}
                  className="min-h-12 w-full rounded-2xl border-[3px] border-ink bg-cloud pl-12 pr-4 font-extrabold outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
                />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["all", "todo", "done", "saved"].map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`cursor-pointer rounded-2xl px-2 py-2 text-sm font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop ${statusFilter === filter ? "bg-indigoPop text-white" : "bg-cloud text-ink"}`}
                  >
                    {filterLabel(filter, locale)}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {activeTrack.modules.map((module) => (
                <div className="rounded-[22px] bg-cloud p-4 clay-soft" key={module.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setActiveLessonId(module.lessons[0].id);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
                  >
                    <span className="font-display text-xl font-bold">{module.title[locale]}</span>
                    <span className="text-xs font-extrabold text-indigoPop">{module.lessons.length}</span>
                  </button>
                  <div className="mt-3 space-y-2">
                    {module.lessons.filter((lesson) => isVisibleLesson(lesson, progress, bookmarks, lessonQuery, statusFilter, locale)).map((lesson) => {
                      const isActive = lesson.id === activeLesson.id;
                      const isDone = Boolean(progress.completed[lesson.id]);
                      const isSaved = bookmarks.includes(lesson.id);
                      return (
                        <button
                          type="button"
                          className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl px-3 py-3 text-left font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop ${isActive ? "bg-indigoPop text-white" : "bg-white text-ink hover:bg-lemonPop"}`}
                          key={lesson.id}
                          onClick={() => {
                            setActiveModuleId(module.id);
                            setActiveLessonId(lesson.id);
                          }}
                        >
                          {isDone ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" /> : <Code2 className="mt-0.5 size-5 shrink-0" />}
                          <span>{lesson.title[locale]}</span>
                          {isSaved && <BookmarkCheck className="ml-auto mt-0.5 size-5 shrink-0 text-orangePop" />}
                        </button>
                      );
                    })}
                    {module.lessons.filter((lesson) => isVisibleLesson(lesson, progress, bookmarks, lessonQuery, statusFilter, locale)).length === 0 && (
                      <p className="rounded-2xl bg-white p-3 text-sm font-extrabold text-ink/55">
                        {locale === "fr" ? "Aucune leçon ici." : "No lessons here."}
                      </p>
                    )}
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
            onToggleBookmark={() => toggleBookmark(activeLesson.id)}
            onComplete={completeLesson}
            onNext={() => {
              const next = getNextLesson(activeTrack, activeModule.id, activeLesson.id);
              if (next) {
                setActiveModuleId(next.moduleId);
                setActiveLessonId(next.lessonId);
              }
            }}
            hasNext={Boolean(getNextLesson(activeTrack, activeModule.id, activeLesson.id))}
          />
        </div>
      </div>
    </section>
  );
  */
}

function FocusedLearningLayout({
  locale,
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
  onTrackChange,
  onQueryChange,
  onFilterChange,
  onOpenLesson,
  onToggleBookmark,
  onComplete,
  onNext,
  hasNext
}) {
  return (
    <section id="learn" className="min-h-screen bg-slate-100 px-3 pb-5 pt-24 sm:px-5">
      <div className="mx-auto max-w-[1800px]">
        <header className="mb-3 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <a href="#/catalog" className="hover:text-indigoPop">{locale === "fr" ? "Formations" : "Courses"}</a>
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

        <div className="grid gap-3 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-24">
            <div className="grid grid-cols-3 gap-1">
              {learningTracks.map((track) => (
                <button key={track.id} type="button" onClick={() => onTrackChange(track)} className={`rounded-lg px-2 py-2 text-xs font-bold ${activeTrackId === track.id ? "bg-indigoPop text-white" : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigoPop"}`}>{track.label}</button>
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
                  <div className="mb-1 flex items-center justify-between px-2"><h2 className="text-xs font-bold uppercase tracking-[.1em] text-slate-400">{module.title[locale]}</h2><span className="text-xs text-slate-400">{module.lessons.length}</span></div>
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

function LessonWorkspace({ activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onComplete, onNext, hasNext }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`pulsateach-code-${lesson.id}`);
    setCode(saved || lesson.starterCode);
    setResult(null);
    setShowHint(false);
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

  const runTests = () => {
    const checks = validateLesson(lesson, code);
    setResult(checks);
    recordAttempt({
      lessonId: lesson.id,
      trackId: activeTrack.id,
      moduleId: activeModule.id,
      passed: checks.filter((check) => check.pass).length,
      total: checks.length
    }).catch(() => {});
    if (checks.every((check) => check.pass)) {
      onComplete(lesson, checks.length);
    }
  };

  const runCode = () => {
    setConsoleOutput(runJavaScriptWithConsole(code));
  };

  const passed = result?.filter((check) => check.pass).length ?? 0;

  if (lesson.type === "quiz") {
    return <QuizWorkspace activeTrack={activeTrack} activeModule={activeModule} lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} onComplete={onComplete} onNext={onNext} hasNext={hasNext} />;
  }

  return (
    <section className="focused-workspace min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-ink shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-2xl bg-indigoPop px-4 py-2 text-sm font-extrabold text-white clay-soft">{lesson.type}</span>
            <span className="rounded-2xl bg-lemonPop px-4 py-2 text-sm font-extrabold clay-soft">{lesson.xp} XP</span>
            <span className="rounded-2xl bg-cloud px-4 py-2 text-sm font-extrabold text-ink clay-soft">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
            {isCompleted && <span className="rounded-2xl bg-mintPop px-4 py-2 text-sm font-extrabold text-white clay-soft">{locale === "fr" ? "Validé" : "Passed"}</span>}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold">{lesson.title[locale]}</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">{lesson.brief[locale]}</p>
          <SkillChips skills={lesson.skills} />
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={() => setShowHint((value) => !value)} icon={Lightbulb}>
            {locale === "fr" ? "Indice" : "Hint"}
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
          <ActionButton onClick={() => setCode(lesson.solution)} icon={Eye}>
            {locale === "fr" ? "Solution" : "Solution"}
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

      {showHint && (
        <div className="mt-5 rounded-[22px] bg-lemonPop p-4 font-extrabold clay-soft">
          {lesson.hint[locale]}
        </div>
      )}
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <TheoryCard theory={lesson.theory} locale={locale} />
        <NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} />
      </div>
      {lesson.type === "project" && <ProjectRubric lesson={lesson} locale={locale} />}
      {result?.every((check) => check.pass) && (
        <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />
      )}

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-ink">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
            <span className="font-mono text-sm font-bold text-slate-300">{lesson.id}.{lesson.type === "css" ? "css" : lesson.type === "js" ? "js" : "html"}</span>
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
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
                  <span>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

function TheoryCard({ theory, locale }) {
  if (!theory) return null;
  const localized = theory[locale] || theory.en;

  return (
    <details className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <summary className="cursor-pointer font-display text-lg font-bold">{locale === "fr" ? "Rappel de cours" : "Lesson notes"}</summary>
      <ul className="mt-3 grid gap-2">
        {localized.points.map((point) => (
          <li className="flex gap-2 text-sm font-semibold leading-6 text-slate-600" key={point}>
            <Sparkles className="mt-1 size-4 shrink-0 text-indigoPop" />
            {point}
          </li>
        ))}
      </ul>
      {localized.example && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-ink p-3 font-mono text-xs text-indigo-100">{localized.example}</pre>
      )}
    </details>
  );
}

function ProjectRubric({ lesson, locale }) {
  const rubric = lesson.rubric?.[locale] || lesson.rubric?.en || [
    "Pass every required test.",
    "Keep the code readable.",
    "Use semantic names and structure."
  ];

  return (
    <div className="mt-5 rounded-[22px] bg-orange-100 p-4 clay-soft">
      <p className="font-display text-2xl font-bold">{locale === "fr" ? "Rubrique de validation" : "Validation rubric"}</p>
      <ul className="mt-3 grid gap-2">
        {rubric.map((item) => (
          <li className="flex gap-2 font-extrabold text-ink/72" key={item}>
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuizWorkspace({ activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onComplete, onNext, hasNext }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");
  const isCorrect = selected === lesson.answer;

  useEffect(() => {
    setNote(localStorage.getItem(`pulsateach-note-${lesson.id}`) || "");
  }, [lesson.id]);

  return (
    <section className="clay rounded-[30px] bg-white p-5 text-ink">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-2xl bg-indigoPop px-4 py-2 text-sm font-extrabold text-white clay-soft">quiz</span>
        <span className="rounded-2xl bg-lemonPop px-4 py-2 text-sm font-extrabold clay-soft">{lesson.xp} XP</span>
        <span className="rounded-2xl bg-cloud px-4 py-2 text-sm font-extrabold text-ink clay-soft">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
        {isCompleted && <span className="rounded-2xl bg-mintPop px-4 py-2 text-sm font-extrabold text-white clay-soft">{locale === "fr" ? "Validé" : "Passed"}</span>}
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
      <div className="mt-6 rounded-[24px] bg-cloud p-5 clay-soft">
        <p className="font-display text-2xl font-bold">{lesson.question[locale]}</p>
        <div className="mt-5 grid gap-3">
          {lesson.options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => {
                setSelected(option.id);
                setChecked(false);
              }}
              className={`cursor-pointer rounded-2xl p-4 text-left font-extrabold transition-colors clay-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop ${selected === option.id ? "bg-lemonPop" : "bg-white hover:bg-orange-100"}`}
            >
              {option.label[locale]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setChecked(true);
            recordAttempt({
              lessonId: lesson.id,
              trackId: activeTrack.id,
              moduleId: activeModule.id,
              passed: isCorrect ? 1 : 0,
              total: 1
            }).catch(() => {});
            if (isCorrect) onComplete(lesson, 1);
          }}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orangePop px-5 py-3 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigoPop focus-visible:ring-offset-4"
        >
          <Play className="size-5" />
          {locale === "fr" ? "Valider" : "Check"}
        </button>
      </div>
      {checked && (
        <div className={`mt-5 rounded-[22px] p-4 font-extrabold clay-soft ${isCorrect ? "bg-green-100 text-ink" : "bg-rose-100 text-ink"}`}>
          {isCorrect ? <CheckCircle2 className="mb-2 size-6 text-mintPop" /> : <XCircle className="mb-2 size-6 text-rosePop" />}
          {lesson.explanation[locale]}
        </div>
      )}
      {checked && isCorrect && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
      <NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} />
    </section>
  );
}

function SkillChips({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span className="rounded-xl bg-cloud px-3 py-2 text-xs font-extrabold text-indigoPop clay-soft" key={skill}>
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
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigoPop px-3 py-2 text-sm font-bold text-white"
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
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-green-100 p-4 font-extrabold text-ink clay-soft">
      <span>{locale === "fr" ? "C'est validé. XP ajouté à ta progression." : "Passed. XP has been added to your progress."}</span>
      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          className="cursor-pointer rounded-2xl bg-indigoPop px-5 py-3 text-white shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
        >
          {locale === "fr" ? "Leçon suivante" : "Next lesson"}
        </button>
      )}
    </div>
  );
}

function ProgressKpi({ icon: Icon, value, label }) {
  return (
    <div className="rounded-[22px] bg-cloud p-4 clay-soft">
      <Icon className="mb-3 size-6 text-indigoPop" />
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-sm font-extrabold text-ink/62">{label}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigoPop"
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}

function createPreview(lesson, code) {
  const kind = getPreviewKind(lesson);

  if (kind === "css") {
    return `<!doctype html><html><head><style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #172033; }
      .demo-surface { padding: 24px; }
      .panel { margin-bottom: 20px; }
      .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; margin: 8px; padding: 16px; font-weight: 700; }
      .toolbar button { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; background: white; font-weight: 700; }
      .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 20px; }
      .gallery span { display: block; min-height: 70px; border-radius: 10px; border: 1px solid #cbd5e1; background: #e0e7ff; }
      ${code}
    </style></head><body>${lesson.previewHtml || defaultCssPreview()}</body></html>`;
  }

  if (kind === "dom") {
    return `<!doctype html><html><head><style>
      body { font-family: system-ui, sans-serif; padding: 24px; background: #f8fafc; color: #172033; }
      button { border: 0; border-radius: 8px; background: #4f46e5; color: white; padding: 12px 18px; font-weight: 700; }
      span { display: inline-grid; place-items: center; min-width: 56px; margin-left: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; padding: 12px; font-weight: 700; }
    </style></head><body>${code}</body></html>`;
  }

  if (kind === "html") return createHtmlPreview(code);

  return createJavaScriptPreview();
}

function getPreviewKind(lesson) {
  if (lesson.type === "css" || lesson.id.startsWith("css-")) return "css";
  if (lesson.type === "dom") return "dom";
  if (lesson.type === "js" || lesson.id.startsWith("js-")) return "javascript";
  return "html";
}

function createHtmlPreview(code) {
  const hasBody = /<body[\s>]/i.test(code);
  const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyIsEmpty = hasBody && !bodyMatch?.[1]?.trim();
  const helper = `<style>
    html { font-family: system-ui, sans-serif; color: #172033; }
    body { margin: 0; min-height: 100vh; }
    .pulsateach-empty-preview { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; background: #f8fafc; color: #64748b; text-align: center; }
    .pulsateach-empty-preview strong { display: block; margin-bottom: 8px; color: #172033; }
  </style>`;
  const emptyState = `<div class="pulsateach-empty-preview"><p><strong>Body vide</strong>Ajoute un élément visible dans &lt;body&gt; pour le voir ici.</p></div>`;

  let preview = code.trim() || "<!doctype html><html><head></head><body></body></html>";
  preview = /<\/head>/i.test(preview) ? preview.replace(/<\/head>/i, `${helper}</head>`) : `${helper}${preview}`;
  if (bodyIsEmpty) preview = preview.replace(/<body([^>]*)>\s*<\/body>/i, `<body$1>${emptyState}</body>`);
  if (!hasBody) preview = `${helper}<body>${preview}</body>`;
  return preview;
}

function defaultCssPreview() {
  return `<main class="demo-surface">
    <section class="panel">
      <article class="card course-card">HTML Quest</article>
      <article class="card course-card">CSS Lab</article>
      <article class="card course-card">JS Arena</article>
    </section>
    <div class="toolbar"><button>Run</button><button>Hint</button><button>Ship</button></div>
    <div class="gallery"><span></span><span></span><span></span><span></span></div>
  </main>`;
}

function createJavaScriptPreview() {
  return "<!doctype html><html><body></body></html>";
}

function validateLesson(lesson, code) {
  return lesson.tests.map((item) => {
    let pass = false;
    if (item.type === "contains" || item.type === "doctype") {
      pass = normalize(code).includes(normalize(item.value));
    }
    if (item.type === "notContains") {
      pass = !normalize(code).includes(normalize(item.value));
    }
    if (item.type === "selector" || item.type === "minSelector") {
      pass = checkSelector(code, item.value, item.amount || 1);
    }
    if (item.type === "jsExpression") {
      pass = runJavaScriptExpression(code, item.value);
    }
    if (item.type === "cssDeclaration") {
      pass = hasCssDeclaration(code, item.value.selector, item.value.property);
    }
    return { ...item, pass };
  });
}

function hasCssDeclaration(code, selector, property) {
  if (selector === "@media") return normalize(code).includes(normalize(property));
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped}\\s*\\{[^}]*${property}\\s*:`, "i");
  return pattern.test(code);
}

function runJavaScriptExpression(code, expression) {
  try {
    return Boolean(new Function(`${code}\n${expression}`)());
  } catch {
    return false;
  }
}

function runJavaScriptWithConsole(code) {
  const logs = [];
  const fakeConsole = {
    log: (...items) => logs.push(items.map(stringifyConsoleValue).join(" "))
  };

  try {
    new Function("console", "localStorage", `${code}`)(fakeConsole, localStorage);
    return logs.length ? logs.join("\n") : "No console output.";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function stringifyConsoleValue(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function getNextLesson(track, moduleId, lessonId) {
  const flat = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })));
  const index = flat.findIndex((item) => item.moduleId === moduleId && item.lessonId === lessonId);
  return index >= 0 ? flat[index + 1] : null;
}

function findFirstTodo(progress) {
  for (const track of learningTracks) {
    for (const module of track.modules) {
      for (const lesson of module.lessons) {
        if (!progress.completed[lesson.id]) {
          return { trackId: track.id, moduleId: module.id, lessonId: lesson.id };
        }
      }
    }
  }
  const firstTrack = learningTracks[0];
  const firstModule = firstTrack.modules[0];
  return { trackId: firstTrack.id, moduleId: firstModule.id, lessonId: firstModule.lessons[0].id };
}

function readLessonRoute() {
  const fallbackTrack = learningTracks[0];
  const fallbackModule = fallbackTrack.modules[0];
  const fallback = {
    trackId: fallbackTrack.id,
    moduleId: fallbackModule.id,
    lessonId: fallbackModule.lessons[0].id
  };

  const match = window.location.hash.match(/^#\/?learn\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (!match) return fallback;

  const [, trackId, moduleId, lessonId] = match;
  const track = learningTracks.find((item) => item.id === trackId);
  const module = track?.modules.find((item) => item.id === moduleId);
  const lesson = module?.lessons.find((item) => item.id === lessonId);

  return track && module && lesson ? { trackId, moduleId, lessonId } : fallback;
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

function exportProgress(progress) {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), progress }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "pulsateach-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importProgress(file, setProgress) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const imported = parsed.progress || parsed;
      const next = { ...createEmptyProgress(), ...imported };
      setProgress(next);
      localStorage.setItem(progressKey, JSON.stringify(next));
    } catch {
      window.alert("Invalid PulsaTeach progress file.");
    }
  };
  reader.readAsText(file);
}

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(bookmarksKey)) || [];
  } catch {
    return [];
  }
}

function checkSelector(code, selector, minimum) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "text/html");
    return doc.querySelectorAll(selector).length >= minimum;
  } catch {
    return false;
  }
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
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
    streak: remote.streak || local.streak || createEmptyProgress().streak
  };
}

function getUnlockedBadges(progress, completedCount, totalLessons) {
  const badges = [];
  if (completedCount >= 1) badges.push("first-pass");
  if (completedCount >= 5) badges.push("five-wins");
  if (completedCount >= 10) badges.push("tenacious");
  if ((progress.streak?.count ?? 0) >= 3) badges.push("streak-3");
  if (completedCount === totalLessons && totalLessons > 0) badges.push("path-complete");
  return badges;
}

function levelFromXp(xp) {
  if (xp >= 2000) return "10";
  if (xp >= 980) return "7";
  if (xp >= 500) return "5";
  if (xp >= 180) return "3";
  if (xp >= 80) return "2";
  return "1";
}
