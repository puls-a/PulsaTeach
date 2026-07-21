import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, BookOpen, CheckCircle2, Code2, Copy, Eye, FileCode2, Keyboard, Lightbulb, Play, RotateCcw, Save, Terminal, XCircle } from "lucide-react";
import { recordAttempt, recordLearningEvent } from "../../apiClient.js";
import { createPreview, displayTestLabel, getPreviewKind, runJavaScriptWithConsole, testFailureHelp, validateLesson } from "../../lessonRuntime.js";
import { PREVIEW_IFRAME_SANDBOX } from "../../security/sandboxPolicy.js";
import { resolveLocaleValue } from "../../localeValue.js";
import { copyLessonLink } from "./learningState.js";
import { ActionButton, CompletionBanner, difficultyLabel, NotesPanel, SkillChips } from "./LearningShared.jsx";
import { CourseChapter, ExplainedCorrection, LessonGuide, PedagogyWorkshop, ProgressiveHints, ProjectRubric } from "./LearningPedagogy.jsx";

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
  const [focusPanel, setFocusPanel] = useState("learn");
  const [hasOpenedCode, setHasOpenedCode] = useState(false);
  const [workspacePanel, setWorkspacePanel] = useState("code");
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
    setFocusPanel("learn");
    setHasOpenedCode(false);
    setWorkspacePanel("code");
    setSaveState("saved");
  }, [lesson, locale, starterCode]);

  useEffect(() => {
    if (focusPanel === "code") setHasOpenedCode(true);
  }, [focusPanel]);

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
    setFocusPanel("results");
    window.requestAnimationFrame(() => document.getElementById("lesson-tab-results")?.focus());
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
    setWorkspacePanel("code");
    window.requestAnimationFrame(() => editorRef.current?.focus());
  };

  if (lesson.type === "quiz") return <QuizComponent activeTrack={activeTrack} activeModule={activeModule} lesson={lesson} locale={locale} isCompleted={isCompleted} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} onQuizResult={onQuizResult} onCloseQuiz={onCloseQuiz} onNext={onNext} hasNext={hasNext} />;

  return (
    <section className="focused-workspace min-w-0 rounded-3xl border border-slate-200 bg-white p-4 text-ink shadow-sm sm:p-5">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">{lesson.type}</span>
            {lesson.stepNumber && <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-violet-700">{locale === "fr" ? `Atelier étape ${lesson.stepNumber}` : `Workshop step ${lesson.stepNumber}`}</span>}
            <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-emerald-300">{lesson.xp} XP</span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
            {isCompleted && <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">{locale === "fr" ? "Validé" : "Passed"}</span>}
          </div>
          {lesson.projectThreadId && <p className="mt-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm font-bold leading-6 text-violet-800">{locale === "fr" ? "Fil rouge : chaque étape ajoute une pièce au projet PulsaConf. Garde le même projet en tête et valide petit à petit." : "Project thread: each step adds one piece to the PulsaConf project. Keep the same project in mind and validate gradually."}</p>}
          <h3 className="mt-3 font-display text-3xl font-bold">{lesson.title[locale]}</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-600">{lesson.brief[locale]}</p>
          <SkillChips skills={lesson.skills} />
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={() => setHintLevel((value) => Math.min(value + 1, hintsCount))} icon={Lightbulb}>{locale === "fr" ? `Indice ${Math.min(hintLevel + 1, hintsCount)}` : "Next hint"}</ActionButton>
          <ActionButton onClick={() => { copyLessonLink(); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }} icon={Copy}>{copied ? (locale === "fr" ? "Copié" : "Copied") : (locale === "fr" ? "Lien" : "Link")}</ActionButton>
          <ActionButton onClick={onToggleBookmark} icon={isBookmarked ? BookmarkCheck : Bookmark}>{isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}</ActionButton>
          <ActionButton onClick={() => { setShowCorrection((value) => !value); setFocusPanel("results"); }} icon={Eye}>{locale === "fr" ? "Correction expliquée" : "Explained correction"}</ActionButton>
        </div>
      </div>

      <FocusTabs locale={locale} active={focusPanel} onChange={setFocusPanel} />
      <section id="lesson-panel-learn" role="tabpanel" aria-labelledby="lesson-tab-learn" hidden={focusPanel !== "learn"} tabIndex={0}>
        {focusPanel === "learn" && (
          <>
           <CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} />
           <PedagogyWorkshop pedagogy={lesson.pedagogy} locale={locale} />
           <LessonGuide guide={lesson.guide} locale={locale} />
           <ProgressiveHints pedagogy={lesson.pedagogy} fallback={lesson.hint} level={hintLevel} locale={locale} />
           <div className="mt-4"><NotesPanel lessonId={lesson.id} locale={locale} note={note} setNote={setNote} /></div>
           {lesson.type === "project" && <ProjectRubric lesson={lesson} locale={locale} />}
          </>
        )}
      </section>

      <section id="lesson-panel-code" role="tabpanel" aria-labelledby="lesson-tab-code" hidden={focusPanel !== "code"} tabIndex={0}>
        {hasOpenedCode && (
          <>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-indigoPop">{locale === "fr" ? "Atelier interactif" : "Interactive workshop"}</p>
              <h4 className="mt-2 font-display text-2xl font-bold">{lesson.brief[locale]}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">{locale === "fr" ? "Écris et observe le résultat. Quand ton intention est claire, lance les tests pour obtenir une preuve." : "Write and inspect the result. When your intent is clear, run the tests to produce evidence."}</p>
            </div>
            <EditorWorkbench
              code={code}
              consoleOutput={consoleOutput}
              documentKey={`${lesson.id}:${locale}`}
              editorRef={editorRef}
              fileName={`${lesson.id}.${fileExtension(lesson)}`}
              languageKind={previewKind}
              lesson={lesson}
              locale={locale}
              onChange={setCode}
              onReset={resetCode}
              onRunCode={previewKind === "javascript" ? runCode : null}
              onRunTests={runTests}
              onSave={saveCode}
              preview={preview}
              previewKind={previewKind}
              saveState={saveState}
              selectedPanel={workspacePanel}
              setSelectedPanel={setWorkspacePanel}
              showPreview={focusPanel === "code"}
            />
          </>
        )}
      </section>

      <section id="lesson-panel-results" role="tabpanel" aria-labelledby="lesson-tab-results" hidden={focusPanel !== "results"} tabIndex={0}>
        {focusPanel === "results" && (
          <>
            {allPassed && <CompletionBanner locale={locale} onNext={onNext} hasNext={hasNext} />}
            <ResultsWorkbench lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} result={result} tests={lesson.tests} total={total} passed={passed} onRunTests={runTests} onBackToCode={() => setFocusPanel("code")} />
            {(showCorrection || allPassed) && <ExplainedCorrection lesson={lesson} locale={locale} onLoadSolution={() => { setCode(solution); setFocusPanel("code"); }} />}
          </>
        )}
      </section>
    </section>
  );
}

