# Cahier des charges du curriculum PulsaTeach

## Vision pédagogique

L’analyse des formats proposés par entity["video_game","Flexbox Froggy","css learning game"], entity["video_game","Grid Garden","css grid learning game"], entity["video_game","CSS Diner","css selectors game"], entity["organization","freeCodeCamp","nonprofit coding platform"], entity["company","Codepip","coding games platform"], entity["company","Frontend Mentor","frontend challenge platform"], entity["video_game","CSSBattle","css golf game"], entity["company","Codecademy","online learning platform"], entity["organization","MDN Web Docs","mozilla docs"], entity["company","Codewars","coding challenge platform"], entity["company","Scrimba","interactive screencast platform"], entity["company","Coding Fantasy","coding games platform"], entity["company","CodeCombat","game based coding platform"], entity["company","W3Schools","web tutorial platform"], entity["company","JSFiddle","web code playground"] et entity["company","CodePen","frontend code playground"] montre qu’aucun de ces produits n’est suffisant seul pour former un débutant sérieux. Les jeux mono-compétence excellent sur la focalisation d’une notion par écran, les cursus structurés excellent sur la progression, les briefs de projets excellent sur la transférabilité portfolio, et les playgrounds excellent sur la boucle “j’écris / je vois / je corrige”. PulsaTeach doit donc être une plateforme hybride : cursus structuré, pratique immédiate, mini-jeux ciblés, projets réalistes et sandbox toujours disponible. citeturn23view0turn13view1turn24view0turn20search0turn13view5turn13view6turn14view6turn13view4turn13view7turn3search0turn14view4turn15view0turn13view11turn13view12turn4search1

La littérature suggère qu’un bon parcours de code débutant doit combiner unités courtes, pratique active, feedback rapide et production concrète. Le project-based learning améliore surtout l’engagement, le sentiment de pertinence et plusieurs résultats d’apprentissage lorsqu’il débouche sur un livrable réel. En programmation débutante, le feedback immédiat améliore l’engagement et l’intention de persister. La gamification est utile quand elle soutient l’effort et la compétence au lieu de remplacer la pratique. Enfin, le microlearning fonctionne bien pour des objectifs ciblés, mais il perd de la valeur s’il n’est pas empilé dans un parcours plus profond. citeturn5search7turn5search6turn5search9turn5search8turn19search1turn19search5

La philosophie PulsaTeach doit donc être la suivante :

- **Apprendre par fabrication.** Chaque module se termine par un mini-projet, chaque track par un projet final publiable.
- **Découper sans fragmenter.** Une micro-leçon = une idée précise, 5 à 12 minutes, suivie d’un exercice. Plusieurs micro-leçons s’agrègent ensuite dans une production plus large.
- **Feedback immédiat et progressif.** Les tests doivent d’abord dire *ce qui manque*, puis *où regarder*, puis *comment corriger* si l’utilisateur demande de l’aide.
- **Gamification au service des compétences.** XP, badges et niveaux doivent récompenser la maîtrise, la régularité et la qualité, pas le simple volume de clics.
- **Bilingue natif, pas traduit après coup.** Chaque contenu existe comme donnée `{ fr, en }`, avec IDs stables et messages de test localisés.
- **Objectif produit clair.** La sortie attendue n’est pas “expert front-end”, mais “junior frontend foundations” : savoir structurer une page accessible, la styliser proprement, la rendre responsive, la rendre interactive, déboguer, publier des projets cohérents et expliquer ses choix. citeturn13view6turn14view6turn20search16

La boucle d’apprentissage recommandée pour presque toutes les leçons est :

`micro-leçon → démonstration → exercice guidé → tests automatiques → indice facultatif → correction guidée → XP → mini-réemploi dans un projet`

## Architecture du curriculum

L’architecture ci-dessous suit la logique des modules fondamentaux HTML/CSS/JS mis en avant par MDN, les parcours pratiques de freeCodeCamp, et la logique de portfolio de Frontend Mentor. L’idée n’est pas de singer ces plateformes, mais d’en reprendre les mécanismes les plus efficaces dans une architecture originale, cohérente et sérialisable côté React. citeturn13view6turn20search0turn20search1turn14view6

```js
const pulsaTeachBlueprint = {
  meta: {
    id: "pulsa-curriculum-v1",
    audience: "true-beginners",
    exitTarget: "junior-frontend-foundations",
    languages: ["fr", "en"],
    totalEstimatedHours: 180,
    pedagogy: [
      "micro-lessons",
      "interactive practice",
      "mini-games",
      "project-based learning",
      "immediate feedback",
      "portfolio-ready outputs"
    ]
  },

  tracks: [
    {
      id: "track-html",
      title: { fr: "HTML de A à Z", en: "HTML from zero to job-ready basics" },
      level: "beginner",
      estimatedHours: 24,
      prerequisites: [],
      unlocks: [
        "build semantic page structure",
        "author accessible content",
        "create usable forms",
        "apply basic SEO metadata",
        "write clean HTML"
      ],
      modules: [
        {
          id: "html-foundations",
          title: { fr: "Fondations du document", en: "Document foundations" },
          durationMin: 180,
          level: "beginner",
          prerequisites: [],
          objectives: {
            fr: ["Comprendre html/head/body", "Créer une page valide", "Poser les métadonnées de base"],
            en: ["Understand html/head/body", "Create a valid page", "Set basic metadata"]
          },
          lessons: [
            "html-01-document-skeleton",
            "html-02-text-content"
          ],
          exerciseTypes: ["lesson", "code-challenge", "quiz"],
          miniProject: {
            fr: "Page d’accueil texte-only sémantique",
            en: "Semantic text-only home page"
          }
        },
        {
          id: "html-content-and-navigation",
          title: { fr: "Contenu et navigation", en: "Content and navigation" },
          durationMin: 240,
          level: "beginner",
          prerequisites: ["html-foundations"],
          objectives: {
            fr: ["Structurer du contenu", "Créer des liens fiables", "Gérer images et listes"],
            en: ["Structure content", "Create reliable links", "Handle images and lists"]
          },
          lessons: [
            "html-03-links-navigation",
            "html-04-images-media",
            "html-05-lists"
          ],
          exerciseTypes: ["code-challenge", "visual-match", "quiz"],
          miniProject: {
            fr: "Page profil riche avec navigation interne",
            en: "Rich profile page with internal navigation"
          }
        },
        {
          id: "html-data-and-forms",
          title: { fr: "Données et formulaires", en: "Data and forms" },
          durationMin: 330,
          level: "advanced-beginner",
          prerequisites: ["html-content-and-navigation"],
          objectives: {
            fr: ["Présenter des données tabulaires", "Créer des formulaires utilisables", "Associer labels et contrôles"],
            en: ["Present tabular data", "Create usable forms", "Associate labels and controls"]
          },
          lessons: [
            "html-06-tables",
            "html-07-forms-basics",
            "html-08-form-controls-validation"
          ],
          exerciseTypes: ["code-challenge", "quiz", "debug-challenge"],
          miniProject: {
            fr: "Formulaire d’inscription accessible",
            en: "Accessible signup form"
          }
        },
        {
          id: "html-semantics-a11y-seo",
          title: { fr: "Sémantique, accessibilité, SEO", en: "Semantics, accessibility, SEO" },
          durationMin: 270,
          level: "advanced-beginner",
          prerequisites: ["html-data-and-forms"],
          objectives: {
            fr: ["Remplacer la div soup par des balises sémantiques", "Ajouter les indispensables accessibilité", "Ajouter title/meta description"],
            en: ["Replace div soup with semantic tags", "Add baseline accessibility", "Add title/meta description"]
          },
          lessons: [
            "html-09-semantic-layout",
            "html-10-accessibility-basics",
            "html-11-seo-best-practices"
          ],
          exerciseTypes: ["debug-challenge", "code-challenge", "quiz"],
          miniProject: {
            fr: "Article/landing sémantique optimisé",
            en: "Semantic optimized article/landing page"
          }
        },
        {
          id: "html-final-project-module",
          title: { fr: "Projet final HTML", en: "HTML final project" },
          durationMin: 420,
          level: "advanced-beginner",
          prerequisites: ["html-semantics-a11y-seo"],
          objectives: {
            fr: ["Assembler toutes les briques HTML", "Produire un livrable publiable", "Passer une grille de validation"],
            en: ["Assemble all HTML skills", "Produce a publishable deliverable", "Pass a validation rubric"]
          },
          lessons: ["html-12-final-project"],
          exerciseTypes: ["project", "final-assessment"],
          miniProject: {
            fr: "Site événementiel HTML accessible",
            en: "Accessible HTML event site"
          }
        }
      ]
    },

    {
      id: "track-css",
      title: { fr: "CSS de A à Z", en: "CSS from zero to layout fluency" },
      level: "beginner-to-pre-junior",
      estimatedHours: 42,
      prerequisites: ["track-html >= 70%"],
      unlocks: [
        "style content cleanly",
        "reason about cascade and box model",
        "build flex and grid layouts",
        "make responsive pages",
        "add motion without hurting usability",
        "organize CSS at small-project scale"
      ]
    },

    {
      id: "track-javascript",
      title: { fr: "JavaScript de A à Z", en: "JavaScript from zero to interactive apps" },
      level: "beginner-to-pre-junior",
      estimatedHours: 72,
      prerequisites: ["track-html >= 70%", "track-css >= 40%"],
      unlocks: [
        "write core JS logic",
        "manipulate the DOM",
        "handle forms and events",
        "fetch data from APIs",
        "persist data in localStorage",
        "structure small frontend apps",
        "debug and improve code confidently"
      ]
    }
  ]
}
```

La progression transversale recommandée est : **HTML d’abord**, puis **CSS en parallèle des derniers modules HTML**, puis **JavaScript après un socle HTML/CSS suffisant**. Cela suit à la fois l’ordre des compétences fondamentales sur MDN et les prérequis explicites de JavaScript côté front-end, où la manipulation du DOM, les événements et les formulaires n’ont de sens que si l’apprenant comprend déjà la structure HTML et l’habillage CSS. citeturn6search6turn6search5turn11search18turn11search19

## Parcours HTML détaillé

Le parcours HTML doit rester compact mais rigoureux. MDN rappelle que HTML définit la structure et la sémantique du contenu, utiles à l’accessibilité, au SEO et aux fonctionnalités natives du navigateur. Les guides d’accessibilité insistent sur le HTML sémantique, les bons textes de lien, les labels de formulaire, l’alt text, les en-têtes de tableaux et l’ordre source. Les guides SEO de entity["company","Google","search company"] rappellent l’importance du `<title>`, de la `meta description` et du texte descriptif associé au contenu visuel. citeturn13view15turn9search3turn12search12turn4search13turn9search1turn9search5turn9search17

