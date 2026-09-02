import { mkdir, readFile, writeFile } from "node:fs/promises";
import { learningTracks } from "../src/content/allTrackRegistry.js";
import { publicTrackCatalog } from "../src/content/publicTrackCatalog.js";
import { buildGlossaryIndex } from "../src/features/glossary/glossaryIndex.js";

const siteUrl = "https://pulsateach.vercel.app";
const distUrl = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", distUrl), "utf8");
const publicTrackIds = new Set(publicTrackCatalog.map((track) => track.id));
const publicTracks = learningTracks.filter((track) => publicTrackIds.has(track.id));

await renderPage("", {
  title: "PulsaTeach : apprendre le développement web gratuitement",
  description: "Formations gratuites pour préparer son poste de travail et apprendre HTML et CSS par la pratique.",
  body: `<main><h1>Apprendre le développement web en construisant</h1><p>PulsaTeach propose ${publicTracks.length} formations gratuites, ${lessonTotal()} leçons bilingues, des quiz, des projets, des révisions et des certificats vérifiables.</p><p><a href="/catalog">Voir les formations gratuites</a> <a href="/learn/html/html-getting-started/html-00-what-html-does">Essayer une leçon HTML</a></p><section><h2>Formations disponibles</h2>${publicTracks.map(trackCard).join("")}</section><section><h2>Pourquoi PulsaTeach ?</h2><p>Chaque parcours relie théorie, vocabulaire, pratique guidée, validation, projet final et certification. L’objectif est de comprendre, construire et prouver sa progression.</p></section></main>`,
  schema: homeSchema()
});

await renderPage("about", {
  title: "À propos de PulsaTeach | Projet gratuit pour apprendre le web",
  description: "Découvre la méthode PulsaTeach : cours gratuits, pratique guidée, sécurité, accessibilité, transparence et progression vérifiable.",
  body: `<main><h1>PulsaTeach aide à passer du “j’ai lu” au “je sais construire”</h1><p>PulsaTeach est un projet personnel, gratuit et non commercial pour apprendre le développement web avec des cours guidés, un éditeur intégré, des quiz exigeants et des projets portfolio.</p><section><h2>Méthode pédagogique</h2><p>Une notion claire, un exemple court, un exercice testable, un quiz avec justification et une trace de progression.</p></section><section><h2>Confiance</h2><p>Le projet privilégie la transparence : pages légales claires, absence de publicité, sandbox de code, audits automatisés et amélioration continue des contenus.</p></section></main>`,
  schema: aboutSchema()
});

await renderPage("catalog", {
  title: "Formations développement web gratuites | PulsaTeach",
  description: "Apprends à préparer ton poste de travail, HTML et CSS avec des parcours gratuits, quiz et projets pratiques.",
  body: `<main><h1>Formations gratuites en développement web</h1><p>Apprends par la pratique avec ${lessonTotal()} leçons bilingues, des quiz approfondis, des exercices guidés, des mini-projets, des examens et des certificats vérifiables.</p><section><h2>Parcours disponibles</h2>${publicTracks.map(trackCard).join("")}</section><section><h2>Comment apprendre sur PulsaTeach ?</h2><p>Chaque parcours combine contexte professionnel, vocabulaire, exemples, erreurs fréquentes, quiz multi-types, révision et projets. Les cours sont pensés pour progresser depuis les bases jusqu’à un livrable démontrable.</p></section></main>`,
  schema: collectionSchema()
});

const glossary = buildGlossaryIndex(publicTracks);
await renderPage("glossary", {
  title: "Glossaire du développement web | PulsaTeach",
  description: `${glossary.length} définitions bilingues reliées aux cours HTML, CSS, JavaScript et aux technologies web modernes.`,
  body: `<main><h1>Glossaire du développement web</h1><p>${glossary.length} termes expliqués en français et en anglais.</p><dl>${glossary.slice(0, 180).map((term) => `<dt>${escapeHtml(term.term?.fr || term.label?.fr || term.id)}</dt><dd>${escapeHtml(term.definition?.fr || "")}</dd>`).join("")}</dl></main>`,
  schema: glossarySchema(glossary)
});

await renderPage("certification", {
  title: "Certificats de progression web | PulsaTeach",
  description: "Valide tes parcours avec des projets, examens et certificats partageables.",
  body: `<main><h1>Certifications PulsaTeach</h1><p>Prouve tes compétences web avec nos certificats gratuits.</p></main>`,
  schema: aboutSchema() // Reuse aboutSchema for generic pages or create a specific one if needed
});

await renderPage("projects", {
  title: "Projets web et portfolio | PulsaTeach",
  description: "Construis, soumets et améliore des projets web vérifiables pour prouver tes compétences.",
  body: `<main><h1>Projets et Portfolio</h1><p>Crée et partage des projets complets.</p></main>`,
  schema: aboutSchema()
});

for (const track of publicTracks) {
  const route = `formations/${track.id}`;
  const title = `Formation ${track.title.fr} en ligne gratuite | PulsaTeach`;
  const description = `Rejoins la formation complète et gratuite sur ${track.title.fr}. Apprends par la pratique avec des leçons interactives, des quiz et des projets.`;
  await renderPage(route, {
    title,
    description,
    body: `<main><h1>Formation ${escapeHtml(track.title.fr)}</h1><p>${escapeHtml(track.summary.fr)}</p>${trackCard(track)}</main>`,
    schema: collectionSchema() // Could be a specific course list schema
  });
}

