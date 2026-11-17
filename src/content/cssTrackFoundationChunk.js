import { module, quizLesson, projectLesson, cssLesson, test } from "./trackBuilders.js";
import { cssModulesFoundation } from "./cssModulesFoundation.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const T = (fr, en) => ({ fr, en });
const cssIntroPreview = T(
  `<main class="demo-surface"><p class="stylesheet-status">Feuille CSS chargée</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf CSS</p><h1>Donner une forme lisible à une page HTML</h1><p class="lead">CSS gère couleurs, espaces, tailles, mise en page, états et adaptation aux écrans.</p><a class="action" href="#tickets">Voir les ateliers</a></section><section id="tickets"><h2>Ateliers</h2><p>Structure HTML et formulaires accessibles.</p></section></main>`,
  `<main class="demo-surface"><p class="stylesheet-status">CSS file loaded</p><section class="hero-card course-card"><p class="eyebrow">PulsaConf CSS</p><h1>Give an HTML page a readable visual form</h1><p class="lead">CSS controls colors, spacing, sizing, layout, states, and adaptation across screens.</p><a class="action" href="#tickets">View workshops</a></section><section id="tickets"><h2>Workshops</h2><p>HTML structure and accessible forms.</p></section></main>`
);

function introCssLesson({ id, title, brief, starterCode, solution, tests, hint, example, xp = 28 }) {
  const base = cssLesson(id, title, brief.fr, starterCode, ".course-card", ["color"], xp);
  const course = introCourse(title, brief, example);
  const guide = introGuide(title);
  return {
    ...base,
    brief,
    theory: brief,
    course,
    guide,
    pedagogy: introPedagogy(title, brief, course, guide, example, hint),
    previewHtml: cssIntroPreview,
    starterCode,
    solution,
    tests,
    hint
  };
}

function introCourse(title, brief, example) {
  return {
    fr: {
      introduction: `Dans ${title[0]}, tu installes une méthode CSS humaine avant de chercher un effet visuel spectaculaire : intention, sélecteur, declaration et preuve dans le navigateur.`,
      sections: [
        { title: "Pourquoi cette étape existe", paragraphs: [brief.fr, "CSS devient fiable quand chaque règle répond à un problème visible : lisibilité, espace, contraste, mise en page ou état interactif."], example },
        { title: "Méthode de travail", paragraphs: ["Commence par nommer l'intention, cible le plus petit composant utile, puis ajoute une declaration courte.", "Observe ensuite le rendu dans le navigateur et l'onglet Styles des DevTools avant d'ajouter une autre règle."], example: ".course-card {\n  property: value;\n}" },
        { title: "Piege frequent", paragraphs: ["Changer des valeurs au hasard peut donner un joli résultat une fois, mais ne prouve ni contraste, ni responsive, ni focus.", "Une correction CSS doit rester explicable quand le contenu devient plus long ou quand l'écran change."], example: ".card {\n  color: red;\n}" }
      ],
      vocabulary: [["sélecteur", "Partie de la règle qui choisit les éléments styles."], ["declaration", "Couple propriété/valeur qui produit un effet."], ["cascade", "Mecanisme qui decide quelle règle s'applique."], ["DevTools", "Outils du navigateur pour inspecter les styles actifs."]],
      check: ["Je peux expliquer l'intention de la règle.", "Je vérifie le rendu dans le navigateur.", "Je garde le focus et le responsive visibles."]
    },
    en: {
      introduction: `In ${title[1]}, you establish a human CSS method before chasing a spectacular visual effect: intent, selector, declaration, and browser evidence.`,
      sections: [
        { title: "Why this step exists", paragraphs: [brief.en, "CSS becomes reliable when every rule answers a visible problem: readability, spacing, contrast, layout, or interactive state."], example },
        { title: "Workflow", paragraphs: ["Start by naming the intent, target the smallest useful component, then add a short declaration.", "Then inspect the output in the browser and DevTools Styles before adding another rule."], example: ".course-card {\n  property: value;\n}" },
        { title: "Common trap", paragraphs: ["Changing random values can look good once, but proves neither contrast, responsive behavior, nor focus.", "A CSS fix must remain explainable when content gets longer or the screen changes."], example: ".card {\n  color: red;\n}" }
      ],
      vocabulary: [["selector", "Part of the rule that chooses styled elements."], ["declaration", "Property/value pair that creates an effect."], ["cascade", "Mechanism deciding which rule applies."], ["DevTools", "Browser tools for inspecting active styles."]],
      check: ["I can explain the rule intent.", "I verify the output in the browser.", "I keep focus and responsive behavior visible."]
    }
  };
}

