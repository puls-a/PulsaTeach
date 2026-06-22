import { ArrowDown, ArrowUp, BookOpen, Plus, Trash2 } from "lucide-react";

export function CourseEditor({ course, locale, onChange, onAddModule }) {
  const fr = locale === "fr";
  return <section className="surface"><h2 className="font-display text-3xl font-bold">{fr ? "Identité de la formation" : "Course identity"}</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><LocalizedField label="Titre" value={course.title} onChange={(title) => onChange((next) => ({ ...next, title }))} /><LocalizedField label="Promesse pédagogique" value={course.description} multiline onChange={(description) => onChange((next) => ({ ...next, description }))} /><label className="grid gap-2 text-sm font-bold">{fr ? "Niveau" : "Level"}<select value={course.level} onChange={(event) => onChange((next) => ({ ...next, level: event.target.value }))} className="form-control"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label></div><button type="button" onClick={onAddModule} className="primary-button mt-6"><Plus className="size-4" />{fr ? "Ajouter le premier module" : "Add first module"}</button></section>;
}

export function ModuleEditor({ module, locale, onChange, onAddLesson, onMove, onRemove }) {
  const fr = locale === "fr";
  return <section className="surface"><EditorHeader icon={BookOpen} title={fr ? "Configurer le module" : "Configure module"} onMove={onMove} onRemove={onRemove} /><div className="mt-5 grid gap-4"><LocalizedField label="Titre" value={module.title} onChange={(title) => onChange({ title })} /><LocalizedField label={fr ? "Pourquoi ce module compte" : "Why this module matters"} value={module.description} multiline onChange={(description) => onChange({ description })} /><LocalizedField label={fr ? "Livrable final" : "Final deliverable"} value={module.deliverable} onChange={(deliverable) => onChange({ deliverable })} /><ListField label={fr ? "Critères de maîtrise FR" : "Mastery criteria FR"} value={module.mastery?.fr || []} onChange={(items) => onChange({ mastery: { ...(module.mastery || {}), fr: items } })} /></div><div className="mt-6 flex flex-wrap gap-2">{["html", "css", "js", "dom", "typescript", "react", "node", "sql", "terminal", "text", "quiz", "project"].map((type) => <button key={type} type="button" onClick={() => onAddLesson(type)} className="secondary-button"><Plus className="size-4" />{type}</button>)}</div></section>;
}

export function EditorHeader({ icon: Icon, title, onMove, onRemove }) {
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

export function LocalizedField({ label, value = {}, onChange, multiline = false }) {
  return (
    <fieldset className="grid gap-3 rounded-xl border border-slate-200 p-3">
      <legend className="px-2 text-sm font-bold">{label}</legend>
      <TextField label="FR" value={value?.fr || ""} multiline={multiline} onChange={(fr) => onChange({ ...value, fr })} />
      <TextField label="EN" value={value?.en || ""} multiline={multiline} onChange={(en) => onChange({ ...value, en })} />
    </fieldset>
  );
}

export function TextField({ label, value, onChange, multiline = false, code = false }) {
  const Component = multiline ? "textarea" : "input";
  return <label className="grid gap-2 text-sm font-bold">{label}<Component value={value} onChange={(event) => onChange(event.target.value)} className={`form-control ${multiline ? "min-h-28 resize-y" : ""} ${code ? "font-mono text-xs leading-6" : ""}`} /></label>;
}

export function ListField({ label, value = [], onChange }) {
  return <TextField label={label} value={value.join("\n")} multiline onChange={(text) => onChange(text.split("\n").map((item) => item.trim()).filter(Boolean))} />;
}
