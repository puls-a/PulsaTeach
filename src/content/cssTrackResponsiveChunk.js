import { cssModulesResponsive } from "./cssModulesResponsive.js";
import { createCssTrack } from "./cssTrackMetadata.js";

function module(id, fr, en, lessons) {
  const totalMinutes = lessons.reduce((sum, item) => sum + item.durationMin, 0);
  return {
    id,
    title: { fr, en },
    description: { fr: `Atelier responsive pratique : ${fr}.`, en: `Practical responsive workshop: ${en}.` },
    deliverable: { fr: `Un pattern ${fr} valide`, en: `A verified ${en} pattern` },
    importance: { fr: `${fr} évite les débordements et garde l'interface utilisable.`, en: `${en} prevents overflow and keeps the interface usable.` },
    prerequisites: { fr: ["Lire une règle CSS", "Comprendre mobile-first", "Tester plusieurs largeurs"], en: ["Read a CSS rule", "Understand mobile-first", "Test multiple widths"] },
    outcomes: { fr: ["Adapter une interface", "Proteger les contenus variables", "Respecter reduced motion"], en: ["Adapt an interface", "Protect variable content", "Respect reduced motion"] },
    vocabulary: ["media query", "container query", "clamp", "overflow"],
    mastery: { fr: ["Aucun débordement mobile", "Les grands écrans respirent", "Les animations restent responsables"], en: ["No mobile overflow", "Large screens breathe", "Animations remain responsible"] },
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
      fr: ["Le rendu tient sur mobile et desktop.", "Les contenus longs ne debordent pas.", "Les images et medias gardent des proportions stables.", "Les animations respectent les préférences utilisateur."],
      en: ["The output holds on mobile and desktop.", "Long content does not overflow.", "Images and media keep stable proportions.", "Animations respect user préférences."]
    },
    hint: { fr: "Commence mobile-first, puis ajoute les contraintes larges.", en: "Start mobile-first, then add wider constraints." },
    xp
  };
}

