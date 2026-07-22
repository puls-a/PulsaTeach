import { useState } from "react";
import { BookmarkCheck, CheckCircle2, Code2, Flame, Menu, Search, X } from "lucide-react";
import { filterLabel, isVisibleLesson } from "./learningState.js";
import LessonWorkspace from "./LessonWorkspace.jsx";

// projectMissions = learningTracks.map(...) now relies on per-track lazy loading instead of an eager global registry.

export function FocusedLearningLayout(props) {
  const { QuizComponent, locale, activeTrack, activeModule, activeLesson, activeTrackCompleted, activeTrackTotal, progress, bookmarks, trackLoadError, onOpenLesson, onToggleBookmark, onComplete, onQuizResult, onCloseQuiz, onNext, hasNext } = props;
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const openLesson = (moduleId, lessonId) => {
    onOpenLesson(moduleId, lessonId);
    setCurriculumOpen(false);
  };
  return (
    <section id="learn" className="min-h-screen overflow-x-hidden bg-[#10102b] pt-[4.5rem] text-white xl:h-screen xl:min-h-0 xl:overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col px-2 pb-2 sm:px-3">
        <header className="mb-2 flex shrink-0 flex-col gap-2 border border-indigo-300/20 bg-[#1b1b3a] px-3 py-2 shadow-lg lg:min-h-[52px] lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[.12em] text-indigo-200">{activeTrack.title[locale]} <span className="text-slate-500">/</span> {activeModule.title[locale]}</p>
            <h1 className="mt-0.5 truncate font-display text-base font-bold leading-tight text-white sm:text-lg">{activeLesson.title[locale]}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button type="button" onClick={() => setCurriculumOpen(true)} className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-indigo-300/30 bg-indigo-500/15 px-3 font-bold text-indigo-100 hover:bg-indigo-500/25"><Menu className="size-4" />{locale === "fr" ? "Programme" : "Curriculum"}</button>
            <div className="min-w-40 flex-1 lg:w-56 lg:flex-none"><div className="mb-1 flex justify-between font-bold text-slate-300"><span>{activeTrackCompleted}/{activeTrackTotal} {locale === "fr" ? "leçons" : "lessons"}</span><span>{activeTrackTotal ? Math.round((activeTrackCompleted / activeTrackTotal) * 100) : 0}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-indigo-400" style={{ width: `${activeTrackTotal ? (activeTrackCompleted / activeTrackTotal) * 100 : 0}%` }} /></div></div>
            {progress.xp > 0 && <span className="rounded-md bg-indigo-500/15 px-2 py-1.5 font-bold text-indigo-200">{progress.xp} XP</span>}
            {(progress.streak?.count || 0) > 0 && <span className="inline-flex items-center gap-1 rounded-md bg-orange-400/10 px-2 py-1.5 font-bold text-orange-300"><Flame className="size-3.5" />{progress.streak.count}</span>}
          </div>
        </header>
        {trackLoadError && <p className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800" role="alert">{trackLoadError}</p>}
        <LessonWorkspace QuizComponent={QuizComponent} activeTrack={activeTrack} activeModule={activeModule} lesson={activeLesson} locale={locale} isCompleted={Boolean(progress.completed[activeLesson.id])} isBookmarked={bookmarks.includes(activeLesson.id)} onToggleBookmark={onToggleBookmark} onComplete={onComplete} onQuizResult={onQuizResult} onCloseQuiz={onCloseQuiz} onNext={onNext} hasNext={hasNext} />
      </div>
      {curriculumOpen && <CurriculumDrawer {...props} onOpenLesson={openLesson} onClose={() => setCurriculumOpen(false)} />}
    </section>
  );
}

function CurriculumDrawer(props) {
  const { locale, onClose } = props;
  return <div className="fixed inset-0 z-[80]"><button type="button" className="absolute inset-0 bg-slate-950/70" onClick={onClose} aria-label={locale === "fr" ? "Fermer le programme" : "Close curriculum"} /><aside className="absolute inset-y-0 left-0 w-[min(94vw,28rem)] overflow-y-auto bg-white p-4 text-ink shadow-2xl"><div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3"><div><p className="text-xs font-black uppercase tracking-[.14em] text-indigoPop">PulsaTeach</p><h2 className="font-display text-xl font-bold">{locale === "fr" ? "Programme" : "Curriculum"}</h2></div><button type="button" onClick={onClose} className="nav-icon-button" aria-label={locale === "fr" ? "Fermer" : "Close"}><X className="size-5" /></button></div><CurriculumPanel {...props} /></aside></div>;
}

function CurriculumPanel({ locale, tracks, activeTrack, activeTrackId, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onTrackChange, onQueryChange, onFilterChange, onOpenLesson }) {
  const selectedTrack = tracks.find((track) => track.id === activeTrackId) || activeTrack;
  const handleTrackSelect = (event) => {
    const nextTrack = tracks.find((track) => track.id === event.target.value);
    if (nextTrack) onTrackChange(nextTrack);
  };

  return <>
    <label className="block">
      <span className="mb-1 block text-xs font-black uppercase tracking-[.14em] text-slate-500">{locale === "fr" ? "Formation" : "Course"}</span>
      <select value={selectedTrack.id} onChange={handleTrackSelect} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-black text-ink outline-none transition focus:border-indigoPop focus:ring-2 focus:ring-indigo-100">
        {tracks.map((track) => (
          <option key={track.id} value={track.id}>
            {track.title?.[locale] || track.label || track.id}
          </option>
        ))}
      </select>
    </label>
    <div className="mt-2 flex gap-1 overflow-x-auto pb-1" aria-label={locale === "fr" ? "Raccourcis formations" : "Course shortcuts"}>
      {tracks.map((track) => (
        <a key={track.id} href={firstLessonHref(track)} onClick={(event) => handleNavigation(event, () => onTrackChange(track))} title={track.title?.[locale] || track.label || track.id} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black ${activeTrackId === track.id ? "bg-indigoPop text-white" : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigoPop"}`}>
          {track.label || track.id}
        </a>
      ))}
    </div>
    <label className="relative mt-3 block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input type="search" value={lessonQuery} onChange={(event) => onQueryChange(event.target.value)} placeholder={locale === "fr" ? "Chercher une leçon" : "Search lessons"} className="min-h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold outline-none focus:border-indigoPop" /></label>
    <div className="mt-2 grid grid-cols-4 gap-1">{["all", "todo", "done", "saved"].map((filter) => <button type="button" key={filter} onClick={() => onFilterChange(filter)} className={`rounded-lg px-1 py-2 text-[11px] font-bold ${statusFilter === filter ? "bg-ink text-white" : "text-slate-500 hover:bg-slate-100"}`}>{filterLabel(filter, locale)}</button>)}</div>
    <div className="mt-4 grid gap-4">{activeTrack.modules.map((module) => <ModuleLessons key={module.id} trackId={activeTrack.id} {...{ module, locale, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onOpenLesson }} />)}</div>
  </>;
}

function ModuleLessons({ trackId, module, locale, activeLesson, progress, bookmarks, lessonQuery, statusFilter, onOpenLesson }) {
  const visible = module.lessons.filter((lesson) => isVisibleLesson(lesson, progress, bookmarks, lessonQuery, statusFilter, locale));
  const practices = visible.filter((lesson) => lesson.type !== "quiz");
  const assessments = visible.filter((lesson) => lesson.type === "quiz");
  const [assessmentOpen, setAssessmentOpen] = useState(assessments.some((lesson) => lesson.id === activeLesson.id));
  const renderButton = (lesson) => <a key={lesson.id} href={`/learn/${trackId}/${module.id}/${lesson.id}`} aria-current={lesson.id === activeLesson.id ? "page" : undefined} onClick={(event) => handleNavigation(event, () => onOpenLesson(module.id, lesson.id))} className={`flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left text-sm font-semibold ${lesson.id === activeLesson.id ? "bg-indigo-50 text-indigoPop" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>{progress.completed[lesson.id] ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" /> : <Code2 className="mt-0.5 size-4 shrink-0 text-slate-400" />}<span>{lesson.title[locale]}</span>{bookmarks.includes(lesson.id) && <BookmarkCheck className="ml-auto size-4 shrink-0" />}</a>;
  return <section><div className="mb-1 flex items-center justify-between px-2"><h2 className="text-xs font-bold uppercase tracking-[.1em] text-slate-600">{module.title[locale]}</h2><span className="text-xs text-slate-600">{practices.length}</span></div><div className="grid gap-1">{practices.map(renderButton)}</div>{assessments.length > 0 && <details className="mt-1" open={assessmentOpen} onToggle={(event) => setAssessmentOpen(event.currentTarget.open)}><summary className="cursor-pointer rounded-lg px-2 py-2 text-xs font-bold text-indigoPop hover:bg-indigo-50">{locale === "fr" ? `Bilan optionnel (${assessments.length})` : `Optional check (${assessments.length})`}</summary><div className="mt-1 grid gap-1">{assessments.map(renderButton)}</div></details>}</section>;
}

function firstLessonHref(track) {
  const firstModule = track.modules?.[0];
  const firstLesson = firstModule?.lessons?.[0];
  return track.firstHref || (firstModule && firstLesson ? `/learn/${track.id}/${firstModule.id}/${firstLesson.id}` : `/formations/${track.id}`);
}

function handleNavigation(event, navigate) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate();
}

export function MissionBoard({ locale, progress, onOpenLesson }) {
  const missions = [];
  return <section className="mt-8 rounded-[30px] bg-white p-5 text-ink clay"><div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Missions de projet" : "Project missions"}</p><h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Saute directement vers un livrable." : "Jump straight into a deliverable."}</h3></div><p className="max-w-xl font-bold leading-7 text-ink/62">{locale === "fr" ? "Ces missions valident plusieurs compétences à la fois." : "These missions validate several skills at once."}</p></div><div className="grid gap-4 lg:grid-cols-3">{missions.map((mission) => <button type="button" key={mission.lessonId} onClick={() => onOpenLesson(mission)} className="cursor-pointer rounded-[24px] bg-cloud p-5 text-left transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop clay-soft"><div className="mb-4 flex items-center justify-between gap-3"><span className="rounded-2xl bg-indigoPop px-3 py-2 text-sm font-extrabold text-white">{mission.trackId.toUpperCase()}</span>{progress.completed[mission.lessonId] ? <CheckCircle2 className="size-6 text-mintPop" /> : <Code2 className="size-6 text-indigoPop" />}</div><h4 className="font-display text-2xl font-bold">{mission.title[locale]}</h4><p className="mt-2 font-bold leading-7 text-ink/68">{mission.text[locale]}</p></button>)}</div></section>;
}
