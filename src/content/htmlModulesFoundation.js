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
             "Complète le document : place <!doctype html> en première ligne, indique lang=\"fr\" sur html et charset=\"UTF-8\" dans head. Donne à title le texte exact « Accueil PulsaTeach », puis ajoute un h1 dans body. Observe la différence entre le titre du document et le titre visible.",
             "Complete the document: put <!doctype html> on the first line, set lang=\"en\" on html, and add charset=\"UTF-8\" inside head. Set title to the exact text “PulsaTeach Home”, then add an h1 inside body. Notice the difference between the document title and the visible heading."
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
                  title: "Les repères du document : doctype, html, head et body",
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
                    "L'indentation rend la hiérarchie plus facile à lire. Pour les éléments de cet exemple, referme les enfants avant leur parent. Certains éléments, comme meta ou img, sont des éléments vides : ils n'ont pas de balise fermante."
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
                "Je sais où placer lang, charset et title et expliquer leur utilité dans cet exercice.",
                "Je sais distinguer le title de l'onglet et le h1 visible.",
                "Je peux reconnaître une balise ouvrante, une balise fermante et un attribut."
              ]
            },
            en: {
              introduction: "Before writing an interface, understand the document received by the browser. An HTML page is a text file organized as a tree: every element has a role, can contain other elements, and helps the browser understand what to display.",
              sections: [
                { title: "HTML describes content, not appearance", paragraphs: ["HTML is a markup language. Tags describe the role of content so browsers and assistive technologies can understand it.", "The browser turns HTML into the DOM. CSS controls appearance and JavaScript adds behavior."], example: "<h1>Welcome</h1>\n<p>This is my first web document.</p>" },
                 { title: "The essential document skeleton", paragraphs: ["The doctype enables standards mode rather than legacy quirks mode. html is the root element; its lang attribute identifies the main language for assistive tools and translation.", "head contains metadata such as the document title and encoding. body contains the page content people read and interact with."], example: "<!doctype html>\n<html lang=\"en\">\n  <head>...</head>\n  <body>...</body>\n</html>" },
                { title: "Why charset and title matter", paragraphs: ["UTF-8 displays international characters correctly.", "title names the browser tab, while h1 is the visible main heading."], example: "<meta charset=\"UTF-8\" />\n<title>PulsaTeach Home</title>" },
                 { title: "Reading nested tags", paragraphs: ["Elements inside another element are its children.", "Indentation makes hierarchy readable. For the elements in this example, close children before their parent. Void elements such as meta and img do not have closing tags."], example: "<body>\n  <main>\n    <h1>My title</h1>\n  </main>\n</body>" }
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
          hint: ["Si le test du titre échoue, vérifie le texte exact dans title : « Accueil PulsaTeach ». Écrire ce texte uniquement dans h1 ne suffit pas. Le doctype se place avant html ; meta et title vont dans head.", "If the title check fails, check the exact text inside title: “PulsaTeach Home”. Putting it only in h1 is not enough. The doctype precedes html; meta and title belong in head."],
          xp: 25
        }),
        lesson({
          id: "html-02-text-content",
          title: ["Titres et paragraphes", "Headings and paragraphs"],
          brief: ["Dans article, présente un sujet de ton choix : un h1 pour le titre, un h2 pour une partie et au moins deux paragraphes p. Dans ces paragraphes, marque une information importante avec strong et une insistance avec em. Choisis les balises pour leur sens, pas pour leur taille.", "Inside article, introduce a topic of your choice: use an h1 for the title, an h2 for a section, and at least two p paragraphs. In those paragraphs, mark important information with strong and verbal emphasis with em. Choose tags for their meaning, not their size."],
          course: {
            fr: {
              introduction: "Une page se parcourt avant de se lire en détail. Les titres annoncent son organisation ; les paragraphes développent les idées. Ici, tu construis une petite fiche qui reste compréhensible même sans mise en forme CSS.",
              sections: [
                { title: "Un titre principal, puis une partie", paragraphs: ["Le h1 nomme le sujet de cette fiche. Le h2 introduit une partie de ce sujet : il ne remplace pas un paragraphe.", "N'utilise pas h2 simplement pour obtenir un texte plus petit. Les niveaux de titres indiquent une hiérarchie, utile notamment pour naviguer avec un lecteur d'écran."], example: "<h1>Mon jardin</h1>\n<h2>Les plantes aromatiques</h2>\n<p>Le thym pousse dans un pot près de la fenêtre.</p>" },
                { title: "Importance et insistance", paragraphs: ["strong signale une information importante, comme une précaution. em marque une insistance qui peut changer le sens d'une phrase.", "Le navigateur les affiche souvent en gras ou en italique, mais cet aspect n'est pas leur définition. Pour une décoration sans sens particulier, tu utiliseras CSS."], example: "<p><strong>Attention :</strong> ne laisse pas le pot dans l'eau.</p>\n<p>Arrose la terre, <em>pas les feuilles</em>.</p>" },
                { title: "Vérifie le sens avant de lancer les tests", paragraphs: ["Lis seulement tes titres : annoncent-ils le sujet et sa partie ? Lis ensuite les paragraphes : chacun apporte-t-il une idée ?", "Les tests vérifient la présence des balises demandées. Ils ne jugent pas si ton titre est pertinent : cette relecture fait partie de ton travail."], example: "<article>\n  <h1>Un sujet précis</h1>\n  <h2>Une partie du sujet</h2>\n  <p>Une première idée.</p>\n  <p>Une seconde idée.</p>\n</article>" }
              ],
              vocabulary: [["Hiérarchie", "Organisation du sujet principal et de ses parties."], ["Paragraphe", "Élément p qui développe une idée."], ["Emphase", "Insistance portée par em, et pas simplement une décoration en italique."]],
              check: ["Mon h1 annonce le sujet et mon h2 une partie.", "J'ai au moins deux paragraphes distincts.", "Je peux justifier l'emploi de strong et em."]
            },
            en: {
              introduction: "People scan a page before reading every detail. Headings explain its structure; paragraphs develop its ideas. Build a short article that remains understandable without CSS styling.",
              sections: [
                { title: "A main heading and a section", paragraphs: ["The h1 names this article's topic. An h2 introduces a section of that topic; it does not replace a paragraph.", "Do not choose h2 just to make text smaller. Heading levels express hierarchy and help screen reader users navigate."], example: "<h1>My garden</h1>\n<h2>Growing herbs</h2>\n<p>Thyme grows in a pot near the window.</p>" },
                { title: "Importance and emphasis", paragraphs: ["strong marks important information, such as a warning. em adds stress that can affect the meaning of a sentence.", "Browsers often show them in bold or italics, but appearance does not define their purpose. Use CSS for decoration without added meaning."], example: "<p><strong>Warning:</strong> do not leave the pot standing in water.</p>\n<p>Water the soil, <em>not the leaves</em>.</p>" },
                { title: "Review meaning before running tests", paragraphs: ["Read only your headings: do they identify the topic and its section? Then check that each paragraph adds an idea.", "The tests check whether the requested tags exist. They cannot judge whether your heading is useful: reviewing it is part of your work."], example: "<article>\n  <h1>A specific topic</h1>\n  <h2>A section of that topic</h2>\n  <p>A first idea.</p>\n  <p>A second idea.</p>\n</article>" }
              ],
              vocabulary: [["Hierarchy", "The organization of a main topic and its sections."], ["Paragraph", "A p element that develops an idea."], ["Emphasis", "Stress expressed with em, not merely italic decoration."]],
              check: ["My h1 identifies the topic and my h2 a section.", "I have at least two separate paragraphs.", "I can explain why I used strong and em."]
            }
          },
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
          brief: ["Dans la section FAQ, ajoute un élément details. Place la question dans summary, son premier enfant, puis un paragraphe p contenant la réponse. Ouvre et referme la question dans l'aperçu ; essaie aussi au clavier avec Tab puis Entrée ou Espace.", "Inside the FAQ section, add a details element. Put the question in summary as its first child, followed by a p paragraph with the answer. Open and close the question in the preview; also try the keyboard with Tab, then Enter or Space."],
          course: {
            fr: {
              introduction: "Une FAQ peut laisser les questions visibles et masquer les réponses jusqu'à leur ouverture. HTML fournit ce comportement avec details et summary : aucun JavaScript n'est nécessaire pour cet exercice.",
              sections: [
                { title: "La question reste visible", paragraphs: ["details regroupe la question et sa réponse. Son premier enfant summary donne le libellé que la personne active pour ouvrir le bloc.", "Écris une question compréhensible sans lire la réponse. Évite « Clique ici », qui n'annonce pas le contenu."], example: "<details>\n  <summary>Faut-il installer un outil ?</summary>\n  <p>Cet exercice se fait dans le navigateur.</p>\n</details>" },
                { title: "Tester l'ouverture et la fermeture", paragraphs: ["Le navigateur gère le comportement natif. Active summary pour afficher la réponse, puis active-le de nouveau pour la masquer.", "Dans l'aperçu, utilise Tab pour atteindre la question, puis Entrée ou Espace pour l'ouvrir. La réponse doit rester dans details : placée après sa fermeture, elle resterait visible."], example: "<details open>\n  <summary>Pourquoi la réponse est-elle déjà visible ?</summary>\n  <p>L'attribut open ouvre le bloc au départ.</p>\n</details>" }
              ],
              vocabulary: [["details", "Bloc HTML dont le contenu peut être affiché ou masqué."], ["summary", "Question ou résumé qui commande l'ouverture du bloc."], ["open", "Attribut booléen : sa présence ouvre details, même si on écrit open=\"false\"."]],
              check: ["summary est le premier enfant de details.", "Le paragraphe de réponse se trouve dans details.", "Je peux ouvrir et refermer le bloc avec le clavier."]
            },
            en: {
              introduction: "A FAQ can keep questions visible while hiding answers until opened. HTML provides this behavior with details and summary: this exercise needs no JavaScript.",
              sections: [
                { title: "The question stays visible", paragraphs: ["details groups the question and answer. Its first child, summary, provides the label people activate to open the block.", "Write a question that makes sense without reading the answer. Avoid “Click here”, which does not explain what is inside."], example: "<details>\n  <summary>Do I need to install a tool?</summary>\n  <p>This exercise runs in the browser.</p>\n</details>" },
                { title: "Test opening and closing", paragraphs: ["The browser supplies the native behavior. Activate summary to show the answer, then activate it again to hide it.", "In the preview, use Tab to reach the question, then Enter or Space to open it. Keep the answer inside details: after its closing tag, the answer would stay visible."], example: "<details open>\n  <summary>Why is the answer already visible?</summary>\n  <p>The open attribute expands the block initially.</p>\n</details>" }
              ],
              vocabulary: [["details", "An HTML block whose contents can be shown or hidden."], ["summary", "The question or summary that controls the block."], ["open", "A boolean attribute: its presence opens details, even when written as open=\"false\"."]],
              check: ["summary is the first child of details.", "The answer paragraph is inside details.", "I can open and close the block using the keyboard."]
            }
          },
          starterCode: htmlShell(`    <section>
      <h2>FAQ</h2>
      <!-- Ajoute une question repliable -->
    </section>`),
          solution: htmlShell(`    <section>
      <h2>FAQ</h2>
      <details>
        <summary>Combien de temps faut-il pour apprendre HTML ?</summary>
        <p>Le rythme dépend de ton expérience et du temps de pratique. Commence par une page simple, puis enrichis-la.</p>
      </details>
    </section>`),
          tests: [test("selector", "details", "details"), test("selector", "summary", "summary"), test("selector", "answer paragraph", "details p")],
          hint: ["Si la réponse reste toujours visible, vérifie qu'elle est placée avant </details>. Pour fermer le bloc au départ, retire l'attribut open : open=\"false\" le laisse ouvert.", "If the answer stays visible, check that it appears before </details>. To start collapsed, remove the open attribute: open=\"false\" still leaves the block open."],
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
