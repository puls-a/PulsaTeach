import { ArrowRight, BookOpenCheck, CheckCircle2, Code2, PlayCircle } from "lucide-react";
import { publicTrackCatalog } from "./content/publicTrackCatalog.js";

const trackVisuals = {
  tools: { label: "OUTILS", accent: "border-violet-500" },
  html: { label: "HTML", accent: "border-orange-500" },
  css: { label: "CSS", accent: "border-sky-500" }
};

const methodSteps = [
  { title: { fr: "Lire la tâche", en: "Read the task" }, text: { fr: "Comprends le résultat attendu avant de toucher au code.", en: "Understand the expected result before touching the code." } },
  { title: { fr: "Modifier", en: "Edit" }, text: { fr: "Travaille dans le navigateur et observe immédiatement le rendu.", en: "Work in the browser and inspect the output immediately." } },
  { title: { fr: "Vérifier", en: "Check" }, text: { fr: "Lance des tests précis et corrige le premier échec utile.", en: "Run precise checks and fix the first useful failure." } },
  { title: { fr: "Réutiliser", en: "Reuse" }, text: { fr: "Assemble les acquis dans un projet que tu peux expliquer.", en: "Combine what you learned in a project you can explain." } }
];

export default function LandingPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const tracks = publicTrackCatalog.filter((track) => trackVisuals[track.id]);

  return (
    <div className="overflow-x-clip bg-cloud text-ink">
      <section className="border-b border-slate-300 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">{fr ? "Atelier web gratuit · dans le navigateur" : "Free web workshop · in your browser"}</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.04em] text-ink sm:text-6xl lg:text-7xl">
              {fr ? "Construis une vraie page web. Comprends chaque ligne." : "Build a real web page. Understand every line."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              {fr
                ? "PulsaTeach te guide de la première balise HTML à une interface CSS responsive. Tu lis une tâche, modifies le code et vérifies le résultat avec des tests visibles."
                : "PulsaTeach guides you from your first HTML element to a responsive CSS interface. Read a task, edit code, and verify the result with visible checks."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/learn/html/html-getting-started/html-00-what-html-does" className="primary-button text-base">
                <PlayCircle className="size-5" />{fr ? "Commencer HTML · 10 min" : "Start HTML · 10 min"}
              </a>
              <a href="/catalog" className="secondary-button text-base">
                {fr ? "Comparer les formations" : "Compare courses"}<ArrowRight className="size-4" />
              </a>
            </div>
            <ul className="mt-8 grid gap-3 border-t border-slate-300 pt-6 text-sm text-slate-700 sm:grid-cols-3">
              {[fr ? "Sans compte pour essayer" : "Try without an account", fr ? "Code sauvegardé localement" : "Code saved locally", fr ? "Contenus français et anglais" : "French and English content"].map((item) => (
                <li className="flex items-center gap-2" key={item}><CheckCircle2 className="size-4 shrink-0 text-indigoPop" />{item}</li>
              ))}
            </ul>
          </div>

          <WorkshopPreview locale={locale} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="starting-points-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-slate-300 pb-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p className="eyebrow">{fr ? "Choisis ton point de départ" : "Choose your starting point"}</p>
              <h2 id="starting-points-title" className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {fr ? "Un parcours court avant chaque nouvelle difficulté." : "A clear path before every new challenge."}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">
              {fr ? "Tes outils sont prêts ? Commence directement par HTML. Tu connais déjà la structure d’une page ? Passe à CSS." : "Tools already set up? Start directly with HTML. Already understand page structure? Move to CSS."}
            </p>
          </div>

          <div className="mt-8 grid border-y border-slate-300 md:grid-cols-3 md:divide-x md:divide-slate-300">
            {tracks.map((track, index) => {
              const visual = trackVisuals[track.id];
              return (
                <a href={track.firstHref || "/catalog"} key={track.id} className={`group border-l-4 ${visual.accent} bg-white px-5 py-6 transition-colors hover:bg-slate-50 md:border-l-0 md:border-t-4`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold tracking-[.14em] text-slate-500">0{index + 1} · {visual.label}</span>
                    <ArrowRight className="size-4 text-indigoPop" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{track.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{track.summary[locale]}</p>
                  <p className="mt-6 font-mono text-xs text-slate-500">{track.modules} {track.modules === 1 ? "module" : "modules"} · {track.lessons} {fr ? "leçons" : "lessons"}</p>
                </a>
              );
            })}
          </div>

          <section className="mt-20 grid gap-8 lg:grid-cols-[.65fr_1.35fr]" aria-labelledby="method-title">
            <div>
              <p className="eyebrow">{fr ? "Une leçon, quatre gestes" : "One lesson, four actions"}</p>
              <h2 id="method-title" className="mt-3 font-display text-4xl font-semibold leading-tight">{fr ? "Pas de tableau de bord décoratif. Du travail observable." : "No decorative dashboard. Observable work."}</h2>
            </div>
            <ol className="border-t border-slate-400">
              {methodSteps.map((step, index) => (
                <li className="grid gap-2 border-b border-slate-300 py-5 sm:grid-cols-[4rem_12rem_1fr] sm:items-baseline" key={step.title.fr}>
                  <span className="font-mono text-sm text-indigoPop">0{index + 1}</span>
                  <h3 className="text-base font-semibold">{step.title[locale]}</h3>
                  <p className="text-sm leading-6 text-slate-600">{step.text[locale]}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-20 flex flex-col gap-5 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">{fr ? "Premier exercice" : "First exercise"}</p>
              <p className="mt-2 font-display text-3xl font-semibold">{fr ? "Découvre ce que fait HTML avant d’écrire une page." : "See what HTML does before writing a page."}</p>
            </div>
            <a href="/learn/html/html-getting-started/html-00-what-html-does" className="primary-button shrink-0">{fr ? "Ouvrir la leçon" : "Open lesson"}<ArrowRight className="size-4" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorkshopPreview({ locale }) {
  const fr = locale === "fr";
  return (
    <figure className="min-w-0 overflow-hidden rounded-lg border border-slate-400 bg-white shadow-clay" aria-label={fr ? "Exemple de l’atelier PulsaTeach" : "PulsaTeach workshop example"}>
      <figcaption className="flex items-center justify-between border-b border-slate-300 bg-[#18201f] px-4 py-3 text-white">
        <span className="flex items-center gap-2 font-mono text-xs"><Code2 className="size-4 text-cyan-300" />index.html</span>
        <span className="font-mono text-xs text-emerald-300">{fr ? "3 tests réussis" : "3 checks passed"}</span>
      </figcaption>
      <div className="grid md:grid-cols-[.78fr_1.22fr]">
        <div className="border-b border-slate-300 p-5 md:border-b-0 md:border-r">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[.12em] text-indigoPop">01 · {fr ? "Consigne" : "Task"}</p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight">{fr ? "Une carte lisible sur petit écran" : "A readable card on a small screen"}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{fr ? "Ajoute un titre et un paragraphe, puis relie correctement leur structure." : "Add a heading and paragraph, then connect their structure correctly."}</p>
          <div className="mt-6 border-l-2 border-amber-500 pl-3 text-sm leading-6 text-slate-700">{fr ? "Indice : commence par l’élément qui décrit le contenu principal." : "Hint: start with the element describing the main content."}</div>
        </div>
        <div className="bg-[#101817] p-5 text-slate-100">
          <p className="font-mono text-[11px] uppercase tracking-[.12em] text-slate-400">02 · {fr ? "Code" : "Code"}</p>
          <pre className="mt-4 overflow-x-auto font-mono text-sm leading-7"><code><span className="text-sky-300">&lt;main&gt;</span>{"\n  "}<span className="text-sky-300">&lt;article</span> <span className="text-amber-200">class</span>=<span className="text-emerald-300">&quot;card&quot;</span><span className="text-sky-300">&gt;</span>{"\n    "}<span className="text-sky-300">&lt;h1&gt;</span>PulsaConf<span className="text-sky-300">&lt;/h1&gt;</span>{"\n    "}<span className="text-sky-300">&lt;p&gt;</span>Atelier CSS<span className="text-sky-300">&lt;/p&gt;</span>{"\n  "}<span className="text-sky-300">&lt;/article&gt;</span>{"\n"}<span className="text-sky-300">&lt;/main&gt;</span></code></pre>
          <div className="mt-6 grid gap-2 border-t border-white/15 pt-4 text-xs">
            {[fr ? "Un contenu principal" : "One main landmark", fr ? "Un titre unique" : "One unique heading", fr ? "Une carte structurée" : "One structured card"].map((item) => <p className="flex items-center gap-2" key={item}><CheckCircle2 className="size-4 text-emerald-300" />{item}</p>)}
          </div>
        </div>
      </div>
    </figure>
  );
}
