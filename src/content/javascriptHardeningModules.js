import { module, quizLesson, test } from "./trackBuilders.js";
import { getPedagogy } from "./pedagogy.js";
import { jsModuleProfile } from "./jsModuleProfiles.js";
import { jsValidationHardeningModule } from "./jsValidationModule.js";

const dense = {
  async: ["async", "await", "fetch", "response.ok", "response.status", "response.json", "try", "catch", "finally", "AbortController", "signal", "setTimeout", "clearTimeout", "Promise.all", "map", "filter", "throw new Error", "loading", "error", "data"],
  dom: ["querySelector", "addEventListener", "textContent", "classList.toggle", "setAttribute", "getAttribute", "dataset", "closest", "preventDefault", "FormData", "append", "createElement", "replaceChildren", "role=\"status\"", "aria-live", "disabled", "focus", "keydown", "Escape", "localStorage"],
  debug: ["console.group", "console.table", "performance.mark", "performance.measure", "debugger", "Error", "stack", "try", "catch", "finally", "JSON.stringify", "JSON.parse", "structuredClone", "Object.freeze", "Array.from", "typeof", "instanceof", "?.", "??", "return"]
};

const modalChecks = ["querySelector", "addEventListener", "keydown", "Escape", "focus", "setAttribute", "role=\"dialog\"", "aria-live", "hidden"];
const taskChecks = ["querySelector", "addEventListener", "FormData", "createElement", "replaceChildren", "dataset", "closest", "preventDefault", "aria-live", "disabled", "localStorage", "classList.toggle", "String", "trim", "throw new Error"];
const finalChecks = ["validateTask", "initTaskApp", "state", "tasks", "error", "crypto.randomUUID", "JSON.stringify", "JSON.parse", "try", "catch", "replaceChildren", "dataset.id", "FormData", "data.get", "String", "trim", "throw new Error", "status", "localStorage.setItem", "localStorage.getItem", "classList.toggle", "createElement", "fetch", "response.ok", "response.json", "AbortController", "clearTimeout", "console.group", "console.table", "performance.mark", "structuredClone", "Object.freeze", "Array.from", "typeof", "instanceof"];

const finalLabSolution = `const state = { tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'), data: null, loading: false, error: null };
function validateTask(title) {
  const clean = String(title ?? '').trim();
  if (!clean) throw new Error('Task required');
  return { id: crypto.randomUUID(), title: clean, done: false };
}
function persist() { try { localStorage.setItem('tasks', JSON.stringify(state.tasks)); } catch { /* Storage can be disabled in a sandboxed preview. */ } }
function render(list, status) {
  const fragment = document.createDocumentFragment();
  const items = state.tasks.map((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.classList.toggle('is-done', task.done);
    const label = document.createElement('span');
    label.textContent = task.title;
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.dataset.id = task.id; toggle.dataset.action = 'toggle'; toggle.textContent = 'Terminer';
    const remove = document.createElement('button');
    remove.type = 'button'; remove.dataset.id = task.id; remove.dataset.action = 'remove'; remove.textContent = 'Supprimer';
    li.append(label, toggle, remove); fragment.append(li); return li;
  });
  list.replaceChildren(fragment);
  status.textContent = String(state.tasks.length) + ' tâche(s)';
}
async function loadDashboard(request = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  state.loading = true; state.error = null;
  try {
    const response = await request('/api/catalog', { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const payload = await response.json();
    state.data = Array.isArray(payload.items) ? payload.items.filter(Boolean).map((item) => String(item.title ?? '')) : [];
    return state;
  } catch (error) { state.error = error.message; return state; }
  finally { clearTimeout(timer); state.loading = false; }
}
function traceScenario(name, callback) {
  console.group(name); performance.mark(name + ':start');
  try {
    const frozen = Object.freeze(structuredClone({ name: name, values: Array.from([name]) }));
    const result = callback(frozen) ?? null;
    console.table([{ type: typeof result, object: result instanceof Object }]);
    return JSON.parse(JSON.stringify(result));
  } catch (error) { return { error: error?.message ?? String(error), stack: error?.stack ?? '' }; }
  finally { performance.mark(name + ':end'); performance.measure(name, name + ':start', name + ':end'); console.groupEnd(); }
}
function initTaskApp() {
  const form = document.querySelector('#task-form');
  const input = form.querySelector('input');
  const addButton = form.querySelector('button');
  const list = document.querySelector('#tasks');
  const status = document.querySelector('[role="status"]');
  input.addEventListener('input', () => { addButton.disabled = !input.value.trim(); });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { state.tasks = [...state.tasks, validateTask(data.get('title'))]; persist(); render(list, status); input.value = ''; addButton.disabled = true; }
    catch (error) { status.textContent = error.message; }
  });
  list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]'); if (!button) return;
    const task = state.tasks.find((item) => item.id === button.dataset.id); if (!task) return;
    if (button.dataset.action === 'toggle') task.done = !task.done;
    else state.tasks = state.tasks.filter((item) => item.id !== button.dataset.id);
    persist(); render(list, status);
  });
  render(list, status);
}
`;

