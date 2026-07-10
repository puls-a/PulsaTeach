import { readFile } from "node:fs/promises";

const failures = [];
const toolsTrack = await readFile(new URL("../src/content/toolsTrack.js", import.meta.url), "utf8");
const learningPedagogy = await readFile(new URL("../src/features/learn/LearningPedagogy.jsx", import.meta.url), "utf8");
const sanitizer = await readFile(new URL("../src/features/learn/richTextSanitizer.js", import.meta.url), "utf8");

if (/https:\/\/upload\.wikimedia\.org/.test(toolsTrack)) failures.push("Tools course content must not depend on external Wikimedia images.");
if (/<img[^>]+https?:\/\//i.test(toolsTrack)) failures.push("Tools course images must use local /assets files.");
if (/target=['"]_blank['"]/.test(toolsTrack) && !learningPedagogy.includes("sanitizeRichText")) failures.push("Rich course links require sanitizeRichText before rendering.");
if (!sanitizer.includes('rel", "noopener noreferrer"')) failures.push("Rich text sanitizer must enforce noopener noreferrer on links.");
if (!sanitizer.includes('allowedImageSources = ["/assets/"]')) failures.push("Rich text sanitizer must restrict rendered images to local assets.");

if (failures.length) {
  console.error(`Rich content audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Rich content audit passed: course HTML is sanitized, links are hardened, and Tools images are local.");
