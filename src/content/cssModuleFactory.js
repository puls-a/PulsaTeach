import { cssModuleProfile } from "./cssModuleProfiles.js";

export function createCssModuleGroup(entries, startIndex = 0, projectModuleIds = []) {
  const projectModules = new Set(projectModuleIds);
  return entries.map(([id, title, selector, checks], offset) => {
    const moduleIndex = startIndex + offset;
    if (id === "css-selectors-colors") return selectorsColorsModule(title, moduleIndex, projectModules.has(id));
    if (id === "css-box-type") return boxTypeModule(title, moduleIndex, projectModules.has(id));
    const profile = cssModuleProfile(id, title);
    const lessons = checks.map((check, index) => lessonFor(id, title, selector, check, index + 1, profile));
    lessons.push(quizFor(id, title, moduleIndex, profile, selector, checks));
    if (projectModules.has(id)) lessons.push(projectFor(id, title, selector, checks, moduleIndex, profile));
    return {
      id,
      title: { fr: title[0], en: title[1] },
      description: { fr: profile.scene[0], en: profile.scene[1] },
      deliverable: { fr: profile.project[0], en: profile.project[1] },
      importance: { fr: `${title[0]} compte parce que ${profile.risk[0]}.`, en: `${title[1]} matters because ${profile.risk[1]}.` },
      prerequisites: { fr: moduleIndex ? ["Avoir termine les modules CSS précédents", "Savoir lire un sélecteur"] : ["Connaitre HTML de base", "Savoir lancer les tests"], en: moduleIndex ? ["Complete previous CSS modules", "Know how to read a selector"] : ["Know basic HTML", "Know how to run tests"] },
      outcomes: { fr: ["Ecrire une règle courte", `Prouver que ${profile.proof[0]}`, "Valider sans deviner"], en: ["Write a short rule", `Prove that ${profile.proof[1]}`, "Validate without guessing"] },
      vocabulary: checks.map((item) => item.replace(/[():.-]/g, " ").trim()).slice(0, 6),
      mastery: { fr: ["Le composant ne déborde pas", "Les états restent visibles", "Les choix sont justifiés"], en: ["The component does not overflow", "States remain visible", "Choices are justified"] },
      lessons,
      totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
    };
  });
}

const T = (fr, en) => ({ fr, en });
const selectorsBase = `:root {
  --accent: #4f46e5;
  --surface: #ffffff;
  --space: 1rem;
}

.demo-surface {
  color: #1f2937;
  background: #eef2ff;
  font-family: system-ui, sans-serif;
}

.course-card {
  color: #374151;
  max-width: 100%;
  padding: var(--space);
  background: var(--surface);
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
}

.stylesheet-status {
  color: #166534;
  font-weight: 700;
}

.hero-card.course-card {
  color: #111827;
  border-color: var(--accent);
  font-weight: 700;
}

.action:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 4px;
}

@media (min-width: 760px) {
  .course-card {
    max-width: 42rem;
  }
}`;

const selectorsSteps = [
  { slug: "color", title: T("1. Cibler le texte secondaire", "1. Target secondary text"), brief: T("Utilise un sélecteur descendant pour colorer uniquement le résumé de la carte.", "Use a descendant selector to color only the card summary."), selector: ".course-card .lead", property: "color", value: "#334155", rule: ".course-card .lead {\n  color: #334155;\n}", example: ".notice .summary { color: #475569; }" },
  { slug: "background", title: T("2. Définir la surface de carte", "2. Define the card surface"), brief: T("Applique le fond à la carte sans toucher à toute la page.", "Apply the background to the card without affecting the whole page."), selector: ".course-card", property: "background", value: "#f8fafc", rule: ".course-card {\n  background: #f8fafc;\n}", example: ".notice { background: #fff7ed; }" },
  { slug: "border-color", title: T("3. Créer une variante héro", "3. Create a hero variant"), brief: T("Surcharge seulement la bordure de la carte héro avec un sélecteur de variante.", "Override only the hero card border with a variant selector."), selector: ".hero-card.course-card", property: "border-color", value: "#4338ca", rule: ".hero-card.course-card {\n  border-color: #4338ca;\n}", example: ".featured.notice { border-color: #c2410c; }" },
  { slug: "font-weight", title: T("4. Hiérarchiser l'eyebrow", "4. Emphasize the eyebrow"), brief: T("Renforce uniquement le libellé eyebrow, pas tout le contenu de la carte.", "Emphasize only the eyebrow label, not all card content."), selector: ".course-card .eyebrow", property: "font-weight", value: "800", rule: ".course-card .eyebrow {\n  font-weight: 800;\n}", example: ".notice .label { font-weight: 700; }" },
  { slug: "text-decoration", title: T("5. Garder le lien reconnaissable", "5. Keep the link recognizable"), brief: T("Souligne l'action de la carte afin qu'elle ne dépende pas uniquement de sa couleur.", "Underline the card action so it does not rely on color alone."), selector: ".course-card .action", property: "text-decoration", value: "underline", rule: ".course-card .action {\n  text-decoration: underline;\n}", example: ".notice a { text-decoration: underline; }" },
  { slug: "outline", title: T("6. Renforcer le focus clavier", "6. Strengthen keyboard focus"), brief: T("Ajoute un contour uniquement lorsque l'action reçoit le focus visible.", "Add an outline only when the action receives visible focus."), selector: ".course-card .action:focus-visible", property: "outline", value: "3px solid #4338ca", rule: ".course-card .action:focus-visible {\n  outline: 3px solid #4338ca;\n  outline-offset: 4px;\n}", example: ".notice a:focus-visible { outline: 2px solid #c2410c; }" },
  { slug: "box-shadow", title: T("7. Limiter l'ombre à la variante", "7. Limit shadow to the variant"), brief: T("Réserve la profondeur visuelle à la carte héro plutôt qu'à toutes les cartes.", "Reserve visual depth for the hero card instead of every card."), selector: ".hero-card.course-card", property: "box-shadow", value: "0 10px 30px rgba(16, 23, 42, .12)", rule: ".hero-card.course-card {\n  box-shadow: 0 10px 30px rgba(16, 23, 42, .12);\n}", example: ".featured.notice { box-shadow: 0 4px 12px rgba(0, 0, 0, .1); }" },
  { slug: "opacity", title: T("8. Atténuer une carte explicitement muted", "8. De-emphasize an explicit muted card"), brief: T("Réduis l'opacité uniquement sur la variante is-muted et conserve une valeur lisible.", "Reduce opacity only on the is-muted variant and keep a readable value."), selector: ".course-card.is-muted", property: "opacity", value: ".72", rule: ".course-card.is-muted {\n  opacity: .72;\n}", example: ".notice.is-archived { opacity: .8; }" }
];

const boxTypeSteps = [
  { slug: "box-sizing", property: "box-sizing", selector: ".course-card", value: "border-box", title: T("1. Inclure bordure et padding dans la taille", "1. Include border and padding in the size"), brief: T("Stabilise la largeur de la carte quand son espace intérieur et sa bordure augmentent.", "Keep the card width stable when its inner spacing and border grow."), example: ".notice { box-sizing: border-box; }" },
  { slug: "padding", property: "padding", selector: ".course-card", value: "1.5rem", title: T("2. Créer un espace intérieur respirant", "2. Create comfortable inner spacing"), brief: T("Éloigne le contenu des bords sans déplacer les cartes voisines.", "Move content away from the edges without shifting neighboring cards."), example: ".notice { padding: 1rem; }" },
  { slug: "margin", property: "margin", selector: ".course-card", value: "1.5rem auto", title: T("3. Centrer et séparer la carte", "3. Center and separate the card"), brief: T("Combine une marge verticale visible et des marges horizontales automatiques.", "Combine visible vertical spacing with automatic horizontal margins."), example: ".notice { margin: 2rem auto; }" },
  { slug: "max-width", property: "max-width", selector: ".course-card .lead", value: "60ch", title: T("4. Limiter la longueur de lecture", "4. Limit reading length"), brief: T("Contraints le paragraphe principal avec une unité liée à la largeur des caractères.", "Constrain the lead paragraph with a unit tied to character width."), example: ".notice__summary { max-width: 55ch; }" },
  { slug: "line-height", property: "line-height", selector: ".course-card .lead", value: "1.65", title: T("5. Aérer les lignes de texte", "5. Give text lines breathing room"), brief: T("Utilise un interligne sans unité qui suit automatiquement la taille du texte.", "Use a unitless line height that automatically follows text size."), example: ".notice__summary { line-height: 1.6; }" },
  { slug: "font-size", property: "font-size", selector: ".course-card h1", value: "clamp(2rem, 5vw, 3.5rem)", title: T("6. Construire une taille de titre fluide", "6. Build a fluid heading size"), brief: T("Encadre une valeur fluide entre une borne minimale et une borne maximale.", "Bound a fluid value between a minimum and maximum."), example: ".notice h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }" },
  { slug: "overflow-wrap", property: "overflow-wrap", selector: ".course-card", value: "anywhere", title: T("7. Protéger la carte des mots longs", "7. Protect the card from long words"), brief: T("Autorise la coupure d'un identifiant extrême avant qu'il ne crée un débordement horizontal.", "Allow an extreme identifier to break before it causes horizontal overflow."), example: ".notice { overflow-wrap: anywhere; }" },
  { slug: "border-radius", property: "border-radius", selector: ".course-card", value: "1.25rem", title: T("8. Adoucir la silhouette de la carte", "8. Soften the card silhouette"), brief: T("Termine le composant avec un rayon cohérent sans modifier sa géométrie interne.", "Finish the component with a consistent radius without changing its inner geometry."), example: ".notice { border-radius: 1rem; }" }
];