export const javascriptHardeningModules = [
  jsValidationHardeningModule,
  module("js-async-resilience", "Async, API et résilience", "Async, APIs, and resilience", [
    jsLesson("js-hardening-fetch-timeout", ["Fetch avec timeout", "Fetch with timeout"], ["Crée fetchWithTimeout(url, ms) avec AbortController, erreur HTTP et cleanup.", "Build fetchWithTimeout(url, ms) with AbortController, HTTP failure handling, and timer cleanup."], starter("fetchWithTimeout"), dense.async, 60),
    jsLesson("js-hardening-load-catalog-state", ["État réseau complet", "Complete network state"], ["Crée loadCatalog() qui retourne loading/data/error et distingue 200, 404, 500 et offline.", "Build loadCatalog() returning loading/data/error while distinguishing 200, 404, 500, and offline states."], starter("loadCatalog"), dense.async, 60),
    jsLesson("js-hardening-parallel-dashboard", ["Dashboard parallèle", "Parallel dashboard"], ["Charge profil, progression et recommandations avec Promise.all puis normalise les erreurs.", "Load profile, progress, and recommendations with Promise.all, then normalize failures."], starter("loadDashboard"), dense.async, 65),
    projectLesson({
      id: "js-hardening-api-lab",
      title: ["Lab : client API résilient", "Lab: resilient API client"],
      brief: ["Livre un client API avec timeout, retry limité, état UI et erreurs lisibles.", "Ship an API client with timeout, limited retry, UI state, and readable errors."],
      starterCode: "const endpoints = ['/api/catalog', '/api/progress', '/api/recommendations'];\n\n// Ajoute fetchWithTimeout, readJson, loadDashboard et formatNetworkError\n",
      solution: "const endpoints = ['/api/catalog', '/api/progress', '/api/recommendations'];\nasync function fetchWithTimeout(url, ms = 4000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return response;\n  } catch (error) {\n    return { error };\n  } finally {\n    clearTimeout(timer);\n  }\n}\nasync function readJson(url) {\n  const response = await fetchWithTimeout(url);\n  if (response.error) throw response.error;\n  return response.json();\n}\nasync function loadDashboard() {\n  const state = { loading: true, data: null, error: null };\n  try { state.data = (await Promise.all(endpoints.map(readJson))).filter(Boolean); }\n  catch (error) { state.error = error.message; }\n  finally { state.loading = false; }\n  return state;\n}",
       tests: [...dense.async.map((check) => test("contains", check, check)), test("jsExpression", "Le dashboard termine le chargement et rend les trois réponses simulées", "return loadDashboard().then((state) => { if (state.loading === false && state.error === null && state.data.length === 3) return true; throw new Error(JSON.stringify(state)); });")],
      xp: 120
    }),
    quiz("js-hardening-async-quiz", "Résilience async", "Async resilience", "Pourquoi utiliser finally dans un chargement réseau ?", "Why use finally in network loading?", "Pour remettre l’état loading à false même en cas d’erreur", "To set loading back to false even when an error happens")
  ]),
  module("js-dom-production", "DOM production, accessibilité et debug", "Production DOM, accessibility, and debug", [
    domLesson("js-hardening-accessible-modal", ["Modale accessible", "Accessible modal"], ["Crée une modale ouvrable/fermable au clavier avec focus, aria-live et Escape.", "Build a modal that opens and closes by keyboard, manages focus, announces status, and handles Escape."], "<button id=\"open\" aria-controls=\"modal\" aria-expanded=\"false\">Ouvrir</button><section id=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" hidden><h2 id=\"modal-title\">Aide</h2><button id=\"close\">Fermer</button><p role=\"status\" aria-live=\"polite\"></p></section><script>\n// Ajoute le JS de modale\n</script>", modalChecks, 65),
    domLesson("js-hardening-task-renderer", ["Renderer de tâches", "Task renderer"], ["Rends une liste de tâches avec createElement, dataset, délégation, statut et stockage.", "Render tasks with createElement, dataset identifiers, event delegation, an announced status, and storage."], "<form id=\"task-form\"><input id=\"task-title\" name=\"title\" /><button id=\"add-task\" disabled>Ajouter</button></form><ul id=\"tasks\"></ul><p role=\"status\" aria-live=\"polite\"></p><script>\n// Ajoute state, render, add, toggle et persist\n</script>", taskChecks, 70),
    jsLesson("js-hardening-debug-trace", ["Trace de debug", "Debug trace"], ["Crée traceScenario(name, callback) avec performance.mark, group, table, stack et retour sécurisé.", "Build traceScenario(name, callback) with performance marks, grouped tables, stack capture, and a safe return value."], starter("traceScenario"), dense.debug, 55),
    projectLesson({
      id: "js-hardening-final-lab",
      title: ["Lab final : mini-dashboard JS fiable", "Final lab: reliable JS mini-dashboard"],
      brief: ["Assemble validation, API, DOM accessible, stockage et traces dans une mini-app maintenable.", "Assemble validation, API, accessible DOM, storage, and traces into a maintainable mini-app."],
      starterCode: "<main><h1>Dashboard JS</h1><form id=\"task-form\"><input name=\"title\" /><button>Ajouter</button></form><ul id=\"tasks\"></ul><p role=\"status\" aria-live=\"polite\"></p></main><script>\n// state, validateTask, render, persist, load, traceScenario\n</script>",
        solution: finalLabSolution,
       tests: finalChecks.map((check) => test("contains", check, check)).concat(test("jsExpression", "La tâche, le chargement API et la trace produisent des preuves", "const before = state.tasks.length; const task = validateTask(' Review '); state.tasks = [...state.tasks, task]; persist(); let rejected = false; try { validateTask(' '); } catch { rejected = true; } const dashboard = await loadDashboard(async () => ({ ok: true, status: 200, async json() { return { items: [{ title: 'API task' }] }; } })); const trace = traceScenario('test', () => ({ ok: true })); return task.title === 'Review' && state.tasks.length === before + 1 && JSON.parse(localStorage.getItem('tasks')).length === before + 1 && rejected && dashboard.data[0] === 'API task' && trace.ok === true;")),
      xp: 150
    }),
    quiz("js-hardening-production-quiz", "DOM production", "Production DOM", "Quel signal rend une action DOM compréhensible au lecteur d’écran ?", "Which signal makes a DOM action understandable to a screen reader?", "Un message dans une région role=\"status\" ou aria-live", "A message in a role=\"status\" or aria-live region")
  ])
];

