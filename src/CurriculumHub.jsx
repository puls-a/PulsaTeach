import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Check, ChevronDown, Clock3, Code2, Flag, GraduationCap, Plus, Trophy } from "lucide-react";
import { useSupabaseSession } from "./authState.js";
import { useLearningTracks } from "./useLearningTracks.js";

const trackIcons = { html: BookOpen, css: Code2, javascript: Code2 };

export default function CurriculumHub({ locale = "fr" }) {
  const { user } = useSupabaseSession();
  const { tracks, loading, error } = useLearningTracks();
  const [openTrack, setOpenTrack] = useState(null);
  const progress = useMemo(readProgress, []);
  const courseDrafts = useMemo(readCourseDrafts, []);
  const completedCount = Object.keys(progress.completed || {}).length;
  const totalLessons = tracks.reduce((total, track) => total + countLessons(track), 0);

  useEffect(() => {
    if (!openTrack && tracks[0]) setOpenTrack(tracks[0].id);
  }, [openTrack, tracks]);

  return (
    <section className="min-h-screen bg-[#f5f6fa] px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="py-8 text-center sm:py-12">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigoPop">
            {locale === "fr" ? "Curriculum PulsaTeach" : "PulsaTeach curriculum"}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {user
              ? (locale === "fr" ? "Reprends là où tu t'es arrêté." : "Continue where you left off.")
              : (locale === "fr" ? "Choisis une formation et commence à coder." : "Choose a course and start coding.")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {locale === "fr"
              ? "Chaque formation contient des modules, des exercices interactifs, des projets et une certification."
              : "Every course includes modules, interactive exercises, projects, and a certification."}
          </p>

          {!user && (
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#/signup" className="primary-button">
                {locale === "fr" ? "Créer un compte gratuit" : "Create a free account"} <ArrowRight className="size-4" />
              </a>
              <a href="#/auth" className="secondary-button">{locale === "fr" ? "Se connecter" : "Sign in"}</a>
            </div>
          )}
        </header>

        <div className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex items-center justify-between gap-4 text-sm font-bold">
              <span>{locale === "fr" ? "Progression globale" : "Overall progress"}</span>
              <span>{completedCount}/{totalLessons}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-indigoPop" style={{ width: `${totalLessons ? (completedCount / totalLessons) * 100 : 0}%` }} />
            </div>
          </div>
          <a href={user ? "#/dashboard" : "#/signup"} className="secondary-button min-h-10 py-2 text-sm">
            <Trophy className="size-4" />{locale === "fr" ? "Voir ma progression" : "View progress"}
          </a>
        </div>

        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">{locale === "fr" ? "Toutes les formations" : "All courses"}</h2>
            <p className="mt-1 text-sm text-slate-600">{tracks.length} formations disponibles</p>
          </div>
          <a href="#/studio" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-ink hover:border-indigoPop hover:text-indigoPop">
            <Plus className="size-4" />{locale === "fr" ? "Créer une formation" : "Create a course"}
          </a>
        </div>

        <div className="grid gap-3">
          {loading && <p className="empty-state">{locale === "fr" ? "Chargement du catalogue..." : "Loading catalog..."}</p>}
          {error && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">{locale === "fr" ? "Le catalogue distant est indisponible. Les formations intégrées restent accessibles." : "Remote catalog unavailable. Built-in courses remain accessible."}</p>}
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              locale={locale}
              progress={progress}
              open={openTrack === track.id}
              onToggle={() => setOpenTrack(openTrack === track.id ? null : track.id)}
            />
          ))}
        </div>

        {courseDrafts.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><h2 className="font-display text-2xl font-bold">{locale === "fr" ? "Formations en préparation" : "Courses in preparation"}</h2><p className="mt-1 text-sm text-slate-500">{locale === "fr" ? "Ajoute des modules et des leçons avant publication." : "Add modules and lessons before publishing."}</p></div>
              <a href="#/studio" className="text-sm font-bold text-indigoPop">{locale === "fr" ? "Ouvrir le Studio" : "Open Studio"}</a>
            </div>
            <div className="grid gap-3">
              {courseDrafts.map((draft) => (
                <a href="#/studio" key={draft.id} className="flex items-center gap-4 border border-dashed border-slate-300 bg-white p-4 hover:border-indigoPop">
                  <span className="grid size-11 place-items-center bg-amber-50 text-amber-700"><BookOpen className="size-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block font-bold">{draft.title}</span><span className="mt-1 block text-sm text-slate-500">{draft.description || draft.level}</span></span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">draft</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

function TrackCard({ track, locale, progress, open, onToggle }) {
  const Icon = trackIcons[track.id] || BookOpen;
  const lessons = countLessons(track);
  const completed = track.modules.flatMap((module) => module.lessons).filter((lesson) => progress.completed?.[lesson.id]).length;
  const percent = lessons ? Math.round((completed / lessons) * 100) : 0;
  const firstModule = track.modules[0];
  const firstLesson = firstModule?.lessons[0];
  const totalMinutes = track.modules.reduce((sum, module) => sum + module.totalMinutes, 0);
  const projects = track.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.type === "project").length;

  return (
    <article className="overflow-hidden border border-slate-300 bg-white">
      <button type="button" onClick={onToggle} className="flex w-full cursor-pointer items-center gap-4 p-4 text-left hover:bg-slate-50 sm:p-5">
        <span className="grid size-12 shrink-0 place-items-center border border-slate-300 bg-slate-100 text-ink"><Icon className="size-6" /></span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-bold sm:text-xl">{track.title[locale]}</span>
          <span className="mt-1 block text-sm text-slate-500">{track.level?.[locale]} · {track.modules.length} modules · {lessons} leçons · {completed} terminées</span>
          <span className="mt-3 block h-1.5 rounded-full bg-slate-200"><span className="block h-full rounded-full bg-indigoPop" style={{ width: `${percent}%` }} /></span>
        </span>
        <span className="text-sm font-bold text-slate-500">{percent}%</span>
        <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5">
          <p className="mb-5 max-w-2xl leading-7 text-slate-600">{track.summary[locale]}</p>
          {track.profession?.[locale] && <p className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm leading-6 text-indigo-950">{track.profession[locale]}</p>}
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <CourseFact icon={Clock3} value={`${Math.ceil(totalMinutes / 60)} h`} label={locale === "fr" ? "de pratique guidée" : "guided practice"} />
            <CourseFact icon={Code2} value={lessons} label={locale === "fr" ? "leçons interactives" : "interactive lessons"} />
            <CourseFact icon={Flag} value={projects} label={locale === "fr" ? "projets évalués" : "assessed projects"} />
          </div>
          <div className="mb-5 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><GraduationCap className="size-4 text-indigoPop" />{locale === "fr" ? "À la fin, tu sauras" : "By the end, you will"}</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {(track.outcomes?.[locale] || []).map((item) => <li className="flex gap-2" key={item}><Check className="mt-0.5 size-4 shrink-0 text-green-600" />{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">{locale === "fr" ? "Projet final" : "Capstone project"}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{track.capstone?.[locale]}</p>
              <h3 className="mt-4 text-sm font-bold text-ink">{locale === "fr" ? "Prérequis" : "Prerequisites"}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{(track.prerequisites?.[locale] || []).join(" · ")}</p>
              {track.certification?.[locale] && (
                <>
                  <h3 className="mt-4 text-sm font-bold text-ink">{locale === "fr" ? "Critères de certification" : "Certification criteria"}</h3>
                  <ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-600">{track.certification[locale].map((item) => <li key={item}>• {item}</li>)}</ul>
                </>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            {track.modules.map((module, index) => {
              const moduleCompleted = module.lessons.filter((lesson) => progress.completed?.[lesson.id]).length;
              const first = module.lessons[0];
              return (
                <a key={module.id} href={`#/learn/${track.id}/${module.id}/${first.id}`} className="flex items-center gap-3 border border-slate-200 bg-white p-3 hover:border-indigoPop">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${moduleCompleted === module.lessons.length ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                    {moduleCompleted === module.lessons.length ? <Check className="size-4" /> : index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{module.title[locale]}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{module.description?.[locale]}</span>
                    <span className="mt-1 block text-xs font-semibold text-indigoPop">{locale === "fr" ? "Livrable :" : "Deliverable:"} {module.deliverable?.[locale]}</span>
                    {module.mastery?.[locale] && <span className="mt-1 block text-xs text-slate-500">{locale === "fr" ? "Maîtrise :" : "Mastery:"} {module.mastery[locale].join(" · ")}</span>}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{module.totalMinutes} min · {moduleCompleted}/{module.lessons.length}</span>
                </a>
              );
            })}
          </div>
          <a href={`#/learn/${track.id}/${firstModule.id}/${firstLesson.id}`} className="primary-button mt-5">
            {completed ? (locale === "fr" ? "Continuer la formation" : "Continue course") : (locale === "fr" ? "Commencer la formation" : "Start course")}
            <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </article>
  );
}

function CourseFact({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <Icon className="size-4 text-indigoPop" />
      <p className="mt-2 font-display text-xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function countLessons(track) {
  return track.modules.reduce((total, module) => total + module.lessons.length, 0);
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-learning-progress")) || { completed: {} };
  } catch {
    return { completed: {} };
  }
}

function readCourseDrafts() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-course-drafts")) || [];
  } catch {
    return [];
  }
}
