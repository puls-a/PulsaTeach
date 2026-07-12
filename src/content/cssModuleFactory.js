import { cssModuleProfile } from "./cssModuleProfiles.js";

export function createCssModuleGroup(entries, startIndex = 0, projectModuleIds = []) {
  const projectModules = new Set(projectModuleIds);
  return entries.map(([id, title, selector, checks], offset) => {
    const moduleIndex = startIndex + offset;
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
    starterCode: `${selector} {\n  /* ajoute ${check} */\n}`,
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
    fr: { introduction: `${profile.scene[0]} ${title.fr} traite une partie précise du problème : ${profile.risk[0]}.`, sections: sections(title.fr, brief.fr, solution, check, selector, profile), vocabulary: vocab(check, selector, profile), check: [`Je sais appliquer ${check}.`, `Je prouve que ${profile.proof[0]}.`, "Je peux expliquer le choix."] },
    en: { introduction: `${profile.scene[1]} ${title.en} handles a specific part of the problem: ${profile.risk[1]}.`, sections: sections(title.en, brief.en, solution, check, selector, profile, true), vocabulary: vocab(check, selector, profile, true), check: [`I can apply ${check}.`, `I prove that ${profile.proof[1]}.`, "I can explain the choice."] }
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
  const fallbackSolution = solution || ".demo {\n  /* réponse attendue */\n}";

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
      next: type === "quiz" ? "Continue avec le module suivant en gardant cette logique de preuve." : "Passe à l'étape suivante et reutilise la même méthode de validation."
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
      next: type === "quiz" ? "Continue with the next module while keeping this proof-based habit." : "Move to the next step and reuse the same validation method."
    })
  };
}

function createPedagogyLocale({ title, brief, course = {}, guide = {}, solution, goodTitle, badTitle, goodExplanation, badExplanation, autonomousPrefix, next }) {
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
      `Commence par cet objectif : ${objectives[0]}`,
      "Si un test echoue, lis la propriété ou le sélecteur cite dans son message.",
      "Évite les grands blocs : une declaration juste vaut mieux qu'une cascade confuse."
    ],
    correction: [
      "La solution cible le composant demandé.",
      "La declaration ajoute une intention CSS observable.",
      "Les tests confirment la propriété, la valeur et la stabilite du rendu."
    ],
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

function vocab(check, selector) {
  return [[check, "Propriété ou motif CSS valide dans cette étape."], [selector, "Sélecteur cible pour limiter les effets de bord."], ["responsive", "Capacite à rester utilisable selon les contraintes d'écran et contenu."]];
}

function previewHtml() {
  return `<main class="demo-surface"><nav class="toolbar"><button class="action">Start</button><button class="action">Review</button></nav><section class="panel"><article class="card course-card">Long responsive content for PulsaTeach</article><article class="card"><img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />Card</article></section><div class="gallery"><span>1</span><span>2</span><span>3</span></div></main>`;
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
