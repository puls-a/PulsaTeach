export const curriculum = {
  meta: {
    totalHours: 180,
    exitTarget: {
      fr: "Fondations frontend niveau pré-junior",
      en: "Pre-junior frontend foundations"
    },
    audience: {
      fr: "Débutants complets",
      en: "True beginners"
    },
    loop: {
      fr: "Micro-leçon -> démonstration -> exercice guidé -> tests automatiques -> indice -> correction guidée -> XP -> mini-réemploi.",
      en: "Micro-lesson -> demonstration -> guided exercise -> automated tests -> hint -> guided correction -> XP -> mini reuse."
    },
    principles: [
      {
        title: { fr: "Apprendre par fabrication", en: "Learn by making" },
        text: {
          fr: "Chaque module finit par un mini-projet et chaque track par un livrable publiable.",
          en: "Every module ends with a mini-project and every track ends with a publishable deliverable."
        }
      },
      {
        title: { fr: "Micro-leçons reliées", en: "Connected micro-lessons" },
        text: {
          fr: "Une idée précise en 5 à 12 minutes, puis une pratique immédiate qui rejoint un projet plus large.",
          en: "One precise idea in 5 to 12 minutes, then immediate practice that feeds a larger project."
        }
      },
      {
        title: { fr: "Feedback utile", en: "Useful feedback" },
        text: {
          fr: "Les tests expliquent ce qui manque, où regarder, puis comment corriger si l'élève demande de l'aide.",
          en: "Tests explain what is missing, where to look, then how to fix it when the learner asks for help."
        }
      },
      {
        title: { fr: "Bilingue natif", en: "Native bilingual content" },
        text: {
          fr: "Tous les titres, consignes, indices et messages de test existent en français et en anglais.",
          en: "All titles, prompts, hints, and test messages exist in French and English."
        }
      }
    ]
  },
  tracks: [
    {
      id: "html",
      label: "HTML",
      color: "orange",
      hours: 24,
      level: { fr: "Débutant", en: "Beginner" },
      title: { fr: "HTML de A à Z", en: "HTML from zero to job-ready basics" },
      finalProject: { fr: "Site événementiel HTML accessible", en: "Accessible HTML event site" },
      unlocks: {
        fr: ["Structurer une page sémantique", "Créer des formulaires utilisables", "Ajouter accessibilité et SEO de base"],
        en: ["Structure a semantic page", "Create usable forms", "Add baseline accessibility and SEO"]
      },
      modules: [
        {
          title: { fr: "Fondations du document", en: "Document foundations" },
          duration: "3h",
          lessons: ["html-01-document-skeleton", "html-02-text-content"],
          miniProject: { fr: "Page d'accueil texte-only sémantique", en: "Semantic text-only home page" }
        },
        {
          title: { fr: "Contenu et navigation", en: "Content and navigation" },
          duration: "4h",
          lessons: ["html-03-links-navigation", "html-04-images-media", "html-05-lists"],
          miniProject: { fr: "Page profil riche avec navigation interne", en: "Rich profile page with internal navigation" }
        },
        {
          title: { fr: "Données et formulaires", en: "Data and forms" },
          duration: "5h30",
          lessons: ["html-06-tables", "html-07-forms-basics", "html-08-form-controls-validation"],
          miniProject: { fr: "Formulaire d'inscription accessible", en: "Accessible signup form" }
        },
        {
          title: { fr: "Sémantique, accessibilité, SEO", en: "Semantics, accessibility, SEO" },
          duration: "4h30",
          lessons: ["html-09-semantic-layout", "html-10-accessibility-basics", "html-11-seo-best-practices"],
          miniProject: { fr: "Article ou landing sémantique optimisé", en: "Semantic optimized article or landing page" }
        },
        {
          title: { fr: "Projet final HTML", en: "HTML final project" },
          duration: "7h",
          lessons: ["html-12-final-project"],
          miniProject: { fr: "PulsaConf 2026", en: "PulsaConf 2026" }
        }
      ]
    },
    {
      id: "css",
      label: "CSS",
      color: "aqua",
      hours: 42,
      level: { fr: "Débutant vers pré-junior", en: "Beginner to pre-junior" },
      title: { fr: "CSS de A à Z", en: "CSS from zero to layout fluency" },
      finalProject: { fr: "Landing page responsive et accessible", en: "Accessible responsive landing page" },
      unlocks: {
        fr: ["Maîtriser cascade et box model", "Créer des layouts Flexbox/Grid", "Rendre une UI responsive et accessible"],
        en: ["Master cascade and box model", "Create Flexbox/Grid layouts", "Make a UI responsive and accessible"]
      },
      modules: [
        module("Cascade et sélecteurs", "Cascade and selectors", "4h", ["Relier HTML et CSS", "Sélecteurs simples", "Combinators", "Spécificité et héritage"], "Selector Quest"),
        module("Style visuel", "Visual style", "4h", ["Couleurs et opacité", "Unités utiles", "Typographie lisible", "Backgrounds, borders, shadows"], "Carte produit"),
        module("Box model, flux et position", "Box model, flow, and position", "5h", ["Box model", "Display", "Tailles et overflow", "Position et z-index"], "Interface de profil"),
        module("Flexbox", "Flexbox", "5h", ["Axes flex", "Aligner et répartir", "Wrap, grow, shrink, order"], "Flex Rescue"),
        module("Grid", "Grid", "5h", ["Tracks, gaps et fr", "Placement des items", "Grid fluide"], "Grid Builder"),
        module("Responsive design", "Responsive design", "5h", ["Media queries", "Tailles fluides", "Patterns responsive"], "Responsive Lab"),
        module("Motion, variables et accessibilité", "Motion, variables, and accessibility", "6h", ["Pseudo-classes", "Variables CSS", "Transitions", "Animations", "Architecture CSS légère"], "Design system starter"),
        module("Projet final CSS", "CSS final project", "8h", ["Refonte complète d'une landing page"], "Landing responsive")
      ]
    },
    {
      id: "javascript",
      label: "JavaScript",
      color: "mint",
      hours: 72,
      level: { fr: "Débutant vers pré-junior", en: "Beginner to pre-junior" },
      title: { fr: "JavaScript de A à Z", en: "JavaScript from zero to interactive apps" },
      finalProject: { fr: "Application JavaScript complète", en: "Complete JavaScript application" },
      unlocks: {
        fr: ["Écrire la logique JS", "Manipuler DOM, formulaires et événements", "Utiliser API, localStorage et architecture simple"],
        en: ["Write JS logic", "Manipulate DOM, forms, and events", "Use APIs, localStorage, and simple architecture"]
      },
      modules: [
        module("Variables, types et expressions", "Variables, types, and expressions", "5h", ["Script, console et variables", "Types primitifs", "Opérateurs et expressions"], "Calculateur de prix"),
        module("Conditions et boucles", "Conditions and loops", "6h", ["if / else", "Boucles utiles", "Mini-algorithmes"], "Vérificateur de niveau"),
        module("Fonctions et scope", "Functions and scope", "6h", ["Déclarer des fonctions", "Paramètres et return", "Scope local/global"], "Bibliothèque d'utilitaires"),
        module("Tableaux et objets", "Arrays and objects", "8h", ["Bases des tableaux", "Méthodes utiles", "Objets du quotidien"], "Catalogue filtrable"),
        module("Manipuler le DOM", "Manipulating the DOM", "8h", ["querySelector", "Modifier contenu/classes", "Créer et afficher des éléments"], "Liste dynamique de cartes"),
        module("événements, formulaires et état", "Events, forms, and state", "8h", ["Écouter les événements", "Formulaires interactifs", "état applicatif simple"], "Formulaire avec état"),
        module("API, fetch et asynchrone", "APIs, fetch, and async JavaScript", "9h", ["fetch", "Promesses et async/await", "Loading/error/empty"], "Recherche de données"),
        module("Stockage, modules et architecture", "Storage, modules, and architecture", "7h", ["localStorage", "Modules ES", "Séparer state/services/UI"], "Todo persistante"),
        module("Erreurs, débogage et POO simple", "Errors, debugging, and simple OOP", "6h", ["Console et breakpoints", "try/catch", "Classes simples"], "Gestionnaire d'objets"),
        module("Projet final JavaScript", "Final JavaScript project", "9h", ["Projet guidé", "Challenge debug", "Application finale"], "Dashboard météo ou tâches")
      ]
    }
  ],
  htmlLessons: [
    lesson("html-01-document-skeleton", "Le squelette d'une page HTML", "The skeleton of an HTML page", "doctype, html/head/body, title, charset", 25, "first-structure"),
    lesson("html-02-text-content", "Titres, paragraphes et sens du texte", "Headings, paragraphs, and text meaning", "h1-h3, p, strong, em", 20),
    lesson("html-03-links-navigation", "Liens et navigation", "Links and navigation", "href, ancres internes, liens externes explicites", 20),
    lesson("html-04-images-media", "Images, alt et légende", "Images, alt text, and captions", "img, alt, figure, figcaption", 20, "alt-guardian"),
    lesson("html-05-lists", "Listes ordonnées et non ordonnées", "Ordered and unordered lists", "ul, ol, li et choix sémantique", 20),
    lesson("html-06-tables", "Tableaux de données", "Data tables", "caption, th, td, scope", 30),
    lesson("html-07-forms-basics", "Bases des formulaires", "Form basics", "form, label, input, button", 30, "form-builder"),
    lesson("html-08-form-controls-validation", "Contrôles et validation", "Controls and validation", "email, checkbox, select, required", 35),
    lesson("html-09-semantic-layout", "Layout sémantique", "Semantic layout", "header, nav, main, section, article, footer", 35, "semantic-shaper"),
    lesson("html-10-accessibility-basics", "Accessibilità HTML de base", "Basic HTML accessibility", "alt, labels, textes de liens, structure navigable", 35, "accessibility-ally"),
    lesson("html-11-seo-best-practices", "SEO de base et bonnes pratiques HTML", "Basic SEO and HTML best practices", "title, meta description, hiérarchie de titres", 30, "seo-starter"),
    lesson("html-12-final-project", "Projet final HTML", "HTML final project", "Page PulsaConf complète avec navigation, tableau, galerie et formulaire", 100, "html-pathfinder", "project")
  ],
  exerciseTypes: [
    exercise("lesson", "Micro-leçon", "Micro-lesson", "Contenu court, exemple, checkpoint rapide."),
    exercise("quiz", "Quiz", "Quiz", "Questions de compréhension et prédiction de résultat."),
    exercise("code-challenge", "Défi code", "Code challenge", "Éditeur, aperçu live, tests HTML/CSS/JS automatisés."),
    exercise("visual-match", "Reproduction visuelle", "Visual match", "Comparer une cible visuelle et le rendu de l'élève."),
    exercise("dom-challenge", "Défi DOM", "DOM challenge", "Manipuler l'interface avec sélecteurs, événements et rendu."),
    exercise("debug-challenge", "Réparation", "Debug challenge", "Corriger un code cassé avec tests et indices graduels."),
    exercise("mini-game", "Mini-jeu", "Mini-game", "Puzzle de sélecteurs, Flexbox, Grid, logique ou événements."),
    exercise("project", "Projet", "Project", "Brief produit, critères de réussite, bonus et grille de validation."),
    exercise("final-assessment", "Évaluation finale", "Final assessment", "Projet + tests + score de maîtrise.")
  ],
  projects: [
    project("Page profil", "Profile page", "starter", ["HTML sémantique", "liens", "images", "listes"]),
    project("Carte produit", "Product card", "starter", ["typographie", "couleurs", "box model", "CTA"]),
    project("Landing page simple", "Simple landing page", "starter", ["sections", "layout", "CTA", "responsive"]),
    project("Galerie responsive", "Responsive gallery", "beginner", ["grid", "images", "breakpoints"]),
    project("Mini portfolio", "Mini portfolio", "beginner", ["navigation", "cartes", "accessibilité"]),
    project("Formulaire interactif", "Interactive form", "beginner", ["forms", "events", "validation"]),
    project("Todo list", "Todo list", "intermediate", ["DOM", "state", "localStorage"]),
    project("Calculatrice", "Calculator", "intermediate", ["fonctions", "events", "affichage"]),
    project("Quiz app", "Quiz app", "intermediate", ["objets", "state", "score"]),
    project("Météo app", "Weather app", "intermediate", ["fetch", "async/await", "error states"]),
    project("Mini jeu JS", "Mini JS game", "pre-junior", ["events", "timers", "score"]),
    project("Dashboard de progression", "Progress dashboard", "pre-junior", ["data modeling", "filters", "storage"])
  ],
  progression: {
    xpByType: [
      ["lesson", 10],
      ["quiz", 15],
      ["codeChallenge", 25],
      ["visualMatch", 30],
      ["domChallenge", 35],
      ["debugChallenge", 35],
      ["miniGame", 40],
      ["project", 80],
      ["finalAssessment", 120]
    ],
    levels: [
      ["Starter", 0],
      ["Apprenti / Apprentice", 80],
      ["Bâtisseur / Builder", 180],
      ["Explorateur / Explorer", 320],
      ["Créateur / Creator", 500],
      ["Praticien / Practitioner", 720],
      ["Artisan / Craftsperson", 980],
      ["Constructeur UI / UI Builder", 1620],
      ["Prà-junior / Pre-junior", 2000]
    ],
    badges: [
      "first-structure",
      "alt-guardian",
      "form-builder",
      "semantic-shaper",
      "accessibility-ally",
      "seo-starter",
      "flex-captain",
      "grid-architect",
      "responsive-keeper",
      "dom-shifter",
      "async-courier",
      "bug-hunter",
      "html-pathfinder"
    ]
  }
};

function module(fr, en, duration, lessons, miniProject) {
  return {
    title: { fr, en },
    duration,
    lessons: lessons.map((item) => ({ fr: item, en: item })),
    miniProject: { fr: miniProject, en: miniProject }
  };
}

function lesson(id, fr, en, focus, xp, badge = null, type = "code-challenge") {
  return {
    id,
    type,
    title: { fr, en },
    focus: { fr: focus, en: focus },
    tests: ["html-contains", "count", "attribute-check", "text-check"],
    xp,
    badge
  };
}

function exercise(id, fr, en, text) {
  return {
    id,
    title: { fr, en },
    text: { fr: text, en: text }
  };
}

function project(fr, en, level, skills) {
  return {
    title: { fr, en },
    level,
    skills,
    success: {
      fr: "Brief bilingue, critères de réussite, bonus, tests automatiques et rendu publiable.",
      en: "Bilingual brief, success criteria, bonuses, automated tests, and publishable output."
    }
  };
}
