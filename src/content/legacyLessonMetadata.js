import { getPedagogy } from "./legacyPedagogy.js";

function skillsFor(id) {
  const groups = {
    html: ["semantic-html", "accessibility", "document-structure"],
    css: ["visual-style", "layout", "responsive-ui"],
    js: ["logic", "state", "debugging"],
    project: ["portfolio-output", "quality-checks", "independent-build"]
  };

  if (id.startsWith("html-12") || id.includes("final-project")) return groups.project;
  if (id.startsWith("html")) return groups.html;
  if (id.startsWith("css-06") || id.includes("responsive-audit-project")) return groups.project;
  if (id.startsWith("css")) return groups.css;
  if (id.startsWith("js-07")) return groups.project;
  if (id.startsWith("js")) return groups.js;
  return ["practice", "feedback", "progression"];
}

function difficultyFor(id) {
  if (id.includes("quiz")) return "quick";
  if (id.includes("final") || id.includes("project")) return "project";
  if (id.startsWith("js-06") || id.startsWith("js-07") || id.startsWith("css-05")) return "stretch";
  if (id.startsWith("html-01") || id.startsWith("html-02") || id.startsWith("css-01") || id.startsWith("js-01")) return "starter";
  return "core";
}

function durationFor(id) {
  const difficulty = difficultyFor(id);
  if (difficulty === "quick") return 15;
  if (difficulty === "starter") return 30;
  if (difficulty === "stretch") return 55;
  if (difficulty === "project") return projectDurationFor(id);
  return 40;
}

function projectDurationFor(id) {
  if (id.includes("final-project") || id === "js-07-final-project") return 180;
  if (id.includes("responsive-audit-project")) return 150;
  if (id.includes("accessibility-audit")) return 120;
  return 90;
}

