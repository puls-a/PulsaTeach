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
    certification: localizedList(config.certification),
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
  return {
    introduction: locale === "fr"
      ? `${title} répond à un problème concret du parcours ${track.title[0]}. ${brief}`
      : `${title} addresses a concrete problem in the ${track.title[1]} track. ${brief}`,
    objectives: locale === "fr"
      ? [`Expliquer le problème traité par ${title}.`, "Appliquer une solution observable.", "Vérifier le résultat et documenter la preuve."]
      : [`Explain the problem addressed by ${title}.`, "Apply an observable solution.", "Verify the result and document evidence."],
    vocabulary: vocabulary.map((entry) => [entry[index], entry[index + 2]]),
    sections: [
      { title: locale === "fr" ? "Comprendre le risque" : "Understand the risk", paragraphs: [module.description[index]], example: lesson.badExample || "" },
      { title: locale === "fr" ? "Construire la solution" : "Build the solution", paragraphs: [brief], example: lesson.solution || lesson.example || "" },
      { title: locale === "fr" ? "Prouver le résultat" : "Prove the result", paragraphs: [verification], example: lesson.verificationExample || "" }
    ],
    rules: locale === "fr"
      ? ["Partir du besoin utilisateur.", "Choisir la solution la plus simple qui couvre le risque.", "Conserver une preuve reproductible."]
      : ["Start from the user need.", "Choose the simplest solution that covers the risk.", "Keep reproducible evidence."],
    check: locale === "fr"
      ? ["Je peux expliquer la décision.", "Je peux reproduire le test.", "Je connais une erreur fréquente."]
      : ["I can explain the decision.", "I can reproduce the test.", "I know a common mistake."],
    summary: locale === "fr" ? `${title} relie besoin, mise en œuvre et vérification.` : `${title} connects need, implementation, and verification.`,
    next: locale === "fr" ? "Réutilise cette méthode dans la prochaine situation." : "Reuse this method in the next situation."
  };
}

function pedagogyLocale(track, lesson, vocabulary, locale) {
  const index = locale === "fr" ? 0 : 1;
  const title = lesson.title[index];
  const solution = lesson.solution || lesson.example || "";
  return {
    why: locale === "fr" ? `${title} évite une exclusion ou une régression mesurable.` : `${title} prevents measurable exclusion or regression.`,
    objectives: locale === "fr"
      ? [`Identifier le besoin lié à ${title}.`, "Mettre en œuvre une correction ciblée.", "Produire une preuve de validation."]
      : [`Identify the need related to ${title}.`, "Implement a focused fix.", "Produce validation evidence."],
    prerequisites: locale === "fr"
      ? ["Connaître le contexte du module.", "Savoir lire l’exemple fourni.", "Pouvoir décrire le résultat attendu."]
      : ["Know the module context.", "Be able to read the provided example.", "Describe the expected result."],
    vocabulary: vocabulary.map((entry) => [entry[index], entry[index + 2]]),
    comparison: {
      good: { title: locale === "fr" ? "Décision vérifiable" : "Verifiable decision", code: solution, explanation: locale === "fr" ? "La solution répond au besoin et prévoit sa vérification." : "The solution addresses the need and includes verification." },
      bad: { title: locale === "fr" ? "Correction cosmétique" : "Cosmetic fix", code: lesson.badExample || "// aucune preuve", explanation: locale === "fr" ? "La cause et l’usage réel ne sont pas traités." : "The root cause and real usage are not addressed." }
    },
    guided: locale === "fr"
      ? ["Décris le problème avec un exemple utilisateur.", "Applique la correction minimale.", "Teste au clavier, avec l’outil adapté ou par inspection."]
      : ["Describe the problem with a user example.", "Apply the minimal fix.", "Test with keyboard, the relevant tool, or inspection."],
    autonomous: locale === "fr" ? `Trouve un second cas où ${title} doit être appliqué et documente ton test.` : `Find a second case where ${title} should be applied and document your test.`,
    hints: locale === "fr"
      ? ["Commence par le besoin utilisateur.", "Relis les critères et le vocabulaire.", "Ajoute une preuve observable."]
      : ["Start from the user need.", "Review criteria and vocabulary.", "Add observable evidence."],
    correction: locale === "fr"
      ? ["Le besoin est formulé avant la technique.", "La correction cible la cause.", "La validation combine inspection et usage."]
      : ["The need is stated before the technique.", "The fix targets the cause.", "Validation combines inspection and usage."],
    summary: locale === "fr" ? `${title} devient une compétence lorsqu’il est expliqué et vérifié.` : `${title} becomes a skill when it is explained and verified.`,
    next: locale === "fr" ? `Continue le parcours ${track.title[0]} avec cette méthode.` : `Continue the ${track.title[1]} track with this method.`
  };
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
