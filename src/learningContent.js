const htmlShell = (body) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>PulsaTeach Lab</title>
  </head>
  <body>
${body}
  </body>
</html>`;

export const learningTracks = [
  {
    id: "html",
    label: "HTML",
    color: "orange",
    title: { fr: "HTML interactif", en: "Interactive HTML" },
    summary: {
      fr: "Structure, sémantique, formulaires, accessibilité et SEO avec tests DOM.",
      en: "Structure, semantics, forms, accessibility, and SEO with DOM tests."
    },
    modules: [
      module("html-foundations", "Fondations", "Foundations", [
        lesson({
          id: "html-01-document-skeleton",
          title: ["Le squelette d'une page", "The page skeleton"],
          brief: [
            "Complète une page HTML valide avec doctype, langue, charset, title et h1.",
            "Complete a valid HTML page with doctype, language, charset, title, and h1."
          ],
          starterCode: `<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>`,
          solution: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Accueil PulsaTeach</title>
  </head>
  <body>
    <h1>Bienvenue sur PulsaTeach</h1>
  </body>
</html>`,
          tests: [
            test("doctype", "<!doctype html>", "<!doctype html>"),
            test("contains", "html lang", "lang="),
            test("contains", "charset", "charset=\"UTF-8\""),
            test("contains", "title", "<title>Accueil PulsaTeach</title>"),
            test("selector", "h1", "h1")
          ],
          hint: ["Le doctype se place tout en haut.", "The doctype goes at the very top."],
          xp: 25
        }),
        lesson({
          id: "html-02-text-content",
          title: ["Titres et paragraphes", "Headings and paragraphs"],
          brief: ["Crée une fiche avec un h1, un h2, deux paragraphes, strong et em.", "Create a card with one h1, one h2, two paragraphs, strong, and em."],
          starterCode: htmlShell(`    <article>
      <!-- Ajoute le contenu ici -->
    </article>`),
          solution: htmlShell(`    <article>
      <h1>Apprendre le web</h1>
      <h2>Les bases</h2>
      <p><strong>HTML</strong> organise le contenu.</p>
      <p><em>CSS</em> améliore l'apparence.</p>
    </article>`),
          tests: [test("selector", "one h1", "h1"), test("selector", "h2", "h2"), test("minSelector", "two paragraphs", "p", 2), test("selector", "strong", "strong"), test("selector", "em", "em")],
          hint: ["strong exprime l'importance, em exprime l'emphase.", "strong expresses importance, em expresses emphasis."],
          xp: 20
        }),
        lesson({
          id: "html-02-details-summary",
          title: ["FAQ repliable", "Expandable FAQ"],
          brief: ["Crée une mini FAQ avec details, summary et un paragraphe de réponse.", "Create a mini FAQ with details, summary, and an answer paragraph."],
          starterCode: htmlShell(`    <section>
      <h2>FAQ</h2>
      <!-- Ajoute une question repliable -->
    </section>`),
          solution: htmlShell(`    <section>
      <h2>FAQ</h2>
      <details>
        <summary>Combien de temps faut-il pour apprendre HTML ?</summary>
        <p>Quelques semaines de pratique régulière suffisent pour construire des pages solides.</p>
      </details>
    </section>`),
          tests: [test("selector", "details", "details"), test("selector", "summary", "summary"), test("selector", "answer paragraph", "details p")],
          hint: ["summary est le titre cliquable du bloc details.", "summary is the clickable title inside details."],
          xp: 20
        })
      ]),
      module("html-content-navigation", "Contenu et navigation", "Content and navigation", [
        lesson({
          id: "html-03-links-navigation",
          title: ["Liens et navigation", "Links and navigation"],
          brief: ["Ajoute un lien interne vers #contact et un lien externe explicite.", "Add an internal link to #contact and a clear external link."],
          starterCode: htmlShell(`    <nav></nav>
    <section id="contact">
      <h2>Contact</h2>
    </section>`),
          solution: htmlShell(`    <nav>
      <a href="#contact">Aller au contact</a>
      <a href="https://developer.mozilla.org/">Lire la documentation MDN</a>
    </nav>
    <section id="contact">
      <h2>Contact</h2>
    </section>`),
          tests: [test("selector", "internal link", "a[href=\"#contact\"]"), test("selector", "external link", "a[href^=\"https://\"]"), test("notContains", "avoid vague text", "clique ici")],
          hint: ["Un lien interne utilise # puis l'id de la section.", "An internal link uses # followed by the section id."],
          xp: 20
        }),
        lesson({
          id: "html-04-images-media",
          title: ["Images et légendes", "Images and captions"],
          brief: ["Crée une figure avec image, alt descriptif et figcaption.", "Create a figure with an image, descriptive alt text, and figcaption."],
          starterCode: htmlShell(`    <!-- Ajoute une figure ici -->`),
          solution: htmlShell(`    <figure>
      <img src="profile.jpg" alt="Portrait de Lina devant son ordinateur" />
      <figcaption>Lina construit sa première page web</figcaption>
    </figure>`),
          tests: [test("selector", "figure", "figure"), test("selector", "image alt", "img[alt]"), test("selector", "caption", "figcaption")],
          hint: ["Le alt décrit l'image pour quelqu'un qui ne la voit pas.", "Alt text describes the image for someone who cannot see it."],
          xp: 20
        }),
        lesson({
          id: "html-05-lists",
          title: ["Listes", "Lists"],
          brief: ["Ajoute une liste de compétences et une liste d'étapes de publication.", "Add a skills list and a publishing steps list."],
          starterCode: htmlShell(`    <!-- Ajoute une ul et une ol -->`),
          solution: htmlShell(`    <h2>Compétences</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
    <h2>Publication</h2>
    <ol>
      <li>Écrire</li>
      <li>Tester</li>
      <li>Publier</li>
    </ol>`),
          tests: [test("selector", "ul", "ul"), test("selector", "ol", "ol"), test("minSelector", "six items", "li", 6)],
          hint: ["ul pour un groupe, ol pour un ordre.", "ul for a group, ol for an order."],
          xp: 20
        }),
        lesson({
          id: "html-05-card-metadata",
          title: ["Carte de cours riche", "Rich course card"],
          brief: ["Crée une carte avec article, time, data-level et un lien vers le cours.", "Create a card with article, time, data-level, and a course link."],
          starterCode: htmlShell(`    <!-- Carte du cours HTML -->`),
          solution: htmlShell(`    <article class="course-card" data-level="starter">
      <h2>HTML Foundations</h2>
      <p>Construis une page accessible.</p>
      <time datetime="2026-05-05">5 mai 2026</time>
      <a href="#learn">Commencer</a>
    </article>`),
          tests: [test("selector", "article", "article.course-card"), test("selector", "data level", "[data-level]"), test("selector", "time datetime", "time[datetime]"), test("selector", "course link", "a[href=\"#learn\"]")],
          hint: ["Les attributs data-* stockent une petite information utilisable en CSS ou JS.", "data-* attributes store small bits of information for CSS or JS."],
          xp: 25
        })
      ]),
      module("html-forms-seo", "Données, formulaires, SEO", "Data, forms, SEO", [
        lesson({
          id: "html-06-tables",
          title: ["Tableaux accessibles", "Accessible tables"],
          brief: ["Construis un tableau avec caption, th scope et au moins deux lignes.", "Build a table with caption, scoped th cells, and at least two rows."],
          starterCode: htmlShell(`    <!-- Planning de cours -->`),
          solution: htmlShell(`    <table>
      <caption>Planning PulsaTeach</caption>
      <tr><th scope="col">Jour</th><th scope="col">Sujet</th></tr>
      <tr><td>Lundi</td><td>HTML</td></tr>
      <tr><td>Mardi</td><td>CSS</td></tr>
    </table>`),
          tests: [test("selector", "table", "table"), test("selector", "caption", "caption"), test("selector", "scope", "th[scope]"), test("minSelector", "rows", "tr", 3)],
          hint: ["caption explique le tableau avant les lignes.", "caption explains the table before the rows."],
          xp: 30
        }),
        lesson({
          id: "html-07-forms-basics",
          title: ["Formulaire de base", "Basic form"],
          brief: ["Crée un formulaire avec label, input email et bouton.", "Create a form with label, email input, and button."],
          starterCode: htmlShell(`    <form>
    </form>`),
          solution: htmlShell(`    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
      <button type="submit">Rejoindre</button>
    </form>`),
          tests: [test("selector", "form", "form"), test("selector", "label", "label[for]"), test("selector", "email input", "input[type=\"email\"]"), test("selector", "button", "button")],
          hint: ["Le for du label doit pointer vers l'id du champ.", "The label for attribute must point to the field id."],
          xp: 30
        }),
        lesson({
          id: "html-09-semantic-layout",
          title: ["Layout sémantique", "Semantic layout"],
          brief: ["Remplace les div génériques par header, nav, main, section et footer.", "Replace generic divs with header, nav, main, section, and footer."],
          starterCode: `<div>Logo</div>
<div>Menu</div>
<div>Contenu</div>
<div>Bas de page</div>`,
          solution: `<header>Logo</header>
<nav><a href="#learn">Apprendre</a></nav>
<main>
  <section id="learn"><h1>Apprendre HTML</h1></section>
</main>
<footer>Bas de page</footer>`,
          tests: [test("selector", "header", "header"), test("selector", "nav", "nav"), test("selector", "main", "main"), test("selector", "section", "section"), test("selector", "footer", "footer")],
          hint: ["La sémantique décrit le rôle du bloc.", "Semantics describe the role of the block."],
          xp: 35
        })
      ]),
      module("html-a11y-final", "Accessibilité et projet final", "Accessibility and final project", [
        lesson({
          id: "html-08-form-controls-validation",
          title: ["Contrôles et validation", "Controls and validation"],
          brief: ["Ajoute un champ email requis, une checkbox de consentement et un select de niveau.", "Add a required email field, a consent checkbox, and a level select."],
          starterCode: htmlShell(`    <form>
      <!-- Ajoute les contrôles ici -->
    </form>`),
          solution: htmlShell(`    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="level">Niveau</label>
      <select id="level" name="level">
        <option>Débutant</option>
        <option>Intermédiaire</option>
      </select>

      <label>
        <input type="checkbox" name="consent" required />
        J'accepte de recevoir les consignes du cours
      </label>
      <button type="submit">Valider</button>
    </form>`),
          tests: [test("selector", "required email", "input[type=\"email\"][required]"), test("selector", "select", "select"), test("selector", "checkbox", "input[type=\"checkbox\"]"), test("selector", "labels", "label", 3)],
          hint: ["required se place directement sur les champs obligatoires.", "required goes directly on mandatory fields."],
          xp: 35
        }),
        lesson({
          id: "html-09-aria-status",
          title: ["Message de statut", "Status message"],
          brief: ["Ajoute une zone de statut accessible qui annonce la sauvegarde d'un exercice.", "Add an accessible status region that announces that an exercise was saved."],
          starterCode: htmlShell(`    <form>
      <button type="submit">Sauver</button>
      <!-- Message de statut ici -->
    </form>`),
          solution: htmlShell(`    <form>
      <button type="submit">Sauver</button>
      <p role="status" aria-live="polite">Exercice sauvegardé.</p>
    </form>`),
          tests: [test("selector", "status role", "[role=\"status\"]"), test("selector", "aria live", "[aria-live=\"polite\"]"), test("contains", "saved text", "sauvegard")],
          hint: ["role=status et aria-live=polite permettent d'annoncer un changement sans interrompre brutalement.", "role=status and aria-live=polite announce a change without interrupting too aggressively."],
          xp: 30
        }),
        quizLesson({
          id: "html-10-accessibility-quiz",
          title: ["Quiz accessibilité", "Accessibility quiz"],
          brief: ["Choisis la meilleure correction pour un champ de formulaire accessible.", "Choose the best fix for an accessible form field."],
          question: {
            fr: "Quel élément rend un input compréhensible par un lecteur d'écran ?",
            en: "Which element makes an input understandable to a screen reader?"
          },
          options: [
            { id: "placeholder", label: { fr: "Un placeholder seulement", en: "A placeholder only" } },
            { id: "label", label: { fr: "Un label relié avec for/id", en: "A label connected with for/id" } },
            { id: "color", label: { fr: "Une couleur plus vive", en: "A brighter color" } }
          ],
          answer: "label",
          explanation: {
            fr: "Le label explicite reste disponible même quand le champ est rempli et il est annoncé par les aides techniques.",
            en: "An explicit label remains available after typing and is announced by assistive technologies."
          },
          xp: 20
        }),
        lesson({
          id: "html-11-seo-best-practices",
          title: ["SEO de base", "Basic SEO"],
          brief: ["Améliore head avec un title précis, une meta description et un seul h1.", "Improve head with a precise title, meta description, and one h1."],
          starterCode: `<head>
  <title>Page</title>
</head>
<body>
  <h1>Atelier</h1>
</body>`,
          solution: `<head>
  <meta charset="UTF-8" />
  <title>Atelier HTML débutant | PulsaTeach</title>
  <meta name="description" content="Un atelier simple pour apprendre les bases du HTML avec PulsaTeach." />
</head>
<body>
  <h1>Atelier HTML</h1>
</body>`,
          tests: [test("contains", "meta description", "meta name=\"description\""), test("contains", "specific title", "PulsaTeach"), test("selector", "one h1", "h1")],
          hint: ["La meta description résume la page pour les moteurs et les humains.", "The meta description summarizes the page for search engines and humans."],
          xp: 30
        }),
        projectLesson({
          id: "html-12-final-project",
          title: ["Projet PulsaConf", "PulsaConf project"],
          brief: ["Construis une page événementielle avec header, nav, sections, tableau, images alt, formulaire et footer.", "Build an event page with header, nav, sections, table, alt images, form, and footer."],
          starterCode: htmlShell(`    <!-- Construis PulsaConf ici -->`),
          solution: htmlShell(`    <header>
      <h1>PulsaConf 2026</h1>
      <nav><a href="#schedule">Programme</a><a href="#register">Inscription</a></nav>
    </header>
    <main>
      <section><h2>Le code en couleur</h2><p>Une journée pour apprendre.</p></section>
      <section id="schedule"><h2>Programme</h2><table><caption>Planning</caption><tr><th scope="col">Heure</th><th scope="col">Sujet</th></tr><tr><td>9h</td><td>HTML</td></tr></table></section>
      <section><h2>Intervenants</h2><img src="speaker.jpg" alt="Intervenante PulsaTeach" /></section>
      <section id="register"><h2>Inscription</h2><form><label for="email">Email</label><input id="email" type="email" /><button>Réserver</button></form></section>
    </main>
    <footer>© PulsaTeach</footer>`),
          tests: [test("selector", "header", "header"), test("selector", "nav", "nav"), test("minSelector", "four sections", "section", 4), test("selector", "table", "table"), test("selector", "form", "form"), test("selector", "image alt", "img[alt]"), test("selector", "footer", "footer")],
          xp: 100
        })
      ])
    ]
  },
  {
    id: "css",
    label: "CSS",
    color: "aqua",
    title: { fr: "CSS interactif", en: "Interactive CSS" },
    summary: {
      fr: "Sélecteurs, box model, Flexbox, Grid, responsive et animations avec rendu visuel.",
      en: "Selectors, box model, Flexbox, Grid, responsive, and motion with visual output."
    },
    modules: [
      module("css-selectors", "Sélecteurs", "Selectors", [
        cssLesson("css-01-selectors", ["Selector Quest", "Selector Quest"], "Cible uniquement les cartes de cours avec la classe .course-card.", ".course-card {\n  /* écris ici */\n}", ".course-card", ["background", "border"], 25),
        cssLesson("css-01-combinators", ["Sélecteur direct", "Direct selector"], "Cible seulement les boutons directement dans .toolbar avec le combinateur >.", ".toolbar > button {\n  /* style direct */\n}", ".toolbar > button", ["background", "border-radius"], 25),
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
        cssLesson("css-02-custom-properties", ["Variables CSS", "CSS variables"], "Déclare une variable --accent puis utilise-la pour colorer les cartes.", ":root {\n  /* variable ici */\n}\n\n.card {\n  /* utilise la variable */\n}", ":root", ["--accent", "background: var(--accent)"], 35)
      ]),
      module("css-flexbox", "Flexbox", "Flexbox", [
        cssLesson("css-03-flexbox", ["Flex Rescue", "Flex Rescue"], "Aligne les boutons sur une ligne avec display flex, gap et align-items.", ".toolbar {\n  /* flex ici */\n}", ".toolbar", ["display: flex", "gap", "align-items"], 35),
        cssLesson("css-03-flex-wrap", ["Wrap Lab", "Wrap Lab"], "Autorise les cartes à revenir à la ligne avec flex-wrap.", ".panel {\n  display: flex;\n  /* wrap ici */\n}", ".panel", ["display: flex", "flex-wrap", "gap"], 30),
        cssLesson("css-03-space-between", ["Navbar flex", "Navbar flex"], "S?pare le logo et les actions avec justify-content: space-between.", ".toolbar {\n  display: flex;\n  /* distribution ici */\n}", ".toolbar", ["display: flex", "justify-content: space-between", "align-items"], 30)
      ]),
      module("css-grid", "Grid", "Grid", [
        cssLesson("css-04-grid", ["Grid Builder", "Grid Builder"], "Crée une grille responsive avec display grid, repeat et minmax.", ".gallery {\n  /* grid ici */\n}", ".gallery", ["display: grid", "repeat", "minmax"], 35),
        cssLesson("css-04-grid-gap", ["Gallery spacing", "Gallery spacing"], "Ajoute un gap clair et une grille en trois colonnes.", ".gallery {\n  /* grille fixe */\n}", ".gallery", ["display: grid", "grid-template-columns", "gap"], 30),
        cssLesson("css-04-place-items", ["Centrage grid", "Grid centering"], "Centre les ?l?ments de la galerie avec place-items.", ".gallery {\n  display: grid;\n  /* centrage ici */\n}", ".gallery", ["display: grid", "place-items", "min-height"], 30)
      ]),
      module("css-responsive-motion", "Responsive et motion", "Responsive and motion", [
        cssLesson("css-05-responsive", ["Puzzle responsive", "Responsive puzzle"], "Ajoute une media query qui transforme .panel en grille à partir de 700px.", ".panel {\n  display: block;\n}\n\n/* media query ici */", "@media", ["@media", "min-width", "display: grid"], 40),
        cssLesson("css-05-motion", ["Micro-interaction", "Micro-interaction"], "Ajoute une transition et un état hover sur les boutons.", ".toolbar button {\n  /* interaction ici */\n}", ".toolbar button", ["transition", ":hover", "transform"], 35),
        cssLesson("css-05-reduced-motion", ["Motion responsable", "Responsible motion"], "Ajoute une media query prefers-reduced-motion qui d?sactive les transitions.", "@media (prefers-reduced-motion: reduce) {\n  /* stop motion */\n}", "@media", ["prefers-reduced-motion", "transition: none"], 35),
        projectLesson({
          id: "css-06-final-project",
          title: ["Projet landing responsive", "Responsive landing project"],
          brief: ["Crée les règles CSS essentielles d'une landing avec grille, cartes, hover et responsive.", "Create the essential CSS rules for a landing with grid, cards, hover, and responsive behavior."],
          starterCode: ".panel {\n}\n.card {\n}\n.toolbar button {\n}\n",
          solution: ".panel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 18px;\n}\n.card {\n  padding: 24px;\n  border-radius: 20px;\n  box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);\n}\n.toolbar button {\n  transition: transform .2s ease;\n}\n.toolbar button:hover {\n  transform: translateY(-3px);\n}",
          tests: [test("contains", "grid", "display: grid"), test("contains", "responsive columns", "auto-fit"), test("contains", "card padding", "padding"), test("contains", "hover", ":hover"), test("contains", "transition", "transition")],
          xp: 90
        })
      ])
    ]
  },
  {
    id: "javascript",
    label: "JavaScript",
    color: "mint",
    title: { fr: "JavaScript interactif", en: "Interactive JavaScript" },
    summary: {
      fr: "Logique, fonctions, tableaux, DOM, événements, API, localStorage et debugging.",
      en: "Logic, functions, arrays, DOM, events, APIs, localStorage, and debugging."
    },
    modules: [
      module("js-basics", "Bases du langage", "Language basics", [
        jsLesson("js-01-variables", ["Variables et calcul", "Variables and calculation"], "Crée une constante price, une constante quantity et une constante total.", "const price = 12;\n// ajoute quantity et total", ["const quantity", "const total", "price * quantity"], 25),
        jsLesson("js-01-conditionals", ["Conditions", "Conditionals"], "Crée une fonction canStart(age) qui retourne true si age est au moins 13.", "function canStart(age) {\n  // retourne true ou false\n}", ["function canStart", "return", "age >= 13"], 30),
        quizLesson({
          id: "js-01-types-quiz",
          title: ["Quiz types", "Types quiz"],
          brief: ["Identifie le type JavaScript d'une valeur.", "Identify the JavaScript type of a value."],
          question: { fr: "Quel est le type de true ?", en: "What is the type of true?" },
          options: [
            { id: "string", label: { fr: "string", en: "string" } },
            { id: "number", label: { fr: "number", en: "number" } },
            { id: "boolean", label: { fr: "boolean", en: "boolean" } }
          ],
          answer: "boolean",
          explanation: { fr: "true et false sont des booléens.", en: "true and false are booleans." },
          xp: 15
        })
      ]),
      module("js-functions", "Fonctions", "Functions", [
        jsLesson("js-02-functions", ["Function Forge", "Function Forge"], "Complète une fonction getLevel(score) qui retourne Starter, Builder ou Pre-junior.", "function getLevel(score) {\n  // if score < 100 -> Starter\n  // if score < 500 -> Builder\n  // sinon -> Pre-junior\n}", ["function getLevel", "return", "Starter", "Builder", "Pre-junior"], 35),
        jsLesson("js-02-parameters", ["Paramètres", "Parameters"], "Crée une fonction makeBadge(name, xp) qui retourne une phrase avec le nom et l'XP.", "function makeBadge(name, xp) {\n  // retourne une phrase\n}", ["function makeBadge", "name", "xp", "return"], 30)
      ]),
      module("js-arrays", "Tableaux et objets", "Arrays and objects", [
        jsLesson("js-03-arrays", ["Catalogue filtrable", "Filterable catalog"], "Utilise filter pour garder les cours dont track vaut 'html'.", "const courses = [{ track: 'html' }, { track: 'css' }];\nconst htmlCourses = courses", [".filter", "track", "html"], 35),
        jsLesson("js-03-map", ["Transformer une liste", "Transform a list"], "Utilise map pour extraire les titres des cours.", "const courses = [{ title: 'HTML' }, { title: 'CSS' }];\nconst titles = courses", [".map", "title"], 30),
        jsLesson("js-03-reduce-xp", ["Additionner l'XP", "Sum XP"], "Utilise reduce pour calculer totalXp depuis une liste de le?ons.", "const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];\nconst totalXp = lessons", [".reduce", "xp", "totalXp"], 40)
      ]),
      module("js-dom-events", "DOM et événements", "DOM and events", [
        domLesson("js-04-dom-events", ["Bouton compteur", "Counter button"], "Sélectionne #count et augmente son texte quand #plus est cliqué.", `<button id="plus">+1</button>
<span id="count">0</span>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "textContent"], 40),
        domLesson("js-04-class-toggle", ["Toggle de classe", "Class toggle"], "Au clic sur #toggle, ajoute ou retire la classe active sur .card.", `<button id="toggle">Toggle</button>
<article class="card">Carte</article>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "classList.toggle"], 40)
      ]),
      module("js-storage-async", "API, stockage, debug", "API, storage, debug", [
        jsLesson("js-05-storage", ["Sauvegarde locale", "Local save"], "Sauvegarde le thème 'happy' dans localStorage avec la clé pulsa-theme.", "const theme = 'happy';\n// sauvegarde ici", ["localStorage.setItem", "pulsa-theme", "theme"], 30),
        jsLesson("js-05-json-settings", ["JSON settings", "JSON settings"], "Transforme settings en JSON puis relis-le dans parsedSettings.", "const settings = { theme: 'happy', minutes: 30 };\n// stringify puis parse", ["JSON.stringify", "JSON.parse", "parsedSettings"], 35),
        jsLesson("js-06-fetch", ["Fetch mental model", "Fetch mental model"], "Écris une fonction async loadCourses qui appelle fetch('/api/courses') puis response.json().", "async function loadCourses() {\n  // fetch ici\n}", ["async function", "await fetch", "response.json"], 40),
        projectLesson({
          id: "js-07-final-project",
          title: ["Projet dashboard", "Dashboard project"],
          brief: ["Écris le squelette logique d'un dashboard : state, render, addTask et localStorage.", "Write the logic skeleton for a dashboard: state, render, addTask, and localStorage."],
          starterCode: "const state = { tasks: [] };\n\nfunction render() {\n}\n\nfunction addTask(title) {\n}\n",
          solution: "const state = { tasks: [] };\n\nfunction render() {\n  console.log(state.tasks);\n}\n\nfunction addTask(title) {\n  state.tasks.push({ title, done: false });\n  localStorage.setItem('pulsa-dashboard', JSON.stringify(state));\n  render();\n}",
          tests: [test("contains", "state", "const state"), test("contains", "render", "function render"), test("contains", "addTask", "function addTask"), test("contains", "push task", ".push"), test("contains", "localStorage", "localStorage.setItem")],
          xp: 100
        })
      ])
    ]
  }
];

