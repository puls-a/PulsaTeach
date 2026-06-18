import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Plus, Save, Send, Trash2 } from "lucide-react";
import { createCourse, deleteCourse, listCourses, updateCourse } from "./apiClient.js";

export default function CourseStudio({ locale = "fr" }) {
  const fr = locale === "fr";
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState({ titleFr: "", titleEn: "", descriptionFr: "", descriptionEn: "", level: "beginner", language: "fr" });

  const refresh = () => listCourses().then((items) => { setCourses(items); setStatus("idle"); }).catch((error) => setStatus(error.message));

  useEffect(refresh, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      await createCourse({
        title: { fr: form.titleFr, en: form.titleEn || form.titleFr },
        description: { fr: form.descriptionFr, en: form.descriptionEn || form.descriptionFr },
        level: form.level,
        language: form.language,
        curriculum: { modules: [] }
      });
      setForm({ ...form, titleFr: "", titleEn: "", descriptionFr: "", descriptionEn: "" });
      refresh();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const changeStatus = async (course, nextStatus) => {
    setStatus("saving");
    try {
      const updated = await updateCourse(course.id, { status: nextStatus });
      setCourses((items) => items.map((item) => item.id === updated.id ? updated : item));
      setStatus("idle");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const remove = async (course) => {
    try {
      await deleteCourse(course.id);
      setCourses((items) => items.filter((item) => item.id !== course.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Course Studio</p>
            <h1 className="page-heading">{fr ? "Conçois puis publie de vraies formations." : "Design and publish real courses."}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{fr ? "Les brouillons sont stockés dans Supabase. La publication exige une validation administrateur ou relecteur." : "Drafts are stored in Supabase. Publishing requires an admin or reviewer."}</p>
          </div>
          <a href="#/author" className="secondary-button">{fr ? "Créer les leçons" : "Create lessons"}<ArrowRight className="size-4" /></a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <form onSubmit={submit} className="surface">
            <div className="flex items-center gap-3"><Plus className="size-5 text-indigoPop" /><h2 className="font-display text-2xl font-bold">{fr ? "Nouvelle formation" : "New course"}</h2></div>
            <div className="mt-5 grid gap-4">
              <Field label="Titre FR" value={form.titleFr} onChange={(titleFr) => setForm({ ...form, titleFr })} required />
              <Field label="Title EN" value={form.titleEn} onChange={(titleEn) => setForm({ ...form, titleEn })} />
              <Field label={fr ? "Promesse pédagogique FR" : "Learning promise FR"} value={form.descriptionFr} onChange={(descriptionFr) => setForm({ ...form, descriptionFr })} multiline />
              <Field label="Learning promise EN" value={form.descriptionEn} onChange={(descriptionEn) => setForm({ ...form, descriptionEn })} multiline />
              <label className="grid gap-2 text-sm font-bold">{fr ? "Niveau" : "Level"}<select value={form.level} onChange={(event) => setForm({ ...form, level: event.target.value })} className="form-control"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>
              <button type="submit" disabled={status === "saving"} className="primary-button disabled:opacity-60"><Save className="size-4" />{fr ? "Créer le brouillon" : "Create draft"}</button>
              {!["idle", "loading", "saving"].includes(status) && <p className="status-error rounded-xl p-3 text-sm font-semibold" role="alert">{status}</p>}
            </div>
          </form>

          <section>
            <h2 className="font-display text-2xl font-bold">{fr ? "Pipeline éditorial" : "Editorial pipeline"}</h2>
            <div className="mt-4 grid gap-3">
              {status === "loading" && <p className="empty-state">{fr ? "Chargement des formations..." : "Loading courses..."}</p>}
              {status !== "loading" && courses.length === 0 && <p className="empty-state">{fr ? "Aucune formation distante." : "No remote courses."}</p>}
              {courses.map((course) => (
                <article className="rounded-xl border border-slate-200 bg-white p-4" key={course.id}>
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigoPop"><BookOpen className="size-5" /></span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold">{course.title?.[locale] || course.title?.fr || course.title?.en}</h3>
                      <p className="mt-1 text-sm text-slate-500">{course.slug} · {course.level} · {(course.curriculum?.modules || []).length} modules</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{course.description?.[locale] || course.description?.fr || course.description?.en}</p>
                    </div>
                    <span className={`status-badge ${course.status === "published" ? "status-success" : "status-warning"}`}>{course.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    <button type="button" onClick={() => changeStatus(course, "review")} className="secondary-button"><Send className="size-4" />Review</button>
                    <button type="button" onClick={() => changeStatus(course, "published")} className="primary-button">Publish</button>
                    <button type="button" onClick={() => changeStatus(course, "draft")} className="secondary-button">Draft</button>
                    <button type="button" onClick={() => remove(course)} className="icon-button ml-auto text-red-600" aria-label={fr ? "Supprimer la formation" : "Delete course"}><Trash2 className="size-4" /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, required = false, multiline = false }) {
  const Component = multiline ? "textarea" : "input";
  return <label className="grid gap-2 text-sm font-bold">{label}<Component required={required} value={value} onChange={(event) => onChange(event.target.value)} className={`form-control ${multiline ? "min-h-24" : ""}`} /></label>;
}
