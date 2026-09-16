import { useEffect, useState } from "react";
import { Award, BookOpenCheck, CheckCircle2, Compass, Info, LockKeyhole, Map, PlayCircle, Trophy } from "lucide-react";
import ArrowTargetGame from "./components/ArrowTargetGame.jsx";
import AuthNotice from "./components/AuthNotice.jsx";
import FlexboxArena from "./components/FlexboxArena.jsx";
import LearningShell from "./components/LearningShell.jsx";
import LivePlayground from "./components/LivePlayground.jsx";
import MissionModal from "./components/MissionModal.jsx";
import { assetPaths, gameBadges, readGameProgress, refreshGameProgressFromRemote, worldZones } from "./gameContent.js";
import { learnerStorageOwnerEvent } from "./learnerStorage.js";

export function WorldPage({ locale }) {
  const [progress, setProgress] = useState(() => readGameProgress());
  const [badgesOpen, setBadgesOpen] = useState(false);
  const completed = Object.keys(progress.missions || {}).length;
  const badges = Object.keys(progress.badges || {}).length;

  useEffect(() => {
    const onProgress = (event) => setProgress(event.detail || readGameProgress());
    const onOwnerChange = () => {
      setProgress(readGameProgress());
      refreshGameProgressFromRemote().catch(() => {});
    };
    window.addEventListener("pulsateach-game-progress", onProgress);
    window.addEventListener("storage", onProgress);
    window.addEventListener(learnerStorageOwnerEvent, onOwnerChange);
    refreshGameProgressFromRemote().catch(() => {});
    return () => {
      window.removeEventListener("pulsateach-game-progress", onProgress);
      window.removeEventListener("storage", onProgress);
      window.removeEventListener(learnerStorageOwnerEvent, onOwnerChange);
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
      <AuthNotice locale={locale} scope="game" />
      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <div className="surface p-3">
          <img src={assetPaths.map} alt={locale === "fr" ? "Carte de Pulsa Academy" : "Pulsa Academy map"} className="h-full min-h-[360px] w-full rounded-xl object-cover" />
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
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{zone.levels} {locale === "fr" ? "niveaux" : "levels"}</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold">{zone.title[locale]}</h2>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigoPop">{zone.badge[locale]}</span>
              <PlayCircle className="size-6 text-indigoPop transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>

      <MissionModal open={badgesOpen} title={locale === "fr" ? "Badges de défis" : "Challenge badges"} closeLabel={locale === "fr" ? "Fermer" : "Close"} onClose={() => setBadgesOpen(false)}>
        <div className="grid gap-3 md:grid-cols-3">
          {gameBadges.map((badge) => {
            const earned = Boolean(progress.badges?.[badge.id]);
            return (
              <div key={badge.id} className={`relative overflow-hidden rounded-2xl border p-4 ${earned ? "border-amber-200 bg-gradient-to-br from-amber-50 to-white" : "border-slate-200 bg-slate-50"}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid size-16 shrink-0 place-items-center rounded-2xl ${earned ? "bg-amber-100" : "bg-slate-200"}`}>
                    <img src={assetPaths.badge} alt="" className={`size-12 ${earned ? "" : "grayscale opacity-45"}`} />
                  </span>
                  <div className="min-w-0">
                    <p className={`inline-flex items-center gap-1 text-xs font-black uppercase tracking-[.12em] ${earned ? "text-green-700" : "text-slate-500"}`}>
                      {earned ? <CheckCircle2 className="size-4" /> : <LockKeyhole className="size-4" />}
                      {earned ? (locale === "fr" ? "Débloqué" : "Unlocked") : (locale === "fr" ? "Verrouillé" : "Locked")}
                    </p>
                    <h3 className="font-display text-xl font-bold">{badge.label[locale]}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{badge.description[locale]}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[.1em] text-indigoPop">{badge.missions.length} {locale === "fr" ? `mission${badge.missions.length > 1 ? "s" : ""}` : `mission${badge.missions.length > 1 ? "s" : ""}`} · {badge.totalXp} XP {locale === "fr" ? "de défis" : "from challenges"}</p>
              </div>
            );
          })}
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
      <AuthNotice locale={locale} scope="game" />
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
      description={locale === "fr" ? "Quatre niveaux d'alignement où la cible correspond vraiment aux règles flex." : "Four alignment levels where the target truly matches the flex rules."}
      stat="+20-40 XP"
    >
      <AuthNotice locale={locale} scope="game" />
      <FlexboxArena locale={locale} />
    </LearningShell>
  );
}

export function JavaScriptArenaPage({ locale }) {
  return (
    <LearningShell
      locale={locale}
      kicker="JavaScript Mission"
      title="JavaScript Arena"
      description={locale === "fr" ? "Écris une fonction testée sur plusieurs coordonnées, pas sur une seule cible truquée." : "Write a function tested against several coordinates, not a single hardcoded target."}
      stat="+20-50 XP"
    >
      <AuthNotice locale={locale} scope="game" />
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