function selectorsColorsModule(title, moduleIndex, includeProject) {
  const profile = cssModuleProfile("css-selectors-colors", title);
  let current = selectorsBase;
  const lessons = selectorsSteps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.rule}`;
    return selectorsColorsLesson(step, index + 1, starterCode, current, profile);
  });
  lessons.push(selectorsColorsQuiz(title, moduleIndex, profile));
  if (includeProject) lessons.push(selectorsColorsProject(title, current, profile));
  return {
    id: "css-selectors-colors",
    title: { fr: "Sélecteurs, cascade et couleurs", en: title[1] },
    description: { fr: profile.scene[0], en: profile.scene[1] },
    deliverable: { fr: profile.project[0], en: profile.project[1] },
    importance: T("Des sélecteurs précis empêchent une décision de couleur ou d'état de se propager à des composants sans rapport.", "Precise selectors prevent a color or state decision from spreading to unrelated components."),
    prerequisites: T(["Avoir terminé l'introduction CSS", "Savoir lire une déclaration et une media query"], ["Complete the CSS introduction", "Know how to read a declaration and media query"]),
    outcomes: T(["Cibler descendant, variante et état interactif", "Raisonner sur la cascade sans !important", "Conserver contraste, lien et focus identifiables"], ["Target descendants, variants, and interactive states", "Reason about the cascade without !important", "Keep contrast, links, and focus identifiable"]),
    vocabulary: ["descendant", "variante", "cascade", "focus-visible", "contraste", "opacité"],
    mastery: T(["Chaque règle vise le plus petit périmètre utile", "La variante gagne sans effets de bord", "Le focus et les liens restent visibles"], ["Every rule targets the smallest useful scope", "The variant wins without side effects", "Focus and links remain visible"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

function boxTypeModule(title, moduleIndex, includeProject) {
  const profile = cssModuleProfile("css-box-type", title);
  let current = selectorsSteps.reduce((css, step) => `${css}\n\n${step.rule}`, selectorsBase);
  const lessons = boxTypeSteps.map((step, index) => {
    const starterCode = current;
    current = `${current}\n\n${step.selector} {\n  ${step.property}: ${step.value};\n}`;
    return boxTypeLesson(step, index + 1, starterCode, current, profile);
  });
  lessons.push(boxTypeQuiz(title, moduleIndex, profile));
  if (includeProject) lessons.push(boxTypeProject(title, current, profile));
  return {
    id: "css-box-type",
    title: T("Box model et typographie", "Box model and typography"),
    description: T("Construis une carte stable, lisible et résistante aux contenus extrêmes.", "Build a stable, readable card that withstands extreme content."),
    deliverable: T("Une carte PulsaConf centrée, fluide et sans débordement.", "A centered, fluid PulsaConf card without overflow."),
    importance: T("Le box model relie largeur, espace et contenu : une valeur isolée peut sinon provoquer un débordement ou une lecture pénible.", "The box model connects width, spacing, and content: an isolated value can otherwise cause overflow or difficult reading."),
    prerequisites: T(["Avoir terminé CSS 01", "Distinguer composant, descendant et variante"], ["Complete CSS 01", "Distinguish components, descendants, and variants"]),
    outcomes: T(["Distinguer espace intérieur et extérieur", "Contraindre une ligne sans figer la carte", "Protéger le rendu contre les contenus extrêmes"], ["Distinguish inner and outer spacing", "Constrain a line without freezing the card", "Protect output against extreme content"]),
    vocabulary: ["box-sizing", "padding", "margin", "ch", "line-height", "clamp", "overflow-wrap", "border-radius"],
    mastery: T(["La carte reste dans son conteneur", "Le texte garde une mesure lisible", "Le titre et les identifiants résistent aux petites largeurs"], ["The card stays inside its container", "Text keeps a readable measure", "The heading and identifiers withstand narrow widths"]),
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

function boxTypeLesson(step, order, starterCode, solution, profile) {
  const course = {
    fr: { introduction: `${profile.scene[0]} ${step.brief.fr}`, sections: [{ title: "Modèle de boîte", paragraphs: ["Observe d'abord la largeur disponible, la bordure et la zone réellement occupée par le contenu.", "Modifie une seule relation à la fois pour distinguer taille, espace intérieur et espace extérieur."], example: step.example }, { title: "Texte réel", paragraphs: ["Relis la carte avec plusieurs lignes et un identifiant sans espace.", "Une valeur robuste doit rester utile quand la taille du viewport ou du texte change."], example: ".notice__copy { max-width: 55ch; line-height: 1.6; }" }, { title: "Preuve", paragraphs: ["Inspecte la valeur calculée plutôt que de juger seulement l'apparence.", "Compare 375 px et desktop sans supprimer les règles certifiées des modules précédents."], example: "DevTools > Computed > Box model" }], vocabulary: [[step.property, `Propriété travaillée avec la valeur ${step.value}.`], ["mesure", "Longueur confortable d'une ligne de texte."], ["contenu extrême", "Mot, URL ou identifiant plus long que le cas habituel."]], check: ["Je distingue la zone modifiée.", "Je conserve les règles cumulatives.", "Je vérifie contenu long et petite largeur."] },
    en: { introduction: `${profile.scene[1]} ${step.brief.en}`, sections: [{ title: "Box model", paragraphs: ["First observe the available width, border, and area actually occupied by content.", "Change one relationship at a time to distinguish size, inner spacing, and outer spacing."], example: step.example }, { title: "Real text", paragraphs: ["Reread the card with multiple lines and an identifier without spaces.", "A robust value should remain useful when viewport or text size changes."], example: ".notice__copy { max-width: 55ch; line-height: 1.6; }" }, { title: "Evidence", paragraphs: ["Inspect the computed value instead of judging appearance alone.", "Compare 375 px and desktop without removing rules certified in previous modules."], example: "DevTools > Computed > Box model" }], vocabulary: [[step.property, `Property practiced with the value ${step.value}.`], ["measure", "Comfortable length of a text line."], ["extreme content", "A word, URL, or identifier longer than the usual case."]], check: ["I distinguish the changed area.", "I preserve cumulative rules.", "I verify long content and narrow width."] }
  };
  const guide = {
    fr: { objectives: [step.brief.fr, `Appliquer ${step.property} au bon périmètre.`, "Conserver toutes les décisions CSS 00 et CSS 01."], prerequisites: ["Lire le composant PulsaConf.", "Ouvrir le box model dans DevTools.", "Comparer deux largeurs de viewport."], steps: ["Repérer la zone affectée.", "Ajouter la déclaration minimale.", "Vérifier valeur calculée et contenu extrême."], mistakes: [`Pour « ${step.title.fr} », modifier plusieurs dimensions avant d'identifier la cause.`, "Confondre padding et margin.", "Valider seulement sur un grand écran."] },
    en: { objectives: [step.brief.en, `Apply ${step.property} to the correct scope.`, "Preserve every CSS 00 and CSS 01 decision."], prerequisites: ["Read the PulsaConf component.", "Open the box model in DevTools.", "Compare two viewport widths."], steps: ["Locate the affected area.", "Add the minimal declaration.", "Verify the computed value and extreme content."], mistakes: [`For “${step.title.en},” changing several dimensions before identifying the cause.`, "Confusing padding and margin.", "Validating only on a wide screen."] }
  };
  return {
    id: `css-box-type-${step.slug}`, type: "css", title: step.title, brief: step.brief, theory: step.brief, course, guide,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    skills: ["css-box-type", step.property], difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard", durationMin: 20,
    starterCode, solution, previewHtml: boxTypePreview(), tests: boxTypeTests(boxTypeSteps.slice(0, order)),
    hint: T(`Inspecte la zone concernée par ${step.property}, puis compare-la avant et après.`, `Inspect the area affected by ${step.property}, then compare it before and after.`), xp: 26 + order
  };
}

function boxTypeTests(steps) {
  return [
    { type: "cssDeclaration", label: T("Conserve la couleur du résumé", "Preserve the summary color"), value: { selector: ".course-card .lead", property: "color", value: "#334155" } },
    { type: "cssDeclaration", label: T("Conserve le lien identifiable", "Preserve the identifiable link"), value: { selector: ".course-card .action", property: "text-decoration", value: "underline" } },
    { type: "cssMediaDeclaration", label: T("Conserve la largeur desktop conditionnelle", "Preserve the conditional desktop width"), value: { query: "(min-width: 760px)", selector: ".course-card", property: "max-width", value: "42rem" } },
    ...steps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} utilise la bonne cible et la bonne valeur`, `${step.property} uses the correct target and value`), value: { selector: step.selector, property: step.property, value: step.value } })),
    { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
  ];
}

function boxTypePreview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">Atelier robuste</p><h1>Composer sans débordement</h1><p class="lead">Cette description volontairement longue permet de comparer la mesure, l'interligne et l'espace intérieur sur plusieurs largeurs.</p><p class="identifier">pulsaconf-css-box-model-session-2026-identifiant-extremement-long</p><a class="action" href="#archive">Voir l'archive</a></section><section class="course-card is-muted" id="archive"><p class="eyebrow">Archive</p><p class="lead">Une seconde carte rend la marge extérieure et le centrage observables.</p></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">Robust workshop</p><h1>Compose without overflow</h1><p class="lead">This deliberately long description makes measure, line height, and inner spacing comparable across several widths.</p><p class="identifier">pulsaconf-css-box-model-session-2026-extremely-long-identifier</p><a class="action" href="#archive">View archive</a></section><section class="course-card is-muted" id="archive"><p class="eyebrow">Archive</p><p class="lead">A second card makes outer spacing and centering observable.</p></section></main>`
  );
}

