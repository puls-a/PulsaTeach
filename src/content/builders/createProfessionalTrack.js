export function createProfessionalTrack(config) {
  return {
    id: config.id,
    label: config.label,
    title: localized(config.title),
    summary: localized(config.summary),
    level: localized(config.level || ["Débutant à intermédiaire", "Beginner to intermediate"]),
    profession: localized(config.profession),
    prerequisites: localizedList(config.prerequisites),
    outcomes: localizedList(config.outcomes),
    capstone: localized(config.capstone),
    certification: localizedList((config.certification || []).filter((criterion) => {
      const values = Array.isArray(criterion) ? criterion : [criterion];
      return !values.some((value) => /quiz/i.test(String(value)));
    })),
    modules: config.modules.map((module) => createModule(config, module))
  };
}

function createModule(track, module) {
  const lessons = module.lessons.map((lesson) => lesson.type === "quiz"
    ? createQuizLesson(track, module, lesson)
    : createPracticeLesson(track, module, lesson));
  return {
    id: module.id,
    title: localized(module.title),
    description: localized(module.description),
    importance: localized(module.description),
    deliverable: localized(module.deliverable || module.description),
    prerequisites: localizedList(module.prerequisites || track.prerequisites),
    outcomes: localizedList(module.outcomes || [module.description[0], module.description[1]]),
    vocabulary: localizedList(module.vocabulary.map((entry) => [entry[0], entry[1]])),
    mastery: localizedList(module.mastery || module.outcomes || [module.description[0], module.description[1]]),
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0),
    lessons
  };
}

function createPracticeLesson(track, module, lesson) {
  const vocabulary = ensureVocabulary(lesson.vocabulary || module.vocabulary);
  const type = lesson.project ? "project" : lesson.type || "text";
  const runtime = lesson.runtime || (type === "project" ? lesson.exerciseType || "text" : undefined);
  const title = localized(lesson.title);
  const brief = localized(lesson.brief);
  const solution = lesson.solution || lesson.example || "";
  const requirements = lesson.requirements || [];
  const course = {
    fr: courseLocale(track, module, lesson, vocabulary, "fr"),
    en: courseLocale(track, module, lesson, vocabulary, "en")
  };
  const pedagogy = {
    fr: pedagogyLocale(track, lesson, vocabulary, "fr"),
    en: pedagogyLocale(track, lesson, vocabulary, "en")
  };
  return {
    id: lesson.id,
    type,
    runtime,
    title,
    brief,
    course,
    pedagogy,
    theory: {
      fr: { points: course.fr.rules, example: solution },
      en: { points: course.en.rules, example: solution }
    },
    guide: {
      fr: { objectives: course.fr.objectives, steps: pedagogy.fr.guided, mistakes: [`${title.fr} : appliquer une règle sans vérifier son effet.`, "Confondre conformité automatique et usage réel.", "Corriger sans conserver de preuve."] },
      en: { objectives: course.en.objectives, steps: pedagogy.en.guided, mistakes: [`${title.en}: apply a rule without checking its effect.`, "Confuse automated compliance with real use.", "Fix without preserving evidence."] }
    },
    skills: lesson.skills || [],
    difficulty: lesson.difficulty || "starter",
    durationMin: lesson.durationMin || (lesson.project ? 110 : 30),
    starterCode: lesson.starterCode || starterFor(type, runtime),
    solution,
    previewHtml: lesson.previewHtml,
    tests: requirements.map((requirement) => typeof requirement === "string"
      ? { type: "contains", label: `${requirement} is present`, value: requirement }
      : requirement),
    rubric: lesson.project ? localizedList(lesson.rubric || [
      ["Le résultat répond au brief.", "The result meets the brief."],
      ["Les décisions sont expliquées.", "Decisions are explained."],
      ["Les vérifications sont reproductibles.", "Checks are reproducible."],
      ["La solution reste lisible et maintenable.", "The solution remains readable and maintainable."]
    ]) : undefined,
    hint: {
      fr: pedagogy.fr.hints[0],
      en: pedagogy.en.hints[0]
    },
    xp: lesson.xp || (lesson.project ? 90 : 35)
  };
}

