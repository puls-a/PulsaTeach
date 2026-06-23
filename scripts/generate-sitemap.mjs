import { writeFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";

const siteUrl = "https://pulsateach.vercel.app";
const staticRoutes = [
  "/",
  "/catalog",
  "/glossary",
  "/playground",
  "/world",
  "/flexbox-arena",
  "/js-arena",
  "/privacy",
  "/cookies",
  "/terms",
  "/legal"
];

const lessonRoutes = learningTracks.flatMap((track) =>
  track.modules.flatMap((module) =>
    module.lessons.map((lesson) => `/learn/${track.id}/${module.id}/${lesson.id}`)
  )
);

const routes = [...new Set([...staticRoutes, ...lessonRoutes])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${escapeXml(route)}</loc></url>`).join("\n")}
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Sitemap generated with ${routes.length} public URLs.`);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
