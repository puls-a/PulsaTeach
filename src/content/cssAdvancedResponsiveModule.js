const T = (fr, en) => ({ fr, en });

const scaffold = `.audit-page {
  min-inline-size: 0;
  width: min(100%, 74rem);
  margin-inline: auto;
  padding-inline: 1rem;
}

.audit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
}

.audit-card {
  min-inline-size: 0;
  padding: 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 1rem;
}

.audit-card__media {
  display: block;
  inline-size: 100%;
}

.audit-card__body {
  min-inline-size: 0;
}

.audit-nav {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}`;

const steps = [
  {
    id: "css-07-fluid-type", selector: ".audit-page h2", property: "font-size", value: "clamp(1.2rem, 1rem + 1vw, 1.8rem)",
    title: T("1. Borner une échelle typographique", "1. Bound a fluid type scale"),
    mistake: T("Utiliser une taille fixe pour le titre et ne vérifier ni sa borne minimale ni sa borne maximale.", "Using a fixed heading size without checking its minimum or maximum bound."),
    brief: T("Fais évoluer les titres entre des bornes lisibles au lieu de choisir une taille fixe ou de suivre toute la largeur du viewport.", "Scale headings between readable bounds instead of choosing a fixed size or tracking the full viewport width."),
    rule: ".audit-page h2 {\n  font-size: clamp(1.2rem, 1rem + 1vw, 1.8rem);\n}",
    example: ".article h2 { font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem); }"
  },
  {
    id: "css-07-fluid-spacing", selector: ".audit-grid", property: "gap", value: "var(--audit-space)", token: { selector: ":root", property: "--audit-space", value: "clamp(1rem, 2vw, 2rem)" },
    title: T("2. Relier le rythme à l'espace disponible", "2. Tie spacing rhythm to available space"),
    mistake: T("Déclarer un token fluide puis laisser la grille utiliser un espacement fixe différent.", "Declaring a fluid token while leaving the grid on a different fixed gap."),
    brief: T("Centralise un espacement borné et réutilise-le dans la grille sans ajouter un breakpoint de décoration.", "Centralize bounded spacing and reuse it in the grid without adding a decorative breakpoint."),
    rule: ":root {\n  --audit-space: clamp(1rem, 2vw, 2rem);\n}\n\n.audit-grid {\n  gap: var(--audit-space);\n}",
    example: ":root { --section-gap: clamp(1rem, 2vw, 2rem); }\n.cards { gap: var(--section-gap); }"
  },
  {
    id: "css-07-responsive-images", selector: ".audit-card__media", property: "object-fit", value: "cover",
    extra: [{ selector: ".audit-card__media", property: "aspect-ratio", value: "3 / 2" }, { selector: ".audit-card__media", property: "object-position", value: "center" }, { selector: ".audit-card__media", property: "max-width", value: "100%" }],
    title: T("3. Cadrer les images sans déformer leur boîte", "3. Crop images without distorting their box"),
    mistake: T("Étendre l'image pour remplir sa boîte sans définir le ratio et la règle de cadrage.", "Stretching an image to fill its box without defining its ratio and crop behavior."),
    brief: T("Donne un ratio constant à la galerie puis choisis le cadrage; le média garde sa boîte même si sa source est très différente.", "Give the gallery a stable ratio, then choose its crop; the media keeps its box even when its source differs."),
    rule: ".audit-card__media {\n  max-width: 100%;\n  aspect-ratio: 3 / 2;\n  object-fit: cover;\n  object-position: center;\n}",
    example: ".gallery img { aspect-ratio: 4 / 3; object-fit: cover; object-position: center; }"
  },
  {
    id: "css-07-container-queries", selector: ".audit-card__body", property: "grid-template-columns", value: "minmax(0, 1fr) minmax(8rem, 12rem)",
    container: { query: "audit-card (min-width: 20rem)", containerSelector: ".audit-card", selector: ".audit-card__body", property: "grid-template-columns", value: "minmax(0, 1fr) minmax(8rem, 12rem)" },
    title: T("4. Nommer le contexte d'une carte", "4. Name a card's layout context"),
    mistake: T("Tester seulement le viewport alors que la carte rétrécit dans sa propre colonne.", "Testing only the viewport while the card becomes narrow in its own column."),
    brief: T("La même carte peut vivre dans une colonne ou une modale. Déclare son conteneur et ne redistribue son contenu qu'une fois sa propre largeur suffisante.", "The same card can live in a column or a dialog. Declare its container and redistribute its contents only when its own width is sufficient."),
    rule: ".audit-card {\n  container-type: inline-size;\n  container-name: audit-card;\n}\n\n@container audit-card (min-width: 20rem) {\n  .audit-card__body {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(8rem, 12rem);\n  }\n}",
    example: ".profile-card { container: profile / inline-size; }\n@container profile (min-width: 30rem) { .profile-card__body { display: grid; } }"
  },
  {
    id: "css-07-responsive-navigation", selector: ".audit-nav", property: "overflow-x", value: "auto",
    media: { query: "(min-width: 48rem)", selector: ".audit-nav", property: "overflow-x", value: "visible" },
    title: T("5. Garder les actions accessibles dans une barre étroite", "5. Keep actions reachable in a narrow toolbar"),
    mistake: T("Masquer les liens qui ne tiennent pas dans la barre au lieu de conserver un défilement local.", "Hiding links that do not fit instead of preserving local scrolling."),
    brief: T("Sur une barre contrainte, conserve les actions dans l'ordre avec un défilement local; à partir d'un espace large, redistribue-les sans les masquer.", "In a constrained toolbar, keep actions in order with local scrolling; when space grows, distribute them without hiding any."),
    rule: ".audit-nav {\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n  overscroll-behavior-inline: contain;\n}\n\n@media (min-width: 48rem) {\n  .audit-nav {\n    justify-content: space-between;\n    overflow-x: visible;\n  }\n}",
    example: ".toolbar { display: flex; overflow-x: auto; }\n@media (min-width: 48rem) { .toolbar { justify-content: space-between; overflow-x: visible; } }"
  }
];

