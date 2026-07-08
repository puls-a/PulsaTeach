import { findPublicTrack } from "./content/publicTrackCatalog.js";

const SITE_URL = "https://pulsateach.vercel.app";
const SOCIAL_IMAGE = `${SITE_URL}/assets/og-pulsateach-v2.png`;
const BRAND_ICON = `${SITE_URL}/assets/logo_horizontale_optimized.webp`;

const routeMetadata = {
  home: {
    fr: ["PulsaTeach : Apprendre le Développement Web Gratuitement (HTML, CSS, JS, React...)", "Cours gratuits, quiz, ateliers guidés, éditeur en ligne, projets portfolio et certificats pour progresser concrètement en développement web."],
    en: ["PulsaTeach: Learn Web Development for Free (HTML, CSS, JS, React...)", "Free courses, quizzes, guided workshops, an online editor, portfolio projects, and certificates to make concrete progress in web development."]
  },
  about: {
    fr: ["À propos de PulsaTeach | Projet gratuit pour apprendre le web", "Découvre la méthode PulsaTeach : cours gratuits, pratique guidée, sécurité, accessibilité, transparence et progression vérifiable."],
    en: ["About PulsaTeach | Free project to learn web development", "Discover the PulsaTeach method: free courses, guided practice, security, accessibility, transparency, and verifiable progress."]
  },
  catalog: {
    fr: ["Formations développement web gratuites | PulsaTeach", "Explore des parcours complets avec leçons, quiz approfondis, exercices, projets et certificats de progression."],
    en: ["Free web development courses | PulsaTeach", "Explore complete learning paths with lessons, in-depth quizzes, exercises, projects, and progress certificates."]
  },
  glossary: {
    fr: ["Vocabulaire du développement web | PulsaTeach", "Recherche les définitions HTML, CSS, JavaScript et web reliées directement aux cours et aux quiz."],
    en: ["Web development glossary | PulsaTeach", "Search HTML, CSS, JavaScript, and web definitions directly connected to courses and quizzes."]
  },
  playground: {
    fr: ["Éditeur HTML CSS JavaScript en ligne | PulsaTeach", "Écris, teste et prévisualise gratuitement du HTML, du CSS et du JavaScript dans ton navigateur."],
    en: ["Online HTML CSS JavaScript editor | PulsaTeach", "Write, test, and preview HTML, CSS, and JavaScript for free in your browser."]
  },
  world: {
    fr: ["Carte des parcours de développement web | PulsaTeach", "Visualise les compétences à acquérir et choisis ton prochain parcours de développement web."],
    en: ["Web development learning map | PulsaTeach", "See the skills you can master and choose your next web development learning path."]
  },
  "flexbox-arena": {
    fr: ["Jeu Flexbox interactif gratuit | PulsaTeach", "Apprends CSS Flexbox en résolvant des défis visuels progressifs et interactifs."],
    en: ["Free interactive Flexbox game | PulsaTeach", "Learn CSS Flexbox through progressive, interactive visual challenges."]
  },
  "js-arena": {
    fr: ["Exercices JavaScript interactifs | PulsaTeach", "Entraîne-toi en JavaScript avec des défis progressifs, du feedback et des solutions expliquées."],
    en: ["Interactive JavaScript exercises | PulsaTeach", "Practice JavaScript with progressive challenges, feedback, and explained solutions."]
  },
  projects: {
    fr: ["Projets web et portfolio | PulsaTeach", "Construis, soumets et améliore des projets web vérifiables pour prouver tes compétences."],
    en: ["Web projects and portfolio | PulsaTeach", "Build, submit, and improve verifiable web projects to prove your skills."]
  },
  certification: {
    fr: ["Certificats de progression web | PulsaTeach", "Valide tes parcours avec des projets, examens et certificats partageables."],
    en: ["Web learning certificates | PulsaTeach", "Validate your paths with projects, exams, and shareable certificates."]
  },
  path: {
    fr: ["Mon parcours conseillé | PulsaTeach", "Retrouve la prochaine étape utile selon ta progression et les compétences déjà validées."],
    en: ["My recommended path | PulsaTeach", "Find the next useful step based on your progress and validated skills."]
  },
  review: {
    fr: ["Révisions espacées développement web | PulsaTeach", "Réactive les notions importantes au bon moment avec des rappels, quiz et exercices ciblés."],
    en: ["Spaced review for web development | PulsaTeach", "Recall important concepts at the right time with targeted reminders, quizzes, and exercises."]
  },
  dashboard: {
    fr: ["Ma progression | PulsaTeach", "Tableau de bord privé pour suivre leçons, projets, XP, streak et prochaines étapes."],
    en: ["My progress | PulsaTeach", "Private dashboard for lessons, projects, XP, streak, and next steps."]
  },
  privacy: {
    fr: ["Politique de confidentialité | PulsaTeach", "Comprends quelles données PulsaTeach traite, pourquoi et comment exercer tes droits RGPD."],
    en: ["Privacy policy | PulsaTeach", "Understand what data PulsaTeach processes, why, and how to exercise your privacy rights."]
  },
  cookies: {
    fr: ["Politique relative aux cookies | PulsaTeach", "Consulte les cookies nécessaires et les choix disponibles sur PulsaTeach."],
    en: ["Cookie policy | PulsaTeach", "Review necessary cookies and the choices available on PulsaTeach."]
  },
  legal: {
    fr: ["Mentions légales | PulsaTeach", "Informations légales et coordonnées relatives au site éducatif gratuit PulsaTeach."],
    en: ["Legal notice | PulsaTeach", "Legal information and contact details for the free educational website PulsaTeach."]
  },
  terms: {
    fr: ["Conditions d’utilisation | PulsaTeach", "Consulte les règles d’utilisation de la plateforme pédagogique gratuite PulsaTeach."],
    en: ["Terms of use | PulsaTeach", "Review the rules governing use of the free PulsaTeach learning platform."]
  },
  "not-found": {
    fr: ["Page introuvable | PulsaTeach", "Cette page PulsaTeach n’existe pas ou a été déplacée."],
    en: ["Page not found | PulsaTeach", "This PulsaTeach page does not exist or has moved."]
  }
};

