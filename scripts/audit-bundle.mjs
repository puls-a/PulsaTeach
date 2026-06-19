import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "dist", "assets");
const files = await readdir(assetsDir);
const failures = [];
const budgets = {
  ".js": 250 * 1024,
  ".css": 60 * 1024
};

for (const file of files) {
  const extension = path.extname(file);
  if (!budgets[extension]) continue;
  const { size } = await stat(path.join(assetsDir, file));
  if (size > budgets[extension]) {
    failures.push(`${file}: ${(size / 1024).toFixed(1)} kB exceeds ${(budgets[extension] / 1024).toFixed(0)} kB`);
  }
}

if (failures.length) {
  console.error(`Bundle budget failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Bundle budget passed: ${files.length} generated assets within configured limits.`);

