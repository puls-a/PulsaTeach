import { jsModuleProfile } from "./jsModuleProfiles.js";
import { getPedagogy } from "./pedagogy.js";
import { javascriptFunctionsScopeModule } from "./javascriptFunctionsScopeModule.js";

const moduleSpecs = [
  ["js-variables-strings", ["Variables, types et chaînes", "Variables, types, and strings"], "Nommer les données, produire des messages et observer l’exécution.", "Name data, produce messages, and observe execution.", [
    ["runtime-map", "Carte runtime", "Runtime map", "Déclare language, runtime et purpose pour décrire JavaScript.", "Declare language, runtime, and purpose to describe JavaScript.", "const language = 'JavaScript';\nconst runtime = 'browser';\nconst purpose = `${language} runs in the ${runtime}`;", ["const language", "const runtime", "purpose"]],
    ["type-tags", "Étiquettes de types", "Type tags", "Crée trois valeurs et vérifie leurs types avec typeof.", "Create three values and inspect their types with typeof.", "const title = 'Pulsa';\nconst lessons = 8;\nconst published = true;\nconst titleType = typeof title;\nconst lessonsType = typeof lessons;", ["typeof", "titleType", "lessonsType"]],
    ["safe-names", "Noms lisibles", "Readable names", "Renomme des valeurs métier pour qu’elles racontent leur rôle.", "Rename domain values so they explain their role.", "const learnerName = 'Maya';\nconst completedLessons = 3;\nconst dailyGoalMinutes = 25;", ["learnerName", "completedLessons", "dailyGoalMinutes"]],
    ["let-const-contract", "Contrat let/const", "let/const contract", "Utilise const pour la configuration et let pour l’état qui change.", "Use const for configuration and let for state that changes.", "const dailyTarget = 4;\nlet completedToday = 0;\ncompletedToday += 1;", ["const dailyTarget", "let completedToday", "+= 1"]],
    ["string-ticket", "Ticket texte", "Text ticket", "Assemble un ticket de progression avec concaténation.", "Assemble a progress ticket with concatenation.", "const track = 'JS';\nconst level = 'starter';\nconst ticket = track + ' / ' + level;", ["const ticket", "+", "track"]],
    ["template-badge", "Badge template", "Template badge", "Crée un badge avec template literal et interpolation.", "Create a badge with a template literal and interpolation.", "const name = 'Noa';\nconst xp = 140;\nconst badge = `${name} · ${xp} XP`;", ["const badge", "`", "${xp}"]],
    ["console-signals", "Signaux console", "Console signals", "Affiche une info, un avertissement et une erreur contrôlée.", "Log info, warning, and a controlled error.", "console.log('lesson loaded');\nconsole.warn('check the edge case');\nconsole.error('demo error');", ["console.log", "console.warn", "console.error"]],
    ["comment-intent", "Commentaire utile", "Useful comment", "Ajoute un commentaire qui explique l’intention, pas l’évidence.", "Add a comment that explains intent, not the obvious.", "// Keep this value stable so certificates remain comparable.\nconst certificateVersion = '2026.06';", ["certificateVersion", "2026.06", "const"]]
  ]],
  ["js-booleans-numbers", ["Booléens, nombres et décisions", "Booleans, numbers, and decisions"], "Transformer une règle en calcul, comparaison puis décision.", "Turn a rule into calculation, comparison, then decision.", [
    ["number-score", "Score numérique", "Numeric score", "Calcule un score depuis bonnes réponses et bonus.", "Compute a score from correct answers and bonus.", "const correctAnswers = 7;\nconst bonus = 3;\nconst score = correctAnswers * 10 + bonus;", ["correctAnswers", "* 10", "score"]],
    ["modulo-review", "Rythme modulo", "Modulo rhythm", "Utilise % pour savoir si une révision tombe aujourd’hui.", "Use % to decide if a review lands today.", "const day = 14;\nconst shouldReview = day % 2 === 0;", ["%", "shouldReview", "=== 0"]],
    ["boolean-gate", "Porte booléenne", "Boolean gate", "Combine deux conditions pour autoriser un examen.", "Combine two conditions to allow an exam.", "const lessonsDone = true;\nconst projectPassed = true;\nconst canTakeExam = lessonsDone && projectPassed;", ["&&", "canTakeExam", "projectPassed"]],
    ["comparison-threshold", "Seuil de réussite", "Passing threshold", "Compare un score avec un seuil inclusif.", "Compare a score with an inclusive threshold.", "const percent = 72;\nconst passed = percent >= 70;", [">= 70", "passed", "percent"]],
    ["if-feedback", "Feedback if", "if feedback", "Retourne un message selon la réussite.", "Return a message based on success.", "const passed = true;\nlet feedback = '';\nif (passed) {\n  feedback = 'passed';\n} else {\n  feedback = 'retry';\n}", ["if", "else", "feedback"]],
    ["ternary-label", "Label ternaire", "Ternary label", "Utilise un ternaire pour choisir un libellé court.", "Use a ternary to choose a short label.", "const streak = 5;\nconst label = streak > 0 ? 'active' : 'new';", ["?", ":", "label"]],
    ["switch-track", "Aiguillage switch", "Switch routing", "Utilise switch pour choisir une couleur de parcours.", "Use switch to choose a track color.", "const track = 'javascript';\nlet color;\nswitch (track) {\n  case 'javascript': color = 'mint'; break;\n  default: color = 'slate';\n}", ["switch", "case", "default"]],
    ["truthy-empty", "Valeur vide", "Empty value", "Normalise un titre vide avant validation.", "Normalize an empty title before validation.", "const rawTitle = '  ';\nconst cleanTitle = rawTitle.trim();\nconst isValid = Boolean(cleanTitle);", ["trim", "Boolean", "isValid"]]
  ]],
  ["js-functions-scope", ["Fonctions et portée", "Functions and scope"], "Isoler une règle dans une fonction testable.", "Isolate a rule inside a testable function.", [
    ["declare-function", "Déclarer une fonction", "Declare a function", "Crée une fonction getWelcome qui retourne un message.", "Create a getWelcome function returning a message.", "function getWelcome() {\n  return 'Welcome to JS';\n}", ["function getWelcome", "return", "Welcome"]],
    ["parameter-message", "Paramètre utile", "Useful parameter", "Utilise un paramètre name dans une phrase.", "Use a name parameter in a sentence.", "function greetLearner(name) {\n  return `Hello ${name}`;\n}", ["name", "return", "${name}"]],
    ["default-goal", "Valeur par défaut", "Default value", "Prévois une durée par défaut pour une session.", "Provide a default duration for a session.", "function planSession(minutes = 25) {\n  return minutes;\n}", ["minutes = 25", "function", "return"]],
    ["multi-return", "Retours multiples", "Multiple returns", "Sors tôt si une valeur est invalide.", "Return early if a value is invalid.", "function normalizeTitle(title) {\n  if (!title.trim()) return null;\n  return title.trim();\n}", ["if", "return null", "trim"]],
    ["scope-counter", "Portée locale", "Local scope", "Garde un compteur local dans une fonction.", "Keep a local counter inside a function.", "function countPair() {\n  const first = 1;\n  const second = 2;\n  return first + second;\n}", ["const first", "const second", "return first + second"]],
    ["arrow-transform", "Fonction fléchée", "Arrow function", "Transforme un titre avec une fonction fléchée.", "Transform a title with an arrow function.", "const shout = (title) => title.toUpperCase();", ["=>", "toUpperCase", "const shout"]],
    ["callback-filter", "Callback simple", "Simple callback", "Passe une fonction à filter pour garder les scores valides.", "Pass a function to filter valid scores.", "const scores = [20, 80, 100];\nconst validScores = scores.filter((score) => score >= 70);", ["filter", "=>", "score >= 70"]],
    ["pure-helper", "Helper pur", "Pure helper", "Crée une fonction qui ne modifie pas l’entrée.", "Create a function that does not mutate its input.", "function addXp(currentXp, earnedXp) {\n  return currentXp + earnedXp;\n}", ["function addXp", "currentXp", "earnedXp"]]
  ]],
  ["js-collections-loops", ["Collections et boucles", "Collections and loops"], "Lire, transformer et résumer des données d’application.", "Read, transform, and summarize app data.", [
    ["array-create", "Créer un tableau", "Create an array", "Déclare une liste de parcours.", "Declare a list of tracks.", "const tracks = ['html', 'css', 'javascript'];", ["const tracks", "[", "javascript"]],
    ["array-push", "Ajouter sans mystère", "Add clearly", "Ajoute une tâche puis lis la longueur.", "Add a task then read the length.", "const tasks = [];\ntasks.push('review');\nconst count = tasks.length;", ["push", "length", "count"]],
    ["object-card", "Objet carte", "Card object", "Décris une leçon avec un objet.", "Describe a lesson with an object.", "const lesson = { id: 'js-v9', title: 'Collections', xp: 40 };", ["id", "title", "xp"]],
    ["for-of-total", "Somme for-of", "for-of sum", "Additionne des XP avec for...of.", "Sum XP with for...of.", "const points = [10, 20, 30];\nlet total = 0;\nfor (const point of points) {\n  total += point;\n}", ["for (const", "of points", "total +="]],
    ["map-labels", "Map labels", "Map labels", "Transforme des objets en libellés.", "Transform objects into labels.", "const lessons = [{ title: 'DOM' }, { title: 'Fetch' }];\nconst labels = lessons.map((lesson) => lesson.title);", ["map", "lesson.title", "labels"]],
    ["filter-open", "Filtrer ouvert", "Filter open", "Garde les tickets non terminés.", "Keep unfinished tickets.", "const tickets = [{ done: false }, { done: true }];\nconst openTickets = tickets.filter((ticket) => !ticket.done);", ["filter", "!ticket.done", "openTickets"]],
    ["reduce-minutes", "Total minutes", "Total minutes", "Calcule une durée totale avec reduce.", "Compute total duration with reduce.", "const blocks = [{ minutes: 15 }, { minutes: 25 }];\nconst totalMinutes = blocks.reduce((sum, block) => sum + block.minutes, 0);", ["reduce", "sum + block.minutes", "totalMinutes"]],
    ["destructure-user", "Destructurer", "Destructure", "Extrais name et role depuis un profil.", "Extract name and role from a profile.", "const profile = { name: 'Lina', role: 'mentor' };\nconst { name, role } = profile;", ["const { name, role }", "profile", "mentor"]]
  ]],
  ["js-dom-forms", ["DOM, événements et formulaires", "DOM, events, and forms"], "Relier état, interface et actions utilisateur.", "Connect state, interface, and user actions.", [
    ["select-title", "Sélection DOM", "DOM selection", "Sélectionne un titre et change son texte.", "Select a heading and change its text.", "const title = document.querySelector('#title');\ntitle.textContent = 'PulsaTeach JS';", ["querySelector", "textContent", "#title"]],
    ["click-count", "Clic compteur", "Click counter", "Augmente un état au clic.", "Increase state on click.", "let count = 0;\ndocument.querySelector('#plus').addEventListener('click', () => {\n  count += 1;\n});", ["addEventListener", "click", "count +="]],
    ["render-list", "Rendu de liste", "List render", "Rends une liste avec innerHTML depuis un tableau.", "Render a list with innerHTML from an array.", "const items = ['HTML', 'CSS'];\nconst list = document.querySelector('#list');\nlist.innerHTML = items.map((item) => `<li>${item}</li>`).join('');", ["innerHTML", "map", "join"]],
    ["form-prevent", "Submit contrôlé", "Controlled submit", "Empêche le rechargement d’un formulaire.", "Prevent a form reload.", "const form = document.querySelector('#form');\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n});", ["submit", "preventDefault", "form"]],
    ["input-value", "Lire input", "Read input", "Lis et nettoie une valeur de champ.", "Read and clean an input value.", "const field = document.querySelector('#task');\nconst value = field.value.trim();", ["field.value", "trim", "#task"]],
    ["status-region", "Statut accessible", "Accessible status", "Écris un message dans une région de statut.", "Write a message into a status region.", "const status = document.querySelector('[role=\"status\"]');\nstatus.textContent = 'Task added';", ["role=\"status\"", "textContent", "status"]],
    ["toggle-invalid", "Classe d’erreur", "Error class", "Bascule une classe selon la validité.", "Toggle a class based on validity.", "const input = document.querySelector('#email');\ninput.classList.toggle('is-invalid', !input.value.includes('@'));", ["classList.toggle", "is-invalid", "includes"]],
    ["delegation", "Délégation", "Delegation", "Utilise closest pour gérer un bouton dans une liste.", "Use closest to handle a button inside a list.", "document.querySelector('#tasks').addEventListener('click', (event) => {\n  const button = event.target.closest('button');\n});", ["closest", "event.target", "#tasks"]]
  ]],
  ["js-strings-regex-errors", ["Strings avancées, regex et erreurs", "Advanced strings, regex, and errors"], "Nettoyer, rechercher et protéger les entrées.", "Clean, search, and protect inputs.", [
    ["slice-code", "Extraire segment", "Slice segment", "Extrait un préfixe de certificat.", "Extract a certificate prefix.", "const code = 'JS-2026-ALPHA';\nconst prefix = code.slice(0, 2);", ["slice", "prefix", "0, 2"]],
    ["includes-keyword", "Contient mot-clé", "Includes keyword", "Vérifie si une note mentionne async.", "Check whether a note mentions async.", "const note = 'review async and fetch';\nconst hasAsync = note.includes('async');", ["includes", "hasAsync", "async"]],
    ["replace-label", "Remplacer label", "Replace label", "Remplace un libellé interne par un label public.", "Replace an internal label with a public label.", "const raw = 'js-v9 draft';\nconst label = raw.replace('draft', 'published');", ["replace", "label", "published"]],
    ["regex-email", "Regex email", "Email regex", "Teste un email simple avec une regex.", "Test a simple email with a regex.", "const email = 'maya@pulsa.dev';\nconst isEmail = /@/.test(email);", ["/@/", "test", "isEmail"]],
    ["match-tags", "Match tags", "Match tags", "Récupère les hashtags d’une note.", "Extract hashtags from a note.", "const text = '#js #dom';\nconst tags = text.match(/#[a-z]+/g);", ["match", "/#[a-z]+/g", "tags"]],
    ["date-stamp", "Date stamp", "Date stamp", "Crée une date ISO pour un événement.", "Create an ISO date for an event.", "const now = new Date('2026-06-30');\nconst stamp = now.toISOString();", ["new Date", "toISOString", "stamp"]],
    ["throw-error", "Erreur explicite", "Explicit error", "Lance une erreur si le titre est vide.", "Throw if the title is empty.", "function requireTitle(title) {\n  if (!title.trim()) throw new Error('Title required');\n  return title;\n}", ["throw new Error", "trim", "return title"]],
    ["try-parse", "Parse protégé", "Safe parse", "Protège JSON.parse avec try/catch.", "Protect JSON.parse with try/catch.", "function safeParse(value) {\n  try { return JSON.parse(value); }\n  catch { return null; }\n}", ["try", "catch", "JSON.parse"]]
  ]],
  ["js-async-fetch", ["Async, fetch et états réseau", "Async, fetch, and network states"], "Charger des données sans bloquer l’interface.", "Load data without blocking the interface.", [
    ["promise-model", "Modèle Promise", "Promise model", "Retourne une Promise résolue pour simuler une API.", "Return a resolved Promise to simulate an API.", "function loadMock() {\n  return Promise.resolve(['lesson']);\n}", ["Promise.resolve", "function loadMock", "return"]],
    ["async-loader", "Fonction async", "Async function", "Crée une fonction async qui retourne des cours.", "Create an async function returning courses.", "async function loadCourses() {\n  return ['HTML', 'JS'];\n}", ["async function", "return", "loadCourses"]],
    ["await-fetch", "Fetch attendu", "Await fetch", "Appelle fetch et attends la réponse.", "Call fetch and await the response.", "async function requestCatalog() {\n  const response = await fetch('/api/catalog');\n  return response;\n}", ["await fetch", "response", "/api/catalog"]],
    ["json-body", "Corps JSON", "JSON body", "Lis le corps JSON d’une réponse.", "Read a response JSON body.", "async function readJson(response) {\n  const data = await response.json();\n  return data;\n}", ["response.json", "await", "data"]],
    ["http-ok", "Statut HTTP", "HTTP status", "Vérifie response.ok avant de lire les données.", "Check response.ok before reading data.", "async function ensureOk(response) {\n  if (!response.ok) throw new Error('HTTP error');\n  return response.json();\n}", ["response.ok", "throw new Error", "response.json"]],
    ["loading-state", "État loading", "Loading state", "Sépare loading, data et error dans un état.", "Separate loading, data, and error in state.", "const state = { loading: true, data: null, error: null };\nstate.loading = false;", ["loading", "data", "error"]],
    ["try-fetch", "Fetch robuste", "Robust fetch", "Entoure fetch avec try/catch.", "Wrap fetch with try/catch.", "async function safeLoad() {\n  try { return await fetch('/api/profile'); }\n  catch (error) { return null; }\n}", ["try", "catch", "await fetch"]],
    ["finally-cleanup", "Finally cleanup", "Finally cleanup", "Utilise finally pour arrêter le chargement.", "Use finally to stop loading.", "let loading = true;\ntry { console.log('load'); }\nfinally { loading = false; }", ["finally", "loading = false", "try"]]
  ]],
  ["js-storage-state", ["Stockage et état persistant", "Storage and persistent state"], "Conserver une progression locale sans mélanger les responsabilités.", "Persist local progress without mixing responsibilities.", [
    ["save-string", "Sauver une chaîne", "Save a string", "Stocke le thème courant.", "Store the current theme.", "const theme = 'violet';\nlocalStorage.setItem('pulsa-theme', theme);", ["localStorage.setItem", "pulsa-theme", "theme"]],
    ["read-string", "Relire une chaîne", "Read a string", "Relis un thème avec valeur de secours.", "Read a theme with fallback.", "const theme = localStorage.getItem('pulsa-theme') || 'system';", ["localStorage.getItem", "||", "system"]],
    ["save-json", "Sauver JSON", "Save JSON", "Sérialise une progression.", "Serialize progress.", "const progress = { lessons: 4 };\nlocalStorage.setItem('progress', JSON.stringify(progress));", ["JSON.stringify", "localStorage.setItem", "progress"]],
    ["read-json", "Relire JSON", "Read JSON", "Relis une progression JSON.", "Read JSON progress.", "const raw = localStorage.getItem('progress');\nconst progress = raw ? JSON.parse(raw) : { lessons: 0 };", ["JSON.parse", "raw ?", "lessons"]],
    ["state-source", "Source de vérité", "Source of truth", "Centralise tasks dans un objet state.", "Centralize tasks in a state object.", "const state = { tasks: [], filter: 'all' };", ["const state", "tasks", "filter"]],
    ["immutable-add", "Ajout immuable", "Immutable add", "Ajoute une tâche sans modifier l’ancien tableau.", "Add a task without mutating the previous array.", "const nextTasks = [...state.tasks, { title: 'Review' }];", ["...", "state.tasks", "nextTasks"]],
    ["remove-storage", "Effacer stockage", "Remove storage", "Supprime une clé devenue inutile.", "Remove an obsolete key.", "localStorage.removeItem('draft-task');", ["removeItem", "draft-task", "localStorage"]],
    ["storage-event", "Événement storage", "Storage event", "Écoute les changements entre onglets.", "Listen to changes across tabs.", "window.addEventListener('storage', (event) => {\n  console.log(event.key);\n});", ["addEventListener", "storage", "event.key"]]
  ]],
  ["js-debugging", ["Debugging et modèles mentaux", "Debugging and mental models"], "Rendre une erreur observable puis la réduire.", "Make an error observable then reduce it.", [
    ["trace-value", "Tracer valeur", "Trace value", "Log une valeur avec son contexte.", "Log a value with context.", "const xp = 80;\nconsole.log('xp before bonus', xp);", ["console.log", "xp before bonus", "xp"]],
    ["console-table", "Table console", "Console table", "Affiche une collection en table.", "Display a collection as a table.", "const rows = [{ track: 'js' }];\nconsole.table(rows);", ["console.table", "rows", "track"]],
    ["breakpoint-marker", "Marqueur debug", "Debug marker", "Ajoute un debugger contrôlé.", "Add a controlled debugger statement.", "function inspectState(state) {\n  debugger;\n  return state;\n}", ["debugger", "inspectState", "return state"]],
    ["call-stack-array", "Pile simulée", "Mock stack", "Simule une pile d’appels avec un tableau.", "Mock a call stack with an array.", "const callStack = [];\ncallStack.push('render()');\ncallStack.pop();", ["callStack", "push", "pop"]],
    ["guard-clause", "Clause garde", "Guard clause", "Réduis l’imbrication avec une clause de garde.", "Reduce nesting with a guard clause.", "function renderUser(user) {\n  if (!user) return 'missing';\n  return user.name;\n}", ["if (!user)", "return 'missing'", "user.name"]],
    ["minimal-repro", "Reproduction minimale", "Minimal repro", "Isole un cas cassé dans deux valeurs.", "Isolate a broken case in two values.", "const input = '';\nconst expected = null;\nconst actual = input.trim() || null;", ["expected", "actual", "trim"]],
    ["assert-helper", "Mini assertion", "Mini assertion", "Crée une assertion qui lance une erreur.", "Create an assertion that throws.", "function assert(condition, message) {\n  if (!condition) throw new Error(message);\n}", ["function assert", "condition", "throw new Error"]],
    ["fix-loop", "Boucle correction", "Fix loop", "Écris une fonction test puis correction.", "Write a test then correction function.", "function isPassing(score) {\n  return score >= 70;\n}\nconst testResult = isPassing(70) === true;", ["isPassing", "score >= 70", "testResult"]]
  ]],
  ["js-capstone", ["Capstone JavaScript", "JavaScript capstone"], "Assembler une application fiable avec état, rendu, validation et persistance.", "Assemble a reliable app with state, render, validation, and persistence.", [
    ["app-state", "État app", "App state", "Crée l’état central d’une app de révision.", "Create central state for a review app.", "const appState = { cards: [], currentIndex: 0, score: 0 };", ["appState", "cards", "currentIndex"]],
    ["card-factory", "Fabrique carte", "Card factory", "Crée une carte de quiz normalisée.", "Create a normalized quiz card.", "function createCard(question, answer) {\n  return { question, answer, done: false };\n}", ["function createCard", "question", "answer"]],
    ["answer-check", "Vérifier réponse", "Check answer", "Compare deux réponses nettoyées.", "Compare two cleaned answers.", "function checkAnswer(expected, received) {\n  return expected.trim().toLowerCase() === received.trim().toLowerCase();\n}", ["toLowerCase", "trim", "==="]],
    ["score-update", "Mise à jour score", "Score update", "Ajoute des points si la réponse est correcte.", "Add points when answer is correct.", "function updateScore(correct) {\n  if (correct) appState.score += 1;\n  return appState.score;\n}", ["if (correct)", "score +=", "return appState.score"]],
    ["render-card", "Rendre carte", "Render card", "Rends la carte courante dans le DOM.", "Render the current card into the DOM.", "function renderCard(card) {\n  document.querySelector('#question').textContent = card.question;\n}", ["renderCard", "querySelector", "textContent"]],
    ["persist-app", "Persister app", "Persist app", "Sauve l’état capstone en JSON.", "Save capstone state as JSON.", "function saveApp() {\n  localStorage.setItem('pulsa-js-capstone', JSON.stringify(appState));\n}", ["saveApp", "JSON.stringify", "pulsa-js-capstone"]],
    ["restore-app", "Restaurer app", "Restore app", "Restaure l’état si une sauvegarde existe.", "Restore state if a save exists.", "function restoreApp() {\n  const raw = localStorage.getItem('pulsa-js-capstone');\n  return raw ? JSON.parse(raw) : appState;\n}", ["restoreApp", "JSON.parse", "appState"]],
    ["ship-summary", "Résumé final", "Final summary", "Produis un résumé de score partageable.", "Produce a shareable score summary.", "function scoreSummary() {\n  return `Score final: ${appState.score}/${appState.cards.length}`;\n}", ["scoreSummary", "appState.score", "cards.length"]]
  ]]
];