function boxTypeQuiz(title, moduleIndex, profile) {
  const brief = T("Diagnostique taille, espacement et typographie à partir d'un rendu concret.", "Diagnose size, spacing, and typography from concrete output.");
  const course = {
    fr: { introduction: "Ce quiz vérifie les relations du box model plutôt que la mémorisation de propriétés isolées.", sections: [{ title: "Dimensions", paragraphs: ["Relie chaque symptôme à la zone de boîte concernée.", "Une carte trop large ne se corrige pas au hasard avec une marge négative."], example: ".notice { box-sizing: border-box; }" }, { title: "Lecture", paragraphs: ["Distingue largeur du composant et mesure du texte.", "Lis clamp dans l'ordre minimum, valeur fluide, maximum."], example: "clamp(1.5rem, 4vw, 2.5rem)" }, { title: "Contenu extrême", paragraphs: ["Teste une chaîne sans espace avant de conclure.", "Le correctif doit agir sans masquer ni tronquer l'information."], example: "overflow-wrap: anywhere;" }], vocabulary: [["boîte", "Contenu, padding, bordure et marge."], ["clamp", "Fonction bornant une valeur fluide."], ["mesure", "Longueur d'une ligne de texte."]], check: ["Je localise le symptôme.", "Je choisis la propriété adaptée.", "Je cite une preuve observable."] },
    en: { introduction: "This quiz verifies box-model relationships rather than memorization of isolated properties.", sections: [{ title: "Dimensions", paragraphs: ["Connect each symptom to the affected box area.", "Do not randomly fix an oversized card with a negative margin."], example: ".notice { box-sizing: border-box; }" }, { title: "Reading", paragraphs: ["Distinguish component width from text measure.", "Read clamp in minimum, fluid value, maximum order."], example: "clamp(1.5rem, 4vw, 2.5rem)" }, { title: "Extreme content", paragraphs: ["Test a string without spaces before drawing a conclusion.", "The fix should work without hiding or truncating information."], example: "overflow-wrap: anywhere;" }], vocabulary: [["box", "Content, padding, border, and margin."], ["clamp", "Function bounding a fluid value."], ["measure", "Length of a text line."]], check: ["I locate the symptom.", "I choose the appropriate property.", "I cite observable evidence."] }
  };
  const guide = {
    fr: { objectives: ["Distinguer padding et margin.", "Interpréter box-sizing et clamp.", "Choisir une correction contre le débordement."], prerequisites: ["Avoir terminé les huit exercices.", "Lire une règle CSS.", "Observer un rendu étroit."], steps: ["Lis le symptôme.", "Localise la zone concernée.", "Choisis la preuve la plus forte."], mistakes: ["Pour le quiz Box model, choisir une propriété au son de son nom.", "Confondre largeur de carte et longueur de ligne.", "Ignorer le contenu extrême."] },
    en: { objectives: ["Distinguish padding and margin.", "Interpret box-sizing and clamp.", "Choose an overflow correction."], prerequisites: ["Complete all eight exercises.", "Read a CSS rule.", "Observe narrow output."], steps: ["Read the symptom.", "Locate the affected area.", "Choose the strongest evidence."], mistakes: ["For the box-model quiz, choosing a property by how its name sounds.", "Confusing card width and line length.", "Ignoring extreme content."] }
  };
  const explanation = T("La réponse relie un symptôme observable à la zone exacte du box model.", "The answer connects an observable symptom to the exact box-model area.");
  const questions = [
    { id: "css-box-type-quiz-single", type: "single", prompt: T("Quelle valeur empêche padding et bordure d'augmenter la largeur déclarée ?", "Which value prevents padding and border from increasing the declared width?"), choices: [{ id: "border-box", label: T("box-sizing: border-box", "box-sizing: border-box") }, { id: "content-box", label: T("box-sizing: content-box", "box-sizing: content-box") }, { id: "hidden", label: T("overflow: hidden", "overflow: hidden") }], answer: "border-box", explanation },
    { id: "css-box-type-quiz-multiple", type: "multiple", prompt: T("Quelles décisions améliorent directement la lecture d'un paragraphe long ?", "Which decisions directly improve reading of a long paragraph?"), choices: [{ id: "measure", label: T("Limiter la mesure en ch", "Limit measure in ch") }, { id: "leading", label: T("Utiliser un interligne sans unité", "Use unitless line height") }, { id: "opacity", label: T("Réduire l'opacité", "Reduce opacity") }], answer: ["measure", "leading"], explanation },
    { id: "css-box-type-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : le padding crée l'espace entre deux cartes voisines.", "True or false: padding creates space between neighboring cards."), choices: [{ id: "true", label: T("Vrai", "True") }, { id: "false", label: T("Faux", "False") }], answer: "false", explanation },
    { id: "css-box-type-quiz-order", type: "ordering", prompt: T("Lis clamp(2rem, 5vw, 3.5rem) dans le bon ordre.", "Read clamp(2rem, 5vw, 3.5rem) in the correct order."), choices: [{ id: "min", label: T("Minimum : 2rem", "Minimum: 2rem") }, { id: "fluid", label: T("Valeur fluide : 5vw", "Fluid value: 5vw") }, { id: "max", label: T("Maximum : 3.5rem", "Maximum: 3.5rem") }], answer: ["min", "fluid", "max"], explanation },
    { id: "css-box-type-quiz-code", type: "code-reading", prompt: T("Un identifiant sans espace déborde de la carte. Quelle déclaration préserve tout le texte ?", "An identifier without spaces overflows the card. Which declaration preserves all text?"), choices: [{ id: "wrap", label: T("overflow-wrap: anywhere", "overflow-wrap: anywhere") }, { id: "hide", label: T("overflow: hidden", "overflow: hidden") }, { id: "nowrap", label: T("white-space: nowrap", "white-space: nowrap") }], answer: "wrap", explanation },
    { id: "css-box-type-quiz-open", type: "short-open", prompt: T("Cite les deux zones qui distinguent espace intérieur et extérieur.", "Name the two areas distinguishing inner and outer spacing."), choices: [], answer: T(["padding", "margin"], ["padding", "margin"]), keywords: ["padding", "margin"], explanation }
  ];
  return {
    id: "css-box-type-quiz", type: "quiz", title: T("Quiz Box model et typographie", "Box model and typography quiz"), brief, theory: brief, course, guide,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: T("Quiz Box model", "Box model quiz"), brief, type: "quiz" }),
    skills: ["css-box-type"], difficulty: "quiz", durationMin: 22, question: questions[0].prompt, options: questions[0].choices, answer: questions[0].answer,
    explanation, questions, passingScore: 75, randomizeQuestions: true, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: T("Réponse correcte", "Correct answer"), value: "border-box" }], xp: 55, order: moduleIndex + 1, profile
  };
}

function boxTypeProject(title, solution, profile) {
  const starterCode = selectorsSteps.reduce((css, step) => `${css}\n\n${step.rule}`, selectorsBase);
  const brief = T("Livre une carte PulsaConf stable, lisible et résistante aux contenus extrêmes.", "Ship a stable, readable PulsaConf card that withstands extreme content.");
  const course = {
    fr: { introduction: "Le lab assemble les huit décisions du module sans perdre les sélecteurs, couleurs, états et règles responsive déjà certifiés.", sections: [{ title: "Diagnostiquer", paragraphs: ["Commence par observer la carte à 375 px avec son titre, son paragraphe long et son identifiant sans espace.", "Classe chaque symptôme dans la taille, l'espace intérieur, l'espace extérieur ou la typographie avant de modifier le CSS."], example: ".notice { box-sizing: border-box; padding: 1rem; }" }, { title: "Assembler", paragraphs: ["Ajoute les déclarations dans l'ordre du module afin que chaque étape conserve la précédente.", "Contraints le paragraphe plutôt que toute la carte lorsque le problème concerne uniquement la longueur de ligne."], example: ".notice__copy { max-width: 55ch; line-height: 1.6; }" }, { title: "Vérifier", paragraphs: ["Compare mobile et desktop, puis inspecte les valeurs calculées du titre, du paragraphe et de la carte.", "Le projet est terminé seulement si le contenu extrême reste visible sans défilement horizontal ni règle important."], example: "DevTools > Computed > Box model" }], vocabulary: [["box model", "Relation entre contenu, padding, bordure et marge."], ["mesure", "Longueur d'une ligne de lecture."], ["contenu extrême", "Cas plus long que le contenu habituel."]], check: ["Les huit décisions sont présentes.", "Les acquis précédents sont conservés.", "Mobile et contenu extrême restent robustes."] },
    en: { introduction: "The lab combines all eight module decisions without losing previously certified selectors, colors, states, and responsive rules.", sections: [{ title: "Diagnose", paragraphs: ["Start by observing the card at 375 px with its heading, long paragraph, and identifier without spaces.", "Classify each symptom as size, inner spacing, outer spacing, or typography before changing CSS."], example: ".notice { box-sizing: border-box; padding: 1rem; }" }, { title: "Assemble", paragraphs: ["Add declarations in module order so that every step preserves the previous one.", "Constrain the paragraph rather than the whole card when the problem concerns only line length."], example: ".notice__copy { max-width: 55ch; line-height: 1.6; }" }, { title: "Verify", paragraphs: ["Compare mobile and desktop, then inspect computed values for the heading, paragraph, and card.", "The project is complete only when extreme content remains visible without horizontal scrolling or an important rule."], example: "DevTools > Computed > Box model" }], vocabulary: [["box model", "Relationship between content, padding, border, and margin."], ["measure", "Length of a reading line."], ["extreme content", "A case longer than usual content."]], check: ["All eight decisions are present.", "Previous outcomes are preserved.", "Mobile and extreme content remain robust."] }
  };
  const guide = {
    fr: { objectives: [brief.fr, "Conserver CSS 00 et CSS 01.", "Prouver les huit valeurs sur leurs cibles exactes."], prerequisites: ["Avoir terminé les huit exercices.", "Tester à 375 px et desktop.", "Inspecter les valeurs calculées."], steps: ["Reproduire le contenu extrême.", "Ajouter les huit règles cumulatives.", "Relire chaque preuve avant livraison."], mistakes: ["Pour le lab Box model, repartir d'une feuille vide et perdre les acquis précédents.", "Cacher le débordement au lieu de traiter sa cause.", "Vérifier uniquement la carte héro."] },
    en: { objectives: [brief.en, "Preserve CSS 00 and CSS 01.", "Prove all eight values on their exact targets."], prerequisites: ["Complete all eight exercises.", "Test at 375 px and desktop.", "Inspect computed values."], steps: ["Reproduce extreme content.", "Add all eight cumulative rules.", "Review every piece of evidence before delivery."], mistakes: ["For the box-model lab, starting from an empty stylesheet and losing previous outcomes.", "Hiding overflow instead of addressing its cause.", "Checking only the hero card."] }
  };
  return {
    id: "css-box-type-lab", type: "project", title: T("Lab Box model et typographie", "Box model and typography lab"), brief, theory: brief, course, guide,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: T("Lab Box model", "Box model lab"), brief, solution: ".notice { box-sizing: border-box; }", type: "project" }),
    skills: ["css-box-type", "box-model", "typography"], difficulty: "project", durationMin: 100, starterCode, solution, previewHtml: boxTypePreview(),
    tests: boxTypeTests(boxTypeSteps),
    rubric: T(["Les huit déclarations ciblent la bonne zone.", "Les règles CSS 00 et CSS 01 restent actives.", "Le contenu long reste visible à 375 px.", "La feuille n'utilise ni masquage ni important."], ["All eight declarations target the correct area.", "CSS 00 and CSS 01 rules remain active.", "Long content remains visible at 375 px.", "The stylesheet uses neither hiding nor important."]),
    hint: T("Pars du lab CSS 01 et traite d'abord taille, espace, puis texte long.", "Start from the CSS 01 lab and address size, spacing, then long text."), xp: 95, titleContext: title, profile
  };
}

