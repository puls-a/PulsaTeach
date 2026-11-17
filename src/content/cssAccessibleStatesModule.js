const T = (fr, en) => ({ fr, en });

const steps = [
  { id: "css-a11y-states-focus-visible", selector: ".a11y-action:focus-visible", property: "outline-style", value: "solid", title: T("1. Rendre le focus clavier évident", "1. Make keyboard focus clear"), brief: T("Assure un style de contour explicite quand un lien reçoit le focus visible.", "Ensure an explicit outline style when a link receives visible focus."), rule: ".a11y-action:focus-visible {\n  outline-style: solid;\n}", example: ".nav-link:focus-visible { outline-style: solid; }" },
  { id: "css-a11y-states-outline", selector: ".a11y-action:focus-visible", property: "outline", value: "3px solid #4338ca", title: T("2. Garder un contour identifiable", "2. Keep an identifiable outline"), brief: T("Utilise un contour solide et contrasté sans le remplacer par une ombre décorative.", "Use a solid, contrasting outline instead of replacing it with a decorative shadow."), rule: ".a11y-action:focus-visible {\n  outline: 3px solid #4338ca;\n}", example: ".nav-link:focus-visible { outline: 2px solid #0369a1; }" },
  { id: "css-a11y-states-outline-offset", selector: ".a11y-action:focus-visible", property: "outline-offset", value: "4px", title: T("3. Séparer le focus de la bordure", "3. Separate focus from the border"), brief: T("Décale l'indicateur pour qu'il reste lisible autour du contrôle sans changer sa géométrie.", "Offset the indicator so it stays visible around the control without changing its geometry."), rule: ".a11y-action:focus-visible {\n  outline-offset: 4px;\n}", example: ".nav-link:focus-visible { outline-offset: 3px; }" },
  { id: "css-a11y-states-hover", selector: ".a11y-action:hover", property: "transform", value: "translateY(-2px)", title: T("4. Signaler le survol sans déplacer la page", "4. Signal hover without shifting the page"), brief: T("Ajoute un retour au pointeur avec transform plutôt qu'une marge qui recomposerait les voisins.", "Add pointer feedback with transform rather than a margin that would reflow neighbors."), rule: ".a11y-action:hover {\n  transform: translateY(-2px);\n}", example: ".nav-link:hover { transform: translateY(-1px); }" },
  { id: "css-a11y-states-disabled", selector: ".a11y-action:disabled", property: "cursor", value: "not-allowed", title: T("5. Expliquer une action désactivée", "5. Explain a disabled action"), brief: T("Signale qu'une action n'est pas disponible sans réduire le contraste de son libellé.", "Signal that an action is unavailable without reducing its label contrast."), rule: ".a11y-action:disabled {\n  cursor: not-allowed;\n}", example: ".form-submit:disabled { cursor: not-allowed; }" },
  { id: "css-a11y-states-cursor", selector: ".a11y-action:disabled", property: "border-style", value: "dashed", title: T("6. Rendre l'indisponibilité explicite", "6. Make unavailability explicit"), brief: T("Ajoute un repère de bordure au bouton désactivé sans affaiblir son libellé.", "Add a border cue to the disabled button without dimming its label."), rule: ".a11y-action:disabled {\n  border-style: dashed;\n}", example: ".form-submit:disabled { border-style: dashed; }" },
  { id: "css-a11y-states-contrast-color", selector: ".a11y-action:disabled", property: "opacity", value: "1", title: T("7. Ne pas affaiblir le contraste désactivé", "7. Do not weaken disabled contrast"), brief: T("Garde l'opacité à sa valeur normale afin que le libellé reste suffisamment contrasté.", "Keep opacity at its normal value so the label remains sufficiently contrasted."), rule: ".a11y-action:disabled {\n  opacity: 1;\n}", example: ".form-submit:disabled { opacity: 1; }" },
  { id: "css-a11y-states-forced-color-adjust", selector: ".a11y-action", property: "forced-color-adjust", value: "auto", media: { query: "(forced-colors: active)", selector: ".a11y-action:focus-visible", property: "outline-style", value: "solid" }, title: T("8. Respecter les couleurs forcées", "8. Respect forced colors"), brief: T("Laisse le système appliquer sa palette et conserve un contour de focus solide en forced-colors.", "Let the system apply its palette and keep a solid focus outline in forced-colors."), rule: ".a11y-action {\n  forced-color-adjust: auto;\n}\n\n@media (forced-colors: active) {\n  .a11y-action:focus-visible {\n    outline-style: solid;\n  }\n}", example: "@media (forced-colors: active) { .nav-link:focus-visible { outline-style: solid; } }" }
];

