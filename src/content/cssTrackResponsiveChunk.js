import { cssModulesResponsive } from "./cssModulesResponsive.js";
import { createCssTrack } from "./cssTrackMetadata.js";

function module(id, fr, en, lessons) {
  const totalMinutes = lessons.reduce((sum, item) => sum + item.durationMin, 0);
  return {
    id,
    title: { fr, en },
    description: { fr: `Atelier responsive pratique : ${fr}.`, en: `Practical responsive workshop: ${en}.` },
    deliverable: { fr: `Un pattern ${fr} valide`, en: `A verified ${en} pattern` },
    importance: { fr: `${fr} evite les debordements et garde l'interface utilisable.`, en: `${en} prevents overflow and keeps the interface usable.` },
    prerequisites: { fr: ["Lire une regle CSS", "Comprendre mobile-first", "Tester plusieurs largeurs"], en: ["Read a CSS rule", "Understand mobile-first", "Test multiple widths"] },
    outcomes: { fr: ["Adapter une interface", "Proteger les contenus variables", "Respecter reduced motion"], en: ["Adapt an interface", "Protect variable content", "Respect reduced motion"] },
    vocabulary: ["media query", "container query", "clamp", "overflow"],
    mastery: { fr: ["Aucun debordement mobile", "Les grands ecrans respirent", "Les animations restent responsables"], en: ["No mobile overflow", "Large screens breathe", "Animations remain responsible"] },
    lessons,
    totalMinutes
  };
}

function cssLesson(id, title, brief, starterCode, target, checks, xp) {
  const solution = cssSolution(target, checks);
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief, en: englishBriefFor(titleObject.en, target, checks) };
  const course = courseFor(titleObject, briefObject, solution, checks, target);
  const guide = guideFor(titleObject, target);

  return {
    id,
    type: "css",
    title: titleObject,
    brief: briefObject,
    theory: briefObject,
    course,
    pedagogy: pedagogyFor(titleObject, briefObject, course, guide, solution),
    guide,
    skills: [target, ...checks],
    difficulty: checks.length >= 3 ? "medium" : "easy",
    durationMin: 32,
    starterCode,
    solution,
    previewHtml: previewHtml(),
    tests: [
      test("contains", "target selector", target),
      ...checks.map((check) => test("contains", check, proofFor(check)))
    ],
    hint: { fr: "Teste a 375 px puis a 1024 px avant de conclure.", en: "Test at 375 px and 1024 px before concluding." },
    xp
  };
}

function projectLesson({ id, title, brief, starterCode, solution, tests, xp }) {
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief[0], en: brief[1] };
  const course = courseFor(titleObject, briefObject, solution, ["clamp(", "auto-fit", "@media"], ".panel");
  const guide = guideFor(titleObject, ".panel");

  return {
    id,
    type: "project",
    title: titleObject,
    brief: briefObject,
    course,
    pedagogy: pedagogyFor(titleObject, briefObject, course, guide, solution),
    theory: briefObject,
    guide,
    skills: ["css", "responsive", "project"],
    difficulty: "project",
    durationMin: 90,
    starterCode,
    solution,
    tests,
    rubric: {
      fr: ["Le rendu tient sur mobile et desktop.", "Les contenus longs ne debordent pas.", "Les images et medias gardent des proportions stables.", "Les animations respectent les preferences utilisateur."],
      en: ["The output holds on mobile and desktop.", "Long content does not overflow.", "Images and media keep stable proportions.", "Animations respect user preferences."]
    },
    hint: { fr: "Commence mobile-first, puis ajoute les contraintes larges.", en: "Start mobile-first, then add wider constraints." },
    xp
  };
}

function test(type, label, value, amount = 1) {
  return { type, label, value, amount };
}

function cssSolution(target, checks) {
  if (checks.includes("prefers-reduced-motion")) {
    return `@media (prefers-reduced-motion: reduce) {\n  .toolbar button {\n    transition: none;\n  }\n}`;
  }
  if (checks.includes(":hover")) {
    return `${target} {\n  transition: transform .2s ease;\n}\n\n${target}:hover {\n  transform: translateY(-3px);\n}`;
  }
  if (target === "@media") {
    return `@media (min-width: 700px) {\n  .panel {\n    display: grid;\n  }\n}`;
  }
  return `${target} {\n  ${checks.map((check) => declarationFor(check)).join("\n  ")}\n}`;
}

