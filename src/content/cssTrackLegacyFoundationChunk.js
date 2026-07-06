import { createCssTrack } from "./cssTrackMetadata.js";

function module(id, fr, en, lessons) {
  const totalMinutes = lessons.reduce((sum, item) => sum + item.durationMin, 0);
  return {
    id,
    title: { fr, en },
    description: { fr: `Fondations pratiques : ${fr}.`, en: `Practical foundations: ${en}.` },
    deliverable: { fr: `Un exercice ${fr} valide`, en: `A verified ${en} exercise` },
    importance: { fr: `${fr} sert de base aux interfaces fiables.`, en: `${en} is a base for reliable interfaces.` },
    prerequisites: { fr: ["Lire une regle CSS", "Identifier un selecteur", "Tester le rendu"], en: ["Read a CSS rule", "Identify a selector", "Test the output"] },
    outcomes: { fr: ["Appliquer une propriete", "Verifier un effet visible", "Eviter les effets de bord"], en: ["Apply a property", "Verify a visible effect", "Avoid side effects"] },
    vocabulary: ["selecteur", "declaration", "cascade", "responsive"],
    mastery: { fr: ["Le rendu est lisible", "Les tests passent", "Le code reste court"], en: ["The output is readable", "Tests pass", "The code stays short"] },
    lessons,
    totalMinutes
  };
}

function cssLesson(id, title, brief, starterCode, target, checks, xp) {
  const solution = cssSolution(target, checks);
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief, en: brief };
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
    durationMin: 25,
    starterCode,
    solution,
    previewHtml: previewHtml(),
    tests: [
      test("contains", "target selector", target),
      ...checks.map((check) => test("contains", check, proofFor(check)))
    ],
    hint: { fr: "Commence par le selecteur, puis ajoute les declarations attendues une par une.", en: "Start with the selector, then add the expected declarations one by one." },
    xp
  };
}

function quizLesson({ id, title, brief, question, options, answer, explanation, xp }) {
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief[0], en: brief[1] };
  const course = courseFor(titleObject, briefObject, "", [answer], ".demo");
  const guide = guideFor(titleObject, ".demo");
  const primaryQuestion = {
    id: `${id}-question-1`,
    type: "single",
    prompt: question,
    choices: options,
    answer,
    explanation,
    requiresRationale: false,
    points: 1
  };

  return {
    id,
    type: "quiz",
    title: titleObject,
    brief: briefObject,
    course,
    pedagogy: pedagogyFor(titleObject, briefObject, course, guide, ""),
    theory: briefObject,
    guide,
    skills: ["css", "quiz"],
    difficulty: "quiz",
    durationMin: 18,
    question,
    options,
    answer,
    explanation,
    questions: [primaryQuestion],
    passingScore: 70,
    randomizeQuestions: false,
    feedbackMode: "immediate",
    starterCode: "",
    solution: "",
    tests: [test("quiz", "correct answer", answer)],
    hint: { fr: "Cherche la reponse qui reste vraie dans un vrai projet.", en: "Look for the answer that stays true in a real project." },
    xp
  };
}

function projectLesson({ id, title, brief, starterCode, solution, tests, xp }) {
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief[0], en: brief[1] };
  const course = courseFor(titleObject, briefObject, solution, ["display: flex", "gap"], ".toolbar");
  const guide = guideFor(titleObject, ".toolbar");

  return {
    id,
    type: "project",
    title: titleObject,
    brief: briefObject,
    course,
    pedagogy: pedagogyFor(titleObject, briefObject, course, guide, solution),
    theory: briefObject,
    guide,
    skills: ["css", "project"],
    difficulty: "project",
    durationMin: 70,
    starterCode,
    solution,
    tests,
    rubric: {
      fr: ["Le layout utilise Flexbox clairement.", "Les espacements restent stables.", "Le code reste lisible et testable."],
      en: ["The layout uses Flexbox clearly.", "Spacing remains stable.", "The code stays readable and testable."]
    },
    hint: { fr: "Pose d'abord le layout, puis ajuste les espaces.", en: "Set the layout first, then adjust spacing." },
    xp
  };
}

function test(type, label, value, amount = 1) {
  return { type, label, value, amount };
}

function cssSolution(target, checks) {
  return `${target} {\n  ${checks.map((check) => declarationFor(check)).join("\n  ")}\n}`;
}

function declarationFor(check) {
  const map = {
    "background": "background: #eef2ff;",
    "border": "border: 1px solid #c7d2fe;",
    "border-radius": "border-radius: 1rem;",
    "outline": "outline: 3px solid #5546f6;",
    "outline-offset": "outline-offset: .25rem;",
    "padding": "padding: 1rem;",
    "box-shadow": "box-shadow: 0 1rem 2rem rgba(15, 23, 42, .12);",
    "font-size": "font-size: clamp(1rem, 2vw, 1.25rem);",
    "line-height": "line-height: 1.7;",
    "max-width": "max-width: 72rem;",
    "--accent": "--accent: #5546f6;",
    "background: var(--accent)": "background: var(--accent);",
    "width": "width: min(100%, 72rem);",
    "margin": "margin: 0 auto;",
    "overflow": "overflow: hidden;",
    "overflow-wrap": "overflow-wrap: anywhere;",
    "display: flex": "display: flex;",
    "gap": "gap: 1rem;",
    "align-items": "align-items: center;",
    "flex-wrap": "flex-wrap: wrap;",
    "justify-content: space-between": "justify-content: space-between;",
    "display: grid": "display: grid;",
    "repeat": "grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));",
    "minmax": "grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));",
    "grid-template-columns": "grid-template-columns: repeat(3, minmax(0, 1fr));",
    "place-items": "place-items: center;",
    "min-height": "min-height: 16rem;"
  };
  return map[check] || `${check}: initial;`;
}

