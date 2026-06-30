import { module, quizLesson, projectLesson, jsLesson, domLesson, test } from "./legacyTrackBuilders.js";
import { javascriptV9Modules } from "./legacyJavaScriptV9Modules.js";

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
      ...javascriptV9Modules,
      module("js-basics", "Bases du langage", "Language basics", [
        jsLesson("js-01-variables", ["Variables et calcul", "Variables and calculation"], "Crée une constante price, une constante quantity et une constante total.", "const price = 12;\n// ajoute quantity et total", ["const quantity", "const total", "price * quantity"], 25),
        jsLesson("js-01-conditionals", ["Conditions", "Conditionals"], "Crée une fonction canStart(age) qui retourne true si age est au moins 13.", "function canStart(age) {\n  // retourne true ou false\n}", ["function canStart", "return", "age >= 13"], 30),
        jsLesson("js-01-strings-template", ["Chaînes et template literals", "Strings and template literals"], "Crée un message qui combine name et xp avec un template literal.", "const name = 'Maya';\nconst xp = 120;\n// crée message", ["const message", "`", "${name}", "${xp}"], 30),
        jsLesson("js-01-errors-console", ["Lire et produire des logs", "Read and produce logs"], "Affiche une information avec console.log et un avertissement avec console.warn.", "const lesson = 'JavaScript';\n// ajoute deux logs utiles", ["console.log", "console.warn", "lesson"], 25),
        quizLesson({
          id: "js-01-types-quiz",
          title: ["Quiz types", "Types quiz"],
          brief: ["Identifie le type JavaScript d'une valeur.", "Identify the JavaScript type of a value."],
          question: { fr: "Quel est le type de true ?", en: "What is the type of true?" },
          options: [
            { id: "string", label: { fr: "string", en: "string" } },
            { id: "number", label: { fr: "number", en: "number" } },
            { id: "boolean", label: { fr: "boolean", en: "boolean" } }
          ],
          answer: "boolean",
          explanation: { fr: "true et false sont des booléens.", en: "true and false are booleans." },
          xp: 15
        })
      ]),
      module("js-functions", "Fonctions", "Functions", [
        jsLesson("js-02-functions", ["Function Forge", "Function Forge"], "Complète une fonction getLevel(score) qui retourne Starter, Builder ou Pre-junior.", "function getLevel(score) {\n  // if score < 100 -> Starter\n  // if score < 500 -> Builder\n  // sinon -> Pre-junior\n}", ["function getLevel", "return", "Starter", "Builder", "Pre-junior"], 35),
        jsLesson("js-02-parameters", ["Paramètres", "Parameters"], "Crée une fonction makeBadge(name, xp) qui retourne une phrase avec le nom et l'XP.", "function makeBadge(name, xp) {\n  // retourne une phrase\n}", ["function makeBadge", "name", "xp", "return"], 30),
        jsLesson("js-02-default-parameters", ["Paramètres par défaut", "Default parameters"], "Crée greet(name = 'apprenant') pour toujours retourner un message valide.", "function greet(name) {\n  // message ici\n}", ["function greet", "=", "return"], 30),
        jsLesson("js-02-object-method", ["Méthode d'objet", "Object method"], "Ajoute une méthode complete à lesson qui passe done à true.", "const lesson = {\n  title: 'Fonctions',\n  done: false\n  // méthode ici\n};", ["complete", "this.done", "true"], 35)
      ]),
      module("js-arrays", "Tableaux et objets", "Arrays and objects", [
        jsLesson("js-03-arrays", ["Catalogue filtrable", "Filterable catalog"], "Utilise filter pour garder les cours dont track vaut 'html'.", "const courses = [{ track: 'html' }, { track: 'css' }];\nconst htmlCourses = courses", [".filter", "track", "html"], 35),
        jsLesson("js-03-map", ["Transformer une liste", "Transform a list"], "Utilise map pour extraire les titres des cours.", "const courses = [{ title: 'HTML' }, { title: 'CSS' }];\nconst titles = courses", [".map", "title"], 30),
        jsLesson("js-03-reduce-xp", ["Additionner l'XP", "Sum XP"], "Utilise reduce pour calculer totalXp depuis une liste de leçons.", "const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];\nconst totalXp = lessons", [".reduce", "xp", "totalXp"], 40),
        jsLesson("js-03-find", ["Trouver un élément", "Find an item"], "Utilise find pour récupérer le cours dont l'id vaut css.", "const courses = [{ id: 'html' }, { id: 'css' }, { id: 'js' }];\nconst cssCourse = courses", [".find", "id", "css"], 35),
        jsLesson("js-03-some", ["Vérifier une collection", "Check a collection"], "Utilise some pour savoir si au moins une leçon est terminée.", "const lessons = [{ done: false }, { done: true }];\nconst hasCompleted = lessons", [".some", "done", "hasCompleted"], 35)
      ]),
      module("js-dom-events", "DOM et événements", "DOM and events", [
        domLesson("js-04-dom-events", ["Bouton compteur", "Counter button"], "Sélectionne #count et augmente son texte quand #plus est cliqué.", `<button id="plus">+1</button>
<span id="count">0</span>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "textContent"], 40),
        domLesson("js-04-class-toggle", ["Toggle de classe", "Class toggle"], "Au clic sur #toggle, ajoute ou retire la classe active sur .card.", `<button id="toggle">Toggle</button>
<article class="card">Carte</article>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "classList.toggle"], 40),
        domLesson("js-04-form-submit", ["Intercepter un formulaire", "Handle form submission"], "Intercepte submit, empêche le rechargement et lis la valeur du champ #task.", `<form id="task-form"><input id="task" /><button>Ajouter</button></form>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "submit", "preventDefault", ".value"], 45),
        projectLesson({
          id: "js-04-mini-project-counter",
          title: ["Mini-projet : compteur interactif", "Mini project: interactive counter"],
          brief: ["Crée la logique d'un compteur avec état, incrémentation, décrémentation et rendu.", "Create counter logic with state, increment, decrement, and rendering."],
          starterCode: "let count = 0;\n\nfunction render() {\n}\n\nfunction increment() {\n}\n\nfunction decrement() {\n}\n",
          solution: "let count = 0;\n\nfunction render() {\n  document.querySelector('#count').textContent = count;\n}\n\nfunction increment() {\n  count += 1;\n  render();\n}\n\nfunction decrement() {\n  count -= 1;\n  render();\n}",
          tests: [test("contains", "state", "let count"), test("contains", "render function", "function render"), test("contains", "increment function", "function increment"), test("contains", "decrement function", "function decrement"), test("contains", "DOM update", "textContent")],
          xp: 75
        })
      ]),
      module("js-storage-async", "API, stockage, debug", "API, storage, debug", [
        jsLesson("js-05-storage", ["Sauvegarde locale", "Local save"], "Sauvegarde le thème 'happy' dans localStorage avec la clé pulsa-theme.", "const theme = 'happy';\n// sauvegarde ici", ["localStorage.setItem", "pulsa-theme", "theme"], 30),
        jsLesson("js-05-json-settings", ["JSON settings", "JSON settings"], "Transforme settings en JSON puis relis-le dans parsedSettings.", "const settings = { theme: 'happy', minutes: 30 };\n// stringify puis parse", ["JSON.stringify", "JSON.parse", "parsedSettings"], 35),
        jsLesson("js-06-fetch", ["Fetch mental model", "Fetch mental model"], "Écris une fonction async loadCourses qui appelle fetch('/api/courses') puis response.json().", "async function loadCourses() {\n  // fetch ici\n}", ["async function", "await fetch", "response.json"], 40),
        jsLesson("js-06-fetch-errors", ["Gérer les erreurs réseau", "Handle network errors"], "Entoure un appel fetch avec try/catch et vérifie response.ok.", "async function loadProfile() {\n  // appel robuste ici\n}", ["try", "catch", "await fetch", "response.ok", "throw"], 45),
        projectLesson({
          id: "js-07-final-project",
          title: ["Projet dashboard", "Dashboard project"],
          brief: ["Construis le moteur complet d'un dashboard de tâches : chargement, ajout validé, complétion, suppression, rendu et persistance.", "Build the complete task dashboard engine: loading, validated creation, completion, deletion, rendering, and persistence."],
          starterCode: `const state = {
  tasks: [],
  nextId: 1
};

function load() {
}

function save() {
}

function render() {
}

function addTask(title) {
}

function toggleTask(id) {
}

function removeTask(id) {
}

load();
render();`,
          solution: `const state = {
  tasks: [],
  nextId: 1
};

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem('pulsa-dashboard') || 'null');
    if (saved && Array.isArray(saved.tasks)) {
      state.tasks = saved.tasks;
      state.nextId = saved.nextId || 1;
    }
  } catch {
    state.tasks = [];
    state.nextId = 1;
  }
}