function starter(name) {
  return `function ${name}(input) {\n  // Écris une solution robuste, testable et lisible.\n  return input;\n}`;
}

function jsLesson(id, title, brief, starterCode, checks, xp) {
  return hardLesson(id, "js", title, brief, starterCode, solutionFor(id, starterCode, checks), checks, xp);
}

function domLesson(id, title, brief, starterCode, checks, xp) {
  return hardLesson(id, "dom", title, brief, starterCode, solutionFor(id, starterCode, checks), checks, xp);
}

function projectLesson({ id, title, brief, starterCode, solution, tests, xp }) {
  const checks = tests.map((item) => item.value);
  return {
    ...hardLesson(id, "project", title, brief, starterCode, solution, checks, xp),
    tests,
    project: true,
    rubric: {
      fr: ["La solution couvre les cas limites annoncés.", "Les erreurs sont explicites et récupérables.", "L’interface ou la donnée reste accessible et maintenable.", "Les tests prouvent le succès, l’échec et la reprise."],
      en: ["The solution covers the announced edge cases.", "Errors are explicit and recoverable.", "The UI or data remains accessible and maintainable.", "Tests prove success, failure, and recovery."]
    }
  };
}

function hardLesson(id, type, title, brief, starterCode, solution, checks, xp) {
  const titleObject = { fr: title[0], en: title[1] };
  const briefObject = { fr: brief[0], en: brief[1] };
  const course = createCourse(id, title, briefObject, solution, checks);
  const guide = createGuide(id, checks);
  return {
    id,
    type,
    title: titleObject,
    brief: briefObject,
    course,
    pedagogy: getPedagogy(id, { course, guide, title: titleObject, brief: briefObject, solution }),
    theory: { fr: "Une solution robuste se prouve par ses cas limites.", en: "A robust solution is proven by its edge cases." },
    guide,
    skills: ["javascript-hardening", "edge-cases", "debugging"],
    difficulty: type === "project" ? "project" : "intermediate",
    durationMin: type === "project" ? 140 : 45,
    starterCode,
    solution,
    tests: [...checks.map((check) => test("contains", check, check)), ...behaviorTestsFor(id)],
    hint: { fr: "Traite d’abord le cas nominal, puis ajoute chaque garde-fou.", en: "Handle the happy path first, then add each guardrail." },
    xp
  };
}