function selectorsColorsLesson(step, order, starterCode, solution, profile) {
  const course = {
    fr: { introduction: `${profile.scene[0]} ${step.brief.fr}`, sections: [{ title: "Portée", paragraphs: ["Lis le HTML avant de choisir le sélecteur.", "La règle doit viser le plus petit sous-ensemble utile."], example: step.example }, { title: "Cascade", paragraphs: ["Compare règle de base et variante avant d'ajouter une surcharge.", "Évite !important : rends la relation explicite."], example: ".notice { color: #475569; }\n.featured.notice { color: #7c2d12; }" }, { title: "Preuve", paragraphs: ["Inspecte la déclaration active et relis le composant avec son vrai contenu.", "Vérifie aussi lien et focus lorsque la cible est interactive."], example: "DevTools > Éléments > Styles" }], vocabulary: [["portée", "Ensemble exact d'éléments visés."], ["variante", "Classe qui modifie un composant de base."], ["cascade", "Mécanisme qui choisit la déclaration active."]], check: ["Je justifie le sélecteur.", "Je connais la règle gagnante.", "Je vérifie le rendu."] },
    en: { introduction: `${profile.scene[1]} ${step.brief.en}`, sections: [{ title: "Scope", paragraphs: ["Read the HTML before choosing the selector.", "The rule should target the smallest useful subset."], example: step.example }, { title: "Cascade", paragraphs: ["Compare the base rule and variant before adding an override.", "Avoid !important: make the relationship explicit."], example: ".notice { color: #475569; }\n.featured.notice { color: #7c2d12; }" }, { title: "Evidence", paragraphs: ["Inspect the active declaration and reread the component with real content.", "Also verify links and focus when the target is interactive."], example: "DevTools > Elements > Styles" }], vocabulary: [["scope", "Exact set of targeted elements."], ["variant", "Class modifying a base component."], ["cascade", "Mechanism choosing the active declaration."]], check: ["I justify the selector.", "I know the winning rule.", "I verify the output."] }
  };
  const guide = {
    fr: { objectives: [step.brief.fr, "Conserver les règles certifiées du module précédent.", "Prouver la valeur sur le bon sélecteur."], prerequisites: ["Avoir terminé CSS 00.", "Lire classes et descendants.", "Ouvrir la preview."], steps: ["Repérer la cible dans la preview.", "Ajouter la règle minimale.", "Inspecter la valeur active."], mistakes: [`Pour « ${step.title.fr} », cibler toute la page au lieu du composant.`, "Utiliser !important.", "Confondre présence du mot et déclaration valide."] },
    en: { objectives: [step.brief.en, "Preserve the certified rules from the previous module.", "Prove the value on the correct selector."], prerequisites: ["Complete CSS 00.", "Read classes and descendants.", "Open the preview."], steps: ["Find the target in the preview.", "Add the minimal rule.", "Inspect the active value."], mistakes: [`For “${step.title.en},” targeting the whole page instead of the component.`, "Using !important.", "Confusing a word's presence with a valid declaration."] }
  };
  return {
    id: `css-selectors-colors-${step.slug}`,
    type: "css",
    title: step.title,
    brief: step.brief,
    theory: step.brief,
    course,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: step.title, brief: step.brief, solution: step.example, type: "css" }),
    guide,
    skills: ["css-selectors-colors", step.property],
    difficulty: order <= 3 ? "easy" : order <= 6 ? "medium" : "hard",
    durationMin: 18,
    starterCode,
    solution,
    previewHtml: selectorsColorsPreview(),
    tests: [
      { type: "cssDeclaration", label: T(`Déclare ${step.property} sur ${step.selector}`, `Declare ${step.property} on ${step.selector}`), value: { selector: step.selector, property: step.property, value: step.value } },
      { type: "cssMediaDeclaration", label: T("Conserve la largeur desktop certifiée", "Preserve the certified desktop width"), value: { query: "(min-width: 760px)", selector: ".course-card", property: "max-width", value: "42rem" } },
      { type: "notContains", label: T("N'utilise pas important", "Do not use important"), value: "!important" }
    ],
    hint: T(`Ajoute ${step.property}: ${step.value} dans ${step.selector}.`, `Add ${step.property}: ${step.value} inside ${step.selector}.`),
    xp: 24 + order
  };
}

function selectorsColorsQuiz(title, moduleIndex, profile) {
  const quiz = quizFor("css-selectors-colors", title, moduleIndex, profile, ".course-card", selectorsSteps.map((step) => step.property));
  const explanation = T("La réponse limite les effets de bord et conserve une preuve visible dans le composant.", "The answer limits side effects and preserves visible evidence in the component.");
  quiz.questions = [
    { id: "css-selectors-colors-quiz-single", type: "single", prompt: T("Quel sélecteur souligne uniquement le lien de la carte ?", "Which selector underlines only the card link?"), choices: [{ id: "action", label: T(".course-card .action", ".course-card .action") }, { id: "card", label: T(".course-card", ".course-card") }, { id: "all", label: T("a, p, article", "a, p, article") }], answer: "action", explanation },
    { id: "css-selectors-colors-quiz-multiple", type: "multiple", prompt: T("Quelles preuves valident une paire de couleurs ?", "Which evidence validates a color pair?"), choices: [{ id: "values", label: T("Les valeurs actives de color et background", "The active color and background values") }, { id: "contrast", label: T("Un contraste vérifié sur le contenu réel", "Verified contrast on real content") }, { id: "taste", label: T("Une préférence personnelle", "A personal preference") }], answer: ["values", "contrast"], explanation },
    { id: "css-selectors-colors-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : un outline permanent sur article remplace :focus-visible sur le lien.", "True or false: a permanent outline on article replaces :focus-visible on the link."), choices: [{ id: "true", label: T("Vrai", "True") }, { id: "false", label: T("Faux", "False") }], answer: "false", explanation },
    { id: "css-selectors-colors-quiz-order", type: "ordering", prompt: T("Ordonne une revue de cascade.", "Order a cascade review."), choices: [{ id: "scope", label: T("Identifier la portée utile", "Identify the useful scope") }, { id: "base", label: T("Lire la règle de base", "Read the base rule") }, { id: "variant", label: T("Ajouter la variante minimale", "Add the minimal variant") }, { id: "inspect", label: T("Inspecter la déclaration gagnante", "Inspect the winning declaration") }], answer: ["scope", "base", "variant", "inspect"], explanation },
    { id: "css-selectors-colors-quiz-code", type: "code-reading", prompt: T("Entre .course-card et .hero-card.course-card, quelle règle de variante gagne à propriété égale ?", "Between .course-card and .hero-card.course-card, which variant rule wins for the same property?"), choices: [{ id: "variant", label: T(".hero-card.course-card", ".hero-card.course-card") }, { id: "base", label: T(".course-card", ".course-card") }, { id: "random", label: T("La couleur choisie au hasard", "The randomly chosen color") }], answer: "variant", explanation },
    { id: "css-selectors-colors-quiz-open", type: "short-open", prompt: T("Cite trois preuves pour valider sélecteur, couleur et focus.", "Name three pieces of evidence validating selector, color, and focus."), choices: [], answer: T(["sélecteur", "contraste", "focus"], ["selector", "contrast", "focus"]), explanation }
  ];
  quiz.question = quiz.questions[0].prompt;
  quiz.options = quiz.questions[0].choices;
  quiz.answer = quiz.questions[0].answer;
  quiz.explanation = explanation;
  return quiz;
}

