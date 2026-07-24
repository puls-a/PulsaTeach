import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, BookOpen, CheckCircle2, Code2, Copy, Eye, FileCode2, Keyboard, Lightbulb, Play, RotateCcw, Terminal, XCircle } from "lucide-react";
import { recordAttempt, recordLearningEvent } from "../../apiClient.js";
import { createPreview, displayTestLabel, getPreviewKind, runJavaScriptWithConsole, testFailureHelp, validateLesson } from "../../lessonRuntime.js";
import { PREVIEW_IFRAME_SANDBOX } from "../../security/sandboxPolicy.js";
import { resolveLocaleValue } from "../../localeValue.js";
import { copyLessonLink } from "./learningState.js";
import { ActionButton, CompletionBanner, difficultyLabel, NotesPanel, SkillChips } from "./LearningShared.jsx";
import { ExplainedCorrection, ProgressiveHints, ProjectRubric } from "./LearningPedagogy.jsx";
import { sanitizeRichText } from "./richTextSanitizer.js";

const CodeMirrorEditor = lazy(() => import("./CodeMirrorEditor.jsx"));

export default function LessonWorkspace({ QuizComponent, activeTrack, activeModule, lesson, locale, isCompleted, isBookmarked, onToggleBookmark, onComplete, onQuizResult, onCloseQuiz, onNext, hasNext }) {
  const starterCode = resolveLocaleValue(lesson.starterCode, locale) || "";
  const solution = resolveLocaleValue(lesson.solution, locale) || "";
  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [focusPanel, setFocusPanel] = useState("code");
  const [workspacePanel, setWorkspacePanel] = useState("preview");
  const [saveState, setSaveState] = useState("saved");
  const editorRef = useRef(null);

  useEffect(() => {
    const legacyCode = locale === "fr" ? localStorage.getItem(`pulsateach-code-${lesson.id}`) : null;
    setCode(localStorage.getItem(`pulsateach-code-${lesson.id}-${locale}`) || legacyCode || starterCode);
    setResult(null);
    setHintLevel(0);
    setShowCorrection(false);
    setConsoleOutput("");
    setNote(localStorage.getItem(`pulsateach-note-${lesson.id}`) || "");
    setFocusPanel("code");
    setWorkspacePanel("preview");
    setSaveState("saved");
  }, [lesson, locale, starterCode]);

  useEffect(() => {
    if (lesson.type === "quiz") return undefined;
    setSaveState("saving");
    const timeout = window.setTimeout(() => {
      localStorage.setItem(`pulsateach-code-${lesson.id}-${locale}`, code);
      setSaveState("saved");
    }, 450);
    return () => window.clearTimeout(timeout);
  }, [code, lesson.id, lesson.type, locale]);

  const preview = useMemo(() => createPreview(lesson, code, locale), [code, lesson, locale]);
  const previewKind = getPreviewKind(lesson);
  const localizedHints = lesson.pedagogy?.[locale]?.hints || lesson.pedagogy?.fr?.hints || [];
  const hintsCount = Math.max(1, localizedHints.length);
  const passed = result?.filter((check) => check.pass).length ?? 0;
  const total = result?.length || lesson.tests.length;
  const allPassed = Boolean(result?.length) && result.every((check) => check.pass);

  const saveCode = (source = code) => {
    localStorage.setItem(`pulsateach-code-${lesson.id}-${locale}`, source);
    setSaveState("saved");
  };

  const runTests = async (source = code) => {
    recordLearningEvent({ eventType: "tests_run", lessonId: lesson.id, trackId: activeTrack.id, payload: { testCount: lesson.tests.length } }).catch(() => {});
    const checks = await validateLesson(lesson, source, locale);
    if (source !== code) setCode(source);
    setResult(checks);
    setWorkspacePanel("tests");
    setFocusPanel("results");
    window.requestAnimationFrame(() => {
      const resultsTab = document.getElementById("lesson-tab-results");
      if (resultsTab?.offsetParent) resultsTab.focus();
    });
    recordAttempt({ lessonId: lesson.id, trackId: activeTrack.id, moduleId: activeModule.id, passed: checks.filter((check) => check.pass).length, total: checks.length }).catch(() => {});
    recordLearningEvent({ eventType: checks.every((check) => check.pass) ? "lesson_completed" : "tests_failed", lessonId: lesson.id, trackId: activeTrack.id, payload: { passed: checks.filter((check) => check.pass).length, total: checks.length, failedTests: checks.filter((check) => !check.pass).map((check) => check.label || check.id) } }).catch(() => {});
    if (checks.every((check) => check.pass)) onComplete(lesson, checks.length);
  };

  const runCode = async (source = code) => {
    if (source !== code) setCode(source);
    setFocusPanel("code");
    setWorkspacePanel("preview");
    setConsoleOutput(locale === "fr" ? "Exécution en cours…" : "Running…");
    setConsoleOutput(await runJavaScriptWithConsole(source, locale));
  };

  const resetCode = () => {
    setCode(starterCode);
    setResult(null);
    setConsoleOutput("");
    setFocusPanel("code");
    setWorkspacePanel("preview");
    window.requestAnimationFrame(() => editorRef.current?.focus());
  };

  if (lesson.type === "quiz") return <QuizComponent activeTrack={activeTrack} activeModule={activeModule} lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} onQuizResult={onQuizResult} onCloseQuiz={onCloseQuiz} onNext={onNext} hasNext={hasNext} />;

  return (
    <section className="min-w-0 overflow-hidden border border-white/15 bg-[#0a0a23] text-ink shadow-2xl xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
      <FocusTabs locale={locale} active={focusPanel} onChange={setFocusPanel} />
      <div className="xl:grid xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(280px,.8fr)_minmax(460px,1.2fr)_minmax(320px,1fr)]">
        <section id="lesson-panel-learn" role="tabpanel" aria-labelledby="lesson-tab-learn" tabIndex={0} className={`${focusPanel === "learn" ? "flex" : "hidden"} min-h-[600px] min-w-0 flex-col border-r border-white/15 xl:flex xl:min-h-0`}>
          <InstructionsPanel lesson={lesson} locale={locale} hintLevel={hintLevel} hintsCount={hintsCount} note={note} setNote={setNote} copied={copied} isBookmarked={isBookmarked} isCompleted={isCompleted} onHint={() => setHintLevel((value) => Math.min(value + 1, hintsCount))} onCopy={() => { copyLessonLink(); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }} onToggleBookmark={onToggleBookmark} onCorrection={() => { setShowCorrection(true); setWorkspacePanel("tests"); setFocusPanel("results"); }} />
        </section>
        <section id="lesson-panel-code" role="tabpanel" aria-labelledby="lesson-tab-code" tabIndex={0} className={`${focusPanel === "code" ? "flex" : "hidden"} min-h-[600px] min-w-0 flex-col border-r border-white/15 xl:flex xl:min-h-0`}>
          <EditorWorkbench code={code} documentKey={`${lesson.id}:${locale}`} editorRef={editorRef} fileName={defaultFileName(lesson)} languageKind={previewKind} locale={locale} onChange={setCode} onReset={resetCode} onRunCode={previewKind === "javascript" ? runCode : null} onRunTests={runTests} onSave={saveCode} onOpenPreview={() => { setWorkspacePanel("preview"); setFocusPanel("results"); }} previewKind={previewKind} saveState={saveState} />
        </section>
        <section id="lesson-panel-results" role="tabpanel" aria-labelledby="lesson-tab-results" tabIndex={0} className={`${focusPanel === "results" ? "flex" : "hidden"} min-h-[600px] min-w-0 flex-col bg-[#f7f7fc] xl:flex xl:min-h-0`}>
          <OutputWorkbench lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} result={result} tests={lesson.tests} total={total} passed={passed} allPassed={allPassed} showCorrection={showCorrection} selectedPanel={workspacePanel} onSelectPanel={setWorkspacePanel} onRunTests={runTests} onNext={onNext} hasNext={hasNext} onLoadSolution={() => { setCode(solution); setFocusPanel("code"); }} />
        </section>
      </div>
    </section>
  );
}