function theoryFor(id) {
  const generic = {
    fr: {
      points: [
        "Lis la consigne puis cherche la plus petite modification utile.",
        "Lance les tests souvent : ils indiquent précisément ce qui manque.",
        "Garde un code lisible, même dans les petits exercices."
      ],
      example: ""
    },
    en: {
      points: [
        "Read the brief, then look for the smallest useful change.",
        "Run tests often: they tell you exactly what is missing.",
        "Keep the code readable, even in small exercises."
      ],
      example: ""
    }
  };

  const lessons = {
    "html-01-document-skeleton": {
      fr: {
        points: ["Le doctype indique au navigateur d'utiliser le mode standard.", "head contient les métadonnées, body contient le contenu visible.", "lang et charset aident l'accessibilité et l'affichage du texte."],
        example: "<!doctype html>\n<html lang=\"fr\">"
      },
      en: {
        points: ["The doctype tells the browser to use standards mode.", "head contains metadata, body contains visible content.", "lang and charset help accessibility and text rendering."],
        example: "<!doctype html>\n<html lang=\"en\">"
      }
    },
    "css-03-flexbox": {
      fr: {
        points: ["display: flex transforme les enfants directs en items flex.", "gap espace les items sans ajouter de margins fragiles.", "align-items contrôle l'axe secondaire."],
        example: ".toolbar {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}"
      },
      en: {
        points: ["display: flex turns direct children into flex items.", "gap spaces items without fragile margins.", "align-items controls the cross axis."],
        example: ".toolbar {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}"
      }
    },
    "js-02-functions": {
      fr: {
        points: ["Une fonction regroupe une logique réutilisable.", "Les paramètres sont les entrées.", "return est la sortie testable de la fonction."],
        example: "function double(number) {\n  return number * 2;\n}"
      },
      en: {
        points: ["A function groups reusable logic.", "Parameters are inputs.", "return is the testable output of the function."],
        example: "function double(number) {\n  return number * 2;\n}"
      }
    }
  };

  const topicTheories = [
    {
      match: ["form", "fieldset", "validation"],
      theory: {
        fr: { points: ["Un formulaire accessible associe chaque contrôle à un nom visible.", "Les attributs natifs réduisent le JavaScript nécessaire et améliorent la saisie.", "Les contraintes doivent être expliquées avant l'erreur."], example: "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required />" },
        en: { points: ["An accessible form associates every control with a visible name.", "Native attributes reduce required JavaScript and improve input.", "Constraints must be explained before an error."], example: "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required />" }
      }
    },
    {
      match: ["accessibility", "aria", "landmarks", "audit"],
      theory: {
        fr: { points: ["L'accessibilité commence par un HTML natif et sémantique.", "Le clavier, les lecteurs d'écran et le zoom doivent rester utilisables.", "ARIA complète le HTML mais ne remplace pas un élément natif correct."], example: "<nav aria-label=\"Navigation principale\">...</nav>" },
        en: { points: ["Accessibility starts with native semantic HTML.", "Keyboard, screen readers, and zoom must remain usable.", "ARIA complements HTML but does not replace the correct native element."], example: "<nav aria-label=\"Main navigation\">...</nav>" }
      }
    },
    {
      match: ["flex", "grid", "responsive", "mobile"],
      theory: {
        fr: { points: ["Flexbox organise principalement sur un axe, Grid sur deux axes.", "Une approche mobile-first pose une base simple puis enrichit les grands écrans.", "gap crée un espacement cohérent sans dépendre de la position des éléments."], example: ".panel {\n  display: grid;\n  gap: 1rem;\n}" },
        en: { points: ["Flexbox mainly organizes on one axis, Grid on two axes.", "A mobile-first approach sets a simple base then enhances larger screens.", "gap creates consistent spacing without depending on item position."], example: ".panel {\n  display: grid;\n  gap: 1rem;\n}" }
      }
    },
    {
      match: ["arrays", "map", "reduce", "find", "some"],
      theory: {
        fr: { points: ["Un tableau représente une collection ordonnée de valeurs.", "map transforme, filter sélectionne, find récupère et reduce agrège.", "Choisir la bonne méthode rend l'intention du code immédiatement lisible."], example: "const titles = courses.map((course) => course.title);" },
        en: { points: ["An array represents an ordered collection of values.", "map transforms, filter selects, find retrieves, and reduce aggregates.", "Choosing the right method makes code intent immediately readable."], example: "const titles = courses.map((course) => course.title);" }
      }
    },
    {
      match: ["dom", "toggle", "submit", "counter"],
      theory: {
        fr: { points: ["Le DOM est la représentation manipulable de la page.", "Un écouteur relie un événement utilisateur à une fonction.", "Sépare l'état, les actions et le rendu pour éviter une logique fragile."], example: "button.addEventListener(\"click\", render);" },
        en: { points: ["The DOM is the manipulable representation of the page.", "A listener connects a user event to a function.", "Separate state, actions, and rendering to avoid fragile logic."], example: "button.addEventListener(\"click\", render);" }
      }
    },
    {
      match: ["fetch", "storage", "json"],
      theory: {
        fr: { points: ["Les données externes peuvent échouer, être lentes ou avoir une forme inattendue.", "JSON permet de sérialiser des données structurées.", "Une fonction asynchrone doit gérer le succès, l'attente et l'erreur."], example: "const response = await fetch(url);\nif (!response.ok) throw new Error(\"Request failed\");" },
        en: { points: ["External data can fail, be slow, or have an unexpected shape.", "JSON serializes structured data.", "An asynchronous function must handle success, waiting, and failure."], example: "const response = await fetch(url);\nif (!response.ok) throw new Error(\"Request failed\");" }
      }
    }
  ];
  const topic = topicTheories.find((item) => item.match.some((part) => id.includes(part)));
  return lessons[id] || topic?.theory || generic;
}

