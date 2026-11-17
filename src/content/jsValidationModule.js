import { getPedagogy } from "./pedagogy.js";
import { module, quizLesson } from "./trackBuilders.js";

const T = (fr, en) => ({ fr, en });

const profileSolution = `function validateProfile(profile) {
  const name = typeof profile?.name === 'string' ? profile.name.trim() : '';
  const email = typeof profile?.email === 'string' ? profile.email.trim() : '';
  const xp = profile?.xp;
  if (!name) return { ok: false, error: 'Name required' };
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return { ok: false, error: 'Email invalid' };
  if (!Number.isFinite(xp) || xp < 0) return { ok: false, error: 'XP invalid' };
  return { ok: true, name, email, xp };
}`;

const courseSolution = `function normalizeCourse(course) {
  const title = typeof course?.title === 'string' ? course.title.trim() : '';
  const slug = typeof course?.slug === 'string' ? course.slug.trim().toLowerCase() : '';
  const level = typeof course?.level === 'string' ? course.level.trim().toLowerCase() : '';
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false, error: 'Course invalid' };
  if (!['starter', 'builder', 'advanced'].includes(level)) return { ok: false, error: 'Level invalid' };
  return { ok: true, title, slug, level };
}`;

const scoreSolution = `function computeQuizResult(correct, total) {
  if (!Number.isInteger(correct) || !Number.isInteger(total) || total <= 0 || correct < 0 || correct > total) {
    return { ok: false, error: 'Score invalid' };
  }
  const percent = Math.round((correct / total) * 100);
  return { ok: true, percent, passed: correct / total >= 0.7 };
}`;

const projectSolution = `${profileSolution}\n\n${courseSolution}\n\n${scoreSolution}

function buildEnrollment(profile, course, correct, total) {
  const learner = validateProfile(profile);
  if (!learner.ok) return { ok: false, error: learner.error };
  const normalizedCourse = normalizeCourse(course);
  if (!normalizedCourse.ok) return { ok: false, error: normalizedCourse.error };
  const result = computeQuizResult(correct, total);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, learner, course: normalizedCourse, result };
}`;

const cases = [
  {
    id: "js-hardening-validate-profile",
    title: T("Valider un profil apprenant", "Validate a learner profile"),
    brief: T("Nettoie nom et email ; refuse un nom vide, un email invalide et des XP négatifs ou non numériques sans modifier l'entrée.", "Trim name and email; reject an empty name, invalid email, and negative or nonnumeric XP without mutating the input."),
    starter: T("function validateProfile(profile) {\n  // Retourne { ok, name, email, xp } ou une erreur.\n}", "function validateProfile(profile) {\n  // Return { ok, name, email, xp } or an error.\n}"),
    solution: profileSolution,
    example: "function cleanName(value) { return typeof value === 'string' ? value.trim() : ''; }",
    tests: [
      check("Le profil valide est nettoyé sans mutation", "Valid profile is normalized without mutation", "const input = { name: ' Maya ', email: ' maya@example.org ', xp: 0 }; const result = validateProfile(input); return result.ok && result.name === 'Maya' && result.email === 'maya@example.org' && result.xp === 0 && input.name === ' Maya ';"),
      check("Les entrées invalides échouent avec une erreur utile", "Invalid inputs fail with an actionable error", "return [{name:' ', email:'a@example.org', xp:2}, {name:'M', email:'invalid', xp:2}, {name:'M', email:'m@example.org', xp:-1}, {name:'M', email:'m@example.org', xp:'7'}, null].every((input) => { const result = validateProfile(input); return result.ok === false && typeof result.error === 'string' && result.error.length > 3; });")
    ]
  },
  {
    id: "js-hardening-normalize-course",
    title: T("Normaliser une carte de cours", "Normalize a course card"),
    brief: T("Nettoie titre, slug et niveau puis refuse les titres vides, slugs malformés et niveaux inconnus.", "Normalize title, slug, and level, then reject empty titles, malformed slugs, and unknown levels."),
    starter: T("function normalizeCourse(course) {\n  // Retourne une carte stable ou une erreur.\n}", "function normalizeCourse(course) {\n  // Return a stable course or an error.\n}"),
    solution: courseSolution,
    example: "const label = String('  Atelier  ').trim();",
    tests: [
      check("La carte est normalisée sans modifier sa source", "Course is normalized without mutating its source", "const input = { title: ' JS ', slug: ' JavaScript-V9 ', level: ' BUILDER ' }; const result = normalizeCourse(input); return result.ok && result.title === 'JS' && result.slug === 'javascript-v9' && result.level === 'builder' && input.title === ' JS ';"),
      check("Titre, slug et niveau incohérents sont refusés", "Invalid title, slug, and level are rejected", "return [{title:' ', slug:'js', level:'starter'}, {title:'JS', slug:'js v9', level:'starter'}, {title:'JS', slug:'js-v9', level:'expert'}, null].every((input) => { const result = normalizeCourse(input); return result.ok === false && Boolean(result.error); });")
    ]
  },
  {
    id: "js-hardening-score-boundaries",
    title: T("Scoring aux limites", "Boundary scoring"),
    brief: T("Compte seulement les scores entiers compris entre zéro et le total ; arrondis le pourcentage affiché sans déplacer le vrai seuil de réussite à 70 %.", "Accept only whole scores from zero to total; round the displayed percentage without moving the real 70% passing threshold."),
    starter: T("function computeQuizResult(correct, total) {\n  // Vérifie les bornes avant de calculer le pourcentage.\n}", "function computeQuizResult(correct, total) {\n  // Check the bounds before calculating the percentage.\n}"),
    solution: scoreSolution,
    example: "const proportion = 3 / 4; const percent = Math.round(proportion * 100);",
    tests: [
      check("Les scores à 60, 70 et 100 % restent distincts", "Scores at 60, 70, and 100% stay distinct", "const pass = computeQuizResult(7, 10); const fail = computeQuizResult(6, 10); const perfect = computeQuizResult(10, 10); return pass.ok && pass.percent === 70 && pass.passed === true && fail.ok && fail.percent === 60 && fail.passed === false && perfect.ok && perfect.percent === 100 && perfect.passed === true;"),
      check("L'arrondi n'abaisse pas le seuil réel", "Rounding never lowers the real threshold", "const near = computeQuizResult(139, 200); return near.ok && near.percent === 70 && near.passed === false;"),
      check("Les scores impossibles et décimaux sont refusés", "Impossible and fractional scores are rejected", "return [[1,0],[-1,10],[11,10],[2.5,10],[2,2.5],['7',10],[NaN,10]].every(([correct,total]) => { const result = computeQuizResult(correct,total); return result.ok === false && Boolean(result.error); });")
    ]
  }
];

