const T = (fr, en) => ({ fr, en });

const steps = [
  { id: "css-motion-transition", selector: ".motion-card", property: "transition", value: "transform 180ms ease-out", title: T("1. Limiter la transition à transform", "1. Limit the transition to transform"), brief: T("Anime seulement le déplacement décoratif de la carte, pas ses dimensions ou son contenu.", "Animate only the card's decorative movement, not its size or content."), rule: ".motion-card {\n  transition: transform 180ms ease-out;\n}", example: ".workshop-card { transition: transform 160ms ease-out; }" },
  { id: "css-motion-transform", selector: ".motion-card:hover", property: "transform", value: "translateY(-2px)", title: T("2. Déplacer sans reflow", "2. Move without reflow"), brief: T("Soulève légèrement la carte au survol avec transform au lieu d'une marge.", "Lift the card slightly on hover with transform instead of a margin."), rule: ".motion-card:hover {\n  transform: translateY(-2px);\n}", example: ".workshop-card:hover { transform: translateY(-2px); }" },
  { id: "css-motion-hover", selector: ".motion-action:hover", property: "text-decoration", value: "underline", title: T("3. Garder le hover informatif", "3. Keep hover informative"), brief: T("Souligne aussi l'action au pointeur pour qu'elle ne communique pas seulement par mouvement.", "Also underline the pointer action so it does not communicate through motion alone."), rule: ".motion-action:hover {\n  text-decoration: underline;\n}", example: ".workshop-link:hover { text-decoration: underline; }" },
  { id: "css-motion-prefers-reduced-motion", selector: ".motion-card", property: "transition", value: "transform 180ms ease-out", media: { query: "(prefers-reduced-motion: reduce)", value: "none", extra: [{ selector: ".motion-card:hover", property: "transform", value: "none" }] }, title: T("4. Respecter la préférence de mouvement", "4. Respect the motion preference"), brief: T("Supprime transition et déplacement non essentiels lorsque le système demande de réduire le mouvement.", "Remove nonessential transition and movement when the system requests reduced motion."), rule: ".motion-card {\n  transition: transform 180ms ease-out;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .motion-card {\n    transition: none;\n    transform: none;\n  }\n  .motion-card:hover {\n    transition: none;\n    transform: none;\n  }\n}", example: "@media (prefers-reduced-motion: reduce) { .panel, .panel:hover { transition: none; transform: none; } }" },
  { id: "css-motion-animation", selector: ".motion-status", property: "animation", value: "pulse 1.2s ease-in-out 2", media: { query: "(prefers-reduced-motion: reduce)", value: "none" }, title: T("5. Borner une animation décorative", "5. Bound a decorative animation"), brief: T("Limite l'animation du statut à deux répétitions et la désactive si le mouvement réduit est demandé.", "Limit status animation to two iterations and disable it when reduced motion is requested."), rule: ".motion-status {\n  animation: pulse 1.2s ease-in-out 2;\n}\n\n@keyframes pulse {\n  50% { opacity: .55; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .motion-status {\n    animation: none;\n  }\n}", example: ".availability { animation: pulse 1s ease-in-out 2; }" },
  { id: "css-motion-transform-origin", selector: ".motion-card", property: "transform-origin", value: "center", title: T("6. Choisir le point d'ancrage", "6. Choose the transform origin"), brief: T("Garde la transformation centrée pour éviter un basculement inattendu du composant.", "Keep the transformation centered to avoid an unexpected pivot."), rule: ".motion-card {\n  transform-origin: center;\n}", example: ".workshop-card { transform-origin: center; }" },
  { id: "css-motion-will-change", selector: ".motion-card", property: "will-change", value: "auto", title: T("7. Ne pas promouvoir sans besoin", "7. Avoid unnecessary promotion"), brief: T("Laisse le navigateur gérer l'optimisation sans réserver de ressources en permanence.", "Let the browser manage optimization without permanently reserving resources."), rule: ".motion-card {\n  will-change: auto;\n}", example: ".workshop-card { will-change: auto; }" },
  { id: "css-motion-transition-none", selector: ".motion-action", property: "transition", value: "transform 160ms ease-out", media: { query: "(prefers-reduced-motion: reduce)", value: "none", extra: [{ selector: ".motion-action:hover", property: "transform", value: "none" }] }, title: T("8. Couper aussi le mouvement des actions", "8. Disable motion on actions too"), brief: T("Retire la transition des actions en mode réduit sans supprimer leur retour visuel immédiat.", "Remove action transitions in reduced mode without removing immediate visual feedback."), rule: ".motion-action {\n  transition: transform 160ms ease-out;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .motion-action {\n    transition: none;\n    transform: none;\n  }\n  .motion-action:hover {\n    transition: none;\n    transform: none;\n  }\n}", example: "@media (prefers-reduced-motion: reduce) { .button, .button:hover { transition: none; transform: none; } }" }
];

