import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Plus, Save, Trash2 } from "lucide-react";
import { learningTracks } from "./learningContent.js";

const storageKey = "pulsateach-course-drafts";

export default function CourseStudio({ locale = "fr" }) {
  const [drafts, setDrafts] = useState(readDrafts);
  const [form, setForm] = useState({ title: "", description: "", level: "Débutant", language: "fr" });
  const published = useMemo(() => learningTracks.map((track) => ({
    id: track.id,
    title: track.title[locale],
    modules: track.modules.length,
    lessons: track.modules.reduce((sum, module) => sum + module.lessons.length, 0)
  })), [locale]);

  const submit = (event) => {
    event.preventDefault();
    const next = [{ ...form, id: `course-${Date.now()}`, status: "draft", createdAt: new Date().toISOString() }, ...drafts];
    localStorage.setItem(storageKey, JSON.stringify(next));
    setDrafts(next);
    setForm({ ...form, title: "", description: "" });
  };

  const remove = (id) => {
    const next = drafts.filter((draft) => draft.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setDrafts(next);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-5 pb-20 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="eyebrow">Course Studio</p><h1 className="mt-3 font-display text-4xl font-bold">{locale === "fr" ? "Créer et organiser les formations" : "Create and organize courses"}</h1><p className="mt-3 max-w-2xl text-slate-600">{locale === "fr" ? "Crée d'abord la structure d'une formation, puis ajoute ses leçons dans l'espace auteur." : "Create the course structure first, then add lessons in the author workspace."}</p></div>
          <a href="#/author" className="secondary-button">{locale === "fr" ? "Créer des leçons" : "Create lessons"}<ArrowRight className="size-4" /></a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3"><Plus className="size-5 text-indigoPop" /><h2 className="font-display text-2xl font-bold">{locale === "fr" ? "Nouvelle formation" : "New course"}</h2></div>
            <div className="mt-5 grid gap-4">
              <Field label={locale === "fr" ? "Titre" : "Title"} value={form.title} onChange={(title) => setForm({ ...form, title })} required />
              <label className="grid gap-2 text-sm font-bold">{locale === "fr" ? "Description" : "Description"}<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-28 rounded-xl border border-slate-300 p-3 outline-none focus:border-indigoPop" /></label>
              <Field label={locale === "fr" ? "Niveau" : "Level"} value={form.level} onChange={(level) => setForm({ ...form, level })} />
              <button type="submit" className="primary-button"><Save className="size-4" />{locale === "fr" ? "Enregistrer le brouillon" : "Save draft"}</button>
            </div>
          </form>

          <div>
            <h2 className="font-display text-2xl font-bold">{locale === "fr" ? "Formations publiées" : "Published courses"}</h2>
            <div className="mt-4 grid gap-3">
              {published.map((course) => <CourseRow key={course.id} course={course} status="published" />)}
            </div>
            <h2 className="mt-8 font-display text-2xl font-bold">{locale === "fr" ? "Brouillons" : "Drafts"}</h2>
            <div className="mt-4 grid gap-3">
              {!drafts.length && <p className="rounded-xl border border-dashed border-slate-300 p-5 text-slate-500">{locale === "fr" ? "Aucun brouillon de formation." : "No course drafts."}</p>}
              {drafts.map((course) => <CourseRow key={course.id} course={course} status="draft" onRemove={() => remove(course.id)} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseRow({ course, status, onRemove }) {
  return <article className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"><span className="grid size-11 place-items-center bg-slate-100"><BookOpen className="size-5" /></span><div className="min-w-0 flex-1"><h3 className="font-bold">{course.title}</h3><p className="mt-1 text-sm text-slate-500">{status === "published" ? `${course.modules} modules · ${course.lessons} leçons` : course.level}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{status}</span>{onRemove && <button type="button" onClick={onRemove} className="icon-button" aria-label="Delete draft"><Trash2 className="size-4" /></button>}</article>;
}

function Field({ label, value, onChange, required = false }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 rounded-xl border border-slate-300 px-3 outline-none focus:border-indigoPop" /></label>;
}

function readDrafts() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
}
