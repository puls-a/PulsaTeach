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
    badge: "Markup Smith",
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
    badge: "Style Sprinter",
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
    badge: "Alignment Ace",
    levels: 6,
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
    badge: "Grid Builder",
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
    badge: "Logic Shooter",
    levels: 8,
    title: { en: "JavaScript Lab", fr: "JavaScript Lab" },
    text: {
      en: "Use variables, functions, conditions, loops, and events through playable missions.",
      fr: "Utilise variables, fonctions, conditions, boucles et events dans des missions jouables."
    }
  },
  {
    id: "dom-tower",
    href: "/learn/javascript/js-dom-events/js-04-dom-events",
    tone: "bg-indigoPop",
    badge: "DOM Climber",
    levels: 5,
    title: { en: "DOM Tower", fr: "DOM Tower" },
    text: {
      en: "Manipulate real interfaces, state, events, and dynamic feedback.",
      fr: "Manipule des interfaces reelles, l'etat, les events et les retours dynamiques."
    }
  },
  {
    id: "api-harbor",
    href: "/learn/javascript/js-storage-async/js-06-fetch",
    tone: "bg-aquaPop",
    badge: "API Navigator",
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
    badge: "Portfolio Maker",
    levels: 6,
    title: { en: "Final Project District", fr: "Final Project District" },
    text: {
      en: "Ship portfolio projects that combine HTML, CSS, JavaScript, DOM, and APIs.",
      fr: "Livre des projets portfolio qui combinent HTML, CSS, JavaScript, DOM et APIs."
    }
  }
];

export const gameBadges = [
  { id: "first-preview", label: { en: "Live Builder", fr: "Builder Live" }, xp: 25 },
  { id: "flexbox-clear", label: { en: "Alignment Ace", fr: "As de l'alignement" }, xp: 40 },
  { id: "arrow-clear", label: { en: "Logic Shooter", fr: "Tireur logique" }, xp: 50 }
];

export function readGameProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsateach-game-progress")) || { xp: 0, badges: {}, missions: {} };
  } catch {
    return { xp: 0, badges: {}, missions: {} };
  }
}

export function awardGameMission(missionId, xp, badgeId) {
  const progress = readGameProgress();
  if (progress.missions?.[missionId]) return progress;

  const next = {
    xp: (progress.xp || 0) + xp,
    missions: { ...(progress.missions || {}), [missionId]: true },
    badges: badgeId ? { ...(progress.badges || {}), [badgeId]: true } : { ...(progress.badges || {}) }
  };

  localStorage.setItem("pulsateach-game-progress", JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("pulsateach-game-progress", { detail: next }));
  return next;
}