function EditorWorkbench({ code, consoleOutput, documentKey, editorRef, fileName, languageKind, locale, onChange, onReset, onRunCode, onRunTests, onSave, preview, previewKind, saveState, selectedPanel, setSelectedPanel, showPreview, lesson }) {
  const currentCode = () => editorRef.current?.state.doc.toString() ?? code;
  const panels = [
    ["code", locale === "fr" ? "Code" : "Code", FileCode2],
    ["preview", locale === "fr" ? "Aperçu" : "Preview", Eye, previewKind]
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/10" aria-label={locale === "fr" ? "Atelier de code" : "Code workshop"}>
      <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-900 px-3 py-3 text-white xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 font-mono text-xs font-bold text-slate-200"><FileCode2 className="size-4 text-indigo-300" />{fileName}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[.12em] ${saveState === "saved" ? "bg-green-400/15 text-green-200" : "bg-slate-700 text-slate-200"}`} role="status">
            {saveState === "saved" ? (locale === "fr" ? "Sauvegardé" : "Saved") : (locale === "fr" ? "Sauvegarde…" : "Saving…")}
          </span>
          <span className="hidden items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 sm:inline-flex"><Keyboard className="size-3.5" />Ctrl/⌘+Enter · Ctrl/⌘+S · Esc puis Tab</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {onRunCode && <WorkbenchButton onClick={() => onRunCode(currentCode())} icon={Terminal}>{locale === "fr" ? "Exécuter le code" : "Run code"}</WorkbenchButton>}
          <WorkbenchButton onClick={() => onRunTests(currentCode())} icon={Play} primary>
            {locale === "fr" ? "Lancer les tests" : "Run tests"}
          </WorkbenchButton>
          <WorkbenchButton onClick={() => onSave(currentCode())} icon={Save}>{locale === "fr" ? "Sauvegarder le code" : "Save code"}</WorkbenchButton>
          <WorkbenchButton onClick={onReset} icon={RotateCcw}>{locale === "fr" ? "Réinitialiser" : "Reset code"}</WorkbenchButton>
        </div>
      </div>

      <div className="border-b border-white/10 bg-slate-900/95 px-3 pb-3 text-xs font-semibold text-slate-300 xl:hidden">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2" role="status">
          {nextActionMessage({ locale, onRunCode: Boolean(onRunCode), previewKind, selectedPanel })}
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-white/10 bg-slate-900 p-2 xl:hidden" aria-label={locale === "fr" ? "Panneaux de l’éditeur" : "Editor panels"}>
        {panels.map(([id, label, Icon, badge]) => (
          <button key={id} type="button" aria-pressed={selectedPanel === id} onClick={() => setSelectedPanel(id)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-sm font-black ${selectedPanel === id ? "bg-indigoPop text-white" : "text-slate-300 hover:bg-white/10"}`}>
            <Icon className="size-4" />
            <span>{label}</span>
            {badge && <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${selectedPanel === id ? "bg-white/20 text-white" : "bg-white/10 text-slate-200"}`}>{badge}</span>}
          </button>
        ))}
      </div>

      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]">
        <div className={`${selectedPanel === "code" ? "block" : "hidden"} xl:block`}>
          <Suspense fallback={<div className="grid min-h-[520px] place-items-center bg-slate-950 font-bold text-slate-300" role="status">{locale === "fr" ? "Chargement de l’éditeur..." : "Loading editor..."}</div>}>
            <CodeMirrorEditor value={code} documentKey={documentKey} languageKind={languageKind} locale={locale} editorRef={editorRef} onChange={onChange} onRun={previewKind === "javascript" ? onRunCode : onRunTests} onSave={onSave} />
          </Suspense>
        </div>
        {showPreview && <div className={`${selectedPanel === "preview" ? "block" : "hidden"} border-t border-white/10 bg-white xl:block xl:border-l xl:border-t-0`}><Preview lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} /></div>}
      </div>
    </div>
  );
}