export function createAdvancedResponsiveModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
  const starter = `${baseCss}\n\n${scaffold}`;
  let current = starter;
  const lessons = steps.map((step, index) => {
    const lessonStarter = current;
    current = `${current}\n\n${step.rule}`;
    return practiceLesson(step, index + 1, lessonStarter, current, createPedagogy);
  });
  lessons.push(quizLesson(moduleIndex, createPedagogy));
  if (includeProject) lessons.push(projectLesson(starter, current, createPedagogy));
  return {
    id: "css-advanced-responsive",
    title: T("Systèmes responsive avancés", title[1]),
    description: T("Construis un audit de composants réutilisables : échelles fluides, cadrage média, conteneurs nommés et navigation complète.", "Build an audit of reusable components: fluid scales, media crop, named containers, and complete navigation."),
    deliverable: T("Une galerie éditoriale testée dans plusieurs espaces, avec contenu et actions toujours accessibles.", "An editorial gallery tested in varied spaces, with content and actions always reachable."),
    importance: T("Les composants avancés rencontrent des contraintes locales qui ne se déduisent pas d'une seule largeur de fenêtre.", "Advanced components face local constraints that cannot be inferred from one viewport width."),
    prerequisites: T(["Avoir terminé le capstone Responsive et Motion", "Savoir lire Grid, clamp et container queries"], ["Complete the Responsive Motion capstone", "Know how to read Grid, clamp, and container queries"]),
    outcomes: T(["Borner des échelles fluides", "Nommer puis tester un contexte de conteneur", "Garder médias et actions utilisables dans les espaces contraints"], ["Bound fluid scales", "Name and test a container context", "Keep media and actions usable in constrained spaces"]),
    vocabulary: ["fluid scale", "object-position", "named container", "intrinsic layout", "local overflow", "responsive audit"],
    mastery: T(["Les valeurs fluides ont des bornes", "Une carte réagit à sa largeur propre", "Aucune action n'est masquée par le débordement"], ["Fluid values have bounds", "A card responds to its own width", "No action is hidden by overflow"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildAdvancedResponsiveModuleCss(baseCss) {
  const starter = `${baseCss}\n\n${scaffold}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, starter);
}

function practiceLesson(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step);
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief,
    course, guide, pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-advanced-responsive", step.property], difficulty: order <= 2 ? "medium" : "hard", durationMin: 24,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Compare ${step.selector} dans une carte étroite et large, puis vérifie la règle locale active.`, `Compare ${step.selector} in a narrow and wide card, then verify the active local rule.`),
    xp: 60 + order
  };
}

function courseFor(step, brief) {
  return {
    fr: { introduction: `${brief.fr} La preview contient une galerie éditoriale, des médias cadrés, un identifiant long et trois actions de navigation.`, sections: [
      { title: "Choisir une échelle, pas une valeur arbitraire", paragraphs: ["clamp() relie une valeur à l'espace disponible tout en conservant une borne basse et haute.", "Un token partagé permet de garder le même rythme entre les composants."], example: step.example },
      { title: "Tester le composant dans son emplacement", paragraphs: ["Un composant réutilisable peut être étroit même sur un grand écran.", "La container query doit dépendre du conteneur nommé, pas du viewport."], example: "container: audit-card / inline-size;" },
      { title: "Auditer sans cacher l'information", paragraphs: ["Garde le ratio et le cadrage des médias distincts.", "Sur une barre étroite, toutes les actions restent atteignables dans l'ordre source."], example: "overflow-x: auto; overscroll-behavior-inline: contain;" }
    ], vocabulary: [[step.property, `Valeur responsive vérifiée : ${step.value}.`], ["contexte nommé", "Conteneur identifié auquel une règle locale peut répondre."], ["cadrage", "Partie visible d'un média qui remplit un ratio stable."]], check: ["Je teste une carte à deux largeurs.", "Je distingue la taille de la fenêtre et celle du composant.", "Je peux atteindre toutes les actions sans masquer le contenu."] },
    en: { introduction: `${brief.en} The preview includes an editorial gallery, cropped media, a long identifier, and three navigation actions.`, sections: [
      { title: "Choose a scale, not an arbitrary value", paragraphs: ["clamp() relates a value to available space while preserving lower and upper bounds.", "A shared token keeps rhythm consistent across components."], example: step.example },
      { title: "Test the component in its slot", paragraphs: ["A reusable component can be narrow even on a wide screen.", "The container query must depend on the named container, not the viewport."], example: "container: audit-card / inline-size;" },
      { title: "Audit without hiding information", paragraphs: ["Keep media ratio and crop as separate decisions.", "In a narrow toolbar, every action remains reachable in source order."], example: "overflow-x: auto; overscroll-behavior-inline: contain;" }
    ], vocabulary: [[step.property, `Verified responsive value: ${step.value}.`], ["named context", "Identified container that a local rule can respond to."], ["crop", "Visible part of media that fills a stable ratio."]], check: ["I test one card at two widths.", "I distinguish viewport size from component size.", "I can reach every action without hiding content."] }
  };
}

function guideFor(step, primaryMistake = step.mistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les acquis CSS précédents.", "Prouver la réponse locale au conteneur."], prerequisites: ["Lire la feuille cumulative.", "Repérer la largeur réelle de la carte.", "Suivre les actions dans l'ordre clavier."], steps: ["Reproduire le défaut dans la carte étroite.", "Modifier une seule contrainte CSS.", "Retester carte étroite, carte large et préférences."], mistakes: [primaryMistake.fr, "Confondre object-fit et aspect-ratio.", "Masquer les actions derrière overflow hidden."] },
    en: { objectives: [step.brief.en, "Preserve earlier CSS outcomes.", "Prove the local response to the container."], prerequisites: ["Read the cumulative stylesheet.", "Identify the card's actual width.", "Follow actions in keyboard order."], steps: ["Reproduce the issue in the narrow card.", "Change one CSS constraint.", "Retest narrow card, wide card, and preferences."], mistakes: [primaryMistake.en, "Confusing object-fit with aspect-ratio.", "Hiding actions behind overflow hidden."] }
  };
}