export function createAccessibleStatesModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const projectStarter = `${baseCss}\n\n.session-action:disabled {\n  color: GrayText;\n  background: ButtonFace;\n  border: 1px solid ButtonText;\n}`;
  let current = projectStarter;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(projectStarter, current, createPedagogy));
  return {
    id: "css-a11y-states", title: T("États accessibles", title[1]),
    description: T("Rends les commandes PulsaConf perceptibles au clavier, au pointeur et dans les modes de couleurs forcées.", "Make PulsaConf controls perceivable by keyboard, pointer, and forced-colors modes."),
    deliverable: T("Des états interactifs distincts qui restent visibles et lisibles dans les modes contraints.", "Distinct interactive states that remain visible and readable in constrained modes."),
    importance: T("Un contrôle n'est utilisable que si son état, sa disponibilité et son focus restent perceptibles au moyen d'interaction choisi.", "A control is usable only when its state, availability, and focus remain perceivable with the chosen input method."),
    prerequisites: T(["Avoir terminé Responsive mobile-first", "Connaître liens, boutons et focus-visible"], ["Complete mobile-first responsive design", "Know links, buttons, and focus-visible"]),
    outcomes: T(["Distinguer focus clavier et survol", "Expliquer les actions désactivées", "Préserver les couleurs forcées et les cibles tactiles"], ["Distinguish keyboard focus from hover", "Explain disabled actions", "Preserve forced colors and touch targets"]),
    vocabulary: ["focus-visible", "outline", "hover", "disabled", "forced-colors", "target size", "system colors"],
    mastery: T(["Le focus reste distinct du survol", "Les actions désactivées gardent un texte lisible", "Les couleurs forcées conservent un indicateur système"], ["Focus remains distinct from hover", "Disabled actions keep readable text", "Forced colors retain a system-visible indicator"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildAccessibleStatesModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n.session-action:disabled {\n  color: GrayText;\n  background: ButtonFace;\n  border: 1px solid ButtonText;\n}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », supprimer l'indicateur ou atténuer le libellé jusqu'à le rendre illisible.`, `For “${step.title.en},” remove the indicator or dim the label until it becomes unreadable.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-a11y-states", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Observe l'état de ${step.selector}, puis ajoute ${step.property}: ${step.value}.`, `Inspect the state of ${step.selector}, then add ${step.property}: ${step.value}.`), xp: 52 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview distingue un lien, un bouton désactivé et un composant voisin.`, sections: [{ title: "État et entrée", paragraphs: ["Le focus clavier, le survol pointeur et la disponibilité sont des états différents.", "Utilise les pseudo-classes adaptées sans appliquer un état à tous les contrôles."], example: step.example }, { title: "Cible et contraste", paragraphs: ["Une cible assez haute aide aussi les personnes qui utilisent le tactile.", "Ne compte pas sur l'opacité seule pour expliquer pourquoi l'action est indisponible."], example: ".session-action:disabled { cursor: not-allowed; }" }, { title: "Modes contraints", paragraphs: ["Laisse forced-colors remplacer les couleurs d'auteur quand le système le demande.", "Navigue avec Tab puis vérifie que le contour reste visible autour de l'action."], example: "@media (forced-colors: active) { .link:focus-visible { outline-style: solid; } }" }], vocabulary: [[step.property, `Propriété travaillée avec ${step.value}.`], ["focus-visible", "Indicateur du focus clavier lorsque le navigateur le juge utile."], ["couleur système", "Couleur fournie par le mode d'affichage de l'utilisateur."]], check: ["Je distingue focus et hover.", "Le libellé disabled reste lisible.", "Le système peut adapter ses couleurs."] },
    en: { introduction: `${introduction.en} The preview distinguishes a link, a disabled button, and a neighboring component.`, sections: [{ title: "State and input", paragraphs: ["Keyboard focus, pointer hover, and availability are different states.", "Use the appropriate pseudo-classes without applying one state to every control."], example: step.example }, { title: "Target and contrast", paragraphs: ["A sufficiently tall target also helps people using touch input.", "Do not rely on opacity alone to explain why an action is unavailable."], example: ".session-action:disabled { cursor: not-allowed; }" }, { title: "Constrained modes", paragraphs: ["Let forced-colors replace author colors when the system requests it.", "Navigate with Tab, then verify the outline remains visible around the action."], example: "@media (forced-colors: active) { .link:focus-visible { outline-style: solid; } }" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["focus-visible", "Keyboard focus indicator when the browser considers it useful."], ["system color", "A color supplied by the user's display mode."]], check: ["I distinguish focus from hover.", "Disabled labels remain readable.", "The system can adapt its colors."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 09.", "Prouver le comportement au clavier et dans forced-colors."], prerequisites: ["Lire les états du composant.", "Différencier lien et bouton désactivé.", "Utiliser Tab pour parcourir les actions."], steps: ["Identifier l'entrée et l'état concernés.", "Ajouter la règle minimale.", "Vérifier focus, disponibilité et contraste système."], mistakes: [primaryMistake.fr, "Utiliser hover comme seul retour d'état.", "Remplacer les couleurs système par des couleurs fixes."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 09 decisions.", "Prove keyboard and forced-colors behavior."], prerequisites: ["Read the component states.", "Distinguish links from disabled buttons.", "Use Tab to traverse actions."], steps: ["Identify the input method and state.", "Add the minimal rule.", "Verify focus, availability, and system contrast."], mistakes: [primaryMistake.en, "Using hover as the only state feedback.", "Replacing system colors with fixed colors."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve le Grid de la page", "Preserve the page Grid"), value: { selector: ".programme-grid", property: "display", value: "grid" } },
    { type: "cssDeclaration", label: T("Conserve le focus de navigation", "Preserve navigation focus"), value: { selector: ".session-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    ...acquiredSteps.flatMap((step) => [
      { type: "cssDeclaration", label: T(`${step.property} vise l'état exact`, `${step.property} targets the exact state`), value: { selector: step.selector, property: step.property, value: step.value } },
      ...(step.media ? [{ type: "cssDeclaration", label: T("Le contrôle laisse les couleurs au système", "The control leaves colors to the system"), value: { selector: step.selector, property: step.property, value: step.value } }, { type: "cssMediaDeclaration", label: T("Le focus forcé conserve son contour", "Forced focus keeps its outline"), value: { query: step.media.query, selector: step.media.selector || step.selector, property: step.media.property || step.property, value: step.media.value } }] : [])
    ]),
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" },
    { type: "notContains", label: T("Ne retire pas le contour de focus", "Do not remove the focus outline"), value: "outline: none" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · États accessibles</p><h1>Commandes perceptibles</h1><nav class="site-nav" aria-label="Navigation de session"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Parcours et ateliers</span></div><div class="site-nav__actions"><a class="session-action a11y-action action" href="#sessions">Voir les sessions</a><button class="session-action a11y-action action" type="button" disabled>Inscription fermée</button><a class="session-action a11y-action action" href="#help">Aide</a></div></nav><p class="responsive-copy">Un composant voisin reste indépendant des états interactifs de cette navigation.</p></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Accessible states</p><h1>Perceivable controls</h1><nav class="site-nav" aria-label="Session navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Learning paths and workshops</span></div><div class="site-nav__actions"><a class="session-action a11y-action action" href="#sessions">View sessions</a><button class="session-action a11y-action action" type="button" disabled>Registration closed</button><a class="session-action a11y-action action" href="#help">Help</a></div></nav><p class="responsive-copy">A neighboring component remains independent from this navigation's interactive states.</p></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique focus, hover, disponibilité et couleurs forcées.", "Diagnose focus, hover, availability, and forced colors.");
  const course = courseFor(steps[6], T("Le quiz relie chaque état d'interaction à un signal perceptible sans enlever le signal système.", "The quiz connects each interaction state to perceivable feedback without removing system cues."));
  const guide = guideFor(steps[6], T("Répondre avec une couleur de marque fixe en mode forced-colors.", "Answering with a fixed brand color in forced-colors mode."));
  const explanation = T("Les états doivent rester discernables par le moyen d'entrée et le mode d'affichage.", "States must remain distinguishable across input methods and display modes.");
  const questions = [
    { id: "css-a11y-states-quiz-single", type: "single", prompt: T("Quel état cible l'indicateur de focus clavier ?", "Which state targets the keyboard focus indicator?"), choices: choices(["focus", ":focus-visible"], ["hover", ":hover"], ["disabled", ":disabled"]), answer: "focus", explanation },
    { id: "css-a11y-states-quiz-multiple", type: "multiple", prompt: T("Quelles règles aident une action disabled à rester compréhensible ?", "Which rules help a disabled action remain understandable?"), choices: choices(["cursor", "cursor: not-allowed"], ["contrast", T("Conserver le texte lisible", "Keep its label readable")], ["hide", "opacity: .2"]), answer: ["cursor", "contrast"], explanation },
    { id: "css-a11y-states-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : hover suffit pour signaler le focus clavier.", "True or false: hover is enough to signal keyboard focus."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-a11y-states-quiz-order", type: "ordering", prompt: T("Ordonne la vérification d'une action accessible.", "Order an accessible-action review."), choices: choices(["native", T("Vérifier la sémantique native", "Check native semantics")], ["keyboard", T("Parcourir au clavier", "Traverse by keyboard")], ["state", T("Inspecter hover, focus et disabled", "Inspect hover, focus, and disabled")], ["forced", T("Vérifier forced-colors", "Check forced-colors")]), answer: ["native", "keyboard", "state", "forced"], explanation },
    { id: "css-a11y-states-quiz-code", type: "code-reading", prompt: T("Que faut-il laisser au système en forced-colors ?", "What should be left to the system in forced-colors?"), choices: choices(["auto", "forced-color-adjust: auto"], ["none", "forced-color-adjust: none"], ["opacity", "opacity: .3"]), answer: "auto", explanation },
    { id: "css-a11y-states-quiz-open", type: "short-open", prompt: T("Nomme deux entrées différentes dont le focus doit rester visible.", "Name two different input methods whose focus must remain visible."), choices: [], answer: T(["clavier", "lien"], ["keyboard", "link"]), keywords: ["keyboard", "link"], explanation }
  ];
  return { id: "css-a11y-states-quiz", type: "quiz", title: T("Quiz États accessibles", "Accessible states quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz États accessibles", "Accessible states quiz"), brief, type: "quiz" }), skills: ["css-a11y-states"], difficulty: "quiz", durationMin: 24, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "focus" }], xp: 84, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre les états des commandes sans perdre navigation, cibles tactiles ni couleurs système.", "Ship the control states without losing navigation, touch targets, or system colors.");
  const course = courseFor(steps.at(-1), T("Le projet vérifie tous les états sur une vraie navigation avec action indisponible.", "The project checks every state on a real navigation with an unavailable action."));
  const guide = guideFor(steps.at(-1), T("Remplacer les couleurs de forced-colors par une palette de marque figée.", "Replacing forced-colors with a fixed brand palette."));
  return { id: "css-a11y-states-lab", type: "project", title: T("Lab États interactifs accessibles", "Accessible interactive states lab"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Lab États accessibles", "Accessible states lab"), brief, solution: ".link:focus-visible { outline: 3px solid currentColor; }", type: "project" }), skills: ["css-a11y-states", "keyboard", "forced-colors"], difficulty: "project", durationMin: 105, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les huit états et propriétés visent la bonne cible.", "Le lien conserve un focus visible distinct du hover.", "Les actions gardent 44px de hauteur et leur ordre DOM.", "forced-colors utilise la palette système sans masquer le texte."], ["All eight states and properties target the right element.", "The link keeps visible focus distinct from hover.", "Actions retain 44px height and DOM order.", "forced-colors uses the system palette without hiding text."]), hint: T("Pars du projet Responsive et distingue entrée, état, disponibilité puis mode système.", "Start from the Responsive project and distinguish input, state, availability, then system mode."), xp: 135 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
