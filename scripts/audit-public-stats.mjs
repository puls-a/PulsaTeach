import { readFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { publicLearningStats } from "../src/content/publicTrackCatalog.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";

const failures = [];
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const roadmap = await readFile(new URL("../docs/ROADMAP_EVIDENCE.md", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8").catch(() => "");

const trackCount = learningTracks.length;
const lessonCount = learningTracks.reduce((total, track) => total + track.modules.reduce((sum, module) => sum + module.lessons.length, 0), 0);
const glossaryCount = buildGlossaryIndex(learningTracks).length;
const sitemapCount = (sitemap.match(/<url>/g) || []).length;
const expectedSitemapCount = 12 + trackCount + lessonCount;

expectEqual(publicLearningStats.tracks, trackCount, "publicLearningStats.tracks");
expectEqual(publicLearningStats.lessons, lessonCount, "publicLearningStats.lessons");
expectEqual(sitemapCount, expectedSitemapCount, "sitemap public URL count");
requireText(readme, `${lessonCount} leçons`, "README lesson count");
requireText(readme, `${expectedSitemapCount} URLs`, "README sitemap count");
requireText(readme, `${glossaryCount} termes`, "README glossary count");
requireText(roadmap, `${trackCount} parcours, ${lessonCount} leçons`, "roadmap lesson count");
requireText(roadmap, `${glossaryCount} termes`, "roadmap glossary count");

if (failures.length) {
  console.error(`Public stats audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Public stats audit passed: ${trackCount} tracks, ${lessonCount} lessons, ${expectedSitemapCount} URLs, ${glossaryCount} glossary terms.`);

function expectEqual(actual, expected, label) {
  if (actual !== expected) failures.push(`${label}: expected ${expected}, found ${actual}`);
}

function requireText(content, expected, label) {
  if (!content.includes(expected)) failures.push(`${label}: missing "${expected}"`);
}