function selectorsColorsProject(title, solution, profile) {
  const course = {
    fr: { introduction: "Le lab rassemble les décisions de portée, variante, lien, focus et atténuation dans une seule feuille cumulative.", sections: [{ title: "Carte de base", paragraphs: ["Conserve les acquis de CSS 00 pour garder une base comparable avant chaque nouvelle décision visuelle.", "Ajoute les règles sans supprimer la media query, puis contrôle la largeur sur mobile et sur desktop."], example: ".notice { color: #334155; background: #fff; }" }, { title: "Variantes", paragraphs: ["Sépare la carte héro et la carte atténuée avec des classes de variante explicites qui complètent la règle de base.", "Évite les sélecteurs globaux afin qu'une correction locale ne modifie ni la navigation ni les autres composants."], example: ".featured.notice { border-color: #4338ca; }" }, { title: "États", paragraphs: ["Le lien reste souligné et son focus visible pour que le changement d'état ne dépende jamais uniquement de la couleur.", "Inspecte chaque déclaration active, puis navigue au clavier pour confirmer la cascade dans le rendu réel."], example: ".notice a:focus-visible { outline: 2px solid #4338ca; }" }], vocabulary: [["portée", "Périmètre du sélecteur."], ["variante", "Modification explicite du composant."], ["état", "Situation interactive ou éditoriale."]], check: ["La base reste intacte.", "Les variantes sont limitées.", "Le focus reste visible."] },
    en: { introduction: "The lab combines scope, variant, link, focus, and de-emphasis decisions in one cumulative stylesheet.", sections: [{ title: "Base card", paragraphs: ["Preserve the CSS 00 outcomes so that every new visual decision starts from a stable, comparable baseline.", "Add rules without removing the media query, then check the card width on both mobile and desktop."], example: ".notice { color: #334155; background: #fff; }" }, { title: "Variants", paragraphs: ["Separate the hero and de-emphasized cards with explicit variant classes that complement the base rule.", "Avoid global selectors so that a local correction changes neither navigation nor unrelated components."], example: ".featured.notice { border-color: #4338ca; }" }, { title: "States", paragraphs: ["Keep the link underlined and its focus visible so that a state change never depends on color alone.", "Inspect every active declaration, then navigate by keyboard to confirm the cascade in the real output."], example: ".notice a:focus-visible { outline: 2px solid #4338ca; }" }], vocabulary: [["scope", "Selector perimeter."], ["variant", "Explicit component modification."], ["state", "Interactive or editorial situation."]], check: ["The base remains intact.", "Variants stay scoped.", "Focus remains visible."] }
  };
  const guide = guideFor(T("Lab sélecteurs et couleurs", "Selectors and colors lab"), title, 10, profile, "cascade", ".course-card");
  return {
    id: "css-selectors-colors-lab", type: "project", title: T("Lab sélecteurs, cascade et couleurs", "Selectors, cascade, and colors lab"),
    brief: T("Livre le système visuel complet sans élargir les sélecteurs ni perdre focus et responsive.", "Ship the complete visual system without broadening selectors or losing focus and responsive behavior."),
    theory: T("Assemble les huit décisions dans une feuille cumulative.", "Combine all eight decisions in one cumulative stylesheet."), course, guide,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: T("Lab sélecteurs et couleurs", "Selectors and colors lab"), brief: T("Assemble le système de cartes.", "Assemble the card system."), solution: ".notice.is-featured { border-color: #4338ca; }", type: "project" }),
    skills: ["css-selectors-colors", "lab"], difficulty: "project", durationMin: 95, starterCode: selectorsBase, solution, previewHtml: selectorsColorsPreview(),
    tests: [...selectorsSteps.map((step) => ({ type: "cssDeclaration", label: T(`${step.property} reste sur la bonne cible`, `${step.property} remains on the correct target`), value: { selector: step.selector, property: step.property, value: step.value } })), { type: "cssMediaDeclaration", label: T("La largeur desktop reste conditionnelle", "Desktop width remains conditional"), value: { query: "(min-width: 760px)", selector: ".course-card", property: "max-width", value: "42rem" } }, { type: "notContains", label: T("Aucun important", "No important"), value: "!important" }],
    rubric: T(["Les sélecteurs distinguent descendants, variantes et focus.", "Chaque valeur est exacte et inspectable.", "Le lien et le focus restent identifiables.", "La media query certifiée est conservée."], ["Selectors distinguish descendants, variants, and focus.", "Every value is exact and inspectable.", "The link and focus remain identifiable.", "The certified media query is preserved."]),
    hint: T("Pars de la feuille CSS 00 et ajoute les huit règles sans modifier leur cible.", "Start from the CSS 00 stylesheet and add all eight rules without changing their targets."), xp: 90
  };
}

function selectorsColorsPreview() {
  return T(
    `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">Atelier recommandé</p><h1>CSS PulsaConf</h1><p class="lead">Une carte complète pour tester portée, cascade et contraste.</p><a class="action" href="#details">Voir les détails</a></section><section class="course-card is-muted" id="details"><p class="eyebrow">Archive</p><p class="lead">Cette variante reste lisible malgré son atténuation.</p><a class="action" href="#details">Relire</a></section></main>`,
    `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">Recommended workshop</p><h1>PulsaConf CSS</h1><p class="lead">A complete card for testing scope, cascade, and contrast.</p><a class="action" href="#details">View details</a></section><section class="course-card is-muted" id="details"><p class="eyebrow">Archive</p><p class="lead">This variant remains readable despite de-emphasis.</p><a class="action" href="#details">Review</a></section></main>`
  );
}

function lessonFor(moduleId, moduleTitle, selector, check, step, profile) {
  const id = `${moduleId}-${slug(check)}`;
  const concept = conceptCopy[check];
  const title = { fr: `${step}. ${concept.fr.title}`, en: `${step}. ${concept.en.title}` };
  const brief = {
    fr: `${profile.scene[0]} ${concept.fr.brief} Applique ce choix à ${selector}, puis vérifie que ${profile.proof[0]}.`,
    en: `${profile.scene[1]} ${concept.en.brief} Apply this choice to ${selector}, then verify that ${profile.proof[1]}.`
  };
  const solution = cssFor(selector, check);
  const course = courseFor(title, brief, solution, check, selector, moduleTitle, step, profile);
  const guide = guideFor(title, moduleTitle, step, profile, check, selector);
  return {
    id,
    type: "css",
    title,
    brief,
    theory: { fr: brief.fr, en: brief.en },
    course,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title, brief, solution, type: "css" }),
    guide,
    skills: [moduleId, check],
    difficulty: step <= 3 ? "easy" : step <= 6 ? "medium" : "hard",
    durationMin: 18,
    starterCode: T(`${selector} {\n  /* Ajoute ${check}. */\n}`, `${selector} {\n  /* Add ${check}. */\n}`),
    solution,
    previewHtml: previewHtml(),
    tests: testsFor(selector, check, solution),
    hint: { fr: `Ecris une règle courte pour ${selector}.`, en: `Write a short rule for ${selector}.` },
    xp: 24 + step
  };
}