function ResultsWorkbench({ lesson, locale, code, preview, previewKind, consoleOutput, result, tests, total, passed, onRunTests, onBackToCode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-950 p-4 text-white">
        <div><p className="text-xs font-black uppercase tracking-[.14em] text-indigo-200">{locale === "fr" ? "Preuve d’apprentissage" : "Learning evidence"}</p><h4 className="mt-1 font-display text-2xl font-bold">{locale === "fr" ? "Résultats et diagnostic" : "Results and diagnosis"}</h4></div>
        <button type="button" onClick={onBackToCode} className="secondary-button">{locale === "fr" ? "Retour au code" : "Back to code"}</button>
      </div>
      <div className="grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="border-b border-slate-200 lg:border-b-0 lg:border-r"><Preview lesson={lesson} locale={locale} code={code} preview={preview} previewKind={previewKind} consoleOutput={consoleOutput} /></div>
        <TestPanel locale={locale} result={result} tests={tests} total={total} passed={passed} onRunTests={() => onRunTests(code)} />
      </div>
    </div>
  );
}

function Preview({ lesson, locale, code, preview, previewKind, consoleOutput }) {
  return <div className="overflow-hidden bg-slate-50"><div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 text-sm font-bold"><span className="inline-flex items-center gap-2"><Eye className="size-5 text-indigoPop" />{locale === "fr" ? "Aperçu live" : "Live preview"}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black uppercase text-slate-700">{previewKind}</span></div>{previewKind === "javascript" ? <div><div className="min-h-[170px] p-5 text-sm text-slate-500">{locale === "fr" ? "Exécute le code pour afficher ses sorties dans la console." : "Run the code to display its output in the console."}</div><pre tabIndex={0} aria-label={locale === "fr" ? "Sortie console scrollable" : "Scrollable console output"} className="min-h-32 overflow-auto bg-ink p-4 font-mono text-sm text-indigo-100">{consoleOutput || "Console"}</pre></div> : previewKind === "terminal" ? <CodePreview icon={Terminal} title={locale === "fr" ? "Terminal simulé" : "Simulated terminal"} code={`$ ${code || "…"}`} /> : ["typescript", "react", "node", "sql"].includes(previewKind) ? <CodePreview icon={Code2} title={codePreviewTitle(previewKind, locale)} code={code} /> : previewKind === "text" ? <CodePreview icon={BookOpen} title={locale === "fr" ? "Réponse structurée" : "Structured response"} code={code} light /> : <iframe key={`${lesson.id}-${preview}`} title="PulsaTeach preview" srcDoc={preview} sandbox={PREVIEW_IFRAME_SANDBOX} referrerPolicy="no-referrer" className="h-[360px] w-full bg-white" />}</div>;
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
        <button type="button" onClick={onRunTests} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-black text-white hover:bg-green-800"><Play className="size-5" />{locale === "fr" ? "Lancer les tests" : "Run tests"}</button>
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

function WorkbenchButton({ children, icon: Icon, onClick, primary = false }) {
  return <button type="button" onClick={onClick} className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-black ${primary ? "bg-indigoPop text-white hover:bg-indigo-700" : "bg-white/10 text-white hover:bg-white/20"}`}><Icon className="size-4" />{children}</button>;
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
    <div className="sticky top-24 z-20 mt-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur" role="tablist" aria-label={locale === "fr" ? "Mode focus de la leçon" : "Lesson focus mode"}>
      {tabs.map(([id, label, Icon], index) => (
        <button id={`lesson-tab-${id}`} key={id} type="button" role="tab" aria-controls={`lesson-panel-${id}`} aria-selected={active === id} tabIndex={active === id ? 0 : -1} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => onChange(id)} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-black transition-none sm:flex-none ${active === id ? "bg-indigo-700 text-white shadow-lg shadow-indigo-950/15" : "bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"}`}>
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

function nextActionMessage({ locale, onRunCode, previewKind, selectedPanel }) {
  const fr = locale === "fr";
  if (selectedPanel === "code") {
    return onRunCode
      ? (fr ? `Prochain geste : execute d'abord ton ${previewKind} pour verifier la sortie.` : `Next step: run your ${previewKind} first to verify the output.`)
      : (fr ? "Prochain geste : lance les tests pour verifier ton code avant de passer a la suite." : "Next step: run the tests to verify your code before moving on.");
  }
  return fr ? "Observe le rendu ou la sortie, puis reviens au code pour ajuster." : "Inspect the output, then return to code to adjust it.";
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