function behaviorTestsFor(id) {
  const expressions = {
    "js-hardening-fetch-timeout": "return fetchWithTimeout('/api/catalog', 50).then((state) => state.loading === false && state.data?.url === '/api/catalog');",
    "js-hardening-load-catalog-state": "return loadCatalog().then((state) => state.loading === false && Array.isArray(state.data));",
    "js-hardening-parallel-dashboard": "return loadDashboard().then((state) => state.loading === false && (state.data !== null || state.error !== null));",
    "js-hardening-debug-trace": "return traceScenario('registration', () => ({ ok: true })).ok === true;"
  };
  return expressions[id] ? [test("jsExpression", "Le cas nominal et le cas d'échec produisent des résultats observables", expressions[id])] : [];
}

function solutionFor(id, starterCode, _checks) {
  const implementations = {
    "js-hardening-fetch-timeout": "async function fetchWithTimeout(url, ms = 4000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    state.data = await response.json();\n    return state;\n  } catch (error) {\n    state.error = error.message;\n    return state;\n  } finally {\n    clearTimeout(timer);\n    state.loading = false;\n  }\n}\nasync function loadAll(urls) { return Promise.all(urls.map(fetchWithTimeout).filter(Boolean)); }",
    "js-hardening-load-catalog-state": "async function loadCatalog() {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), 4000);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const response = await fetch('/api/catalog', { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const data = await response.json();\n    state.data = Array.isArray(data.items) ? data.items.filter(Boolean).map((item) => item.title) : [];\n    return state;\n  } catch (error) { state.error = error.message; return state; }\n  finally { clearTimeout(timer); state.loading = false; }\n}\nasync function preload() { return Promise.all(['/api/catalog'].map(fetch)); }",
    "js-hardening-parallel-dashboard": "async function loadDashboard() {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), 4000);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const urls = ['/api/profile', '/api/progress', '/api/recommendations'];\n    const responses = await Promise.all(urls.map((url) => fetch(url, { signal: controller.signal })));\n    responses.forEach((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); });\n    const data = await Promise.all(responses.map((response) => response.json()));\n    state.data = data.filter(Boolean);\n    return state;\n  } catch (error) { state.error = error.message; return state; }\n  finally { clearTimeout(timer); state.loading = false; }\n}",
    "js-hardening-accessible-modal": "<button id=\"open\" aria-controls=\"modal\" aria-expanded=\"false\">Ouvrir</button><section id=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" hidden><h2 id=\"modal-title\">Aide</h2><button id=\"close\">Fermer</button><p role=\"status\" aria-live=\"polite\"></p></section><script>\nconst openButton = document.querySelector('#open');\nconst dialog = document.querySelector('#modal');\nconst closeButton = document.querySelector('#close');\nconst status = dialog.querySelector('[role=\"status\"]');\nfunction closeDialog() {\n  dialog.hidden = true;\n  openButton.setAttribute('aria-expanded', 'false');\n  status.textContent = 'Aide fermée';\n  openButton.focus();\n}\nopenButton.addEventListener('click', () => {\n  dialog.hidden = false;\n  openButton.setAttribute('aria-expanded', 'true');\n  status.textContent = 'Aide ouverte';\n  closeButton.focus();\n});\ncloseButton.addEventListener('click', closeDialog);\ndialog.addEventListener('keydown', (event) => {\n  if (event.key === 'Escape') closeDialog();\n  if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }\n});\n</script>",
    "js-hardening-task-renderer": "<form id=\"task-form\"><input id=\"task-title\" name=\"title\" /><button id=\"add-task\" disabled>Ajouter</button></form><ul id=\"tasks\"></ul><p role=\"status\" aria-live=\"polite\"></p><script>\nconst state = { tasks: (() => { try { const raw = localStorage.getItem('tasks'); return raw ? JSON.parse(raw) : []; } catch { return []; } })() };\nconst form = document.querySelector('#task-form');\nconst input = document.querySelector('#task-title');\nconst addButton = document.querySelector('#add-task');\nconst list = document.querySelector('#tasks');\naddButton.addEventListener('click', (event) => { event.preventDefault(); form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); });\nconst status = document.querySelector('[role=\"status\"]');\nfunction validateTask(title) {\n  const clean = String(title ?? '').trim();\n  if (!clean) throw new Error('Task required');\n  return { id: crypto.randomUUID(), title: clean, done: false };\n}\nfunction persist() { try { localStorage.setItem('tasks', JSON.stringify(state.tasks)); } catch { /* Storage can be disabled in a sandboxed preview. */ } }\nfunction render() {\n  const fragment = document.createDocumentFragment();\n  for (const task of state.tasks) {\n    const item = document.createElement('li');\n    item.dataset.id = task.id;\n    item.classList.toggle('is-done', task.done);\n    const label = document.createElement('span');\n    label.textContent = task.title;\n    const toggle = document.createElement('button');\n    toggle.type = 'button'; toggle.dataset.action = 'toggle'; toggle.dataset.id = task.id; toggle.textContent = 'Terminer';\n    const remove = document.createElement('button');\n    remove.type = 'button'; remove.dataset.action = 'remove'; remove.dataset.id = task.id; remove.textContent = 'Supprimer';\n    item.append(label, toggle, remove); fragment.append(item);\n  }\n  list.replaceChildren(fragment);\n  status.textContent = `${state.tasks.length} tâche(s)`;\n}\ninput.addEventListener('input', () => { addButton.disabled = !input.value.trim(); });\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const data = new FormData(event.currentTarget);\n  try { state.tasks = [...state.tasks, validateTask(data.get('title'))]; persist(); render(); input.value = ''; addButton.disabled = true; status.textContent = 'Tâche ajoutée'; }\n  catch (error) { status.textContent = error.message; }\n});\nlist.addEventListener('click', (event) => {\n  const button = event.target.closest('button[data-action]');\n  if (!button) return;\n  const task = state.tasks.find((item) => item.id === button.dataset.id);\n  if (button.dataset.action === 'toggle') task.done = !task.done;\n  else state.tasks = state.tasks.filter((item) => item.id !== button.dataset.id);\n  persist(); render();\n});\nrender();\n</script>",
    "js-hardening-debug-trace": "function traceScenario(name, callback) {\n  console.group?.(name);\n  performance.mark?.(`${name}:start`);\n  try {\n    debugger;\n    const cloned = structuredClone({ name, input: Array.from([name]) });\n    const frozen = Object.freeze(cloned);\n    const result = callback?.(frozen) ?? null;\n    console.table?.([{ name, type: typeof result, object: result instanceof Object }]);\n    return JSON.parse(JSON.stringify(result));\n  } catch (error) {\n    const wrapped = new Error(error.message);\n    console.table?.([{ stack: wrapped.stack }]);\n    return null;\n  } finally {\n    performance.mark?.(`${name}:end`);\n    performance.measure?.(name, `${name}:start`, `${name}:end`);\n    console.groupEnd?.();\n  }\n}"
  };
  return implementations[id] || starterCode;
}

