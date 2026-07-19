import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowRight, Award, BookOpenCheck, Brain, CheckCircle2, Clock3, Flame, FolderKanban, Sparkles, Trophy } from "lucide-react";
import AuthNotice from "../../components/AuthNotice.jsx";
import { getProfile, getStudyPlan, loadRemoteProgress } from "../../apiClient.js";
import { loadAllLocalTracks } from "../../content/localTrackLoader.js";
import { streakStatus } from "../learn/learningState.js";
import { getReviewStats } from "../review/spacedRepetition.js";
import { computeSkillProgress } from "../skills/skillIndex.js";
import { useLearningTracks } from "../../useLearningTracks.js";

const progressKey = "pulsateach-learning-progress";

export default function DashboardPage({ locale }) {
  const fr = locale === "fr";
  const { tracks } = useLearningTracks({ mode: "summary" });
  const [progress, setProgress] = useState(readLocalProgress);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [nextLesson, setNextLesson] = useState(null);
  const [profile, setProfile] = useState(null);
  const [syncState, setSyncState] = useState("loading");
  const [knownLessonIds, setKnownLessonIds] = useState(null);
  const total = tracks.reduce((sum, track) => sum + Number(track.lessons || 0), 0);
  const completedIds = Object.keys(progress.completed || {});
  const completed = knownLessonIds ? completedIds.filter((id) => knownLessonIds.has(id)).length : completedIds.length;
  const progressPercent = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const streak = streakStatus(progress.streak);
  const reviewStats = useMemo(() => getReviewStats(progress.review?.items || {}), [progress]);

  useEffect(() => {
    let active = true;
    loadRemoteProgress()
      .then((remote) => {
        if (!active) return;
        if (!remote) {
          setSyncState("local");
          return;
        }
        setProgress((current) => {
          const merged = mergeDashboardProgress(current, remote);
          localStorage.setItem(progressKey, JSON.stringify(merged));
          return merged;
        });
        setSyncState("synced");
      })
      .catch(() => active && setSyncState("local"));
    getProfile().then((value) => active && setProfile(value)).catch(() => {});
    getStudyPlan().then((plan) => {
      if (!active || !plan?.nextLessons?.[0]) return;
      setNextLesson(normalizePlannedLesson(plan.nextLessons[0], locale));
    }).catch(() => {});
    const onSynced = (event) => {
      setProgress(event.detail);
      setSyncState("synced");
    };
    window.addEventListener("pulsateach-progress-synced", onSynced);
    return () => {
      active = false;
      window.removeEventListener("pulsateach-progress-synced", onSynced);
    };
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    setSkillsLoading(true);
    loadAllLocalTracks()
      .then((fullTracks) => {
        if (cancelled) return;
        const lessons = flattenLessons(fullTracks, locale);
        setKnownLessonIds(new Set(lessons.map((lesson) => lesson.id)));
        setSkills(computeSkillProgress(fullTracks, progress).slice(0, 6));
        setNextLesson((current) => !current || progress.completed?.[current.id] ? lessons.find((lesson) => !progress.completed?.[lesson.id]) || null : current);
      })
      .catch(() => {
        if (!cancelled) setSkills([]);
      })
      .finally(() => {
        if (!cancelled) setSkillsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale, progress]);

  const projectSummary = profile?.summary || {};
  const issuedCertificates = (profile?.certificates || []).filter((certificate) => certificate.issued).length;

  return (
    <section className="app-page bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-900/10 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-emerald-300">
                <Sparkles className="size-4" />{fr ? "Ton espace d’apprentissage" : "Your learning space"}
              </div>
              <h1 className="mt-4 max-w-2xl font-display text-3xl font-black leading-tight sm:text-5xl">
                {fr ? "Une prochaine action claire. Des progrès qui se voient." : "One clear next action. Progress you can see."}
              </h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-300">
                {fr ? "Continue ton parcours, consolide ce qui risque de s’oublier et transforme chaque étape en preuve concrète." : "Continue your path, reinforce what may fade, and turn every step into concrete proof."}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300" role="status">
                <span className={`size-2 rounded-full ${syncState === "synced" ? "bg-emerald-300" : "bg-slate-400"}`} />
                {syncLabel(syncState, fr)}
              </p>
            </div>
            <ContinueCard lesson={nextLesson} fr={fr} />
          </div>
        </section>

        <div className="mt-6"><AuthNotice locale={locale} /></div>

        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label={fr ? "Résumé de progression" : "Progress summary"}>
          <MetricCard icon={Trophy} label="XP" value={progress.xp || 0} detail={fr ? "expérience gagnée" : "experience earned"} reward />
          <MetricCard icon={BookOpenCheck} label={fr ? "Progression" : "Progress"} value={`${progressPercent}%`} detail={`${completed}/${total} ${fr ? "leçons" : "lessons"}`} />
          <MetricCard icon={Flame} label={fr ? "Série" : "Streak"} value={fr ? `${streak.count} j` : `${streak.count}d`} detail={fr ? `record ${streak.longest} j` : `best ${streak.longest}d`} />
          <MetricCard icon={Brain} label={fr ? "À réviser" : "Due reviews"} value={reviewStats.due} detail={`${reviewStats.mastered} ${fr ? "maîtrisées" : "mastered"}`} href="/review" />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <SkillsPanel skills={skills} loading={skillsLoading} locale={locale} />
          <StreakPanel streak={streak} locale={locale} />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3" aria-label={fr ? "Prochaines actions" : "Next actions"}>
          <ActionCard icon={Brain} eyebrow={fr ? "Mémoire" : "Memory"} title={reviewStats.due ? (fr ? `${reviewStats.due} révision${reviewStats.due > 1 ? "s" : ""} à faire` : `${reviewStats.due} review${reviewStats.due > 1 ? "s" : ""} due`) : (fr ? "Mémoire à jour" : "Memory up to date")} text={fr ? "Réactive les notions au moment où elles commencent à s’effacer." : "Recall concepts just as they begin to fade."} href="/review" cta={fr ? "Ouvrir les révisions" : "Open reviews"} />
          <ActionCard icon={FolderKanban} eyebrow={fr ? "Portfolio" : "Portfolio"} title={fr ? `${projectSummary.approvedProjects || 0} projet${projectSummary.approvedProjects > 1 ? "s" : ""} approuvé${projectSummary.approvedProjects > 1 ? "s" : ""}` : `${projectSummary.approvedProjects || 0} approved project${projectSummary.approvedProjects === 1 ? "" : "s"}`} text={fr ? `${projectSummary.submittedProjects || 0} soumission(s) suivie(s) dans ton espace.` : `${projectSummary.submittedProjects || 0} submission(s) tracked in your space.`} href="/projects" cta={fr ? "Voir mes projets" : "View projects"} />
          <ActionCard icon={Award} eyebrow={fr ? "Preuves" : "Credentials"} title={fr ? `${issuedCertificates} certificat${issuedCertificates > 1 ? "s" : ""} obtenu${issuedCertificates > 1 ? "s" : ""}` : `${issuedCertificates} certificate${issuedCertificates === 1 ? "" : "s"} earned`} text={fr ? "Suis les critères restants et prépare tes preuves partageables." : "Track remaining criteria and prepare shareable proof."} href="/certification" cta={fr ? "Voir les certificats" : "View certificates"} />
        </section>

        <ActivityFeed activity={progress.activity || []} locale={locale} />
      </div>
    </section>
  );
}

function ContinueCard({ lesson, fr }) {
  return (
    <div className="rounded-3xl bg-white p-5 text-ink shadow-xl">
      <p className="text-xs font-black uppercase tracking-[.16em] text-indigoPop">{fr ? "Prochaine étape" : "Next step"}</p>
      <h2 className="mt-3 font-display text-2xl font-black leading-tight">{lesson?.title || (fr ? "Choisis ton premier parcours" : "Choose your first path")}</h2>
      <p className="mt-2 text-sm font-semibold text-slate-500">{lesson?.trackTitle || (fr ? "14 parcours disponibles" : "14 paths available")}</p>
      {lesson && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-2"><Clock3 className="mr-1 inline size-4" />{lesson.durationMin || 10} min</span>
          <span className="rounded-full bg-slate-950 px-3 py-2 text-emerald-300">+{lesson.xp || 0} XP</span>
        </div>
      )}
      <a href={lesson?.href || "/catalog"} className="primary-button mt-5 w-full">
        {lesson ? (fr ? "Continuer à apprendre" : "Continue learning") : (fr ? "Explorer les parcours" : "Explore paths")}<ArrowRight className="size-5" />
      </a>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail, href, reward = false }) {
  const content = (
    <>
      <span className={`grid size-10 place-items-center rounded-xl ${reward ? "bg-white/10 text-emerald-300" : "bg-indigo-50 text-indigoPop"}`}><Icon className="size-5" /></span>
      <p className={`mt-4 font-display text-2xl font-black sm:text-3xl ${reward ? "text-white" : "text-ink"}`}>{value}</p>
      <p className={`mt-1 text-sm font-black ${reward ? "text-emerald-300" : "text-slate-700"}`}>{label}</p>
      <p className={`mt-1 text-xs font-semibold ${reward ? "text-slate-400" : "text-slate-500"}`}>{detail}</p>
    </>
  );
  const classes = `rounded-2xl border p-4 shadow-sm ${reward ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`;
  return href ? <a href={href} className={`${classes} hover:-translate-y-0.5 hover:border-indigo-300`}>{content}</a> : <article className={classes}>{content}</article>;
}

function SkillsPanel({ skills, loading, locale }) {
  const fr = locale === "fr";
  return (
    <section className="surface lg:col-span-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="eyebrow">{fr ? "Compétences" : "Skills"}</p><h2 className="mt-2 font-display text-2xl font-black sm:text-3xl">{fr ? "Ce que tu sais déjà mobiliser" : "What you can already apply"}</h2></div>
        <a href="/path" className="text-sm font-black text-indigoPop hover:text-indigo-700">{fr ? "Voir mon parcours" : "View my path"}</a>
      </div>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600">{fr ? "Le niveau combine les leçons validées, les quiz et la solidité de tes révisions." : "Levels combine passed lessons, quiz evidence, and review strength."}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {loading && <p className="empty-state">{fr ? "Calcul des compétences en cours..." : "Computing skills..."}</p>}
        {!loading && skills.length === 0 && <p className="empty-state">{fr ? "Valide une première leçon pour révéler tes compétences." : "Pass your first lesson to reveal your skills."}</p>}
        {skills.map((skill) => {
          const percent = Math.max(0, Math.min(100, Number(skill.percent) || 0));
          return (
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={skill.id}>
              <div className="flex min-w-0 items-center justify-between gap-3"><h3 className="min-w-0 truncate font-bold">{skill.label}</h3><span className="shrink-0 text-sm font-black text-indigoPop">{percent}%</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigoPop" style={{ width: `${percent}%` }} /></div>
              <p className="mt-2 text-xs font-semibold text-slate-600">{skill.completedLessons}/{skill.totalLessons} {fr ? "leçons" : "lessons"} · {skill.quizEvidence} quiz · {skill.reviewEvidence} {fr ? "révisions" : "reviews"}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StreakPanel({ streak, locale }) {
  const fr = locale === "fr";
  const activityDates = new Set(streak.recentDates || []);
  const formatter = new Intl.DateTimeFormat(fr ? "fr-FR" : "en-US", { weekday: "short" });
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return { key, label: formatter.format(date).slice(0, 2), active: activityDates.has(key) };
  });
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-sm">
      <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-300"><Flame className="size-6" /></span>
      <p className="mt-5 text-xs font-black uppercase tracking-[.16em] text-emerald-300">{fr ? "Régularité" : "Consistency"}</p>
      <h2 className="mt-2 font-display text-2xl font-black">{streak.count ? (fr ? `${streak.count} jour${streak.count > 1 ? "s" : ""} de suite` : `${streak.count}-day streak`) : (fr ? "Commence aujourd’hui" : "Start today")}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{streak.activeToday ? (fr ? "Objectif du jour validé. Reviens demain pour continuer." : "Today is secured. Come back tomorrow.") : (fr ? "Termine une leçon pour faire avancer ta série." : "Complete one lesson to move your streak forward.")}</p>
      <div className="mt-6 grid grid-cols-7 gap-1" aria-label={fr ? "Activité des sept derniers jours" : "Last seven days activity"}>
        {days.map((day) => (
          <div key={day.key} className="text-center">
            <span className="mb-2 block text-xs font-bold uppercase text-slate-400">{day.label}</span>
            <span className={`mx-auto grid size-8 place-items-center rounded-full border ${day.active ? "border-emerald-300 bg-white/10 text-emerald-300" : "border-slate-700 text-slate-600"}`}>
              <Flame className="size-4" aria-hidden="true" /><span className="sr-only">{day.active ? (fr ? "actif" : "active") : (fr ? "inactif" : "inactive")}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-bold text-slate-300">
        <span className="rounded-xl bg-white/5 p-3">{fr ? "Record" : "Best"}<strong className="mt-1 block text-lg text-white">{streak.longest}{fr ? " j" : "d"}</strong></span>
        <span className="rounded-xl bg-white/5 p-3">{fr ? "Jours actifs" : "Active days"}<strong className="mt-1 block text-lg text-white">{streak.totalActiveDays}</strong></span>
      </div>
    </section>
  );
}

function ActionCard({ icon: Icon, eyebrow, title, text, href, cta }) {
  return (
    <article className="surface flex flex-col">
      <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigoPop"><Icon className="size-5" /></span>
      <p className="mt-4 text-xs font-black uppercase tracking-[.14em] text-indigoPop">{eyebrow}</p>
      <h2 className="mt-2 font-display text-xl font-black text-ink">{title}</h2>
      <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-slate-600">{text}</p>
      <a href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigoPop hover:text-indigo-700">{cta}<ArrowRight className="size-4" /></a>
    </article>
  );
}

function ActivityFeed({ activity, locale }) {
  const fr = locale === "fr";
  return (
    <section className="surface mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">{fr ? "Historique" : "History"}</p><h2 className="mt-2 font-display text-2xl font-black">{fr ? "Activité récente" : "Recent activity"}</h2></div><Activity className="size-6 text-indigoPop" /></div>
      <div className="mt-5 grid gap-3">
        {activity.length === 0 && <p className="empty-state">{fr ? "Aucune activité validée pour le moment." : "No passed activity yet."}</p>}
        {activity.slice(0, 6).map((item) => (
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4" key={`${item.id}-${item.at}`}>
            <div className="min-w-0"><p className="break-words font-bold text-ink">{item.title?.[locale] || item.id}</p>{formatActivityDate(item.at, fr) && <time className="mt-1 block text-xs font-semibold text-slate-500" dateTime={item.at}>{formatActivityDate(item.at, fr)}</time>}</div>
            <span className="shrink-0 rounded-full bg-slate-950 px-3 py-2 text-xs font-black text-emerald-300">+{item.xp || 0} XP</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function flattenLessons(tracks, locale) {
  return tracks.flatMap((track) => (track.modules || []).flatMap((module) => (module.lessons || []).map((lesson) => ({
    id: lesson.id,
    title: lesson.title?.[locale] || lesson.id,
    trackTitle: track.title?.[locale] || track.label || track.id,
    durationMin: lesson.durationMin,
    xp: lesson.xp,
    href: `/learn/${track.id}/${module.id}/${lesson.id}`
  }))));
}

function normalizePlannedLesson(lesson, locale) {
  return { ...lesson, title: lesson.title?.[locale] || lesson.title || lesson.id, trackTitle: lesson.trackLabel?.[locale] || lesson.trackLabel || lesson.trackId, href: String(lesson.href || "").replace(/^#/, "") };
}

function syncLabel(state, fr) {
  if (state === "synced") return fr ? "Progression synchronisée" : "Progress synced";
  if (state === "loading") return fr ? "Synchronisation en cours" : "Syncing progress";
  return fr ? "Progression sauvegardée localement" : "Progress saved locally";
}

function formatActivityDate(value, fr) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(fr ? "fr-FR" : "en-US", { dateStyle: "medium" }).format(date);
}

function readLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey)) || { xp: 0, completed: {}, activity: [], streak: {} };
  } catch {
    return { xp: 0, completed: {}, activity: [], streak: {} };
  }
}

export function mergeDashboardProgress(local, remote) {
  return {
    ...local,
    ...remote,
    xp: Math.max(Number(local?.xp) || 0, Number(remote?.xp) || 0),
    completed: { ...(local?.completed || {}), ...(remote?.completed || {}) },
    quizEvidence: { ...(local?.quizEvidence || {}), ...(remote?.quizEvidence || {}) },
    review: { ...(local?.review || {}), ...(remote?.review || {}), items: { ...(local?.review?.items || {}), ...(remote?.review?.items || {}) } },
    streak: {
      ...(local?.streak || {}),
      ...(remote?.streak || {}),
      count: Math.max(Number(local?.streak?.count) || 0, Number(remote?.streak?.count) || 0),
      longest: Math.max(Number(local?.streak?.longest) || 0, Number(remote?.streak?.longest) || 0),
      totalActiveDays: Math.max(Number(local?.streak?.totalActiveDays) || 0, Number(remote?.streak?.totalActiveDays) || 0),
      recentDates: [...new Set([...(local?.streak?.recentDates || []), ...(remote?.streak?.recentDates || [])])].sort().slice(-30)
    },
    activity: [...(remote?.activity || []), ...(local?.activity || [])].filter((item, index, items) => items.findIndex((candidate) => `${candidate.id}-${candidate.at}` === `${item.id}-${item.at}`) === index).slice(0, 100)
  };
}
