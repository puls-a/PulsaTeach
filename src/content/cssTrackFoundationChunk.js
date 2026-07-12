import { module, quizLesson, projectLesson, cssLesson, test } from "./trackBuilders.js";
import { cssModulesFoundation } from "./cssModulesFoundation.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const cssIntroPreview = `<main class="demo-surface">
  <section class="hero-card course-card">
    <p class="eyebrow">PulsaConf CSS</p>
    <h1>Donner une forme lisible à une page HTML</h1>
    <p class="lead">CSS gere couleurs, espaces, tailles, layout, états et adaptation aux écrans.</p>
    <a class="action" href="#tickets">Voir les ateliers</a>
  </section>
</main>`;

function introCssLesson(id, title, brief, starterCode, solution, tests, xp = 28) {
  const base = cssLesson(id, title, brief, starterCode, ".course-card", ["color"], xp);
  const course = introCourse(title, brief, solution);
  const guide = introGuide(title);
  return {
    ...base,
    brief: { fr: brief, en: englishIntroBrief(title[1]) },
    theory: { fr: brief, en: englishIntroBrief(title[1]) },
    course,
    guide,
    pedagogy: introPedagogy(title, brief, course, guide, solution),
    previewHtml: cssIntroPreview,
    starterCode,
    solution,
    tests
  };
}

function englishIntroBrief(title) {
  return `Build the CSS setup habit for ${title}: intent, selector, declaration, browser proof, and tests.`;
}

function introCourse(title, brief, solution) {
  return {
    fr: {
      introduction: `Dans ${title[0]}, tu installes une méthode CSS humaine avant de chercher un effet visuel spectaculaire : intention, sélecteur, declaration et preuve dans le navigateur.`,
      sections: [
        { title: "Pourquoi cette étape existe", paragraphs: [brief, "CSS devient fiable quand chaque règle répond à un problème visible : lisibilite, espace, contraste, layout ou état interactif."], example: solution.slice(0, 260) },
        { title: "Méthode de travail", paragraphs: ["Commence par nommer l'intention, cible le plus petit composant utile, puis ajoute une declaration courte.", "Observe ensuite le rendu dans le navigateur et l'onglet Styles des DevTools avant d'ajouter une autre règle."], example: ".course-card {\n  property: value;\n}" },
        { title: "Piege frequent", paragraphs: ["Changer des valeurs au hasard peut donner un joli résultat une fois, mais ne prouve ni contraste, ni responsive, ni focus.", "Une correction CSS doit rester explicable quand le contenu devient plus long ou quand l'écran change."], example: ".card {\n  color: red;\n}" }
      ],
      vocabulary: [["sélecteur", "Partie de la règle qui choisit les éléments styles."], ["declaration", "Couple propriété/valeur qui produit un effet."], ["cascade", "Mecanisme qui decide quelle règle s'applique."], ["DevTools", "Outils du navigateur pour inspecter les styles actifs."]],
      check: ["Je peux expliquer l'intention de la règle.", "Je vérifie le rendu dans le navigateur.", "Je garde le focus et le responsive visibles."]
    },
    en: {
      introduction: `In ${title[1]}, you establish a human CSS method before chasing a spectacular visual effect: intent, selector, declaration, and browser evidence.`,
      sections: [
        { title: "Why this step exists", paragraphs: [englishIntroBrief(title[1]), "CSS becomes reliable when every rule answers a visible problem: readability, spacing, contrast, layout, or interactive state."], example: solution.slice(0, 260) },
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

function introPedagogy(title, brief, course, guide, solution) {
  return {
    fr: { why: course.fr.introduction, objectives: guide.fr.objectives, prerequisites: guide.fr.prerequisites, vocabulary: course.fr.vocabulary, comparison: { good: { title: "Règle courte et prouvable", code: solution, explanation: "La règle cible un composant précis et peut etre vérifiée dans le rendu." }, bad: { title: "Règle au hasard", code: ".card { color: red; }", explanation: "La valeur ne prouve ni intention, ni contraste, ni robustesse." } }, guided: guide.fr.steps, autonomous: `Refais ${title[0]} sans la solution et cite la preuve DevTools.`, hints: ["Lis le sélecteur attendu.", "Ajoute une seule declaration utile.", "Teste mobile, desktop et focus."], correction: ["Le sélecteur est present.", "La declaration répond à l'intention.", "Le rendu reste vérifiable."], summary: brief, next: "Continue avec la même boucle : intention, règle courte, preuve." },
    en: { why: course.en.introduction, objectives: guide.en.objectives, prerequisites: guide.en.prerequisites, vocabulary: course.en.vocabulary, comparison: { good: { title: "Short provable rule", code: solution, explanation: "The rule targets a specific component and can be verified in the output." }, bad: { title: "Random rule", code: ".card { color: red; }", explanation: "The value proves neither intent, contrast, nor robustness." } }, guided: guide.en.steps, autonomous: `Repeat ${title[1]} without the solution and cite DevTools evidence.`, hints: ["Read the expected selector.", "Add one useful declaration.", "Test mobile, desktop, and focus."], correction: ["The selector is present.", "The declaration matches the intent.", "The output remains verifiable."], summary: englishIntroBrief(title[1]), next: "Continue with the same loop: intent, short rule, evidence." }
  };
}

function cssSetupQuiz() {
  const explanation = {
    fr: "Une decision CSS fiable relié intention, sélecteur, declaration, rendu et vérification sur plusieurs contraintes.",
    en: "A reliable CSS decision connects intent, selector, declaration, output, and vérification across several constraints."
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
    pedagogy: introPedagogy(["Quiz : méthode CSS", "Quiz: CSS method"], "Diagnostiquer la méthode CSS.", {
      fr: { introduction: "Le quiz de méthode CSS vérifie que tu sais raisonner avant de styliser.", vocabulary: [["diagnostic", "Lecture du problème avant correction."], ["preuve", "Élément observable qui confirme la correction."], ["boucle", "Suite intention, règle, vérification."]] },
      en: { introduction: "The CSS method quiz checks that you can reason before styling.", vocabulary: [["diagnosis", "Reading the problem before fixing."], ["evidence", "Observable élément confirming the fix."], ["loop", "Intent, rule, vérification sequence."]] }
    }, {
      fr: { objectives: ["Diagnostiquer une decision CSS.", "Citer une preuve.", "Ordonner une boucle fiable."], prerequisites: ["Lire CSS.", "Observer la preview.", "Lire les tests."], steps: ["Lire.", "Diagnostiquer.", "Prouver."], mistakes: ["Repondre au quiz CSS sans preuve.", "Deviner.", "Ignorer le focus."] },
      en: { objectives: ["Diagnose a CSS decision.", "Cite evidence.", "Order a reliable loop."], prerequisites: ["Read CSS.", "Observe the preview.", "Read tests."], steps: ["Read.", "Diagnose.", "Prove."], mistakes: ["Answering the CSS quiz without evidence.", "Guessing.", "Ignoring focus."] }
    }, ".course-card { color: #1f2937; }"),
    questions: [
      { id: "css-00-setup-quiz-q1", type: "single", prompt, choices, answer: "proof", explanation },
      { id: "css-00-setup-quiz-q2", type: "multiple", prompt: { fr: "Quelles preuves doivent accompagner une correction CSS ?", en: "Which evidence should accompany a CSS fix?" }, choices: [{ id: "selector", label: { fr: "Le sélecteur cible le bon composant", en: "The selector targets the right component" } }, { id: "render", label: { fr: "Le rendu reste lisible à plusieurs largeurs", en: "The output stays readable at several widths" } }, { id: "guess", label: { fr: "La valeur à ete choisie au hasard", en: "The value was chosen randomly" } }], answer: ["selector", "render"], explanation },
      { id: "css-00-setup-quiz-q3", type: "true-false", prompt: { fr: "Vrai ou faux : CSS doit corriger une structure HTML confuse avec des couleurs.", en: "True or false: CSS should fix confusing HTML structure with colors." }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
      { id: "css-00-setup-quiz-q4", type: "ordering", prompt: { fr: "Classe la boucle CSS la plus fiable.", en: "Order the most reliable CSS loop." }, choices: [{ id: "intent", label: { fr: "Nommer l'intention visuelle", en: "Name the visual intent" } }, { id: "selector", label: { fr: "Choisir le sélecteur le plus précis utile", en: "Choose the most useful specific selector" } }, { id: "rule", label: { fr: "Ajouter une declaration courte", en: "Add a short declaration" } }, { id: "verify", label: { fr: "Verifier rendu, responsive et focus", en: "Check output, responsive behavior, and focus" } }], answer: ["intent", "selector", "rule", "verify"], explanation },
      { id: "css-00-setup-quiz-q5", type: "code-reading", prompt: { fr: "Lis `.card { color: red; }`. Quel diagnostic manque avant d'accepter cette règle ?", en: "Read `.card { color: red; }`. What diagnosis is missing before accepting this rule?" }, choices: [{ id: "intent", label: { fr: "L'intention, le contraste et le composant cible ne sont pas prouves", en: "Intent, contrast, and target component are not proven" } }, { id: "ok", label: { fr: "La règle est forcement correcte", en: "The rule is necessarily correct" } }, { id: "html", label: { fr: "Il faut supprimer tout le HTML", en: "All HTML must be removed" } }], answer: "intent", explanation },
      { id: "css-00-setup-quiz-q6", type: "short-open", prompt: { fr: "Quelle preuve citerais-tu en revue CSS ?", en: "What evidence would you cite in CSS review?" }, choices: [], answer: ["sélecteur", "responsive", "focus", "contraste"], explanation }
    ],
    passingScore: 75,
    randomizeQuestions: false
  };
}

function cssSetupProject() {
  const base = projectLesson({
    id: "css-00-project-style-setup",
    title: ["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"],
    brief: ["Livre une premiere feuille de style lisible, reliée à une intention et vérifiable dans le navigateur.", "Ship a first readable stylesheet connected to intent and verifiable in the browser."],
    starterCode: ":root {\n}\n\n.demo-surface {\n}\n\n.course-card {\n}\n\n.action:focus-visible {\n}\n",
    solution: ":root {\n  --accent: #4f46e5;\n  --surface: #ffffff;\n  --space: 1rem;\n}\n\n.demo-surface {\n  color: #1f2937;\n  background: #eef2ff;\n  font-family: system-ui, sans-serif;\n}\n\n.course-card {\n  max-width: 42rem;\n  padding: var(--space);\n  background: var(--surface);\n  border: 2px solid var(--accent);\n  border-radius: 1rem;\n}\n\n.action:focus-visible {\n  outline: 3px solid var(--accent);\n  outline-offset: 4px;\n}",
    tests: [test("contains", "root variables", ":root"), test("contains", "accent variable", "--accent"), test("contains", "surface selector", ".demo-surface"), test("contains", "card selector", ".course-card"), test("contains", "spacing", "padding"), test("contains", "focus visible", ":focus-visible"), test("contains", "outline", "outline"), test("contains", "system font", "system-ui")],
    xp: 90
  });
  return {
    ...base,
    course: introCourse(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], "Assembler la premiere feuille CSS PulsaConf.", base.solution),
    guide: introGuide(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"]),
    pedagogy: introPedagogy(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], "Assembler la premiere feuille CSS PulsaConf.", introCourse(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"], "Assembler la premiere feuille CSS PulsaConf.", base.solution), introGuide(["Mini-projet : setup CSS PulsaConf", "Mini project: PulsaConf CSS setup"]), base.solution),
    rubric: {
      fr: ["Le fichier démarre par des variables explicites et réutilisables.", "La surface et la carte ont des styles séparés et lisibles.", "Le focus clavier reste visible avec :focus-visible.", "Les choix de couleur, espace et police sont justifiables dans DevTools."],
      en: ["The file starts with explicit reusable variables.", "The surface and card have separate readable styles.", "Keyboard focus remains visible with :focus-visible.", "Color, spacing, and font choices are justifiable in DevTools."]
    }
  };
}

function selectorSpecificityQuiz() {
  const title = ["Quiz spécificité", "Specificity quiz"];
  const brief = ["Diagnostique les conflits de sélecteurs avant de corriger PulsaConf.", "Diagnose selector conflicts before fixing PulsaConf."];
  const explanation = { fr: "La spécificité aide à comprendre quelle règle gagne, mais le meilleur CSS reste celui qui cible clairement sans escalade inutile.", en: "Specificity helps explain which rule wins, but the best CSS still targets clearly without unnecessary escalation." };
  const choices = [
    { id: "tag", label: { fr: "article", en: "article" } },
    { id: "class", label: { fr: ".course-card", en: ".course-card" } },
    { id: "id", label: { fr: "#featured-card", en: "#featured-card" } }
  ];
  const prompt = { fr: "Quel sélecteur gagne en priorite ?", en: "Which selector has the highest priority?" };
  const base = quizLesson({ id: "css-01-specificity-quiz", title, brief, question: prompt, options: choices, answer: "id", explanation, xp: 25 });
  return {
    ...base,
    course: {
      fr: { introduction: "Ce quiz transforme la spécificité en outil de diagnostic, pas en concours du sélecteur le plus fort.", sections: [{ title: "Lire le conflit", paragraphs: ["Quand deux règles ciblent la même carte, le navigateur compare spécificité puis ordre.", "Avant d'ajouter un id, demandé-toi si une classe plus claire suffirait."], example: "article / .course-card / #featured-card" }, { title: "Éviter l'escalade", paragraphs: ["Un sélecteur très fort corrige vite mais rend les prochaines modifications plus difficiles.", "La bonne réponse explique pourquoi la règle gagne et si elle devrait vraiment exister."], example: ".program .course-card" }, { title: "Preuve", paragraphs: ["DevTools montre la declaration active et les declarations barrées.", "C'est la preuve la plus directe pour comprendre la cascade."], example: "Éléments > Styles" }], vocabulary: [["spécificité", "Poids d'un sélecteur dans la cascade."], ["cascade", "Mecanisme qui choisit la declaration active."], ["declaration barrée", "Règle visible mais remplacee par une autre."]], check: ["Je sais predire la règle gagnante.", "Je distingue puissance et maintenabilite.", "Je cite DevTools comme preuve."] },
      en: { introduction: "This quiz turns specificity into a diagnostic tool, not a contest for the strongest selector.", sections: [{ title: "Read the conflict", paragraphs: ["When two rules target the same card, the browser compares specificity then order.", "Before adding an id, ask whether a clearer class would be enough."], example: "article / .course-card / #featured-card" }, { title: "Avoid escalation", paragraphs: ["A very strong selector fixes quickly but makes future changes harder.", "The right answer explains why the rule wins and whether it should exist."], example: ".program .course-card" }, { title: "Evidence", paragraphs: ["DevTools shows the active declaration and crossed-out declarations.", "That is the most direct proof for understanding cascade."], example: "Elements > Styles" }], vocabulary: [["specificity", "Weight of a selector in the cascade."], ["cascade", "Mechanism choosing the active declaration."], ["crossed-out declaration", "Visible rule replaced by another one."]], check: ["I can predict the winning rule.", "I separate power from maintainability.", "I cite DevTools as evidence."] }
    },
    guide: {
      fr: { objectives: ["Predire quel sélecteur gagne.", "Expliquer le risque d'un id inutile.", "Utiliser DevTools pour confirmer la cascade."], prerequisites: ["Lire une balise, une classe et un id.", "Comprendre une declaration CSS.", "Savoir inspecter un élément."], steps: ["Compare les sélecteurs.", "Nomme celui qui gagne.", "Explique si la correction reste maintenable."], mistakes: ["Choisir le sélecteur le plus fort sans raison.", "Ajouter !important pour éviter de comprendre.", "Ignorer les declarations barrées dans DevTools."] },
      en: { objectives: ["Predict which selector wins.", "Explain the risk of an unnecessary id.", "Use DevTools to confirm cascade."], prerequisites: ["Read a tag, class, and id.", "Understand a CSS declaration.", "Know how to inspect an element."], steps: ["Compare selectors.", "Name the winner.", "Explain whether the fix remains maintainable."], mistakes: ["Choosing the strongest selector without reason.", "Adding !important to avoid understanding.", "Ignoring crossed-out declarations in DevTools."] }
    },
    questions: [
      { id: "css-01-specificity-quiz-q1", type: "single", prompt, choices, answer: "id", explanation },
      { id: "css-01-specificity-quiz-q2", type: "multiple", prompt: { fr: "Quelles preuves aident à diagnostiquer un conflit CSS ?", en: "Which evidence helps diagnose a CSS conflict?" }, choices: [{ id: "active", label: { fr: "Declaration active dans DevTools", en: "Active declaration in DevTools" } }, { id: "crossed", label: { fr: "Declaration barrée", en: "Crossed-out declaration" } }, { id: "guess", label: { fr: "Couleur choisie au hasard", en: "Randomly chosen color" } }], answer: ["active", "crossed"], explanation },
      { id: "css-01-specificity-quiz-q3", type: "true-false", prompt: { fr: "Vrai ou faux : ajouter un id est toujours la meilleure correction.", en: "True or false: adding an id is always the best fix." }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
      { id: "css-01-specificity-quiz-q4", type: "ordering", prompt: { fr: "Classe la méthode de diagnostic.", en: "Order the diagnostic method." }, choices: [{ id: "target", label: { fr: "Identifier l'élément cible", en: "Identify the target élément" } }, { id: "compare", label: { fr: "Comparer les sélecteurs", en: "Compare selectors" } }, { id: "devtools", label: { fr: "Verifier la declaration active", en: "Check the active declaration" } }, { id: "simplify", label: { fr: "Simplifier si possible", en: "Simplify if possible" } }], answer: ["target", "compare", "devtools", "simplify"], explanation },
      { id: "css-01-specificity-quiz-q5", type: "code-reading", prompt: { fr: "Lis `article`, `.course-card`, `#featured-card`. Quel sélecteur est le plus specifique ?", en: "Read `article`, `.course-card`, `#featured-card`. Which selector is most specific?" }, choices, answer: "id", explanation },
      { id: "css-01-specificity-quiz-q6", type: "short-open", prompt: { fr: "Quelle preuve citerais-tu en revue de cascade ?", en: "What evidence would you cite in a cascade review?" }, choices: [], answer: ["devtools", "declaration", "barrée", "active"], explanation }
    ],
    passingScore: 75,
    randomizeQuestions: false,
    feedbackMode: "immediate"
  };
}

