const T = (fr, en) => ({ fr, en });

const steps = [
  { slug: "display-flex", selector: ".toolbar", property: "display", value: "flex", title: T("1. Ouvrir un axe de mise en page", "1. Open a layout axis"), brief: T("Transforme la barre en conteneur flex sans modifier l'ordre du document.", "Turn the bar into a flex container without changing document order."), rule: ".toolbar {\n  display: flex;\n}", example: ".notice-actions { display: flex; }" },
  { slug: "gap", selector: ".toolbar", property: "gap", value: "1rem", title: T("2. Espacer sans marges parasites", "2. Space items without stray margins"), brief: T("Crée un espacement constant entre les éléments, même après un retour à la ligne.", "Create consistent spacing between items, including after wrapping."), rule: ".toolbar {\n  gap: 1rem;\n}", example: ".notice-actions { gap: .75rem; }" },
  { slug: "align-items", selector: ".toolbar", property: "align-items", value: "center", title: T("3. Aligner sur l'axe transversal", "3. Align on the cross axis"), brief: T("Aligne libellé, statut et actions malgré leurs hauteurs différentes.", "Align the label, status, and actions despite their different heights."), rule: ".toolbar {\n  align-items: center;\n}", example: ".notice-actions { align-items: baseline; }" },
  { slug: "justify-content", selector: ".toolbar", property: "justify-content", value: "space-between", title: T("4. Distribuer l'espace principal", "4. Distribute main-axis space"), brief: T("Sépare le contexte des actions seulement lorsque de l'espace reste disponible.", "Separate context from actions only when free space is available."), rule: ".toolbar {\n  justify-content: space-between;\n}", example: ".notice-actions { justify-content: flex-end; }" },
  { slug: "flex-wrap", selector: ".toolbar", property: "flex-wrap", value: "wrap", title: T("5. Autoriser un retour à la ligne sûr", "5. Allow safe wrapping"), brief: T("Laisse les groupes passer sur une nouvelle ligne plutôt que de déborder.", "Let groups move to a new line instead of overflowing."), rule: ".toolbar {\n  flex-wrap: wrap;\n}", example: ".notice-actions { flex-wrap: wrap; }" },
  { slug: "flex-direction", selector: ".toolbar", property: "flex-direction", value: "column", media: { query: "(min-width: 48rem)", value: "row" }, title: T("6. Changer d'axe selon l'espace", "6. Change axis with available space"), brief: T("Empile la barre sur mobile puis retrouve une ligne à partir de 48rem.", "Stack the bar on mobile, then restore a row from 48rem."), rule: ".toolbar {\n  flex-direction: column;\n}\n\n@media (min-width: 48rem) {\n  .toolbar {\n    flex-direction: row;\n  }\n}", example: "@media (min-width: 50rem) { .notice-actions { flex-direction: row; } }" },
  { slug: "order", selector: ".toolbar__status", property: "order", value: "2", title: T("7. Déplacer seulement l'information secondaire", "7. Move secondary information only"), brief: T("Place le statut non interactif après les actions sans réordonner les boutons au clavier.", "Place non-interactive status after actions without reordering keyboard controls."), rule: ".toolbar__status {\n  order: 2;\n}", example: ".notice__meta { order: 1; }" },
  { slug: "min-width", selector: ".toolbar__label", property: "min-width", value: "0", title: T("8. Autoriser le libellé à rétrécir", "8. Let the label shrink"), brief: T("Autorise le libellé flex à se contracter et revenir à la ligne sans pousser la barre hors écran.", "Let the flex label shrink and wrap without pushing the bar off-screen."), rule: ".toolbar__label {\n  min-width: 0;\n}", example: ".notice__title { min-width: 0; }" }
];

