const T = (fr, en) => ({ fr, en });

const scaffold = `.responsive-page {
  min-inline-size: 0;
}

.responsive-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.responsive-card {
  min-inline-size: 0;
  padding: 1rem;
  border: 1px solid #c7d2fe;
  border-radius: 1rem;
}

.responsive-card__body {
  min-inline-size: 0;
}

.responsive-image {
  display: block;
  inline-size: 100%;
}`;

const steps = [
  { id: "css-responsive-width", selector: ".responsive-page", property: "width", value: "min(100%, 72rem)", extraChecks: [{ selector: ".responsive-page", property: "box-sizing", value: "border-box" }], title: T("1. Borner la surface sans débordement", "1. Bound the page without overflow"), brief: T("Laisse la page remplir son parent sans dépasser une largeur de lecture confortable, padding inclus.", "Let the page fill its parent without exceeding a comfortable reading width, including padding."), rule: ".responsive-page {\n  box-sizing: border-box;\n  width: min(100%, 72rem);\n  margin-inline: auto;\n}", example: ".site-shell { box-sizing: border-box; width: min(100%, 68rem); }" },
  { id: "css-responsive-max-width", selector: ".responsive-card__body", property: "max-width", value: "65ch", extraChecks: [{ selector: ".responsive-image", property: "max-width", value: "100%" }, { selector: ".responsive-image", property: "aspect-ratio", value: "16 / 9" }, { selector: ".responsive-image", property: "object-fit", value: "cover" }], title: T("2. Borner texte et image", "2. Bound text and media"), brief: T("Limite la mesure du texte et garde l'image entière dans sa boîte sans déformer son ratio.", "Limit text measure and keep the image inside its box without distorting its ratio."), rule: ".responsive-card__body {\n  max-width: 65ch;\n}\n\n.responsive-image {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}", example: ".article__copy { max-width: 62ch; }\n.article__image { aspect-ratio: 16 / 9; object-fit: cover; }" },
  { id: "css-responsive-media", selector: ".responsive-layout", property: "grid-template-columns", value: "minmax(0, 1fr)", media: { query: "(min-width: 24rem)", value: "minmax(0, 2fr) minmax(14rem, 1fr)" }, title: T("3. Laisser le contenu appeler le breakpoint", "3. Let content call the breakpoint"), brief: T("Ajoute une colonne latérale quand la zone de preview dispose réellement de la place nécessaire.", "Add a side column when the preview area actually has enough room."), rule: "@media (min-width: 24rem) {\n  .responsive-layout {\n    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);\n  }\n}", example: "@media (min-width: 40rem) { .layout { grid-template-columns: 2fr 1fr; } }" },
  { id: "css-responsive-min-width", selector: ".responsive-card", property: "min-width", value: "0", title: T("4. Autoriser la carte à rétrécir", "4. Let the card shrink"), brief: T("Neutralise la taille minimale intrinsèque qui peut pousser une grille hors de son parent.", "Reset the intrinsic minimum that can push a grid outside its parent."), rule: ".responsive-card {\n  min-width: 0;\n}", example: ".layout__item { min-width: 0; }" },
  { id: "css-responsive-clamp", selector: ".responsive-page h1", property: "font-size", value: "clamp(1.75rem, 1.2rem + 2vw, 3rem)", title: T("5. Faire évoluer le titre avec clamp", "5. Scale the heading with clamp"), brief: T("Fais grandir le titre progressivement entre deux bornes lisibles.", "Let the heading scale gradually between two readable bounds."), rule: ".responsive-page h1 {\n  font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem);\n}", example: ".page-title { font-size: clamp(1.5rem, 4vw, 2.75rem); }" },
  { id: "css-responsive-container-type", selector: ".responsive-card", property: "container-type", value: "inline-size", title: T("6. Déclarer une taille de conteneur", "6. Declare an inline-size container"), brief: T("Prépare la carte à adapter son contenu à sa propre largeur plutôt qu'au viewport.", "Prepare the card to adapt its contents to its own width rather than the viewport."), rule: ".responsive-card {\n  container-type: inline-size;\n}", example: ".profile-card { container-type: inline-size; }" },
  { id: "css-responsive-container", selector: ".responsive-card__body", property: "display", value: "grid", container: { query: "(min-width: 18rem)", containerSelector: ".responsive-card", value: "grid-template-columns: minmax(0, 1fr) minmax(8rem, 1fr)" }, title: T("7. Adapter le contenu à son conteneur", "7. Adapt content to its container"), brief: T("Réorganise les détails quand la carte elle-même, et non la fenêtre, devient assez large.", "Reorganize the details when the card itself, not the viewport, becomes wide enough."), rule: "@container (min-width: 18rem) {\n  .responsive-card__body {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(8rem, 1fr);\n  }\n}", example: "@container (min-width: 24rem) { .card__body { display: grid; } }" },
  { id: "css-responsive-auto-fit", selector: ".responsive-layout", property: "grid-template-columns", value: "minmax(0, 1fr)", media: { query: "(min-width: 24rem)", value: "repeat(auto-fit, minmax(16rem, 1fr))" }, title: T("8. Répéter des colonnes qui tiennent", "8. Repeat columns that fit"), brief: T("Laisse auto-fit créer le nombre de pistes utiles tout en conservant la colonne latérale nommée.", "Let auto-fit create useful tracks while retaining the named side column."), rule: "@media (min-width: 24rem) {\n  .responsive-layout {\n    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  }\n}", example: "@media (min-width: 36rem) { .cards { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); } }" }
];

