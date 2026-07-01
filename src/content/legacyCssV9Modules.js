import { getPedagogy } from "./legacyPedagogy.js";

const modules = [
  ["css-v9-selectors-colors", ["Sélecteurs, cascade et couleurs", "Selectors, cascade, and colors"], ".course-card", ["color", "background", "border-color", "font-weight", "text-decoration", "outline", "box-shadow", "opacity"]],
  ["css-v9-box-type", ["Box model et typographie", "Box model and typography"], ".card", ["box-sizing", "padding", "margin", "max-width", "line-height", "font-size", "overflow-wrap", "border-radius"]],
  ["css-v9-flex-layout", ["Flexbox professionnel", "Professional Flexbox"], ".toolbar", ["display: flex", "gap", "align-items", "justify-content", "flex-wrap", "flex-direction", "order", "min-width"]],
  ["css-v9-grid-layout", ["Grid et compositions", "Grid and compositions"], ".gallery", ["display: grid", "grid-template-columns", "repeat", "minmax", "gap", "grid-auto-flow", "place-items", "align-content"]],
  ["css-v9-responsive", ["Responsive mobile-first", "Mobile-first responsive"], ".panel", ["width", "max-width", "@media", "min-width", "clamp(", "container-type", "@container", "auto-fit"]],
  ["css-v9-a11y-states", ["États accessibles", "Accessible states"], ".action", [":focus-visible", "outline", "outline-offset", ":hover", ":disabled", "cursor", "contrast-color", "forced-color-adjust"]],
  ["css-v9-motion", ["Motion responsable", "Responsible motion"], ".card", ["transition", "transform", ":hover", "prefers-reduced-motion", "animation", "transform-origin", "will-change", "transition: none"]],
  ["css-v9-capstone", ["Capstone responsive", "Responsive capstone"], ".landing", ["--space", "clamp(", "display: grid", "auto-fit", "object-fit", "@container", "@media", "overflow-wrap"]]
];

const projectModules = new Set(["css-v9-flex-layout", "css-v9-grid-layout", "css-v9-responsive", "css-v9-motion", "css-v9-capstone", "css-v9-a11y-states"]);

