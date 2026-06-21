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
import AuthNotice from "./components/AuthNotice.jsx";
import DashCard from "./components/DashCard.jsx";
import AccountSettings from "./AccountSettings.jsx";
import InteractiveLearning from "./InteractiveLearning.jsx";
import {
  createLessonDraft,
  createSubmission,
  deleteLessonDraft,
  exportAdminData,
  getAnalytics,
  getCertificates,
  getProfile,
  getRoadmap,
  getStudyPlan,
  getUserId,
  getUserSettings,
  issueCertificate,
  listAdminUsers,
  listAllSubmissions,
  listLessonDrafts,
  listSubmissions,
  reviewSubmission,
  saveUserSettings,
  updateUserRoles,
  updateLessonDraft
} from "./apiClient.js";
import { useLearningTracks } from "./useLearningTracks.js";
import { currentPathSegments } from "./navigation.js";

export function LearnPage({ locale }) {
  const { tracks, loadTrack } = useLearningTracks();

  useEffect(() => {
    const [route, trackId] = currentPathSegments();
    if (route !== "learn") return;
    if (trackId) loadTrack(trackId).catch(() => {});
  }, [loadTrack]);

  return <InteractiveLearning locale={locale} tracks={tracks} onRequireTrack={loadTrack} />;
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
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <div className="surface p-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              {profile?.user?.avatarUrl
                ? <img src={profile.user.avatarUrl} alt="" className="size-16 rounded-2xl border border-slate-200 object-cover" />
                : <div className="grid size-16 place-items-center rounded-2xl bg-indigo-50"><UserRound className="size-10 text-indigoPop" /></div>}
              <div>
                <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Profil apprenant" : "Learner profile"}</p>
                <h1 className="font-display text-3xl font-bold sm:text-4xl">{profile?.displayName || "PulsaTeach Learner"}</h1>
                <p className="mt-2 font-semibold text-slate-500">{profile?.userId || getUserId()}</p>
                {profile?.user?.bio && <p className="mt-3 max-w-2xl leading-6 text-slate-600">{profile.user.bio}</p>}
              </div>
            </div>
            <a href="/learn" className="primary-button">
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
          <section className="surface">
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

          <section className="rounded-2xl border border-indigo-700 bg-indigo-700 p-5 text-white shadow-sm">
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