function courseFor(id, type) {
  const track = id.startsWith("css") ? "css" : id.startsWith("js") ? "javascript" : "html";
  const topics = {
    html: {
      fr: {
        introduction: "Cette leçon explique comment structurer une information pour qu'elle soit comprise par le navigateur, les moteurs de recherche et les technologies d'assistance.",
        sections: [
          { title: "Le concept essentiel", paragraphs: ["HTML donne un rôle au contenu. Le choix d'un élément doit dépendre de sa signification, pas de son apparence par défaut.", "Une structure claire est plus simple à maintenir, à styliser et à rendre accessible."], example: "<section>\n  <h2>Un sujet</h2>\n  <p>Une explication.</p>\n</section>" },
          { title: "Méthode de travail", paragraphs: ["Commence par identifier les grandes zones et leur hiérarchie.", "Ajoute ensuite les attributs nécessaires, puis relis le document comme un plan avant de lancer les tests."], example: "<main>\n  <!-- contenu principal -->\n</main>" }
        ],
        vocabulary: [["Sémantique", "Signification portée par un élément HTML."], ["Hiérarchie", "Organisation parent/enfant des éléments."], ["Attribut", "Information qui précise le comportement ou le sens d'un élément."]],
        check: ["Je peux expliquer le rôle des éléments utilisés.", "Ma structure reste compréhensible sans CSS.", "J'ai vérifié les attributs requis."]
      },
      en: {
        introduction: "This lesson explains how to structure information so browsers, search engines, and assistive technologies can understand it.",
        sections: [{ title: "The essential concept", paragraphs: ["HTML gives meaning to content. Choose elements by meaning rather than default appearance.", "A clear structure is easier to maintain, style, and make accessible."], example: "<section>\n  <h2>A topic</h2>\n  <p>An explanation.</p>\n</section>" }],
        vocabulary: [["Semantics", "Meaning carried by an HTML element."], ["Hierarchy", "Parent and child organization of elements."], ["Attribute", "Information that refines an element."]],
        check: ["I can explain the role of each element.", "My structure makes sense without CSS.", "I checked required attributes."]
      }
    },
    css: {
      fr: {
        introduction: "Cette leçon part du fonctionnement réel de CSS : sélectionner un élément, appliquer une règle, puis comprendre comment cette règle interagit avec les autres.",
        sections: [
          { title: "Anatomie d'une règle CSS", paragraphs: ["Un sélecteur choisit les éléments concernés. Chaque déclaration associe une propriété à une valeur.", "La cascade, la spécificité et l'ordre déterminent quelle règle gagne."], example: ".card {\n  padding: 1rem;\n  background: white;\n}" },
          { title: "Raisonner avant d'ajuster", paragraphs: ["Commence par les propriétés de structure comme display, width et gap.", "Ajoute ensuite la typographie, les couleurs et les interactions. Teste à plusieurs largeurs."], example: ".panel {\n  display: grid;\n  gap: 1rem;\n}" }
        ],
        vocabulary: [["Sélecteur", "Expression qui cible des éléments."], ["Propriété", "Aspect que la règle modifie."], ["Valeur", "Réglage appliqué à la propriété."], ["Cascade", "Mécanisme qui décide quelle déclaration est utilisée."]],
        check: ["Je sais quel élément ma règle cible.", "Je comprends l'effet de chaque propriété.", "J'ai vérifié le rendu à différentes tailles."]
      },
      en: {
        introduction: "This lesson starts from how CSS works: select an element, apply a rule, then understand how it interacts with other rules.",
        sections: [{ title: "Anatomy of a CSS rule", paragraphs: ["A selector chooses elements. Each declaration connects a property with a value.", "Cascade, specificity, and order decide which rule wins."], example: ".card {\n  padding: 1rem;\n}" }],
        vocabulary: [["Selector", "Expression targeting elements."], ["Property", "Aspect changed by a rule."], ["Value", "Setting applied to a property."], ["Cascade", "Mechanism deciding which declaration is used."]],
        check: ["I know what my rule targets.", "I understand every property.", "I checked multiple viewport sizes."]
      }
    },
    javascript: {
      fr: {
        introduction: "Cette leçon explique la logique avant la syntaxe : quelles données entrent, quelle transformation est appliquée et quel résultat doit sortir.",
        sections: [
          { title: "Lire un programme comme une suite d'étapes", paragraphs: ["Une valeur est stockée dans une variable, transformée par des expressions ou des fonctions, puis utilisée ou retournée.", "Un code facile à tester produit des résultats prévisibles à partir d'entrées précises."], example: "function double(number) {\n  return number * 2;\n}" },
          { title: "Déboguer méthodiquement", paragraphs: ["Lis le message d'erreur et localise la ligne concernée.", "Vérifie une hypothèse à la fois avec la console ou un test simple."], example: "console.log({ value, result });" }
        ],
        vocabulary: [["Valeur", "Donnée manipulée par le programme."], ["Variable", "Nom permettant de retrouver une valeur."], ["Fonction", "Bloc de logique réutilisable."], ["return", "Résultat renvoyé par une fonction."]],
        check: ["Je connais les entrées attendues.", "Je peux expliquer chaque transformation.", "J'ai vérifié le résultat et un cas limite."]
      },
      en: {
        introduction: "This lesson explains logic before syntax: what data enters, what transformation happens, and what result must come out.",
        sections: [{ title: "Read a program as steps", paragraphs: ["A value is stored, transformed, then used or returned.", "Testable code produces predictable outputs from precise inputs."], example: "function double(number) {\n  return number * 2;\n}" }],
        vocabulary: [["Value", "Data manipulated by a program."], ["Variable", "A name used to retrieve a value."], ["Function", "Reusable logic block."], ["return", "Result produced by a function."]],
        check: ["I know the expected inputs.", "I can explain each transformation.", "I checked the result and an edge case."]
      }
    },
    quiz: {
      fr: { introduction: "Ce quiz vérifie que tu peux expliquer le concept et choisir une solution adaptée, pas seulement reconnaître du code.", sections: [{ title: "Avant de répondre", paragraphs: ["Reformule la question avec tes propres mots.", "Compare les conséquences de chaque choix pour l'utilisateur et la maintenance."], example: "" }], vocabulary: [], check: ["Je peux justifier ma réponse.", "Je comprends pourquoi les autres choix sont moins adaptés."] },
      en: { introduction: "This quiz checks whether you can explain the concept and choose an appropriate solution.", sections: [{ title: "Before answering", paragraphs: ["Rephrase the question.", "Compare the consequences of each choice."], example: "" }], vocabulary: [], check: ["I can justify my answer."] }
    },
    project: {
      fr: { introduction: "Ce projet te demande de transformer plusieurs notions en un livrable cohérent. Il faut planifier, construire, tester puis relire.", sections: [{ title: "Construire par étapes", paragraphs: ["Découpe le cahier des charges en zones indépendantes.", "Livre une version simple qui fonctionne, puis améliore la qualité et l'accessibilité."], example: "" }], vocabulary: [["Livrable", "Résultat concret pouvant être présenté ou évalué."], ["Rubrique", "Liste des critères utilisés pour évaluer le projet."]], check: ["Tous les critères sont couverts.", "Le résultat est lisible et testable.", "J'ai relu le livrable comme un utilisateur."] },
      en: { introduction: "This project asks you to combine several concepts into a coherent deliverable.", sections: [{ title: "Build in stages", paragraphs: ["Break the brief into independent areas.", "Ship a simple working version, then improve quality."], example: "" }], vocabulary: [["Deliverable", "Concrete result that can be presented or assessed."]], check: ["All criteria are covered.", "The result is readable and testable."] }
    }
  };
  const base = topics[type === "quiz" || type === "project" ? type : track];
  const pedagogy = getPedagogy(id)?.fr;
  if (!pedagogy) return base;

  return {
    ...base,
    fr: {
      introduction: pedagogy.why,
      sections: [
        {
          title: "Comprendre le principe",
          paragraphs: pedagogy.objectives.map((objective) => `À la fin de cette leçon, tu sauras ${objective.charAt(0).toLowerCase()}${objective.slice(1)}.`),
          example: ""
        },
        {
          title: pedagogy.comparison.good.title,
          paragraphs: [pedagogy.comparison.good.explanation, ...pedagogy.correction.slice(0, 2)],
          example: pedagogy.comparison.good.code
        },
        {
          title: `Pourquoi éviter : ${pedagogy.comparison.bad.title}`,
          paragraphs: [pedagogy.comparison.bad.explanation, pedagogy.summary],
          example: pedagogy.comparison.bad.code
        }
      ],
      vocabulary: pedagogy.vocabulary,
      check: [
        `Je peux expliquer : ${pedagogy.summary}`,
        ...pedagogy.objectives.slice(0, 2).map((objective) => `Je peux ${objective.charAt(0).toLowerCase()}${objective.slice(1)}.`)
      ]
    }
  };
}

