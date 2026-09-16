import { getLearnerItem, setLearnerItem } from "./learnerStorage.js";
import { getUserId, loadRemoteProgress, saveRemoteProgress } from "./apiClient.js";
import { gameMissionIds, mergeGameProgress, normalizeGameProgress } from "./gameProgress.js";

export { gameMissionIds } from "./gameProgress.js";

export const assetPaths = {
  arrow: "/assets/icons/arrow.svg",
  badge: "/assets/icons/badge-xp.svg",
  bot: "/assets/characters/pulsa-bot.svg",
  map: "/assets/backgrounds/academy-map.svg",
  spark: "/assets/effects/spark.svg",
  target: "/assets/icons/target.svg"
};

export const worldZones = [
  {
    id: "html-forge",
    href: "/learn/html/html-getting-started/html-00-what-html-does",
    tone: "bg-orangePop",
    badge: { en: "Markup Smith", fr: "Forgeron du balisage" },
    levels: 15,
    title: { en: "HTML Forge", fr: "HTML Forge" },
    text: {
      en: "Build semantic structures, forms, media, and accessible document foundations.",
      fr: "Forge les structures semantiques, les formulaires, les medias et les bases accessibles."
    }
  },
  {
    id: "css-garden",
    href: "/learn/css/css-selectors/css-01-selectors",
    tone: "bg-mintPop",
    badge: { en: "Style Sprinter", fr: "Sprinteur du style" },
    levels: 16,
    title: { en: "CSS Garden", fr: "CSS Garden" },
    text: {
      en: "Grow selectors, variables, responsive layouts, and polished visual systems.",
      fr: "Cultive selecteurs, variables, layouts responsives et systemes visuels propres."
    }
  },
  {
    id: "flexbox-arena",
    href: "/flexbox-arena",
    tone: "bg-aquaPop",
    badge: { en: "Alignment Ace", fr: "As de l'alignement" },
    levels: 4,
    title: { en: "Flexbox Arena", fr: "Flexbox Arena" },
    text: {
      en: "Move the academy bot with justify-content and align-items until it reaches the target.",
      fr: "Deplace le bot avec justify-content et align-items jusqu'a la cible."
    }
  },
  {
    id: "grid-kingdom",
    href: "/learn/css/css-grid/css-04-grid",
    tone: "bg-lemonPop",
    badge: { en: "Grid Builder", fr: "Architecte Grid" },
    levels: 5,
    title: { en: "Grid Kingdom", fr: "Grid Kingdom" },
    text: {
      en: "Place cards and interface regions on clear two-dimensional layouts.",
      fr: "Place cartes et regions d'interface sur des layouts en deux dimensions."
    }
  },
  {
    id: "javascript-lab",
    href: "/js-arena",
    tone: "bg-rosePop",
    badge: { en: "Logic Shooter", fr: "Tireur logique" },
    levels: 4,
    title: { en: "JavaScript Lab", fr: "JavaScript Lab" },
    text: {
      en: "Use variables, functions, conditions, loops, and events through playable missions.",
      fr: "Utilise variables, fonctions, conditions, boucles et events dans des missions jouables."
    }
  },
  {
    id: "dom-tower",
    href: "/learn/javascript/js-dom-events/js-04-events-manual",
    tone: "bg-indigoPop",
    badge: { en: "DOM Climber", fr: "Grimpeur du DOM" },
    levels: 5,
    title: { en: "DOM Tower", fr: "DOM Tower" },
    text: {
      en: "Manipulate real interfaces, state, events, and dynamic feedback.",
      fr: "Manipule des interfaces reelles, l'etat, les events et les retours dynamiques."
    }
  },
  {
    id: "api-harbor",
    href: "/learn/javascript/js-storage-async/js-05-fetch-manual",
    tone: "bg-aquaPop",
    badge: { en: "API Navigator", fr: "Navigateur API" },
    levels: 4,
    title: { en: "API Harbor", fr: "API Harbor" },
    text: {
      en: "Fetch data, read responses, and unlock data-driven app missions.",
      fr: "Appelle des donnees, lis les reponses et debloque des missions data."
    }
  },
  {
    id: "final-project-district",
    href: "/projects",
    tone: "bg-orangePop",
    badge: { en: "Portfolio Maker", fr: "Créateur de portfolio" },
    levels: 6,
    title: { en: "Final Project District", fr: "Final Project District" },
    text: {
      en: "Ship portfolio projects that combine HTML, CSS, JavaScript, DOM, and APIs.",
      fr: "Livre des projets portfolio qui combinent HTML, CSS, JavaScript, DOM et APIs."
    }
  }
];

export const gameBadges = [
  { id: "first-preview", label: { en: "Live Builder", fr: "Builder Live" }, description: { en: "Complete the live editor mission.", fr: "Termine la mission de l'éditeur live." }, missions: gameMissionIds.playground, totalXp: 25 },
  { id: "flexbox-clear", label: { en: "Alignment Ace", fr: "As de l'alignement" }, description: { en: "Clear all four Flexbox levels.", fr: "Réussis les quatre niveaux Flexbox." }, missions: gameMissionIds.flexbox, totalXp: 120 },
  { id: "arrow-clear", label: { en: "Logic Shooter", fr: "Tireur logique" }, description: { en: "Clear all four JavaScript levels.", fr: "Réussis les quatre niveaux JavaScript." }, missions: gameMissionIds.javascript, totalXp: 140 }
];

export function readGameProgress() {
  try {
    return normalizeGameProgress(JSON.parse(getLearnerItem("pulsateach-game-progress")) || {});
  } catch {
    return normalizeGameProgress();
  }
}

export function awardGameMission(missionId, xp, badgeId, requiredMissionIds = []) {
  const progress = readGameProgress();
  const awarded = !progress.missions?.[missionId];
  const missions = { ...(progress.missions || {}), [missionId]: xp };
  const arenaComplete = requiredMissionIds.length > 0 && requiredMissionIds.every((id) => missions[id]);
  const badgeAwarded = Boolean(badgeId && arenaComplete && !progress.badges?.[badgeId]);
  const next = normalizeGameProgress({ missions });

  if (awarded || badgeAwarded) {
    persistGameProgress(next);
    syncGameProgress(next);
  }
  return { progress: next, awarded, badgeAwarded, arenaComplete };
}

export async function refreshGameProgressFromRemote() {
  if (!getUserId().startsWith("supabase-")) return readGameProgress();
  const remote = await loadRemoteProgress();
  const merged = mergeGameProgress(readGameProgress(), remote?.game);
  persistGameProgress(merged);
  if (JSON.stringify(merged) !== JSON.stringify(normalizeGameProgress(remote?.game))) syncGameProgress(merged);
  return merged;
}

function persistGameProgress(progress) {
  setLearnerItem("pulsateach-game-progress", JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent("pulsateach-game-progress", { detail: progress }));
}

function syncGameProgress(progress) {
  if (!getUserId().startsWith("supabase-")) return;
  saveRemoteProgress({ game: progress })
    .then((remote) => persistGameProgress(mergeGameProgress(readGameProgress(), remote?.game)))
    .catch(() => window.dispatchEvent(new CustomEvent("pulsateach-game-sync", { detail: "offline" })));
}
