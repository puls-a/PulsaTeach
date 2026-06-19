import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";
import { learningTracks } from "../src/content/allTrackRegistry.js";

const failures = [];
const slugs = new Set();
const glossaryTerms = buildGlossaryIndex(learningTracks);
const lessonIds = new Set(learningTracks.flatMap((track) => track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id))));

if (glossaryTerms.length < 50) failures.push(`Glossary is too small: ${glossaryTerms.length} terms.`);

for (const term of glossaryTerms) {
  if (slugs.has(term.slug)) failures.push(`Duplicate slug: ${term.slug}`);
  slugs.add(term.slug);
  if (!term.term.fr || !term.term.en) failures.push(`${term.slug}: missing bilingual term`);
  if (!term.definition.fr || !term.definition.en) failures.push(`${term.slug}: missing bilingual definition`);
  if (!term.lessonIds.length) failures.push(`${term.slug}: orphan term`);
  for (const lessonId of term.lessonIds) {
    if (!lessonIds.has(lessonId)) failures.push(`${term.slug}: unknown lesson ${lessonId}`);
  }
}

if (failures.length) {
  console.error(`Glossary audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Glossary audit passed: ${glossaryTerms.length} bilingual terms linked to ${lessonIds.size} lessons.`);
