import { useEffect, useState } from "react";
import { Award, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { getCertificates, issueCertificate } from "../../apiClient.js";
import AuthNotice from "../../components/AuthNotice.jsx";
import { LearnerPageHero, MetricCard, ProgressMeter } from "../../components/LearnerUI.jsx";

export default function CertificationPage({ locale }) {
  const fr = locale === "fr";
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [issuingId, setIssuingId] = useState("");
  const certificates = data?.certificates || [];
  const visibleCertificates = certificates.filter((certificate) => certificate.available || certificate.issued);

  useEffect(() => {
    getCertificates().then((nextData) => {
      setData(nextData);
      setStatus("ready");
    }).catch(() => setStatus("error"));
  }, []);

  const issue = async (certificateId) => {
    setIssuingId(certificateId);
    setStatus("ready");
    try {
      const issued = await issueCertificate(certificateId);
      setData((current) => ({ ...current, certificates: current.certificates.map((certificate) => certificate.id === certificateId ? { ...certificate, issued } : certificate) }));
      setStatus("issued");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIssuingId("");
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <AuthNotice locale={locale} />
        <LearnerPageHero
          icon={Award}
          eyebrow={fr ? "Certifications" : "Certifications"}
          title={fr ? "Des compétences prouvées, pas seulement déclarées." : "Skills proven, not merely claimed."}
          description={fr ? "Chaque certificat relie tes examens notés serveur et tes projets approuvés à une preuve publique vérifiable." : "Each certificate connects server-graded exams and approved projects to verifiable public evidence."}
          status={status === "loading" ? (fr ? "Évaluation en cours" : "Evaluating") : status === "error" ? (fr ? "Connexion requise" : "Sign-in required") : (fr ? "Preuves actualisées" : "Evidence updated")}
          action={{ href: "#certificats", label: fr ? "Voir mes certificats" : "View my certificates" }}
        >
          <div className="grid grid-cols-2 gap-3 sm:max-w-xl">
            <MetricCard icon={CheckCircle2} label={fr ? "Prêts à délivrer" : "Ready to issue"} value={visibleCertificates.filter((item) => item.available && item.eligible && !item.issued).length} />
            <MetricCard icon={ShieldCheck} label={fr ? "Déjà délivrés" : "Already issued"} value={certificates.filter((item) => item.issued).length} tone="reward" />
          </div>
        </LearnerPageHero>
        <div id="certificats" className="mt-8 grid gap-6 lg:grid-cols-[1fr_.72fr]">
          <div className="grid gap-5">
            {status === "loading" && <p className="empty-state" role="status">{fr ? "Évaluation des preuves..." : "Evaluating evidence..."}</p>}
            {status === "error" && <p className="empty-state">{fr ? "Connecte-toi pour évaluer et délivrer tes certificats." : "Sign in to evaluate and issue your certificates."}</p>}
            {status === "ready" && !visibleCertificates.length && <p className="empty-state" role="status">{fr ? "Les certifications sont en préparation : elles seront publiées avec des parcours et des évaluations vérifiables." : "Certifications are in preparation and will launch with verifiable learning paths and assessments."}</p>}
            {visibleCertificates.map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} locale={locale} busy={Boolean(issuingId)} issuing={issuingId === certificate.id} onIssue={() => issue(certificate.id)} />)}
            {status === "issued" && <p className="status-success rounded-xl p-3" role="status">{fr ? "Certificat délivré. Sa page publique est prête." : "Certificate issued. Its public page is ready."}</p>}
            {status && !["loading", "ready", "error", "issued"].includes(status) && <p className="status-error rounded-xl p-3" role="alert">{status}</p>}
          </div>
          <aside className="order-first rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:order-none lg:sticky lg:top-24 lg:self-start">
            <Star className="size-9 text-indigoPop" />
            <h2 className="mt-4 font-display text-2xl font-black">{fr ? "Règles de délivrance" : "Issuance rules"}</h2>
            <ul className="mt-5 grid gap-3">{[
              fr ? "Réussir tous les examens requis, notés côté serveur." : "Pass every required server-graded exam.",
              fr ? "Faire approuver les projets avec le score minimal." : "Get projects approved with the minimum score.",
              fr ? "Conserver versions, compétences et preuves dans le certificat." : "Store versions, skills, and evidence in the certificate."
            ].map((item) => <li className="flex gap-3 rounded-2xl bg-slate-50 p-4 font-semibold text-slate-700" key={item}><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />{item}</li>)}</ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
function CertificateCard({ certificate, locale, busy, issuing, onIssue }) {
  const fr = locale === "fr";
  return (
    <article className="surface rounded-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${certificate.eligible ? "bg-emerald-100 text-emerald-800" : "bg-indigo-50 text-indigo-800"}`}><Award className="size-5" />{certificate.eligible ? (fr ? "Prêt à délivrer" : "Ready to issue") : (fr ? "En progression" : "In progress")}</div><h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">{certificate.title[locale] || certificate.title.fr || certificate.title.en}</h2><p className="mt-3 max-w-2xl font-semibold leading-7 text-ink/70">{certificate.description[locale] || certificate.description.fr || certificate.description.en}</p></div>
        <ShieldCheck className="size-12 text-indigoPop" />
      </div>
      <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-2"><ProgressMeter label={fr ? "Examens réussis" : "Exams passed"} value={certificate.progress.examPercent} detail={`${certificate.progress.examsCompleted}/${certificate.progress.examsRequired}`} /><ProgressMeter label={fr ? "Projets approuvés" : "Approved projects"} value={certificate.progress.projectPercent} detail={`${certificate.progress.projectsApproved}/${certificate.progress.projectsRequired}`} /></div>
      {certificate.issued ? <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="font-bold text-emerald-900">{fr ? "Certificat délivré et vérifiable publiquement." : "Certificate issued and publicly verifiable."}</p><a href={`/verify/${certificate.issued.verificationCode}`} className="secondary-button mt-3">{fr ? "Ouvrir la page publique" : "Open public page"}</a></div> : certificate.eligible ? <button type="button" onClick={onIssue} disabled={busy} className="primary-button mt-6 disabled:opacity-60"><Award className="size-5" />{issuing ? (fr ? "Délivrance..." : "Issuing...") : (fr ? "Délivrer mon certificat" : "Issue my certificate")}</button> : null}
    </article>
  );
}
