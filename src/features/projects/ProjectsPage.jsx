import { useEffect, useState } from "react";
import { CheckCircle2, FolderKanban, Send } from "lucide-react";
import { createSubmission, listSubmissions } from "../../apiClient.js";
import AuthNotice from "../../components/AuthNotice.jsx";
import { LearnerPageHero, MetricCard, StatusBadge } from "../../components/LearnerUI.jsx";

const emptyForm = {
  projectId: "html-09-final-project-pulsaconf",
  title: "",
  url: "",
  repositoryUrl: "",
  description: "",
  deliverables: "",
  selfAssessment: "",
  visibility: "private"
};

export default function ProjectsPage({ locale }) {
  const fr = locale === "fr";
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(() => ({ ...emptyForm, projectId: new URLSearchParams(window.location.search).get("projectId") || emptyForm.projectId }));
  const [loadStatus, setLoadStatus] = useState("loading");
  const [status, setStatus] = useState("idle");
  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  useEffect(() => {
    listSubmissions().then(setSubmissions).then(() => setLoadStatus("ready")).catch(() => setLoadStatus("error"));
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
      setForm(emptyForm);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <LearnerPageHero
          icon={FolderKanban}
          eyebrow={fr ? "Projets portfolio" : "Portfolio projects"}
          title={fr ? "Transforme tes acquis en preuves concrètes." : "Turn your learning into concrete proof."}
          description={fr ? "Publie une version, reçois une revue et améliore ton projet sans perdre son historique." : "Publish a version, get a review, and improve your project without losing its history."}
          status={loadStatus === "loading" ? (fr ? "Chargement" : "Loading") : loadStatus === "error" ? (fr ? "Connexion requise" : "Sign-in required") : (fr ? "Portfolio prêt" : "Portfolio ready")}
          action={{ href: "#nouvelle-soumission", label: fr ? "Soumettre un projet" : "Submit a project" }}
        >
          <div className="grid grid-cols-2 gap-3 sm:max-w-xl">
            <MetricCard icon={FolderKanban} label={fr ? "Versions soumises" : "Submitted versions"} value={submissions.length} />
            <MetricCard icon={CheckCircle2} label={fr ? "Projets approuvés" : "Approved projects"} value={submissions.filter((item) => item.status === "approved").length} />
          </div>
        </LearnerPageHero>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <form id="nouvelle-soumission" onSubmit={submit} className="surface scroll-mt-24 rounded-3xl">
            <div className="mb-5 flex items-center gap-3"><FolderKanban className="size-7 text-indigoPop" /><h2 className="font-display text-2xl font-black">{fr ? "Nouvelle soumission" : "New submission"}</h2></div>
            <div className="grid gap-4">
              <Field name="projectId" label="Project ID" value={form.projectId} onChange={updateForm} />
              <Field name="title" label={fr ? "Titre" : "Title"} value={form.title} onChange={updateForm} required />
              <Field name="url" type="url" label="URL" value={form.url} onChange={updateForm} />
              <Field name="repositoryUrl" type="url" label={fr ? "Dépôt Git" : "Git repository"} value={form.repositoryUrl} onChange={updateForm} required={!form.url} />
              <Field multiline name="description" label="Description" value={form.description} onChange={updateForm} />
              <Field multiline name="deliverables" label={fr ? "Livrables, un par ligne" : "Deliverables, one per line"} value={form.deliverables} onChange={updateForm} />
              <Field multiline name="selfAssessment" label={fr ? "Auto-évaluation" : "Self-assessment"} value={form.selfAssessment} onChange={updateForm} />
              <label className="grid gap-2 text-sm font-semibold text-slate-700">{fr ? "Visibilité portfolio" : "Portfolio visibility"}<select name="visibility" value={form.visibility} onChange={updateForm} className="form-control"><option value="private">{fr ? "Privé" : "Private"}</option><option value="unlisted">{fr ? "Non listé" : "Unlisted"}</option><option value="public">Public</option></select></label>
              <button type="submit" disabled={loadStatus === "loading" || status === "saving"} className="primary-button disabled:cursor-wait disabled:opacity-60"><Send className="size-5" />{status === "saving" ? (fr ? "Envoi..." : "Saving...") : (fr ? "Soumettre" : "Submit")}</button>
              {status === "error" && <p className="status-error rounded-xl p-3 text-sm font-semibold" role="alert">{fr ? "La soumission a échoué. Vérifie ta connexion et réessaie." : "Submission failed. Check your connection and try again."}</p>}
              {status === "saved" && <p className="status-success rounded-xl p-3 text-sm font-semibold" role="status">{fr ? "Projet soumis." : "Project submitted."}</p>}
            </div>
          </form>
          <section className="surface rounded-3xl">
            <h2 className="font-display text-2xl font-black">{fr ? "Mes soumissions" : "My submissions"}</h2>
            <div className="mt-5 grid gap-3">
              {loadStatus === "loading" && <p className="empty-state" role="status">{fr ? "Chargement des soumissions..." : "Loading submissions..."}</p>}
              {loadStatus === "error" && <p className="empty-state">{fr ? "Connecte-toi pour retrouver tes soumissions." : "Sign in to view your submissions."}</p>}
              {loadStatus === "ready" && !submissions.length && <p className="empty-state">{fr ? "Aucun projet soumis pour le moment." : "No submitted projects yet."}</p>}
              {submissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} locale={locale} />)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function SubmissionCard({ submission, locale }) {
  const fr = locale === "fr";
  return (
    <article className="muted-surface">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-2xl font-bold">{submission.title}</h3><div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">v{submission.version || 1}</span><StatusBadge status={submission.status} locale={locale} /></div></div>
      <p className="mt-2 text-sm font-bold text-indigoPop">{submission.projectId}</p>
      {submission.url && <ExternalLink href={submission.url} />}
      {submission.repositoryUrl && <ExternalLink href={submission.repositoryUrl} />}
      <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
      {submission.selfAssessment && <p className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-600"><strong>{fr ? "Auto-évaluation :" : "Self-assessment:"}</strong> {submission.selfAssessment}</p>}
      {submission.feedback && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><strong>Feedback:</strong> {submission.feedback}</p>}
      {submission.status === "approved" && <a href="/certification" className="secondary-button mt-3">Certification</a>}
      {submission.reviewLog?.length > 0 && <details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-indigoPop">{fr ? "Journal des décisions" : "Decision log"} ({submission.reviewLog.length})</summary><ul className="mt-2 grid gap-2">{submission.reviewLog.map((entry) => <li key={`${entry.at}-${entry.status}`} className="rounded-lg bg-slate-100 p-3 text-xs text-slate-600">{entry.status} · {entry.score ?? "—"}/100 · {entry.feedback}</li>)}</ul></details>}
    </article>
  );
}

function Field({ name, label, value, onChange, required = false, multiline = false, type = "text" }) {
  const Component = multiline ? "textarea" : "input";
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<Component name={name} type={type} required={required} value={value} onChange={onChange} className={`form-control ${multiline ? "min-h-28 py-3" : ""}`} /></label>;
}

function ExternalLink({ href }) {
  return <a className="mt-2 block break-all text-sm font-bold text-indigoPop hover:underline" href={href} target="_blank" rel="noopener noreferrer">{href}</a>;
}
