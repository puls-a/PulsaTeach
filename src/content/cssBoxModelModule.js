const T = (fr, en) => ({ fr, en });

const scaffold = `.session-copy {
  margin: 0;
}

.session-code {
  font-family: ui-monospace, monospace;
}`;

const steps = [
  { id: "css-02-box-model", selector: ".session-card", property: "box-sizing", value: "border-box", title: T("1. Stabiliser la boîte", "1. Stabilize the box"), brief: T("Inclus padding et bordure dans la taille calculée de chaque carte.", "Include padding and border in each card's computed size."), rule: ".session-card {\n  box-sizing: border-box;\n}", example: ".slot { box-sizing: border-box; }" },
  { id: "css-02-typography", selector: ".session-copy", property: "line-height", value: "1.65", title: T("2. Aérer le texte courant", "2. Space body copy"), brief: T("Applique un interligne sans unité au texte descriptif sans agrandir les titres.", "Apply unitless line height to descriptive copy without enlarging headings."), rule: ".session-copy {\n  line-height: 1.65;\n}", example: ".slot__summary { line-height: 1.6; }" },
  { id: "css-02-custom-properties", selector: ":root", property: "--session-space", value: "1.25rem", title: T("3. Nommer l'espace partagé", "3. Name shared spacing"), brief: T("Déclare un token d'espace réutilisable pour les cartes de session.", "Declare a reusable spacing token for session cards."), rule: ":root {\n  --session-space: 1.25rem;\n}", example: ":root { --slot-space: 1rem; }" },
  { id: "css-02-sizing", selector: ".session-card", property: "inline-size", value: "min(100%, 42rem)", title: T("4. Borner la taille logique", "4. Bound logical size"), brief: T("Laisse la carte remplir sa piste sans dépasser une mesure confortable.", "Let the card fill its track without exceeding a comfortable measure."), rule: ".session-card {\n  inline-size: min(100%, 42rem);\n}", example: ".slot { inline-size: min(100%, 38rem); }" },
  { id: "css-02-overflow", selector: ".session-code", property: "overflow-wrap", value: "anywhere", title: T("5. Préserver les identifiants longs", "5. Preserve long identifiers"), brief: T("Autorise la coupure d'un identifiant sans masquer ni tronquer son contenu.", "Allow an identifier to wrap without hiding or truncating its content."), rule: ".session-code {\n  overflow-wrap: anywhere;\n}", example: ".slot__code { overflow-wrap: anywhere; }" },
  { id: "css-02-logical-padding", selector: ".session-card", property: "padding-inline", value: "var(--session-space)", title: T("6. Appliquer l'espace logiquement", "6. Apply spacing logically"), brief: T("Réutilise le token sur l'axe inline plutôt qu'une direction physique.", "Reuse the token on the inline axis instead of a physical direction."), rule: ".session-card {\n  padding-inline: var(--session-space);\n}", example: ".slot { padding-inline: var(--slot-space); }" },
  { id: "css-02-min-inline-size", selector: ".session-card", property: "min-inline-size", value: "0", title: T("7. Autoriser la piste à rétrécir", "7. Let the track shrink"), brief: T("Annule la taille minimale intrinsèque qui peut forcer une carte hors de sa piste Grid.", "Reset the intrinsic minimum that can force a card outside its Grid track."), rule: ".session-card {\n  min-inline-size: 0;\n}", example: ".slot { min-inline-size: 0; }" },
  { id: "css-02-radius", selector: ".session-card", property: "border-radius", value: "1.5rem", title: T("8. Unifier la silhouette", "8. Unify the silhouette"), brief: T("Termine la boîte avec un rayon partagé sans modifier sa taille interne.", "Finish the box with a shared radius without changing its inner size."), rule: ".session-card {\n  border-radius: 1.5rem;\n}", example: ".slot { border-radius: 1.25rem; }" }
];