export const cssV9Modules = modules.map(([id, title, selector, checks], moduleIndex) => {
  const lessons = checks.map((check, index) => lessonFor(id, title, selector, check, index + 1));
  lessons.push(quizFor(id, title, moduleIndex));
  if (projectModules.has(id)) lessons.push(projectFor(id, title, selector, checks, moduleIndex));
  return {
    id,
    title: { fr: title[0], en: title[1] },
    description: { fr: `Atelier progressif ${title[0]} inspiré des meilleurs formats RWD.`, en: `Progressive ${title[1]} workshop inspired by strong RWD formats.` },
    deliverable: { fr: `Un composant ${title[0]} vérifié`, en: `A verified ${title[1]} component` },
    importance: { fr: `${title[0]} rend une interface plus robuste, lisible et adaptable.`, en: `${title[1]} makes an interface more robust, readable, and adaptable.` },
    prerequisites: { fr: moduleIndex ? ["Avoir terminé les modules CSS précédents", "Savoir lire un sélecteur"] : ["Connaître HTML de base", "Savoir lancer les tests"], en: moduleIndex ? ["Complete previous CSS modules", "Know how to read a selector"] : ["Know basic HTML", "Know how to run tests"] },
    outcomes: { fr: ["Écrire une règle courte", "Relier propriété et effet", "Valider sans deviner"], en: ["Write a short rule", "Connect property and effect", "Validate without guessing"] },
    vocabulary: checks.map((item) => item.replace(/[():.-]/g, " ").trim()).slice(0, 6),
    mastery: { fr: ["Le composant ne déborde pas", "Les états restent visibles", "Les choix sont justifiés"], en: ["The component does not overflow", "States remain visible", "Choices are justified"] },
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
});

function lessonFor(moduleId, moduleTitle, selector, check, step) {
  const id = `${moduleId}-${slug(check)}`;
  const title = { fr: `${step}. ${labelFr(check)}`, en: `${step}. ${labelEn(check)}` };
  const brief = { fr: `Ajoute ${check} à ${selector} et vérifie l’effet attendu.`, en: `Add ${check} to ${selector} and verify the expected effect.` };
  const solution = cssFor(selector, check);
  const course = courseFor(title, brief, solution, check, selector, moduleTitle, step);
  const guide = guideFor(title, moduleTitle, step);
  return {
    id,
    type: "css",
    title,
    brief,
    theory: { fr: brief.fr, en: brief.en },
    course,
    pedagogy: getPedagogy(id, { course, guide, title, brief, solution, type: "css" }),
    guide,
    skills: [moduleId, check],
    difficulty: step <= 3 ? "easy" : step <= 6 ? "medium" : "hard",
    durationMin: 18,
    starterCode: `${selector} {\n  /* ajoute ${check} */\n}`,
    solution,
    previewHtml: previewHtml(),
    tests: testsFor(selector, check, solution),
    hint: { fr: `Écris une règle courte pour ${selector}.`, en: `Write a short rule for ${selector}.` },
    xp: 24 + step
  };
}

function quizFor(moduleId, title, index) {
  const id = `${moduleId}-quiz`;
  const brief = { fr: "Valide les réflexes responsive et CSS du module.", en: "Validate responsive and CSS habits from the module." };
  const explanation = { fr: "Un bon choix CSS répond au contenu, au support et à l’accessibilité.", en: "A good CSS choice responds to content, device, and accessibility." };
  const choices = [
    { id: "proof", label: { fr: "Écrire une règle courte puis vérifier le rendu et les tests", en: "Write a short rule, then verify preview and tests" } },
    { id: "random", label: { fr: "Essayer des valeurs au hasard", en: "Try random values" } },
    { id: "desktop", label: { fr: "Ne regarder que le desktop", en: "Check desktop only" } }
  ];
  const prompt = { fr: `Quel réflexe rend ${title[0]} fiable ?`, en: `Which habit makes ${title[1]} reliable?` };
  const course = courseFor({ fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, brief, "", "proof", ".demo", title, index + 1);
  const guide = guideFor({ fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, title, index + 1);
  return {
    id,
    type: "quiz",
    title: { fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` },
    brief,
    course,
    pedagogy: getPedagogy(id, { course, guide, title: { fr: `Quiz ${title[0]}`, en: `${title[1]} quiz` }, brief, type: "quiz" }),
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
      { id: `${id}-multiple`, type: "multiple", prompt: { fr: "Quelles vérifications sont utiles ?", en: "Which checks are useful?" }, choices: [{ id: "mobile", label: { fr: "Mobile", en: "Mobile" } }, { id: "keyboard", label: { fr: "Clavier/focus", en: "Keyboard/focus" } }, { id: "guess", label: { fr: "Hasard", en: "Guessing" } }], answer: ["mobile", "keyboard"], explanation },
      { id: `${id}-tf`, type: "true-false", prompt: { fr: "Vrai ou faux : une règle responsive doit être vérifiée avec du contenu réel.", en: "True or false: a responsive rule should be checked with real content." }, answer: "true", explanation },
      { id: `${id}-open`, type: "short-open", prompt: { fr: "Cite une preuve qu’un layout tient sur mobile.", en: "Name one proof that a layout holds on mobile." }, answer: ["mobile", "débordement"], keywords: ["mobile"], explanation }
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

function projectFor(moduleId, title, selector, checks, index) {
  const id = `${moduleId}-lab`;
  const picked = checks.slice(0, 5);
  const solution = `${selector} {\n  ${picked.map((check) => declaration(check)).join("\n  ")}\n}`;
  const brief = { fr: `Assemble un lab ${title[0]} avec plusieurs contraintes CSS.`, en: `Assemble a ${title[1]} lab with several CSS constraints.` };
  const course = courseFor({ fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, brief, solution, picked[0], selector, title, index + 1);
  const guide = guideFor({ fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, title, index + 1);
  return {
    id,
    type: "project",
    title: { fr: `Lab ${title[0]}`, en: `${title[1]} lab` },
    brief,
    course,
    pedagogy: getPedagogy(id, { course, guide, title: { fr: `Lab ${title[0]}`, en: `${title[1]} lab` }, brief, solution, type: "project" }),
    theory: brief,
    guide,
    skills: [moduleId, "lab"],
    difficulty: "project",
    durationMin: 95,
    starterCode: `${selector} {\n}\n`,
    solution,
    previewHtml: previewHtml(),
    tests: picked.map((check) => ({ type: "contains", label: `Le lab contient ${check}`, value: check })),
    rubric: { fr: ["Règles lisibles", "Responsive vérifiable", "États accessibles", "Pas de débordement"], en: ["Readable rules", "Verifiable responsive", "Accessible states", "No overflow"] },
    hint: { fr: "Commence par la contrainte qui protège le layout.", en: "Start with the constraint that protects layout." },
    xp: 90
  };
}

function courseFor(title, brief, solution, check, selector, moduleTitle) {
  return {
    fr: { introduction: `${title.fr} ajoute une preuve CSS courte au module ${moduleTitle[0]}.`, sections: sections(title.fr, brief.fr, solution, check, selector), vocabulary: vocab(check, selector), check: [`Je sais appliquer ${check}.`, "Je vérifie le rendu mobile.", "Je peux expliquer le choix."] },
    en: { introduction: `${title.en} adds a short CSS proof to ${moduleTitle[1]}.`, sections: sections(title.en, brief.en, solution, check, selector), vocabulary: vocab(check, selector), check: [`I can apply ${check}.`, "I verify mobile output.", "I can explain the choice."] }
  };
}

function sections(title, brief, solution, check, selector) {
  return [
    { title: "Intention", paragraphs: [brief, `${check} doit répondre à une contrainte visible, pas décorer au hasard.`], example: solution.slice(0, 220) },
    { title: "Méthode", paragraphs: [`Cible ${selector}, écris une règle minimale, puis observe le composant.`, "Un bon test CSS prouve la présence d’une décision maintenable."], example: `${selector} { ${check}: ... }` },
    { title: "Validation", paragraphs: [`${title} est terminé quand le test passe et que le layout reste lisible.`, "Relis aussi le focus, les textes longs et le petit écran."], example: check }
  ];
}

function guideFor(title, moduleTitle, step) {
  return { fr: { objectives: [`Implémenter ${title.fr}.`, `Relier l’étape ${step} au module ${moduleTitle[0]}.`, "Valider avec rendu et tests."], prerequisites: ["Lire le sélecteur", "Comprendre la propriété ciblée", "Savoir lancer les tests"], steps: ["Identifier le composant", "Ajouter la règle minimale", "Tester mobile et desktop"], mistakes: [`Sur-styliser ${title.fr}.`, "Masquer le focus.", "Corriger sans regarder le rendu."] }, en: { objectives: [`Implement ${title.en}.`, `Connect step ${step} to ${moduleTitle[1]}.`, "Validate with preview and tests."], prerequisites: ["Read the selector", "Understand the target property", "Know how to run tests"], steps: ["Identify the component", "Add the smallest rule", "Test mobile and desktop"], mistakes: [`Over-styling ${title.en}.`, "Hiding focus.", "Fixing without checking preview."] } };
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
    { type: "contains", label: `Cible le bon sélecteur ${selector}`, value: selector },
    { type: "contains", label: `Utilise le motif CSS ${check}`, value: check },
    { type: "contains", label: `Déclare la propriété ${property}`, value: property },
    { type: "contains", label: `Ajoute une valeur vérifiable pour ${check}`, value: proof },
    { type: "contains", label: "Garde le composant testable dans le rendu", value: responsiveGuard },
    { type: "contains", label: "La solution reste courte et orientée composant", value: stableTokenFor(solution, selector, check) }
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

function vocab(check, selector) {
  return [[check, "Propriété ou motif CSS validé dans cette étape."], [selector, "Sélecteur ciblé pour limiter les effets de bord."], ["responsive", "Capacité à rester utilisable selon les contraintes d’écran et contenu."]];
}

function previewHtml() {
  return `<main class="demo-surface"><nav class="toolbar"><button class="action">Start</button><button class="action">Review</button></nav><section class="panel"><article class="card course-card">Long responsive content for PulsaTeach</article><article class="card"><img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />Card</article></section><div class="gallery"><span>1</span><span>2</span><span>3</span></div></main>`;
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "step";
}

function labelFr(check) {
  return `Appliquer ${check}`;
}

function labelEn(check) {
  return `Apply ${check}`;
}