```js
const htmlLessons = [
  {
    id: "html-01-document-skeleton",
    type: "code-challenge",
    title: {
      fr: "Le squelette d’une page HTML",
      en: "The skeleton of an HTML page"
    },
    description: {
      fr: "Construire une page minimale valide avec doctype, head, body, title et charset.",
      en: "Build a valid minimal page with doctype, head, body, title, and charset."
    },
    objectives: {
      fr: [
        "Comprendre la structure html/head/body",
        "Ajouter un title utile",
        "Déclarer utf-8"
      ],
      en: [
        "Understand the html/head/body structure",
        "Add a useful title",
        "Declare utf-8"
      ]
    },
    exampleCode: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma première page</title>
  </head>
  <body>
    <h1>Bonjour PulsaTeach</h1>
  </body>
</html>`,
    starterCode: `<html>
  <head></head>
  <body>
    <h1>Bienvenue</h1>
  </body>
</html>`,
    exercise: {
      type: "code-challenge",
      ui: "editor + preview + tests"
    },
    consigne: {
      fr: "Complète le document pour qu’il soit valide et affiche le titre “Accueil PulsaTeach”.",
      en: "Complete the document so it is valid and displays the title “PulsaTeach Home”."
    },
    tests: [
      { type: "doctype-exists", message: { fr: "Ajoute <!doctype html>.", en: "Add <!doctype html>." } },
      { type: "html-attribute", selector: "html", attribute: "lang", exists: true, message: { fr: "Ajoute un attribut lang sur <html>.", en: "Add a lang attribute on <html>." } },
      { type: "html-contains", selector: "meta[charset]", message: { fr: "Ajoute <meta charset='UTF-8'>.", en: "Add <meta charset='UTF-8'>." } },
      { type: "text-equals", selector: "title", value: "Accueil PulsaTeach", message: { fr: "Le <title> doit être exact.", en: "The <title> must match exactly." } }
    ],
    hint: {
      fr: ["Le doctype se place tout en haut.", "Le titre n’apparaît pas dans le body."],
      en: ["The doctype goes at the very top.", "The title does not belong in the body."]
    },
    solution: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Accueil PulsaTeach</title>
  </head>
  <body>
    <h1>Bienvenue</h1>
  </body>
</html>`,
    xp: 25,
    badge: "first-structure"
  },

  {
    id: "html-02-text-content",
    type: "code-challenge",
    title: {
      fr: "Titres, paragraphes et sens du texte",
      en: "Headings, paragraphs, and text meaning"
    },
    description: {
      fr: "Utiliser h1-h3, p, strong et em pour structurer un contenu lisible.",
      en: "Use h1-h3, p, strong, and em to structure readable content."
    },
    objectives: {
      fr: ["Créer une hiérarchie de titres", "Distinguer structure et style", "Employer strong/em correctement"],
      en: ["Create a heading hierarchy", "Separate structure from style", "Use strong/em correctly"]
    },
    exampleCode: `<article>
  <h1>Apprendre le web</h1>
  <p><strong>HTML</strong> structure le contenu.</p>
  <p><em>CSS</em> gère la présentation.</p>
</article>`,
    starterCode: `<article>
  <!-- Ajoute un h1, un h2 et deux paragraphes -->
</article>`,
    exercise: { type: "code-challenge", ui: "editor + preview + dom-tree" },
    consigne: {
      fr: "Crée une mini fiche avec un h1, un h2, deux paragraphes, un mot en strong et un mot en em.",
      en: "Create a mini card with one h1, one h2, two paragraphs, one strong word, and one em word."
    },
    tests: [
      { type: "count", selector: "h1", value: 1, message: { fr: "Il faut un seul h1.", en: "You need exactly one h1." } },
      { type: "count", selector: "h2", value: 1, message: { fr: "Ajoute un h2.", en: "Add one h2." } },
      { type: "min-count", selector: "p", value: 2, message: { fr: "Ajoute deux paragraphes.", en: "Add two paragraphs." } },
      { type: "html-contains", selector: "strong", message: { fr: "Ajoute <strong>.", en: "Add <strong>." } },
      { type: "html-contains", selector: "em", message: { fr: "Ajoute <em>.", en: "Add <em>." } }
    ],
    hint: {
      fr: ["h1 = titre principal.", "strong exprime l’importance, em exprime l’emphase."],
      en: ["h1 = main title.", "strong expresses importance, em expresses emphasis."]
    },
    solution: `<article>
  <h1>Apprendre le web</h1>
  <h2>Les bases</h2>
  <p><strong>HTML</strong> organise le contenu.</p>
  <p><em>CSS</em> améliore l’apparence.</p>
</article>`,
    xp: 20,
    badge: null
  },

  {
    id: "html-03-links-navigation",
    type: "code-challenge",
    title: {
      fr: "Liens et navigation",
      en: "Links and navigation"
    },
    description: {
      fr: "Créer des liens externes, internes et de navigation avec un texte explicite.",
      en: "Create external, internal, and navigation links with clear link text."
    },
    objectives: {
      fr: ["Utiliser href", "Créer une navigation interne", "Écrire des textes de lien explicites"],
      en: ["Use href", "Create internal navigation", "Write clear link text"]
    },
    exampleCode: `<nav>
  <a href="#contact">Aller au contact</a>
  <a href="https://developer.mozilla.org/">Documentation MDN</a>
</nav>`,
    starterCode: `<nav></nav>
<section id="contact">
  <h2>Contact</h2>
</section>`,
    exercise: { type: "code-challenge", ui: "editor + preview + anchor-highlighter" },
    consigne: {
      fr: "Ajoute deux liens : un vers #contact et un vers un site externe. Évite les textes vagues comme “clique ici”.",
      en: "Add two links: one to #contact and one to an external site. Avoid vague text like “click here”."
    },
    tests: [
      { type: "html-contains", selector: 'a[href="#contact"]', message: { fr: "Ajoute un lien interne vers #contact.", en: "Add an internal link to #contact." } },
      { type: "html-contains", selector: 'a[href^="https://"]', message: { fr: "Ajoute un lien externe.", en: "Add an external link." } },
      { type: "selector-text-not-match", selector: "a", pattern: /clique ici|click here/i, message: { fr: "Le texte du lien doit décrire sa destination.", en: "Link text must describe its destination." } }
    ],
    hint: {
      fr: ["Un identifiant commence par # dans href.", "Le texte du lien doit décrire l’action ou la destination."],
      en: ["An internal target starts with # in href.", "The link text should describe the action or destination."]
    },
    solution: `<nav>
  <a href="#contact">Aller à la section contact</a>
  <a href="https://developer.mozilla.org/">Consulter la documentation</a>
</nav>
<section id="contact">
  <h2>Contact</h2>
</section>`,
    xp: 20,
    badge: null
  },

  {
    id: "html-04-images-media",
    type: "code-challenge",
    title: {
      fr: "Images, alt et légende",
      en: "Images, alt text, and captions"
    },
    description: {
      fr: "Insérer une image pertinente avec alt et, si nécessaire, figure/figcaption.",
      en: "Insert a relevant image with alt text and, when needed, figure/figcaption."
    },
    objectives: {
      fr: ["Ajouter une image", "Rédiger un alt utile", "Utiliser figure/figcaption"],
      en: ["Add an image", "Write useful alt text", "Use figure/figcaption"]
    },
    exampleCode: `<figure>
  <img src="avatar.jpg" alt="Portrait de Lina souriante" />
  <figcaption>Photo de profil de Lina</figcaption>
</figure>`,
    starterCode: `<!-- Ajoute une figure avec une image et une légende -->`,
    exercise: { type: "code-challenge", ui: "editor + preview + accessibility-check" },
    consigne: {
      fr: "Affiche une photo de profil avec un alt descriptif et une figcaption.",
      en: "Display a profile photo with descriptive alt text and a figcaption."
    },
    tests: [
      { type: "html-contains", selector: "figure", message: { fr: "Ajoute une balise figure.", en: "Add a figure element." } },
      { type: "html-contains", selector: "img[alt]", message: { fr: "L’image doit avoir un alt.", en: "The image must have alt text." } },
      { type: "html-contains", selector: "figcaption", message: { fr: "Ajoute une figcaption.", en: "Add a figcaption." } }
    ],
    hint: {
      fr: ["L’attribut alt décrit l’image pour quelqu’un qui ne la voit pas.", "Une figure regroupe média + légende."],
      en: ["The alt attribute describes the image for someone who cannot see it.", "A figure groups media + caption."]
    },
    solution: `<figure>
  <img src="profile.jpg" alt="Portrait de Sam devant un bureau" />
  <figcaption>Photo de profil de Sam</figcaption>
</figure>`,
    xp: 20,
    badge: "alt-guardian"
  },

  {
    id: "html-05-lists",
    type: "code-challenge",
    title: {
      fr: "Listes ordonnées et non ordonnées",
      en: "Ordered and unordered lists"
    },
    description: {
      fr: "Présenter des groupes d’éléments et des étapes avec ul, ol et li.",
      en: "Present grouped items and steps with ul, ol, and li."
    },
    objectives: {
      fr: ["Utiliser ul/ol/li", "Choisir la bonne liste selon le sens", "Structurer des contenus répétitifs"],
      en: ["Use ul/ol/li", "Choose the right list for meaning", "Structure repeated content"]
    },
    exampleCode: `<h2>Étapes</h2>
<ol>
  <li>Créer le fichier</li>
  <li>Écrire le contenu</li>
  <li>Tester la page</li>
</ol>`,
    starterCode: `<!-- Ajoute une liste de 3 compétences et une liste de 3 étapes -->`,
    exercise: { type: "code-challenge", ui: "editor + preview" },
    consigne: {
      fr: "Ajoute une ul de compétences et une ol d’étapes de publication.",
      en: "Add a ul for skills and an ol for publishing steps."
    },
    tests: [
      { type: "html-contains", selector: "ul", message: { fr: "Ajoute une liste non ordonnée.", en: "Add an unordered list." } },
      { type: "html-contains", selector: "ol", message: { fr: "Ajoute une liste ordonnée.", en: "Add an ordered list." } },
      { type: "min-count", selector: "li", value: 6, message: { fr: "Ajoute au moins 6 items au total.", en: "Add at least 6 items total." } }
    ],
    hint: {
      fr: ["ul pour un groupe, ol pour un ordre.", "Chaque élément se place dans li."],
      en: ["Use ul for a group, ol for an order.", "Each item goes inside li."]
    },
    solution: `<h2>Compétences</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<h2>Publication</h2>
<ol>
  <li>Écrire la page</li>
  <li>Relire le contenu</li>
  <li>Mettre en ligne</li>
</ol>`,
    xp: 20,
    badge: null
  },

  {
    id: "html-06-tables",
    type: "code-challenge",
    title: {
      fr: "Tableaux de données",
      en: "Data tables"
    },
    description: {
      fr: "Créer un vrai tableau de données avec caption, th, td et scope.",
      en: "Create a real data table using caption, th, td, and scope."
    },
    objectives: {
      fr: ["Utiliser table/caption/tr/th/td", "Ajouter scope", "Réserver le tableau aux données"],
      en: ["Use table/caption/tr/th/td", "Add scope", "Use tables for data only"]
    },
    exampleCode: `<table>
  <caption>Horaires</caption>
  <tr>
    <th scope="col">Jour</th>
    <th scope="col">Heure</th>
  </tr>
  <tr>
    <td>Lundi</td>
    <td>18h</td>
  </tr>
