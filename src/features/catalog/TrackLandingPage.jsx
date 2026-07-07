import { useEffect, useMemo } from "react";
import { ArrowRight, Award, BookOpen, Check, Clock3, Code2, Flag, GraduationCap, ArrowLeft, LayoutTemplate, ShieldCheck, Sparkles } from "lucide-react";
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
  const moduleCount = track.modules.length;
  const firstModules = track.modules.slice(0, 4);
  const certification = track.certification?.[locale] || [];
  
  const firstModule = track.modules[0];
  const firstLesson = firstModule?.lessons?.[0];
  const startHref = firstModule && firstLesson ? `/learn/${track.id}/${firstModule.id}/${firstLesson.id}` : "/catalog";

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="mb-8" aria-label={locale === "fr" ? "Fil d'Ariane" : "Breadcrumb"}>
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><a href="/catalog" className="hover:text-indigoPop flex items-center gap-1 transition-colors"><ArrowLeft className="size-4" /> {locale === "fr" ? "Toutes les formations" : "All courses"}</a></li>
          </ol>
        </nav>

        <header className="grid gap-8 lg:grid-cols-3 lg:items-start">
          <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8 lg:col-span-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigoPop">
              <LayoutTemplate className="size-3" />
              {locale === "fr" ? "Formation complète" : "Complete course"}
            </div>
            <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {track.title[locale]}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              {track.summary[locale]}
            </p>
            {track.profession?.[locale] && (
              <p className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-sm font-semibold leading-7 text-indigo-950 sm:text-base">
                {track.profession[locale]}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={startHref} className="primary-button text-base sm:text-lg">
                {completed ? (locale === "fr" ? "Continuer la formation" : "Continue course") : (locale === "fr" ? "Commencer gratuitement" : "Start for free")}
                <ArrowRight className="size-5" />
              </a>
              <a href="#programme" className="secondary-button text-base">
                {locale === "fr" ? "Voir le programme" : "View curriculum"}
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-ink p-5 text-white shadow-2xl">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-100">{locale === "fr" ? "Preuve de parcours" : "Path proof"}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <ProofStat value={moduleCount} label={locale === "fr" ? "modules" : "modules"} />
                <ProofStat value={lessonsCount} label={locale === "fr" ? "leçons" : "lessons"} />
                <ProofStat value={`${Math.ceil(totalMinutes / 60)} h`} label={locale === "fr" ? "guidées" : "guided"} />
                <ProofStat value={projects} label={locale === "fr" ? "projets" : "projects"} />
              </div>
              <div className="mt-5 grid gap-2 text-sm font-semibold text-indigo-50">
                <ProofLine icon={ShieldCheck} text={locale === "fr" ? "Tests automatiques dans le navigateur" : "Browser-based automated checks"} />
                <ProofLine icon={Award} text={locale === "fr" ? "Certification par preuves de progression" : "Certification through progress evidence"} />
                <ProofLine icon={Sparkles} text={locale === "fr" ? "Projet final présentable en portfolio" : "Portfolio-ready capstone project"} />
              </div>
            </div>
          </aside>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <CourseFact icon={Clock3} value={`${Math.ceil(totalMinutes / 60)} h`} label={locale === "fr" ? "de pratique guidée" : "guided practice"} />
          <CourseFact icon={Code2} value={lessonsCount} label={locale === "fr" ? "leçons interactives" : "interactive lessons"} />
          <CourseFact icon={Flag} value={projects} label={locale === "fr" ? "projets évalués" : "assessed projects"} />
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="eyebrow">{locale === "fr" ? "Résultats" : "Outcomes"}</p>
            <h2 className="mt-3 font-display text-3xl font-black text-ink">{locale === "fr" ? "Ce que tu sauras faire concrètement" : "What you will concretely be able to do"}</h2>
            <ul className="mt-6 grid gap-3 text-slate-600">
              {(track.outcomes?.[locale] || []).map((item) => <li className="flex gap-3 rounded-xl bg-slate-50 p-3" key={item}><Check className="mt-0.5 size-5 shrink-0 text-green-600" />{item}</li>)}
            </ul>
          </div>
          <div className="grid gap-4">
            <InfoCard icon={GraduationCap} title={locale === "fr" ? "Projet final" : "Capstone project"} text={track.capstone?.[locale]} />
            <InfoCard icon={BookOpen} title={locale === "fr" ? "Prérequis" : "Prerequisites"} text={(track.prerequisites?.[locale] || []).join(" · ") || (locale === "fr" ? "Aucun prérequis spécifique." : "No specific prerequisite.")} />
          </div>
        </section>

        {certification.length > 0 && (
          <section className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">{locale === "fr" ? "Certification" : "Certification"}</p>
                <h2 className="mt-3 font-display text-3xl font-black text-ink">{locale === "fr" ? "Validation par preuves, pas par présence" : "Evidence-based validation, not attendance"}</h2>
              </div>
              <Award className="size-10 shrink-0 text-indigoPop" />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {certification.map((item) => <p key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-indigo-950"><Check className="mt-0.5 size-5 shrink-0 text-green-600" />{item}</p>)}
            </div>
          </section>
        )}

        <section id="programme" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{locale === "fr" ? "Programme" : "Curriculum"}</p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink">{locale === "fr" ? "Un parcours lisible, module par module" : "A clear path, module by module"}</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{moduleCount} {locale === "fr" ? "modules" : "modules"} · {lessonsCount} {locale === "fr" ? "leçons" : "lessons"}</p>
          </div>
          <div className="mb-5 grid gap-3 md:grid-cols-4">
            {firstModules.map((module, index) => <MiniModule key={module.id} index={index} module={module} locale={locale} />)}
          </div>
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
        </section>

        <section className="mt-12 rounded-3xl bg-ink p-6 text-white sm:p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-indigo-100">{locale === "fr" ? "Prêt à pratiquer" : "Ready to practice"}</p>
            <h2 className="mt-3 font-display text-3xl font-black">{locale === "fr" ? "Commence par la première leçon, valide par les tests." : "Start with the first lesson, validate through tests."}</h2>
          </div>
          <a href={startHref} className="primary-button mt-6 shrink-0 md:mt-0">
            {locale === "fr" ? "Démarrer maintenant" : "Start now"}
            <ArrowRight className="size-5" />
          </a>
        </section>

      </div>
    </div>
  );
}

function ProofStat({ value, label }) {
  return <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><p className="font-display text-2xl font-black">{value}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-indigo-100">{label}</p></div>;
}

function ProofLine({ icon: Icon, text }) {
  return <p className="flex items-center gap-2"><Icon className="size-4 shrink-0 text-mint" />{text}</p>;
}

function InfoCard({ icon: Icon, title, text }) {
  return <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><Icon className="size-6 text-indigoPop" /><h2 className="mt-4 text-lg font-black text-ink">{title}</h2><p className="mt-2 leading-7 text-slate-600">{text}</p></article>;
}

function MiniModule({ index, module, locale }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-indigoPop">{locale === "fr" ? "Étape" : "Step"} {index + 1}</p><h3 className="mt-2 font-bold text-ink">{module.title[locale]}</h3><p className="mt-2 text-xs font-semibold text-slate-500">{module.lessons.length} {locale === "fr" ? "leçons" : "lessons"} · {module.totalMinutes} min</p></article>;
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
