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

const staticPages = [
  ["playground", "Éditeur HTML CSS JavaScript en ligne | PulsaTeach", "Écris, teste et prévisualise gratuitement du HTML, du CSS et du JavaScript dans ton navigateur.", "Éditeur de code web en ligne", "Teste du HTML, du CSS et du JavaScript dans un aperçu isolé. Modifie le code, observe le résultat et valide une mission pratique.", "SoftwareApplication"],
  ["world", "Carte des parcours de développement web | PulsaTeach", "Visualise les compétences à acquérir et choisis ton prochain parcours de développement web.", "Carte des défis de développement web", "Explore les zones de pratique, consulte les badges et choisis une arène adaptée à ta prochaine compétence.", "CollectionPage"],
  ["flexbox-arena", "Jeu Flexbox interactif gratuit | PulsaTeach", "Apprends CSS Flexbox en résolvant des défis visuels progressifs et interactifs.", "Apprendre Flexbox avec un jeu interactif", "Déplace un bot vers sa cible avec justify-content et align-items, puis progresse dans quatre niveaux CSS.", "LearningResource"],
  ["js-arena", "Exercices JavaScript interactifs | PulsaTeach", "Entraîne-toi en JavaScript avec des défis progressifs, du feedback et des solutions expliquées.", "Exercices JavaScript interactifs", "Corrige des fonctions, teste plusieurs coordonnées et progresse avec un retour immédiat sur chaque défi.", "LearningResource"],
  ["privacy", "Politique de confidentialité | PulsaTeach", "Comprends quelles données PulsaTeach traite, pourquoi et comment exercer tes droits RGPD.", "Politique de confidentialité", "Découvre les données traitées, leur finalité, leur durée de conservation et les moyens d’exercer tes droits.", "WebPage"],
  ["cookies", "Politique relative aux cookies | PulsaTeach", "Consulte les cookies nécessaires et les choix disponibles sur PulsaTeach.", "Politique relative aux cookies", "PulsaTeach décrit les stockages nécessaires au fonctionnement et les choix disponibles pour les visiteurs.", "WebPage"],
  ["terms", "Conditions d’utilisation | PulsaTeach", "Consulte les règles d’utilisation de la plateforme pédagogique gratuite PulsaTeach.", "Conditions d’utilisation", "Consulte les règles applicables aux cours, exercices, projets et services gratuits proposés par PulsaTeach.", "WebPage"],
  ["legal", "Mentions légales | PulsaTeach", "Informations légales et coordonnées relatives au site éducatif gratuit PulsaTeach.", "Mentions légales", "Retrouve les informations relatives à l’édition, à l’hébergement et au contact du site PulsaTeach.", "WebPage"]
];
for (const [route, title, description, heading, text, type] of staticPages) {
  await renderPage(route, {
    title,
    description,
    body: `<main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(text)}</p><p><a href="/catalog">Explorer les formations gratuites</a></p></main>`,
    schema: publicPageSchema(type, heading, route, description)
  });
}

await renderPage("certification", {
  title: "Certificats de progression web | PulsaTeach",
  description: "Valide tes parcours avec des projets, examens et certificats partageables.",
  body: `<main><h1>Certifications PulsaTeach</h1><p>Prouve tes compétences web avec nos certificats gratuits.</p></main>`,
  schema: publicPageSchema("CollectionPage", "Certificats de progression web", "certification", "Valide tes parcours avec des projets, examens et certificats partageables.")
});

await renderPage("projects", {
  title: "Projets web et portfolio | PulsaTeach",
  description: "Construis, soumets et améliore des projets web vérifiables pour prouver tes compétences.",
  body: `<main><h1>Projets et Portfolio</h1><p>Crée et partage des projets complets.</p></main>`,
  schema: publicPageSchema("CollectionPage", "Projets web et portfolio", "projects", "Construis, soumets et améliore des projets web vérifiables pour prouver tes compétences.")
});

for (const track of publicTracks) {
  const route = `formations/${track.id}`;
  const title = `Formation ${track.title.fr} en ligne gratuite | PulsaTeach`;
  const description = `Rejoins la formation complète et gratuite sur ${track.title.fr}. Apprends par la pratique avec des leçons interactives, des quiz et des projets.`;
  await renderPage(route, {
    title,
    description,
    body: `<main><h1>Formation ${escapeHtml(track.title.fr)}</h1><p>${escapeHtml(track.summary.fr)}</p>${trackCard(track)}</main>`,
    schema: formationSchema(track, route, description)
  });
}

for (const track of publicTracks) {
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      const route = `learn/${track.id}/${module.id}/${lesson.id}`;
      const title = `${lesson.title.fr} | Cours ${track.title.fr} gratuit`;
      const description = truncateDescription(lesson.brief?.fr || track.summary?.fr || "");
      await renderPage(route, {
        title,
        description,
        body: lessonBody(track, module, lesson),
        schema: courseSchema(track, module, lesson, route, description)
      });
    }
  }
}

console.log(`Prerendered ${lessonTotal() + publicTracks.length + 6 + staticPages.length} public pages.`);

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
      { "@type": "LearningResource", name: lesson.title.fr, description, url, inLanguage: ["fr", "en"], educationalLevel: track.level?.fr || "Débutant à intermédiaire", learningResourceType: "Interactive lesson", educationalUse: "Practice", teaches: lesson.skills || [], timeRequired: `PT${lesson.durationMin || 30}M`, isAccessibleForFree: true, provider: { "@type": "EducationalOrganization", name: "PulsaTeach", url: siteUrl } },
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
      }
    ]
  };
}

function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        name: "PulsaTeach",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo_horizontale_optimized.webp`
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
        "@type": "EducationalOrganization",
        name: "PulsaTeach",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo_horizontale_optimized.webp`
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

function formationSchema(track, route, description) {
  const url = `${siteUrl}/${route}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Course", name: track.title.fr, description, url, inLanguage: ["fr", "en"], educationalLevel: track.level?.fr || "Débutant à intermédiaire", isAccessibleForFree: true, provider: { "@type": "EducationalOrganization", name: "PulsaTeach", url: siteUrl }, offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock" } },
      { "@type": "BreadcrumbList", itemListElement: [listItem(1, "Accueil", `${siteUrl}/`), listItem(2, "Formations", `${siteUrl}/catalog`), listItem(3, track.title.fr, url)] }
    ]
  };
}

function publicPageSchema(type, name, route, description) {
  const url = `${siteUrl}/${route}`;
  const details = type === "SoftwareApplication" ? { applicationCategory: "EducationalApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" } } : type === "LearningResource" ? { learningResourceType: "Interactive exercise", educationalUse: "Practice", isAccessibleForFree: true } : {};
  return { "@context": "https://schema.org", "@graph": [{ "@type": type, name, description, url, ...details, isPartOf: { "@type": "WebSite", name: "PulsaTeach", url: siteUrl } }, { "@type": "BreadcrumbList", itemListElement: [listItem(1, "Accueil", `${siteUrl}/`), listItem(2, name, url)] }] };
}

function listItem(position, name, item) {
  return { "@type": "ListItem", position, name, item };
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function truncateDescription(value, maxLength = 155) {
  const text = String(value || "").trim();
  if (text.length <= maxLength) return /[.!?]$/.test(text) ? text : `${text}.`;
  const shortened = text.slice(0, maxLength - 1).replace(/\s+\S*$/, "").replace(/[,:;\s]+$/, "");
  return `${shortened}.`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}
