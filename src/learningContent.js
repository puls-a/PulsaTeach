import { getHtmlPedagogy } from "./htmlPedagogy.js";

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
    level: { fr: "Débutant", en: "Beginner" },
    prerequisites: { fr: ["Aucun prérequis", "Savoir utiliser un navigateur et un clavier"], en: ["No prerequisites", "Know how to use a browser and keyboard"] },
    outcomes: {
      fr: ["Structurer une page complète et sémantique", "Créer des formulaires accessibles", "Auditer le HTML, l'accessibilité et le SEO", "Livrer un site événementiel prêt pour un portfolio"],
      en: ["Structure a complete semantic page", "Create accessible forms", "Audit HTML, accessibility, and SEO", "Ship a portfolio-ready event website"]
    },
    capstone: { fr: "PulsaConf : site événementiel accessible", en: "PulsaConf: accessible event website" },
    profession: {
      fr: "HTML est la compétence de base des développeurs front-end, intégrateurs web, créateurs de contenu et spécialistes accessibilité. Elle consiste à transformer une information en document structuré, navigable et compréhensible.",
      en: "HTML is a core skill for front-end developers, web integrators, content creators, and accessibility specialists."
    },
    certification: {
      fr: ["Valider toutes les leçons et quiz HTML", "Réussir les deux mini-projets", "Corriger l'audit d'accessibilité", "Livrer PulsaConf avec tous les tests réussis"],
      en: ["Pass every HTML lesson and quiz", "Complete both mini projects", "Fix the accessibility audit", "Ship PulsaConf with every test passing"]
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
          course: {
            fr: {
              introduction: "Avant d'écrire une interface, il faut comprendre le document que le navigateur reçoit. Une page HTML est un fichier texte organisé comme un arbre : chaque élément possède un rôle, peut contenir d'autres éléments et aide le navigateur à comprendre ce qu'il doit afficher.",
              sections: [
                {
                  title: "HTML décrit le contenu, pas son apparence",
                  paragraphs: [
                    "HTML signifie HyperText Markup Language. C'est un langage de balisage : on entoure le contenu avec des balises pour indiquer son rôle. Un titre principal utilise h1, un paragraphe utilise p et une zone de navigation utilise nav.",
                    "Le navigateur lit ces informations pour construire le DOM, une représentation structurée de la page. CSS pourra ensuite modifier l'apparence et JavaScript ajouter des comportements."
                  ],
                  example: "<h1>Bienvenue</h1>\n<p>Voici mon premier document web.</p>"
                },
                {
                  title: "Les cinq éléments indispensables du squelette",
                  paragraphs: [
                    "<!doctype html> annonce un document HTML moderne. Sans lui, le navigateur peut activer un ancien mode de compatibilité.",
                    "<html lang=\"fr\"> est la racine du document. L'attribut lang indique la langue principale aux lecteurs d'écran, moteurs de recherche et outils de traduction.",
                    "<head> contient les informations sur la page qui ne constituent pas son contenu principal : encodage, titre de l'onglet, description et ressources.",
                    "<body> contient tout ce que l'utilisateur peut lire ou utiliser dans la page."
                  ],
                  example: "<!doctype html>\n<html lang=\"fr\">\n  <head>...</head>\n  <body>...</body>\n</html>"
                },
                {
                  title: "Pourquoi charset et title sont importants",
                  paragraphs: [
                    "<meta charset=\"UTF-8\"> permet d'afficher correctement les accents, symboles et caractères de nombreuses langues. Il doit apparaître tôt dans head.",
                    "<title> définit le texte de l'onglet du navigateur. Il aide aussi les moteurs de recherche et les personnes qui naviguent entre plusieurs onglets.",
                    "Le title n'est pas le titre visible dans la page. Le titre visible principal est généralement un h1 placé dans body."
                  ],
                  example: "<head>\n  <meta charset=\"UTF-8\" />\n  <title>Accueil PulsaTeach</title>\n</head>"
                },
                {
                  title: "Comment lire les balises imbriquées",
                  paragraphs: [
                    "Une balise ouvrante commence une zone et sa balise fermante la termine. Les éléments placés à l'intérieur sont ses enfants.",
                    "L'indentation n'est pas obligatoire pour le navigateur, mais elle rend la hiérarchie visible pour les humains. Ferme toujours les éléments dans l'ordre inverse de leur ouverture."
                  ],
                  example: "<body>\n  <main>\n    <h1>Mon titre</h1>\n  </main>\n</body>"
                }
              ],
              vocabulary: [
                ["Balise", "Marqueur comme <body> qui indique le rôle d'une partie du document."],
                ["Élément", "Ensemble composé d'une balise ouvrante, de son contenu et souvent d'une balise fermante."],
                ["Attribut", "Information ajoutée dans une balise ouvrante, comme lang=\"fr\"."],
                ["head", "Métadonnées et configuration du document."],
                ["body", "Contenu visible et interactif de la page."],
                ["DOM", "Arbre construit par le navigateur à partir du HTML."]
              ],
              check: [
                "Je sais expliquer la différence entre head et body.",
                "Je comprends pourquoi lang, charset et title ne sont pas optionnels.",
                "Je sais distinguer le title de l'onglet et le h1 visible.",
                "Je peux reconnaître une balise ouvrante, une balise fermante et un attribut."
              ]
            },
            en: {
              introduction: "Before writing an interface, understand the document received by the browser. An HTML page is a text file organized as a tree: every element has a role, can contain other elements, and helps the browser understand what to display.",
              sections: [
                { title: "HTML describes content, not appearance", paragraphs: ["HTML is a markup language. Tags describe the role of content so browsers and assistive technologies can understand it.", "The browser turns HTML into the DOM. CSS controls appearance and JavaScript adds behavior."], example: "<h1>Welcome</h1>\n<p>This is my first web document.</p>" },
                { title: "The essential document skeleton", paragraphs: ["The doctype enables modern standards mode.", "html is the root, head contains metadata, and body contains visible content."], example: "<!doctype html>\n<html lang=\"en\">\n  <head>...</head>\n  <body>...</body>\n</html>" },
                { title: "Why charset and title matter", paragraphs: ["UTF-8 displays international characters correctly.", "title names the browser tab, while h1 is the visible main heading."], example: "<meta charset=\"UTF-8\" />\n<title>PulsaTeach Home</title>" },
                { title: "Reading nested tags", paragraphs: ["Elements inside another element are its children.", "Indentation makes hierarchy readable and closing order must mirror opening order."], example: "<body>\n  <main>\n    <h1>My title</h1>\n  </main>\n</body>" }
              ],
              vocabulary: [["Tag", "A marker such as <body> that describes part of a document."], ["Element", "An opening tag, its content, and usually a closing tag."], ["Attribute", "Extra information inside an opening tag."], ["head", "Document metadata and configuration."], ["body", "Visible and interactive page content."], ["DOM", "The tree built by the browser from HTML."]],
              check: ["I can explain head versus body.", "I understand lang, charset, and title.", "I can distinguish title from h1.", "I can identify tags and attributes."]
            }
          },
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
        }),
        lesson({
          id: "html-02-comments-entities",
          title: ["Commentaires et caractères spéciaux", "Comments and special characters"],
          brief: ["Documente une section avec un commentaire et affiche correctement les caractères <, >, & et ©.", "Document a section with a comment and correctly display <, >, &, and ©."],
          starterCode: htmlShell(`    <section>
      <h1>Référence HTML</h1>
      <p>Affiche les symboles demandés ici.</p>
    </section>`),
          solution: htmlShell(`    <!-- Référence rapide pour les apprenants -->
    <section>
      <h1>Référence HTML</h1>
      <p>&lt;section&gt; utilise &amp; pour relier des concepts.</p>
      <p>&copy; PulsaTeach</p>
    </section>`),
          tests: [test("contains", "HTML comment", "<!--"), test("contains", "less-than entity", "&lt;"), test("contains", "ampersand entity", "&amp;"), test("contains", "copyright entity", "&copy;")],
          hint: ["Une entité commence par & et se termine par ;.", "An entity starts with & and ends with ;."],
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
        }),
        lesson({
          id: "html-05-audio-video",
          title: ["Audio et vidéo accessibles", "Accessible audio and video"],
          brief: ["Ajoute une vidéo contrôlable avec sous-titres et une solution de repli textuelle.", "Add a controllable video with captions and a textual fallback."],
          starterCode: htmlShell(`    <section>
      <h2>Présentation du cours</h2>
      <!-- Média accessible -->
    </section>`),
          solution: htmlShell(`    <section>
      <h2>Présentation du cours</h2>
      <video controls>
        <source src="intro.mp4" type="video/mp4" />
        <track kind="captions" src="intro-fr.vtt" srclang="fr" label="Français" />
        <p>La vidéo présente le programme de la formation.</p>
      </video>
    </section>`),
          tests: [test("selector", "video controls", "video[controls]"), test("selector", "video source", "video source[type]"), test("selector", "captions track", "track[kind=\"captions\"]"), test("selector", "text fallback", "video p")],
          hint: ["controls rend la lecture pilotable et track fournit les sous-titres.", "controls makes playback operable and track provides captions."],
          xp: 30
        }),
        projectLesson({
          id: "html-05-mini-project-profile",
          title: ["Mini-projet : page profil", "Mini project: profile page"],
          brief: ["Assemble une page profil avec navigation, biographie, compétences, média et liens utiles.", "Assemble a profile page with navigation, biography, skills, media, and useful links."],
          starterCode: htmlShell(`    <!-- Construis le profil de Sam ici -->`),
          solution: htmlShell(`    <header><h1>Sam développeuse web</h1><nav><a href="#about">À propos</a><a href="#skills">Compétences</a></nav></header>
    <main>
      <section id="about"><h2>À propos</h2><figure><img src="sam.jpg" alt="Portrait de Sam" /><figcaption>Sam apprend le développement web</figcaption></figure><p>Je construis des interfaces accessibles.</p></section>
      <section id="skills"><h2>Compétences</h2><ul><li>HTML</li><li>Accessibilité</li><li>Git</li></ul></section>
    </main>
    <footer><a href="mailto:sam@example.com">Contacter Sam</a></footer>`),
          tests: [test("selector", "page header", "header"), test("selector", "navigation", "nav"), test("minSelector", "content sections", "section", 2), test("selector", "profile image alt", "img[alt]"), test("selector", "skills list", "ul"), test("selector", "contact link", "a[href^=\"mailto:\"]"), test("selector", "footer", "footer")],
          xp: 70
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
        }),
        lesson({
          id: "html-09-fieldset-groups",
          title: ["Regrouper les champs", "Group form fields"],
          brief: ["Structure un formulaire de préférences avec fieldset, legend, radios et noms cohérents.", "Structure a preferences form with fieldset, legend, radio buttons, and coherent names."],
          starterCode: htmlShell(`    <form>
      <!-- Choix du rythme d'apprentissage -->
    </form>`),
          solution: htmlShell(`    <form>
      <fieldset>
        <legend>Rythme d'apprentissage</legend>
        <label><input type="radio" name="pace" value="calm" /> Calme</label>
        <label><input type="radio" name="pace" value="intensive" /> Intensif</label>
      </fieldset>
      <button type="submit">Sauvegarder</button>
    </form>`),
          tests: [test("selector", "fieldset", "fieldset"), test("selector", "legend", "legend"), test("minSelector", "two radio choices", "input[type=\"radio\"]", 2), test("selector", "named radio group", "input[type=\"radio\"][name=\"pace\"]"), test("selector", "submit button", "button[type=\"submit\"]")],
          hint: ["Tous les boutons radio d'un même choix partagent le même name.", "All radio buttons in one choice share the same name."],
          xp: 35
        }),
        lesson({
          id: "html-09-native-validation",
          title: ["Validation HTML native", "Native HTML validation"],
          brief: ["Ajoute des contraintes utiles avec required, minlength, maxlength et pattern.", "Add useful constraints with required, minlength, maxlength, and pattern."],
          starterCode: htmlShell(`    <form>
      <label for="username">Identifiant</label>
      <input id="username" name="username" />
      <button type="submit">Créer le compte</button>
    </form>`),
          solution: htmlShell(`    <form>
      <label for="username">Identifiant</label>
      <input id="username" name="username" required minlength="3" maxlength="20" pattern="[a-z0-9-]+" aria-describedby="username-help" />
      <p id="username-help">3 à 20 caractères : lettres minuscules, chiffres et tirets.</p>
      <button type="submit">Créer le compte</button>
    </form>`),
          tests: [test("selector", "required username", "input[required]"), test("selector", "minimum length", "input[minlength]"), test("selector", "maximum length", "input[maxlength]"), test("selector", "validation pattern", "input[pattern]"), test("selector", "described help", "input[aria-describedby]")],
          hint: ["Explique toujours les contraintes avant que la validation échoue.", "Always explain constraints before validation fails."],
          xp: 40
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
        lesson({
          id: "html-11-landmarks-skip-link",
          title: ["Landmarks et lien d'évitement", "Landmarks and skip link"],
          brief: ["Ajoute un lien d'évitement et des zones header, nav, main et footer clairement identifiables.", "Add a skip link and clearly identifiable header, nav, main, and footer regions."],
          starterCode: htmlShell(`    <header><h1>Documentation</h1></header>
    <nav><a href="#guide">Guide</a></nav>
    <main><section id="guide"><h2>Guide</h2></section></main>
    <footer>Aide</footer>`),
          solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>
    <header><h1>Documentation</h1></header>
    <nav aria-label="Navigation principale"><a href="#guide">Guide</a></nav>
    <main id="main-content"><section id="guide"><h2>Guide</h2></section></main>
    <footer>Aide</footer>`),
          tests: [test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "main target", "main#main-content"), test("selector", "named navigation", "nav[aria-label]"), test("selector", "footer landmark", "footer")],
          hint: ["Le href du lien d'évitement doit viser l'id du contenu principal.", "The skip link href must target the main content id."],
          xp: 35
        }),
        projectLesson({
          id: "html-11-accessibility-audit",
          title: ["Audit : corriger une page", "Audit: fix a page"],
          brief: ["Corrige une page volontairement mauvaise : langue, hiérarchie, image, navigation, formulaire et bouton.", "Fix an intentionally poor page: language, hierarchy, image, navigation, form, and button."],
          starterCode: `<html>
  <body>
    <div>Mon service</div>
    <div><a href="#">Clique ici</a></div>
    <div><img src="team.jpg" /></div>
    <div><input type="email" placeholder="Email" /><div>Envoyer</div></div>
  </body>
</html>`,
          solution: `<!doctype html>
<html lang="fr">
  <head><meta charset="UTF-8" /><title>Mon service accessible</title></head>
  <body>
    <header><h1>Mon service</h1></header>
    <nav aria-label="Navigation principale"><a href="#team">Découvrir l'équipe</a></nav>
    <main id="main-content"><section id="team"><h2>Notre équipe</h2><img src="team.jpg" alt="Équipe réunie dans le bureau" /></section><form><label for="email">Email</label><input id="email" type="email" required /><button type="submit">Envoyer</button></form></main>
  </body>
</html>`,
          tests: [test("contains", "doctype", "<!doctype html>"), test("contains", "document language", "lang=\"fr\""), test("selector", "main heading", "h1"), test("selector", "descriptive image", "img[alt]"), test("selector", "form label", "label[for]"), test("selector", "real button", "button[type=\"submit\"]")],
          xp: 80
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
    level: { fr: "Débutant à intermédiaire", en: "Beginner to intermediate" },
    prerequisites: { fr: ["Connaître les bases du HTML", "Savoir lire une structure de page"], en: ["Know HTML basics", "Know how to read a page structure"] },
    outcomes: {
      fr: ["Construire un système visuel cohérent", "Maîtriser Flexbox et Grid", "Créer des interfaces responsive", "Gérer les interactions et préférences de mouvement"],
      en: ["Build a coherent visual system", "Master Flexbox and Grid", "Create responsive interfaces", "Handle interactions and motion preferences"]
    },
    capstone: { fr: "Landing page responsive complète", en: "Complete responsive landing page" },
    modules: [
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
    level: { fr: "Débutant à intermédiaire", en: "Beginner to intermediate" },
    prerequisites: { fr: ["Connaître HTML et CSS", "Être à l'aise avec l'éditeur du lab"], en: ["Know HTML and CSS", "Be comfortable with the lab editor"] },
    outcomes: {
      fr: ["Modéliser une logique avec fonctions et données", "Transformer des tableaux", "Créer des interactions DOM", "Charger et sauvegarder des données"],
      en: ["Model logic with functions and data", "Transform arrays", "Create DOM interactions", "Load and save data"]
    },
    capstone: { fr: "Dashboard de tâches persistant", en: "Persistent task dashboard" },
    modules: [
      module("js-basics", "Bases du langage", "Language basics", [
        jsLesson("js-01-variables", ["Variables et calcul", "Variables and calculation"], "Crée une constante price, une constante quantity et une constante total.", "const price = 12;\n// ajoute quantity et total", ["const quantity", "const total", "price * quantity"], 25),
        jsLesson("js-01-conditionals", ["Conditions", "Conditionals"], "Crée une fonction canStart(age) qui retourne true si age est au moins 13.", "function canStart(age) {\n  // retourne true ou false\n}", ["function canStart", "return", "age >= 13"], 30),
        jsLesson("js-01-strings-template", ["Chaînes et template literals", "Strings and template literals"], "Crée un message qui combine name et xp avec un template literal.", "const name = 'Maya';\nconst xp = 120;\n// crée message", ["const message", "`", "${name}", "${xp}"], 30),
        jsLesson("js-01-errors-console", ["Lire et produire des logs", "Read and produce logs"], "Affiche une information avec console.log et un avertissement avec console.warn.", "const lesson = 'JavaScript';\n// ajoute deux logs utiles", ["console.log", "console.warn", "lesson"], 25),
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
        jsLesson("js-02-parameters", ["Paramètres", "Parameters"], "Crée une fonction makeBadge(name, xp) qui retourne une phrase avec le nom et l'XP.", "function makeBadge(name, xp) {\n  // retourne une phrase\n}", ["function makeBadge", "name", "xp", "return"], 30),
        jsLesson("js-02-default-parameters", ["Paramètres par défaut", "Default parameters"], "Crée greet(name = 'apprenant') pour toujours retourner un message valide.", "function greet(name) {\n  // message ici\n}", ["function greet", "=", "return"], 30),
        jsLesson("js-02-object-method", ["Méthode d'objet", "Object method"], "Ajoute une méthode complete à lesson qui passe done à true.", "const lesson = {\n  title: 'Fonctions',\n  done: false\n  // méthode ici\n};", ["complete", "this.done", "true"], 35)
      ]),
      module("js-arrays", "Tableaux et objets", "Arrays and objects", [
        jsLesson("js-03-arrays", ["Catalogue filtrable", "Filterable catalog"], "Utilise filter pour garder les cours dont track vaut 'html'.", "const courses = [{ track: 'html' }, { track: 'css' }];\nconst htmlCourses = courses", [".filter", "track", "html"], 35),
        jsLesson("js-03-map", ["Transformer une liste", "Transform a list"], "Utilise map pour extraire les titres des cours.", "const courses = [{ title: 'HTML' }, { title: 'CSS' }];\nconst titles = courses", [".map", "title"], 30),
        jsLesson("js-03-reduce-xp", ["Additionner l'XP", "Sum XP"], "Utilise reduce pour calculer totalXp depuis une liste de leçons.", "const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];\nconst totalXp = lessons", [".reduce", "xp", "totalXp"], 40),
        jsLesson("js-03-find", ["Trouver un élément", "Find an item"], "Utilise find pour récupérer le cours dont l'id vaut css.", "const courses = [{ id: 'html' }, { id: 'css' }, { id: 'js' }];\nconst cssCourse = courses", [".find", "id", "css"], 35),
        jsLesson("js-03-some", ["Vérifier une collection", "Check a collection"], "Utilise some pour savoir si au moins une leçon est terminée.", "const lessons = [{ done: false }, { done: true }];\nconst hasCompleted = lessons", [".some", "done", "hasCompleted"], 35)
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
</script>`, ["querySelector", "addEventListener", "classList.toggle"], 40),
        domLesson("js-04-form-submit", ["Intercepter un formulaire", "Handle form submission"], "Intercepte submit, empêche le rechargement et lis la valeur du champ #task.", `<form id="task-form"><input id="task" /><button>Ajouter</button></form>
<script>
  // ton JS ici
</script>`, ["querySelector", "addEventListener", "submit", "preventDefault", ".value"], 45),
        projectLesson({
          id: "js-04-mini-project-counter",
          title: ["Mini-projet : compteur interactif", "Mini project: interactive counter"],
          brief: ["Crée la logique d'un compteur avec état, incrémentation, décrémentation et rendu.", "Create counter logic with state, increment, decrement, and rendering."],
          starterCode: "let count = 0;\n\nfunction render() {\n}\n\nfunction increment() {\n}\n\nfunction decrement() {\n}\n",
          solution: "let count = 0;\n\nfunction render() {\n  document.querySelector('#count').textContent = count;\n}\n\nfunction increment() {\n  count += 1;\n  render();\n}\n\nfunction decrement() {\n  count -= 1;\n  render();\n}",
          tests: [test("contains", "state", "let count"), test("contains", "render function", "function render"), test("contains", "increment function", "function increment"), test("contains", "decrement function", "function decrement"), test("contains", "DOM update", "textContent")],
          xp: 75
        })
      ]),
      module("js-storage-async", "API, stockage, debug", "API, storage, debug", [
        jsLesson("js-05-storage", ["Sauvegarde locale", "Local save"], "Sauvegarde le thème 'happy' dans localStorage avec la clé pulsa-theme.", "const theme = 'happy';\n// sauvegarde ici", ["localStorage.setItem", "pulsa-theme", "theme"], 30),
        jsLesson("js-05-json-settings", ["JSON settings", "JSON settings"], "Transforme settings en JSON puis relis-le dans parsedSettings.", "const settings = { theme: 'happy', minutes: 30 };\n// stringify puis parse", ["JSON.stringify", "JSON.parse", "parsedSettings"], 35),
        jsLesson("js-06-fetch", ["Fetch mental model", "Fetch mental model"], "Écris une fonction async loadCourses qui appelle fetch('/api/courses') puis response.json().", "async function loadCourses() {\n  // fetch ici\n}", ["async function", "await fetch", "response.json"], 40),
        jsLesson("js-06-fetch-errors", ["Gérer les erreurs réseau", "Handle network errors"], "Entoure un appel fetch avec try/catch et vérifie response.ok.", "async function loadProfile() {\n  // appel robuste ici\n}", ["try", "catch", "await fetch", "response.ok", "throw"], 45),
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
  const totalMinutes = lessons.reduce((sum, item) => sum + item.durationMin, 0);
  return { id, title: { fr, en }, lessons, totalMinutes, ...moduleMeta(id), ...moduleLearningMeta(id) };
}

function moduleLearningMeta(id) {
  const metadata = {
    "html-foundations": {
      importance: { fr: "Ces fondations déterminent si tout le reste du document sera compréhensible et maintenable.", en: "These foundations determine whether the rest of the document is understandable and maintainable." },
      prerequisites: { fr: ["Aucun prérequis technique"], en: ["No technical prerequisites"] },
      outcomes: { fr: ["Créer un document valide", "Structurer un texte", "Utiliser des composants natifs simples"], en: ["Create a valid document", "Structure text", "Use simple native components"] },
      vocabulary: ["doctype", "balise", "attribut", "DOM", "hiérarchie", "entité"],
      mastery: { fr: ["Expliquer head et body", "Créer un squelette sans modèle", "Justifier chaque balise utilisée"], en: ["Explain head and body", "Create a skeleton without a template", "Justify every used tag"] }
    },
    "html-content-navigation": {
      importance: { fr: "Un site utile doit permettre de trouver, parcourir et comprendre différents formats de contenu.", en: "A useful site must make different content formats easy to find and understand." },
      prerequisites: { fr: ["Module Fondations"], en: ["Foundations module"] },
      outcomes: { fr: ["Créer une navigation explicite", "Intégrer images et médias accessibles", "Construire des cartes autonomes"], en: ["Create explicit navigation", "Integrate accessible media", "Build autonomous cards"] },
      vocabulary: ["href", "ancre", "alt", "figure", "liste", "article", "time"],
      mastery: { fr: ["Tous les liens annoncent leur destination", "Chaque média possède une alternative adaptée", "La page profil est navigable au clavier"], en: ["Every link announces its destination", "Every media has an alternative", "The profile page is keyboard navigable"] }
    },
    "html-forms-seo": {
      importance: { fr: "Les applications web doivent présenter des données et permettre aux utilisateurs d'en fournir sans confusion.", en: "Web applications must present data and let users provide it without confusion." },
      prerequisites: { fr: ["Fondations", "Contenu et navigation"], en: ["Foundations", "Content and navigation"] },
      outcomes: { fr: ["Créer des tableaux accessibles", "Construire des formulaires nommés et validés", "Organiser une page avec des landmarks"], en: ["Create accessible tables", "Build named validated forms", "Organize a page with landmarks"] },
      vocabulary: ["caption", "scope", "label", "fieldset", "legend", "required", "pattern"],
      mastery: { fr: ["Chaque contrôle possède un nom", "Les contraintes sont expliquées", "Les données tabulaires restent compréhensibles"], en: ["Every control has a name", "Constraints are explained", "Tabular data remains understandable"] }
    },
    "html-a11y-final": {
      importance: { fr: "La qualité finale se mesure à la capacité du document à rester utilisable, trouvable et compréhensible pour tous.", en: "Final quality is measured by whether the document remains usable, findable, and understandable for everyone." },
      prerequisites: { fr: ["Tous les modules HTML précédents"], en: ["Every previous HTML module"] },
      outcomes: { fr: ["Annoncer les changements dynamiques", "Optimiser structure et métadonnées", "Auditer puis livrer un projet complet"], en: ["Announce dynamic changes", "Optimize structure and metadata", "Audit and ship a complete project"] },
      vocabulary: ["région live", "SEO", "landmark", "lien d'évitement", "audit", "remédiation"],
      mastery: { fr: ["PulsaConf passe tous les tests", "La page est navigable au clavier", "Chaque correction d'audit est justifiée"], en: ["PulsaConf passes every test", "The page is keyboard navigable", "Every audit fix is justified"] }
    }
  };
  return metadata[id] || {};
}

function moduleMeta(id) {
  const metadata = {
    "html-foundations": ["Comprendre la structure d'un document et écrire un contenu textuel propre.", "Understand document structure and write clean text content.", "Une page HTML valide et documentée", "A valid documented HTML page"],
    "html-content-navigation": ["Organiser un site navigable avec liens, listes, médias et métadonnées.", "Organize a navigable site with links, lists, media, and metadata.", "Une page profil complète", "A complete profile page"],
    "html-forms-seo": ["Présenter des données et collecter des informations avec des formulaires robustes.", "Present data and collect information with robust forms.", "Un formulaire structuré et validé", "A structured validated form"],
    "html-a11y-final": ["Auditer, corriger et livrer une page accessible et bien référencée.", "Audit, fix, and ship an accessible well-indexed page.", "Le site événementiel PulsaConf", "The PulsaConf event website"],
    "css-selectors": ["Cibler précisément les éléments et gérer les états interactifs.", "Target elements precisely and handle interactive states.", "Des composants ciblés sans effets de bord", "Targeted components without side effects"],
    "css-box-model": ["Construire une base visuelle stable, lisible et fluide.", "Build a stable, readable, fluid visual foundation.", "Un système de cartes robuste", "A robust card system"],
    "css-flexbox": ["Aligner et distribuer des composants sur un axe.", "Align and distribute components on one axis.", "Une navbar responsive", "A responsive navbar"],
    "css-grid": ["Composer des mises en page bidimensionnelles adaptatives.", "Compose adaptive two-dimensional layouts.", "Une galerie responsive", "A responsive gallery"],
    "css-responsive-motion": ["Adapter l'interface aux écrans et préférences utilisateur.", "Adapt the interface to screens and user preferences.", "Une landing page responsive", "A responsive landing page"],
    "js-basics": ["Manipuler valeurs, conditions, chaînes et outils de debug.", "Work with values, conditions, strings, and debugging tools.", "Une logique simple et vérifiable", "Simple verifiable logic"],
    "js-functions": ["Encapsuler la logique dans des fonctions et objets réutilisables.", "Encapsulate logic in reusable functions and objects.", "Une petite API métier", "A small domain API"],
    "js-arrays": ["Transformer, chercher et agréger des collections de données.", "Transform, search, and aggregate data collections.", "Un catalogue filtrable", "A filterable catalog"],
    "js-dom-events": ["Relier état, événements utilisateur et rendu DOM.", "Connect state, user events, and DOM rendering.", "Un compteur interactif", "An interactive counter"],
    "js-storage-async": ["Persister des données et communiquer avec une API de façon robuste.", "Persist data and communicate with an API robustly.", "Un dashboard de tâches persistant", "A persistent task dashboard"]
  };
  const [frDescription, enDescription, frDeliverable, enDeliverable] = metadata[id] || ["Mettre en pratique les notions du module.", "Practice the module concepts.", "Un exercice validé", "A validated exercise"];
  return {
    description: { fr: frDescription, en: enDescription },
    deliverable: { fr: frDeliverable, en: enDeliverable }
  };
}

function lesson({ id, title, brief, course, starterCode, solution, tests, hint, xp }) {
  return {
    id,
    type: "html",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course: course || courseFor(id, "html"),
    pedagogy: getHtmlPedagogy(id),
    theory: theoryFor(id),
    guide: guideFor(id, "html"),
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
    course: courseFor(id, "quiz"),
    pedagogy: getHtmlPedagogy(id),
    theory: theoryFor(id),
    guide: guideFor(id, "quiz"),
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
    course: courseFor(id, "project"),
    pedagogy: getHtmlPedagogy(id),
    theory: theoryFor(id),
    guide: guideFor(id, "project"),
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
  return topics[type === "quiz" || type === "project" ? type : track];
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
  return guides[type === "project" || type === "quiz" ? type : track] || guides.html;
}

function cssLesson(id, title, brief, starterCode, target, checks, xp) {
  const solution = cssSolution(id, target, checks);

  return {
    id,
    type: "css",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief, en: brief },
    theory: theoryFor(id),
    course: courseFor(id, "css"),
    pedagogy: getHtmlPedagogy(id),
    guide: guideFor(id, "css"),
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
  if (check === "width") return "width: min(100% - 32px, 960px);";
  if (check === "margin") return "margin: 0 auto;";
  if (check === "overflow") return "overflow: auto;";
  if (check === "overflow-wrap") return "overflow-wrap: anywhere;";
  if (check === "outline") return "outline: 3px solid #4f46e5;";
  if (check === "outline-offset") return "outline-offset: 3px;";
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
    course: courseFor(id, "javascript"),
    pedagogy: getHtmlPedagogy(id),
    guide: guideFor(id, "javascript"),
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
    "js-01-strings-template": "const name = 'Maya';\nconst xp = 120;\nconst message = `${name} possède ${xp} XP`;\nconsole.log(message);",
    "js-01-errors-console": "const lesson = 'JavaScript';\nconsole.log(`Leçon chargée : ${lesson}`);\nconsole.warn('Pense à lancer les tests.');",
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
    "js-02-default-parameters": `function greet(name = "apprenant") {
  return "Bienvenue " + name;
}`,
    "js-02-object-method": `const lesson = {
  title: "Fonctions",
  done: false,
  complete() {
    this.done = true;
  }
};`,
    "js-03-map": `const courses = [{ title: 'HTML' }, { title: 'CSS' }];
const titles = courses.map((course) => course.title);
console.log(titles);`,
    "js-03-reduce-xp": `const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];
const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);
console.log(totalXp);`,
    "js-03-find": `const courses = [{ id: "html" }, { id: "css" }, { id: "js" }];
const cssCourse = courses.find((course) => course.id === "css");`,
    "js-03-some": `const lessons = [{ done: false }, { done: true }];
const hasCompleted = lessons.some((lesson) => lesson.done);`,
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
    "js-04-form-submit": `<form id="task-form"><input id="task" /><button>Ajouter</button></form>
<script>
  const form = document.querySelector("#task-form");
  const field = document.querySelector("#task");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(field.value);
  });
</script>`,
    "js-06-fetch-errors": `async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
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
