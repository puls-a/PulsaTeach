import { useEffect, useState } from "react";
import { Award, BookOpenCheck, Compass, Info, Map, PlayCircle, Trophy } from "lucide-react";
import ArrowTargetGame from "./components/ArrowTargetGame.jsx";
import AuthNotice from "./components/AuthNotice.jsx";
import FlexboxArena from "./components/FlexboxArena.jsx";
import LearningShell from "./components/LearningShell.jsx";
import LivePlayground from "./components/LivePlayground.jsx";
import MissionModal from "./components/MissionModal.jsx";
import { assetPaths, gameBadges, readGameProgress, worldZones } from "./gameContent.js";

export function WorldPage({ locale }) {
  const [progress, setProgress] = useState(() => readGameProgress());
  const [badgesOpen, setBadgesOpen] = useState(false);
  const completed = Object.keys(progress.missions || {}).length;
  const badges = Object.keys(progress.badges || {}).length;

  useEffect(() => {
    const onProgress = (event) => setProgress(event.detail || readGameProgress());
    window.addEventListener("pulsateach-game-progress", onProgress);
    window.addEventListener("storage", onProgress);
    return () => {
      window.removeEventListener("pulsateach-game-progress", onProgress);
      window.removeEventListener("storage", onProgress);
    };
  }, []);

  return (
    <LearningShell
      locale={locale}
      kicker="Pulsa Academy"
      title={locale === "fr" ? "Carte du monde" : "World map"}
      description={locale === "fr" ? "Choisis une zone, termine des missions et débloque les premiers badges." : "Choose a zone, clear missions, and unlock the first badges."}
      stat={`${progress.xp || 0} XP`}
    >
      <AuthNotice locale={locale} />
      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <div className="surface p-3">
          <img src={assetPaths.map} alt="Carte de Pulsa Academy" className="h-full min-h-[360px] w-full rounded-xl object-cover" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <WorldStat icon={Trophy} label="XP" value={progress.xp || 0} />
          <WorldStat icon={BookOpenCheck} label={locale === "fr" ? "Missions" : "Missions"} value={completed} />
          <WorldStat icon={Award} label={locale === "fr" ? "Badges" : "Badges"} value={badges} />
          <button type="button" onClick={() => setBadgesOpen(true)} className="primary-button sm:col-span-3 xl:col-span-1">
            <Info className="size-5" />
            {locale === "fr" ? "Voir les badges" : "View badges"}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {worldZones.map((zone) => (
          <a key={zone.id} href={zone.href} className="group surface hover:border-indigo-300">
            <div className="flex items-start justify-between gap-3">
              <div className={`grid size-11 place-items-center rounded-xl text-white ${zone.tone}`}>
                <Map className="size-6" />
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{zone.levels} niveaux</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold">{zone.title[locale]}</h2>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigoPop">{zone.badge}</span>
              <PlayCircle className="size-6 text-indigoPop transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>

      <MissionModal open={badgesOpen} title={locale === "fr" ? "Badges actifs" : "Active badges"} onClose={() => setBadgesOpen(false)}>
        <div className="grid gap-3 md:grid-cols-3">
          {gameBadges.map((badge) => (
            <div key={badge.id} className="muted-surface flex items-center gap-3">
              <img src={assetPaths.badge} alt="" className="size-14" />
              <div>
                <h3 className="font-display text-xl font-bold">{badge.label[locale]}</h3>
                <p className="text-sm font-semibold text-slate-500">+{badge.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
        <a href="/playground" className="primary-button mt-5 w-fit">
          <Compass className="size-5" />
          {locale === "fr" ? "Commencer" : "Start"}
        </a>
      </MissionModal>
    </LearningShell>
  );
}

export function LivePlaygroundPage({ locale }) {
  return (
    <LearningShell
      locale={locale}
      kicker="Live Mission"
      title={locale === "fr" ? "Editeur HTML/CSS/JS" : "HTML/CSS/JS editor"}
      description={locale === "fr" ? "Lis la mission, modifie un fichier, observe le rendu puis valide." : "Read the mission, edit one file, watch the result, then validate."}
      stat={locale === "fr" ? "Preview live" : "Live preview"}
    >
      <AuthNotice locale={locale} />
      <LivePlayground locale={locale} />
    </LearningShell>
  );
}

export function FlexboxArenaPage({ locale }) {
  return (
    <LearningShell
      locale={locale}
      kicker="CSS Mission"
      title="Flexbox Arena"
      description={locale === "fr" ? "Une mission, trois déclarations CSS, validation immédiate." : "One mission, three CSS declarations, immediate validation."}
      stat="+40 XP"
    >
      <AuthNotice locale={locale} />
      <FlexboxArena locale={locale} />
    </LearningShell>
  );
}

export function JavaScriptArenaPage({ locale }) {
  return (
    <LearningShell
      locale={locale}
      kicker="JavaScript Mission"
      title={locale === "fr" ? "Flèche et cible" : "Arrow and target"}
      description={locale === "fr" ? "Écris une fonction, tire puis passe à la cible suivante." : "Write a function, fire, then move to the next target."}
      stat="+20-40 XP"
    >
      <AuthNotice locale={locale} />
      <ArrowTargetGame locale={locale} />
    </LearningShell>
  );
}

function WorldStat({ icon: Icon, label, value }) {
  return (
    <div className="surface p-4">
      <Icon className="mb-3 size-5 text-indigoPop" />
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
