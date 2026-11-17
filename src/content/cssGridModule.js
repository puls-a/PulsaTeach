const T = (fr, en) => ({ fr, en });

const scaffold = `.programme-grid {
  display: grid;
  min-inline-size: 0;
}

.programme-grid > * {
  min-inline-size: 0;
}`;

const steps = [
  { id: "css-04-grid", selector: ".programme-grid", property: "grid-template-areas", value: '"intro intro" "sessions aside" "footer footer"', title: T("1. Décrire la composition", "1. Describe the composition"), brief: T("Nomme les zones de la page avant de placer les cartes dans la grille.", "Name the page regions before placing cards in the grid."), rule: ".programme-grid {\n  grid-template-areas: \"intro intro\" \"sessions aside\" \"footer footer\";\n}", example: ".dashboard { grid-template-areas: \"header header\" \"main aside\"; }" },
  { id: "css-04-template-columns", selector: ".programme-grid", property: "grid-template-columns", value: "minmax(0, 2fr) minmax(14rem, 1fr)", title: T("2. Donner une largeur utile aux zones", "2. Give regions useful widths"), brief: T("Réserve deux parts à la liste et une piste minimale stable au panneau latéral.", "Give the session list two shares and the sidebar a stable minimum track."), rule: ".programme-grid {\n  grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);\n}", example: ".dashboard { grid-template-columns: minmax(0, 3fr) minmax(12rem, 1fr); }" },
  { id: "css-04-place-intro", selector: ".programme-intro", property: "grid-area", value: "intro", title: T("3. Placer l'introduction nommée", "3. Place the named introduction"), brief: T("Relie la présentation à sa zone sans dépendre de sa position accidentelle dans le HTML.", "Connect the introduction to its region without relying on accidental HTML position."), rule: ".programme-intro {\n  grid-area: intro;\n}", example: ".dashboard__header { grid-area: header; }" },
  { id: "css-04-grid-gap", selector: ".session-list", property: "grid-area", value: "sessions", title: T("4. Placer la liste de sessions", "4. Place the session list"), brief: T("Ancre la galerie dans la zone sessions du plan explicite.", "Anchor the gallery in the sessions region of the explicit template."), rule: ".session-list {\n  grid-area: sessions;\n}", example: ".dashboard__main { grid-area: main; }" },
  { id: "css-04-place-aside", selector: ".programme-aside", property: "grid-area", value: "aside", title: T("5. Placer le panneau latéral", "5. Place the sidebar"), brief: T("Relie le filtre au panneau latéral sans changer l'ordre source des contenus.", "Connect the filter panel to the sidebar without changing content source order."), rule: ".programme-aside {\n  grid-area: aside;\n}", example: ".dashboard__aside { grid-area: aside; }" },
  { id: "css-04-grid-footer", selector: ".programme-footer", property: "grid-area", value: "footer", title: T("6. Étendre le pied de page", "6. Span the footer region"), brief: T("Place le résumé sous les deux colonnes en utilisant la zone déjà déclarée.", "Place the summary below both columns using the already-declared region."), rule: ".programme-footer {\n  grid-area: footer;\n}", example: ".dashboard__footer { grid-area: footer; }" },
  { id: "css-04-align-self", selector: ".programme-aside", property: "align-self", value: "start", title: T("7. Aligner un élément dans sa zone", "7. Align an item inside its area"), brief: T("Garde le filtre en haut de sa zone au lieu de l'étirer sur toute la hauteur de la rangée.", "Keep the filter at the top of its area instead of stretching it across the row height."), rule: ".programme-aside {\n  align-self: start;\n}", example: ".dashboard__aside { align-self: start; }" },
  { id: "css-04-responsive-areas", selector: ".programme-grid", property: "grid-template-areas", value: '"intro" "sessions" "aside" "footer"', media: { query: "(min-width: 24rem)", value: '"intro intro" "sessions aside" "footer footer"' }, title: T("8. Empiler les zones quand l'espace manque", "8. Stack regions when space is limited"), brief: T("Utilise une colonne sur petit écran puis rétablis le plan à deux colonnes quand la zone le permet.", "Use one column on narrow screens, then restore the two-column template when space allows."), rule: ".programme-grid {\n  grid-template-areas: \"intro\" \"sessions\" \"aside\" \"footer\";\n}\n\n@media (min-width: 24rem) {\n  .programme-grid {\n    grid-template-areas: \"intro intro\" \"sessions aside\" \"footer footer\";\n  }\n}", example: "@media (min-width: 32rem) { .dashboard { grid-template-areas: \"header header\" \"main aside\"; } }" }
];