function InstructionsPanel({ lesson, locale, hintLevel, hintsCount, note, setNote, copied, isBookmarked, isCompleted, onHint, onCopy, onToggleBookmark, onCorrection }) {
  const course = lesson.course?.[locale] || lesson.course?.fr || lesson.course?.en;
  const guide = lesson.guide?.[locale] || lesson.guide?.fr || lesson.guide?.en;
  const pedagogy = lesson.pedagogy?.[locale] || lesson.pedagogy?.fr;
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1b1b3a] text-white">
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-indigo-200"><span>{lesson.type}</span><span aria-hidden="true">·</span><span>{difficultyLabel(lesson.difficulty, locale)}</span><span aria-hidden="true">·</span><span>{lesson.durationMin} min</span><span aria-hidden="true">·</span><span>{lesson.xp} XP</span>{isCompleted && <span className="text-emerald-300">{locale === "fr" ? "Validé" : "Passed"}</span>}</div>
        <h2 className="mt-4 font-display text-xl font-bold">{lesson.stepNumber ? `${locale === "fr" ? "Étape" : "Step"} ${lesson.stepNumber}${lesson.stepCount ? `/${lesson.stepCount}` : ""}` : lesson.title[locale]}</h2>
        <p className="mt-4 text-base font-semibold leading-7 text-slate-100">{lesson.brief[locale]}</p>
        {course?.introduction && <InstructionText className="mt-5 leading-7 text-slate-200" value={course.introduction} />}
        {lesson.projectThreadId && <p className="mt-5 border-l-4 border-indigo-400 bg-white/5 px-4 py-3 text-sm leading-6 text-indigo-100">{lesson.stepCount ? (locale === "fr" ? `Étape ${lesson.stepNumber} sur ${lesson.stepCount} du projet fil rouge. La preuve validée devient la base de l’étape suivante.` : `Step ${lesson.stepNumber} of ${lesson.stepCount} in the flagship project. Validated evidence becomes the next step’s foundation.`) : (locale === "fr" ? "Chaque étape ajoute une pièce au projet PulsaConf." : "Each step adds one piece to the PulsaConf project.")}</p>}
        <div className="mt-6 grid gap-6">
          {(course?.sections || []).map((section, index) => <section key={section.title}><h3 className="font-display text-base font-bold text-white">{index + 1}. {section.title}</h3><div className="mt-2 grid gap-3">{(section.paragraphs || []).map((paragraph) => <InstructionText key={paragraph} className="text-sm leading-6 text-slate-200" value={paragraph} />)}</div>{section.example && <pre tabIndex={0} className="mt-3 overflow-x-auto border border-white/15 bg-[#0a0a23] p-3 font-mono text-xs leading-6 text-indigo-100">{section.example}</pre>}</section>)}
        </div>
        {guide && <details className="mt-6 border border-white/15 bg-white/5 p-4"><summary className="cursor-pointer font-bold">{locale === "fr" ? "Préparer l’exercice et éviter les pièges" : "Prepare the exercise and avoid traps"}</summary><div className="grid gap-5 md:grid-cols-2"><InstructionList title={locale === "fr" ? "Prérequis" : "Prerequisites"} items={guide.prerequisites || pedagogy?.prerequisites} /><InstructionList title={locale === "fr" ? "Objectifs" : "Objectives"} items={guide.objectives} /><InstructionList title={locale === "fr" ? "Méthode" : "Method"} items={guide.steps} /><InstructionList title={locale === "fr" ? "Erreurs fréquentes" : "Common mistakes"} items={guide.mistakes} /></div>{pedagogy?.comparison && <PracticeComparison comparison={pedagogy.comparison} locale={locale} />}{pedagogy?.autonomous && <div className="mt-5 border-l-4 border-indigo-400 bg-white/5 px-4 py-3"><h4 className="text-xs font-black uppercase tracking-[.1em] text-indigo-200">{locale === "fr" ? "Défi autonome" : "Independent challenge"}</h4><p className="mt-2 text-sm leading-6 text-slate-200">{pedagogy.autonomous}</p></div>}</details>}
        {pedagogy?.guided?.length > 0 && <section className="mt-6 border border-white/15 p-4"><h3 className="font-bold text-indigo-200">{locale === "fr" ? "Pratique guidée" : "Guided practice"}</h3><InstructionList items={pedagogy.guided} /></section>}
        <ProgressiveHints pedagogy={lesson.pedagogy} fallback={lesson.hint} level={hintLevel} locale={locale} />
        <div className="mt-6"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
        {lesson.type === "project" && <ProjectRubric lesson={lesson} locale={locale} />}
        <SkillChips skills={lesson.skills} />
        <div className="mt-6 flex flex-wrap gap-2">
          <ActionButton onClick={onHint} icon={Lightbulb}>{locale === "fr" ? `Indice ${Math.min(hintLevel + 1, hintsCount)}` : "Next hint"}</ActionButton>
          <ActionButton onClick={onCopy} icon={Copy}>{copied ? (locale === "fr" ? "Copié" : "Copied") : (locale === "fr" ? "Lien" : "Link")}</ActionButton>
          <ActionButton onClick={onToggleBookmark} icon={isBookmarked ? BookmarkCheck : Bookmark}>{isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}</ActionButton>
          <ActionButton onClick={onCorrection} icon={Eye}>{locale === "fr" ? "Correction" : "Correction"}</ActionButton>
        </div>
      </div>
    </div>
  );
}

