import { useEffect, useState } from "react";
import { Award, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { getCertificates, issueCertificate } from "../../apiClient.js";

export default function CertificationPage({ locale }) {
  const fr = locale === "fr";
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const certificates = data?.certificates || [];

  useEffect(() => {
    getCertificates().then(setData).catch(() => setData(null));
  }, []);

  const issue = async (certificateId) => {
    setStatus("issuing");
    try {
      const issued = await issueCertificate(certificateId);
      setData((current) => ({ ...current, certificates: current.certificates.map((certificate) => certificate.id === certificateId ? { ...certificate, issued } : certificate) }));
      setStatus("issued");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">{fr ? "Certifications" : "Certifications"}</p>
        <h1 className="page-heading">{fr ? "Un vrai objectif final, pas juste une suite de cartes." : "A real finish line, not just a stack of cards."}</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div className="grid gap-5">
            {!certificates.length && <p className="empty-state">{fr ? "L'API certification n'est pas disponible." : "The certification API is not available."}</p>}
            {certificates.map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} locale={locale} status={status} onIssue={() => issue(certificate.id)} />)}
            {status && !["issuing", "issued"].includes(status) && <p className="status-error rounded-xl p-3" role="alert">{status}</p>}
          </div>
          <aside className="rounded-2xl border border-indigo-700 bg-indigo-700 p-5 text-white shadow-sm">
            <Star className="size-10 text-lemonPop" />
            <h2 className="mt-4 font-display text-3xl font-bold">{fr ? "Règles de délivrance" : "Issuance rules"}</h2>
            <ul className="mt-5 grid gap-3">{[
              fr ? "Terminer toutes les leçons et examens requis." : "Finish every required lesson and exam.",
              fr ? "Faire approuver les projets avec le score minimal." : "Get projects approved with the minimum score.",
              fr ? "Conserver versions, compétences et preuves dans le certificat." : "Store versions, skills, and evidence in the certificate."
            ].map((item) => <li className="flex gap-3 rounded-2xl bg-white/12 p-4 font-bold" key={item}><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />{item}</li>)}</ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ certificate, locale, status, onIssue }) {
  const fr = locale === "fr";
  return (
    <article className="surface">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${certificate.eligible ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}><Award className="size-5" />{certificate.eligible ? (fr ? "Prêt à délivrer" : "Ready to issue") : (fr ? "En progression" : "In progress")}</div><h2 className="mt-4 font-display text-4xl font-bold">{certificate.title[locale]}</h2><p className="mt-3 max-w-2xl font-semibold leading-7 text-ink/70">{certificate.description[locale]}</p></div>
        <ShieldCheck className="size-12 text-indigoPop" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2"><ProgressMeter label={fr ? "Leçons complétées" : "Lessons completed"} value={certificate.progress.lessonPercent} detail={`${certificate.progress.lessonsCompleted}/${certificate.progress.lessonsRequired}`} /><ProgressMeter label={fr ? "Projets approuvés" : "Approved projects"} value={certificate.progress.projectPercent} detail={`${certificate.progress.projectsApproved}/${certificate.progress.projectsRequired}`} /></div>
      {certificate.issued ? <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4"><p className="font-bold text-green-800">{fr ? "Certificat délivré et vérifiable publiquement." : "Certificate issued and publicly verifiable."}</p><a href={`/verify/${certificate.issued.verificationCode}`} className="secondary-button mt-3">{fr ? "Ouvrir la page publique" : "Open public page"}</a></div> : certificate.eligible ? <button type="button" onClick={onIssue} disabled={status === "issuing"} className="primary-button mt-6 disabled:opacity-60"><Award className="size-5" />{fr ? "Délivrer mon certificat" : "Issue my certificate"}</button> : null}
    </article>
  );
}

function ProgressMeter({ label, value, detail }) {
  return <div className="rounded-2xl bg-cloud p-4 clay-soft"><div className="flex items-center justify-between gap-3"><p className="font-bold">{label}</p><span className="font-black text-indigoPop">{value}%</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-mintPop" style={{ width: `${value}%` }} /></div><p className="mt-2 text-sm font-bold text-slate-700">{detail}</p></div>;
}