for (const track of publicTracks) {
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      const route = `learn/${track.id}/${module.id}/${lesson.id}`;
      const title = `${lesson.title.fr} — Cours ${track.title.fr} gratuit | PulsaTeach`;
      const description = String(lesson.brief?.fr || track.summary?.fr || "").slice(0, 155);
      await renderPage(route, {
        title,
        description,
        body: lessonBody(track, module, lesson),
        schema: courseSchema(track, module, lesson, route, description)
      });
    }
  }
}

console.log(`Prerendered ${publicTracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0) + 4} public pages.`);

async function renderPage(route, page) {
  const canonical = route ? `${siteUrl}/${route}` : `${siteUrl}/`;
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
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${page.body}</div>`);
  const directory = route ? new URL(`${route}/`, distUrl) : distUrl;
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html, "utf8");
}

function trackCard(track) {
  const firstModule = track.modules[0];
  const firstLesson = firstModule.lessons[0];
  const lessons = track.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const modules = track.modules.map((module) => `<li>${escapeHtml(module.title.fr)} — ${module.lessons.length} leçons</li>`).join("");
  return `<article><h3>${escapeHtml(track.title.fr)}</h3><p>${escapeHtml(track.summary.fr)}</p><p>${lessons} leçons · ${track.modules.length} modules · gratuit · français et anglais</p><ul>${modules}</ul><a href="/learn/${track.id}/${firstModule.id}/${firstLesson.id}">Commencer ${escapeHtml(track.title.fr)}</a></article>`;
}

function lessonBody(track, module, lesson) {
  const course = lesson.course?.fr || {};
  const vocabulary = (course.vocabulary || []).slice(0, 5).map((entry) => `<li><strong>${escapeHtml(entry[0])}</strong> — ${escapeHtml(entry[1])}</li>`).join("");
  const sections = (course.sections || []).map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>`).join("");
  const objectives = (course.objectives || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const checks = (course.check || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `<main><nav><a href="/catalog">Formations</a> / ${escapeHtml(track.title.fr)} / ${escapeHtml(module.title.fr)}</nav><article><h1>${escapeHtml(lesson.title.fr)}</h1><p>${escapeHtml(lesson.brief?.fr || "")}</p><section><h2>Objectifs de la leçon</h2><ul>${objectives}</ul></section>${sections}<section><h2>Vocabulaire lié</h2><ul>${vocabulary}</ul></section><section><h2>Validation</h2><ul>${checks}</ul><p>${escapeHtml(course.summary || "")}</p></section><p><a href="/learn/${track.id}/${module.id}/${lesson.id}">Ouvrir la leçon interactive</a></p></article></main>`;
}

function lessonTotal() {
  return publicTracks.reduce((sum, track) => sum + track.modules.reduce((inner, module) => inner + module.lessons.length, 0), 0);
}

function courseSchema(track, module, lesson, route, description) {
  const url = `${siteUrl}/${route}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "LearningResource", name: lesson.title.fr, description, url, inLanguage: ["fr", "en"], educationalLevel: track.level?.fr || "Débutant à intermédiaire", teaches: lesson.skills || [], timeRequired: `PT${lesson.durationMin || 30}M`, isAccessibleForFree: true },
      { "@type": "BreadcrumbList", itemListElement: [
        listItem(1, "Accueil", `${siteUrl}/`),
        listItem(2, "Formations", `${siteUrl}/catalog`),
        listItem(3, track.title.fr, `${siteUrl}/formations/${track.id}`),
        listItem(4, lesson.title.fr, url)
      ] }
    ]
  };
}

function collectionSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "PulsaTeach",
        url: siteUrl,
        inLanguage: ["fr", "en"]
      },
      {
        "@type": "ItemList",
        name: "Formations PulsaTeach",
        numberOfItems: publicTracks.length,
        itemListElement: publicTracks.map((track, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: track.title.fr,
          url: `${siteUrl}/learn/${track.id}/${track.modules[0].id}/${track.modules[0].lessons[0].id}`
        }))
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          faq("PulsaTeach est-il gratuit ?", "Oui. Les parcours, quiz, projets et révisions sont accessibles gratuitement."),
          faq("Quels langages apprendre sur PulsaTeach ?", "PulsaTeach propose actuellement des parcours pour préparer son poste de travail, apprendre HTML et CSS."),
          faq("Les cours sont-ils adaptés aux mobiles ?", "Oui. Les pages critiques sont testées en mobile et desktop, avec navigation clavier et contraintes d’accessibilité.")
        ]
      }
    ]
  };
}

function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "PulsaTeach",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo_horizontale.webp`
      },
      {
        "@type": "WebSite",
        name: "PulsaTeach",
        url: siteUrl,
        inLanguage: ["fr", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/glossary?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        name: "Formations gratuites PulsaTeach",
        numberOfItems: publicTracks.length,
        itemListElement: publicTracks.map((track, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: track.title.fr,
          url: `${siteUrl}/learn/${track.id}/${track.modules[0].id}/${track.modules[0].lessons[0].id}`
        }))
      }
    ]
  };
}

function aboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "À propos de PulsaTeach",
        url: `${siteUrl}/about`,
        description: "Projet gratuit et non commercial pour apprendre le développement web par la pratique."
      },
      {
        "@type": "Organization",
        name: "PulsaTeach",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo_horizontale.webp`
      }
    ]
  };
}

function glossarySchema(glossary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: "Glossaire du développement web", url: `${siteUrl}/glossary`, isPartOf: { "@type": "WebSite", name: "PulsaTeach", url: siteUrl } },
      { "@type": "DefinedTermSet", name: "Glossaire PulsaTeach", hasDefinedTerm: glossary.slice(0, 80).map((term) => ({ "@type": "DefinedTerm", name: term.term?.fr || term.label?.fr || term.id, description: term.definition?.fr || "" })) }
    ]
  };
}

function faq(name, text) {
  return { "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } };
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
