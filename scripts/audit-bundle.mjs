import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "dist", "assets");
const files = await readdir(assetsDir);
const failures = [];
const budgets = {
  ".js": 250 * 1024,
  ".css": 60 * 1024
};
const warningMargins = {
  ".css": 2 * 1024
};
const warnings = [];

for (const file of files) {
  const extension = path.extname(file);
  if (!budgets[extension]) continue;
  const { size } = await stat(path.join(assetsDir, file));
  if (size > budgets[extension]) {
    failures.push(`${file}: ${(size / 1024).toFixed(1)} kB exceeds ${(budgets[extension] / 1024).toFixed(0)} kB`);
  }
  const margin = budgets[extension] - size;
  if (warningMargins[extension] && margin >= 0 && margin < warningMargins[extension]) {
    warnings.push(`${file}: only ${(margin / 1024).toFixed(1)} kB remains before the ${(budgets[extension] / 1024).toFixed(0)} kB budget`);
  }
}

if (failures.length) {
  console.error(`Bundle budget failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Bundle budget passed: ${files.length} generated assets within configured limits.`);
if (warnings.length) console.warn(`Bundle budget warning:\n${warnings.join("\n")}`);