function createQuizLesson(track, module, lesson) {
  const vocabulary = ensureVocabulary(lesson.vocabulary || module.vocabulary);
  const title = localized(lesson.title);
  const brief = localized(lesson.brief || ["Vérifie les acquis du module.", "Check the module learning outcomes."]);
  const course = {
    fr: courseLocale(track, module, { ...lesson, title: [title.fr, title.en], brief: [brief.fr, brief.en], solution: "" }, vocabulary, "fr"),
    en: courseLocale(track, module, { ...lesson, title: [title.fr, title.en], brief: [brief.fr, brief.en], solution: "" }, vocabulary, "en")
  };
  const pedagogy = {
    fr: pedagogyLocale(track, { ...lesson, title: [title.fr, title.en], solution: "" }, vocabulary, "fr"),
    en: pedagogyLocale(track, { ...lesson, title: [title.fr, title.en], solution: "" }, vocabulary, "en")
  };
  return {
    id: lesson.id,
    type: "quiz",
    purpose: lesson.purpose || "module-review",
    title,
    brief,
    course,
    pedagogy,
    theory: { fr: { points: course.fr.rules, example: "" }, en: { points: course.en.rules, example: "" } },
    guide: {
      fr: { objectives: course.fr.objectives, steps: pedagogy.fr.guided, mistakes: [`${title.fr} : répondre sans relire le scénario.`, "Ignorer les distracteurs plausibles.", "Mémoriser sans expliquer."] },
      en: { objectives: course.en.objectives, steps: pedagogy.en.guided, mistakes: [`${title.en}: answer without rereading the scenario.`, "Ignore plausible distractors.", "Memorize without explaining."] }
    },
    skills: [...new Set(lesson.questions.flatMap((question) => question.skills || []))],
    difficulty: lesson.difficulty || "starter",
    durationMin: lesson.durationMin || 20,
    starterCode: "",
    solution: "",
    tests: [{ type: "quiz", label: "Passing score", value: String(lesson.passingScore || 70) }],
    questions: lesson.questions.map(normalizeQuestion),
    passingScore: lesson.passingScore || 70,
    randomizeQuestions: lesson.randomizeQuestions !== false,
    feedbackMode: lesson.feedbackMode || "immediate",
    hint: { fr: "Relis le scénario et élimine les réponses qui n’aident pas l’utilisateur.", en: "Reread the scenario and eliminate answers that do not help the user." },
    xp: lesson.xp || (lesson.purpose === "exam" ? 100 : 30)
  };
}

