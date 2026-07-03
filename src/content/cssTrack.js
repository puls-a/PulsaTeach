import { module, quizLesson, projectLesson, cssLesson, test } from "./trackBuilders.js";
import { cssModules } from "./cssModules.js";

export const cssTrack = {
    id: "css",
    label: "CSS",
    color: "aqua",
    title: { fr: "CSS interactif", en: "Interactive CSS" },
    summary: {
      fr: "Sélecteurs, box model, Flexbox, Grid, responsive et animations avec rendu visuel.",
      en: "Selectors, box model, Flexbox, Grid, responsive, and motion with visual output."
    },
    level: { fr: "Débutant à intermédiaire", en: "Beginner to intermediate" },
    prerequisites: { fr: ["Connaître les bases du HTML", "Savoir lire une structure de page"], en: ["Know HTML basics", "Know how to read a page structure"] },
    outcomes: {
      fr: ["Construire un système visuel cohérent", "Maîtriser Flexbox et Grid", "Créer des interfaces responsive modernes", "Gérer les interactions et préférences de mouvement", "Auditer une interface sur plusieurs contraintes réelles"],
      en: ["Build a coherent visual system", "Master Flexbox and Grid", "Create modern responsive interfaces", "Handle interactions and motion preferences", "Audit an interface across real constraints"]
    },
    capstone: { fr: "Landing page et audit responsive complet", en: "Landing page and complete responsive audit" },
    profession: {
      fr: "CSS est au coeur du travail des développeurs front-end, intégrateurs web et designers UI. Cette compétence transforme une structure HTML en interface lisible, cohérente, responsive et accessible, capable de résister aux vrais contenus.",
      en: "CSS is central to front-end development, web integration, and UI design. It turns HTML structure into readable, coherent, responsive, and accessible interfaces."
    },
    certification: {
      fr: ["Valider toutes les leçons et le quiz CSS", "Livrer une navbar Flexbox responsive", "Justifier les choix de layout, mouvement et fluidité", "Livrer la landing finale sans débordement", "Réussir l'audit responsive avancé avec container queries et médias robustes"],
      en: ["Pass every CSS lesson and quiz", "Ship a responsive Flexbox navbar", "Justify layout, motion, and fluidity choices", "Ship the final landing without overflow", "Pass the advanced responsive audit with container queries and robust media"]
    },
    modules: [
      ...cssModules,
      module("css-selectors", "Sélecteurs", "Selectors", [
        cssLesson("css-01-selectors", ["Selector Quest", "Selector Quest"], "Cible uniquement les cartes de cours avec la classe .course-card.", ".course-card {\n  /* écris ici */\n}", ".course-card", ["background", "border"], 25),
        cssLesson("css-01-combinators", ["Sélecteur direct", "Direct selector"], "Cible seulement les boutons directement dans .toolbar avec le combinateur >.", ".toolbar > button {\n  /* style direct */\n}", ".toolbar > button", ["background", "border-radius"], 25),
        cssLesson("css-01-states", ["États interactifs", "Interactive states"], "Ajoute un état :focus-visible clair aux boutons pour la navigation clavier.", ".toolbar button {\n  /* style de base */\n}\n\n.toolbar button:focus-visible {\n  /* focus ici */\n}", ".toolbar button:focus-visible", ["outline", "outline-offset"], 30),
        quizLesson({
          id: "css-01-specificity-quiz",
          title: ["Quiz spécificité", "Specificity quiz"],
          brief: ["Choisis le sélecteur le plus spécifique.", "Choose the most specific selector."],
          question: { fr: "Quel sélecteur gagne en priorité ?", en: "Which selector has the highest priority?" },
          options: [
            { id: "tag", label: { fr: "article", en: "article" } },
            { id: "class", label: { fr: ".course-card", en: ".course-card" } },
            { id: "id", label: { fr: "#featured-card", en: "#featured-card" } }
          ],
          answer: "id",
          explanation: { fr: "Un id est plus spécifique qu'une classe ou qu'une balise.", en: "An id is more specific than a class or a tag." },
          xp: 15
        })
      ]),
      module("css-box-model", "Box model", "Box model", [
        cssLesson("css-02-box-model", ["Carte produit", "Product card"], "Transforme la carte en bloc lisible avec padding, border-radius et shadow.", ".card {\n  /* espace, coins, ombre */\n}", ".card", ["padding", "border-radius", "box-shadow"], 30),
        cssLesson("css-02-typography", ["Typographie lisible", "Readable typography"], "Améliore la lisibilité avec font-size, line-height et max-width.", ".demo-surface {\n  /* typo ici */\n}", ".demo-surface", ["font-size", "line-height", "max-width"], 25),
        cssLesson("css-02-custom-properties", ["Variables CSS", "CSS variables"], "Déclare une variable --accent puis utilise-la pour colorer les cartes.", ":root {\n  /* variable ici */\n}\n\n.card {\n  /* utilise la variable */\n}", ":root", ["--accent", "background: var(--accent)"], 35),
        cssLesson("css-02-sizing", ["Tailles fluides", "Fluid sizing"], "Donne à la surface une largeur fluide avec width, max-width et margin auto.", ".demo-surface {\n  /* largeur fluide */\n}", ".demo-surface", ["width", "max-width", "margin"], 30),
        cssLesson("css-02-overflow", ["Contrôler le débordement", "Control overflow"], "Empêche le contenu long de casser la carte avec overflow-wrap et overflow.", ".card {\n  /* protège le layout */\n}", ".card", ["overflow", "overflow-wrap"], 30)
      ]),
      module("css-flexbox", "Flexbox", "Flexbox", [
        cssLesson("css-03-flexbox", ["Flex Rescue", "Flex Rescue"], "Aligne les boutons sur une ligne avec display flex, gap et align-items.", ".toolbar {\n  /* flex ici */\n}", ".toolbar", ["display: flex", "gap", "align-items"], 35),
        cssLesson("css-03-flex-wrap", ["Wrap Lab", "Wrap Lab"], "Autorise les cartes à revenir à la ligne avec flex-wrap.", ".panel {\n  display: flex;\n  /* wrap ici */\n}", ".panel", ["display: flex", "flex-wrap", "gap"], 30),
        cssLesson("css-03-space-between", ["Navbar flex", "Navbar flex"], "Sépare le logo et les actions avec justify-content: space-between.", ".toolbar {\n  display: flex;\n  /* distribution ici */\n}", ".toolbar", ["display: flex", "justify-content: space-between", "align-items"], 30),
        projectLesson({
          id: "css-03-mini-project-navbar",
          title: ["Mini-projet : navbar responsive", "Mini project: responsive navbar"],
          brief: ["Construis le CSS d'une navbar qui aligne, espace et replie correctement ses actions.", "Build CSS for a navbar that aligns, spaces, and wraps its actions correctly."],
          starterCode: ".toolbar {\n}\n\n.toolbar button {\n}\n",
          solution: ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.toolbar button {\n  padding: 12px 16px;\n  border-radius: 10px;\n}",
          tests: [test("contains", "flex layout", "display: flex"), test("contains", "vertical alignment", "align-items"), test("contains", "distributed space", "justify-content"), test("contains", "wrapping", "flex-wrap"), test("contains", "spacing", "gap")],
          xp: 70
        })
      ]),
      module("css-grid", "Grid", "Grid", [
        cssLesson("css-04-grid", ["Grid Builder", "Grid Builder"], "Crée une grille responsive avec display grid, repeat et minmax.", ".gallery {\n  /* grid ici */\n}", ".gallery", ["display: grid", "repeat", "minmax"], 35),
        cssLesson("css-04-grid-gap", ["Gallery spacing", "Gallery spacing"], "Ajoute un gap clair et une grille en trois colonnes.", ".gallery {\n  /* grille fixe */\n}", ".gallery", ["display: grid", "grid-template-columns", "gap"], 30),
        cssLesson("css-04-place-items", ["Centrage grid", "Grid centering"], "Centre les éléments de la galerie avec place-items.", ".gallery {\n  display: grid;\n  /* centrage ici */\n}", ".gallery", ["display: grid", "place-items", "min-height"], 30)
      ]),
      module("css-responsive-motion", "Responsive et motion", "Responsive and motion", [
        cssLesson("css-05-responsive", ["Puzzle responsive", "Responsive puzzle"], "Ajoute une media query qui transforme .panel en grille à partir de 700px.", ".panel {\n  display: block;\n}\n\n/* media query ici */", "@media", ["@media", "min-width", "display: grid"], 40),
        cssLesson("css-05-mobile-first", ["Approche mobile-first", "Mobile-first approach"], "Définis une colonne par défaut puis passe à trois colonnes à partir de 700px.", ".panel {\n  /* mobile */\n}\n\n@media (min-width: 700px) {\n  .panel {\n    /* grand écran */\n  }\n}", ".panel", ["display: grid", "grid-template-columns"], 40),
        cssLesson("css-05-motion", ["Micro-interaction", "Micro-interaction"], "Ajoute une transition et un état hover sur les boutons.", ".toolbar button {\n  /* interaction ici */\n}", ".toolbar button", ["transition", ":hover", "transform"], 35),
        cssLesson("css-05-reduced-motion", ["Motion responsable", "Responsible motion"], "Ajoute une media query prefers-reduced-motion qui désactive les transitions.", "@media (prefers-reduced-motion: reduce) {\n  /* stop motion */\n}", "@media", ["prefers-reduced-motion", "transition: none"], 35),
        projectLesson({
          id: "css-06-final-project",
          title: ["Projet landing responsive", "Responsive landing project"],
          brief: ["Crée les règles CSS essentielles d'une landing avec grille, cartes, hover et responsive.", "Create the essential CSS rules for a landing with grid, cards, hover, and responsive behavior."],
          starterCode: ".panel {\n}\n.card {\n}\n.toolbar button {\n}\n",
          solution: ".panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 18px;\n}\n.card {\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);\n}\n.toolbar button {\n  transition: transform .2s ease;\n}\n.toolbar button:hover {\n  transform: translateY(-3px);\n}",
          tests: [test("contains", "grid", "display: grid"), test("contains", "responsive columns", "auto-fit"), test("contains", "card padding", "padding"), test("contains", "hover", ":hover"), test("contains", "transition", "transition")],
          xp: 90
        })
      ]),
      module("css-advanced-responsive", "Responsive avancé", "Advanced responsive", [
        cssLesson("css-07-fluid-type", ["Typographie fluide", "Fluid typography"], "Utilise clamp() pour faire grandir le texte sans casser les petits écrans.", ".demo-surface {\n  /* échelle fluide */\n}", ".demo-surface", ["font-size", "clamp("], 40),
        cssLesson("css-07-fluid-spacing", ["Espacements fluides", "Fluid spacing"], "Crée un rythme d'espacement avec une variable --space qui utilise clamp().", ":root {\n  /* variable fluide */\n}\n\n.card {\n  /* espace fluide */\n}", ":root", ["--space", "clamp(", "padding: var(--space)"], 40),
        cssLesson("css-07-responsive-images", ["Images adaptatives", "Responsive images"], "Empêche les médias de déborder avec max-width, aspect-ratio et object-fit.", ".card img {\n  /* image robuste */\n}", ".card img", ["max-width", "aspect-ratio", "object-fit"], 45),
        cssLesson("css-07-container-queries", ["Container queries", "Container queries"], "Adapte une carte selon la largeur de son conteneur, pas selon toute la fenêtre.", ".card {\n  /* prépare le conteneur */\n}\n\n/* container query ici */", ".card", ["container-type", "@container", "grid-template-columns"], 55),
        cssLesson("css-07-responsive-navigation", ["Navigation adaptative", "Adaptive navigation"], "Construis une navigation qui scrolle horizontalement sur petit écran puis devient distribuée sur grand écran.", ".toolbar {\n  /* base mobile */\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    /* grand écran */\n  }\n}", ".toolbar", ["display: flex", "overflow-x", "@media", "justify-content"], 50),
        projectLesson({
          id: "css-07-responsive-audit-project",
          title: ["Projet : audit responsive complet", "Project: complete responsive audit"],
          brief: ["Renforce une interface pour qu'elle survive aux textes longs, images variables, petits écrans, grands écrans et conteneurs étroits.", "Strengthen an interface so it survives long text, variable images, small screens, large screens, and narrow containers."],
          starterCode: ":root {\n}\n\n.demo-surface {\n}\n\n.panel {\n}\n\n.card {\n}\n\n.card img {\n}\n\n.toolbar {\n}\n",
          solution: ":root {\n  --space: clamp(1rem, 2vw, 2rem);\n}\n\n.demo-surface {\n  width: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n  font-size: clamp(1rem, 0.7rem + 1vw, 1.25rem);\n}\n\n.panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: var(--space);\n}\n\n.card {\n  container-type: inline-size;\n  padding: var(--space);\n  overflow-wrap: anywhere;\n}\n\n.card img {\n  max-width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.toolbar {\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n}\n\n@container (min-width: 26rem) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n  }\n}\n\n@media (min-width: 760px) {\n  .toolbar {\n    justify-content: space-between;\n    overflow-x: visible;\n  }\n}",
          tests: [test("contains", "fluid type", "clamp("), test("contains", "responsive grid", "auto-fit"), test("contains", "container queries", "@container"), test("contains", "container setup", "container-type"), test("contains", "responsive media", "object-fit"), test("contains", "horizontal safety", "overflow-x"), test("contains", "large screen media query", "@media")],
          xp: 120
        })
      ])
    ]
  };
