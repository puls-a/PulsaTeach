const categoryByTrack = {
  html: "html-semantics",
  css: "css-layout",
  javascript: "javascript-programming"
};

export function buildGlossaryIndex(tracks) {
  const terms = new Map();
  const relatedByLesson = new Map();

  for (const track of tracks) {
    for (const module of track.modules || []) {
      for (const lesson of module.lessons || []) {
        const french = vocabularyFor(lesson, "fr");
        const english = vocabularyFor(lesson, "en");
        const lessonTermIds = [];
        const length = Math.max(french.length, english.length);

        for (let index = 0; index < length; index += 1) {
          const [frTerm, frDefinition] = normalizeEntry(french[index] || english[index]);
          const [enTerm, enDefinition] = normalizeEntry(english[index] || french[index]);
          if (!frTerm && !enTerm) continue;
          const slug = slugify(frTerm || enTerm);
          if (!slug) continue;
          const id = `term-${slug}`;
          lessonTermIds.push(id);
          const current = terms.get(id) || {
            id,
            slug,
            term: { fr: frTerm || enTerm, en: enTerm || frTerm },
            aliases: { fr: [], en: [] },
            definition: { fr: frDefinition || enDefinition, en: enDefinition || frDefinition },
            shortDefinition: { fr: frDefinition || enDefinition, en: enDefinition || frDefinition },
            category: categoryByTrack[track.id] || "web-development",
            languages: [],
            difficulty: lesson.difficulty || "starter",
            examples: [],
            counterExamples: [],
            commonMistakes: [],
            relatedTerms: [],
            lessonIds: [],
            lessonRefs: [],
            quizQuestionIds: [],
            trackIds: []
          };

          addUnique(current.languages, track.label || track.id.toUpperCase());
          addUnique(current.trackIds, track.id);
          addUnique(current.lessonIds, lesson.id);
          if (!current.lessonRefs.some((reference) => reference.lessonId === lesson.id)) {
            current.lessonRefs.push({ trackId: track.id, moduleId: module.id, lessonId: lesson.id });
          }
          if (frDefinition.length > current.definition.fr.length) current.definition.fr = frDefinition;
          if (enDefinition.length > current.definition.en.length) current.definition.en = enDefinition;
          terms.set(id, current);
        }
        relatedByLesson.set(lesson.id, lessonTermIds);
      }
    }
  }

  for (const term of terms.values()) {
    const related = new Set();
    for (const lessonId of term.lessonIds) {
      for (const relatedId of relatedByLesson.get(lessonId) || []) {
        if (relatedId !== term.id) related.add(relatedId);
      }
    }
    term.relatedTerms = [...related].slice(0, 8);
    term.shortDefinition.fr = shorten(term.definition.fr);
    term.shortDefinition.en = shorten(term.definition.en);
  }

  return [...terms.values()].sort((a, b) => a.term.fr.localeCompare(b.term.fr, "fr"));
}

export function getGlossaryTerm(terms, slug) {
  return terms.find((term) => term.slug === slug) || null;
}

export function searchGlossary(terms, query, { track = "all", category = "all" } = {}) {
  const needle = normalizeSearch(query);
  return terms.filter((term) => {
    if (track !== "all" && !term.trackIds.includes(track)) return false;
    if (category !== "all" && term.category !== category) return false;
    if (!needle) return true;
    const haystack = [
      term.term.fr,
      term.term.en,
      term.definition.fr,
      term.definition.en,
      ...term.aliases.fr,
      ...term.aliases.en
    ].map(normalizeSearch).join(" ");
    return haystack.includes(needle);
  });
}

function vocabularyFor(lesson, locale) {
  return lesson.course?.[locale]?.vocabulary || lesson.pedagogy?.[locale]?.vocabulary || [];
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) return [String(entry[0] || "").trim(), String(entry[1] || "").trim()];
  const [term, ...definition] = String(entry || "").split(":");
  return [term.trim(), definition.join(":").trim()];
}

function slugify(value) {
  return normalizeSearch(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeSearch(value) {
  return String(value || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

function addUnique(values, value) {
  if (value && !values.includes(value)) values.push(value);
}

function shorten(value) {
  const text = String(value || "").trim();
  return text.length > 180 ? `${text.slice(0, 177).trim()}…` : text;
}
