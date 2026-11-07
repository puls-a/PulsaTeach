import { useEffect, useMemo, useState } from "react";
import { Accessibility, ArrowRight, BookOpen, Check, Code2, Database, Gauge, GitBranch, Laptop, Plus, Search, Server, ShieldCheck } from "lucide-react";
import { useSupabaseSession } from "./authState.js";
import { canManageContent } from "./authRoles.js";
import { ProgressMeter } from "./components/LearnerUI.jsx";
import { useLearningTracks } from "./useLearningTracks.js";
import { getLearnerItem } from "./learnerStorage.js";
import CatalogStartGuide from "./components/CatalogStartGuide.jsx";

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
  const terms = normalizeSearch(query, locale).split(/\s+/).filter(Boolean);
  const filteredTracks = tracks.filter((track) => {
    const haystack = normalizeSearch(`${track.id} ${localize(track.title, locale)} ${localize(track.summary, locale)} ${localize(track.level, locale)}`, locale);
    return terms.every((term) => haystack.includes(term));
  });

  useEffect(() => {
    const onSynced = (event) => setProgress(event.detail || readProgress());
    window.addEventListener("pulsateach-progress-synced", onSynced);
    return () => window.removeEventListener("pulsateach-progress-synced", onSynced);
  }, []);

  return (
    <section className="app-page bg-cloud">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b border-slate-400 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">{locale === "fr" ? "Catalogue PulsaTeach" : "PulsaTeach catalog"}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              {user ? (locale === "fr" ? "Reprends le prochain travail utile." : "Continue with the next useful task.") : (locale === "fr" ? "Trois chemins pour construire ta première page." : "Three routes to build your first page.")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{locale === "fr" ? "Prépare ton poste, structure une page en HTML, puis travaille sa présentation avec CSS. Chaque formation montre son programme avant de commencer." : "Set up your workstation, structure a page with HTML, then shape its presentation with CSS. Every course shows its curriculum before you begin."}</p>
          </div>
          <a href={user ? "/dashboard" : "/learn/html/html-getting-started/html-00-what-html-does"} className="primary-button w-fit">{user ? (locale === "fr" ? "Voir ma prochaine leçon" : "View my next lesson") : (locale === "fr" ? "Essayer HTML · 10 min" : "Try HTML · 10 min")}<ArrowRight className="size-4" /></a>
        </header>

        {user && (
          <div className="mt-8 border-b border-slate-300 pb-8">
            <ProgressMeter label={locale === "fr" ? "Progression globale" : "Overall progress"} value={totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0} detail={`${completedCount}/${totalLessons} ${locale === "fr" ? "leçons validées" : "lessons passed"}`} />
          </div>
        )}

        <section className="mt-12" aria-label={locale === "fr" ? "Formations disponibles" : "Available courses"}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{locale === "fr" ? "Points de départ" : "Starting points"}</p>
              <h2 id="catalog-title" className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{locale === "fr" ? "Choisis selon ce que tu veux faire maintenant." : "Choose based on what you want to do now."}</h2>
              <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 text-slate-600">{filteredTracks.length} {locale === "fr" ? "formations affichées" : "courses shown"}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block">
                <span className="sr-only">{locale === "fr" ? "Rechercher une formation" : "Search courses"}</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "fr" ? "Rechercher une formation" : "Search courses"} className="form-control min-w-0 pl-12" />
              </label>
              {canCreateCourses && <a href="/studio" className="secondary-button"><Plus className="size-4" />{locale === "fr" ? "Créer" : "Create"}</a>}
            </div>
          </div>

          {loading && <p className="empty-state mt-6" role="status">{locale === "fr" ? "Chargement du catalogue..." : "Loading catalog..."}</p>}
          {error && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900" role="status"><span>{locale === "fr" ? "Le catalogue distant est indisponible. Les formations intégrées restent accessibles." : "Remote catalog unavailable. Built-in courses remain accessible."}</span><button type="button" onClick={reload} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-black hover:bg-amber-100">{locale === "fr" ? "Réessayer" : "Try again"}</button></div>}
          <div className="mt-8 divide-y divide-slate-300 border-y border-slate-300">
            {filteredTracks.map((track) => <CourseCard key={track.id} track={track} locale={locale} />)}
          </div>
          {!loading && filteredTracks.length === 0 && <div className="empty-state mt-6">
            <p>{locale === "fr" ? "Aucune formation ne correspond à cette recherche." : "No course matches this search."}</p>
            {query && <button type="button" onClick={() => setQuery("")} className="secondary-button mt-4">{locale === "fr" ? "Effacer la recherche" : "Clear search"}</button>}
          </div>}
        </section>

        <CatalogStartGuide tracks={tracks} locale={locale} />

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
  const modules = track.isSummary ? Number(track.moduleCount || 0) : Array.isArray(track.modules) ? track.modules.length : Number(track.modules || 0);
  const lessons = countLessons(track);
  return (
    <article className="group grid gap-5 bg-white px-4 py-7 transition-colors hover:bg-slate-50 sm:px-6 lg:grid-cols-[4rem_1fr_auto] lg:items-center">
      <span className={`grid size-12 place-items-center rounded-md ${presentation.tone}`}><Icon className="size-6" /></span>
      <div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500"><span>{localize(track.level, locale)}</span><span aria-hidden="true">·</span><span>{modules} {modules === 1 ? (locale === "fr" ? "module" : "module") : "modules"}</span><span aria-hidden="true">·</span><span>{lessons} {locale === "fr" ? "leçons" : "lessons"}</span></div>
        <h3 className="mt-3 font-display text-3xl font-semibold text-slate-950">{localize(track.title, locale)}</h3>
        <p className="mt-2 max-w-3xl leading-7 text-slate-600">{localize(track.summary, locale)}</p>
      </div>
      <a href={`/formations/${track.id}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-indigoPop underline decoration-indigo-300 underline-offset-4 hover:text-indigo-800">
        {locale === "fr" ? "Voir le programme" : "View curriculum"}<ArrowRight className="size-4" />
      </a>
    </article>
  );
}

function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.fr || value.en || "";
  return String(value || "");
}

function normalizeSearch(value, locale) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase(locale).trim();
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