function check(fr, en, value) {
  return { type: "jsExpression", label: T(fr, en), value };
}

function courseFor(item) {
  return {
    fr: { introduction: `${item.brief.fr} Chaque scénario teste la sortie produite, pas la présence d'un mot-clé.`, sections: [
      { title: "Contrat", paragraphs: [item.brief.fr, "Définis les entrées acceptées et la forme explicite du retour avant de coder."], example: item.example },
      { title: "Cas nominal", paragraphs: ["Teste au moins une donnée valide et observe la valeur retournée.", "Vérifie que la source n'est pas modifiée par la normalisation."], example: "const value = '  Atelier  '.trim();" },
      { title: "Cas limites", paragraphs: ["Teste les valeurs absentes, malformées et les bornes annoncées.", "Une erreur doit empêcher de poursuivre avec une donnée incohérente."], example: "if (!Number.isFinite(value)) return { ok: false, error: 'Invalid value' };" }
    ], vocabulary: [["contrat", "Entrées, sorties et erreurs attendues."], ["validation", "Refus explicite d'une donnée qui ne respecte pas le contrat."], ["borne", "Valeur à vérifier au seuil et de part et d'autre."]], check: ["Je peux citer un cas valide.", "Je peux citer une entrée refusée.", "La sortie est vérifiée par un test d'exécution."] },
    en: { introduction: `${item.brief.en} Each scenario checks the produced result, not the presence of a keyword.`, sections: [
      { title: "Contract", paragraphs: [item.brief.en, "Define accepted inputs and the explicit return shape before writing code."], example: item.example },
      { title: "Happy path", paragraphs: ["Test at least one valid input and inspect the returned value.", "Verify that normalization does not mutate the source."], example: "const value = '  Workshop  '.trim();" },
      { title: "Boundaries", paragraphs: ["Test missing, malformed, and out-of-range values.", "An error must stop inconsistent data from continuing."], example: "if (!Number.isFinite(value)) return { ok: false, error: 'Invalid value' };" }
    ], vocabulary: [["contract", "Expected inputs, outputs, and errors."], ["validation", "Explicitly rejecting data outside the contract."], ["boundary", "A value tested at and on both sides of a limit."]], check: ["I can name one valid case.", "I can name an input to reject.", "A runtime check verifies the result."] }
  };
}