export function createBoxModelModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const projectStarter = buildBoxModelModuleBase(baseCss);
  let current = projectStarter;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(projectStarter, current, createPedagogy));
  return {
    id: "css-box-model", title: T("Box model avancé", title[1]),
    description: T("Transforme les cartes de session en boîtes logiques, fluides et résistantes au contenu extrême.", "Turn session cards into logical, fluid boxes that withstand extreme content."),
    deliverable: T("Un système de cartes dimensionné par tokens sans débordement ni masquage.", "A token-sized card system without overflow or hiding."),
    importance: T("Après les sélecteurs, la géométrie doit résister aux pistes étroites, aux langues et aux identifiants réels.", "After selectors, geometry must withstand narrow tracks, languages, and real identifiers."),
    prerequisites: T(["Avoir terminé CSS 05", "Lire le box model et les axes logiques"], ["Complete CSS 05", "Read the box model and logical axes"]),
    outcomes: T(["Stabiliser une boîte dans Grid", "Partager une dimension avec un token", "Préserver texte et identifiants extrêmes"], ["Stabilize a box in Grid", "Share a dimension with a token", "Preserve copy and extreme identifiers"]),
    vocabulary: ["border-box", "line-height", "custom property", "inline-size", "overflow-wrap", "padding-inline", "min-inline-size"],
    mastery: T(["La carte reste dans sa piste à 375 px", "Le contenu long reste intégralement visible", "Les dimensions suivent les axes logiques"], ["The card stays in its track at 375px", "Long content remains fully visible", "Sizing follows logical axes"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildBoxModelModuleBase(baseCss) {
  return `${baseCss}\n\n${scaffold}`;
}

export function buildBoxModelModuleCss(baseCss) {
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, buildBoxModelModuleBase(baseCss));
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », corriger la taille avec overflow hidden.`, `For “${step.title.en},” fixing size with overflow hidden.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-box-model", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Inspecte ${step.selector}, puis ajoute ${step.property}: ${step.value}.`, `Inspect ${step.selector}, then add ${step.property}: ${step.value}.`), xp: 40 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview conserve une carte partenaire et un identifiant sans espace pour révéler les effets de bord.`, sections: [{ title: "Géométrie", paragraphs: ["Distingue contenu, padding et bordure avant de modifier une dimension.", "Les propriétés logiques suivent le mode d'écriture plutôt qu'une direction physique."], example: step.example }, { title: "Contenu réel", paragraphs: ["Teste la carte dans une piste étroite sans raccourcir le texte.", "Traite la cause du débordement sans masquer l'information."], example: ".slot__code { overflow-wrap: anywhere; }" }, { title: "Preuve", paragraphs: ["Inspecte taille calculée, padding et valeur héritée du token.", "Compare 375 px et desktop en conservant Grid, portée et focus."], example: "DevTools > Computed > Box model" }], vocabulary: [[step.property, `Propriété travaillée avec ${step.value}.`], ["axe inline", "Axe de lecture du contenu."], ["taille intrinsèque", "Taille minimale suggérée par le contenu."]], check: ["Je localise la zone de boîte.", "Je conserve les acquis précédents.", "Je vérifie contenu extrême et petite largeur."] },
    en: { introduction: `${introduction.en} The preview keeps a partner card and an unbroken identifier to expose side effects.`, sections: [{ title: "Geometry", paragraphs: ["Distinguish content, padding, and border before changing a dimension.", "Logical properties follow writing mode rather than a physical direction."], example: step.example }, { title: "Real content", paragraphs: ["Test the card in a narrow track without shortening text.", "Address the overflow cause without hiding information."], example: ".slot__code { overflow-wrap: anywhere; }" }, { title: "Evidence", paragraphs: ["Inspect computed size, padding, and the token's inherited value.", "Compare 375px and desktop while preserving Grid, scope, and focus."], example: "DevTools > Computed > Box model" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["inline axis", "The content's reading axis."], ["intrinsic size", "Minimum size suggested by content."]], check: ["I locate the box area.", "I preserve previous outcomes.", "I verify extreme content and narrow width."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 05.", "Prouver cible, valeur et absence de débordement."], prerequisites: ["Lire la carte de session.", "Inspecter les valeurs calculées.", "Comparer mobile et desktop."], steps: ["Reproduire la contrainte réelle.", "Ajouter une déclaration minimale.", "Inspecter boîte, contenu et contre-exemple."], mistakes: [primaryMistake.fr, "Utiliser une largeur fixe supérieure au viewport.", "Supprimer Grid ou le focus pour faire passer le rendu."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 05 decisions.", "Prove target, value, and absence of overflow."], prerequisites: ["Read the session card.", "Inspect computed values.", "Compare mobile and desktop."], steps: ["Reproduce the real constraint.", "Add one minimal declaration.", "Inspect box, content, and counterexample."], mistakes: [primaryMistake.en, "Using a fixed width larger than the viewport.", "Removing Grid or focus to make the output pass."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve la grille certifiée", "Preserve the certified grid"), value: { selector: ".gallery", property: "display", value: "grid" } },
    { type: "cssDeclaration", label: T("Conserve la portée de la bordure", "Preserve border scope"), value: { selector: ".session-list .session-card", property: "border-color", value: "#818cf8" } },
    { type: "cssDeclaration", label: T("Conserve le focus clavier", "Preserve keyboard focus"), value: { selector: ".session-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    ...acquiredSteps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} utilise la cible exacte`, `${step.property} uses the exact target`), value: { selector: step.selector, property: step.property, value: step.value } })),
    { type: "notContains", label: T("Ne masque pas le débordement", "Do not hide overflow"), value: "overflow: hidden" },
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Boîtes robustes</p><h1>Dimensions logiques</h1><div class="toolbar"><strong>Sessions publiées</strong><button class="session-filter" type="button">Filtrer</button></div></section><section class="gallery session-list" aria-label="Sessions PulsaConf"><article class="gallery__card session-card session-card--featured" data-level="advanced"><h2 class="session-title">Contenu extrême</h2><div class="session-meta"><span class="session-title">Niveau avancé</span></div><p class="session-note session-copy">Cette description conserve une mesure lisible dans une piste étroite.</p><p class="session-code">pulsaconf-session-css-box-model-identifiant-sans-espace-2026</p><a class="session-action" href="#details">Voir la session</a></article><article class="gallery__card session-card" data-level="beginner"><h2 class="session-title">Carte voisine</h2><p class="session-note session-copy">Elle partage le système de boîte sans perdre son contenu.</p><a class="session-action" href="#details">Voir la session</a></article><aside class="gallery__card sponsor-card"><h2>Partenaire</h2><p>Ce composant reste hors du système de sessions.</p></aside></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Robust boxes</p><h1>Logical sizing</h1><div class="toolbar"><strong>Published sessions</strong><button class="session-filter" type="button">Filter</button></div></section><section class="gallery session-list" aria-label="PulsaConf sessions"><article class="gallery__card session-card session-card--featured" data-level="advanced"><h2 class="session-title">Extreme content</h2><div class="session-meta"><span class="session-title">Advanced level</span></div><p class="session-note session-copy">This description keeps a readable measure inside a narrow track.</p><p class="session-code">pulsaconf-session-css-box-model-unbroken-identifier-2026</p><a class="session-action" href="#details">View session</a></article><article class="gallery__card session-card" data-level="beginner"><h2 class="session-title">Neighboring card</h2><p class="session-note session-copy">It shares the box system without losing content.</p><a class="session-action" href="#details">View session</a></article><aside class="gallery__card sponsor-card"><h2>Partner</h2><p>This component stays outside the session system.</p></aside></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique taille, axe logique, token et contenu extrême.", "Diagnose size, logical axis, token, and extreme content.");
  const course = courseFor(steps.at(-1), T("Le quiz relie chaque symptôme à la zone exacte de la boîte.", "The quiz connects each symptom to the exact box area."));
  const guide = guideFor(steps.at(-1), T("Répondre au quiz en cachant le contenu qui dépasse.", "Answering the quiz by hiding overflowing content."));
  const explanation = T("La réponse conserve l'information et stabilise la boîte sur son axe logique.", "The answer preserves information and stabilizes the box on its logical axis.");
  const questions = [
    { id: "css-02-box-model-quiz-single", type: "single", prompt: T("Quelle valeur inclut padding et bordure dans la taille déclarée ?", "Which value includes padding and border in the declared size?"), choices: choices(["border", "border-box"], ["content", "content-box"], ["hidden", "overflow: hidden"]), answer: "border", explanation },
    { id: "css-02-box-model-quiz-multiple", type: "multiple", prompt: T("Quelles décisions protègent une carte dans une piste étroite ?", "Which decisions protect a card in a narrow track?"), choices: choices(["min", "min-inline-size: 0"], ["wrap", "overflow-wrap: anywhere"], ["hide", "overflow: hidden"]), answer: ["min", "wrap"], explanation },
    { id: "css-02-box-model-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : padding-inline suit l'axe de lecture.", "True or false: padding-inline follows the reading axis."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "true", explanation },
    { id: "css-02-box-model-quiz-order", type: "ordering", prompt: T("Ordonne un diagnostic de débordement.", "Order an overflow diagnosis."), choices: choices(["reproduce", T("Reproduire le contenu", "Reproduce the content")], ["inspect", T("Inspecter la taille calculée", "Inspect computed size")], ["fix", T("Corriger la cause", "Fix the cause")], ["verify", T("Comparer mobile et desktop", "Compare mobile and desktop")]), answer: ["reproduce", "inspect", "fix", "verify"], explanation },
    { id: "css-02-box-model-quiz-code", type: "code-reading", prompt: T("Quel outil centralise 1.25rem pour plusieurs cartes ?", "Which tool centralizes 1.25rem for several cards?"), choices: choices(["token", "--session-space"], ["repeat", "1.25rem répété"], ["important", "!important"]), answer: "token", explanation },
    { id: "css-02-box-model-quiz-open", type: "short-open", prompt: T("Nomme les deux preuves qu'un identifiant long reste robuste.", "Name the two proofs that a long identifier remains robust."), choices: [], answer: T(["visible", "sans débordement"], ["visible", "no overflow"]), keywords: ["visible", "overflow"], explanation }
  ];
  return { id: "css-02-box-model-quiz", type: "quiz", title: T("Quiz Box model avancé", "Advanced box model quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Box model", "Box model quiz"), brief, type: "quiz" }), skills: ["css-box-model"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "border" }], xp: 70, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre le système de boîtes sans perdre Grid, portée ni focus.", "Ship the box system without losing Grid, scope, or focus.");
  const course = courseFor(steps.at(-1), T("Le projet assemble les huit décisions sur deux cartes et un contenu extrême.", "The project combines all eight decisions across two cards and extreme content."));
  const guide = guideFor(steps.at(-1), T("Livrer le projet après avoir contrôlé seulement la carte principale sur desktop.", "Shipping the project after checking only the main card on desktop."));
  return { id: "css-02-box-model-project", type: "project", title: T("Projet : boîtes robustes", "Project: robust boxes"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Projet Box model", "Box model project"), brief, solution: ".slot { min-inline-size: 0; }", type: "project" }), skills: ["css-box-model", "logical-properties", "intrinsic-sizing"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les huit déclarations ciblent la bonne boîte ou le bon contenu.", "Grid, sélecteurs et focus restent actifs.", "L'identifiant complet reste visible à 375 px.", "La carte partenaire reste hors de la portée session."], ["All eight declarations target the correct box or content.", "Grid, selectors, and focus remain active.", "The full identifier stays visible at 375px.", "The partner card remains outside session scope."]), hint: T("Pars du projet sélecteurs et traite taille, texte, token puis axes logiques.", "Start from the selector project and address size, copy, token, then logical axes."), xp: 115 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