function moduleReviewQuiz(id, title, focus, selector, risk) {
  const explanation = { fr: `La bonne decision CSS pour ${focus[0]} cible ${selector}, évite ${risk[0]} et reste vérifiable dans DevTools.`, en: `The right CSS decision for ${focus[1]} targets ${selector}, avoids ${risk[1]}, and remains verifiable in DevTools.` };
  const choices = [{ id: "proof", label: { fr: "Règle courte, cible claire, rendu vérifie", en: "Short rule, clear target, verified output" } }, { id: "random", label: { fr: "Valeurs au hasard", en: "Random values" } }, { id: "important", label: { fr: "Ajouter !important partout", en: "Add !important everywhere" } }];
  const prompt = { fr: `Quelle approche rend ${focus[0]} fiable ?`, en: `Which approach makes ${focus[1]} reliable?` };
  const base = quizLesson({ id, title, brief: [`Revois ${focus[0]} comme une decision de production.`, `Review ${focus[1]} as a production decision.`], question: prompt, options: choices, answer: "proof", explanation, xp: 30 });
  const course = reviewCourse(title, focus, selector, risk);
  const guide = reviewGuide(title, focus, selector, risk);
  return { ...base, course, guide, pedagogy: reviewPedagogy(title, focus, course, guide, `${selector} { /* proof */ }`), questions: [
    { id: `${id}-q1`, type: "single", prompt, choices, answer: "proof", explanation },
    { id: `${id}-q2`, type: "multiple", prompt: { fr: "Quelles preuves sont pertinentes ?", en: "Which evidence is relevant?" }, choices: [{ id: "selector", label: { fr: "Sélecteur cible", en: "Target selector" } }, { id: "preview", label: { fr: "Rendu avant/apres", en: "Before/after output" } }, { id: "guess", label: { fr: "Intuition seule", en: "Intuition only" } }], answer: ["selector", "preview"], explanation },
    { id: `${id}-q3`, type: "true-false", prompt: { fr: "Vrai ou faux : un rendu joli suffit sans vérifier le focus ou le responsive.", en: "True or false: a nice output is enough without checking focus or responsive behavior." }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
    { id: `${id}-q4`, type: "ordering", prompt: { fr: "Classe la revue CSS.", en: "Order the CSS review." }, choices: [{ id: "target", label: { fr: "Identifier la cible", en: "Identify the target" } }, { id: "risk", label: { fr: "Nommer le risque", en: "Name the risk" } }, { id: "rule", label: { fr: "Ajouter la règle minimale", en: "Add the minimal rule" } }, { id: "proof", label: { fr: "Verifier le rendu", en: "Verify the output" } }], answer: ["target", "risk", "rule", "proof"], explanation },
    { id: `${id}-q5`, type: "code-reading", prompt: { fr: `Lis ${selector} { }. Que manque-t-il pour ${focus[0]} ?`, en: `Read ${selector} { }. What is missing for ${focus[1]}?` }, choices: [{ id: "proof", label: { fr: "Une règle liee au risque et une preuve de rendu", en: "A rule tied to the risk and output evidence" } }, { id: "none", label: { fr: "Rien", en: "Nothing" } }, { id: "delete", label: { fr: "Supprimer HTML", en: "Delete HTML" } }], answer: "proof", explanation },
    { id: `${id}-q6`, type: "short-open", prompt: { fr: "Quelle preuve citerais-tu ?", en: "What evidence would you cite?" }, choices: [], answer: ["devtools", "rendu", "mobile", "focus", "test"], explanation }
  ], passingScore: 75, randomizeQuestions: false };
}

function moduleProject(id, title, focus, starterCode, solution, tests) {
  const base = projectLesson({ id, title, brief: [`Livre ${focus[0]} avec des règles groupees par intention.`, `Ship ${focus[1]} with rules grouped by intent.`], starterCode, solution, tests, xp: 90 });
  const selector = starterCode.split("{")[0].trim() || ".demo";
  const risk = ["un rendu fragile difficile à maintenir", "a fragile output that is hard to maintain"];
  const course = reviewCourse(title, focus, selector, risk);
  const guide = reviewGuide(title, focus, selector, risk);
  return { ...base, course, guide, pedagogy: reviewPedagogy(title, focus, course, guide, solution), rubric: { fr: [`${focus[0]} couvre les sélecteurs demandes.`, "Les règles sont groupees par intention et restent lisibles.", "Le rendu est vérifie sur mobile et desktop.", "Le focus, les textes longs ou les espacements ne regressent pas."], en: [`${focus[1]} covers the requested selectors.`, "Rules are grouped by intent and remain readable.", "The output is checked on mobile and desktop.", "Focus, long text, or spacing do not regress."] } };
}

function reviewCourse(title, focus, selector, risk) {
  return {
    fr: { introduction: `${title[0]} transforme ${focus[0]} en livrable CSS vérifiable, sans masquer ${risk[0]}.`, sections: [{ title: "Intention", paragraphs: [`Le composant cible est ${selector}.`, `La correction doit éviter ${risk[0]}.`, "Tu ne cherches pas seulement un rendu agreable : tu dois pouvoir expliquer pourquoi cette règle existe, quel problème elle réduit et quel autre composant elle ne doit pas toucher."], example: `${selector} { }` }, { title: "Méthode", paragraphs: ["Ajoute une règle courte, puis inspecte la declaration active.", "Compare le rendu avant/apres au lieu de te fier à l'impression visuelle.", "Si tu dois ajouter trois declarations pour masquer un seul symptome, reviens à la cible et séparé structure, espace, couleur et état interactif."], example: "DevTools > Styles" }, { title: "Validation", paragraphs: ["Teste mobile, desktop, focus et contenu long.", "Garde seulement les declarations qui portent une intention.", "La revue finale doit pouvoir citer un sélecteur, une declaration active et un effet observable dans le rendu."], example: solutionPreview(selector) }], vocabulary: [["sélecteur", "Cible de la règle CSS."], ["preuve", "Observation qui confirme le rendu."], ["regression", "Defaut ajoute par une correction." ]], check: ["Je connais la cible.", "Je peux citer la preuve.", "Je limite les effets de bord."] },
    en: { introduction: `${title[1]} turns ${focus[1]} into a verifiable CSS deliverable without hiding ${risk[1]}.`, sections: [{ title: "Intent", paragraphs: [`The target component is ${selector}.`, `The fix must avoid ${risk[1]}.`, "You are not only chasing a pleasant output: you must explain why the rule exists, which problem it reduces, and which other component it must not touch."], example: `${selector} { }` }, { title: "Method", paragraphs: ["Add a short rule, then inspect the active declaration.", "Compare before/after output instead of trusting visual impression.", "If you need three declarations to hide one symptom, return to the target and separate structure, spacing, color, and interactive state."], example: "DevTools > Styles" }, { title: "Validation", paragraphs: ["Test mobile, desktop, focus, and long content.", "Keep only declarations that carry intent.", "The final review must cite a selector, an active declaration, and an observable effect in the output."], example: solutionPreview(selector) }], vocabulary: [["selector", "Target of the CSS rule."], ["evidence", "Observation confirming the output."], ["regression", "Defect introduced by a fix." ]], check: ["I know the target.", "I can cite the evidence.", "I limit side effects."] }
  };
}

function reviewGuide(title, focus, selector, risk) {
  return { fr: { objectives: [`Livrer ${focus[0]}.`, `Éviter ${risk[0]}.`, `Prouver la correction de ${selector}.`], prerequisites: ["Lire le HTML cible.", "Comprendre le sélecteur.", "Ouvrir DevTools."], steps: ["Identifier la cible.", "Ajouter la règle minimale.", "Verifier rendu et tests."], mistakes: [`Traiter ${title[0]} comme une decoration sans preuve.`, "Empiler des declarations inutiles.", "Oublier mobile ou focus."] }, en: { objectives: [`Ship ${focus[1]}.`, `Avoid ${risk[1]}.`, `Prove the fix on ${selector}.`], prerequisites: ["Read the target HTML.", "Understand the selector.", "Open DevTools."], steps: ["Identify the target.", "Add the minimal rule.", "Verify output and tests."], mistakes: [`Treating ${title[1]} as decoration without evidence.`, "Stacking unnecessary declarations.", "Forgetting mobile or focus."] } };
}

function reviewPedagogy(title, focus, course, guide, solution) {
  return { fr: { why: course.fr.introduction, objectives: guide.fr.objectives, prerequisites: guide.fr.prerequisites, vocabulary: course.fr.vocabulary, comparison: { good: { title: "Correction prouvee", code: solution, explanation: "La règle cible le composant et se vérifie dans le rendu." }, bad: { title: "Correction décorative", code: ".demo { color: red; }", explanation: "La valeur ne prouve pas que le problème est resolu." } }, guided: guide.fr.steps, autonomous: `Refais ${title[0]} et cite une preuve DevTools.`, hints: ["Commence par la cible.", "Ajoute une seule règle utile.", "Teste le rendu avant de continuer."], correction: ["La cible est presente.", "La règle porte une intention.", "Les tests confirment le rendu."], summary: `Livrer ${focus[0]}.`, next: "Continue avec une preuve aussi explicite." }, en: { why: course.en.introduction, objectives: guide.en.objectives, prerequisites: guide.en.prerequisites, vocabulary: course.en.vocabulary, comparison: { good: { title: "Proven fix", code: solution, explanation: "The rule targets the component and can be verified in output." }, bad: { title: "Decorative fix", code: ".demo { color: red; }", explanation: "The value does not prove the problem is solved." } }, guided: guide.en.steps, autonomous: `Repeat ${title[1]} and cite DevTools evidence.`, hints: ["Start with the target.", "Add one useful rule.", "Check the output before moving on."], correction: ["The target is present.", "The rule carries intent.", "Tests confirm the output."], summary: `Ship ${focus[1]}.`, next: "Continue with equally explicit evidence." } };
}

function solutionPreview(selector) {
  return `${selector} {\n  /* declaration utile */\n}`;
}

const foundationModules = [
  module("css-getting-started", "Introduction, outils et méthode", "Introduction, tools, and method", [
    introCssLesson("css-00-what-css-does", ["Ce que CSS fait vraiment", "What CSS really does"], "Distingue structure HTML et presentation CSS avant de styliser PulsaConf.", ".course-card {\n  /* decris l'intention visuelle */\n}", ".course-card {\n  color: #1f2937;\n  background: #ffffff;\n}", [test("contains", "target card", ".course-card"), test("contains", "text color", "color"), test("contains", "background", "background"), test("notContains", "no html tag", "<h1"), test("notContains", "no script", "<script")], 28),
    introCssLesson("css-00-create-stylesheet", ["Créer styles.css", "Create styles.css"], "Prepare une feuille de style séparée pour éviter de melanger contenu et presentation.", "/* Fichier à preparer */\n.course-card {\n}", ":root {\n  --source-file: \"styles.css\";\n}\n\n.course-card {\n  padding: 1rem;\n  border-radius: 1rem;\n}", [test("contains", "file name", "styles.css"), test("contains", "card selector", ".course-card"), test("contains", "padding", "padding"), test("contains", "radius", "border-radius"), test("notContains", "no inline style", "style=")], 28),
    introCssLesson("css-00-link-stylesheet", ["Relier CSS a HTML", "Link CSS to HTML"], "Memorise la relation attendue entre index.html et styles.css avant de chercher un rendu.", "/* Dans index.html : à relier à styles.css */\n.course-card {\n}", ":root {\n  --html-link-rel: rel=\"stylesheet\";\n  --html-link-href: href=\"styles.css\";\n}\n\n.course-card {\n  border: 2px solid #4f46e5;\n}", [test("contains", "link relation", "rel=\"stylesheet\""), test("contains", "href", "styles.css"), test("contains", "card selector", ".course-card"), test("contains", "border", "border"), test("notContains", "no random file", "style-final.css")], 30),
    introCssLesson("css-00-devtools-styles", ["Inspecter l'onglet Styles", "Inspect the Styles pane"], "Utilise DevTools pour vérifier quelle règle gagne vraiment dans la cascade.", ".course-card {\n  color: red;\n}\n\n.course-card {\n  /* règle finale */\n}", ":root {\n  --debug-tool: \"DevTools\";\n  --debug-pane: \"Styles\";\n}\n\n.course-card {\n  color: #1f2937;\n  background: #eef2ff;\n}", [test("contains", "devtools", "DevTools"), test("contains", "styles pane", "Styles"), test("contains", "selector", ".course-card"), test("contains", "final color", "#1f2937"), test("contains", "background", "background")], 32),
    introCssLesson("css-00-cascade-method", ["Comprendre la cascade", "Understand the cascade"], "Prends l'habitude de raisonner sur ordre, spécificité et heritage avant d'empiler des règles.", ".course-card {\n  color: #374151;\n}\n\n.hero-card.course-card {\n  /* variante */\n}", ".course-card {\n  color: #374151;\n}\n\n.hero-card.course-card {\n  color: #111827;\n  font-weight: 700;\n}", [test("contains", "base selector", ".course-card"), test("contains", "specific selector", ".hero-card.course-card"), test("contains", "color", "color"), test("contains", "weight", "font-weight"), test("notContains", "no important", "!important")], 34),
    introCssLesson("css-00-responsive-check-loop", ["Verifier mobile, desktop et focus", "Check mobile, desktop, and focus"], "Installe la boucle de validation CSS : petit écran, grand écran, contenu long et focus visible.", ".action:focus-visible {\n}\n\n@media (min-width: 760px) {\n  .course-card {\n  }\n}", ".action:focus-visible {\n  outline: 3px solid #4f46e5;\n  outline-offset: 4px;\n}\n\n@media (min-width: 760px) {\n  .course-card {\n    max-width: 42rem;\n  }\n}", [test("contains", "focus visible", ":focus-visible"), test("contains", "outline", "outline"), test("contains", "outline offset", "outline-offset"), test("contains", "media query", "@media"), test("contains", "desktop guard", "min-width")], 36),
    cssSetupQuiz(),
    cssSetupProject()
  ]),
  ...cssModulesFoundation,
  module("css-selectors", "Sélecteurs", "Selectors", [
    cssLesson("css-01-selectors", ["Selector Quest", "Selector Quest"], "Cible uniquement les cartes de cours avec la classe .course-card.", ".course-card {\n  /* ecris ici */\n}", ".course-card", ["background", "border"], 25),
    cssLesson("css-01-combinators", ["Sélecteur direct", "Direct selector"], "Cible seulement les boutons directement dans .toolbar avec le combinateur >.", ".toolbar > button {\n  /* style direct */\n}", ".toolbar > button", ["background", "border-radius"], 25),
    cssLesson("css-01-states", ["États interactifs", "Interactive states"], "Ajoute un état :focus-visible clair aux boutons pour la navigation clavier.", ".toolbar button {\n  /* style de base */\n}\n\n.toolbar button:focus-visible {\n  /* focus ici */\n}", ".toolbar button:focus-visible", ["outline", "outline-offset"], 30),
    selectorSpecificityQuiz(),
    moduleProject("css-01-selectors-project", ["Projet : sélecteurs sans effets de bord", "Project: selectors without side effects"], ["une couche de sélecteurs maintenable", "a maintainable selector layer"], ".course-card {\n}\n\n.toolbar > button {\n}\n\n.toolbar button:focus-visible {\n}\n", ".course-card {\n  background: #eef2ff;\n  border: 2px solid #4f46e5;\n}\n\n.toolbar > button {\n  border-radius: 999px;\n  padding: 0.75rem 1rem;\n}\n\n.toolbar button:focus-visible {\n  outline: 3px solid #4f46e5;\n  outline-offset: 4px;\n}", [test("contains", "card selector", ".course-card"), test("contains", "direct selector", ".toolbar > button"), test("contains", "focus visible", ":focus-visible"), test("contains", "outline", "outline"), test("contains", "border", "border")])
  ]),
  module("css-box-model", "Box model", "Box model", [
    cssLesson("css-02-box-model", ["Carte produit", "Product card"], "Transforme la carte en bloc lisible avec padding, border-radius et shadow.", ".card {\n  /* espace, coins, ombre */\n}", ".card", ["padding", "border-radius", "box-shadow"], 30),
    cssLesson("css-02-typography", ["Typographie lisible", "Readable typography"], "Améliore la lisibilite avec font-size, line-height et max-width.", ".demo-surface {\n  /* typo ici */\n}", ".demo-surface", ["font-size", "line-height", "max-width"], 25),
    cssLesson("css-02-custom-properties", ["Variables CSS", "CSS variables"], "Declare une variable --accent puis utilise-la pour colorer les cartes.", ":root {\n  /* variable ici */\n}\n\n.card {\n  /* utilise la variable */\n}", ":root", ["--accent", "background: var(--accent)"], 35),
    cssLesson("css-02-sizing", ["Tailles fluides", "Fluid sizing"], "Donne à la surface une largeur fluide avec width, max-width et margin auto.", ".demo-surface {\n  /* largeur fluide */\n}", ".demo-surface", ["width", "max-width", "margin"], 30),
    cssLesson("css-02-overflow", ["Controler le débordement", "Control overflow"], "Empeche le contenu long de casser la carte avec overflow-wrap et overflow.", ".card {\n  /* protege le layout */\n}", ".card", ["overflow", "overflow-wrap"], 30),
    moduleReviewQuiz("css-02-box-model-quiz", ["Quiz box model", "Box model quiz"], ["une carte lisible", "a readable card"], ".card", ["des débordements ou lignes trop longues", "overflow or overly long lines"]),
    moduleProject("css-02-box-model-project", ["Projet : carte robuste", "Project: robust card"], ["une carte PulsaConf stable", "a stable PulsaConf card"], ".card {\n}\n\n.demo-surface {\n}\n", ".card {\n  box-sizing: border-box;\n  padding: 1.5rem;\n  border-radius: 1rem;\n  overflow-wrap: anywhere;\n}\n\n.demo-surface {\n  max-width: 72rem;\n  margin: 0 auto;\n  line-height: 1.7;\n}", [test("contains", "box sizing", "box-sizing"), test("contains", "padding", "padding"), test("contains", "wrap", "overflow-wrap"), test("contains", "max width", "max-width"), test("contains", "line height", "line-height")])
  ]),
  module("css-flexbox", "Flexbox", "Flexbox", [
    cssLesson("css-03-flexbox", ["Flex Rescue", "Flex Rescue"], "Aligne les boutons sur une ligne avec display flex, gap et align-items.", ".toolbar {\n  /* flex ici */\n}", ".toolbar", ["display: flex", "gap", "align-items"], 35),
    cssLesson("css-03-flex-wrap", ["Wrap Lab", "Wrap Lab"], "Autorise les cartes à revenir à la ligne avec flex-wrap.", ".panel {\n  display: flex;\n  /* wrap ici */\n}", ".panel", ["display: flex", "flex-wrap", "gap"], 30),
    cssLesson("css-03-space-between", ["Navbar flex", "Navbar flex"], "Separe le logo et les actions avec justify-content: space-between.", ".toolbar {\n  display: flex;\n  /* distribution ici */\n}", ".toolbar", ["display: flex", "justify-content: space-between", "align-items"], 30),
    moduleReviewQuiz("css-03-flexbox-quiz", ["Quiz flexbox", "Flexbox quiz"], ["une toolbar responsive", "a responsive toolbar"], ".toolbar", ["des actions qui debordent ou se collent", "actions that overflow or stick together"]),
    projectLesson({
      id: "css-03-mini-project-navbar",
      title: ["Mini-projet : navbar responsive", "Mini project: responsive navbar"],
      brief: ["Construis le CSS d'une navbar qui aligne, espace et replie correctement ses actions.", "Build CSS for a navbar that aligns, spaces, and wraps its actions correctly."],
      starterCode: ".toolbar {\n}\n\n.toolbar button {\n}\n",
      solution: ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.toolbar button {\n  padding: 12px 16px;\n  border-radius: 10px;\n}",
      tests: [test("contains", "flex layout", "display: flex"), test("contains", "vertical alignment", "align-items"), test("contains", "distributed space", "justify-content"), test("contains", "wrapping", "flex-wrap"), test("contains", "spacing", "gap")],
      xp: 70
    })
  ]),
  module("css-grid", "Grid", "Grid", [
    cssLesson("css-04-grid", ["Grid Builder", "Grid Builder"], "Crée une grille responsive avec display grid, repeat et minmax.", ".gallery {\n  /* grid ici */\n}", ".gallery", ["display: grid", "repeat", "minmax"], 35),
    cssLesson("css-04-grid-gap", ["Gallery spacing", "Gallery spacing"], "Ajoute un gap clair et une grille en trois colonnes.", ".gallery {\n  /* grille fixe */\n}", ".gallery", ["display: grid", "grid-template-columns", "gap"], 30),
    cssLesson("css-04-place-items", ["Centrage grid", "Grid centering"], "Centre les éléments de la galerie avec place-items.", ".gallery {\n  display: grid;\n  /* centrage ici */\n}", ".gallery", ["display: grid", "place-items", "min-height"], 30),
    moduleReviewQuiz("css-04-grid-quiz", ["Quiz grid", "Grid quiz"], ["une galerie adaptative", "an adaptive gallery"], ".gallery", ["des colonnes rigides qui debordent", "rigid columns that overflow"]),
    moduleProject("css-04-grid-project", ["Projet : galerie adaptable", "Project: adaptive gallery"], ["une galerie PulsaConf responsive", "a responsive PulsaConf gallery"], ".gallery {\n}\n", ".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));\n  gap: 1rem;\n  place-items: center;\n}", [test("contains", "grid", "display: grid"), test("contains", "auto fit", "auto-fit"), test("contains", "minmax", "minmax"), test("contains", "gap", "gap"), test("contains", "place items", "place-items")])
  ])
];

export const cssTrackFoundationChunk = createCssTrack(foundationModules, ["foundation"]);
