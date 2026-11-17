const T = (fr, en) => ({ fr, en });

const scaffold = `.capstone-page {
  box-sizing: border-box;
  min-inline-size: 0;
}

.capstone-layout {
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.capstone-card {
  min-inline-size: 0;
  padding: 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 1rem;
}

.capstone-card__body {
  min-inline-size: 0;
}

.capstone-image {
  display: block;
  inline-size: 100%;
}`;

const steps = [
  { id: "css-capstone-space", selector: ":root", property: "--page-gutter", value: "clamp(1rem, 4vw, 3rem)", title: T("1. Définir un rythme fluide", "1. Set a fluid spacing rhythm"), brief: T("Centralise une gouttière qui grandit avec l'espace sans devenir excessive.", "Centralize a gutter that grows with available space without becoming excessive."), rule: ":root {\n  --page-gutter: clamp(1rem, 4vw, 3rem);\n}", example: ":root { --section-space: clamp(1rem, 3vw, 2.5rem); }" },
  { id: "css-capstone-clamp", selector: ".capstone-page h1", property: "font-size", value: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)", title: T("2. Borner la typographie du titre", "2. Bound the heading scale"), brief: T("Fais évoluer le titre sans saut abrupt ni taille illisible sur mobile.", "Scale the heading without abrupt jumps or unreadable mobile sizing."), rule: ".capstone-page h1 {\n  font-size: clamp(2rem, 1.2rem + 2.5vw, 3.5rem);\n}", example: ".page-title { font-size: clamp(1.75rem, 4vw, 3rem); }" },
  { id: "css-capstone-display-grid", selector: ".capstone-layout", property: "display", value: "grid", title: T("3. Construire la surface de projets", "3. Build the project surface"), brief: T("Compose les cartes dans une grille qui garde l'ordre source du document.", "Arrange the cards in a grid that preserves document source order."), rule: ".capstone-layout {\n  display: grid;\n}", example: ".project-list { display: grid; }" },
  { id: "css-capstone-auto-fit", selector: ".capstone-layout", property: "grid-template-columns", value: "repeat(auto-fit, minmax(17rem, 1fr))", title: T("4. Laisser les cartes trouver leur place", "4. Let cards find their own tracks"), brief: T("Répète les pistes qui tiennent dans leur conteneur sans breakpoint arbitraire.", "Repeat tracks that fit their container without an arbitrary breakpoint."), rule: ".capstone-layout {\n  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));\n}", example: ".project-list { grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }" },
  { id: "css-capstone-object-fit", selector: ".capstone-image", property: "object-fit", value: "cover", extra: [{ selector: ".capstone-image", property: "aspect-ratio", value: "16 / 9" }, { selector: ".capstone-image", property: "max-width", value: "100%" }], title: T("5. Stabiliser les médias réels", "5. Stabilize real media"), brief: T("Conserve un ratio stable et cadre l'image dans la largeur de sa carte.", "Keep a stable ratio and frame the image within its card width."), rule: ".capstone-image {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}", example: ".project-image { max-width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }" },
  { id: "css-capstone-container", selector: ".capstone-card", property: "container-type", value: "inline-size", container: { query: "(min-width: 24rem)", containerSelector: ".capstone-card", selector: ".capstone-card__body", property: "grid-template-columns", value: "minmax(0, 1fr) minmax(8rem, 12rem)" }, title: T("6. Rendre les cartes conscientes de leur place", "6. Make cards respond to their own space"), brief: T("Déclare un contexte de taille pour que chaque carte réagisse à la colonne où elle est rendue.", "Declare a size container so each card responds to the column where it is rendered."), rule: ".capstone-card {\n  container-type: inline-size;\n}\n\n@container (min-width: 24rem) {\n  .capstone-card__body {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(8rem, 12rem);\n  }\n}", example: ".project-card { container-type: inline-size; }" },
  { id: "css-capstone-media", selector: ".capstone-layout", property: "gap", value: "var(--page-gutter)", media: { query: "(min-width: 48rem)", selector: ".capstone-page", property: "width", value: "min(100%, 76rem)" }, title: T("7. Réutiliser le rythme entre cartes", "7. Reuse the rhythm between cards"), brief: T("Applique le token à l'espace de la grille et conserve une mesure cohérente sur grand écran.", "Apply the token to grid spacing and keep a consistent measure on wide screens."), rule: ".capstone-layout {\n  gap: var(--page-gutter);\n}\n\n@media (min-width: 48rem) {\n  .capstone-page {\n    width: min(100%, 76rem);\n    margin-inline: auto;\n  }\n}", example: "@media (min-width: 48rem) { .project-list { gap: var(--section-space); } }" },
  { id: "css-capstone-overflow-wrap", selector: ".capstone-card", property: "overflow-wrap", value: "anywhere", title: T("8. Résister au contenu extrême", "8. Withstand extreme content"), brief: T("Laisse les URL et identifiants longs revenir à la ligne sans masquer d'information.", "Let long URLs and identifiers wrap without hiding information."), rule: ".capstone-card {\n  overflow-wrap: anywhere;\n}", example: ".project-card { overflow-wrap: anywhere; }" }
];

