import { useState } from "react";
import { Save } from "lucide-react";

export function SkillChips({ skills = [] }) {
  if (!skills.length) return null;
  return <div className="mt-4 flex flex-wrap gap-2">{skills.map((skill) => <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigoPop" key={skill}>{skill}</span>)}</div>;
}

export function NotesPanel({ lessonId, locale, note, setNote }) {
  const [saved, setSaved] = useState(false);
  return (
    <details className="rounded-xl border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer font-display text-lg font-bold">{locale === "fr" ? "Notes personnelles" : "Personal notes"}</summary>
      <div className="mt-3 flex justify-end">
        <button type="button" onClick={() => {
          localStorage.setItem(`pulsateach-note-${lessonId}`, note);
          setSaved(true);
          window.setTimeout(() => setSaved(false), 1600);
        }} className="primary-button min-h-10 px-3 py-2 text-sm">
          <Save className="size-4" />{saved ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Sauver" : "Save")}
        </button>
      </div>
      <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={locale === "fr" ? "Écris ce que tu veux retenir..." : "Write what you want to remember..."} className="mt-3 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm font-semibold text-ink outline-none focus:border-indigoPop" />
    </details>
  );
}

export function difficultyLabel(difficulty, locale) {
  const labels = {
    quick: { fr: "Rapide", en: "Quick" },
    starter: { fr: "Départ", en: "Starter" },
    core: { fr: "Essentiel", en: "Core" },
    stretch: { fr: "Défi", en: "Stretch" },
    project: { fr: "Projet", en: "Project" }
  };
  return labels[difficulty]?.[locale] || difficulty;
}

export function CompletionBanner({ locale, onNext, hasNext }) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
      <span>{locale === "fr" ? "C'est validé. XP ajouté à ta progression." : "Passed. XP has been added to your progress."}</span>
      {hasNext && <button type="button" onClick={onNext} className="primary-button">{locale === "fr" ? "Leçon suivante" : "Next lesson"}</button>}
    </div>
  );
}

export function ActionButton({ icon: Icon, onClick, children }) {
  return <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigoPop"><Icon className="size-4" />{children}</button>;
}