export function createFlexLayoutModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  let current = baseCss;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(baseCss, current, createPedagogy));
  return {
    id: "css-flex-layout",
    title: T("Flexbox et mise en page", title[1]),
    description: T("Compose une barre d'actions PulsaConf qui reste lisible, ordonnée et sans débordement.", "Compose a PulsaConf action bar that remains readable, ordered, and free of overflow."),
    deliverable: T("Une barre d'actions qui s'empile sur mobile et se distribue sur desktop.", "An action bar that stacks on mobile and distributes itself on desktop."),
    importance: T("Flexbox relie axe, espace disponible et ordre visuel ; une mauvaise combinaison peut déborder ou désorienter la navigation.", "Flexbox connects axis, available space, and visual order; a poor combination can overflow or make navigation confusing."),
    prerequisites: T(["Avoir terminé CSS 02", "Distinguer contenu, padding et largeur disponible"], ["Complete CSS 02", "Distinguish content, padding, and available width"]),
    outcomes: T(["Choisir axe, alignement et distribution", "Faire revenir des actions à la ligne sans débordement", "Préserver l'ordre clavier et les contenus longs"], ["Choose axis, alignment, and distribution", "Wrap actions without overflow", "Preserve keyboard order and long content"]),
    vocabulary: ["main axis", "cross axis", "gap", "wrap", "order", "flex item", "min-width"],
    mastery: T(["La barre tient à 375 px", "Les contrôles gardent leur ordre clavier", "Le libellé extrême reste visible"], ["The bar fits at 375 px", "Controls retain keyboard order", "The extreme label remains visible"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildFlexLayoutCss(baseCss) {
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, baseCss);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step);
  const guide = guideFor(step);
  return {
    id: `css-flex-layout-${step.slug}`, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-flex-layout", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Inspecte l'axe de .toolbar, puis ajoute ${step.property}: ${step.value}.`, `Inspect the .toolbar axis, then add ${step.property}: ${step.value}.`), xp: 28 + order
  };
}

function courseFor(step) {
  return {
    fr: { introduction: `${step.brief.fr} La barre d'actions PulsaConf doit absorber un statut, deux boutons et un libellé extrême.`, sections: [{ title: "Axes", paragraphs: ["Identifie l'axe principal avant de choisir alignement ou distribution.", "Une propriété Flexbox répond à une contrainte observable, pas à une recette à mémoriser."], example: step.example }, { title: "Contenu variable", paragraphs: ["Réduis la preview à 375 px puis agrandis-la sans raccourcir le libellé.", "Le retour à la ligne doit conserver chaque contrôle visible et utilisable."], example: ".notice-actions { flex-wrap: wrap; gap: .75rem; }" }, { title: "Ordre accessible", paragraphs: ["Compare l'ordre du DOM, l'ordre visuel et la navigation au clavier.", "Réserve order aux informations non interactives lorsque le sens de lecture pourrait diverger."], example: ".notice__meta { order: 1; }" }], vocabulary: [[step.property, `Propriété travaillée avec la valeur ${step.value}.`], ["axe principal", "Direction dans laquelle les éléments flex sont distribués."], ["axe transversal", "Axe perpendiculaire à l'axe principal."]], check: ["Je nomme l'axe concerné.", "Je conserve les règles cumulatives.", "Je vérifie mobile, desktop et clavier."] },
    en: { introduction: `${step.brief.en} The PulsaConf action bar must absorb a status, two buttons, and an extreme label.`, sections: [{ title: "Axes", paragraphs: ["Identify the main axis before choosing alignment or distribution.", "A Flexbox property answers an observable constraint, not a recipe to memorize."], example: step.example }, { title: "Variable content", paragraphs: ["Reduce the preview to 375px, then enlarge it without shortening the label.", "Wrapping must keep every control visible and usable."], example: ".notice-actions { flex-wrap: wrap; gap: .75rem; }" }, { title: "Accessible order", paragraphs: ["Compare DOM order, visual order, and keyboard navigation.", "Reserve order for non-interactive information when reading sequence could diverge."], example: ".notice__meta { order: 1; }" }], vocabulary: [[step.property, `Property practiced with the value ${step.value}.`], ["main axis", "Direction along which flex items are distributed."], ["cross axis", "Axis perpendicular to the main axis."]], check: ["I name the affected axis.", "I preserve cumulative rules.", "I verify mobile, desktop, and keyboard input."] }
  };
}

function guideFor(step) {
  return {
    fr: { objectives: [step.brief.fr, `Appliquer ${step.property} à la cible exacte.`, "Conserver toutes les décisions CSS 00 à CSS 02."], prerequisites: ["Lire l'ordre du DOM.", "Distinguer axe principal et transversal.", "Comparer 375 px et desktop."], steps: ["Reproduire la contrainte dans la preview.", "Ajouter la déclaration minimale.", "Inspecter dimensions, retour à la ligne et ordre clavier."], mistakes: [`Pour « ${step.title.fr} », changer plusieurs axes à la fois.`, "Utiliser order pour réorganiser des boutons focusables.", "Masquer le débordement au lieu de traiter sa cause."] },
    en: { objectives: [step.brief.en, `Apply ${step.property} to the exact target.`, "Preserve every CSS 00 through CSS 02 decision."], prerequisites: ["Read DOM order.", "Distinguish the main and cross axes.", "Compare 375px and desktop."], steps: ["Reproduce the constraint in the preview.", "Add the minimal declaration.", "Inspect dimensions, wrapping, and keyboard order."], mistakes: [`For “${step.title.en},” changing several axes at once.`, "Using order to rearrange focusable buttons.", "Hiding overflow instead of addressing its cause."] }
  };
}

function testsFor(acquiredSteps) {
  const tests = [
    { type: "cssDeclaration", label: T("Conserve le box sizing certifié", "Preserve certified box sizing"), value: { selector: ".course-card", property: "box-sizing", value: "border-box" } },
    { type: "cssDeclaration", label: T("Conserve la protection du contenu long", "Preserve long-content protection"), value: { selector: ".course-card", property: "overflow-wrap", value: "anywhere" } },
    { type: "cssMediaDeclaration", label: T("Conserve la largeur desktop de la carte", "Preserve the card desktop width"), value: { query: "(min-width: 760px)", selector: ".course-card", property: "max-width", value: "42rem" } }
  ];
  for (const step of acquiredSteps) {
    tests.push({ type: "cssDeclaration", label: T(`${step.property} cible la bonne valeur`, `${step.property} targets the correct value`), value: { selector: step.selector, property: step.property, value: step.value } });
    if (step.media) tests.push({ type: "cssMediaDeclaration", label: T("La barre retrouve une ligne à 48rem", "The bar returns to a row at 48rem"), value: { query: step.media.query, selector: step.selector, property: step.property, value: step.media.value } });
  }
  tests.push({ type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" });
  return tests;
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card" aria-labelledby="session-title"><p class="eyebrow">PulsaConf · Salle Indigo</p><h1 id="session-title">Composer une interface robuste</h1><p class="lead">La barre doit rester lisible quand l'espace et le contenu changent.</p><div class="toolbar"><div class="toolbar__label"><strong>Session active</strong><br><span>pulsaconf-flex-session-identifiant-long</span></div><span class="toolbar__status">12 places</span><div class="toolbar__actions" role="group" aria-label="Actions de session"><button class="action" type="button">Réserver</button><button class="action" type="button">Programme</button></div></div></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card" aria-labelledby="session-title"><p class="eyebrow">PulsaConf · Indigo room</p><h1 id="session-title">Compose a robust interface</h1><p class="lead">The bar must remain readable when space and content change.</p><div class="toolbar"><div class="toolbar__label"><strong>Active session</strong><br><span>pulsaconf-flex-session-long-identifier</span></div><span class="toolbar__status">12 seats</span><div class="toolbar__actions" role="group" aria-label="Session actions"><button class="action" type="button">Book</button><button class="action" type="button">Schedule</button></div></div></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique axe, retour à la ligne et ordre à partir d'une barre réelle.", "Diagnose axis, wrapping, and order from a real toolbar.");
  const course = courseFor(steps[5]);
  const guide = guideFor(steps[5]);
  course.fr.introduction = "Ce quiz confronte plusieurs symptômes de barre responsive pour vérifier le raisonnement sur les axes, pas la récitation des propriétés.";
  course.en.introduction = "This quiz compares several responsive-toolbar symptoms to verify reasoning about axes rather than property recall.";
  guide.fr.mistakes = ["Répondre d'après le nom d'une propriété sans relire le symptôme.", "Confondre retour visuel et ordre clavier.", "Valider une seule largeur."];
  guide.en.mistakes = ["Answering from a property name without rereading the symptom.", "Confusing visual flow and keyboard order.", "Validating only one width."];
  const explanation = T("La réponse relie une contrainte visible à l'axe ou à l'élément flex exact.", "The answer connects a visible constraint to the exact flex axis or item.");
  const questions = [
    { id: "css-flex-layout-quiz-single", type: "single", prompt: T("Quelle propriété autorise les groupes à former une nouvelle ligne ?", "Which property lets groups form a new line?"), choices: choices(["wrap", "flex-wrap: wrap"], ["hide", "overflow: hidden"], ["order", "order: 2"]), answer: "wrap", explanation },
    { id: "css-flex-layout-quiz-multiple", type: "multiple", prompt: T("Quelles preuves montrent que la barre est robuste ?", "Which evidence shows the toolbar is robust?"), choices: choices(["widths", T("375 px et desktop", "375px and desktop")], ["keyboard", T("Ordre clavier inchangé", "Unchanged keyboard order")], ["screenshot", T("Une capture desktop seulement", "One desktop screenshot only")]), answer: ["widths", "keyboard"], explanation },
    { id: "css-flex-layout-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : order modifie aussi l'ordre de tabulation.", "True or false: order also changes tab order."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-flex-layout-quiz-order", type: "ordering", prompt: T("Ordonne le diagnostic responsive.", "Order the responsive diagnosis."), choices: choices(["content", T("Charger le contenu extrême", "Load extreme content")], ["narrow", T("Observer à 375 px", "Observe at 375px")], ["axis", T("Choisir l'axe", "Choose the axis")], ["keyboard", T("Vérifier le clavier", "Verify keyboard input")]), answer: ["content", "narrow", "axis", "keyboard"], explanation },
    { id: "css-flex-layout-quiz-code", type: "code-reading", prompt: T("Un libellé flex refuse de rétrécir. Quelle déclaration traite sa largeur minimale implicite ?", "A flex label refuses to shrink. Which declaration addresses its implicit minimum width?"), choices: choices(["min", "min-width: 0"], ["max", "max-width: none"], ["clip", "overflow: hidden"]), answer: "min", explanation },
    { id: "css-flex-layout-quiz-open", type: "short-open", prompt: T("Nomme les deux axes Flexbox.", "Name the two Flexbox axes."), choices: [], answer: T(["principal", "transversal"], ["main", "cross"]), keywords: ["main", "cross"], explanation }
  ];
  return { id: "css-flex-layout-quiz", type: "quiz", title: T("Quiz Flexbox et mise en page", "Flexbox and layout quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Flexbox", "Flexbox quiz"), brief, type: "quiz" }), skills: ["css-flex-layout"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "wrap" }], xp: 58, order: moduleIndex + 1 };
}

function projectFor(baseCss, solution, createPedagogy) {
  const brief = T("Livre la barre d'actions responsive complète sans perdre les acquis CSS 00 à 02.", "Ship the complete responsive action bar without losing CSS 00 through 02 outcomes.");
  const course = courseFor(steps.at(-1));
  const guide = guideFor(steps.at(-1));
  course.fr.introduction = "Le lab assemble les huit décisions Flexbox sur la feuille certifiée de CSS 02 et exige une preuve mobile, desktop et clavier.";
  course.en.introduction = "The lab combines all eight Flexbox decisions on the certified CSS 02 stylesheet and requires mobile, desktop, and keyboard evidence.";
  guide.fr.mistakes = ["Repartir d'une feuille vide et perdre les acquis CSS 00 à 02.", "Réordonner les boutons avec order.", "Raccourcir le contenu extrême pour faire passer le rendu."];
  guide.en.mistakes = ["Starting from an empty stylesheet and losing CSS 00 through 02 outcomes.", "Reordering buttons with order.", "Shortening extreme content to make the output pass."];
  return { id: "css-flex-layout-lab", type: "project", title: T("Lab Flexbox et mise en page", "Flexbox and layout lab"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Lab Flexbox", "Flexbox lab"), brief, solution: ".notice-actions { display: flex; flex-wrap: wrap; }", type: "project" }), skills: ["css-flex-layout", "responsive-layout", "accessibility"], difficulty: "project", durationMin: 105, starterCode: baseCss, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les huit décisions ciblent le bon conteneur ou élément.", "La barre s'empile sur mobile et passe en ligne à 48rem.", "Les boutons conservent leur ordre DOM et clavier.", "Le contenu extrême reste visible sans important."], ["All eight decisions target the correct container or item.", "The bar stacks on mobile and becomes a row at 48rem.", "Buttons preserve DOM and keyboard order.", "Extreme content remains visible without important."]), hint: T("Pars du lab CSS 02, construis d'abord l'axe et termine par le contenu extrême.", "Start from the CSS 02 lab, build the axis first, and finish with extreme content."), xp: 100 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
