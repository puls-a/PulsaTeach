import { useEffect, useMemo, useState } from "react";
import { Accessibility, ArrowRight, BookOpen, Check, Code2, Database, Gauge, GitBranch, Laptop, Plus, Search, Server, ShieldCheck } from "lucide-react";
import { useSupabaseSession } from "./authState.js";
import { canManageContent } from "./authRoles.js";
import { LearnerPageHero, MetricCard, ProgressMeter } from "./components/LearnerUI.jsx";
import { useLearningTracks } from "./useLearningTracks.js";
import { getLearnerItem } from "./learnerStorage.js";

const trackPresentation = {
  tools: { icon: Laptop, tone: "bg-slate-100 text-slate-700" },
  html: { icon: BookOpen, tone: "bg-orange-50 text-orange-700" },
  css: { icon: Code2, tone: "bg-sky-50 text-sky-700" },
  javascript: { icon: Code2, tone: "bg-amber-50 text-amber-800" },
  git: { icon: GitBranch, tone: "bg-rose-50 text-rose-700" },
  accessibility: { icon: Accessibility, tone: "bg-emerald-50 text-emerald-700" },
  testing: { icon: Check, tone: "bg-lime-50 text-lime-800" },
  typescript: { icon: Code2, tone: "bg-blue-50 text-blue-700" },
  react: { icon: Code2, tone: "bg-cyan-50 text-cyan-700" },
  "node-api": { icon: Server, tone: "bg-green-50 text-green-700" },
  "sql-postgresql": { icon: Database, tone: "bg-indigo-50 text-indigo-700" },
  "web-security": { icon: ShieldCheck, tone: "bg-red-50 text-red-700" },
  "web-performance": { icon: Gauge, tone: "bg-violet-50 text-violet-700" },
  "devops-deployment": { icon: Server, tone: "bg-slate-100 text-slate-700" }
};

export default function CurriculumHub({ locale = "fr" }) {
  const { user } = useSupabaseSession();
  const { tracks, loading, error, reload } = useLearningTracks({ remoteCatalog: true, mode: "summary", freshCatalog: Boolean(user) });
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(readProgress);
  const courseDrafts = useMemo(readCourseDrafts, []);
  const completedCount = Object.keys(progress.completed || {}).length;
  const totalLessons = tracks.reduce((total, track) => total + countLessons(track), 0);
  const canCreateCourses = canManageContent(user);
  const filteredTracks = tracks.filter((track) => {
    const haystack = `${localize(track.title, locale)} ${localize(track.summary, locale)} ${localize(track.level, locale)}`.toLocaleLowerCase(locale);
    return haystack.includes(query.trim().toLocaleLowerCase(locale));
  });

  useEffect(() => {
    const onSynced = (event) => setProgress(event.detail || readProgress());
    window.addEventListener("pulsateach-progress-synced", onSynced);
    return () => window.removeEventListener("pulsateach-progress-synced", onSynced);
  }, []);

  return (
    <section className="app-page bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <LearnerPageHero
          icon={BookOpen}
          eyebrow={locale === "fr" ? "Catalogue PulsaTeach" : "PulsaTeach catalog"}
          title={user ? (locale === "fr" ? "Reprends là où tu t’es arrêté." : "Continue where you left off.") : (locale === "fr" ? "Choisis une formation et commence à coder." : "Choose a course and start coding.")}
          description={locale === "fr" ? "Des parcours complets, des exercices interactifs et des projets évalués pour passer de la théorie à une vraie réalisation." : "Complete paths, interactive exercises, and assessed projects that turn theory into real work."}
          action={{ href: user ? "/dashboard" : "/signup", label: user ? (locale === "fr" ? "Voir mon cockpit" : "View my dashboard") : (locale === "fr" ? "Créer mon compte" : "Create my account") }}
        >
          <div className="grid grid-cols-2 gap-3 lg:max-w-2xl lg:grid-cols-3">
            <MetricCard label={locale === "fr" ? "Formations" : "Courses"} value={tracks.length} />
            <MetricCard label={locale === "fr" ? "Leçons" : "Lessons"} value={totalLessons} />
            <MetricCard label={locale === "fr" ? "Validées" : "Completed"} value={completedCount} tone={completedCount ? "reward" : "default"} />
          </div>
        </LearnerPageHero>

        {user && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <ProgressMeter label={locale === "fr" ? "Progression globale" : "Overall progress"} value={totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0} detail={`${completedCount}/${totalLessons} ${locale === "fr" ? "leçons validées" : "lessons passed"}`} />
          </div>
        )}

        <section className="mt-10" aria-labelledby="catalog-title">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{locale === "fr" ? "Explorer" : "Explore"}</p>
              <h2 id="catalog-title" className="mt-3 font-display text-3xl font-black sm:text-4xl">{locale === "fr" ? "Formations disponibles" : "Available courses"}</h2>
              <p className="mt-2 text-slate-600">{filteredTracks.length} {locale === "fr" ? "parcours pour progresser à ton rythme" : "paths to learn at your pace"}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block">
                <span className="sr-only">{locale === "fr" ? "Rechercher une formation" : "Search courses"}</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "fr" ? "Rechercher une formation" : "Search courses"} className="form-control min-w-64 pl-12" />
              </label>
              {canCreateCourses && <a href="/studio" className="secondary-button"><Plus className="size-4" />{locale === "fr" ? "Créer" : "Create"}</a>}
            </div>
          </div>

          {loading && <p className="empty-state mt-6" role="status">{locale === "fr" ? "Chargement du catalogue..." : "Loading catalog..."}</p>}
          {error && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900" role="status"><span>{locale === "fr" ? "Le catalogue distant est indisponible. Les formations intégrées restent accessibles." : "Remote catalog unavailable. Built-in courses remain accessible."}</span><button type="button" onClick={reload} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-black hover:bg-amber-100">{locale === "fr" ? "Réessayer" : "Try again"}</button></div>}
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTracks.map((track) => <CourseCard key={track.id} track={track} locale={locale} />)}
          </div>
          {!loading && filteredTracks.length === 0 && <p className="empty-state mt-6">{locale === "fr" ? "Aucune formation ne correspond à cette recherche." : "No course matches this search."}</p>}
        </section>

        {canCreateCourses && courseDrafts.length > 0 && (
          <section className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-2xl font-black">{locale === "fr" ? "Formations en préparation" : "Courses in preparation"}</h2><p className="mt-1 text-sm text-slate-500">{locale === "fr" ? "Espace réservé à l’équipe éditoriale." : "Editorial team workspace."}</p></div><a href="/studio" className="secondary-button">{locale === "fr" ? "Ouvrir le Studio" : "Open Studio"}</a></div>
          </section>
        )}
      </div>
    </section>
  );
}

