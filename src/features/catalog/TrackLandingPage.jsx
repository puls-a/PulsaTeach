import { useEffect, useMemo } from "react";
import { ArrowRight, BookOpen, Check, Clock3, Code2, Flag, GraduationCap, ArrowLeft, LayoutTemplate } from "lucide-react";
import { useSupabaseSession } from "../../authState.js";
import { useLearningTracks } from "../../useLearningTracks.js";

// Utility for reading progress from localStorage if offline or getting it from Supabase context
function readProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-progress")) || { completed: {} };
  } catch {
    return { completed: {} };
  }
}

export function TrackLandingPage({ locale = "fr", trackId }) {
  const { user } = useSupabaseSession();
  const { tracks, error, loadTrack } = useLearningTracks({ remoteCatalog: Boolean(user), mode: "summary" });
  const progress = useMemo(readProgress, []);

  // Ensure full track is loaded
  useEffect(() => {
    if (!trackId) return;
    loadTrack(trackId).catch(() => {});
  }, [trackId, loadTrack]);

  const track = tracks.find(t => t.id === trackId);

  if (error) {
    return (
      <section className="app-page grid min-h-screen place-items-center bg-slate-50">
        <div className="surface max-w-xl text-center">
          <p className="eyebrow">Erreur</p>
          <h1 className="mt-3 font-display text-3xl font-black text-ink">Impossible de charger la formation</h1>
          <p className="mt-3 leading-7 text-slate-600">{error.message}</p>
        </div>
      </section>
    );
  }

  if (!track || track.isSummary) {
    return (
      <section className="app-page grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center text-slate-500">
          <p>{locale === "fr" ? "Chargement de la formation..." : "Loading course..."}</p>
        </div>
      </section>
    );
  }

  const lessonsCount = track.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalMinutes = track.modules.reduce((sum, m) => sum + (m.totalMinutes || 0), 0);
  const projects = track.modules.flatMap(m => m.lessons).filter(l => l.type === "project").length;
  const completed = track.modules.flatMap(m => m.lessons).filter(l => progress.completed?.[l.id]).length;
  
  const firstModule = track.modules[0];
  const firstLesson = firstModule?.lessons?.[0];
  const startHref = firstModule && firstLesson ? `/learn/${track.id}/${firstModule.id}/${firstLesson.id}` : "/catalog";

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-24 pt-20 sm:pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Breadcrumb nav */}
        <nav className="mb-8" aria-label={locale === "fr" ? "Fil d'Ariane" : "Breadcrumb"}>
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><a href="/catalog" className="hover:text-indigoPop flex items-center gap-1 transition-colors"><ArrowLeft className="size-4" /> {locale === "fr" ? "Toutes les formations" : "All courses"}</a></li>
          </ol>
        </nav>

        {/* Header Hero */}
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigoPop">
            <LayoutTemplate className="size-3" />
            {locale === "fr" ? "Formation Complète" : "Complete Course"}
          </div>
          <h1 className="mt-2 font-display text-4xl font-black text-ink sm:text-5xl lg:text-6xl">
            {track.title[locale]}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {track.summary[locale]}
          </p>
          {track.profession?.[locale] && (
             <p className="mx-auto mt-6 inline-block rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-3 text-sm font-medium leading-6 text-indigo-950">
               {track.profession[locale]}
             </p>
          )}
          
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <a href={startHref} className="primary-button text-lg">
              {completed ? (locale === "fr" ? "Continuer la formation" : "Continue course") : (locale === "fr" ? "Commencer gratuitement" : "Start for free")}
              <ArrowRight className="size-5" />
            </a>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <CourseFact icon={Clock3} value={`${Math.ceil(totalMinutes / 60)} h`} label={locale === "fr" ? "de pratique guidée" : "guided practice"} />
          <CourseFact icon={Code2} value={lessonsCount} label={locale === "fr" ? "leçons interactives" : "interactive lessons"} />
          <CourseFact icon={Flag} value={projects} label={locale === "fr" ? "projets évalués" : "assessed projects"} />
        </div>

        {/* Course Details (Outcomes, Capstone, Prerequisites) */}
        <div className="mb-12 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2 md:p-8">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink"><GraduationCap className="size-5 text-indigoPop" />{locale === "fr" ? "À la fin, tu sauras" : "By the end, you will"}</h2>
            <ul className="mt-4 grid gap-3 text-slate-600">
              {(track.outcomes?.[locale] || []).map((item) => <li className="flex gap-3" key={item}><Check className="mt-0.5 size-5 shrink-0 text-green-600" />{item}</li>)}
            </ul>
          </div>
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-bold text-ink">{locale === "fr" ? "Projet final" : "Capstone project"}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{track.capstone?.[locale]}</p>
            </div>
            {track.prerequisites && (
              <div>
                <h2 className="text-lg font-bold text-ink">{locale === "fr" ? "Prérequis" : "Prerequisites"}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{(track.prerequisites?.[locale] || []).join(" · ")}</p>
              </div>
            )}
            {track.certification?.[locale] && (
              <div>
                <h2 className="text-lg font-bold text-ink">{locale === "fr" ? "Critères de certification" : "Certification criteria"}</h2>
                <ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-600">{track.certification[locale].map((item) => <li key={item}>• {item}</li>)}</ul>
              </div>
            )}
          </div>
        </div>

        {/* Modules List */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-ink">{locale === "fr" ? "Programme de la formation" : "Course curriculum"}</h2>
          <div className="grid gap-3">
            {track.modules.map((module, index) => {
              const moduleCompleted = module.lessons.filter((lesson) => progress.completed?.[lesson.id]).length;
              const first = module.lessons[0];
              return (
                <a key={module.id} href={`/learn/${track.id}/${module.id}/${first?.id}`} className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-md sm:flex-row sm:items-center">
                  <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold transition-colors ${moduleCompleted === module.lessons.length ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigoPop"}`}>
                    {moduleCompleted === module.lessons.length ? <Check className="size-6" /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink sm:text-lg">{module.title[locale]}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{module.description?.[locale]}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {module.deliverable?.[locale] && <span className="inline-block rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">{locale === "fr" ? "Livrable" : "Deliverable"}: {module.deliverable[locale]}</span>}
                      {module.mastery?.[locale] && <span className="inline-block rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{locale === "fr" ? "Maîtrise" : "Mastery"}: {module.mastery[locale].join(", ")}</span>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-center">
                     <span className="text-sm font-semibold text-slate-500">{module.totalMinutes} min</span>
                     <span className="mt-1 text-xs font-medium text-slate-400">{moduleCompleted}/{module.lessons.length} {locale === "fr" ? "leçons" : "lessons"}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function CourseFact({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-indigo-50">
         <Icon className="size-6 text-indigoPop" />
      </div>
      <p className="font-display text-3xl font-black text-ink">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
