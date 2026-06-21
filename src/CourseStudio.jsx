import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Archive,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Code2,
  Eye,
  FileText,
  FlaskConical,
  History,
  Plus,
  RotateCcw,
  Save,
  Send,
  Trash2
} from "lucide-react";
import { createCourse, deleteCourse, getCourseVersionDiff, listCourses, listCourseVersions, rollbackCourse, updateCourse } from "./apiClient.js";
import { createEmptyCourseCurriculum, createLessonDraft, createModuleDraft, createQuizQuestionDraft, createTestDraft, validateCourseForPublication } from "./courseSchema.js";

export default function CourseStudio({ locale = "fr" }) {
  const fr = locale === "fr";
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [versions, setVersions] = useState([]);
  const [reviewComment, setReviewComment] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [versionDiff, setVersionDiff] = useState(null);

  const selectedCourse = courses.find((course) => course.id === selectedId) || null;
  const modules = selectedCourse?.curriculum?.modules || [];
  const selectedModule = modules.find((module) => module.id === selectedModuleId) || null;
  const selectedLesson = selectedModule?.lessons?.find((lesson) => lesson.id === selectedLessonId) || null;
  const publicationErrors = useMemo(() => selectedCourse ? validateCourseForPublication(selectedCourse) : [], [selectedCourse]);

  const refresh = async (preferredId) => {
    try {
      const items = await listCourses();
      setCourses(items);
      const nextId = preferredId || selectedId || items[0]?.id || null;
      setSelectedId(nextId);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  useEffect(() => {
    listCourses()
      .then((items) => {
        setCourses(items);
        setSelectedId(items[0]?.id || null);
        setStatus("idle");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setVersions([]);
      return;
    }
    listCourseVersions(selectedId).then(setVersions).catch(() => setVersions([]));
  }, [selectedId]);

  const createNewCourse = async () => {
    setStatus("saving");
    try {
      const created = await createCourse({
        title: { fr: "Nouvelle formation", en: "New course" },
        description: { fr: "Décris la transformation promise à l'apprenant.", en: "Describe the learner transformation." },
        level: "beginner",
        language: "fr",
        curriculum: createEmptyCourseCurriculum()
      });
      await refresh(created.id);
      setMessage(fr ? "Formation créée. Ajoute son premier module." : "Course created. Add its first module.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const updateLocalCourse = (updater) => {
    setCourses((items) => items.map((course) => course.id === selectedId ? updater(structuredClone(course)) : course));
  };

  const saveCourse = async () => {
    if (!selectedCourse) return;
    setStatus("saving");
    setMessage("");
    try {
      const updated = await updateCourse(selectedCourse.id, {
        title: selectedCourse.title,
        description: selectedCourse.description,
        level: selectedCourse.level,
        curriculum: selectedCourse.curriculum,
        expectedVersion: selectedCourse.version
      });
      setCourses((items) => items.map((course) => course.id === updated.id ? updated : course));
      setVersions(await listCourseVersions(selectedCourse.id));
      setStatus("idle");
      setMessage(fr ? "Toutes les modifications sont enregistrées." : "All changes are saved.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const changeStatus = async (nextStatus) => {
    if (!selectedCourse) return;
    setStatus("saving");
    try {
      const updated = await updateCourse(selectedCourse.id, {
        status: nextStatus,
        comment: reviewComment,
        scheduledAt: nextStatus === "scheduled" ? new Date(scheduledAt).toISOString() : undefined,
        expectedVersion: selectedCourse.version
      });
      setCourses((items) => items.map((course) => course.id === updated.id ? updated : course));
      setStatus("idle");
      setReviewComment("");
      setScheduledAt("");
      setVersions(await listCourseVersions(selectedCourse.id));
      setMessage(nextStatus === "published" ? (fr ? "Formation publiée dans le catalogue." : "Course published to the catalog.") : (fr ? "Statut mis à jour." : "Status updated."));
    } catch (error) {
      setStatus("error");
      const details = error.payload?.validationErrors?.join(" ") || error.message;
      setMessage(details);
    }
  };

  const inspectVersion = async (version) => {
    if (version <= 1) {
      setVersionDiff({ fromVersion: null, toVersion: version, changes: [] });
      return;
    }
    try {
      setVersionDiff(await getCourseVersionDiff(selectedCourse.id, version, version - 1));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const rollbackToVersion = async (version) => {
    if (!selectedCourse || !window.confirm(fr ? `Restaurer la version ${version} dans un nouveau brouillon ?` : `Restore version ${version} into a new draft?`)) return;
    setStatus("saving");
    try {
      const updated = await rollbackCourse(selectedCourse.id, version, reviewComment || `Rollback to version ${version}`);
      setCourses((items) => items.map((course) => course.id === updated.id ? updated : course));
      setVersions(await listCourseVersions(selectedCourse.id));
      setReviewComment("");
      setStatus("idle");
      setMessage(fr ? `Version ${version} restaurée dans le brouillon v${updated.version}.` : `Version ${version} restored into draft v${updated.version}.`);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const removeCourse = async () => {
    if (!selectedCourse || !window.confirm(fr ? "Supprimer définitivement cette formation ?" : "Permanently delete this course?")) return;
    try {
      await deleteCourse(selectedCourse.id);
      const remaining = courses.filter((course) => course.id !== selectedCourse.id);
      setCourses(remaining);
      setSelectedId(remaining[0]?.id || null);
      setMessage(fr ? "Formation supprimée." : "Course deleted.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const addModule = () => {
    const module = createModuleDraft(modules.length);
    updateLocalCourse((course) => {
      course.curriculum.modules.push(module);
      return course;
    });
    setSelectedModuleId(module.id);
    setSelectedLessonId(null);
  };

  const updateModule = (patch) => updateLocalCourse((course) => {
    const module = course.curriculum.modules.find((item) => item.id === selectedModuleId);
    Object.assign(module, patch);
    return course;
  });

  const removeModule = () => {
    updateLocalCourse((course) => {
      course.curriculum.modules = course.curriculum.modules.filter((module) => module.id !== selectedModuleId);
      return course;
    });
    setSelectedModuleId(null);
    setSelectedLessonId(null);
  };

  const moveModule = (direction) => updateLocalCourse((course) => {
    course.curriculum.modules = moveItem(course.curriculum.modules, selectedModuleId, direction);
    return course;
  });

  const addLesson = (type = "html") => {
    if (!selectedModule) return;
    const lesson = createLessonDraft(type, selectedModule.lessons?.length || 0);
    updateLocalCourse((course) => {
      const module = course.curriculum.modules.find((item) => item.id === selectedModuleId);
      module.lessons = [...(module.lessons || []), lesson];
      return course;
    });
    setSelectedLessonId(lesson.id);
  };

  const updateLesson = (patch) => updateLocalCourse((course) => {
    const module = course.curriculum.modules.find((item) => item.id === selectedModuleId);
    const lesson = module.lessons.find((item) => item.id === selectedLessonId);
    Object.assign(lesson, patch);
    return course;
  });

  const removeLesson = () => {
    updateLocalCourse((course) => {
      const module = course.curriculum.modules.find((item) => item.id === selectedModuleId);
      module.lessons = module.lessons.filter((lesson) => lesson.id !== selectedLessonId);
      return course;
    });
    setSelectedLessonId(null);
  };

  const moveLesson = (direction) => updateLocalCourse((course) => {
    const module = course.curriculum.modules.find((item) => item.id === selectedModuleId);
    module.lessons = moveItem(module.lessons, selectedLessonId, direction);
    return course;
  });

  return (
    <section className="app-page bg-slate-100">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Course Studio</p>
            <h1 className="page-heading">{fr ? "Construis une formation de bout en bout." : "Build a complete course from start to finish."}</h1>
            <p className="mt-3 max-w-3xl text-slate-600">{fr ? "Structure les modules, rédige le cours, configure les exercices et leurs tests, prévisualise puis publie sans quitter le Studio." : "Structure modules, write lessons, configure exercises and tests, preview, then publish without leaving the Studio."}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={createNewCourse} className="secondary-button"><Plus className="size-4" />{fr ? "Nouvelle formation" : "New course"}</button>
            <button type="button" onClick={saveCourse} disabled={!selectedCourse || status === "saving"} className="primary-button disabled:opacity-50"><Save className="size-4" />{status === "saving" ? (fr ? "Sauvegarde..." : "Saving...") : (fr ? "Tout sauvegarder" : "Save all")}</button>
          </div>
        </header>

        {message && <p className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${status === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`} role={status === "error" ? "alert" : "status"}>{message}</p>}

        <div className="mt-6 grid min-h-[720px] gap-4 xl:grid-cols-[260px_300px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2 px-2 py-2"><h2 className="font-display text-lg font-bold">{fr ? "Formations" : "Courses"}</h2><span className="text-xs font-bold text-slate-400">{courses.length}</span></div>
            <div className="mt-2 grid gap-2">
              {status === "loading" && <p className="empty-state">Chargement...</p>}
              {courses.map((course) => (
                <button key={course.id} type="button" onClick={() => { setSelectedId(course.id); setSelectedModuleId(null); setSelectedLessonId(null); }} className={`rounded-xl border p-3 text-left ${course.id === selectedId ? "border-indigoPop bg-indigo-50" : "border-slate-200 hover:border-indigo-200"}`}>
                  <span className="block truncate font-bold">{course.title?.[locale] || course.title?.fr}</span>
                  <span className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-700"><span>{course.status}</span><span>{course.curriculum?.modules?.length || 0} modules</span></span>
                </button>
              ))}
            </div>
          </aside>

          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2 px-2 py-2">
              <h2 className="font-display text-lg font-bold">{fr ? "Plan de cours" : "Course outline"}</h2>
              <button type="button" onClick={addModule} disabled={!selectedCourse} className="icon-button" aria-label={fr ? "Ajouter un module" : "Add module"}><Plus className="size-4" /></button>
            </div>
            {selectedCourse && <button type="button" onClick={() => { setSelectedModuleId(null); setSelectedLessonId(null); }} className={`mb-2 flex w-full items-center gap-2 rounded-xl border p-3 text-left text-sm font-bold ${!selectedModuleId ? "border-indigo-300 bg-indigo-50 text-indigoPop" : "border-slate-200 hover:border-indigo-200"}`}><BookOpen className="size-4" />{fr ? "Informations de la formation" : "Course information"}</button>}
            {!selectedCourse && <p className="empty-state mt-3">{fr ? "Crée ou sélectionne une formation." : "Create or select a course."}</p>}
            <div className="mt-2 grid gap-3">
              {modules.map((module, moduleIndex) => (
                <section key={module.id} className={`rounded-xl border ${module.id === selectedModuleId ? "border-indigo-300 bg-indigo-50/60" : "border-slate-200"}`}>
                  <button type="button" onClick={() => { setSelectedModuleId(module.id); setSelectedLessonId(null); }} className="flex w-full items-center gap-2 p-3 text-left">
                    <span className="grid size-7 place-items-center rounded-full bg-white text-xs font-bold text-indigoPop">{moduleIndex + 1}</span>
                    <span className="min-w-0 flex-1 truncate font-bold">{module.title?.[locale] || module.title?.fr}</span>
                    <ChevronRight className="size-4 text-slate-400" />
                  </button>
                  <div className="grid gap-1 border-t border-slate-200 p-2">
                    {(module.lessons || []).map((lesson, lessonIndex) => (
                      <button key={lesson.id} type="button" onClick={() => { setSelectedModuleId(module.id); setSelectedLessonId(lesson.id); }} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${lesson.id === selectedLessonId ? "bg-indigoPop text-white" : "hover:bg-white"}`}>
                        <span className="text-xs font-bold opacity-60">{lessonIndex + 1}</span>
                        <span className="min-w-0 flex-1 truncate font-semibold">{lesson.title?.[locale] || lesson.title?.fr}</span>
                        <span className="text-[10px] uppercase opacity-70">{lesson.type}</span>
                      </button>
                    ))}
                    {module.id === selectedModuleId && <button type="button" onClick={() => addLesson("html")} className="mt-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-indigo-300 px-2 py-2 text-xs font-bold text-indigoPop"><Plus className="size-3" />{fr ? "Ajouter une leçon" : "Add lesson"}</button>}
                  </div>
                </section>
              ))}
            </div>
          </aside>

          <main className="min-w-0">
            {!selectedCourse && <div className="surface grid min-h-[500px] place-items-center text-center"><div><BookOpen className="mx-auto size-12 text-indigoPop" /><h2 className="mt-4 font-display text-3xl font-bold">{fr ? "Crée ta première formation" : "Create your first course"}</h2></div></div>}
            {selectedCourse && !selectedModule && <CourseEditor course={selectedCourse} locale={locale} onChange={updateLocalCourse} onAddModule={addModule} />}
            {selectedCourse && selectedModule && !selectedLesson && <ModuleEditor module={selectedModule} locale={locale} onChange={updateModule} onAddLesson={addLesson} onMove={moveModule} onRemove={removeModule} />}
            {selectedLesson && (
              <div className={`grid gap-4 ${previewOpen ? "2xl:grid-cols-[minmax(0,1fr)_430px]" : ""}`}>
                <LessonEditor lesson={selectedLesson} locale={locale} onChange={updateLesson} onMove={moveLesson} onRemove={removeLesson} />
                {previewOpen && <LessonPreview lesson={selectedLesson} locale={locale} />}
              </div>
            )}
          </main>
        </div>

        {selectedCourse && (
          <section className="surface mt-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow"><History className="size-4" />{fr ? "Versioning éditorial" : "Editorial versioning"}</p>
                <h2 className="mt-3 font-display text-2xl font-bold">{fr ? `Historique · version ${selectedCourse.version || 1}` : `History · version ${selectedCourse.version || 1}`}</h2>
              </div>
              <span className="status-badge status-warning">{selectedCourse.status}</span>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
              <div className="grid gap-2">
                {versions.map((version) => (
                  <div key={version.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <button type="button" onClick={() => inspectVersion(version.version)} className="min-w-0 flex-1 text-left">
                      <span className="block font-bold">v{version.version} · {version.status}</span>
                      <span className="mt-1 block text-xs text-slate-500">{version.changeType} · {new Date(version.createdAt).toLocaleString(locale)}</span>
                      {version.comment && <span className="mt-1 block truncate text-sm text-slate-600">{version.comment}</span>}
                    </button>
                    {version.version !== selectedCourse.version && <button type="button" onClick={() => rollbackToVersion(version.version)} className="secondary-button"><RotateCcw className="size-4" />Rollback</button>}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-display text-lg font-bold">{fr ? "Diff de la version" : "Version diff"}</h3>
                {!versionDiff && <p className="mt-3 text-sm text-slate-500">{fr ? "Sélectionne une version pour voir les champs modifiés." : "Select a version to inspect changed fields."}</p>}
                {versionDiff && (
                  <div className="mt-3">
                    <p className="text-sm font-bold">{versionDiff.changes.length} {fr ? "modifications" : "changes"}</p>
                    <ul className="mt-3 max-h-64 space-y-2 overflow-auto text-xs text-slate-600">
                      {versionDiff.changes.map((change) => <li key={change.path} className="rounded-lg bg-slate-50 p-2 font-mono">{change.path}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {selectedCourse && (
          <footer className="mt-5 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:sticky sm:bottom-3 sm:flex-row sm:items-center">
            <div>
              <p className="font-bold">{publicationErrors.length ? (fr ? `${publicationErrors.length} points bloquent la publication` : `${publicationErrors.length} issues block publishing`) : (fr ? "Formation prête à publier" : "Course ready to publish")}</p>
              <p className="mt-1 text-xs text-slate-500">{publicationErrors[0] || `${modules.length} modules · ${modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0)} leçons`}</p>
            </div>
            <div className="grid gap-2 sm:min-w-[420px]">
              <textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} className="form-control min-h-20" placeholder={fr ? "Commentaire de workflow ou de review" : "Workflow or review comment"} />
              {selectedCourse.status === "approved" && <label className="grid gap-1 text-xs font-bold">{fr ? "Publication planifiée" : "Scheduled publication"}<input type="datetime-local" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} className="form-control" /></label>}
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setPreviewOpen((open) => !open)} className="secondary-button"><Eye className="size-4" />{previewOpen ? (fr ? "Masquer l'aperçu" : "Hide preview") : (fr ? "Afficher l'aperçu" : "Show preview")}</button>
                {["draft", "changes_requested"].includes(selectedCourse.status) && <button type="button" onClick={() => changeStatus("review")} className="secondary-button"><Send className="size-4" />Review</button>}
                {selectedCourse.status === "review" && <button type="button" onClick={() => changeStatus("changes_requested")} disabled={!reviewComment.trim()} className="secondary-button disabled:opacity-50">{fr ? "Demander des changements" : "Request changes"}</button>}
                {selectedCourse.status === "review" && <button type="button" onClick={() => changeStatus("approved")} disabled={publicationErrors.length > 0} className="primary-button disabled:opacity-50"><CheckCircle2 className="size-4" />{fr ? "Approuver" : "Approve"}</button>}
                {selectedCourse.status === "approved" && <button type="button" onClick={() => changeStatus("scheduled")} disabled={!scheduledAt} className="secondary-button disabled:opacity-50"><CalendarClock className="size-4" />{fr ? "Planifier" : "Schedule"}</button>}
                {["approved", "scheduled"].includes(selectedCourse.status) && <button type="button" onClick={() => changeStatus("published")} className="primary-button"><CheckCircle2 className="size-4" />{fr ? "Publier" : "Publish"}</button>}
                {selectedCourse.status === "published" && <button type="button" onClick={() => changeStatus("archived")} className="secondary-button"><Archive className="size-4" />{fr ? "Archiver" : "Archive"}</button>}
                <button type="button" onClick={removeCourse} className="icon-button text-red-600" aria-label={fr ? "Supprimer la formation" : "Delete course"}><Trash2 className="size-4" /></button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}

function CourseEditor({ course, locale, onChange, onAddModule }) {
  const fr = locale === "fr";
  return (
    <section className="surface">
      <h2 className="font-display text-3xl font-bold">{fr ? "Identité de la formation" : "Course identity"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <LocalizedField label="Titre" value={course.title} onChange={(title) => onChange((next) => ({ ...next, title }))} />
        <LocalizedField label="Promesse pédagogique" value={course.description} multiline onChange={(description) => onChange((next) => ({ ...next, description }))} />
        <label className="grid gap-2 text-sm font-bold">{fr ? "Niveau" : "Level"}<select value={course.level} onChange={(event) => onChange((next) => ({ ...next, level: event.target.value }))} className="form-control"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>
      </div>
      <button type="button" onClick={onAddModule} className="primary-button mt-6"><Plus className="size-4" />{fr ? "Ajouter le premier module" : "Add first module"}</button>
    </section>
  );
}

function ModuleEditor({ module, locale, onChange, onAddLesson, onMove, onRemove }) {
  const fr = locale === "fr";
  return (
    <section className="surface">
      <EditorHeader icon={BookOpen} title={fr ? "Configurer le module" : "Configure module"} onMove={onMove} onRemove={onRemove} />
      <div className="mt-5 grid gap-4">
        <LocalizedField label="Titre" value={module.title} onChange={(title) => onChange({ title })} />
        <LocalizedField label={fr ? "Pourquoi ce module compte" : "Why this module matters"} value={module.description} multiline onChange={(description) => onChange({ description })} />
        <LocalizedField label={fr ? "Livrable final" : "Final deliverable"} value={module.deliverable} onChange={(deliverable) => onChange({ deliverable })} />
        <ListField label={fr ? "Critères de maîtrise FR" : "Mastery criteria FR"} value={module.mastery?.fr || []} onChange={(items) => onChange({ mastery: { ...(module.mastery || {}), fr: items } })} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["html", "css", "js", "dom", "typescript", "react", "node", "sql", "terminal", "text", "quiz", "project"].map((type) => <button key={type} type="button" onClick={() => onAddLesson(type)} className="secondary-button"><Plus className="size-4" />{type}</button>)}
      </div>
    </section>
  );
}

function LessonEditor({ lesson, locale, onChange, onMove, onRemove }) {
  const fr = locale === "fr";
  const courseFr = lesson.course?.fr || {};
  return (
    <section className="surface min-w-0">
      <EditorHeader icon={FileText} title={fr ? "Éditer la leçon" : "Edit lesson"} onMove={onMove} onRemove={onRemove} />
      <div className="mt-5 grid gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <LocalizedField label="Titre" value={lesson.title} onChange={(title) => onChange({ title })} />
          <LocalizedField label={fr ? "Consigne de l'exercice" : "Exercise brief"} value={lesson.brief} multiline onChange={(brief) => onChange({ brief })} />
          <label className="grid gap-2 text-sm font-bold">Type<select value={lesson.type} onChange={(event) => onChange({ type: event.target.value })} className="form-control">{["html", "css", "js", "dom", "typescript", "react", "node", "sql", "terminal", "text", "quiz", "project"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold">XP<input type="number" min="0" value={lesson.xp} onChange={(event) => onChange({ xp: Number(event.target.value) })} className="form-control" /></label>
          <label className="grid gap-2 text-sm font-bold">{fr ? "Durée estimée" : "Estimated duration"}<input type="number" min="1" value={lesson.durationMin} onChange={(event) => onChange({ durationMin: Number(event.target.value) })} className="form-control" /></label>
          <ListField label={fr ? "Compétences" : "Skills"} value={lesson.skills || []} onChange={(skills) => onChange({ skills })} />
        </div>

        <fieldset className="rounded-2xl border border-slate-200 p-4">
          <legend className="px-2 font-display text-xl font-bold">{fr ? "Cours avant la pratique" : "Course before practice"}</legend>
          <TextField label={fr ? "Introduction accessible" : "Accessible introduction"} value={courseFr.introduction || ""} multiline onChange={(introduction) => onChange({ course: updateLocaleObject(lesson.course, "fr", { introduction }) })} />
          <ListField label={fr ? "Objectifs précis" : "Precise objectives"} value={courseFr.objectives || []} onChange={(objectives) => onChange({ course: updateLocaleObject(lesson.course, "fr", { objectives }) })} />
          <ListField label={fr ? "Vocabulaire (terme : définition)" : "Vocabulary"} value={courseFr.vocabulary || []} onChange={(vocabulary) => onChange({ course: updateLocaleObject(lesson.course, "fr", { vocabulary }) })} />
          <ListField label={fr ? "Étapes d'explication" : "Explanation steps"} value={courseFr.sections || []} onChange={(sections) => onChange({ course: updateLocaleObject(lesson.course, "fr", { sections }) })} />
          <ListField label={fr ? "Règles à retenir" : "Rules to remember"} value={courseFr.rules || []} onChange={(rules) => onChange({ course: updateLocaleObject(lesson.course, "fr", { rules }) })} />
          <ListField label="Checklist" value={courseFr.checklist || []} onChange={(checklist) => onChange({ course: updateLocaleObject(lesson.course, "fr", { checklist }) })} />
          <TextField label={fr ? "Synthèse" : "Summary"} value={courseFr.summary || ""} multiline onChange={(summary) => onChange({ course: updateLocaleObject(lesson.course, "fr", { summary }) })} />
        </fieldset>

        {lesson.type !== "quiz" && <fieldset className="rounded-2xl border border-slate-200 p-4">
          <legend className="flex items-center gap-2 px-2 font-display text-xl font-bold"><Code2 className="size-5 text-indigoPop" />{fr ? "Exercice et correction" : "Exercise and solution"}</legend>
          <TextField label={fr ? "Code initial" : "Starter code"} value={lesson.starterCode || ""} code multiline onChange={(starterCode) => onChange({ starterCode })} />
          {lesson.type === "css" && <TextField label="HTML de prévisualisation" value={lesson.previewHtml || ""} code multiline onChange={(previewHtml) => onChange({ previewHtml })} />}
          <TextField label={fr ? "Solution expliquée / code final" : "Explained solution / final code"} value={lesson.solution || ""} code multiline onChange={(solution) => onChange({ solution })} />
          <LocalizedField label={fr ? "Indice progressif" : "Progressive hint"} value={lesson.hint} multiline onChange={(hint) => onChange({ hint })} />
        </fieldset>}

        {lesson.type === "quiz"
          ? <QuizEditor lesson={lesson} onChange={onChange} locale={locale} />
          : <TestsEditor tests={lesson.tests || []} onChange={(tests) => onChange({ tests })} locale={locale} />}
      </div>
    </section>
  );
}

function QuizEditor({ lesson, onChange, locale }) {
  const fr = locale === "fr";
  const questions = lesson.questions || [];
  const updateQuestion = (index, patch) => onChange({ questions: questions.map((question, questionIndex) => questionIndex === index ? { ...question, ...patch } : question) });
  return (
    <fieldset className="rounded-2xl border border-slate-200 p-4">
      <legend className="flex items-center gap-2 px-2 font-display text-xl font-bold"><FlaskConical className="size-5 text-indigoPop" />{fr ? "Questions du quiz" : "Quiz questions"}</legend>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold">{fr ? "Score requis (%)" : "Passing score (%)"}<input type="number" min="1" max="100" className="form-control" value={lesson.passingScore || 70} onChange={(event) => onChange({ passingScore: Number(event.target.value) })} /></label>
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-bold"><input type="checkbox" checked={Boolean(lesson.randomizeQuestions)} onChange={(event) => onChange({ randomizeQuestions: event.target.checked })} />{fr ? "Mélanger les questions" : "Randomize questions"}</label>
        <label className="grid gap-2 text-sm font-bold">Feedback<select className="form-control" value={lesson.feedbackMode || "immediate"} onChange={(event) => onChange({ feedbackMode: event.target.value })}><option value="immediate">Immediate</option><option value="end">End</option></select></label>
      </div>
      <div className="mt-5 grid gap-4">
        {questions.map((question, index) => (
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={question.id}>
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-indigoPop text-sm font-bold text-white">{index + 1}</span>
              <select className="form-control max-w-64" value={question.type} onChange={(event) => updateQuestion(index, { type: event.target.value })}>
                {["single", "multiple", "true-false", "matching", "ordering", "fill-blank", "code-reading", "error-identification", "code-correction", "short-open"].map((type) => <option key={type}>{type}</option>)}
              </select>
              <button type="button" className="icon-button ml-auto text-red-600" onClick={() => onChange({ questions: questions.filter((_, questionIndex) => questionIndex !== index) })} aria-label={fr ? "Supprimer la question" : "Delete question"}><Trash2 className="size-4" /></button>
            </div>
            <div className="mt-4 grid gap-4">
              <LocalizedField label={fr ? "Question" : "Prompt"} value={question.prompt} multiline onChange={(prompt) => updateQuestion(index, { prompt })} />
              <TextField label={fr ? "Code optionnel" : "Optional code"} value={question.code || ""} code multiline onChange={(code) => updateQuestion(index, { code })} />
              {["single", "multiple", "true-false", "ordering", "code-reading", "error-identification"].includes(question.type) && <TextField label={fr ? "Choix (id | français | anglais)" : "Choices (id | French | English)"} value={formatChoices(question.choices)} multiline onChange={(value) => updateQuestion(index, { choices: parseChoices(value) })} />}
              <TextField label={fr ? "Réponse (sépare les réponses multiples par une virgule)" : "Answer (comma-separated for multiple answers)"} value={formatAnswer(question.answer)} onChange={(value) => updateQuestion(index, { answer: parseAnswer(value, question.type) })} />
              <LocalizedField label={fr ? "Explication pédagogique" : "Pedagogical explanation"} value={question.explanation} multiline onChange={(explanation) => updateQuestion(index, { explanation })} />
              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-2 text-sm font-bold">Points<input className="form-control" type="number" min="1" value={question.points || 1} onChange={(event) => updateQuestion(index, { points: Number(event.target.value) })} /></label>
                <ListField label={fr ? "Compétences" : "Skills"} value={question.skills || []} onChange={(skills) => updateQuestion(index, { skills })} />
                <ListField label={fr ? "Termes du glossaire" : "Glossary terms"} value={question.glossaryTerms || []} onChange={(glossaryTerms) => updateQuestion(index, { glossaryTerms })} />
              </div>
              <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={Boolean(question.requiresRationale)} onChange={(event) => updateQuestion(index, { requiresRationale: event.target.checked })} />{fr ? "Exiger une justification" : "Require a rationale"}</label>
            </div>
          </article>
        ))}
        <button type="button" onClick={() => onChange({ questions: [...questions, createQuizQuestionDraft(questions.length)] })} className="secondary-button justify-self-start"><Plus className="size-4" />{fr ? "Ajouter une question" : "Add question"}</button>
      </div>
    </fieldset>
  );
}

function TestsEditor({ tests, onChange, locale }) {
  const fr = locale === "fr";
  const update = (index, patch) => onChange(tests.map((test, testIndex) => testIndex === index ? { ...test, ...patch } : test));
  return (
    <fieldset className="rounded-2xl border border-slate-200 p-4">
      <legend className="flex items-center gap-2 px-2 font-display text-xl font-bold"><FlaskConical className="size-5 text-indigoPop" />{fr ? "Tests automatiques" : "Automated tests"}</legend>
      <div className="grid gap-3">
        {tests.map((test, index) => (
          <div key={`${index}-${test.type}`} className="grid gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-[150px_1fr_1fr_auto]">
            <select value={test.type} onChange={(event) => update(index, { type: event.target.value })} className="form-control text-sm">
              {["contains", "selector", "minSelector", "cssDeclaration", "jsExpression"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <input value={test.label || ""} onChange={(event) => update(index, { label: event.target.value })} placeholder={fr ? "Message compréhensible" : "Clear message"} className="form-control text-sm" />
            <input value={typeof test.value === "string" ? test.value : JSON.stringify(test.value || "")} onChange={(event) => update(index, { value: event.target.value })} placeholder={fr ? "Valeur attendue" : "Expected value"} className="form-control font-mono text-sm" />
            <button type="button" onClick={() => onChange(tests.filter((_, testIndex) => testIndex !== index))} className="icon-button text-red-600" aria-label={fr ? "Supprimer le test" : "Delete test"}><Trash2 className="size-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...tests, createTestDraft()])} className="secondary-button justify-self-start"><Plus className="size-4" />{fr ? "Ajouter un test" : "Add test"}</button>
      </div>
    </fieldset>
  );
}

function LessonPreview({ lesson, locale }) {
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
        <pre className="max-h-64 overflow-auto bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{lesson.starterCode}</code></pre>
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

function EditorHeader({ icon: Icon, title, onMove, onRemove }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Icon className="size-7 text-indigoPop" />
      <h2 className="min-w-0 flex-1 font-display text-3xl font-bold">{title}</h2>
      <button type="button" onClick={() => onMove(-1)} className="icon-button" aria-label="Monter"><ArrowUp className="size-4" /></button>
      <button type="button" onClick={() => onMove(1)} className="icon-button" aria-label="Descendre"><ArrowDown className="size-4" /></button>
      <button type="button" onClick={onRemove} className="icon-button text-red-600" aria-label="Supprimer"><Trash2 className="size-4" /></button>
    </div>
  );
}

function LocalizedField({ label, value = {}, onChange, multiline = false }) {
  return (
    <fieldset className="grid gap-3 rounded-xl border border-slate-200 p-3">
      <legend className="px-2 text-sm font-bold">{label}</legend>
      <TextField label="FR" value={value?.fr || ""} multiline={multiline} onChange={(fr) => onChange({ ...value, fr })} />
      <TextField label="EN" value={value?.en || ""} multiline={multiline} onChange={(en) => onChange({ ...value, en })} />
    </fieldset>
  );
}

function TextField({ label, value, onChange, multiline = false, code = false }) {
  const Component = multiline ? "textarea" : "input";
  return <label className="grid gap-2 text-sm font-bold">{label}<Component value={value} onChange={(event) => onChange(event.target.value)} className={`form-control ${multiline ? "min-h-28 resize-y" : ""} ${code ? "font-mono text-xs leading-6" : ""}`} /></label>;
}

function ListField({ label, value = [], onChange }) {
  return <TextField label={label} value={value.join("\n")} multiline onChange={(text) => onChange(text.split("\n").map((item) => item.trim()).filter(Boolean))} />;
}

function updateLocaleObject(source = {}, locale, patch) {
  return { ...source, [locale]: { ...(source[locale] || {}), ...patch } };
}

function formatChoices(choices = []) {
  return choices.map((choice) => `${choice.id} | ${choice.label?.fr || ""} | ${choice.label?.en || ""}`).join("\n");
}

function parseChoices(value) {
  return value.split("\n").map((line) => {
    const [id, fr, en] = line.split("|").map((item) => item.trim());
    return { id, label: { fr: fr || id, en: en || fr || id } };
  }).filter((choice) => choice.id);
}

function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(", ");
  if (answer && typeof answer === "object") return JSON.stringify(answer);
  return String(answer ?? "");
}

function parseAnswer(value, type) {
  if (type === "multiple" || type === "ordering") return value.split(",").map((item) => item.trim()).filter(Boolean);
  if (type === "matching") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }
  return value.trim();
}

function moveItem(items, id, direction) {
  const index = items.findIndex((item) => item.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
