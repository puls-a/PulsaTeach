import { access, readFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { publicTrackCatalog } from "../src/content/publicTrackCatalog.js";

const [indexHtml, robots, sitemap, metadata] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
  readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  readFile(new URL("../src/appMetadata.js", import.meta.url), "utf8")
]);
const prerenderedCatalog = await readFile(new URL("../dist/catalog/index.html", import.meta.url), "utf8").catch(() => "");
const prerenderedLesson = await readFile(new URL("../dist/learn/html/html-modern-document/html-01-doctype-standard-mode/index.html", import.meta.url), "utf8").catch(() => "");

const publicTrackIds = new Set(publicTrackCatalog.map((track) => track.id));
const expectedLessonCount = learningTracks.filter((track) => publicTrackIds.has(track.id)).reduce(
  (total, track) => total + track.modules.reduce((sum, module) => sum + module.lessons.length, 0),
  0
);
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const missingPrerenders = [];
for (const path of sitemapPaths) {
  const file = path === "/" ? new URL("../dist/index.html", import.meta.url) : new URL(`../dist${path}/index.html`, import.meta.url);
  await access(file).catch(() => missingPrerenders.push(path));
}
const checks = [
  [indexHtml.includes('name="description"'), "base meta description"],
  [indexHtml.includes('property="og:image"'), "Open Graph image"],
  [indexHtml.includes('name="twitter:card"'), "Twitter card"],
  [indexHtml.includes('rel="canonical"'), "base canonical"],
  [robots.includes("Sitemap: https://pulsateach.vercel.app/sitemap.xml"), "robots sitemap declaration"],
  [metadata.includes('"BreadcrumbList"'), "breadcrumb structured data"],
  [metadata.includes('"LearningResource"'), "lesson structured data"],
  [metadata.includes('"EducationalOrganization"'), "educational organization structured data"],
  [metadata.includes("max-image-preview:large"), "expanded robots directives"],
  [(sitemap.match(/<url>/g) || []).length >= expectedLessonCount + 10, "all public learning URLs in sitemap"],
  [prerenderedCatalog.includes("<h1>Formations gratuites"), "prerendered catalog content"],
  [prerenderedLesson.includes('"@type":"LearningResource"'), "prerendered lesson learning-resource schema"],
  [prerenderedLesson.includes('"learningResourceType":"Interactive lesson"'), "prerendered lesson resource type"],
  [!prerenderedLesson.includes('hreflang="en"'), "no same-URL hreflang"],
  [!prerenderedLesson.includes("Le contrat de la solution"), "prerendered lesson does not expose the solution contract example"],
  [missingPrerenders.length === 0, `every sitemap URL is prerendered${missingPrerenders.length ? ` (${missingPrerenders.join(", ")})` : ""}`]
];

const failures = checks.filter(([passed]) => !passed).map(([, label]) => label);
if (failures.length) {
  console.error(`SEO audit failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log(`SEO audit passed (${expectedLessonCount} lesson URLs checked).`);
