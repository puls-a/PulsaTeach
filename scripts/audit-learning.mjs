import { learningTracks } from "../src/learningContent.js";

const requiredPedagogy = [
  "why",
  "objectives",
  "prerequisites",
  "vocabulary",
  "comparison",
  "guided",
  "autonomous",
  "hints",
  "correction",
  "summary",
  "next"
];

const richTracks = ["html", "css"];
const failures = [];

for (const trackId of richTracks) {
  const track = learningTracks.find((item) => item.id === trackId);
  if (!track) {
    failures.push(`Missing track: ${trackId}`);
    continue;
  }

  if (!track.profession?.fr) failures.push(`${trackId}: missing profession presentation`);
  if (!track.certification?.fr?.length) failures.push(`${trackId}: missing certification criteria`);

  for (const module of track.modules) {
    for (const field of ["importance", "prerequisites", "outcomes", "vocabulary", "mastery"]) {
      if (!module[field]) failures.push(`${trackId}/${module.id}: missing module ${field}`);
    }

    for (const lesson of module.lessons) {
      for (const field of requiredPedagogy) {
        if (!lesson.pedagogy?.fr?.[field]) failures.push(`${lesson.id}: missing pedagogy ${field}`);
      }
      if (!lesson.course?.fr?.introduction) failures.push(`${lesson.id}: missing course introduction`);
    }
  }
}

const cssTrack = learningTracks.find((item) => item.id === "css");
for (const lesson of cssTrack.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
  for (const test of lesson.tests) {
    if (!passesStaticCssTest(lesson.solution, test)) failures.push(`${lesson.id}: solution fails "${test.label}"`);
  }
}

if (failures.length) {
  console.error(`Learning audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

const totals = richTracks.map((trackId) => {
  const track = learningTracks.find((item) => item.id === trackId);
  return `${trackId.toUpperCase()} ${track.modules.flatMap((module) => module.lessons).length} lessons`;
});

console.log(`Learning audit passed: ${totals.join(", ")}.`);

function passesStaticCssTest(code, test) {
  if (test.type === "contains") return normalize(code).includes(normalize(test.value));
  if (test.type !== "cssDeclaration") return true;

  const { selector, property } = test.value;
  if (selector === "@media") return normalize(code).includes(normalize(property));

  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escaped}\\s*\\{[^}]*${property}\\s*:`, "i").test(code);
}

function normalize(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}
