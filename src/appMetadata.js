const SITE_URL = "https://pulsateach.vercel.app";
const SOCIAL_IMAGE = `${SITE_URL}/assets/backgrounds/academy-map.svg`;

const routeMetadata = {
  home: {
    fr: ["Apprendre le développement web gratuitement | PulsaTeach", "Cours gratuits et interactifs de HTML, CSS, JavaScript, React, TypeScript, Node.js, SQL, Git, tests, sécurité et performance web."],
    en: ["Learn web development for free | PulsaTeach", "Free interactive courses in HTML, CSS, JavaScript, React, TypeScript, Node.js, SQL, Git, testing, web security, and performance."]
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
  }
};

const noIndexRoutes = new Set(["admin", "author", "analytics", "settings", "profile", "dashboard", "review", "signup", "login"]);

export function updatePageMetadata(route, locale, fallbackTitle) {
  const language = locale === "fr" ? "fr" : "en";
  const course = route === "learn" ? readCourseMetadata(language) : null;
  const selected = course || routeMetadata[route]?.[language] || [
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
  updateStructuredData(route, language, title, description, course);
}

function readCourseMetadata(language) {
  const match = window.location.pathname.match(/^\/learn\/([^/]+)(?:\/([^/]+)\/([^/]+))?/);
  if (!match) return null;
  const trackName = humanize(match[1]);
  const lessonName = match[3] ? humanize(match[3]) : null;
  const title = language === "fr"
    ? `${lessonName ? `${lessonName} — ` : ""}Cours ${trackName} gratuit | PulsaTeach`
    : `${lessonName ? `${lessonName} — ` : ""}Free ${trackName} course | PulsaTeach`;
  const description = language === "fr"
    ? `Apprends ${trackName} avec une leçon pratique, des exemples, un quiz approfondi et une progression sauvegardée gratuitement.`
    : `Learn ${trackName} with a practical lesson, examples, an in-depth quiz, and free saved progress.`;
  return [title, description, { trackId: match[1], trackName, lessonName }];
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
  const pageType = route === "catalog" || route === "glossary" ? "CollectionPage" : "WebPage";
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PulsaTeach",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.svg`
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "PulsaTeach",
      url: `${SITE_URL}/`,
      inLanguage: ["fr", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` }
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

  if (route === "learn" && courseMetadata?.[2]) {
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
  if (segments[0] === "learn") {
    items.push({ name: labels.catalog, url: `${SITE_URL}/catalog` });
    items.push({ name: humanize(segments[1] || labels.learn), url: `${SITE_URL}/learn/${segments[1] || ""}` });
    if (segments[3]) items.push({ name: humanize(segments[3]), url: canonicalUrl() });
  } else if (segments[0]) {
    items.push({ name: humanize(segments[0]), url: canonicalUrl() });
  }
  return items;
}

function humanize(value) {
  return decodeURIComponent(String(value || ""))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
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
