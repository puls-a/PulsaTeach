import { useEffect, useState } from "react";
import { Map } from "lucide-react";
import { getRoadmap } from "../../apiClient.js";

export default function RoadmapPage({ locale }) {
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    getRoadmap().then(setRoadmap).catch(() => setRoadmap(null));
  }, []);

  const data = roadmap || {
    vision: {
      fr: "Roadmap indisponible côté API pour le moment.",
      en: "Roadmap API unavailable for now."
    },
    phases: []
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-lg font-bold text-orange-700">Ultra roadmap</p>
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
