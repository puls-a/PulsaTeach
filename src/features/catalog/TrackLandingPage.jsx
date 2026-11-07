import { useEffect, useState } from "react";
import { ArrowRight, Award, BookOpen, Check, GraduationCap, ArrowLeft, LayoutTemplate, ShieldCheck, Sparkles } from "lucide-react";
import { useSupabaseSession } from "../../authState.js";
import { useLearningTracks } from "../../useLearningTracks.js";
import { getLearnerItem } from "../../learnerStorage.js";
import { findPublicTrack } from "../../content/publicTrackCatalog.js";

// Utility for reading progress from localStorage if offline or getting it from Supabase context
function readProgress() {
  try {
    return JSON.parse(getLearnerItem("pulsateach-learning-progress")) || { completed: {} };
  } catch {
    return { completed: {} };
  }
}

export function TrackLandingPage({ locale = "fr", trackId }) {
  const { user } = useSupabaseSession();
  const { tracks, loading, error, loadTrack } = useLearningTracks({ remoteCatalog: Boolean(user), mode: "summary" });
  const [progress, setProgress] = useState(readProgress);
  const [loadFailure, setLoadFailure] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const refresh = (event) => setProgress(event.detail || readProgress());
    window.addEventListener("pulsateach-progress-synced", refresh);
    return () => window.removeEventListener("pulsateach-progress-synced", refresh);
  }, []);

  useEffect(() => {
    if (!trackId || !findPublicTrack(trackId)) return;
    let active = true;
    setLoadFailure(null);
    loadTrack(trackId).catch(() => {
      if (active) setLoadFailure(trackId);
    });
    return () => { active = false; };
  }, [trackId, loadTrack, retryCount]);

  const track = findPublicTrack(trackId) ? tracks.find(t => t.id === trackId) : null;

  if (!findPublicTrack(trackId)) return <UnknownTrack locale={locale} trackId={trackId} />;

  if ((loadFailure === trackId || error) && (!track || track.isSummary)) {
    return (
      <section className="app-page grid min-h-screen place-items-center bg-slate-50">
        <div className="surface max-w-xl text-center">
          <p className="eyebrow">{locale === "fr" ? "Chargement interrompu" : "Loading interrupted"}</p>
          <h1 className="mt-3 font-display text-3xl font-black text-ink">{locale === "fr" ? "Impossible de charger la formation" : "Unable to load this course"}</h1>
          <p role="alert" className="mt-3 leading-7 text-slate-600">{locale === "fr" ? "Vérifie ta connexion puis réessaie. Ta progression enregistrée est conservée." : "Check your connection and try again. Your saved progress is preserved."}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" className="primary-button" onClick={() => setRetryCount((count) => count + 1)}>{locale === "fr" ? "Réessayer" : "Try again"}</button>
            <a href="/catalog" className="secondary-button">{locale === "fr" ? "Retour au catalogue" : "Back to catalog"}</a>
          </div>
        </div>
      </section>
    );
  }

  if ((!track && loading) || track?.isSummary) {
    return (
      <section className="app-page grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center text-slate-500">
          <p role="status">{locale === "fr" ? "Chargement de la formation..." : "Loading course..."}</p>
        </div>
      </section>
    );
  }

  if (!track) return <UnknownTrack locale={locale} trackId={trackId} />;

  const lessonsCount = track.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalMinutes = track.modules.reduce((sum, m) => sum + (m.totalMinutes || 0), 0);
  const projects = track.modules.flatMap(m => m.lessons).filter(l => l.type === "project").length;
  const completed = track.modules.flatMap(m => m.lessons).filter(l => progress.completed?.[l.id]).length;
  const moduleCount = track.modules.length;
  const certification = track.certification?.[locale] || [];
  
  const resumeTarget = getTrackResumeTarget(track, progress);
  const startHref = resumeTarget.href;
  const primaryLabel = resumeTarget.complete
    ? (locale === "fr" ? "Voir mes certifications" : "View my certifications")
    : completed
      ? (locale === "fr" ? "Continuer la formation" : "Continue course")
      : (locale === "fr" ? "Commencer gratuitement" : "Start for free");

  return (
    <div className="min-h-screen bg-cloud pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="mb-8" aria-label={locale === "fr" ? "Fil d'Ariane" : "Breadcrumb"}>
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li><a href="/catalog" className="hover:text-indigoPop flex items-center gap-1 transition-colors"><ArrowLeft className="size-4" /> {locale === "fr" ? "Toutes les formations" : "All courses"}</a></li>
          </ol>
        </nav>

        <header className="grid gap-8 border-b border-slate-400 pb-10 lg:grid-cols-3 lg:items-end">
          <div className="lg:col-span-2">
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-indigoPop">
              <LayoutTemplate className="size-3" />
              {locale === "fr" ? "Formation complète" : "Complete course"}
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {localize(track.title, locale)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              {localize(track.summary, locale)}
            </p>
            {track.profession?.[locale] && (
              <p className="mt-6 max-w-3xl border-l-2 border-indigo-400 pl-4 text-sm leading-7 text-indigo-950 sm:text-base">
                {track.profession[locale]}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={startHref} className="primary-button text-base sm:text-lg">
                {primaryLabel}
                <ArrowRight className="size-5" />
              </a>
               <a href="#programme" className="secondary-button text-base">
                {locale === "fr" ? "Voir le programme" : "View curriculum"}
              </a>
            </div>
            {completed > 0 && <div className="mt-6" role="status" aria-live="polite">
              <p className="text-sm font-semibold text-slate-600">{completed}/{lessonsCount} {locale === "fr" ? "leçons validées" : "lessons completed"}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${Math.round(completed / lessonsCount * 100)}%` }} /></div>
            </div>}
          </div>

          <aside className="border-t border-slate-400 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="eyebrow">{locale === "fr" ? "La formation en bref" : "Course at a glance"}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <ProofStat value={moduleCount} label={locale === "fr" ? "modules" : "modules"} />
                <ProofStat value={lessonsCount} label={locale === "fr" ? "leçons" : "lessons"} />
                <ProofStat value={`${Math.ceil(totalMinutes / 60)} h`} label={locale === "fr" ? "guidées" : "guided"} />
                <ProofStat value={projects} label={locale === "fr" ? "projets" : "projects"} />
              </div>
              <div className="mt-5 grid gap-2 text-sm text-slate-600">
                <ProofLine icon={ShieldCheck} text={locale === "fr" ? "Tests automatiques dans le navigateur" : "Browser-based automated checks"} />
                <ProofLine icon={Award} text={locale === "fr" ? "Certification soumise aux évaluations requises" : "Certification requires passing the required assessments"} />
                <ProofLine icon={Sparkles} text={locale === "fr" ? "Projet final présentable en portfolio" : "Portfolio-ready capstone project"} />
              </div>
            </div>
          </aside>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="border-t border-slate-400 pt-6">
            <p className="eyebrow">{locale === "fr" ? "Résultats" : "Outcomes"}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{locale === "fr" ? "Ce que tu sauras construire" : "What you will be able to build"}</h2>
            <ul className="mt-6 grid gap-3 text-slate-600">
              {(track.outcomes?.[locale] || []).map((item) => <li className="flex gap-3 border-b border-slate-300 pb-3" key={item}><Check className="mt-0.5 size-5 shrink-0 text-green-700" />{item}</li>)}
            </ul>
          </div>
          <div className="grid gap-4">
            <InfoCard icon={GraduationCap} title={locale === "fr" ? "Projet final" : "Capstone project"} text={track.capstone?.[locale]} />
            <InfoCard icon={BookOpen} title={locale === "fr" ? "Prérequis" : "Prerequisites"} text={(track.prerequisites?.[locale] || []).join(" · ") || (locale === "fr" ? "Aucun prérequis spécifique." : "No specific prerequisite.")} />
          </div>
        </section>

        {certification.length > 0 && (
          <section className="mt-12 border-y border-slate-400 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">{locale === "fr" ? "Certification" : "Certification"}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{locale === "fr" ? "Les critères sont visibles avant l’évaluation" : "Criteria are visible before assessment"}</h2>
              </div>
              <Award className="size-10 shrink-0 text-indigoPop" />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {certification.map((item) => <p key={item} className="flex gap-3 border-l-2 border-indigo-300 bg-white p-4 text-sm leading-6 text-indigo-950"><Check className="mt-0.5 size-5 shrink-0 text-green-700" />{item}</p>)}
            </div>
          </section>
        )}

        <section id="programme" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{locale === "fr" ? "Programme" : "Curriculum"}</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-ink">{locale === "fr" ? "Le travail, module par module" : "The work, module by module"}</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{moduleCount} {locale === "fr" ? "modules" : "modules"} · {lessonsCount} {locale === "fr" ? "leçons" : "lessons"}</p>
          </div>
          <div className="divide-y divide-slate-300 border-y border-slate-300">
            {track.modules.map((module, index) => {
              const moduleCompleted = module.lessons.filter((lesson) => progress.completed?.[lesson.id]).length;
               const moduleTarget = getModuleResumeTarget(track.id, module, progress);
               const moduleHref = moduleTarget.href;
               const moduleComplete = module.lessons.length > 0 && moduleCompleted === module.lessons.length;
              const mastery = formatModuleField(module.mastery?.[locale]);
              return (
                <a key={module.id} href={moduleHref} className="group relative flex flex-col gap-4 bg-white p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center">
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold ${moduleComplete ? "bg-green-100 text-green-700" : "border border-slate-300 text-slate-600 group-hover:border-indigo-300 group-hover:text-indigoPop"}`}>
                    {moduleComplete ? <Check className="size-6" aria-hidden="true" /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink sm:text-lg">{module.title[locale]}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{module.description?.[locale]}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {module.deliverable?.[locale] && <span className="inline-block rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">{locale === "fr" ? "Livrable" : "Deliverable"}: {module.deliverable[locale]}</span>}
                      {mastery && <span className="inline-block rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{locale === "fr" ? "Maîtrise" : "Mastery"}: {mastery}</span>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-center">
                     <span className="text-sm font-semibold text-slate-500">{module.totalMinutes} min</span>
                     <span className="mt-1 text-xs font-medium text-slate-500">{moduleCompleted}/{module.lessons.length} {locale === "fr" ? "leçons" : "lessons"}</span>
                     <span className="mt-2 text-sm font-bold text-indigo-700">{moduleComplete ? (locale === "fr" ? "Revoir le module" : "Review module") : moduleCompleted ? (locale === "fr" ? "Reprendre le module" : "Resume module") : (locale === "fr" ? "Découvrir le module" : "Explore module")}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-12 border-t border-ink pt-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="eyebrow">{locale === "fr" ? "Prêt à pratiquer" : "Ready to practice"}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{resumeTarget.complete ? (locale === "fr" ? "Leçons terminées : consulte les critères de certification." : "Lessons completed: check the certification requirements.") : completed ? (locale === "fr" ? "Reprends à la prochaine leçon à valider." : "Continue with your next unfinished lesson.") : (locale === "fr" ? "Ouvre la première leçon et suis les consignes." : "Open the first lesson and follow the instructions.")}</h2>
          </div>
          <a href={startHref} className="primary-button mt-6 shrink-0 md:mt-0">
            {resumeTarget.complete ? (locale === "fr" ? "Voir mes certificats" : "View certificates") : completed ? (locale === "fr" ? "Reprendre maintenant" : "Resume now") : (locale === "fr" ? "Démarrer maintenant" : "Start now")}
            <ArrowRight className="size-5" />
          </a>
        </section>

      </div>
    </div>
  );
}

export function getTrackResumeTarget(track, progress) {
  for (const module of track.modules || []) {
    const lesson = (module.lessons || []).find((item) => !progress.completed?.[item.id]);
    if (lesson) return { href: `/learn/${track.id}/${module.id}/${lesson.id}`, complete: false };
  }
  const hasLessons = (track.modules || []).some((module) => module.lessons?.length);
  return { href: hasLessons ? "/certification" : "/catalog", complete: hasLessons };
}

export function getModuleResumeTarget(trackId, module, progress) {
  const lessons = module.lessons || [];
  const next = lessons.find((lesson) => !progress.completed?.[lesson.id]) || lessons[0];
  return { href: next ? `/learn/${trackId}/${module.id}/${next.id}` : `/formations/${trackId}` };
}

function ProofStat({ value, label }) {
  return <div className="border-l-2 border-slate-300 pl-3"><p className="font-display text-2xl font-semibold text-ink">{value}</p><p className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-500">{label}</p></div>;
}

function formatModuleField(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function ProofLine({ icon: Icon, text }) {
  return <p className="flex items-center gap-2"><Icon className="size-4 shrink-0 text-emerald-700" />{text}</p>;
}

function InfoCard({ icon: Icon, title, text }) {
  return <article className="border-t border-slate-400 pt-5"><Icon className="size-5 text-indigoPop" /><h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2><p className="mt-2 leading-7 text-slate-600">{text}</p></article>;
}

function UnknownTrack({ locale, trackId }) {
  return (
    <section className="app-page grid min-h-screen place-items-center bg-slate-50">
      <div className="surface max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-3xl font-black text-ink">{locale === "fr" ? "Formation introuvable" : "Course not found"}</h1>
        <p className="mt-3 leading-7 text-slate-600">
          {locale === "fr"
            ? `La formation "${trackId || "inconnue"}" n'existe pas dans le catalogue public PulsaTeach.`
            : `The "${trackId || "unknown"}" course does not exist in the public PulsaTeach catalog.`}
        </p>
        <a href="/catalog" className="primary-button mt-6">{locale === "fr" ? "Retour aux formations" : "Back to courses"}</a>
      </div>
    </section>
  );
}

function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.fr || value.en || "";
  return String(value || "");
}