const projectModuleIndexes = new Set([0, 1, 2, 3, 4, 6, 7, 9]);

export const javascriptModules = moduleSpecs.map((spec, index) => spec[0] === "js-functions-scope" ? javascriptFunctionsScopeModule : makeModule(spec, index));

function makeModule([id, title, frSummary, enSummary, topics], moduleIndex) {
  const lessons = topics.map((topic, index) => makeLesson(id, title, topic, index + 1));
  lessons.push(makeQuiz(id, title, moduleIndex));
  if (projectModuleIndexes.has(moduleIndex)) lessons.push(makeProject(id, title, moduleIndex));
  if (moduleIndex === 4 || moduleIndex === 9) lessons.push(makeCheckpoint(id, title, moduleIndex));
  return {
    id,
    title: { fr: title[0], en: title[1] },
    description: { fr: frSummary, en: enSummary },
    deliverable: { fr: `Un atelier ${title[0]} validé`, en: `A validated ${title[1]} workshop` },
    importance: { fr: `${title[0]} transforme une notion JavaScript en preuve courte et testable.`, en: `${title[1]} turns one JavaScript concept into short, testable proof.` },
    prerequisites: { fr: moduleIndex ? ["Avoir terminé les modules JS précédents", "Savoir lire un test qui échoue"] : ["Savoir utiliser le lab", "Aucun prérequis JS avancé"], en: moduleIndex ? ["Complete the previous JS modules", "Know how to read a failing test"] : ["Know how to use the lab", "No advanced JS prerequisite"] },
    outcomes: { fr: ["Coder une étape courte", "Lancer les tests", "Expliquer la décision"], en: ["Code one short step", "Run the tests", "Explain the decision"] },
    vocabulary: topics.slice(0, 6).map((topic) => topic[0].replaceAll("-", " ")),
    mastery: { fr: ["Chaque micro-étape passe ses tests", "Le vocabulaire est réutilisé dans un projet", "La solution reste originale"], en: ["Each micro-step passes its tests", "Vocabulary is reused in a project", "The solution remains original"] },
    lessons,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0)
  };
}

