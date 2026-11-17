const T = (fr, en) => ({ fr, en });

const steps = [
  { id: "css-03-flexbox", selector: ".site-nav", property: "display", value: "flex", title: T("1. Créer le conteneur Flexbox", "1. Create the Flexbox container"), brief: T("Organise les groupes de navigation sur un axe sans changer leur ordre HTML.", "Arrange the navigation groups on one axis without changing their HTML order."), rule: ".site-nav {\n  display: flex;\n}", example: ".site-nav { display: flex; }" },
  { id: "css-03-gap", selector: ".site-nav", property: "gap", value: "1rem", title: T("2. Espacer les groupes", "2. Space the groups"), brief: T("Crée une gouttière constante sans ajouter de marges au logo et aux actions.", "Create consistent gutters without adding margins to the logo and actions."), rule: ".site-nav {\n  gap: 1rem;\n}", example: ".site-nav { gap: 1.25rem; }" },
  { id: "css-03-align-items", selector: ".site-nav", property: "align-items", value: "center", title: T("3. Aligner sur l'axe transversal", "3. Align on the cross axis"), brief: T("Aligne verticalement le nom, le statut et les actions de tailles différentes.", "Align the name, status, and differently sized actions vertically."), rule: ".site-nav {\n  align-items: center;\n}", example: ".site-nav { align-items: center; }" },
  { id: "css-03-space-between", selector: ".site-nav", property: "justify-content", value: "space-between", title: T("4. Distribuer l'espace restant", "4. Distribute remaining space"), brief: T("Éloigne le groupe d'identité des actions lorsque la barre dispose d'espace libre.", "Separate the identity group from the actions when the bar has free space."), rule: ".site-nav {\n  justify-content: space-between;\n}", example: ".site-nav { justify-content: space-between; }" },
  { id: "css-03-flex-wrap", selector: ".site-nav", property: "flex-wrap", value: "wrap", title: T("5. Autoriser un repli sûr", "5. Allow safe wrapping"), brief: T("Fais passer les groupes sur une autre ligne plutôt que de les couper ou les faire déborder.", "Let groups move to another line instead of clipping or overflowing them."), rule: ".site-nav {\n  flex-wrap: wrap;\n}", example: ".site-nav { flex-wrap: wrap; }" },
  { id: "css-03-flex-basis", selector: ".site-nav__identity", property: "flex", value: "1 1 14rem", title: T("6. Dimensionner le groupe flexible", "6. Size the flexible group"), brief: T("Donne une base lisible au groupe d'identité et autorise-le à grandir ou rétrécir.", "Give the identity group a readable basis and let it grow or shrink."), rule: ".site-nav__identity {\n  flex: 1 1 14rem;\n}", example: ".nav__brand { flex: 1 1 12rem; }" },
  { id: "css-03-action-sizing", selector: ".site-nav__actions", property: "flex", value: "0 0 auto", title: T("7. Garder les actions à leur taille", "7. Keep actions at their own size"), brief: T("Empêche les contrôles d'action d'être comprimés pour compenser un libellé trop long.", "Prevent action controls from shrinking to compensate for an overly long label."), rule: ".site-nav__actions {\n  flex: 0 0 auto;\n}", example: ".nav__actions { flex: 0 0 auto; }" },
  { id: "css-03-responsive-axis", selector: ".site-nav", property: "flex-direction", value: "column", media: { query: "(min-width: 24rem)", value: "row" }, title: T("8. Adapter l'axe à la largeur", "8. Adapt the axis to available width"), brief: T("Empile les groupes sur petit écran puis les remet en ligne quand la zone d'aperçu est assez large.", "Stack groups on narrow screens, then return them to a row when the preview area is wide enough."), rule: ".site-nav {\n  flex-direction: column;\n}\n\n@media (min-width: 24rem) {\n  .site-nav {\n    flex-direction: row;\n  }\n}", example: "@media (min-width: 24rem) { .site-nav { flex-direction: row; } }" }
];