</table>`,
    starterCode: `<!-- Crée un tableau de planning avec 2 colonnes et 2 lignes de données -->`,
    exercise: { type: "code-challenge", ui: "editor + preview + accessibility-check" },
    consigne: {
      fr: "Crée un tableau “Planning atelier” avec colonnes Jour et Sujet, plus deux lignes de données.",
      en: "Create a “Workshop schedule” table with Day and Topic columns and two data rows."
    },
    tests: [
      { type: "html-contains", selector: "table", message: { fr: "Ajoute un tableau.", en: "Add a table." } },
      { type: "html-contains", selector: "caption", message: { fr: "Ajoute une caption.", en: "Add a caption." } },
      { type: "min-count", selector: 'th[scope="col"]', value: 2, message: { fr: "Les en-têtes de colonnes doivent avoir scope='col'.", en: "Column headers must have scope='col'." } },
      { type: "min-count", selector: "td", value: 4, message: { fr: "Ajoute 4 cellules de données.", en: "Add 4 data cells." } }
    ],
    hint: {
      fr: ["caption décrit le tableau.", "Les en-têtes sont en th."],
      en: ["caption describes the table.", "Headers use th."]
    },
    solution: `<table>
  <caption>Planning atelier</caption>
  <tr>
    <th scope="col">Jour</th>
    <th scope="col">Sujet</th>
  </tr>
  <tr>
    <td>Mardi</td>
    <td>HTML</td>
  </tr>
  <tr>
    <td>Jeudi</td>
    <td>CSS</td>
  </tr>
</table>`,
    xp: 25,
    badge: null
  },

  {
    id: "html-07-forms-basics",
    type: "code-challenge",
    title: {
      fr: "Formulaires de base",
      en: "Basic forms"
    },
    description: {
      fr: "Créer un formulaire simple avec form, label, input, textarea et button.",
      en: "Create a simple form using form, label, input, textarea, and button."
    },
    objectives: {
      fr: ["Utiliser form", "Associer label et input", "Ajouter un bouton d’envoi"],
      en: ["Use form", "Associate label and input", "Add a submit button"]
    },
    exampleCode: `<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit">Envoyer</button>
</form>`,
    starterCode: `<!-- Crée un formulaire contact avec nom, email, message et bouton -->`,
    exercise: { type: "code-challenge", ui: "editor + preview + test-panel" },
    consigne: {
      fr: "Crée un formulaire de contact avec 2 inputs, 1 textarea et 1 bouton.",
      en: "Create a contact form with 2 inputs, 1 textarea, and 1 button."
    },
    tests: [
      { type: "html-contains", selector: "form", message: { fr: "Ajoute une balise form.", en: "Add a form element." } },
      { type: "min-count", selector: "label", value: 3, message: { fr: "Ajoute trois labels.", en: "Add three labels." } },
      { type: "min-count", selector: "input", value: 2, message: { fr: "Ajoute deux inputs.", en: "Add two inputs." } },
      { type: "html-contains", selector: "textarea", message: { fr: "Ajoute une zone de texte.", en: "Add a textarea." } },
      { type: "html-contains", selector: 'button[type="submit"]', message: { fr: "Ajoute un bouton submit.", en: "Add a submit button." } }
    ],
    hint: {
      fr: ["Un label explicite vaut mieux qu’un placeholder seul.", "Relie chaque label avec for + id."],
      en: ["An explicit label is better than a placeholder alone.", "Connect each label with for + id."]
    },
    solution: `<form>
  <label for="name">Nom</label>
  <input id="name" name="name" type="text" />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" />

  <label for="message">Message</label>
  <textarea id="message" name="message"></textarea>

  <button type="submit">Envoyer</button>
</form>`,
    xp: 30,
    badge: "form-builder"
  },

  {
    id: "html-08-form-controls-validation",
    type: "code-challenge",
    title: {
      fr: "Contrôles de formulaire et validation HTML",
      en: "Form controls and HTML validation"
    },
    description: {
      fr: "Utiliser select, checkbox, radio, required et types d’input adaptés.",
      en: "Use select, checkbox, radio, required, and appropriate input types."
    },
    objectives: {
      fr: ["Choisir les bons types de champs", "Ajouter required", "Utiliser radio/checkbox/select"],
      en: ["Choose the right field types", "Add required", "Use radio/checkbox/select"]
    },
    exampleCode: `<label for="role">Rôle</label>
<select id="role" name="role">
  <option>Débutant</option>
  <option>Intermédiaire</option>
