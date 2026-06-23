import { ArrowRight, CheckCircle2, Code2, FileBadge, ShieldCheck, Sparkles } from "lucide-react";

const landingStats = { tracks: 13, lessons: 272 };
const featuredTracks = [
  { id: "html", label: "HTML", title: { fr: "HTML interactif", en: "Interactive HTML" }, summary: { fr: "Structure, sémantique, formulaires, accessibilité et projet final.", en: "Structure, semantics, forms, accessibility, and final project." }, modules: 4, lessons: 22, href: "/learn/html/html-foundations/html-01-document-skeleton" },
  { id: "css", label: "CSS", title: { fr: "CSS responsive", en: "Responsive CSS" }, summary: { fr: "Flexbox, grilles, responsive, animations sobres et interfaces solides.", en: "Flexbox, grids, responsive design, calm animations, and solid interfaces." }, modules: 6, lessons: 27, href: "/learn/css/css-foundations/css-01-selectors" },
  { id: "javascript", label: "JS", title: { fr: "JavaScript pratique", en: "Practical JavaScript" }, summary: { fr: "Logique, DOM, événements, async, debugging et mini-projets.", en: "Logic, DOM, events, async, debugging, and mini-projects." }, modules: 5, lessons: 23, href: "/learn/javascript/js-foundations/js-01-values" },
  { id: "react", label: "REACT", title: { fr: "React métier", en: "Business React" }, summary: { fr: "Composants, hooks, formulaires, routing, données et tests.", en: "Components, hooks, forms, routing, data, and tests." }, modules: 4, lessons: 20, href: "/learn/react/react-components/react-01-component" },
  { id: "typescript", label: "TS", title: { fr: "TypeScript", en: "TypeScript" }, summary: { fr: "Types, unions, fonctions, contrats API et sécurité de refactor.", en: "Types, unions, functions, API contracts, and safer refactors." }, modules: 4, lessons: 20, href: "/learn/typescript/typescript-foundations/ts-01-primitive-types" },
  { id: "node", label: "API", title: { fr: "Node.js API", en: "Node.js API" }, summary: { fr: "Routes, validation, auth, erreurs, base de données et tests API.", en: "Routes, validation, auth, errors, database, and API tests." }, modules: 4, lessons: 20, href: "/learn/node-api/node-api-foundations/node-01-routing" }
];

export default function LandingPage({ locale = "fr" }) {
  const fr = locale === "fr";

  return (
    <section className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0e7ff,transparent_34rem),linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="eyebrow">{fr ? "Plateforme gratuite pour apprendre le web" : "Free platform to learn the web"}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-black tracking-tight text-ink sm:text-6xl">
            {fr ? "Apprends le développement web en construisant, pas en recopiant." : "Learn web development by building, not copying."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            {fr
              ? "PulsaTeach réunit cours progressifs, quiz exigeants, exercices interactifs, projets, révisions et certificats vérifiables pour passer des bases HTML/CSS/JS à une vraie pratique full-stack."
              : "PulsaTeach combines progressive courses, demanding quizzes, interactive exercises, projects, reviews, and verifiable certificates to move from HTML/CSS/JS basics to real full-stack practice."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/catalog" className="primary-button">
              {fr ? "Voir les formations gratuites" : "Browse free courses"} <ArrowRight className="size-5" />
            </a>
            <a href="/learn/html/html-foundations/html-01-document-skeleton" className="secondary-button">
              {fr ? "Essayer une leçon HTML" : "Try an HTML lesson"}
            </a>
          </div>
          <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            {[
              [landingStats.tracks, fr ? "formations" : "courses"],
              [landingStats.lessons, fr ? "leçons" : "lessons"],
              ["0€", fr ? "accès gratuit" : "free access"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur">
                <dt className="text-xs font-bold uppercase tracking-[.14em] text-slate-500">{label}</dt>
                <dd className="mt-2 font-display text-2xl font-black text-indigoPop">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-indigoPop">{fr ? "Ce que tu vas faire" : "What you will do"}</p>
              <h2 className="mt-1 font-display text-2xl font-black text-ink">{fr ? "Un parcours clair, du code réel." : "A clear path, real code."}</h2>
            </div>
            <Sparkles className="size-8 text-indigoPop" />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              [Code2, fr ? "Coder dans le navigateur avec feedback immédiat." : "Code in the browser with immediate feedback."],
              [CheckCircle2, fr ? "Valider par quiz multi-types et preuves de réussite." : "Validate with multi-type quizzes and proof of completion."],
              [FileBadge, fr ? "Construire des projets et débloquer des certificats." : "Build projects and unlock certificates."],
              [ShieldCheck, fr ? "Apprendre aussi accessibilité, sécurité, tests et performance." : "Also learn accessibility, security, testing, and performance."]
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigoPop"><Icon className="size-5" /></span>
                <p className="text-sm font-bold leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{fr ? "Formations disponibles" : "Available courses"}</p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink">{fr ? "Commence par une compétence utile." : "Start with a useful skill."}</h2>
          </div>
          <a href="/catalog" className="hidden text-sm font-extrabold text-indigoPop sm:inline-flex">{fr ? "Tout le catalogue" : "Full catalog"} →</a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredTracks.map((track) => (
            <a href={track.href} key={track.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
              <p className="text-xs font-black uppercase tracking-[.16em] text-indigoPop">{track.label}</p>
              <h3 className="mt-3 font-display text-xl font-black text-ink">{track.title[locale]}</h3>
              <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">{track.summary[locale]}</p>
              <p className="mt-4 text-xs font-bold text-slate-500">{track.modules} modules · {track.lessons} {fr ? "leçons" : "lessons"}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
