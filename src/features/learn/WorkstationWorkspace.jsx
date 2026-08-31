import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FilePlus2, FolderPlus, RefreshCw, Save, TerminalSquare } from "lucide-react";
import { resolveLocaleValue } from "../../localeValue.js";
import { getLearnerItem, setLearnerItem } from "../../learnerStorage.js";

const evidenceKeys = ["environment", "path", "observe", "notes", "privacy"];
const initialState = { folder: false, file: false, terminal: false, save: false, reload: false, environment: "", path: false, observe: false, notes: "", privacy: false, diagnosis: false };

export default function WorkstationWorkspace({ lesson, locale, onComplete, onNext, hasNext }) {
  const fr = locale === "fr";
  const storageKey = `pulsateach-workstation-${lesson.id}-${locale}`;
  const starterCode = resolveLocaleValue(lesson.starterCode, locale) || "<main>\n  <h1>Mon espace de travail</h1>\n</main>";
  const [state, setState] = useState(initialState);
  const [code, setCode] = useState(starterCode);
  const [savedCode, setSavedCode] = useState("");
  const [preview, setPreview] = useState("");
  const [command, setCommand] = useState("pwd");
  const [output, setOutput] = useState("");
  const [diagnosis, setDiagnosis] = useState({ symptom: "", hypothesis: "", check: "", result: "" });
  const [notes, setNotes] = useState("");
  const [hydratedKey, setHydratedKey] = useState("");
  const completedRef = useRef(false);
  const required = lesson.workstation?.required || [];
  const complete = required.every((key) => Boolean(state[key]));
  const completedCount = required.filter((key) => state[key]).length;

  useEffect(() => {
    const saved = getLearnerItem(storageKey);
    if (!saved) {
      setState(initialState); setCode(starterCode); setSavedCode(""); setPreview(""); setCommand("pwd"); setOutput(""); setDiagnosis({ symptom: "", hypothesis: "", check: "", result: "" }); setNotes("");
    } else {
      try {
        const parsed = JSON.parse(saved);
        setState({ ...initialState, ...parsed.state }); setCode(parsed.code || starterCode); setSavedCode(parsed.savedCode || ""); setPreview(parsed.preview || ""); setDiagnosis(parsed.diagnosis || { symptom: "", hypothesis: "", check: "", result: "" }); setNotes(parsed.notes || "");
      } catch { setState(initialState); setCode(starterCode); setSavedCode(""); setPreview(""); }
    }
    setHydratedKey(storageKey);
    completedRef.current = false;
  }, [starterCode, storageKey]);

  useEffect(() => {
    if (hydratedKey !== storageKey) return;
    setLearnerItem(storageKey, JSON.stringify({ state, code, savedCode, preview, diagnosis, notes }));
  }, [code, diagnosis, hydratedKey, notes, preview, savedCode, state, storageKey]);
  useEffect(() => { if (complete && !completedRef.current) { completedRef.current = true; onComplete(lesson, required.length); } }, [complete, lesson, onComplete, required.length]);

  const updateState = (patch) => setState((current) => ({ ...current, ...patch }));
  const createFolder = () => updateState({ folder: true });
  const createFile = () => updateState({ file: true });
  const hasRealEdit = code.trim() && code !== starterCode;
  const saveFile = () => {
    if (!hasRealEdit) return;
    setSavedCode(code);
    updateState({ save: true, reload: false, observe: false });
  };
  const reloadPreview = () => {
    if (!savedCode) return;
    setPreview(savedCode);
    updateState({ reload: true, observe: true });
  };

  const runCommand = () => {
    const normalized = command.trim().toLowerCase();
    if (normalized === "pwd") { setOutput("/atelier-outils"); updateState({ terminal: true, path: true }); return; }
    if (["ls", "dir"].includes(normalized)) { setOutput(state.file ? "index.html" : (fr ? "Le dossier est vide." : "The folder is empty.")); updateState({ terminal: true, path: state.folder }); return; }
    if (normalized === "mkdir atelier-outils") { createFolder(); setOutput(fr ? "Dossier créé : atelier-outils" : "Folder created: tools-workshop"); updateState({ terminal: true }); return; }
    if (["touch index.html", "type nul > index.html"].includes(normalized)) { if (!state.folder) { setOutput(fr ? "Crée d'abord le dossier atelier-outils." : "Create the tools-workshop folder first."); return; } createFile(); setOutput("index.html"); updateState({ terminal: true }); return; }
    setOutput(fr ? "Commande inconnue. Utilise pwd, ls, dir, mkdir atelier-outils ou touch index.html." : "Unknown command. Use pwd, ls, dir, mkdir tools-workshop, or touch index.html.");
  };

  const updateDiagnosis = (field, value) => {
    const next = { ...diagnosis, [field]: value };
    setDiagnosis(next);
    const normalized = Object.values(next).join(" ").toLowerCase();
    updateState({ diagnosis: /404/.test(next.symptom) && /logo|chemin|path/.test(next.hypothesis.toLowerCase()) && /ls|dir|arborescence|tree/.test(next.check.toLowerCase()) && /logo\.svg|chemin|path/.test(next.result.toLowerCase()) && normalized.length > 45 });
  };

  return <section className="mx-auto w-full max-w-6xl min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3 text-ink shadow-sm sm:p-5" aria-label={fr ? "Atelier de poste de travail" : "Workstation workshop"}>
    <header className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-300">PulsaTeach Workstation</p><div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-display text-2xl font-black sm:text-3xl">{lesson.title[locale]}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{lesson.brief[locale]}</p></div><p className="shrink-0 text-sm font-bold text-emerald-200">{completedCount}/{required.length} {fr ? "preuves" : "checks"}</p></div><ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">{required.map((key, index) => <li key={key} className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold ${state[key] ? "border-emerald-400 bg-emerald-400/15 text-emerald-100" : "border-slate-700 bg-slate-900 text-slate-300"}`}><span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate-700">{state[key] ? <CheckCircle2 className="size-3 text-emerald-300" /> : index + 1}</span><span className="truncate">{stepLabel(key, fr)}</span></li>)}</ol></header>

    <div className="mt-4 grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-display text-lg font-bold">{fr ? "Fichiers du projet" : "Project files"}</h3><pre className="mt-4 min-h-24 rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-100">{state.folder ? "v atelier-outils" : "> atelier-outils"}{state.folder && `\n  ${state.file ? "index.html" : "(vide)"}`}</pre><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={createFolder} className="secondary-button" aria-pressed={state.folder}><FolderPlus className="size-4" />{fr ? "Créer le dossier" : "Create folder"}</button><button type="button" disabled={!state.folder} onClick={createFile} className="secondary-button disabled:opacity-50" aria-pressed={state.file}><FilePlus2 className="size-4" />{fr ? "Créer index.html" : "Create index.html"}</button></div>{required.includes("environment") && <label className="mt-5 block text-sm font-bold">{fr ? "Environnement choisi" : "Selected environment"}<select value={state.environment} onChange={(event) => updateState({ environment: event.target.value })} className="form-control mt-2"><option value="">{fr ? "Choisir une option" : "Choose an option"}</option><option value="built-in">{fr ? "Éditeur et aperçu intégrés" : "Built-in editor and preview"}</option><option value="local">{fr ? "Éditeur local et navigateur" : "Local editor and browser"}</option></select></label>}</section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-display text-lg font-bold">{fr ? "Éditer index.html" : "Edit index.html"}</h3><textarea disabled={!state.file} value={code} onChange={(event) => { setCode(event.target.value); updateState({ save: false, reload: false, observe: false }); }} spellCheck="false" className="code-editor mt-4 min-h-56 w-full disabled:opacity-50" aria-label="index.html" /><div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={!state.file || !hasRealEdit} onClick={saveFile} className="primary-button disabled:opacity-50"><Save className="size-4" />{fr ? "Enregistrer" : "Save"}</button><button type="button" disabled={!state.save || !savedCode} onClick={reloadPreview} className="secondary-button disabled:opacity-50"><RefreshCw className="size-4" />{fr ? "Recharger l'aperçu" : "Reload preview"}</button></div><p className="mt-2 text-xs font-semibold text-slate-500" role="status">{state.file && !hasRealEdit ? (fr ? "Modifie le fichier avant de l'enregistrer." : "Edit the file before saving it.") : code !== savedCode ? (fr ? "Modifications non enregistrées." : "Unsaved changes.") : (fr ? "Dernière version enregistrée." : "Latest version saved.")}</p><div className="mt-4 overflow-hidden rounded-xl border border-slate-200"><p className="border-b bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">{fr ? "Aperçu observé" : "Observed preview"}</p>{preview ? <iframe title={fr ? "Aperçu index.html" : "index.html preview"} srcDoc={preview} className="h-40 w-full bg-white" sandbox="" /> : <p className="p-4 text-sm text-slate-500">{fr ? "Enregistre puis recharge pour observer le fichier." : "Save and reload to observe the file."}</p>}</div></section>
      {required.includes("terminal") && <section className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-display text-lg font-bold">{fr ? "Terminal du projet" : "Project terminal"}</h3><label className="mt-4 block text-sm font-semibold">{fr ? "Commande" : "Command"}<div className="mt-2 flex gap-2"><input value={command} onChange={(event) => setCommand(event.target.value)} className="form-control min-w-0 font-mono" /><button type="button" onClick={runCommand} className="primary-button"><TerminalSquare className="size-4" />{fr ? "Exécuter" : "Run"}</button></div></label><pre aria-live="polite" className="mt-4 min-h-16 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-emerald-300">{output || "$ _"}</pre></section>}
      {required.some((key) => evidenceKeys.includes(key)) && <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4"><h3 className="font-display text-lg font-bold text-indigo-950">{fr ? "Preuves observables" : "Observable evidence"}</h3>{required.includes("notes") && <label className="mt-3 block text-sm font-bold text-indigo-950">{fr ? "Note la commande ou la voie graphique utilisée" : "Record the command or graphical route used"}<textarea value={notes} onChange={(event) => { setNotes(event.target.value); updateState({ notes: event.target.value.trim().length >= 16 }); }} className="form-control mt-2 min-h-20" /></label>}{required.includes("privacy") && <label className="mt-4 flex items-start gap-3 text-sm font-bold text-indigo-950"><input type="checkbox" checked={state.privacy} onChange={(event) => updateState({ privacy: event.target.checked })} className="mt-1 size-4" />{fr ? "J'ai retiré chemins personnels, mots de passe et jetons de ma preuve." : "I removed personal paths, passwords, and tokens from my evidence."}</label>}{required.includes("path") && <p className="mt-3 text-sm text-indigo-900">{state.path ? (fr ? "Chemin vérifié dans le terminal." : "Path verified in the terminal.") : (fr ? "Utilise pwd, ls ou dir pour vérifier le dossier." : "Use pwd, ls, or dir to verify the folder.")}</p>}</section>}
      {required.includes("diagnosis") && <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 xl:col-span-2"><h3 className="font-display text-lg font-bold text-amber-950">{fr ? "Diagnostic 404 réel" : "Real 404 diagnosis"}</h3><p className="mt-2 text-sm text-amber-900">{fr ? "L'aperçu demande images/logo.svg, mais ce fichier n'existe pas dans l'arborescence." : "Preview requests images/logo.svg, but that file does not exist in the tree."}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["symptom", fr ? "Symptôme (inclure 404)" : "Symptom (include 404)"], ["hypothesis", fr ? "Hypothèse liée au chemin" : "Path-related hypothesis"], ["check", fr ? "Contrôle (ls, dir ou arborescence)" : "Check (ls, dir, or tree)"], ["result", fr ? "Résultat (inclure logo.svg ou chemin)" : "Result (include logo.svg or path)"]].map(([field, label]) => <label key={field} className="grid gap-1 text-sm font-bold text-amber-950">{label}<input value={diagnosis[field]} onChange={(event) => updateDiagnosis(field, event.target.value)} className="form-control" /></label>)}</div></section>}
    </div>
    <p className="mt-4 text-sm font-semibold text-slate-600" role="status">{complete ? (fr ? "Atelier validé : tes preuves viennent des actions réalisées." : "Workshop complete: your evidence comes from completed actions.") : (fr ? `Prochaine preuve : ${stepLabel(required.find((key) => !state[key]), fr)}.` : `Next evidence: ${stepLabel(required.find((key) => !state[key]), fr)}.`)}</p>{complete && <button type="button" onClick={onNext} disabled={!hasNext} className="primary-button mt-4 disabled:opacity-50">{fr ? "Leçon suivante" : "Next lesson"}</button>}
    <details className="mt-5 rounded-2xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-display text-lg font-bold">{fr ? "Méthode et aide" : "Method and help"}</summary><div className="mt-4 grid gap-4">{(lesson.course?.[locale]?.sections || []).map((section) => <section key={section.title}><h3 className="font-bold text-slate-900">{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-1 text-sm leading-6 text-slate-600">{paragraph}</p>)}</section>)}</div></details>
  </section>;
}

function stepLabel(key, fr) { const labels = { folder: ["Créer le dossier", "Create folder"], file: ["Créer le fichier", "Create file"], terminal: ["Utiliser le terminal", "Use terminal"], save: ["Enregistrer", "Save"], reload: ["Recharger", "Reload"], environment: ["Choisir l'environnement", "Choose environment"], path: ["Vérifier le chemin", "Verify path"], observe: ["Observer le résultat", "Observe result"], notes: ["Documenter", "Document"], privacy: ["Protéger les données", "Protect data"], diagnosis: ["Diagnostiquer", "Diagnose"] }; return labels[key]?.[fr ? 0 : 1] || key; }
