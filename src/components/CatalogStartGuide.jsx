import { useState } from "react";
import { ArrowRight, BookOpen, Code2, Laptop } from "lucide-react";
import { publicTrackCatalog } from "../content/publicTrackCatalog.js";

const goals = [
  { id: "tools", icon: Laptop, fr: "Préparer mes outils", en: "Set up my tools", detailFr: "Installe ton éditeur et prépare ton espace de travail, étape par étape.", detailEn: "Set up your editor and prepare your workspace, step by step." },
  { id: "html", icon: BookOpen, fr: "Créer ma première page", en: "Build my first page", detailFr: "Commence par le rôle du HTML, puis apprends à structurer une page web.", detailEn: "Start with what HTML does, then learn to structure a web page." },
  { id: "css", icon: Code2, fr: "Mettre en forme ma page", en: "Style my page", detailFr: "Tu connais déjà les bases HTML ? Passe aux sélecteurs et aux couleurs CSS.", detailEn: "Already know basic HTML? Move on to CSS selectors and colors." }
];

export default function CatalogStartGuide({ tracks, locale }) {
  const [selected, setSelected] = useState(null);
  const fr = locale === "fr";
  const available = goals.filter((goal) => tracks.some((track) => track.id === goal.id));
  const goal = available.find((item) => item.id === selected);
  const track = goal && publicTrackCatalog.find((item) => item.id === goal.id);
  if (!available.length) return null;

  return <section aria-labelledby="start-guide-title" className="mt-16 border-t border-slate-400 pt-8">
    <p className="eyebrow">{fr ? "Ton premier pas" : "Your first step"}</p>
    <h2 id="start-guide-title" className="mt-3 font-display text-3xl font-semibold text-slate-950">{fr ? "Tu hésites encore ? Pars de ton objectif." : "Still unsure? Start from your goal."}</h2>
    <p className="mt-2 text-slate-600">{fr ? "Choisis ton objectif : on te propose une première leçon. Tu peux changer de voie à tout moment." : "Choose a goal to find your first lesson. You can switch paths at any time."}</p>
    <div role="group" aria-label={fr ? "Mon objectif" : "My goal"} className="mt-5 grid gap-3 md:grid-cols-3">
      {available.map((item) => {
        const Icon = item.icon;
        return <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="start-guide-result" onClick={() => setSelected(item.id)} className={`flex min-h-12 items-center gap-3 rounded-md border p-4 text-left font-semibold ${selected === item.id ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400"}`}>
          <Icon aria-hidden="true" className="size-5 shrink-0" />{fr ? item.fr : item.en}
        </button>;
      })}
    </div>
    <div id="start-guide-result" aria-live="polite" aria-atomic="true" className="mt-5">
      {track ? <div className="flex flex-col gap-4 border-l-2 border-indigo-400 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="font-bold text-slate-950">{track.title[locale] || track.title.fr}</p><p className="mt-1 text-sm leading-6 text-slate-600">{fr ? goal.detailFr : goal.detailEn}</p></div>
        <a href={track.firstHref} className="primary-button shrink-0">{fr ? "Ouvrir ma première leçon" : "Open my first lesson"}<ArrowRight aria-hidden="true" className="size-4" /></a>
      </div> : <p className="text-sm text-slate-500">{fr ? "Déjà à l’aise ? Explore toutes les formations ci-dessus." : "Already comfortable? Explore all courses above."}</p>}
    </div>
  </section>;
}
