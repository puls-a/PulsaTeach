import { learningTracks } from "../src/content/allTrackRegistry.js";

const mojibakePattern = /Ã|Â|â€™|â€œ|â€|ðŸ/;
const genericFragments = [
  "Coder une étape courte",
  "Lancer les tests",
  "Expliquer la décision",
  "La solution reste originale",
  "Valider avec une preuve automatisée",
  "Identifier la cible",
  "Relancer les tests",
  "Motif utilisé comme preuve dans cette étape"
];

const failures = [];
const warnings = [];

for (const track of learningTracks) {
  const lessons = track.modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
  const introductions = new Map();

  for (const { module, lesson } of lessons) {
    const label = `${track.id}/${module.id}/${lesson.id}`;
    const serialized = JSON.stringify(lesson);

    if (mojibakePattern.test(serialized)) {
      failures.push(`${label}: contient du texte mal encodé (mojibake).`);
    }

    const intro = lesson.course?.fr?.introduction;
    if (intro) introductions.set(intro, (introductions.get(intro) || 0) + 1);

    const sections = lesson.course?.fr?.sections || [];
    const paragraphs = sections.flatMap((section) => section.paragraphs || []);
    const paragraphWords = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
    if (lesson.type !== "quiz" && paragraphWords < 55) {
      warnings.push(`${label}: cours trop court (${paragraphWords} mots dans les paragraphes).`);
    }

    const genericHits = genericFragments.filter((fragment) => serialized.includes(fragment));
    if (genericHits.length >= 3) {
      warnings.push(`${label}: formulation encore trop mécanique (${genericHits.slice(0, 3).join(", ")}).`);
    }

    if (lesson.type === "project") {
      const rubric = lesson.rubric?.fr || [];
      if (rubric.some((item) => item.length < 18)) {
        warnings.push(`${label}: rubric projet trop courte, critères à rendre plus évaluables.`);
      }
    }
  }

  const repeatedIntroductions = [...introductions.entries()].filter(([, count]) => count > 1);
  for (const [intro, count] of repeatedIntroductions.slice(0, 5)) {
    warnings.push(`${track.id}: introduction répétée ${count} fois: "${intro.slice(0, 90)}"`);
  }
}

if (failures.length) {
  console.error(`Editorial quality audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const warningLimit = Number(process.env.EDITORIAL_WARNING_LIMIT || 260);
if (warnings.length > warningLimit) {
  console.error(`Editorial quality audit failed: ${warnings.length} warnings, limit is ${warningLimit}.`);
  console.error(warnings.slice(0, 80).join("\n"));
  process.exit(1);
}

console.log(`Editorial quality audit passed: no mojibake, ${warnings.length} editorial warnings tracked for rewrite batches.`);
if (warnings.length) {
  console.log(warnings.slice(0, 25).join("\n"));
}
