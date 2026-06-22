import { CheckCircle2, Sparkles } from "lucide-react";

export function CourseChapter({ course, theory, locale }) {
  if (!course) return null;
  const content = course[locale] || course.en;
  const reminder = theory?.[locale] || theory?.en;
  return (
    <article className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-indigoPop">{locale === "fr" ? "Cours" : "Lesson"}</p>
        <h4 className="mt-2 font-display text-2xl font-bold text-ink">{locale === "fr" ? "Comprendre avant de pratiquer" : "Understand before practicing"}</h4>
        <p className="mt-3 max-w-4xl leading-7 text-slate-600">{content.introduction}</p>
      </header>
      <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-8">
          {content.sections.map((section, index) => <section key={section.title}><div className="flex items-start gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-indigoPop text-xs font-bold text-white">{index + 1}</span><div><h5 className="font-display text-xl font-bold text-ink">{section.title}</h5><div className="mt-3 grid gap-3">{section.paragraphs.map((paragraph) => <p className="leading-7 text-slate-600" key={paragraph}>{paragraph}</p>)}</div>{section.example && <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-6 text-indigo-100">{section.example}</pre>}</div></div></section>)}
        </div>
        <aside className="grid content-start gap-4">
          {content.vocabulary?.length > 0 && <section className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h5 className="font-display text-lg font-bold">{locale === "fr" ? "Vocabulaire" : "Vocabulary"}</h5><dl className="mt-3 grid gap-3">{content.vocabulary.map(([term, definition]) => <div key={term}><dt className="text-sm font-bold text-indigoPop">{term}</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{definition}</dd></div>)}</dl></section>}
          <section className="rounded-xl border border-green-200 bg-green-50 p-4"><h5 className="font-display text-lg font-bold text-green-900">{locale === "fr" ? "Avant de pratiquer" : "Before practicing"}</h5><ul className="mt-3 grid gap-2">{content.check.map((item) => <li className="flex gap-2 text-sm leading-6 text-green-800" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0" />{item}</li>)}</ul></section>
          {reminder?.points?.length > 0 && <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-4"><h5 className="font-display text-lg font-bold text-indigo-950">{locale === "fr" ? "À retenir" : "Key takeaways"}</h5><ul className="mt-3 grid gap-2">{reminder.points.map((point) => <li className="flex gap-2 text-sm leading-6 text-indigo-900" key={point}><Sparkles className="mt-1 size-4 shrink-0" />{point}</li>)}</ul></section>}
        </aside>
      </div>
    </article>
  );
}

export function PedagogyWorkshop({ pedagogy, locale }) {
  if (!pedagogy) return null;
  const content = pedagogy[locale] || pedagogy.fr;
  if (!content) return null;
  return (
    <section className="mt-5 grid gap-4">
      <details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Préparer la pratique : prérequis et objectifs" : "Prepare for practice: prerequisites and objectives"}</summary><div className="mt-4 grid gap-4 lg:grid-cols-2"><ListCard title={locale === "fr" ? "Prérequis" : "Prerequisites"} items={content.prerequisites} color="green" /><ListCard title={locale === "fr" ? "Objectifs précis" : "Precise objectives"} items={content.objectives} color="indigo" /></div></details>
      <details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer text-xs font-bold uppercase tracking-[.12em] text-slate-500">{locale === "fr" ? "Comparer bonne et mauvaise pratique" : "Compare good and bad practice"}</summary><div className="mt-4 grid gap-4 xl:grid-cols-2"><ComparisonCard title={locale === "fr" ? "Bonne pratique" : "Good practice"} item={content.comparison.good} tone="good" /><ComparisonCard title={locale === "fr" ? "À éviter" : "Avoid this"} item={content.comparison.bad} tone="bad" /></div></details>
      <article className="rounded-xl border border-green-200 bg-green-50 p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-green-700">{locale === "fr" ? "Pratique guidée" : "Guided practice"}</p><h5 className="mt-2 font-display text-xl font-bold text-green-950">{locale === "fr" ? "Construis une première version avec ces étapes" : "Build a first version with these steps"}</h5><ol className="mt-4 grid gap-3">{content.guided.map((step, index) => <li className="flex gap-3 text-sm leading-6 text-green-900" key={step}><span className="grid size-6 shrink-0 place-items-center rounded-full bg-green-700 text-xs font-bold text-white">{index + 1}</span>{step}</li>)}</ol></article>
      <article className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-amber-800">{locale === "fr" ? "Défi autonome complémentaire" : "Additional independent challenge"}</p><p className="mt-2 leading-7 text-amber-950">{content.autonomous}</p></article>
    </section>
  );
}

function ListCard({ title, items, color }) {
  const icon = color === "green" ? "text-green-600" : "text-indigoPop";
  return <article className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{title}</p><ul className="mt-3 grid gap-2 text-sm text-slate-600">{items.map((item) => <li className="flex gap-2" key={item}><CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${icon}`} />{item}</li>)}</ul></article>;
}

function ComparisonCard({ title, item, tone }) {
  const good = tone === "good";
  return <article className={`overflow-hidden rounded-xl border ${good ? "border-green-200" : "border-red-200"}`}><header className={`px-4 py-3 text-sm font-bold ${good ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{title} : {item.title}</header><pre className="overflow-x-auto bg-ink p-4 font-mono text-xs leading-6 text-indigo-100">{item.code}</pre><p className="border-t border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">{item.explanation}</p></article>;
}

export function ProgressiveHints({ pedagogy, fallback, level, locale }) {
  if (level < 1) return null;
  const hints = pedagogy?.[locale]?.hints || pedagogy?.fr?.hints || [fallback?.[locale] || fallback?.en];
  return <section className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4"><h5 className="font-display text-lg font-bold text-amber-950">{locale === "fr" ? "Indices débloqués progressivement" : "Progressive hints"}</h5><ol className="mt-3 grid gap-2">{hints.slice(0, level).map((hint, index) => <li className="flex gap-3 text-sm leading-6 text-amber-900" key={hint}><span className="font-bold">{index + 1}.</span>{hint}</li>)}</ol></section>;
}

export function ExplainedCorrection({ lesson, locale, onLoadSolution }) {
  const pedagogy = lesson.pedagogy?.[locale] || lesson.pedagogy?.fr;
  return <details className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5" open><summary className="cursor-pointer font-display text-xl font-bold text-indigo-950">{locale === "fr" ? "Correction expliquée" : "Explained correction"}</summary>{pedagogy && <><ol className="mt-4 grid gap-2">{pedagogy.correction.map((item, index) => <li className="flex gap-3 text-sm leading-6 text-indigo-900" key={item}><span className="font-bold">{index + 1}.</span>{item}</li>)}</ol><div className="mt-5 grid gap-3 md:grid-cols-2"><SummaryCard label={locale === "fr" ? "Synthèse" : "Summary"} value={pedagogy.summary} /><SummaryCard label={locale === "fr" ? "Ensuite" : "Next"} value={pedagogy.next} /></div></>}<pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-6 text-indigo-100">{lesson.solution}</pre><button type="button" onClick={onLoadSolution} className="secondary-button mt-4 min-h-10 py-2 text-sm">{locale === "fr" ? "Charger cette solution dans l'éditeur" : "Load this solution in the editor"}</button></details>;
}

function SummaryCard({ label, value }) {
  return <div className="rounded-lg bg-white p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-indigo-700">{label}</p><p className="mt-2 text-sm leading-6 text-slate-700">{value}</p></div>;
}

export function LessonGuide({ guide, locale }) {
  if (!guide) return null;
  const localized = guide[locale] || guide.en;
  const sections = [
    { title: locale === "fr" ? "Objectifs" : "Objectives", items: localized.objectives, tone: "bg-indigo-50 text-indigo-700" },
    { title: locale === "fr" ? "Méthode" : "Method", items: localized.steps, tone: "bg-green-50 text-green-700" },
    { title: locale === "fr" ? "Erreurs fréquentes" : "Common mistakes", items: localized.mistakes, tone: "bg-amber-50 text-amber-800" }
  ];
  return <section className="mt-4 grid gap-3 lg:grid-cols-3" aria-label={locale === "fr" ? "Guide de leçon" : "Lesson guide"}>{sections.map((section) => <article className="rounded-xl border border-slate-200 bg-white p-4" key={section.title}><h4 className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-[.08em] ${section.tone}`}>{section.title}</h4><ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">{section.items.map((item, index) => <li className="flex gap-2" key={item}><span className="font-bold text-slate-600">{index + 1}.</span><span>{item}</span></li>)}</ol></article>)}</section>;
}

export function ProjectRubric({ lesson, locale }) {
  const rubric = lesson.rubric?.[locale] || lesson.rubric?.en || ["Pass every required test.", "Keep the code readable.", "Use semantic names and structure."];
  return <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4"><p className="font-display text-xl font-bold">{locale === "fr" ? "Rubrique de validation" : "Validation rubric"}</p><ul className="mt-3 grid gap-2">{rubric.map((item) => <li className="flex gap-2 text-sm font-semibold text-slate-700" key={item}><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />{item}</li>)}</ul></div>;
}