function declarationFor(check) {
  const map = {
    "@media": "@media (min-width: 700px)",
    "min-width": "min-width: 700px",
    "display: grid": "display: grid;",
    "grid-template-columns": "grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));",
    "transition": "transition: transform .2s ease;",
    ":hover": "transform: translateY(-3px);",
    "transform": "transform: translateY(-3px);",
    "prefers-reduced-motion": "@media (prefers-reduced-motion: reduce)",
    "transition: none": "transition: none;",
    "font-size": "font-size: clamp(1rem, 1vw + .75rem, 1.25rem);",
    "clamp(": "clamp(",
    "--space": "--space: clamp(1rem, 2vw, 2rem);",
    "padding: var(--space)": "padding: var(--space);",
    "max-width": "max-width: 100%;",
    "aspect-ratio": "aspect-ratio: 16 / 9;",
    "object-fit": "object-fit: cover;",
    "container-type": "container-type: inline-size;",
    "@container": "@container (min-width: 26rem)",
    "display: flex": "display: flex;",
    "overflow-x": "overflow-x: auto;",
    "justify-content": "justify-content: space-between;"
  };
  return map[check] || `${check}: initial;`;
}

function proofFor(check) {
  if (check.startsWith("@")) return check;
  if (check.includes(":")) return check;
  return declarationFor(check).split(":")[0].trim();
}

function englishBriefFor(title, target, checks) {
  return `Complete ${title} by updating ${target} with ${checks.slice(0, 3).join(", ")} and verify the responsive result.`;
}

function courseFor(title, brief, solution, checks, target) {
  const vocabulary = [
    [target, "Zone ciblee pour garder l'exercice precis."],
    [checks[0] || "responsive", "Contrainte responsive a verifier."],
    ["viewport", "Largeur disponible qui influence le rendu."]
  ];

  return {
    fr: {
      introduction: `${title.fr} rend l'interface plus robuste quand l'espace change.`,
      sections: [
        { title: "Objectif", paragraphs: [brief.fr, "Le responsive se prouve avec plusieurs largeurs, pas avec une capture unique."], example: solution.slice(0, 220) },
        { title: "Methode", paragraphs: [`Travaille d'abord sur ${target}, puis elargis seulement si le rendu le justifie.`, "Une bonne regle responsive protege le contenu sans figer la mise en page."], example: checks.join(", ") },
        { title: "Validation", paragraphs: ["Teste petit ecran, desktop et contenu long.", "Reduis les animations si l'utilisateur le demande."], example: "375 px -> 768 px -> 1024 px" }
      ],
      vocabulary,
      check: ["Je teste a plusieurs largeurs.", "Je protege les contenus longs.", "Je peux expliquer le breakpoint."]
    },
    en: {
      introduction: `${title.en} makes the interface sturdier when space changes.`,
      sections: [
        { title: "Goal", paragraphs: [brief.en, "Responsive work is proven with multiple widths, not a single screenshot."], example: solution.slice(0, 220) },
        { title: "Method", paragraphs: [`Work on ${target} first, then widen only when the output proves it is needed.`, "A good responsive rule protects content without freezing the layout."], example: checks.join(", ") },
        { title: "Validation", paragraphs: ["Test small screens, desktop, and long content.", "Reduce motion when the user asks for it."], example: "375 px -> 768 px -> 1024 px" }
      ],
      vocabulary,
      check: ["I test multiple widths.", "I protect long content.", "I can explain the breakpoint."]
    }
  };
}