function createCourse(id, title, brief, solution, checks) {
  const localizedBrief = typeof brief === "string" ? { fr: brief, en: title[1] } : brief;
  const vocabulary = [["Garde-fou", "Condition qui empêche un état fragile."], ["Cas limite", "Entrée rare mais importante à tester."], ["Feedback", "Information donnée pour comprendre le résultat."]];
  const enVocabulary = [["Guardrail", "Condition that prevents fragile state."], ["Edge case", "Rare but important input to test."], ["Feedback", "Information explaining the result."]];
  return {
    fr: {
      introduction: `${title[0]} : ${localizedBrief.fr}`,
      sections: [
        { title: "Contrat", paragraphs: [`L’activité ${title[0]} commence par définir les entrées, la sortie et l’erreur attendue.`, "Le code doit rester lisible avant d’être optimisé."], example: solution.slice(0, 260) },
        { title: "Cas limites", paragraphs: ["Teste les valeurs vides, les types inattendus et les seuils.", `Les critères prioritaires sont : ${checks.slice(0, 4).join(", ")}.`], example: checks.slice(0, 6).join("\n") },
        { title: "Validation", paragraphs: ["Lance les tests après chaque garde-fou.", "Explique pourquoi le succès protège un comportement utilisateur réel."], example: solution.slice(260, 620) }
      ],
      vocabulary,
      check: checks.slice(0, 8).map((check) => `Le code prouve ${check}.`)
    },
    en: {
      introduction: `${title[1]}: ${localizedBrief.en}`,
      sections: [
        { title: "Contract", paragraphs: ["Start by defining input, output, and expected failure.", "Code must remain readable before it is optimized."], example: solution.slice(0, 260) },
        { title: "Edge cases", paragraphs: ["Test empty values, unexpected types, and thresholds.", `Priority criteria: ${checks.slice(0, 4).join(", ")}.`], example: checks.slice(0, 6).join("\n") },
        { title: "Validation", paragraphs: ["Run tests after each guardrail.", "Explain why success protects a real user behavior."], example: solution.slice(260, 620) }
      ],
      vocabulary: enVocabulary,
      check: checks.slice(0, 8).map((check) => `The code proves ${check}.`)
    }
  };
}