function introGuide(title) {
  return {
    fr: {
      objectives: [`Comprendre ${title[0]} dans une vraie boucle CSS.`, "Ecrire une règle courte et lisible.", "Verifier rendu, responsive et focus avant de continuer."],
      prerequisites: ["Avoir termine l'introduction HTML.", "Savoir ouvrir la preview.", "Savoir lire un test comme une exigence."],
      steps: ["Nommer l'intention visuelle.", "Cibler le composant le plus précis utile.", "Ajouter une declaration puis inspecter le résultat."],
      mistakes: [`Styliser ${title[0]} au hasard sans intention.`, `Corriger ${title[0]} uniquement pour desktop.`, `Masquer le focus clavier pendant ${title[0]}.`]
    },
    en: {
      objectives: [`Understand ${title[1]} in a real CSS loop.`, "Write a short readable rule.", "Verify output, responsive behavior, and focus before moving on."],
      prerequisites: ["Complete the HTML introduction.", "Know how to open the preview.", "Know how to read a test as a requirement."],
      steps: ["Name the visual intent.", "Target the smallest useful specific component.", "Add one declaration, then inspect the result."],
      mistakes: [`Styling ${title[1]} randomly without intent.`, `Fixing ${title[1]} only for desktop.`, `Hiding keyboard focus during ${title[1]}.`]
    }
  };
}

function introPedagogy(title, brief, course, guide, example, hint) {
  return {
    fr: { why: course.fr.introduction, objectives: guide.fr.objectives, prerequisites: guide.fr.prerequisites, vocabulary: course.fr.vocabulary, comparison: { good: { title: "Règle courte et prouvable", code: example, explanation: "L'exemple cible un autre composant et montre la relation sélecteur-déclaration sans révéler la correction." }, bad: { title: "Règle au hasard", code: ".card { color: red; }", explanation: "La valeur ne prouve ni intention, ni contraste, ni robustesse." } }, guided: guide.fr.steps, autonomous: `Refais ${title[0]} sans la solution et cite la preuve DevTools.`, hints: [hint.fr, "Relis la cible et la valeur attendues.", "Observe la preview avant de continuer."], correction: ["Le sélecteur est présent.", "La déclaration répond à l'intention.", "Le rendu reste vérifiable."], summary: brief.fr, next: "Continue avec la même boucle : intention, règle courte, preuve." },
    en: { why: course.en.introduction, objectives: guide.en.objectives, prerequisites: guide.en.prerequisites, vocabulary: course.en.vocabulary, comparison: { good: { title: "Short provable rule", code: example, explanation: "The example targets a different component and demonstrates the selector-declaration relationship without revealing the correction." }, bad: { title: "Random rule", code: ".card { color: red; }", explanation: "The value proves neither intent, contrast, nor robustness." } }, guided: guide.en.steps, autonomous: `Repeat ${title[1]} without the solution and cite DevTools evidence.`, hints: [hint.en, "Review the expected target and value.", "Inspect the preview before moving on."], correction: ["The selector is present.", "The declaration matches the intent.", "The output remains verifiable."], summary: brief.en, next: "Continue with the same loop: intent, short rule, evidence." }
  };
}