function guideFor(id, type) {
  const track = id.startsWith("html") ? "html" : id.startsWith("css") ? "css" : id.startsWith("js") ? "javascript" : type;
  const guides = {
    html: {
      fr: {
        objectives: ["Comprendre le rôle des éléments demandés", "Écrire une structure valide et lisible", "Vérifier le résultat avec les tests et l'aperçu"],
        steps: ["Lis la consigne et repère les éléments HTML attendus.", "Construis d'abord la structure principale, puis ajoute les attributs.", "Lance les tests un par un et inspecte l'aperçu avant de valider."],
        mistakes: ["Utiliser des div quand un élément sémantique existe", "Oublier de relier les labels, liens ou descriptions", "Modifier plusieurs zones à la fois sans tester"]
      },
      en: {
        objectives: ["Understand the role of the requested elements", "Write a valid readable structure", "Verify the result with tests and preview"],
        steps: ["Read the brief and identify the expected HTML elements.", "Build the main structure first, then add attributes.", "Run tests one by one and inspect the preview before validating."],
        mistakes: ["Using div when a semantic element exists", "Forgetting to connect labels, links, or descriptions", "Changing several areas at once without testing"]
      }
    },
    css: {
      fr: {
        objectives: ["Choisir le bon sélecteur", "Appliquer des propriétés prévisibles", "Contrôler le résultat visuel sans casser le responsive"],
        steps: ["Identifie précisément l'élément à cibler.", "Ajoute les propriétés structurelles avant la décoration.", "Observe l'aperçu, puis ajuste une propriété à la fois."],
        mistakes: ["Employer un sélecteur trop large", "Compenser un mauvais layout avec des valeurs arbitraires", "Oublier les petits écrans et le mouvement réduit"]
      },
      en: {
        objectives: ["Choose the right selector", "Apply predictable properties", "Control the visual result without breaking responsiveness"],
        steps: ["Identify the exact element to target.", "Add structural properties before decoration.", "Inspect the preview, then adjust one property at a time."],
        mistakes: ["Using an overly broad selector", "Compensating for a bad layout with arbitrary values", "Forgetting small screens and reduced motion"]
      }
    },
    javascript: {
      fr: {
        objectives: ["Décomposer le problème en entrées, traitement et sortie", "Écrire une logique testable", "Lire les erreurs et vérifier les cas limites"],
        steps: ["Définis ce que le code reçoit et doit retourner.", "Écris le cas simple avant les variantes.", "Exécute le code puis utilise les tests pour corriger précisément."],
        mistakes: ["Modifier les données sans comprendre leur forme", "Oublier return ou les cas limites", "Déboguer plusieurs hypothèses en même temps"]
      },
      en: {
        objectives: ["Break the problem into input, processing, and output", "Write testable logic", "Read errors and verify edge cases"],
        steps: ["Define what the code receives and must return.", "Write the simple case before variants.", "Run the code, then use tests to correct precisely."],
        mistakes: ["Changing data without understanding its shape", "Forgetting return or edge cases", "Debugging several hypotheses at once"]
      }
    },
    project: {
      fr: {
        objectives: ["Transformer un cahier des charges en livrable", "Assembler plusieurs compétences sans guide ligne par ligne", "Relire et améliorer la qualité avant validation"],
        steps: ["Découpe le projet en grandes zones et liste les tests associés.", "Livre une première version fonctionnelle avant de la raffiner.", "Passe la rubrique de validation, puis corrige les derniers écarts."],
        mistakes: ["Commencer par les détails visuels", "Chercher à tout écrire d'un seul bloc", "S'arrêter dès que les tests passent sans relire"]
      },
      en: {
        objectives: ["Turn a brief into a deliverable", "Combine several skills without line-by-line guidance", "Review and improve quality before validation"],
        steps: ["Break the project into major areas and list related tests.", "Ship a functional first version before refining it.", "Use the validation rubric, then fix remaining gaps."],
        mistakes: ["Starting with visual details", "Trying to write everything in one block", "Stopping as soon as tests pass without reviewing"]
      }
    },
    quiz: {
      fr: {
        objectives: ["Vérifier la compréhension du concept", "Justifier un choix technique", "Identifier les alternatives trompeuses"],
        steps: ["Lis chaque réponse complètement.", "Élimine les choix qui ne résolvent qu'une partie du problème.", "Valide puis relis l'explication."],
        mistakes: ["Choisir selon l'apparence", "Ignorer les utilisateurs ou cas limites", "Mémoriser sans comprendre la raison"]
      },
      en: {
        objectives: ["Check concept understanding", "Justify a technical choice", "Identify misleading alternatives"],
        steps: ["Read every answer completely.", "Eliminate choices that solve only part of the problem.", "Validate, then read the explanation."],
        mistakes: ["Choosing based on appearance", "Ignoring users or edge cases", "Memorizing without understanding why"]
      }
    }
  };
  const base = guides[type === "project" || type === "quiz" ? type : track] || guides.html;
  const pedagogy = getPedagogy(id)?.fr;
  if (!pedagogy) return base;

  return {
    ...base,
    fr: {
      objectives: pedagogy.objectives,
      steps: pedagogy.guided,
      mistakes: [
        pedagogy.comparison.bad.explanation,
        `Reproduire « ${pedagogy.comparison.bad.title} » sans analyser son impact.`,
        `Valider sans pouvoir expliquer cette règle : ${pedagogy.summary}`
      ]
    }
  };
}

