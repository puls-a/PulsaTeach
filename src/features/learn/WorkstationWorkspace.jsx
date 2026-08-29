import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FilePlus2, FolderPlus, RefreshCw, TerminalSquare } from "lucide-react";

const evidenceKeys = ["environment", "path", "observe", "notes", "privacy"];

export default function WorkstationWorkspace({ lesson, locale, onComplete, onNext, hasNext }) {
  const fr = locale === "fr";
  const [state, setState] = useState({ folder: false, file: false, terminal: false, save: false, reload: false, diagnosis: false });
  const [command, setCommand] = useState("pwd");
  const [output, setOutput] = useState("");
  const [diagnosis, setDiagnosis] = useState({ symptom: "", hypothesis: "", check: "", result: "" });
  const completedRef = useRef(false);
  const required = lesson.workstation?.required || [];
  const complete = required.every((key) => state[key]);
  const completedCount = required.filter((key) => state[key]).length;
  const splitWorkspace = required.includes("terminal") && required.some((key) => ["folder", "file"].includes(key));

  useEffect(() => {
    setState({ folder: false, file: false, terminal: false, save: false, reload: false, diagnosis: false });
    setCommand("pwd");
    setOutput("");
    setDiagnosis({ symptom: "", hypothesis: "", check: "", result: "" });
    completedRef.current = false;
  }, [lesson.id]);

  useEffect(() => {
    if (complete && !completedRef.current) {
      completedRef.current = true;
      onComplete(lesson, required.length);
    }
  }, [complete, lesson, onComplete, required.length]);

  const runCommand = () => {
    const normalized = command.trim().toLowerCase();
    const validCommand = ["pwd", "ls", "dir", "mkdir atelier-outils"].includes(normalized);
    const known = normalized === "pwd" ? "/atelier-outils" : normalized === "ls" || normalized === "dir" ? (state.file ? "index.html" : "") : normalized === "mkdir atelier-outils" ? "Dossier déjà créé : atelier-outils" : fr ? "Commande inconnue : utilise pwd, ls, dir ou mkdir atelier-outils." : "Unknown command: use pwd, ls, dir, or mkdir tools-workshop.";
    setOutput(known || (fr ? "Le dossier est vide." : "The folder is empty."));
    if (validCommand) setState((current) => ({ ...current, terminal: true, path: ["pwd", "ls", "dir"].includes(normalized) || current.path }));
  };

  const updateDiagnosis = (field, value) => {
    const next = { ...diagnosis, [field]: value };
    setDiagnosis(next);
    setState((current) => ({ ...current, diagnosis: Object.values(next).every(Boolean) }));
  };

  return <section className="mx-auto w-full max-w-6xl min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3 text-ink shadow-sm sm:p-5" aria-label={fr ? "Atelier de poste de travail" : "Workstation workshop"}>
    <header className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
      <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-300">PulsaTeach Workstation</p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="font-display text-2xl font-black sm:text-3xl">{lesson.title[locale]}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{lesson.brief[locale]}</p></div>
        <p className="shrink-0 text-sm font-bold text-emerald-200">{completedCount}/{required.length} {fr ? "preuves" : "checks"}</p>
      </div>
      <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex" aria-label={fr ? "Étapes de l'atelier" : "Workshop steps"}>{required.map((key, index) => <li key={key} className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold ${state[key] ? "border-emerald-400 bg-emerald-400/15 text-emerald-100" : "border-slate-700 bg-slate-900 text-slate-300"}`}><span className={`grid size-5 shrink-0 place-items-center rounded-full ${state[key] ? "bg-emerald-400 text-slate-950" : "bg-slate-700 text-white"}`}>{state[key] ? <CheckCircle2 className="size-3" /> : index + 1}</span><span className="truncate">{stepLabel(key, fr)}</span></li>)}</ol>
    </header>

    <div className={`mt-4 grid gap-4 ${splitWorkspace ? "xl:grid-cols-2" : ""}`}>
      {required.some((key) => ["folder", "file"].includes(key)) && <section className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-display text-lg font-bold">{fr ? "Fichiers du projet" : "Project files"}</h3><div className="mt-4 rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-100">{state.folder ? "v atelier-outils" : "> atelier-outils"}{state.folder && <p className="pl-5 text-emerald-300">{state.file ? "index.html" : "(vide)"}</p>}</div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => setState((current) => ({ ...current, folder: true }))} className="secondary-button"><FolderPlus className="size-4" />{fr ? "Créer le dossier" : "Create folder"}</button><button type="button" disabled={!state.folder} onClick={() => setState((current) => ({ ...current, file: true }))} className="secondary-button disabled:opacity-50"><FilePlus2 className="size-4" />{fr ? "Créer index.html" : "Create index.html"}</button></div></section>}
      {required.includes("terminal") && <section className="rounded-2xl border border-slate-200 bg-white p-4"><h3 className="font-display text-lg font-bold">{fr ? "Terminal simulé" : "Simulated terminal"}</h3><label className="mt-4 block text-sm font-semibold text-slate-700">{fr ? "Commande" : "Command"}<div className="mt-2 flex flex-col gap-2 sm:flex-row"><input value={command} onChange={(event) => setCommand(event.target.value)} className="form-control min-w-0 font-mono" /><button type="button" onClick={runCommand} className="primary-button shrink-0"><TerminalSquare className="size-4" />{fr ? "Exécuter" : "Run"}</button></div></label><pre className="mt-4 min-h-16 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-emerald-300">{output || "$ _"}</pre></section>}
      {required.some((key) => ["save", "reload"].includes(key)) && <section className="rounded-2xl border border-slate-200 bg-white p-4 xl:col-span-2"><h3 className="font-display text-lg font-bold">{fr ? "Modifier et vérifier" : "Change and verify"}</h3><p className="mt-2 text-sm text-slate-600">{fr ? "Enregistre index.html puis recharge l'aperçu pour confirmer le résultat." : "Save index.html, then reload the preview to confirm the result."}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" disabled={!state.file} onClick={() => setState((current) => ({ ...current, save: true }))} className="secondary-button disabled:opacity-50">{fr ? "Enregistrer index.html" : "Save index.html"}</button><button type="button" disabled={!state.save} onClick={() => setState((current) => ({ ...current, reload: true }))} className="secondary-button disabled:opacity-50"><RefreshCw className="size-4" />{fr ? "Recharger l'aperçu" : "Reload preview"}</button>{state.reload && <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800"><CheckCircle2 className="size-4" />{fr ? "Titre observé : Mon espace de travail" : "Observed heading: My workspace"}</span>}</div></section>}
      {required.some((key) => evidenceKeys.includes(key)) && <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 xl:col-span-2"><h3 className="font-display text-lg font-bold text-indigo-950">{fr ? "Confirmer les preuves" : "Confirm evidence"}</h3><p className="mt-2 text-sm text-indigo-900">{fr ? "Après avoir vérifié l'action dans l'atelier, confirme-la ici." : "Confirm each action here after checking it in the workshop."}</p><div className="mt-4 flex flex-wrap gap-2">{evidenceKeys.filter((key) => required.includes(key)).map((key) => <button key={key} type="button" onClick={() => setState((current) => ({ ...current, [key]: true }))} className={`secondary-button ${state[key] ? "border-emerald-500 bg-emerald-50 text-emerald-800" : ""}`}><CheckCircle2 className="size-4" />{stepLabel(key, fr)}</button>)}</div></section>}
      {required.includes("diagnosis") && <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 xl:col-span-2"><h3 className="font-display text-lg font-bold text-amber-950">{fr ? "Diagnostic 404" : "404 diagnosis"}</h3><p className="mt-2 text-sm text-amber-900">{fr ? "Scénario : l'aperçu demande images/logo.svg mais le fichier est absent." : "Scenario: preview requests images/logo.svg but the file is missing."}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["symptom", fr ? "Symptôme observé" : "Observed symptom"], ["hypothesis", fr ? "Hypothèse" : "Hypothesis"], ["check", fr ? "Contrôle à effectuer" : "Check to perform"], ["result", fr ? "Résultat attendu" : "Expected result"]].map(([field, label]) => <label key={field} className="grid gap-1 text-sm font-bold text-amber-950">{label}<input value={diagnosis[field]} onChange={(event) => updateDiagnosis(field, event.target.value)} className="form-control" /></label>)}</div></section>}
    </div>

    <p className="mt-4 text-sm font-semibold text-slate-600" role="status">{complete ? (fr ? "Atelier validé : les preuves nécessaires ont été produites." : "Workshop complete: required evidence has been produced.") : (fr ? `Progression : ${completedCount}/${required.length} actions vérifiées.` : `Progress: ${completedCount}/${required.length} verified actions.`)}</p>{complete && <button type="button" onClick={onNext} disabled={!hasNext} className="primary-button mt-4 disabled:opacity-50">{fr ? "Leçon suivante" : "Next lesson"}</button>}
    <details className="mt-5 rounded-2xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-display text-lg font-bold">{fr ? "Consignes et méthode" : "Instructions and method"}</summary><div className="mt-4 grid gap-4">{(lesson.course?.[locale]?.sections || lesson.course?.fr?.sections || []).map((section) => <section key={section.title}><h3 className="font-bold text-slate-900">{section.title}</h3>{(section.paragraphs || []).map((paragraph) => <p key={paragraph} className="mt-1 text-sm leading-6 text-slate-600">{paragraph}</p>)}</section>)}</div></details>
  </section>;
}

function stepLabel(key, fr) {
  const labels = {
    folder: ["Créer le dossier", "Create folder"], file: ["Créer le fichier", "Create file"], terminal: ["Utiliser le terminal", "Use terminal"], save: ["Enregistrer", "Save"], reload: ["Recharger", "Reload"], environment: ["Choisir l'environnement", "Choose environment"], path: ["Vérifier le chemin", "Verify path"], observe: ["Observer le résultat", "Observe result"], notes: ["Documenter", "Document"], privacy: ["Protéger les données", "Protect data"], diagnosis: ["Diagnostiquer", "Diagnose"]
  };
  return labels[key]?.[fr ? 0 : 1] || key;
}