function module(id, fr, en, lessons) {
  return { id, title: { fr, en }, lessons };
}

function lesson({ id, title, brief, starterCode, solution, tests, hint, xp }) {
  return {
    id,
    type: "html",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    theory: theoryFor(id),
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution,
    tests,
    hint: { fr: hint[0], en: hint[1] },
    xp
  };
}

function quizLesson({ id, title, brief, question, options, answer, explanation, xp }) {
  return {
    id,
    type: "quiz",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    theory: theoryFor(id),
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    question,
    options,
    answer,
    explanation,
    starterCode: "",
    solution: "",
    tests: [test("quiz", "correct answer", answer)],
    hint: {
      fr: "Cherche la réponse qui reste utile pour tous les utilisateurs, pas seulement visuelle.",
      en: "Look for the answer that remains useful for every user, not only visually."
    },
    xp
  };
}

function projectLesson({ id, title, brief, starterCode, solution, tests, xp }) {
  return {
    id,
    type: "project",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    theory: theoryFor(id),
    skills: skillsFor(id),
    difficulty: "project",
    durationMin: 45,
    starterCode,
    solution,
    tests,
    rubric: {
      fr: [
        "Tous les tests requis passent.",
        "Le code reste lisible et organisé.",
        "Le résultat pourrait être montré comme livrable de portfolio."
      ],
      en: [
        "Every required test passes.",
        "The code remains readable and organized.",
        "The result could be shown as a portfolio deliverable."
      ]
    },
    hint: {
      fr: "Commence par les grandes zones, puis remplis les détails.",
      en: "Start with the large regions, then fill in the details."
    },
    xp
  };
}

