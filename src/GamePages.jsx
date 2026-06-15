import { useEffect, useState } from "react";
import { Award, BadgeCheck, BookOpenCheck, Compass, Info, Map, PlayCircle, Sparkles, Trophy, Zap } from "lucide-react";
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
      description={locale === "fr" ? "Choisis une zone, termine des missions et debloque les premiers badges." : "Choose a zone, clear missions, and unlock the first badges."}
      stat={`${progress.xp || 0} XP`}
    >
      <AuthNotice locale={locale} />
      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[26px] bg-white p-3 clay">
          <img src={assetPaths.map} alt="Pulsa Academy map" className="h-full min-h-[360px] w-full rounded-[24px] object-cover" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <WorldStat icon={Trophy} label="XP" value={progress.xp || 0} />
          <WorldStat icon={BookOpenCheck} label={locale === "fr" ? "Missions" : "Missions"} value={completed} />
          <WorldStat icon={Award} label={locale === "fr" ? "Badges" : "Badges"} value={badges} />
          <button type="button" onClick={() => setBadgesOpen(true)} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-indigoPop px-4 font-extrabold text-white shadow-clayPressed sm:col-span-3 xl:col-span-1">
            <Info className="size-5" />
            {locale === "fr" ? "Voir les badges" : "View badges"}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {worldZones.map((zone) => (
          <a key={zone.id} href={zone.href} className="group rounded-[22px] bg-white p-4 transition-transform hover:-translate-y-1 clay-soft">
            <div className="flex items-start justify-between gap-3">
              <div className={`grid size-12 place-items-center rounded-2xl text-white clay-soft ${zone.tone}`}>
                <Map className="size-6" />
              </div>
              <span className="rounded-xl bg-cloud px-2 py-1 text-xs font-extrabold">{zone.levels} levels</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold">{zone.title[locale]}</h2>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="rounded-xl bg-lemonPop px-3 py-1 text-xs font-extrabold">{zone.badge}</span>
              <PlayCircle className="size-6 text-orangePop transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>

      <MissionModal open={badgesOpen} title={locale === "fr" ? "Badges actifs" : "Active badges"} onClose={() => setBadgesOpen(false)}>
        <div className="grid gap-3 md:grid-cols-3">
          {gameBadges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 rounded-[22px] bg-white p-3 text-ink clay-soft">
              <img src={assetPaths.badge} alt="" className="size-14" />
              <div>
                <h3 className="font-display text-xl font-bold">{badge.label[locale]}</h3>
                <p className="font-extrabold text-ink/65">+{badge.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
        <a href="#/playground" className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl bg-indigoPop px-5 py-3 font-extrabold text-white shadow-clayPressed">
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
      description={locale === "fr" ? "Lis la mission, modifie un fichier, observe le rendu, puis valide." : "Read the mission, edit one file, watch the result, then validate."}
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
      description={locale === "fr" ? "Une mission, trois declarations CSS, validation immediate." : "One mission, three CSS declarations, immediate validation."}
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
      description={locale === "fr" ? "Ecris une fonction, tire, puis passe a la cible suivante." : "Write a function, fire, then move to the next target."}
      stat="+20-40 XP"
    >
      <AuthNotice locale={locale} />
      <ArrowTargetGame locale={locale} />
    </LearningShell>
  );
}

export function GamePromoSection({ locale }) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="font-display text-lg font-bold text-rosePop">Pulsa Academy</p>
          <h2 className="mt-2 font-display text-5xl font-bold">
            {locale === "fr" ? "Des cours qui se jouent vraiment." : "Lessons that actually play."}
          </h2>
          <p className="mt-5 font-bold leading-8 text-ink/70">
            {locale === "fr"
              ? "La nouvelle couche gamifiee ajoute une carte du monde, un playground live et des missions CSS/JS validables."
              : "The new game layer adds a world map, a live playground, and validatable CSS/JS missions."}
          </p>
          <a href="#/world" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orangePop px-5 py-4 font-extrabold text-white shadow-clayPressed">
            <Zap className="size-5" />
            {locale === "fr" ? "Explorer la carte" : "Explore the map"}
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [Sparkles, locale === "fr" ? "Preview live" : "Live preview"],
            [BadgeCheck, locale === "fr" ? "Badges XP" : "XP badges"],
            [Compass, locale === "fr" ? "Missions jouables" : "Playable missions"]
          ].map(([Icon, label]) => (
            <div key={label} className="rounded-[28px] bg-white p-5 clay">
              <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-lemonPop clay-soft">
                <Icon className="size-7 text-indigoPop" />
              </div>
              <h3 className="font-display text-2xl font-bold">{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorldStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] bg-white p-4 clay-soft">
      <Icon className="mb-3 size-6 text-orangePop" />
      <p className="font-display text-3xl font-bold">{value}</p>
      <p className="font-extrabold text-ink/60">{label}</p>
    </div>
  );
}
