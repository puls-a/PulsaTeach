import { learningTracks } from "../src/content/allTrackRegistry.js";

const failures = [];
let explicitFrenchFallbacks = 0;

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
      requireLocalizedWithFallback(lesson.pedagogy, `${path}.pedagogy`);
      if (lesson.guide) requireLocalized(lesson.guide, `${path}.guide`);
      if (lesson.rubric) requireLocalized(lesson.rubric, `${path}.rubric`, true);

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

console.log(`Internationalization audit passed: ${learningTracks.length} tracks have bilingual core content; ${explicitFrenchFallbacks} advanced pedagogy blocks use the documented French fallback.`);

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

function requireLocalizedWithFallback(value, path) {
  if (!value?.fr) {
    failures.push(`${path}: missing French source and fallback`);
    return;
  }
  if (!value.en) explicitFrenchFallbacks += 1;
}