</select>`,
    starterCode: `<!-- Ajoute un select, une checkbox d'acceptation et deux radios -->`,
    exercise: { type: "code-challenge", ui: "editor + preview + form-inspector" },
    consigne: {
      fr: "Ajoute un champ email requis, un select de niveau, deux radios pour le format, et une case d’acceptation.",
      en: "Add a required email field, a level select, two format radios, and an agreement checkbox."
    },
    tests: [
      { type: "html-contains", selector: 'input[type="email"][required]', message: { fr: "Il faut un email requis.", en: "You need a required email field." } },
      { type: "html-contains", selector: "select", message: { fr: "Ajoute un select.", en: "Add a select." } },
      { type: "count", selector: 'input[type="radio"]', value: 2, message: { fr: "Ajoute deux radios.", en: "Add two radio buttons." } },
      { type: "html-contains", selector: 'input[type="checkbox"]', message: { fr: "Ajoute une checkbox.", en: "Add a checkbox." } }
    ],
    hint: {
      fr: ["Les radios partagent le même name.", "required se met directement sur le champ."],
      en: ["Radio buttons share the same name.", "required goes directly on the field."]
    },
    solution: `<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="level">Niveau</label>
  <select id="level" name="level">
    <option>Débutant</option>
    <option>Intermédiaire</option>
  </select>

  <p>Format préféré</p>
  <label><input type="radio" name="format" value="online" /> En ligne</label>
  <label><input type="radio" name="format" value="onsite" /> Présentiel</label>

  <label><input type="checkbox" name="agree" /> J’accepte les règles</label>
</form>`,
    xp: 30,
    badge: null
  },

  {
    id: "html-09-semantic-layout",
    type: "debug-challenge",
    title: {
      fr: "Mise en page sémantique",
      en: "Semantic layout"
    },
    description: {
      fr: "Remplacer une structure en div par header, nav, main, section, article, aside et footer.",
      en: "Replace a div-based structure with header, nav, main, section, article, aside, and footer."
    },
    objectives: {
      fr: ["Identifier les landmarks", "Structurer une page selon son sens", "Réduire la div soup"],
      en: ["Identify landmarks", "Structure a page by meaning", "Reduce div soup"]
    },
    exampleCode: `<header></header>
<nav></nav>
<main>
  <section></section>
  <aside></aside>
</main>
<footer></footer>`,
    starterCode: `<div class="top"></div>
<div class="menu"></div>
<div class="content">
  <div class="story"></div>
  <div class="side"></div>
</div>
<div class="bottom"></div>`,
    exercise: { type: "debug-challenge", ui: "editor + dom-map + semantic-hints" },
    consigne: {
      fr: "Réécris cette structure avec les bonnes balises sémantiques.",
      en: "Rewrite this structure using the correct semantic elements."
    },
    tests: [
      { type: "html-contains", selector: "header", message: { fr: "Ajoute header.", en: "Add header." } },
      { type: "html-contains", selector: "nav", message: { fr: "Ajoute nav.", en: "Add nav." } },
      { type: "html-contains", selector: "main", message: { fr: "Ajoute main.", en: "Add main." } },
      { type: "html-contains", selector: "aside", message: { fr: "Ajoute aside.", en: "Add aside." } },
      { type: "html-contains", selector: "footer", message: { fr: "Ajoute footer.", en: "Add footer." } }
    ],
    hint: {
      fr: ["Demande-toi : menu ? contenu principal ? contenu annexe ? pied de page ?"],
      en: ["Ask yourself: menu? main content? side content? page footer?"]
    },
    solution: `<header></header>
<nav></nav>
<main>
  <article></article>
  <aside></aside>
</main>
<footer></footer>`,
    xp: 30,
    badge: "semantic-shaper"
  },

  {
    id: "html-10-accessibility-basics",
    type: "debug-challenge",
    title: {
      fr: "Accessibilité HTML essentielle",
      en: "Essential HTML accessibility"
    },
    description: {
      fr: "Corriger les erreurs d’accessibilité les plus fréquentes dans une page simple.",
      en: "Fix the most common accessibility issues in a simple page."
    },
    objectives: {
      fr: ["Ajouter alt et labels", "Améliorer les textes de liens", "Préserver une structure navigable"],
      en: ["Add alt text and labels", "Improve link text", "Preserve navigable structure"]
    },
    exampleCode: `<label for="search">Rechercher</label>
<input id="search" name="search" type="search" />`,
    starterCode: `<a href="/contact">Clique ici</a>
<img src="team.jpg">
<input type="text" placeholder="Ton nom">`,
    exercise: { type: "debug-challenge", ui: "editor + a11y-checker" },
    consigne: {
      fr: "Corrige le lien vague, l’image sans alt et le champ sans label.",
      en: "Fix the vague link, the image without alt text, and the field without a label."
    },
    tests: [
      { type: "selector-text-not-match", selector: "a", pattern: /clique ici|click here/i, message: { fr: "Le lien doit être explicite.", en: "The link text must be explicit." } },
      { type: "html-contains", selector: "img[alt]", message: { fr: "L’image doit avoir un alt.", en: "The image must have alt text." } },
      { type: "html-contains", selector: "label[for]", message: { fr: "Le champ doit avoir un label explicite.", en: "The field needs an explicit label." } }
    ],
    hint: {
      fr: ["Décris la destination du lien.", "Un placeholder n’est pas un label."],
      en: ["Describe the link destination.", "A placeholder is not a label."]
    },
    solution: `<a href="/contact">Contacter l’équipe</a>
<img src="team.jpg" alt="L’équipe PulsaTeach en réunion" />
<label for="name">Ton nom</label>
<input id="name" name="name" type="text" />`,
    xp: 35,
    badge: "accessibility-ally"
  },

  {
    id: "html-11-seo-best-practices",
    type: "code-challenge",
    title: {
      fr: "SEO de base et bonnes pratiques HTML",
      en: "Basic SEO and HTML best practices"
    },
    description: {
      fr: "Ajouter title, meta description, hiérarchie de titres propre et structure maintenable.",
      en: "Add title, meta description, clean heading hierarchy, and maintainable structure."
    },
    objectives: {
      fr: ["Ajouter les bonnes métadonnées", "Éviter les structures brouillon", "Préparer une page lisible par humain et machine"],
      en: ["Add the right metadata", "Avoid messy structures", "Prepare a page readable by humans and machines"]
    },
    exampleCode: `<head>
  <meta charset="UTF-8" />
  <title>Atelier HTML pour débutants</title>
  <meta name="description" content="Un atelier simple pour apprendre les bases du HTML." />
</head>`,
    starterCode: `<head>
  <title>Page</title>
</head>
<body>
  <h1>Atelier</h1>
</body>`,
    exercise: { type: "code-challenge", ui: "editor + head-inspector" },
    consigne: {
      fr: "Améliore l’en-tête du document avec un vrai title et une meta description descriptive.",
      en: "Improve the document head with a real title and a descriptive meta description."
    },
    tests: [
      { type: "text-not-equals", selector: "title", value: "Page", message: { fr: "Le title doit être descriptif, pas générique.", en: "The title must be descriptive, not generic." } },
      { type: "html-contains", selector: 'meta[name="description"]', message: { fr: "Ajoute une meta description.", en: "Add a meta description." } },
      { type: "max-count", selector: "h1", value: 1, message: { fr: "Reste sur un seul h1.", en: "Keep a single h1." } }
    ],
    hint: {
      fr: ["Le title résume la page pour l’onglet et la recherche.", "La meta description doit décrire le contenu, pas spammer des mots-clés."],
      en: ["The title summarizes the page for the tab and search.", "The meta description should describe the content, not stuff keywords."]
    },
    solution: `<head>
  <meta charset="UTF-8" />
  <title>Atelier HTML débutant | PulsaTeach</title>
  <meta name="description" content="Découvrez les bases du HTML avec un atelier simple, progressif et pratique." />
</head>
<body>
  <h1>Atelier HTML</h1>
</body>`,
    xp: 30,
    badge: "seo-starter"
  },

  {
    id: "html-12-final-project",
    type: "project",
    title: {
      fr: "Projet final HTML",
      en: "Final HTML project"
    },
    description: {
      fr: "Construire une page événementielle HTML complète, sémantique, accessible et correctement balisée.",
      en: "Build a complete semantic, accessible, and well-marked up HTML event page."
    },
    objectives: {
      fr: [
        "Assembler structure, navigation, images, listes, tableau et formulaire",
        "Ajouter title et meta description",
        "Respecter une structure sémantique propre"
      ],
      en: [
        "Assemble structure, navigation, images, lists, table, and form",
        "Add title and meta description",
        "Respect a clean semantic structure"
      ]
    },
    exampleCode: `<!-- sections attendues -->
<header>...</header>
<nav>...</nav>
<main>
  <section id="hero">...</section>
  <section id="programme">...</section>
  <section id="speakers">...</section>
  <section id="register">...</section>
</main>
<footer>...</footer>`,
    starterCode: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <!-- Construis la page ici -->
  </body>
</html>`,
    exercise: { type: "project", ui: "brief + editor + preview + rubric + tests" },
    consigne: {
      fr: "Crée la page “PulsaConf 2026” avec header, nav, section héros, liste d’avantages, tableau de programme, galerie d’intervenants, formulaire d’inscription et footer.",
      en: "Create the “PulsaConf 2026” page with a header, nav, hero section, benefits list, schedule table, speaker gallery, registration form, and footer."
    },
    tests: [
      { type: "html-contains", selector: "header", message: { fr: "Il manque le header.", en: "The header is missing." } },
      { type: "html-contains", selector: "nav", message: { fr: "Il manque la navigation.", en: "The navigation is missing." } },
      { type: "min-count", selector: "section", value: 4, message: { fr: "Il faut au moins 4 sections.", en: "You need at least 4 sections." } },
      { type: "html-contains", selector: "table", message: { fr: "Ajoute un tableau de programme.", en: "Add a schedule table." } },
      { type: "html-contains", selector: "form", message: { fr: "Ajoute un formulaire d’inscription.", en: "Add a registration form." } },
      { type: "html-contains", selector: 'meta[name="description"]', message: { fr: "Ajoute la meta description.", en: "Add the meta description." } },
      { type: "html-contains", selector: "img[alt]", message: { fr: "Toutes les images utiles doivent avoir un alt.", en: "Meaningful images need alt text." } }
    ],
    hint: {
      fr: [
        "Commence par la structure globale avant le détail.",
        "Crée les ancres de navigation tôt.",
        "Vérifie les labels du formulaire en dernier."
      ],
      en: [
        "Start with the global structure before details.",
        "Create navigation anchors early.",
        "Check form labels last."
      ]
    },
    solution: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>PulsaConf 2026 | Conférence HTML débutant</title>
    <meta name="description" content="Une conférence débutant pour comprendre HTML, l’accessibilité et les bonnes pratiques du web." />
  </head>
  <body>
    <header>
      <h1>PulsaConf 2026</h1>
      <nav>
        <a href="#programme">Programme</a>
        <a href="#speakers">Intervenants</a>
        <a href="#register">Inscription</a>
      </nav>
    </header>

    <main>
      <section id="hero">
        <h2>Le HTML comme base solide</h2>
        <p>Une journée pour apprendre à structurer le web proprement.</p>
      </section>

      <section>
        <h2>Pourquoi venir</h2>
        <ul>
          <li>Comprendre la sémantique</li>
          <li>Améliorer l’accessibilité</li>
          <li>Préparer le CSS et le JS</li>
        </ul>
      </section>

      <section id="programme">
        <h2>Programme</h2>
        <table>
          <caption>Planning de la journée</caption>
          <tr>
            <th scope="col">Heure</th>
            <th scope="col">Sujet</th>
          </tr>
          <tr>
            <td>09:00</td>
            <td>Structure du document</td>
          </tr>
          <tr>
            <td>11:00</td>
            <td>Formulaires accessibles</td>
          </tr>
        </table>
      </section>

      <section id="speakers">
        <h2>Intervenants</h2>
        <figure>
          <img src="speaker.jpg" alt="Portrait de l’intervenante principale" />
          <figcaption>Lead trainer PulsaTeach</figcaption>
        </figure>
      </section>

      <section id="register">
        <h2>Inscription</h2>
        <form>
          <label for="name">Nom</label>
          <input id="name" name="name" type="text" />
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <button type="submit">Réserver ma place</button>
        </form>
      </section>
    </main>

    <footer>
      <p>© PulsaTeach 2026</p>
    </footer>
  </body>
</html>`,
    xp: 100,
    badge: "html-pathfinder"
  }
]
```

## Parcours CSS et JavaScript

Le parcours CSS doit couvrir les fondamentaux du style, du box model, du layout moderne, du responsive, de l’animation légère, des variables et des bonnes pratiques d’accessibilité visuelle. Pour cette dernière partie, PulsaTeach doit enseigner tôt le contraste texte/fond, le focus visible et le fait de ne pas faire reposer l’information uniquement sur la couleur, en phase avec les recommandations du entity["organization","W3C","web standards body"] et de MDN. Le parcours JavaScript doit suivre la colonne vertébrale des modules MDN : langage de base, DOM, événements, formulaires, promesses, `fetch`, `async/await`, modules, stockage local, classes simples et débogage. citeturn6search0turn10search3turn10search2turn8search1turn8search0turn10search0turn10search1turn8search10turn8search11turn12search0turn12search1turn12search3turn12search11turn6search1turn11search2turn11search16turn7search4turn11search0turn7search1turn6search7turn7search3

```js
const cssTrackDetailed = {
  id: "track-css",
  finalProject: {
    fr: "Landing page responsive et accessible",
    en: "Accessible responsive landing page"
  },
  modules: [
    {
      id: "css-01-cascade-selectors",
      title: { fr: "Cascade et sélecteurs", en: "Cascade and selectors" },
      prerequisites: ["track-html >= 70%"],
      durationMin: 240,
      level: "beginner",
      unlocks: ["write css rules", "target elements precisely", "understand cascade"],
      exerciseTypes: ["lesson", "quiz", "mini-game", "visual-match"],
      lessons: [
        { id: "css-01-01", title: { fr: "Relier HTML et CSS", en: "Connecting HTML and CSS" }, focus: { fr: "style interne, externe, ordre", en: "internal, external styles, order" } },
        { id: "css-01-02", title: { fr: "Sélecteurs simples", en: "Simple selectors" }, focus: { fr: "balise, classe, id", en: "tag, class, id" } },
        { id: "css-01-03", title: { fr: "Combinators", en: "Combinators" }, focus: { fr: "descendant, child, adjacent, sibling", en: "descendant, child, adjacent, sibling" } },
        { id: "css-01-04", title: { fr: "Spécificité et héritage", en: "Specificity and inheritance" }, focus: { fr: "résoudre les conflits", en: "resolve conflicts" } }
      ],
      miniProject: {
        fr: "Carte article stylée avec états hover",
        en: "Styled article card with hover states"
      }
    },

    {
      id: "css-02-visual-style",
      title: { fr: "Couleurs, unités et typographie", en: "Colors, units, and typography" },
      prerequisites: ["css-01-cascade-selectors"],
      durationMin: 300,
      level: "beginner",
      unlocks: ["set type hierarchy", "choose units intentionally", "style backgrounds and borders"],
      exerciseTypes: ["lesson", "code-challenge", "visual-match"],
      lessons: [
        { id: "css-02-01", title: { fr: "Couleurs et opacité", en: "Colors and opacity" }, focus: { fr: "named, hex, rgb, hsl", en: "named, hex, rgb, hsl" } },
        { id: "css-02-02", title: { fr: "Unités utiles", en: "Useful units" }, focus: { fr: "px, %, em, rem, vw, vh", en: "px, %, em, rem, vw, vh" } },
        { id: "css-02-03", title: { fr: "Typographie lisible", en: "Readable typography" }, focus: { fr: "font-size, line-height, spacing", en: "font-size, line-height, spacing" } },
        { id: "css-02-04", title: { fr: "Backgrounds, borders, shadows", en: "Backgrounds, borders, shadows" }, focus: { fr: "fonds, coins, ombres, contrastes", en: "backgrounds, corners, shadows, contrast" } }
      ],
      miniProject: {
        fr: "Fiche produit premium",
        en: "Premium product card"
      }
    },

    {
      id: "css-03-box-flow-position",
      title: { fr: "Box model, display et position", en: "Box model, display, and position" },
      prerequisites: ["css-02-visual-style"],
      durationMin: 360,
      level: "advanced-beginner",
      unlocks: ["reason about spacing", "control layout flow", "place elements intentionally"],
      exerciseTypes: ["lesson", "code-challenge", "debug-challenge", "visual-match"],
      lessons: [
        { id: "css-03-01", title: { fr: "Le box model", en: "The box model" }, focus: { fr: "content, padding, border, margin", en: "content, padding, border, margin" } },
        { id: "css-03-02", title: { fr: "Display et flux normal", en: "Display and normal flow" }, focus: { fr: "block, inline, inline-block, none", en: "block, inline, inline-block, none" } },
        { id: "css-03-03", title: { fr: "Tailles et overflow", en: "Sizing and overflow" }, focus: { fr: "width, max-width, height, overflow", en: "width, max-width, height, overflow" } },
        { id: "css-03-04", title: { fr: "Position et empilement", en: "Positioning and stacking" }, focus: { fr: "relative, absolute, fixed, sticky, z-index", en: "relative, absolute, fixed, sticky, z-index" } }
      ],
      miniProject: {
        fr: "Hero section avec badge flottant",
        en: "Hero section with a floating badge"
      }
    },

    {
      id: "css-04-flexbox",
      title: { fr: "Maîtriser Flexbox", en: "Mastering Flexbox" },
      prerequisites: ["css-03-box-flow-position"],
      durationMin: 420,
      level: "advanced-beginner",
      unlocks: ["align items on one axis", "build navs and card rows", "manage wrapping and growth"],
      exerciseTypes: ["mini-game", "code-challenge", "visual-match"],
      lessons: [
        { id: "css-04-01", title: { fr: "Axes et conteneur flex", en: "Axes and the flex container" }, focus: { fr: "row, column, main/cross axis", en: "row, column, main/cross axis" } },
        { id: "css-04-02", title: { fr: "Aligner et répartir", en: "Aligning and distributing" }, focus: { fr: "justify-content, align-items, gap", en: "justify-content, align-items, gap" } },
        { id: "css-04-03", title: { fr: "Wrap, grow, shrink, order", en: "Wrap, grow, shrink, order" }, focus: { fr: "comportement des items", en: "item behavior" } }
      ],
      miniProject: {
        fr: "Barre de navigation responsive",
        en: "Responsive navigation bar"
      }
    },

    {
      id: "css-05-grid",
      title: { fr: "Construire avec Grid", en: "Building with Grid" },
      prerequisites: ["css-04-flexbox"],
      durationMin: 420,
      level: "advanced-beginner",
      unlocks: ["create two-dimensional layouts", "place items precisely", "build modern card grids"],
      exerciseTypes: ["mini-game", "code-challenge", "visual-match"],
      lessons: [
        { id: "css-05-01", title: { fr: "Tracks, gaps et fr", en: "Tracks, gaps, and fr" }, focus: { fr: "columns, rows, gap, repeat", en: "columns, rows, gap, repeat" } },
        { id: "css-05-02", title: { fr: "Placement des items", en: "Item placement" }, focus: { fr: "grid-column, grid-row, areas", en: "grid-column, grid-row, areas" } },
        { id: "css-05-03", title: { fr: "Grid fluide moderne", en: "Modern fluid grid" }, focus: { fr: "minmax, auto-fit, auto-fill", en: "minmax, auto-fit, auto-fill" } }
      ],
      miniProject: {
        fr: "Galerie responsive type magazine",
        en: "Magazine-style responsive gallery"
      }
    },

    {
      id: "css-06-responsive-design",
      title: { fr: "Responsive design", en: "Responsive design" },
      prerequisites: ["css-05-grid"],
      durationMin: 300,
      level: "advanced-beginner",
      unlocks: ["adapt layouts to viewports", "write resilient components", "avoid desktop-only thinking"],
      exerciseTypes: ["mini-game", "debug-challenge", "visual-match"],
      lessons: [
        { id: "css-06-01", title: { fr: "Media queries", en: "Media queries" }, focus: { fr: "breakpoints utiles", en: "useful breakpoints" } },
        { id: "css-06-02", title: { fr: "Tailles fluides", en: "Fluid sizing" }, focus: { fr: "rem, %, max-width, clamp", en: "rem, %, max-width, clamp" } },
        { id: "css-06-03", title: { fr: "Patterns responsive", en: "Responsive patterns" }, focus: { fr: "cards, navs, galleries, columns", en: "cards, navs, galleries, columns" } }
      ],
      miniProject: {
        fr: "Landing mobile-first",
        en: "Mobile-first landing page"
      }
    },

    {
      id: "css-07-motion-system-accessibility",
      title: { fr: "Motion, architecture et accessibilité visuelle", en: "Motion, architecture, and visual accessibility" },
      prerequisites: ["css-06-responsive-design"],
      durationMin: 420,
      level: "pre-junior",
      unlocks: ["animate lightly", "reuse design tokens", "organize component CSS", "preserve readability and focus"],
      exerciseTypes: ["code-challenge", "debug-challenge", "visual-match", "quiz"],
      lessons: [
        { id: "css-07-01", title: { fr: "Pseudo-classes et pseudo-éléments", en: "Pseudo-classes and pseudo-elements" }, focus: { fr: ":hover, :focus-visible, ::before, ::after", en: ":hover, :focus-visible, ::before, ::after" } },
        { id: "css-07-02", title: { fr: "Variables CSS", en: "CSS variables" }, focus: { fr: "tokens, thèmes, réutilisation", en: "tokens, themes, reuse" } },
        { id: "css-07-03", title: { fr: "Transitions", en: "Transitions" }, focus: { fr: "micro-interactions simples", en: "simple micro-interactions" } },
        { id: "css-07-04", title: { fr: "Animations", en: "Animations" }, focus: { fr: "keyframes et modération", en: "keyframes and restraint" } },
        { id: "css-07-05", title: { fr: "Architecture CSS légère", en: "Lightweight CSS architecture" }, focus: { fr: "BEM simple, utilities, composants", en: "simple BEM, utilities, components" } }
      ],
      miniProject: {
        fr: "Design system mini landing",
        en: "Mini design-system landing page"
      }
    },

    {
      id: "css-08-final-project",
      title: { fr: "Projet final CSS", en: "Final CSS project" },
      prerequisites: ["css-07-motion-system-accessibility"],
      durationMin: 540,
      level: "pre-junior",
      unlocks: ["ship a polished responsive page"],
      exerciseTypes: ["project", "final-assessment"],
      lessons: [
        { id: "css-08-01", title: { fr: "Refonte complète d’une landing page", en: "Full landing page redesign" }, focus: { fr: "responsive, layout, motion, accessibility", en: "responsive, layout, motion, accessibility" } }
      ],
      miniProject: {
        fr: "Landing page complète prête portfolio",
        en: "Portfolio-ready landing page"
      }
    }
  ]
}
```

Les idées de mini-jeux CSS à intégrer doivent reprendre la précision mono-compétence de Flexbox Froggy, Grid Garden et CSS Diner, la cadence de micro-défis de Codepip, la mise en scène/narration de Coding Fantasy, et la reproduction visuelle scorée de CSSBattle — sans copier leurs niveaux ni leurs fictions. citeturn23view0turn13view1turn24view0turn14view1turn14view4turn14view5turn14view7

Les mini-jeux originaux recommandés pour PulsaTeach sont :

- **Selector Radar** — l’apprenant doit cibler des composants “infectés” dans un panneau de cartes avec des sélecteurs de plus en plus précis. L’UI montre la structure DOM en surbrillance. Objectif : sélecteurs, combinators, pseudo-classes.
- **Flex Dock** — des drones doivent rejoindre leurs quais avec `justify-content`, `align-items`, `flex-direction`, `flex-wrap`, `order` et `flex-grow`. Objectif : alignement et répartition.
- **Grid District** — l’apprenant alimente un quartier en plaçant des blocs dans une trame avec `grid-template-columns`, `grid-area`, `repeat`, `minmax`, `auto-fit`. Objectif : Grid.
- **Pixel Echo** — reproduction d’un composant à partir d’une capture cible. Score basé d’abord sur la ressemblance visuelle, puis sur la propreté du code. Le bonus “compactness” n’apparaît qu’en mode avancé.
- **Breakpoint Rescue** — le viewport change brutalement mobile/tablette/desktop; l’utilisateur doit rendre la mise en page lisible et stable. Objectif : responsive design et robustesse.
- **State Painter** — un mini-lab centré sur `:hover`, `:focus-visible`, `:disabled`, `::before`, `::after`. Objectif : états UI et accessibilité.

```js
const javascriptTrackDetailed = {
  id: "track-javascript",
  finalProject: {
    fr: "Application JavaScript complète",
    en: "Complete JavaScript application"
  },
  modules: [
    {
      id: "js-01-language-basics",
      title: { fr: "Variables, types et expressions", en: "Variables, types, and expressions" },
      prerequisites: ["track-html >= 70%", "track-css >= 40%"],
      durationMin: 300,
      level: "beginner",
      unlocks: ["store values", "read JS syntax", "reason about primitives"],
      exerciseTypes: ["lesson", "quiz", "code-challenge"],
      lessons: [
        { id: "js-01-01", title: { fr: "Script, console et variables", en: "Scripts, console, and variables" }, focus: { fr: "let, const, console", en: "let, const, console" } },
        { id: "js-01-02", title: { fr: "Types primitifs", en: "Primitive types" }, focus: { fr: "string, number, boolean, null, undefined", en: "string, number, boolean, null, undefined" } },
        { id: "js-01-03", title: { fr: "Opérateurs et expressions", en: "Operators and expressions" }, focus: { fr: "arithmétique, comparaison, logique", en: "arithmetic, comparison, logic" } }
      ],
      miniProject: {
        fr: "Calculateur de prix simple",
        en: "Simple price calculator"
      }
    },

    {
      id: "js-02-control-flow",
      title: { fr: "Conditions et boucles", en: "Conditions and loops" },
      prerequisites: ["js-01-language-basics"],
      durationMin: 360,
      level: "beginner",
      unlocks: ["branch logic", "repeat operations", "solve tiny algorithms"],
      exerciseTypes: ["quiz", "code-challenge", "debug-challenge"],
      lessons: [
        { id: "js-02-01", title: { fr: "if / else", en: "if / else" }, focus: { fr: "contrôle conditionnel", en: "conditional control flow" } },
        { id: "js-02-02", title: { fr: "Boucles utiles", en: "Useful loops" }, focus: { fr: "for, while, patterns", en: "for, while, patterns" } },
        { id: "js-02-03", title: { fr: "Mini-algorithmes", en: "Mini algorithms" }, focus: { fr: "compter, filtrer, sommer", en: "count, filter, sum" } }
      ],
      miniProject: {
        fr: "Vérificateur de score et de niveau",
        en: "Score and level checker"
      }
    },

    {
      id: "js-03-functions",
      title: { fr: "Fonctions et scope", en: "Functions and scope" },
      prerequisites: ["js-02-control-flow"],
      durationMin: 360,
      level: "advanced-beginner",
      unlocks: ["write reusable logic", "pass parameters", "return values safely"],
      exerciseTypes: ["code-challenge", "quiz", "debug-challenge"],
      lessons: [
        { id: "js-03-01", title: { fr: "Déclarer des fonctions", en: "Declaring functions" }, focus: { fr: "function, arrow, appels", en: "function, arrow, calls" } },
        { id: "js-03-02", title: { fr: "Paramètres et return", en: "Parameters and return" }, focus: { fr: "entrées/sorties de fonction", en: "function inputs/outputs" } },
        { id: "js-03-03", title: { fr: "Scope local et global", en: "Local and global scope" }, focus: { fr: "éviter les effets de bord", en: "avoid side effects" } }
      ],
      miniProject: {
        fr: "Bibliothèque de fonctions utilitaires",
        en: "Utility function mini-library"
      }
    },

    {
      id: "js-04-arrays-objects",
      title: { fr: "Tableaux et objets", en: "Arrays and objects" },
      prerequisites: ["js-03-functions"],
      durationMin: 480,
      level: "advanced-beginner",
      unlocks: ["manage collections", "shape data", "use common array methods"],
      exerciseTypes: ["code-challenge", "mini-game", "quiz"],
      lessons: [
        { id: "js-04-01", title: { fr: "Bases des tableaux", en: "Array basics" }, focus: { fr: "index, length, push, pop", en: "index, length, push, pop" } },
        { id: "js-04-02", title: { fr: "Méthodes utiles", en: "Useful methods" }, focus: { fr: "map, filter, find, includes, reduce", en: "map, filter, find, includes, reduce" } },
        { id: "js-04-03", title: { fr: "Objets du quotidien", en: "Everyday objects" }, focus: { fr: "clé/valeur, accès, mise à jour", en: "key/value, access, update" } }
      ],
      miniProject: {
        fr: "Catalogue filtrable",
        en: "Filterable catalog"
      }
    },

    {
      id: "js-05-dom",
      title: { fr: "Manipuler le DOM", en: "Manipulating the DOM" },
      prerequisites: ["js-04-arrays-objects"],
      durationMin: 480,
      level: "advanced-beginner",
      unlocks: ["select nodes", "change text/classes/attributes", "render lists"],
      exerciseTypes: ["dom-challenge", "debug-challenge", "code-challenge"],
      lessons: [
        { id: "js-05-01", title: { fr: "Sélectionner des éléments", en: "Selecting elements" }, focus: { fr: "querySelector, querySelectorAll", en: "querySelector, querySelectorAll" } },
        { id: "js-05-02", title: { fr: "Modifier le contenu", en: "Changing content" }, focus: { fr: "textContent, classList, attributes", en: "textContent, classList, attributes" } },
        { id: "js-05-03", title: { fr: "Créer et afficher des éléments", en: "Creating and rendering elements" }, focus: { fr: "createElement, append, render loops", en: "createElement, append, render loops" } }
      ],
      miniProject: {
        fr: "Liste dynamique de cartes",
        en: "Dynamic card list"
      }
    },

    {
      id: "js-06-events-forms-state",
      title: { fr: "Événements, formulaires et état", en: "Events, forms, and state" },
      prerequisites: ["js-05-dom"],
      durationMin: 480,
      level: "pre-junior",
      unlocks: ["react to user input", "validate forms", "update UI from state"],
      exerciseTypes: ["dom-challenge", "mini-game", "debug-challenge", "project"],
      lessons: [
        { id: "js-06-01", title: { fr: "Écouter les événements", en: "Listening to events" }, focus: { fr: "click, input, submit, change", en: "click, input, submit, change" } },
        { id: "js-06-02", title: { fr: "Formulaires interactifs", en: "Interactive forms" }, focus: { fr: "preventDefault, lecture des champs, messages", en: "preventDefault, reading fields, messages" } },
        { id: "js-06-03", title: { fr: "État applicatif simple", en: "Simple application state" }, focus: { fr: "state object + render", en: "state object + render" } }
      ],
      miniProject: {
        fr: "Formulaire avec messages et état",
        en: "Form with messages and state"
      }
    },

    {
      id: "js-07-fetch-async",
      title: { fr: "API, fetch et asynchrone", en: "APIs, fetch, and async JavaScript" },
      prerequisites: ["js-06-events-forms-state"],
      durationMin: 540,
      level: "pre-junior",
      unlocks: ["request remote data", "handle loading and errors", "write async/await"],
      exerciseTypes: ["code-challenge", "debug-challenge", "project"],
      lessons: [
        { id: "js-07-01", title: { fr: "Comprendre fetch", en: "Understanding fetch" }, focus: { fr: "requête, réponse, json()", en: "request, response, json()" } },
        { id: "js-07-02", title: { fr: "Promesses puis async/await", en: "Promises then async/await" }, focus: { fr: "états asynchrones", en: "asynchronous states" } },
        { id: "js-07-03", title: { fr: "UI robuste face aux erreurs", en: "Error-robust UI" }, focus: { fr: "loading, empty, error, retry", en: "loading, empty, error, retry" } }
      ],
      miniProject: {
        fr: "Recherche de données distante",
        en: "Remote data search app"
      }
    },

    {
      id: "js-08-storage-modules-architecture",
      title: { fr: "Stockage, modules et architecture", en: "Storage, modules, and architecture" },
      prerequisites: ["js-07-fetch-async"],
      durationMin: 420,
      level: "pre-junior",
      unlocks: ["persist data", "split code into files", "separate logic from rendering"],
      exerciseTypes: ["code-challenge", "project", "debug-challenge"],
      lessons: [
        { id: "js-08-01", title: { fr: "localStorage", en: "localStorage" }, focus: { fr: "save/load state", en: "save/load state" } },
        { id: "js-08-02", title: { fr: "Modules ES", en: "ES modules" }, focus: { fr: "export/import", en: "export/import" } },
        { id: "js-08-03", title: { fr: "Architecture simple", en: "Simple architecture" }, focus: { fr: "state, services, ui layers", en: "state, services, ui layers" } }
      ],
      miniProject: {
        fr: "Todo persistante modulaire",
        en: "Modular persistent todo app"
      }
    },

    {
      id: "js-09-debugging-oop",
      title: { fr: "Erreurs, débogage et POO simple", en: "Errors, debugging, and simple OOP" },
      prerequisites: ["js-08-storage-modules-architecture"],
      durationMin: 360,
      level: "pre-junior",
      unlocks: ["debug confidently", "handle errors", "model simple entities with classes"],
      exerciseTypes: ["debug-challenge", "quiz", "code-challenge"],
      lessons: [
        { id: "js-09-01", title: { fr: "Déboguer le JS", en: "Debugging JavaScript" }, focus: { fr: "console, breakpoints, lecture d’erreurs", en: "console, breakpoints, reading errors" } },
        { id: "js-09-02", title: { fr: "try/catch et erreurs utiles", en: "try/catch and useful errors" }, focus: { fr: "défensif, messages, fallbacks", en: "defensive code, messages, fallbacks" } },
        { id: "js-09-03", title: { fr: "Classes simples", en: "Simple classes" }, focus: { fr: "constructeur, méthodes, objets métier", en: "constructor, methods, domain objects" } }
      ],
      miniProject: {
        fr: "Gestionnaire d’objets simple",
        en: "Simple object manager"
      }
    },

    {
      id: "js-10-final-project",
      title: { fr: "Projet final JavaScript", en: "Final JavaScript project" },
      prerequisites: ["js-09-debugging-oop"],
      durationMin: 720,
      level: "pre-junior",
      unlocks: ["ship an interactive frontend app"],
      exerciseTypes: ["guided-project", "project", "final-assessment"],
      lessons: [
        { id: "js-10-01", title: { fr: "Projet guidé intermédiaire", en: "Intermediate guided project" }, focus: { fr: "assembler DOM, events, state", en: "assemble DOM, events, state" } },
        { id: "js-10-02", title: { fr: "Challenge debug intégral", en: "Full debug challenge" }, focus: { fr: "réparer une app cassée", en: "repair a broken app" } },
        { id: "js-10-03", title: { fr: "Application finale", en: "Final application" }, focus: { fr: "state + storage + API + UX", en: "state + storage + API + UX" } }
      ],
      miniProject: {
        fr: "Dashboard de tâches ou météo interactive",
        en: "Interactive task or weather dashboard"
      }
    }
  ]
}
```

Les exercices interactifs JavaScript doivent être plus variés que le CSS, parce que le domaine est plus large : logique pure, manipulation du DOM, état, I/O, erreurs, rendu. La meilleure combinaison pédagogique est un mix de fonctions à compléter, manipulation DOM, quiz de prédiction, mini-jeux de logique, debugging contextualisé, défis progressifs et projets guidés. Les plateformes qui performent ici le mieux combinent pratique courte, rang/progression et scénarisation légère. citeturn14view2turn13view7turn15view0

Les formats JS recommandés sont :

- **Function Forge** — compléter une fonction à trous, avec tests visibles et exemples d’entrée/sortie.
- **Trace It** — quiz de prédiction : “que retourne ce code ?”, “quelle valeur prend `x` ?”.
- **DOM Repair Lab** — une UI presque fonctionnelle existe déjà, il faut réparer sélecteurs, événements ou rendu.
- **Event Arena** — un mini-jeu réagit aux clics, aux touches, ou à des timers; l’objectif est de relier événements et état.
- **Async Courier** — l’apprenant interroge une API fictive et doit afficher `loading/success/error/empty`.
- **Bug Hunter** — défis de débogage graduels, avec console, test cassé et logs incohérents.
- **Guided Build** — projet guidé en 8 à 12 étapes avec validations intermédiaires.
- **Open Build** — brief seul, critères de réussite + tests, mais plusieurs implémentations acceptées.

## Projets et progression

La couche projet doit être conçue comme le trait d’union entre apprentissage et portfolio. Les briefs doivent ressembler à de vrais besoins produits, accepter plusieurs bonnes solutions et pousser à publier un résultat propre. La couche gamifiée doit reprendre l’intérêt des checkpoints, achievements, ranks et honor, mais rester pilotée par la progression de compétences. citeturn14view6turn14view0turn13view7turn2search3

```js
const transversalProjects = [
  {
    id: "project-profile-page",
    level: "starter",
    skills: ["semantic-html", "headings", "links", "images", "lists"],
    brief: {
      fr: "Crée ta page profil avec photo, bio, compétences, objectifs et liens utiles.",
      en: "Create your profile page with photo, bio, skills, goals, and useful links."
    },
    successCriteria: [
      "one-h1",
      "semantic-sections",
      "working-links",
      "image-with-alt",
      "at-least-one-list"
    ],
    bonus: {
      fr: ["Navigation interne par ancres", "Section contact"],
      en: ["Internal anchor navigation", "Contact section"]
    },
    autoTests: ["html-contains", "count", "html-attribute", "selector-text-not-match"]
  },

  {
    id: "project-product-card",
    level: "starter",
    skills: ["typography", "colors", "spacing", "box-model", "button-states"],
    brief: {
      fr: "Crée une carte produit claire, lisible et visuellement cohérente.",
      en: "Build a clear, readable, visually consistent product card."
    },
    successCriteria: [
      "card-has-title-price-description-cta",
      "consistent-spacing",
      "readable-contrast",
      "hover-state-on-button"
    ],
    bonus: {
      fr: ["Badge promo", "État rupture de stock"],
      en: ["Promo badge", "Out-of-stock state"]
    },
    autoTests: ["css-computed-style", "text-content", "selector-exists"]
  },

  {
    id: "project-simple-landing",
    level: "beginner",
    skills: ["semantic-layout", "hero-section", "cta", "responsive-basics"],
    brief: {
      fr: "Construit une landing page simple pour présenter un service fictif.",
      en: "Build a simple landing page for a fictional service."
    },
    successCriteria: [
      "semantic-header-main-footer",
      "hero-with-primary-cta",
      "at-least-three-sections",
      "mobile-readable"
    ],
    bonus: {
      fr: ["Témoignages", "Bloc FAQ"],
      en: ["Testimonials", "FAQ block"]
    },
    autoTests: ["html-contains", "min-count", "viewport-style-check"]
  },

  {
    id: "project-responsive-gallery",
    level: "beginner",
    skills: ["grid", "images", "captions", "responsive-layout"],
    brief: {
      fr: "Crée une galerie responsive qui reste propre sur mobile et desktop.",
      en: "Create a responsive gallery that stays clean on mobile and desktop."
    },
    successCriteria: [
      "grid-or-flex-layout",
      "multiple-images-with-alt",
      "no-horizontal-overflow",
      "readable-captions"
    ],
    bonus: {
      fr: ["Filtre catégorie visuel", "Carte featured plus large"],
      en: ["Visual category filter", "Larger featured card"]
    },
    autoTests: ["css-layout-check", "html-contains", "responsive-snapshot"]
  },

  {
    id: "project-mini-portfolio",
    level: "advanced-beginner",
    skills: ["multi-section-layout", "navigation", "design-consistency", "responsive"],
    brief: {
      fr: "Crée un mini portfolio avec présentation, projets, compétences et contact.",
      en: "Create a mini portfolio with intro, projects, skills, and contact."
    },
    successCriteria: [
      "project-list",
      "clear-navigation",
      "consistent-type-scale",
      "responsive-sections"
    ],
    bonus: {
      fr: ["Thème clair/sombre", "Section témoignages"],
      en: ["Light/dark theme", "Testimonials section"]
    },
    autoTests: ["html-contains", "css-computed-style", "viewport-style-check"]
  },

  {
    id: "project-interactive-form",
    level: "advanced-beginner",
    skills: ["forms", "labels", "validation", "error-messages", "dom-events"],
    brief: {
      fr: "Crée un formulaire interactif avec validation et messages utilisateur.",
      en: "Create an interactive form with validation and user-facing messages."
    },
    successCriteria: [
      "labels-on-all-fields",
      "client-side-validation",
      "error-and-success-states",
      "submit-prevented-on-invalid"
    ],
    bonus: {
      fr: ["Compteur de caractères", "Validation au fil de l’eau"],
      en: ["Character counter", "Live validation"]
    },
    autoTests: ["form-submit", "dom-text", "dom-class", "accessibility-assertion"]
  },

  {
    id: "project-todo-list",
    level: "intermediate",
    skills: ["dom-rendering", "events", "array-methods", "localStorage", "state"],
    brief: {
      fr: "Crée une todo list avec ajout, suppression, complétion et persistance.",
      en: "Create a todo list with add, delete, complete, and persistence."
    },
    successCriteria: [
      "add-task",
      "toggle-task",
      "delete-task",
      "save-to-localStorage",
      "re-render-on-load"
    ],
    bonus: {
      fr: ["Filtres actif/terminé", "Édition d’une tâche"],
      en: ["Active/completed filters", "Task editing"]
    },
    autoTests: ["dom-event", "storage-key", "state-assertion"]
  },

  {
    id: "project-calculator",
    level: "intermediate",
    skills: ["functions", "events", "state-machine-simple", "debugging"],
    brief: {
      fr: "Développe une calculatrice fiable avec opérations de base et affichage propre.",
      en: "Develop a reliable calculator with basic operations and clean display."
    },
    successCriteria: [
      "digit-input",
      "basic-operations",
      "clear-button",
      "predictable-display"
    ],
    bonus: {
      fr: ["Support clavier", "Historique"],
      en: ["Keyboard support", "History"]
    },
    autoTests: ["dom-event", "js-function-result", "text-content"]
  },

  {
    id: "project-quiz-app",
    level: "intermediate",
    skills: ["objects", "arrays", "state", "dom-rendering", "score-management"],
    brief: {
      fr: "Crée une quiz app avec questions multiples, score et écran final.",
      en: "Create a quiz app with multiple questions, score tracking, and a final screen."
    },
    successCriteria: [
      "question-render",
      "answer-selection",
      "score-update",
      "results-screen"
    ],
    bonus: {
      fr: ["Timer par question", "Mélange des réponses"],
      en: ["Per-question timer", "Answer shuffling"]
    },
    autoTests: ["dom-text", "state-assertion", "count"]
  },

  {
    id: "project-weather-app",
    level: "intermediate",
    skills: ["fetch", "async-await", "error-handling", "loading-state", "responsive-ui"],
    brief: {
      fr: "Crée une météo app capable de chercher une ville et d’afficher un état loading/error/success.",
      en: "Create a weather app that can search a city and display loading/error/success states."
    },
    successCriteria: [
      "api-request",
      "renders-response-data",
      "loading-state-shown",
      "error-state-shown"
    ],
    bonus: {
      fr: ["Prévisions sur plusieurs jours", "Dernières recherches sauvegardées"],
      en: ["Multi-day forecast", "Saved recent searches"]
    },
    autoTests: ["fetch-mock", "dom-text", "dom-class", "storage-key"]
  },

  {
    id: "project-mini-js-game",
    level: "pre-junior",
    skills: ["events", "timers", "state", "render-loop-simple", "difficulty-scaling"],
    brief: {
      fr: "Crée un mini jeu JS au choix : réflexe, mémoire, cible ou esquive.",
      en: "Create a small JS game of your choice: reflex, memory, target, or dodge."
    },
    successCriteria: [
      "playable-loop",
      "score-system",
      "restart-flow",
      "game-over-state"
    ],
    bonus: {
      fr: ["Niveaux de difficulté", "Meilleur score sauvegardé"],
      en: ["Difficulty levels", "Saved high score"]
    },
    autoTests: ["dom-event", "timer-check", "storage-key", "state-assertion"]
  },

  {
    id: "project-progress-dashboard",
    level: "pre-junior",
    skills: ["data-modeling", "charts-light", "filters", "localStorage", "app-architecture"],
    brief: {
      fr: "Crée un dashboard de progression affichant modules, XP, badges et streak.",
      en: "Create a progress dashboard showing modules, XP, badges, and streak."
    },
    successCriteria: [
      "list-of-modules",
      "xp-display",
      "progress-rates",
      "persistence",
      "filter-or-sort"
    ],
    bonus: {
      fr: ["Vue semaine/mois", "Objectifs personnalisés"],
      en: ["Week/month view", "Custom goals"]
    },
    autoTests: ["storage-key", "dom-text", "count", "state-assertion"]
  }
]
```

Le système de progression doit soutenir la persistance et guider l’effort. L’idée n’est pas de “gamifier pour gamifier”, mais de rendre visibles les acquis intermédiaires, d’encourager la répétition et de transformer le feedback correctif en momentum positif. citeturn5search6turn5search8turn5search9

```js
const progressionSystem = {
  xpByType: {
    lesson: 10,
    quiz: 15,
    codeChallenge: 25,
    visualMatch: 30,
    domChallenge: 35,
    debugChallenge: 35,
    miniGame: 40,
    project: 80,
    finalAssessment: 120
  },

  xpModifiers: {
    perfectFirstTry: 1.15,
    noHintUsed: 1.1,
    secondAttempt: 0.95,
    guidedCorrectionUsed: 0.85,
    solutionViewedBeforePass: 0.65
  },

  levels: [
    { level: 1, minXp: 0, name: { fr: "Starter", en: "Starter" } },
    { level: 2, minXp: 80, name: { fr: "Apprenti", en: "Apprentice" } },
    { level: 3, minXp: 180, name: { fr: "Bâtisseur", en: "Builder" } },
    { level: 4, minXp: 320, name: { fr: "Explorateur", en: "Explorer" } },
    { level: 5, minXp: 500, name: { fr: "Créateur", en: "Creator" } },
    { level: 6, minXp: 720, name: { fr: "Praticien", en: "Practitioner" } },
    { level: 7, minXp: 980, name: { fr: "Artisan", en: "Craftsperson" } },
    { level: 8, minXp: 1280, name: { fr: "Monteur", en: "Assembler" } },
    { level: 9, minXp: 1620, name: { fr: "Constructeur UI", en: "UI Builder" } },
    { level: 10, minXp: 2000, name: { fr: "Pré-junior", en: "Pre-junior" } }
  ],

  badges: [
    { id: "first-structure", title: { fr: "Premier squelette", en: "First skeleton" } },
    { id: "alt-guardian", title: { fr: "Gardien du alt", en: "Alt guardian" } },
    { id: "form-builder", title: { fr: "Bâtisseur de formulaires", en: "Form builder" } },
    { id: "semantic-shaper", title: { fr: "Architecte sémantique", en: "Semantic architect" } },
    { id: "accessibility-ally", title: { fr: "Allié accessibilité", en: "Accessibility ally" } },
    { id: "seo-starter", title: { fr: "Base SEO", en: "SEO starter" } },
    { id: "flex-captain", title: { fr: "Capitaine Flex", en: "Flex captain" } },
    { id: "grid-architect", title: { fr: "Architecte Grid", en: "Grid architect" } },
    { id: "responsive-keeper", title: { fr: "Gardien responsive", en: "Responsive keeper" } },
    { id: "dom-shifter", title: { fr: "Dompteur du DOM", en: "DOM shifter" } },
    { id: "async-courier", title: { fr: "Messager asynchrone", en: "Async courier" } },
    { id: "bug-hunter", title: { fr: "Chasseur de bugs", en: "Bug hunter" } },
    { id: "html-pathfinder", title: { fr: "Pionnier HTML", en: "HTML pathfinder" } }
  ],

  streaks: {
    dailyCheckInRequired: true,
    milestones: [3, 7, 14, 30, 60],
    rewards: [
      { days: 3, xpBonus: 20, badge: null },
      { days: 7, xpBonus: 50, badge: "consistency-7" },
      { days: 14, xpBonus: 100, badge: "consistency-14" },
      { days: 30, xpBonus: 250, badge: "consistency-30" }
    ]
  },

  validationRules: {
    lessonPass: "all-required-tests-pass",
    quizPass: "score>=70",
    modulePass: "all-core-lessons-pass && mini-project-pass",
    trackPass: "all-modules-pass && final-project-pass && final-assessment>=70"
  },

  feedback: {
    successSamples: [
      {
        fr: "Bien joué : la structure est propre et les tests sont tous verts.",
        en: "Nice work: the structure is clean and all tests are green."
      },
      {
        fr: "Tu progresses bien : ton rendu est correct, il reste surtout à renforcer la sémantique.",
        en: "You’re progressing well: the rendering is correct, now strengthen the semantics."
      }
    ],
    errorSamples: [
      {
        fr: "Ton champ fonctionne, mais il manque encore un label explicite.",
        en: "Your field works, but it still needs an explicit label."
      },
      {
        fr: "Le rendu visuel est proche, mais la règle CSS cible le mauvais élément.",
        en: "The visual result is close, but the CSS rule targets the wrong element."
      }
    ]
  },

  hintSystem: {
    level1: {
      label: { fr: "Piste conceptuelle", en: "Concept hint" },
      xpPenalty: 0
    },
    level2: {
      label: { fr: "Piste structurelle", en: "Structure hint" },
      xpPenalty: 0.05
    },
    level3: {
      label: { fr: "Étape guidée", en: "Guided step" },
      xpPenalty: 0.15
    }
  },

  guidedCorrection: {
    steps: [
      "show-failing-test",
      "highlight-related-code-zone",
      "explain-why-it-fails",
      "suggest-next-edit",
      "rerun-single-test"
    ]
  },

  progressCards: [
    "track-overview-card",
    "module-completion-card",
    "streak-card",
    "badge-wall-card",
    "project-readiness-card"
  ]
}
```

## Modèle de données et intégration React

Sur le plan technique, le contenu doit être stocké comme un ensemble d’objets fortement typés, avec IDs stables, champs localisés et tests sérialisables. Pour l’éditeur, **CodeMirror** est le meilleur choix pour une V1 pédagogique : l’outil est modulaire, extensible, accessible, internationalisable, et ses extensions de lint et de panels sont très adaptées aux overlays didactiques. **Monaco Editor** devient pertinent plus tard si tu veux un mode “IDE” plus proche de VS Code. Pour l’exécution, l’aperçu HTML/CSS/DOM doit passer par `iframe srcdoc` + `sandbox`, la communication par `postMessage`, la sécurité par CSP stricte, et les tests purement algorithmiques peuvent être isolés dans des Web Workers terminables. `localStorage` suffit pour une V1 offline-first, car les données y persistent entre deux sessions. citeturn25view0turn25view1turn25view2turn25view3turn17search0turn18search3turn18search0turn18search1turn18search8turn21search0turn22search2turn22search0turn6search7turn6search14

```ts
type LocalizedString = { fr: string; en: string }
type LocalizedList = { fr: string[]; en: string[] }