export function createCapstoneModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
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
    id: "css-capstone", title: T("Capstone responsive", title[1]),
    description: T("Assemble les acquis CSS dans une page PulsaConf complète, testée avec de vrais contenus et plusieurs espaces.", "Assemble CSS outcomes into a complete PulsaConf page tested with real content and varied available space."),
    deliverable: T("Une page complète qui reste fluide, lisible et compréhensible avec ou sans mouvement.", "A complete page that remains fluid, readable, and understandable with or without motion."),
    importance: T("Les propriétés CSS isolées doivent fonctionner ensemble dans une expérience cohérente, pas seulement dans des exercices séparés.", "CSS properties must work together as a coherent experience, not only in isolated exercises."),
    prerequisites: T(["Avoir terminé Responsive, États accessibles et Motion", "Pouvoir expliquer les choix Grid et Flexbox"], ["Complete Responsive, Accessible States, and Motion", "Be able to explain Grid and Flexbox choices"]),
    outcomes: T(["Assembler tokens, zones, layout et médias", "Adapter page et cartes à leur largeur disponible", "Préserver focus et mouvement réduit dans le livrable final"], ["Combine tokens, areas, layout, and media", "Adapt the page and cards to available width", "Preserve focus and reduced motion in the final deliverable"]),
    vocabulary: ["design token", "auto-fit", "container query", "aspect ratio", "object-fit", "overflow-wrap", "reduced motion"],
    mastery: T(["Les cartes restent lisibles à 375 px et desktop", "Le contenu extrême reste visible sans scroll horizontal", "Les états clavier et préférences de mouvement sont préservés"], ["Cards remain readable at 375px and desktop", "Extreme content remains visible without horizontal scrolling", "Keyboard states and motion preferences are preserved"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildCapstoneModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n${scaffold}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », ajouter une valeur isolée sans vérifier qu'elle cohabite avec les modules précédents.`, `For “${step.title.en},” adding an isolated value without checking that it works with earlier modules.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-capstone", step.property], difficulty: order <= 3 ? "medium" : "hard", durationMin: 24,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Inspecte l'effet de ${step.property} sur l'ensemble du livrable, puis ajuste une seule contrainte.`, `Inspect how ${step.property} affects the whole deliverable, then adjust one constraint.`), xp: 60 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview associe médias, zones nommées, texte long, navigation et un état de mouvement.`, sections: [{ title: "Composer le système", paragraphs: ["Le capstone doit conserver les choix déjà validés de Grid, Flexbox, zones nommées et états.", "Centralise les valeurs fluides puis observe leur effet sur toutes les sections."], example: step.example }, { title: "Tester l'espace réel", paragraphs: ["La largeur du composant peut être différente de celle du viewport.", "Inspecte les cartes étroites, les titres longs, le cadrage des images et le repli des zones."], example: "@container (min-width: 24rem) { .card__body { display: grid; } }" }, { title: "Auditer les préférences", paragraphs: ["Navigue avec Tab et vérifie le focus sur le livrable complet.", "Active reduced motion et confirme que contenu et statut restent présents."], example: "@media (prefers-reduced-motion: reduce) { .motion-status { animation: none; } }" }], vocabulary: [[step.property, `Propriété appliquée au capstone avec ${step.value}.`], ["cohérence", "Les règles précédentes continuent de fonctionner ensemble."], ["preuve intégrée", "Observation de plusieurs exigences sur un seul livrable."]], check: ["Je conserve les acquis précédents.", "Je teste le contenu réel et plusieurs largeurs.", "Je cite une preuve pour chaque contrainte."] },
    en: { introduction: `${introduction.en} The preview combines media, named areas, long copy, navigation, and a motion state.`, sections: [{ title: "Compose the system", paragraphs: ["The capstone must preserve validated Grid, Flexbox, named-area, and state decisions.", "Centralize fluid values, then inspect their effect across all sections."], example: step.example }, { title: "Test real available space", paragraphs: ["Component width can differ from viewport width.", "Inspect narrow cards, long headings, image framing, and region wrapping."], example: "@container (min-width: 24rem) { .card__body { display: grid; } }" }, { title: "Audit preferences", paragraphs: ["Navigate with Tab and verify focus across the complete deliverable.", "Enable reduced motion and confirm content and status remain present."], example: "@media (prefers-reduced-motion: reduce) { .motion-status { animation: none; } }" }], vocabulary: [[step.property, `Property applied to the capstone with ${step.value}.`], ["coherence", "Earlier rules continue to work together."], ["integrated evidence", "Observation of multiple requirements on one deliverable."]], check: ["I preserve earlier outcomes.", "I test real content and varied widths.", "I cite evidence for each constraint."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les acquis CSS 00 à 11.", "Prouver le système sur viewport, conteneur et préférence réduite."], prerequisites: ["Lire la page PulsaConf complète.", "Repérer les valeurs déjà certifiées.", "Tester mobile, desktop et clavier."], steps: ["Observer l'ensemble avant de modifier.", "Ajouter une règle ciblée.", "Rejouer les preuves précédentes et nouvelles."], mistakes: [primaryMistake.fr, "Repartir d'une feuille vide.", "Supprimer focus ou reduced motion pour simplifier le rendu."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 11 outcomes.", "Prove the system across viewport, container, and reduced preference."], prerequisites: ["Read the complete PulsaConf page.", "Identify already certified values.", "Test mobile, desktop, and keyboard."], steps: ["Observe the whole page before editing.", "Add one targeted rule.", "Replay earlier and new evidence."], mistakes: [primaryMistake.en, "Starting from an empty stylesheet.", "Removing focus or reduced motion to simplify the output."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve les zones nommées", "Preserve named areas"), value: { selector: ".programme-grid", property: "grid-template-areas", value: '"intro intro" "sessions aside" "footer footer"' } },
    { type: "cssDeclaration", label: T("Conserve les états de focus", "Preserve focus states"), value: { selector: ".a11y-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    { type: "cssDeclaration", label: T("Conserve les couleurs système", "Preserve system colors"), value: { selector: ".a11y-action", property: "forced-color-adjust", value: "auto" } },
    { type: "cssMediaDeclaration", label: T("Conserve la réduction du mouvement", "Preserve reduced-motion behavior"), value: { query: "(prefers-reduced-motion: reduce)", selector: ".motion-status", property: "animation", value: "none" } },
    { type: "cssMediaDeclaration", label: T("Conserve le focus en couleurs forcées", "Preserve focus in forced colors"), value: { query: "(forced-colors: active)", selector: ".a11y-action:focus-visible", property: "outline-style", value: "solid" } },
    ...acquiredSteps.flatMap((step) => [
      { type: "cssDeclaration", label: T(`${step.property} reste correct dans le système complet`, `${step.property} remains correct in the complete system`), value: { selector: step.selector, property: step.property, value: step.value } },
      ...(step.extra || step.extraChecks || []).map((check) => ({ type: "cssDeclaration", label: T(`${check.property} protège le média`, `${check.property} protects media`), value: check })),
      ...(step.media ? [{ type: "cssMediaDeclaration", label: T("Le breakpoint agit dans le contexte prévu", "The breakpoint acts in the intended context"), value: { query: step.media.query, selector: step.media.selector || step.selector, property: step.media.property || step.property, value: step.media.value } }] : []),
      ...(step.container ? [
        { type: "cssDeclaration", label: T("Le conteneur adapte sa propre largeur", "The container adapts to its own width"), value: { selector: step.container.containerSelector, property: "container-type", value: "inline-size" } },
        { type: "cssContainerDeclaration", label: T("La composition répond au conteneur", "The composition responds to its container"), value: { query: step.container.query, containerSelector: step.container.containerSelector, selector: step.container.selector, property: step.container.property, value: step.container.value } }
      ] : [])
    ]),
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" },
    { type: "notContains", label: T("Ne masque pas les débordements", "Do not hide overflow"), value: "overflow: hidden" }
  ];
}

function preview() {
  const image = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%234f46e5'/%3E%3C/svg%3E";
  return T(
    `<main class="demo-surface capstone-page"><p class="stylesheet-status">Feuille CSS chargée</p><header class="hero-card course-card"><p class="eyebrow">PulsaConf · Capstone</p><h1>Un système cohérent dans chaque espace</h1><p class="lead">Une page complète conserve ses décisions de layout, de contenu et d'interaction.</p><nav class="site-nav" aria-label="Navigation du capstone"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Parcours de formation</span></div><div class="site-nav__actions"><a class="session-action a11y-action action" href="#projects">Projets</a><a class="session-action a11y-action action" href="#contact">Contact</a></div></nav></header><section class="capstone-layout" aria-label="Projets PulsaConf"><article class="capstone-card"><img class="capstone-image" src="${image}" alt="" /><div class="capstone-card__body"><div><h2>Interface accessible</h2><p>Une description suffisamment longue pour tester les mesures et le reflow des cartes avec un contenu réaliste.</p><p class="capstone-id">pulsaconf-capstone-identifiant-de-projet-extremement-long-2026</p></div><p>Projet · 12 ateliers</p></div><a class="session-action a11y-action motion-card action" href="#accessible">Ouvrir le projet</a></article><article class="capstone-card"><img class="capstone-image" src="${image}" alt="" /><div class="capstone-card__body"><div><h2>Composition responsive</h2><p>Les médias gardent leur ratio et le texte reste visible dans les pistes utiles.</p></div><p>Projet · 8 ateliers</p></div><a class="session-action a11y-action motion-card action" href="#responsive">Lire le projet</a></article></section><p class="motion-status" role="status">Dernière vérification : tous les états sont actifs.</p><footer class="programme-footer"><p>PulsaTeach · CSS capstone</p></footer></main>`,
    `<main class="demo-surface capstone-page"><p class="stylesheet-status">CSS file loaded</p><header class="hero-card course-card"><p class="eyebrow">PulsaConf · Capstone</p><h1>A coherent system in every space</h1><p class="lead">A complete page preserves layout, content, and interaction decisions.</p><nav class="site-nav" aria-label="Capstone navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Learning paths</span></div><div class="site-nav__actions"><a class="session-action a11y-action action" href="#projects">Projects</a><a class="session-action a11y-action action" href="#contact">Contact</a></div></nav></header><section class="capstone-layout" aria-label="PulsaConf projects"><article class="capstone-card"><img class="capstone-image" src="${image}" alt="" /><div class="capstone-card__body"><div><h2>Accessible interface</h2><p>A deliberately long description tests measure and card reflow with realistic content.</p><p class="capstone-id">pulsaconf-capstone-extremely-long-project-identifier-2026</p></div><p>Project · 12 workshops</p></div><a class="session-action a11y-action motion-card action" href="#accessible">Open project</a></article><article class="capstone-card"><img class="capstone-image" src="${image}" alt="" /><div class="capstone-card__body"><div><h2>Responsive composition</h2><p>Media keep their ratio and text remains visible in useful tracks.</p></div><p>Project · 8 workshops</p></div><a class="session-action a11y-action motion-card action" href="#responsive">Read project</a></article></section><p class="motion-status" role="status">Last check: all states are active.</p><footer class="programme-footer"><p>PulsaTeach · CSS capstone</p></footer></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Audite l'interaction entre layout, fluidité, médias et préférences.", "Audit the interaction between layout, fluid sizing, media, and preferences.");
  const course = courseFor(steps[0], T("Le quiz vérifie qu'une correction locale ne retire pas les acquis déjà réunis dans la page.", "The quiz checks that a local fix does not remove outcomes already combined in the page."));
  const guide = guideFor(steps[0], T("Répondre en validant une seule largeur sans vérifier les préférences de mouvement.", "Answering by checking one width without verifying motion preference."));
  const explanation = T("Un capstone valide les relations entre les règles, pas seulement leur présence isolée.", "A capstone validates relationships between rules, not just their isolated presence.");
  const questions = [
    { id: "css-capstone-quiz-single", type: "single", prompt: T("Quelle preuve montre qu'une container query répond à la carte ?", "Which evidence shows that a container query responds to the card?"), choices: choices(["resize-card", T("Réduire la carte sans changer le viewport", "Resize the card without changing the viewport")], ["resize-window", T("Changer seulement la largeur de la fenêtre", "Only resize the window")], ["guess", T("Lire la valeur dans le code sans tester", "Read the value in code without testing")]), answer: "resize-card", explanation },
    { id: "css-capstone-quiz-multiple", type: "multiple", prompt: T("Quelles preuves appartiennent à une revue capstone complète ?", "Which evidence belongs in a complete capstone review?"), choices: choices(["viewport", T("375 px et desktop", "375px and desktop")], ["container", T("Carte étroite et large", "Narrow and wide card")], ["keyboard", T("Ordre clavier et focus", "Keyboard order and focus")], ["one", T("Une capture desktop unique", "One desktop screenshot")]), answer: ["viewport", "container", "keyboard"], explanation },
    { id: "css-capstone-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : réduire le mouvement peut masquer le statut sans autre preuve.", "True or false: reduced motion may hide a status without another cue."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-capstone-quiz-order", type: "ordering", prompt: T("Ordonne la revue intégrée.", "Order the integrated review."), choices: choices(["baseline", T("Vérifier la base mobile", "Check the mobile baseline")], ["content", T("Charger contenu et médias réels", "Load real content and media")], ["adapt", T("Tester viewport et conteneur", "Test viewport and container")], ["states", T("Vérifier clavier et mouvement réduit", "Check keyboard and reduced motion")]), answer: ["baseline", "content", "adapt", "states"], explanation },
    { id: "css-capstone-quiz-code", type: "code-reading", prompt: T("Quel comportement est souhaité dans forced-colors et reduced motion ?", "Which behavior is desired in forced-colors and reduced motion?"), choices: choices(["preserve", T("Garder les couleurs système, retirer le mouvement décoratif", "Keep system colors and remove decorative motion")], ["override", T("Imposer palette et animation de marque", "Force brand colors and animation")], ["hide", T("Masquer tous les contrôles", "Hide all controls")]), answer: "preserve", explanation },
    { id: "css-capstone-quiz-open", type: "short-open", prompt: T("Cite deux axes de taille et une préférence à vérifier.", "Name two sizing contexts and one preference to verify."), choices: [], answer: T(["viewport", "conteneur", "mouvement réduit"], ["viewport", "container", "reduced motion"]), keywords: ["viewport", "container", "motion"], explanation }
  ];
  return { id: "css-capstone-quiz", type: "quiz", title: T("Quiz Capstone CSS", "CSS capstone quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Capstone", "Capstone quiz"), brief, type: "quiz" }), skills: ["css-capstone"], difficulty: "quiz", durationMin: 28, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "resize-card" }], xp: 95, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre la page finale PulsaConf et prouve qu'elle reste utilisable dans plusieurs contextes réels.", "Ship the final PulsaConf page and prove it remains usable across real contexts.");
  const course = courseFor(steps.at(-1), T("Le capstone assemble les acquis CSS 00 à 11 dans une même page et des cartes de largeur variable.", "The capstone combines CSS 00 through 11 outcomes in one page and variable-width cards."));
  const guide = guideFor(steps.at(-1), T("Retirer des règles antérieures pour faire passer une seule assertion du nouveau projet.", "Removing earlier rules to make one new project assertion pass."));
  return { id: "css-capstone-lab", type: "project", title: T("Projet final : système CSS PulsaConf", "Final project: PulsaConf CSS system"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Projet final CSS", "CSS final project"), brief, solution: ".capstone-layout { grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); }", type: "project" }), skills: ["css-capstone", "responsive-audit", "accessibility"], difficulty: "project", durationMin: 150, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Le token, la page et les pistes restent fluides.", "Les cartes répondent à leur conteneur et gardent les médias stables.", "Zones, navigation, focus et ordre source sont conservés.", "Mouvement réduit et contenu extrême restent compréhensibles."], ["Token, page, and tracks remain fluid.", "Cards respond to their container and keep media stable.", "Areas, navigation, focus, and source order are preserved.", "Reduced motion and extreme content remain understandable."]), hint: T("Pars du lab Motion, garde ses preuves, puis assemble les huit décisions capstone sans simplifier les contenus.", "Start from the Motion lab, preserve its evidence, then combine all eight capstone decisions without simplifying content."), xp: 180 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
