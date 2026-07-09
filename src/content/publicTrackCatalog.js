export const publicTrackCatalog = [
  {
    id: "tools",
    label: "TOOLS",
    title: { fr: "Poste de travail", en: "Workstation Setup" },
    summary: { fr: "Installe VS Code, Cursor, PHP, PostgreSQL et prépare ton PC pour coder.", en: "Install VS Code, Cursor, PHP, PostgreSQL and prep your PC." },
    modules: 1,
    lessons: 3,
    firstHref: "/learn/tools/tools-setup/tools-01-vscode"
  },
  {
    id: "html",
    label: "HTML",
    title: { fr: "HTML interactif", en: "Interactive HTML" },
    summary: { fr: "Structure, sémantique, formulaires, accessibilité et SEO avec tests DOM.", en: "Structure, semantics, forms, accessibility, and SEO with DOM tests." },
    modules: 6,
    lessons: 44,
    firstHref: "/learn/html/html-foundations/html-01-document-skeleton"
  },
  {
    id: "css",
    label: "CSS",
    title: { fr: "CSS interactif", en: "Interactive CSS" },
    summary: { fr: "Sélecteurs, box model, Flexbox, Grid, responsive et animations avec rendu visuel.", en: "Selectors, box model, Flexbox, Grid, responsive, and motion with visual output." },
    modules: 14,
    lessons: 105,
    firstHref: "/learn/css/css-selectors-colors/css-selectors-colors-color"
  },
  {
    id: "javascript",
    label: "JavaScript",
    title: { fr: "JavaScript interactif", en: "Interactive JavaScript" },
    summary: { fr: "Logique, fonctions, tableaux, DOM, événements, API, localStorage et debugging.", en: "Logic, functions, arrays, DOM, events, APIs, localStorage, and debugging." },
    modules: 18,
    lessons: 138,
    firstHref: "/learn/javascript/js-variables-strings/js-variables-strings-runtime-map"
  },
  {
    id: "git",
    label: "GIT",
    title: { fr: "Git et GitHub", en: "Git and GitHub" },
    summary: { fr: "Versionne ton code, collabore proprement et automatise les contrôles essentiels.", en: "Version your code, collaborate cleanly, and automate essential checks." },
    modules: 8,
    lessons: 40,
    firstHref: "/learn/git/git-safe-history/git-status-matrix"
  },
  {
    id: "accessibility",
    label: "A11Y",
    title: { fr: "Accessibilité web", en: "Web accessibility" },
    summary: { fr: "Conçois, teste et corrige des interfaces utilisables au clavier et avec les technologies d’assistance.", en: "Design, test, and fix interfaces usable by keyboard and assistive technologies." },
    modules: 8,
    lessons: 40,
    firstHref: "/learn/accessibility/a11y-accessibility-tree/a11y-name-button"
  },
  {
    id: "testing",
    label: "TEST",
    title: { fr: "Testing frontend", en: "Frontend testing" },
    summary: { fr: "Conçois une stratégie de tests fiable avec Vitest, React Testing Library, Playwright, axe et CI.", en: "Design a reliable testing strategy with Vitest, React Testing Library, Playwright, axe, and CI." },
    modules: 7,
    lessons: 35,
    firstHref: "/learn/testing/testing-strategy/testing-01-pyramid"
  },
  {
    id: "typescript",
    label: "TS",
    title: { fr: "TypeScript professionnel", en: "Professional TypeScript" },
    summary: { fr: "Modélise les données, sécurise les frontières et migre une application JavaScript vers un TypeScript strict.", en: "Model data, secure boundaries, and migrate a JavaScript application to strict TypeScript." },
    modules: 10,
    lessons: 68,
    firstHref: "/learn/typescript/ts-foundations/ts-foundations-infer-const"
  },
  {
    id: "react",
    label: "REACT",
    title: { fr: "React pour applications métier", en: "React for business applications" },
    summary: { fr: "Construis une application React accessible, testable et performante avec composants, hooks, routing et données asynchrones.", en: "Build an accessible, testable, performant React application with components, hooks, routing, and asynchronous data." },
    modules: 12,
    lessons: 84,
    firstHref: "/learn/react/react-jsx-components/react-jsx-components-element-jsx"
  },
  {
    id: "node-api",
    label: "NODE",
    title: { fr: "Node.js et API sécurisées", en: "Node.js and secure APIs" },
    summary: { fr: "Construis une API Express validée, testée et organisée en contrôleurs, services et repositories.", en: "Build a validated, tested Express API organized into controllers, services, and repositories." },
    modules: 10,
    lessons: 68,
    firstHref: "/learn/node-api/node-runtime-npm/node-runtime-npm-process-env"
  },
  {
    id: "sql-postgresql",
    label: "SQL",
    title: { fr: "SQL et PostgreSQL", en: "SQL and PostgreSQL" },
    summary: { fr: "Modélise, interroge et sécurise les données d’une plateforme avec contraintes, transactions, index, migrations et RLS.", en: "Model, query, and secure platform data with constraints, transactions, indexes, migrations, and RLS." },
    modules: 9,
    lessons: 60,
    firstHref: "/learn/sql-postgresql/sql-cli-psql/sql-cli-psql-psql-connect"
  },
  {
    id: "web-security",
    label: "SEC",
    title: { fr: "Sécurité web appliquée", en: "Applied web security" },
    summary: { fr: "Identifie les menaces et corrige validation, XSS, CSRF, sessions, autorisation, secrets, headers, uploads et incidents.", en: "Identify threats and fix validation, XSS, CSRF, sessions, authorization, secrets, headers, uploads, and incidents." },
    modules: 9,
    lessons: 60,
    firstHref: "/learn/web-security/sec-risk-modeling/sec-risk-modeling-assets"
  },
  {
    id: "web-performance",
    label: "PERF",
    title: { fr: "Performance web mesurable", en: "Measurable web performance" },
    summary: { fr: "Améliore Web Vitals, réseau, images, CSS, JavaScript, React, API et SQL avec budgets reproductibles.", en: "Improve Web Vitals, network, images, CSS, JavaScript, React, APIs, and SQL with reproducible budgets." },
    modules: 7,
    lessons: 35,
    firstHref: "/learn/web-performance/performance-web-vitals/perf-01-baseline"
  },
  {
    id: "devops-deployment",
    label: "OPS",
    title: { fr: "Déploiement et DevOps web", en: "Web deployment and DevOps" },
    summary: { fr: "Industrialise environnements, build, Docker, CI/CD, migrations, hébergement, monitoring et rollback.", en: "Industrialize environments, builds, Docker, CI/CD, migrations, hosting, monitoring, and rollback." },
    modules: 7,
    lessons: 35,
    firstHref: "/learn/devops-deployment/ops-foundations/ops-01-environments"
  }
];

const totalLessons = publicTrackCatalog.reduce((sum, track) => sum + (track.lessons || 0), 0);

export const publicLearningStats = {
  tracks: publicTrackCatalog.length,
  lessons: totalLessons,
  projects: 140
};

export const publicTrackSummaries = publicTrackCatalog.map((track) => ({
  ...track,
  isSummary: true,
  modules: []
}));

export function findPublicTrack(trackId) {
  return publicTrackCatalog.find((track) => track.id === trackId) || null;
}