type ExerciseType =
  | "lesson"
  | "quiz"
  | "code-challenge"
  | "visual-match"
  | "dom-challenge"
  | "debug-challenge"
  | "mini-game"
  | "project"
  | "final-assessment"

type TestCase = {
  id?: string
  type:
    | "doctype-exists"
    | "html-contains"
    | "count"
    | "min-count"
    | "max-count"
    | "html-attribute"
    | "text-equals"
    | "text-not-equals"
    | "selector-text-not-match"
    | "css-computed-style"
    | "css-layout-check"
    | "viewport-style-check"
    | "dom-event"
    | "dom-text"
    | "dom-class"
    | "form-submit"
    | "storage-key"
    | "fetch-mock"
    | "js-function-result"
    | "state-assertion"
    | "accessibility-assertion"
  selector?: string
  attribute?: string
  value?: any
  exists?: boolean
  pattern?: string
  message: LocalizedString
}

type Lesson = {
  id: string
  track: "html" | "css" | "javascript"
  moduleId: string
  type: ExerciseType
  level: "beginner" | "advanced-beginner" | "pre-junior"
  xp: number
  title: LocalizedString
  description: LocalizedString
  objectives: LocalizedList
  prerequisites: string[]
  durationMin: number
  exerciseUi?: string
  starterCode?: string
  exampleCode?: string
  solution?: string
  consigne?: LocalizedString
  hints?: LocalizedList
  tests?: TestCase[]
  badge?: string | null
  unlockedSkills?: string[]
}