function testsFor(acquired) {
  return [
    { type: "cssDeclaration", label: T("Conserve les zones nommées", "Preserve named areas"), value: { selector: ".programme-grid", property: "grid-template-areas", value: '"intro intro" "sessions aside" "footer footer"' } },
    { type: "cssDeclaration", label: T("Conserve le focus visible", "Preserve visible focus"), value: { selector: ".a11y-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    { type: "cssMediaDeclaration", label: T("Conserve reduced motion", "Preserve reduced motion"), value: { query: "(prefers-reduced-motion: reduce)", selector: ".motion-status", property: "animation", value: "none" } },
    ...acquired.flatMap((step) => {
      const checks = [];
      if (step.token) checks.push({ type: "cssDeclaration", label: T("Le token fluide est borné", "The fluid token is bounded"), value: step.token });
      if (step.container) checks.push(
        { type: "cssDeclaration", label: T("Le composant nomme son conteneur", "The component names its container"), value: { selector: step.container.containerSelector, property: "container-name", value: "audit-card" } },
        { type: "cssContainerDeclaration", label: T("La carte répond à sa largeur", "The card responds to its width"), value: step.container }
      );
      if (step.media) checks.push(
        { type: "cssDeclaration", label: T("Le défilement local est conservé", "Local scrolling remains available"), value: { selector: step.selector, property: step.property, value: step.value } },
        { type: "cssMediaDeclaration", label: T("La barre s'adapte au grand écran", "The toolbar adapts at wide sizes"), value: { query: step.media.query, selector: step.media.selector, property: step.media.property, value: step.media.value } }
      );
      checks.push({ type: "cssDeclaration", label: T(`${step.property} utilise la bonne valeur`, `${step.property} uses the correct value`), value: { selector: step.selector, property: step.property, value: step.value } });
      for (const extra of step.extra || []) checks.push({ type: "cssDeclaration", label: T(`${extra.property} garde son contrat`, `${extra.property} keeps its contract`), value: extra });
      return checks;
    }),
    { type: "notContains", label: T("Ne masque pas le contenu", "Do not hide content"), value: "overflow: hidden" },
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
}

function preview() {
  const image = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3Crect width='3' height='2' fill='%234f46e5'/%3E%3C/svg%3E";
  return T(
    `<main class="demo-surface audit-page"><p class="stylesheet-status">Feuille CSS chargée</p><header><p class="eyebrow">PulsaConf · Audit responsive</p><h1>Des cartes qui tiennent dans leur espace</h1><p>Chaque carte peut être déplacée, réutilisée et lue au clavier.</p></header><nav class="audit-nav" aria-label="Navigation des sessions"><a href="#sessions">Sessions</a><a href="#speakers">Intervenants</a><a href="#access">Accessibilité</a></nav><section class="audit-grid" id="sessions"><article class="audit-card"><img class="audit-card__media" src="${image}" alt="" /><div class="audit-card__body"><div><h2>Atelier de cadrage responsive</h2><p>Une carte réutilisable dont la colonne peut être étroite même sur un grand écran.</p><p>pulsa-conf-session-identifier-extremely-long-without-spaces-2026</p></div><p>12 places · Salle Indigo</p></div></article><article class="audit-card"><img class="audit-card__media" src="${image}" alt="" /><div class="audit-card__body"><div><h2>Systèmes d'interface</h2><p>Texte de session utile aux personnes qui comparent plusieurs ateliers.</p></div><p>8 places · Salle Atelier</p></div></article></section></main>`,
    `<main class="demo-surface audit-page"><p class="stylesheet-status">CSS file loaded</p><header><p class="eyebrow">PulsaConf · Responsive audit</p><h1>Cards that fit their available space</h1><p>Every card can be moved, reused, and read with a keyboard.</p></header><nav class="audit-nav" aria-label="Session navigation"><a href="#sessions">Sessions</a><a href="#speakers">Speakers</a><a href="#access">Accessibility</a></nav><section class="audit-grid" id="sessions"><article class="audit-card"><img class="audit-card__media" src="${image}" alt="" /><div class="audit-card__body"><div><h2>Responsive crop workshop</h2><p>A reusable card whose column can be narrow even on a wide screen.</p><p>responsive-audit-session-identifier-extremely-long-without-spaces-2026</p></div><p>12 seats · Indigo room</p></div></article><article class="audit-card"><img class="audit-card__media" src="${image}" alt="" /><div class="audit-card__body"><div><h2>Interface systems</h2><p>Useful session details for people comparing multiple workshops.</p></div><p>8 seats · Workshop room</p></div></article></section></main>`
  );
}

function quizLesson(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique une interface réutilisable dans des espaces de taille différente.", "Diagnose a reusable interface in slots of different sizes.");
  const title = T("Quiz responsive avancé", "Advanced responsive quiz");
  const course = courseFor(steps[3], brief);
  const guide = guideFor(steps[3], T("Choisir une réponse qui ne mesure ni le composant ni les actions réelles.", "Choosing an answer that measures neither the component nor its actual actions."));
  const explanation = T("Mesure le composant et son contenu, conserve les actions, puis justifie le changement de composition.", "Measure the component and its content, preserve actions, then justify the composition change.");
  const questions = [
    { id: "css-07-advanced-responsive-quiz-q1", type: "single", prompt: T("Quel test prouve qu'une carte s'adapte à sa colonne ?", "Which test proves a card adapts to its column?"), choices: choices(["container", "Réduire la carte dans le même viewport"], ["viewport", "Redimensionner uniquement la fenêtre"], ["snapshot", "Comparer une capture isolée"]), answer: "container", explanation },
    { id: "css-07-advanced-responsive-quiz-q2", type: "multiple", prompt: T("Quelles propriétés fixent le ratio et le cadrage d'une image ?", "Which properties set an image's ratio and crop?"), choices: choices(["ratio", "aspect-ratio"], ["crop", "object-fit"], ["space", "gap"], ["type", "font-size"]), answer: ["ratio", "crop"], explanation },
    { id: "css-07-advanced-responsive-quiz-q3", type: "true-false", prompt: T("Vrai ou faux : overflow-x: auto masque les actions qui ne tiennent pas dans la barre.", "True or false: overflow-x: auto hides actions that do not fit in the toolbar."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "false", explanation },
    { id: "css-07-advanced-responsive-quiz-q4", type: "ordering", prompt: T("Ordonne l'audit d'une carte réutilisable.", "Order the reusable-card audit."), choices: choices(["content", T("Lire le contenu et son ordre", "Read content and its order")], ["slot", T("Mesurer la largeur du conteneur", "Measure container width")], ["rule", T("Appliquer la règle locale minimale", "Apply the smallest local rule")], ["verify", T("Retester clavier et overflow", "Retest keyboard and overflow")]), answer: ["content", "slot", "rule", "verify"], explanation },
    { id: "css-07-advanced-responsive-quiz-q5", type: "code-reading", prompt: T("Pourquoi borner une taille avec clamp() ?", "Why bound a size with clamp()?"), choices: choices(["bounds", T("Conserver un minimum et un maximum lisibles", "Keep readable minimum and maximum values")], ["fixed", T("Remplacer toutes les unités par px", "Replace every unit with px")], ["hide", T("Cacher le contenu au breakpoint", "Hide content at the breakpoint")]), answer: "bounds", explanation },
    { id: "css-07-advanced-responsive-quiz-q6", type: "short-open", prompt: T("Nomme une largeur de viewport, une largeur de composant et une preuve à vérifier.", "Name one viewport width, one component width, and evidence to check."), choices: [], answer: T(["375 px", "20rem", "overflow"], ["375px", "20rem", "overflow"]), keywords: ["375", "20", "overflow"], explanation }
  ];
  return { id: "css-07-advanced-responsive-quiz", type: "quiz", title, brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title, brief, type: "quiz" }), skills: ["css-advanced-responsive"], difficulty: "quiz", durationMin: 26, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: false, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "container" }], xp: 100, order: moduleIndex + 1 };
}