const cssIntroStages = {
  role: `.course-card {
  color: #1f2937;
  background: #ffffff;
}`,
  file: `.course-card {
  color: #1f2937;
  background: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
}`,
  linked: `.course-card {
  color: #1f2937;
  background: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
}

.stylesheet-status {
  color: #166534;
  font-weight: 700;
}`,
  inspected: `.course-card {
  color: #1f2937;
  background: #ffffff;
  padding: 1rem;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
}

.stylesheet-status {
  color: #166534;
  font-weight: 700;
}

.hero-card.course-card {
  border-color: #4f46e5;
}`,
  cascade: `.course-card {
  color: #374151;
  background: #ffffff;
  padding: 1rem;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
}

.stylesheet-status {
  color: #166534;
  font-weight: 700;
}

.hero-card.course-card {
  color: #111827;
  border-color: #4f46e5;
  font-weight: 700;
}`,
  responsive: `.course-card {
  color: #374151;
  background: #ffffff;
  padding: 1rem;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
}

.stylesheet-status {
  color: #166534;
  font-weight: 700;
}

.hero-card.course-card {
  color: #111827;
  border-color: #4f46e5;
  font-weight: 700;
}

.action:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 4px;
}

@media (min-width: 760px) {
  .course-card {
    max-width: 42rem;
  }
}`
};

const cssDeclarationTest = (label, selector, property, value) => test("cssDeclaration", label, { selector, property, value });
const cssMediaTest = (label, query, selector, property, value) => test("cssMediaDeclaration", label, { query, selector, property, value });

