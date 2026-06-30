import { BadgeCheck, BookOpenCheck, Code2, Eye, HeartHandshake, ShieldCheck, Sparkles, TestTube2 } from "lucide-react";

const proofs = [
  {
    icon: BookOpenCheck,
    title: { fr: "Apprendre par preuves", en: "Learn through proof" },
    text: {
      fr: "Chaque bonne leçon doit produire quelque chose de visible : une structure, un comportement, une correction ou un projet.",
      en: "Every good lesson should produce something visible: a structure, behavior, correction, or project."
    }
  },
  {
    icon: Code2,
    title: { fr: "Éditeur et sandbox", en: "Editor and sandbox" },
    text: {
      fr: "Les exercices se valident dans un environnement isolé, pensé pour tester sans exposer les données du compte.",
      en: "Exercises run in an isolated environment designed for testing without exposing account data."
    }
  },
  {
    icon: TestTube2,
    title: { fr: "Tests et audits", en: "Tests and audits" },
    text: {
      fr: "Le projet contient des audits pédagogiques, SEO, sécurité, accessibilité et build pour limiter les régressions.",
      en: "The project includes learning, SEO, security, accessibility, and build audits to limit regressions."
    }
  },
  {
    icon: ShieldCheck,
    title: { fr: "Respect et sobriété", en: "Respect and restraint" },
    text: {
      fr: "Pas de publicité, pas de vente, pas de promesse magique : seulement un outil gratuit pour progresser avec méthode.",
      en: "No ads, no sales, no magic promise: just a free tool to progress with method."
    }
  }
];

const method = [
  { fr: "une notion claire", en: "one clear concept" },
  { fr: "un exemple court", en: "one short example" },
  { fr: "un exercice testable", en: "one testable exercise" },
  { fr: "un quiz avec justification", en: "one quiz with reasoning" },
  { fr: "une trace de progression", en: "one progress trace" }
];

export default function AboutPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="app-page bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_.86fr] lg:items-center">
          <article className="surface relative overflow-hidden p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-indigo-200/50 blur-3xl" />
            <p className="eyebrow">{fr ? "À propos" : "About"}</p>
            <h1 className="relative mt-4 max-w-4xl font-display text-4xl font-black tracking-tight text-ink sm:text-6xl">
              {fr ? "PulsaTeach aide à passer du “j’ai lu” au “je sais construire”." : "PulsaTeach helps you move from “I read it” to “I can build it.”"}
            </h1>
            <p className="relative mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
              {fr
                ? "C’est un projet personnel, gratuit et non commercial pour apprendre le développement web avec des cours guidés, des quiz plus exigeants, un éditeur intégré, des projets portfolio et des certificats vérifiables."
                : "It is a personal, free, non-commercial project for learning web development with guided lessons, more demanding quizzes, an integrated editor, portfolio projects, and verifiable certificates."}
            </p>
            <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="/catalog" className="primary-button">{fr ? "Explorer les formations" : "Explore courses"}</a>
              <a href="/learn/html/html-foundations/html-01-document-skeleton" className="secondary-button">{fr ? "Commencer par HTML" : "Start with HTML"}</a>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-950/5">
            <div className="grid size-14 place-items-center rounded-2xl bg-indigoPop text-white">
              <Sparkles className="size-7" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-black text-ink">
              {fr ? "La ligne éditoriale" : "Editorial line"}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              {fr
                ? "On s’inspire des bons standards pédagogiques open-source : étapes courtes, tests immédiats, projet fil rouge. Le contenu reste original, écrit pour PulsaTeach, sans copier les cours d’autres plateformes."
                : "We take inspiration from strong open-source learning standards: short steps, instant tests, a project thread. The content remains original, written for PulsaTeach, without copying other platforms."}
            </p>
            <ul className="mt-5 space-y-3">
              {method.map((item) => (
                <li key={item.fr} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-black text-slate-700">
                  <BadgeCheck className="size-5 text-indigoPop" />
                  {item[locale]}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proofs.map(({ icon: Icon, title, text }) => (
            <article key={title.fr} className="surface p-6">
              <Icon className="size-7 text-indigoPop" />
              <h2 className="mt-4 font-display text-xl font-black text-ink">{title[locale]}</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text[locale]}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="surface p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <HeartHandshake className="size-7 text-indigoPop" />
              <h2 className="font-display text-2xl font-black text-ink">{fr ? "Pourquoi faire confiance ?" : "Why trust it?"}</h2>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
              {fr
                ? "PulsaTeach n’affiche pas de fausses métriques marketing. La confiance vient plutôt de choses vérifiables : pages légales claires, absence de modèle payant, sécurité du lab, progression sauvegardée, audits automatisés et amélioration continue des cours."
                : "PulsaTeach does not display fake marketing metrics. Trust comes from verifiable things instead: clear legal pages, no paid model, lab security, saved progress, automated audits, and continuous course improvement."}
            </p>
          </article>
          <article className="surface p-6">
            <div className="flex items-center gap-3">
              <Eye className="size-7 text-indigoPop" />
              <h2 className="font-display text-2xl font-black text-ink">{fr ? "Transparence" : "Transparency"}</h2>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
              {fr
                ? "Le site est gratuit, personnel, sans SIRET car il n’y a pas d’entreprise ni d’activité commerciale déclarée autour de PulsaTeach."
                : "The site is free and personal, with no company registration because there is no declared commercial activity around PulsaTeach."}
            </p>
            <a href="/legal" className="mt-5 inline-flex font-black text-indigoPop underline underline-offset-4">
              {fr ? "Lire les mentions légales" : "Read legal notice"}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