function CourseCard({ track, locale }) {
  const presentation = trackPresentation[track.id] || { icon: BookOpen, tone: "bg-slate-100 text-slate-700" };
  const Icon = presentation.icon;
  const modules = Array.isArray(track.modules) ? track.modules.length : Number(track.modules || 0);
  const lessons = countLessons(track);
  return (
    <article className="group flex min-h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-12 place-items-center rounded-2xl ${presentation.tone}`}><Icon className="size-6" /></span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{localize(track.level, locale)}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-black text-slate-950">{localize(track.title, locale)}</h3>
      <p className="mt-3 flex-1 leading-7 text-slate-600">{localize(track.summary, locale)}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-sm">
        <div><dt className="text-slate-500">{locale === "fr" ? "Modules" : "Modules"}</dt><dd className="mt-1 font-black text-slate-900">{modules}</dd></div>
        <div><dt className="text-slate-500">{locale === "fr" ? "Leçons" : "Lessons"}</dt><dd className="mt-1 font-black text-slate-900">{lessons}</dd></div>
      </dl>
      <a href={`/formations/${track.id}`} className="mt-5 inline-flex min-h-12 items-center justify-between rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition group-hover:bg-indigo-700">
        {locale === "fr" ? "Découvrir la formation" : "Explore course"}<ArrowRight className="size-4" />
      </a>
    </article>
  );
}

function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.fr || value.en || "";
  return String(value || "");
}

function countLessons(track) {
  if (track.isSummary) return Number(track.lessons || 0);
  return (track.modules || []).reduce((total, module) => total + (module.lessons?.length || 0), 0);
}

function readProgress() {
  try {
    return JSON.parse(getLearnerItem("pulsateach-learning-progress")) || { completed: {} };
  } catch {
    return { completed: {} };
  }
}

function readCourseDrafts() {
  try {
    return JSON.parse(getLearnerItem("pulsateach-course-drafts")) || [];
  } catch {
    return [];
  }
}
