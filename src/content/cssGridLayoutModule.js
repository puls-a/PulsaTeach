const T = (fr, en) => ({ fr, en });

const scaffold = `.gallery {
  min-height: 32rem;
}

.gallery__card {
  min-width: 0;
  padding: 1rem;
  overflow-wrap: anywhere;
  background: #f8fafc;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
}`;

const steps = [
  { slug: "display-grid", property: "display", value: "grid", title: T("1. Activer une grille bidimensionnelle", "1. Enable a two-dimensional grid"), brief: T("Transforme la galerie en grille sans déplacer les cartes dans le HTML.", "Turn the gallery into a grid without moving cards in the HTML."), rule: ".gallery {\n  display: grid;\n}", example: ".schedule { display: grid; }" },
  { slug: "grid-template-columns", property: "grid-template-columns", value: "1fr 1fr", title: T("2. Définir deux pistes explicites", "2. Define two explicit tracks"), brief: T("Partage l'espace disponible entre deux colonnes égales pour observer les pistes.", "Share available space between two equal columns to observe tracks."), rule: ".gallery {\n  grid-template-columns: 1fr 1fr;\n}", example: ".schedule { grid-template-columns: 2fr 1fr; }" },
  { slug: "repeat", property: "grid-template-columns", value: "repeat(2, 1fr)", title: T("3. Répéter sans dupliquer", "3. Repeat without duplication"), brief: T("Exprime les deux pistes égales avec repeat afin de rendre l'intention explicite.", "Express the two equal tracks with repeat to make the intent explicit."), rule: ".gallery {\n  grid-template-columns: repeat(2, 1fr);\n}", example: ".schedule { grid-template-columns: repeat(4, 1fr); }" },
  { slug: "minmax", property: "grid-template-columns", value: "repeat(auto-fit, minmax(14rem, 1fr))", title: T("4. Adapter le nombre de pistes", "4. Adapt the track count"), brief: T("Laisse auto-fit créer seulement les colonnes qui tiennent, entre 14rem et une part de l'espace libre.", "Let auto-fit create only the columns that fit, between 14rem and one share of free space."), rule: ".gallery {\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n}", example: ".schedule { grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); }" },
  { slug: "gap", property: "gap", value: "1rem", title: T("5. Créer des gouttières régulières", "5. Create consistent gutters"), brief: T("Espace lignes et colonnes sans ajouter de marges aux cartes.", "Space rows and columns without adding margins to cards."), rule: ".gallery {\n  gap: 1rem;\n}", example: ".schedule { gap: 1.25rem; }" },
  { slug: "grid-auto-flow", property: "grid-auto-flow", value: "row", title: T("6. Préserver l'ordre de lecture", "6. Preserve reading order"), brief: T("Place les nouvelles cartes par ligne et évite dense, qui peut les remonter visuellement hors de l'ordre source.", "Place new cards by row and avoid dense, which can move them visually out of source order."), rule: ".gallery {\n  grid-auto-flow: row;\n}", example: ".schedule { grid-auto-flow: row; }" },
  { slug: "place-items", property: "place-items", value: "start stretch", title: T("7. Aligner les cartes dans leurs cellules", "7. Align cards within their cells"), brief: T("Aligne le contenu en haut tout en étirant chaque carte sur la largeur de sa piste.", "Align content at the top while stretching each card across its track."), rule: ".gallery {\n  place-items: start stretch;\n}", example: ".schedule { place-items: center stretch; }" },
  { slug: "align-content", property: "align-content", value: "start", title: T("8. Ancrer l'ensemble des pistes", "8. Anchor the track group"), brief: T("Place les rangées en haut lorsque le conteneur est plus haut que la grille.", "Place rows at the top when the container is taller than the grid."), rule: ".gallery {\n  align-content: start;\n}", example: ".schedule { align-content: center; }" }
];