function EditorWorkbench({ code, documentKey, editorRef, fileName, languageKind, locale, onChange, onReset, onRunCode, onRunTests, onSave, onOpenPreview, previewKind, saveState }) {
  const currentCode = () => editorRef.current?.state.doc.toString() ?? code;
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#070716]" aria-label={locale === "fr" ? "Atelier de code" : "Code workshop"}>
      <div className="flex min-h-11 items-center justify-between border-b border-white/15 bg-[#171733] px-3 text-white">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-indigo-100"><FileCode2 className="size-4 text-indigo-400" />{fileName}</span>
        <span className={`px-2 text-[11px] font-bold uppercase tracking-[.1em] ${saveState === "saved" ? "text-emerald-300" : "text-slate-300"}`} role="status">{saveState === "saved" ? (locale === "fr" ? "Sauvegardé" : "Saved") : (locale === "fr" ? "Sauvegarde…" : "Saving…")}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Suspense fallback={<div className="grid h-full min-h-[520px] place-items-center bg-slate-950 font-bold text-slate-300" role="status">{locale === "fr" ? "Chargement de l’éditeur..." : "Loading editor..."}</div>}>
          <CodeMirrorEditor value={code} documentKey={documentKey} languageKind={languageKind} locale={locale} editorRef={editorRef} onChange={onChange} onRun={previewKind === "javascript" ? onRunCode : onRunTests} onSave={onSave} />
        </Suspense>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/15 bg-[#171733] p-3">
        <WorkbenchButton onClick={() => onRunTests(currentCode())} icon={Play} primary ariaLabel={locale === "fr" ? "Vérifier mon code · Lancer les tests" : "Check my code · Run tests"}>{locale === "fr" ? "Vérifier mon code" : "Check my code"}</WorkbenchButton>
        {onRunCode && <WorkbenchButton onClick={() => onRunCode(currentCode())} icon={Terminal}>{locale === "fr" ? "Exécuter" : "Run"}</WorkbenchButton>}
        <WorkbenchButton onClick={onOpenPreview} icon={Eye} className="xl:hidden">{locale === "fr" ? "Aperçu" : "Preview"}</WorkbenchButton>
        <WorkbenchButton onClick={onReset} icon={RotateCcw}>{locale === "fr" ? "Recommencer" : "Reset"}</WorkbenchButton>
        <span className="ml-auto hidden items-center gap-1 text-[11px] font-bold text-slate-500 2xl:inline-flex"><Keyboard className="size-3.5" />Ctrl/⌘+Enter</span>
      </div>
    </div>
  );
}

