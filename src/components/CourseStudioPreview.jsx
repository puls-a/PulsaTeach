import { CheckCircle2, Eye } from "lucide-react";

export default function LessonPreview({ lesson, locale }) {
  const copy = lesson.course?.[locale] || lesson.course?.fr || {};
  return (
    <aside className="h-fit rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm 2xl:sticky 2xl:top-24">
      <div className="flex items-center gap-2 text-sm font-bold text-indigoPop"><Eye className="size-4" />Prévisualisation apprenant</div>
      <h2 className="mt-4 font-display text-3xl font-bold">{lesson.title?.[locale] || lesson.title?.fr}</h2>
      <p className="mt-3 leading-7 text-slate-600">{copy.introduction || lesson.brief?.[locale]}</p>
      <PreviewList title="Objectifs" items={copy.objectives} />
      <PreviewList title="Vocabulaire" items={copy.vocabulary} />
      <PreviewList title="À retenir" items={copy.rules} />
      {lesson.type === "quiz" ? (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-bold">{lesson.questions?.length || 0} questions · {lesson.passingScore || 70}% requis</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600">{(lesson.questions || []).map((question, index) => <li key={question.id}>{index + 1}. {question.prompt?.[locale] || question.prompt?.fr}</li>)}</ul>
        </div>
      ) : <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <div className="bg-slate-900 px-4 py-2 text-xs font-bold text-white">Éditeur · {lesson.type}</div>
        <pre tabIndex={0} aria-label={locale === "fr" ? "Code de départ scrollable" : "Scrollable starter code"} className="max-h-64 overflow-auto bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{lesson.starterCode}</code></pre>
      </div>}
      {lesson.type !== "quiz" && <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <p className="font-bold">{lesson.tests?.length || 0} tests automatiques</p>
        <ul className="mt-2 grid gap-1 text-xs text-slate-600">{(lesson.tests || []).map((test, index) => <li key={`${test.label}-${index}`}>• {test.label}</li>)}</ul>
      </div>}
    </aside>
  );
}

function PreviewList({ title, items = [] }) {
  if (!items.length) return null;
  return <div className="mt-5"><h3 className="font-bold">{title}</h3><ul className="mt-2 grid gap-2 text-sm text-slate-600">{items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />{typeof item === "string" ? item : JSON.stringify(item)}</li>)}</ul></div>;
}
