import { module, quizLesson, projectLesson, cssLesson, test } from "./trackBuilders.js";
import { cssModulesFoundation } from "./cssModulesFoundation.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const foundationModules = [
  ...cssModulesFoundation,
  module("css-selectors", "Selecteurs", "Selectors", [
    cssLesson("css-01-selectors", ["Selector Quest", "Selector Quest"], "Cible uniquement les cartes de cours avec la classe .course-card.", ".course-card {\n  /* ecris ici */\n}", ".course-card", ["background", "border"], 25),
    cssLesson("css-01-combinators", ["Selecteur direct", "Direct selector"], "Cible seulement les boutons directement dans .toolbar avec le combinateur >.", ".toolbar > button {\n  /* style direct */\n}", ".toolbar > button", ["background", "border-radius"], 25),
    cssLesson("css-01-states", ["Etats interactifs", "Interactive states"], "Ajoute un etat :focus-visible clair aux boutons pour la navigation clavier.", ".toolbar button {\n  /* style de base */\n}\n\n.toolbar button:focus-visible {\n  /* focus ici */\n}", ".toolbar button:focus-visible", ["outline", "outline-offset"], 30),
    quizLesson({
      id: "css-01-specificity-quiz",
      title: ["Quiz specificite", "Specificity quiz"],
      brief: ["Choisis le selecteur le plus specifique.", "Choose the most specific selector."],
      question: { fr: "Quel selecteur gagne en priorite ?", en: "Which selector has the highest priority?" },
      options: [
        { id: "tag", label: { fr: "article", en: "article" } },
        { id: "class", label: { fr: ".course-card", en: ".course-card" } },
        { id: "id", label: { fr: "#featured-card", en: "#featured-card" } }
      ],
      answer: "id",
      explanation: { fr: "Un id est plus specifique qu'une classe ou qu'une balise.", en: "An id is more specific than a class or a tag." },
      xp: 15
    })
  ]),
  module("css-box-model", "Box model", "Box model", [
    cssLesson("css-02-box-model", ["Carte produit", "Product card"], "Transforme la carte en bloc lisible avec padding, border-radius et shadow.", ".card {\n  /* espace, coins, ombre */\n}", ".card", ["padding", "border-radius", "box-shadow"], 30),
    cssLesson("css-02-typography", ["Typographie lisible", "Readable typography"], "Ameliore la lisibilite avec font-size, line-height et max-width.", ".demo-surface {\n  /* typo ici */\n}", ".demo-surface", ["font-size", "line-height", "max-width"], 25),
    cssLesson("css-02-custom-properties", ["Variables CSS", "CSS variables"], "Declare une variable --accent puis utilise-la pour colorer les cartes.", ":root {\n  /* variable ici */\n}\n\n.card {\n  /* utilise la variable */\n}", ":root", ["--accent", "background: var(--accent)"], 35),
    cssLesson("css-02-sizing", ["Tailles fluides", "Fluid sizing"], "Donne a la surface une largeur fluide avec width, max-width et margin auto.", ".demo-surface {\n  /* largeur fluide */\n}", ".demo-surface", ["width", "max-width", "margin"], 30),
    cssLesson("css-02-overflow", ["Controler le debordement", "Control overflow"], "Empeche le contenu long de casser la carte avec overflow-wrap et overflow.", ".card {\n  /* protege le layout */\n}", ".card", ["overflow", "overflow-wrap"], 30)
  ]),
  module("css-flexbox", "Flexbox", "Flexbox", [
    cssLesson("css-03-flexbox", ["Flex Rescue", "Flex Rescue"], "Aligne les boutons sur une ligne avec display flex, gap et align-items.", ".toolbar {\n  /* flex ici */\n}", ".toolbar", ["display: flex", "gap", "align-items"], 35),
    cssLesson("css-03-flex-wrap", ["Wrap Lab", "Wrap Lab"], "Autorise les cartes a revenir a la ligne avec flex-wrap.", ".panel {\n  display: flex;\n  /* wrap ici */\n}", ".panel", ["display: flex", "flex-wrap", "gap"], 30),
    cssLesson("css-03-space-between", ["Navbar flex", "Navbar flex"], "Separe le logo et les actions avec justify-content: space-between.", ".toolbar {\n  display: flex;\n  /* distribution ici */\n}", ".toolbar", ["display: flex", "justify-content: space-between", "align-items"], 30),
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
    cssLesson("css-04-grid", ["Grid Builder", "Grid Builder"], "Cree une grille responsive avec display grid, repeat et minmax.", ".gallery {\n  /* grid ici */\n}", ".gallery", ["display: grid", "repeat", "minmax"], 35),
    cssLesson("css-04-grid-gap", ["Gallery spacing", "Gallery spacing"], "Ajoute un gap clair et une grille en trois colonnes.", ".gallery {\n  /* grille fixe */\n}", ".gallery", ["display: grid", "grid-template-columns", "gap"], 30),
    cssLesson("css-04-place-items", ["Centrage grid", "Grid centering"], "Centre les elements de la galerie avec place-items.", ".gallery {\n  display: grid;\n  /* centrage ici */\n}", ".gallery", ["display: grid", "place-items", "min-height"], 30)
  ])
];

export const cssTrackFoundationChunk = createCssTrack(foundationModules, ["foundation"]);
