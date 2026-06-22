export function updatePageMetadata(route, locale, fallbackTitle) {
  const fr = locale === "fr";
  const metadata = {
    home: [fallbackTitle, fr ? "Apprends le développement web avec des leçons, quiz et projets interactifs." : "Learn web development with interactive lessons, quizzes, and projects."],
    catalog: [fr ? "Formations web interactives | PulsaTeach" : "Interactive web courses | PulsaTeach", fr ? "Explore les parcours HTML, CSS et JavaScript de PulsaTeach." : "Explore PulsaTeach HTML, CSS, and JavaScript tracks."],
    review: [fr ? "Révisions espacées | PulsaTeach" : "Spaced reviews | PulsaTeach", fr ? "Révise les questions difficiles selon leur prochaine échéance." : "Review difficult questions when they become due."],
    glossary: [fr ? "Vocabulaire du développement web | PulsaTeach" : "Web development glossary | PulsaTeach", fr ? "Recherche les notions HTML, CSS et JavaScript reliées aux leçons." : "Search HTML, CSS, and JavaScript concepts connected to lessons."],
    playground: [fr ? "Playground HTML CSS JavaScript | PulsaTeach" : "HTML CSS JavaScript playground | PulsaTeach", fr ? "Écris et prévisualise du code directement dans le navigateur." : "Write and preview code directly in the browser."],
    privacy: [fr ? "Politique de confidentialité | PulsaTeach" : "Privacy policy | PulsaTeach", fr ? "Découvre comment PulsaTeach protège tes données." : "Learn how PulsaTeach protects your data."],
    terms: [fr ? "Conditions d’utilisation | PulsaTeach" : "Terms of use | PulsaTeach", fr ? "Conditions d’utilisation de la plateforme PulsaTeach." : "Terms governing the PulsaTeach platform."]
  }[route] || [fallbackTitle, fr ? "Plateforme bilingue d’apprentissage interactif du développement web." : "Bilingual interactive web development learning platform."];
  document.title = metadata[0];
  setMeta("description", metadata[1]);
  setMeta("robots", ["admin", "author", "analytics", "settings", "profile", "dashboard", "review"].includes(route) ? "noindex,nofollow" : "index,follow");
  setPropertyMeta("og:title", metadata[0]);
  setPropertyMeta("og:description", metadata[1]);
  setPropertyMeta("og:url", canonicalUrl());
  setMeta("twitter:title", metadata[0]);
  setMeta("twitter:description", metadata[1]);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalUrl());
  updateStructuredData(route, locale, metadata);
}

function canonicalUrl() {
  const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, "");
  return `https://pulsateach.vercel.app${path}`;
}

function updateStructuredData(route, locale, metadata) {
  let script = document.head.querySelector("#pulsateach-route-schema");
  if (!script) {
    script = document.createElement("script");
    script.id = "pulsateach-route-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  const type = route === "catalog" || route === "glossary" ? "CollectionPage" : route === "learn" ? "Course" : "WebPage";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    name: metadata[0],
    description: metadata[1],
    url: canonicalUrl(),
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: "PulsaTeach", url: "https://pulsateach.vercel.app/" },
    ...(type === "Course" ? { provider: { "@type": "Organization", name: "PulsaTeach" } } : {})
  });
}

function setMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setPropertyMeta(property, content) {
  const element = document.head.querySelector(`meta[property="${property}"]`);
  element?.setAttribute("content", content);
}