function LegacySettingsPage({ locale }) {
  const [form, setForm] = useState({ displayName: "", goal: "frontend-foundations", weeklyMinutes: 120, locale, bio: "", avatarUrl: "", onboardingCompleted: false });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    getUserSettings().then((user) => setForm({
      displayName: user.displayName || "",
      goal: user.goal || "frontend-foundations",
      weeklyMinutes: user.weeklyMinutes || 120,
      locale: user.locale || locale,
      bio: user.bio || "",
      avatarUrl: user.avatarUrl || "",
      onboardingCompleted: Boolean(user.onboardingCompleted)
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
    <section className="app-page">
      <div className="mx-auto max-w-4xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Préférences" : "Settings"}</p>
        <h1 className="page-heading">{locale === "fr" ? "Personnalise ton apprentissage." : "Personalize your learning."}</h1>
        <form onSubmit={submit} className="surface mt-8">
          <div className="mb-5 flex items-center gap-3">
            <Settings className="size-8 text-indigoPop" />
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Profil d'apprentissage" : "Learning profile"}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={locale === "fr" ? "Nom affiché" : "Display name"} value={form.displayName} onChange={(displayName) => setForm({ ...form, displayName })} />
            <SelectField label="Goal" value={form.goal} onChange={(goal) => setForm({ ...form, goal })} options={["frontend-foundations", "portfolio-ready", "job-ready"]} />
            <Field label={locale === "fr" ? "Minutes par semaine" : "Weekly minutes"} value={form.weeklyMinutes} onChange={(weeklyMinutes) => setForm({ ...form, weeklyMinutes })} />
            <SelectField label="Locale" value={form.locale} onChange={(nextLocale) => setForm({ ...form, locale: nextLocale })} options={["fr", "en"]} />
            <div className="md:col-span-2">
              <TextAreaField label={locale === "fr" ? "Présentation" : "Bio"} value={form.bio} onChange={(bio) => setForm({ ...form, bio })} />
            </div>
          </div>
          <button type="submit" className="primary-button mt-5">
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

export function SettingsPage({ locale }) {
  return <AccountSettings locale={locale} />;
}

export function PathPage({ locale }) {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    getStudyPlan().then(setPlan).catch(() => setPlan(null));
  }, []);

  const nextLessons = plan?.nextLessons || [];
  const weeklyPlan = plan?.weeklyPlan || [];

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Plan personnalisé" : "Personalized path"}</p>
        <h1 className="page-heading">
          {locale === "fr" ? "PulsaTeach te dit quoi travailler ensuite." : "PulsaTeach tells you what to study next."}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <aside className="rounded-2xl border border-indigo-700 bg-indigo-700 p-5 text-white shadow-sm">
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

          <section className="surface">
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

        <section className="surface mt-8">
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
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">Analytics</p>
        <h1 className="page-heading">
          {locale === "fr" ? "Regarde où la plateforme respire, bloque ou progresse." : "See where the platform breathes, blocks, or grows."}
        </h1>
        {analytics?.privacy && <p className="mt-4 max-w-3xl rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-semibold text-indigo-900">{locale === "fr" ? `Données agrégées, identifiants masqués et cohortes inférieures à ${analytics.privacy.minimumCohort} non affichées.` : `Aggregated data, hidden identifiers, and cohorts below ${analytics.privacy.minimumCohort} suppressed.`}</p>}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <section className="surface">
            <div className="flex items-center gap-3">
              <BarChart3 className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">Funnel</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {(analytics?.funnel || []).map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex justify-between font-extrabold">
                    <span>{item.label}</span>
                    <span>{item.suppressed ? `<${analytics.privacy.minimumCohort}` : item.value}</span>
                  </div>
                  <div className="h-5 rounded-full bg-cloud clay-soft">
                    <div className="h-full rounded-full bg-mintPop" style={{ width: `${item.suppressed ? 0 : Math.max(6, (item.value / maxFunnel) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-indigo-700 bg-indigo-700 p-5 text-white shadow-sm">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Contenu" : "Content"}</h2>
            <div className="mt-5 grid gap-4">
              <DashCard icon={FileText} label="Drafts" value={analytics?.content?.drafts ?? "..."} />
              <DashCard icon={ClipboardCheck} label="Review" value={analytics?.content?.review ?? "..."} />
              <DashCard icon={CheckCircle2} label="Published" value={analytics?.content?.published ?? "..."} />
            </div>
          </section>
        </div>
        <section className="surface mt-8">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Parcours" : "Tracks"}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {(analytics?.tracks || []).map((track) => (
              <article className="rounded-2xl bg-cloud p-4 clay-soft" key={track.id}>
                <p className="font-display text-3xl font-bold">{track.label}</p>
                <p className="mt-2 font-extrabold text-ink/65">{track.lessons} lessons</p>
                <p className="mt-1 font-extrabold text-indigoPop">{track.attempts === null ? "<3" : track.attempts} attempts · {track.completions === null ? "<3" : track.completions} completions</p>
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
  const [form, setForm] = useState({ projectId: "html-12-final-project", title: "", url: "", repositoryUrl: "", description: "", deliverables: "", selfAssessment: "", visibility: "private" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    listSubmissions().then(setSubmissions).catch(() => setSubmissions([]));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      const created = await createSubmission({
        ...form,
        deliverables: form.deliverables.split("\n").map((item) => item.trim()).filter(Boolean)
      });
      setSubmissions((items) => [created, ...items]);
      setForm({ projectId: "html-12-final-project", title: "", url: "", repositoryUrl: "", description: "", deliverables: "", selfAssessment: "", visibility: "private" });
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Projets portfolio" : "Portfolio projects"}</p>
        <h1 className="page-heading">{locale === "fr" ? "Construis et partage tes projets." : "Build and share your projects."}</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <form onSubmit={submit} className="surface">
            <div className="mb-5 flex items-center gap-3">
              <FolderKanban className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Nouvelle soumission" : "New submission"}</h2>
            </div>
            <div className="grid gap-4">
              <Field label="Project ID" value={form.projectId} onChange={(projectId) => setForm({ ...form, projectId })} />
              <Field label={locale === "fr" ? "Titre" : "Title"} value={form.title} onChange={(title) => setForm({ ...form, title })} required />
              <Field label="URL" value={form.url} onChange={(url) => setForm({ ...form, url })} />
              <Field label={locale === "fr" ? "Dépôt Git" : "Git repository"} value={form.repositoryUrl} onChange={(repositoryUrl) => setForm({ ...form, repositoryUrl })} />
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                {locale === "fr" ? "Description" : "Description"}
                <textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="form-control min-h-32 py-3"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                {locale === "fr" ? "Livrables, un par ligne" : "Deliverables, one per line"}
                <textarea value={form.deliverables} onChange={(event) => setForm({ ...form, deliverables: event.target.value })} className="form-control min-h-24 py-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                {locale === "fr" ? "Auto-évaluation" : "Self-assessment"}
                <textarea value={form.selfAssessment} onChange={(event) => setForm({ ...form, selfAssessment: event.target.value })} className="form-control min-h-28 py-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                {locale === "fr" ? "Visibilité portfolio" : "Portfolio visibility"}
                <select value={form.visibility} onChange={(event) => setForm({ ...form, visibility: event.target.value })} className="form-control">
                  <option value="private">{locale === "fr" ? "Privé" : "Private"}</option>
                  <option value="unlisted">{locale === "fr" ? "Non listé" : "Unlisted"}</option>
                  <option value="public">{locale === "fr" ? "Public" : "Public"}</option>
                </select>
              </label>
              <button type="submit" className="primary-button">
                <Send className="size-5" />
                {status === "saving" ? (locale === "fr" ? "Envoi..." : "Saving...") : (locale === "fr" ? "Soumettre" : "Submit")}
              </button>
              {status === "error" && <p className="status-error rounded-xl p-3 text-sm font-semibold">{locale === "fr" ? "API indisponible." : "API unavailable."}</p>}
              {status === "saved" && <p className="status-success rounded-xl p-3 text-sm font-semibold">{locale === "fr" ? "Projet soumis." : "Project submitted."}</p>}
            </div>
          </form>

          <div className="surface">
            <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Mes soumissions" : "My submissions"}</h2>
            <div className="mt-5 grid gap-3">
              {submissions.length === 0 && (
                <p className="empty-state">
                  {locale === "fr" ? "Aucun projet soumis." : "No submitted projects."}
                </p>
              )}
              {submissions.map((submission) => (
                <article className="muted-surface" key={submission.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold">{submission.title}</h3>
                    <div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">v{submission.version || 1}</span><span className="status-badge status-warning">{submission.status}</span></div>
                  </div>
                  <p className="mt-2 text-sm font-bold text-indigoPop">{submission.projectId}</p>
                  {submission.url && <a className="mt-2 block break-all text-sm font-bold text-indigoPop hover:underline" href={submission.url} target="_blank" rel="noreferrer">{submission.url}</a>}
                  <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
                  {submission.repositoryUrl && <a className="mt-2 block break-all text-sm font-bold text-indigoPop hover:underline" href={submission.repositoryUrl} target="_blank" rel="noreferrer">{submission.repositoryUrl}</a>}
                  {submission.selfAssessment && <p className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-600"><strong>{locale === "fr" ? "Auto-évaluation :" : "Self-assessment:"}</strong> {submission.selfAssessment}</p>}
                  {submission.feedback && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><strong>Feedback:</strong> {submission.feedback}</p>}
                  {submission.reviewLog?.length > 0 && <details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-indigoPop">{locale === "fr" ? "Journal des décisions" : "Decision log"} ({submission.reviewLog.length})</summary><ul className="mt-2 grid gap-2">{submission.reviewLog.map((entry) => <li key={`${entry.at}-${entry.status}`} className="rounded-lg bg-slate-100 p-3 text-xs text-slate-600">{entry.status} · {entry.score ?? "—"}/100 · {entry.feedback}</li>)}</ul></details>}
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
  const [status, setStatus] = useState("");

  useEffect(() => {
    getCertificates().then(setData).catch(() => setData(null));
  }, []);

  const certificates = data?.certificates || [];

  const issue = async (certificateId) => {
    setStatus("issuing");
    try {
      const issued = await issueCertificate(certificateId);
      setData((current) => ({
        ...current,
        certificates: current.certificates.map((certificate) => certificate.id === certificateId ? { ...certificate, issued } : certificate)
      }));
      setStatus("issued");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Certifications" : "Certifications"}</p>
        <h1 className="page-heading">
          {locale === "fr" ? "Un vrai objectif final, pas juste une suite de cartes." : "A real finish line, not just a stack of cards."}
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div className="grid gap-5">
            {certificates.length === 0 && (
              <p className="empty-state">
                {locale === "fr" ? "L'API certification n'est pas disponible." : "The certification API is not available."}
              </p>
            )}
            {certificates.map((certificate) => (
              <article className="surface" key={certificate.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${certificate.eligible ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>
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
                {certificate.issued ? (
                  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="font-bold text-green-800">{locale === "fr" ? "Certificat délivré et vérifiable publiquement." : "Certificate issued and publicly verifiable."}</p>
                    <a href={`/verify/${certificate.issued.verificationCode}`} className="secondary-button mt-3">{locale === "fr" ? "Ouvrir la page publique" : "Open public page"}</a>
                  </div>
                ) : certificate.eligible ? (
                  <button type="button" onClick={() => issue(certificate.id)} disabled={status === "issuing"} className="primary-button mt-6 disabled:opacity-60">
                    <Award className="size-5" />{locale === "fr" ? "Délivrer mon certificat" : "Issue my certificate"}
                  </button>
                ) : null}
              </article>
            ))}
            {status && !["issuing", "issued"].includes(status) && <p className="status-error rounded-xl p-3" role="alert">{status}</p>}
          </div>
          <aside className="rounded-2xl border border-indigo-700 bg-indigo-700 p-5 text-white shadow-sm">
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
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Auteur de cours" : "Course authoring"}</p>
        <h1 className="page-heading">
          {locale === "fr" ? "Prépare les prochaines leçons sans casser le lab." : "Prepare the next lessons without breaking the lab."}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <form onSubmit={submit} className="surface">
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
              <button type="submit" className="primary-button">
                <Send className="size-5" />
                {status === "saving" ? (locale === "fr" ? "Création..." : "Creating...") : (locale === "fr" ? "Créer le draft" : "Create draft")}
              </button>
              {status === "saved" && <p className="status-success rounded-xl p-3 text-sm font-semibold" role="status">{locale === "fr" ? "Draft créé." : "Draft created."}</p>}
              {status === "error" && <p className="status-error rounded-xl p-3 text-sm font-semibold" role="alert">API unavailable.</p>}
            </div>
          </form>

          <section className="surface">
            <div className="flex items-center gap-3">
              <FileText className="size-8 text-indigoPop" />
              <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Backlog contenu" : "Content backlog"}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {drafts.length === 0 && (
                <p className="empty-state">
                  {locale === "fr" ? "Aucun draft pour le moment." : "No drafts yet."}
                </p>
              )}
              {drafts.map((draft) => (
                <article className="muted-surface" key={draft.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{draft.title?.[locale] || draft.title?.en}</h3>
                      <p className="mt-1 text-sm font-bold text-indigoPop">{draft.trackId} · {draft.type} · {draft.xp} XP</p>
                    </div>
                    <span className="status-badge status-warning">{draft.status}</span>
                  </div>
                  <p className="mt-3 font-bold text-ink/65">{draft.objective?.[locale] || draft.objective?.en}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => changeStatus(draft, "review")} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-bold text-white hover:bg-indigo-700">Review</button>
                    <button type="button" onClick={() => changeStatus(draft, "published")} className="rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white hover:bg-green-700">Publish</button>
                    <button type="button" onClick={() => changeStatus(draft, "draft")} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-ink hover:bg-slate-50">Draft</button>
                    <button type="button" onClick={() => removeDraft(draft)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:bg-red-700">Delete</button>
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
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    listAllSubmissions().then(setSubmissions).catch(() => setSubmissions([]));
    listAdminUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  const toggleRole = async (user, role) => {
    const roles = user.roles.includes(role) ? user.roles.filter((item) => item !== role) : [...user.roles, role];
    try {
      const updated = await updateUserRoles(user.id, roles);
      setUsers((items) => items.map((item) => item.id === user.id ? { ...item, roles: updated.roles } : item));
      setMessage(locale === "fr" ? "Rôles mis à jour." : "Roles updated.");
    } catch (error) {
      setMessage(error.message);
    }
  };

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
        expectedVersion: submission.version,
        rubric: {
          accessibility: status === "approved" ? 90 : 50,
          responsiveness: status === "approved" ? 86 : 58,
          codeQuality: status === "approved" ? 88 : 56
        },
        contextualComments: {
          accessibility: status === "approved" ? "Keyboard and semantics validated." : "Document focus order and fix labels.",
          responsiveness: status === "approved" ? "Mobile and desktop layouts validated." : "Correct narrow viewport overflow.",
          codeQuality: status === "approved" ? "Readable structure and naming." : "Explain architecture choices."
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
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Admin contenu" : "Content admin"}</p>
        <h1 className="page-heading">
          {locale === "fr" ? "Un premier cockpit pour corriger les projets." : "A first cockpit for reviewing projects."}
        </h1>
        <p className="mt-4 max-w-2xl font-semibold leading-7 text-ink/70">
          {locale === "fr" ? "Cette page simule la revue pédagogique : approuver, demander des changements, stocker un score et un feedback." : "This page simulates educator review: approve, request changes, store a score, and save feedback."}
        </p>
        <button type="button" onClick={exportData} className="primary-button mt-5">
          <Database className="size-5" />
          {locale === "fr" ? "Exporter les données" : "Export data"}
        </button>
        {message && <p className="status-success mt-4 rounded-xl p-3 text-sm font-semibold" role="status" aria-live="polite">{message}</p>}
        <section className="surface mt-8">
          <h2 className="font-display text-3xl font-bold">{locale === "fr" ? "Rôles de l'équipe" : "Team roles"}</h2>
          <p className="mt-2 text-slate-600">{locale === "fr" ? "Les rôles sont enregistrés dans Supabase Auth et contrôlent réellement les routes serveur." : "Roles are stored in Supabase Auth and enforce server routes."}</p>
          <div className="mt-5 grid gap-3">
            {users.length === 0 && <p className="empty-state">{locale === "fr" ? "Aucun compte administrable ou accès insuffisant." : "No manageable accounts or insufficient access."}</p>}
            {users.map((user) => (
              <article className="muted-surface flex flex-col justify-between gap-4 md:flex-row md:items-center" key={user.id}>
                <div className="min-w-0"><p className="truncate font-bold">{user.email}</p><p className="mt-1 text-xs text-slate-500">{user.id}</p></div>
                <div className="flex flex-wrap gap-2">
                  {["admin", "author", "reviewer"].map((role) => (
                    <button key={role} type="button" onClick={() => toggleRole(user, role)} className={`rounded-lg border px-3 py-2 text-sm font-bold ${user.roles.includes(role) ? "border-indigoPop bg-indigoPop text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                      {role}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-8 grid gap-4">
          {submissions.length === 0 && (
            <p className="empty-state">
              {locale === "fr" ? "Aucune soumission à corriger." : "No submissions to review."}
            </p>
          )}
          {submissions.map((submission) => (
            <article className="surface" key={submission.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold">{submission.title}</h2>
                  <p className="mt-1 text-sm font-bold text-indigoPop">{submission.projectId}</p>
                  <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
                  {submission.feedback && <p className="mt-3 rounded-2xl bg-cloud p-3 font-bold text-ink/70 clay-soft">{submission.feedback}</p>}
                  <p className="mt-2 text-xs font-bold text-slate-500">v{submission.version || 1} · {submission.reviewLog?.length || 0} {locale === "fr" ? "décisions" : "decisions"}</p>
                </div>
                <span className="status-badge status-warning">{submission.status}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={() => review(submission, "in_review")} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">
                  <ClipboardCheck className="size-5" />
                  {locale === "fr" ? "Prendre en review" : "Start review"}
                </button>
                <button type="button" onClick={() => review(submission, "approved")} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700">
                  <CheckCircle2 className="size-5" />
                  {locale === "fr" ? "Approuver" : "Approve"}
                </button>
                <button type="button" onClick={() => review(submission, "changes_requested")} className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-sm font-bold text-white hover:bg-amber-700">
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
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{locale === "fr" ? "Ultra roadmap" : "Ultra roadmap"}</p>
        <h1 className="page-heading">{data.vision[locale]}</h1>
        <div className="mt-10 grid gap-5">
          {data.phases.map((phase, index) => (
            <article className="surface" key={phase.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="status-badge bg-indigo-50 text-indigoPop">{phase.horizon}</span>
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

function ProgressMeter({ label, value, detail }) {
  return (
    <div className="muted-surface">
      <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold">
        <span>{label}</span>
        <span>{detail}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-indigoPop" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}%</p>
    </div>
  );
}

function Field({ label, value, onChange, required = false }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="form-control"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="form-control"
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
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="form-control min-h-28 py-3"
      />
    </label>
  );
}

function RoadmapList({ title, items }) {
  return (
    <div className="muted-surface">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li className="text-sm font-medium text-slate-600" key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
