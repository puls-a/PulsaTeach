import { writeFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";

const siteUrl = "https://pulsateach.vercel.app";
const today = new Date().toISOString().slice(0, 10);

// Priority mapping for static routes
const staticRoutePriority = {
  "/": "1.0",
  "/catalog": "0.9",
  "/glossary": "0.9",
  "/about": "0.8",
  "/playground": "0.8",
  "/world": "0.8",
  "/flexbox-arena": "0.8",
  "/js-arena": "0.8",
  "/privacy": "0.3",
  "/cookies": "0.3",
  "/terms": "0.3",
  "/legal": "0.3"
};

const staticRoutes = Object.keys(staticRoutePriority);

// Build lesson routes from the source of truth (allTrackRegistry.js)
// Use a Map keyed by URL to deduplicate: only one entry per unique path
const lessonRouteMap = new Map();
for (const track of learningTracks) {
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      const path = `/learn/${track.id}/${module.id}/${lesson.id}`;
      if (!lessonRouteMap.has(path)) {
        lessonRouteMap.set(path, path);
      }
    }
  }
}

const lessonRoutes = [...lessonRouteMap.keys()];

// Combine and deduplicate (Set handles any remaining static duplicates)
const allRoutes = [...new Set([...staticRoutes, ...lessonRoutes])];

function getPriority(route) {
  if (staticRoutePriority[route] !== undefined) return staticRoutePriority[route];
  if (route.startsWith("/learn/")) return "0.7";
  return "0.5";
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((route) => `  <url><loc>${siteUrl}${escapeXml(route)}</loc><lastmod>${today}</lastmod><priority>${getPriority(route)}</priority></url>`).join("\n")}
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");

const dupeCheck = new Set(allRoutes);
if (dupeCheck.size !== allRoutes.length) {
  console.warn(`⚠️  WARNING: ${allRoutes.length - dupeCheck.size} duplicate URLs detected before deduplication.`);
} else {
  console.log(`✅ No duplicate URLs detected.`);
}

console.log(`Sitemap generated with ${allRoutes.length} public URLs (${staticRoutes.length} static + ${lessonRoutes.length} lessons), lastmod=${today}.`);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