function makeLesson(moduleId, moduleTitle, [slug, frTitle, enTitle, frBrief, enBrief, code, checks], stepNumber) {
  const id = `${moduleId}-${slug}`;
  const title = { fr: `${stepNumber}. ${frTitle}`, en: `${stepNumber}. ${enTitle}` };
  const brief = { fr: frBrief, en: enBrief };
  const course = courseFor(id, title, brief, code, checks, moduleTitle, stepNumber);
  const guide = guideFor(title, moduleTitle, stepNumber);
  return {
    id,
    type: moduleId.includes("dom") || moduleId.includes("capstone") ? "dom" : "js",
    title,
    brief,
    course,
    pedagogy: getPedagogy(id, { course, guide, title, brief, solution: code, type: "javascript" }),
    theory: { fr: brief.fr, en: brief.en },
    guide,
    skills: [moduleId, slug],
    difficulty: stepNumber <= 3 ? "easy" : stepNumber <= 6 ? "medium" : "hard",
    durationMin: 18,
    starterCode: starterFrom(code),
    solution: code,
    tests: checks.map((check) => ({ type: "contains", label: { fr: `Le code contient ${check}`, en: `The code contains ${check}` }, value: check })),
    hint: { fr: `Cherche ${checks[0]} puis valide la micro-étape.`, en: `Look for ${checks[0]}, then validate the micro-step.` },
    xp: 25 + stepNumber
  };
}