function courseLocale(track, module, lesson, vocabulary, locale) {
  const index = locale === "fr" ? 0 : 1;
  const title = lesson.title[index];
  const brief = lesson.brief[index];
  const verification = lesson.verification?.[index] || (locale === "fr" ? "Vérifie le résultat avec une méthode manuelle et un test automatisé pertinent." : "Verify the result with a manual method and a relevant automated test.");
  const requirements = readableRequirements(lesson.requirements || [], locale);
  const implementation = requirements.length
    ? (locale === "fr" ? `La réalisation doit rendre visibles ces preuves : ${requirements.join(", ")}.` : `The implementation must expose this evidence: ${requirements.join(", ")}.`)
    : (locale === "fr" ? "Décompose le résultat attendu en comportements observables avant d’écrire la solution." : "Break the expected result into observable behaviors before writing the solution.");
  const firstTerm = vocabulary[0]?.[index] || title;
  const secondTerm = vocabulary[1]?.[index] || (locale === "fr" ? "contrainte" : "constraint");
  const thirdTerm = vocabulary[2]?.[index] || (locale === "fr" ? "preuve" : "evidence");
  const professionalContext = locale === "fr"
    ? `Dans une vraie équipe, « ${title} » n’est pas une astuce isolée : c’est une décision que tu dois pouvoir relier à ${firstTerm}, ${secondTerm} et ${thirdTerm}.`
    : `In a real team, “${title}” is not an isolated trick: it is a decision you must connect to ${firstTerm}, ${secondTerm}, and ${thirdTerm}.`;
  const reviewChecklist = locale === "fr"
    ? `Avant de valider, prépare une mini revue : quel utilisateur est aidé, quel risque est réduit, quel contrôle prouve le résultat, et quelle limite reste connue ?`
    : `Before validating, prepare a mini review: which user is helped, which risk is reduced, which check proves the result, and which known limitation remains?`;
  const productionTransfer = locale === "fr"
    ? `Transfert en production : garde un exemple minimal, une preuve reproductible et une phrase de justification. Ce trio rend la compétence réutilisable hors de l’exercice.`
    : `Production transfer: keep a minimal example, reproducible evidence, and one justification sentence. This trio makes the skill reusable outside the exercise.`;
  return {
    introduction: locale === "fr"
      ? `${title} — ${brief} Dans ce module, tu vas relier ${firstTerm}, le code fourni et une preuve que tu peux reproduire. ${professionalContext}`
      : `${title} — ${brief} In this module, you will connect ${firstTerm}, the provided code, and evidence you can reproduce. ${professionalContext}`,
    objectives: locale === "fr"
      ? [`Expliquer le rôle de ${firstTerm} dans ce cas précis.`, `Construire « ${title} » à partir du brief.`, `Prouver le résultat avec ${requirements[0] || "un contrôle observable"}.`]
      : [`Explain the role of ${firstTerm} in this exact case.`, `Build “${title}” from the brief.`, `Prove the result with ${requirements[0] || "an observable check"}.`],
    vocabulary: vocabulary.map((entry) => [entry[index], entry[index + 2]]),
    sections: [
      { title: locale === "fr" ? "Le problème à résoudre" : "The problem to solve", paragraphs: [module.description[index], brief, professionalContext], example: lesson.badExample || "" },
      { title: locale === "fr" ? "Le contrat de la solution" : "The solution contract", paragraphs: [implementation, reviewChecklist], example: lesson.solution || lesson.example || "" },
      { title: locale === "fr" ? "La preuve attendue" : "Expected evidence", paragraphs: [verification, requirements.length ? (locale === "fr" ? `Contrôles ciblés : ${requirements.join(" · ")}.` : `Targeted checks: ${requirements.join(" · ")}.`) : "", productionTransfer].filter(Boolean), example: lesson.verificationExample || "" }
    ],
    rules: requirements.slice(0, 3).length ? requirements.slice(0, 3) : [brief, verification],
    check: locale === "fr"
      ? [`Je peux expliquer pourquoi ${firstTerm} est utilisé ici.`, `Je sais retrouver ${requirements[0] || "la preuve principale"} dans le résultat.`, "Je peux faire échouer puis réussir le contrôle."]
      : [`I can explain why ${firstTerm} is used here.`, `I can locate ${requirements[0] || "the main evidence"} in the result.`, "I can make the check fail and then pass."],
    summary: locale === "fr" ? `${title} est acquis lorsque le brief, les contrôles et la justification tiennent ensemble sans contournement.` : `${title} is acquired when the brief, checks, and rationale hold together without workarounds.`,
    next: locale === "fr" ? `Garde ${firstTerm} comme repère dans la prochaine activité du module.` : `Keep ${firstTerm} as a reference in the next module activity.`
  };
}

function pedagogyLocale(track, lesson, vocabulary, locale) {
  const index = locale === "fr" ? 0 : 1;
  const title = lesson.title[index];
  const solution = lesson.solution || lesson.example || "";
  const requirements = readableRequirements(lesson.requirements || [], locale);
  const primaryCheck = requirements[0] || (locale === "fr" ? "le résultat visible" : "the visible result");
  return {
    why: locale === "fr" ? `${title} permet de vérifier ${primaryCheck} au lieu de se fier à une impression.` : `${title} verifies ${primaryCheck} instead of relying on an impression.`,
    objectives: locale === "fr"
      ? [`Repérer ${primaryCheck} dans le brief.`, `Implémenter ${title} sans ajouter de comportement inutile.`, "Lire le résultat de chaque contrôle et corriger sa cause."]
      : [`Locate ${primaryCheck} in the brief.`, `Implement ${title} without unnecessary behavior.`, "Read each check result and fix its cause."],
    prerequisites: locale === "fr"
      ? ["Connaître le contexte du module.", "Savoir lire l’exemple fourni.", "Pouvoir décrire le résultat attendu."]
      : ["Know the module context.", "Be able to read the provided example.", "Describe the expected result."],
    vocabulary: vocabulary.map((entry) => [entry[index], entry[index + 2]]),
    comparison: {
      good: { title: locale === "fr" ? "Décision vérifiable" : "Verifiable decision", code: solution, explanation: locale === "fr" ? "La solution répond au besoin et prévoit sa vérification." : "The solution addresses the need and includes verification." },
      bad: { title: locale === "fr" ? "Correction cosmétique" : "Cosmetic fix", code: lesson.badExample || "// aucune preuve", explanation: locale === "fr" ? "La cause et l’usage réel ne sont pas traités." : "The root cause and real usage are not addressed." }
    },
    guided: locale === "fr"
      ? [`Repère dans le code l’endroit qui doit produire ${primaryCheck}.`, `Ajoute les éléments attendus : ${requirements.join(", ") || title}.`, "Lance les contrôles un par un et relie chaque échec à une ligne précise."]
      : [`Find where the code must produce ${primaryCheck}.`, `Add the expected elements: ${requirements.join(", ") || title}.`, "Run checks one by one and connect each failure to a precise line."],
    autonomous: locale === "fr" ? `Trouve un second cas où ${title} doit être appliqué et documente ton test.` : `Find a second case where ${title} should be applied and document your test.`,
    hints: locale === "fr"
      ? [`Commence par ${primaryCheck}.`, `Compare ton code à ces marqueurs : ${requirements.join(", ") || firstVocabulary(vocabulary, index)}.`, "Ne charge la solution qu’après avoir identifié le contrôle qui échoue."]
      : [`Start with ${primaryCheck}.`, `Compare your code with these markers: ${requirements.join(", ") || firstVocabulary(vocabulary, index)}.`, "Load the solution only after identifying the failing check."],
    correction: locale === "fr"
      ? ["Le besoin est formulé avant la technique.", "La correction cible la cause.", "La validation combine inspection et usage."]
      : ["The need is stated before the technique.", "The fix targets the cause.", "Validation combines inspection and usage."],
    summary: locale === "fr" ? `${title} est validé par des marqueurs concrets : ${requirements.join(", ") || primaryCheck}.` : `${title} is validated by concrete markers: ${requirements.join(", ") || primaryCheck}.`,
    next: locale === "fr" ? `Dans la prochaine activité ${track.title[0]}, réutilise le contrôle « ${primaryCheck} ».` : `In the next ${track.title[1]} activity, reuse the “${primaryCheck}” check.`
  };
}