function OutputWorkbench({ lesson, locale, code, preview, previewKind, consoleOutput, result, tests, total, passed, allPassed, showCorrection, selectedPanel, onSelectPanel, onRunTests, onNext, hasNext, onLoadSolution }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f7f7fc]">
      <div className="flex min-h-11 items-center border-b border-white/15 bg-[#171733] px-2" role="tablist" aria-label={locale === "fr" ? "Sortie du code" : "Code output"}>
        <div className="flex gap-2">
          <button type="button" role="tab" aria-selected={selectedPanel === "preview"} onClick={() => onSelectPanel("preview")} className={`min-h-10 px-4 font-bold ${selectedPanel === "preview" ? "bg-white text-[#0a0a23]" : "border border-white/30 text-white"}`}>{locale === "fr" ? "Aperçu live" : "Live preview"}</button>
          <button type="button" role="tab" aria-selected={selectedPanel === "tests"} onClick={() => onSelectPanel("tests")} className={`min-h-10 px-4 font-bold ${selectedPanel === "tests" ? "bg-white text-[#0a0a23]" : "border border-white/30 text-white"}`}>{locale === "fr" ? "Tests" : "Tests"}{result ? ` ${passed}/${total}` : ""}</button>
        </div>
      </div>
      <div className="h-full min-h-0 flex-1 overflow-y-auto" tabIndex={0} aria-label={locale === "fr" ? "Contenu de l’aperçu et des tests" : "Preview and test content"}>
        {selectedPanel === "preview" && <Preview lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} />}
        {selectedPanel === "tests" && <div className="p-3">{allPassed && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}<TestPanel locale={locale} result={result} tests={tests} total={total} passed={passed} onRunTests={() => onRunTests(code)} />{(showCorrection || allPassed) && <ExplainedCorrection lesson={lesson} locale={locale} onLoadSolution={onLoadSolution} />}</div>}
      </div>
    </div>
  );
}

