import { useState } from "react";
import { BookmarkCheck, CheckCircle2, Code2, Menu, Search, X } from "lucide-react";
import { filterLabel, isVisibleLesson } from "./learningState.js";
import LessonWorkspace from "./LessonWorkspace.jsx";

export function FocusedLearningLayout(props) {
  const { QuizComponent, locale, activeTrack, activeModule, activeLesson, activeTrackCompleted, activeTrackTotal, progress, bookmarks, syncState, trackLoadError, onOpenLesson, onToggleBookmark, onComplete, onQuizResult, onNext, hasNext } = props;
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const openLesson = (moduleId, lessonId) => {
    onOpenLesson(moduleId, lessonId);
    setCurriculumOpen(false);
  };
  return (
    <section id="learn" className="min-h-screen overflow-x-hidden bg-slate-100 px-3 pb-5 pt-20 sm:px-5 sm:pt-24">
      <div className="mx-auto max-w-[1800px]">
        <header className="mb-3 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500"><a href="/catalog" className="hover:text-indigoPop">{locale === "fr" ? "Formations" : "Courses"}</a><span>/</span><span>{activeTrack.title[locale]}</span><span>/</span><span>{activeModule.title[locale]}</span></div>
            <h1 className="mt-1 font-display text-xl font-bold leading-tight text-ink sm:text-2xl">{activeLesson.title[locale]}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <button type="button" onClick={() => setCurriculumOpen(true)} className="secondary-button min-h-10 px-3 py-2 xl:hidden"><Menu className="size-4" />{locale === "fr" ? "Programme" : "Curriculum"}</button>
            <span className="rounded-lg bg-slate-100 px-3 py-2 font-bold text-slate-600">{activeTrackCompleted}/{activeTrackTotal} {locale === "fr" ? "activités" : "activities"}</span>
            <span className="rounded-lg bg-indigo-50 px-3 py-2 font-bold text-indigoPop">{progress.xp} XP</span>
            <span className={`rounded-lg px-3 py-2 font-bold ${syncState === "synced" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{syncState}</span>
          </div>
        </header>
        {trackLoadError && <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800" role="alert">{trackLoadError}</p>}
        <div className="grid gap-3 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden min-w-0 max-h-[calc(100vh-7.5rem)] overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-24 xl:block"><CurriculumPanel {...props} onOpenLesson={openLesson} /></aside>
          <LessonWorkspace QuizComponent={QuizComponent} activeTrack={activeTrack} activeModule={activeModule} lesson={activeLesson} locale={locale} isCompleted={Boolean(progress.completed[activeLesson.id])} isBookmarked={bookmarks.includes(activeLesson.id)} onToggleBookmark={onToggleBookmark} onComplete={onComplete} onQuizResult={onQuizResult} onNext={onNext} hasNext={hasNext} />
        </div>
      </div>
      {curriculumOpen && <MobileCurriculum {...props} onOpenLesson={openLesson} onClose={() => setCurriculumOpen(false)} />}
    </section>
  );
}

function MobileCurriculum(props) {
  const { locale, onClose } = props;
  return <div className="fixed inset-0 z-[80] xl:hidden"><button type="button" className="absolute inset-0 bg-slate-950/45" onClick={onClose} aria-label={locale === "fr" ? "Fermer le programme" : "Close curriculum"} /><aside className="absolute inset-y-0 left-0 w-[min(92vw,24rem)] overflow-y-auto bg-white p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><h2 className="font-display text-xl font-bold">{locale === "fr" ? "Programme" : "Curriculum"}</h2><button type="button" onClick={onClose} className="nav-icon-button" aria-label={locale === "fr" ? "Fermer" : "Close"}><X className="size-5" /></button></div><CurriculumPanel {...props} /></aside></div>;
}

function CurriculumPanel({ locale, tracks, activeTrack, activeTrackId, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onTrackChange, onQueryChange, onFilterChange, onOpenLesson }) {
  return <>
    <div className="grid grid-cols-3 gap-1">{tracks.map((track) => <button key={track.id} type="button" onClick={() => onTrackChange(track)} title={track.label} className={`min-w-0 truncate rounded-lg px-2 py-2 text-xs font-bold ${activeTrackId === track.id ? "bg-indigoPop text-white" : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigoPop"}`}>{track.label}</button>)}</div>
    <label className="relative mt-3 block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input type="search" value={lessonQuery} onChange={(event) => onQueryChange(event.target.value)} placeholder={locale === "fr" ? "Chercher une leçon" : "Search lessons"} className="min-h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold outline-none focus:border-indigoPop" /></label>
    <div className="mt-2 grid grid-cols-4 gap-1">{["all", "todo", "done", "saved"].map((filter) => <button type="button" key={filter} onClick={() => onFilterChange(filter)} className={`rounded-lg px-1 py-2 text-[11px] font-bold ${statusFilter === filter ? "bg-ink text-white" : "text-slate-500 hover:bg-slate-100"}`}>{filterLabel(filter, locale)}</button>)}</div>
    <div className="mt-4 grid gap-4">{activeTrack.modules.map((module) => <ModuleLessons key={module.id} {...{ module, locale, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onOpenLesson }} />)}</div>
  </>;
}

function ModuleLessons({ module, locale, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onOpenLesson }) {
  const visible = module.lessons.filter((lesson) => isVisibleLesson(lesson, progress, bookmarks, lessonQuery, statusFilter, locale));
  const practices = visible.filter((lesson) => lesson.type !== "quiz");
  const assessments = visible.filter((lesson) => lesson.type === "quiz");
  const [assessmentOpen, setAssessmentOpen] = useState(assessments.some((lesson) => lesson.id === activeLesson.id));
  const renderButton = (lesson) => <button key={lesson.id} type="button" onClick={() => onOpenLesson(module.id, lesson.id)} className={`flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left text-sm font-semibold ${lesson.id === activeLesson.id ? "bg-indigo-50 text-indigoPop" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>{progress.completed[lesson.id] ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" /> : <Code2 className="mt-0.5 size-4 shrink-0 text-slate-400" />}<span>{lesson.title[locale]}</span>{bookmarks.includes(lesson.id) && <BookmarkCheck className="ml-auto size-4 shrink-0" />}</button>;
  return <section><div className="mb-1 flex items-center justify-between px-2"><h2 className="text-xs font-bold uppercase tracking-[.1em] text-slate-600">{module.title[locale]}</h2><span className="text-xs text-slate-600">{practices.length}</span></div><div className="grid gap-1">{practices.map(renderButton)}</div>{assessments.length > 0 && <details className="mt-1" open={assessmentOpen} onToggle={(event) => setAssessmentOpen(event.currentTarget.open)}><summary className="cursor-pointer rounded-lg px-2 py-2 text-xs font-bold text-indigoPop hover:bg-indigo-50">{locale === "fr" ? `Bilan optionnel (${assessments.length})` : `Optional check (${assessments.length})`}</summary><div className="mt-1 grid gap-1">{assessments.map(renderButton)}</div></details>}</section>;
}

export function MissionBoard({ locale, progress, onOpenLesson }) {
  const missions = [
    { trackId: "html", moduleId: "html-a11y-final", lessonId: "html-12-final-project", title: { fr: "Publier PulsaConf", en: "Ship PulsaConf" }, text: { fr: "Assemble une page HTML complète avec navigation, programme, formulaire et footer.", en: "Assemble a complete HTML page with navigation, schedule, form, and footer." } },
    { trackId: "css", moduleId: "css-responsive-motion", lessonId: "css-06-final-project", title: { fr: "Styliser une landing", en: "Style a landing" }, text: { fr: "Crée les règles CSS qui donnent une vraie structure responsive à une landing.", en: "Create CSS rules that give a landing page a real responsive structure." } },
    { trackId: "javascript", moduleId: "js-storage-async", lessonId: "js-07-final-project", title: { fr: "Coder un dashboard", en: "Code a dashboard" }, text: { fr: "Pose le squelette logique avec state, render, addTask et sauvegarde locale.", en: "Build the logic skeleton with state, render, addTask, and local save." } }
  ];
  return <section className="mt-8 rounded-[30px] bg-white p-5 text-ink clay"><div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Missions de projet" : "Project missions"}</p><h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Saute directement vers un livrable." : "Jump straight into a deliverable."}</h3></div><p className="max-w-xl font-bold leading-7 text-ink/62">{locale === "fr" ? "Ces missions valident plusieurs compétences à la fois." : "These missions validate several skills at once."}</p></div><div className="grid gap-4 lg:grid-cols-3">{missions.map((mission) => <button type="button" key={mission.lessonId} onClick={() => onOpenLesson(mission)} className="cursor-pointer rounded-[24px] bg-cloud p-5 text-left transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop clay-soft"><div className="mb-4 flex items-center justify-between gap-3"><span className="rounded-2xl bg-indigoPop px-3 py-2 text-sm font-extrabold text-white">{mission.trackId.toUpperCase()}</span>{progress.completed[mission.lessonId] ? <CheckCircle2 className="size-6 text-mintPop" /> : <Code2 className="size-6 text-indigoPop" />}</div><h4 className="font-display text-2xl font-bold">{mission.title[locale]}</h4><p className="mt-2 font-bold leading-7 text-ink/68">{mission.text[locale]}</p></button>)}</div></section>;
}