function guideFor(title, target) {
  return {
    fr: {
      objectives: [`Comprendre ${title.fr}.`, `Modifier ${target} sans casser le mobile.`, "Verifier le resultat a plusieurs tailles."],
      prerequisites: ["Lire une media query", "Comprendre Flexbox/Grid de base", "Observer les debordements"],
      steps: ["Partir du rendu mobile", "Ajouter une contrainte responsive", "Tester mobile, tablette et desktop"],
      mistakes: [`Commencer ${title.fr} par desktop`, `Ignorer le contenu long dans ${target}`, `Forcer une animation pendant ${title.fr}`]
    },
    en: {
      objectives: [`Understand ${title.en}.`, `Modify ${target} without breaking mobile.`, "Verify the result at multiple sizes."],
      prerequisites: ["Read a media query", "Understand basic Flexbox/Grid", "Spot overflows"],
      steps: ["Start from mobile output", "Add a responsive constraint", "Test mobile, tablet, and desktop"],
      mistakes: [`Starting ${title.en} from desktop`, `Ignoring long content in ${target}`, `Forcing animation during ${title.en}`]
    }
  };
}

function pedagogyFor(title, brief, course, guide, solution) {
  return {
    fr: pedagogyLocale(title.fr, brief.fr, course.fr, guide.fr, solution),
    en: pedagogyLocale(title.en, brief.en, course.en, guide.en, solution)
  };
}

function pedagogyLocale(title, brief, course, guide, solution) {
  return {
    why: course.introduction || brief,
    objectives: guide.objectives,
    prerequisites: guide.prerequisites,
    vocabulary: course.vocabulary,
    comparison: {
      good: { title: "Approche responsive testable", code: solution, explanation: "Le code part d'une base mobile et ajoute une contrainte observable." },
      bad: { title: "Approche fragile", code: ".panel { width: 1200px; }", explanation: "Le code impose une largeur fixe et casse les petits ecrans." }
    },
    guided: guide.steps,
    autonomous: `Refais ${title} a 375 px, 768 px et 1024 px, puis note la preuve obtenue.`,
    hints: ["Cherche le premier debordement.", "Ajoute une contrainte courte.", "Verifie aussi reduced motion quand il y a une animation."],
    correction: ["La solution garde une base mobile.", "Les largeurs plus grandes ajoutent de l'espace sans cacher le contenu.", "Les tests prouvent les motifs CSS attendus."],
    summary: course.introduction || brief,
    next: "Continue avec une contrainte responsive plus realiste."
  };
}

function previewHtml() {
  return `<main class="demo-surface">
  <section class="panel">
    <article class="card course-card"><img alt="" src="/assets/og-image.svg" />Long content that should wrap correctly.</article>
    <article class="card course-card">CSS Lab</article>
    <article class="card course-card">JS Arena</article>
  </section>
  <div class="toolbar">
    <button>Run</button><button>Hint</button><button>Ship</button>
  </div>
</main>`;
}

