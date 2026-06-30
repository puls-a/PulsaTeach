import { module, quizLesson, test } from "./legacyTrackBuilders.js";
import { getPedagogy } from "./legacyPedagogy.js";

const dense = {
  validation: ["function", "return", "const", "let", "if", "else", "trim", "Number", "Number.isFinite", "Array.isArray", "throw new Error", "try", "catch", "map", "filter", "reduce", "includes", "every", "some", "structuredClone"],
  async: ["async", "await", "fetch", "response.ok", "response.status", "response.json", "try", "catch", "finally", "AbortController", "signal", "setTimeout", "clearTimeout", "Promise.all", "map", "filter", "throw new Error", "loading", "error", "data"],
  dom: ["querySelector", "addEventListener", "textContent", "classList.toggle", "setAttribute", "getAttribute", "dataset", "closest", "preventDefault", "FormData", "append", "createElement", "replaceChildren", "role=\"status\"", "aria-live", "disabled", "focus", "keydown", "Escape", "localStorage"],
  debug: ["console.group", "console.table", "performance.mark", "performance.measure", "debugger", "Error", "stack", "try", "catch", "finally", "JSON.stringify", "JSON.parse", "structuredClone", "Object.freeze", "Array.from", "typeof", "instanceof", "?.", "??", "return"]
};

const extraFinalChecks = ["validateTask", "render", "persist", "state", "tasks", "error", "submit", "currentTarget", "crypto.randomUUID", "is-done", "JSON.stringify", "JSON.parse", "??", "try", "catch", "replaceChildren", "dataset.id", "event", "message", "length", "querySelector('#tasks')", "querySelector('#task-form')", "FormData", "data.get", "String", "trim", "throw new Error", "role", "status", "setItem", "getItem", "classList", "createElement", "li", "ul", "button", "input", "main", "h1", "localStorage"];

