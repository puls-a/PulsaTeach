import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { publicTrackCatalog } from "../src/content/publicTrackCatalog.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const expectedTrackIds = [
  "tools",
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
const publicLessonCount = publicTrackCatalog.reduce((total, track) => total + Number(track.lessons || 0), 0);

if (actualTrackIds.length !== expectedTrackIds.length) failures.push(`expected ${expectedTrackIds.length} tracks, found ${actualTrackIds.length}`);
for (const id of expectedTrackIds) {
  if (!actualTrackIds.includes(id)) failures.push(`missing track in allTrackRegistry: ${id}`);
}
if (lessonCount !== 871) failures.push(`expected 871 lessons, found ${lessonCount}`);
if (publicLessonCount !== lessonCount) failures.push(`public catalog counts ${publicLessonCount} lessons, registry has ${lessonCount}`);
for (const track of learningTracks) {
  const publicTrack = publicTrackCatalog.find((item) => item.id === track.id);
  if (!publicTrack) {
    failures.push(`missing track in public catalog: ${track.id}`);
    continue;
  }
  const modules = track.modules.length;
  const lessons = track.modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
  if (Number(publicTrack.modules || 0) !== modules) failures.push(`${track.id}: public modules=${publicTrack.modules}, registry modules=${modules}`);
  if (Number(publicTrack.lessons || 0) !== lessons) failures.push(`${track.id}: public lessons=${publicTrack.lessons}, registry lessons=${lessons}`);
}

await rejectDangerousLegacyImports();
await requireAllTrackIds("src/jsSandboxWorker.js", "sandbox catalog mock");
await requireAllTrackIds("src/CurriculumHub.jsx", "catalog track presentation");

const authorPage = await read("src/pages.jsx");
if (!authorPage.includes("authorTrackOptions = publicTrackSummaries.map")) failures.push("AuthorPage must derive track options from the public track catalog.");
if (authorPage.includes('options={["html", "css", "javascript"]}')) failures.push("AuthorPage still exposes only html/css/javascript.");

const learningLayout = await read("src/features/learn/LearningLayout.jsx");
if (!learningLayout.includes("projectMissions = learningTracks.map")) failures.push("MissionBoard must derive missions from all 14 tracks.");
if (learningLayout.includes('trackId: "html"') && learningLayout.includes('trackId: "css"') && learningLayout.includes('trackId: "javascript"')) failures.push("MissionBoard still contains the old three-track mission set.");

const roadmapEvidence = await read("docs/ROADMAP_EVIDENCE.md");
if (!roadmapEvidence.includes("14 parcours, 871 leçons")) failures.push("ROADMAP_EVIDENCE must state 14 parcours, 871 lessons.");
if (!roadmapEvidence.includes("577 termes")) failures.push("ROADMAP_EVIDENCE must state 577 linked terms.");
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
