const T = (fr, en) => ({ fr, en });

const scaffold = `.session-card {
  min-width: 0;
}

.session-card--archived {
  opacity: .62;
}`;

const steps = [
  { id: "css-01-selectors", selector: ".session-list .session-card", property: "border-color", value: "#818cf8", title: T("1. Limiter la portée au composant", "1. Limit scope to the component"), brief: T("Cible les cartes uniquement lorsqu'elles appartiennent à la liste de sessions.", "Target cards only when they belong to the session list."), rule: ".session-list .session-card {\n  border-color: #818cf8;\n}", example: ".schedule .slot { border-color: #94a3b8; }" },
  { id: "css-01-combinators", selector: ".session-card > .session-title", property: "font-size", value: "1.25rem", title: T("2. Distinguer un enfant direct", "2. Distinguish a direct child"), brief: T("Agrandis seulement le titre direct de la carte, pas un libellé imbriqué dans ses métadonnées.", "Enlarge only the card's direct title, not a nested label in its metadata."), rule: ".session-card > .session-title {\n  font-size: 1.25rem;\n}", example: ".slot > .slot__title { font-size: 1.125rem; }" },
  { id: "css-01-variant", selector: ".session-card.session-card--featured", property: "box-shadow", value: "0 12px 28px rgba(49, 46, 129, .16)", title: T("3. Composer une variante explicite", "3. Compose an explicit variant"), brief: T("Ajoute de la profondeur uniquement à la carte qui porte aussi la variante featured.", "Add depth only to the card that also carries the featured variant."), rule: ".session-card.session-card--featured {\n  box-shadow: 0 12px 28px rgba(49, 46, 129, .16);\n}", example: ".slot.slot--featured { box-shadow: 0 8px 20px rgba(15, 23, 42, .12); }" },
  { id: "css-01-attribute", selector: ".session-card[data-level=\"advanced\"]", property: "border-style", value: "dashed", title: T("4. Cibler une donnée déclarée", "4. Target declared data"), brief: T("Distingue les sessions avancées grâce à leur attribut data-level sans ajouter une classe visuelle.", "Distinguish advanced sessions through their data-level attribute without adding a visual class."), rule: ".session-card[data-level=\"advanced\"] {\n  border-style: dashed;\n}", example: ".slot[data-status=\"full\"] { border-style: dashed; }" },
  { id: "css-01-grouping", selector: ":is(.session-action, .session-filter)", property: "min-height", value: "44px", title: T("5. Regrouper sans élargir", "5. Group without broadening"), brief: T("Donne la même hauteur minimale aux deux actions nommées sans cibler tous les boutons de la page.", "Give both named actions the same minimum height without targeting every button on the page."), rule: ":is(.session-action, .session-filter) {\n  min-height: 44px;\n}", example: ":is(.slot__link, .slot__filter) { min-height: 2.75rem; }" },
  { id: "css-01-exclusion", selector: ".session-card:not(.session-card--archived)", property: "background", value: "#ffffff", title: T("6. Exclure une variante", "6. Exclude a variant"), brief: T("Applique le fond actif aux cartes qui ne sont pas archivées sans annuler leur opacité dédiée.", "Apply the active background to cards that are not archived without undoing their dedicated opacity."), rule: ".session-card:not(.session-card--archived) {\n  background: #ffffff;\n}", example: ".slot:not(.slot--cancelled) { background: #f8fafc; }" },
  { id: "css-01-states", selector: ".session-action:focus-visible", property: "outline", value: "3px solid #4338ca", title: T("7. Rendre le focus visible", "7. Make focus visible"), brief: T("Renforce le focus clavier de l'action sans afficher un contour permanent à la souris.", "Strengthen keyboard focus on the action without showing a permanent mouse outline."), rule: ".session-action:focus-visible {\n  outline: 3px solid #4338ca;\n  outline-offset: 4px;\n}", example: ".slot__link:focus-visible { outline: 2px solid #0369a1; }" },
  { id: "css-01-specificity", selector: ":where(.session-list) .session-note", property: "color", value: "#475569", title: T("8. Garder une spécificité faible", "8. Keep specificity low"), brief: T("Colore la note avec where afin qu'une future variante puisse la surcharger sans important.", "Color the note with where so a future variant can override it without important."), rule: ":where(.session-list) .session-note {\n  color: #475569;\n}", example: ":where(.schedule) .slot__note { color: #64748b; }" }
];