function projectRubricFor(id) {
  const commonEn = ["Every required test passes.", "The code remains readable and organized.", "The result can be explained without the solution."];
  const rubrics = {
    "html-05-mini-project-profile": ["La navigation atteint chaque section annoncée.", "La hiérarchie des titres reste logique.", "Images, listes et liens transmettent un sens clair.", "La page reste compréhensible sans CSS."],
    "html-11-accessibility-audit": ["Chaque problème est relié à un impact utilisateur.", "Les corrections privilégient les éléments HTML natifs.", "La page est utilisable au clavier.", "Chaque correction est vérifiée, pas seulement écrite."],
    "html-12-final-project": ["Toutes les zones du cahier des charges sont présentes.", "La navigation, le tableau et le formulaire sont accessibles.", "Les métadonnées décrivent précisément PulsaConf.", "Le projet passe une relecture clavier, contenu et SEO."],
    "html-13-workshop-capstone": ["Toutes les micro-étapes de l’atelier sont représentées dans une page cohérente.", "La navigation, les landmarks et les titres permettent de parcourir PulsaConf sans contexte visuel.", "Le formulaire expose labels, aides, contraintes et statut de façon accessible.", "Les tests finaux prouvent la structure, les relations et les contenus essentiels du projet."],
    "html-14-production-audit-project": ["Le head contient les métadonnées nécessaires au SEO, au partage et à la canonicalisation.", "La navigation clavier permet d’atteindre directement le contenu principal.", "Le formulaire, le tableau et les médias exposent labels, aides, alternatives et statuts.", "La page évite les liens vagues et reste compréhensible sans CSS.", "Les critères d’audit sont couverts par des éléments HTML natifs."],
    "css-03-mini-project-navbar": ["La navbar aligne et distribue correctement ses groupes.", "Toutes les actions restent visibles sur petit écran.", "Les zones cliquables et le focus sont clairement perceptibles.", "Aucune largeur fixe fragile n'est utilisée."],
    "css-06-final-project": ["La landing utilise un système visuel cohérent.", "Le layout reste lisible sans débordement aux largeurs testées.", "Les états hover et focus communiquent clairement l'interaction.", "Le mouvement respecte prefers-reduced-motion."],
    "css-07-responsive-audit-project": ["Le texte utilise une échelle fluide bornée.", "Les cartes résistent aux contenus longs et aux conteneurs étroits.", "Les images conservent un ratio stable sans débordement.", "La navigation reste accessible sur petit écran.", "Les container queries améliorent le composant sans dépendre seulement de la fenêtre."],
    "js-04-mini-project-counter": ["L'état count reste l'unique source de vérité.", "Les actions modifient l'état avant le rendu.", "Le rendu synchronise correctement le DOM.", "Les limites et cas de remise à zéro sont vérifiés."],
    "js-07-final-project": ["L'état central représente toutes les tâches.", "Ajout, complétion et suppression gèrent leurs cas limites.", "Chaque modification déclenche sauvegarde et rendu.", "Une sauvegarde absente ou invalide ne bloque pas l'application."]
  };
  return { fr: rubrics[id] || ["Tous les tests requis passent.", "Le code reste lisible et organisé.", "Le résultat peut être expliqué sans la solution."], en: commonEn };
}
export { courseFor, difficultyFor, durationFor, guideFor, projectDurationFor, projectRubricFor, skillsFor, theoryFor };