function skillsFor(id) {
  const groups = {
    html: ["semantic-html", "accessibility", "document-structure"],
    css: ["visual-style", "layout", "responsive-ui"],
    js: ["logic", "state", "debugging"],
    project: ["portfolio-output", "quality-checks", "independent-build"]
  };

  if (id.startsWith("html-12") || id.includes("final-project")) return groups.project;
  if (id.startsWith("html")) return groups.html;
  if (id.startsWith("css-06")) return groups.project;
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
  if (difficulty === "quick") return 5;
  if (difficulty === "starter") return 10;
  if (difficulty === "stretch") return 25;
  if (difficulty === "project") return 45;
  return 15;
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

  return lessons[id] || generic;
}

function cssLesson(id, title, brief, starterCode, target, checks, xp) {
  const solution = cssSolution(id, target, checks);

  return {
    id,
    type: "css",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief, en: brief },
    theory: theoryFor(id),
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution,
    previewHtml: `<main class="demo-surface">
  <section class="panel">
    <article class="card course-card">HTML Quest</article>
    <article class="card course-card">CSS Lab</article>
    <article class="card course-card">JS Arena</article>
  </section>
  <div class="toolbar">
    <button>Run</button><button>Hint</button><button>Ship</button>
  </div>
  <div class="gallery"><span></span><span></span><span></span><span></span></div>
</main>`,
    tests: [
      test("contains", "target selector", target),
      ...checks.map((check) => check.includes(":") || check === ":hover" || check === "@media"
        ? test("contains", check, check)
        : test("cssDeclaration", check, { selector: target, property: check }))
    ],
    hint: { fr: "Regarde le sélecteur demandé puis ajoute chaque propriété attendue.", en: "Look at the required selector, then add each expected property." },
    xp
  };
}