type Module = {
  id: string
  track: "html" | "css" | "javascript"
  title: LocalizedString
  description: LocalizedString
  level: string
  durationMin: number
  prerequisites: string[]
  lessons: string[]
  exerciseTypes: ExerciseType[]
  unlocks: string[]
  miniProjectId?: string
}

type Project = {
  id: string
  level: string
  title: LocalizedString
  brief: LocalizedString
  skills: string[]
  successCriteria: string[]
  bonus: LocalizedList
  autoTests: string[]
}

type Badge = {
  id: string
  title: LocalizedString
  description: LocalizedString
  icon: string
  unlockRule: string
}

type UserProgress = {
  locale: "fr" | "en"
  totalXp: number
  level: number
  streakDays: number
  badgesUnlocked: string[]
  lessonState: Record<string, {
    status: "locked" | "available" | "in-progress" | "passed"
    attempts: number
    score?: number
    xpEarned: number
    hintsUsed: number
    completedAt?: string
    draft?: {
      html?: string
      css?: string
      js?: string
    }
  }>
  projectState: Record<string, {
    status: "locked" | "available" | "submitted" | "passed"
    score?: number
    notes?: string[]
    completedAt?: string
  }>
}
```

Exemple d’objet lesson directement exploitable, dans l’esprit exact que tu pourras donner ensuite à ton implémentation React :

```js
const lessonExample = {
  id: "html-foundations-01",
  track: "html",
  moduleId: "html-foundations",
  level: "beginner",
  type: "code-challenge",
  xp: 25,
  durationMin: 15,
  title: {
    fr: "Le squelette d’une page HTML",
    en: "The skeleton of an HTML page"
  },
  description: {
    fr: "Construire une page HTML minimale valide.",
    en: "Build a valid minimal HTML page."
  },
  objectives: {
    fr: ["Ajouter doctype", "Créer head/body", "Définir le title"],
    en: ["Add doctype", "Create head/body", "Define the title"]
  },
  prerequisites: [],
  starterCode: `<html>
  <head></head>
  <body></body>
</html>`,
  exampleCode: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Accueil PulsaTeach</title>
  </head>
  <body>
    <h1>Bienvenue</h1>
  </body>
</html>`,
  consigne: {
    fr: "Complète cette page pour qu’elle soit valide et qu’elle affiche un h1.",
    en: "Complete this page so it is valid and shows one h1."
  },
  tests: [
    {
      type: "doctype-exists",
      message: {
        fr: "Ajoute <!doctype html>.",
        en: "Add <!doctype html>."
      }
    },
    {
      type: "html-contains",
      selector: "h1",
      message: {
        fr: "Il manque un h1.",
        en: "A h1 is missing."
      }
    }
  ],
  hints: {
    fr: ["Le doctype est la première ligne.", "Le title se met dans head."],
    en: ["The doctype is the first line.", "The title belongs in head."]
  },
  solution: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Accueil PulsaTeach</title>
  </head>
  <body>
    <h1>Bienvenue</h1>
  </body>
</html>`,
  badge: "first-structure"
}
```

Les types d’exercices interactifs doivent être traités comme de vraies primitives produit, chacune avec sa logique UI, ses données et sa validation.

```js
const exerciseTypeSpecs = {
  lesson: {
    uiBehavior: "micro-lesson reader with examples, checkpoints, and continue CTA",
    requiredData: ["title", "description", "examples", "checkpoints"],
    autoValidation: "self-check or none",
    feedback: "summary card + next recommended action"
  },
  quiz: {
    uiBehavior: "one question per screen or grouped mode with instant correction",
    requiredData: ["questions", "choices", "correctAnswer", "rationale"],
    autoValidation: "exact answer match",
    feedback: "correct/incorrect + explanation + retry"
  },
  "code-challenge": {
    uiBehavior: "editor + preview + test panel",
    requiredData: ["starterCode", "tests", "solution", "hints"],
    autoValidation: "DOM/CSS/JS assertions",
    feedback: "green/red tests + targeted hints"
  },
  "visual-match": {
    uiBehavior: "target screenshot + user preview + visual score",
    requiredData: ["targetSpec", "starterCode", "toleranceRules"],
    autoValidation: "layout/style snapshot comparison + selector rules",
    feedback: "match percentage + mismatch highlights"
  },
  "dom-challenge": {
    uiBehavior: "live page with interactions and scripted user actions",
    requiredData: ["starterCode", "interactionScript", "tests"],
    autoValidation: "event simulation + DOM assertions",
    feedback: "which interaction failed and why"
  },
  "debug-challenge": {
    uiBehavior: "broken code + failing tests + logs",
    requiredData: ["buggyCode", "tests", "repairHints"],
    autoValidation: "tests must turn green without exposing full solution",
    feedback: "failure cause + likely zone + incremental hints"
  },
  "mini-game": {
    uiBehavior: "goal-oriented play screen with score, timer, lives or steps",
    requiredData: ["gameRules", "levelConfig", "winConditions", "progression"],
    autoValidation: "state/position/solution rule checks",
    feedback: "attempt score, mastery stars, replay prompt"
  },
  project: {
    uiBehavior: "brief panel + editor + preview + rubric + tests",
    requiredData: ["brief", "rubric", "tests", "acceptanceCriteria"],
    autoValidation: "structural assertions + optional manual rubric score",
    feedback: "rubric summary + missing acceptance criteria"
  },
  "final-assessment": {
    uiBehavior: "timed or milestone-based capstone validation flow",
    requiredData: ["rubric", "thresholds", "mustPassTests"],
    autoValidation: "hybrid automated + rubric thresholds",
    feedback: "pass/fail + competency map + next remediation path"
  }
}
```

Organisation de fichiers recommandée pour une app React :

```txt
src/
  app/
    routes/
      tracks/
      learn/
      projects/
      profile/
      review/
  curriculum/
    schemas.ts
    config/
      progression.ts
      exerciseTypes.ts
    tracks/
      html/
        modules.ts
        lessons.ts
      css/
        modules.ts
        lessons.ts
      javascript/
        modules.ts
        lessons.ts
    projects/
      transversalProjects.ts
    badges/
      badges.ts
  features/
    lesson-runner/
      LessonShell.tsx
      LessonHeader.tsx
      ProgressHeader.tsx
    editor/
      CodeEditor.tsx
      EditorTabs.tsx
      TestPanel.tsx
      HintPanel.tsx
      DiffPanel.tsx
    preview/
      PreviewFrame.tsx
      FrameBridge.ts
      sandbox/
        htmlPreview.ts
        domPreview.ts
        jsWorkerRunner.ts
    progress/
      ProgressMap.tsx
      BadgeModal.tsx
      XpToast.tsx
      StreakCard.tsx
    i18n/
      locale.ts
      formatters.ts
  storage/
    localProgress.ts
    draftStorage.ts
  utils/
    testRunner.ts
    serializers.ts
    security.ts