function quizFor(moduleId, title, index, profile, selector, checks) {
  const id = `${moduleId}-quiz`;
  const brief = { fr: `Diagnostique ${title[0]} comme une revue CSS : risque, preuve et correction minimale.`, en: `Diagnose ${title[1]} like a CSS review: risk, evidence, and minimal fix.` };
  const explanation = { fr: `Le bon choix prouve que ${profile.proof[0]}.`, en: `The right choice proves that ${profile.proof[1]}.` };
  const choices = [
    { id: "proof", label: { fr: "Ecrire une règle courte puis vérifier le rendu et les tests", en: "Write a short rule, then verify preview and tests" } },
    { id: "random", label: { fr: "Essayer des valeurs au hasard", en: "Try random values" } },
    { id: "desktop", label: { fr: "Ne regarder que le desktop", en: "Check desktop only" } }
  ];
  const prompt = { fr: `Quel reflexe rend ${title[0]} fiable ?`, en: `Which habit makes ${title[1]} reliable?` };
  const course = courseFor({ fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, brief, `${selector} { ${checks[0]}: ... }`, checks[0] || "proof", selector, title, index + 1, profile);
  const guide = guideFor({ fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, title, index + 1, profile, checks[0] || "proof", selector);
  const ordered = ["read", "risk", "fix", "prove"];
  return {
    id,
    type: "quiz",
    title: { fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` },
    brief,
    course,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: { fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, brief, type: "quiz" }),
    theory: brief,
    guide,
    skills: [moduleId],
    difficulty: "quiz",
    durationMin: 20,
    question: prompt,
    options: choices,
    answer: "proof",
    explanation,
    questions: [
      { id: `${id}-single`, type: "single", prompt, choices, answer: "proof", explanation },
      { id: `${id}-multiple`, type: "multiple", prompt: { fr: "Quelles preuves sont utiles avant de valider ?", en: "Which evidence is useful before validating?" }, choices: [{ id: "preview", label: { fr: "Rendu compare avant/apres", en: "Before/after preview" } }, { id: "devtools", label: { fr: "Règle active dans DevTools", en: "Active rule in DevTools" } }, { id: "guess", label: { fr: "Valeur choisie au hasard", en: "Random value" } }], answer: ["preview", "devtools"], explanation },
      { id: `${id}-tf`, type: "true-false", prompt: { fr: "Vrai ou faux : une règle responsive doit etre vérifiée avec du contenu reel.", en: "True or false: a responsive rule should be checked with real content." }, answer: "true", explanation },
      { id: `${id}-order`, type: "ordering", prompt: { fr: "Classe la revue CSS la plus fiable.", en: "Order the most reliable CSS review." }, choices: [{ id: "read", label: { fr: "Lire le composant cible", en: "Read the target component" } }, { id: "risk", label: { fr: `Nommer le risque : ${profile.risk[0]}`, en: `Name the risk: ${profile.risk[1]}` } }, { id: "fix", label: { fr: "Ajouter la plus petite règle utile", en: "Add the smallest useful rule" } }, { id: "prove", label: { fr: `Prouver que ${profile.proof[0]}`, en: `Prove that ${profile.proof[1]}` } }], answer: ordered, explanation },
      { id: `${id}-code`, type: "code-reading", prompt: { fr: `Lis ${selector} { ${checks[0]}: initial; }. Quel diagnostic est prioritaire ?`, en: `Read ${selector} { ${checks[0]}: initial; }. What is the priority diagnosis?` }, choices: [{ id: "risk", label: { fr: profile.risk[0], en: profile.risk[1] } }, { id: "ok", label: { fr: "Le code est forcement pret", en: "The code is necessarily ready" } }, { id: "delete", label: { fr: "Supprimer tout le CSS", en: "Delete all CSS" } }], answer: "risk", explanation },
      { id: `${id}-open`, type: "short-open", prompt: { fr: "Quelle preuve citerais-tu en revue CSS ?", en: "What evidence would you cite in CSS review?" }, answer: ["devtools", "mobile", "focus", "rendu", "test"], keywords: ["mobile"], explanation }
    ],
    passingScore: 75,
    randomizeQuestions: true,
    feedbackMode: "immediate",
    starterCode: "",
    solution: "",
    tests: [{ type: "quiz", label: "correct answer", value: "proof" }],
    hint: { fr: "Relie chaque réponse à une preuve visible.", en: "Connect each answer to visible proof." },
    xp: 35
  };
}

function projectFor(moduleId, title, selector, checks, index, profile) {
  const id = `${moduleId}-lab`;
  const picked = checks.slice(0, 5);
  const solution = `${selector} {\n  ${picked.map((check) => declaration(check)).join("\n  ")}\n}`;
  const brief = { fr: `Assemble ${profile.project[0]} avec des règles lisibles, testables et reliées au scenario PulsaConf.`, en: `Assemble ${profile.project[1]} with readable, testable rules connected to the PulsaConf scenario.` };
  const course = courseFor({ fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, brief, solution, picked[0], selector, title, index + 1, profile);
  const guide = guideFor({ fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, title, index + 1, profile, picked[0], selector);
  return {
    id,
    type: "project",
    title: { fr: `Lab ${title[0]}`, en: `${title[1]} lab` },
    brief,
    course,
    pedagogy: createGeneratedCssPedagogy({ course, guide, title: { fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, brief, solution, type: "project" }),
    theory: brief,
    guide,
    skills: [moduleId, "lab"],
    difficulty: "project",
    durationMin: 95,
    starterCode: `${selector} {\n}\n`,
    solution,
    previewHtml: previewHtml(),
    tests: picked.map((check) => ({ type: "contains", label: { fr: `Le lab contient ${check}`, en: `The lab contains ${check}` }, value: check })),
    rubric: {
      fr: [
        `Les règles ecrites pour ${selector} prouvent que ${profile.proof[0]}.`,
        `Le lab évite le risque principal : ${profile.risk[0]}.`,
        "Les états interactifs conservent un focus visible et une cible utilisable au clavier comme à la souris.",
        "Les textes longs, contenus variables et espacements choisis ne creent ni débordement ni masquage critique."
      ],
      en: [
        `Rules written for ${selector} stay readable, grouped by intent, and free of unnecessary duplication.`,
        `The layout remains verifiable on small and large screens, with at least one clear proof tied to ${picked[0]}.`,
        "Interactive states keep visible focus and a target that remains usable with keyboard and pointer input.",
        "Long text, variable content, and chosen spacing create neither overflow nor critical content loss."
      ]
    },
    hint: { fr: "Commence par la contrainte qui protege le layout.", en: "Start with the constraint that protects layout." },
    xp: 90
  };
}

function courseFor(title, brief, solution, check, selector, moduleTitle, step, profile) {
  return {
    fr: { introduction: `${profile.scene[0]} ${title.fr} traite une partie précise du problème : ${profile.risk[0]}.`, sections: sections(title.fr, brief.fr, solution, check, selector, profile), vocabulary: vocab(check, selector), check: [`Je sais appliquer ${check}.`, `Je prouve que ${profile.proof[0]}.`, "Je peux expliquer le choix."] },
    en: { introduction: `${profile.scene[1]} ${title.en} handles a specific part of the problem: ${profile.risk[1]}.`, sections: sections(title.en, brief.en, solution, check, selector, profile, true), vocabulary: vocab(check, selector, true), check: [`I can apply ${check}.`, `I prove that ${profile.proof[1]}.`, "I can explain the choice."] }
  };
}

function sections(title, brief, solution, check, selector, profile, english = false) {
  const risk = english ? profile.risk[1] : profile.risk[0];
  const proof = english ? profile.proof[1] : profile.proof[0];
  return [
    { title: english ? "Intent" : "Intention", paragraphs: [brief, english ? `${check} must answer a visible constraint, not decorate randomly.` : `${check} doit repondre à une contrainte visible, pas décorer au hasard.`], example: solution.slice(0, 220) },
    { title: english ? "Method" : "Méthode", paragraphs: [english ? `Target ${selector}, add one useful declaration, then inspect the active rule.` : `Cible ${selector}, ajoute une declaration utile, puis inspecte la règle active.`, english ? `The risk to avoid is: ${risk}.` : `Le risque a éviter est : ${risk}.`], example: `${selector} { ${check}: ... }` },
    { title: english ? "Validation" : "Validation", paragraphs: [english ? `${title} is complete when tests pass and ${proof}.` : `${title} est termine quand les tests passent et que ${proof}.`, english ? "Also reread focus, long text, and small screens." : "Relis aussi le focus, les textes longs et le petit écran."], example: check }
  ];
}

function guideFor(title, moduleTitle, step, profile, check, selector) {
  return { fr: { objectives: [`Implémenter ${title.fr} sans perdre le scenario PulsaConf.`, `Relier ${check} au risque : ${profile.risk[0]}.`, `Prouver que ${profile.proof[0]}.`], prerequisites: ["Lire le sélecteur", "Comprendre la propriété ciblée", "Savoir lancer les tests"], steps: [`Identifier pourquoi ${selector} est la bonne cible.`, `Ajouter la plus petite règle utile pour ${check}.`, "Tester mobile, desktop, focus et contenu long."], mistakes: [`Sur-styliser ${title.fr} au lieu de corriger ${profile.risk[0]}.`, "Masquer le focus.", "Corriger sans regarder le rendu."] }, en: { objectives: [`Implement ${title.en} without losing the PulsaConf scenario.`, `Connect ${check} to the risk: ${profile.risk[1]}.`, `Prove that ${profile.proof[1]}.`], prerequisites: ["Read the selector", "Understand the target property", "Know how to run tests"], steps: [`Identify why ${selector} is the right target.`, `Add the smallest useful rule for ${check}.`, "Test mobile, desktop, focus, and long content."], mistakes: [`Over-styling ${title.en} instead of fixing ${profile.risk[1]}.`, "Hiding focus.", "Fixing without checking preview."] } };
}

function createGeneratedCssPedagogy({ course, guide, title, brief, solution = "", type = "css" }) {
  const frTitle = title?.fr || "Atelier CSS";
  const enTitle = title?.en || "CSS workshop";
  const fallbackSolution = solution && !solution.includes(".course-card") ? solution : ".example {\n  color: #334155;\n}";

  return {
    fr: createPedagogyLocale({
      title: frTitle,
      brief: brief?.fr || "Complète l'étape demandée puis valide les tests.",
      course: course?.fr,
      guide: guide?.fr,
      solution: fallbackSolution,
      goodTitle: "Approche courte, visible et testable",
      badTitle: "Approche fragile",
      goodExplanation: "La règle cible un composant précis, exprime l'intention CSS et reste facile à vérifier dans le rendu.",
      badExplanation: "La correction repose sur du hasard, masque parfois le focus ou ne prouve pas que le layout tient vraiment.",
      autonomousPrefix: "Refais cette étape sans regarder la solution, puis explique le lien entre la règle CSS et le rendu.",
      next: type === "quiz" ? "Continue avec le module suivant en gardant cette logique de preuve." : "Passe à l'étape suivante et reutilise la même méthode de validation.",
      english: false
    }),
    en: createPedagogyLocale({
      title: enTitle,
      brief: brief?.en || "Complete the requested step, then validate the tests.",
      course: course?.en,
      guide: guide?.en,
      solution: fallbackSolution,
      goodTitle: "Short, visible, testable approach",
      badTitle: "Fragile approach",
      goodExplanation: "The rule targets a specific component, expresses the CSS intent, and remains easy to verify in the preview.",
      badExplanation: "The fix relies on guessing, may hide focus, or does not prove that the layout actually holds.",
      autonomousPrefix: "Repeat this step without opening the solution, then explain how the CSS rule changes the output.",
      next: type === "quiz" ? "Continue with the next module while keeping this proof-based habit." : "Move to the next step and reuse the same validation method.",
      english: true
    })
  };
}

function createPedagogyLocale({ title, brief, course = {}, guide = {}, solution, goodTitle, badTitle, goodExplanation, badExplanation, autonomousPrefix, next, english }) {
  const objectives = nonEmpty(guide.objectives, course.check, [
    `Comprendre le role de ${title}.`,
    "Appliquer une modification CSS courte.",
    "Verifier le résultat avec le rendu et les tests."
  ]);
  const steps = nonEmpty(guide.steps, [
    "Lire l'objectif et reperer le sélecteur cible.",
    "Ajouter la plus petite règle CSS qui satisfait la contrainte.",
    "Comparer le rendu avant/apres, puis relancer les tests."
  ]);

  return {
    why: course.introduction || brief,
    objectives,
    prerequisites: nonEmpty(guide.prerequisites, [
      "Savoir lire une règle CSS simple.",
      "Comprendre le sélecteur cible.",
      "Utiliser les tests comme preuve, pas comme loterie."
    ]),
    vocabulary: normalizeVocabulary(course.vocabulary),
    comparison: {
      good: { title: goodTitle, code: solution, explanation: goodExplanation },
      bad: { title: badTitle, code: ".demo {\n  color: red;\n}", explanation: badExplanation }
    },
    guided: steps,
    autonomous: `${autonomousPrefix} (${title})`,
    hints: [
      english ? `Start with this objective: ${objectives[0]}` : `Commence par cet objectif : ${objectives[0]}`,
      english ? "If a test fails, read the property or selector named in its message." : "Si un test échoue, lis la propriété ou le sélecteur cité dans son message.",
      english ? "Avoid large blocks: one correct declaration is better than a confusing cascade." : "Évite les grands blocs : une déclaration juste vaut mieux qu'une cascade confuse."
    ],
    correction: english
      ? ["The solution targets the requested component.", "The declaration adds an observable CSS intent.", "Tests confirm the property, value, and output stability."]
      : ["La solution cible le composant demandé.", "La déclaration ajoute une intention CSS observable.", "Les tests confirment la propriété, la valeur et la stabilité du rendu."],
    summary: course.introduction || brief,
    next
  };
}

function nonEmpty(...candidates) {
  return candidates.find((items) => Array.isArray(items) && items.length >= 3) || [];
}

function normalizeVocabulary(vocabulary = []) {
  if (Array.isArray(vocabulary) && vocabulary.length >= 3) return vocabulary;
  return [
    ["sélecteur", "Partie de la règle qui choisit les éléments à styliser."],
    ["declaration", "Couple propriété/valeur qui produit un effet visible."],
    ["preuve visuelle", "Verification du rendu sur plusieurs tailles et états."]
  ];
}

function cssFor(selector, check) {
  return check.startsWith("@media") ? `@media (min-width: 760px) {\n  ${selector} {\n    display: grid;\n  }\n}` : check.startsWith("@container") ? `@container (min-width: 28rem) {\n  ${selector} {\n    display: grid;\n  }\n}` : `${selector} {\n  ${declaration(check)}\n}`;
}

function testsFor(selector, check, solution) {
  const declarationLine = declaration(check);
  const property = propertyFor(check);
  const proof = proofTokenFor(check, declarationLine);
  const responsiveGuard = guardTokenFor(check, selector, solution, property);

  return [
    { type: "contains", label: { fr: `Cible le bon sélecteur ${selector}`, en: `Target the correct selector ${selector}` }, value: selector },
    { type: "contains", label: { fr: `Utilise le motif CSS ${check}`, en: `Use the CSS pattern ${check}` }, value: check },
    { type: "contains", label: { fr: `Declare la propriété ${property}`, en: `Declare the ${property} property` }, value: property },
    { type: "contains", label: { fr: `Ajoute une valeur vérifiable pour ${check}`, en: `Add a verifiable value for ${check}` }, value: proof },
    { type: "contains", label: { fr: "Garde le composant testable dans le rendu", en: "Keep the component testable in the output" }, value: responsiveGuard },
    { type: "contains", label: { fr: "La solution reste courte et orientee composant", en: "Keep the solution short and component-focused" }, value: stableTokenFor(solution, selector, check) }
  ];
}

function propertyFor(check) {
  if (check.startsWith("@media")) return "@media";
  if (check.startsWith("@container")) return "@container";
  if (check.startsWith(":")) return check;
  if (check.includes(":")) return check.split(":")[0].trim();
  if (check === "repeat" || check === "minmax" || check === "auto-fit") return "grid-template-columns";
  if (check === "clamp(") return "font-size";
  return check;
}

function proofTokenFor(check, declarationLine) {
  const map = {
    "background": "#eef2ff",
    "border-color": "#5546f6",
    "outline": "3px solid",
    "box-shadow": "rgba(",
    "box-sizing": "border-box",
    "padding": "1.25rem",
    "margin": "auto",
    "max-width": "72rem",
    "line-height": "1.7",
    "font-size": "clamp(",
    "overflow-wrap": "anywhere",
    "border-radius": "1.25rem",
    "display: flex": "flex",
    "gap": "1rem",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    "flex-direction": "column",
    "order": "2",
    "min-width": "0",
    "display: grid": "grid",
    "grid-template-columns": "repeat(",
    "repeat": "repeat(",
    "minmax": "minmax(",
    "grid-auto-flow": "dense",
    "place-items": "center",
    "align-content": "start",
    "width": "min(",
    "@media": "min-width",
    "clamp(": "clamp(",
    "container-type": "inline-size",
    "@container": "min-width",
    "auto-fit": "auto-fit",
    ":focus-visible": "focus-visible",
    "outline-offset": ".25rem",
    ":hover": "translateY",
    ":disabled": ".5",
    "cursor": "pointer",
    "contrast-color": "#10172a",
    "forced-color-adjust": "auto",
    "transition": ".2s",
    "transform": "translateY",
    "prefers-reduced-motion": "reduce",
    "animation": "pulse",
    "transform-origin": "center",
    "will-change": "transform",
    "transition: none": "none",
    "--space": "clamp(",
    "object-fit": "cover"
  };
  return map[check] || declarationLine.split(":").slice(1).join(":").replace(";", "").trim() || check;
}

function guardTokenFor(check, selector, solution, property) {
  const preferredTokens = [
    check.includes("grid") || check === "repeat" || check === "minmax" || check === "auto-fit" ? "grid" : "",
    check.includes("flex") || selector === ".toolbar" ? "flex" : "",
    check.includes("media") || check.includes("container") ? "min-width" : "",
    check.includes("motion") || check.includes("transition") || check.includes("transform") ? "transform" : "",
    check.includes("focus") || check.includes("outline") ? "outline" : "",
    check.includes("overflow") ? "overflow" : "",
    property,
    selector
  ].filter(Boolean);

  return preferredTokens.find((token) => solution.includes(token)) || selector;
}

function stableTokenFor(solution, selector, check) {
  if (check.startsWith("@media") || check.startsWith("@container")) return selector;
  if (solution.includes("{") && solution.includes("}")) return "}";
  return check;
}

function declaration(check) {
  const map = {
    "color": "color: #10172a;",
    "background": "background: #eef2ff;",
    "border-color": "border-color: #5546f6;",
    "font-weight": "font-weight: 800;",
    "text-decoration": "text-decoration: underline;",
    "outline": "outline: 3px solid #5546f6;",
    "box-shadow": "box-shadow: 0 10px 30px rgba(16, 23, 42, .12);",
    "opacity": "opacity: .92;",
    "box-sizing": "box-sizing: border-box;",
    "padding": "padding: 1.25rem;",
    "margin": "margin: 0 auto;",
    "max-width": "max-width: 72rem;",
    "line-height": "line-height: 1.7;",
    "font-size": "font-size: clamp(1rem, .8rem + 1vw, 1.25rem);",
    "overflow-wrap": "overflow-wrap: anywhere;",
    "border-radius": "border-radius: 1.25rem;",
    "display: flex": "display: flex;",
    "gap": "gap: 1rem;",
    "align-items": "align-items: center;",
    "justify-content": "justify-content: space-between;",
    "flex-wrap": "flex-wrap: wrap;",
    "flex-direction": "flex-direction: column;",
    "order": "order: 2;",
    "min-width": "min-width: 0;",
    "display: grid": "display: grid;",
    "grid-template-columns": "grid-template-columns: repeat(3, minmax(0, 1fr));",
    "repeat": "grid-template-columns: repeat(3, minmax(0, 1fr));",
    "minmax": "grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));",
    "grid-auto-flow": "grid-auto-flow: dense;",
    "place-items": "place-items: center;",
    "align-content": "align-content: start;",
    "width": "width: min(100% - 2rem, 72rem);",
    "@media": "@media marker;",
    "clamp(": "font-size: clamp(1rem, .8rem + 1vw, 1.25rem);",
    "container-type": "container-type: inline-size;",
    "@container": "@container marker;",
    "auto-fit": "grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));",
    ":focus-visible": "&:focus-visible { outline: 3px solid #5546f6; }",
    "outline-offset": "outline-offset: .25rem;",
    ":hover": "&:hover { transform: translateY(-2px); }",
    ":disabled": "&:disabled { opacity: .5; }",
    "cursor": "cursor: pointer;",
    "contrast-color": "contrast-color: #10172a;",
    "forced-color-adjust": "forced-color-adjust: auto;",
    "transition": "transition: transform .2s ease;",
    "transform": "transform: translateY(-2px);",
    "prefers-reduced-motion": "@media (prefers-reduced-motion: reduce) { transition: none; }",
    "animation": "animation: pulse .8s ease;",
    "transform-origin": "transform-origin: center;",
    "will-change": "will-change: transform;",
    "transition: none": "transition: none;",
    "--space": "--space: clamp(1rem, 2vw, 2rem);",
    "object-fit": "object-fit: cover;"
  };
  return map[check] || `${check}: initial;`;
}

function vocab(check, selector, english = false) {
  if (english) return [[check, "CSS property or pattern used in this step."], [selector, "Target selector limiting side effects."], ["responsive", "Ability to remain usable across screen and content constraints."]];
  return [[check, "Propriété ou motif CSS valide dans cette étape."], [selector, "Sélecteur cible pour limiter les effets de bord."], ["responsive", "Capacité à rester utilisable selon les contraintes d'écran et de contenu."]];
}

function previewHtml() {
  return T(
    `<main class="demo-surface"><nav class="toolbar"><button class="action">Commencer</button><button class="action">Relire</button></nav><section class="panel"><article class="card course-card">Contenu responsive long pour PulsaTeach</article><article class="card"><img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />Carte</article></section><div class="gallery"><span>1</span><span>2</span><span>3</span></div></main>`,
    `<main class="demo-surface"><nav class="toolbar"><button class="action">Start</button><button class="action">Review</button></nav><section class="panel"><article class="card course-card">Long responsive content for PulsaTeach</article><article class="card"><img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />Card</article></section><div class="gallery"><span>1</span><span>2</span><span>3</span></div></main>`
  );
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "step";
}

const conceptCopy = {
  "color": copy("Choisir une couleur de texte lisible", "Règle la couleur du texte pour hiérarchiser l'information tout en conservant un contraste confortable.", "Choose a readable text color", "Set the text color to establish hierarchy while preserving comfortable contrast."),
  "background": copy("Distinguer la carte par son fond", "Crée une surface qui sépare clairement la carte de la page sans concurrencer son contenu.", "Separate the card with its background", "Create a surface that clearly separates the card from the page without competing with its content."),
  "border-color": copy("Donner une limite cohérente", "Accorde la bordure à la palette afin de délimiter le composant sans produire un contour agressif.", "Give the component a coherent edge", "Match the border to the palette so the component is defined without a harsh outline."),
  "font-weight": copy("Faire ressortir l'information clé", "Renforce seulement les mots qui structurent la lecture et évite de mettre tout le contenu au même niveau.", "Emphasize the key information", "Strengthen only the words that guide reading instead of giving all content equal emphasis."),
  "text-decoration": copy("Rendre le lien reconnaissable", "Utilise une décoration persistante pour que le lien ne dépende pas uniquement de sa couleur.", "Make the link recognizable", "Use a persistent decoration so the link does not rely on color alone."),
  "outline": copy("Dessiner un focus visible", "Ajoute un contour suffisamment épais et contrasté pour suivre la navigation au clavier.", "Draw a visible focus indicator", "Add a sufficiently thick, contrasting outline so keyboard navigation is easy to follow."),
  "box-shadow": copy("Créer de la profondeur avec mesure", "Suggère l'élévation de la carte avec une ombre douce dont la présence reste secondaire.", "Create restrained depth", "Suggest card elevation with a soft shadow that remains visually secondary."),
  "opacity": copy("Atténuer sans rendre illisible", "Réduis l'intensité visuelle avec prudence, car l'opacité affecte aussi le texte et son contraste.", "De-emphasize without losing readability", "Reduce visual intensity carefully because opacity also affects text and its contrast."),
  "box-sizing": copy("Inclure bordure et padding dans la taille", "Adopte border-box pour que la largeur annoncée reste stable quand les espaces internes s'ajoutent.", "Include border and padding in sizing", "Use border-box so the declared width stays stable when internal spacing is added."),
  "padding": copy("Créer un espace intérieur respirant", "Éloigne le contenu des bords de la carte sans modifier la distance entre les composants voisins.", "Create breathing room inside", "Move content away from the card edges without changing the distance between neighboring components."),
  "margin": copy("Centrer le bloc dans son parent", "Combine des marges automatiques avec une largeur contrainte pour équilibrer l'espace disponible.", "Center the block in its parent", "Combine automatic margins with a constrained width to balance the available space."),
  "max-width": copy("Limiter la longueur de lecture", "Pose une largeur maximale afin que les lignes restent confortables sur les écrans très larges.", "Limit the reading measure", "Set a maximum width so lines remain comfortable on very wide screens."),
  "line-height": copy("Aérer les lignes de texte", "Ajuste l'interligne pour faciliter le passage d'une ligne à la suivante dans un paragraphe dense.", "Give text lines room", "Adjust line spacing to make moving from one line to the next easier in dense paragraphs."),
  "font-size": copy("Construire une taille de texte fluide", "Fais évoluer le corps du texte entre des bornes lisibles plutôt que par sauts brusques.", "Build a fluid text size", "Let body text grow between readable bounds instead of changing in abrupt jumps."),
  "overflow-wrap": copy("Autoriser la coupure des mots longs", "Protège la carte contre les URL et identifiants qui dépassent en leur donnant un point de rupture de secours.", "Allow long words to break", "Protect the card from overflowing URLs and identifiers by providing an emergency break point."),
  "border-radius": copy("Adoucir la silhouette de la carte", "Choisis un rayon cohérent avec la taille du composant et avec le langage visuel général.", "Soften the card silhouette", "Choose a radius that fits the component size and the broader visual language."),
  "display: flex": copy("Ouvrir un axe de mise en page", "Transforme la barre en conteneur flexible pour piloter l'alignement et la distribution de ses enfants.", "Establish a layout axis", "Turn the toolbar into a flex container to control child alignment and distribution."),
  "gap": copy("Espacer les éléments sans marges parasites", "Définis l'intervalle au niveau du conteneur afin de garder un rythme régulier, même après un retour à la ligne.", "Space items without stray margins", "Define spacing on the container to preserve a regular rhythm even after items wrap."),
  "align-items": copy("Aligner les éléments sur l'axe transversal", "Centre verticalement des contrôles de hauteurs différentes sans déplacer individuellement chaque enfant.", "Align items on the cross axis", "Vertically align controls of different heights without moving each child individually."),
  "justify-content": copy("Distribuer l'espace principal", "Répartis les groupes de la barre sur l'axe horizontal tout en gardant leurs bords prévisibles.", "Distribute space on the main axis", "Spread toolbar groups along the horizontal axis while keeping their edges predictable."),
  "flex-wrap": copy("Permettre un retour à la ligne sûr", "Laisse les actions former une nouvelle rangée lorsque leur largeur totale dépasse celle du conteneur.", "Allow safe line wrapping", "Let actions form another row when their combined width exceeds the container."),
  "flex-direction": copy("Basculer l'axe pour les petits écrans", "Empile les contrôles quand la largeur manque, puis réserve la disposition horizontale aux espaces suffisants.", "Switch the axis on small screens", "Stack controls when width is scarce and reserve the horizontal arrangement for sufficient space."),
  "order": copy("Réordonner sans perdre le sens", "Déplace visuellement une action secondaire en gardant à l'esprit que l'ordre clavier suit toujours le document.", "Reorder without losing meaning", "Move a secondary action visually while remembering that keyboard order still follows the document."),
  "min-width": copy("Autoriser les enfants flex à rétrécir", "Supprime la largeur minimale implicite qui empêche un libellé long de céder de la place.", "Let flex children shrink", "Remove the implicit minimum width that prevents a long label from yielding space."),
  "display: grid": copy("Créer une grille bidimensionnelle", "Active Grid pour coordonner lignes et colonnes plutôt que d'aligner les cartes une par une.", "Create a two-dimensional grid", "Enable Grid to coordinate rows and columns instead of positioning cards one by one."),
  "grid-template-columns": copy("Définir la structure des colonnes", "Décris explicitement la largeur et le nombre de pistes qui organisent la galerie.", "Define the column structure", "Explicitly describe the width and number of tracks that organize the gallery."),
  "repeat": copy("Répéter un motif de pistes", "Condense une série de colonnes identiques avec repeat pour rendre l'intention plus facile à relire.", "Repeat a track pattern", "Condense a series of identical columns with repeat so the layout intent is easier to read."),
  "minmax": copy("Donner des bornes aux cartes", "Autorise chaque colonne à grandir tout en protégeant une largeur minimale exploitable pour son contenu.", "Give cards flexible bounds", "Allow each column to grow while protecting a usable minimum width for its content."),
  "grid-auto-flow": copy("Placer automatiquement les nouvelles cartes", "Choisis comment Grid remplit les emplacements lorsque le nombre ou la taille des éléments varie.", "Place new cards automatically", "Choose how Grid fills available cells when the number or size of items changes."),
  "place-items": copy("Centrer dans les deux axes", "Aligne le contenu de chaque cellule horizontalement et verticalement avec une seule intention déclarative.", "Center on both axes", "Align each cell's content horizontally and vertically with one declarative intent."),
  "align-content": copy("Ancrer l'ensemble des rangées", "Place le groupe de pistes au début lorsque la grille est moins haute que son conteneur.", "Anchor the set of rows", "Place the track group at the start when the grid is shorter than its container."),
  "width": copy("Construire une largeur avec gouttières", "Combine la largeur disponible et une limite de lecture pour conserver des marges sur mobile comme sur desktop.", "Build a width with gutters", "Combine available width and a reading limit to preserve gutters on mobile and desktop."),
  "@media": copy("Introduire un breakpoint justifié", "Ajoute une media query au moment où le contenu réclame réellement une autre composition.", "Introduce an evidence-based breakpoint", "Add a media query where the content genuinely needs a different composition."),
  "clamp(": copy("Encadrer une valeur fluide", "Relie minimum, progression liée au viewport et maximum pour éviter des tailles extrêmes.", "Bound a fluid value", "Combine a minimum, viewport-driven growth, and a maximum to avoid extreme sizes."),
  "container-type": copy("Déclarer un contexte de conteneur", "Permets à la carte de répondre à l'espace de son parent plutôt qu'à la fenêtre entière.", "Declare a container context", "Let the card respond to its parent's space instead of the entire viewport."),
  "@container": copy("Adapter le composant à son emplacement", "Change la composition quand le conteneur offre assez de place, même dans une page étroite.", "Adapt the component to its slot", "Change composition when the container offers enough room, even inside a narrow page."),
  "auto-fit": copy("Remplir la ligne avec des colonnes utiles", "Laisse Grid calculer combien de cartes tiennent sans créer de pistes vides inutiles.", "Fill the row with useful columns", "Let Grid calculate how many cards fit without leaving unnecessary empty tracks."),
  ":focus-visible": copy("Afficher le focus au bon moment", "Réserve l'indicateur renforcé aux interactions clavier sans retirer le signal d'accessibilité.", "Show focus at the right time", "Reserve the strong indicator for keyboard interaction without removing the accessibility cue."),
  "outline-offset": copy("Détacher le focus du contrôle", "Éloigne le contour pour qu'il reste visible contre la bordure et ne masque pas le libellé.", "Separate focus from the control", "Move the outline away so it remains visible beside the border and does not cover the label."),
  ":hover": copy("Signaler le survol sans déplacer le layout", "Fournis un retour discret au pointeur avec une transformation qui ne recompose pas les éléments voisins.", "Signal hover without shifting layout", "Give pointer users subtle feedback with a transform that does not reflow neighboring items."),
  ":disabled": copy("Rendre une action indisponible explicite", "Différencie le contrôle désactivé tout en gardant son texte lisible et son état compréhensible.", "Make an unavailable action explicit", "Differentiate the disabled control while keeping its text readable and its state understandable."),
  "cursor": copy("Confirmer la zone interactive", "Utilise le pointeur pour renforcer l'affordance d'une action, sans en faire l'unique indice.", "Confirm the interactive target", "Use the pointer cursor to reinforce an action's affordance without making it the only cue."),
  "contrast-color": copy("Centraliser une couleur contrastée", "Nomme la couleur de premier plan qui restera lisible sur les surfaces principales du thème.", "Centralize a contrasting color", "Name the foreground color that will remain readable on the theme's primary surfaces."),
  "forced-color-adjust": copy("Respecter les couleurs forcées", "Laisse le système adapter le contrôle dans les modes à contraste élevé au lieu de bloquer sa palette.", "Respect forced colors", "Allow the system to adapt the control in high-contrast modes instead of locking its palette."),
  "transition": copy("Relier deux états dans le temps", "Anime seulement la propriété utile avec une durée courte qui clarifie le changement d'état.", "Connect two states over time", "Animate only the useful property with a short duration that clarifies the state change."),
  "transform": copy("Déplacer visuellement sans recomposer", "Utilise une transformation légère pour donner du relief sans modifier la place réservée au composant.", "Move visually without reflow", "Use a light transform to add depth without changing the space reserved for the component."),
  "prefers-reduced-motion": copy("Écouter la préférence de mouvement", "Détecte la demande système afin de supprimer les animations non essentielles susceptibles de gêner.", "Honor the motion preference", "Detect the system request and remove nonessential animation that may cause discomfort."),
  "animation": copy("Définir un mouvement intentionnel", "Réserve l'animation à un changement utile, avec un début, une durée et une fin compréhensibles.", "Define intentional motion", "Reserve animation for a useful change with a clear beginning, duration, and end."),
  "transform-origin": copy("Choisir le point d'ancrage du mouvement", "Place l'origine de la transformation là où le geste visuel semble naturellement commencer.", "Choose the motion anchor", "Place the transform origin where the visual gesture appears to begin naturally."),
  "will-change": copy("Préparer une transformation avec parcimonie", "Annonce une propriété coûteuse seulement juste avant son animation et évite de promouvoir tous les éléments.", "Prepare a transform sparingly", "Declare an expensive changing property only near its animation instead of promoting every element."),
  "transition: none": copy("Couper les transitions optionnelles", "Dans le mode réduit, retire la transition tout en conservant un changement d'état immédiatement perceptible.", "Disable optional transitions", "In reduced-motion mode, remove the transition while keeping the state change immediately perceptible."),
  "--space": copy("Créer une échelle d'espace fluide", "Stocke un espacement borné dans une variable pour donner le même rythme adaptable à toute la composition.", "Create a fluid spacing scale", "Store bounded spacing in a variable to give the whole composition one adaptable rhythm."),
  "object-fit": copy("Recadrer l'image sans la déformer", "Remplis le cadre avec une image proportionnelle, en acceptant un recadrage contrôlé plutôt qu'un étirement.", "Crop the image without distortion", "Fill the frame with a proportional image, accepting controlled cropping instead of stretching.")
};

function copy(frTitle, frBrief, enTitle, enBrief) {
  return { fr: { title: frTitle, brief: frBrief }, en: { title: enTitle, brief: enBrief } };
}