function cssSolution(id, target, checks) {
  if (id === "css-05-motion") {
    return `.toolbar button {
  transition: transform .2s ease;
}

.toolbar button:hover {
  transform: translateY(-3px);
}`;
  }

  if (id === "css-02-custom-properties") {
    return `:root {
  --accent: #facc15;
}

.card {
  background: var(--accent);
}`;
  }

  if (id === "css-05-reduced-motion") {
    return `@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}`;
  }

  if (target === "@media") {
    return `@media (min-width: 700px) {
  .panel {
    display: grid;
    gap: 16px;
  }
}`;
  }

  return `${target} {
  ${checks.map((item) => cssPropertyLine(item)).join("\n  ")}
}`;
}

function cssPropertyLine(check) {
  if (check.includes(":")) return `${check};`;
  if (check === "background") return "background: #facc15;";
  if (check === "border") return "border: 3px solid #1e1b4b;";
  if (check === "padding") return "padding: 24px;";
  if (check === "border-radius") return "border-radius: 20px;";
  if (check === "box-shadow") return "box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);";
  if (check === "gap") return "gap: 16px;";
  if (check === "align-items") return "align-items: center;";
  if (check === "place-items") return "place-items: center;";
  if (check === "min-height") return "min-height: 220px;";
  if (check === "flex-wrap") return "flex-wrap: wrap;";
  if (check === "font-size") return "font-size: 18px;";
  if (check === "line-height") return "line-height: 1.7;";
  if (check === "max-width") return "max-width: 760px;";
  if (check === "grid-template-columns") return "grid-template-columns: repeat(3, minmax(0, 1fr));";
  if (check === "transition") return "transition: transform .2s ease;";
  if (check === "transform") return "transform: translateY(-3px);";
  if (check === "repeat") return "grid-template-columns: repeat(2, minmax(0, 1fr));";
  if (check === "minmax") return "grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));";
  if (check === "min-width") return "min-width: 700px;";
  return `${check}: demo;`;
}