function readableRequirements(requirements, locale) {
  return requirements.map((requirement) => {
    if (typeof requirement === "string") return requirement.replaceAll(/[{};"']/g, "").trim();
    return requirement?.label || requirement?.value?.property || requirement?.value || "";
  }).filter(Boolean).map((value) => locale === "fr" ? String(value) : String(value));
}

function firstVocabulary(vocabulary, index) {
  return vocabulary[0]?.[index] || "the expected result";
}

function normalizeQuestion(question) {
  return {
    points: 1,
    skills: [],
    glossaryTerms: [],
    requiresRationale: false,
    ...question,
    prompt: localized(question.prompt),
    explanation: localized(question.explanation),
    choices: (question.choices || []).map((choice) => ({
      id: choice.id,
      label: localized(choice.label)
    }))
  };
}

function ensureVocabulary(entries = []) {
  const values = entries.filter((entry) => Array.isArray(entry) && entry.length >= 2);
  const fallback = [
    ["critère", "criterion", "Condition vérifiable utilisée pour juger un résultat.", "A verifiable condition used to assess a result."],
    ["preuve", "evidence", "Information permettant de reproduire une validation.", "Information that makes validation reproducible."],
    ["utilisateur", "user", "Personne qui interagit réellement avec le produit.", "A person who actually interacts with the product."]
  ];
  for (const entry of fallback) {
    if (values.length >= 3) break;
    if (!values.some((item) => item[0] === entry[0])) values.push(entry);
  }
  return values;
}

function starterFor(type, runtime) {
  if (runtime === "terminal") return "# Écris les commandes ici";
  if (runtime === "typescript" || type === "typescript") return "// Écris le contrat TypeScript ici";
  if (runtime === "react" || type === "react") return "export default function Component() {\n  return <main />;\n}";
  if (runtime === "node" || type === "node") return "export function handler(request, response) {\n  // Écris le contrat serveur ici\n}";
  if (runtime === "sql" || type === "sql") return "-- Écris la migration PostgreSQL ici";
  if (runtime === "text" || type === "text" || type === "project") return "# Décris ton diagnostic, ta correction et ta preuve";
  if (type === "css") return "/* Écris le CSS accessible ici */";
  if (type === "js" || type === "dom") return "// Écris le comportement ici";
  return "<main>\n  <!-- Construis la solution accessible ici -->\n</main>";
}

function localized(value) {
  if (Array.isArray(value)) return { fr: String(value[0] || ""), en: String(value[1] || value[0] || "") };
  if (value && typeof value === "object") return { fr: String(value.fr || value.en || ""), en: String(value.en || value.fr || "") };
  return { fr: String(value || ""), en: String(value || "") };
}

function localizedList(value) {
  if (!Array.isArray(value)) return { fr: [], en: [] };
  if (value.every((item) => Array.isArray(item))) {
    return { fr: value.map((item) => item[0]), en: value.map((item) => item[1] || item[0]) };
  }
  return { fr: value, en: value };
}