const noIndexRoutes = new Set(["admin", "author", "analytics", "settings", "profile", "dashboard", "review", "signup", "login", "not-found"]);

export function updatePageMetadata(route, locale, fallbackTitle, courseOverride = null) {
  const language = locale === "fr" ? "fr" : "en";
  const course = route === "learn" ? readCourseMetadata(language, courseOverride) : null;
  const formation = route === "formations" ? readFormationMetadata(language) : null;
  const selected = course || formation || routeMetadata[route]?.[language] || [
    fallbackTitle,
    language === "fr"
      ? "Plateforme gratuite et bilingue pour apprendre le développement web par la pratique."
      : "Free bilingual platform for learning web development through practice."
  ];
  const [title, description] = selected;
  const canonical = canonicalUrl();

  document.documentElement.lang = language;
  document.title = title;
  setMeta("description", description);
  setMeta("robots", noIndexRoutes.has(route) ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  setMeta("author", "PulsaTeach");
  setPropertyMeta("og:type", route === "learn" ? "article" : "website");
  setPropertyMeta("og:site_name", "PulsaTeach");
  setPropertyMeta("og:locale", language === "fr" ? "fr_FR" : "en_US");
  setPropertyMeta("og:locale:alternate", language === "fr" ? "en_US" : "fr_FR");
  setPropertyMeta("og:title", title);
  setPropertyMeta("og:description", description);
  setPropertyMeta("og:url", canonical);
  setPropertyMeta("og:image", SOCIAL_IMAGE);
  setPropertyMeta("og:image:alt", language === "fr" ? "PulsaTeach, plateforme gratuite d’apprentissage du code" : "PulsaTeach, free coding learning platform");
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", SOCIAL_IMAGE);
  setCanonical(canonical);
  updateHreflang(canonical);
  updateStructuredData(route, language, title, description, course || formation);
  if (route === "learn" || route === "formations") updateLearnMetadataFromCatalog(language, canonical, courseOverride);
}

function readCourseMetadata(language, override = null) {
  const match = window.location.pathname.match(/^\/learn\/([^/]+)(?:\/([^/]+)\/([^/]+))?/);
  if (!match) return null;
  const [, trackId, moduleId, lessonId] = match;
  const trackName = override?.trackName || humanize(trackId);
  const moduleName = override?.moduleName || (moduleId ? humanize(moduleId) : null);
  const lessonName = override?.lessonName || (lessonId ? humanize(lessonId) : null);
  const subject = lessonName || moduleName || trackName;
  const title = language === "fr"
    ? `${subject} — ${trackName} gratuit | PulsaTeach`
    : `${subject} — Free ${trackName} course | PulsaTeach`;
  const description = sentence(
    override?.description || (language === "fr"
      ? `Apprends ${trackName} avec une leçon pratique, des exemples, un quiz et une progression sauvegardée gratuitement.`
      : `Learn ${trackName} with a practical lesson, examples, a quiz, and free saved progress.`
    )
  );
  return [title, description, { trackId, trackName, moduleName, lessonName, lessonId }];
}

function readFormationMetadata(language) {
  const match = window.location.pathname.match(/^\/formations\/([^/]+)/);
  if (!match) return null;
  const trackId = match[1];
  const trackName = humanize(trackId);
  const title = language === "fr"
    ? `Formation ${trackName} en ligne gratuite | PulsaTeach`
    : `Free online ${trackName} course | PulsaTeach`;
  const description = language === "fr"
    ? `Rejoins la formation complète et gratuite sur ${trackName}. Apprends par la pratique avec des leçons interactives, des quiz et des projets.`
    : `Join the complete and free ${trackName} course. Learn by doing with interactive lessons, quizzes, and projects.`;
  return [title, description, { trackId, trackName, isFormation: true }];
}

function updateLearnMetadataFromCatalog(language, expectedCanonical, override = null) {
  const match = window.location.pathname.match(/^\/(?:learn|formations)\/([^/]+)(?:\/([^/]+)\/([^/]+))?/);
  if (!match) return;
  const [, trackId, moduleId, lessonId] = match;
  if (expectedCanonical !== canonicalUrl()) return;
  const track = findPublicTrack(trackId);
  if (!track) return;
  const trackName = override?.trackName || localized(track.title, language) || humanize(trackId);
  const moduleName = override?.moduleName || (moduleId ? humanize(moduleId) : null);
  const lessonName = override?.lessonName || (lessonId ? humanize(lessonId) : null);
  const subject = lessonName || moduleName || trackName;
  const title = language === "fr"
    ? `${subject} — ${trackName} gratuit | PulsaTeach`
    : `${subject} — Free ${trackName} course | PulsaTeach`;
  const description = sentence(
    override?.description
      || localized(track.summary, language)
      || (language === "fr"
        ? `Apprends ${trackName} avec une leçon pratique, des exemples, un quiz et une progression sauvegardée gratuitement.`
        : `Learn ${trackName} with a practical lesson, examples, a quiz, and free saved progress.`)
  );
  const course = [title, description, { trackId, trackName, moduleName, lessonName, lessonId }];
  document.title = title;
  setMeta("description", description);
  setPropertyMeta("og:title", title);
  setPropertyMeta("og:description", description);
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  updateStructuredData("learn", language, title, description, course);
}

function canonicalUrl() {
  const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, "");
  return `${SITE_URL}${path}`;
}