export function createSelectorsModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
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
    id: "css-selectors",
    title: T("Architecture de sélecteurs", title[1]),
    description: T("Approfondis portée, combinateurs, attributs, variantes et spécificité sur la galerie PulsaConf.", "Deepen scope, combinators, attributes, variants, and specificity in the PulsaConf gallery."),
    deliverable: T("Une couche de sélecteurs précise et surchargeable sans important.", "A precise selector layer that can be overridden without important."),
    importance: T("Après le layout, des sélecteurs trop larges peuvent propager une correction locale à toute l'interface.", "After layout, overly broad selectors can spread a local fix across the whole interface."),
    prerequisites: T(["Avoir terminé CSS 04", "Lire classes, attributs et ordre source"], ["Complete CSS 04", "Read classes, attributes, and source order"]),
    outcomes: T(["Limiter une règle à son composant", "Distinguer enfant, variante, attribut et état", "Raisonner sur la spécificité sans escalade"], ["Limit a rule to its component", "Distinguish child, variant, attribute, and state", "Reason about specificity without escalation"]),
    vocabulary: ["portée", "combinateur", "attribut", ":is", ":not", ":where", "focus-visible", "spécificité"],
    mastery: T(["Les composants voisins restent inchangés", "Les variantes gagnent sans important", "Le focus clavier reste visible"], ["Neighboring components remain unchanged", "Variants win without important", "Keyboard focus remains visible"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildSelectorsCss(baseCss) {
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, `${baseCss}\n\n${scaffold}`);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step);
  const guide = guideFor(step);
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-selectors", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Repère la relation HTML, puis ajoute ${step.property}: ${step.value} sur ${step.selector}.`, `Read the HTML relationship, then add ${step.property}: ${step.value} on ${step.selector}.`), xp: 32 + order
  };
}

function courseFor(step, introduction = step.brief) {
  return {
    fr: { introduction: `${introduction.fr} La preview contient volontairement une carte voisine, un titre imbriqué et une action interne qui ne doivent pas être touchés.`, sections: [{ title: "Portée observable", paragraphs: ["Lis d'abord les relations du HTML, puis choisis le plus petit périmètre utile.", "Une règle correcte doit aussi expliquer quels éléments elle laisse intacts."], example: step.example }, { title: "Spécificité maîtrisée", paragraphs: ["Préfère une relation explicite à un id ou à important.", "is, not et where expriment des intentions différentes : regroupement, exclusion et faible spécificité."], example: ":where(.schedule) .slot__note { color: #64748b; }" }, { title: "Preuve", paragraphs: ["Inspecte la déclaration active et les éléments non ciblés.", "Pour un état interactif, navigue aussi au clavier."], example: "DevTools > Éléments > Styles" }], vocabulary: [[step.property, `Propriété travaillée avec la valeur ${step.value}.`], ["portée", "Ensemble exact d'éléments ciblés."], ["spécificité", "Poids comparé des sélecteurs dans la cascade."]], check: ["Je justifie chaque relation du sélecteur.", "Je vérifie un contre-exemple non ciblé.", "Je conserve layout et focus."] },
    en: { introduction: `${introduction.en} The preview deliberately includes a neighboring card, a nested title, and an internal action that must remain untouched.`, sections: [{ title: "Observable scope", paragraphs: ["Read HTML relationships first, then choose the smallest useful scope.", "A correct rule should also explain which elements it leaves unchanged."], example: step.example }, { title: "Controlled specificity", paragraphs: ["Prefer an explicit relationship over an id or important.", "is, not, and where express different intents: grouping, exclusion, and low specificity."], example: ":where(.schedule) .slot__note { color: #64748b; }" }, { title: "Evidence", paragraphs: ["Inspect the active declaration and untargeted elements.", "For an interactive state, also navigate with the keyboard."], example: "DevTools > Elements > Styles" }], vocabulary: [[step.property, `Property practiced with the value ${step.value}.`], ["scope", "Exact set of targeted elements."], ["specificity", "Compared selector weight in the cascade."]], check: ["I justify every selector relationship.", "I verify an untargeted counterexample.", "I preserve layout and focus."] }
  };
}

