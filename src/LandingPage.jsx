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
  { icon: BookOpenCheck, title: { fr: "Comprendre", en: "Understand" }, text: { fr: "Une notion courte, reliée à un usage réel.", en: "One short concept tied to a real use case." } },
  { icon: Code2, title: { fr: "Construire", en: "Build" }, text: { fr: "Du code guidé, puis une réalisation personnelle.", en: "Guided code, then a project of your own." } },
  { icon: BrainCircuit, title: { fr: "Valider", en: "Validate" }, text: { fr: "Des tests, du feedback et des révisions ciblées.", en: "Tests, feedback, and focused review." } },
  { icon: FileBadge, title: { fr: "Prouver", en: "Prove" }, text: { fr: "Un projet publiable et une progression traçable.", en: "A publishable project and traceable progress." } }
];

export default function LandingPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const benefits = [
    [Code2, fr ? "Coder tout de suite" : "Code right away", fr ? "Des objectifs courts, jamais de page blanche." : "Short goals, never a blank page."],
    [BrainCircuit, fr ? "Comprendre vraiment" : "Understand deeply", fr ? "Chaque réponse demande un raisonnement." : "Every answer asks for reasoning."],
    [Trophy, fr ? "Construire du concret" : "Build real work", fr ? "Des projets pensés pour ton portfolio." : "Projects designed for your portfolio."],
    [Flame, fr ? "Garder le rythme" : "Keep momentum", fr ? "Une session claire, même sur mobile." : "One clear session, even on mobile."]
  ];

  return (
    <div className="overflow-x-clip bg-slate-950 text-white">
      <section className="relative px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(85,70,246,.45),transparent_30rem),radial-gradient(circle_at_82%_12%,rgba(57,214,163,.22),transparent_28rem),linear-gradient(135deg,#1e1b4b,#0f172a_56%,#082f49)]" />
        <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-indigo-100 shadow-2xl shadow-indigo-950/30 backdrop-blur sm:px-4">
              <Sparkles className="size-4 shrink-0 text-mintPop" />
              {fr ? "Plateforme gratuite · code · quiz · projets" : "Free platform · code · quizzes · projects"}
            </div>
            <h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-none tracking-tight text-white sm:mt-7 sm:text-6xl lg:text-7xl">
              {fr ? "Apprends le web en construisant" : "Learn the web by building"}{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-white to-emerald-300 bg-clip-text text-transparent">
                {fr ? "des preuves." : "real proof."}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-300 sm:mt-6 sm:text-xl sm:leading-8">
              {fr
                ? "Pas de vidéos à collectionner. Tu codes, tu testes, tu expliques tes choix et tu termines chaque parcours avec un projet que tu peux montrer."
                : "No videos to collect. You code, test, explain your choices, and finish every path with a project you can show."}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {fr
                ? "PulsaTeach est une plateforme gratuite pour apprendre le développement web : cours HTML, CSS, JavaScript, React, TypeScript, Node.js et projets pratiques directement dans le navigateur."
                : "PulsaTeach is a free platform for learning web development through HTML, CSS, JavaScript, React, TypeScript, Node.js, and hands-on browser-based projects."}
            </p>

            <div className="mt-6 grid max-w-3xl grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
              {benefits.map(([Icon, title, text]) => (
                <div key={title} className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:p-4">
                  <div className="flex items-center gap-2 text-white">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-300"><Icon className="size-4" /></span>
                    <p className="font-display text-sm font-black leading-5 sm:text-base">{title}</p>
                  </div>
                  <p className="mt-2 hidden text-sm font-semibold leading-5 text-slate-300 sm:block">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <a href="/catalog" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-black text-indigoPop shadow-2xl shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-indigo-50">
                {fr ? "Choisir une formation" : "Choose a course"} <ArrowRight className="size-5" />
              </a>
              <a href="/learn/html/html-getting-started/html-00-what-html-does" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15">
                <PlayCircle className="size-5" /> {fr ? "Démarrer en HTML" : "Start with HTML"}
              </a>
            </div>

            <dl className="m-0 mt-7 grid max-w-2xl grid-cols-3 gap-2.5 sm:mt-9 sm:gap-3">
              {[
                [landingStats.tracks, fr ? "parcours" : "paths"],
                [landingStats.lessons, fr ? "leçons" : "lessons"],
                [landingStats.projects, fr ? "projets" : "projects"]
              ].map(([value, label]) => (
                <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-white/10 px-2 py-3 text-center backdrop-blur sm:rounded-3xl sm:p-4 sm:text-left">
                  <dt className="truncate text-[9px] font-black uppercase tracking-[.12em] text-slate-300 sm:text-[11px] sm:tracking-[.16em]">{label}</dt>
                  <dd className="m-0 mt-1 font-display text-2xl font-black text-white sm:mt-2 sm:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-w-0 lg:pl-2">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/35 via-emerald-400/10 to-white/10 blur-2xl sm:-inset-6 sm:rounded-[3rem]" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/95 p-3 text-ink shadow-2xl shadow-slate-950/40 sm:p-5">
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-slate-950 p-4 text-white sm:gap-4 sm:rounded-3xl">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-300 sm:text-xs">Pulsa Session</p>
                  <h2 className="mt-1 font-display text-xl font-black leading-tight sm:text-2xl">{fr ? "Quiz + projet + streak" : "Quiz + project + streak"}</h2>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-indigoPop text-white sm:size-14">
                  <Flame className="size-6 sm:size-7" />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:rounded-3xl sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-black text-slate-500">{fr ? "Objectif du jour" : "Daily goal"}</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">+120 XP</span>
                  </div>
                  <p className="mt-3 font-display text-xl font-black leading-tight text-ink sm:text-2xl">{fr ? "Construire une carte responsive" : "Build a responsive card"}</p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigoPop to-mintPop" />
                  </div>
                </div>

                {[
                  [CheckCircle2, fr ? "Question contextualisée avec explication demandée" : "Contextual question with required explanation"],
                  [Layers3, fr ? "Exercice guidé avec rendu immédiat" : "Guided exercise with instant preview"],
                  [Trophy, fr ? "Certificat vérifiable après projet final" : "Verifiable certificate after final project"]
                ].map(([Icon, text]) => (
                  <div key={text} className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigoPop sm:size-11 sm:rounded-2xl"><Icon className="size-5" /></span>
                    <p className="text-sm font-black leading-6 text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 text-ink sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-10">
            <div>
              <p className="eyebrow">{fr ? "Formations disponibles" : "Available courses"}</p>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                {fr ? "Choisis une compétence, construis une preuve." : "Choose a skill, build proof."}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                {fr
                  ? "Les parcours ne sont pas là pour gonfler un compteur : chaque module doit t’aider à comprendre, coder, corriger, expliquer puis publier quelque chose de vérifiable."
                  : "The paths are not here to inflate a counter: every module should help you understand, code, fix, explain, then publish something verifiable."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                [ShieldCheck, fr ? "Accessibilité & sécurité" : "Accessibility & security"],
                [GraduationCap, fr ? "Progression par compétences" : "Skill-based progress"],
                [BadgeCheck, fr ? "Certificats partageables" : "Shareable certificates"]
              ].map(([Icon, text]) => (
                <div key={text} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                  <Icon className="size-5 text-indigoPop sm:size-6" />
                  <p className="mt-2 text-[11px] font-black leading-4 text-slate-700 sm:mt-3 sm:text-sm sm:leading-5">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTracks.map((track) => (
              <a href={track.href} key={track.id} className="group min-w-0 overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-950/10">
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${track.tone} p-[1px]`}>
                  <span className="rounded-2xl bg-white px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-ink">{track.label}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-black text-ink">{track.title[locale]}</h3>
                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">{track.summary[locale]}</p>
                <div className="mt-5 flex min-w-0 items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <p className="min-w-0 text-xs font-black uppercase tracking-[.1em] text-slate-500 sm:tracking-[.13em]">{track.modules} modules · {track.lessons} {fr ? "leçons" : "lessons"}</p>
                  <ArrowRight className="size-5 shrink-0 text-indigoPop transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-3 rounded-[2rem] border border-indigo-100 bg-white p-3 shadow-xl shadow-indigo-950/5 sm:p-5 lg:grid-cols-4">
            {methodSteps.map(({ icon: Icon, title, text }, index) => (
              <div key={title.fr} className="relative rounded-3xl bg-slate-50 p-5">
                <span className="absolute right-5 top-4 font-display text-4xl font-black text-slate-500" aria-hidden="true">0{index + 1}</span>
                <Icon className="relative size-7 text-indigoPop" />
                <h3 className="relative mt-4 font-display text-xl font-black text-ink">{title[locale]}</h3>
                <p className="relative mt-2 text-sm font-semibold leading-6 text-slate-600">{text[locale]}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-8 text-white shadow-2xl shadow-slate-900/10 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-300">{fr ? "Commence maintenant" : "Start now"}</p>
                <h2 className="mt-2 max-w-2xl font-display text-2xl font-black leading-tight sm:text-3xl">
                  {fr ? "Ta prochaine preuve commence par une première ligne de code." : "Your next proof starts with one line of code."}
                </h2>
              </div>
              <a href="/catalog" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-black text-indigoPop hover:bg-indigo-50">
                {fr ? "Explorer les parcours" : "Explore courses"}<ArrowRight className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
