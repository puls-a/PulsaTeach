import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceRoots = ["src", "server"];
const failures = [];

for (const directory of sourceRoots) {
  for (const file of await walk(join(root, directory))) {
    if (![".js", ".jsx"].includes(extname(file))) continue;
    const content = await readFile(file, "utf8");
    const lines = content.split(/\r?\n/).length;
    if (lines > 500) failures.push(`${relative(root, file)}: ${lines} lines`);
  }
}

const requiredModules = [
  "server/routes/system.js",
  "server/routes/courses.js",
  "server/routes/accounts.js",
  "server/routes/authoring.js",
  "server/routes/learning.js",
  "src/features/learn/LearningLayout.jsx",
  "src/features/learn/LessonWorkspace.jsx",
  "src/content/trackBuilders.js"
];
for (const modulePath of requiredModules) {
  try {
    await readFile(new URL(`../${modulePath}`, import.meta.url), "utf8");
  } catch {
    failures.push(`${modulePath}: required architecture module is missing`);
  }
}

if (failures.length) {
  console.error(`Architecture audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Architecture audit passed: domain modules are present and every source file stays within 500 lines.");

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