export function createResponsiveModule(title, moduleIndex, includeProject, baseCss, createPedagogy) {
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
    id: "css-responsive", title: T("Responsive mobile-first", title[1]),
    description: T("Adapte un parcours de lecture aux largeurs du viewport, à la place de la carte et aux médias réels.", "Adapt a reading flow to viewport widths, card space, and real media."),
    deliverable: T("Une page mobile-first avec mesures fluides, images stables et contenu sans débordement.", "A mobile-first page with fluid measures, stable images, and overflow-safe content."),
    importance: T("Un site responsive réagit à l'espace réellement disponible au lieu de forcer un layout desktop dans une petite fenêtre.", "A responsive site reacts to available space instead of forcing a desktop layout into a small window."),
    prerequisites: T(["Avoir terminé les zones Grid", "Comprendre les axes logique et de lecture"], ["Complete Grid areas", "Understand logical and reading axes"]),
    outcomes: T(["Construire une base mobile-first", "Choisir des media queries justifiées par le contenu", "Adapter une carte à son conteneur et ses médias"], ["Build a mobile-first baseline", "Choose content-justified media queries", "Adapt a card to its container and media"]),
    vocabulary: ["mobile-first", "breakpoint", "clamp", "container query", "aspect ratio", "object-fit", "auto-fit"],
    mastery: T(["Aucune largeur n'impose de scroll horizontal", "Les médias gardent leur ratio", "La carte s'adapte au viewport et à son conteneur"], ["No width forces horizontal scrolling", "Media retain their aspect ratio", "The card adapts to viewport and container"]),
    lessons, totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

export function buildResponsiveModuleCss(baseCss) {
  const projectStarter = `${baseCss}\n\n${scaffold}`;
  return steps.reduce((css, step) => `${css}\n\n${step.rule}`, projectStarter);
}

function lessonFor(step, order, starterCode, solution, createPedagogy) {
  const course = courseFor(step, step.brief);
  const guide = guideFor(step, T(`Pour « ${step.title.fr} », choisir une largeur fixe et vérifier seulement sur desktop.`, `For “${step.title.en},” choosing a fixed width and checking only on desktop.`));
  return {
    id: step.id, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-responsive", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 22,
    starterCode, solution, previewHtml: preview(), tests: testsFor(steps.slice(0, order)),
    hint: T(`Teste ${step.selector} dans une zone étroite avant d'ajouter ${step.property}.`, `Test ${step.selector} in a narrow area before adding ${step.property}.`), xp: 50 + order
  };
}

function courseFor(step, introduction) {
  return {
    fr: { introduction: `${introduction.fr} La preview comporte une image de ratio connu, du texte long et une carte plus étroite que le viewport.`, sections: [{ title: "Commencer par le mobile", paragraphs: ["Écris d'abord le layout qui tient dans une colonne étroite.", "Ajoute un breakpoint seulement quand les contenus peuvent réellement coexister côte à côte."], example: step.example }, { title: "Fluidité et conteneurs", paragraphs: ["clamp borne une valeur fluide sans saut brutal.", "Une container query répond à la largeur de la carte, qui peut différer de la fenêtre."], example: "@container (min-width: 18rem) { .card__body { display: grid; } }" }, { title: "Médias et preuve", paragraphs: ["Conserve un ratio stable et laisse object-fit cadrer l'image.", "Compare 375 px et desktop sans cacher les mots longs ni déformer le média."], example: ".responsive-image { aspect-ratio: 16 / 9; object-fit: cover; }" }], vocabulary: [[step.property, `Propriété travaillée avec ${step.value}.`], ["breakpoint", "Largeur où le contenu justifie une autre composition."], ["container query", "Règle conditionnée par la taille d'un conteneur nommé."]], check: ["Je pars d'une colonne mobile.", "Je justifie chaque breakpoint par le contenu.", "Je vérifie image, texte et carte étroite."] },
    en: { introduction: `${introduction.en} The preview includes a known-ratio image, long copy, and a card narrower than its viewport.`, sections: [{ title: "Start with mobile", paragraphs: ["First write the layout that fits one narrow column.", "Add a breakpoint only when content can genuinely sit side by side."], example: step.example }, { title: "Fluid sizing and containers", paragraphs: ["clamp bounds a fluid value without an abrupt jump.", "A container query responds to card width, which can differ from the viewport."], example: "@container (min-width: 18rem) { .card__body { display: grid; } }" }, { title: "Media and evidence", paragraphs: ["Keep a stable ratio and let object-fit frame the image.", "Compare 375px and desktop without hiding long words or distorting media."], example: ".responsive-image { aspect-ratio: 16 / 9; object-fit: cover; }" }], vocabulary: [[step.property, `Property practiced with ${step.value}.`], ["breakpoint", "Width at which content justifies a different composition."], ["container query", "A rule conditioned on a named container's size."]], check: ["I start from one mobile column.", "I justify each breakpoint with content.", "I verify image, copy, and narrow card."] }
  };
}

function guideFor(step, primaryMistake) {
  return {
    fr: { objectives: [step.brief.fr, "Conserver les décisions CSS 00 à 08.", "Prouver le rendu à plusieurs largeurs et dans un conteneur étroit."], prerequisites: ["Lire le plan Grid nommé.", "Inspecter le viewport et la largeur de la carte.", "Repérer le ratio intrinsèque d'une image."], steps: ["Reproduire la contrainte à 375 px.", "Ajouter la règle fluide ou conditionnelle minimale.", "Vérifier desktop, média et contenu long."], mistakes: [primaryMistake.fr, "Choisir le breakpoint parce qu'il est à la mode.", "Masquer le contenu qui déborde au lieu d'en traiter la cause."] },
    en: { objectives: [step.brief.en, "Preserve CSS 00 through 08 decisions.", "Prove output across widths and inside a narrow container."], prerequisites: ["Read the named Grid template.", "Inspect viewport and card width.", "Identify an image's intrinsic ratio."], steps: ["Reproduce the constraint at 375px.", "Add the smallest fluid or conditional rule.", "Verify desktop, media, and long content."], mistakes: [primaryMistake.en, "Choosing a breakpoint because it is fashionable.", "Hiding overflowing content instead of fixing its cause."] }
  };
}

function testsFor(acquiredSteps) {
  const tests = [
    { type: "cssDeclaration", label: T("Conserve les zones nommées Grid", "Preserve named Grid areas"), value: { selector: ".programme-grid", property: "grid-template-areas", value: '"intro intro" "sessions aside" "footer footer"' } },
    { type: "cssDeclaration", label: T("Conserve l'ordre de la navigation", "Preserve navigation layout"), value: { selector: ".site-nav", property: "display", value: "flex" } },
    { type: "cssDeclaration", label: T("Conserve le focus visible", "Preserve visible focus"), value: { selector: ".session-action:focus-visible", property: "outline", value: "3px solid #4338ca" } },
    ...acquiredSteps.flatMap((step) => {
      const extraChecks = (step.extraChecks || []).map((check) => ({ type: "cssDeclaration", label: T(`${check.property} protège le média`, `${check.property} protects the media`), value: check }));
      if (step.container) return [
        { type: "cssDeclaration", label: T("La carte crée un contexte de conteneur", "The card establishes a container context"), value: { selector: step.container.containerSelector, property: "container-type", value: "inline-size" } },
        { type: "cssContainerDeclaration", label: T("La règle répond à la largeur de sa carte", "The rule responds to its card's width"), value: { query: step.container.query, containerSelector: step.container.containerSelector, selector: step.selector, property: step.property, value: step.value } }
      ];
      if (step.media) return [
        { type: "cssDeclaration", label: T(`${step.property} garde le fallback mobile`, `${step.property} keeps the mobile fallback`), value: { selector: step.selector, property: step.property, value: step.value } },
        { type: "cssMediaDeclaration", label: T(`${step.property} change quand le contenu le permet`, `${step.property} changes when content allows it`), value: { query: step.media.query, selector: step.selector, property: step.property, value: step.media.value } }
      ];
      return [{ type: "cssDeclaration", label: T(`${step.property} utilise la bonne valeur`, `${step.property} uses the right value`), value: { selector: step.selector, property: step.property, value: step.value } }, ...extraChecks];
    }),
    { type: "notContains", label: T("Ne masque pas le contenu", "Do not hide content"), value: "overflow: hidden" },
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
  return tests;
}

function preview() {
  const image = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%234f46e5'/%3E%3C/svg%3E";
  return T(
    `<main class="demo-surface responsive-page"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Responsive</p><h1>Un programme à la bonne mesure</h1><p class="lead">Les cartes et les médias doivent rester lisibles dans chaque espace.</p></section><section class="responsive-layout"><article class="responsive-card"><img class="responsive-image" src="${image}" alt="" /><div class="responsive-card__body"><div><h2>Atelier accessibilité</h2><p class="responsive-copy">Un atelier avec une description assez longue pour vérifier la lecture fluide dans plusieurs tailles de carte.</p></div><p class="responsive-card__meta">12 places · Salle Indigo</p></div></article><article class="responsive-card"><img class="responsive-image" src="${image}" alt="" /><div class="responsive-card__body"><div><h2>Architecture CSS</h2><p class="responsive-copy">Les pistes s'adaptent sans couper les noms ni créer de scroll horizontal.</p></div><p class="responsive-card__meta">8 places · Salle Atelier</p></div></article></section><nav class="site-nav" aria-label="Navigation responsive"><div class="site-nav__identity"><strong>PulsaConf</strong><span class="site-nav__label">Programme de formation continue</span></div><div class="site-nav__actions"><a class="session-action action" href="#sessions">Sessions</a><a class="session-action action" href="#booking">Réserver</a></div></nav></main>`,
    `<main class="demo-surface responsive-page"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf · Responsive</p><h1>A schedule at the right measure</h1><p class="lead">Cards and media must remain readable in every space.</p></section><section class="responsive-layout"><article class="responsive-card"><img class="responsive-image" src="${image}" alt="" /><div class="responsive-card__body"><div><h2>Accessibility workshop</h2><p class="responsive-copy">A workshop with a long enough description to verify fluid reading across several card sizes.</p></div><p class="responsive-card__meta">12 seats · Indigo room</p></div></article><article class="responsive-card"><img class="responsive-image" src="${image}" alt="" /><div class="responsive-card__body"><div><h2>CSS architecture</h2><p class="responsive-copy">Tracks adapt without clipping names or creating horizontal scrolling.</p></div><p class="responsive-card__meta">8 seats · Workshop room</p></div></article></section><nav class="site-nav" aria-label="Responsive navigation"><div class="site-nav__identity"><strong>PulsaConf</strong><span class="site-nav__label">Continuing education schedule</span></div><div class="site-nav__actions"><a class="session-action action" href="#sessions">Sessions</a><a class="session-action action" href="#booking">Book</a></div></nav></main>`
  );
}

function quizFor(moduleIndex, createPedagogy) {
  const brief = T("Diagnostique viewport, mesure fluide, média et conteneur.", "Diagnose viewport, fluid measure, media, and container.");
  const course = courseFor(steps[2], T("Le quiz distingue une media query de viewport d'une règle conditionnée par une carte.", "The quiz distinguishes a viewport media query from a rule conditioned on a card."));
  const guide = guideFor(steps[2], T("Répondre en choisissant un breakpoint arbitraire sans inspecter les contenus.", "Answering by choosing an arbitrary breakpoint without inspecting content."));
  const explanation = T("Le bon choix répond à la contrainte mesurée et préserve tout le contenu.", "The right choice responds to the measured constraint and preserves all content.");
  const questions = [
    { id: "css-responsive-quiz-single", type: "single", prompt: T("Quel outil borne une valeur fluide entre minimum et maximum ?", "Which tool bounds a fluid value between minimum and maximum?"), choices: choices(["clamp", "clamp()"], ["fixed", "width: 1200px"], ["media", "@media seule"]), answer: "clamp", explanation },
    { id: "css-responsive-quiz-multiple", type: "multiple", prompt: T("Quelles preuves confirment qu'une image responsive reste robuste ?", "Which evidence confirms a responsive image remains robust?"), choices: choices(["ratio", T("Son ratio reste stable", "Its aspect ratio remains stable")], ["fit", T("object-fit garde un cadrage adapté", "object-fit keeps a suitable crop")], ["crop", T("Le contenu est coupé sans alternative", "Content is cropped without an alternative")]), answer: ["ratio", "fit"], explanation },
    { id: "css-responsive-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : une container query dépend de la largeur de son conteneur.", "True or false: a container query depends on its container's width."), choices: choices(["true", T("Vrai", "True")], ["false", T("Faux", "False")]), answer: "true", explanation },
    { id: "css-responsive-quiz-order", type: "ordering", prompt: T("Ordonne une revue responsive.", "Order a responsive review."), choices: choices(["mobile", T("Observer le fallback mobile", "Inspect the mobile fallback")], ["content", T("Charger le contenu réel", "Load real content")], ["breakpoint", T("Ajouter un breakpoint justifié", "Add a justified breakpoint")], ["verify", T("Vérifier les médias et le débordement", "Verify media and overflow")]), answer: ["mobile", "content", "breakpoint", "verify"], explanation },
    { id: "css-responsive-quiz-code", type: "code-reading", prompt: T("La même carte est large dans une colonne, étroite dans une autre. Quelle règle convient ?", "The same card is wide in one column and narrow in another. Which rule fits?"), choices: choices(["container", "@container"], ["viewport", "@media (min-width: 1200px)"], ["fixed", "width: 32rem"]), answer: "container", explanation },
    { id: "css-responsive-quiz-open", type: "short-open", prompt: T("Nomme deux preuves qu'un layout responsive est robuste.", "Name two proofs that a responsive layout is robust."), choices: [], answer: T(["mobile", "contenu long"], ["mobile", "long content"]), keywords: ["mobile", "content"], explanation }
  ];
  return { id: "css-responsive-quiz", type: "quiz", title: T("Quiz Responsive mobile-first", "Mobile-first responsive quiz"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Quiz Responsive", "Responsive quiz"), brief, type: "quiz" }), skills: ["css-responsive"], difficulty: "quiz", durationMin: 24, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer, explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "clamp" }], xp: 80, order: moduleIndex + 1 };
}

function projectFor(starterCode, solution, createPedagogy) {
  const brief = T("Livre la page responsive sans scroll horizontal, ratio cassé ni breakpoint sans preuve.", "Ship the responsive page without horizontal scrolling, broken ratios, or unsupported breakpoints.");
  const course = courseFor(steps.at(-1), T("Le projet combine viewport, conteneur, typographie, espace et médias dans un même parcours.", "The project combines viewport, container, typography, spacing, and media in one flow."));
  const guide = guideFor(steps.at(-1), T("Valider uniquement le grand écran et ignorer la largeur réelle de la carte.", "Validating only the wide screen and ignoring the card's actual width."));
  return { id: "css-responsive-lab", type: "project", title: T("Lab Responsive mobile-first", "Mobile-first responsive lab"), brief, theory: brief, course, guide, pedagogy: createPedagogy({ course, guide, title: T("Lab Responsive", "Responsive lab"), brief, solution: ".responsive-layout { grid-template-columns: minmax(0, 1fr); }", type: "project" }), skills: ["css-responsive", "fluid-layout", "responsive-media"], difficulty: "project", durationMin: 110, starterCode, solution, previewHtml: preview(), tests: testsFor(steps), rubric: T(["Le fallback mobile reste lisible sans débordement.", "La colonne latérale apparaît quand l'espace le permet.", "Le média conserve son ratio et son cadrage.", "La carte répond à sa propre largeur via container query."], ["The mobile fallback stays readable without overflow.", "The side column appears when space allows.", "Media preserve ratio and crop.", "The card responds to its own width through a container query."]), hint: T("Pars du projet Grid nommé, commence mobile-first, puis justifie chaque adaptation par le contenu.", "Start from the named-area Grid project, begin mobile-first, then justify each adaptation with content."), xp: 140 };
}

function choices(...items) {
  return items.map(([id, label]) => ({ id, label: typeof label === "string" ? T(label, label) : label }));
}
