import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, ClipboardCheck, FileText } from "lucide-react";
import DashCard from "../../components/DashCard.jsx";
import { getAnalytics } from "../../apiClient.js";

export default function AnalyticsPage({ locale }) {
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