function quizLesson(id, title, focus, risk) {
  const explanation = { fr: `Une bonne réponse prouve ${focus[0]} sans créer ${risk[0]}.`, en: `A good answer proves ${focus[1]} without creating ${risk[1]}.` };
  const choices = [{ id: "proof", label: { fr: "Tester plusieurs largeurs et citer la règle active", en: "Test several widths and cite the active rule" } }, { id: "desktop", label: { fr: "Regarder seulement desktop", en: "Only check desktop" } }, { id: "fixed", label: { fr: "Forcer une largeur fixe", en: "Force à fixed width" } }];
  const prompt = { fr: `Quelle méthode valide ${focus[0]} ?`, en: `Which method validates ${focus[1]}?` };
  return {
    id,
    type: "quiz",
    title: { fr: title[0], en: title[1] },
    brief: { fr: `Revois ${focus[0]} comme un audit responsive.`, en: `Review ${focus[1]} as à responsive audit.` },
    course: courseFor({ fr: title[0], en: title[1] }, { fr: `Diagnostiquer ${focus[0]}.`, en: `Diagnose ${focus[1]}.` }, ".panel { width: min(100%, 72rem); }", ["@media", "clamp(", "overflow"], ".panel"),
    guide: guideFor({ fr: title[0], en: title[1] }, ".panel"),
    pedagogy: pedagogyFor({ fr: title[0], en: title[1] }, { fr: `Diagnostiquer ${focus[0]}.`, en: `Diagnose ${focus[1]}.` }, courseFor({ fr: title[0], en: title[1] }, { fr: `Diagnostiquer ${focus[0]}.`, en: `Diagnose ${focus[1]}.` }, ".panel { width: min(100%, 72rem); }", ["@media", "clamp(", "overflow"], ".panel"), guideFor({ fr: title[0], en: title[1] }, ".panel"), ".panel { width: min(100%, 72rem); }"),
    theory: { fr: `Diagnostiquer ${focus[0]}.`, en: `Diagnose ${focus[1]}.` },
    skills: ["css", "responsive", "quiz"],
    difficulty: "quiz",
    durationMin: 24,
    question: prompt,
    options: choices,
    answer: "proof",
    explanation,
    questions: [
      { id: `${id}-q1`, type: "single", prompt, choices, answer: "proof", explanation },
      { id: `${id}-q2`, type: "multiple", prompt: { fr: "Quelles preuves sont utiles ?", en: "Which evidence is useful?" }, choices: [{ id: "mobile", label: { fr: "375 px", en: "375 px" } }, { id: "desktop", label: { fr: "1024 px", en: "1024 px" } }, { id: "guess", label: { fr: "Capture unique", en: "Single screenshot" } }], answer: ["mobile", "desktop"], explanation },
      { id: `${id}-q3`, type: "true-false", prompt: { fr: "Vrai ou faux : un audit responsive doit tester du contenu long.", en: "True or false: à responsive audit should test long content." }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "true", explanation },
      { id: `${id}-q4`, type: "ordering", prompt: { fr: "Classe l'audit responsive.", en: "Order the responsive audit." }, choices: [{ id: "mobile", label: { fr: "Tester mobile", en: "Test mobile" } }, { id: "wide", label: { fr: "Tester grand écran", en: "Test wide screen" } }, { id: "content", label: { fr: "Allonger le contenu", en: "Lengthen content" } }, { id: "motion", label: { fr: "Verifier préférences", en: "Check préférences" } }], answer: ["mobile", "wide", "content", "motion"], explanation },
      { id: `${id}-q5`, type: "code-reading", prompt: { fr: ".panel { width: 1200px; } Quel risque vois-tu ?", en: ".panel { width: 1200px; } What risk do you see?" }, choices: [{ id: "risk", label: { fr: risk[0], en: risk[1] } }, { id: "ok", label: { fr: "Aucun risque", en: "No risk" } }, { id: "html", label: { fr: "Problème HTML uniquement", en: "HTML-only problem" } }], answer: "risk", explanation },
      { id: `${id}-q6`, type: "short-open", prompt: { fr: "Quelle preuve citerais-tu ?", en: "What evidence would you cite?" }, choices: [], answer: ["mobile", "desktop", "overflow", "devtools"], explanation }
    ],
    passingScore: 75,
    randomizeQuestions: false,
    feedbackMode: "immediate",
    starterCode: "",
    solution: "",
    tests: [test("quiz", "correct answer", "proof")],
    hint: { fr: "Cherche la preuve responsive, pas l'effet le plus voyant.", en: "Look for responsive evidence, not the flashiest effect." },
    xp: 35
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
  return `Complète ${title} by updating ${target} with ${checks.slice(0, 3).join(", ")} and verify the responsive result.`;
}

function courseFor(title, brief, solution, checks, target) {
  const vocabulary = [
    [target, "Zone ciblée pour garder l'exercice précis."],
    [checks[0] || "responsive", "Contrainte responsive à vérifier."],
    ["viewport", "Largeur disponible qui influence le rendu."]
  ];

  return {
    fr: {
      introduction: `${title.fr} rend l'interface plus robuste quand l'espace change.`,
      sections: [
        { title: "Objectif", paragraphs: [brief.fr, "Le responsive se prouve avec plusieurs largeurs, pas avec une capture unique."], example: solution.slice(0, 220) },
        { title: "Méthode", paragraphs: [`Travaille d'abord sur ${target}, puis elargis seulement si le rendu le justifié.`, "Une bonne règle responsive protege le contenu sans figer la mise en page."], example: checks.join(", ") },
        { title: "Validation", paragraphs: ["Teste petit écran, desktop et contenu long.", "Reduis les animations si l'utilisateur le demandé."], example: "375 px -> 768 px -> 1024 px" }
      ],
      vocabulary,
      check: ["Je teste à plusieurs largeurs.", "Je protege les contenus longs.", "Je peux expliquer le breakpoint."]
    },
    en: {
      introduction: `${title.en} makes the interface sturdier when space changes.`,
      sections: [
        { title: "Goal", paragraphs: [brief.en, "Responsive work is proven with multiple widths, not à single screenshot."], example: solution.slice(0, 220) },
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
      objectives: [`Comprendre ${title.fr}.`, `Modifier ${target} sans casser le mobile.`, "Verifier le résultat à plusieurs tailles."],
      prerequisites: ["Lire une media query", "Comprendre Flexbox/Grid de base", "Observer les débordements"],
      steps: ["Partir du rendu mobile", "Ajouter une contrainte responsive", "Tester mobile, tablette et desktop"],
      mistakes: [`Commencer ${title.fr} par desktop`, `Ignorer le contenu long dans ${target}`, `Forcer une animation pendant ${title.fr}`]
    },
    en: {
      objectives: [`Understand ${title.en}.`, `Modify ${target} without breaking mobile.`, "Verify the result at multiple sizes."],
      prerequisites: ["Read à media query", "Understand basic Flexbox/Grid", "Spot overflows"],
      steps: ["Start from mobile output", "Add à responsive constraint", "Test mobile, tablet, and desktop"],
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
      bad: { title: "Approche fragile", code: ".panel { width: 1200px; }", explanation: "Le code impose une largeur fixe et casse les petits écrans." }
    },
    guided: guide.steps,
    autonomous: `Refais ${title} a 375 px, 768 px et 1024 px, puis note la preuve obtenue.`,
    hints: ["Cherche le premier débordement.", "Ajoute une contrainte courte.", "Verifie aussi reduced motion quand il y à une animation."],
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
    cssLesson("css-05-responsive", ["Puzzle responsive", "Responsive puzzle"], "Ajoute une media query qui transforme .panel en grille à partir de 700px.", ".panel {\n  display: block;\n}\n\n/* media query ici */", "@media", ["@media", "min-width", "display: grid"], 40),
    cssLesson("css-05-mobile-first", ["Approche mobile-first", "Mobile-first approach"], "Definis une colonne par défaut puis passe à trois colonnes à partir de 700px.", ".panel {\n  /* mobile */\n}\n\n@media (min-width: 700px) {\n  .panel {\n    /* grand écran */\n  }\n}", ".panel", ["display: grid", "grid-template-columns"], 40),
    cssLesson("css-05-motion", ["Micro-interaction", "Micro-interaction"], "Ajoute une transition et un état hover sur les boutons.", ".toolbar button {\n  /* interaction ici */\n}", ".toolbar button", ["transition", ":hover", "transform"], 35),
    cssLesson("css-05-reduced-motion", ["Motion responsable", "Responsible motion"], "Ajoute une media query prefers-reduced-motion qui desactive les transitions.", "@media (prefers-reduced-motion: reduce) {\n  /* stop motion */\n}", "@media", ["prefers-reduced-motion", "transition: none"], 35),
    quizLesson("css-05-responsive-motion-quiz", ["Quiz responsive et motion", "Responsive and motion quiz"], ["une interface adaptable et confortable", "an adaptable comfortable interface"], ["débordement, mouvement force ou breakpoint arbitraire", "overflow, forced motion, or arbitrary breakpoint"]),
    projectLesson({
      id: "css-06-final-project",
      title: ["Projet landing responsive", "Responsive landing project"],
      brief: ["Crée les règles CSS essentielles d'une landing avec grille, cartes, hover et responsive.", "Create the essential CSS rules for à landing with grid, cards, hover, and responsive behavior."],
      starterCode: ".panel {\n}\n.card {\n}\n.toolbar button {\n}\n",
      solution: ".panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 18px;\n}\n.card {\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);\n}\n.toolbar button {\n  transition: transform .2s ease;\n}\n.toolbar button:hover {\n  transform: translateY(-3px);\n}",
      tests: [test("contains", "grid", "display: grid"), test("contains", "responsive columns", "auto-fit"), test("contains", "card padding", "padding"), test("contains", "hover", ":hover"), test("contains", "transition", "transition")],
      xp: 90
    })
  ]),
  module("css-advanced-responsive", "Responsive avance", "Advanced responsive", [
    cssLesson("css-07-fluid-type", ["Typographie fluide", "Fluid typography"], "Utilise clamp() pour faire grandir le texte sans casser les petits écrans.", ".demo-surface {\n  /* echelle fluide */\n}", ".demo-surface", ["font-size", "clamp("], 40),
    cssLesson("css-07-fluid-spacing", ["Espacements fluides", "Fluid spacing"], "Crée un rythme d'espacement avec une variable --space qui utilise clamp().", ":root {\n  /* variable fluide */\n}\n\n.card {\n  /* espace fluide */\n}", ":root", ["--space", "clamp(", "padding: var(--space)"], 40),
    cssLesson("css-07-responsive-images", ["Images adaptatives", "Responsive images"], "Empeche les medias de deborder avec max-width, aspect-ratio et object-fit.", ".card img {\n  /* image robuste */\n}", ".card img", ["max-width", "aspect-ratio", "object-fit"], 45),
    cssLesson("css-07-container-queries", ["Container queries", "Container queries"], "Adapte une carte selon la largeur de son conteneur, pas selon toute la fenetre.", ".card {\n  /* prépare le conteneur */\n}\n\n/* container query ici */", ".card", ["container-type", "@container", "grid-template-columns"], 55),
    cssLesson("css-07-responsive-navigation", ["Navigation adaptative", "Adaptive navigation"], "Construis une navigation qui scrolle horizontalement sur petit écran puis devient distribuee sur grand écran.", ".toolbar {\n  /* base mobile */\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    /* grand écran */\n  }\n}", ".toolbar", ["display: flex", "overflow-x", "@media", "justify-content"], 50),
    quizLesson("css-07-advanced-responsive-quiz", ["Quiz responsive avance", "Advanced responsive quiz"], ["un audit responsive complet", "a complète responsive audit"], ["layout rigide, media deformant ou conteneur ignore", "rigid layout, distorted media, or ignored container" ]),
    projectLesson({
      id: "css-07-responsive-audit-project",
      title: ["Projet : audit responsive complet", "Project: complète responsive audit"],
      brief: ["Renforce une interface pour qu'elle survive aux textes longs, images variables, petits écrans, grands écrans et conteneurs etroits.", "Strengthen an interface so it survives long text, variable images, small screens, large screens, and narrow containers."],
      starterCode: ":root {\n}\n\n.demo-surface {\n}\n\n.panel {\n}\n\n.card {\n}\n\n.card img {\n}\n\n.toolbar {\n}\n",
      solution: ":root {\n  --space: clamp(1rem, 2vw, 2rem);\n}\n\n.demo-surface {\n  width: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n  font-size: clamp(1rem, 0.7rem + 1vw, 1.25rem);\n}\n\n.panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: var(--space);\n}\n\n.card {\n  container-type: inline-size;\n  padding: var(--space);\n  overflow-wrap: anywhere;\n}\n\n.card img {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.toolbar {\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n}\n\n@container (min-width: 26rem) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n  }\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    justify-content: space-between;\n    overflow-x: visible;\n  }\n}",
      tests: [test("contains", "fluid type", "clamp("), test("contains", "responsive grid", "auto-fit"), test("contains", "container queries", "@container"), test("contains", "container setup", "container-type"), test("contains", "responsive media", "object-fit"), test("contains", "horizontal safety", "overflow-x"), test("contains", "large screen media query", "@media")],
      xp: 120
    })
  ])
];

export const cssTrackResponsiveChunk = createCssTrack(responsiveModules, ["responsive"]);