export function createMotionModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const projectStarter = `${baseCss}\n\n.motion-status {\n  animation: none;\n}`;
  let current = projectStarter;
  const lessons = steps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return lessonFor(step, index + 1, starterCode, current, createPedagogy);
  });
  lessons.push(quizFor(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectFor(projectStarter, current, createPedagogy));
  return {
    id: "css-motion", title: T("Motion responsable", title[1]),
    description: T("Ajoute des retours de mouvement courts, informatifs et supprimables selon les préférences.", "Add short, informative motion feedback that respects user preferences."),
    deliverable: T("Des états animés bornés avec un résultat équivalent en mouvement réduit.", "Bounded animated states with an equivalent reduced-motion outcome."),
    importance: T("Un mouvement décoratif peut gêner certaines personnes ; sa suppression ne doit jamais cacher l'état ni l'action.", "Decorative motion can make interfaces uncomfortable; removing it must never hide state or action."),
    prerequisites: T(["Avoir terminé États accessibles", "Connaître hover, focus-visible et media queries"], ["Complete accessible states", "Know hover, focus-visible, and media queries"]),
    outcomes: T(["Animer seulement les propriétés adaptées", "Borner durée et répétitions", "Respecter prefers-reduced-motion sans perte d'information"], ["Animate only suitable properties", "Bound duration and iteration count", "Respect prefers-reduced-motion without losing information"]),
    vocabulary: ["transition", "transform", "transform-origin", "animation", "keyframes", "will-change", "prefers-reduced-motion"],
    mastery: T(["Le layout ne saute pas au hover", "L'animation s'arrête après deux répétitions", "Le statut reste compréhensible sans mouvement"], ["Layout does not jump on hover", "Animation stops after two iterations", "Status remains understandable without motion"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildMotionModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n.motion-status {\n  animation: none;\n}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », animer le layout sans mesurer les effets ni vérifier la préférence système.`, `For “${step.title.en},” animating layout without checking impact or system preference.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-motion", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Observe l'état de ${step.selector}, puis vérifie la préférence reduced motion.`, `Inspect the state of ${step.selector}, then check the reduced-motion preference.`), xp: 55 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview distingue mouvement décoratif, statut utile et contrôle clavier.`, sections: [{ title: "Choisir le mouvement", paragraphs: ["Privilégie transform et opacity plutôt que top, left ou des dimensions qui déplacent la page.", "Une transition courte rend le changement perceptible sans prolonger l'interaction."], example: step.example }, { title: "Rendre l'animation finie", paragraphs: ["Limite les répétitions et garde un état final compréhensible.", "N'utilise will-change que pour une optimisation justifiée et temporaire."], example: ".status { animation: pulse 1.2s ease-in-out 2; }" }, { title: "Respecter les préférences", paragraphs: ["prefers-reduced-motion désactive le mouvement non essentiel.", "Le contenu et le statut doivent rester visibles même quand transition et animation sont retirées."], example: "@media (prefers-reduced-motion: reduce) { .card { transition: none; } }" }], vocabulary: [[step.property, `Propriété travaillée avec ${step.value}.`], ["mouvement réduit", "Préférence système pour réduire les mouvements non essentiels."], ["état final", "Aspect stable après la fin d'une transition ou animation."]], check: ["Je n'anime pas le layout.", "Je borne durée et répétitions.", "Je garde l'information sans mouvement."] },
    en: { introduction: `${introduction.en} The preview distinguishes decorative motion, useful status, and keyboard controls.`, sections: [{ title: "Choose the motion", paragraphs: ["Prefer transform and opacity over top, left, or dimensions that move the page.", "A short transition makes a change perceivable without prolonging interaction."], example: step.example }, { title: "Keep animation finite", paragraphs: ["Limit iterations and preserve an understandable final state.", "Use will-change only for a justified, temporary optimization."], example: ".status { animation: pulse 1.2s ease-in-out 2; }" }, { title: "Respect preferences", paragraphs: ["prefers-reduced-motion disables nonessential movement.", "Content and status must remain visible when transitions and animation are removed."], example: "@media (prefers-reduced-motion: reduce) { .card { transition: none; } }" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["reduced motion", "System preference for reducing nonessential movement."], ["final state", "Stable appearance after a transition or animation ends."]], check: ["I do not animate layout.", "I bound duration and iterations.", "I preserve information without motion."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 10.", "Prouver le comportement avec mouvement normal et réduit."], prerequisites: ["Lire les états interactifs.", "Repérer transition et animation.", "Activer la préférence reduced motion."], steps: ["Identifier si le mouvement est informatif.", "Ajouter une règle bornée.", "Comparer hover normal et préférence réduite."], mistakes: [primaryMistake.fr, "Animer width ou margin pour produire un effet décoratif.", "Supprimer le statut au lieu de supprimer son animation."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 10 decisions.", "Prove normal and reduced-motion behavior."], prerequisites: ["Read the interactive states.", "Identify transitions and animation.", "Enable the reduced-motion preference."], steps: ["Decide whether motion carries information.", "Add a bounded rule.", "Compare normal hover with reduced preference."], mistakes: [primaryMistake.en, "Animating width or margin for decoration.", "Removing status instead of removing its animation."] }
  };
}

function testsFor(acquiredSteps) {
  return [
    { type: "cssDeclaration", label: T("Conserve le focus clavier visible", "Preserve visible keyboard focus"), value: { selector: ".a11y-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    ...acquiredSteps.flatMap((step) => [
      { type: "cssDeclaration", label: T(`${step.property} vise l'élément attendu`, `${step.property} targets the expected element`), value: { selector: step.selector, property: step.property, value: step.value } },
      ...(step.media ? [
        { type: "cssMediaDeclaration", label: T("Le mouvement est retiré en préférence réduite", "Motion is removed for reduced-motion preference"), value: { query: step.media.query, selector: step.selector, property: step.property, value: step.media.value } },
        ...(step.media.extra || []).map((check) => ({ type: "cssMediaDeclaration", label: T("Aucun déplacement décoratif en préférence réduite", "No decorative movement with reduced-motion preference"), value: { query: step.media.query, ...check } }))
      ] : [])
    ]),
    { type: "notContains", label: T("N'anime pas les dimensions", "Do not animate dimensions"), value: "transition: all" },
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
}

function preview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Mouvement responsable</p><h1>Des retours clairs, jamais obligatoires</h1><nav class="site-nav" aria-label="Navigation de session"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Atelier : interactions confortables</span></div><div class="site-nav__actions"><a class="session-action a11y-action motion-card motion-action action" href="#sessions">Voir les sessions</a><button class="session-action a11y-action motion-card motion-action action" type="button">Ouvrir le programme</button></div></nav><p class="motion-status" role="status">Inscription ouverte · 12 places</p><p class="responsive-copy">Le statut reste visible même si son animation est désactivée.</p></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Responsible motion</p><h1>Clear feedback, never required</h1><nav class="site-nav" aria-label="Session navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span>Workshop: comfortable interactions</span></div><div class="site-nav__actions"><a class="session-action a11y-action motion-card motion-action action" href="#sessions">View sessions</a><button class="session-action a11y-action motion-card motion-action action" type="button">Open schedule</button></div></nav><p class="motion-status" role="status">Registration open · 12 seats</p><p class="responsive-copy">The status stays visible even when its animation is disabled.</p></section></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique transition, animation et préférence réduite.", "Diagnose transitions, animation, and reduced-motion preference.");
  const course = courseFor(steps[3], T("Le quiz distingue un retour bref, une animation bornée et leur suppression dans le mode réduit.", "The quiz distinguishes brief feedback, bounded animation, and removal in reduced-motion mode."));
  const guide = guideFor(steps[3], T("Répondre en gardant l'animation active parce qu'elle confirme le statut.", "Answering by keeping animation active because it confirms status."));
  const explanation = T("Le mouvement peut compléter le signal, mais l'information doit rester sans lui.", "Motion may complement a cue, but information must remain without it." );
  const questions = [
    { id: "css-motion-quiz-single", type: "single", prompt: T("Quelle propriété évite de réanimer la géométrie du layout ?", "Which property avoids animating layout geometry?"), choices: choices(["transform", "transform"], ["width", "width"], ["margin", "margin"]), answer: "transform", explanation },
    { id: "css-motion-quiz-multiple", type: "multiple", prompt: T("Quelles mesures rendent une animation moins envahissante ?", "Which choices make animation less intrusive?"), choices: choices(["short", T("Durée courte", "Short duration")], ["finite", T("Répétitions limitées", "Limited iterations")], ["infinite", T("Répétition infinie", "Infinite repetition")]), answer: ["short", "finite"], explanation },
    { id: "css-motion-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : réduire le mouvement signifie cacher le statut animé.", "True or false: reduced motion means hiding the animated status."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-motion-quiz-order", type: "ordering", prompt: T("Ordonne la vérification d'une micro-interaction.", "Order a micro-interaction check."), choices: choices(["intent", T("Définir l'information transmise", "Define the information conveyed")], ["motion", T("Choisir un mouvement non essentiel", "Choose nonessential motion")], ["bound", T("Borner la durée", "Bound the duration")], ["reduce", T("Tester prefers-reduced-motion", "Test prefers-reduced-motion")]), answer: ["intent", "motion", "bound", "reduce"], explanation },
    { id: "css-motion-quiz-code", type: "code-reading", prompt: T("Que faut-il à une animation décorative qui se répète ?", "What should a repeating decorative animation have?"), choices: choices(["bound", T("Un nombre d'itérations limité", "A limited iteration count")], ["infinite", T("Une durée infinie", "An infinite duration")], ["hide", T("Un statut masqué", "A hidden status")]), answer: "bound", explanation },
    { id: "css-motion-quiz-open", type: "short-open", prompt: T("Nomme la préférence système qui réduit les mouvements non essentiels.", "Name the system preference that reduces nonessential motion."), choices: [], answer: ["prefers-reduced-motion"], keywords: ["prefers-reduced-motion"], explanation }
  ];
  return { id: "css-motion-quiz", type: "quiz", title: T("Quiz Motion responsable", "Responsible motion quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Motion", "Motion quiz"), brief, type: "quiz" }), skills: ["css-motion"], difficulty: "quiz", durationMin: 24, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "transform" }], xp: 88, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre une micro-interaction lisible avec et sans mouvement.", "Ship a readable micro-interaction with or without motion.");
  const course = courseFor(steps.at(-1), T("Le lab vérifie transition au survol, statut borné et retrait du mouvement non essentiel." , "The lab checks hover transition, bounded status animation, and removal of nonessential motion."));
  const guide = guideFor(steps.at(-1), T("Laisser les animations actives dans le mode réduit ou supprimer leur statut." , "Leaving animations active in reduced mode or removing their status."));
  return { id: "css-motion-lab", type: "project", title: T("Lab Mouvement responsable", "Responsible motion lab"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Lab Motion", "Motion lab"), brief, solution: ".motion-card { transition: transform 180ms ease-out; }", type: "project" }), skills: ["css-motion", "reduced-motion", "interaction-design"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Le hover ne modifie pas la géométrie du layout.", "L'animation du statut a une durée et un nombre d'itérations bornés.", "prefers-reduced-motion retire transition et animation sans cacher l'information.", "Le focus clavier et la navigation précédemment certifiés restent visibles."], ["Hover does not change layout geometry.", "Status animation has bounded duration and iteration count.", "prefers-reduced-motion removes transition and animation without hiding information.", "Keyboard focus and previously certified navigation remain visible."]), hint: T("Pars du projet États accessibles, détermine l'information, puis retire seulement le mouvement non essentiel.", "Start from the Accessible States project, identify the information, then remove only nonessential motion."), xp: 145 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
