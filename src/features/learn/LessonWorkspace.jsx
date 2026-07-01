import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, BookOpen, CheckCircle2, Code2, Copy, Eye, Lightbulb, Play, RotateCcw, Save, Terminal, XCircle } from "lucide-react";
import { recordAttempt, recordLearningEvent } from "../../apiClient.js";
import { createPreview, displayTestLabel, getPreviewKind, runJavaScriptWithConsole, testFailureHelp, validateLesson } from "../../lessonRuntime.js";
import { PREVIEW_IFRAME_SANDBOX } from "../../security/sandboxPolicy.js";
import { copyLessonLink } from "./learningState.js";
import { ActionButton, CompletionBanner, difficultyLabel, NotesPanel, SkillChips } from "./LearningShared.jsx";
import { CourseChapter, ExplainedCorrection, LessonGuide, PedagogyWorkshop, ProgressiveHints, ProjectRubric } from "./LearningPedagogy.jsx";

export default function LessonWorkspace({ QuizComponent, activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onComplete, onQuizResult, onCloseQuiz, onNext, hasNext }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [result, setResult] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [focusPanel, setFocusPanel] = useState("learn");

  useEffect(() => {
    setCode(localStorage.getItem(`pulsateach-code-${lesson.id}`) || lesson.starterCode);
    setResult(null);
    setHintLevel(0);
    setShowCorrection(false);
    setConsoleOutput("");
    setNote(localStorage.getItem(`pulsateach-note-${lesson.id}`) || "");
    setFocusPanel("learn");
  }, [lesson]);

  useEffect(() => {
    if (lesson.type === "quiz") return undefined;
    const timeout = window.setTimeout(() => localStorage.setItem(`pulsateach-code-${lesson.id}`, code), 500);
    return () => window.clearTimeout(timeout);
  }, [code, lesson.id, lesson.type]);

  const preview = useMemo(() => createPreview(lesson, code), [code, lesson]);
  const previewKind = getPreviewKind(lesson);
  const runTests = async () => {
    const checks = await validateLesson(lesson, code);
    setResult(checks);
    recordAttempt({ lessonId: lesson.id, trackId: activeTrack.id, moduleId: activeModule.id, passed: checks.filter((check) => check.pass).length, total: checks.length }).catch(() => {});
    recordLearningEvent({ eventType: checks.every((check) => check.pass) ? "lesson_completed" : "tests_failed", lessonId: lesson.id, trackId: activeTrack.id, payload: { passed: checks.filter((check) => check.pass).length, total: checks.length, failedTests: checks.filter((check) => !check.pass).map((check) => check.label || check.id) } }).catch(() => {});
    if (checks.every((check) => check.pass)) onComplete(lesson, checks.length);
  };
  const runCode = async () => {
    setConsoleOutput(locale === "fr" ? "Exécution en cours…" : "Running…");
    setConsoleOutput(await runJavaScriptWithConsole(code, locale));
  };
  const passed = result?.filter((check) => check.pass).length ?? 0;

  if (lesson.type === "quiz") return <QuizComponent activeTrack={activeTrack} activeModule={activeModule} lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} onQuizResult={onQuizResult} onCloseQuiz={onCloseQuiz} onNext={onNext} hasNext={hasNext} />;

  return (
    <section className="focused-workspace min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-ink shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">{lesson.type}</span>{lesson.stepNumber && <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-violet-700">{locale === "fr" ? `Atelier étape ${lesson.stepNumber}` : `Workshop step ${lesson.stepNumber}`}</span>}<span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">{lesson.xp} XP</span><span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>{isCompleted && <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">{locale === "fr" ? "Validé" : "Passed"}</span>}</div>{lesson.projectThreadId && <p className="mt-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-bold leading-6 text-violet-800">{locale === "fr" ? "Fil rouge : chaque étape ajoute une pièce à la page PulsaConf. Garde le même projet en tête et valide petit à petit." : "Project thread: each step adds one piece to the PulsaConf page. Keep the same project in mind and validate gradually."}</p>}<h3 className="mt-3 font-display text-3xl font-bold">{lesson.title[locale]}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-600">{lesson.brief[locale]}</p><SkillChips skills={lesson.skills} /></div>
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={() => setHintLevel((value) => Math.min(value + 1, lesson.pedagogy?.hints?.length || 1))} icon={Lightbulb}>{locale === "fr" ? `Indice ${Math.min(hintLevel + 1, lesson.pedagogy?.hints?.length || 1)}` : "Next hint"}</ActionButton>
          <ActionButton onClick={() => { copyLessonLink(); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }} icon={Copy}>{copied ? (locale === "fr" ? "Copié" : "Copied") : (locale === "fr" ? "Lien" : "Link")}</ActionButton>
          <ActionButton onClick={onToggleBookmark} icon={isBookmarked ? BookmarkCheck : Bookmark}>{isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}</ActionButton>
          <ActionButton onClick={() => setShowCorrection((value) => !value)} icon={Eye}>{locale === "fr" ? "Correction expliquée" : "Explained correction"}</ActionButton>
          {previewKind === "javascript" && <ActionButton onClick={runCode} icon={Terminal}>{locale === "fr" ? "Exécuter" : "Run code"}</ActionButton>}
          <ActionButton onClick={() => setCode(lesson.starterCode)} icon={RotateCcw}>Reset</ActionButton>
        </div>
      </div>
      <FocusTabs locale={locale} active={focusPanel} onChange={setFocusPanel} />
      {focusPanel === "learn" && <>
      <CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} />
      <PedagogyWorkshop pedagogy={lesson.pedagogy} locale={locale} />
      <LessonGuide guide={lesson.guide} locale={locale} />
      <ProgressiveHints pedagogy={lesson.pedagogy} fallback={lesson.hint} level={hintLevel} locale={locale} />
      <div className="mt-4"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
      {lesson.type === "project" && <ProjectRubric lesson={lesson} locale={locale} />}
      </>}
      {result?.every((check) => check.pass) && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
      <div className="mt-8 border-t border-slate-200 pt-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-indigoPop">{locale === "fr" ? "Exercice autonome" : "Independent exercise"}</p><h4 className="mt-2 font-display text-2xl font-bold">{lesson.brief[locale]}</h4><p className="mt-2 text-sm leading-6 text-slate-500">{locale === "fr" ? "Travaille dans l'éditeur, observe l'aperçu puis lance les tests. Utilise les indices progressivement si tu bloques." : "Work in the editor, inspect the preview, then run the tests. Use hints progressively if needed."}</p></div>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-ink">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white"><span className="font-mono text-sm font-bold text-slate-300">{lesson.id}.{fileExtension(lesson)}</span><button type="button" onClick={() => localStorage.setItem(`pulsateach-code-${lesson.id}`, code)} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20"><Save className="size-4" />{locale === "fr" ? "Sauver" : "Save"}</button></div>
          <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" className="min-h-[480px] w-full resize-y bg-ink p-5 font-mono text-sm leading-7 text-indigo-100 outline-none" aria-label={locale === "fr" ? "Éditeur de code" : "Code editor"} />
        </div>
        <div className="grid gap-3">
          <Preview lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} />
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3"><h4 className="font-display text-xl font-bold">{locale === "fr" ? "Tests automatiques" : "Automated tests"}</h4><button type="button" onClick={runTests} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800"><Play className="size-5" />{locale === "fr" ? "Lancer" : "Run"}</button></div>
            <p className="mt-2 font-bold text-ink/62">{result ? `${passed}/${result.length}` : locale === "fr" ? "Lance les tests pour vérifier ton code." : "Run tests to check your code."}</p>
            <div className="mt-4 space-y-3">{(result || lesson.tests.map((item) => ({ ...item, pass: false, waiting: true }))).map((check, index) => <div className={`flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold ${check.pass ? "text-ink" : "text-slate-500"}`} key={`${check.id || check.type || "check"}-${check.label || check.value || index}-${index}`}>{check.waiting ? <Code2 className="mt-0.5 size-5 shrink-0 text-indigoPop" /> : check.pass ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-rosePop" />}<span><span className="block">{displayTestLabel(check, locale)}</span>{!check.waiting && !check.pass && <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{testFailureHelp(check, locale)}</span>}</span></div>)}</div>
          </div>
        </div>
      </div>
      {(showCorrection || result?.every((check) => check.pass)) && <ExplainedCorrection lesson={lesson} locale={locale} onLoadSolution={() => setCode(lesson.solution)} />}
    </section>
  );
}

function Preview({ lesson, locale, code, preview, previewKind, consoleOutput }) {
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 text-sm font-bold"><Eye className="size-5 text-indigoPop" />{locale === "fr" ? "Aperçu live" : "Live preview"}</div>{previewKind === "javascript" ? <div><div className="min-h-[170px] p-5 text-sm text-slate-500">{locale === "fr" ? "Exécute le code pour afficher ses sorties dans la console." : "Run the code to display its output in the console."}</div><pre className="min-h-24 bg-ink p-4 font-mono text-sm text-indigo-100">{consoleOutput || "Console"}</pre></div> : previewKind === "terminal" ? <CodePreview icon={Terminal} title={locale === "fr" ? "Terminal simulé" : "Simulated terminal"} code={`$ ${code || "…"}`} /> : ["typescript", "react", "node", "sql"].includes(previewKind) ? <CodePreview icon={Code2} title={codePreviewTitle(previewKind, locale)} code={code} /> : previewKind === "text" ? <CodePreview icon={BookOpen} title={locale === "fr" ? "Réponse structurée" : "Structured response"} code={code} light /> : <iframe key={`${lesson.id}-${preview}`} title="PulsaTeach preview" srcDoc={preview} sandbox={PREVIEW_IFRAME_SANDBOX} referrerPolicy="no-referrer" className="h-[300px] w-full bg-white" />}</div>;
}

function FocusTabs({ locale, active, onChange }) {
  const tabs = [
    ["learn", locale === "fr" ? "Comprendre" : "Learn", BookOpen],
    ["code", locale === "fr" ? "Coder" : "Code", Code2],
    ["results", locale === "fr" ? "Résultats" : "Results", CheckCircle2]
  ];
  return (
    <div className="sticky top-24 z-20 mt-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur" role="tablist" aria-label={locale === "fr" ? "Mode focus de la leçon" : "Lesson focus mode"}>
      {tabs.map(([id, label, Icon]) => (
        <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => onChange(id)} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-black transition sm:flex-none ${active === id ? "bg-indigoPop text-white shadow-lg shadow-indigo-950/15" : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigoPop"}`}>
          <Icon className="size-4" />{label}
        </button>
      ))}
    </div>
  );
}

function CodePreview({ icon: Icon, title, code, light = false }) {
  return <div className={`min-h-[300px] p-5 ${light ? "bg-slate-50 text-slate-700" : "bg-slate-950 text-slate-100"}`}><div className="flex items-center gap-2 font-display text-lg font-bold"><Icon className="size-5 text-sky-400" />{title}</div><pre className="mt-5 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-4 font-mono text-sm">{code || "…"}</pre></div>;
}

function codePreviewTitle(kind, locale) {
  const titles = {
    react: { fr: "Composant React", en: "React component" },
    node: { fr: "Module Node.js", en: "Node.js module" },
    sql: { fr: "Migration PostgreSQL", en: "PostgreSQL migration" },
    typescript: { fr: "Contrat TypeScript", en: "TypeScript contract" }
  };
  return titles[kind]?.[locale] || kind;
}

function fileExtension(lesson) {
  if (lesson.type === "css") return "css";
  if (lesson.type === "sql" || lesson.runtime === "sql") return "sql";
  if (lesson.type === "typescript" || lesson.runtime === "typescript") return "ts";
  if (lesson.type === "react" || lesson.runtime === "react") return "jsx";
  if (lesson.type === "terminal" || lesson.runtime === "terminal") return "sh";
  if (lesson.type === "text" || lesson.runtime === "text") return "md";
  if (lesson.type === "js" || lesson.type === "node" || lesson.runtime === "node") return "js";
  return "html";
}
