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

const featuredTrackIds = publicTrackCatalog.map((track) => track.id);
const trackVisuals = {
  html: { label: "HTML", tone: "from-orange-500 to-amber-400" },
  css: { label: "CSS", tone: "from-sky-500 to-cyan-400" },
  tools: { label: "OUTILS", tone: "from-violet-500 to-fuchsia-400" },
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
  { icon: BookOpenCheck, title: { fr: "Comprendre", en: "Understand" }, text: { fr: "Découvre une notion et observe ce qu’elle change dans une page.", en: "Explore a concept and see what it changes on a page." } },
  { icon: Code2, title: { fr: "Essayer", en: "Try" }, text: { fr: "Modifie le code dans l’exercice et compare le résultat à la consigne.", en: "Edit the exercise code and compare the result with the instructions." } },
  { icon: BrainCircuit, title: { fr: "Corriger", en: "Improve" }, text: { fr: "Lance les tests, lis les retours et reprends ce qui ne fonctionne pas encore.", en: "Run the tests, read the feedback, and fix what is not working yet." } },
  { icon: FileBadge, title: { fr: "Construire", en: "Build" }, text: { fr: "Réutilise ce que tu as appris dans un projet et explique tes choix.", en: "Apply what you have learned to a project and explain your choices." } }
];

export default function LandingPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const benefits = [
    [Code2, fr ? "Un exercice pour commencer" : "An exercise to get started", fr ? "Une consigne et du code à modifier dans le navigateur." : "Instructions and code to edit in your browser."],
    [BrainCircuit, fr ? "Des retours pour avancer" : "Feedback to help you progress", fr ? "Les tests t’aident à repérer ce qui reste à corriger." : "Tests help you find what still needs fixing."],
    [Trophy, fr ? "Des projets à montrer" : "Projects you can show", fr ? "Assemble tes connaissances dans une réalisation personnelle." : "Bring your skills together in a project of your own."],
    [Flame, fr ? "À ton rythme" : "At your own pace", fr ? "Reviens sur une notion ou poursuis la leçon suivante." : "Revisit a concept or move on to the next lesson."]
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
                ? "Structure une page en HTML, mets-la en forme avec CSS et vérifie ton code dans des exercices guidés. Puis rassemble ce que tu as appris dans un projet à montrer."
                : "Structure a page with HTML, style it with CSS, and check your code in guided exercises. Then bring what you have learned together in a project you can show."}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {fr
                ? "PulsaTeach est une plateforme gratuite pour apprendre le développement web : poste de travail, HTML, CSS et projets pratiques directement dans le navigateur."
                : "PulsaTeach is a free platform for learning web development through workstation setup, HTML, CSS, and hands-on browser-based projects."}
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
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-300 sm:text-xs">{fr ? "Exemple de session" : "Example session"}</p>
                  <h2 className="mt-1 font-display text-xl font-black leading-tight sm:text-2xl">{fr ? "Du code au résultat" : "From code to result"}</h2>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-indigoPop text-white sm:size-14">
                  <Flame className="size-6 sm:size-7" />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:rounded-3xl sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-black text-slate-500">{fr ? "Objectif de l’exercice" : "Exercise goal"}</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">HTML + CSS</span>
                  </div>
                  <p className="mt-3 font-display text-xl font-black leading-tight text-ink sm:text-2xl">{fr ? "Une carte lisible sur petit écran" : "A card that works on a small screen"}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{fr ? "Ajoute un titre, un texte et une image. Ajuste ensuite la mise en page quand la largeur diminue." : "Add a heading, text, and an image. Then adjust the layout as the screen gets narrower."}</p>
                </div>

                {[
                  [CheckCircle2, fr ? "Lis la consigne et repère le résultat attendu." : "Read the instructions and identify the expected result."],
                  [Layers3, fr ? "Modifie le code et observe l’aperçu." : "Edit the code and inspect the preview."],
                  [Trophy, fr ? "Teste ta solution et explique tes choix." : "Test your solution and explain your choices."]
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
                {fr ? "Des outils à ta première page web." : "From setting up your tools to your first web page."}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                {fr
                  ? "Tu débutes ? Prépare ton espace de travail, puis découvre HTML pour structurer une page et CSS pour sa présentation. Si tes outils sont déjà prêts, commence directement par HTML."
                  : "New to web development? Set up your workspace, then explore HTML for page structure and CSS for presentation. If your tools are ready, start directly with HTML."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                [ShieldCheck, fr ? "Accessibilité & sécurité" : "Accessibility & security"],
                [GraduationCap, fr ? "Progression par compétences" : "Skill-based progress"],
                  [BadgeCheck, fr ? "Certification selon les critères du parcours" : "Certification subject to course requirements"]
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
                  {fr ? "Choisis ton point de départ. La première leçon te guide." : "Choose a starting point. The first lesson will guide you."}
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
