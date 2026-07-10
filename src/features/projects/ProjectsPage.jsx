import { useEffect, useState } from "react";
import { FolderKanban, Send } from "lucide-react";
import { createSubmission, listSubmissions } from "../../apiClient.js";

const emptyForm = {
  projectId: "html-12-final-project",
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
  const [form, setForm] = useState(emptyForm);
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
      setForm(emptyForm);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{fr ? "Projets portfolio" : "Portfolio projects"}</p>
        <h1 className="page-heading">{fr ? "Construis et partage tes projets." : "Build and share your projects."}</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <form onSubmit={submit} className="surface">
            <div className="mb-5 flex items-center gap-3"><FolderKanban className="size-8 text-indigoPop" /><h2 className="font-display text-3xl font-bold">{fr ? "Nouvelle soumission" : "New submission"}</h2></div>
            <div className="grid gap-4">
              <Field label="Project ID" value={form.projectId} onChange={(projectId) => setForm({ ...form, projectId })} />
              <Field label={fr ? "Titre" : "Title"} value={form.title} onChange={(title) => setForm({ ...form, title })} required />
              <Field label="URL" value={form.url} onChange={(url) => setForm({ ...form, url })} />
              <Field label={fr ? "Dépôt Git" : "Git repository"} value={form.repositoryUrl} onChange={(repositoryUrl) => setForm({ ...form, repositoryUrl })} />
              <TextField label={fr ? "Description" : "Description"} value={form.description} onChange={(description) => setForm({ ...form, description })} />
              <TextField label={fr ? "Livrables, un par ligne" : "Deliverables, one per line"} value={form.deliverables} onChange={(deliverables) => setForm({ ...form, deliverables })} />
              <TextField label={fr ? "Auto-évaluation" : "Self-assessment"} value={form.selfAssessment} onChange={(selfAssessment) => setForm({ ...form, selfAssessment })} />
              <label className="grid gap-2 text-sm font-semibold text-slate-700">{fr ? "Visibilité portfolio" : "Portfolio visibility"}<select value={form.visibility} onChange={(event) => setForm({ ...form, visibility: event.target.value })} className="form-control"><option value="private">{fr ? "Privé" : "Private"}</option><option value="unlisted">{fr ? "Non listé" : "Unlisted"}</option><option value="public">Public</option></select></label>
              <button type="submit" className="primary-button"><Send className="size-5" />{status === "saving" ? (fr ? "Envoi..." : "Saving...") : (fr ? "Soumettre" : "Submit")}</button>
              {status === "error" && <p className="status-error rounded-xl p-3 text-sm font-semibold">{fr ? "API indisponible." : "API unavailable."}</p>}
              {status === "saved" && <p className="status-success rounded-xl p-3 text-sm font-semibold">{fr ? "Projet soumis." : "Project submitted."}</p>}
            </div>
          </form>
          <div className="surface">
            <h2 className="font-display text-3xl font-bold">{fr ? "Mes soumissions" : "My submissions"}</h2>
            <div className="mt-5 grid gap-3">
              {!submissions.length && <p className="empty-state">{fr ? "Aucun projet soumis." : "No submitted projects."}</p>}
              {submissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} locale={locale} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubmissionCard({ submission, locale }) {
  const fr = locale === "fr";
  return (
    <article className="muted-surface">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-2xl font-bold">{submission.title}</h3><div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">v{submission.version || 1}</span><span className="status-badge status-warning">{submission.status}</span></div></div>
      <p className="mt-2 text-sm font-bold text-indigoPop">{submission.projectId}</p>
      {submission.url && <ExternalLink href={submission.url} />}
      {submission.repositoryUrl && <ExternalLink href={submission.repositoryUrl} />}
      <p className="mt-2 font-bold text-ink/65">{submission.description}</p>
      {submission.selfAssessment && <p className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-600"><strong>{fr ? "Auto-évaluation :" : "Self-assessment:"}</strong> {submission.selfAssessment}</p>}
      {submission.feedback && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><strong>Feedback:</strong> {submission.feedback}</p>}
      {submission.reviewLog?.length > 0 && <details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-indigoPop">{fr ? "Journal des décisions" : "Decision log"} ({submission.reviewLog.length})</summary><ul className="mt-2 grid gap-2">{submission.reviewLog.map((entry) => <li key={`${entry.at}-${entry.status}`} className="rounded-lg bg-slate-100 p-3 text-xs text-slate-600">{entry.status} · {entry.score ?? "—"}/100 · {entry.feedback}</li>)}</ul></details>}
    </article>
  );
}

function Field({ label, value, onChange, required = false }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="form-control" /></label>;
}

function TextField({ label, value, onChange }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-700">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} className="form-control min-h-28 py-3" /></label>;
}

function ExternalLink({ href }) {
  return <a className="mt-2 block break-all text-sm font-bold text-indigoPop hover:underline" href={href} target="_blank" rel="noopener noreferrer">{href}</a>;
}