function InstructionText({ className, value }) {
  const html = String(value || "");
  if (!html.includes("<")) return <p className={className}>{html}</p>;
  return <p className={className} dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }} />;
}

function InstructionList({ title, items = [] }) {
  if (!items.length) return null;
  return <div className="mt-4">{title && <h4 className="text-xs font-black uppercase tracking-[.1em] text-indigo-200">{title}</h4>}<ol className="mt-2 grid gap-2">{items.map((item, index) => <li className="flex gap-3 text-sm leading-6 text-slate-200" key={item}><span className="font-bold text-indigo-300">{index + 1}.</span><span>{item}</span></li>)}</ol></div>;
}

function PracticeComparison({ comparison, locale }) {
  const cards = [
    [comparison.good, locale === "fr" ? "Bon réflexe" : "Good practice"],
    [comparison.bad, locale === "fr" ? "Piège fréquent" : "Common trap"]
  ];
  return <div className="mt-5 grid gap-3 md:grid-cols-2">{cards.map(([item, label]) => <article className="min-w-0 border border-white/15 bg-[#0a0a23] p-3" key={label}><h4 className="text-xs font-black uppercase tracking-[.1em] text-indigo-200">{label}</h4><p className="mt-2 text-sm font-bold text-white">{item.title}</p><pre tabIndex={0} className="mt-3 overflow-x-auto bg-white/5 p-3 font-mono text-xs leading-6 text-indigo-100">{resolveLocaleValue(item.code, locale) || ""}</pre><p className="mt-3 text-sm leading-6 text-slate-300">{item.explanation}</p></article>)}</div>;
}

function Preview({ lesson, locale, code, preview, previewKind, consoleOutput }) {
  return <div className="h-full min-h-full overflow-hidden bg-slate-50">{previewKind === "javascript" ? <div><div className="min-h-[220px] p-5 text-sm text-slate-500">{locale === "fr" ? "Exécute le code pour afficher ses sorties dans la console." : "Run the code to display its output in the console."}</div><pre tabIndex={0} aria-label={locale === "fr" ? "Sortie console scrollable" : "Scrollable console output"} className="min-h-40 overflow-auto bg-ink p-4 font-mono text-sm text-indigo-100">{consoleOutput || "Console"}</pre></div> : previewKind === "terminal" ? <CodePreview icon={Terminal} title={locale === "fr" ? "Terminal simulé" : "Simulated terminal"} code={`$ ${code || "…"}`} /> : ["typescript", "react", "node", "sql"].includes(previewKind) ? <CodePreview icon={Code2} title={codePreviewTitle(previewKind, locale)} code={code} /> : previewKind === "text" ? <CodePreview icon={BookOpen} title={locale === "fr" ? "Réponse structurée" : "Structured response"} code={code} light /> : <iframe key={`${lesson.id}-${preview}`} title="PulsaTeach preview" srcDoc={preview} sandbox={PREVIEW_IFRAME_SANDBOX} referrerPolicy="no-referrer" className="h-full min-h-[520px] w-full bg-white" />}</div>;
}