export function createGridLayoutModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const projectStarter = `${baseCss}\n\n${scaffold}`;
  let current = projectStarter;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(projectStarter, current, createPedagogy));
  return {
    id: "css-grid-layout",
    title: T("Grid et compositions", title[1]),
    description: T("Compose une galerie PulsaConf dont les pistes s'adaptent au conteneur et au contenu réel.", "Compose a PulsaConf gallery whose tracks adapt to its container and real content."),
    deliverable: T("Une galerie responsive sans breakpoint ni réorganisation visuelle.", "A responsive gallery without a breakpoint or visual reordering."),
    importance: T("Grid coordonne lignes et colonnes ; des pistes rigides ou un remplissage dense peuvent provoquer débordement et ordre trompeur.", "Grid coordinates rows and columns; rigid tracks or dense packing can cause overflow and a misleading order."),
    prerequisites: T(["Avoir terminé CSS 03", "Distinguer ordre source et ordre visuel"], ["Complete CSS 03", "Distinguish source order from visual order"]),
    outcomes: T(["Construire des pistes explicites puis intrinsèques", "Dimensionner avec repeat, auto-fit et minmax", "Aligner sans altérer l'ordre de lecture"], ["Build explicit then intrinsic tracks", "Size with repeat, auto-fit, and minmax", "Align without altering reading order"]),
    vocabulary: ["grid track", "grid cell", "fr", "repeat", "minmax", "auto-fit", "gap", "grid-auto-flow"],
    mastery: T(["La galerie passe d'une à plusieurs colonnes selon l'espace", "Chaque carte garde son ordre source", "Le contenu extrême reste visible à 375 px"], ["The gallery moves from one to several columns as space allows", "Every card retains source order", "Extreme content remains visible at 375px"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step);
  const guide = guideFor(step);
  return {
    id: `css-grid-layout-${step.slug}`, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-grid-layout", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Inspecte les pistes de .gallery, puis ajoute ${step.property}: ${step.value}.`, `Inspect .gallery tracks, then add ${step.property}: ${step.value}.`), xp: 30 + order
  };
}

function courseFor(step) {
  return {
    fr: { introduction: `${step.brief.fr} La galerie PulsaConf contient cinq cartes de longueurs différentes dans un conteneur haut.`, sections: [{ title: "Pistes et cellules", paragraphs: ["Une piste est une ligne ou une colonne ; une cellule est leur intersection.", "Commence par la structure avant de régler l'alignement interne."], example: step.example }, { title: "Taille intrinsèque", paragraphs: ["Compare une largeur fixe avec auto-fit et minmax sans raccourcir les titres.", "À 375 px, une piste doit tenir sans masquer ni tronquer le contenu."], example: ".schedule { grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); }" }, { title: "Ordre robuste", paragraphs: ["Conserve l'ordre du DOM pour la lecture et le clavier.", "N'utilise pas dense pour combler un trou si cela déplace une carte avant une précédente."], example: ".schedule { grid-auto-flow: row; }" }], vocabulary: [[step.property, `Propriété travaillée avec la valeur ${step.value}.`], ["piste", "Ligne ou colonne qui structure la grille."], ["cellule", "Intersection d'une ligne et d'une colonne."]], check: ["Je distingue piste et cellule.", "Je conserve les règles cumulatives.", "Je vérifie largeur, contenu et ordre source."] },
    en: { introduction: `${step.brief.en} The PulsaConf gallery contains five cards of different lengths inside a tall container.`, sections: [{ title: "Tracks and cells", paragraphs: ["A track is a row or column; a cell is their intersection.", "Start with structure before adjusting internal alignment."], example: step.example }, { title: "Intrinsic sizing", paragraphs: ["Compare a fixed width with auto-fit and minmax without shortening headings.", "At 375px, one track must fit without hiding or truncating content."], example: ".schedule { grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); }" }, { title: "Robust order", paragraphs: ["Preserve DOM order for reading and keyboard input.", "Do not use dense to fill a gap if it moves a card before an earlier one."], example: ".schedule { grid-auto-flow: row; }" }], vocabulary: [[step.property, `Property practiced with the value ${step.value}.`], ["track", "A row or column that structures the grid."], ["cell", "The intersection of a row and a column."]], check: ["I distinguish a track from a cell.", "I preserve cumulative rules.", "I verify width, content, and source order."] }
  };
}

function guideFor(step) {
  return {
    fr: { objectives: [step.brief.fr, `Appliquer ${step.property} à la galerie exacte.`, "Conserver toutes les décisions CSS 00 à CSS 03."], prerequisites: ["Lire l'ordre des cartes dans le DOM.", "Identifier lignes, colonnes et espace libre.", "Comparer 375 px et desktop."], steps: ["Reproduire la contrainte dans la preview.", "Ajouter la déclaration minimale.", "Inspecter pistes, cellules et ordre de lecture."], mistakes: [`Pour « ${step.title.fr} », fixer une largeur de carte en pixels.`, "Utiliser dense pour obtenir une mosaïque plus compacte.", "Cacher le débordement au lieu de corriger les pistes."] },
    en: { objectives: [step.brief.en, `Apply ${step.property} to the exact gallery.`, "Preserve every CSS 00 through CSS 03 decision."], prerequisites: ["Read card order in the DOM.", "Identify rows, columns, and free space.", "Compare 375px and desktop."], steps: ["Reproduce the constraint in the preview.", "Add the minimal declaration.", "Inspect tracks, cells, and reading order."], mistakes: [`For “${step.title.en},” setting a card width in pixels.`, "Using dense to produce a more compact mosaic.", "Hiding overflow instead of fixing tracks."] }
  };
}

function testsFor(acquiredSteps) {
  const tests = [
    { type: "cssDeclaration", label: T("Conserve le box sizing certifié", "Preserve certified box sizing"), value: { selector: ".course-card", property: "box-sizing", value: "border-box" } },
    { type: "cssDeclaration", label: T("Conserve le conteneur Flexbox", "Preserve the Flexbox container"), value: { selector: ".toolbar", property: "display", value: "flex" } },
    { type: "cssMediaDeclaration", label: T("Conserve l'axe desktop de la barre", "Preserve the toolbar desktop axis"), value: { query: "(min-width: 48rem)", selector: ".toolbar", property: "flex-direction", value: "row" } }
  ];
  const latest = new Map(acquiredSteps.map((step) => [`${step.property}`, step]));
  for (const step of latest.values()) tests.push({ type: "cssDeclaration", label: T(`${step.property} cible la bonne valeur`, `${step.property} targets the correct value`), value: { selector: ".gallery", property: step.property, value: step.value } });
  tests.push({ type: "notContains", label: T("N'utilise ni dense ni important", "Use neither dense nor important"), value: "dense" });
  tests.push({ type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" });
  return tests;
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Programme</p><h1>Ateliers CSS</h1><div class="toolbar"><div class="toolbar__label"><strong>Parcours actif</strong><br><span>pulsaconf-grid-programme-identifiant-long</span></div><span class="toolbar__status">5 sessions</span><div class="toolbar__actions" role="group" aria-label="Actions du programme"><button class="action" type="button">Filtrer</button><button class="action" type="button">Imprimer</button></div></div></section><section class="gallery" aria-label="Sessions PulsaConf"><article class="gallery__card"><h2>Pistes explicites</h2><p>Comprendre lignes et colonnes.</p></article><article class="gallery__card"><h2>Dimensionnement intrinsèque</h2><p>Une description plus longue vérifie que les cartes absorbent leur contenu sans largeur figée.</p></article><article class="gallery__card"><h2>Ordre source</h2><p>Troisième session.</p></article><article class="gallery__card"><h2>Alignement</h2><p>Quatrième session.</p></article><article class="gallery__card"><h2>pulsaconf-grid-session-identifiant-extremement-long</h2><p>Cinquième session.</p></article></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Schedule</p><h1>CSS workshops</h1><div class="toolbar"><div class="toolbar__label"><strong>Active track</strong><br><span>pulsaconf-grid-schedule-long-identifier</span></div><span class="toolbar__status">5 sessions</span><div class="toolbar__actions" role="group" aria-label="Schedule actions"><button class="action" type="button">Filter</button><button class="action" type="button">Print</button></div></div></section><section class="gallery" aria-label="PulsaConf sessions"><article class="gallery__card"><h2>Explicit tracks</h2><p>Understand rows and columns.</p></article><article class="gallery__card"><h2>Intrinsic sizing</h2><p>A longer description verifies that cards absorb their content without a fixed width.</p></article><article class="gallery__card"><h2>Source order</h2><p>Third session.</p></article><article class="gallery__card"><h2>Alignment</h2><p>Fourth session.</p></article><article class="gallery__card"><h2>pulsaconf-grid-session-extremely-long-identifier</h2><p>Fifth session.</p></article></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique pistes, taille intrinsèque et ordre à partir d'une galerie réelle.", "Diagnose tracks, intrinsic sizing, and order from a real gallery.");
  const course = courseFor(steps[3]);
  const guide = guideFor(steps[3]);
  course.fr.introduction = "Ce quiz relie les symptômes d'une galerie aux pistes et à l'ordre source, plutôt qu'à des recettes de colonnes fixes.";
  course.en.introduction = "This quiz connects gallery symptoms to tracks and source order rather than fixed-column recipes.";
  guide.fr.mistakes = ["Pour le quiz Grid, choisir une propriété sans relire la contrainte d'espace.", "Confondre piste et carte.", "Ignorer l'ordre source lors du diagnostic."];
  guide.en.mistakes = ["For the Grid quiz, choosing a property without rereading the space constraint.", "Confusing a track with a card.", "Ignoring source order during diagnosis."];
  const explanation = T("La réponse relie une contrainte observable à la piste, la cellule ou l'ordre exact.", "The answer connects an observable constraint to the exact track, cell, or order.");
  const questions = [
    { id: "css-grid-layout-quiz-single", type: "single", prompt: T("Quel mot-clé crée seulement le nombre de pistes qui tient dans le conteneur ?", "Which keyword creates only the number of tracks that fit in the container?"), choices: choices(["fit", "auto-fit"], ["dense", "dense"], ["fixed", "3"]), answer: "fit", explanation },
    { id: "css-grid-layout-quiz-multiple", type: "multiple", prompt: T("Quelles preuves montrent que la galerie est robuste ?", "Which evidence shows that the gallery is robust?"), choices: choices(["widths", T("375 px et desktop", "375px and desktop")], ["order", T("Ordre source inchangé", "Unchanged source order")], ["crop", T("Titres tronqués", "Truncated headings")]), answer: ["widths", "order"], explanation },
    { id: "css-grid-layout-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : dense peut déplacer visuellement une carte avant une carte précédente.", "True or false: dense can visually move a card before an earlier card."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "true", explanation },
    { id: "css-grid-layout-quiz-order", type: "ordering", prompt: T("Ordonne le diagnostic d'une grille responsive.", "Order a responsive-grid diagnosis."), choices: choices(["source", T("Lire l'ordre source", "Read source order")], ["space", T("Mesurer l'espace disponible", "Measure available space")], ["tracks", T("Choisir les pistes", "Choose tracks")], ["extreme", T("Tester le contenu extrême", "Test extreme content")]), answer: ["source", "space", "tracks", "extreme"], explanation },
    { id: "css-grid-layout-quiz-code", type: "code-reading", prompt: T("Dans minmax(14rem, 1fr), que représente 1fr ?", "In minmax(14rem, 1fr), what does 1fr represent?"), choices: choices(["share", T("Une part de l'espace libre", "One share of free space")], ["pixel", T("Un pixel", "One pixel")], ["row", T("Une rangée", "One row")]), answer: "share", explanation },
    { id: "css-grid-layout-quiz-open", type: "short-open", prompt: T("Nomme les deux structures formées par lignes et colonnes.", "Name the two structures formed by rows and columns."), choices: [], answer: T(["pistes", "cellules"], ["tracks", "cells"]), keywords: ["tracks", "cells"], explanation }
  ];
  return { id: "css-grid-layout-quiz", type: "quiz", title: T("Quiz Grid et compositions", "Grid and compositions quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Grid", "Grid quiz"), brief, type: "quiz" }), skills: ["css-grid-layout"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "fit" }], xp: 62, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre la galerie responsive complète sans perdre les acquis CSS 00 à 03.", "Ship the complete responsive gallery without losing CSS 00 through 03 outcomes.");
  const course = courseFor(steps.at(-1));
  const guide = guideFor(steps.at(-1));
  course.fr.introduction = "Le lab assemble les huit décisions Grid sur la feuille certifiée de CSS 03 et exige une preuve mobile, desktop et d'ordre source.";
  course.en.introduction = "The lab combines all eight Grid decisions on the certified CSS 03 stylesheet and requires mobile, desktop, and source-order evidence.";
  guide.fr.mistakes = ["Repartir d'une feuille vide et perdre les acquis CSS 00 à 03.", "Utiliser dense pour remplir les trous.", "Raccourcir le contenu extrême pour faire passer le rendu."];
  guide.en.mistakes = ["Starting from an empty stylesheet and losing CSS 00 through 03 outcomes.", "Using dense to fill gaps.", "Shortening extreme content to make the output pass."];
  return { id: "css-grid-layout-lab", type: "project", title: T("Lab Grid et compositions", "Grid and compositions lab"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Lab Grid", "Grid lab"), brief, solution: ".schedule { display: grid; gap: 1rem; }", type: "project" }), skills: ["css-grid-layout", "intrinsic-layout", "accessibility"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les pistes passent de deux colonnes explicites à une composition intrinsèque.", "La galerie tient à 375 px sans tronquer les titres.", "Les cartes conservent leur ordre source et de lecture.", "Les acquis Flexbox restent actifs sans dense ni important."], ["Tracks progress from two explicit columns to an intrinsic composition.", "The gallery fits at 375px without truncating headings.", "Cards preserve source and reading order.", "Flexbox outcomes remain active without dense or important."]), hint: T("Pars du lab CSS 03, construis d'abord les pistes et termine par l'alignement du groupe.", "Start from the CSS 03 lab, build tracks first, and finish with group alignment."), xp: 105 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