export function createGridModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
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
    id: "css-grid", title: T("Grid : zones et placement", title[1]),
    description: T("Place les régions d'un programme PulsaConf avec des zones nommées, sans réordonner le contenu source.", "Place PulsaConf schedule regions with named areas without reordering source content."),
    deliverable: T("Une composition de zones nommées qui s'empile proprement sur mobile.", "A named-area composition that stacks cleanly on mobile."),
    importance: T("Après l'adaptation des pistes, les zones explicites rendent les mises en page éditoriales faciles à relire et à faire évoluer.", "After track sizing, explicit areas make editorial layouts easier to read and evolve."),
    prerequisites: T(["Avoir terminé Flexbox de navigation", "Distinguer piste, cellule et zone nommée"], ["Complete navigation Flexbox", "Distinguish track, cell, and named area"]),
    outcomes: T(["Décrire une composition avec grid-template-areas", "Placer et aligner des éléments sans changer le DOM", "Empiler le plan selon l'espace disponible"], ["Describe a composition with grid-template-areas", "Place and align items without changing the DOM", "Stack the template according to available space"]),
    vocabulary: ["named area", "grid-area", "grid-template-areas", "grid item", "align-self", "source order"],
    mastery: T(["Chaque élément occupe la zone annoncée", "L'ordre de lecture suit le DOM", "Le plan à une colonne évite tout débordement"], ["Every item occupies its announced region", "Reading order follows the DOM", "The one-column layout avoids overflow"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildGridModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n${scaffold}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », déplacer le contenu dans le HTML au lieu de nommer sa zone.`, `For “${step.title.en},” moving content in HTML instead of naming its grid area.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-grid", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Identifie la zone sémantique de ${step.selector}, puis ajoute ${step.property}: ${step.value}.`, `Identify the semantic area for ${step.selector}, then add ${step.property}: ${step.value}.`), xp: 48 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview conserve le même ordre DOM que l'ordre de lecture visé.`, sections: [{ title: "Plan nommé", paragraphs: ["Une zone nommée décrit une partie rectangulaire de la grille.", "Chaque chaîne de grid-template-areas représente une rangée et doit avoir le même nombre de cellules."], example: step.example }, { title: "Placement", paragraphs: ["grid-area relie un élément à une zone sans déplacer son nœud dans le document.", "Une zone répétée peut couvrir plusieurs pistes et align-self ajuste seulement l'élément choisi."], example: ".dashboard__footer { grid-area: footer; }" }, { title: "Responsive et ordre", paragraphs: ["Réduis la zone disponible avant d'empiler le plan.", "Vérifie que titres, liens et tabulation suivent toujours l'ordre du HTML."], example: "DevTools > Computed > Grid" }], vocabulary: [[step.property, `Propriété travaillée avec ${step.value}.`], ["zone nommée", "Région rectangulaire identifiée dans le template."], ["ordre source", "Ordre des éléments dans le document HTML."]], check: ["Je dessine les rangées du template.", "Je place chaque élément dans sa zone.", "Je compare rendu et ordre de lecture."] },
    en: { introduction: `${introduction.en} The preview keeps DOM order aligned with the intended reading order.`, sections: [{ title: "Named template", paragraphs: ["A named area describes a rectangular part of the grid.", "Each grid-template-areas string represents a row and must use the same number of cells."], example: step.example }, { title: "Placement", paragraphs: ["grid-area connects an item to an area without moving its document node.", "A repeated area can span tracks, and align-self adjusts only the selected item."], example: ".dashboard__footer { grid-area: footer; }" }, { title: "Responsive behavior and order", paragraphs: ["Reduce available space before stacking the template.", "Check that headings, links, and tab sequence still follow HTML order."], example: "DevTools > Computed > Grid" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["named area", "A rectangular region identified in the template."], ["source order", "The order of elements in the HTML document."]], check: ["I sketch the template rows.", "I place each item in its area.", "I compare output with reading order."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 07.", "Prouver placement, adaptation et ordre source."], prerequisites: ["Lire la structure du programme.", "Reconnaître lignes, colonnes et zones.", "Tester le clavier après le placement visuel."], steps: ["Nommer les régions nécessaires.", "Affecter chaque enfant direct à une zone.", "Vérifier desktop, mobile et tabulation."], mistakes: [primaryMistake.fr, "Écrire des rangées de longueurs différentes.", "Utiliser dense pour cacher les erreurs de placement."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 07 decisions.", "Prove placement, adaptation, and source order."], prerequisites: ["Read the schedule structure.", "Recognize rows, columns, and areas.", "Test keyboard navigation after visual placement."], steps: ["Name the required regions.", "Assign each direct child to an area.", "Verify desktop, mobile, and tab order."], mistakes: [primaryMistake.en, "Writing rows with different cell counts.", "Using dense to hide placement errors."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve les pistes adaptatives certifiées", "Preserve certified adaptive tracks"), value: { selector: ".gallery", property: "grid-template-columns", value: "repeat(auto-fit, minmax(14rem, 1fr))" } },
    { type: "cssDeclaration", label: T("Conserve la carte dans sa piste", "Keep cards inside their tracks"), value: { selector: ".gallery__card", property: "min-width", value: "0" } },
    { type: "cssDeclaration", label: T("Conserve l'axe de navigation", "Preserve the navigation axis"), value: { selector: ".site-nav", property: "display", value: "flex" } },
    { type: "cssDeclaration", label: T("La composition reste une grille", "The composition remains a grid"), value: { selector: ".programme-grid", property: "display", value: "grid" } },
    ...acquiredSteps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} utilise la bonne zone`, `${step.property} uses the intended area`), value: { selector: step.selector, property: step.property, value: step.value } })),
    ...acquiredSteps.filter((step) => step.media).map((step) => ({ type: "cssMediaDeclaration", label: T("Le plan desktop garde ses zones nommées", "Desktop template retains its named areas"), value: { query: step.media.query, selector: step.selector, property: step.property, value: step.media.value } })),
    { type: "notContains", label: T("N'utilise pas dense", "Do not use dense"), value: "dense" },
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Plan de session</p><h1>Un programme facile à parcourir</h1><nav class="site-nav" aria-label="Navigation du programme"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Sessions de la journée</span></div><span class="site-nav__status">5 sessions</span><div class="site-nav__actions"><a class="session-action action" href="#sessions">Sessions</a><a class="session-action action" href="#inscription">Réserver</a></div></nav></section><section class="programme-grid" aria-label="Programme PulsaConf"><header class="programme-intro"><h2>Ateliers de la journée</h2><p>Choisis une session selon ton parcours.</p></header><section class="session-list"><article class="gallery__card"><h3>Pistes explicites</h3><p>Comprendre lignes et colonnes.</p></article><article class="gallery__card"><h3>Placement nommé</h3><p>Une description plus longue vérifie la place réservée aux contenus réels.</p></article><article class="gallery__card"><h3>Ordre de lecture</h3><p>Les contenus gardent leur ordre source.</p></article><article class="gallery__card"><h3>Résumé</h3><p>Les ateliers restent faciles à parcourir.</p></article></section><aside class="programme-aside"><h2>Filtrer les sessions</h2><button class="action" type="button">Tous les ateliers</button></aside><footer class="programme-footer"><p>Programme PulsaConf · 2026</p></footer></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Session plan</p><h1>A schedule that is easy to scan</h1><nav class="site-nav" aria-label="Schedule navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Today's sessions</span></div><span class="site-nav__status">5 sessions</span><div class="site-nav__actions"><a class="session-action action" href="#sessions">Sessions</a><a class="session-action action" href="#booking">Book</a></div></nav></section><section class="programme-grid" aria-label="PulsaConf schedule"><header class="programme-intro"><h2>Today's workshops</h2><p>Choose a session for your learning path.</p></header><section class="session-list"><article class="gallery__card"><h3>Explicit tracks</h3><p>Understand rows and columns.</p></article><article class="gallery__card"><h3>Named placement</h3><p>A longer description checks the space reserved for real content.</p></article><article class="gallery__card"><h3>Reading order</h3><p>Content retains source order.</p></article><article class="gallery__card"><h3>Summary</h3><p>Workshops remain easy to scan.</p></article></section><aside class="programme-aside"><h2>Filter sessions</h2><button class="action" type="button">All workshops</button></aside><footer class="programme-footer"><p>PulsaConf schedule · 2026</p></footer></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique zones nommées, placement et ordre de lecture.", "Diagnose named areas, placement, and reading order.");
  const course = courseFor(steps[0], T("Le quiz vérifie comment une structure lisible devient un plan Grid explicite.", "The quiz checks how readable structure becomes an explicit Grid template."));
  const guide = guideFor(steps[0], T("Répondre avec une position visuelle sans vérifier l'ordre source.", "Answering with a visual position without checking source order."));
  const explanation = T("Les zones nommées rendent le plan explicite sans déplacer les contenus dans le DOM.", "Named areas make the layout explicit without moving content in the DOM.");
  const questions = [
    { id: "css-grid-quiz-single", type: "single", prompt: T("Quel caractère marque une cellule vide dans grid-template-areas ?", "Which character marks an empty cell in grid-template-areas?"), choices: choices(["dot", "."], ["dash", "-"], ["zero", "0"]), answer: "dot", explanation },
    { id: "css-grid-quiz-multiple", type: "multiple", prompt: T("Quelles règles rendent un template valide ?", "Which rules make an areas template valid?"), choices: choices(["rows", T("Chaque chaîne décrit une rangée", "Each string describes one row")], ["cells", T("Toutes les rangées ont le même nombre de cellules", "Every row has the same number of cells")], ["move", T("Déplacer les éléments dans le HTML pour l'apparence", "Move elements in HTML for appearance")]), answer: ["rows", "cells"], explanation },
    { id: "css-grid-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : grid-area change l'ordre des éléments dans le DOM.", "True or false: grid-area changes DOM order."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-grid-quiz-order", type: "ordering", prompt: T("Ordonne la construction d'un plan nommé.", "Order the construction of a named template."), choices: choices(["regions", T("Nommer les régions", "Name the regions")], ["rows", T("Dessiner les rangées", "Sketch the rows")], ["place", T("Placer les enfants", "Place the children")], ["verify", T("Vérifier mobile et ordre clavier", "Verify mobile and keyboard order")]), answer: ["regions", "rows", "place", "verify"], explanation },
    { id: "css-grid-quiz-code", type: "code-reading", prompt: T("Quel placement affecte un élément à la zone sessions ?", "Which placement assigns an item to the sessions area?"), choices: choices(["area", "grid-area: sessions"], ["dense", "grid-auto-flow: dense"], ["order", "order: 2"]), answer: "area", explanation },
    { id: "css-grid-quiz-open", type: "short-open", prompt: T("Nomme les deux preuves que le placement reste accessible.", "Name two proofs that placement remains accessible."), choices: [], answer: T(["ordre source", "clavier"], ["source order", "keyboard"]), keywords: ["source", "keyboard"], explanation }
  ];
  return { id: "css-grid-quiz", type: "quiz", title: T("Quiz Grid : zones et placement", "Grid areas and placement quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Grid", "Grid quiz"), brief, type: "quiz" }), skills: ["css-grid"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "dot" }], xp: 78, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre le programme complet avec zones nommées, repli mobile et ordre DOM conservé.", "Ship the complete schedule with named areas, mobile stacking, and preserved DOM order.");
  const course = courseFor(steps.at(-1), T("Le projet assemble les huit placements sur un programme complet et ses contenus réels.", "The project combines all eight placements across a complete schedule and real content."));
  const guide = guideFor(steps.at(-1), T("Déplacer les cartes dans le HTML pour obtenir les bonnes lignes visuelles.", "Moving cards in HTML to obtain the desired visual rows."));
  return { id: "css-04-grid-project", type: "project", title: T("Projet : programme en zones Grid", "Project: Grid-area schedule"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Projet Grid", "Grid project"), brief, solution: ".dashboard { display: grid; grid-template-areas: \"main aside\"; }", type: "project" }), skills: ["css-grid", "named-areas", "responsive-layout", "accessibility"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les zones correspondent aux noms déclarés.", "Le plan passe à une colonne dans une preview étroite.", "Ordre source et clavier suivent la structure HTML.", "Grid adaptatif, Flexbox et focus restent préservés."], ["Areas match the declared names.", "The template becomes one column in a narrow preview.", "Source and keyboard order follow HTML structure.", "Adaptive Grid, Flexbox, and focus remain intact."]), hint: T("Pars du projet Flexbox, nomme le plan puis affecte chaque région sans déplacer son HTML.", "Start from the Flexbox project, name the template, then assign each region without moving its HTML."), xp: 130 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