export function createFlexboxModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const projectStarter = `${baseCss}\n\n.site-nav {\n  min-width: 0;\n}\n\n.site-nav__identity {\n  min-width: 0;\n}\n\n.site-nav__actions {\n  display: flex;\n}\n\n.site-nav__actions .action {\n  min-height: 44px;\n}`;
  let current = projectStarter;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(projectStarter, current, createPedagogy));
  return {
    id: "css-flexbox", title: T("Flexbox pour la navigation", title[1]),
    description: T("Compose une navigation PulsaConf dont les groupes respirent, se replient et restent utilisables au clavier.", "Compose a PulsaConf navigation bar whose groups breathe, wrap, and remain keyboard-usable."),
    deliverable: T("Une barre responsive sans ordre visuel trompeur ni action comprimée.", "A responsive bar without misleading visual order or compressed actions."),
    importance: T("Les barres de navigation combinent libellés variables et actions ; Flexbox doit répartir l'espace sans sacrifier leur sens ni leur cible.", "Navigation bars combine variable labels and actions; Flexbox must distribute space without sacrificing meaning or targets."),
    prerequisites: T(["Avoir terminé CSS 06", "Distinguer axe principal et axe transversal"], ["Complete CSS 06", "Distinguish main and cross axes"]),
    outcomes: T(["Composer et espacer des groupes", "Faire varier base, croissance et réduction", "Replier une navigation sans réordonner le clavier"], ["Compose and space groups", "Control basis, growth, and shrinkage", "Wrap navigation without reordering keyboard flow"]),
    vocabulary: ["flex container", "flex item", "main axis", "cross axis", "gap", "flex-basis", "flex-wrap"],
    mastery: T(["Les actions ne se compriment pas", "La barre se replie avant tout débordement", "Ordre visuel, source et clavier restent cohérents"], ["Actions do not compress", "The bar wraps before any overflow", "Visual, source, and keyboard order stay aligned"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildFlexboxModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n.site-nav {\n  min-width: 0;\n}\n\n.site-nav__identity {\n  min-width: 0;\n}\n\n.site-nav__actions {\n  display: flex;\n}\n\n.site-nav__actions .action {\n  min-height: 44px;\n}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », utiliser order sur un bouton puis perdre la cohérence du clavier.`, `For “${step.title.en},” using order on a button and breaking keyboard sequence.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-flexbox", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Inspecte les groupes de .site-nav, puis ajoute ${step.property}: ${step.value}.`, `Inspect the .site-nav groups, then add ${step.property}: ${step.value}.`), xp: 44 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview comporte un libellé extrême et deux actions distinctes à conserver dans l'ordre source.`, sections: [{ title: "Conteneur et axes", paragraphs: ["Identifie les enfants directs du conteneur et l'axe principal avant de choisir une propriété.", "Gap espace les éléments ; align-items et justify-content interviennent sur des axes différents."], example: step.example }, { title: "Espace disponible", paragraphs: ["Teste le libellé complet à 375 px avant d'agrandir la fenêtre.", "Flex-basis, grow et shrink déterminent comment les groupes partagent la place restante."], example: ".nav__brand { flex: 1 1 12rem; }" }, { title: "Ordre et preuve", paragraphs: ["Compare ordre du DOM, rendu visuel et tabulation clavier.", "Réserve order aux informations non interactives et vérifie chaque action au clavier."], example: "DevTools > Computed > Flex" }], vocabulary: [[step.property, `Propriété utilisée avec ${step.value}.`], ["axe principal", "Axe le long duquel les éléments sont placés."], ["repli", "Passage à une nouvelle ligne quand la place manque."]], check: ["Je nomme l'axe de la propriété.", "Je conserve ordre source et clavier.", "Je teste à 375 px et desktop."] },
    en: { introduction: `${introduction.en} The preview includes an extreme label and two distinct actions whose source order must remain intact.`, sections: [{ title: "Container and axes", paragraphs: ["Identify the container's direct children and main axis before choosing a property.", "Gap spaces items; align-items and justify-content operate on different axes."], example: step.example }, { title: "Available space", paragraphs: ["Test the complete label at 375px before widening the viewport.", "Flex-basis, grow, and shrink determine how groups share remaining space."], example: ".nav__brand { flex: 1 1 12rem; }" }, { title: "Order and evidence", paragraphs: ["Compare DOM order, visual output, and keyboard tab sequence.", "Reserve order for non-interactive information and test every action by keyboard."], example: "DevTools > Computed > Flex" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["main axis", "Axis along which flex items are placed."], ["wrapping", "Moving items to a new line when space runs out."]], check: ["I name the property's axis.", "I preserve source and keyboard order.", "I test at 375px and desktop."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 06.", "Prouver le repli sans débordement ni réordonnancement."], prerequisites: ["Lire les groupes de navigation.", "Repérer axe principal et transversal.", "Tester une action avec Tab."], steps: ["Charger le libellé complet.", "Ajouter la déclaration minimale.", "Comparer mobile, desktop et tabulation."], mistakes: [primaryMistake.fr, "Mettre une largeur fixe sur toute la barre.", "Masquer le débordement au lieu de laisser les groupes se replier."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 06 decisions.", "Prove wrapping without overflow or reordering."], prerequisites: ["Read the navigation groups.", "Identify main and cross axes.", "Test an action with Tab."], steps: ["Load the complete label.", "Add the minimal declaration.", "Compare mobile, desktop, and tab order."], mistakes: [primaryMistake.en, "Setting a fixed width on the whole bar.", "Hiding overflow instead of letting groups wrap."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve le modèle de boîte", "Preserve box sizing"), value: { selector: ".session-card", property: "box-sizing", value: "border-box" } },
    { type: "cssDeclaration", label: T("Conserve le focus visible", "Preserve visible focus"), value: { selector: ".session-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    { type: "cssDeclaration", label: T("La cible d'action reste accessible", "Action target remains accessible"), value: { selector: ".site-nav__actions .action", property: "min-height", value: "44px" } },
    ...acquiredSteps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} cible la bonne valeur`, `${step.property} uses the right value`), value: { selector: step.selector, property: step.property, value: step.value } })),
    ...acquiredSteps.filter((step) => step.media).map((step) => ({ type: "cssMediaDeclaration", label: T("La barre retrouve une ligne sur desktop", "The bar returns to a row on desktop"), value: { query: step.media.query, selector: step.selector, property: step.property, value: step.media.value } })),
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" },
    { type: "notContains", label: T("Ne masque pas les actions", "Do not hide actions"), value: "overflow: hidden" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Navigation</p><h1>Une barre qui reste utilisable</h1><p class="lead">Les groupes doivent garder leur place et leur ordre lorsque l'espace varie.</p><nav class="site-nav" aria-label="Navigation de session"><div class="site-nav__identity"><strong>PulsaConf</strong><span class="site-nav__label">pulsaconf-atelier-accessibilite-session-identifiant-extremement-long</span></div><span class="site-nav__status">12 places</span><div class="site-nav__actions" role="group" aria-label="Actions de session"><a class="session-action action" href="#programme">Programme</a><a class="session-action action" href="#inscription">Réserver</a></div></nav></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Navigation</p><h1>A bar that stays usable</h1><p class="lead">Groups must retain their space and order as room changes.</p><nav class="site-nav" aria-label="Session navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span class="site-nav__label">pulsaconf-accessibility-workshop-session-extremely-long-identifier</span></div><span class="site-nav__status">12 seats</span><div class="site-nav__actions" role="group" aria-label="Session actions"><a class="session-action action" href="#schedule">Schedule</a><a class="session-action action" href="#booking">Book</a></div></nav></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique axe, espace flexible, repli et ordre clavier.", "Diagnose axis, flexible space, wrapping, and keyboard order.");
  const course = courseFor(steps.at(-1), T("Le quiz compare des symptômes de navigation réelle plutôt que des définitions isolées.", "The quiz compares real navigation symptoms instead of isolated definitions."));
  const guide = guideFor(steps.at(-1), T("Répondre en confondant l'ordre visuel et l'ordre de tabulation.", "Answering by confusing visual order with tab sequence."));
  const explanation = T("La solution adapte l'axe et la place disponible tout en conservant l'ordre interactif.", "The solution adapts axis and available space while preserving interactive order.");
  const questions = [
    { id: "css-flexbox-quiz-single", type: "single", prompt: T("Quelle propriété crée l'espace entre éléments Flexbox ?", "Which property creates space between Flexbox items?"), choices: choices(["gap", "gap"], ["margin", "margin sur chaque enfant"], ["order", "order"]), answer: "gap", explanation },
    { id: "css-flexbox-quiz-multiple", type: "multiple", prompt: T("Quelles preuves montrent que la barre tient sur mobile ?", "Which evidence shows the bar fits on mobile?"), choices: choices(["wrap", T("Les groupes reviennent à la ligne", "Groups wrap to another line")], ["keyboard", T("Les actions gardent l'ordre Tab", "Actions retain Tab order")], ["hide", T("Le contenu excédentaire est masqué", "Overflowing content is hidden")]), answer: ["wrap", "keyboard"], explanation },
    { id: "css-flexbox-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : order change l'ordre de tabulation des boutons.", "True or false: order changes button tab order."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-flexbox-quiz-order", type: "ordering", prompt: T("Ordonne le diagnostic d'une barre trop serrée.", "Order the diagnosis of a crowded toolbar."), choices: choices(["content", T("Charger le contenu complet", "Load complete content")], ["axis", T("Identifier l'axe et les groupes", "Identify the axis and groups")], ["wrap", T("Choisir repli ou changement d'axe", "Choose wrapping or an axis change")], ["keyboard", T("Vérifier l'ordre clavier", "Verify keyboard order")]), answer: ["content", "axis", "wrap", "keyboard"], explanation },
    { id: "css-flexbox-quiz-code", type: "code-reading", prompt: T("Quel shorthand laisse le groupe grandir et rétrécir depuis 14rem ?", "Which shorthand lets the group grow and shrink from 14rem?"), choices: choices(["flex", "flex: 1 1 14rem"], ["fixed", "flex: 0 0 14rem"], ["shrink", "flex-shrink: 0"]), answer: "flex", explanation },
    { id: "css-flexbox-quiz-open", type: "short-open", prompt: T("Nomme les deux axes utilisés pour expliquer l'alignement Flexbox.", "Name the two axes used to explain Flexbox alignment."), choices: [], answer: T(["principal", "transversal"], ["main", "cross"]), keywords: ["main", "cross"], explanation }
  ];
  return { id: "css-flexbox-quiz", type: "quiz", title: T("Quiz Flexbox de navigation", "Navigation Flexbox quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Flexbox", "Flexbox quiz"), brief, type: "quiz" }), skills: ["css-flexbox"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "gap" }], xp: 72, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre la navigation complète en conservant sizing, repli, ordre clavier et focus.", "Ship the complete navigation while preserving sizing, wrapping, keyboard order, and focus.");
  const course = courseFor(steps.at(-1), T("Le projet combine les huit décisions Flexbox avec le vrai libellé et les deux actions.", "The project combines all eight Flexbox decisions with the real label and both actions."));
  const guide = guideFor(steps.at(-1), T("Valider la navbar desktop puis ignorer le libellé extrême et la tabulation mobile.", "Validating the desktop navbar while ignoring the extreme label and mobile tab sequence."));
  return { id: "css-03-mini-project-navbar", type: "project", title: T("Projet : navigation Flexbox responsive", "Project: responsive Flexbox navigation"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Projet navigation Flexbox", "Flexbox navigation project"), brief, solution: ".site-nav { display: flex; flex-wrap: wrap; }", type: "project" }), skills: ["css-flexbox", "responsive-navigation", "accessibility"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les huit déclarations ciblent les groupes prévus.", "La barre passe d'une colonne mobile à une ligne desktop.", "Les actions gardent leur taille et ordre clavier.", "Le libellé complet reste visible sans débordement."], ["All eight declarations target the intended groups.", "The bar moves from a mobile column to a desktop row.", "Actions retain their size and keyboard order.", "The complete label stays visible without overflow."]), hint: T("Pars du projet Box Model et traite d'abord les groupes, puis l'axe et le contenu extrême.", "Start from the Box Model project and handle groups first, then axis and extreme content."), xp: 125 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
