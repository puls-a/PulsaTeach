import { useEffect, useState } from "react";
import { Activity, Award, BookOpenCheck, ClipboardCheck, Database, Flame, FolderKanban, Server, Trophy } from "lucide-react";
import AuthNotice from "../../components/AuthNotice.jsx";
import DashCard from "../../components/DashCard.jsx";
import { getApiHealth, getStats, getSupabaseStatus, loadRemoteProgress } from "../../apiClient.js";
import { loadAllLocalTracks } from "../../content/localTrackLoader.js";
import { computeSkillProgress } from "../skills/skillIndex.js";
import { streakStatus } from "../learn/learningState.js";
import { useLearningTracks } from "../../useLearningTracks.js";

export default function DashboardPage({ locale }) {
  const { tracks } = useLearningTracks({ mode: "summary" });
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [supabaseStatus, setSupabaseStatus] = useState(null);
  const [progress, setProgress] = useState(readLocalProgress);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const completed = Object.keys(progress.completed || {}).length;
  const total = tracks.reduce((sum, track) => sum + Number(track.lessons || 0), 0);
  const streak = streakStatus(progress.streak);

  useEffect(() => {
    getApiHealth().then(setHealth).catch(() => setHealth({ ok: false }));
    getStats().then(setStats).catch(() => setStats(null));
    getSupabaseStatus().then(setSupabaseStatus).catch(() => setSupabaseStatus(null));
    loadRemoteProgress().then((remote) => {
      if (!remote) return;
      setProgress((current) => {
        const merged = mergeDashboardProgress(current, remote);
        localStorage.setItem("pulsateach-learning-progress", JSON.stringify(merged));
        return merged;
      });
    }).catch(() => {});
    const onSynced = (event) => setProgress(event.detail);
    window.addEventListener("pulsateach-progress-synced", onSynced);
    return () => window.removeEventListener("pulsateach-progress-synced", onSynced);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setSkillsLoading(true);
    loadAllLocalTracks()
      .then((fullTracks) => {
        if (cancelled) return;
        setSkills(computeSkillProgress(fullTracks, progress).slice(0, 8));
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
  }, [progress]);

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Dashboard apprenant" : "Learner dashboard"}</p>
        <h1 className="page-heading">{locale === "fr" ? "Ta progression en un coup d'œil." : "Your progress at a glance."}</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          <DashCard icon={Trophy} label="XP" value={progress.xp || 0} />
          <DashCard icon={BookOpenCheck} label={locale === "fr" ? "Leçons" : "Lessons"} value={`${completed}/${total}`} />
          <DashCard icon={Flame} label={locale === "fr" ? "Série" : "Streak"} value={`${streak.count} j`} />
          <DashCard icon={Server} label="API" value={health?.ok ? "online" : "offline"} />
        </div>
        <StreakPanel streak={streak} locale={locale} />
        <div className="mt-5 grid gap-5 lg:grid-cols-5">
          <DashCard icon={Activity} label={locale === "fr" ? "Leçons API" : "API lessons"} value={stats?.lessons ?? "..."} />
          <DashCard icon={FolderKanban} label={locale === "fr" ? "Projets" : "Projects"} value={stats?.projects ?? "..."} />
          <DashCard icon={ClipboardCheck} label={locale === "fr" ? "Soumissions" : "Submissions"} value={stats?.submissions ?? "..."} />
          <DashCard icon={Award} label={locale === "fr" ? "Certificats" : "Certificates"} value={stats?.certificates ?? "..."} />
          <DashCard icon={Database} label="Storage" value={supabaseStatus?.mode || health?.storage || "json"} />
        </div>
        <section className="surface mt-8">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Compétences" : "Skills"}</h2>
          <p className="mt-2 text-sm text-slate-600">{locale === "fr" ? "Chaque niveau combine leçons validées, quiz et révisions récentes." : "Every level combines completed lessons, quizzes, and recent reviews."}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {skillsLoading && <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600">{locale === "fr" ? "Calcul des compétences en cours..." : "Computing skills..."}</p>}
            {skills.map((skill) => (
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={skill.id}>
                <div className="flex items-center justify-between gap-3"><h3 className="font-bold">{skill.label}</h3><span className="text-sm font-bold text-indigoPop">{skill.percent}%</span></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigoPop" style={{ width: `${skill.percent}%` }} /></div>
                <p className="mt-2 text-xs font-semibold text-slate-600">{skill.completedLessons}/{skill.totalLessons} {locale === "fr" ? "leçons" : "lessons"} · {skill.quizEvidence} quiz · {skill.reviewEvidence} {locale === "fr" ? "révisions" : "reviews"}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="surface mt-8">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Activité récente" : "Recent activity"}</h2>
          <div className="mt-4 grid gap-3">
            {(progress.activity || []).length === 0 && <p className="empty-state">{locale === "fr" ? "Aucune activité validée pour le moment." : "No passed activity yet."}</p>}
            {(progress.activity || []).map((item) => (
              <div className="flex items-center justify-between rounded-2xl bg-cloud p-4 font-extrabold clay-soft" key={`${item.id}-${item.at}`}>
                <span>{item.title?.[locale] || item.id}</span>
                <span className="rounded-xl bg-lemonPop px-3 py-1">{item.xp} XP</span>
              </div>
            ))}
          </div>
        </section>
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
    <section className="mt-8 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Flame size={28} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">{fr ? "Régularité" : "Consistency"}</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {streak.count > 0
                ? (fr ? `${streak.count} jour${streak.count > 1 ? "s" : ""} de suite` : `${streak.count}-day streak`)
                : (fr ? "Commence ta série aujourd’hui" : "Start your streak today")}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              {streak.activeToday
                ? (fr ? "Objectif du jour validé. Reviens demain pour continuer." : "Today is secured. Come back tomorrow to keep it going.")
                : streak.atRisk
                  ? (fr ? "Ta série est en jeu : termine une leçon aujourd’hui." : "Your streak is at risk: complete one lesson today.")
                  : (fr ? "Termine une leçon pour gagner le bonus quotidien de 10 XP." : "Complete a lesson to earn today’s 10 XP bonus.")}
            </p>
          </div>
        </div>
        <div className="grid min-w-[280px] grid-cols-7 gap-2" aria-label={fr ? "Activité des sept derniers jours" : "Last seven days activity"}>
          {days.map((day) => (
            <div key={day.key} className="text-center">
              <span className="mb-2 block text-xs font-bold uppercase text-slate-500">{day.label}</span>
              <span className={`mx-auto grid h-9 w-9 place-items-center rounded-full border ${day.active ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-300"}`}>
                <Flame size={17} aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
        <span className="rounded-full bg-white/80 px-3 py-2">{fr ? "Record" : "Best"}: {streak.longest} j</span>
        <span className="rounded-full bg-white/80 px-3 py-2">{fr ? "Jours actifs" : "Active days"}: {streak.totalActiveDays}</span>
        <span className="rounded-full bg-white/80 px-3 py-2">{fr ? "Prochain palier" : "Next milestone"}: {streak.nextMilestone} j</span>
      </div>
    </section>
  );
}

function readLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-learning-progress")) || { xp: 0, completed: {}, activity: [], streak: {} };
  } catch {
    return { xp: 0, completed: {}, activity: [], streak: {} };
  }
}

function mergeDashboardProgress(local, remote) {
  return {
    ...local,
    ...remote,
    xp: Math.max(Number(local?.xp) || 0, Number(remote?.xp) || 0),
    completed: { ...(local?.completed || {}), ...(remote?.completed || {}) },
    quizEvidence: { ...(local?.quizEvidence || {}), ...(remote?.quizEvidence || {}) },
    review: {
      ...(local?.review || {}),
      ...(remote?.review || {}),
      items: { ...(local?.review?.items || {}), ...(remote?.review?.items || {}) }
    },
    streak: {
      ...(local?.streak || {}),
      ...(remote?.streak || {}),
      count: Math.max(Number(local?.streak?.count) || 0, Number(remote?.streak?.count) || 0),
      longest: Math.max(Number(local?.streak?.longest) || 0, Number(remote?.streak?.longest) || 0),
      totalActiveDays: Math.max(Number(local?.streak?.totalActiveDays) || 0, Number(remote?.streak?.totalActiveDays) || 0),
      recentDates: [...new Set([...(local?.streak?.recentDates || []), ...(remote?.streak?.recentDates || [])])].sort().slice(-30)
    },
    activity: [...(remote?.activity || []), ...(local?.activity || [])]
      .filter((item, index, items) => items.findIndex((candidate) => `${candidate.id}-${candidate.at}` === `${item.id}-${item.at}`) === index)
      .slice(0, 100)
  };
}