function guideFor(step, primaryMistake = T(`Pour « ${step.title.fr} », recopier le sélecteur depuis l'indice sans lire le DOM.`, `For “${step.title.en},” copying the selector from the hint without reading the DOM.`)) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 04.", "Prouver la cible et le contre-exemple."], prerequisites: ["Lire le DOM de la galerie.", "Distinguer descendant et enfant direct.", "Inspecter la cascade."], steps: ["Identifier cible et voisin non ciblé.", "Ajouter le sélecteur minimal.", "Inspecter rendu, cascade et clavier."], mistakes: [primaryMistake.fr, "Élargir la règle à article ou button.", "Ajouter important ou masquer le focus."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 04 decisions.", "Prove both target and counterexample."], prerequisites: ["Read the gallery DOM.", "Distinguish descendant and direct child.", "Inspect the cascade."], steps: ["Identify the target and untargeted neighbor.", "Add the minimal selector.", "Inspect output, cascade, and keyboard."], mistakes: [primaryMistake.en, "Broadening the rule to article or button.", "Adding important or hiding focus."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve la grille certifiée", "Preserve the certified grid"), value: { selector: ".gallery", property: "display", value: "grid" } },
    { type: "cssMediaDeclaration", label: T("Conserve l'axe desktop de la barre", "Preserve the toolbar desktop axis"), value: { query: "(min-width: 48rem)", selector: ".toolbar", property: "flex-direction", value: "row" } },
    ...acquiredSteps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} utilise la cible exacte`, `${step.property} uses the exact target`), value: { selector: step.selector, property: step.property, value: step.value } })),
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" },
    { type: "notContains", label: T("Ne masque pas le focus", "Do not hide focus"), value: "outline: none" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Programme</p><h1>Architecture de sélecteurs</h1><div class="toolbar"><strong>Sessions publiées</strong><button class="session-filter" type="button">Filtrer</button></div></section><section class="gallery session-list" aria-label="Sessions PulsaConf"><article class="gallery__card session-card session-card--featured" data-level="advanced"><h2 class="session-title">Cascade maintenable</h2><div class="session-meta"><span class="session-title">Niveau avancé</span></div><p class="session-note">Inspecter la déclaration active.</p><a class="session-action" href="#details">Voir la session</a><div class="session-menu"><button class="session-action" type="button">Action interne</button></div></article><article class="gallery__card session-card" data-level="beginner"><h2 class="session-title">Portée locale</h2><p class="session-note">La carte voisine reste inchangée.</p><a class="session-action" href="#details">Voir la session</a></article><article class="gallery__card session-card session-card--archived" data-level="advanced"><h2 class="session-title">Session archivée</h2><p class="session-note">Cette variante conserve son atténuation.</p></article><aside class="gallery__card sponsor-card"><h2>Partenaire</h2><p>Ce composant n'est pas une session.</p></aside></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Schedule</p><h1>Selector architecture</h1><div class="toolbar"><strong>Published sessions</strong><button class="session-filter" type="button">Filter</button></div></section><section class="gallery session-list" aria-label="PulsaConf sessions"><article class="gallery__card session-card session-card--featured" data-level="advanced"><h2 class="session-title">Maintainable cascade</h2><div class="session-meta"><span class="session-title">Advanced level</span></div><p class="session-note">Inspect the active declaration.</p><a class="session-action" href="#details">View session</a><div class="session-menu"><button class="session-action" type="button">Internal action</button></div></article><article class="gallery__card session-card" data-level="beginner"><h2 class="session-title">Local scope</h2><p class="session-note">The neighboring card remains unchanged.</p><a class="session-action" href="#details">View session</a></article><article class="gallery__card session-card session-card--archived" data-level="advanced"><h2 class="session-title">Archived session</h2><p class="session-note">This variant keeps its de-emphasis.</p></article><aside class="gallery__card sponsor-card"><h2>Partner</h2><p>This component is not a session.</p></aside></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique portée, combinateurs et spécificité sur un composant réel.", "Diagnose scope, combinators, and specificity in a real component.");
  const course = courseFor(steps.at(-1), T("Le quiz relie chaque forme de sélecteur à son effet observable et à son poids dans la cascade.", "The quiz connects each selector form to its observable effect and cascade weight."));
  const guide = guideFor(steps.at(-1), T("Répondre au quiz en comptant seulement les classes sans vérifier la relation ciblée.", "Answering the quiz by only counting classes without checking the targeted relationship."));
  const explanation = T("La réponse limite les effets de bord et reste surchargeable sans escalade.", "The answer limits side effects and remains overridable without escalation.");
  const questions = [
    { id: "css-01-specificity-quiz-single", type: "single", prompt: T("Quel sélecteur cible seulement le titre direct de la carte ?", "Which selector targets only the card's direct title?"), choices: choices(["child", ".session-card > .session-title"], ["descendant", ".session-card .session-title"], ["global", ".session-title"]), answer: "child", explanation },
    { id: "css-01-specificity-quiz-multiple", type: "multiple", prompt: T("Quelles preuves valident la portée d'un sélecteur ?", "Which evidence validates selector scope?"), choices: choices(["target", T("La cible change", "The target changes")], ["neighbor", T("Le composant voisin reste intact", "The neighboring component stays intact")], ["strong", T("Le sélecteur contient un id", "The selector contains an id")]), answer: ["target", "neighbor"], explanation },
    { id: "css-01-specificity-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : where ajoute zéro spécificité à sa liste interne.", "True or false: where adds zero specificity from its internal list."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "true", explanation },
    { id: "css-01-specificity-quiz-order", type: "ordering", prompt: T("Ordonne une revue de portée.", "Order a scope review."), choices: choices(["dom", T("Lire les relations du DOM", "Read DOM relationships")], ["target", T("Nommer cible et contre-exemple", "Name target and counterexample")], ["rule", T("Écrire le sélecteur minimal", "Write the minimal selector")], ["inspect", T("Inspecter la déclaration active", "Inspect the active declaration")]), answer: ["dom", "target", "rule", "inspect"], explanation },
    { id: "css-01-specificity-quiz-code", type: "code-reading", prompt: T("Quel outil regroupe deux sélecteurs sans cibler tous les boutons ?", "Which tool groups two selectors without targeting every button?"), choices: choices(["is", ":is(.session-action, .session-filter)"], ["button", "button"], ["id", "#all-actions"]), answer: "is", explanation },
    { id: "css-01-specificity-quiz-open", type: "short-open", prompt: T("Nomme les deux preuves d'une cascade maintenable.", "Name the two pieces of evidence for a maintainable cascade."), choices: [], answer: T(["cible", "surcharge"], ["target", "override"]), keywords: ["target", "override"], explanation }
  ];
  return { id: "css-01-specificity-quiz", type: "quiz", title: T("Quiz architecture de sélecteurs", "Selector architecture quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz sélecteurs", "Selectors quiz"), brief, type: "quiz" }), skills: ["css-selectors"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "child" }], xp: 66, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre la couche de sélecteurs complète sans perdre les acquis CSS 00 à 04.", "Ship the complete selector layer without losing CSS 00 through 04 outcomes.");
  const course = courseFor(steps.at(-1), T("Le projet assemble les huit décisions dans une même galerie et exige une preuve pour chaque élément laissé intact.", "The project combines all eight decisions in one gallery and requires evidence for every element left untouched."));
  const guide = guideFor(steps.at(-1), T("Livrer le projet après le premier rendu correct sans contrôler la carte partenaire, le titre imbriqué et le clavier.", "Shipping the project after the first correct-looking output without checking the partner card, nested title, and keyboard."));
  return { id: "css-01-selectors-project", type: "project", title: T("Projet : sélecteurs sans effets de bord", "Project: selectors without side effects"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Projet sélecteurs", "Selectors project"), brief, solution: ".schedule > .slot { border-color: #94a3b8; }", type: "project" }), skills: ["css-selectors", "cascade", "accessibility"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les huit relations ciblent les éléments exacts.", "La carte partenaire et le titre imbriqué restent hors portée.", "Le focus clavier reste visible.", "Les acquis Grid et Flexbox restent actifs sans important."], ["All eight relationships target the exact elements.", "The partner card and nested title remain out of scope.", "Keyboard focus remains visible.", "Grid and Flexbox outcomes remain active without important."]), hint: T("Pars du lab Grid et ajoute chaque relation sans élargir article, button ou toute la page.", "Start from the Grid lab and add each relationship without broadening article, button, or the whole page."), xp: 110 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
