import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

const exec = promisify(execFile);
const { stdout } = await exec("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
const files = stdout.split("\0").filter(Boolean);
const patterns = [
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/, "GitHub token"],
  [/\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}\b/, "API secret key"]
];
const findings = [];

for (const file of files) {
  const content = await readFile(file, "utf8").catch(() => null);
  if (content === null) continue;
  for (const [pattern, label] of patterns) {
    if (pattern.test(content)) findings.push(`${file}: ${label}`);
  }
}

if (findings.length) {
  console.error(`Secret audit failed:\n${findings.join("\n")}`);
  process.exit(1);
}

console.log(`Secret audit passed: ${files.length} tracked files checked.`);
