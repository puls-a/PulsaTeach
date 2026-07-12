import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileBadge,
  Flame,
  GraduationCap,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy
} from "lucide-react";
import { publicLearningStats, publicTrackCatalog } from "./content/publicTrackCatalog.js";

const featuredTrackIds = ["html", "css", "javascript", "react", "typescript", "node-api"];
const trackVisuals = {
  html: { label: "HTML", tone: "from-orange-500 to-amber-400" },
  css: { label: "CSS", tone: "from-sky-500 to-cyan-400" },
  javascript: { label: "JS", tone: "from-yellow-400 to-orange-400" },
  react: { label: "React", tone: "from-cyan-400 to-indigo-500" },
  typescript: { label: "TS", tone: "from-blue-600 to-indigo-500" },
  "node-api": { label: "API", tone: "from-emerald-500 to-teal-400" }
};

const landingStats = publicLearningStats;

const featuredTracks = featuredTrackIds
  .map((id) => publicTrackCatalog.find((track) => track.id === id))
  .filter(Boolean)
  .map((track) => {
    return {
      id: track.id,
      label: trackVisuals[track.id]?.label || track.id,
      tone: trackVisuals[track.id]?.tone || "from-indigo-500 to-violet-500",
      title: track.title,
      summary: track.summary,
      modules: track.modules,
      lessons: track.lessons,
      href: track.firstHref || "/catalog"
    };
  });

const methodSteps = [
  [BookOpenCheck, "Comprendre", "Des leçons courtes, orientées usage réel, avec vocabulaire relié."],
  [Code2, "Construire", "Des exercices et mini-projets pour transformer la théorie en réflexes."],
  [BrainCircuit, "Valider", "Des quiz plus exigeants, feedbacks et révisions pour retenir longtemps."],
  [FileBadge, "Prouver", "Des projets, certificats et traces de progression partageables."]
];

export default function LandingPage({ locale = "fr" }) {
  const fr = locale === "fr";

  return (
    <div className="overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(85,70,246,.45),transparent_30rem),radial-gradient(circle_at_82%_12%,rgba(57,214,163,.22),transparent_28rem),linear-gradient(135deg,#1e1b4b,#0f172a_56%,#082f49)]" />
        <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-indigo-100 shadow-2xl shadow-indigo-950/30 backdrop-blur">
              <Sparkles className="size-4 text-mint" />
              {fr ? "Plateforme gratuite · code · quiz · projets" : "Free platform · code · quizzes · projects"}
            </div>
            <h1 className="mt-7 max-w-5xl font-display text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {fr ? "Apprends à construire des sites que tu peux vraiment montrer." : "Learn to build websites you can actually show."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300 sm:text-xl">
              {fr
                ? "PulsaTeach te fait passer de petites étapes testables à des projets portfolio : tu codes, tu vérifies, tu expliques tes choix et tu repars avec une preuve de compétence."
                : "PulsaTeach moves you from small testable steps to portfolio projects: you code, verify, explain your choices, and leave with proof of skill."}
            </p>

            <div className="mt-7 grid max-w-3xl gap-3 sm:grid-cols-2">
              {[
                [fr ? "Coder sans page blanche" : "Code without a blank page", fr ? "Objectifs courts, tests immédiats, consignes concrètes." : "Short goals, instant tests, concrete prompts."],
                [fr ? "Comprendre au lieu de recopier" : "Understand instead of copying", fr ? "Quiz avec justification et feedback utile." : "Quizzes with reasoning and useful feedback."],
                [fr ? "Construire un portfolio" : "Build a portfolio", fr ? "Mini-projets puis projets finaux réutilisables." : "Mini-projects then reusable final projects."],
                [fr ? "Progresser sur mobile aussi" : "Progress on mobile too", fr ? "Interface responsive, reprise et streak quotidien." : "Responsive UI, saved progress, and daily streak."]
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="font-display text-lg font-black text-white">{title}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/catalog" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-black text-indigoPop shadow-2xl shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-indigo-50">
                {fr ? "Choisir une formation" : "Choose a course"} <ArrowRight className="size-5" />
              </a>
              <a href="/learn/html/html-getting-started/html-00-what-html-does" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15">
                <PlayCircle className="size-5" /> {fr ? "Démarrer en HTML" : "Start with HTML"}
              </a>
            </div>

            <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              {[
                [landingStats.tracks, fr ? "parcours" : "paths"],
                [landingStats.lessons, fr ? "leçons" : "lessons"],
                [landingStats.projects, fr ? "labs/projets" : "labs/projects"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <dt className="text-[11px] font-black uppercase tracking-[.16em] text-slate-300">{label}</dt>
                  <dd className="mt-2 font-display text-3xl font-black text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-500/35 via-mint/10 to-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/95 p-5 text-ink shadow-2xl shadow-slate-950/40">
              <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950 p-4 text-white">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-mint">Pulsa Session</p>
                  <h2 className="mt-1 font-display text-2xl font-black">{fr ? "Quiz + projet + streak" : "Quiz + project + streak"}</h2>
                </div>
                <div className="grid size-14 place-items-center rounded-2xl bg-indigoPop text-white">
                  <Flame className="size-7" />
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-500">{fr ? "Objectif du jour" : "Daily goal"}</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">+120 XP</span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-black text-ink">{fr ? "Construire une carte responsive" : "Build a responsive card"}</p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigoPop to-mint" />
                  </div>
                </div>

                {[
                  [CheckCircle2, fr ? "Question contextualisée avec explication demandée" : "Contextual question with required explanation"],
                  [Layers3, fr ? "Exercice guidé avec rendu immédiat" : "Guided exercise with instant preview"],
                  [Trophy, fr ? "Certificat vérifiable après projet final" : "Verifiable certificate after final project"]
                ].map(([Icon, text]) => (
                  <div key={text} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigoPop"><Icon className="size-5" /></span>
                    <p className="text-sm font-black leading-6 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">{fr ? "Formations disponibles" : "Available courses"}</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {fr ? "Choisis une compétence, construis une preuve." : "Choose a skill, build proof."}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                {fr
                  ? "Les parcours ne sont pas là pour gonfler un compteur : chaque module doit t’aider à comprendre, coder, corriger, expliquer puis publier quelque chose de vérifiable."
                  : "The paths are not here to inflate a counter: every module should help you understand, code, fix, explain, then publish something verifiable."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, fr ? "Accessibilité & sécurité" : "Accessibility & security"],
                [GraduationCap, fr ? "Progression par compétences" : "Skill-based progress"],
                [BadgeCheck, fr ? "Certificats partageables" : "Shareable certificates"]
              ].map(([Icon, text]) => (
                <div key={text} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <Icon className="size-6 text-indigoPop" />
                  <p className="mt-3 text-sm font-black leading-5 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTracks.map((track) => (
              <a href={track.href} key={track.id} className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-950/10">
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${track.tone} p-[1px]`}>
                  <span className="rounded-2xl bg-white px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-ink">{track.label}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-black text-ink">{track.title[locale]}</h3>
                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">{track.summary[locale]}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <p className="text-xs font-black uppercase tracking-[.13em] text-slate-500">{track.modules} modules · {track.lessons} {fr ? "leçons" : "lessons"}</p>
                  <ArrowRight className="size-5 text-indigoPop transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-[2rem] border border-indigo-100 bg-white p-5 shadow-xl shadow-indigo-950/5 lg:grid-cols-4">
            {methodSteps.map(([Icon, title, text]) => (
              <div key={title} className="rounded-3xl bg-slate-50 p-5">
                <Icon className="size-7 text-indigoPop" />
                <h3 className="mt-4 font-display text-xl font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
