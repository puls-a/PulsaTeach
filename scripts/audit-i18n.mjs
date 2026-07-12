import { learningTracks } from "../src/content/allTrackRegistry.js";

const failures = [];

for (const track of learningTracks) {
  requireLocalized(track.title, `${track.id}.title`);
  requireLocalized(track.summary, `${track.id}.summary`);
  requireLocalized(track.level, `${track.id}.level`);
  requireLocalized(track.prerequisites, `${track.id}.prerequisites`, true);
  requireLocalized(track.outcomes, `${track.id}.outcomes`, true);
  requireLocalized(track.capstone, `${track.id}.capstone`);
  requireLocalized(track.profession, `${track.id}.profession`);
  requireLocalized(track.certification, `${track.id}.certification`, true);

  for (const module of track.modules || []) {
    requireLocalized(module.title, `${track.id}/${module.id}.title`);
    for (const field of ["importance", "prerequisites", "outcomes", "mastery"]) {
      requireLocalized(module[field], `${track.id}/${module.id}.${field}`);
    }
    for (const lesson of module.lessons || []) {
      const path = `${track.id}/${module.id}/${lesson.id}`;
      requireLocalized(lesson.title, `${path}.title`);
      requireLocalized(lesson.brief, `${path}.brief`);
      requireLocalized(lesson.course, `${path}.course`);
      requireLocalized(lesson.pedagogy, `${path}.pedagogy`);
      rejectUntranslatedPair(lesson.brief, `${path}.brief`);
      rejectUntranslatedPair(lesson.pedagogy, `${path}.pedagogy`);
      if (lesson.guide) requireLocalized(lesson.guide, `${path}.guide`);
      if (lesson.rubric) requireLocalized(lesson.rubric, `${path}.rubric`, true);
      inspectLearnerArtifacts(lesson, path);

      for (const question of lesson.questions || []) {
        requireLocalized(question.prompt, `${path}/${question.id}.prompt`);
        requireLocalized(question.explanation, `${path}/${question.id}.explanation`);
        for (const [index, choice] of (question.choices || []).entries()) {
          if (choice?.label) requireLocalized(choice.label, `${path}/${question.id}.choices[${index}].label`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`Internationalization audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Internationalization audit passed: ${learningTracks.length} tracks have complete French and English core and advanced pedagogy.`);

function requireLocalized(value, path, requireNonEmptyArray = false) {
  if (!value || typeof value !== "object") {
    failures.push(`${path}: missing localized object`);
    return;
  }
  for (const locale of ["fr", "en"]) {
    const localized = value[locale];
    if (localized == null || localized === "") failures.push(`${path}: missing ${locale}`);
    if (requireNonEmptyArray && (!Array.isArray(localized) || localized.length === 0)) {
      failures.push(`${path}: ${locale} must be a non-empty array`);
    }
  }
}

function rejectUntranslatedPair(value, path) {
  if (typeof value?.fr === "string" && value.fr.length > 20 && normalize(value.fr) === normalize(value.en)) {
    failures.push(`${path}: French and English strings are identical`);
  }
  if (value?.fr?.why && normalize(value.fr.why) === normalize(value.en?.why)) {
    failures.push(`${path}.why: French and English pedagogy are identical`);
  }
}

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function inspectLearnerArtifacts(lesson, path) {
  for (const field of ["starterCode", "solution", "previewHtml"]) {
    const value = lesson[field];
    if (value && typeof value === "object" && !Array.isArray(value)) requireLocalized(value, `${path}.${field}`);
  }

  for (const [index, test] of (lesson.tests || []).entries()) {
    for (const field of ["label", "value"]) validateTestLocale(test[field], `${path}.tests[${index}].${field}`);
  }
}

function validateTestLocale(value, path) {
  if (!value || typeof value !== "object") return;
  if (!Array.isArray(value) && ("fr" in value || "en" in value)) {
    requireLocalized(value, path);
    if (typeof value.fr === "string" && typeof value.en === "string" && looksNaturalLanguage(value.fr) && normalize(value.fr) === normalize(value.en)) {
      failures.push(`${path}: French-only natural-language validation in a bilingual test`);
    }
    return;
  }
  for (const [key, nested] of Object.entries(value)) validateTestLocale(nested, `${path}.${key}`);
}

function looksNaturalLanguage(value) {
  const text = String(value).trim();
  if (text.length < 4 || /[<>{}=#[\]();:/\\]/.test(text)) return false;
  if (/^(aria-|data-|role\b|class\b|id\b|href\b|https?\b|[\w.-]+\.(html|css|js|ts|svg))/.test(text)) return false;
  return /\p{L}{3,}\s+\p{L}{3,}/u.test(text);
}