function save() {
  localStorage.setItem('pulsa-dashboard', JSON.stringify(state));
}

function render() {
  console.log(state.tasks);
}

function addTask(title) {
  const cleanTitle = title.trim();
  if (!cleanTitle) return false;
  state.tasks.push({ id: state.nextId++, title: cleanTitle, done: false });
  save();
  render();
  return true;
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return false;
  task.done = !task.done;
  save();
  render();
  return true;
}

function removeTask(id) {
  const index = state.tasks.findIndex((item) => item.id === id);
  if (index === -1) return false;
  state.tasks.splice(index, 1);
  save();
  render();
  return true;
}

load();
render();`,
          tests: [
            test("contains", "L'état central est déclaré", "const state"),
            test("contains", "Le dashboard peut restaurer une sauvegarde", "function load"),
            test("contains", "Le dashboard possède une fonction de rendu", "function render"),
            test("contains", "Les modifications sont persistées", "localStorage.setItem"),
            test("jsExpression", "Une tâche valide peut être ajoutée", "addTask('Réviser JavaScript'); return state.tasks.length === 1 && state.tasks[0].title === 'Réviser JavaScript';"),
            test("jsExpression", "Une tâche vide est refusée", "return addTask('   ') === false && state.tasks.length === 0;"),
            test("jsExpression", "Une tâche peut être marquée comme terminée", "addTask('Tester'); const id = state.tasks[0].id; toggleTask(id); return state.tasks[0].done === true;"),
            test("jsExpression", "Une tâche peut être supprimée", "addTask('Supprimer'); removeTask(state.tasks[0].id); return state.tasks.length === 0;"),
            test("jsExpression", "L'état complet est réellement sauvegardé", "addTask('Persister'); return JSON.parse(localStorage.getItem('pulsa-dashboard')).tasks.length === 1;")
          ],
          xp: 100
        })
      ])
    ]
  };