function makeQuiz(moduleId, moduleTitle, moduleIndex) {
  const id = `${moduleId}-quiz`;
  const title = { fr: `Quiz ${moduleTitle[0]}`, en: `${moduleTitle[1]} quiz` };
  const profile = jsModuleProfile(moduleId, moduleTitle);
  const brief = { fr: `Diagnostique le risque : ${profile.risk[0]}.`, en: `Diagnose the risk: ${profile.risk[1]}.` };
  const question = {
    fr: `Quel risque principal dois-tu éviter dans ${moduleTitle[0]} ?`,
    en: `What is the main risk to avoid in ${moduleTitle[1]}?`
  };
  const choices = [
    { id: "risk", label: { fr: profile.risk[0], en: profile.risk[1] } },
    { id: "syntax", label: { fr: "Oublier un point-virgule", en: "Forgetting a semicolon" } },
    { id: "var", label: { fr: "Utiliser var au lieu de let", en: "Using var instead of let" } }
  ];
  return quizObject(id, title, brief, question, choices, moduleIndex, profile);
}

function makeCheckpoint(moduleId, moduleTitle, moduleIndex) {
  const id = `${moduleId}-checkpoint`;
  const profile = jsModuleProfile(moduleId, moduleTitle);
  return quizObject(id, { fr: `Checkpoint ${moduleTitle[0]}`, en: `${moduleTitle[1]} checkpoint` }, { fr: "Checkpoint de consolidation avant la suite.", en: "Consolidation checkpoint before moving on." }, { fr: `Quelle stratégie valide le checkpoint ${moduleTitle[0]} ?`, en: `Which strategy validates the ${moduleTitle[1]} checkpoint?` }, [
    { id: "proof", label: { fr: `Prouver que ${profile.proof[0]}`, en: `Prove that ${profile.proof[1]}` } },
    { id: "guess", label: { fr: "Changer plusieurs choses au hasard", en: "Change several things randomly" } },
    { id: "ignore", label: { fr: "Ignorer les tests", en: "Ignore tests" } }
  ], moduleIndex, profile);
}

