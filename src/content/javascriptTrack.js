import { module, quizLesson, projectLesson, jsLesson, domLesson, test } from "./trackBuilders.js";
import { javascriptHardeningModules } from "./javascriptHardeningModules.js";
import { javascriptModules } from "./javascriptModules.js";

function jsManualQuiz(id, title, risk, proof) {
  const explanation = { fr: `La bonne réponse prouve que ${proof[0]}.`, en: `The right answer proves that ${proof[1]}.` };
  const choices = [
    { id: "proof", label: { fr: "Raisonner et vérifier l'effet", en: "Reason and verify the effect" } },
    { id: "guess", label: { fr: "Deviner au hasard", en: "Guess randomly" } },
    { id: "copy", label: { fr: "Copier sans lire", en: "Copy without reading" } }
  ];
  const prompt = { fr: `Comment éviter ${risk[0]} ?`, en: `How do you avoid ${risk[1]}?` };
  const base = quizLesson({ id, title, brief: [`Diagnostique ${title[0]}.`, `Diagnose ${title[1]}.`], question: prompt, options: choices, answer: "proof", explanation, xp: 30 });

  return {
    ...base,
    questions: [
      { id: `${id}-q1`, type: "single", prompt, choices, answer: "proof", explanation },
      { id: `${id}-q2`, type: "multiple", prompt: { fr: "Quelles preuves sont utiles ?", en: "Which evidence is useful?" }, choices: [{ id: "test", label: { fr: "Tests", en: "Tests" } }, { id: "console", label: { fr: "Console", en: "Console" } }, { id: "none", label: { fr: "Aucune", en: "None" } }], answer: ["test", "console"], explanation },
      { id: `${id}-q3`, type: "true-false", prompt: { fr: `Vrai ou faux : ${risk[0]} est sans importance.`, en: `True or false: ${risk[1]} does not matter.` }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
      { id: `${id}-q4`, type: "ordering", prompt: { fr: "Classe la méthode JS.", en: "Order the JS method." }, choices: [{ id: "read", label: { fr: "Lire", en: "Read" } }, { id: "risk", label: { fr: "Nommer", en: "Name" } }, { id: "fix", label: { fr: "Corriger", en: "Fix" } }, { id: "prove", label: { fr: "Prouver", en: "Prove" } }], answer: ["read", "risk", "fix", "prove"], explanation },
      { id: `${id}-q5`, type: "code-reading", prompt: { fr: "Que préviens-tu ici ?", en: "What are you preventing here?" }, choices: [{ id: "risk", label: { fr: risk[0], en: risk[1] } }, { id: "ok", label: { fr: "Rien", en: "Nothing" } }, { id: "delete", label: { fr: "Supprimer", en: "Delete" } }], answer: "risk", explanation },
      { id: `${id}-q6`, type: "short-open", prompt: { fr: "Quelle preuve citerais-tu ?", en: "What evidence would you cite?" }, choices: [], answer: ["console", "test", "log", "erreur"], explanation }
    ],
    passingScore: 75,
    randomizeQuestions: false
  };
}

export const javascriptTrack = {
  id: "javascript",
  label: "JavaScript",
  color: "mint",
  title: { fr: "JavaScript interactif", en: "Interactive JavaScript" },
  summary: {
    fr: "Logique, fonctions, tableaux, DOM, événements, API, localStorage et debugging.",
    en: "Logic, functions, arrays, DOM, events, APIs, localStorage, and debugging."
  },
  level: { fr: "Débutant à intermédiaire", en: "Beginner to intermediate" },
  prerequisites: { fr: ["Connaître HTML et CSS", "Être à l'aise avec l'éditeur du lab"], en: ["Know HTML and CSS", "Be comfortable with the lab editor"] },
  outcomes: {
    fr: ["Modéliser une logique avec fonctions et données", "Transformer des tableaux", "Créer des interactions DOM", "Charger et sauvegarder des données"],
    en: ["Model logic with functions and data", "Transform arrays", "Create DOM interactions", "Load and save data"]
  },
  capstone: { fr: "Dashboard de tâches persistant", en: "Persistent task dashboard" },
  profession: {
    fr: "JavaScript est le langage qui transforme une page en application. Les développeurs front-end l'utilisent pour modéliser les données, réagir aux actions, mettre à jour l'interface, communiquer avec des API et conserver l'état.",
    en: "JavaScript turns a page into an application. Front-end developers use it to model data, react to actions, update interfaces, communicate with APIs, and persist state."
  },
  certification: {
    fr: ["Valider toutes les leçons et le quiz JavaScript", "Expliquer le flux données, actions et rendu", "Livrer le compteur interactif", "Livrer un dashboard persistant avec gestion des erreurs"],
    en: ["Pass every JavaScript lesson and quiz", "Explain the data, actions, and rendering flow", "Ship the interactive counter", "Ship a persistent dashboard with error handling"]
  },
  modules: [
    ...javascriptModules,
    ...javascriptHardeningModules,
    module("js-basics", "Bases du langage", "Language basics", [
      jsLesson("js-01-variables", ["Variables et calcul", "Variables and calculation"], "Crée une constante price, une constante quantity et une constante total.", "const price = 12;\n// ajoute quantity et total", ["const quantity", "const total", "price * quantity"], 25),
      jsLesson("js-01-conditionals", ["Conditions", "Conditionals"], "Crée une fonction canStart(age) qui retourne true si age est au moins 13.", "function canStart(age) {\n  // retourne true ou false\n}", ["function canStart", "return", "age >= 13"], 30),
      jsLesson("js-01-strings-template", ["Chaînes et template literals", "Strings and template literals"], "Crée un message qui combine name et xp avec un template literal.", "const name = 'Maya';\nconst xp = 120;\n// crée message", ["const message", "`", "${name}", "${xp}"], 30),
      jsLesson("js-01-errors-console", ["Lire et produire des logs", "Read and produce logs"], "Affiche une information avec console.log et un avertissement avec console.warn.", "const lesson = 'JavaScript';\n// ajoute deux logs utiles", ["console.log", "console.warn", "lesson"], 25),
      jsManualQuiz("js-01-types-quiz", ["Quiz types", "Types quiz"], ["une erreur de type silencieuse", "a silent type error"], ["utiliser typeof pour vérifier", "use typeof to verify"]),
      projectLesson({ id: "js-01-basics-project", title: ["Projet : ticket de caisse", "Project: receipt"], brief: ["Assemble variables et conditions.", "Assemble variables and conditions."], starterCode: "const price = 10;\nconst qty = 2;\n", solution: "const price = 10;\nconst qty = 2;\nconst total = price * qty;\nconsole.log(`Total: ${total}`);", tests: [test("contains", "total", "price * qty")], xp: 90 })
    ]),
    module("js-functions", "Fonctions", "Functions", [
      jsLesson("js-02-functions", ["Function Forge", "Function Forge"], "Complète une fonction getLevel(score) qui retourne Starter, Builder ou Pre-junior.", "function getLevel(score) {\n  // if score < 100 -> Starter\n  // if score < 500 -> Builder\n  // sinon -> Pre-junior\n}", ["function getLevel", "return", "Starter", "Builder", "Pre-junior"], 35),
      jsLesson("js-02-parameters", ["Paramètres", "Parameters"], "Crée une fonction makeBadge(name, xp) qui retourne une phrase avec le nom et l'XP.", "function makeBadge(name, xp) {\n  // retourne une phrase\n}", ["function makeBadge", "name", "xp", "return"], 30),
      jsLesson("js-02-default-parameters", ["Paramètres par défaut", "Default parameters"], "Crée greet(name = 'apprenant') pour toujours retourner un message valide.", "function greet(name = 'apprenant') {\n  // message ici\n}", ["function greet", "=", "return"], 30),
      jsManualQuiz("js-02-functions-quiz", ["Quiz fonctions", "Functions quiz"], ["une fonction avec effet de bord", "a function with side effects"], ["utiliser return", "use return"]),
      projectLesson({ id: "js-02-mini-project", title: ["Mini-projet : module de score", "Mini project: score module"], brief: ["Assemble les fonctions dans un petit module d'évaluation.", "Assemble functions in a small evaluation module."], starterCode: "function evaluate(score) {\n}\n", solution: "function evaluate(score = 0) {\n  if (score < 50) return 'Fail';\n  return 'Pass';\n}\nconsole.log(evaluate(60));", tests: [test("contains", "evaluate logic", "function evaluate"), test("contains", "return", "return")], xp: 80 })
    ]),
    module("js-arrays", "Tableaux", "Arrays", [
      jsLesson("js-03-arrays", ["Catalogue filtrable", "Filterable catalog"], "Utilise filter pour garder les cours dont track vaut 'html'.", "const courses = [{ track: 'html' }, { track: 'css' }];\nconst htmlCourses = courses", [".filter", "track", "html"], 35),
      jsLesson("js-03-map", ["Transformer une liste", "Transform a list"], "Utilise map pour extraire les titres des cours.", "const courses = [{ title: 'HTML' }, { title: 'CSS' }];\nconst titles = courses", [".map", "title"], 30),
      jsLesson("js-03-filter-manual", ["Filtrer une liste", "Filter a list"], "Utilise filter pour garder les cours passés.", "const courses = [{ passed: true }, { passed: false }];\nconst passed = courses.filter((course) => course.passed);", [".filter", "passed"], 30),
      jsManualQuiz("js-03-arrays-quiz", ["Quiz tableaux", "Arrays quiz"], ["une mutation inattendue", "an unexpected mutation"], ["utiliser map ou filter", "use map or filter"]),
      projectLesson({ id: "js-03-arrays-project", title: ["Projet : gestion de liste", "Project: list management"], brief: ["Filtre et transforme une liste.", "Filter and transform a list."], starterCode: "const data = [];", solution: "const data = [1, 2, 3];\nconst doubled = data.map((n) => n * 2);", tests: [test("contains", "map", ".map")], xp: 90 })
    ]),
    module("js-dom-events", "DOM et événements", "DOM and events", [
      domLesson("js-04-dom-select-manual", ["Sélectionner le DOM", "Select the DOM"], "Utilise querySelector pour récupérer #app.", "const app = document.querySelector('#app');", ["document.querySelector", "'#app'"], 25),
      domLesson("js-04-events-manual", ["Écouter un clic", "Listen to a click"], "Ajoute un événement click sur le bouton pour afficher 'Hello'.", "const btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  console.log('Hello');\n});", ["btn.addEventListener", "'click'", "console.log"], 30),
      domLesson("js-04-update-dom-manual", ["Mettre à jour le DOM", "Update the DOM"], "Change le textContent de l'élément cible.", "const title = document.querySelector('h1');\ntitle.textContent = 'PulsaTeach';", ["title.textContent"], 30),
      jsManualQuiz("js-04-dom-quiz", ["Quiz DOM", "DOM quiz"], ["une sélection invalide", "an invalid selection"], ["vérifier l'élément avant", "verify the element first"]),
      projectLesson({ id: "js-04-dom-project", title: ["Projet : compteur", "Project: counter"], brief: ["Crée un compteur cliquable.", "Create a clickable counter."], starterCode: "const btn = document.querySelector('button');", solution: "let count = 0;\nconst btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  count++;\n  btn.textContent = count;\n});", tests: [test("contains", "event listener", "addEventListener")], xp: 90 })
    ]),
    module("js-storage-async", "Données asynchrones", "Async data", [
      jsLesson("js-05-json-parse-manual", ["JSON.parse", "JSON.parse"], "Convertis une chaîne JSON en objet JavaScript.", "const raw = '{\"theme\":\"dark\"}';\nconst config = JSON.parse(raw);", ["JSON.parse", "raw"], 25),
      jsLesson("js-05-localstorage-manual", ["localStorage", "localStorage"], "Sauvegarde config avec setItem, puis lis-la avec getItem.", "const config = { theme: 'dark' };\nlocalStorage.setItem('config', JSON.stringify(config));\nconst savedConfig = localStorage.getItem('config');", ["localStorage.setItem", "JSON.stringify", "localStorage.getItem"], 35),
      jsLesson("js-05-fetch-manual", ["Appel API fetch", "API fetch call"], "Utilise async/await pour récupérer des données depuis /api/data.", "async function loadData() {\n  const response = await fetch('/api/data');\n  return response.json();\n}", ["async", "await fetch", "response.json"], 40),
      jsManualQuiz("js-05-async-quiz", ["Quiz Async", "Async quiz"], ["une promesse non gérée", "an unhandled promise"], ["utiliser await et try/catch", "use await and try/catch"]),
      projectLesson({ id: "js-05-final-project", title: ["Projet final : Load & Save", "Final project: Load & Save"], brief: ["Charge des données depuis localStorage, sinon depuis l'API.", "Load data from localStorage, otherwise from the API."], starterCode: "async function init() {\n}\n", solution: "async function init() {\n  let data = localStorage.getItem('data');\n  if (!data) {\n    const res = await fetch('/api/data');\n    data = await res.json();\n    localStorage.setItem('data', JSON.stringify(data));\n  }\n  return data;\n}", tests: [test("contains", "getItem", "localStorage.getItem"), test("contains", "fetch", "await fetch")], xp: 120 })
    ])
  ]
};

const manualLessonContexts = {
  "js-01-basics-project": ["Assembler un ticket de caisse force à relier valeur source, calcul et message observable.", "Afficher un total sans garder les valeurs sources rend le calcul impossible à vérifier."],
  "js-02-functions-quiz": ["Ce quiz vérifie que la fonction reste une unité testable avec une entrée et une sortie.", "Confondre console.log et return masque le résultat réel de la fonction."],
  "js-02-mini-project": ["Le module de score transforme une règle métier courte en fonction robuste et réutilisable.", "Coder seulement le cas qui passe oublie les valeurs limites et les appels sans argument."],
  "js-03-filter-manual": ["Filtrer une collection apprend à sélectionner sans modifier la liste d'origine.", "Réécrire le tableau à la main cache la condition et rend le résultat fragile."],
  "js-03-arrays-quiz": ["Ce quiz distingue transformation, sélection et mutation dans une collection JavaScript.", "Utiliser push ou splice par réflexe modifie l'état avant d'avoir choisi l'intention."],
  "js-03-arrays-project": ["Le projet de liste combine une source lisible et une transformation vérifiable.", "Mélanger données, transformation et affichage empêche de savoir quelle étape échoue."],
  "js-04-dom-select-manual": ["Sélectionner le DOM crée le pont minimal entre le document HTML et la logique JavaScript.", "Supposer qu'un élément existe sans le sélectionner rend l'erreur difficile à localiser."],
  "js-04-events-manual": ["Un événement click relie une action utilisateur à une réaction contrôlée du programme.", "Appeler la fonction immédiatement au lieu de l'attacher au clic supprime l'interaction."],
  "js-04-update-dom-manual": ["Mettre à jour textContent montre comment synchroniser une valeur JavaScript avec l'interface.", "Changer une variable sans changer le DOM donne une interface figée."],
  "js-04-dom-quiz": ["Ce quiz vérifie la chaîne sélectionner, écouter, modifier qui structure une interaction DOM.", "Ajouter du HTML au hasard ne remplace pas une sélection ciblée et testable."],
  "js-04-dom-project": ["Le compteur cliquable concentre état, événement et rendu dans un livrable observable.", "Modifier le texte du bouton sans état rend les prochains comportements impossibles à maîtriser."],
  "js-05-json-parse-manual": ["JSON.parse transforme une chaîne reçue ou stockée en objet exploitable par l'application.", "Lire une chaîne comme si c'était déjà un objet provoque des accès de propriété faux."],
  "js-05-localstorage-manual": ["localStorage permet de conserver une préférence locale entre deux chargements de page.", "Stocker directement un objet sans JSON.stringify produit une valeur inutilisable."],
  "js-05-fetch-manual": ["fetch introduit le temps réseau : la donnée arrive plus tard et doit être attendue.", "Oublier await fait manipuler une promesse au lieu de la réponse réelle."],
  "js-05-async-quiz": ["Ce quiz vérifie la différence entre promesse, réponse HTTP et données JSON finales.", "Traiter tous les échecs réseau comme des succès masque les erreurs utilisateur."],
  "js-05-final-project": ["Load & Save assemble cache local et appel API pour démarrer vite sans perdre les données.", "Appeler l'API avant de vérifier le stockage rend l'application plus lente et moins fiable."
  ]
};

for (const lesson of javascriptTrack.modules.flatMap((item) => item.lessons)) {
  const context = manualLessonContexts[lesson.id];
  if (!context) continue;
  lesson.course = {
    ...lesson.course,
    fr: { ...lesson.course.fr, introduction: context[0] }
  };
  lesson.guide = {
    ...lesson.guide,
    fr: { ...lesson.guide.fr, mistakes: [context[1], ...(lesson.guide.fr?.mistakes || []).slice(1)] }
  };
}
