import { module, lesson, projectLesson, test } from "./trackBuilders.js";

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

export const htmlFoundationModules = [module("html-foundations", "Fondations", "Foundations", [
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
          starterCode: { fr: `<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>`, en: `<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>` },
          solution: { fr: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Accueil PulsaTeach</title>
  </head>
  <body>
    <h1>Bienvenue sur PulsaTeach</h1>
  </body>
</html>`, en: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>PulsaTeach Home</title>
  </head>
  <body>
    <h1>Welcome to PulsaTeach</h1>
  </body>
</html>` },
          tests: [
            test("doctype", "<!doctype html>", "<!doctype html>"),
            test("contains", "html lang", "lang="),
            test("contains", "charset", "charset=\"UTF-8\""),
            test("contains", { fr: "titre de page", en: "page title" }, { fr: "<title>Accueil PulsaTeach</title>", en: "<title>PulsaTeach Home</title>" }),
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
          tests: [test("selector", "internal link", "a[href=\"#contact\"]"), test("selector", "external link", "a[href^=\"https://\"]"), test("notContainsAny", { fr: "éviter un lien vague", en: "avoid vague link text" }, { fr: ["clique ici"], en: ["click here"] })],
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
      ])
];