function quizObject(id, title, brief, prompt, choices, moduleIndex, profile) {
  const explanation = { fr: `La bonne pratique prouve que ${profile.proof[0]}.`, en: `Good practice proves that ${profile.proof[1]}.` };
  const guide = guideFor(title, title, moduleIndex + 1, profile);
  const course = courseFor(id, title, brief, "", ["proof"], title, moduleIndex + 1, profile);
  const questions = [
    { id: `${id}-single`, type: "single", prompt, choices, answer: choices[0].id, explanation, points: 1 },
    { id: `${id}-multiple`, type: "multiple", prompt: { fr: `Dans ${title.fr}, quelles preuves confirment ${profile.proof[0]} ?`, en: `In ${title.en}, which evidence confirms that ${profile.proof[1]}?` }, choices: [{ id: "test", label: { fr: "Un test du comportement annoncé", en: "A test of the stated behavior" } }, { id: "inspect", label: { fr: "L'inspection de la valeur produite", en: "Inspection of the produced value" } }, { id: "guess", label: { fr: "Une supposition sans exécution", en: "A guess without execution" } }], answer: ["test", "inspect"], explanation, points: 1 },
    { id: `${id}-tf`, type: "true-false", prompt: { fr: `Pour ${title.fr}, vrai ou faux : ${profile.risk[0]} est un problème mineur.`, en: `For ${title.en}, true or false: ${profile.risk[1]} is a minor problem.` }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation, points: 1 },
    { id: `${id}-order`, type: "ordering", prompt: { fr: `Ordonne la validation de ${title.fr}.`, en: `Order the validation of ${title.en}.` }, choices: [{ id: "contract", label: { fr: "Nommer le contrat", en: "State the contract" } }, { id: "run", label: { fr: "Exécuter un exemple", en: "Run an example" } }, { id: "edge", label: { fr: "Tester une limite", en: "Test a boundary" } }, { id: "explain", label: { fr: "Expliquer le résultat", en: "Explain the result" } }], answer: ["contract", "run", "edge", "explain"], explanation, points: 1 },
    { id: `${id}-code`, type: "code-reading", prompt: { fr: `Dans ${title.fr}, quel défaut trahirait ${profile.risk[0]} ?`, en: `In ${title.en}, which defect would reveal that ${profile.risk[1]}?` }, choices: [{ id: "risk", label: { fr: profile.risk[0], en: profile.risk[1] } }, { id: "style", label: { fr: "Un choix de mise en forme", en: "A formatting choice" } }, { id: "none", label: { fr: "Aucun comportement observable", en: "No observable behavior" } }], answer: "risk", explanation, points: 1 },
    { id: `${id}-open`, type: "short-open", prompt: { fr: `Pour ${title.fr}, donne un test qui prouve ${profile.proof[0]}.`, en: `For ${title.en}, name a test proving that ${profile.proof[1]}.` }, choices: [], answer: ["test", "entrée", "sortie", "limite", "input", "output", "edge"], keywords: ["test"], explanation, points: 1 }
  ];
  return { id, type: "quiz", title, brief, course, pedagogy: getPedagogy(id, { course, guide, title, brief, type: "quiz" }), theory: { fr: brief.fr, en: brief.en }, guide, skills: [id], difficulty: "quiz", durationMin: 20, question: prompt, options: choices, answer: choices[0].id, explanation, questions, passingScore: 75, randomizeQuestions: false, feedbackMode: "immediate", starterCode: "", solution: "", tests: [{ type: "quiz", label: "correct answer", value: choices[0].id }], hint: { fr: "Prouve le résultat au lieu de deviner.", en: "Prove the output instead of guessing." }, xp: 35 };
}

