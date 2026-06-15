import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Award,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FolderKanban,
  FileText,
  Map,
  PenTool,
  Settings,
  Send,
  Server,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  UserRound
} from "lucide-react";
import CurriculumSection from "./CurriculumSection.jsx";
import AuthNotice from "./components/AuthNotice.jsx";
import InteractiveLearning from "./InteractiveLearning.jsx";
import {
  createLessonDraft,
  createSubmission,
  deleteLessonDraft,
  exportAdminData,
  getAnalytics,
  getApiHealth,
  getCatalog,
  getCertificates,
  getProfile,
  getRoadmap,
  getStats,
  getStudyPlan,
  getSupabaseStatus,
  getUserId,
  getUserSettings,
  listAllSubmissions,
  listLessonDrafts,
  listSubmissions,
  reviewSubmission,
  saveUserSettings,
  updateLessonDraft
} from "./apiClient.js";
import { learningTracks } from "./learningContent.js";

export function LearnPage({ locale }) {
  return <InteractiveLearning locale={locale} />;
}

export function CatalogPage({ locale, Courses, copy }) {
  return (
    <>
      <Courses copy={copy.courses} />
      <CatalogStats locale={locale} />
      <CurriculumSection locale={locale} />
    </>
  );
}

export function DashboardPage({ locale }) {
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [supabaseStatus, setSupabaseStatus] = useState(null);
  const progress = readLocalProgress();
  const completed = Object.keys(progress.completed || {}).length;
  const total = learningTracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);

  useEffect(() => {
    getApiHealth().then(setHealth).catch(() => setHealth({ ok: false }));
    getStats().then(setStats).catch(() => setStats(null));
    getSupabaseStatus().then(setSupabaseStatus).catch(() => setSupabaseStatus(null));
  }, []);

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Dashboard apprenant" : "Learner dashboard"}</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{locale === "fr" ? "Progression, API et prochaines décisions." : "Progress, API, and next decisions."}</h1>
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
        <div className="mt-8 rounded-[30px] bg-white p-5 clay">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Activité récente" : "Recent activity"}</h2>
          <div className="mt-4 grid gap-3">
            {(progress.activity || []).length === 0 && (
              <p className="rounded-2xl bg-cloud p-4 font-extrabold text-ink/60 clay-soft">
                {locale === "fr" ? "Aucune activité validée pour le moment." : "No passed activity yet."}
              </p>
            )}
            {(progress.activity || []).map((item) => (
              <div className="flex items-center justify-between rounded-2xl bg-cloud p-4 font-extrabold clay-soft" key={`${item.id}-${item.at}`}>
                <span>{item.title?.[locale] || item.id}</span>
                <span className="rounded-xl bg-lemonPop px-3 py-1">{item.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfilePage({ locale }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => setProfile(null));
  }, []);

  const summary = profile?.summary || {};
  const attempts = profile?.attempts || [];
  const submissions = profile?.submissions || [];
  const certificates = profile?.certificates || [];

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <div className="rounded-[34px] bg-white p-6 clay">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              <div className="grid size-20 place-items-center rounded-[28px] bg-lemonPop clay-soft">
                <UserRound className="size-10 text-indigoPop" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Profil apprenant" : "Learner profile"}</p>
                <h1 className="font-display text-5xl font-bold">{profile?.displayName || "PulsaTeach Learner"}</h1>
                <p className="mt-2 font-extrabold text-ink/60">{profile?.userId || getUserId()}</p>
              </div>
            </div>
            <a href="#/learn" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orangePop px-5 py-4 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
              <Target className="size-5" />
              {locale === "fr" ? "Continuer le parcours" : "Continue learning"}
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <DashCard icon={Trophy} label="XP" value={summary.xp ?? 0} />
            <DashCard icon={BookOpenCheck} label={locale === "fr" ? "Leçons" : "Lessons"} value={summary.completedLessons ?? 0} />
            <DashCard icon={FolderKanban} label={locale === "fr" ? "Projets" : "Projects"} value={summary.submittedProjects ?? 0} />
            <DashCard icon={CheckCircle2} label={locale === "fr" ? "Approuvés" : "Approved"} value={summary.approvedProjects ?? 0} />
            <DashCard icon={Activity} label={locale === "fr" ? "Essais" : "Attempts"} value={summary.attempts ?? 0} />
            <DashCard icon={Award} label={locale === "fr" ? "Certifs" : "Certs"} value={certificates.filter((item) => item.eligible).length} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <section className="rounded-[30px] bg-white p-5 clay">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Derniers essais" : "Latest attempts"}</h2>
            <div className="mt-5 grid gap-3">
              {attempts.length === 0 && (
                <p className="rounded-2xl bg-cloud p-4 font-extrabold text-ink/60 clay-soft">
                  {locale === "fr" ? "Lance des tests dans le lab pour alimenter cette timeline." : "Run tests in the lab to fill this timeline."}
                </p>
              )}
              {attempts.map((attempt) => (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cloud p-4 font-extrabold clay-soft" key={attempt.id}>
                  <span>{attempt.lessonId}</span>
                  <span className={`rounded-xl px-3 py-1 ${attempt.success ? "bg-mintPop text-white" : "bg-lemonPop text-ink"}`}>
                    {attempt.passed}/{attempt.total}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-indigoPop p-5 text-white clay">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Portfolio et certificats" : "Portfolio and certificates"}</h2>
            <div className="mt-5 grid gap-3">
              {submissions.slice(0, 3).map((submission) => (
                <article className="rounded-2xl bg-white/12 p-4 font-bold" key={submission.id}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold">{submission.title}</h3>
                    <span className="rounded-xl bg-lemonPop px-3 py-1 text-xs font-extrabold text-ink">{submission.status}</span>
                  </div>
                  <p className="mt-2 text-white/75">{submission.projectId}</p>
                </article>
              ))}
              {certificates.map((certificate) => (
                <article className="rounded-2xl bg-white p-4 text-ink clay-soft" key={certificate.id}>
                  <h3 className="font-display text-xl font-bold">{certificate.title[locale]}</h3>
                  <p className="mt-2 font-extrabold text-ink/65">{certificate.progress.lessonPercent}% lessons · {certificate.progress.projectPercent}% projects</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export function SettingsPage({ locale }) {
  const [form, setForm] = useState({ displayName: "", goal: "frontend-foundations", weeklyMinutes: 120, locale });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    getUserSettings().then((user) => setForm({
      displayName: user.displayName || "",
      goal: user.goal || "frontend-foundations",
      weeklyMinutes: user.weeklyMinutes || 120,
      locale: user.locale || locale
    })).catch(() => {});
  }, [locale]);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      const saved = await saveUserSettings(form);
      setForm(saved);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Préférences" : "Settings"}</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{locale === "fr" ? "Personnalise ton espace PulsaTeach." : "Personalize your PulsaTeach space."}</h1>
        <form onSubmit={submit} className="mt-10 rounded-[30px] bg-white p-5 clay">
          <div className="mb-5 flex items-center gap-3">
            <Settings className="size-8 text-indigoPop" />
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Profil d'apprentissage" : "Learning profile"}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={locale === "fr" ? "Nom affiché" : "Display name"} value={form.displayName} onChange={(displayName) => setForm({ ...form, displayName })} />
            <SelectField label="Goal" value={form.goal} onChange={(goal) => setForm({ ...form, goal })} options={["frontend-foundations", "portfolio-ready", "job-ready"]} />
            <Field label={locale === "fr" ? "Minutes par semaine" : "Weekly minutes"} value={form.weeklyMinutes} onChange={(weeklyMinutes) => setForm({ ...form, weeklyMinutes })} />
            <SelectField label="Locale" value={form.locale} onChange={(nextLocale) => setForm({ ...form, locale: nextLocale })} options={["fr", "en"]} />
          </div>
          <button type="submit" className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orangePop px-5 py-4 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
            <Send className="size-5" />
            {status === "saving" ? (locale === "fr" ? "Sauvegarde..." : "Saving...") : (locale === "fr" ? "Sauvegarder" : "Save settings")}
          </button>
          {status === "saved" && <p className="mt-4 font-extrabold text-mintPop" role="status">{locale === "fr" ? "Préférences sauvegardées." : "Settings saved."}</p>}
          {status === "error" && <p className="mt-4 font-extrabold text-rosePop" role="alert">API unavailable.</p>}
        </form>
      </div>
    </section>
  );
}

export function PathPage({ locale }) {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    getStudyPlan().then(setPlan).catch(() => setPlan(null));
  }, []);

  const nextLessons = plan?.nextLessons || [];
  const weeklyPlan = plan?.weeklyPlan || [];

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Plan personnalisé" : "Personalized path"}</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">
          {locale === "fr" ? "PulsaTeach te dit quoi travailler ensuite." : "PulsaTeach tells you what to study next."}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <aside className="rounded-[30px] bg-indigoPop p-5 text-white clay">
            <Target className="size-10 text-lemonPop" />
            <h2 className="mt-4 font-display text-4xl font-bold">{plan?.percent ?? 0}%</h2>
            <p className="mt-2 font-extrabold text-white/75">
              {locale === "fr" ? `${plan?.completed ?? 0}/${plan?.total ?? 0} leçons validées` : `${plan?.completed ?? 0}/${plan?.total ?? 0} lessons passed`}
            </p>
            <div className="mt-5 h-5 rounded-full bg-white/18">
              <div className="h-full rounded-full bg-lemonPop" style={{ width: `${plan?.percent ?? 0}%` }} />
            </div>
            <div className="mt-6 grid gap-3">
              {(plan?.milestones || []).map((milestone) => (
                <div className="flex items-center gap-3 rounded-2xl bg-white/12 p-4 font-bold" key={milestone.id}>
                  <CheckCircle2 className={`size-5 ${milestone.done ? "text-mintPop" : "text-white/35"}`} />
                  {milestone.label[locale]}
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-[30px] bg-white p-5 clay">
            <div className="flex items-center gap-3">
              <BookOpenCheck className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Prochaines leçons" : "Next lessons"}</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {nextLessons.length === 0 && (
                <p className="rounded-2xl bg-cloud p-4 font-extrabold text-ink/60 clay-soft">
                  {locale === "fr" ? "Tout est validé pour le moment." : "Everything is passed for now."}
                </p>
              )}
              {nextLessons.map((lesson) => (
                <a href={lesson.href} className="block rounded-2xl bg-cloud p-4 transition-transform hover:-translate-y-0.5 clay-soft" key={lesson.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-xl bg-lemonPop px-3 py-1 text-xs font-extrabold">{lesson.trackLabel}</span>
                    <span className="text-xs font-extrabold text-ink/55">{lesson.durationMin} min · {lesson.xp} XP</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold">{lesson.title[locale]}</h3>
                  <p className="mt-2 font-extrabold text-indigoPop">{lesson.type}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[30px] bg-white p-5 clay">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-8 text-orangePop" />
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Semaine suggérée" : "Suggested week"}</h2>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-6">
            {weeklyPlan.map((item) => (
              <a href={item.href} className="rounded-2xl bg-cloud p-4 clay-soft transition-transform hover:-translate-y-0.5" key={`${item.day}-${item.lessonId}`}>
                <p className="font-display text-2xl font-bold">{locale === "fr" ? `Jour ${item.day}` : `Day ${item.day}`}</p>
                <p className="mt-3 font-extrabold text-ink/75">{item.title[locale]}</p>
                <p className="mt-2 text-sm font-extrabold text-indigoPop">{item.durationMin} min</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function AnalyticsPage({ locale }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAnalytics().then(setAnalytics).catch(() => setAnalytics(null));
  }, []);

  const maxFunnel = Math.max(...(analytics?.funnel || [{ value: 1 }]).map((item) => item.value), 1);

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">Analytics</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">
          {locale === "fr" ? "Regarde où la plateforme respire, bloque ou progresse." : "See where the platform breathes, blocks, or grows."}
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <section className="rounded-[30px] bg-white p-5 clay">
            <div className="flex items-center gap-3">
              <BarChart3 className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">Funnel</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {(analytics?.funnel || []).map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex justify-between font-extrabold">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-5 rounded-full bg-cloud clay-soft">
                    <div className="h-full rounded-full bg-mintPop" style={{ width: `${Math.max(6, (item.value / maxFunnel) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[30px] bg-indigoPop p-5 text-white clay">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Contenu" : "Content"}</h2>
            <div className="mt-5 grid gap-4">
              <DashCard icon={FileText} label="Drafts" value={analytics?.content?.drafts ?? "..."} />
              <DashCard icon={ClipboardCheck} label="Review" value={analytics?.content?.review ?? "..."} />
              <DashCard icon={CheckCircle2} label="Published" value={analytics?.content?.published ?? "..."} />
            </div>
          </section>
        </div>
        <section className="mt-8 rounded-[30px] bg-white p-5 clay">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Parcours" : "Tracks"}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {(analytics?.tracks || []).map((track) => (
              <article className="rounded-2xl bg-cloud p-4 clay-soft" key={track.id}>
                <p className="font-display text-3xl font-bold">{track.label}</p>
                <p className="mt-2 font-extrabold text-ink/65">{track.lessons} lessons</p>
                <p className="mt-1 font-extrabold text-indigoPop">{track.attempts} attempts · {track.completions} completions</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function ProjectsPage({ locale }) {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ projectId: "html-12-final-project", title: "", url: "", description: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    listSubmissions().then(setSubmissions).catch(() => setSubmissions([]));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      const created = await createSubmission(form);
      setSubmissions((items) => [created, ...items]);
      setForm({ projectId: "html-12-final-project", title: "", url: "", description: "" });
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Projets portfolio" : "Portfolio projects"}</p>
        <h1 className="mt-2 max-w-4xl font-display text-5xl font-bold">{locale === "fr" ? "Soumets tes livrables comme sur une vraie plateforme." : "Submit deliverables like a real learning platform."}</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <form onSubmit={submit} className="clay rounded-[30px] bg-white p-5">
            <div className="mb-5 flex items-center gap-3">
              <FolderKanban className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Nouvelle soumission" : "New submission"}</h2>
            </div>
            <div className="grid gap-4">
              <Field label="Project ID" value={form.projectId} onChange={(projectId) => setForm({ ...form, projectId })} />
              <Field label={locale === "fr" ? "Titre" : "Title"} value={form.title} onChange={(title) => setForm({ ...form, title })} required />
              <Field label="URL" value={form.url} onChange={(url) => setForm({ ...form, url })} />
              <label className="grid gap-2 font-extrabold">
                {locale === "fr" ? "Description" : "Description"}
                <textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="min-h-32 rounded-2xl border-[3px] border-ink bg-cloud p-4 outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
                />
              </label>
              <button type="submit" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orangePop px-5 py-4 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
                <Send className="size-5" />
                {status === "saving" ? (locale === "fr" ? "Envoi..." : "Saving...") : (locale === "fr" ? "Soumettre" : "Submit")}
              </button>
              {status === "error" && <p className="font-extrabold text-rosePop">{locale === "fr" ? "API indisponible." : "API unavailable."}</p>}
              {status === "saved" && <p className="font-extrabold text-mintPop">{locale === "fr" ? "Projet soumis." : "Project submitted."}</p>}
            </div>
          </form>

          <div className="clay rounded-[30px] bg-white p-5">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Mes soumissions" : "My submissions"}</h2>
            <div className="mt-5 grid gap-3">
              {submissions.length === 0 && (
                <p className="rounded-2xl bg-cloud p-4 font-extrabold text-ink/60 clay-soft">
                  {locale === "fr" ? "Aucun projet soumis." : "No submitted projects."}
                </p>
              )}
              {submissions.map((submission) => (
                <article className="rounded-2xl bg-cloud p-4 clay-soft" key={submission.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold">{submission.title}</h3>
                    <span className="rounded-xl bg-lemonPop px-3 py-1 text-xs font-extrabold">{submission.status}</span>
                  </div>
                  <p className="mt-2 font-extrabold text-indigoPop">{submission.projectId}</p>
                  {submission.url && <a className="mt-2 block font-extrabold text-orangePop" href={submission.url} target="_blank" rel="noreferrer">{submission.url}</a>}
                  <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CertificationPage({ locale }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCertificates().then(setData).catch(() => setData(null));
  }, []);

  const certificates = data?.certificates || [];

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Certifications" : "Certifications"}</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">
          {locale === "fr" ? "Un vrai objectif final, pas juste une suite de cartes." : "A real finish line, not just a stack of cards."}
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div className="grid gap-5">
            {certificates.length === 0 && (
              <p className="rounded-[24px] bg-white p-5 font-extrabold text-ink/60 clay">
                {locale === "fr" ? "L'API certification n'est pas disponible." : "The certification API is not available."}
              </p>
            )}
            {certificates.map((certificate) => (
              <article className="rounded-[30px] bg-white p-5 clay" key={certificate.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-lemonPop px-4 py-2 font-extrabold clay-soft">
                      <Award className="size-5" />
                      {certificate.eligible ? (locale === "fr" ? "Prêt à délivrer" : "Ready to issue") : (locale === "fr" ? "En progression" : "In progress")}
                    </div>
                    <h2 className="mt-4 font-display text-4xl font-bold">{certificate.title[locale]}</h2>
                    <p className="mt-3 max-w-2xl font-semibold leading-7 text-ink/70">{certificate.description[locale]}</p>
                  </div>
                  <ShieldCheck className="size-12 text-indigoPop" />
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ProgressMeter label={locale === "fr" ? "Leçons complétées" : "Lessons completed"} value={certificate.progress.lessonPercent} detail={`${certificate.progress.lessonsCompleted}/${certificate.progress.lessonsRequired}`} />
                  <ProgressMeter label={locale === "fr" ? "Projets approuvés" : "Approved projects"} value={certificate.progress.projectPercent} detail={`${certificate.progress.projectsApproved}/${certificate.progress.projectsRequired}`} />
                </div>
              </article>
            ))}
          </div>
          <aside className="rounded-[30px] bg-indigoPop p-5 text-white clay">
            <Star className="size-10 text-lemonPop" />
            <h2 className="mt-4 font-display text-3xl font-bold">{locale === "fr" ? "Règles V1" : "V1 rules"}</h2>
            <ul className="mt-5 grid gap-3">
              {[
                locale === "fr" ? "Terminer toutes les leçons HTML, CSS et JavaScript." : "Finish every HTML, CSS, and JavaScript lesson.",
                locale === "fr" ? "Soumettre les trois projets finaux." : "Submit the three final projects.",
                locale === "fr" ? "Obtenir une revue approuvée avec 70/100 minimum." : "Receive an approved review with at least 70/100.",
                locale === "fr" ? "La version suivante pourra générer un PDF partageable." : "The next version can generate a shareable PDF."
              ].map((item) => (
                <li className="flex gap-3 rounded-2xl bg-white/12 p-4 font-bold" key={item}>
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function AuthorPage({ locale }) {
  const [drafts, setDrafts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    trackId: "html",
    type: "html",
    difficulty: "starter",
    xp: 25,
    titleFr: "",
    titleEn: "",
    objectiveFr: "",
    objectiveEn: "",
    promptFr: "",
    promptEn: "",
    skills: "semantic html, accessibility"
  });

  useEffect(() => {
    listLessonDrafts().then(setDrafts).catch(() => setDrafts([]));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      const created = await createLessonDraft({
        trackId: form.trackId,
        type: form.type,
        difficulty: form.difficulty,
        xp: form.xp,
        title: { fr: form.titleFr, en: form.titleEn },
        objective: { fr: form.objectiveFr, en: form.objectiveEn },
        prompt: { fr: form.promptFr, en: form.promptEn },
        skills: form.skills.split(",").map((item) => item.trim()).filter(Boolean)
      });
      setDrafts((items) => [created, ...items]);
      setForm({ ...form, titleFr: "", titleEn: "", objectiveFr: "", objectiveEn: "", promptFr: "", promptEn: "" });
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  const changeStatus = async (draft, nextStatus) => {
    try {
      const updated = await updateLessonDraft(draft.id, { status: nextStatus });
      setDrafts((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    } catch {
      setStatus("error");
    }
  };

  const removeDraft = async (draft) => {
    try {
      await deleteLessonDraft(draft.id);
      setDrafts((items) => items.filter((item) => item.id !== draft.id));
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Auteur de cours" : "Course authoring"}</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">
          {locale === "fr" ? "Prépare les prochaines leçons sans casser le lab." : "Prepare the next lessons without breaking the lab."}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <form onSubmit={submit} className="rounded-[30px] bg-white p-5 clay">
            <div className="mb-5 flex items-center gap-3">
              <PenTool className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Nouveau draft" : "New draft"}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField label="Track" value={form.trackId} onChange={(trackId) => setForm({ ...form, trackId })} options={["html", "css", "javascript"]} />
              <SelectField label="Type" value={form.type} onChange={(type) => setForm({ ...form, type })} options={["html", "css", "js", "quiz", "project"]} />
              <SelectField label="Difficulty" value={form.difficulty} onChange={(difficulty) => setForm({ ...form, difficulty })} options={["starter", "core", "challenge"]} />
              <Field label="XP" value={form.xp} onChange={(xp) => setForm({ ...form, xp })} />
              <Field label="Title FR" value={form.titleFr} onChange={(titleFr) => setForm({ ...form, titleFr })} required />
              <Field label="Title EN" value={form.titleEn} onChange={(titleEn) => setForm({ ...form, titleEn })} required />
            </div>
            <div className="mt-4 grid gap-4">
              <TextAreaField label={locale === "fr" ? "Objectif FR" : "Objective FR"} value={form.objectiveFr} onChange={(objectiveFr) => setForm({ ...form, objectiveFr })} />
              <TextAreaField label={locale === "fr" ? "Objectif EN" : "Objective EN"} value={form.objectiveEn} onChange={(objectiveEn) => setForm({ ...form, objectiveEn })} />
              <TextAreaField label="Prompt FR" value={form.promptFr} onChange={(promptFr) => setForm({ ...form, promptFr })} />
              <TextAreaField label="Prompt EN" value={form.promptEn} onChange={(promptEn) => setForm({ ...form, promptEn })} />
              <Field label="Skills" value={form.skills} onChange={(skills) => setForm({ ...form, skills })} />
              <button type="submit" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orangePop px-5 py-4 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
                <Send className="size-5" />
                {status === "saving" ? (locale === "fr" ? "Création..." : "Creating...") : (locale === "fr" ? "Créer le draft" : "Create draft")}
              </button>
              {status === "saved" && <p className="font-extrabold text-mintPop" role="status">{locale === "fr" ? "Draft créé." : "Draft created."}</p>}
              {status === "error" && <p className="font-extrabold text-rosePop" role="alert">API unavailable.</p>}
            </div>
          </form>

          <section className="rounded-[30px] bg-white p-5 clay">
            <div className="flex items-center gap-3">
              <FileText className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Backlog contenu" : "Content backlog"}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {drafts.length === 0 && (
                <p className="rounded-2xl bg-cloud p-4 font-extrabold text-ink/60 clay-soft">
                  {locale === "fr" ? "Aucun draft pour le moment." : "No drafts yet."}
                </p>
              )}
              {drafts.map((draft) => (
                <article className="rounded-2xl bg-cloud p-4 clay-soft" key={draft.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{draft.title?.[locale] || draft.title?.en}</h3>
                      <p className="mt-1 font-extrabold text-indigoPop">{draft.trackId} · {draft.type} · {draft.xp} XP</p>
                    </div>
                    <span className="rounded-xl bg-lemonPop px-3 py-1 text-xs font-extrabold">{draft.status}</span>
                  </div>
                  <p className="mt-3 font-bold text-ink/65">{draft.objective?.[locale] || draft.objective?.en}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => changeStatus(draft, "review")} className="cursor-pointer rounded-xl bg-indigoPop px-3 py-2 text-sm font-extrabold text-white shadow-clayPressed">Review</button>
                    <button type="button" onClick={() => changeStatus(draft, "published")} className="cursor-pointer rounded-xl bg-mintPop px-3 py-2 text-sm font-extrabold text-white shadow-clayPressed">Publish</button>
                    <button type="button" onClick={() => changeStatus(draft, "draft")} className="cursor-pointer rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-ink shadow-clayPressed">Draft</button>
                    <button type="button" onClick={() => removeDraft(draft)} className="cursor-pointer rounded-xl bg-rosePop px-3 py-2 text-sm font-extrabold text-white shadow-clayPressed">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export function AdminPage({ locale }) {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    listAllSubmissions().then(setSubmissions).catch(() => setSubmissions([]));
  }, []);

  const review = async (submission, status) => {
    const score = status === "approved" ? 88 : 55;
    const feedback =
      status === "approved"
        ? "Strong structure, readable code, and responsive behavior validated."
        : "Rework accessibility, responsive spacing, and explain your JavaScript decisions.";
    try {
      const updated = await reviewSubmission(submission.id, {
        status,
        score,
        feedback,
        rubric: {
          accessibility: status === "approved" ? 90 : 50,
          responsiveness: status === "approved" ? 86 : 58,
          codeQuality: status === "approved" ? 88 : 56
        }
      });
      setSubmissions((items) => items.map((item) => (item.id === updated.id ? updated : item)));
      setMessage(locale === "fr" ? "Revue enregistrée." : "Review saved.");
    } catch {
      setMessage(locale === "fr" ? "Impossible d'enregistrer la revue." : "Could not save review.");
    }
  };

  const exportData = async () => {
    try {
      const data = await exportAdminData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pulsateach-export-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage(locale === "fr" ? "Export généré." : "Export generated.");
    } catch {
      setMessage(locale === "fr" ? "Export indisponible." : "Export unavailable.");
    }
  };

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Admin contenu" : "Content admin"}</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">
          {locale === "fr" ? "Un premier cockpit pour corriger les projets." : "A first cockpit for reviewing projects."}
        </h1>
        <p className="mt-4 max-w-2xl font-semibold leading-7 text-ink/70">
          {locale === "fr" ? "Cette page simule la revue pédagogique : approuver, demander des changements, stocker un score et un feedback." : "This page simulates educator review: approve, request changes, store a score, and save feedback."}
        </p>
        <button type="button" onClick={exportData} className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-indigoPop px-5 py-4 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
          <Database className="size-5" />
          {locale === "fr" ? "Exporter les données" : "Export data"}
        </button>
        <p className="mt-4 font-extrabold text-indigoPop" role="status" aria-live="polite">{message}</p>
        <div className="mt-8 grid gap-4">
          {submissions.length === 0 && (
            <p className="rounded-[24px] bg-white p-5 font-extrabold text-ink/60 clay">
              {locale === "fr" ? "Aucune soumission à corriger." : "No submissions to review."}
            </p>
          )}
          {submissions.map((submission) => (
            <article className="rounded-[30px] bg-white p-5 clay" key={submission.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold">{submission.title}</h2>
                  <p className="mt-1 font-extrabold text-indigoPop">{submission.projectId}</p>
                  <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
                  {submission.feedback && <p className="mt-3 rounded-2xl bg-cloud p-3 font-bold text-ink/70 clay-soft">{submission.feedback}</p>}
                </div>
                <span className="rounded-2xl bg-lemonPop px-4 py-2 font-extrabold clay-soft">{submission.status}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => review(submission, "approved")} className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-mintPop px-4 py-3 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
                  <CheckCircle2 className="size-5" />
                  {locale === "fr" ? "Approuver" : "Approve"}
                </button>
                <button type="button" onClick={() => review(submission, "changes_requested")} className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orangePop px-4 py-3 font-extrabold text-white shadow-clayPressed transition-transform hover:-translate-y-0.5">
                  <ClipboardCheck className="size-5" />
                  {locale === "fr" ? "Demander changements" : "Request changes"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RoadmapPage({ locale }) {
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    getRoadmap().then(setRoadmap).catch(() => setRoadmap(null));
  }, []);

  const fallback = {
    vision: {
      fr: "Roadmap indisponible côté API pour le moment.",
      en: "Roadmap API unavailable for now."
    },
    phases: []
  };
  const data = roadmap || fallback;

  return (
    <section className="px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Ultra roadmap" : "Ultra roadmap"}</p>
        <h1 className="mt-2 max-w-5xl font-display text-5xl font-bold">{data.vision[locale]}</h1>
        <div className="mt-10 grid gap-5">
          {data.phases.map((phase, index) => (
            <article className="clay rounded-[30px] bg-white p-5" key={phase.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-2xl bg-indigoPop px-4 py-2 text-sm font-extrabold text-white clay-soft">{phase.horizon}</span>
                  <h2 className="mt-4 font-display text-3xl font-bold">{index + 1}. {phase.title[locale]}</h2>
                </div>
                <Map className="size-10 text-orangePop" />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <RoadmapList title={locale === "fr" ? "Objectifs" : "Goals"} items={phase.goals} />
                <RoadmapList title={locale === "fr" ? "Livrables" : "Deliverables"} items={phase.deliverables.map((item) => item[locale])} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogStats({ locale }) {
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    getCatalog().then(setCatalog).catch(() => setCatalog(null));
  }, []);

  const tracks = catalog?.tracks || learningTracks;
  const lessons = tracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);

  return (
    <section className="px-5 pb-10 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-[30px] bg-white p-5 clay">
        <div className="grid gap-4 md:grid-cols-3">
          <DashCard icon={BookOpenCheck} label={locale === "fr" ? "Parcours" : "Tracks"} value={tracks.length} />
          <DashCard icon={Activity} label={locale === "fr" ? "Leçons" : "Lessons"} value={lessons} />
          <DashCard icon={Server} label="Source" value={catalog ? "API" : "local"} />
        </div>
      </div>
    </section>
  );
}

function DashCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] bg-cloud p-5 clay-soft">
      <Icon className="mb-4 size-7 text-indigoPop" />
      <p className="font-display text-3xl font-bold">{value}</p>
      <p className="font-extrabold text-ink/60">{label}</p>
    </div>
  );
}

function ProgressMeter({ label, value, detail }) {
  return (
    <div className="rounded-[24px] bg-cloud p-5 clay-soft">
      <div className="mb-3 flex items-center justify-between gap-4 font-extrabold">
        <span>{label}</span>
        <span>{detail}</span>
      </div>
      <div className="h-5 rounded-full bg-white clay-soft">
        <div className="h-full rounded-full bg-mintPop" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}%</p>
    </div>
  );
}

function Field({ label, value, onChange, required = false }) {
  return (
    <label className="grid gap-2 font-extrabold">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 rounded-2xl border-[3px] border-ink bg-cloud px-4 outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2 font-extrabold">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 rounded-2xl border-[3px] border-ink bg-cloud px-4 outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <label className="grid gap-2 font-extrabold">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-2xl border-[3px] border-ink bg-cloud p-4 outline-none focus-visible:ring-2 focus-visible:ring-orangePop"
      />
    </label>
  );
}

function RoadmapList({ title, items }) {
  return (
    <div className="rounded-[24px] bg-cloud p-5 clay-soft">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li className="font-extrabold text-ink/70" key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function readLocalProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-learning-progress")) || { xp: 0, completed: {}, activity: [] };
  } catch {
    return { xp: 0, completed: {}, activity: [] };
  }
}