```

Pages et routes minimales :

- `/tracks` — vue globale des 3 parcours
- `/tracks/:trackId` — carte des modules d’un parcours
- `/learn/:trackId/:moduleId/:lessonId` — exécution d’une micro-leçon
- `/projects/:projectId` — brief + implémentation d’un projet
- `/review/:lessonId` — correction guidée et remédiation
- `/profile` — XP, badges, streaks, historique, projets
- `/assessment/:trackId` — évaluation finale de track

Gestion FR/EN :

- Tous les contenus utilisateur doivent être dans les objets de données via `{ fr, en }`.
- Les IDs restent **identiques** quelle que soit la langue.
- Les tests et messages de feedback sont localisés, mais les *types de test* restent en anglais technique stable.
- Les snippets de code peuvent rester neutres; seuls les contenus affichés à l’utilisateur doivent être traduits.
- Le switch FR/EN ne doit jamais casser la progression ni les drafts.

Sauvegarde locale recommandée :

```js
const localStorageKeys = {
  progress: "pulsa:v1:progress",
  drafts: "pulsa:v1:drafts",
  settings: "pulsa:v1:settings",
  streak: "pulsa:v1:streak"
}
```

Stratégie d’intégration technique :

- **V1** : JSON/TS en repo + `localStorage`, sans backend obligatoire.
- **V1.5** : synchronisation optionnelle compte utilisateur + export/import de progression.
- **V2** : backend avec comptes, sauvegarde cloud, soumissions de projets, analytics, leaderboard, badges synchronisés.
- **V3** : contenu éditable par une interface d’admin ou CMS headless, versionné par curriculum.

Choix éditeur :

- **CodeMirror recommandé pour V1** si ta priorité est l’intégration pédagogique : overlays, panneaux d’aide, diagnostics, inline feedback, modularité fine.
- **Monaco recommandé en mode avancé** si tu ajoutes ensuite un “career mode” plus IDE-like, des diff views plus poussées et un environnement proche de VS Code. citeturn25view0turn25view1turn25view2turn25view3turn17search0

Aperçu live et sécurité :

- Pour HTML/CSS : générer le rendu via `iframe.srcdoc`.
- Pour DOM challenges : `iframe sandbox` avec droits minimaux, idéalement sans `allow-same-origin` pour les previews simples.
- Pour JS : exécution isolée, communication avec la page par `postMessage`.
- Pour les tests algorithmiques purs : exécuter dans un Web Worker, imposer timeout et `terminate()` si le script bloque.
- Appliquer une CSP stricte sur l’origine de preview et interdire les appels réseau non explicitement mockés dans les challenges.
- Servir si possible les previews depuis une origine séparée pour limiter le rayon d’impact. citeturn18search3turn18search0turn18search1turn18search8turn21search0turn21search2turn22search2turn22search0turn21search1

Structure de progression utilisateur recommandée côté produit :

```js
const userProgressShape = {
  profile: {
    locale: "fr",
    totalXp: 0,
    level: 1,
    streakDays: 0,
    badgesUnlocked: []
  },
  tracks: {
    html: { completionRate: 0, modulesPassed: 0, finalProjectPassed: false },
    css: { completionRate: 0, modulesPassed: 0, finalProjectPassed: false },
    javascript: { completionRate: 0, modulesPassed: 0, finalProjectPassed: false }
  },
  lessonState: {
    "html-01-document-skeleton": {
      status: "passed",
      score: 100,
      attempts: 2,
      xpEarned: 24,
      hintsUsed: 1,
      completedAt: "2026-05-04T20:00:00.000Z"
    }
  },
  drafts: {
    "html-01-document-skeleton": {
      html: "<!doctype html>..."
    }
  },
  projects: {
    "project-todo-list": {
      status: "in-progress",
      score: null,
      lastOpenedAt: "2026-05-04T20:45:00.000Z"
    }
  }
}
```

Décision produit finale recommandée pour PulsaTeach :

- **Cœur du produit** : micro-leçons + tests + feedback immédiat.
- **Différenciation produit** : mini-jeux CSS/JS originaux, corrections guidées riches, progression XP lisible, briefs réalistes.
- **Valeur marché** : sortie portfolio nette, bilingue FR/EN, structure de données propre, intégrable rapidement dans React.
- **Principe directeur** : chaque écran doit soit **enseigner**, soit **faire pratiquer**, soit **faire produire**. Jamais aucun écran purement décoratif.