function makeProject(moduleId, moduleTitle, moduleIndex) {
  const id = `${moduleId}-lab`;
  const title = { fr: `Lab ${moduleTitle[0]}`, en: `${moduleTitle[1]} lab` };
  const profile = jsModuleProfile(moduleId, moduleTitle);
  const brief = { fr: `Assemble ${profile.project[0]} pour PulsaConf.`, en: `Assemble ${profile.project[1]} for PulsaConf.` };
  const blueprint = projectBlueprint(moduleId);
  const solution = blueprint.solution;
  const course = courseFor(id, title, brief, solution, blueprint.markers, moduleTitle, moduleIndex + 1, profile);
  const guide = guideFor(title, moduleTitle, moduleIndex + 1, profile);
  return { id, type: "project", title, brief, course, pedagogy: getPedagogy(id, { course, guide, title, brief, solution, type: "project" }), theory: { fr: brief.fr, en: brief.en }, guide, skills: [moduleId, "lab"], difficulty: "project", durationMin: 95, starterCode: blueprint.starter, solution, tests: [...blueprint.markers.map((value) => ({ type: "contains", label: `Le livrable utilise ${value}`, value })), ...blueprint.behavior], rubric: { fr: [`Le livrable implémente ${profile.project[0]}.`, `Le comportement évite ${profile.risk[0]}.`, "Un cas nominal et une limite sont exécutables.", `La preuve finale confirme que ${profile.proof[0]}.`], en: [`The deliverable implements ${profile.project[1]}.`, `The behavior avoids ${profile.risk[1]}.`, "A happy path and one boundary are executable.", `Final proof confirms that ${profile.proof[1]}.`] }, hint: { fr: "Commence par le contrat métier, puis fais passer le cas nominal et la limite.", en: "Start with the domain contract, then pass the happy path and boundary." }, xp: 90 };
}