function guideFor(item) {
  return {
    fr: { objectives: [item.brief.fr, "Respecter le contrat sans modifier les données sources.", "Faire passer un cas nominal et un refus explicite."], prerequisites: ["Savoir lire une fonction JavaScript.", "Connaître les objets et les valeurs absentes.", "Savoir lancer un test."], steps: ["Définis le résultat attendu pour une entrée valide.", "Ajoute les gardes ciblées avant le calcul.", "Teste les bornes et lis le premier échec."], mistakes: [`Pour « ${item.title.fr} », imiter la syntaxe sans produire le résultat métier.`, "Accepter une valeur convertie silencieusement alors que le contrat exige un nombre.", "Arrondir le seuil de réussite avant de décider."] },
    en: { objectives: [item.brief.en, "Preserve the input without mutating it.", "Pass a happy path and an explicit failure case."], prerequisites: ["Know how to read a JavaScript function.", "Know objects and missing values.", "Know how to run a test."], steps: ["Define the expected result for valid input.", "Add targeted guards before computing.", "Test boundaries and read the first failure."], mistakes: [`For “${item.title.en},” copying syntax without producing the domain result.`, "Silently converting a value when the contract requires a number.", "Rounding the pass threshold before deciding."] }
  };
}

function lessonFor(item) {
  const course = courseFor(item);
  const guide = guideFor(item);
  return { id: item.id, type: "js", title: item.title, brief: item.brief, theory: item.brief, course, guide,
    pedagogy: getPedagogy(item.id, { course, guide, title: item.title, brief: item.brief, solution: item.example, type: "javascript" }),
    skills: ["validation", "boundary-cases"], difficulty: "intermediate", durationMin: 45, starterCode: item.starter, solution: item.solution,
    tests: item.tests, hint: T("Commence par la sortie nominale, puis refuse les cas limites sans les convertir silencieusement.", "Start with the nominal result, then reject edge cases without silently coercing them."), xp: 60 };
}

function projectFor() {
  const item = { title: T("Lab : moteur de validation PulsaTeach", "Lab: PulsaTeach validation engine"),
    brief: T("Assemble les trois validations pour n'inscrire que des profils, cours et scores cohérents.", "Combine all three validators so only valid profiles, courses, and scores are enrolled."),
    example: "function buildRecord(value) { return { ok: Boolean(value), value }; }" };
  const course = courseFor(item);
  const guide = guideFor(item);
  return { id: "js-hardening-validation-lab", type: "project", title: item.title, brief: item.brief, theory: item.brief, course, guide,
    pedagogy: getPedagogy("js-hardening-validation-lab", { course, guide, title: item.title, brief: item.brief, solution: item.example, type: "project" }),
    skills: ["validation", "enrollment", "boundary-cases"], difficulty: "project", durationMin: 140,
    starterCode: T("function validateProfile(profile) {\n  // Vérifie nom, email et XP.\n}\nfunction normalizeCourse(course) {\n  // Nettoie titre, slug et niveau.\n}\nfunction computeQuizResult(correct, total) {\n  // Vérifie le seuil réel.\n}\nfunction buildEnrollment(profile, course, correct, total) {\n  // N'inscris rien si l'un des trois contrôles échoue.\n}", "function validateProfile(profile) {\n  // Check name, email, and XP.\n}\nfunction normalizeCourse(course) {\n  // Normalize title, slug, and level.\n}\nfunction computeQuizResult(correct, total) {\n  // Check the real passing threshold.\n}\nfunction buildEnrollment(profile, course, correct, total) {\n  // Reject enrollment if any of the three checks fails.\n}"),
    solution: projectSolution, tests: [
      ...cases.flatMap((practice) => practice.tests),
      check("L'inscription réunit les données propres et le score", "Enrollment combines normalized data and score", "const result = buildEnrollment({ name: ' Maya ', email: 'maya@example.org', xp: 0 }, { title: ' JS ', slug: ' JS-V9 ', level: 'starter' }, 7, 10); return result.ok && result.learner.name === 'Maya' && result.course.slug === 'js-v9' && result.result.passed;"),
      check("Aucune entrée incohérente ne crée une inscription", "Invalid data never creates an enrollment", "const learner = { name: ' ', email: 'maya@example.org', xp: 0 }; const course = { title: 'JS', slug: 'js', level: 'starter' }; return [buildEnrollment(learner, course, 7, 10), buildEnrollment({ name: 'Maya', email: 'maya@example.org', xp: 0 }, { ...course, slug: 'bad slug' }, 7, 10), buildEnrollment({ name: 'Maya', email: 'maya@example.org', xp: 0 }, course, 11, 10)].every((result) => result.ok === false && Boolean(result.error));")
    ], rubric: T(["Le profil est validé et nettoyé sans mutation.", "Les champs du cours gardent un format stable.", "Le score accepte 70 % sans accepter 69,5 % ni les entrées impossibles.", "L'inscription refuse tout profil, cours ou score invalide avec une erreur explicite."], ["The profile is validated and normalized without mutation.", "Course fields keep a stable format.", "Scoring accepts 70% but rejects 69.5% and impossible inputs.", "Enrollment rejects any invalid profile, course, or score with an explicit error."]),
    hint: T("Réutilise les trois fonctions validées, puis arrête l'inscription au premier échec.", "Reuse the three validated functions, then stop enrollment on its first failure."), xp: 110 };
}

