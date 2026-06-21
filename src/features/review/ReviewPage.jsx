import { useEffect, useMemo, useState } from "react";
import { BookOpen, Brain, CheckCircle2, Clock3, RotateCcw } from "lucide-react";
import { loadRemoteProgress, recordLearningEvent, saveRemoteProgress } from "../../apiClient.js";
import { evaluateQuestion } from "../quizzes/quizEngine.js";
import { applyReviewRating, buildReviewSession, getReviewStats, reviewSessionSizes } from "./spacedRepetition.js";

const progressKey = "pulsateach-learning-progress";

export default function ReviewPage({ locale }) {
  const fr = locale === "fr";
  const [progress, setProgress] = useState(readProgress);
  const [sessionSize, setSessionSize] = useState(10);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [syncState, setSyncState] = useState("local");
  const stats = useMemo(() => getReviewStats(progress.review?.items || {}), [progress]);
  const item = session[index];

  useEffect(() => {
    let active = true;
    loadRemoteProgress().then((remote) => {
      if (!active || !remote) return;
      setProgress((local) => {
        const merged = mergeProgress(local, remote);
        localStorage.setItem(progressKey, JSON.stringify(merged));
        return merged;
      });
      setSyncState("synced");
    }).catch(() => setSyncState("local"));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (item?.questionType === "ordering") {
      setResponse(item.choices?.map((choice) => choice.id) || []);
    }
  }, [item]);

  const startSession = () => {
    const nextSession = buildReviewSession(progress.review?.items || {}, sessionSize);
    setSession(nextSession);
    setIndex(0);
    setResponse("");
    setResult(null);
    setStarted(true);
    recordLearningEvent({ eventType: "review_started", payload: { size: nextSession.length } }).catch(() => {});
  };

  const rate = (rating) => {
    if (!item || !result) return;
    const now = new Date();
    const next = {
      ...progress,
      review: {
        ...(progress.review || {}),
        items: {
          ...(progress.review?.items || {}),
          [item.id]: applyReviewRating(item, rating, now)
        },
        updatedAt: now.toISOString()
      }
    };
    setProgress(next);
    localStorage.setItem(progressKey, JSON.stringify(next));
    saveRemoteProgress(next).then(() => setSyncState("synced")).catch(() => setSyncState("offline"));
    recordLearningEvent({
      eventType: index + 1 >= session.length ? "review_completed" : "review_answered",
      lessonId: item.lessonId,
      trackId: item.trackId,
      payload: { rating, correct: result.correct, questionId: item.questionId }
    }).catch(() => {});
    setIndex((current) => current + 1);
    setResponse("");
    setResult(null);
  };

  const finished = started && session.length > 0 && index >= session.length;

  return (
    <main className="app-page min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl">
        <div className="surface">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-2xl">
              <span className="eyebrow"><Brain className="size-4" />{fr ? "Mémoire active" : "Active recall"}</span>
              <h1 className="page-heading mt-4">{fr ? "Révisions espacées" : "Spaced reviews"}</h1>
              <p className="mt-3 text-lg leading-8 text-slate-600">{fr ? "Retravaille au bon moment les questions qui t’ont posé problème, puis estime ton niveau de rappel." : "Revisit difficult questions at the right time, then rate how well you recalled the answer."}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{syncState === "synced" ? (fr ? "Progression synchronisée" : "Progress synced") : (fr ? "Sauvegarde locale" : "Local save")}</span>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <Stat icon={Clock3} label={fr ? "À revoir" : "Due now"} value={stats.due} />
            <Stat icon={BookOpen} label={fr ? "Questions suivies" : "Tracked questions"} value={stats.total} />
            <Stat icon={CheckCircle2} label={fr ? "Maîtrisées" : "Mastered"} value={stats.mastered} />
          </div>
        </div>

        {!started && (
          <section className="surface mt-6">
            <h2 className="font-display text-2xl font-bold">{fr ? "Préparer une session" : "Prepare a session"}</h2>
            <fieldset className="mt-5">
              <legend className="text-sm font-bold text-slate-700">{fr ? "Nombre de questions" : "Number of questions"}</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {reviewSessionSizes.map((size) => <button key={size} type="button" aria-pressed={sessionSize === size} onClick={() => setSessionSize(size)} className={`rounded-xl border px-5 py-3 font-bold ${sessionSize === size ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-700"}`}>{size}</button>)}
              </div>
            </fieldset>
            <button type="button" className="primary-button mt-6" onClick={startSession} disabled={stats.due === 0}><RotateCcw className="size-4" />{stats.due ? (fr ? "Commencer la révision" : "Start review") : (fr ? "Aucune révision en attente" : "No reviews due")}</button>
          </section>
        )}

        {started && session.length === 0 && <EmptyState fr={fr} onRestart={() => setStarted(false)} />}

        {item && (
          <section className="surface mt-6" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-indigo-700">{fr ? `Question ${index + 1} sur ${session.length}` : `Question ${index + 1} of ${session.length}`}</p>
              <a className="text-sm font-bold text-indigoPop underline" href={`/learn/${item.trackId}/${item.moduleId}/${item.lessonId}`}>{fr ? "Revoir la leçon" : "Review lesson"}</a>
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">{localize(item.prompt, locale)}</h2>
            <ReviewQuestionInput item={item} response={response} locale={locale} onChange={(value) => {
              setResponse(value);
              setResult(null);
            }} />
            {!result && <button type="button" className="primary-button mt-5" onClick={() => setResult(evaluateQuestion(toQuestion(item), response))} disabled={!hasResponse(response)}>{fr ? "Vérifier ma réponse" : "Check my answer"}</button>}
            {result && (
              <div className="mt-6" role="status">
                <div className={`rounded-xl border p-4 font-bold ${result.correct ? "border-green-200 bg-green-50 text-green-900" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
                  {result.correct ? (fr ? "Bonne réponse." : "Correct answer.") : (fr ? "Pas encore. Lis l’explication puis évalue ton rappel." : "Not yet. Read the explanation, then rate your recall.")}
                  {item.explanation && <p className="mt-2 font-medium">{localize(item.explanation, locale)}</p>}
                </div>
                <fieldset className="mt-5">
                  <legend className="text-sm font-bold text-slate-700">{fr ? "Comment était ton rappel ?" : "How well did you recall it?"}</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-4">
                    <RatingButton onClick={() => rate("again")} label={fr ? "À revoir" : "Again"} />
                    <RatingButton onClick={() => rate("hard")} label={fr ? "Difficile" : "Hard"} />
                    <RatingButton onClick={() => rate("good")} label={fr ? "Bien" : "Good"} />
                    <RatingButton onClick={() => rate("easy")} label={fr ? "Facile" : "Easy"} />
                  </div>
                </fieldset>
              </div>
            )}
          </section>
        )}

        {finished && <EmptyState fr={fr} completed onRestart={() => setStarted(false)} />}
      </section>
    </main>
  );
}

function ReviewQuestionInput({ item, response, locale, onChange }) {
  const choices = item.choices?.length ? item.choices : item.questionType === "true-false" ? [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }] : [];
  if (["single", "true-false", "code-reading", "error-identification"].includes(item.questionType)) {
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <ChoiceButton key={choice.id} selected={response === choice.id} onClick={() => onChange(choice.id)}>{localize(choice.label, locale)}</ChoiceButton>)}</div>;
  }
  if (item.questionType === "multiple") {
    const selected = Array.isArray(response) ? response : [];
    return <div className="mt-5 grid gap-3">{choices.map((choice) => <ChoiceButton key={choice.id} selected={selected.includes(choice.id)} onClick={() => onChange(selected.includes(choice.id) ? selected.filter((id) => id !== choice.id) : [...selected, choice.id])}>{localize(choice.label, locale)}</ChoiceButton>)}</div>;
  }
  if (item.questionType === "ordering") {
    const order = Array.isArray(response) ? response : choices.map((choice) => choice.id);
    return <ol className="mt-5 grid gap-2">{order.map((id, index) => {
      const choice = choices.find((candidate) => candidate.id === id);
      const move = (offset) => {
        const target = index + offset;
        if (target < 0 || target >= order.length) return;
        const next = [...order];
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      return <li className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3" key={id}><span className="flex-1 font-semibold">{index + 1}. {localize(choice?.label, locale)}</span><button type="button" className="icon-button min-h-9 px-2" onClick={() => move(-1)} aria-label={locale === "fr" ? "Monter" : "Move up"}>↑</button><button type="button" className="icon-button min-h-9 px-2" onClick={() => move(1)} aria-label={locale === "fr" ? "Descendre" : "Move down"}>↓</button></li>;
    })}</ol>;
  }
  if (item.questionType === "matching") {
    const matches = response && typeof response === "object" && !Array.isArray(response) ? response : {};
    return <div className="mt-5 grid gap-3">{(item.pairs || []).map((pair) => <label className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-2 sm:items-center" key={pair.id}><span className="font-semibold">{localize(pair.label, locale)}</span><select className="form-control" value={matches[pair.id] || ""} onChange={(event) => onChange({ ...matches, [pair.id]: event.target.value })}><option value="">{locale === "fr" ? "Choisir" : "Choose"}</option>{(pair.choices || choices).map((choice) => <option value={choice.id} key={choice.id}>{localize(choice.label, locale)}</option>)}</select></label>)}</div>;
  }
  return <label className="mt-5 block"><span className="text-sm font-bold text-slate-700">{locale === "fr" ? "Ta réponse" : "Your answer"}</span><textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-sm outline-none focus:border-indigoPop" value={typeof response === "string" ? response : ""} onChange={(event) => onChange(event.target.value)} /></label>;
}

function ChoiceButton({ selected, onClick, children }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`rounded-xl border p-4 text-left text-sm font-semibold ${selected ? "border-indigo-400 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"}`}>{children}</button>;
}

function RatingButton({ onClick, label }) {
  return <button type="button" onClick={onClick} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50">{label}</button>;
}

function Stat({ icon: Icon, label, value }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><Icon className="size-5 text-indigoPop" /><p className="mt-3 text-3xl font-black">{value}</p><p className="text-sm font-semibold text-slate-500">{label}</p></div>;
}

function EmptyState({ fr, completed = false, onRestart }) {
  return <section className="surface mt-6 text-center"><CheckCircle2 className="mx-auto size-10 text-green-700" /><h2 className="mt-4 font-display text-2xl font-bold">{completed ? (fr ? "Session terminée" : "Session complete") : (fr ? "Tout est à jour" : "You are all caught up")}</h2><p className="mt-2 text-slate-600">{completed ? (fr ? "Tes prochaines échéances ont été recalculées." : "Your next review dates have been scheduled.") : (fr ? "Les nouvelles erreurs de quiz apparaîtront ici." : "New quiz mistakes will appear here.")}</p><button type="button" className="secondary-button mt-5" onClick={onRestart}>{fr ? "Retour" : "Back"}</button></section>;
}

function toQuestion(item) {
  return { id: item.questionId, type: item.questionType, answer: item.answer, acceptedAnswers: item.acceptedAnswers, keywords: item.keywords, points: 1, skills: item.skills, glossaryTerms: item.glossaryTerms };
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey)) || { completed: {}, review: { items: {} } };
  } catch {
    return { completed: {}, review: { items: {} } };
  }
}

function mergeProgress(local, remote) {
  return { ...local, ...remote, completed: { ...(local.completed || {}), ...(remote.completed || {}) }, review: { ...(local.review || {}), ...(remote.review || {}), items: { ...(local.review?.items || {}), ...(remote.review?.items || {}) } } };
}

function localize(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] || value.en || value.fr || "";
  return String(value || "");
}

function hasResponse(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0 && Object.values(value).every(Boolean);
  return String(value ?? "").trim().length > 0;
}