function projectBlueprint(moduleId) {
  const projects = {
    "js-variables-strings": ["function createTicket(name, track, xp) {\n  const cleanName = String(name).trim();\n  return `${cleanName} | ${track} | ${Number(xp)} XP`;\n}", "function createTicket(name, track, xp) {\n  // retourne un ticket lisible\n}\n", ["createTicket", "String(name).trim", "Number(xp)"], "return createTicket(' Maya ', 'JS', '40') === 'Maya | JS | 40 XP';"],
    "js-booleans-numbers": ["function canRegister(age, seatsLeft) {\n  return Number.isFinite(age) && age >= 13 && seatsLeft > 0;\n}", "function canRegister(age, seatsLeft) {\n  // vérifie le seuil et les places\n}\n", ["canRegister", "age >= 13", "seatsLeft > 0"], "return canRegister(13, 1) && !canRegister(12, 1) && !canRegister(20, 0);"],
    "js-functions-scope": ["function ticketPrice(quantity, unitPrice = 20) {\n  if (quantity < 1) return 0;\n  return quantity * unitPrice;\n}\n", "function ticketPrice(quantity, unitPrice = 20) {\n  // retourne un prix prévisible\n}\n", ["ticketPrice", "quantity < 1", "quantity * unitPrice"], "return ticketPrice(2) === 40 && ticketPrice(0) === 0;"],
    "js-collections-loops": ["function buildWaitlist(attendees) {\n  return attendees.filter((person) => !person.confirmed).map((person) => person.name);\n}\n", "function buildWaitlist(attendees) {\n  // filtre puis transforme\n}\n", ["buildWaitlist", ".filter", ".map"], "return JSON.stringify(buildWaitlist([{ name: 'A', confirmed: false }, { name: 'B', confirmed: true }])) === '[\"A\"]';"],
    "js-dom-forms": ["function registrationMessage(name) {\n  const cleanName = name.trim();\n  return cleanName ? `Inscription: ${cleanName}` : 'Nom requis';\n}\n", "function registrationMessage(name) {\n  // produit le feedback du formulaire\n}\n", ["registrationMessage", ".trim", "Nom requis"], "return registrationMessage(' Lina ') === 'Inscription: Lina' && registrationMessage(' ') === 'Nom requis';"],
    "js-async-fetch": ["async function loadSchedule(request) {\n  const response = await request('/api/schedule');\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n}\n", "async function loadSchedule(request) {\n  // vérifie la réponse puis lis le JSON\n}\n", ["loadSchedule", "response.ok", "response.json"], "return loadSchedule(async () => ({ ok: true, json: async () => ['keynote'] })).then((items) => items[0] === 'keynote');"],
    "js-storage-state": ["function addPreference(state, key, value) {\n  return { ...state, [key]: value };\n}\nfunction serializePreferences(state) {\n  return JSON.stringify(state);\n}\n", "function addPreference(state, key, value) {\n  // retourne un nouvel état\n}\n", ["addPreference", "...state", "JSON.stringify"], "const before = { theme: 'light' }; const after = addPreference(before, 'theme', 'dark'); return before.theme === 'light' && after.theme === 'dark';"],
    "js-capstone": ["const appState = { tickets: [], filter: 'all' };\nfunction addTicket(name) {\n  const cleanName = name.trim();\n  if (!cleanName) throw new Error('Name required');\n  appState.tickets = [...appState.tickets, { name: cleanName, paid: false }];\n  return appState.tickets.length;\n}\n", "const appState = { tickets: [], filter: 'all' };\nfunction addTicket(name) {\n  // valide puis met à jour l'état\n}\n", ["appState", "addTicket", "Name required"], "addTicket(' Maya '); return appState.tickets.length === 1 && appState.tickets[0].name === 'Maya';"]
  };
  const [solution, starter, markers, expression] = projects[moduleId];
  return { solution, starter, markers, behavior: [{ type: "jsExpression", label: "Le scénario métier et sa limite produisent le résultat attendu", value: expression }] };
}