function cssSetupQuiz() {
  const explanation = {
    fr: "Une décision CSS fiable relie intention, sélecteur, déclaration, rendu et vérification sous plusieurs contraintes.",
    en: "A reliable CSS decision connects intent, selector, declaration, output, and verification across several constraints."
  };
  const choices = [
    { id: "proof", label: { fr: "Ecrire une règle courte, inspecter le rendu, puis vérifier mobile et focus", en: "Write a short rule, inspect the output, then check mobile and focus" } },
    { id: "random", label: { fr: "Essayer des couleurs au hasard jusqu'à aimer le résultat", en: "Try random colors until the result feels nice" } },
    { id: "desktop", label: { fr: "Regarder seulement le rendu desktop", en: "Only check the desktop output" } }
  ];
  const prompt = { fr: "Quel reflexe rend le demarrage CSS fiable ?", en: "Which habit makes CSS setup reliable?" };
  const base = quizLesson({
    id: "css-00-setup-quiz",
    title: ["Quiz : méthode CSS", "Quiz: CSS method"],
    brief: ["Diagnostique la bonne boucle de travail avant de styliser PulsaConf.", "Diagnose the right workflow before styling PulsaConf."],
    question: prompt,
    options: choices,
    answer: "proof",
    explanation,
    xp: 35
  });
  return {
    ...base,
    course: {
      fr: { introduction: "Le quiz de méthode CSS vérifie que tu sais raisonner avant de styliser : intention, sélecteur, declaration, rendu et preuve.", sections: [{ title: "Diagnostic", paragraphs: ["Une bonne réponse CSS ne se limite pas à une valeur qui semble jolie.", "Elle explique ce qui change pour la lisibilite, le layout, le focus ou le responsive."], example: ".course-card { color: #1f2937; }" }, { title: "Preuve", paragraphs: ["La preuve peut venir du sélecteur, de l'onglet Styles, d'un test ou d'une vérification mobile.", "Sans preuve, la règle reste une préférence personnelle."], example: "DevTools > Éléments > Styles" }, { title: "Decision", paragraphs: ["Choisis l'option qui garde le composant utilisable avec de vrais contenus.", "Évite les reponses qui regardent seulement desktop ou une couleur isolee."], example: ":focus-visible + @media" }], vocabulary: [["intention", "Raison visuelle ou ergonomique de la règle."], ["preuve", "Observation qui confirme l'effet CSS."], ["contrainte", "Cas à vérifier comme mobile, focus ou contenu long."]], check: ["Je diagnostique avant de choisir.", "Je cite une preuve CSS.", "Je refuse les corrections au hasard."] },
      en: { introduction: "The CSS method quiz checks that you can reason before styling: intent, selector, declaration, output, and evidence.", sections: [{ title: "Diagnosis", paragraphs: ["A good CSS answer is not just a value that looks nice.", "It explains what changes for readability, layout, focus, or responsive behavior."], example: ".course-card { color: #1f2937; }" }, { title: "Evidence", paragraphs: ["Evidence can come from the selector, Styles pane, a test, or a mobile check.", "Without evidence, the rule remains a personal preference."], example: "DevTools > Elements > Styles" }, { title: "Decision", paragraphs: ["Choose the option that keeps the component usable with real content.", "Avoid answers that only check desktop or an isolated color."], example: ":focus-visible + @media" }], vocabulary: [["intent", "Visual or ergonomic reason for the rule."], ["evidence", "Observation confirming the CSS effect."], ["constraint", "Case to check such as mobile, focus, or long content."]], check: ["I diagnose before choosing.", "I cite CSS evidence.", "I reject random fixes."] }
    },
    guide: {
      fr: { objectives: ["Diagnostiquer une decision CSS.", "Distinguer preuve et préférence visuelle.", "Classer une boucle de validation fiable."], prerequisites: ["Lire une règle CSS simple.", "Comprendre sélecteur et declaration.", "Savoir observer la preview."], steps: ["Lis le snippet.", "Nomme le risque utilisateur.", "Choisis la preuve la plus robuste."], mistakes: ["Repondre au quiz CSS sans citer de preuve.", "Confondre couleur jolie et contraste vérifie.", "Oublier mobile ou focus dans le diagnostic."] },
      en: { objectives: ["Diagnose a CSS decision.", "Separate evidence from visual preference.", "Order a reliable validation loop."], prerequisites: ["Read a simple CSS rule.", "Understand selector and declaration.", "Know how to observe the preview."], steps: ["Read the snippet.", "Name the user risk.", "Choose the strongest evidence."], mistakes: ["Answering the CSS quiz without citing evidence.", "Confusing nice color with verified contrast.", "Forgetting mobile or focus in diagnosis."] }
    },
    pedagogy: introPedagogy(["Quiz : méthode CSS", "Quiz: CSS method"], T("Diagnostiquer la méthode CSS.", "Diagnose the CSS method."), {
      fr: { introduction: "Le quiz de méthode CSS vérifie que tu sais raisonner avant de styliser.", vocabulary: [["diagnostic", "Lecture du problème avant correction."], ["preuve", "Élément observable qui confirme la correction."], ["boucle", "Suite intention, règle, vérification."]] },
      en: { introduction: "The CSS method quiz checks that you can reason before styling.", vocabulary: [["diagnosis", "Reading the problem before fixing."], ["evidence", "Observable evidence confirming the fix."], ["loop", "Intent, rule, and verification sequence."]] }
    }, {
      fr: { objectives: ["Diagnostiquer une decision CSS.", "Citer une preuve.", "Ordonner une boucle fiable."], prerequisites: ["Lire CSS.", "Observer la preview.", "Lire les tests."], steps: ["Lire.", "Diagnostiquer.", "Prouver."], mistakes: ["Repondre au quiz CSS sans preuve.", "Deviner.", "Ignorer le focus."] },
      en: { objectives: ["Diagnose a CSS decision.", "Cite evidence.", "Order a reliable loop."], prerequisites: ["Read CSS.", "Observe the preview.", "Read tests."], steps: ["Read.", "Diagnose.", "Prove."], mistakes: ["Answering the CSS quiz without evidence.", "Guessing.", "Ignoring focus."] }
    }, ".notice { color: #334155; }", T("Relis la preuve demandée par chaque question.", "Review the evidence requested by each question.")),
    questions: [
      { id: "css-00-setup-quiz-q1", type: "single", prompt, choices, answer: "proof", explanation },
      { id: "css-00-setup-quiz-q2", type: "multiple", prompt: { fr: "Quelles preuves doivent accompagner une correction CSS ?", en: "Which evidence should accompany a CSS fix?" }, choices: [{ id: "selector", label: { fr: "Le sélecteur cible le bon composant", en: "The selector targets the right component" } }, { id: "render", label: { fr: "Le rendu reste lisible à plusieurs largeurs", en: "The output stays readable at several widths" } }, { id: "guess", label: { fr: "La valeur à ete choisie au hasard", en: "The value was chosen randomly" } }], answer: ["selector", "render"], explanation },
      { id: "css-00-setup-quiz-q3", type: "true-false", prompt: { fr: "Vrai ou faux : CSS doit corriger une structure HTML confuse avec des couleurs.", en: "True or false: CSS should fix confusing HTML structure with colors." }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
      { id: "css-00-setup-quiz-q4", type: "ordering", prompt: { fr: "Classe la boucle CSS la plus fiable.", en: "Order the most reliable CSS loop." }, choices: [{ id: "intent", label: { fr: "Nommer l'intention visuelle", en: "Name the visual intent" } }, { id: "selector", label: { fr: "Choisir le sélecteur le plus précis utile", en: "Choose the most useful specific selector" } }, { id: "rule", label: { fr: "Ajouter une declaration courte", en: "Add a short declaration" } }, { id: "verify", label: { fr: "Verifier rendu, responsive et focus", en: "Check output, responsive behavior, and focus" } }], answer: ["intent", "selector", "rule", "verify"], explanation },
      { id: "css-00-setup-quiz-q5", type: "code-reading", prompt: { fr: "Lis `.card { color: red; }`. Quel diagnostic manque avant d'accepter cette règle ?", en: "Read `.card { color: red; }`. What diagnosis is missing before accepting this rule?" }, choices: [{ id: "intent", label: { fr: "L'intention, le contraste et le composant cible ne sont pas prouves", en: "Intent, contrast, and target component are not proven" } }, { id: "ok", label: { fr: "La règle est forcement correcte", en: "The rule is necessarily correct" } }, { id: "html", label: { fr: "Il faut supprimer tout le HTML", en: "All HTML must be removed" } }], answer: "intent", explanation },
      { id: "css-00-setup-quiz-q6", type: "short-open", prompt: { fr: "Cite quatre preuves complémentaires lors d'une revue CSS.", en: "Name four complementary pieces of evidence in a CSS review." }, choices: [], answer: T(["sélecteur", "responsive", "focus", "contraste"], ["selector", "responsive", "focus", "contrast"]), explanation }
    ],
    passingScore: 75,
    randomizeQuestions: false
  };
}

function cssSetupProject() {
  const solution = `:root {
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
  const base = projectLesson({
    id: "css-00-project-style-setup",
    title: ["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"],
    brief: ["Livre une premiere feuille de style lisible, reliée à une intention et vérifiable dans le navigateur.", "Ship a first readable stylesheet connected to intent and verifiable in the browser."],
    starterCode: cssIntroStages.responsive,
    solution,
    tests: [cssDeclarationTest(T("variable accent", "accent variable"), ":root", "--accent", "#4f46e5"), cssDeclarationTest(T("variable surface", "surface variable"), ":root", "--surface", "#ffffff"), cssDeclarationTest(T("police système", "system font"), ".demo-surface", "font-family", "system-ui, sans-serif"), cssDeclarationTest(T("espacement réutilisé", "reused spacing"), ".course-card", "padding", "var(--space)"), cssDeclarationTest(T("accent réutilisé", "reused accent"), ".hero-card.course-card", "border-color", "var(--accent)"), cssDeclarationTest(T("focus visible", "visible focus"), ".action:focus-visible", "outline", "3px solid var(--accent)"), cssMediaTest(T("largeur desktop", "desktop width"), "(min-width: 760px)", ".course-card", "max-width", "42rem")],
    xp: 90
  });
  return {
    ...base,
    previewHtml: cssIntroPreview,
    course: introCourse(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], T("Assemble une feuille CSS cumulative avec variables, carte, cascade, focus et largeur desktop.", "Assemble a cumulative stylesheet with variables, card styling, cascade, focus, and desktop width."), ".event-card {\n  padding: var(--space);\n  border-color: var(--accent);\n}"),
    guide: introGuide(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"]),
    pedagogy: introPedagogy(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], T("Assemble une feuille CSS cumulative avec variables, carte, cascade, focus et largeur desktop.", "Assemble a cumulative stylesheet with variables, card styling, cascade, focus, and desktop width."), introCourse(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], T("Assemble une feuille CSS cumulative avec variables, carte, cascade, focus et largeur desktop.", "Assemble a cumulative stylesheet with variables, card styling, cascade, focus, and desktop width."), ".event-card {\n  padding: var(--space);\n  border-color: var(--accent);\n}"), introGuide(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"]), ".event-card {\n  padding: var(--space);\n  border-color: var(--accent);\n}", T("Commence par les variables, puis remplace les valeurs répétées sans supprimer focus ni media query.", "Start with variables, then replace repeated values without removing focus or the media query.")),
    rubric: {
      fr: ["Le fichier démarre par des variables explicites et réutilisables.", "La surface et la carte ont des styles séparés et lisibles.", "Le focus clavier reste visible avec :focus-visible.", "Les choix de couleur, espace et police sont justifiables dans DevTools."],
      en: ["The file starts with explicit reusable variables.", "The surface and card have separate readable styles.", "Keyboard focus remains visible with :focus-visible.", "Color, spacing, and font choices are justifiable in DevTools."]
    }
  };
}

const foundationModules = [
  module("css-getting-started", "Introduction, outils et méthode", "Introduction, tools, and method", [
    introCssLesson({ id: "css-00-what-css-does", title: ["Ce que CSS fait vraiment", "What CSS really does"], brief: T("Applique présentation et contraste à la carte sans ajouter de structure HTML dans la feuille CSS.", "Apply presentation and contrast to the card without adding HTML structure to the stylesheet."), starterCode: T(".course-card {\n  /* Décris ici la présentation de la carte. */\n}", ".course-card {\n  /* Describe the card presentation here. */\n}"), solution: cssIntroStages.role, tests: [cssDeclarationTest(T("couleur du texte de la carte", "card text color"), ".course-card", "color", "#1f2937"), cssDeclarationTest(T("fond de la carte", "card background"), ".course-card", "background", "#ffffff"), test("notContains", T("aucune balise HTML", "no HTML tag"), "<h1"), test("notContains", T("aucun script", "no script"), "<script")], hint: T("Dans .course-card, ajoute color puis background avec les valeurs demandées par les tests.", "Inside .course-card, add color then background using the values required by the tests."), example: ".notice {\n  color: #334155;\n  background: #f8fafc;\n}", xp: 28 }),
    introCssLesson({ id: "css-00-create-stylesheet", title: ["Commencer styles.css", "Start styles.css"], brief: T("Le lab édite déjà styles.css : prolonge la règle existante avec un espace intérieur et des coins lisibles, sans mélanger de HTML.", "The lab already edits styles.css: extend the existing rule with inner spacing and readable corners without mixing in HTML."), starterCode: cssIntroStages.role, solution: cssIntroStages.file, tests: [cssDeclarationTest(T("couleur conservée", "preserved color"), ".course-card", "color", "#1f2937"), cssDeclarationTest(T("espacement intérieur", "inner spacing"), ".course-card", "padding", "1rem"), cssDeclarationTest(T("coins de la carte", "card corners"), ".course-card", "border-radius", "1rem"), test("notContains", T("aucun style inline", "no inline style"), "style=")], hint: T("Conserve les déclarations précédentes et complète le même bloc .course-card.", "Keep the previous declarations and complete the same .course-card block."), example: ".panel {\n  padding: 2rem;\n  border-radius: 0.5rem;\n}", xp: 28 }),
    introCssLesson({ id: "css-00-link-stylesheet", title: ["Confirmer le chargement de styles.css", "Confirm styles.css loading"], brief: T("Le document du lab relie déjà styles.css : rends le témoin .stylesheet-status visiblement actif pour prouver que la feuille est chargée.", "The lab document already links styles.css: make the .stylesheet-status indicator visibly active to prove the stylesheet is loaded."), starterCode: cssIntroStages.file, solution: cssIntroStages.linked, tests: [cssDeclarationTest(T("témoin de chargement", "loading indicator"), ".stylesheet-status", "color", "#166534"), cssDeclarationTest(T("témoin mis en valeur", "emphasized indicator"), ".stylesheet-status", "font-weight", "700"), cssDeclarationTest(T("carte toujours espacée", "card spacing remains"), ".course-card", "padding", "1rem")], hint: T("Le témoin existe déjà dans la preview : ajoute une nouvelle règle .stylesheet-status.", "The indicator already exists in the preview: add a new .stylesheet-status rule."), example: ".asset-status {\n  color: #075985;\n  font-weight: 600;\n}", xp: 30 }),
    introCssLesson({ id: "css-00-devtools-styles", title: ["Inspecter l'onglet Styles", "Inspect the Styles pane"], brief: T("Crée une surcharge visible sur la carte héro afin que DevTools montre la bordure de base et la déclaration active plus spécifique.", "Create a visible hero-card override so DevTools shows the base border and the more specific active declaration."), starterCode: cssIntroStages.linked, solution: cssIntroStages.inspected, tests: [cssDeclarationTest(T("bordure de base", "base border"), ".course-card", "border", "2px solid #c7d2fe"), cssDeclarationTest(T("bordure active de la carte héro", "active hero-card border"), ".hero-card.course-card", "border-color", "#4f46e5"), cssDeclarationTest(T("témoin de chargement conservé", "loading indicator remains"), ".stylesheet-status", "font-weight", "700"), test("notContains", T("aucun important", "no important"), "!important")], hint: T("Ajoute d'abord la bordure sur .course-card, puis surcharge seulement border-color avec .hero-card.course-card.", "First add the border to .course-card, then override only border-color with .hero-card.course-card."), example: ".panel { border: 1px solid #cbd5e1; }\n.featured.panel { border-color: #0284c7; }", xp: 32 }),
    introCssLesson({ id: "css-00-cascade-method", title: ["Comprendre la cascade", "Understand the cascade"], brief: T("Fais gagner la variante héro par sa spécificité, sans !important, tout en gardant la règle de base lisible.", "Make the hero variant win through specificity without !important while keeping the base rule readable."), starterCode: cssIntroStages.inspected, solution: cssIntroStages.cascade, tests: [cssDeclarationTest(T("couleur de base", "base color"), ".course-card", "color", "#374151"), cssDeclarationTest(T("couleur gagnante de la variante", "winning variant color"), ".hero-card.course-card", "color", "#111827"), cssDeclarationTest(T("graisse de la variante", "variant weight"), ".hero-card.course-card", "font-weight", "700"), test("notContains", T("aucun important", "no important"), "!important")], hint: T("Modifie la couleur de base, puis place color et font-weight dans le bloc plus spécifique déjà présent.", "Change the base color, then place color and font-weight in the existing more specific block."), example: ".message { color: #475569; }\n.urgent.message { color: #991b1b; font-weight: 700; }", xp: 34 }),
    introCssLesson({ id: "css-00-responsive-check-loop", title: ["Vérifier mobile, desktop et focus", "Check mobile, desktop, and focus"], brief: T("Ajoute un focus visible à l'action et limite la largeur de la carte uniquement à partir de 760 px.", "Add visible focus to the action and limit card width only from 760px upward."), starterCode: cssIntroStages.cascade, solution: cssIntroStages.responsive, tests: [cssDeclarationTest(T("contour de focus", "focus outline"), ".action:focus-visible", "outline", "3px solid #4f46e5"), cssDeclarationTest(T("décalage du focus", "focus offset"), ".action:focus-visible", "outline-offset", "4px"), cssMediaTest(T("largeur desktop conditionnelle", "conditional desktop width"), "(min-width: 760px)", ".course-card", "max-width", "42rem"), cssDeclarationTest(T("cascade conservée", "cascade remains"), ".hero-card.course-card", "font-weight", "700")], hint: T("Crée :focus-visible hors de la media query, puis place max-width dans @media (min-width: 760px).", "Create :focus-visible outside the media query, then place max-width inside @media (min-width: 760px)."), example: ".skip-link:focus-visible { outline: 2px solid #0369a1; }\n@media (min-width: 50rem) { .panel { max-width: 60rem; } }", xp: 36 }),
    cssSetupQuiz(),
    cssSetupProject()
  ]),
  ...cssModulesFoundation
];

export const cssGettingStartedChunk = createCssTrack([foundationModules[0]], ["foundation"]);
export const cssTrackFoundationChunk = createCssTrack(foundationModules, ["foundation"]);