function proofFor(check) {
  return declarationFor(check).split(":")[0].trim();
}

function courseFor(title, brief, solution, checks, target) {
  const vocabulary = [
    [target, "Selecteur cible de l'exercice."],
    [checks[0] || "CSS", "Declaration ou motif a verifier."],
    ["preuve", "Indice visible qui confirme que la regle fonctionne."]
  ];

  return {
    fr: {
      introduction: `${title.fr} transforme une intention CSS en resultat mesurable.`,
      sections: [
        { title: "Objectif", paragraphs: [brief.fr, "Travaille sur une regle courte pour garder le diagnostic simple."], example: solution.slice(0, 220) },
        { title: "Validation", paragraphs: ["Observe le rendu, puis lis le premier test en echec.", "Corrige une declaration a la fois."], example: checks.join(", ") }
      ],
      vocabulary,
      check: ["Je cible le bon selecteur.", "Je sais expliquer la declaration.", "Je valide avec les tests."]
    },
    en: {
      introduction: `${title.en} turns a CSS intent into a measurable result.`,
      sections: [
        { title: "Goal", paragraphs: [brief.en, "Work on a short rule so the diagnosis stays simple."], example: solution.slice(0, 220) },
        { title: "Validation", paragraphs: ["Inspect the preview, then read the first failing test.", "Fix one declaration at a time."], example: checks.join(", ") }
      ],
      vocabulary,
      check: ["I target the right selector.", "I can explain the declaration.", "I validate with tests."]
    }
  };
}

function guideFor(title, target) {
  return {
    fr: {
      objectives: [`Comprendre ${title.fr}.`, `Modifier uniquement ${target}.`, "Verifier le rendu et les tests."],
      prerequisites: ["Lire un selecteur CSS", "Identifier une declaration", "Comprendre le rendu de base"],
      steps: ["Reperer le selecteur", "Ajouter les declarations demandees", "Verifier preview et tests"],
      mistakes: ["Changer trop de zones", "Ignorer le focus", "Deviner sans regarder le rendu"]
    },
    en: {
      objectives: [`Understand ${title.en}.`, `Modify only ${target}.`, "Verify preview and tests."],
      prerequisites: ["Read a CSS selector", "Identify a declaration", "Understand the base output"],
      steps: ["Find the selector", "Add the requested declarations", "Verify preview and tests"],
      mistakes: ["Changing too many areas", "Ignoring focus", "Guessing without checking output"]
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
      good: { title: "Approche testable", code: solution, explanation: "Le code vise une intention precise et se verifie dans le rendu." },
      bad: { title: "Approche fragile", code: ".demo { color: red; }", explanation: "Le code change un detail sans prouver que la contrainte est respectee." }
    },
    guided: guide.steps,
    autonomous: `Refais ${title} sans solution, puis explique chaque test vert.`,
    hints: ["Lis le selecteur attendu.", "Ajoute une declaration a la fois.", "Compare toujours preview et tests."],
    correction: ["La solution cible la bonne zone.", "Chaque declaration repond a une contrainte.", "Le rendu reste lisible."],
    summary: course.introduction || brief,
    next: "Continue avec l'exercice suivant et garde la meme methode."
  };
}

function previewHtml() {
  return `<main class="demo-surface">
  <section class="panel">
    <article class="card course-card">HTML Quest</article>
    <article class="card course-card">CSS Lab</article>
    <article class="card course-card">JS Arena</article>
  </section>
  <div class="toolbar">
    <button>Run</button><button>Hint</button><button>Ship</button>
  </div>
  <div class="gallery"><span></span><span></span><span></span><span></span></div>
</main>`;
}

