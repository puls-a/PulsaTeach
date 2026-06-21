export const productRoadmap = {
  vision: {
    fr: "Transformer PulsaTeach en plateforme type freeCodeCamp : curriculum complet, exercices interactifs, progression persistante, projets portfolio, communauté et certifications.",
    en: "Turn PulsaTeach into a freeCodeCamp-like platform: complete curriculum, interactive exercises, persistent progress, portfolio projects, community, and certifications."
  },
  phases: [
    {
      id: "phase-1-foundation",
      horizon: "0-4 weeks",
      title: { fr: "Socle plateforme", en: "Platform foundation" },
      goals: ["routing multi-pages", "backend progress API", "content schema", "interactive lab", "local + remote sync"],
      deliverables: [
        { fr: "Pages Accueil, Catalogue, Lab, Roadmap, Dashboard", en: "Home, Catalog, Lab, Roadmap, Dashboard pages" },
        { fr: "API catalogue/progression/roadmap", en: "Catalog/progress/roadmap API" },
        { fr: "Progression sauvegardée par utilisateur", en: "User-scoped saved progress" }
      ]
    },
    {
      id: "phase-2-curriculum-depth",
      horizon: "1-3 months",
      title: { fr: "Profondeur pédagogique", en: "Curriculum depth" },
      goals: ["120+ lessons", "HTML/CSS/JS complete paths", "test runner hardening", "project rubrics", "content authoring workflow"],
      deliverables: [
        { fr: "Parcours HTML/CSS/JS complets", en: "Complete HTML/CSS/JS tracks" },
        { fr: "Éditeur CodeMirror avec lint", en: "CodeMirror editor with linting" },
        { fr: "Tests isolés iframe/Web Worker", en: "Isolated iframe/Web Worker tests" }
      ]
    },
    {
      id: "phase-3-community",
      horizon: "3-6 months",
      title: { fr: "Communauté et portfolio", en: "Community and portfolio" },
      goals: ["public profiles", "project submissions", "peer review", "showcase gallery", "discussion threads"],
      deliverables: [
        { fr: "Profils publics apprenants", en: "Public learner profiles" },
        { fr: "Galerie de projets", en: "Project gallery" },
        { fr: "Reviews guidées par rubric", en: "Rubric-guided reviews" }
      ]
    },
    {
      id: "phase-4-certification",
      horizon: "6-12 months",
      title: { fr: "Certifications et échelle", en: "Certifications and scale" },
      goals: ["certification exams", "admin CMS", "analytics", "teams/schools", "backend database"],
      deliverables: [
        { fr: "Certificat Frontend Foundations", en: "Frontend Foundations certificate" },
        { fr: "Dashboard admin contenu", en: "Content admin dashboard" },
        { fr: "Migration PostgreSQL/Prisma", en: "PostgreSQL/Prisma migration" }
      ]
    }
  ],
  backendPlan: [
    "Secure Express API with JSON development and strict Supabase production adapters",
    "Progress sync endpoint",
    "Catalog endpoint generated from lesson data",
    "Roadmap endpoint",
    "Next step: auth + database adapter"
  ]
};
