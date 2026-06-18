export function createEmptyCourseCurriculum() {
  return { modules: [] };
}

export function createModuleDraft(index = 0) {
  return {
    id: `module-${cryptoId()}`,
    title: { fr: `Module ${index + 1}`, en: `Module ${index + 1}` },
    description: { fr: "", en: "" },
    deliverable: { fr: "", en: "" },
    mastery: { fr: [], en: [] },
    lessons: []
  };
}

export function createLessonDraft(type = "html", index = 0) {
  return {
    id: `lesson-${cryptoId()}`,
    type,
    title: { fr: `Leçon ${index + 1}`, en: `Lesson ${index + 1}` },
    brief: { fr: "", en: "" },
    difficulty: "starter",
    durationMin: 20,
    xp: 25,
    skills: [],
    starterCode: starterCodeFor(type),
    solution: "",
    previewHtml: type === "css" ? "<main class=\"demo-surface\"><h1>Prévisualisation</h1></main>" : "",
    course: {
      fr: { introduction: "", objectives: [], vocabulary: [], sections: [], rules: [], checklist: [], summary: "", next: "" },
      en: { introduction: "", objectives: [], vocabulary: [], sections: [], rules: [], checklist: [], summary: "", next: "" }
    },
    guide: {
      fr: { objectives: [], steps: [], mistakes: [] },
      en: { objectives: [], steps: [], mistakes: [] }
    },
    hint: { fr: "", en: "" },
    tests: []
  };
}

export function createTestDraft() {
  return { type: "contains", label: "Critère à vérifier", value: "", amount: 1 };
}

export function normalizePublishedCourse(course) {
  const modules = Array.isArray(course.curriculum?.modules) ? course.curriculum.modules : [];
  return {
    id: course.slug,
    source: "supabase",
    courseId: course.id,
    label: String(course.slug || "").toUpperCase(),
    title: localized(course.title),
    summary: localized(course.description),
    level: localizedLevel(course.level),
    profession: localized(course.profession || course.description),
    prerequisites: localizedList(course.prerequisites),
    outcomes: localizedList(course.outcomes),
    capstone: localized(course.capstone || ""),
    certification: localizedList(course.certification),
    modules: modules.map((module, moduleIndex) => normalizeModule(module, moduleIndex))
  };
}

export function validateCourseForPublication(course) {
  const errors = [];
  const modules = course.curriculum?.modules || [];
  if (!course.title?.fr?.trim()) errors.push("Le titre français est obligatoire.");
  if (!course.description?.fr?.trim()) errors.push("La promesse pédagogique française est obligatoire.");
  if (!modules.length) errors.push("Ajoute au moins un module.");
  modules.forEach((module, moduleIndex) => {
    if (!module.title?.fr?.trim()) errors.push(`Module ${moduleIndex + 1} : titre obligatoire.`);
    if (!module.lessons?.length) errors.push(`Module ${moduleIndex + 1} : ajoute au moins une leçon.`);
    (module.lessons || []).forEach((lesson, lessonIndex) => {
      const prefix = `Module ${moduleIndex + 1}, leçon ${lessonIndex + 1}`;
      if (!lesson.title?.fr?.trim()) errors.push(`${prefix} : titre obligatoire.`);
      if (!lesson.brief?.fr?.trim()) errors.push(`${prefix} : consigne obligatoire.`);
      if (!lesson.course?.fr?.introduction?.trim()) errors.push(`${prefix} : cours introductif obligatoire.`);
      if (!Array.isArray(lesson.tests) || !lesson.tests.length) errors.push(`${prefix} : ajoute au moins un test.`);
    });
  });
  return errors;
}

function normalizeModule(module, index) {
  const lessons = Array.isArray(module.lessons) ? module.lessons : [];
  return {
    id: module.id || `module-${index + 1}`,
    title: localized(module.title),
    description: localized(module.description),
    deliverable: localized(module.deliverable),
    mastery: localizedList(module.mastery),
    importance: localized(module.importance || module.description),
    outcomes: localizedList(module.outcomes),
    prerequisites: localizedList(module.prerequisites),
    vocabulary: localizedList(module.vocabulary),
    totalMinutes: lessons.reduce((sum, lesson) => sum + Number(lesson.durationMin || 20), 0),
    lessons: lessons.map((lesson, lessonIndex) => normalizeLesson(lesson, lessonIndex))
  };
}

function normalizeLesson(lesson, index) {
  const type = ["html", "css", "js", "dom", "quiz", "project"].includes(lesson.type) ? lesson.type : "html";
  return {
    ...lesson,
    id: lesson.id || `lesson-${index + 1}`,
    type,
    title: localized(lesson.title),
    brief: localized(lesson.brief),
    difficulty: lesson.difficulty || "starter",
    durationMin: Number(lesson.durationMin || 20),
    xp: Number(lesson.xp || 25),
    skills: Array.isArray(lesson.skills) ? lesson.skills : [],
    starterCode: lesson.starterCode || starterCodeFor(type),
    solution: lesson.solution || lesson.starterCode || "",
    course: normalizeCourseCopy(lesson.course),
    guide: normalizeGuide(lesson.guide),
    hint: localized(lesson.hint),
    tests: Array.isArray(lesson.tests) ? lesson.tests : []
  };
}

function normalizeCourseCopy(course = {}) {
  return {
    fr: normalizeCourseLocale(course.fr),
    en: normalizeCourseLocale(course.en || course.fr)
  };
}

function normalizeCourseLocale(value = {}) {
  return {
    introduction: String(value.introduction || ""),
    objectives: array(value.objectives),
    vocabulary: array(value.vocabulary).map((item) => {
      if (Array.isArray(item)) return item;
      const [term, ...definition] = String(item).split(":");
      return [term.trim(), definition.join(":").trim()];
    }),
    sections: array(value.sections).map((section, index) => {
      if (section && typeof section === "object") return section;
      return { title: `Étape ${index + 1}`, paragraphs: [String(section)], example: "" };
    }),
    rules: array(value.rules),
    check: array(value.check || value.checklist),
    summary: String(value.summary || ""),
    next: String(value.next || "")
  };
}

function normalizeGuide(guide = {}) {
  return {
    fr: normalizeGuideLocale(guide.fr),
    en: normalizeGuideLocale(guide.en || guide.fr)
  };
}

function normalizeGuideLocale(value = {}) {
  return { objectives: array(value.objectives), steps: array(value.steps), mistakes: array(value.mistakes) };
}

function localized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { fr: String(value.fr || value.en || ""), en: String(value.en || value.fr || "") };
  }
  return { fr: String(value || ""), en: String(value || "") };
}

function localizedList(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return { fr: array(value.fr), en: array(value.en || value.fr) };
  }
  return { fr: array(value), en: array(value) };
}

function localizedLevel(level) {
  const labels = {
    beginner: { fr: "Débutant", en: "Beginner" },
    intermediate: { fr: "Intermédiaire", en: "Intermediate" },
    advanced: { fr: "Avancé", en: "Advanced" }
  };
  return labels[level] || labels.beginner;
}

function array(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function starterCodeFor(type) {
  if (type === "css") return ".demo-surface {\n  /* Écris ton CSS ici */\n}";
  if (type === "js") return "// Écris ton JavaScript ici";
  if (type === "dom") return "<button id=\"action\">Action</button>\n<script>\n  // Ajoute ton interaction\n</script>";
  if (type === "quiz") return "";
  return "<main>\n  <h1>Mon exercice</h1>\n</main>";
}

function cryptoId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