function jsLesson(id, title, brief, starterCode, checks, xp) {
  return {
    id,
    type: "js",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief, en: brief },
    theory: theoryFor(id),
    skills: skillsFor(id),
    difficulty: difficultyFor(id),
    durationMin: durationFor(id),
    starterCode,
    solution: jsSolution(id, starterCode),
    tests: [...checks.map((check) => test("contains", check, check)), ...jsRuntimeTests(id)],
    hint: { fr: "Les tests vérifient les mots-clés importants de la solution.", en: "The tests check the important keywords in the solution." },
    xp
  };
}

function domLesson(id, title, brief, starterCode, checks, xp) {
  return {
    ...jsLesson(id, title, brief, starterCode, checks, xp),
    type: "dom"
  };
}

function test(type, label, value, amount = 1) {
  return { type, label, value, amount };
}

function jsRuntimeTests(id) {
  const runtime = {
    "js-01-variables": [
      { type: "jsExpression", label: "total equals 48", value: "return total === 48;" }
    ],
    "js-01-conditionals": [
      { type: "jsExpression", label: "canStart(13) is true", value: "return canStart(13) === true;" },
      { type: "jsExpression", label: "canStart(12) is false", value: "return canStart(12) === false;" }
    ],
    "js-02-functions": [
      { type: "jsExpression", label: "getLevel(50) returns Starter", value: "return getLevel(50) === 'Starter';" },
      { type: "jsExpression", label: "getLevel(300) returns Builder", value: "return getLevel(300) === 'Builder';" },
      { type: "jsExpression", label: "getLevel(800) returns Pre-junior", value: "return getLevel(800) === 'Pre-junior';" }
    ],
    "js-02-parameters": [
      { type: "jsExpression", label: "makeBadge uses name and xp", value: "return makeBadge('Maya', 120).includes('Maya') && makeBadge('Maya', 120).includes('120');" }
    ],
    "js-03-arrays": [
      { type: "jsExpression", label: "htmlCourses has one item", value: "return Array.isArray(htmlCourses) && htmlCourses.length === 1 && htmlCourses[0].track === 'html';" }
    ],
    "js-03-map": [
      { type: "jsExpression", label: "titles contains HTML and CSS", value: "return Array.isArray(titles) && titles.includes('HTML') && titles.includes('CSS');" }
    ],
    "js-03-reduce-xp": [
      { type: "jsExpression", label: "totalXp equals 100", value: "return totalXp === 100;" }
    ],
    "js-05-json-settings": [
      { type: "jsExpression", label: "parsedSettings keeps theme", value: "return parsedSettings.theme === 'happy' && parsedSettings.minutes === 30;" }
    ]
  };

  return runtime[id] || [];
}