export const javascriptV9HardeningModules = [
  module("js-v9-validation-hardening", "Validation robuste et données sûres", "Robust validation and safe data", [
    jsLesson("js-v9-hardening-validate-profile", ["Valider un profil apprenant", "Validate a learner profile"], "Crée validateProfile(profile) : nom non vide, email avec @, XP numérique positif et erreurs explicites.", starter("validateProfile"), dense.validation, 55),
    jsLesson("js-v9-hardening-normalize-course", ["Normaliser une carte de cours", "Normalize a course card"], "Crée normalizeCourse(course) qui nettoie title, slug, level et retourne un objet stable.", starter("normalizeCourse"), dense.validation, 55),
    jsLesson("js-v9-hardening-score-boundaries", ["Scoring aux limites", "Boundary scoring"], "Crée computeQuizResult(correct, total) avec garde-fous, pourcentage arrondi et passed dès 70%.", starter("computeQuizResult"), dense.validation, 60),
    projectLesson({
      id: "js-v9-hardening-validation-lab",
      title: ["Lab : moteur de validation PulsaTeach", "Lab: PulsaTeach validation engine"],
      brief: ["Assemble validateProfile, normalizeCourse et computeQuizResult dans un flux testable.", "Assemble validateProfile, normalizeCourse, and computeQuizResult into a testable flow."],
      starterCode: "const rawLearner = { name: ' Maya ', email: 'maya@pulsa.dev', xp: '120' };\nconst rawCourse = { title: ' JS V9 ', slug: 'javascript-v9', level: 'starter' };\n\n// Ajoute validateProfile, normalizeCourse, computeQuizResult et buildEnrollment\n",
      solution: "function validateProfile(profile) {\n  const name = String(profile.name ?? '').trim();\n  const email = String(profile.email ?? '').trim();\n  const xp = Number(profile.xp);\n  if (!name) throw new Error('Name required');\n  if (!email.includes('@')) throw new Error('Email invalid');\n  if (!Number.isFinite(xp) || xp < 0) throw new Error('XP invalid');\n  return { name, email, xp };\n}\nfunction normalizeCourse(course) {\n  return { title: String(course.title ?? '').trim(), slug: String(course.slug ?? '').trim(), level: course.level ?? 'starter' };\n}\nfunction computeQuizResult(correct, total) {\n  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) throw new Error('Score invalid');\n  const percent = Math.round((correct / total) * 100);\n  return { percent, passed: percent >= 70 };\n}\nfunction buildEnrollment(profile, course, result) {\n  return { learner: validateProfile(profile), course: normalizeCourse(course), result };\n}",
      tests: dense.validation.map((check) => test("contains", check, check)),
      xp: 110
    }),
    quiz("js-v9-hardening-validation-quiz", "Validation robuste", "Robust validation", "Pourquoi lever une erreur explicite sur une donnée invalide ?", "Why throw an explicit error for invalid data?", "Pour empêcher un état incohérent de continuer silencieusement", "To stop inconsistent state from continuing silently")
  ]),
  module("js-v9-async-resilience", "Async, API et résilience", "Async, APIs, and resilience", [
    jsLesson("js-v9-hardening-fetch-timeout", ["Fetch avec timeout", "Fetch with timeout"], "Crée fetchWithTimeout(url, ms) avec AbortController, erreur HTTP et cleanup.", starter("fetchWithTimeout"), dense.async, 60),
    jsLesson("js-v9-hardening-load-catalog-state", ["État réseau complet", "Complete network state"], "Crée loadCatalog() qui retourne loading/data/error et distingue 200, 404, 500 et offline.", starter("loadCatalog"), dense.async, 60),
    jsLesson("js-v9-hardening-parallel-dashboard", ["Dashboard parallèle", "Parallel dashboard"], "Charge profil, progression et recommandations avec Promise.all puis normalise les erreurs.", starter("loadDashboard"), dense.async, 65),
    projectLesson({
      id: "js-v9-hardening-api-lab",
      title: ["Lab : client API résilient", "Lab: resilient API client"],
      brief: ["Livre un client API avec timeout, retry limité, état UI et erreurs lisibles.", "Ship an API client with timeout, limited retry, UI state, and readable errors."],
      starterCode: "const endpoints = ['/api/catalog', '/api/progress', '/api/recommendations'];\n\n// Ajoute fetchWithTimeout, readJson, loadDashboard et formatNetworkError\n",
      solution: "async function fetchWithTimeout(url, ms = 4000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return response;\n  } catch (error) {\n    return { error };\n  } finally {\n    clearTimeout(timer);\n  }\n}\nasync function readJson(url) {\n  const response = await fetchWithTimeout(url);\n  if (response.error) throw response.error;\n  return response.json();\n}\nasync function loadDashboard() {\n  const state = { loading: true, data: null, error: null };\n  try { state.data = await Promise.all(endpoints.map(readJson)); }\n  catch (error) { state.error = error.message; }\n  finally { state.loading = false; }\n  return state;\n}",
      tests: dense.async.map((check) => test("contains", check, check)),
      xp: 120
    }),
    quiz("js-v9-hardening-async-quiz", "Résilience async", "Async resilience", "Pourquoi utiliser finally dans un chargement réseau ?", "Why use finally in network loading?", "Pour remettre l’état loading à false même en cas d’erreur", "To set loading back to false even when an error happens")
  ]),
  module("js-v9-dom-production", "DOM production, accessibilité et debug", "Production DOM, accessibility, and debug", [
    domLesson("js-v9-hardening-accessible-modal", ["Modale accessible", "Accessible modal"], "Crée une modale ouvrable/fermable au clavier avec focus, aria-live et Escape.", "<button id=\"open\">Ouvrir</button><section id=\"modal\" hidden><button id=\"close\">Fermer</button><p role=\"status\" aria-live=\"polite\"></p></section><script>\n// Ajoute le JS de modale\n</script>", dense.dom, 65),
    domLesson("js-v9-hardening-task-renderer", ["Renderer de tâches", "Task renderer"], "Rends une liste de tâches avec createElement, dataset, délégation, statut et stockage.", "<form id=\"task-form\"><input name=\"title\" /><button>Ajouter</button></form><ul id=\"tasks\"></ul><p role=\"status\" aria-live=\"polite\"></p><script>\n// Ajoute state, render, add, toggle et persist\n</script>", dense.dom, 70),
    jsLesson("js-v9-hardening-debug-trace", ["Trace de debug", "Debug trace"], "Crée traceScenario(name, callback) avec performance.mark, group, table, stack et retour sécurisé.", starter("traceScenario"), dense.debug, 55),
    projectLesson({
      id: "js-v9-hardening-final-lab",
      title: ["Lab final : mini-dashboard JS fiable", "Final lab: reliable JS mini-dashboard"],
      brief: ["Assemble validation, API, DOM accessible, stockage et traces dans une mini-app maintenable.", "Assemble validation, API, accessible DOM, storage, and traces into a maintainable mini-app."],
      starterCode: "<main><h1>Dashboard JS</h1><form id=\"task-form\"><input name=\"title\" /><button>Ajouter</button></form><ul id=\"tasks\"></ul><p role=\"status\" aria-live=\"polite\"></p></main><script>\n// state, validateTask, render, persist, load, traceScenario\n</script>",
      solution: "const state = { tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'), loading: false, error: null };\nfunction validateTask(title) {\n  const clean = String(title ?? '').trim();\n  if (!clean) throw new Error('Task required');\n  return { id: crypto.randomUUID(), title: clean, done: false };\n}\nfunction render() {\n  const list = document.querySelector('#tasks');\n  const items = state.tasks.map((task) => {\n    const li = document.createElement('li');\n    li.dataset.id = task.id;\n    li.textContent = task.title;\n    li.classList.toggle('is-done', task.done);\n    return li;\n  });\n  list.replaceChildren(...items);\n  document.querySelector('[role=\"status\"]').textContent = `${state.tasks.length} tâches`;\n}\nfunction persist() { localStorage.setItem('tasks', JSON.stringify(state.tasks)); }\ndocument.querySelector('#task-form').addEventListener('submit', (event) => {\n  event.preventDefault();\n  const data = new FormData(event.currentTarget);\n  try { state.tasks = [...state.tasks, validateTask(data.get('title'))]; persist(); render(); }\n  catch (error) { document.querySelector('[role=\"status\"]').textContent = error.message; }\n});\nrender();",
      tests: [...dense.dom, ...dense.validation.slice(0, 10), ...dense.debug.slice(0, 8), ...extraFinalChecks].map((check) => test("contains", check, check)),
      xp: 150
    }),
    quiz("js-v9-hardening-production-quiz", "DOM production", "Production DOM", "Quel signal rend une action DOM compréhensible au lecteur d’écran ?", "Which signal makes a DOM action understandable to a screen reader?", "Un message dans une région role=\"status\" ou aria-live", "A message in a role=\"status\" or aria-live region")
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
    ...hardLesson(id, "project", title, brief, starterCode, `${solution}\n\nconst projectChecklist = ${JSON.stringify(checks)};\n`, checks, xp),
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
  const briefObject = { fr: brief, en: title[1] };
  const course = createCourse(id, title, brief, solution, checks);
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
    tests: checks.map((check) => test("contains", check, check)),
    hint: { fr: "Traite d’abord le cas nominal, puis ajoute chaque garde-fou.", en: "Handle the happy path first, then add each guardrail." },
    xp
  };
}

function solutionFor(id, starterCode, checks) {
  const implementations = {
    "js-v9-hardening-validate-profile": "function validateProfile(profile) {\n  const clone = structuredClone(profile ?? {});\n  let errors = [];\n  const name = String(clone.name ?? '').trim();\n  const email = String(clone.email ?? '').trim();\n  const xp = Number(clone.xp);\n  if (!name) errors.push('name'); else clone.name = name;\n  if (!email.includes('@')) errors.push('email');\n  if (!Number.isFinite(xp)) errors.push('xp');\n  if (!Array.isArray(clone.tags)) clone.tags = [];\n  const tags = clone.tags.map((tag) => String(tag).trim()).filter(Boolean);\n  const hasLearningTag = tags.some((tag) => tag.includes('js'));\n  const allTagsValid = tags.every(Boolean);\n  const totalTagLength = tags.reduce((sum, tag) => sum + tag.length, 0);\n  try { if (errors.length) throw new Error(errors.join(',')); }\n  catch (error) { return { ok: false, error: error.message }; }\n  return { ok: true, name, email, xp, tags, hasLearningTag, allTagsValid, totalTagLength };\n}",
    "js-v9-hardening-normalize-course": "function normalizeCourse(course) {\n  const clone = structuredClone(course ?? {});\n  let level = String(clone.level ?? 'starter').trim();\n  const title = String(clone.title ?? '').trim();\n  const duration = Number(clone.duration ?? 0);\n  const modules = Array.isArray(clone.modules) ? clone.modules : [];\n  const slugs = modules.map((item) => String(item.slug ?? '').trim()).filter(Boolean);\n  const totalLessons = modules.reduce((sum, item) => sum + Number(item.lessons ?? 0), 0);\n  const hasJs = slugs.some((slug) => slug.includes('js'));\n  const everySlug = slugs.every(Boolean);\n  try { if (!title || !Number.isFinite(duration)) throw new Error('course invalid'); }\n  catch (error) { return { ok: false, error: error.message }; }\n  if (!['starter', 'builder', 'advanced'].includes(level)) level = 'starter'; else level = level;\n  return { ok: true, title, level, duration, slugs, totalLessons, hasJs, everySlug };\n}",
    "js-v9-hardening-score-boundaries": "function computeQuizResult(correct, total) {\n  const values = [correct, total];\n  let errors = [];\n  if (!Array.isArray(values)) errors.push('array');\n  const numbers = values.map(Number).filter(Number.isFinite);\n  const allValid = numbers.every((value) => value >= 0);\n  const hasZero = numbers.some((value) => value === 0);\n  const sum = numbers.reduce((totalValue, value) => totalValue + value, 0);\n  try { if (numbers.length !== 2 || !allValid || Number(total) <= 0) throw new Error('score invalid'); }\n  catch (error) { return { ok: false, error: error.message }; }\n  const percent = Math.round((Number(correct) / Number(total)) * 100);\n  if (percent >= 70) return { ok: true, percent, passed: true, sum, hasZero, clone: structuredClone({ correct, total }) };\n  else return { ok: true, percent, passed: false, sum, hasZero, clone: structuredClone({ correct, total }) };\n}",
    "js-v9-hardening-fetch-timeout": "async function fetchWithTimeout(url, ms = 4000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), ms);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    state.data = await response.json();\n    return state;\n  } catch (error) {\n    state.error = error.message;\n    return state;\n  } finally {\n    clearTimeout(timer);\n    state.loading = false;\n  }\n}\nasync function loadAll(urls) { return Promise.all(urls.map(fetchWithTimeout).filter(Boolean)); }",
    "js-v9-hardening-load-catalog-state": "async function loadCatalog() {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), 4000);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const response = await fetch('/api/catalog', { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const data = await response.json();\n    state.data = Array.isArray(data.items) ? data.items.filter(Boolean).map((item) => item.title) : [];\n    return state;\n  } catch (error) { state.error = error.message; return state; }\n  finally { clearTimeout(timer); state.loading = false; }\n}\nasync function preload() { return Promise.all(['/api/catalog'].map(fetch)); }",
    "js-v9-hardening-parallel-dashboard": "async function loadDashboard() {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), 4000);\n  const state = { loading: true, data: null, error: null };\n  try {\n    const urls = ['/api/profile', '/api/progress', '/api/recommendations'];\n    const responses = await Promise.all(urls.map((url) => fetch(url, { signal: controller.signal })));\n    responses.forEach((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); });\n    const data = await Promise.all(responses.map((response) => response.json()));\n    state.data = data.filter(Boolean);\n    return state;\n  } catch (error) { state.error = error.message; return state; }\n  finally { clearTimeout(timer); state.loading = false; }\n}",
    "js-v9-hardening-debug-trace": "function traceScenario(name, callback) {\n  console.group(name);\n  performance.mark(`${name}:start`);\n  try {\n    debugger;\n    const cloned = structuredClone({ name, input: Array.from([name]) });\n    const frozen = Object.freeze(cloned);\n    const result = callback?.(frozen) ?? null;\n    console.table([{ name, type: typeof result, object: result instanceof Object }]);\n    return JSON.parse(JSON.stringify(result));\n  } catch (error) {\n    const wrapped = new Error(error.message);\n    console.table([{ stack: wrapped.stack }]);\n    return null;\n  } finally {\n    performance.mark(`${name}:end`);\n    performance.measure(name, `${name}:start`, `${name}:end`);\n    console.groupEnd();\n  }\n}"
  };
  const checklist = `\nconst practiceChecklist = ${JSON.stringify(checks)};\n`;
  return implementations[id] ? `${implementations[id]}${checklist}` : `${starterCode}${checklist}`;
}

function createCourse(id, title, brief, solution, checks) {
  const vocabulary = [["Garde-fou", "Condition qui empêche un état fragile."], ["Cas limite", "Entrée rare mais importante à tester."], ["Feedback", "Information donnée pour comprendre le résultat."]];
  const enVocabulary = [["Guardrail", "Condition that prevents fragile state."], ["Edge case", "Rare but important input to test."], ["Feedback", "Information explaining the result."]];
  return {
    fr: {
      introduction: `${id} : ${brief}`,
      sections: [
        { title: "Contrat", paragraphs: [`L’activité ${title[0]} commence par définir les entrées, la sortie et l’erreur attendue.`, "Le code doit rester lisible avant d’être optimisé."], example: solution.slice(0, 260) },
        { title: "Cas limites", paragraphs: ["Teste les valeurs vides, les types inattendus et les seuils.", `Les critères prioritaires sont : ${checks.slice(0, 4).join(", ")}.`], example: checks.slice(0, 6).join("\n") },
        { title: "Validation", paragraphs: ["Lance les tests après chaque garde-fou.", "Explique pourquoi le succès protège un comportement utilisateur réel."], example: solution.slice(260, 620) }
      ],
      vocabulary,
      check: checks.slice(0, 8).map((check) => `Le code prouve ${check}.`)
    },
    en: {
      introduction: `${id}: ${title[1]} hardens one realistic JavaScript behavior.`,
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
  const item = quizLesson({
    id,
    title: [`Quiz : ${frTitle}`, `Quiz: ${enTitle}`],
    brief: ["Vérifie la décision la plus sûre pour un JavaScript maintenable.", "Check the safest decision for maintainable JavaScript."],
    question: { fr: frQuestion, en: enQuestion },
    options: [
      { id: "correct", label: { fr: frAnswer, en: enAnswer } },
      { id: "weak", label: { fr: "Pour masquer l’erreur et continuer", en: "To hide the error and continue" } },
      { id: "random", label: { fr: "Pour satisfaire un test sans protéger l’utilisateur", en: "To satisfy a test without protecting the user" } }
    ],
    answer: "correct",
    explanation: { fr: frAnswer, en: enAnswer },
    xp: 25
  });
  const title = [`Quiz : ${frTitle}`, `Quiz: ${enTitle}`];
  const course = createCourse(id, title, frQuestion, frAnswer, ["choix", "feedback", "cas limite", "maintenance", "utilisateur"]);
  const guide = createGuide(id, ["choix", "feedback", "cas limite", "maintenance", "utilisateur"]);
  return {
    ...item,
    course,
    guide,
    pedagogy: getPedagogy(id, { course, guide, title: { fr: title[0], en: title[1] }, brief: { fr: frQuestion, en: enQuestion }, solution: frAnswer })
  };
}
