export const legacyProjectAliases = {
  "html-09-final-project-pulsaconf": ["html-12-final-project"],
  "js-capstone-lab": ["js-07-final-project"]
};
export const projectLessonIds = ["tools-06-workstation-project", "html-09-final-project-pulsaconf", "css-06-final-project"];
// Certificates only become issuable once every required track is publicly released and independently assessed.
const publishedCertificateIds = new Set(["frontend-foundations"]);

const certificateDefinitions = [
  {
    id: "frontend-foundations",
    title: { fr: "Frontend Foundations", en: "Frontend Foundations" },
    description: {
      fr: "Valide un flux de travail, HTML et CSS avec des évaluations serveur et trois projets revus.",
      en: "Validate a development workflow, HTML, and CSS through server-graded assessments and three reviewed projects."
    },
    version: 2,
    requiredTracks: ["tools", "html", "css"],
    requiredProjects: projectLessonIds,
    minProjectScore: 70
  },
  {
    id: "git-github-practitioner",
    title: { fr: "Git & GitHub Practitioner", en: "Git & GitHub Practitioner" },
    description: {
      fr: "Valide un historique propre, les branches, la collaboration par pull request et une première CI.",
      en: "Validate clean history, branches, pull-request collaboration, and a first CI workflow."
    },
    requiredTracks: ["git"],
    requiredProjects: ["git-02-conflict-project", "git-03-pr-project", "git-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-accessibility-practitioner",
    title: { fr: "Web Accessibility Practitioner", en: "Web Accessibility Practitioner" },
    description: {
      fr: "Valide la structure, le clavier, les formulaires et un audit WCAG reproductible.",
      en: "Validate structure, keyboard use, forms, and a reproducible WCAG audit."
    },
    requiredTracks: ["accessibility"],
    requiredProjects: ["a11y-02-keyboard-project", "a11y-03-form-project", "a11y-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "frontend-testing-practitioner",
    title: { fr: "Frontend Testing Practitioner", en: "Frontend Testing Practitioner" },
    description: {
      fr: "Valide une stratégie de tests couvrant unités, composants, E2E, accessibilité et CI.",
      en: "Validate a testing strategy covering units, components, E2E, accessibility, and CI."
    },
    requiredTracks: ["testing"],
    requiredProjects: ["testing-01-unit-project", "testing-02-component-project", "testing-03-e2e-project", "testing-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "typescript-practitioner",
    title: { fr: "TypeScript Practitioner", en: "TypeScript Practitioner" },
    description: {
      fr: "Valide la modélisation, les génériques, les frontières runtime et une migration stricte.",
      en: "Validate modeling, generics, runtime boundaries, and a strict migration."
    },
    requiredTracks: ["typescript"],
    requiredProjects: ["ts-01-model-project", "ts-03-api-project", "ts-04-migration-project"],
    minProjectScore: 70
  },
  {
    id: "react-application-developer",
    title: { fr: "React Application Developer", en: "React Application Developer" },
    description: {
      fr: "Valide composants, état, données asynchrones, routing, accessibilité, tests et performance.",
      en: "Validate components, state, asynchronous data, routing, accessibility, tests, and performance."
    },
    requiredTracks: ["react"],
    requiredProjects: ["react-01-library-project", "react-02-form-project", "react-03-data-project", "react-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "node-api-developer",
    title: { fr: "Node.js API Developer", en: "Node.js API Developer" },
    description: {
      fr: "Valide une API modulaire avec validation, autorisation, tests et observabilité.",
      en: "Validate a modular API with validation, authorization, tests, and observability."
    },
    requiredTracks: ["node-api"],
    requiredProjects: ["node-01-cli-project", "node-02-api-project", "node-03-auth-project", "node-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "postgresql-data-modeler",
    title: { fr: "PostgreSQL Data Modeler", en: "PostgreSQL Data Modeler" },
    description: {
      fr: "Valide schéma relationnel, requêtes, transactions, migrations, index et RLS.",
      en: "Validate relational schema, queries, transactions, migrations, indexes, and RLS."
    },
    requiredTracks: ["sql-postgresql"],
    requiredProjects: ["sql-01-catalog-project", "sql-02-learning-project", "sql-03-quiz-project", "sql-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-security-practitioner",
    title: { fr: "Web Security Practitioner", en: "Web Security Practitioner" },
    description: {
      fr: "Valide menaces, validation, identité, headers, uploads, tests d’abus et incident.",
      en: "Validate threats, input handling, identity, headers, uploads, abuse tests, and incident response."
    },
    requiredTracks: ["web-security"],
    requiredProjects: ["sec-01-boundary-project", "sec-02-access-project", "sec-03-hardening-project", "sec-04-capstone"],
    minProjectScore: 75
  },
  {
    id: "web-performance-practitioner",
    title: { fr: "Web Performance Practitioner", en: "Web Performance Practitioner" },
    description: {
      fr: "Valide Web Vitals, ressources critiques, bundles, React, API, SQL et budgets CI.",
      en: "Validate Web Vitals, critical resources, bundles, React, APIs, SQL, and CI budgets."
    },
    requiredTracks: ["web-performance"],
    requiredProjects: ["perf-01-render-project", "perf-02-bundle-project", "perf-03-api-project", "perf-04-capstone"],
    minProjectScore: 70
  },
  {
    id: "web-deployment-operator",
    title: { fr: "Web Deployment Operator", en: "Web Deployment Operator" },
    description: {
      fr: "Valide build déterministe, CI/CD, migrations, monitoring, runbooks et rollback.",
      en: "Validate deterministic builds, CI/CD, migrations, monitoring, runbooks, and rollback."
    },
    requiredTracks: ["devops-deployment"],
    requiredProjects: ["ops-01-release-project", "ops-02-delivery-project", "ops-03-monitoring-project", "ops-04-capstone"],
    minProjectScore: 70
  }
];

export const certificates = certificateDefinitions.map((certificate) => ({
  ...certificate,
  available: publishedCertificateIds.has(certificate.id)
}));