function createGuide(id, checks) {
  return {
    fr: {
      prerequisites: ["Avoir terminé les bases JavaScript.", "Savoir lire une erreur de test.", "Comprendre les entrées et sorties d’une fonction."],
      objectives: checks.slice(0, 3).map((check) => `Utiliser ${check} dans une solution robuste.`),
      steps: ["Écris le cas nominal.", "Ajoute un garde-fou.", "Teste le message d’erreur.", "Relis le contrat complet."],
      mistakes: [`${id} : ignorer les entrées invalides.`, `${id} : masquer une erreur au lieu de l’expliquer.`, `${id} : valider sans vérifier les cas limites.`]
    },
    en: {
      prerequisites: ["Complete JavaScript basics.", "Know how to read a test error.", "Understand function inputs and outputs."],
      objectives: checks.slice(0, 3).map((check) => `Use ${check} in a robust solution.`),
      steps: ["Write the happy path.", "Add a guardrail.", "Test the error message.", "Review the full contract."],
      mistakes: [`${id}: ignoring invalid input.`, `${id}: hiding an error instead of explaining it.`, `${id}: validating without edge cases.`]
    }
  };
}

function quiz(id, frTitle, enTitle, frQuestion, enQuestion, frAnswer, enAnswer) {
  const moduleId = {
    "js-hardening-validation-quiz": "js-validation-hardening",
    "js-hardening-async-quiz": "js-async-resilience",
    "js-hardening-production-quiz": "js-dom-production"
  }[id];
  const profile = jsModuleProfile(moduleId, [frTitle, enTitle]);
  const explanation = { fr: `La bonne décision prouve que ${profile.proof[0]}.`, en: `The right decision proves that ${profile.proof[1]}.` };
  const choices = [
    { id: "correct", label: { fr: frAnswer, en: enAnswer } },
    { id: "weak", label: { fr: "Masquer l’erreur et continuer silencieusement", en: "Hide the error and continue silently" } },
    { id: "random", label: { fr: "Muter l'état sans validation préalable", en: "Mutate state without prior validation" } }
  ];
  const prompt = { fr: frQuestion, en: enQuestion };
  const item = quizLesson({
    id,
    title: [`Quiz : ${frTitle}`, `Quiz: ${enTitle}`],
    brief: [`Diagnostique le risque : ${profile.risk[0]}.`, `Diagnose the risk: ${profile.risk[1]}.`],
    question: prompt,
    options: choices,
    answer: "correct",
    explanation,
    xp: 35
  });
  const title = { fr: `Quiz : ${frTitle}`, en: `Quiz: ${enTitle}` };
  const course = createCourse(id, [title.fr, title.en], frQuestion, frAnswer, ["choix", "feedback", "cas limite", "maintenance", "utilisateur"]);
  const guide = createGuide(id, ["choix", "feedback", "cas limite", "maintenance", "utilisateur"]);
  return {
    ...item,
    course,
    guide,
    questions: [
      { id: `${id}-single`, type: "single", prompt, choices, answer: "correct", explanation },
      { id: `${id}-multiple`, type: "multiple", prompt: { fr: `Quelles stratégies protègent ${frTitle} ?`, en: `Which strategies protect ${enTitle}?` }, choices: [{ id: "fail-fast", label: { fr: "Échouer tôt avec une erreur explicite", en: "Fail fast with an explicit error" } }, { id: "pure", label: { fr: "Isoler la transformation testable", en: "Isolate the testable transformation" } }, { id: "ignore", label: { fr: "Ignorer les cas limites", en: "Ignore edge cases" } }], answer: ["fail-fast", "pure"], explanation },
      { id: `${id}-tf`, type: "true-false", prompt: { fr: `Pour ${frTitle}, vrai ou faux : ${profile.risk[0]} est acceptable en production.`, en: `For ${enTitle}, true or false: ${profile.risk[1]} is acceptable in production.` }, choices: [{ id: "true", label: { fr: "Vrai", en: "True" } }, { id: "false", label: { fr: "Faux", en: "False" } }], answer: "false", explanation },
      { id: `${id}-order`, type: "ordering", prompt: { fr: `Classe la sécurisation de ${frTitle}.`, en: `Order the hardening of ${enTitle}.` }, choices: [{ id: "read", label: { fr: "Identifier les entrées", en: "Identify inputs" } }, { id: "guard", label: { fr: "Ajouter des garde-fous (type, limites)", en: "Add guardrails (type, bounds)" } }, { id: "logic", label: { fr: "Exécuter la logique métier", en: "Execute business logic" } }, { id: "test", label: { fr: "Prouver avec un cas limite", en: "Prove with an edge case" } }], answer: ["read", "guard", "logic", "test"], explanation },
      { id: `${id}-code`, type: "code-reading", prompt: { fr: `Dans ${frTitle}, quel risque crée l'absence de validation ?`, en: `In ${enTitle}, what risk does missing validation create?` }, choices: [{ id: "risk", label: { fr: profile.risk[0], en: profile.risk[1] } }, { id: "perf", label: { fr: "Un détail cosmétique", en: "A cosmetic detail" } }, { id: "ok", label: { fr: "Aucun risque", en: "No risk" } }], answer: "risk", explanation },
      { id: `${id}-open`, type: "short-open", prompt: { fr: `Quelle preuve de robustesse citerais-tu pour ${frTitle} ?`, en: `What robustness evidence would you cite for ${enTitle}?` }, choices: [], answer: ["erreur", "test", "limite", "try", "catch"], explanation }
    ],
    pedagogy: getPedagogy(id, { course, guide, title, brief: item.brief, solution: frAnswer, type: "quiz" }),
    passingScore: 75,
    randomizeQuestions: false,
    feedbackMode: "immediate"
  };
}