const legacyFoundationModules = [
  module("css-selectors", "Selecteurs", "Selectors", [
    cssLesson("css-01-selectors", ["Selector Quest", "Selector Quest"], "Cible uniquement les cartes de cours avec la classe .course-card.", ".course-card {\n  /* ecris ici */\n}", ".course-card", ["background", "border"], 25),
    cssLesson("css-01-combinators", ["Selecteur direct", "Direct selector"], "Cible seulement les boutons directement dans .toolbar avec le combinateur >.", ".toolbar > button {\n  /* style direct */\n}", ".toolbar > button", ["background", "border-radius"], 25),
    cssLesson("css-01-states", ["Etats interactifs", "Interactive states"], "Ajoute un etat :focus-visible clair aux boutons pour la navigation clavier.", ".toolbar button {\n  /* style de base */\n}\n\n.toolbar button:focus-visible {\n  /* focus ici */\n}", ".toolbar button:focus-visible", ["outline", "outline-offset"], 30),
    quizLesson({
      id: "css-01-specificity-quiz",
      title: ["Quiz specificite", "Specificity quiz"],
      brief: ["Choisis le selecteur le plus specifique.", "Choose the most specific selector."],
      question: { fr: "Quel selecteur gagne en priorite ?", en: "Which selector has the highest priority?" },
      options: [
        { id: "tag", label: { fr: "article", en: "article" } },
        { id: "class", label: { fr: ".course-card", en: ".course-card" } },
        { id: "id", label: { fr: "#featured-card", en: "#featured-card" } }
      ],
      answer: "id",
      explanation: { fr: "Un id est plus specifique qu'une classe ou qu'une balise.", en: "An id is more specific than a class or a tag." },
      xp: 15
    })
  ]),
  module("css-box-model", "Box model", "Box model", [
    cssLesson("css-02-box-model", ["Carte produit", "Product card"], "Transforme la carte en bloc lisible avec padding, border-radius et shadow.", ".card {\n  /* espace, coins, ombre */\n}", ".card", ["padding", "border-radius", "box-shadow"], 30),
    cssLesson("css-02-typography", ["Typographie lisible", "Readable typography"], "Ameliore la lisibilite avec font-size, line-height et max-width.", ".demo-surface {\n  /* typo ici */\n}", ".demo-surface", ["font-size", "line-height", "max-width"], 25),
    cssLesson("css-02-custom-properties", ["Variables CSS", "CSS variables"], "Declare une variable --accent puis utilise-la pour colorer les cartes.", ":root {\n  /* variable ici */\n}\n\n.card {\n  /* utilise la variable */\n}", ":root", ["--accent", "background: var(--accent)"], 35),
    cssLesson("css-02-sizing", ["Tailles fluides", "Fluid sizing"], "Donne a la surface une largeur fluide avec width, max-width et margin auto.", ".demo-surface {\n  /* largeur fluide */\n}", ".demo-surface", ["width", "max-width", "margin"], 30),
    cssLesson("css-02-overflow", ["Controler le debordement", "Control overflow"], "Empeche le contenu long de casser la carte avec overflow-wrap et overflow.", ".card {\n  /* protege le layout */\n}", ".card", ["overflow", "overflow-wrap"], 30)
  ]),
  module("css-flexbox", "Flexbox", "Flexbox", [
    cssLesson("css-03-flexbox", ["Flex Rescue", "Flex Rescue"], "Aligne les boutons sur une ligne avec display flex, gap et align-items.", ".toolbar {\n  /* flex ici */\n}", ".toolbar", ["display: flex", "gap", "align-items"], 35),
    cssLesson("css-03-flex-wrap", ["Wrap Lab", "Wrap Lab"], "Autorise les cartes a revenir a la ligne avec flex-wrap.", ".panel {\n  display: flex;\n  /* wrap ici */\n}", ".panel", ["display: flex", "flex-wrap", "gap"], 30),
    cssLesson("css-03-space-between", ["Navbar flex", "Navbar flex"], "Separe le logo et les actions avec justify-content: space-between.", ".toolbar {\n  display: flex;\n  /* distribution ici */\n}", ".toolbar", ["display: flex", "justify-content: space-between", "align-items"], 30),
    projectLesson({
      id: "css-03-mini-project-navbar",
      title: ["Mini-projet : navbar responsive", "Mini project: responsive navbar"],
      brief: ["Construis le CSS d'une navbar qui aligne, espace et replie correctement ses actions.", "Build CSS for a navbar that aligns, spaces, and wraps its actions correctly."],
      starterCode: ".toolbar {\n}\n\n.toolbar button {\n}\n",
      solution: ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.toolbar button {\n  padding: 12px 16px;\n  border-radius: 10px;\n}",
      tests: [test("contains", "flex layout", "display: flex"), test("contains", "vertical alignment", "align-items"), test("contains", "distributed space", "justify-content"), test("contains", "wrapping", "flex-wrap"), test("contains", "spacing", "gap")],
      xp: 70
    })
  ]),
  module("css-grid", "Grid", "Grid", [
    cssLesson("css-04-grid", ["Grid Builder", "Grid Builder"], "Cree une grille responsive avec display grid, repeat et minmax.", ".gallery {\n  /* grid ici */\n}", ".gallery", ["display: grid", "repeat", "minmax"], 35),
    cssLesson("css-04-grid-gap", ["Gallery spacing", "Gallery spacing"], "Ajoute un gap clair et une grille en trois colonnes.", ".gallery {\n  /* grille fixe */\n}", ".gallery", ["display: grid", "grid-template-columns", "gap"], 30),
    cssLesson("css-04-place-items", ["Centrage grid", "Grid centering"], "Centre les elements de la galerie avec place-items.", ".gallery {\n  display: grid;\n  /* centrage ici */\n}", ".gallery", ["display: grid", "place-items", "min-height"], 30)
  ])
];

export const cssTrackLegacyFoundationChunk = createCssTrack(legacyFoundationModules, ["foundation"]);