function quizFor() {
  const title = T("Quiz : validation robuste", "Quiz: robust validation");
  const brief = T("Décide quand refuser une donnée et quand un score atteint réellement le seuil.", "Decide when to reject data and when a score truly meets the threshold.");
  const explanation = T("Vérifie les bornes sur les valeurs sources avant de produire la sortie.", "Check boundaries on source values before producing the result.");
  const choices = (items) => items.map(([id, fr, en]) => ({ id, label: T(fr, en) }));
  const questions = [
    { id: "js-hardening-validation-quiz-single", type: "single", prompt: T("Un apprenant envoie xp='7'. Le contrat demande un nombre. Que faire ?", "A learner sends xp='7'. The contract requires a number. What should happen?"), choices: choices([["reject", "Refuser la chaîne avec une erreur", "Reject the string with an error"], ["coerce", "Accepter silencieusement 7", "Silently accept 7"], ["zero", "Remplacer par zéro", "Replace it with zero"]]), answer: "reject", explanation },
    { id: "js-hardening-validation-quiz-multiple", type: "multiple", prompt: T("Quelles entrées de score sont invalides pour un total de 10 ?", "Which scores are invalid when the total is 10?"), choices: choices([["negative", "-1 bonne réponse", "-1 correct answer"], ["above", "11 bonnes réponses", "11 correct answers"], ["half", "2,5 bonnes réponses", "2.5 correct answers"], ["zero", "0 bonne réponse", "0 correct answers"]]), answer: ["negative", "above", "half"], explanation },
    { id: "js-hardening-validation-quiz-tf", type: "true-false", prompt: T("Vrai ou faux : 139/200 réussit si l'affichage arrondit à 70 % ?", "True or false: does 139/200 pass if the display rounds to 70%?"), choices: choices([["true", "Vrai", "True"], ["false", "Faux", "False"]]), answer: "false", explanation },
    { id: "js-hardening-validation-quiz-order", type: "ordering", prompt: T("Ordonne l'inscription sûre.", "Order safe enrollment."), choices: choices([["profile", "Valider le profil", "Validate the profile"], ["course", "Normaliser le cours", "Normalize the course"], ["score", "Vérifier le score", "Check the score"], ["enroll", "Créer l'inscription", "Create enrollment"]]), answer: ["profile", "course", "score", "enroll"], explanation },
    { id: "js-hardening-validation-quiz-code", type: "code-reading", prompt: T("Quelle comparaison garantit le vrai seuil de 70 % ?", "Which comparison enforces the real 70% threshold?"), choices: choices([["ratio", "correct / total >= 0.7", "correct / total >= 0.7"], ["rounded", "Math.round(correct / total * 100) >= 70", "Math.round(correct / total * 100) >= 70"], ["count", "correct >= 7 sans regarder total", "correct >= 7 without checking total"]]), answer: "ratio", explanation },
    { id: "js-hardening-validation-quiz-open", type: "short-open", prompt: T("Nomme deux données à vérifier avant de créer une inscription.", "Name two inputs to validate before creating an enrollment."), choices: [], answer: T(["profil", "cours"], ["profile", "course"]), keywords: ["profil", "cours", "profile", "course"], explanation }
  ];
  const base = quizLesson({ id: "js-hardening-validation-quiz", title: [title.fr, title.en], brief: [brief.fr, brief.en], question: questions[0].prompt, options: questions[0].choices, answer: "reject", explanation, xp: 35 });
  const course = courseFor({ ...cases[0], brief });
  const guide = guideFor({ ...cases[0], title, brief });
  return { ...base, course, guide, pedagogy: getPedagogy(base.id, { course, guide, title, brief, type: "quiz" }), questions, passingScore: 75, randomizeQuestions: false };
}

export const jsValidationHardeningModule = module("js-validation-hardening", "Validation robuste et données sûres", "Robust validation and safe data", [
  ...cases.map(lessonFor), projectFor(), quizFor()
]);
