import { Bookmark, BookmarkCheck, CheckCircle2, XCircle } from "lucide-react";
import { localize } from "../learn/learningState.js";
import { difficultyLabel, SkillChips } from "../learn/LearningShared.jsx";
import { CourseChapter } from "../learn/LearningPedagogy.jsx";

export function QuizHeader({ lesson, locale, isCompleted, isBookmarked, onToggleBookmark }) {
  return <>
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase text-indigoPop">quiz</span>
      <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-emerald-300">{lesson.xp} XP</span>
      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{difficultyLabel(lesson.difficulty, locale)} · {lesson.durationMin} min</span>
      {isCompleted && <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">{locale === "fr" ? "Validé" : "Passed"}</span>}
      <button type="button" onClick={onToggleBookmark} className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-cloud px-4 py-2 text-sm font-extrabold text-ink shadow-clayPressed transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangePop">
        {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        {isBookmarked ? (locale === "fr" ? "Sauvé" : "Saved") : (locale === "fr" ? "Favori" : "Save")}
      </button>
    </div>
    <h3 id={`quiz-title-${lesson.id}`} className="mt-4 pr-12 font-display text-3xl font-bold leading-tight sm:text-4xl">{lesson.title[locale]}</h3>
    <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-ink/70 sm:text-lg">{lesson.brief[locale]}</p>
    <SkillChips skills={lesson.skills} />
    {lesson.course && <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><summary className="cursor-pointer text-sm font-bold text-slate-700">{locale === "fr" ? "Besoin de réviser avant le bilan ?" : "Need a quick review first?"}</summary><CourseChapter course={lesson.course} theory={lesson.theory} locale={locale} /></details>}
  </>;
}

export function QuizResults({ quiz, score, locale, onRestart, restartDisabled = false, retrySeconds = 0 }) {
  const detailedResults = Array.isArray(score.results) && score.results.length > 0;
  const correctCount = detailedResults ? score.results.filter((result) => result.correct).length : null;
  return <section className={`mt-5 rounded-xl border p-4 ${score.passed ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`} aria-label={locale === "fr" ? "Résultats du quiz" : "Quiz results"}>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div><p className={`font-display text-2xl font-bold ${score.passed ? "text-green-900" : "text-amber-950"}`} role="status">{locale === "fr" ? `Score final : ${score.percent} %` : `Final score: ${score.percent}%`}</p><p className="mt-1 text-sm font-semibold text-slate-700">{detailedResults && <>{correctCount}/{score.results.length} {locale === "fr" ? "réponses correctes" : "correct answers"} · </>}{locale === "fr" ? `seuil ${quiz.passingScore} %` : `${quiz.passingScore}% required`}</p></div>
      <button type="button" onClick={onRestart} disabled={restartDisabled} className="secondary-button disabled:cursor-not-allowed disabled:opacity-60">{restartDisabled ? (locale === "fr" ? `Nouvelle tentative dans ${formatDuration(retrySeconds)}` : `Retry in ${formatDuration(retrySeconds)}`) : (locale === "fr" ? "Recommencer le bilan" : "Restart check")}</button>
    </div>
    {detailedResults && <ol className="mt-4 grid gap-2">{quiz.questions.map((question, index) => {
      const result = score.results.find((item) => item.questionId === question.id);
      return <li className={`rounded-lg border bg-white p-3 text-sm ${result?.correct ? "border-green-200" : "border-red-200"}`} key={question.id}><div className="flex items-start gap-2">{result?.correct ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-700" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-red-700" />}<div><p className="font-bold text-ink">{index + 1}. {localize(question.prompt, locale)}</p><p className="mt-1 leading-6 text-slate-600">{localize(result?.feedback || question.explanation, locale)}</p></div></div></li>;
    })}</ol>}
  </section>;
}

export function QuestionInput({ question, response, locale, onChange }) {
  const choices = question.choices?.length ? question.choices : question.type === "true-false"
    ? [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }]
    : [];
  if (["single", "true-false", "code-reading", "error-identification"].includes(question.type)) {
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <button type="button" aria-pressed={response === choice.id} key={choice.id} onClick={() => onChange(choice.id)} className={`rounded-xl border p-4 text-left text-sm font-semibold ${response === choice.id ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"}`}>{localize(choice.label, locale)}</button>)}</div>;
  }
  if (question.type === "multiple") {
    const selected = Array.isArray(response) ? response : [];
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <button type="button" aria-pressed={selected.includes(choice.id)} key={choice.id} onClick={() => onChange(selected.includes(choice.id) ? selected.filter((id) => id !== choice.id) : [...selected, choice.id])} className={`rounded-xl border p-4 text-left text-sm font-semibold ${selected.includes(choice.id) ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"}`}>{localize(choice.label, locale)}</button>)}</div>;
  }
  if (question.type === "ordering") {
    const order = Array.isArray(response) ? response : choices.map((choice) => choice.id);
    return <ol className="mt-5 grid gap-2">{order.map((id, index) => {
      const choice = choices.find((item) => item.id === id);
      const move = (offset) => {
        const target = index + offset;
        if (target < 0 || target >= order.length) return;
        const next = [...order];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      const choiceLabel = localize(choice?.label, locale);
      return <li className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3" key={id}><span className="flex-1 font-semibold">{index + 1}. {choiceLabel}</span><button type="button" disabled={index === 0} className="icon-button min-h-9 px-2 disabled:opacity-40" onClick={() => move(-1)} aria-label={locale === "fr" ? `Monter ${choiceLabel}` : `Move ${choiceLabel} up`}>↑</button><button type="button" disabled={index === order.length - 1} className="icon-button min-h-9 px-2 disabled:opacity-40" onClick={() => move(1)} aria-label={locale === "fr" ? `Descendre ${choiceLabel}` : `Move ${choiceLabel} down`}>↓</button></li>;
    })}</ol>;
  }
  if (question.type === "matching") {
    const matches = response && typeof response === "object" && !Array.isArray(response) ? response : {};
    return <div className="mt-5 grid gap-3">{(question.pairs || []).map((pair) => <label className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-2 sm:items-center" key={pair.id}><span className="font-semibold">{localize(pair.label, locale)}</span><select className="form-control" value={matches[pair.id] || ""} onChange={(event) => onChange({ ...matches, [pair.id]: event.target.value })}><option value="">{locale === "fr" ? "Choisir" : "Choose"}</option>{(pair.choices || choices).map((choice) => <option value={choice.id} key={choice.id}>{localize(choice.label, locale)}</option>)}</select></label>)}</div>;
  }
  return <label className="mt-5 block"><span className="text-sm font-bold text-slate-700">{locale === "fr" ? "Ta réponse" : "Your answer"}</span><textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm outline-none focus:border-indigoPop" value={typeof response === "string" ? response : ""} onChange={(event) => onChange(event.target.value)} /></label>;
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
