import { useEffect, useState } from "react";
import { Activity, Award, BookOpenCheck, ClipboardCheck, Database, FolderKanban, Server, Trophy } from "lucide-react";
import AuthNotice from "../../components/AuthNotice.jsx";
import DashCard from "../../components/DashCard.jsx";
import { getApiHealth, getStats, getSupabaseStatus, loadRemoteProgress } from "../../apiClient.js";
import { computeSkillProgress } from "../skills/skillIndex.js";
import { useLearningTracks } from "../../useLearningTracks.js";

export default function DashboardPage({ locale }) {
  const { tracks } = useLearningTracks();
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [supabaseStatus, setSupabaseStatus] = useState(null);
  const [progress, setProgress] = useState(readLocalProgress);
  const completed = Object.keys(progress.completed || {}).length;
  const total = tracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);
  const skills = computeSkillProgress(tracks, progress).slice(0, 8);

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

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Dashboard apprenant" : "Learner dashboard"}</p>
        <h1 className="page-heading">{locale === "fr" ? "Ta progression en un coup d'œil." : "Your progress at a glance."}</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          <DashCard icon={Trophy} label="XP" value={progress.xp || 0} />
          <DashCard icon={BookOpenCheck} label={locale === "fr" ? "Leçons" : "Lessons"} value={`${completed}/${total}`} />
          <DashCard icon={Server} label="API" value={health?.ok ? "online" : "offline"} />
          <DashCard icon={Database} label="Storage" value={supabaseStatus?.mode || health?.storage || "json"} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-4">
          <DashCard icon={Activity} label={locale === "fr" ? "Leçons API" : "API lessons"} value={stats?.lessons ?? "..."} />
          <DashCard icon={FolderKanban} label={locale === "fr" ? "Projets" : "Projects"} value={stats?.projects ?? "..."} />
          <DashCard icon={ClipboardCheck} label={locale === "fr" ? "Soumissions" : "Submissions"} value={stats?.submissions ?? "..."} />
          <DashCard icon={Award} label={locale === "fr" ? "Certificats" : "Certificates"} value={stats?.certificates ?? "..."} />
        </div>
        <section className="surface mt-8">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Compétences" : "Skills"}</h2>
          <p className="mt-2 text-sm text-slate-600">{locale === "fr" ? "Chaque niveau combine leçons validées, quiz et révisions récentes." : "Every level combines completed lessons, quizzes, and recent reviews."}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
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

function readLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-learning-progress")) || { xp: 0, completed: {}, activity: [] };
  } catch {
    return { xp: 0, completed: {}, activity: [] };
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
    activity: [...(remote?.activity || []), ...(local?.activity || [])]
      .filter((item, index, items) => items.findIndex((candidate) => `${candidate.id}-${candidate.at}` === `${item.id}-${item.at}`) === index)
      .slice(0, 100)
  };
}
