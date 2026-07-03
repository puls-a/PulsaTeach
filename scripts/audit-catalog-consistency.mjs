import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const expectedTrackIds = [
  "html",
  "css",
  "javascript",
  "git",
  "accessibility",
  "testing",
  "typescript",
  "react",
  "node-api",
  "sql-postgresql",
  "web-security",
  "web-performance",
  "devops-deployment"
];
const failures = [];

const actualTrackIds = learningTracks.map((track) => track.id);
const lessonCount = learningTracks.reduce((total, track) => total + track.modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0), 0);

if (actualTrackIds.length !== expectedTrackIds.length) failures.push(`expected ${expectedTrackIds.length} tracks, found ${actualTrackIds.length}`);
for (const id of expectedTrackIds) {
  if (!actualTrackIds.includes(id)) failures.push(`missing track in allTrackRegistry: ${id}`);
}
if (lessonCount !== 812) failures.push(`expected 812 lessons, found ${lessonCount}`);

await rejectDangerousLegacyImports();
await requireAllTrackIds("src/jsSandboxWorker.js", "sandbox catalog mock");
await requireAllTrackIds("src/CurriculumHub.jsx", "catalog track presentation");

const authorPage = await read("src/pages.jsx");
if (!authorPage.includes("authorTrackOptions = learningTracks.map")) failures.push("AuthorPage must derive track options from allTrackRegistry.");
if (authorPage.includes('options={["html", "css", "javascript"]}')) failures.push("AuthorPage still exposes only html/css/javascript.");

const learningLayout = await read("src/features/learn/LearningLayout.jsx");
if (!learningLayout.includes("projectMissions = learningTracks.map")) failures.push("MissionBoard must derive missions from all 13 tracks.");
if (learningLayout.includes('trackId: "html"') && learningLayout.includes('trackId: "css"') && learningLayout.includes('trackId: "javascript"')) failures.push("MissionBoard still contains the old three-track mission set.");

const roadmapEvidence = await read("docs/ROADMAP_EVIDENCE.md");
if (!roadmapEvidence.includes("13 parcours, 812 leçons")) failures.push("ROADMAP_EVIDENCE must state 812 lessons.");
if (!roadmapEvidence.includes("634 termes")) failures.push("ROADMAP_EVIDENCE must state 634 linked terms.");
if (roadmapEvidence.includes("272 leçons") || roadmapEvidence.includes("357 termes")) failures.push("ROADMAP_EVIDENCE still contains obsolete curriculum numbers.");

const legalPages = await read("src/LegalPages.jsx");
if (legalPages.includes("June 30, 2026") || legalPages.includes("30 juin 2026")) failures.push("Legal pages still show the old June 30 update date.");

if (failures.length) {
  console.error(`Catalog consistency audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Catalog consistency audit passed: ${actualTrackIds.length} tracks, ${lessonCount} lessons, no dangerous three-track leftovers.`);

async function rejectDangerousLegacyImports() {
  for (const file of await walk(join(root, "src"))) {
    if (![".js", ".jsx"].includes(extname(file))) continue;
    const rel = relative(root, file).replaceAll("\\", "/");
    const content = await readFile(file, "utf8");
    if (!content.includes("content/trackRegistry.js")) continue;
    const allowed = rel === "src/content/allTrackRegistry.js";
    if (!allowed) failures.push(`${rel}: imports legacy content/trackRegistry.js instead of allTrackRegistry.js`);
  }
}

async function requireAllTrackIds(file, label) {
  const content = await read(file);
  for (const id of expectedTrackIds) {
    if (!content.includes(id)) failures.push(`${label} missing ${id}`);
  }
}

async function read(path) {
  return readFile(join(root, path), "utf8");
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}