function courseFor(id, title, brief, code, checks, moduleTitle, stepNumber, profile) {
  const p = profile || jsModuleProfile(id, moduleTitle);
  return { fr: { introduction: `${p.scene[0]} ${title.fr} traite une étape précise pour éviter que ${p.risk[0]}.`, sections: sections(title.fr, brief.fr, code, checks, p, false), vocabulary: vocab(checks), check: [`Je peux expliquer l'intention de ${title.fr}.`, `Je sais où ${checks[0]} modifie l'état.`, `Je prouve que ${p.proof[0]}.`] }, en: { introduction: `${p.scene[1]} ${title.en} handles a specific step to prevent ${p.risk[1]}.`, sections: sections(title.en, brief.en, code, checks, p, true), vocabulary: vocab(checks), check: [`I can explain the intent of ${title.en}.`, `I know where ${checks[0]} modifies state.`, `I prove that ${p.proof[1]}.`] } };
}

function sections(title, brief, code, checks, profile, english) {
  return [
    { title: english ? "Intent" : "Intention", paragraphs: [brief, english ? `The risk to avoid is: ${profile.risk[1]}.` : `Le risque à éviter est : ${profile.risk[0]}.`], example: code.slice(0, 240) },
    { title: english ? "Reasoning" : "Raisonnement", paragraphs: [english ? "Read the starter, change a single responsibility, then run tests." : "Lis le starter, modifie une seule responsabilité, puis lance les tests.", english ? "If a test fails, fix the cause named in its label." : "Si un test échoue, corrige la cause nommée dans son libellé."], example: checks.join(" · ") },
    { title: english ? "Validation" : "Validation", paragraphs: [english ? `The step is successful when assertions pass and ${profile.proof[1]}.` : `L'étape est réussie quand les assertions passent et que ${profile.proof[0]}.`], example: code.slice(0, 160) }
  ];
}

function guideFor(title, moduleTitle, stepNumber, profile) {
  const p = profile || jsModuleProfile("js", moduleTitle);
  return {
    fr: {
      objectives: [
        `Résoudre ${title.fr} comme un besoin de PulsaConf, pas comme une ligne à copier.`,
        `Éviter le risque : ${p.risk[0]}.`,
        `Prouver que ${p.proof[0]}.`
      ],
      prerequisites: ["Lire le starter", "Comprendre le contexte", "Savoir interpréter un test"],
      steps: [
        "Repérer le comportement métier attendu.",
        "Écrire le contrat minimal : entrée, transformation, sortie.",
        "Comparer ton résultat au test et vérifier la preuve."
      ],
      mistakes: [
        `Traiter ${title.fr} au hasard.`,
        "Changer plusieurs responsabilités en même temps.",
        "Faire passer le test sans observer l'état réel."
      ]
    },
    en: {
      objectives: [
        `Solve ${title.en} as a PulsaConf need, not a line to copy.`,
        `Avoid the risk: ${p.risk[1]}.`,
        `Prove that ${p.proof[1]}.`
      ],
      prerequisites: ["Read the starter", "Understand the context", "Know how to interpret a test"],
      steps: [
        "Spot the expected business behavior.",
        "Write the minimal contract: input, transformation, output.",
        "Compare your result with the test and verify evidence."
      ],
      mistakes: [
        `Treating ${title.en} randomly.`,
        "Changing several responsibilities at once.",
        "Making the test pass without observing real state."
      ]
    }
  };
}

function vocab(checks) {
  return checks.slice(0, 4).map((check) => [check, `Repère de code à comprendre, modifier et justifier dans cette étape.`]);
}

function starterFrom(code) {
  return code.split("\n").slice(0, 2).join("\n") + "\n// complète la preuve ici";
}
