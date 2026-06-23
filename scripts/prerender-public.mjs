import { mkdir, readFile, writeFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";

const siteUrl = "https://pulsateach.vercel.app";
const distUrl = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", distUrl), "utf8");

await renderPage("catalog", {
  title: "Formations développement web gratuites | PulsaTeach",
  description: "Apprends HTML, CSS, JavaScript, React, TypeScript, Node.js, SQL, Git, les tests, la sécurité et la performance avec 13 parcours gratuits.",
  body: `<main><h1>Formations gratuites en développement web</h1><p>272 leçons bilingues, des quiz approfondis, des exercices et des projets.</p>${learningTracks.map(trackCard).join("")}</main>`,
  schema: collectionSchema()
});

const glossary = buildGlossaryIndex(learningTracks);
await renderPage("glossary", {
  title: "Glossaire du développement web | PulsaTeach",
  description: `${glossary.length} définitions bilingues reliées aux cours HTML, CSS, JavaScript et aux technologies web modernes.`,
  body: `<main><h1>Glossaire du développement web</h1><p>${glossary.length} termes expliqués en français et en anglais.</p><dl>${glossary.slice(0, 180).map((term) => `<dt>${escapeHtml(term.term?.fr || term.label?.fr || term.id)}</dt><dd>${escapeHtml(term.definition?.fr || "")}</dd>`).join("")}</dl></main>`,
  schema: pageSchema("glossary", "Glossaire du développement web")
});

for (const track of learningTracks) {
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      const route = `learn/${track.id}/${module.id}/${lesson.id}`;
      const title = `${lesson.title.fr} — Cours ${track.title.fr} gratuit | PulsaTeach`;
      const description = String(lesson.brief?.fr || track.summary?.fr || "").slice(0, 155);
      const chapterText = lesson.course?.fr?.introduction || lesson.theory?.fr || "";
      await renderPage(route, {
        title,
        description,
        body: `<main><nav><a href="/catalog">Formations</a> / ${escapeHtml(track.title.fr)} / ${escapeHtml(module.title.fr)}</nav><article><h1>${escapeHtml(lesson.title.fr)}</h1><p>${escapeHtml(lesson.brief?.fr || "")}</p>${chapterText ? `<section><h2>Ce que tu vas apprendre</h2><p>${escapeHtml(chapterText)}</p></section>` : ""}<p><a href="/learn/${track.id}/${module.id}/${lesson.id}">Ouvrir la leçon interactive</a></p></article></main>`,
        schema: courseSchema(track, module, lesson, route, description)
      });
    }
  }
}

console.log(`Prerendered ${learningTracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0) + 2} public pages.`);

async function renderPage(route, page) {
  const canonical = `${siteUrl}/${route}`;
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${safeJson(page.schema)}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${page.body}</div>`);
  const directory = new URL(`${route}/`, distUrl);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html, "utf8");
}

function trackCard(track) {
  const firstModule = track.modules[0];
  const firstLesson = firstModule.lessons[0];
  const lessons = track.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  return `<article><h2>${escapeHtml(track.title.fr)}</h2><p>${escapeHtml(track.summary.fr)}</p><p>${lessons} leçons · ${track.modules.length} modules</p><a href="/learn/${track.id}/${firstModule.id}/${firstLesson.id}">Commencer ${escapeHtml(track.title.fr)}</a></article>`;
}

function courseSchema(track, module, lesson, route, description) {
  const url = `${siteUrl}/${route}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Course", name: lesson.title.fr, description, url, inLanguage: ["fr", "en"], isAccessibleForFree: true, provider: { "@type": "Organization", name: "PulsaTeach", url: siteUrl } },
      { "@type": "BreadcrumbList", itemListElement: [
        listItem(1, "Accueil", `${siteUrl}/`),
        listItem(2, "Formations", `${siteUrl}/catalog`),
        listItem(3, track.title.fr, `${siteUrl}/learn/${track.id}/${module.id}/${lesson.id}`),
        listItem(4, lesson.title.fr, url)
      ] }
    ]
  };
}

function collectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Formations PulsaTeach",
    numberOfItems: learningTracks.length,
    itemListElement: learningTracks.map((track, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: track.title.fr,
      url: `${siteUrl}/learn/${track.id}/${track.modules[0].id}/${track.modules[0].lessons[0].id}`
    }))
  };
}

function pageSchema(route, name) {
  return { "@context": "https://schema.org", "@type": "CollectionPage", name, url: `${siteUrl}/${route}`, isPartOf: { "@type": "WebSite", name: "PulsaTeach", url: siteUrl } };
}

function listItem(position, name, item) {
  return { "@type": "ListItem", position, name, item };
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}