function jsSolution(id, fallback) {
  const solutions = {
    "js-01-variables": `const price = 12;
const quantity = 4;
const total = price * quantity;
console.log(total);`,
    "js-01-conditionals": `function canStart(age) {
  return age >= 13;
}`,
    "js-02-functions": `function getLevel(score) {
  if (score < 100) return "Starter";
  if (score < 500) return "Builder";
  return "Pre-junior";
}`,
    "js-03-arrays": `const courses = [{ track: 'html' }, { track: 'css' }];
const htmlCourses = courses.filter((course) => course.track === 'html');
console.log(htmlCourses);`,
    "js-04-dom-events": `<button id="plus">+1</button>
<span id="count">0</span>
<script>
  const button = document.querySelector("#plus");
  const count = document.querySelector("#count");

  button.addEventListener("click", () => {
    count.textContent = Number(count.textContent) + 1;
  });
</script>`,
    "js-05-storage": `const theme = 'happy';
localStorage.setItem('pulsa-theme', theme);`,
    "js-02-parameters": `function makeBadge(name, xp) {
  return name + " earned " + xp + " XP";
}`,
    "js-03-map": `const courses = [{ title: 'HTML' }, { title: 'CSS' }];
const titles = courses.map((course) => course.title);
console.log(titles);`,
    "js-03-reduce-xp": `const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];
const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);
console.log(totalXp);`,
    "js-04-class-toggle": `<button id="toggle">Toggle</button>
<article class="card">Carte</article>
<script>
  const button = document.querySelector("#toggle");
  const card = document.querySelector(".card");

  button.addEventListener("click", () => {
    card.classList.toggle("active");
  });
</script>`,
    "js-05-json-settings": `const settings = { theme: 'happy', minutes: 30 };
const savedSettings = JSON.stringify(settings);
const parsedSettings = JSON.parse(savedSettings);
console.log(parsedSettings);`,
    "js-06-fetch": `async function loadCourses() {
  const response = await fetch('/api/courses');
  const courses = await response.json();
  return courses;
}`,
    "js-07-final-project": `const state = { tasks: [] };

function render() {
  console.log(state.tasks);
}

function addTask(title) {
  state.tasks.push({ title, done: false });
  localStorage.setItem('pulsa-dashboard', JSON.stringify(state));
  render();
}`
  };

  return solutions[id] || fallback;
}