function updateStructuredData(route, language, title, description, courseMetadata) {
  let script = document.head.querySelector("#pulsateach-route-schema");
  if (!script) {
    script = document.createElement("script");
    script.id = "pulsateach-route-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const pageUrl = canonicalUrl();
  const pageType = route === "catalog" || route === "glossary" || route === "formations" ? "CollectionPage" : "WebPage";
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PulsaTeach",
      url: `${SITE_URL}/`,
      logo: BRAND_ICON
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "PulsaTeach",
      url: `${SITE_URL}/`,
      inLanguage: ["fr", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/glossary?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": pageType,
      "@id": `${pageUrl}#webpage`,
      name: title,
      description,
      url: pageUrl,
      inLanguage: language,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs(language).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  ];

  if ((route === "learn" || route === "formations") && courseMetadata?.[2]) {
    const details = courseMetadata[2];
    graph.push({
      "@type": "Course",
      "@id": `${pageUrl}#course`,
      name: `${details.trackName}${details.lessonName ? ` — ${details.lessonName}` : ""}`,
      description,
      url: pageUrl,
      inLanguage: language,
      isAccessibleForFree: true,
      educationalLevel: "Beginner to intermediate",
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock" }
    });
  }

  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function breadcrumbs(language) {
  const labels = language === "fr"
    ? { home: "Accueil", catalog: "Formations", learn: "Cours" }
    : { home: "Home", catalog: "Courses", learn: "Lesson" };
  const items = [{ name: labels.home, url: `${SITE_URL}/` }];
  const segments = window.location.pathname.split("/").filter(Boolean);
  if (segments[0] === "learn" || segments[0] === "formations") {
    items.push({ name: labels.catalog, url: `${SITE_URL}/catalog` });
    if (segments[1]) items.push({ name: humanize(segments[1]), url: `${SITE_URL}/formations/${segments[1]}` });
    if (segments[2]) items.push({ name: humanize(segments[2]), url: `${SITE_URL}/learn/${segments[1]}/${segments[2]}` });
    if (segments[3]) items.push({ name: humanize(segments[3]), url: `${SITE_URL}/learn/${segments[1]}/${segments[2]}/${segments[3]}` });
  } else if (segments[0] === "catalog") {
    items.push({ name: labels.catalog, url: `${SITE_URL}/catalog` });
  } else if (segments[0]) {
    items.push({ name: routeLabel(segments[0], language), url: canonicalUrl() });
  }
  return items;
}

function routeLabel(route, language) {
  return (routeMetadata[route]?.[language]?.[0] || humanize(route)).split("|")[0].trim();
}

function localized(value, language) {
  if (!value) return "";
  if (Array.isArray(value)) return value[language === "fr" ? 0 : 1] || value[0] || "";
  if (typeof value === "object") return value[language] || value.fr || value.en || "";
  return String(value);
}

function sentence(value) {
  const text = String(value || "").trim();
  if (!text) return text;
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function humanize(value) {
  return decodeURIComponent(String(value || ""))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function setCanonical(href) {
  const elements = [...document.head.querySelectorAll('link[rel="canonical"]')];
  let element = elements[0];
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  for (const duplicate of elements.slice(1)) duplicate.remove();
  element.setAttribute("href", href);
}

function updateHreflang(canonicalUrl) {
  const base = SITE_URL;
  const path = canonicalUrl.replace(base, "") || "/";

  ["fr", "en", "x-default"].forEach((lang) => {
    const existing = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    const el = existing || document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", lang);
    el.setAttribute("href", `${base}${path}`);
    if (!existing) document.head.appendChild(el);
  });
}

function setMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function setPropertyMeta(property, content) {
  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
}