const responsiveModules = [
  ...cssModulesResponsive,
  module("css-responsive-motion", "Responsive et motion", "Responsive and motion", [
    cssLesson("css-05-responsive", ["Puzzle responsive", "Responsive puzzle"], "Ajoute une media query qui transforme .panel en grille a partir de 700px.", ".panel {\n  display: block;\n}\n\n/* media query ici */", "@media", ["@media", "min-width", "display: grid"], 40),
    cssLesson("css-05-mobile-first", ["Approche mobile-first", "Mobile-first approach"], "Definis une colonne par defaut puis passe a trois colonnes a partir de 700px.", ".panel {\n  /* mobile */\n}\n\n@media (min-width: 700px) {\n  .panel {\n    /* grand ecran */\n  }\n}", ".panel", ["display: grid", "grid-template-columns"], 40),
    cssLesson("css-05-motion", ["Micro-interaction", "Micro-interaction"], "Ajoute une transition et un etat hover sur les boutons.", ".toolbar button {\n  /* interaction ici */\n}", ".toolbar button", ["transition", ":hover", "transform"], 35),
    cssLesson("css-05-reduced-motion", ["Motion responsable", "Responsible motion"], "Ajoute une media query prefers-reduced-motion qui desactive les transitions.", "@media (prefers-reduced-motion: reduce) {\n  /* stop motion */\n}", "@media", ["prefers-reduced-motion", "transition: none"], 35),
    projectLesson({
      id: "css-06-final-project",
      title: ["Projet landing responsive", "Responsive landing project"],
      brief: ["Cree les regles CSS essentielles d'une landing avec grille, cartes, hover et responsive.", "Create the essential CSS rules for a landing with grid, cards, hover, and responsive behavior."],
      starterCode: ".panel {\n}\n.card {\n}\n.toolbar button {\n}\n",
      solution: ".panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 18px;\n}\n.card {\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);\n}\n.toolbar button {\n  transition: transform .2s ease;\n}\n.toolbar button:hover {\n  transform: translateY(-3px);\n}",
      tests: [test("contains", "grid", "display: grid"), test("contains", "responsive columns", "auto-fit"), test("contains", "card padding", "padding"), test("contains", "hover", ":hover"), test("contains", "transition", "transition")],
      xp: 90
    })
  ]),
  module("css-advanced-responsive", "Responsive avance", "Advanced responsive", [
    cssLesson("css-07-fluid-type", ["Typographie fluide", "Fluid typography"], "Utilise clamp() pour faire grandir le texte sans casser les petits ecrans.", ".demo-surface {\n  /* echelle fluide */\n}", ".demo-surface", ["font-size", "clamp("], 40),
    cssLesson("css-07-fluid-spacing", ["Espacements fluides", "Fluid spacing"], "Cree un rythme d'espacement avec une variable --space qui utilise clamp().", ":root {\n  /* variable fluide */\n}\n\n.card {\n  /* espace fluide */\n}", ":root", ["--space", "clamp(", "padding: var(--space)"], 40),
    cssLesson("css-07-responsive-images", ["Images adaptatives", "Responsive images"], "Empeche les medias de deborder avec max-width, aspect-ratio et object-fit.", ".card img {\n  /* image robuste */\n}", ".card img", ["max-width", "aspect-ratio", "object-fit"], 45),
    cssLesson("css-07-container-queries", ["Container queries", "Container queries"], "Adapte une carte selon la largeur de son conteneur, pas selon toute la fenetre.", ".card {\n  /* prepare le conteneur */\n}\n\n/* container query ici */", ".card", ["container-type", "@container", "grid-template-columns"], 55),
    cssLesson("css-07-responsive-navigation", ["Navigation adaptative", "Adaptive navigation"], "Construis une navigation qui scrolle horizontalement sur petit ecran puis devient distribuee sur grand ecran.", ".toolbar {\n  /* base mobile */\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    /* grand ecran */\n  }\n}", ".toolbar", ["display: flex", "overflow-x", "@media", "justify-content"], 50),
    projectLesson({
      id: "css-07-responsive-audit-project",
      title: ["Projet : audit responsive complet", "Project: complete responsive audit"],
      brief: ["Renforce une interface pour qu'elle survive aux textes longs, images variables, petits ecrans, grands ecrans et conteneurs etroits.", "Strengthen an interface so it survives long text, variable images, small screens, large screens, and narrow containers."],
      starterCode: ":root {\n}\n\n.demo-surface {\n}\n\n.panel {\n}\n\n.card {\n}\n\n.card img {\n}\n\n.toolbar {\n}\n",
      solution: ":root {\n  --space: clamp(1rem, 2vw, 2rem);\n}\n\n.demo-surface {\n  width: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n  font-size: clamp(1rem, 0.7rem + 1vw, 1.25rem);\n}\n\n.panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: var(--space);\n}\n\n.card {\n  container-type: inline-size;\n  padding: var(--space);\n  overflow-wrap: anywhere;\n}\n\n.card img {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.toolbar {\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n}\n\n@container (min-width: 26rem) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n  }\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    justify-content: space-between;\n    overflow-x: visible;\n  }\n}",
      tests: [test("contains", "fluid type", "clamp("), test("contains", "responsive grid", "auto-fit"), test("contains", "container queries", "@container"), test("contains", "container setup", "container-type"), test("contains", "responsive media", "object-fit"), test("contains", "horizontal safety", "overflow-x"), test("contains", "large screen media query", "@media")],
      xp: 120
    })
  ])
];

export const cssTrackResponsiveChunk = createCssTrack(responsiveModules, ["responsive"]);