function TestPanel({ locale, result, tests, total, passed, onRunTests }) {
  const checks = result || tests.map((item) => ({ ...item, pass: false, waiting: true }));
  const failed = Math.max(0, total - passed);
  return (
    <div className="bg-white p-4" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-xl font-bold">{locale === "fr" ? "Tests automatiques" : "Automated tests"}</h4>
          <p className="mt-1 text-sm font-bold text-ink/62">{result ? `${passed}/${total}` : locale === "fr" ? "Lance les tests pour vérifier ton code." : "Run tests to check your code."}</p>
        </div>
        <button type="button" onClick={onRunTests} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-black text-white hover:bg-indigo-700 xl:hidden"><Play className="size-5" />{locale === "fr" ? "Lancer les tests" : "Run tests"}</button>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={locale === "fr" ? "Tests réussis" : "Passed tests"} aria-valuemin="0" aria-valuemax={total} aria-valuenow={passed}><div className="h-full rounded-full bg-mintPop transition-all" style={{ width: `${total ? (passed / total) * 100 : 0}%` }} /></div>
      {result && (
        <div className={`mt-4 rounded-xl border px-4 py-3 text-sm font-semibold ${failed === 0 ? "border-green-200 bg-green-50 text-green-900" : "border-amber-200 bg-amber-50 text-amber-900"}`} role="status">
          {failed === 0
            ? (locale === "fr" ? "Tous les checks passent. Tu peux poursuivre ou relire la correction expliquée pour comprendre pourquoi." : "All checks pass. You can continue or review the explained correction to understand why.")
            : (locale === "fr" ? `${failed} check${failed > 1 ? "s" : ""} reste${failed > 1 ? "nt" : ""} a corriger. Regarde d'abord le premier echec puis relance.` : `${failed} check${failed > 1 ? "s" : ""} still need fixing. Start with the first failure, then run again.`)}
        </div>
      )}
      <div className="mt-4 space-y-3">{checks.map((check, index) => <TestRow check={check} index={index} key={`${check.id || check.type || "check"}-${check.label || check.value || index}-${index}`} locale={locale} />)}</div>
    </div>
  );
}

function TestRow({ check, index, locale }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3 text-sm font-semibold ${check.waiting ? "border-slate-200 bg-slate-50 text-slate-500" : check.pass ? "border-green-200 bg-green-50 text-green-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      {check.waiting ? <Code2 className="mt-0.5 size-5 shrink-0 text-indigoPop" /> : check.pass ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-rosePop" />}
      <span>
        <span className="block">{index + 1}. {displayTestLabel(check, locale)}</span>
        {!check.waiting && !check.pass && <span className="mt-1 block text-xs font-medium leading-5 text-rose-700">{testFailureHelp(check, locale)}</span>}
      </span>
    </div>
  );
}

function WorkbenchButton({ children, icon: Icon, onClick, primary = false, ariaLabel, className = "" }) {
  return <button type="button" onClick={onClick} aria-label={ariaLabel} className={`${className} inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-black ${primary ? "border-indigo-400 bg-indigo-600 text-white hover:bg-indigo-700" : "border-white/20 bg-white/5 text-slate-100 hover:bg-white/10"}`}><Icon className="size-4" />{children}</button>;
}

function FocusTabs({ locale, active, onChange }) {
  const tabs = [
    ["learn", locale === "fr" ? "Comprendre" : "Learn", BookOpen],
    ["code", locale === "fr" ? "Coder" : "Code", Code2],
    ["results", locale === "fr" ? "Résultats" : "Results", CheckCircle2]
  ];
  const selectTab = (index) => {
    const id = tabs[index][0];
    onChange(id);
    window.requestAnimationFrame(() => document.getElementById(`lesson-tab-${id}`)?.focus());
  };
  const handleKeyDown = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return selectTab(0);
    if (event.key === "End") return selectTab(tabs.length - 1);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    selectTab((index + offset + tabs.length) % tabs.length);
  };
  return (
    <div className="grid grid-cols-3 border-b border-white/15 bg-[#1b1b32] p-2 xl:hidden" role="tablist" aria-label={locale === "fr" ? "Mode focus de la leçon" : "Lesson focus mode"}>
      {tabs.map(([id, label, Icon], index) => (
        <button id={`lesson-tab-${id}`} key={id} type="button" role="tab" aria-controls={`lesson-panel-${id}`} aria-selected={active === id} tabIndex={active === id ? 0 : -1} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => onChange(id)} className={`inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-black transition-none ${active === id ? "bg-white text-[#0a0a23]" : "border border-white/20 text-slate-200"}`}>
          <Icon className="size-4" />{label}
        </button>
      ))}
    </div>
  );
}

function CodePreview({ icon: Icon, title, code, light = false }) {
  return <div className={`min-h-[360px] p-5 ${light ? "bg-slate-50 text-slate-700" : "bg-slate-950 text-slate-100"}`}><div className="flex items-center gap-2 font-display text-lg font-bold"><Icon className="size-5 text-sky-400" />{title}</div><pre tabIndex={0} aria-label="Scrollable code preview" className="mt-5 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-4 font-mono text-sm">{code || "…"}</pre></div>;
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

function defaultFileName(lesson) {
  const extension = fileExtension(lesson);
  if (extension === "html") return "index.html";
  if (extension === "css") return "styles.css";
  if (["js", "jsx", "ts"].includes(extension)) return `script.${extension}`;
  return `exercise.${extension}`;
}
