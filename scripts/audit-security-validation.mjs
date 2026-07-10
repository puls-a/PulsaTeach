import { readFile } from "node:fs/promises";

const failures = [];
const validation = await readFile(new URL("../server/validation.js", import.meta.url), "utf8");
const securityTrack = await readFile(new URL("../src/content/tracks/web-security.js", import.meta.url), "utf8");

const rawUrlValidators = validation.match(/z\.string\(\)\.url\(/g) || [];
if (rawUrlValidators.length !== 1 || !validation.includes("const httpUrl =")) {
  failures.push("Server URL validation must go through the httpUrl helper, not raw z.string().url().");
}
if (!validation.includes('protocol === "https:" || protocol === "http:"')) {
  failures.push("Server URL validation must restrict accepted protocols to http and https.");
}
if (!securityTrack.includes("refine(isHttpUrl)") || !securityTrack.includes("catch { return false; }")) {
  failures.push("Security curriculum must teach non-throwing http/https URL validation.");
}

if (failures.length) {
  console.error(`Security validation audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Security validation audit passed: URL schemas reject unsafe protocols and curriculum teaches the same guard.");