function projectLesson(starterCode, solution, createPedagogy) {
  const brief = T("Livre un audit visuel qui reste exploitable avec les cartes en colonnes étroites, les médias réels, les identifiants longs et la navigation complète.", "Ship a visual audit that remains usable with narrow card columns, real media, long identifiers, and complete navigation.");
  const title = T("Projet : audit responsive avancé", "Project: advanced responsive audit");
  const course = courseFor(steps[4], brief);
  const guide = guideFor(steps[4], T("Valider le projet avec une seule capture desktop et ignorer l'espace de chaque carte.", "Validating the project with one desktop screenshot and ignoring each card's available space."));
  return { id: "css-07-responsive-audit-project", type: "project", title, brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title, brief, solution: steps.map((step) => step.example).join("\n"), type: "project" }), skills: ["css-advanced-responsive", "responsive-audit"], difficulty: "project", durationMin: 120, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Les échelles fluides restent bornées et cohérentes.", "Les médias ont un ratio stable et un cadrage choisi.", "La carte change selon son conteneur mesuré.", "Toutes les actions et contenus restent accessibles sans masquer l'overflow."], ["Fluid scales remain bounded and consistent.", "Media has a stable ratio and an intentional crop.", "The card changes according to its measured container.", "Every action and content remain reachable without hiding overflow."]), hint: T("Teste une carte à 20rem et 32rem dans le même viewport avant de modifier les media queries.", "Test one card at 20rem and 32rem in the same viewport before changing media queries."), xp: 160 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
