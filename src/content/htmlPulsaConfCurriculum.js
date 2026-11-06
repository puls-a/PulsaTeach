import { getPedagogy } from "./pedagogy.js";
import { lesson, module, projectLesson, quizLesson, test } from "./trackBuilders.js";

const threadId = "html-pulsaconf-premium";
const projectDocument = {
  id: threadId,
  fileName: "pulsaconf.html",
  fr: "Un document PulsaConf partagé, versionné à chaque étape fusionnée.",
  en: "One shared PulsaConf document, versioned at every merged step."
};

const T = (fr, en) => ({ fr, en });
const P = (fr, en) => [fr, en];

const htmlShell = (body, head = "") => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PulsaConf 2026</title>${head ? `\n${head}` : ""}
  </head>
  <body>
${body}
  </body>
</html>`;

const localizedHtmlShell = (frBody, enBody, frHead = "", enHead = "") => T(
  htmlShell(frBody, frHead),
  htmlShell(enBody, enHead).replace('lang="fr"', 'lang="en"')
);

const customNarratives = {
  "html-00-what-html-does": {
    fr: {
      intro: "Tu vas construire la page de PulsaConf, une conférence fictive. Commence par identifier son contenu : le nom de l'événement, sa présentation et ses différentes parties. HTML donne un rôle à ces éléments ; CSS servira ensuite à les mettre en forme.",
      section: "Le contenu avant l'apparence",
      trap: "Un texte affiché en gros n'est pas forcément un titre HTML. Choisis h1 pour nommer le sujet principal et p pour développer une idée : la taille et la couleur se règlent ensuite avec CSS."
    },
    en: {
      intro: "You will build a page for PulsaConf, a fictional conference. Start by identifying its content: the event name, its introduction, and its sections. HTML assigns roles to these elements; CSS will style them later.",
      section: "Content before appearance",
      trap: "Large text is not necessarily an HTML heading. Choose h1 to name the main topic and p to develop an idea: size and color can be changed later with CSS."
    }
  },
  "html-00-install-toolkit": {
    fr: {
      intro: "L'éditeur intégré ne peut ni installer un navigateur ni créer un dossier sur ton ordinateur. Tu produis donc un manifeste de préparation vérifiable qui nomme chaque outil, son rôle et la preuve à contrôler sur ta propre machine.",
      section: "Un manifeste plutôt qu'une installation simulée",
      trap: "Écrire « installé » ne prouve rien. Décris une vérification honnête, par exemple ouvrir les DevTools ou confirmer que le fichier porte bien l'extension .html."
    },
    en: {
      intro: "The embedded editor cannot install a browser or create a folder on your computer. Instead, you produce a verifiable readiness manifest naming each tool, its purpose, and the evidence to check on your own machine.",
      section: "A manifest, not a simulated installation",
      trap: "Writing 'installed' proves nothing. Describe an honest check, such as opening DevTools or confirming that the file really uses the .html extension."
    }
  },
  "html-00-create-index-file": {
    fr: {
      intro: "Nomme ton fichier index.html pour suivre une convention courante des sites web : de nombreux serveurs cherchent ce fichier quand on ouvre un dossier, selon leur configuration. En local, tu peux aussi ouvrir directement un fichier HTML portant un autre nom.",
      section: "Le premier fichier que les outils cherchent",
      trap: "Vérifie l'extension complète : index.html.txt reste un fichier .txt. Un nom comme page.html peut fonctionner, mais ne sera pas nécessairement choisi comme page d'accueil par ton hébergeur."
    },
    en: {
      intro: "Name your file index.html to follow a common website convention: many servers look for this file when a folder is requested, depending on their configuration. Locally, you can also open an HTML file with a different name directly.",
      section: "The first file tools look for",
      trap: "Check the full extension: index.html.txt is still a .txt file. A name such as page.html can work, but your host will not necessarily choose it as the home page."
    }
  },
  "html-00-open-in-browser": {
    fr: {
      intro: "Tu apprends le geste le plus important du débutant autonome : modifier, sauvegarder, recharger, observer. Le navigateur est ton premier lecteur de code, avant même les tests automatiques.",
      section: "La boucle modifier, sauvegarder, recharger",
      trap: "Si tu ne sauvegardes pas ou si tu regardes le mauvais fichier, tu peux croire que HTML ne fonctionne pas alors que le navigateur n'a simplement rien de nouveau à lire."
    },
    en: {
      intro: "You learn the most important habit for an autonomous beginner: edit, save, reload, observe. The browser is your first code reader, even before automated tests.",
      section: "The edit, save, reload loop",
      trap: "If you do not save or if you look at the wrong file, you may think HTML is broken when the browser simply has nothing new to read."
    }
  },
  "html-00-devtools-inspector": {
    fr: {
      intro: "Les DevTools te montrent ce que le navigateur a vraiment compris. C'est là que tu distingues le code écrit dans l'éditeur du DOM construit après interprétation.",
      section: "Voir la page comme le navigateur",
      trap: "Lire seulement l'aperçu visuel masque les erreurs de structure. L'inspecteur révèle les éléments, les attributs et les relations."
    },
    en: {
      intro: "DevTools show what the browser actually understood. This is where you distinguish the code written in the editor from the DOM built after interpretation.",
      section: "See the page as the browser does",
      trap: "Reading only the visual preview hides structural mistakes. The inspector reveals elements, attributes, and relationships."
    }
  },
  "html-00-read-tests": {
    fr: {
      intro: "Lis la consigne, puis les intitulés des tests avant de modifier ton code. Un test peut chercher une balise, un attribut ou un texte précis. Après chaque essai, rapproche le test qui échoue de l'élément concerné et corrige une chose à la fois.",
      section: "Relier un test à une partie du code",
      trap: "Des tests verts valident les points qu'ils contrôlent, pas toute la qualité de la page. Relis aussi ton contenu et essaie la navigation au clavier. Si un texte exact est demandé, vérifie les mots et les accents avant de changer la structure."
    },
    en: {
      intro: "Read the instructions and test labels before editing your code. A test may look for a tag, an attribute, or exact text. After each attempt, connect the failing test to the relevant element and fix one thing at a time.",
      section: "Connect a test to a part of the code",
      trap: "Passing tests validate the checks they perform, not every aspect of page quality. Review the content and try keyboard navigation too. If exact text is requested, check the words and accents before changing the structure."
    }
  },
  "html-01-doctype-standard-mode": {
    fr: {
      intro: "Tu ouvres le chantier PulsaConf par la décision la moins visible et pourtant la plus structurante : forcer le navigateur à interpréter la page en mode standard. Sans cette première ligne, un vieux comportement de compatibilité peut rendre les prochains tests moins fiables.",
      section: "Le contrat avec le navigateur",
      trap: "Commencer directement par html fonctionne parfois dans l'aperçu, mais ce n'est pas une base publiable : tu laisses le navigateur deviner le mode d'interprétation."
    },
    en: {
      intro: "You start the PulsaConf build with the least visible but most structural decision: forcing the browser to interpret the page in standards mode. Without that first line, old compatibility behavior can make later tests less reliable.",
      section: "The contract with the browser",
      trap: "Starting directly with html sometimes works in preview, but it is not a publishable base: you leave the interpretation mode to the browser."
    }
  },
  "html-01-root-lang": {
    fr: {
      intro: "L'attribut lang indique la langue principale du document. Les technologies d'assistance peuvent ainsi choisir une prononciation adaptée, et les outils de traduction ou de correction disposent d'un contexte explicite.",
      section: "Déclarer la langue du contenu",
      trap: "La langue ne se déduit pas de quelques mots visibles. Déclare-la sur l'élément html et change sa valeur si la version du document change de langue."
    },
    en: {
      intro: "The lang attribute declares the document's primary language. Assistive technologies can choose suitable pronunciation, while translation and writing tools receive explicit context.",
      section: "Declare the content language",
      trap: "Language is not inferred from a few visible words. Declare it on the html element and change its value when the document version changes language."
    }
  },
  "html-01-head-body-roles": {
    fr: {
      intro: "Head décrit le document et référence ses ressources ; body contient le document présenté à la personne. Le title appartient donc au head, tandis que le h1 et les paragraphes appartiennent au body.",
      section: "Métadonnées et contenu du document",
      trap: "Le contenu de head n'est pas simplement « invisible » : title apparaît dans l'onglet, l'historique et les favoris. Il ne remplace pourtant pas le h1 visible dans la page."
    },
    en: {
      intro: "The head describes the document and references its resources; the body contains the document presented to the user. The title therefore belongs in the head, while h1 and paragraphs belong in the body.",
      section: "Metadata and document content",
      trap: "Head content is not simply 'invisible': title appears in the tab, history, and bookmarks. It still does not replace the visible h1 in the page."
    }
  },
  "html-01-charset-utf8": {
    fr: {
      intro: "Meta charset indique au navigateur comment décoder les octets du fichier. La déclaration UTF-8 doit correspondre à l'encodage réel du fichier et être placée tôt dans head.",
      section: "Décoder le fichier correctement",
      trap: "Ajouter charset=\"UTF-8\" ne répare pas un fichier enregistré dans un autre encodage. La déclaration et l'enregistrement du fichier doivent être cohérents."
    },
    en: {
      intro: "Meta charset tells the browser how to decode the file's bytes. The UTF-8 declaration must match the file's actual encoding and appear early in the head.",
      section: "Decode the file correctly",
      trap: "Adding charset=\"UTF-8\" does not repair a file saved with another encoding. The declaration and the saved file must agree."
    }
  },
  "html-01-viewport-mobile": {
    fr: {
      intro: "La balise viewport demande au navigateur mobile d'utiliser la largeur réelle de l'appareil comme largeur de mise en page. Elle prépare le responsive, mais ne remplace ni des styles fluides ni des tests sur plusieurs écrans.",
      section: "Configurer la zone de mise en page mobile",
      trap: "Viewport ne rend pas automatiquement une page responsive. Un contenu trop large peut encore provoquer un débordement horizontal."
    },
    en: {
      intro: "The viewport meta asks mobile browsers to use the device width as the layout width. It prepares responsive design but does not replace fluid styles or testing across screen sizes.",
      section: "Configure the mobile layout viewport",
      trap: "Viewport does not automatically make a page responsive. Content that is too wide can still overflow horizontally."
    }
  },
  "html-01-title-description": {
    fr: {
      intro: "Title nomme la page dans l'onglet, l'historique et souvent les résultats de recherche ; il ne remplace pas le h1 visible. La meta description propose un résumé, mais un moteur peut choisir un autre extrait.",
      section: "Nommer et résumer la page",
      trap: "Un title générique comme « Accueil » ne distingue pas PulsaConf. Une description utile résume précisément la page sans promettre son affichage automatique dans les résultats."
    },
    en: {
      intro: "The title names the page in the tab, history, and often search results; it does not replace the visible h1. The meta description suggests a summary, but a search engine may choose a different snippet.",
      section: "Name and summarize the page",
      trap: "A generic title such as 'Home' does not identify PulsaConf. A useful description summarizes the page precisely without promising that search results will display it."
    }
  },
  "html-02-heading-outline": {
    fr: {
      intro: "Ici, PulsaConf cesse d'être une affiche et devient un document parcourable. Le plan h1, h2, h3 doit permettre de comprendre l'événement sans voir la mise en page finale.",
      section: "Le plan avant le design",
      trap: "Choisir un niveau de titre pour sa taille visuelle casse le plan. CSS changera la taille plus tard ; HTML doit d'abord porter la structure."
    },
    en: {
      intro: "Here, PulsaConf stops being a poster and becomes a navigable document. The h1, h2, h3 outline must make the event understandable without seeing the final layout.",
      section: "Outline before design",
      trap: "Choosing a heading level for its visual size breaks the outline. CSS can change size later; HTML must carry structure first."
    }
  },
  "html-02-paragraphs-emphasis": {
    fr: {
      intro: "Un paragraphe développe une idée complète. Strong signale une information importante ; em marque une insistance qui peut modifier la nuance d'une phrase quand on la lit à voix haute.",
      section: "Importance et insistance ne sont pas synonymes",
      trap: "Choisir strong ou em pour obtenir du gras ou de l'italique confond sens et apparence. CSS pourra modifier leur rendu sans changer leur rôle."
    },
    en: {
      intro: "A paragraph develops a complete idea. Strong marks important information; em marks stress that can change a sentence's nuance when read aloud.",
      section: "Importance and stress are not the same",
      trap: "Choosing strong or em to obtain bold or italic text confuses meaning with appearance. CSS can change their rendering without changing their role."
    }
  },
  "html-02-section-article-aside": {
    fr: {
      intro: "Section regroupe un thème nommé, article contient un élément autonome et aside apporte un complément. Ces balises ne remplacent pas mécaniquement tous les div : leur rôle dépend du contenu.",
      section: "Découper selon l'autonomie du contenu",
      trap: "Un article n'est pas simplement une carte visuelle. Il doit pouvoir être compris ou réutilisé avec son propre titre."
    },
    en: {
      intro: "Section groups a named topic, article contains a standalone item, and aside provides supplementary information. These elements do not mechanically replace every div: their role depends on the content.",
      section: "Divide content by independence",
      trap: "An article is not merely a visual card. It should remain understandable or reusable with its own heading."
    }
  },
  "html-02-quote-details": {
    fr: {
      intro: "Blockquote identifie une citation longue provenant d'une autre source ; cite peut nommer visiblement cette source. Details et summary créent une zone repliable native utilisable sans JavaScript.",
      section: "Source visible et contenu repliable",
      trap: "L'attribut cite porte une URL pour les outils, mais ne remplace pas une attribution visible. De même, summary doit annoncer clairement ce que details révélera."
    },
    en: {
      intro: "Blockquote identifies a long quotation from another source; cite can visibly name that source. Details and summary create a native disclosure that works without JavaScript.",
      section: "Visible source and expandable content",
      trap: "The cite attribute carries a URL for tools but does not replace visible attribution. Likewise, summary should clearly announce what details will reveal."
    }
  },
  "html-02-address-abbr-code": {
    fr: {
      intro: "Address contient les coordonnées liées au document ou à son auteur, abbr développe une abréviation et code identifie un fragment informatique. Chaque balise répond à une intention différente.",
      section: "Préciser les petits éléments de texte",
      trap: "Address ne sert pas à toutes les adresses postales et code ne sert pas à obtenir une police monospace. Utilise-les seulement quand leur sens correspond au contenu."
    },
    en: {
      intro: "Address contains contact details related to the document or its author, abbr expands an abbreviation, and code identifies a computer-code fragment. Each element serves a different purpose.",
      section: "Clarify small text elements",
      trap: "Address is not for every postal address, and code is not a shortcut for monospace styling. Use them only when their meaning matches the content."
    }
  },
  "html-03-explicit-link-text": {
    fr: {
      intro: "Le texte d'un lien doit annoncer sa destination ou son résultat même lorsqu'il est lu hors du paragraphe qui l'entoure. « Clique ici » décrit un geste, pas ce que la personne trouvera.",
      section: "Comprendre la destination avant d'activer",
      trap: "Un href réel ne compense pas un libellé vague. Relis le lien seul et vérifie qu'il reste compréhensible."
    },
    en: {
      intro: "Link text should announce its destination or outcome even when read outside its surrounding paragraph. 'Click here' describes a gesture, not what the person will find.",
      section: "Understand the destination before activation",
      trap: "A real href does not compensate for a vague label. Read the link by itself and check that it remains understandable."
    }
  },
  "html-03-internal-anchor": {
    fr: {
      intro: "Une ancre interne relie un href commençant par # à un id unique dans le même document. Le lien et sa cible forment un seul contrat : si l'un change, l'autre doit suivre.",
      section: "Relier un fragment à une cible unique",
      trap: "Un lien vers #register peut sembler correct dans le code tout en ne menant nulle part si l'id manque ou apparaît plusieurs fois."
    },
    en: {
      intro: "An internal anchor connects an href beginning with # to one unique id in the same document. The link and target form one contract: if one changes, the other must follow.",
      section: "Connect a fragment to one unique target",
      trap: "A link to #register may look correct in code while leading nowhere if the id is missing or duplicated."
    }
  },
  "html-03-nav-aria-label": {
    fr: {
      intro: "Nav identifie un groupe de liens importants. Un nom accessible devient particulièrement utile quand la page contient plusieurs zones de navigation, car il permet de distinguer la principale des autres.",
      section: "Nommer une région de navigation",
      trap: "Ajouter aria-label ne répare pas des liens morts. Chaque href interne doit encore résoudre un id unique dans la page."
    },
    en: {
      intro: "Nav identifies a group of important links. An accessible name becomes especially useful when a page has several navigation regions because it distinguishes the main one from the others.",
      section: "Name a navigation region",
      trap: "Adding aria-label does not repair dead links. Every internal href must still resolve to one unique id in the page."
    }
  },
  "html-03-current-external-safe": {
    fr: {
      intro: "Aria-current=\"location\" indique la position courante dans une page ; aria-current=\"page\" sert plutôt au document courant dans un ensemble de pages. Un nouvel onglet doit être annoncé et sa politique rel explicitée.",
      section: "État courant et changement de contexte",
      trap: "Target=_blank change le contexte de navigation. Si ce choix est nécessaire, préviens dans le libellé et utilise une politique rel cohérente ; noreferrer supprime aussi le referrer."
    },
    en: {
      intro: "Aria-current=\"location\" marks the current location within a page; aria-current=\"page\" is generally for the current document in a set of pages. A new tab should be announced and its rel policy made explicit.",
      section: "Current state and context changes",
      trap: "Target=_blank changes the browsing context. When that choice is necessary, warn in the label and use a consistent rel policy; noreferrer also removes referrer information."
    }
  },
  "html-03-contact-download-links": {
    fr: {
      intro: "Mailto, tel et download expriment trois actions différentes : préparer un email, lancer un appel sur un appareil compatible et proposer un fichier. Leur destination et leur libellé doivent rester explicites.",
      section: "Donner une action complète à chaque lien",
      trap: "Un protocole vide comme mailto: ou tel: est techniquement présent mais inutilisable. Un lien download doit aussi viser un fichier réel et nommé clairement."
    },
    en: {
      intro: "Mailto, tel, and download express three different actions: prepare an email, start a call on a compatible device, and offer a file. Their destination and label should remain explicit.",
      section: "Give every link a complete action",
      trap: "An empty protocol such as mailto: or tel: is technically present but unusable. A download link should also target a real file and name it clearly."
    }
  },
  "html-03-skip-link": {
    fr: {
      intro: "Cette étape ajoute un raccourci concret pour les personnes qui naviguent au clavier. Sur une vraie page événementielle, répéter tout le menu à chaque chargement devient vite pénible ; le skip link rend le contenu principal immédiat.",
      section: "Un raccourci qui change l'expérience",
      trap: "Un skip link vers une cible inexistante donne l'impression d'avoir pensé accessibilité, mais il ne rend aucun service. Le href et l'id doivent fonctionner ensemble."
    },
    en: {
      intro: "This step adds a concrete shortcut for keyboard users. On a real event page, repeating the whole menu on every load quickly becomes painful; the skip link makes main content immediate.",
      section: "A shortcut that changes the experience",
      trap: "A skip link pointing to a missing target looks like accessibility work, but helps nobody. The href and id must work together."
    }
  },
  "html-06-email-required": {
    fr: {
      intro: "Le champ email est le premier endroit où PulsaConf peut éviter une erreur de saisie coûteuse : enregistrer une adresse impossible à contacter. Le navigateur sait déjà vérifier le format si tu choisis le bon type et une contrainte claire.",
      section: "Validation native avant JavaScript",
      trap: "Un input de type texte avec le placeholder « email » peut sembler correct, mais il n'apporte ni validation native de l'adresse ni signal sémantique fiable."
    },
    en: {
      intro: "The email field is the first place where PulsaConf can prevent a costly input mistake: storing an address that cannot be contacted. The browser can already validate the format when you choose the correct type and a clear constraint.",
      section: "Native validation before JavaScript",
      trap: "A text input with an 'email' placeholder may look correct, but it provides neither native email validation nor a reliable semantic signal."
    }
  },
  "html-08-open-graph": {
    fr: {
      intro: "PulsaConf sera partagé avant d'être lu. Cette étape prépare la carte que les réseaux affichent : le titre, le résumé et l'image ne sont pas de simples décorations : ils déterminent si le lien sera compris.",
      section: "La page hors de ton site",
      trap: "Se contenter du title de l'onglet laisse souvent les réseaux inventer un aperçu pauvre ou incohérent."
    },
    en: {
      intro: "PulsaConf will be shared before it is read. This step prepares the card social networks display: the title, summary, and image are not decoration: they determine whether people understand the link.",
      section: "The page outside your site",
      trap: "Relying only on the tab title often lets social networks invent a poor or inconsistent preview."
    }
  },
  "html-09-final-project-pulsaconf": {
    fr: {
      intro: "Le projet final n'est pas un collage des corrections précédentes. Tu dois livrer une page PulsaConf cohérente : chaque zone a une raison, chaque lien mène quelque part, chaque formulaire explique ce qu'il attend, et le head permet de publier la page.",
      section: "Un livrable, pas une checklist",
      trap: "Empiler tous les éléments demandés sans cohérence peut faire passer quelques sélecteurs, mais échoue dès qu'on lit la page comme un utilisateur."
    },
    en: {
      intro: "The final project is not a paste-up of previous corrections. You must ship a coherent PulsaConf page: every region has a reason, every link leads somewhere, every form explains what it expects, and the head makes the page publishable.",
      section: "A deliverable, not a checklist",
      trap: "Stacking every requested element without coherence may satisfy some selectors, but fails as soon as the page is read like a user would."
    }
  }
};

const customGuides = {
  "html-09-final-project-pulsaconf": {
    fr: {
      objectives: ["Livrer une page événementielle complète, pas une collection d'extraits.", "Prouver navigation, médias, tableau, formulaire, feedback et SEO dans un même document.", "Justifier chaque correction avec un impact utilisateur ou publication."],
      steps: ["Commence par les landmarks et la navigation afin de fixer la carte de la page.", "Ajoute ensuite contenu, tableau, médias et formulaire en gardant les id stables.", "Termine par le head SEO/social, puis relis les tests comme un audit de livraison."],
      mistakes: ["Assembler les blocs dans le désordre sans vérifier les cibles des liens.", "Ajouter des attributs ARIA sans texte visible ni relation fonctionnelle.", "Valider le projet sans relire la page comme une personne qui découvre PulsaConf."]
    },
    en: {
      objectives: ["Ship a complete event page, not a collection of fragments.", "Prove navigation, media, table, form, feedback, and SEO in one document.", "Justify every correction with a user or publishing impact."],
      steps: ["Start with landmarks and navigation to fix the page map.", "Then add content, table, media, and form while keeping ids stable.", "Finish with the SEO/social head, then read tests as a release audit."],
      mistakes: ["Assembling blocks out of order without checking link targets.", "Adding ARIA attributes without visible text or functional relationships.", "Passing the project without reading the page as someone discovering PulsaConf."]
    }
  }
};

const onboardingExamples = {
  "html-00-what-html-does": {
    decision: T("<h1>PulsaConf 2026</h1>\n<p>Une journée pour apprendre le web.</p>", "<h1>PulsaConf 2026</h1>\n<p>A day to learn the web.</p>"),
    validation: T("<h1>PulsaConf 2026</h1>\n<p>Une journée pour apprendre le web.</p>", "<h1>PulsaConf 2026</h1>\n<p>A day to learn the web.</p>")
  },
  "html-00-install-toolkit": {
    decision: T("<dl>\n  <dt>Navigateur</dt>\n  <dd>Afficher la page et ouvrir les DevTools.</dd>\n</dl>", "<dl>\n  <dt>Browser</dt>\n  <dd>Display the page and open DevTools.</dd>\n</dl>"),
    validation: T("<p>Vérification locale : ouvrir les DevTools.</p>", "<p>Local check: open DevTools.</p>")
  },
  "html-00-create-index-file": {
    decision: T("<p>Nom à vérifier sur ton ordinateur : <code>index.html</code></p>", "<p>Name to check on your computer: <code>index.html</code></p>"),
    validation: T("<!-- Vérifie que le nom complet se termine par .html et non .html.txt -->", "<!-- Check that the full name ends in .html, not .html.txt. -->")
  },
  "html-00-open-in-browser": {
    decision: T("<ol>\n  <li>Modifier</li>\n  <li>Sauvegarder</li>\n  <li>Recharger</li>\n  <li>Observer</li>\n</ol>", "<ol>\n  <li>Edit</li>\n  <li>Save</li>\n  <li>Reload</li>\n  <li>Observe</li>\n</ol>"),
    validation: T("<p>Changement attendu : le nouveau titre apparaît après rechargement.</p>", "<p>Expected change: the new heading appears after reload.</p>")
  },
  "html-00-devtools-inspector": {
    decision: T("<p>Le code source est interprété pour construire le DOM.</p>", "<p>The source code is interpreted to build the DOM.</p>"),
    validation: T("<p>Dans l'inspecteur, repère le h1 et son texte.</p>", "<p>In the inspector, find the h1 and its text.</p>")
  },
  "html-00-read-tests": {
    decision: T("<h1>PulsaConf 2026</h1>\n<!-- Le test cherche un élément h1. -->", "<h1>PulsaConf 2026</h1>\n<!-- The test looks for an h1 element. -->"),
    validation: T("<p>Test en échec : texte attendu absent. Vérification : relire le contenu exact.</p>", "<p>Failing test: expected text is missing. Check: reread the exact content.</p>")
  },
  "html-01-doctype-standard-mode": {
    decision: T("<!doctype html>\n<html></html>", "<!doctype html>\n<html></html>"),
    validation: T("<!-- Le doctype est la première déclaration du document. -->", "<!-- The doctype is the document's first declaration. -->")
  },
  "html-01-root-lang": {
    decision: T('<html lang="fr">', '<html lang="en">'),
    validation: T('<html lang="fr">...</html>', '<html lang="en">...</html>')
  },
  "html-01-head-body-roles": {
    decision: T("<head><title>PulsaConf</title></head>\n<body><h1>PulsaConf</h1></body>", "<head><title>PulsaConf</title></head>\n<body><h1>PulsaConf</h1></body>"),
    validation: T("<body><main><h1>PulsaConf 2026</h1></main></body>", "<body><main><h1>PulsaConf 2026</h1></main></body>")
  },
  "html-01-charset-utf8": {
    decision: T('<meta charset="UTF-8" />', '<meta charset="UTF-8" />'),
    validation: T("<!-- Enregistre aussi le fichier en UTF-8. -->", "<!-- Save the file as UTF-8 too. -->")
  },
  "html-01-viewport-mobile": {
    decision: T('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'),
    validation: T("<!-- Vérifie ensuite le contenu sur plusieurs largeurs. -->", "<!-- Then check the content at several widths. -->")
  },
  "html-01-title-description": {
    decision: T("<title>PulsaConf 2026</title>\n<meta name=\"description\" content=\"Ateliers HTML accessibles.\" />", "<title>PulsaConf 2026</title>\n<meta name=\"description\" content=\"Accessible HTML workshops.\" />"),
    validation: T("<h1>PulsaConf 2026</h1>\n<!-- Le h1 reste visible dans la page. -->", "<h1>PulsaConf 2026</h1>\n<!-- The h1 remains visible in the page. -->")
  },
  "html-02-main-h1": {
    decision: T('<main id="main-content"><h1>Nom de la page</h1></main>', '<main id="main-content"><h1>Page name</h1></main>'),
    validation: T("<!-- Un seul contenu principal et un titre qui le nomme. -->", "<!-- One main content region and a heading that names it. -->")
  },
  "html-02-heading-outline": {
    decision: T("<h1>Événement</h1>\n<h2>Programme</h2>\n<h3>Atelier</h3>", "<h1>Event</h1>\n<h2>Program</h2>\n<h3>Workshop</h3>"),
    validation: T("<!-- Les niveaux décrivent l'imbrication, pas la taille. -->", "<!-- Levels describe nesting, not size. -->")
  },
  "html-02-paragraphs-emphasis": {
    decision: T("<p><strong>Inscription obligatoire.</strong> Viens avec <em>ton</em> ordinateur.</p>", "<p><strong>Registration is required.</strong> Bring <em>your own</em> computer.</p>"),
    validation: T("<!-- strong = importance ; em = insistance. -->", "<!-- strong = importance; em = stress. -->")
  },
  "html-02-section-article-aside": {
    decision: T("<section><h2>Programme</h2><article><h3>Atelier</h3></article></section>", "<section><h2>Program</h2><article><h3>Workshop</h3></article></section>"),
    validation: T("<aside>Information complémentaire.</aside>", "<aside>Supplementary information.</aside>")
  },
  "html-02-quote-details": {
    decision: T("<blockquote><p>Une citation longue.</p></blockquote>\n<p>Source : <cite>Guide éditorial</cite></p>", "<blockquote><p>A long quotation.</p></blockquote>\n<p>Source: <cite>Editorial guide</cite></p>"),
    validation: T("<details><summary>Question précise</summary><p>Réponse.</p></details>", "<details><summary>Specific question</summary><p>Answer.</p></details>")
  },
  "html-02-address-abbr-code": {
    decision: T('<p><abbr title="HyperText Markup Language">HTML</abbr> utilise des balises comme <code>main</code>.</p>', '<p><abbr title="HyperText Markup Language">HTML</abbr> uses elements such as <code>main</code>.</p>'),
    validation: T("<address><a href=\"mailto:equipe@example.com\">Contacter l'équipe</a></address>", "<address><a href=\"mailto:team@example.com\">Contact the team</a></address>")
  },
  "html-03-explicit-link-text": {
    decision: T('<a href="/programme">Consulter le programme détaillé</a>', '<a href="/program">Read the detailed program</a>'),
    validation: T("<!-- Le lien reste clair lorsqu'il est lu seul. -->", "<!-- The link remains clear when read on its own. -->")
  },
  "html-03-internal-anchor": {
    decision: T('<a href="#contact">Aller au contact</a>\n<section id="contact"><h2>Contact</h2></section>', '<a href="#contact">Go to contact</a>\n<section id="contact"><h2>Contact</h2></section>'),
    validation: T("<!-- Une valeur href correspond à un id unique. -->", "<!-- One href value matches one unique id. -->")
  },
  "html-03-nav-aria-label": {
    decision: T('<nav aria-label="Navigation principale"><a href="#programme">Programme</a></nav>', '<nav aria-label="Main navigation"><a href="#program">Program</a></nav>'),
    validation: T('<section id="programme"><h2>Programme</h2></section>', '<section id="program"><h2>Program</h2></section>')
  },
  "html-03-current-external-safe": {
    decision: T('<a href="#programme" aria-current="location">Programme</a>', '<a href="#program" aria-current="location">Program</a>'),
    validation: T('<a href="https://example.com" target="_blank" rel="noopener noreferrer">Documentation (nouvel onglet)</a>', '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Documentation (new tab)</a>')
  },
  "html-03-contact-download-links": {
    decision: T('<a href="mailto:equipe@example.com">Écrire à l’équipe</a>', '<a href="mailto:team@example.com">Email the team</a>'),
    validation: T('<a href="/programme.pdf" download>Télécharger le programme PDF</a>', '<a href="/program.pdf" download>Download the PDF program</a>')
  },
  "html-03-skip-link": {
    decision: T('<a href="#contenu">Aller au contenu</a>\n<main id="contenu">...</main>', '<a href="#content">Skip to content</a>\n<main id="content">...</main>'),
    validation: T("<!-- Test manuel : Tab, puis Entrée, doit atteindre le contenu. -->", "<!-- Manual test: Tab, then Enter, should reach the content. -->")
  },
  "html-04-informative-image-alt": {
    decision: T('<img src="plan.svg" alt="Les ateliers HTML ont lieu au premier étage" />', '<img src="map.svg" alt="HTML workshops are on the first floor" />'),
    validation: T("<!-- Masque l'image : son information reste-t-elle disponible ? -->", "<!-- Hide the image: is its information still available? -->")
  },
  "html-04-décorative-image-alt-empty": {
    decision: T('<h2><img src="ornement.svg" alt="" /> Programme</h2>', '<h2><img src="ornament.svg" alt="" /> Schedule</h2>'),
    validation: T("<!-- La décoration n'ajoute aucune information absente du texte. -->", "<!-- The decoration adds no information missing from the text. -->")
  },
  "html-04-figure-caption": {
    decision: T('<figure>\n  <img src="scene.svg" alt="Une oratrice répond au public" />\n  <figcaption>Questions après la conférence.</figcaption>\n</figure>', '<figure>\n  <img src="stage.svg" alt="A speaker answers the audience" />\n  <figcaption>Questions after the talk.</figcaption>\n</figure>'),
    validation: T("<!-- Alt remplace l'image ; figcaption légende le groupe. -->", "<!-- Alt replaces the image; figcaption captions the group. -->")
  },
  "html-04-lazy-dimensions": {
    decision: T('<img src="galerie.svg" alt="Deux participants comparent leur code" width="640" height="360" loading="lazy" />', '<img src="gallery.svg" alt="Two attendees compare their code" width="640" height="360" loading="lazy" />'),
    validation: T("<!-- Le ratio est réservé avant le chargement de l'image. -->", "<!-- The ratio is reserved before the image loads. -->")
  },
  "html-04-audio-fallback": {
    decision: T('<audio controls><source src="annonce.wav" type="audio/wav" /></audio>\n<a href="annonce.wav" download>Télécharger l’annonce</a>', '<audio controls><source src="announcement.wav" type="audio/wav" /></audio>\n<a href="announcement.wav" download>Download the announcement</a>'),
    validation: T("<p>Transcription : accueil à 9 h dans le hall.</p>", "<p>Transcript: check-in starts at 9 in the lobby.</p>")
  },
  "html-04-video-captions": {
    decision: T('<track kind="captions" src="interview-fr.vtt" srclang="fr" label="Français" default />', '<track kind="captions" src="interview-en.vtt" srclang="en" label="English" default />'),
    validation: T("<!-- Active la piste et vérifie le fichier VTT pendant la lecture. -->", "<!-- Enable the track and verify the VTT file during playback. -->")
  },
  "html-05-unordered-benefits": {
    decision: T("<ul>\n  <li>Documentation incluse</li>\n  <li>Exercices guidés</li>\n</ul>", "<ul>\n  <li>Documentation included</li>\n  <li>Guided exercises</li>\n</ul>"),
    validation: T("<!-- Inverser les éléments ne change pas leur sens. -->", "<!-- Reversing the items does not change their meaning. -->")
  },
  "html-05-ordered-steps": {
    decision: T("<ol>\n  <li>Choisir une session</li>\n  <li>Confirmer son billet</li>\n</ol>", "<ol>\n  <li>Choose a session</li>\n  <li>Confirm the ticket</li>\n</ol>"),
    validation: T("<!-- L'ordre décrit une procédure réelle. -->", "<!-- The order describes a real procedure. -->")
  },
  "html-05-definition-list": {
    decision: T("<dl>\n  <dt>DOM</dt>\n  <dd>Représentation du document interprété.</dd>\n</dl>", "<dl>\n  <dt>DOM</dt>\n  <dd>Representation of the interpreted document.</dd>\n</dl>"),
    validation: T("<!-- Chaque dt est suivi de sa définition dd. -->", "<!-- Each dt is followed by its dd definition. -->")
  },
  "html-05-table-caption": {
    decision: T("<table>\n  <caption>Tarifs par atelier</caption>\n  <tr><th>Atelier</th><th>Tarif</th></tr>\n  <tr><td>HTML</td><td>Gratuit</td></tr>\n</table>", "<table>\n  <caption>Prices by workshop</caption>\n  <tr><th>Workshop</th><th>Price</th></tr>\n  <tr><td>HTML</td><td>Free</td></tr>\n</table>"),
    validation: T("<!-- Le caption nomme les données croisées. -->", "<!-- The caption names the intersecting data. -->")
  },
  "html-05-thead-tbody-scope": {
    decision: T('<thead><tr><th scope="col">Atelier</th><th scope="col">Salle</th></tr></thead>', '<thead><tr><th scope="col">Workshop</th><th scope="col">Room</th></tr></thead>'),
    validation: T("<!-- Les lignes de données restent dans tbody. -->", "<!-- Data rows remain inside tbody. -->")
  },
  "html-05-time-data": {
    decision: T('<time datetime="2026-09-18T14:00">14 h</time>\n<data value="40">40 places</data>', '<time datetime="2026-09-18T14:00">2:00 PM</time>\n<data value="40">40 seats</data>'),
    validation: T("<!-- La valeur machine et le libellé humain décrivent la même donnée. -->", "<!-- The machine value and human label describe the same data. -->")
  },
  "html-06-form-action-method": {
    decision: T('<form action="/inscriptions" method="post"></form>', '<form action="/registrations" method="post"></form>'),
    validation: T("<!-- POST crée une nouvelle inscription sur cette destination. -->", "<!-- POST creates a new registration at this destination. -->")
  },
  "html-06-label-input-text": {
    decision: T('<label for="display-name">Nom affiché</label>\n<input id="display-name" name="displayName" autocomplete="nickname" />', '<label for="display-name">Display name</label>\n<input id="display-name" name="displayName" autocomplete="nickname" />'),
    validation: T("<!-- Cliquer le label place le focus dans son contrôle unique. -->", "<!-- Clicking the label focuses its unique control. -->")
  },
  "html-06-email-required": {
    decision: T('<label for="contact-email">Adresse de contact</label>\n<input id="contact-email" name="contactEmail" type="email" autocomplete="email" required />', '<label for="contact-email">Contact address</label>\n<input id="contact-email" name="contactEmail" type="email" autocomplete="email" required />'),
    validation: T("<!-- Le navigateur contrôle le format et exige une valeur. -->", "<!-- The browser checks the format and requires a value. -->")
  },
  "html-06-textarea-select": {
    decision: T('<select id="meal" name="meal" required><option value="">Choisir</option><option value="vegetarian">Végétarien</option></select>\n<textarea id="details" name="details" rows="3"></textarea>', '<select id="meal" name="meal" required><option value="">Choose</option><option value="vegetarian">Vegetarian</option></select>\n<textarea id="details" name="details" rows="3"></textarea>'),
    validation: T("<!-- select limite les choix ; textarea accepte une réponse libre. -->", "<!-- select limits choices; textarea accepts a free response. -->")
  },
  "html-06-radio-checkbox": {
    decision: T('<p>Format</p><label><input type="radio" name="format" value="onsite" /> Sur place</label><label><input type="radio" name="format" value="remote" /> À distance</label>', '<p>Format</p><label><input type="radio" name="format" value="onsite" /> On site</label><label><input type="radio" name="format" value="remote" /> Remote</label>'),
    validation: T("<!-- Le name partagé rend les deux radios exclusifs. -->", "<!-- The shared name makes the two radio buttons mutually exclusive. -->")
  },
  "html-06-submit-button": {
    decision: T('<button type="submit">Réserver ma place</button>', '<button type="submit">Reserve my seat</button>'),
    validation: T("<!-- Le texte annonce le résultat de l'envoi. -->", "<!-- The text announces the submission outcome. -->")
  },
  "html-07-help-describedby": {
    decision: T('<p id="password-help">12 caractères minimum.</p>\n<input aria-describedby="password-help" />', '<p id="password-help">At least 12 characters.</p>\n<input aria-describedby="password-help" />'),
    validation: T("<!-- La référence vise un id présent et unique. -->", "<!-- The reference targets one present, unique id. -->")
  },
  "html-07-error-message": {
    decision: T('<input aria-invalid="true" aria-describedby="email-help email-error" />\n<p id="email-error" role="alert">Adresse invalide.</p>', '<input aria-invalid="true" aria-describedby="email-help email-error" />\n<p id="email-error" role="alert">Invalid address.</p>'),
    validation: T("<!-- Cet état n'est inséré qu'après une validation échouée. -->", "<!-- This state is inserted only after failed validation. -->")
  },
  "html-07-fieldset-legend": {
    decision: T('<fieldset><legend>Mode de participation</legend><label><input type="radio" name="mode" /> Sur place</label></fieldset>', '<fieldset><legend>Attendance mode</legend><label><input type="radio" name="mode" /> On site</label></fieldset>'),
    validation: T("<!-- La legend nomme toute la question, pas une seule option. -->", "<!-- The legend names the whole question, not one option. -->")
  },
  "html-07-disabled-state": {
    decision: T('<fieldset disabled aria-describedby="reason"><legend>Option à venir</legend></fieldset>\n<p id="reason">Disponible après confirmation.</p>', '<fieldset disabled aria-describedby="reason"><legend>Upcoming option</legend></fieldset>\n<p id="reason">Available after confirmation.</p>'),
    validation: T("<!-- L'explication reste visible hors du groupe désactivé. -->", "<!-- The explanation remains visible outside the disabled group. -->")
  },
  "html-07-status-live": {
    decision: T('<p id="save-status" role="status" aria-live="polite" aria-atomic="true"></p>', '<p id="save-status" role="status" aria-live="polite" aria-atomic="true"></p>'),
    validation: T("<!-- Le JavaScript modifiera le texte de cette région persistante. -->", "<!-- JavaScript will update the text of this persistent region. -->")
  },
  "html-07-busy-alert": {
    decision: T('<section aria-busy="true"><p role="status">Chargement…</p></section>\n<section aria-busy="false"><p role="alert">Échec, réessaie.</p></section>', '<section aria-busy="true"><p role="status">Loading…</p></section>\n<section aria-busy="false"><p role="alert">Failed, try again.</p></section>'),
    validation: T("<!-- Busy décrit l'attente ; alert annonce l'échec qui exige une action. -->", "<!-- Busy describes waiting; alert announces the failure requiring action. -->")
  },
  "html-08-seo-title": {
    decision: T("<title>Guide HTML - Exercices accessibles</title>", "<title>HTML guide - Accessible exercises</title>"),
    validation: T("<!-- Le title identifie la ressource hors de la page. -->", "<!-- The title identifies the resource outside the page. -->")
  },
  "html-08-meta-description": {
    decision: T('<meta name="description" content="Exercices HTML guidés pour construire une page accessible." />', '<meta name="description" content="Guided HTML exercises for building an accessible page." />'),
    validation: T("<!-- Le résumé décrit uniquement le contenu réellement visible. -->", "<!-- The summary describes only content that is actually visible. -->")
  },
  "html-08-canonical": {
    decision: T('<link rel="canonical" href="https://example.com/guide-html" />', '<link rel="canonical" href="https://example.com/en/html-guide" />'),
    validation: T("<!-- Une seule URL absolue représente cette version. -->", "<!-- One absolute URL represents this version. -->")
  },
  "html-08-open-graph": {
    decision: T('<meta property="og:title" content="Guide HTML accessible" />\n<meta property="og:image" content="https://example.com/assets/guide.png" />', '<meta property="og:title" content="Accessible HTML guide" />\n<meta property="og:image" content="https://example.com/assets/guide.png" />'),
    validation: T("<!-- Les valeurs restent cohérentes avec title et le contenu visible. -->", "<!-- Values remain consistent with title and visible content. -->")
  },
  "html-08-favicon-hreflang": {
    decision: T('<link rel="alternate" hreflang="fr" href="https://example.com/guide" />\n<link rel="alternate" hreflang="en" href="https://example.com/en/guide" />', '<link rel="alternate" hreflang="fr" href="https://example.com/guide" />\n<link rel="alternate" hreflang="en" href="https://example.com/en/guide" />'),
    validation: T("<!-- Chaque code de langue pointe vers sa propre URL absolue. -->", "<!-- Each language code points to its own absolute URL. -->")
  },
  "html-08-json-ld": {
    decision: T('<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"Atelier HTML","startDate":"2026-09-18"}</script>', '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"HTML workshop","startDate":"2026-09-18"}</script>'),
    validation: T("<!-- Le JSON est valide et décrit le même événement que la page. -->", "<!-- The JSON is valid and describes the same event as the page. -->")
  },
  "html-09-assemble-shell": {
    decision: T('<a href="#main">Aller au contenu</a>\n<header>…</header><main id="main">…</main><footer>…</footer>', '<a href="#main">Skip to content</a>\n<header>…</header><main id="main">…</main><footer>…</footer>'),
    validation: T("<!-- Vérifie doctype, langue, cible du raccourci et ordre des landmarks. -->", "<!-- Check doctype, language, skip-link target, and landmark order. -->")
  },
  "html-09-assemble-navigation": {
    decision: T('<nav aria-label="Navigation principale"><a href="#programme" aria-current="location">Programme</a></nav>', '<nav aria-label="Main navigation"><a href="#program" aria-current="location">Program</a></nav>'),
    validation: T("<!-- Chaque fragment vise un id présent et unique. -->", "<!-- Every fragment targets one present, unique id. -->")
  },
  "html-09-assemble-content": {
    decision: T('<section aria-labelledby="planning-title"><h2 id="planning-title">Planning</h2><table>…</table></section>', '<section aria-labelledby="schedule-title"><h2 id="schedule-title">Schedule</h2><table>…</table></section>'),
    validation: T("<!-- Relis le plan, les alternatives, les légendes et les relations du tableau. -->", "<!-- Review the outline, alternatives, captions, and table relationships. -->")
  },
  "html-09-assemble-form-media": {
    decision: T('<label for="contact-email">Email</label><input id="contact-email" name="email" type="email" />', '<label for="contact-email">Email</label><input id="contact-email" name="email" type="email" />'),
    validation: T("<!-- Le formulaire initial reste sans erreur ; les instantanés dynamiques sont séparés. -->", "<!-- The initial form remains error-free; dynamic snapshots are separate. -->")
  },
  "html-09-audit-antipatterns": {
    decision: T('<footer id="contact"><address><a href="mailto:equipe@example.com">Écrire à l’équipe</a></address></footer>', '<footer id="contact"><address><a href="mailto:team@example.com">Email the team</a></address></footer>'),
    validation: T("<!-- Refuse id dupliqué, cible absente, href factice et libellé vague. -->", "<!-- Reject duplicate ids, missing targets, fake href values, and vague labels. -->")
  }
};

const lessonHints = {
  "html-00-what-html-does": P("Transforme le nom de l'événement en h1 et sa présentation en p. N'ajoute ni style ni script.", "Turn the event name into an h1 and its introduction into a p. Add neither styles nor scripts."),
  "html-00-install-toolkit": P("Utilise un couple dt/dd par outil : son nom dans dt, puis son rôle et une vérification locale dans dd.", "Use one dt/dd pair per tool: its name in dt, then its purpose and a local check in dd."),
  "html-00-create-index-file": P("L'éditeur ne renomme pas réellement le fichier : affiche index.html dans code, puis vérifie ce nom et son extension sur ton ordinateur.", "The editor does not actually rename the file: show index.html in code, then verify that name and extension on your computer."),
  "html-00-open-in-browser": P("Il manque quatre actions dans l'ordre : modifier, sauvegarder, recharger, observer.", "Four ordered actions are missing: edit, save, reload, observe."),
  "html-00-devtools-inspector": P("Explique ce que l'inspecteur révèle en plus de l'aperçu : le DOM, les éléments et leurs attributs.", "Explain what the inspector reveals beyond the preview: the DOM, elements, and their attributes."),
  "html-00-read-tests": P("Dans ta réponse, nomme les trois formes de preuve utilisées ici : un sélecteur, un texte attendu et un contenu interdit.", "In your answer, name the three forms of evidence used here: a selector, expected text, and forbidden content."),
  "html-03-explicit-link-text": P("Lis le lien sans son contexte : son texte doit encore annoncer qu'il ouvre la formation HTML.", "Read the link without its context: its text should still announce that it opens the HTML course."),
  "html-03-internal-anchor": P("Fais correspondre exactement href=\"#register\" avec un seul id=\"register\".", "Match href=\"#register\" exactly with one id=\"register\"."),
  "html-03-nav-aria-label": P("Nomme nav, puis vérifie que #program, #speakers et #register existent chacun une seule fois.", "Name the nav, then check that #program, #speakers, and #register each exist exactly once."),
  "html-03-current-external-safe": P("Utilise location pour l'ancre courante. Sur le lien externe, annonce le nouvel onglet et complète rel.", "Use location for the current anchor. On the external link, announce the new tab and complete rel."),
  "html-03-contact-download-links": P("Contrôle ensemble le protocole ou le fichier, la destination non vide et le texte de chaque lien.", "Check the protocol or file, nonempty destination, and text of each link together."),
  "html-03-skip-link": P("Place le lien vers #main-content avant le header et vérifie que main porte exactement cet id.", "Place the link to #main-content before the header and check that main has exactly that id."),
  "html-05-unordered-benefits": P("Regroupe les trois bénéfices dans un ul : aucun ne dépend de la position des autres.", "Group the three benefits in a ul: none depends on the position of the others."),
  "html-05-ordered-steps": P("Utilise ol pour conserver la séquence choisir, renseigner, confirmer.", "Use ol to preserve the choose, enter, confirm sequence."),
  "html-05-definition-list": P("Écris chaque terme dans dt et sa définition immédiatement après dans dd.", "Put each term in dt and its definition immediately after it in dd."),
  "html-05-table-caption": P("Le caption doit annoncer précisément que le tableau croise horaires et ateliers PulsaConf.", "The caption should state precisely that the table crosses PulsaConf times and workshops."),
  "html-05-thead-tbody-scope": P("Place les th dans thead avec scope=\"col\", puis les lignes de valeurs dans tbody.", "Put th elements in thead with scope=\"col\", then value rows in tbody."),
  "html-05-time-data": P("Conserve le texte visible, puis ajoute datetime à time et value à data pour sa valeur normalisée.", "Keep the visible text, then add datetime to time and value to data for its normalized value."),
  "html-06-form-action-method": P("Ajoute un unique form dans #register, avec l'endpoint exact dans action et method=\"post\".", "Add one form inside #register, with the exact endpoint in action and method=\"post\"."),
  "html-06-label-input-text": P("La valeur de for doit correspondre exactement à l'id unique du champ ; name détermine la clé envoyée.", "The for value must exactly match the field's unique id; name determines the submitted key."),
  "html-06-email-required": P("Conserve le label visible puis combine type=\"email\", name, autocomplete et required sur le même input.", "Keep the visible label, then combine type=\"email\", name, autocomplete, and required on the same input."),
  "html-06-textarea-select": P("Donne un label et un name à chaque contrôle ; laisse la première option required avec une value vide.", "Give each control a label and name; keep the required first option with an empty value."),
  "html-06-radio-checkbox": P("Partage le name des radios, distingue leurs value et donne une value explicite à la checkbox ; le groupement accessible arrive à l'étape suivante.", "Share the radio name, distinguish their values, and give the checkbox an explicit value; accessible grouping comes in the next step."),
  "html-06-submit-button": P("Ajoute un button type=\"submit\" après les contrôles et remplace les libellés vagues par le résultat attendu.", "Add a type=\"submit\" button after the controls and replace vague labels with the expected outcome."),
  "html-07-help-describedby": P("Ajoute email-help dans le DOM puis la même valeur comme jeton de aria-describedby sur #email.", "Add email-help to the DOM, then use the same value as an aria-describedby token on #email."),
  "html-07-error-message": P("Laisse le formulaire initial intact ; place aria-invalid, email-error et role=\"alert\" uniquement dans le template d'échec.", "Keep the initial form pristine; put aria-invalid, email-error, and role=\"alert\" only in the failure template."),
  "html-07-fieldset-legend": P("Remplace le div du niveau par fieldset et son texte de question par legend, sans changer les name/value des radios.", "Replace the level div with fieldset and its question text with legend without changing radio names or values."),
  "html-07-disabled-state": P("Désactive le fieldset entier et relie-le à waitlist-help, placé après le groupe pour rester lisible.", "Disable the entire fieldset and connect it to waitlist-help, placed after the group so it remains readable."),
  "html-07-status-live": P("Crée une région vide persistante avec role=\"status\", aria-live=\"polite\" et aria-atomic=\"true\" après le bouton.", "Create an empty persistent region with role=\"status\", aria-live=\"polite\", and aria-atomic=\"true\" after the button."),
  "html-07-busy-alert": P("Décris deux instantanés distincts : aria-busy=true pendant l'envoi, puis aria-busy=false avec role=\"alert\" en cas d'échec.", "Describe two separate snapshots: aria-busy=true during submission, then aria-busy=false with role=\"alert\" on failure."),
  "html-08-seo-title": P("Remplace le title générique par un intitulé unique qui combine PulsaConf 2026 et la proposition des ateliers.", "Replace the generic title with a unique label combining PulsaConf 2026 and the workshop proposition."),
  "html-08-meta-description": P("Ajoute une seule meta description dans head et résume HTML, accessibilité et publication sans promesse absente de la page.", "Add one meta description in head and summarize HTML, accessibility, and publishing without promises absent from the page."),
  "html-08-canonical": P("Utilise une URL HTTPS absolue différente pour la version française et la version anglaise documentaires.", "Use a distinct absolute HTTPS URL for the French and English documentation versions."),
  "html-08-open-graph": P("Ajoute og:title, og:description, og:url et og:image ; les URL de partage doivent être absolues.", "Add og:title, og:description, og:url, and og:image; sharing URLs must be absolute."),
  "html-08-favicon-hreflang": P("Conserve le favicon local puis relie fr et en à leurs deux URL absolues respectives.", "Keep the local favicon, then connect fr and en to their respective absolute URLs."),
  "html-08-json-ld": P("Écris un objet JSON valide de type Event avec name, description, startDate, inLanguage et location cohérents.", "Write valid Event JSON with consistent name, description, startDate, inLanguage, and location."),
  "html-09-assemble-shell": P("Conserve le head publié, puis établis un seul header, un main ciblé par le raccourci et un footer placé dans cet ordre.", "Keep the published head, then establish one header, a main targeted by the skip link, and a footer in that order."),
  "html-09-assemble-navigation": P("Ajoute cinq destinations internes présentes et uniques, puis garde aria-current=\"location\" sur Programme.", "Add five present, unique internal destinations, then keep aria-current=\"location\" on Program."),
  "html-09-assemble-content": P("Remplis programme, intervenants et planning sans changer leurs id : articles, listes, médias légendés, captions et tableau structuré.", "Fill program, speakers, and schedule without changing their ids: articles, lists, captioned media, captions, and a structured table."),
  "html-09-assemble-form-media": P("Complète #register avec des contrôles nommés, une aide résolue, un statut poli vide et des templates séparés pour invalid et busy.", "Complete #register with named controls, resolved help, an empty polite status, and separate templates for invalid and busy states."),
  "html-09-audit-antipatterns": P("Lance l'audit transversal, puis termine le footer avec un mailto localisé et le téléchargement du programme.", "Run the cross-cutting audit, then finish the footer with a localized mailto link and program download.")
};

const moduleNarratives = {
  "00": {
    fr: {
      section: "Construire une méthode de travail fiable",
      context: "Avant les balises, tu mets en place une boucle courte : modifier, sauvegarder, observer, inspecter puis vérifier. Cette discipline évite de confondre une erreur de fichier, de navigateur ou de consigne avec un problème HTML.",
      decisionTitle: "Décision de méthode",
      decision: "Chaque outil doit répondre à une question précise : l'éditeur montre le fichier écrit, le navigateur montre le rendu et les DevTools montrent le DOM réellement interprété.",
      validationTitle: "Preuve de fonctionnement",
      validation: "Une étape est validée lorsque tu peux nommer le fichier concerné, reproduire le résultat dans le navigateur et relier un test à une preuve observable."
    },
    en: {
      section: "Build a reliable working method",
      context: "Before writing tags, establish a short loop: edit, save, observe, inspect, then verify. This discipline prevents file, browser, or instruction mistakes from being confused with HTML problems.",
      decisionTitle: "Workflow decision",
      decision: "Each tool must answer a precise question: the editor shows the file you wrote, the browser shows the rendered result, and DevTools show the DOM that was actually interpreted.",
      validationTitle: "Evidence that it works",
      validation: "A step is complete when you can name the relevant file, reproduce the result in the browser, and connect a test to observable evidence."
    }
  },
  "html-04-informative-image-alt": {
    fr: {
      intro: "Une image informative a besoin d'une alternative qui remplace l'information utile, sans annoncer inutilement « image de ». Décris ce que la personne doit comprendre dans ce contexte précis.",
      section: "Remplacer l'information, pas décrire chaque pixel",
      trap: "Le nom du fichier, « photo » ou un alt vide ne remplacent pas une image informative. L'alternative doit rester concise et contextuelle."
    },
    en: {
      intro: "An informative image needs an alternative that replaces its useful information without unnecessarily announcing 'image of.' Describe what someone should understand in this specific context.",
      section: "Replace information, not every pixel",
      trap: "A filename, 'photo,' or an empty alt does not replace an informative image. The alternative should remain concise and contextual."
    }
  },
  "html-04-décorative-image-alt-empty": {
    fr: {
      intro: "Une décoration qui n'ajoute aucune information doit rester silencieuse pour les technologies d'assistance. L'attribut alt doit être présent mais vide : alt=\"\".",
      section: "Rendre une décoration silencieuse",
      trap: "Omettre alt n'équivaut pas à alt vide : certains outils peuvent alors annoncer le nom du fichier. Ne rends jamais silencieuse une image qui porte une information."
    },
    en: {
      intro: "A decoration that adds no information should remain silent to assistive technologies. The alt attribute should be present but empty: alt=\"\".",
      section: "Make decoration silent",
      trap: "Omitting alt is not equivalent to an empty alt: some tools may announce the filename. Never silence an image that carries information."
    }
  },
  "html-04-figure-caption": {
    fr: {
      intro: "Alt remplace l'information de l'image lorsqu'elle n'est pas disponible ; figcaption ajoute une légende visible au groupe. Une légende ne remplace donc pas automatiquement l'alternative d'une image informative.",
      section: "Alternative et légende ont deux rôles",
      trap: "Répéter exactement la même phrase dans alt et figcaption crée une redondance. Fais-les se compléter."
    },
    en: {
      intro: "Alt replaces image information when the image is unavailable; figcaption adds a visible caption to the group. A caption therefore does not automatically replace the alternative for an informative image.",
      section: "Alternative and caption have different roles",
      trap: "Repeating exactly the same sentence in alt and figcaption creates redundancy. Make them complement each other."
    }
  },
  "html-04-lazy-dimensions": {
    fr: {
      intro: "Width et height réservent le bon ratio avant le chargement et limitent les déplacements de mise en page. Loading=\"lazy\" convient aux images secondaires hors écran, pas à l'image principale visible immédiatement.",
      section: "Stabilité d'abord, chargement différé ensuite",
      trap: "Appliquer lazy à toutes les images peut retarder l'image principale et dégrader le LCP. Choisis-le selon la position et la priorité du média."
    },
    en: {
      intro: "Width and height reserve the correct ratio before loading and reduce layout shifts. Loading=\"lazy\" suits secondary off-screen images, not the main image visible immediately.",
      section: "Stability first, deferred loading second",
      trap: "Applying lazy to every image can delay the main image and harm LCP. Choose it according to media position and priority."
    }
  },
  "html-04-audio-fallback": {
    fr: {
      intro: "Controls laisse la personne lancer, mettre en pause et régler l'audio. Un lien visible hors de l'élément audio permet de récupérer le fichier, et une transcription restitue l'information parlée sans écoute.",
      section: "Écouter, télécharger ou lire",
      trap: "Un lien placé seulement dans le contenu de fallback de audio peut rester caché dans les navigateurs qui prennent audio en charge. Garde le téléchargement visible à côté du lecteur."
    },
    en: {
      intro: "Controls lets someone play, pause, and adjust audio. A visible link outside the audio element provides the file, and a transcript preserves spoken information without listening.",
      section: "Listen, download, or read",
      trap: "A link placed only inside audio fallback content may remain hidden in browsers that support audio. Keep the download visible beside the player."
    }
  },
  "html-04-video-captions": {
    fr: {
      intro: "Une piste kind=\"captions\" doit indiquer son fichier, sa langue et son libellé. Les captions couvrent les paroles et les sons utiles ; la transcription rend aussi l'information consultable hors du lecteur.",
      section: "Synchroniser image, son et équivalents textuels",
      trap: "Un label français avec srclang=\"en\", ou une piste absente, donne une option trompeuse. Vérifie les métadonnées et ouvre réellement le fichier VTT."
    },
    en: {
      intro: "A kind=\"captions\" track should declare its file, language, and label. Captions cover speech and useful sounds; a transcript also makes the information available outside the player.",
      section: "Synchronize image, sound, and text equivalents",
      trap: "A French label with srclang=\"en\", or a missing track, provides a misleading option. Verify the metadata and open the VTT file itself."
    }
  },
  "01": {
    fr: {
      section: "Établir le contrat du document",
      context: "Le squelette HTML fixe les règles de lecture avant le contenu : mode standard, langue, encodage, viewport et séparation entre métadonnées et contenu visible.",
      decisionTitle: "Décision de structure",
      decision: "Place chaque information dans la zone qui lui donne son rôle. Le head décrit la ressource ; le body porte ce que la personne consulte et utilise.",
      validationTitle: "Contrôle du document",
      validation: "Inspecte le code source et le DOM : les déclarations doivent être uniques, placées au bon niveau et compréhensibles sans dépendre du rendu visuel."
    },
    en: {
      section: "Establish the document contract",
      context: "The HTML skeleton defines reading rules before content: standards mode, language, encoding, viewport, and the separation between metadata and visible content.",
      decisionTitle: "Structural decision",
      decision: "Put each piece of information in the area that gives it meaning. The head describes the resource; the body contains what people read and use.",
      validationTitle: "Document check",
      validation: "Inspect both source and DOM: declarations must be unique, placed at the correct level, and understandable without relying on visual rendering."
    }
  },
  "02": {
    fr: {
      section: "Transformer le contenu en plan lisible",
      context: "La sémantique ne consiste pas à remplacer tous les div par d'autres balises. Elle consiste à identifier le rôle réel de chaque contenu et les relations qui organisent sa lecture.",
      decisionTitle: "Décision éditoriale et sémantique",
      decision: "Commence par le plan des titres, puis choisis l'élément natif qui correspond à l'autonomie ou à la fonction du bloc : section, article, aside, citation ou information de contact.",
      validationTitle: "Lecture sans mise en forme",
      validation: "Relis la page comme un plan textuel. L'ordre des titres et les limites des sections doivent expliquer PulsaConf même lorsque CSS et JavaScript sont absents."
    },
    en: {
      section: "Turn content into a readable outline",
      context: "Semantics is not about replacing every div with another tag. It is about identifying the real role of each piece of content and the relationships that organize its reading.",
      decisionTitle: "Editorial and semantic decision",
      decision: "Start with the heading outline, then choose the native element that matches the block's independence or purpose: section, article, aside, quotation, or contact information.",
      validationTitle: "Read without styling",
      validation: "Read the page as a text outline. Heading order and section boundaries must explain PulsaConf even when CSS and JavaScript are absent."
    }
  },
  "03": {
    fr: {
      section: "Rendre chaque destination prévisible",
      context: "Un lien est une promesse de destination ou d'action. Son texte, son URL et son état doivent permettre de savoir ce qui va se passer avant de l'activer.",
      decisionTitle: "Décision de navigation",
      decision: "Utilise un lien pour changer de ressource ou de position, un bouton pour déclencher une action, et conserve des libellés explicites hors de leur contexte visuel.",
      validationTitle: "Parcours clavier et destinations",
      validation: "Parcours tous les liens au clavier, vérifie chaque cible et relis leur texte isolément. Aucun libellé ne doit dépendre de « ici », d'une icône seule ou d'une destination factice."
    },
    en: {
      section: "Make every destination predictable",
      context: "A link is a promise of a destination or action. Its text, URL, and state should reveal what will happen before it is activated.",
      decisionTitle: "Navigation decision",
      decision: "Use a link to change resource or location, a button to trigger an action, and keep labels explicit when removed from their visual context.",
      validationTitle: "Keyboard path and destinations",
      validation: "Visit every link with the keyboard, verify each target, and read link text in isolation. No label should depend on “here,” an icon alone, or a fake destination."
    }
  },
  "04": {
    fr: {
      section: "Choisir l'expérience de remplacement",
      context: "Un média peut informer, illustrer ou décorer. Sa fonction détermine l'alternative textuelle, la légende, les contrôles et la stratégie de chargement à fournir.",
      decisionTitle: "Décision média",
      decision: "Décris l'information que la personne perdrait sans le média. Si aucune information n'est perdue, rends la décoration silencieuse au lieu de répéter une description inutile.",
      validationTitle: "Contrôle sans image ni son",
      validation: "Teste la page sans charger les images puis sans écouter l'audio. Le sens, les commandes et les informations importantes doivent rester disponibles."
    },
    en: {
      section: "Choose the replacement experience",
      context: "Media can inform, illustrate, or decorate. Its purpose determines the text alternative, caption, controls, and loading strategy it needs.",
      decisionTitle: "Media decision",
      decision: "Describe the information someone would lose without the media. If no information is lost, make the decoration silent instead of repeating a useless description.",
      validationTitle: "Check without images or sound",
      validation: "Test the page without loading images and then without listening to audio. Meaning, controls, and important information must remain available."
    }
  },
  "05": {
    fr: {
      section: "Exprimer la relation entre les données",
      context: "Le choix entre liste, liste de descriptions et tableau dépend de la relation entre les valeurs, pas de l'apparence souhaitée.",
      decisionTitle: "Décision de modélisation",
      decision: "Utilise une liste pour une collection, une liste ordonnée pour une séquence, une liste de descriptions pour des couples terme-définition et un tableau pour des données croisées.",
      validationTitle: "Lecture linéaire et relations",
      validation: "Lis la structure dans l'ordre du DOM et vérifie les en-têtes. Une personne doit comprendre le sens de chaque valeur sans se fier uniquement à son alignement visuel."
    },
    en: {
      section: "Express relationships between data",
      context: "The choice between a list, description list, and table depends on the relationship between values, not on the desired appearance.",
      decisionTitle: "Data-modeling decision",
      decision: "Use a list for a collection, an ordered list for a sequence, a description list for term-definition pairs, and a table for intersecting data.",
      validationTitle: "Linear reading and relationships",
      validation: "Read the structure in DOM order and verify headers. People must understand the meaning of each value without relying only on visual alignment."
    }
  },
  "06": {
    fr: {
      section: "Construire une saisie exploitable",
      context: "Un formulaire fiable indique ce qui est attendu, transmet des données nommées et utilise les capacités natives du navigateur avant d'ajouter du JavaScript.",
      decisionTitle: "Décision de saisie",
      decision: "Choisis le contrôle selon la donnée, relie toujours son libellé visible et donne un name aux valeurs qui doivent être envoyées.",
      validationTitle: "Test de saisie et d'envoi",
      validation: "Utilise le formulaire au clavier, soumets des valeurs valides et invalides, puis vérifie que la requête contient des noms et valeurs compréhensibles."
    },
    en: {
      section: "Build usable data entry",
      context: "A reliable form explains what is expected, submits named data, and uses native browser capabilities before adding JavaScript.",
      decisionTitle: "Input decision",
      decision: "Choose the control according to the data, always connect its visible label, and give a name to every value that must be submitted.",
      validationTitle: "Input and submission test",
      validation: "Use the form with the keyboard, submit valid and invalid values, then verify that the request contains understandable names and values."
    }
  },
  "07": {
    fr: {
      section: "Rendre les états perceptibles",
      context: "L'aide, l'erreur, le chargement et la réussite ne doivent pas être communiqués uniquement par la couleur ou la position. Ils doivent être reliés au bon contrôle et annoncés au bon moment.",
      decisionTitle: "Décision de feedback",
      decision: "Utilise d'abord un texte visible et une relation explicite. Réserve les régions live aux changements dynamiques et choisis leur niveau d'urgence selon l'action attendue.",
      validationTitle: "Test avec technologie d'assistance",
      validation: "Déclenche chaque état dans l'ordre réel d'utilisation. Vérifie le focus, la relation avec le champ et l'absence d'annonces répétées ou prématurées."
    },
    en: {
      section: "Make states perceivable",
      context: "Help, errors, loading, and success must not be communicated only by color or position. They must be connected to the correct control and announced at the right time.",
      decisionTitle: "Feedback decision",
      decision: "Start with visible text and an explicit relationship. Reserve live regions for dynamic changes and choose urgency according to the action required.",
      validationTitle: "Assistive-technology test",
      validation: "Trigger every state in the real usage order. Check focus, the relationship with the field, and the absence of repeated or premature announcements."
    }
  },
  "08": {
    fr: {
      section: "Décrire la page hors de son interface",
      context: "Une page publiée est aussi lue dans un onglet, un moteur de recherche, une carte sociale et parfois par un robot de données structurées.",
      decisionTitle: "Décision de publication",
      decision: "Écris des métadonnées spécifiques, cohérentes avec le contenu visible et fondées sur des URL absolues stables lorsque le protocole l'exige.",
      validationTitle: "Aperçu de diffusion",
      validation: "Compare le title, la description, l'URL canonique et les données de partage au contenu réel. Chaque aperçu doit identifier PulsaConf sans texte générique."
    },
    en: {
      section: "Describe the page outside its interface",
      context: "A published page is also read in a browser tab, search engine, social card, and sometimes by a structured-data crawler.",
      decisionTitle: "Publishing decision",
      decision: "Write metadata that is specific, consistent with visible content, and based on stable absolute URLs when the protocol requires them.",
      validationTitle: "Distribution preview",
      validation: "Compare the title, description, canonical URL, and sharing data with the real content. Every preview must identify PulsaConf without generic copy."
    }
  },
  "09": {
    fr: {
      section: "Passer d'exercices isolés à un produit cohérent",
      context: "Le projet final vérifie les interactions entre les décisions précédentes. Une correction locale ne doit pas casser le plan, une cible, un nom accessible ou une donnée de publication.",
      decisionTitle: "Décision de livraison",
      decision: "Assemble d'abord la carte du document, puis les composants de contenu, et termine par un audit transversal plutôt que par une accumulation de balises.",
      validationTitle: "Revue avant publication",
      validation: "Effectue une lecture humaine, un parcours clavier, une inspection du DOM et les tests automatiques. Une réussite n'est valide que si ces preuves racontent la même chose."
    },
    en: {
      section: "Move from isolated exercises to a coherent product",
      context: "The final project checks how previous decisions interact. A local fix must not break the outline, a target, an accessible name, or publishing data.",
      decisionTitle: "Delivery decision",
      decision: "Assemble the document map first, then content components, and finish with a cross-cutting audit instead of accumulating tags.",
      validationTitle: "Pre-publication review",
      validation: "Perform a human reading, keyboard journey, DOM inspection, and automated tests. Success is valid only when all evidence tells the same story."
    }
  }
};

function narrativeFor(id) {
  const moduleId = id.match(/^html-(\d{2})-/)?.[1];
  return moduleNarratives[moduleId] || moduleNarratives["09"];
}

const q = (id, type, prompt, choices, answer, explanation) => ({
  id,
  type,
  prompt: T(prompt[0], prompt[1]),
  choices: choices.map(([choiceId, fr, en]) => ({ id: choiceId, label: T(fr, en) })),
  answer,
  explanation: T(explanation[0], explanation[1]),
  points: 1,
  requiresRationale: false
});

function courseForStep(id, title, focus, example, vocabulary, brief) {
  const custom = customNarratives[id];
  const customExample = onboardingExamples[id];
  const narrative = narrativeFor(id);
  const primaryExample = typeof example === "string" ? T(example, example) : example;
  return {
    fr: {
      introduction: custom?.fr?.intro || `${brief?.fr || `Tu travailles sur « ${title.fr} ».`} Cette étape rend ${focus.fr} vérifiable dans le projet PulsaConf.`,
      sections: [
        {
          title: custom?.fr?.section || narrative.fr.section,
          paragraphs: [
            narrative.fr.context,
            `« ${title.fr} » sert ici à rendre ${focus.fr} explicite dans le document.`
          ],
          example: primaryExample?.fr || "<section><h2>Exemple ciblé</h2></section>"
        },
        {
          title: narrative.fr.decisionTitle,
          paragraphs: [
            narrative.fr.decision,
            custom?.fr?.trap || `Évite de traiter ${focus.fr} comme un simple détail visuel : le choix doit rester compréhensible dans le DOM et justifiable en revue de code.`
          ],
          example: customExample?.decision.fr || "<div>Bloc visuel sans rôle clair</div>"
        },
        {
          title: narrative.fr.validationTitle,
          paragraphs: [
            narrative.fr.validation,
            `Pour ${id}, commence par le premier test en échec et relie son message à l'élément, l'attribut ou la relation concernée.`
          ],
          example: customExample?.validation.fr || "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Titre</h2>\n</section>"
        }
      ],
      vocabulary: vocabulary.fr,
      check: [
        `Je sais expliquer pourquoi ${focus.fr} améliore PulsaConf.`,
        "Je peux relier chaque test à une exigence utilisateur.",
        "Je garde une structure compréhensible sans style CSS."
      ]
    },
    en: {
      introduction: custom?.en?.intro || `${brief?.en || `You are working on “${title.en}.”`} This step makes ${focus.en} verifiable in the PulsaConf project.`,
      sections: [
        {
          title: custom?.en?.section || narrative.en.section,
          paragraphs: [
            narrative.en.context,
            `“${title.en}” makes ${focus.en} explicit in the document.`
          ],
          example: primaryExample?.en || "<section><h2>Focused example</h2></section>"
        },
        {
          title: narrative.en.decisionTitle,
          paragraphs: [
            narrative.en.decision,
            custom?.en?.trap || `Do not treat ${focus.en} as a visual detail: the choice must remain understandable in the DOM and defensible in code review.`
          ],
          example: customExample?.decision.en || "<div>Visual block with no clear role</div>"
        },
        {
          title: narrative.en.validationTitle,
          paragraphs: [
            narrative.en.validation,
            `For ${id}, start with the first failing test and connect its message to the relevant element, attribute, or relationship.`
          ],
          example: customExample?.validation.en || "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Title</h2>\n</section>"
        }
      ],
      vocabulary: vocabulary.en,
      check: [
        `I can explain why ${focus.en} improves PulsaConf.`,
        "I can connect every test to a user-facing requirement.",
        "I keep a structure that makes sense without CSS."
      ]
    }
  };
}

function guideForStep(id, title, focus) {
  const custom = customGuides[id];
  const onboarding = id.startsWith("html-00-");
  const navigation = id.startsWith("html-03-");
  return {
    fr: {
      objectives: custom?.fr?.objectives || (navigation ? [
        "Écrire un lien dont la destination ou l'action reste claire hors contexte.",
        "Vérifier la relation entre href, cible et état courant.",
        "Contrôler le parcours au clavier et les changements de contexte."
      ] : onboarding ? [
        `Comprendre ${focus.fr} sans supposer de connaissances HTML avancées.`,
        "Produire uniquement la structure demandée par la consigne.",
        "Vérifier le résultat avec un test ou une observation précise."
      ] : [
        `Construire ${focus.fr} avec un élément HTML adapté.`,
        "Ajouter les attributs qui rendent la structure testable.",
        "Expliquer l'impact utilisateur de la décision prise."
      ]),
      prerequisites: custom?.fr?.prerequisites || (navigation ? [
        "Savoir reconnaître un élément a et son attribut href.",
        "Comprendre qu'un id doit rester unique dans le document.",
        "Savoir parcourir les liens avec Tab et les activer avec Entrée."
      ] : onboarding ? [
        "Aucun prérequis HTML : lis la consigne et observe le code fourni.",
        "Savoir modifier du texte dans l'éditeur.",
        "Pouvoir lancer les tests après une modification."
      ] : [
        "Savoir reconnaître une balise ouvrante et fermante.",
        "Comprendre qu'un attribut précise le rôle ou la relation d'un élément.",
        "Avoir lu les tests comme une liste d'exigences."
      ]),
      steps: custom?.fr?.steps || (navigation ? [
        "Relis d'abord le libellé du lien sans le texte qui l'entoure.",
        "Vérifie ensuite la destination, le protocole ou l'id ciblé.",
        "Teste enfin l'ordre au clavier et le résultat de l'activation."
      ] : onboarding ? [
        "Lis d'abord le résultat attendu sans modifier le code.",
        "Effectue une seule correction liée au premier test en échec.",
        "Relance les tests, puis explique ce que ta correction a changé."
      ] : [
        `Repère où ${focus.fr} appartient dans PulsaConf.`,
        "Écris l'élément natif demandé avant de compléter le texte.",
        "Ajoute les attributs reliés, puis lance les tests du plus simple au plus précis."
      ]),
      mistakes: custom?.fr?.mistakes || (navigation ? [
        `Pour « ${title.fr} », valider la présence du lien sans vérifier sa destination réelle.`,
        "Utiliser un fragment dont la cible manque ou dont l'id est dupliqué.",
        "Ajouter un état ARIA ou un nouvel onglet sans expliquer le changement à la personne."
      ] : onboarding ? [
        `Pour « ${title.fr} », ajouter des éléments non demandés au lieu de traiter l'objectif précis.`,
        "Modifier plusieurs choses avant de relancer les tests.",
        "Copier la solution sans pouvoir relier la correction au test concerné."
      ] : [
        `Pour ${id}, remplacer « ${title.fr} » par un bloc générique sans relation testable.`,
        "Copier une solution complète sans savoir quel test chaque ligne satisfait.",
        "Ajouter de l'ARIA alors qu'un élément HTML natif suffisait."
      ])
    },
    en: {
      objectives: custom?.en?.objectives || (navigation ? [
        "Write a link whose destination or action remains clear out of context.",
        "Verify the relationship between href, target, and current state.",
        "Check keyboard navigation and changes of browsing context."
      ] : onboarding ? [
        `Understand ${focus.en} without assuming advanced HTML knowledge.`,
        "Produce only the structure requested by the instructions.",
        "Verify the result with one precise test or observation."
      ] : [
        `Build ${focus.en} with an appropriate HTML element.`,
        "Add attributes that make the structure testable.",
        "Explain the user impact of the decision."
      ]),
      prerequisites: custom?.en?.prerequisites || (navigation ? [
        "Recognize an a element and its href attribute.",
        "Understand that an id must remain unique in the document.",
        "Know how to visit links with Tab and activate them with Enter."
      ] : onboarding ? [
        "No HTML prerequisite: read the instructions and inspect the provided code.",
        "Know how to edit text in the editor.",
        "Be able to run the tests after a change."
      ] : [
        "Recognize opening and closing tags.",
        "Understand that attributes refine an element's role or relationship.",
        "Read tests as a list of requirements."
      ]),
      steps: custom?.en?.steps || (navigation ? [
        "First read the link label without its surrounding text.",
        "Then verify the destination, protocol, or targeted id.",
        "Finally test keyboard order and the result of activation."
      ] : onboarding ? [
        "Read the expected result before changing the code.",
        "Make one correction connected to the first failing test.",
        "Run the tests again, then explain what your correction changed."
      ] : [
        `Find where ${focus.en} belongs in PulsaConf.`,
        "Write the required native element before filling in the text.",
        "Add connected attributes, then run tests from the simplest to the most specific."
      ]),
      mistakes: custom?.en?.mistakes || (navigation ? [
        `For “${title.en},” checking that a link exists without verifying its real destination.`,
        "Using a fragment whose target is missing or whose id is duplicated.",
        "Adding an ARIA state or new tab without explaining the change to the user."
      ] : onboarding ? [
        `For “${title.en},” adding unrequested elements instead of addressing the precise objective.`,
        "Changing several things before running the tests again.",
        "Copying the solution without connecting the correction to the relevant test."
      ] : [
        `For ${id}, replacing “${title.en}” with a generic block that has no testable relationship.`,
        "Copying a full solution without knowing which test each line satisfies.",
        "Adding ARIA when a native HTML element was enough."
      ])
    }
  };
}

const quizProfiles = {
  "html-00-setup-quiz": {
    snippet: "<p>PulsaConf</p>",
    issue: P("L'extrait montre du contenu visible, mais ne prouve ni fichier d'entrée, ni boucle de travail, ni lecture des tests.", "The snippet shows visible content, but proves no entry file, workflow loop, or test reading."),
    best: ["workflow", "Créer index.html, l'ouvrir dans le navigateur, inspecter le DOM et relier chaque test à une preuve", "Create index.html, open it in the browser, inspect the DOM, and connect every test to evidence"],
    wrong: ["extension", "Installer une extension au hasard pour corriger automatiquement la page", "Install a random extension to automatically fix the page"],
    proof: P("Cite le fichier index.html, le cycle sauvegarder/recharger, l'inspecteur DOM ou un test précis comme preuve observable.", "Cite the index.html file, the save/reload loop, the DOM inspector, or a specific test as observable evidence.")
  },
  "html-01-document-quiz": {
    snippet: "<html><head><title>PulsaConf</title></head><body><h1>PulsaConf</h1></body></html>",
    issue: P("Le document démarre sans doctype, langue, charset ni viewport.", "The document starts without doctype, language, charset, or viewport."),
    best: ["skeleton", "Ajouter doctype, lang, meta charset et viewport", "Add doctype, lang, meta charset, and viewport"],
    wrong: ["body-only", "Déplacer tout le head dans body", "Move the whole head into body"],
    proof: P("Les tests doivent trouver `<!doctype html>`, `html[lang]`, `meta[charset]` et `meta[name=viewport]`.", "Tests must find `<!doctype html>`, `html[lang]`, `meta[charset]`, and `meta[name=viewport]`.")
  },
  "html-02-semantics-quiz": {
    snippet: "<main><h1>PulsaConf</h1><h1>Programme</h1><div>Atelier HTML</div></main>",
    issue: P("La page a deux h1 et un bloc générique pour une session autonome.", "The page has two h1 elements and a generic block for a standalone session."),
    best: ["outline", "Garder un h1, puis h2 pour Programme et article/h3 pour la session", "Keep one h1, then h2 for Program and article/h3 for the session"],
    wrong: ["visual", "Garder deux h1 parce qu'ils sont plus visibles", "Keep two h1s because they are more visible"],
    proof: P("La preuve est un h1 unique, une section nommée et un article autonome.", "The proof is one h1, a named section, and a standalone article.")
  },
  "html-03-navigation-quiz": {
    snippet: "<nav><a href=\"#\">Clique ici</a><a target=\"_blank\" href=\"https://pulsateach.vercel.app\">Site</a></nav>",
    issue: P("La navigation n'a pas de nom, contient un lien vague et un lien externe sans rel.", "The navigation has no name, contains a vague link, and an external link without rel."),
    best: ["nav-safe", "Utiliser aria-current location pour l'ancre active, expliciter les textes et sécuriser le lien externe", "Use aria-current location for the active anchor, make labels explicit, and secure the external link"],
    wrong: ["icon-only", "Remplacer les textes par des icônes seules", "Replace texts with icons only"],
    proof: P("Les tests cherchent `nav[aria-label]`, des href réels et l'absence de 'clique ici'.", "Tests look for `nav[aria-label]`, real href values, and no 'click here'.")
  },
  "html-04-media-quiz": {
    snippet: "<img src=\"speaker.jpg\" alt=\"image\"><video src=\"intro.mp4\"></video>",
    issue: P("L'alt est générique et la vidéo n'a ni contrôles, ni sous-titres, ni transcription équivalente.", "The alt text is generic and the video has no controls, captions, or equivalent transcript."),
    best: ["media-a11y", "Décrire l'image, ajouter dimensions, contrôles, sous-titres et transcription", "Describe the image and add dimensions, controls, captions, and a transcript"],
    wrong: ["hide-all", "Mettre alt vide sur toutes les images", "Set empty alt on every image"],
    proof: P("La preuve combine un alt spécifique, des dimensions, une piste captions et une transcription visible qui restitue les informations parlées.", "Evidence combines specific alt text, dimensions, a captions track, and a visible transcript conveying the spoken information.")
  },
  "html-05-data-quiz": {
    snippet: "<p>09:30 - HTML - Salle A</p><p>10:30 - Formulaires - Salle B</p>",
    issue: P("Le planning est une donnée tabulaire écrite comme deux paragraphes.", "The schedule is tabular data written as two paragraphs."),
    best: ["table", "Utiliser table, caption, thead, tbody et th scope", "Use table, caption, thead, tbody, and th scope"],
    wrong: ["br", "Ajouter des br pour aligner visuellement", "Add br elements to align visually"],
    proof: P("Un tableau accessible expose un caption et des th avec scope.", "An accessible table exposes a caption and th elements with scope.")
  },
  "html-06-forms-quiz": {
    snippet: "<form><input placeholder=\"Email\"><button>OK</button></form>",
    issue: P("Le champ n'a pas de label, pas de name, pas de type email et le bouton est vague.", "The field has no label, no name, no email type, and the button is vague."),
    best: ["native-form", "Relier label/input, ajouter name, type email, required et submit explicite", "Connect label/input, add name, email type, required, and explicit submit"],
    wrong: ["placeholder", "Garder le placeholder comme seul nom du champ", "Keep the placeholder as the only field name"],
    proof: P("Les tests doivent voir `label[for]`, `input[id][name][type=email]` et `button[type=submit]`.", "Tests must see `label[for]`, `input[id][name][type=email]`, and `button[type=submit]`.")
  },
  "html-07-feedback-quiz": {
    snippet: "<input id=\"email\"><p>Erreur email</p><p>Envoyé</p>",
    issue: P("L'aide, l'erreur et le statut ne sont reliés ni annoncés.", "Help, error, and status are neither connected nor announced."),
    best: ["feedback", "Relier avec aria-describedby, role alert et role status aria-live", "Connect with aria-describedby, role alert, and role status aria-live"],
    wrong: ["red-text", "Mettre le message en rouge uniquement", "Make the message red only"],
    proof: P("La preuve est une relation id/aria-describedby et des rôles de feedback adaptés.", "Evidence is an id/aria-describedby relationship and appropriate feedback roles.")
  },
  "html-08-seo-quiz": {
    snippet: "<title>Accueil</title><meta property=\"og:title\" content=\"Accueil\">",
    issue: P("Le head ne décrit pas PulsaConf et ne fournit pas de résumé social utile.", "The head does not describe PulsaConf and provides no useful social summary."),
    best: ["seo-head", "Écrire title spécifique, description, canonical, og:title, og:description et og:image", "Write specific title, description, canonical, og:title, og:description, and og:image"],
    wrong: ["keywords", "Ajouter seulement une meta keywords", "Only add a keywords meta tag"],
    proof: P("La page doit être compréhensible dans un résultat de recherche et dans une carte sociale.", "The page must be understandable in search results and in a social card.")
  },
  "html-09-final-exam": {
    snippet: "<main><section><h2>Programme</h2></section><input placeholder=\"Email\"><a href=\"#\">clique ici</a></main>",
    issue: P("Le livrable final mélange sections non nommées, champ sans label et lien vague.", "The final deliverable mixes unnamed sections, a field without label, and a vague link."),
    best: ["release", "Auditer landmarks, titres, liens, médias, tableau, formulaire, feedback et head", "Audit landmarks, headings, links, media, table, form, feedback, and head"],
    wrong: ["selectors-only", "Ajouter des balises au hasard pour satisfaire des sélecteurs", "Add random tags to satisfy selectors"],
    proof: P("Un projet final réussi se lit comme une page cohérente et passe les tests d'audit.", "A successful final project reads like a coherent page and passes audit tests.")
  }
};

function enrich(item, stepNumber, buildsOn, focus, example, vocabulary) {
  const course = courseForStep(item.id, item.title, focus, example, vocabulary, item.brief);
  const guide = guideForStep(item.id, item.title, focus);
  const enriched = {
    ...item,
    course,
    guide,
    pedagogy: getPedagogy(item.id, { course, guide, title: item.title, brief: item.brief, solution: item.solution, type: item.type }),
    projectThreadId: threadId,
    projectDocument,
    stepNumber,
    buildsOn: buildsOn || null
  };
  if (item.type === "project") {
    enriched.rubric = {
      fr: [
        "Toutes les exigences structurelles du module sont couvertes par du HTML natif.",
        "Les relations importantes sont vérifiables par id, href, for ou aria-describedby.",
        "Le livrable reste compréhensible sans CSS ni JavaScript.",
        "Chaque correction peut être expliquée avec un impact utilisateur concret."
      ],
      en: [
        "Every structural requirement in the module is covered with native HTML.",
        "Important relationships are verifiable through id, href, for, or aria-describedby.",
        "The deliverable remains understandable without CSS or JavaScript.",
        "Every correction can be explained with a concrete user impact."
      ]
    };
  }
  return enriched;
}

function makeLesson(def, stepNumber, buildsOn) {
  const title = T(def.title[0], def.title[1]);
  const starterCode = artifact(def.starter);
  const solution = artifact(def.solution);
  const teachingExample = onboardingExamples[def.id]?.decision || T("<section><h2>Exemple ciblé</h2></section>", "<section><h2>Focused example</h2></section>");
  return enrich(lesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    course: courseForStep(def.id, title, def.focus, teachingExample, def.vocabulary),
    starterCode,
    solution,
    tests: localizedTests(def.tests),
    hint: lessonHints[def.id] || P("Cherche l'élément ou l'attribut nommé dans le premier test qui échoue.", "Look for the element or attribute named by the first failing test."),
    xp: def.xp || 30
  }), stepNumber, buildsOn, def.focus, teachingExample, def.vocabulary);
}

function makeProject(def, stepNumber, buildsOn) {
  const starterCode = artifact(def.starter);
  const solution = artifact(def.solution);
  const teachingExample = T("<main><h1>Livrable du module</h1></main>", "<main><h1>Module deliverable</h1></main>");
  return enrich(projectLesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    starterCode,
    solution,
    tests: localizedTests(def.tests),
    xp: def.xp || 80
  }), stepNumber, buildsOn, def.focus, teachingExample, def.vocabulary);
}

function makeQuiz(def, stepNumber, buildsOn) {
  const base = quizLesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    question: T(def.questions[0].prompt[0], def.questions[0].prompt[1]),
    options: def.questions[0].choices.map(([id, fr, en]) => ({ id, label: T(fr, en) })),
    answer: def.questions[0].answer,
    explanation: T(def.questions[0].explanation[0], def.questions[0].explanation[1]),
    xp: 25
  });
  const item = {
    ...base,
    questions: def.questions.map((question, index) => q(`${def.id}-q${index + 1}`, question.type, question.prompt, question.choices, question.answer, question.explanation)),
    passingScore: 75,
    randomizeQuestions: def.id === "html-09-final-exam",
    feedbackMode: def.id === "html-09-final-exam" ? "after-submit" : "immediate",
    ...(def.id === "html-09-final-exam" ? { purpose: "exam", gradingMode: "server", examVersion: 3 } : {})
  };
  return enrich(item, stepNumber, buildsOn, def.focus, "", def.vocabulary);
}

const vocab = {
  setup: {
    fr: [["HTML", "Langage de balisage qui décrit la structure du contenu."], ["éditeur", "Application utilisée pour écrire les fichiers du projet."], ["navigateur", "Application qui interprète HTML et affiche la page."], ["index.html", "Fichier d'entrée conventionnel d'une page web."], ["DevTools", "Outils du navigateur pour inspecter le DOM et diagnostiquer la page."], ["test", "Vérification automatique d'une preuve attendue."]],
    en: [["HTML", "Markup language that describes content structure."], ["editor", "Application used to write project files."], ["browser", "Application that interprets HTML and displays the page."], ["index.html", "Conventional entry file for a web page."], ["DevTools", "Browser tools for inspecting the DOM and diagnosing the page."], ["test", "Automated check for expected evidence."]]
  },
  document: {
    fr: [["doctype", "Déclaration qui demande le mode standard du navigateur."], ["head", "Zone qui décrit le document et référence ses ressources."], ["body", "Zone qui contient le document présenté à la personne."], ["charset", "Déclaration de l'encodage utilisé pour décoder le fichier."], ["viewport", "Configuration de la largeur de mise en page sur mobile."]],
    en: [["doctype", "Declaration requesting browser standards mode."], ["head", "Area that describes the document and references its resources."], ["body", "Area containing the document presented to the user."], ["charset", "Declaration of the encoding used to decode the file."], ["viewport", "Configuration of the mobile layout width."]]
  },
  semantics: {
    fr: [["main", "Landmark du contenu principal."], ["section", "Regroupement thématique nommé."], ["article", "Contenu autonome réutilisable."], ["heading", "Titre qui structure le plan."], ["details", "Zone d'information dépliable native."]],
    en: [["main", "Landmark for the main content."], ["section", "Named thematic grouping."], ["article", "Standalone reusable content."], ["heading", "Title that structures the outline."], ["details", "Native expandable information area."]]
  },
  navigation: {
    fr: [["nav", "Région regroupant des liens de navigation importants."], ["fragment", "Partie d'URL commençant par # et visant un id unique."], ["aria-current", "Attribut indiquant la page, position ou étape courante."], ["rel", "Relation et politique associées à un lien."], ["mailto/tel", "Protocoles ouvrant une action email ou téléphone."], ["download", "Attribut proposant le téléchargement de la ressource."], ["skip link", "Lien permettant d'aller directement au contenu principal."]],
    en: [["nav", "Region grouping important navigation links."], ["fragment", "Part of a URL beginning with # and targeting one unique id."], ["aria-current", "Attribute indicating the current page, location, or step."], ["rel", "Relationship and policy associated with a link."], ["mailto/tel", "Protocols opening an email or phone action."], ["download", "Attribute offering the linked resource as a download."], ["skip link", "Link that jumps directly to main content."]]
  },
  media: {
    fr: [["alt", "Alternative textuelle d'une image informative."], ["figure", "Groupe média et légende."], ["figcaption", "Légende reliée au média."], ["track", "Piste de sous-titres ou captions."], ["loading", "Indice de chargement pour une image." ]],
    en: [["alt", "Text alternative for an informative image."], ["figure", "Media and caption group."], ["figcaption", "Caption connected to media."], ["track", "Captions or subtitles track."], ["loading", "Loading hint for an image."]]
  },
  data: {
    fr: [["ul", "Liste sans ordre imposé."], ["ol", "Liste ordonnée."], ["table", "Structure de données tabulaires."], ["caption", "Titre accessible du tableau."], ["scope", "Relation entre en-tête et cellules."], ["time", "Date lisible par machine." ]],
    en: [["ul", "List without required order."], ["ol", "Ordered list."], ["table", "Tabular data structure."], ["caption", "Accessible table title."], ["scope", "Relationship between header and cells."], ["time", "Machine-readable date."]]
  },
  forms: {
    fr: [["form", "Zone de saisie envoyable."], ["label", "Nom accessible visible d'un champ."], ["input", "Contrôle de saisie."], ["required", "Contrainte native obligatoire."], ["autocomplete", "Indice de remplissage automatique." ]],
    en: [["form", "Submittable input area."], ["label", "Visible accessible name for a field."], ["input", "Input control."], ["required", "Native required constraint."], ["autocomplete", "Autofill hint."]]
  },
  a11yForms: {
    fr: [["fieldset", "Groupe de champs liés."], ["legend", "Nom d'un groupe de champs."], ["aria-describedby", "Relation vers une aide ou erreur."], ["aria-live", "Annonce de changement dynamique."], ["alert", "Message urgent annoncé immédiatement." ]],
    en: [["fieldset", "Group of related fields."], ["legend", "Name for a field group."], ["aria-describedby", "Relationship to help or error text."], ["aria-live", "Dynamic change announcement."], ["alert", "Urgent message announced immediately."]]
  },
  seo: {
    fr: [["title", "Titre affiché dans l'onglet et les résultats."], ["meta description", "Résumé court pour moteurs de recherche."], ["canonical", "URL officielle d'une page."], ["Open Graph", "Métadonnées de partage social."], ["JSON-LD", "Données structurées intégrées au head." ]],
    en: [["title", "Title shown in tabs and results."], ["meta description", "Short summary for search engines."], ["canonical", "Official page URL."], ["Open Graph", "Social sharing metadata."], ["JSON-LD", "Structured data embedded in the head."]]
  },
  final: {
    fr: [["audit", "Relecture structurée de qualité."], ["landmark", "Région de page identifiable."], ["anti-pattern", "Solution fréquente mais fragile."], ["rubric", "Critères de correction."], ["livrable", "Résultat final partageable." ]],
    en: [["audit", "Structured quality review."], ["landmark", "Identifiable page region."], ["anti-pattern", "Common but fragile solution."], ["rubric", "Assessment criteria."], ["deliverable", "Shareable final result."]]
  }
};

const semanticsBodies = {
  main: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`
  ),
  outline: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section aria-labelledby="program-title"><h2 id="program-title">Programme</h2><h3>Atelier HTML accessible</h3></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Lieu</h2></section>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section aria-labelledby="program-title"><h2 id="program-title">Program</h2><h3>Accessible HTML workshop</h3></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Venue</h2></section>\n    </main>`
  ),
  emphasis: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée gratuite pour apprendre le web avec des ateliers concrets.</p>\n      <p><strong>Places limitées.</strong> Viens avec <em>ton propre ordinateur</em>.</p>\n      <section aria-labelledby="program-title"><h2 id="program-title">Programme</h2><h3>Atelier HTML accessible</h3></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Lieu</h2></section>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>A free day of hands-on web learning.</p>\n      <p><strong>Seats are limited.</strong> Bring <em>your own computer</em>.</p>\n      <section aria-labelledby="program-title"><h2 id="program-title">Program</h2><h3>Accessible HTML workshop</h3></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Venue</h2></section>\n    </main>`
  ),
  structure: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée gratuite pour apprendre le web avec des ateliers concrets.</p>\n      <p><strong>Places limitées.</strong> Viens avec <em>ton propre ordinateur</em>.</p>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>Construire une page accessible</h3><p>Atelier guidé sur la structure HTML.</p></article><aside aria-label="Conseil pratique">Prévois un ordinateur portable chargé.</aside></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Lieu</h2></section>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>A free day of hands-on web learning.</p>\n      <p><strong>Seats are limited.</strong> Bring <em>your own computer</em>.</p>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2><article><h3>Build an accessible page</h3><p>A guided workshop on HTML structure.</p></article><aside aria-label="Practical tip">Bring a charged laptop.</aside></section>\n      <section aria-labelledby="venue-title"><h2 id="venue-title">Venue</h2></section>\n    </main>`
  ),
  quote: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>Construire une page accessible</h3><p>Atelier guidé sur la structure HTML.</p></article><aside aria-label="Conseil pratique">Prévois un ordinateur portable chargé.</aside></section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML est le langage de publication du Web.</p></blockquote><p>Source : <cite>W3C, HTML et CSS</cite></p>\n      <details><summary>Faut-il connaître JavaScript ?</summary><p>Non, le parcours commence par HTML.</p></details>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2><article><h3>Build an accessible page</h3><p>A guided workshop on HTML structure.</p></article><aside aria-label="Practical tip">Bring a charged laptop.</aside></section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML is the publishing language of the Web.</p></blockquote><p>Source: <cite>W3C, HTML and CSS</cite></p>\n      <details><summary>Do I need to know JavaScript?</summary><p>No, the course starts with HTML.</p></details>\n    </main>`
  ),
  precise: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>Construire une page accessible</h3><p>L'atelier commence par <abbr title="HyperText Markup Language">HTML</abbr> et un fichier <code>index.html</code>.</p></article><aside aria-label="Conseil pratique">Prévois un ordinateur portable chargé.</aside></section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML est le langage de publication du Web.</p></blockquote><p>Source : <cite>W3C, HTML et CSS</cite></p>\n      <details><summary>Faut-il connaître JavaScript ?</summary><p>Non, le parcours commence par HTML.</p></details>\n      <address>Contact : <a href="mailto:equipe@pulsateach.dev">equipe@pulsateach.dev</a></address>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2><article><h3>Build an accessible page</h3><p>The workshop starts with <abbr title="HyperText Markup Language">HTML</abbr> and an <code>index.html</code> file.</p></article><aside aria-label="Practical tip">Bring a charged laptop.</aside></section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML is the publishing language of the Web.</p></blockquote><p>Source: <cite>W3C, HTML and CSS</cite></p>\n      <details><summary>Do I need to know JavaScript?</summary><p>No, the course starts with HTML.</p></details>\n      <address>Contact: <a href="mailto:team@pulsateach.dev">team@pulsateach.dev</a></address>\n    </main>`
  )
};

const navigationBodies = {
  explicit: T(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p><a href="/formations/html">Découvrir la formation HTML gratuite</a></p>\n      <section id="program"><h2>Programme</h2><p>Deux ateliers pratiques.</p></section>\n      <section id="speakers"><h2>Intervenants</h2><p>Maya et Samir.</p></section>\n      <section id="register"><h2>Inscription</h2><p>Places limitées.</p></section>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p><a href="/formations/html">Explore the free HTML course</a></p>\n      <section id="program"><h2>Program</h2><p>Two hands-on workshops.</p></section>\n      <section id="speakers"><h2>Speakers</h2><p>Maya and Samir.</p></section>\n      <section id="register"><h2>Registration</h2><p>Seats are limited.</p></section>\n    </main>`
  ),
  anchor: T(
    `    <a href="#register">Aller à l'inscription</a>\n    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p><a href="/formations/html">Découvrir la formation HTML gratuite</a></p>\n      <section id="program"><h2>Programme</h2><p>Deux ateliers pratiques.</p></section>\n      <section id="speakers"><h2>Intervenants</h2><p>Maya et Samir.</p></section>\n      <section id="register"><h2>Inscription</h2><p>Places limitées.</p></section>\n    </main>`,
    `    <a href="#register">Go to registration</a>\n    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p><a href="/formations/html">Explore the free HTML course</a></p>\n      <section id="program"><h2>Program</h2><p>Two hands-on workshops.</p></section>\n      <section id="speakers"><h2>Speakers</h2><p>Maya and Samir.</p></section>\n      <section id="register"><h2>Registration</h2><p>Seats are limited.</p></section>\n    </main>`
  ),
  nav: T(
    `    <header><p>PulsaConf 2026</p><nav aria-label="Navigation principale"><a href="#program">Programme</a><a href="#speakers">Intervenants</a><a href="#register">Inscription</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Programme</h2></section><section id="speakers"><h2>Intervenants</h2></section><section id="register"><h2>Inscription</h2></section></main>`,
    `    <header><p>PulsaConf 2026</p><nav aria-label="Main navigation"><a href="#program">Program</a><a href="#speakers">Speakers</a><a href="#register">Registration</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Program</h2></section><section id="speakers"><h2>Speakers</h2></section><section id="register"><h2>Registration</h2></section></main>`
  ),
  current: T(
    `    <header><p>PulsaConf 2026</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#speakers">Intervenants</a><a href="#register">Inscription</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Découvrir PulsaTeach (nouvel onglet)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Programme</h2></section><section id="speakers"><h2>Intervenants</h2></section><section id="register"><h2>Inscription</h2></section></main>`,
    `    <header><p>PulsaConf 2026</p><nav aria-label="Main navigation"><a href="#program" aria-current="location">Program</a><a href="#speakers">Speakers</a><a href="#register">Registration</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Explore PulsaTeach (new tab)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Program</h2></section><section id="speakers"><h2>Speakers</h2></section><section id="register"><h2>Registration</h2></section></main>`
  ),
  contact: T(
    `    <header><p>PulsaConf 2026</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#register">Inscription</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Découvrir PulsaTeach (nouvel onglet)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Programme</h2></section><section id="register"><h2>Inscription</h2></section><section id="contact"><h2>Contact</h2><a href="mailto:equipe@pulsateach.dev">Écrire à l'équipe PulsaConf</a><a href="tel:+33123456789">Appeler l'accueil PulsaConf</a><a href="/assets/programme-pulsaconf.pdf" download>Télécharger le programme PulsaConf en PDF</a></section></main>`,
    `    <header><p>PulsaConf 2026</p><nav aria-label="Main navigation"><a href="#program" aria-current="location">Program</a><a href="#register">Registration</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Explore PulsaTeach (new tab)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Program</h2></section><section id="register"><h2>Registration</h2></section><section id="contact"><h2>Contact</h2><a href="mailto:team@pulsateach.dev">Email the PulsaConf team</a><a href="tel:+33123456789">Call PulsaConf reception</a><a href="/assets/pulsaconf-program.pdf" download>Download the PulsaConf PDF program</a></section></main>`
  ),
  skip: T(
    `    <a href="#main-content">Aller au contenu principal</a>\n    <header><p>PulsaConf 2026</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#register">Inscription</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Découvrir PulsaTeach (nouvel onglet)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Programme</h2></section><section id="register"><h2>Inscription</h2></section><section id="contact"><h2>Contact</h2><a href="mailto:equipe@pulsateach.dev">Écrire à l'équipe PulsaConf</a><a href="tel:+33123456789">Appeler l'accueil PulsaConf</a><a href="/assets/programme-pulsaconf.pdf" download>Télécharger le programme PulsaConf en PDF</a></section></main>`,
    `    <a href="#main-content">Skip to main content</a>\n    <header><p>PulsaConf 2026</p><nav aria-label="Main navigation"><a href="#program" aria-current="location">Program</a><a href="#register">Registration</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Explore PulsaTeach (new tab)</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Program</h2></section><section id="register"><h2>Registration</h2></section><section id="contact"><h2>Contact</h2><a href="mailto:team@pulsateach.dev">Email the PulsaConf team</a><a href="tel:+33123456789">Call PulsaConf reception</a><a href="/assets/pulsaconf-program.pdf" download>Download the PulsaConf PDF program</a></section></main>`
  )
};

const appendToMain = (body, markup) => body.replace("</main>", `${markup}</main>`);
const mediaInformative = T(
  appendToMain(navigationBodies.skip.fr, `<section id="media" aria-labelledby="media-title"><h2 id="media-title">Intervenants en images</h2><img src="/assets/pulsaconf-maya.svg" alt="Maya présente la structure d'une page HTML sur scène" width="640" height="360" /></section>`),
  appendToMain(navigationBodies.skip.en, `<section id="media" aria-labelledby="media-title"><h2 id="media-title">Speakers in pictures</h2><img src="/assets/pulsaconf-maya.svg" alt="Maya presents the structure of an HTML page on stage" width="640" height="360" /></section>`)
);
const mediaDecorative = T(
  mediaInformative.fr.replace("<header>", `<header><img src="/assets/pulsaconf-wave.svg" alt="" width="120" height="40" />`),
  mediaInformative.en.replace("<header>", `<header><img src="/assets/pulsaconf-wave.svg" alt="" width="120" height="40" />`)
);
const mediaFigure = T(
  mediaDecorative.fr.replace(`<img src="/assets/pulsaconf-maya.svg" alt="Maya présente la structure d'une page HTML sur scène" width="640" height="360" />`, `<figure><img src="/assets/pulsaconf-maya.svg" alt="Maya présente la structure d'une page HTML sur scène" width="640" height="360" /><figcaption>Maya ouvre l'atelier sur la structure HTML.</figcaption></figure>`),
  mediaDecorative.en.replace(`<img src="/assets/pulsaconf-maya.svg" alt="Maya presents the structure of an HTML page on stage" width="640" height="360" />`, `<figure><img src="/assets/pulsaconf-maya.svg" alt="Maya presents the structure of an HTML page on stage" width="640" height="360" /><figcaption>Maya opens the workshop on HTML structure.</figcaption></figure>`)
);
const mediaLazy = T(
  mediaFigure.fr.replace("</section></main>", `<figure><img src="/assets/pulsaconf-workshop.svg" alt="Trois participants travaillent autour de leurs ordinateurs" width="640" height="360" loading="lazy" /><figcaption>Un atelier pratique en petit groupe.</figcaption></figure></section></main>`),
  mediaFigure.en.replace("</section></main>", `<figure><img src="/assets/pulsaconf-workshop.svg" alt="Three attendees work together around their computers" width="640" height="360" loading="lazy" /><figcaption>A hands-on workshop in a small group.</figcaption></figure></section></main>`)
);
const mediaAudio = T(
  appendToMain(mediaLazy.fr, `<section id="audio" aria-labelledby="audio-title"><h2 id="audio-title">Annonce audio</h2><audio controls><source src="/assets/pulsaconf-intro-fr.wav" type="audio/wav" /></audio><p><a href="/assets/pulsaconf-intro-fr.wav" download>Télécharger l'annonce audio</a></p><p><strong>Transcription :</strong> Bienvenue à PulsaConf. Les ateliers commencent à neuf heures trente dans l'auditorium.</p></section>`),
  appendToMain(mediaLazy.en, `<section id="audio" aria-labelledby="audio-title"><h2 id="audio-title">Audio announcement</h2><audio controls><source src="/assets/pulsaconf-intro-en.wav" type="audio/wav" /></audio><p><a href="/assets/pulsaconf-intro-en.wav" download>Download the audio announcement</a></p><p><strong>Transcript:</strong> Welcome to PulsaConf. Workshops begin at nine thirty in the auditorium.</p></section>`)
);
const mediaVideo = T(
  appendToMain(mediaAudio.fr, `<section id="video" aria-labelledby="video-title"><h2 id="video-title">Visite vidéo de PulsaTeach</h2><video controls width="640"><source src="/assets/pulsaconf-demo.webm" type="video/webm" /><track kind="captions" src="/assets/pulsaconf-captions-fr.vtt" srclang="fr" label="Français" default /></video><p><a href="/assets/pulsaconf-demo.webm" download>Télécharger la vidéo</a></p><p><strong>Transcription :</strong> La vidéo montre l'interface PulsaTeach, la liste des leçons, les exercices et le suivi de progression.</p></section>`),
  appendToMain(mediaAudio.en, `<section id="video" aria-labelledby="video-title"><h2 id="video-title">PulsaTeach video tour</h2><video controls width="640"><source src="/assets/pulsaconf-demo.webm" type="video/webm" /><track kind="captions" src="/assets/pulsaconf-captions-en.vtt" srclang="en" label="English" default /></video><p><a href="/assets/pulsaconf-demo.webm" download>Download the video</a></p><p><strong>Transcript:</strong> The video shows the PulsaTeach interface, lesson list, exercises, and progress tracking.</p></section>`)
);
const mediaBodies = {
  informative: mediaInformative,
  decorative: mediaDecorative,
  figure: mediaFigure,
  lazy: mediaLazy,
  audio: mediaAudio,
  video: mediaVideo
};

const dataBenefits = T(
  appendToMain(mediaBodies.video.fr, `<section id="benefits" aria-labelledby="benefits-title"><h2 id="benefits-title">Pourquoi venir ?</h2><ul><li>Ateliers guidés</li><li>Supports accessibles</li><li>Projet portfolio</li></ul></section>`),
  appendToMain(mediaBodies.video.en, `<section id="benefits" aria-labelledby="benefits-title"><h2 id="benefits-title">Why attend?</h2><ul><li>Guided workshops</li><li>Accessible materials</li><li>Portfolio project</li></ul></section>`)
);
const dataSteps = T(
  appendToMain(dataBenefits.fr, `<section id="registration-steps" aria-labelledby="steps-title"><h2 id="steps-title">Étapes d'inscription</h2><ol><li>Choisir un atelier</li><li>Renseigner ses coordonnées</li><li>Confirmer sa présence</li></ol></section>`),
  appendToMain(dataBenefits.en, `<section id="registration-steps" aria-labelledby="steps-title"><h2 id="steps-title">Registration steps</h2><ol><li>Choose a workshop</li><li>Enter contact details</li><li>Confirm attendance</li></ol></section>`)
);
const dataGlossary = T(
  appendToMain(dataSteps.fr, `<section id="glossary" aria-labelledby="glossary-title"><h2 id="glossary-title">Glossaire du planning</h2><dl><dt>Créneau</dt><dd>Période réservée à un atelier.</dd><dt>Capacité</dt><dd>Nombre maximal de personnes accueillies.</dd><dt>Auditorium</dt><dd>Salle principale des conférences.</dd></dl></section>`),
  appendToMain(dataSteps.en, `<section id="glossary" aria-labelledby="glossary-title"><h2 id="glossary-title">Schedule glossary</h2><dl><dt>Time slot</dt><dd>Period reserved for a workshop.</dd><dt>Capacity</dt><dd>Maximum number of attendees.</dd><dt>Auditorium</dt><dd>Main room for talks.</dd></dl></section>`)
);
const basicScheduleTable = T(
  `<table><caption>Horaires et capacité des ateliers PulsaConf</caption><tr><th>Heure</th><th>Atelier</th><th>Salle</th><th>Places</th></tr><tr><td>9 h 30</td><td>HTML sémantique</td><td>Auditorium</td><td>120 places</td></tr><tr><td>11 h</td><td>Formulaires accessibles</td><td>Laboratoire</td><td>40 places</td></tr></table>`,
  `<table><caption>PulsaConf workshop times and capacity</caption><tr><th>Time</th><th>Workshop</th><th>Room</th><th>Seats</th></tr><tr><td>9:30 AM</td><td>Semantic HTML</td><td>Auditorium</td><td>120 seats</td></tr><tr><td>11:00 AM</td><td>Accessible forms</td><td>Lab</td><td>40 seats</td></tr></table>`
);
const structuredScheduleTable = T(
  `<table><caption>Horaires et capacité des ateliers PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th><th scope="col">Places</th></tr></thead><tbody><tr><td>9 h 30</td><td>HTML sémantique</td><td>Auditorium</td><td>120 places</td></tr><tr><td>11 h</td><td>Formulaires accessibles</td><td>Laboratoire</td><td>40 places</td></tr></tbody></table>`,
  `<table><caption>PulsaConf workshop times and capacity</caption><thead><tr><th scope="col">Time</th><th scope="col">Workshop</th><th scope="col">Room</th><th scope="col">Seats</th></tr></thead><tbody><tr><td>9:30 AM</td><td>Semantic HTML</td><td>Auditorium</td><td>120 seats</td></tr><tr><td>11:00 AM</td><td>Accessible forms</td><td>Lab</td><td>40 seats</td></tr></tbody></table>`
);
const machineScheduleTable = T(
  structuredScheduleTable.fr.replace("<td>9 h 30</td>", `<td><time datetime="2026-09-18T09:30">9 h 30</time></td>`).replace("<td>120 places</td>", `<td><data value="120">120 places</data></td>`).replace("<td>11 h</td>", `<td><time datetime="2026-09-18T11:00">11 h</time></td>`).replace("<td>40 places</td>", `<td><data value="40">40 places</data></td>`),
  structuredScheduleTable.en.replace("<td>9:30 AM</td>", `<td><time datetime="2026-09-18T09:30">9:30 AM</time></td>`).replace("<td>120 seats</td>", `<td><data value="120">120 seats</data></td>`).replace("<td>11:00 AM</td>", `<td><time datetime="2026-09-18T11:00">11:00 AM</time></td>`).replace("<td>40 seats</td>", `<td><data value="40">40 seats</data></td>`)
);
const dataTable = T(
  appendToMain(dataGlossary.fr, `<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning du 18 septembre</h2>${basicScheduleTable.fr}</section>`),
  appendToMain(dataGlossary.en, `<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">September 18 schedule</h2>${basicScheduleTable.en}</section>`)
);
const dataStructured = T(
  dataTable.fr.replace(basicScheduleTable.fr, structuredScheduleTable.fr),
  dataTable.en.replace(basicScheduleTable.en, structuredScheduleTable.en)
);
const dataMachine = T(
  dataStructured.fr.replace(structuredScheduleTable.fr, machineScheduleTable.fr),
  dataStructured.en.replace(structuredScheduleTable.en, machineScheduleTable.en)
);
const dataBodies = {
  benefits: dataBenefits,
  steps: dataSteps,
  glossary: dataGlossary,
  table: dataTable,
  structured: dataStructured,
  machine: dataMachine
};

const appendToForm = (body, markup) => body.replace("</form>", `${markup}</form>`);
const formAction = T(
  appendToMain(dataBodies.machine.fr, `<section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription à PulsaConf</h2><form action="/api/pulsaconf/register" method="post"></form></section>`),
  appendToMain(dataBodies.machine.en, `<section id="register" aria-labelledby="register-title"><h2 id="register-title">Register for PulsaConf</h2><form action="/api/pulsaconf/register" method="post"></form></section>`)
);
const formName = T(
  appendToForm(formAction.fr, `<p><label for="full-name">Nom complet</label><input id="full-name" name="fullName" type="text" autocomplete="name" /></p>`),
  appendToForm(formAction.en, `<p><label for="full-name">Full name</label><input id="full-name" name="fullName" type="text" autocomplete="name" /></p>`)
);
const formEmail = T(
  appendToForm(formName.fr, `<p><label for="email">Adresse email</label><input id="email" name="email" type="email" autocomplete="email" required /></p>`),
  appendToForm(formName.en, `<p><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required /></p>`)
);
const formLongFields = T(
  appendToForm(formEmail.fr, `<p><label for="workshop">Atelier souhaité</label><select id="workshop" name="workshop" required><option value="">Choisir un atelier</option><option value="html">HTML sémantique</option><option value="forms">Formulaires accessibles</option></select></p><p><label for="needs">Besoins d'accessibilité ou alimentaires</label><textarea id="needs" name="needs" rows="4"></textarea></p>`),
  appendToForm(formEmail.en, `<p><label for="workshop">Preferred workshop</label><select id="workshop" name="workshop" required><option value="">Choose a workshop</option><option value="html">Semantic HTML</option><option value="forms">Accessible forms</option></select></p><p><label for="needs">Accessibility or dietary requirements</label><textarea id="needs" name="needs" rows="4"></textarea></p>`)
);
const formChoices = T(
  appendToForm(formLongFields.fr, `<div><p id="level-prompt">Niveau actuel en HTML</p><label><input type="radio" name="level" value="beginner" required /> Je débute</label><label><input type="radio" name="level" value="practice" /> Je pratique déjà</label></div><p><label><input type="checkbox" name="updates" value="yes" required /> J'accepte de recevoir les informations pratiques de PulsaConf</label></p>`),
  appendToForm(formLongFields.en, `<div><p id="level-prompt">Current HTML level</p><label><input type="radio" name="level" value="beginner" required /> I am a beginner</label><label><input type="radio" name="level" value="practice" /> I already practice</label></div><p><label><input type="checkbox" name="updates" value="yes" required /> I agree to receive practical PulsaConf information</label></p>`)
);
const formSubmit = T(
  appendToForm(formChoices.fr, `<button type="submit">Demander mon invitation PulsaConf</button>`),
  appendToForm(formChoices.en, `<button type="submit">Request my PulsaConf invitation</button>`)
);
const formBodies = {
  action: formAction,
  name: formName,
  email: formEmail,
  longFields: formLongFields,
  choices: formChoices,
  submit: formSubmit
};

const feedbackHelp = T(
  formBodies.submit.fr.replace(`<p><label for="email">Adresse email</label><input id="email" name="email" type="email" autocomplete="email" required /></p>`, `<div><label for="email">Adresse email</label><p id="email-help">Utilise l'adresse qui recevra ton invitation.</p><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-help" /></div>`),
  formBodies.submit.en.replace(`<p><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required /></p>`, `<div><label for="email">Email address</label><p id="email-help">Use the address that will receive your invitation.</p><input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-help" /></div>`)
);
const feedbackError = T(
  feedbackHelp.fr.replace("</form>", `</form><template id="email-error-after-validation"><p id="email-error" role="alert">Saisis une adresse email valide.</p><input id="email" name="email" type="email" autocomplete="email" required aria-invalid="true" aria-describedby="email-help email-error" /></template>`),
  feedbackHelp.en.replace("</form>", `</form><template id="email-error-after-validation"><p id="email-error" role="alert">Enter a valid email address.</p><input id="email" name="email" type="email" autocomplete="email" required aria-invalid="true" aria-describedby="email-help email-error" /></template>`)
);
const feedbackGroup = T(
  feedbackError.fr.replace(`<div><p id="level-prompt">Niveau actuel en HTML</p><label><input type="radio" name="level" value="beginner" required /> Je débute</label><label><input type="radio" name="level" value="practice" /> Je pratique déjà</label></div>`, `<fieldset><legend>Niveau actuel en HTML</legend><label><input type="radio" name="level" value="beginner" required /> Je débute</label><label><input type="radio" name="level" value="practice" /> Je pratique déjà</label></fieldset>`),
  feedbackError.en.replace(`<div><p id="level-prompt">Current HTML level</p><label><input type="radio" name="level" value="beginner" required /> I am a beginner</label><label><input type="radio" name="level" value="practice" /> I already practice</label></div>`, `<fieldset><legend>Current HTML level</legend><label><input type="radio" name="level" value="beginner" required /> I am a beginner</label><label><input type="radio" name="level" value="practice" /> I already practice</label></fieldset>`)
);
const feedbackDisabled = T(
  appendToForm(feedbackGroup.fr, `<fieldset disabled aria-describedby="waitlist-help"><legend>Liste d'attente SMS</legend><label><input type="checkbox" name="waitlist" value="yes" /> Me prévenir par SMS</label></fieldset><p id="waitlist-help">Cette option ouvrira après validation du service de messagerie.</p>`),
  appendToForm(feedbackGroup.en, `<fieldset disabled aria-describedby="waitlist-help"><legend>SMS waitlist</legend><label><input type="checkbox" name="waitlist" value="yes" /> Notify me by text message</label></fieldset><p id="waitlist-help">This option will open after the messaging service is confirmed.</p>`)
);
const feedbackStatus = T(
  appendToForm(feedbackDisabled.fr, `<p id="form-status" role="status" aria-live="polite" aria-atomic="true"></p>`),
  appendToForm(feedbackDisabled.en, `<p id="form-status" role="status" aria-live="polite" aria-atomic="true"></p>`)
);
const feedbackStates = T(
  feedbackStatus.fr.replace("</section></main>", `<template id="registration-busy-state"><section aria-busy="true"><p role="status">Envoi de l'inscription en cours.</p></section></template><template id="registration-failure-state"><section aria-busy="false"><p role="alert">Le service d'inscription répond lentement. Réessaie dans une minute.</p></section></template></section></main>`),
  feedbackStatus.en.replace("</section></main>", `<template id="registration-busy-state"><section aria-busy="true"><p role="status">Registration is being submitted.</p></section></template><template id="registration-failure-state"><section aria-busy="false"><p role="alert">The registration service is responding slowly. Try again in one minute.</p></section></template></section></main>`)
);
const feedbackBodies = {
  help: feedbackHelp,
  error: feedbackError,
  group: feedbackGroup,
  disabled: feedbackDisabled,
  status: feedbackStatus,
  states: feedbackStates
};

const appendToHead = (document, markup) => document.replace("</head>", `${markup}</head>`);
const seoTitle = T(
  htmlShell(feedbackBodies.states.fr).replace("<title>PulsaConf 2026</title>", "<title>PulsaConf 2026 - Ateliers HTML accessibles</title>"),
  htmlShell(feedbackBodies.states.en).replace('lang="fr"', 'lang="en"').replace("<title>PulsaConf 2026</title>", "<title>PulsaConf 2026 - Accessible HTML workshops</title>")
);
const seoDescription = T(
  appendToHead(seoTitle.fr, `<meta name="description" content="PulsaConf 2026 propose des ateliers gratuits sur HTML sémantique, les formulaires accessibles et l'inscription." />`),
  appendToHead(seoTitle.en, `<meta name="description" content="PulsaConf 2026 offers free workshops on semantic HTML, accessible forms, and registration." />`)
);
const seoCanonical = T(
  appendToHead(seoDescription.fr, `<!-- example.com est réservé à la documentation ; remplace cette URL avant publication. --><link rel="canonical" href="https://example.com/pulsaconf" />`),
  appendToHead(seoDescription.en, `<!-- example.com is reserved for documentation; replace this URL before publishing. --><link rel="canonical" href="https://example.com/en/pulsaconf" />`)
);
const seoOpenGraph = T(
  appendToHead(seoCanonical.fr, `<meta property="og:title" content="PulsaConf 2026 - Ateliers HTML accessibles" /><meta property="og:description" content="Une journée gratuite d'ateliers HTML accessibles le 18 septembre." /><meta property="og:url" content="https://example.com/pulsaconf" /><meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />`),
  appendToHead(seoCanonical.en, `<meta property="og:title" content="PulsaConf 2026 - Accessible HTML workshops" /><meta property="og:description" content="A free day of accessible HTML workshops on September 18." /><meta property="og:url" content="https://example.com/en/pulsaconf" /><meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />`)
);
const seoLanguages = T(
  appendToHead(seoOpenGraph.fr, `<link rel="icon" href="/assets/favicon.ico" /><link rel="alternate" hreflang="fr" href="https://example.com/pulsaconf" /><link rel="alternate" hreflang="en" href="https://example.com/en/pulsaconf" />`),
  appendToHead(seoOpenGraph.en, `<link rel="icon" href="/assets/favicon.ico" /><link rel="alternate" hreflang="fr" href="https://example.com/pulsaconf" /><link rel="alternate" hreflang="en" href="https://example.com/en/pulsaconf" />`)
);
const seoStructured = T(
  appendToHead(seoLanguages.fr, `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"PulsaConf 2026","description":"Ateliers HTML accessibles pour débutants.","startDate":"2026-09-18T09:00:00+02:00","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","inLanguage":"fr","location":{"@type":"Place","name":"Auditorium"}}</script>`),
  appendToHead(seoLanguages.en, `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"PulsaConf 2026","description":"Accessible HTML workshops for beginners.","startDate":"2026-09-18T09:00:00+02:00","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","inLanguage":"en","location":{"@type":"Place","name":"Auditorium"}}</script>`)
);
const seoDocuments = {
  title: seoTitle,
  description: seoDescription,
  canonical: seoCanonical,
  openGraph: seoOpenGraph,
  languages: seoLanguages,
  structured: seoStructured
};

const replaceDocumentBody = (document, body) => document.replace(/<body>[\s\S]*<\/body>/, `<body>\n${body}\n  </body>`);
const finalShellBodies = T(
  `    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><p>Une journée gratuite pour construire un web plus clair et accessible.</p></header>\n    <main id="main-content"><p>Le programme final est en cours d'assemblage.</p></main>\n    <footer id="contact"><p>PulsaConf est un événement pédagogique fictif.</p></footer>`,
  `    <a href="#main-content">Skip to main content</a>\n    <header><h1>PulsaConf 2026</h1><p>A free day for building a clearer, more accessible web.</p></header>\n    <main id="main-content"><p>The final program is being assembled.</p></main>\n    <footer id="contact"><p>PulsaConf is a fictional learning event.</p></footer>`
);
const finalNavigationBodies = T(
  `    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><p>Une journée gratuite pour construire un web plus clair et accessible.</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#speakers">Intervenants</a><a href="#schedule">Planning</a><a href="#register">Inscription</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Découvrir PulsaTeach (nouvel onglet)</a></nav></header>\n    <main id="main-content"><section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2></section><section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2></section><section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2></section><section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2></section></main>\n    <footer id="contact"><p>PulsaConf est un événement pédagogique fictif.</p></footer>`,
  `    <a href="#main-content">Skip to main content</a>\n    <header><h1>PulsaConf 2026</h1><p>A free day for building a clearer, more accessible web.</p><nav aria-label="Main navigation"><a href="#program" aria-current="location">Program</a><a href="#speakers">Speakers</a><a href="#schedule">Schedule</a><a href="#register">Registration</a><a href="#contact">Contact</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Explore PulsaTeach (new tab)</a></nav></header>\n    <main id="main-content"><section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2></section><section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Speakers</h2></section><section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Schedule</h2></section><section id="register" aria-labelledby="register-title"><h2 id="register-title">Registration</h2></section></main>\n    <footer id="contact"><p>PulsaConf is a fictional learning event.</p></footer>`
);
const finalContentBodies = T(
  finalNavigationBodies.fr.replace(`<section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2></section>`, `<section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><p>Deux ateliers progressifs pour apprendre par la pratique.</p><article><h3>Structurer une page événementielle</h3><p>Maya transforme un contenu brut en sections autonomes.</p></article><article><h3>Rendre un formulaire robuste</h3><p>Samir relie labels, aides, erreurs et statuts.</p></article><h3>Pourquoi venir ?</h3><ul><li>Ateliers guidés</li><li>Supports accessibles</li><li>Projet portfolio</li></ul><h3>Préparer sa venue</h3><ol><li>Choisir un atelier</li><li>S'inscrire</li><li>Apporter un ordinateur chargé</li></ol></section>`).replace(`<section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2></section>`, `<section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><figure><img src="/assets/pulsaconf-maya.svg" alt="Maya présente la structure d'une page HTML" width="640" height="360" /><figcaption>Maya, développeuse front-end et mentor HTML.</figcaption></figure><figure><img src="/assets/pulsaconf-samir.svg" alt="Samir inspecte un arbre DOM" width="640" height="360" loading="lazy" /><figcaption>Samir, spécialiste accessibilité.</figcaption></figure><video controls width="640"><source src="/assets/pulsaconf-demo.webm" type="video/webm" /><track kind="captions" src="/assets/pulsaconf-captions-fr.vtt" srclang="fr" label="Français" default /></video><p><strong>Transcription :</strong> La vidéo présente les ateliers et le suivi de progression.</p></section>`).replace(`<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2></section>`, `<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2><table><caption>Horaires des ateliers PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th><th scope="col">Places</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9 h 30</time></td><td>HTML sémantique</td><td>Auditorium</td><td><data value="120">120 places</data></td></tr><tr><td><time datetime="2026-09-18T11:00">11 h</time></td><td>Formulaires accessibles</td><td>Laboratoire</td><td><data value="40">40 places</data></td></tr></tbody></table></section>`),
  finalNavigationBodies.en.replace(`<section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2></section>`, `<section id="program" aria-labelledby="program-title"><h2 id="program-title">Program</h2><p>Two progressive workshops for hands-on learning.</p><article><h3>Structure an event page</h3><p>Maya turns raw content into standalone sections.</p></article><article><h3>Make a form robust</h3><p>Samir connects labels, help, errors, and statuses.</p></article><h3>Why attend?</h3><ul><li>Guided workshops</li><li>Accessible materials</li><li>Portfolio project</li></ul><h3>Prepare your visit</h3><ol><li>Choose a workshop</li><li>Register</li><li>Bring a charged computer</li></ol></section>`).replace(`<section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Speakers</h2></section>`, `<section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Speakers</h2><figure><img src="/assets/pulsaconf-maya.svg" alt="Maya presents the structure of an HTML page" width="640" height="360" /><figcaption>Maya, front-end developer and HTML mentor.</figcaption></figure><figure><img src="/assets/pulsaconf-samir.svg" alt="Samir inspects a DOM tree" width="640" height="360" loading="lazy" /><figcaption>Samir, accessibility specialist.</figcaption></figure><video controls width="640"><source src="/assets/pulsaconf-demo.webm" type="video/webm" /><track kind="captions" src="/assets/pulsaconf-captions-en.vtt" srclang="en" label="English" default /></video><p><strong>Transcript:</strong> The video introduces the workshops and progress tracking.</p></section>`).replace(`<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Schedule</h2></section>`, `<section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Schedule</h2><table><caption>PulsaConf workshop times</caption><thead><tr><th scope="col">Time</th><th scope="col">Workshop</th><th scope="col">Room</th><th scope="col">Seats</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9:30 AM</time></td><td>Semantic HTML</td><td>Auditorium</td><td><data value="120">120 seats</data></td></tr><tr><td><time datetime="2026-09-18T11:00">11:00 AM</time></td><td>Accessible forms</td><td>Lab</td><td><data value="40">40 seats</data></td></tr></tbody></table></section>`)
);
const finalRegistration = T(
  `<section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2><form action="/api/pulsaconf/register" method="post" aria-describedby="form-status"><fieldset><legend>Coordonnées et atelier</legend><p><label for="final-name">Nom complet</label><input id="final-name" name="fullName" autocomplete="name" required /></p><p><label for="final-email">Adresse email</label><span id="final-email-help">Utilise l'adresse qui recevra l'invitation.</span><input id="final-email" name="email" type="email" autocomplete="email" required aria-describedby="final-email-help" /></p><p><label for="final-workshop">Atelier souhaité</label><select id="final-workshop" name="workshop" required><option value="">Choisir</option><option value="html">HTML sémantique</option><option value="forms">Formulaires accessibles</option></select></p></fieldset><button type="submit">Demander mon invitation PulsaConf</button><p id="form-status" role="status" aria-live="polite" aria-atomic="true"></p></form><template id="final-email-error"><p id="final-error" role="alert">Saisis une adresse email valide.</p><input aria-invalid="true" aria-describedby="final-email-help final-error" /></template><template id="final-busy"><section aria-busy="true"><p role="status">Envoi en cours.</p></section></template></section>`,
  `<section id="register" aria-labelledby="register-title"><h2 id="register-title">Registration</h2><form action="/api/pulsaconf/register" method="post" aria-describedby="form-status"><fieldset><legend>Contact details and workshop</legend><p><label for="final-name">Full name</label><input id="final-name" name="fullName" autocomplete="name" required /></p><p><label for="final-email">Email address</label><span id="final-email-help">Use the address that will receive the invitation.</span><input id="final-email" name="email" type="email" autocomplete="email" required aria-describedby="final-email-help" /></p><p><label for="final-workshop">Preferred workshop</label><select id="final-workshop" name="workshop" required><option value="">Choose</option><option value="html">Semantic HTML</option><option value="forms">Accessible forms</option></select></p></fieldset><button type="submit">Request my PulsaConf invitation</button><p id="form-status" role="status" aria-live="polite" aria-atomic="true"></p></form><template id="final-email-error"><p id="final-error" role="alert">Enter a valid email address.</p><input aria-invalid="true" aria-describedby="final-email-help final-error" /></template><template id="final-busy"><section aria-busy="true"><p role="status">Submission in progress.</p></section></template></section>`
);
const finalInteractionBodies = T(
  finalContentBodies.fr.replace(`<section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2></section>`, finalRegistration.fr),
  finalContentBodies.en.replace(`<section id="register" aria-labelledby="register-title"><h2 id="register-title">Registration</h2></section>`, finalRegistration.en)
);
const finalReleaseBodies = T(
  finalInteractionBodies.fr.replace(`<footer id="contact"><p>PulsaConf est un événement pédagogique fictif.</p></footer>`, `<footer id="contact"><p>PulsaConf est un événement pédagogique fictif.</p><address><a href="mailto:equipe@pulsateach.dev">Écrire à l'équipe PulsaConf</a> · <a href="/assets/programme-pulsaconf.pdf" download>Télécharger le programme PDF</a></address></footer>`),
  finalInteractionBodies.en.replace(`<footer id="contact"><p>PulsaConf is a fictional learning event.</p></footer>`, `<footer id="contact"><p>PulsaConf is a fictional learning event.</p><address><a href="mailto:team@pulsateach.dev">Email the PulsaConf team</a> · <a href="/assets/pulsaconf-program.pdf" download>Download the PDF program</a></address></footer>`)
);
const finalDocuments = {
  shell: T(replaceDocumentBody(seoDocuments.structured.fr, finalShellBodies.fr), replaceDocumentBody(seoDocuments.structured.en, finalShellBodies.en)),
  navigation: T(replaceDocumentBody(seoDocuments.structured.fr, finalNavigationBodies.fr), replaceDocumentBody(seoDocuments.structured.en, finalNavigationBodies.en)),
  content: T(replaceDocumentBody(seoDocuments.structured.fr, finalContentBodies.fr), replaceDocumentBody(seoDocuments.structured.en, finalContentBodies.en)),
  interactions: T(replaceDocumentBody(seoDocuments.structured.fr, finalInteractionBodies.fr), replaceDocumentBody(seoDocuments.structured.en, finalInteractionBodies.en)),
  release: T(replaceDocumentBody(seoDocuments.structured.fr, finalReleaseBodies.fr), replaceDocumentBody(seoDocuments.structured.en, finalReleaseBodies.en))
};

const modules = [
  {
    id: "html-getting-started",
    title: P("Introduction, outils et méthode", "Introduction, tools, and method"),
    vocabulary: vocab.setup,
    lessons: [
      {
        id: "html-00-what-html-does",
        title: P("Ce que HTML fait vraiment", "What HTML really does"),
        brief: P("Distingue structure HTML, style CSS et comportement JavaScript avant d'écrire PulsaConf.", "Separate HTML structure, CSS style, and JavaScript behavior before writing PulsaConf."),
        focus: T("le rôle exact de HTML", "the exact role of HTML"),
        starter: `PulsaConf 2026\nUne journée pour apprendre le web.`,
        solution: `<h1>PulsaConf 2026</h1>\n<p>Une journée pour apprendre le web.</p>`,
        tests: [test("selector", "main heading", "h1"), test("selector", "paragraph", "p"), test("contains", "event name", "PulsaConf 2026"), test("notContains", "no style tag", "<style"), test("notContains", "no script tag", "<script")]
      },
      {
        id: "html-00-install-toolkit",
        title: P("Écrire le manifeste des outils", "Write the tool manifest"),
        brief: P("Produis dans l'éditeur un artefact qui distingue outil, rôle et vérification locale, sans prétendre installer quoi que ce soit.", "Produce an artifact in the editor that separates tool, purpose, and local check without pretending to install anything."),
        focus: T("la préparation vérifiable de l'environnement", "verifiable environment readiness"),
        starter: `<section>\n  <h2>Manifeste de préparation</h2>\n  <!-- Décris les outils et les vérifications à effectuer localement. -->\n</section>`,
        solution: `<section>\n  <h2>Manifeste de préparation</h2>\n  <dl>\n    <dt>Navigateur moderne</dt>\n    <dd>Rôle : afficher la page. Vérification locale : ouvrir les DevTools.</dd>\n    <dt>Éditeur de code</dt>\n    <dd>Rôle : modifier le fichier. Vérification locale : confirmer la coloration HTML.</dd>\n    <dt>index.html</dt>\n    <dd>Rôle : servir de point d'entrée. Vérification locale : contrôler le nom et l'extension du fichier.</dd>\n  </dl>\n</section>`,
        tests: [test("selector", "manifest section", "section"), test("selector", "manifest heading", "section > h2"), test("minSelector", "three tools", "dt", 3), test("minSelector", "three checks", "dd", 3), test("contains", "honest local check", "Vérification locale")]
      },
      {
        id: "html-00-create-index-file",
        title: P("Vérifier la convention index.html", "Check the index.html convention"),
        brief: P("Prépare le contenu du fichier, puis vérifie localement que son nom complet est index.html. L'éditeur intégré ne peut pas renommer un fichier sur ton ordinateur.", "Prepare the file content, then check locally that its full name is index.html. The embedded editor cannot rename a file on your computer."),
        focus: T("le fichier d'entrée du projet", "the project entry file"),
        starter: `<!-- Le fichier s'appelle encore note.txt -->\nPulsaConf`,
        solution: `<p>Fichier de travail : <code>index.html</code></p>\n<h1>PulsaConf 2026</h1>\n<p>Premier aperçu du projet événementiel.</p>`,
        tests: [test("selector", "visible filename", "code"), test("contains", "index filename", "index.html"), test("selector", "heading", "h1"), test("selector", "intro paragraphs", "p"), test("notContains", "no txt", "note.txt")]
      },
      {
        id: "html-00-open-in-browser",
        title: P("Ouvrir, sauvegarder, recharger", "Open, save, reload"),
        brief: P("Décris la boucle de travail qui évite les faux bugs de débutant.", "Describe the workflow loop that avoids beginner false bugs."),
        focus: T("la boucle de feedback navigateur", "the browser feedback loop"),
        starter: T(`<ol>\n  <li>Écrire du code</li>\n</ol>`, `<ol>\n  <li>Write code</li>\n</ol>`),
        solution: `<h2>Boucle de travail HTML</h2>\n<ol>\n  <li>Modifier index.html dans l'éditeur.</li>\n  <li>Sauvegarder le fichier.</li>\n  <li>Recharger la page dans le navigateur.</li>\n  <li>Observer le résultat avant de continuer.</li>\n</ol>`,
        tests: [test("selector", "workflow heading", "h2"), test("selector", "ordered workflow", "ol"), test("minSelector", "four steps", "li", 4), test("contains", "save", "Sauvegarder"), test("contains", "reload", "Recharger")]
      },
      {
        id: "html-00-devtools-inspector",
        title: P("Inspecter avec les DevTools", "Inspect with DevTools"),
        brief: P("Ajoute une note qui explique pourquoi l'inspecteur DOM complète l'aperçu visuel.", "Add a note explaining why the DOM inspector complements the visual preview."),
        focus: T("l'observation du DOM réel", "observing the real DOM"),
        starter: T(`<p>La page s'affiche.</p>`, `<p>The page is displayed.</p>`),
        solution: `<aside aria-label="Diagnostic DevTools">\n  <p>Les DevTools permettent d'inspecter le DOM, les balises et les attributs réellement compris par le navigateur.</p>\n  <code>Inspecter l'élément</code>\n</aside>`,
        tests: [test("selector", "diagnostic aside", "aside[aria-label]"), test("contains", "devtools", "DevTools"), test("contains", "dom", "DOM"), test("contains", "attributes", "attributs"), test("selector", "inspect code", "code")]
      },
      {
        id: "html-00-read-tests",
        title: P("Lire les tests comme des exigences", "Read tests as requirements"),
        brief: P("Relie une consigne PulsaTeach à une preuve HTML observable.", "Connect a PulsaTeach instruction to observable HTML evidence."),
        focus: T("la méthode de validation", "the validation method"),
        starter: T(`<p>Je vais essayer jusqu'à ce que ça passe.</p>`, `<p>I will keep guessing until it passes.</p>`),
        solution: `<section aria-labelledby="tests-title">\n  <h2 id="tests-title">Méthode de test</h2>\n  <p>Je lis chaque test comme une exigence : sélecteur attendu, texte attendu ou anti-pattern interdit.</p>\n  <p>Je cite la preuve dans le code avant de passer à l'étape suivante.</p>\n</section>`,
        tests: [test("selector", "tests section", "section[aria-labelledby=\"tests-title\"]"), test("contains", "requirement", "exigence"), test("contains", "selector", "sélecteur"), test("contains", "proof", "preuve"), test("notContains", "no guessing", "essayer jusqu'à ce que ça passe")]
      }
    ],
    quiz: "html-00-setup-quiz",
    project: "html-00-project-local-setup"
  },
  {
    id: "html-modern-document",
    title: P("Document HTML moderne", "Modern HTML document"),
    vocabulary: vocab.document,
    lessons: [
      {
        id: "html-01-doctype-standard-mode",
        title: P("Doctype et mode standard", "Doctype and standards mode"),
        brief: P("Active le mode standard pour la page PulsaConf.", "Enable standards mode for the PulsaConf page."),
        focus: T("le démarrage fiable du document", "the reliable start of the document"),
        starter: `<html>\n  <head></head>\n  <body></body>\n</html>`,
        solution: `<!doctype html>\n<html>\n  <head></head>\n  <body></body>\n</html>`,
        tests: [test("doctype", "doctype", "<!doctype html>"), test("selector", "html root", "html"), test("selector", "head exists", "head"), test("selector", "body exists", "body"), test("notContains", "no quirks uppercase", "<!DOCTYPE HTML PUBLIC")]
      },
      {
        id: "html-01-root-lang",
        title: P("Racine html et langue", "HTML root and language"),
        brief: P("Déclare le français comme langue principale de cette version de PulsaConf.", "Declare English as the primary language of this PulsaConf version."),
        focus: T("la langue principale du document", "the document primary language"),
        starter: `<!doctype html>\n<html>\n  <head></head>\n  <body></body>\n</html>`,
        solution: T(`<!doctype html>\n<html lang="fr">\n  <head></head>\n  <body></body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head></head>\n  <body></body>\n</html>`),
        tests: [test("doctype", "doctype", "<!doctype html>"), test("attributeEquals", "document language", { selector: "html", attribute: "lang", expected: T("fr", "en") }), test("notContains", "no empty lang", "lang=\"\""), test("selector", "head exists", "head"), test("selector", "body exists", "body")]
      },
      {
        id: "html-01-head-body-roles",
        title: P("Head pour les métadonnées, body pour le contenu", "Head for metadata, body for content"),
        brief: P("Place le titre visible de PulsaConf dans body, pas dans head.", "Place the visible PulsaConf title in body, not head."),
        focus: T("la séparation métadonnées/contenu", "the metadata/content separation"),
        starter: T(`<!doctype html>\n<html lang="fr">\n  <head></head>\n  <body>\n    <!-- Ajoute le contenu visible ici. -->\n  </body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head></head>\n  <body>\n    <!-- Add the visible content here. -->\n  </body>\n</html>`),
        solution: T(`<!doctype html>\n<html lang="fr">\n  <head></head>\n  <body>\n    <main>\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée gratuite pour apprendre le web par la pratique.</p>\n    </main>\n  </body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head></head>\n  <body>\n    <main>\n      <h1>PulsaConf 2026</h1>\n      <p>A free day of hands-on web learning.</p>\n    </main>\n  </body>\n</html>`),
        tests: [test("selector", "main", "body main"), test("selector", "visible h1", "body h1"), test("exactSelector", "one h1", "h1", 1), test("selector", "paragraph", "main p"), test("notContains", "no h1 in head", "<head>\n    <h1>")]
      },
      {
        id: "html-01-charset-utf8",
        title: P("Charset UTF-8", "UTF-8 charset"),
        brief: P("Déclare UTF-8 pour que le navigateur décode le fichier avec le même encodage que celui utilisé lors de son enregistrement.", "Declare UTF-8 so the browser decodes the file with the same encoding used when it was saved."),
        focus: T("l'encodage fiable du texte", "reliable text encoding"),
        starter: T(`<!doctype html>\n<html lang="fr">\n  <head></head>\n  <body>\n    <main><h1>PulsaConf 2026</h1><p>Accessibilité, données et formulaires.</p></main>\n  </body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head></head>\n  <body>\n    <main><h1>PulsaConf 2026</h1><p>Accessibility, data, and forms.</p></main>\n  </body>\n</html>`),
        solution: T(`<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n  </head>\n  <body>\n    <main><h1>PulsaConf 2026</h1><p>Accessibilité, données et formulaires.</p></main>\n  </body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n  </head>\n  <body>\n    <main><h1>PulsaConf 2026</h1><p>Accessibility, data, and forms.</p></main>\n  </body>\n</html>`),
        tests: [test("exactSelector", "one UTF-8 declaration", "head meta[charset=\"UTF-8\"]", 1), test("selector", "document language", "html[lang]"), test("selector", "head", "head"), test("selector", "body", "body"), test("selector", "visible content", "body main > p")]
      },
      {
        id: "html-01-viewport-mobile",
        title: P("Viewport mobile", "Mobile viewport"),
        brief: P("Configure la largeur de mise en page mobile ; les styles responsive seront traités séparément.", "Configure the mobile layout width; responsive styles will be handled separately."),
        focus: T("l'adaptation mobile minimale", "the minimal mobile adaptation"),
        starter: T(`<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`),
        solution: T(`<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`),
        tests: [test("exactSelector", "one viewport", "head meta[name=\"viewport\"]", 1), test("attributeEquals", "viewport configuration", { selector: "meta[name=\"viewport\"]", attribute: "content", expected: "width=device-width, initial-scale=1.0" }), test("selector", "charset", "meta[charset=\"UTF-8\"]"), test("selector", "document language", "html[lang]"), test("selector", "visible heading", "body h1")]
      },
      {
        id: "html-01-title-description",
        title: P("Title et description utiles", "Useful title and description"),
        brief: P("Décris PulsaConf dans le head avec un titre et une description précis.", "Describe PulsaConf in the head with a precise title and description."),
        focus: T("l'identité de la page dans le head", "the page identity in the head"),
        starter: T(`<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>À compléter</title>\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Complete me</title>\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`),
        solution: T(`<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>PulsaConf 2026 - Ateliers HTML accessibles</title>\n    <meta name="description" content="PulsaConf 2026 propose des ateliers gratuits sur HTML, l'accessibilité et la publication web." />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`, `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>PulsaConf 2026 - Accessible HTML workshops</title>\n    <meta name="description" content="PulsaConf 2026 offers free workshops on HTML, accessibility, and web publishing." />\n  </head>\n  <body><main><h1>PulsaConf 2026</h1></main></body>\n</html>`),
        tests: [test("exactSelector", "one page title", "head > title", 1), test("notContains", "no placeholder title", T("À compléter", "Complete me")), test("nonEmptyAttribute", "page description", { selector: "meta[name=\"description\"]", attribute: "content" }), test("attributeIncludes", "specific description", { selector: "meta[name=\"description\"]", attribute: "content", expected: ["PulsaConf", "2026"] }), test("exactSelector", "one visible heading", "body h1", 1)]
      }
    ],
    quiz: "html-01-document-quiz",
    project: "html-01-project-skeleton"
  },
  {
    id: "html-text-sections",
    title: P("Textes, titres et sections", "Text, headings, and sections"),
    vocabulary: vocab.semantics,
    lessons: [
      {
        id: "html-02-main-h1",
        title: P("Main et titre principal", "Main and main heading"),
        brief: P("Crée le contenu principal de PulsaConf avec un seul h1.", "Create PulsaConf main content with a single h1."),
        focus: T("le repère principal de la page", "the main page landmark"),
        starter: localizedHtmlShell(`    <h1>PulsaConf 2026</h1>`, `    <h1>PulsaConf 2026</h1>`),
        solution: localizedHtmlShell(semanticsBodies.main.fr, semanticsBodies.main.en),
        tests: [test("exactSelector", "one main region", "main#main-content", 1), test("exactSelector", "one h1 convention", "h1", 1), test("selector", "h1 inside main", "main#main-content > h1"), test("contains", "event title", "PulsaConf 2026"), test("selector", "document body", "body")]
      },
      {
        id: "html-02-heading-outline",
        title: P("Hiérarchie h1, h2, h3", "H1, h2, h3 hierarchy"),
        brief: P("Ajoute deux sections avec des titres de niveau logique.", "Add two sections with logical heading levels."),
        focus: T("le plan lisible de PulsaConf", "the readable PulsaConf outline"),
        starter: localizedHtmlShell(semanticsBodies.main.fr, semanticsBodies.main.en),
        solution: localizedHtmlShell(semanticsBodies.outline.fr, semanticsBodies.outline.en),
        tests: [test("exactSelector", "one h1 convention", "h1", 1), test("exactSelector", "two topic headings", "main > section > h2", 2), test("selector", "workshop subheading", "#program-title ~ h3"), test("referenceExists", "section names resolve", { selector: "main > section[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "outline order", ["h1", "#program-title", "#program-title ~ h3"])]
      },
      {
        id: "html-02-paragraphs-emphasis",
        title: P("Paragraphes et emphase réelle", "Paragraphs and real emphasis"),
        brief: P("Ajoute une accroche lisible avec une emphase qui change le sens.", "Add a readable intro with emphasis that changes meaning."),
        focus: T("l'introduction éditoriale de l'événement", "the editorial event introduction"),
        starter: localizedHtmlShell(semanticsBodies.outline.fr, semanticsBodies.outline.en),
        solution: localizedHtmlShell(semanticsBodies.emphasis.fr, semanticsBodies.emphasis.en),
        tests: [test("minSelector", "introductory paragraphs", "main > p", 2), test("selector", "important warning", "main > p > strong"), test("selector", "stressed phrase", "main > p > em"), test("selector", "existing program heading", "#program-title"), test("exactSelector", "one h1 convention", "h1", 1)]
      },
      {
        id: "html-02-section-article-aside",
        title: P("Section, article et aside", "Section, article, and aside"),
        brief: P("Sépare le programme, une session autonome et une note pratique.", "Separate the program, a standalone session, and a practical note."),
        focus: T("les blocs sémantiques du programme", "the semantic program blocks"),
        starter: localizedHtmlShell(semanticsBodies.emphasis.fr, semanticsBodies.emphasis.en),
        solution: localizedHtmlShell(semanticsBodies.structure.fr, semanticsBodies.structure.en),
        tests: [test("referenceExists", "program name resolves", { selector: "section#program[aria-labelledby]", attribute: "aria-labelledby" }), test("selector", "standalone workshop", "#program > article"), test("selector", "article heading", "#program > article > h3"), test("selector", "supplementary tip", "#program > aside[aria-label]"), test("noneMatch", "no generic program blocks", { selector: "#program > *", matches: "div" })]
      },
      {
        id: "html-02-quote-details",
        title: P("Citation, details et summary", "Quote, details, and summary"),
        brief: P("Ajoute une citation et une FAQ dépliable native.", "Add a quote and a native expandable FAQ."),
        focus: T("les compléments de contenu natifs", "native supplementary content"),
        starter: localizedHtmlShell(semanticsBodies.structure.fr, semanticsBodies.structure.en),
        solution: localizedHtmlShell(semanticsBodies.quote.fr, semanticsBodies.quote.en),
        tests: [test("nonEmptyAttribute", "quotation source URL", { selector: "blockquote", attribute: "cite" }), test("selector", "quoted paragraph", "blockquote > p"), test("selector", "visible source", "blockquote + p > cite"), test("selector", "native FAQ", "details > summary"), test("selector", "FAQ answer", "details > summary + p")]
      },
      {
        id: "html-02-address-abbr-code",
        title: P("address, abbr et code", "address, abbr, and code"),
        brief: P("Marque les informations de contact et les termes techniques.", "Mark up contact information and technical terms."),
        focus: T("les détails textuels précis", "precise textual details"),
        starter: localizedHtmlShell(semanticsBodies.quote.fr, semanticsBodies.quote.en),
        solution: localizedHtmlShell(semanticsBodies.precise.fr, semanticsBodies.precise.en),
        tests: [test("nonEmptyAttribute", "expanded abbreviation", { selector: "abbr", attribute: "title" }), test("selector", "file name as code", "article code"), test("selector", "document contact", "main > address"), test("selector", "working email contact", "address a[href^=\"mailto:\"]"), test("selector", "existing FAQ", "details > summary")]
      }
    ],
    quiz: "html-02-semantics-quiz",
    project: "html-02-project-program"
  },
  {
    id: "html-navigation-links",
    title: P("Navigation et liens", "Navigation and links"),
    vocabulary: vocab.navigation,
    lessons: [
      {
        id: "html-03-explicit-link-text",
        title: P("Texte de lien explicite", "Explicit link text"),
        brief: P("Remplace un lien vague par une destination compréhensible.", "Replace a vague link with an understandable destination."),
        focus: T("le texte des liens PulsaConf", "PulsaConf link text"),
        starter: localizedHtmlShell(navigationBodies.explicit.fr.replace("Découvrir la formation HTML gratuite", "Clique ici"), navigationBodies.explicit.en.replace("Explore the free HTML course", "Click here")),
        solution: localizedHtmlShell(navigationBodies.explicit.fr, navigationBodies.explicit.en),
        tests: [test("selector", "HTML course destination", "main a[href=\"/formations/html\"]"), test("contains", "explicit course text", T("Découvrir la formation HTML gratuite", "Explore the free HTML course")), test("notContainsAny", "no vague link text", [T("Clique ici", "Click here"), T("En savoir plus", "Learn more")]), test("selector", "link in main", "main p > a"), test("notContains", "no empty href", "href=\"\"")]
      },
      {
        id: "html-03-internal-anchor",
        title: P("Lien interne avec ancre", "Internal anchor link"),
        brief: P("Relie un lien de navigation à la section inscription avec un fragment et un id uniques.", "Connect a navigation link to the registration section with a fragment and unique id."),
        focus: T("la circulation dans la page", "movement within the page"),
        starter: localizedHtmlShell(navigationBodies.explicit.fr, navigationBodies.explicit.en),
        solution: localizedHtmlShell(navigationBodies.anchor.fr, navigationBodies.anchor.en),
        tests: [test("selector", "registration anchor", "a[href=\"#register\"]"), test("validFragmentTargets", "internal link resolves"), test("uniqueIds", "fragment ids are unique"), test("selector", "named registration target", "section#register > h2"), test("notContains", "no empty target", "href=\"#\"")]
      },
      {
        id: "html-03-nav-aria-label",
        title: P("Navigation principale nommée", "Named main navigation"),
        brief: P("Crée une navigation principale identifiable.", "Create identifiable main navigation."),
        focus: T("le menu principal", "the main menu"),
        starter: localizedHtmlShell(navigationBodies.anchor.fr, navigationBodies.anchor.en),
        solution: localizedHtmlShell(navigationBodies.nav.fr, navigationBodies.nav.en),
        tests: [test("attributeEquals", "main navigation name", { selector: "header nav", attribute: "aria-label", expected: T("Navigation principale", "Main navigation") }), test("exactSelector", "three navigation links", "header nav > a", 3), test("validFragmentTargets", "navigation targets resolve"), test("uniqueIds", "navigation targets are unique"), test("selector", "three named targets", "main > #program, main > #speakers, main > #register", 3)]
      },
      {
        id: "html-03-current-external-safe",
        title: P("Position courante et lien externe", "Current location and external link"),
        brief: P("Indique la position courante dans la page et annonce un lien externe ouvert dans un nouvel onglet.", "Mark the current location in the page and announce an external link opened in a new tab."),
        focus: T("les états et destinations de navigation", "navigation states and destinations"),
        starter: localizedHtmlShell(navigationBodies.nav.fr, navigationBodies.nav.en),
        solution: localizedHtmlShell(navigationBodies.current.fr, navigationBodies.current.en),
        tests: [test("selector", "current program location", "nav a[href=\"#program\"][aria-current=\"location\"]"), test("notContains", "not a separate current page", "aria-current=\"page\""), test("validFragmentTargets", "current target resolves"), test("safeBlankLinks", "safe new-tab policy"), test("contains", "new-tab warning", T("nouvel onglet", "new tab"))]
      },
      {
        id: "html-03-contact-download-links",
        title: P("Liens email, téléphone et téléchargement", "Email, phone, and download links"),
        brief: P("Ajoute des actions de contact réellement utilisables.", "Add contact actions that actually work."),
        focus: T("les liens d'action de l'événement", "event action links"),
        starter: localizedHtmlShell(navigationBodies.current.fr, navigationBodies.current.en),
        solution: localizedHtmlShell(navigationBodies.contact.fr, navigationBodies.contact.en),
        tests: [test("selector", "complete email action", T("#contact a[href=\"mailto:equipe@pulsateach.dev\"]", "#contact a[href=\"mailto:team@pulsateach.dev\"]")), test("selector", "complete phone action", "#contact a[href=\"tel:+33123456789\"]"), test("selector", "program PDF download", T("#contact a[href=\"/assets/programme-pulsaconf.pdf\"][download]", "#contact a[href=\"/assets/pulsaconf-program.pdf\"][download]")), test("validFragmentTargets", "contact navigation resolves"), test("safeBlankLinks", "external link stays safe")]
      },
      {
        id: "html-03-skip-link",
        title: P("Lien d'évitement", "Skip link"),
        brief: P("Permets aux utilisateurs clavier d'aller directement au contenu.", "Let keyboard users jump directly to content."),
        focus: T("l'accès rapide au contenu", "quick access to content"),
        starter: localizedHtmlShell(navigationBodies.contact.fr, navigationBodies.contact.en),
        solution: localizedHtmlShell(navigationBodies.skip.fr, navigationBodies.skip.en),
        tests: [test("exactSelector", "one skip link", "body > a[href=\"#main-content\"]", 1), test("validFragmentTargets", "skip target resolves"), test("uniqueIds", "skip target is unique"), test("domOrder", "skip link before repeated navigation", ["body > a[href=\"#main-content\"]", "header", "main#main-content"]), test("selector", "main heading", "main#main-content > h1")]
      }
    ],
    quiz: "html-03-navigation-quiz",
    project: "html-03-project-navigation"
  },
  {
    id: "html-media-content",
    title: P("Images, médias et contenu riche", "Images, media, and rich content"),
    vocabulary: vocab.media,
    lessons: [
      {
        id: "html-04-informative-image-alt",
        title: P("Image informative avec alt utile", "Informative image with useful alt"),
        brief: P("Décris une image d'intervenante sans répéter “image de”.", "Describe a speaker image without repeating “image of”."),
        focus: T("l'alternative d'une image informative", "the alternative for an informative image"),
        starter: localizedHtmlShell(navigationBodies.skip.fr, navigationBodies.skip.en),
        solution: localizedHtmlShell(mediaBodies.informative.fr, mediaBodies.informative.en),
        tests: [test("attributeEquals", "speaker asset", { selector: "#media img", attribute: "src", expected: "/assets/pulsaconf-maya.svg" }), test("attributeIncludes", "specific alternative", { selector: "#media img", attribute: "alt", expected: ["Maya", "HTML"] }), test("attributeEquals", "image width", { selector: "#media img", attribute: "width", expected: "640" }), test("attributeEquals", "image height", { selector: "#media img", attribute: "height", expected: "360" }), test("notContains", "no generic alternative", T("alt=\"image de", "alt=\"image of"))]
      },
      {
        id: "html-04-décorative-image-alt-empty",
        title: P("Image décorative ignorée", "Ignored decorative image"),
        brief: P("Marque une forme décorative pour qu'elle ne pollue pas la lecture.", "Mark a decorative shape so it does not pollute reading."),
        focus: T("le silence utile pour les décorations", "useful silence for decoration"),
        starter: localizedHtmlShell(mediaBodies.informative.fr, mediaBodies.informative.en),
        solution: localizedHtmlShell(mediaBodies.decorative.fr, mediaBodies.decorative.en),
        tests: [test("selector", "decorative image is silent", "header > img[src=\"/assets/pulsaconf-wave.svg\"][alt=\"\"]"), test("attributeEquals", "decoration width", { selector: "header > img", attribute: "width", expected: "120" }), test("attributeEquals", "decoration height", { selector: "header > img", attribute: "height", expected: "40" }), test("notContains", "no redundant aria hidden", "aria-hidden"), test("selector", "informative image remains", "#media img[alt]")]
      },
      {
        id: "html-04-figure-caption",
        title: P("Figure et figcaption", "Figure and figcaption"),
        brief: P("Associe une photo de scène à une légende lisible.", "Connect a venue photo to a readable caption."),
        focus: T("la relation média/légende", "the media/caption relationship"),
        starter: localizedHtmlShell(mediaBodies.decorative.fr, mediaBodies.decorative.en),
        solution: localizedHtmlShell(mediaBodies.figure.fr, mediaBodies.figure.en),
        tests: [test("exactSelector", "one speaker figure", "#media > figure", 1), test("selector", "image belongs to figure", "#media > figure > img[src=\"/assets/pulsaconf-maya.svg\"]"), test("selector", "visible caption", "#media > figure > figcaption"), test("contains", "caption names the workshop", T("Maya ouvre l'atelier", "Maya opens the workshop")), test("nonEmptyAttribute", "informative alt remains", { selector: "figure > img", attribute: "alt" })]
      },
      {
        id: "html-04-lazy-dimensions",
        title: P("Dimensions et chargement différé", "Dimensions and lazy loading"),
        brief: P("Stabilise une image non critique de galerie.", "Stabilize a non-critical gallery image."),
        focus: T("la performance d'une image secondaire", "secondary image performance"),
        starter: localizedHtmlShell(mediaBodies.figure.fr, mediaBodies.figure.en),
        solution: localizedHtmlShell(mediaBodies.lazy.fr, mediaBodies.lazy.en),
        tests: [test("exactSelector", "one deferred image", "img[loading=\"lazy\"]", 1), test("selector", "secondary workshop image", "img[src=\"/assets/pulsaconf-workshop.svg\"][loading=\"lazy\"]"), test("attributeEquals", "reserved width", { selector: "img[loading=\"lazy\"]", attribute: "width", expected: "640" }), test("attributeEquals", "reserved height", { selector: "img[loading=\"lazy\"]", attribute: "height", expected: "360" }), test("noneMatch", "primary image stays eager", { selector: "img[src=\"/assets/pulsaconf-maya.svg\"]", matches: "[loading=\"lazy\"]" })]
      },
      {
        id: "html-04-audio-fallback",
        title: P("Audio avec fallback", "Audio with fallback"),
        brief: P("Ajoute un extrait audio contrôlable et un lien de secours.", "Add controllable audio and a fallback link."),
        focus: T("l'écoute accessible d'une annonce", "accessible listening to an announcement"),
        starter: localizedHtmlShell(mediaBodies.lazy.fr, mediaBodies.lazy.en),
        solution: localizedHtmlShell(mediaBodies.audio.fr, mediaBodies.audio.en),
        tests: [test("selector", "audio controls", "#audio audio[controls]"), test("attributeEquals", "localized audio file", { selector: "#audio audio source", attribute: "src", expected: T("/assets/pulsaconf-intro-fr.wav", "/assets/pulsaconf-intro-en.wav") }), test("attributeEquals", "audio MIME type", { selector: "#audio audio source", attribute: "type", expected: "audio/wav" }), test("selector", "visible download outside player", "#audio audio + p > a[download]"), test("contains", "equivalent transcript", T("neuf heures trente", "nine thirty"))]
      },
      {
        id: "html-04-video-captions",
        title: P("Vidéo avec sous-titres", "Video with captions"),
        brief: P("Publie une vidéo de présentation avec une piste de sous-titres.", "Publish an intro video with a captions track."),
        focus: T("la vidéo compréhensible sans son", "video understandable without sound"),
        starter: localizedHtmlShell(mediaBodies.audio.fr, mediaBodies.audio.en),
        solution: localizedHtmlShell(mediaBodies.video.fr, mediaBodies.video.en),
        tests: [test("selector", "video controls", "#video video[controls]"), test("selector", "WebM source", "#video video source[src=\"/assets/pulsaconf-demo.webm\"][type=\"video/webm\"]"), test("attributeEquals", "localized captions file", { selector: "#video track[kind=\"captions\"]", attribute: "src", expected: T("/assets/pulsaconf-captions-fr.vtt", "/assets/pulsaconf-captions-en.vtt") }), test("attributeEquals", "caption language", { selector: "#video track", attribute: "srclang", expected: T("fr", "en") }), test("selector", "default captions", "#video track[default]"), test("selector", "visible video download", "#video video + p > a[download]"), test("contains", "equivalent video transcript", T("La vidéo montre", "The video shows"))]
      }
    ],
    quiz: "html-04-media-quiz",
    project: "html-04-project-speakers-gallery"
  },
  {
    id: "html-data-tables",
    title: P("Listes, tableaux et données", "Lists, tables, and data"),
    vocabulary: vocab.data,
    lessons: [
      {
        id: "html-05-unordered-benefits",
        title: P("Liste non ordonnée", "Unordered list"),
        brief: P("Transforme trois bénéfices indépendants de PulsaConf en une vraie liste, sans inventer une priorité que le contenu ne porte pas.", "Turn three independent PulsaConf benefits into a real list without inventing an order the content does not carry."),
        focus: T("les bénéfices indépendants", "independent benefits"),
        starter: localizedHtmlShell(mediaBodies.video.fr, mediaBodies.video.en),
        solution: localizedHtmlShell(dataBodies.benefits.fr, dataBodies.benefits.en),
        tests: [test("selector", "benefits list", "#benefits > ul"), test("exactSelector", "three independent benefits", "#benefits > ul > li", 3), test("referenceExists", "benefits heading reference", { selector: "#benefits[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "benefits heading before list", ["#benefits-title", "#benefits > ul"]), test("notContains", "no fake bullets", "•")]
      },
      {
        id: "html-05-ordered-steps",
        title: P("Liste ordonnée", "Ordered list"),
        brief: P("Encode la procédure d'inscription dans l'ordre où une personne doit réellement l'exécuter, du choix à la confirmation.", "Encode registration in the order a person must actually perform it, from choosing to confirming."),
        focus: T("une procédure séquentielle", "a sequential procedure"),
        starter: localizedHtmlShell(dataBodies.benefits.fr, dataBodies.benefits.en),
        solution: localizedHtmlShell(dataBodies.steps.fr, dataBodies.steps.en),
        tests: [test("selector", "ordered registration procedure", "#registration-steps > ol"), test("exactSelector", "three ordered steps", "#registration-steps > ol > li", 3), test("referenceExists", "procedure heading reference", { selector: "#registration-steps[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "procedure sequence", ["#registration-steps li:first-child", "#registration-steps li:nth-child(2)", "#registration-steps li:last-child"]), test("contains", "confirmation step", T("Confirmer sa présence", "Confirm attendance"))]
      },
      {
        id: "html-05-definition-list",
        title: P("Liste de définitions", "Description list"),
        brief: P("Associe chaque terme technique à sa définition pour créer un glossaire qui reste compréhensible en lecture linéaire.", "Pair each technical term with its definition to create a glossary that remains understandable in linear reading."),
        focus: T("un glossaire court", "a short glossary"),
        starter: localizedHtmlShell(dataBodies.steps.fr, dataBodies.steps.en),
        solution: localizedHtmlShell(dataBodies.glossary.fr, dataBodies.glossary.en),
        tests: [test("selector", "description list", "#glossary > dl"), test("exactSelector", "three glossary terms", "#glossary > dl > dt", 3), test("exactSelector", "three glossary definitions", "#glossary > dl > dd", 3), test("referenceExists", "glossary heading reference", { selector: "#glossary[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "first term before its definition", ["#glossary dt:first-of-type", "#glossary dd:first-of-type"])]
      },
      {
        id: "html-05-table-caption",
        title: P("Tableau avec caption", "Table with caption"),
        brief: P("Présente des horaires croisés avec des ateliers dans un tableau dont le caption annonce précisément le sujet.", "Present times crossed with workshops in a table whose caption precisely announces its subject."),
        focus: T("des données vraiment tabulaires", "truly tabular data"),
        starter: localizedHtmlShell(dataBodies.glossary.fr, dataBodies.glossary.en),
        solution: localizedHtmlShell(dataBodies.table.fr, dataBodies.table.en),
        tests: [test("exactSelector", "one schedule table", "#schedule > table", 1), test("selector", "specific table caption", "#schedule > table > caption"), test("contains", "caption describes crossed data", T("Horaires et capacité", "workshop times and capacity")), test("exactSelector", "four table headings", "#schedule table th", 4), test("exactSelector", "eight data cells", "#schedule table td", 8), test("referenceExists", "schedule heading reference", { selector: "#schedule[aria-labelledby]", attribute: "aria-labelledby" })]
      },
      {
        id: "html-05-thead-tbody-scope",
        title: P("thead, tbody et scope", "thead, tbody, and scope"),
        brief: P("Sépare en-têtes et données du planning, puis déclare la portée de chaque en-tête de colonne pour la lecture assistée.", "Separate schedule headers from data, then declare each column header's scope for assistive reading."),
        focus: T("les relations du tableau", "table relationships"),
        starter: localizedHtmlShell(dataBodies.table.fr, dataBodies.table.en),
        solution: localizedHtmlShell(dataBodies.structured.fr, dataBodies.structured.en),
        tests: [test("selector", "header row group", "#schedule table > thead > tr"), test("selector", "data row group", "#schedule table > tbody"), test("allMatch", "all headers scope columns", { selector: "#schedule thead th", matches: "[scope=\"col\"]" }), test("exactSelector", "two workshop rows", "#schedule tbody > tr", 2), test("allMatch", "four cells in every data row", { selector: "#schedule tbody > tr", matches: ":has(td:nth-child(4):last-child)" }), test("domOrder", "caption headers then data", ["#schedule caption", "#schedule thead", "#schedule tbody"])]
      },
      {
        id: "html-05-time-data",
        title: P("time et data", "time and data"),
        brief: P("Conserve un libellé humain tout en exposant une date et une capacité normalisées aux outils qui réutilisent les données.", "Keep a human-readable label while exposing a normalized date and capacity to tools that reuse the data."),
        focus: T("les données exploitables", "machine-usable data"),
        starter: localizedHtmlShell(dataBodies.structured.fr, dataBodies.structured.en),
        solution: localizedHtmlShell(dataBodies.machine.fr, dataBodies.machine.en),
        tests: [test("exactSelector", "two machine-readable times", "#schedule time[datetime]", 2), test("attributeEquals", "first normalized start", { selector: "#schedule tbody tr:first-child time", attribute: "datetime", expected: "2026-09-18T09:30" }), test("attributeEquals", "second normalized start", { selector: "#schedule tbody tr:last-child time", attribute: "datetime", expected: "2026-09-18T11:00" }), test("exactSelector", "two machine-readable capacities", "#schedule data[value]", 2), test("attributeEquals", "first normalized capacity", { selector: "#schedule tbody tr:first-child data", attribute: "value", expected: "120" }), test("attributeEquals", "second normalized capacity", { selector: "#schedule tbody tr:last-child data", attribute: "value", expected: "40" }), test("contains", "visible capacity remains", T("120 places", "120 seats"))]
      }
    ],
    quiz: "html-05-data-quiz",
    project: "html-05-project-schedule"
  },
  {
    id: "html-native-forms",
    title: P("Formulaires HTML natifs", "Native HTML forms"),
    vocabulary: vocab.forms,
    lessons: [
      {
        id: "html-06-form-action-method",
        title: P("Form action et method", "Form action and method"),
        brief: P("Déclare où les données d'inscription seront envoyées et utilise POST parce que la soumission crée une inscription côté serveur.", "Declare where registration data will be sent and use POST because submission creates a server-side registration."),
        focus: T("l'envoi natif du formulaire", "native form submission"),
        starter: localizedHtmlShell(dataBodies.machine.fr, dataBodies.machine.en),
        solution: localizedHtmlShell(formBodies.action.fr, formBodies.action.en),
        tests: [test("exactSelector", "one registration form", "#register > form", 1), test("attributeEquals", "registration endpoint", { selector: "#register > form", attribute: "action", expected: "/api/pulsaconf/register" }), test("attributeEquals", "POST submission", { selector: "#register > form", attribute: "method", expected: "post" }), test("referenceExists", "registration heading reference", { selector: "#register[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "heading before form", ["#register-title", "#register > form"])]
      },
      {
        id: "html-06-label-input-text",
        title: P("Label relié au champ texte", "Label connected to text input"),
        brief: P("Donne au champ de nom un libellé visible relié par for/id, un nom de soumission et un indice d'autocomplétion adapté.", "Give the name field a visible for/id label, a submission name, and an appropriate autocomplete hint."),
        focus: T("le nom accessible d'un champ", "the accessible name of a field"),
        starter: localizedHtmlShell(formBodies.action.fr, formBodies.action.en),
        solution: localizedHtmlShell(formBodies.name.fr, formBodies.name.en),
        tests: [test("labelForControl", "full-name label connection", { selector: "label[for=\"full-name\"]" }), test("attributeEquals", "submitted field name", { selector: "#full-name", attribute: "name", expected: "fullName" }), test("attributeEquals", "text control type", { selector: "#full-name", attribute: "type", expected: "text" }), test("attributeEquals", "name autofill token", { selector: "#full-name", attribute: "autocomplete", expected: "name" }), test("domOrder", "label before name field", ["label[for=\"full-name\"]", "#full-name"])]
      },
      {
        id: "html-06-email-required",
        title: P("Email requis", "Required email"),
        brief: P("Configure une adresse obligatoire avec validation native, nom de soumission et autocomplétion sans remplacer le label par un placeholder.", "Configure a required address with native validation, a submission name, and autofill without replacing the label with a placeholder."),
        focus: T("la saisie email fiable", "reliable email input"),
        starter: localizedHtmlShell(formBodies.name.fr, formBodies.name.en),
        solution: localizedHtmlShell(formBodies.email.fr, formBodies.email.en),
        tests: [test("labelForControl", "email label connection", { selector: "label[for=\"email\"]" }), test("allMatch", "email is required and named", { selector: "input#email", matches: "[type=\"email\"][name=\"email\"][required]" }), test("attributeEquals", "email autofill token", { selector: "#email", attribute: "autocomplete", expected: "email" }), test("labelsAssociated", "all visible labels own one control"), test("formControlsNamed", "all active controls submit named values"), test("noneMatch", "no placeholder-only naming", { selector: "#register input", matches: "[placeholder]" })]
      },
      {
        id: "html-06-textarea-select",
        title: P("Textarea et select", "Textarea and select"),
        brief: P("Choisis select pour une liste fermée d'ateliers et textarea pour une réponse libre potentiellement longue, avec des noms envoyables.", "Choose select for a closed workshop list and textarea for a potentially long free response, with submittable names."),
        focus: T("les champs longs et les choix contrôlés", "long fields and controlled choices"),
        starter: localizedHtmlShell(formBodies.email.fr, formBodies.email.en),
        solution: localizedHtmlShell(formBodies.longFields.fr, formBodies.longFields.en),
        tests: [test("labelsAssociated", "every visible label owns one control"), test("formControlsNamed", "controls have submission names"), test("selector", "required workshop choice", "select#workshop[required]"), test("exactSelector", "workshop placeholder and choices", "#workshop > option", 3), test("attributeEquals", "empty workshop placeholder", { selector: "#workshop > option:first-child", attribute: "value", expected: "" }), test("attributeEquals", "textarea rows", { selector: "#needs", attribute: "rows", expected: "4" }), test("domOrder", "choice before free-form needs", ["#workshop", "#needs"])]
      },
      {
        id: "html-06-radio-checkbox",
        title: P("Radio et checkbox", "Radio and checkbox"),
        brief: P("Utilise un même name pour rendre les niveaux mutuellement exclusifs, puis une case séparée pour un consentement explicite.", "Use one shared name to make levels mutually exclusive, then a separate checkbox for explicit consent."),
        focus: T("les choix de formulaire", "form choices"),
        starter: localizedHtmlShell(formBodies.longFields.fr, formBodies.longFields.en),
        solution: localizedHtmlShell(formBodies.choices.fr, formBodies.choices.en),
        tests: [test("domOrder", "question before level choices", ["#level-prompt", "#register input[type=\"radio\"]"]), test("exactSelector", "two exclusive level choices", "#register input[type=\"radio\"][name=\"level\"]", 2), test("nonEmptyAttribute", "radio values are explicit", { selector: "#register input[type=\"radio\"]", attribute: "value" }), test("selector", "required level choice", "#register input[type=\"radio\"][required]"), test("selector", "required named consent", "#register input[type=\"checkbox\"][name=\"updates\"][value=\"yes\"][required]"), test("labelsAssociated", "every choice has one visible label"), test("formControlsNamed", "every active choice submits a value")]
      },
      {
        id: "html-06-submit-button",
        title: P("Bouton submit", "Submit button"),
        brief: P("Termine le parcours par un bouton submit dont le texte annonce le résultat attendu plutôt qu'une commande vague comme OK.", "Finish the flow with a submit button whose text announces the expected result rather than a vague command such as OK."),
        focus: T("l'action finale du formulaire", "the form final action"),
        starter: localizedHtmlShell(formBodies.choices.fr, formBodies.choices.en),
        solution: localizedHtmlShell(formBodies.submit.fr, formBodies.submit.en),
        tests: [test("exactSelector", "one explicit submit action", "#register button[type=\"submit\"]", 1), test("contains", "button names the outcome", T("Demander mon invitation PulsaConf", "Request my PulsaConf invitation")), test("labelsAssociated", "all visible labels own one control"), test("formControlsNamed", "all active controls submit named values"), test("domOrder", "submit follows every field", ["#needs", "#register button[type=\"submit\"]"]), test("notContainsAny", "no vague button label", [">OK<", ">Submit<", ">Envoyer<"])]
      }
    ],
    quiz: "html-06-forms-quiz",
    project: "html-06-project-registration-form"
  },
  {
    id: "html-accessible-feedback",
    title: P("Formulaires accessibles et feedback", "Accessible forms and feedback"),
    vocabulary: vocab.a11yForms,
    lessons: [
      {
        id: "html-07-help-describedby",
        title: P("Aide reliée avec aria-describedby", "Help connected with aria-describedby"),
        brief: P("Fais annoncer l'aide après le nom du champ en reliant aria-describedby à un id présent et unique dans le document.", "Have help announced after the field name by connecting aria-describedby to an id that exists uniquely in the document."),
        focus: T("la relation champ/aide", "the field/help relationship"),
        starter: localizedHtmlShell(formBodies.submit.fr, formBodies.submit.en),
        solution: localizedHtmlShell(feedbackBodies.help.fr, feedbackBodies.help.en),
        tests: [test("labelForControl", "email label connection", { selector: "label[for=\"email\"]" }), test("referenceExists", "help reference resolves", { selector: "#email[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "email includes help id", { selector: "#email", attribute: "aria-describedby", expected: "email-help" }), test("exactSelector", "one visible help message", "#register #email-help", 1), test("domOrder", "label help then field", ["label[for=\"email\"]", "#email-help", "#email"])]
      },
      {
        id: "html-07-error-message",
        title: P("Erreur de champ identifiable", "Identifiable field error"),
        brief: P("Expose une erreur visible, relie-la au champ invalide et réserve role=alert au message injecté après une validation échouée.", "Expose a visible error, connect it to the invalid field, and reserve role=alert for a message injected after failed validation."),
        focus: T("l'erreur explicite d'un champ", "an explicit field error"),
        starter: localizedHtmlShell(feedbackBodies.help.fr, feedbackBodies.help.en),
        solution: localizedHtmlShell(feedbackBodies.error.fr, feedbackBodies.error.en),
        tests: [test("noneMatch", "pristine email is not invalid", { selector: "#register form input", matches: "[aria-invalid]" }), test("noneMatch", "pristine form has no alert", { selector: "#register form *", matches: "[role=\"alert\"]" }), test("attributeIncludes", "pristine email keeps help", { selector: "#register form #email", attribute: "aria-describedby", expected: "email-help" }), test("templateSelector", "invalid snapshot marks email", { template: "#email-error-after-validation", selector: "input[aria-invalid=\"true\"][aria-describedby~=\"email-help\"][aria-describedby~=\"email-error\"]" }), test("templateSelector", "invalid snapshot announces error", { template: "#email-error-after-validation", selector: "#email-error[role=\"alert\"]" }), test("labelForControl", "email keeps its label", { selector: "label[for=\"email\"]" })]
      },
      {
        id: "html-07-fieldset-legend",
        title: P("Fieldset et legend", "Fieldset and legend"),
        brief: P("Donne un nom commun aux boutons radio avec fieldset et legend afin que la question reste disponible sur chaque option.", "Give radio buttons a shared name with fieldset and legend so the question remains available on every option."),
        focus: T("le groupe de choix nommé", "the named choice group"),
        starter: localizedHtmlShell(feedbackBodies.error.fr, feedbackBodies.error.en),
        solution: localizedHtmlShell(feedbackBodies.group.fr, feedbackBodies.group.en),
        tests: [test("exactSelector", "one level fieldset", "#register form > fieldset:not([disabled])", 1), test("selector", "group legend", "#register fieldset > legend"), test("exactSelector", "two grouped level choices", "#register fieldset input[type=\"radio\"][name=\"level\"]", 2), test("nonEmptyAttribute", "grouped radio values", { selector: "#register fieldset input[type=\"radio\"]", attribute: "value" }), test("labelsAssociated", "group choices retain labels"), test("contains", "legend names the question", T("Niveau actuel en HTML", "Current HTML level"))]
      },
      {
        id: "html-07-disabled-state",
        title: P("État désactivé expliqué", "Explained disabled state"),
        brief: P("Désactive temporairement tout un groupe natif et relie une explication visible, sans faire passer cet état pour une erreur.", "Temporarily disable an entire native group and connect a visible explanation without presenting the state as an error."),
        focus: T("un état indisponible compréhensible", "an understandable unavailable state"),
        starter: localizedHtmlShell(feedbackBodies.group.fr, feedbackBodies.group.en),
        solution: localizedHtmlShell(feedbackBodies.disabled.fr, feedbackBodies.disabled.en),
        tests: [test("exactSelector", "one disabled waitlist", "#register fieldset[disabled]", 1), test("selector", "disabled group remains named", "#register fieldset[disabled] > legend"), test("referenceExists", "unavailability reason resolves", { selector: "#register fieldset[disabled][aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "group includes reason id", { selector: "#register fieldset[disabled]", attribute: "aria-describedby", expected: "waitlist-help" }), test("selector", "reason remains outside disabled group", "#register fieldset[disabled] + #waitlist-help"), test("noneMatch", "reason is not an error alert", { selector: "#waitlist-help", matches: "[role=\"alert\"]" })]
      },
      {
        id: "html-07-status-live",
        title: P("Statut aria-live poli", "Polite aria-live status"),
        brief: P("Prépare une région de statut persistante dont le texte pourra changer après l'envoi sans interrompre immédiatement la personne.", "Prepare a persistent status region whose text can change after submission without immediately interrupting the person."),
        focus: T("le feedback non intrusif", "non-intrusive feedback"),
        starter: localizedHtmlShell(feedbackBodies.disabled.fr, feedbackBodies.disabled.en),
        solution: localizedHtmlShell(feedbackBodies.status.fr, feedbackBodies.status.en),
        tests: [test("exactSelector", "one persistent status", "#register form > #form-status", 1), test("selector", "polite atomic status", "#form-status[role=\"status\"][aria-live=\"polite\"][aria-atomic=\"true\"]"), test("domOrder", "submit before status", ["#register button[type=\"submit\"]", "#form-status"]), test("noneMatch", "status is not urgent", { selector: "#form-status", matches: "[role=\"alert\"]" }), test("noneMatch", "form is not described by transient status", { selector: "#register form", matches: "[aria-describedby~=\"form-status\"]" })]
      },
      {
        id: "html-07-busy-alert",
        title: P("Busy et alert", "Busy and alert"),
        brief: P("Signale qu'une région est en mise à jour et utilise une alerte seulement pour l'échec qui demande une nouvelle tentative.", "Mark a region as updating and use an alert only for the failure that requires another attempt."),
        focus: T("les états dynamiques importants", "important dynamic states"),
        starter: localizedHtmlShell(feedbackBodies.status.fr, feedbackBodies.status.en),
        solution: localizedHtmlShell(feedbackBodies.states.fr, feedbackBodies.states.en),
        tests: [test("noneMatch", "initial form is not busy", { selector: "#register", matches: "[aria-busy]" }), test("noneMatch", "initial form has no alert", { selector: "#register form *", matches: "[role=\"alert\"]" }), test("templateSelector", "busy snapshot marks the region", { template: "#registration-busy-state", selector: "section[aria-busy=\"true\"] > [role=\"status\"]" }), test("templateSelector", "failure snapshot clears busy state", { template: "#registration-failure-state", selector: "section[aria-busy=\"false\"]" }), test("templateSelector", "failure snapshot announces retry", { template: "#registration-failure-state", selector: "[role=\"alert\"]" }), test("contains", "failure offers a retry", T("Réessaie dans une minute", "Try again in one minute"))]
      }
    ],
    quiz: "html-07-feedback-quiz",
    project: "html-07-project-robust-form"
  },
  {
    id: "html-seo-publication",
    title: P("SEO, partage et publication", "SEO, sharing, and publishing"),
    vocabulary: vocab.seo,
    lessons: [
      {
        id: "html-08-seo-title",
        title: P("Title SEO spécifique", "Specific SEO title"),
        brief: P("Rédige un title unique qui identifie l'événement et sa proposition, sans le confondre avec le h1 visible.", "Write a unique title that identifies the event and its proposition without confusing it with the visible h1."),
        focus: T("le titre indexable", "the indexable title"),
        starter: localizedHtmlShell(feedbackBodies.states.fr, feedbackBodies.states.en),
        solution: seoDocuments.title,
        tests: [test("exactSelector", "one document title", "head > title", 1), test("contains", "specific localized title", T("<title>PulsaConf 2026 - Ateliers HTML accessibles</title>", "<title>PulsaConf 2026 - Accessible HTML workshops</title>")), test("exactSelector", "one visible event heading", "body h1", 1), test("contains", "visible event identity", "PulsaConf 2026"), test("notContainsAny", "no generic title", ["<title>Accueil</title>", "<title>Home</title>", "<title>PulsaConf 2026</title>"])]
      },
      {
        id: "html-08-meta-description",
        title: P("Meta description unique", "Unique meta description"),
        brief: P("Résume honnêtement le contenu de la page dans un attribut content non vide destiné aux aperçus de recherche.", "Honestly summarize the page content in a non-empty content attribute intended for search previews."),
        focus: T("le résumé de la page", "the page summary"),
        starter: seoDocuments.title,
        solution: seoDocuments.description,
        tests: [test("exactSelector", "one meta description", "head meta[name=\"description\"]", 1), test("attributeEquals", "honest localized summary", { selector: "meta[name=\"description\"]", attribute: "content", expected: T("PulsaConf 2026 propose des ateliers gratuits sur HTML sémantique, les formulaires accessibles et l'inscription.", "PulsaConf 2026 offers free workshops on semantic HTML, accessible forms, and registration.") }), test("allMatch", "description names HTML", { selector: "meta[name=\"description\"]", matches: "[content*=\"HTML\"]" }), test("exactSelector", "title remains unique", "head > title", 1), test("selector", "visible content remains", "body main#main-content")]
      },
      {
        id: "html-08-canonical",
        title: P("Canonical absolu", "Absolute canonical"),
        brief: P("Déclare une seule URL canonique absolue pour consolider les variantes d'accès vers la ressource officielle.", "Declare one absolute canonical URL to consolidate access variants onto the official resource."),
        focus: T("l'URL canonique", "the canonical URL"),
        starter: seoDocuments.description,
        solution: seoDocuments.canonical,
        tests: [test("exactSelector", "one canonical", "head link[rel=\"canonical\"]", 1), test("attributeEquals", "localized canonical URL", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: T("https://example.com/pulsaconf", "https://example.com/en/pulsaconf") }), test("allMatch", "canonical is absolute HTTPS", { selector: "link[rel=\"canonical\"]", matches: "[href^=\"https://\"]" }), test("exactSelector", "title remains unique", "head > title", 1), test("selector", "visible event content", "main#main-content > h1")]
      },
      {
        id: "html-08-open-graph",
        title: P("Open Graph complet", "Complete Open Graph"),
        brief: P("Compose une carte sociale cohérente avec un titre, un résumé et une image absolue possédant chacun un contenu non vide.", "Compose a coherent social card with a title, summary, and absolute image, each carrying non-empty content."),
        focus: T("les métadonnées de partage", "sharing metadata"),
        starter: seoDocuments.canonical,
        solution: seoDocuments.openGraph,
        tests: [test("exactSelector", "four Open Graph values", "head meta[property^=\"og:\"]", 4), test("attributeEquals", "social title matches document", { selector: "meta[property=\"og:title\"]", attribute: "content", expected: T("PulsaConf 2026 - Ateliers HTML accessibles", "PulsaConf 2026 - Accessible HTML workshops") }), test("nonEmptyAttribute", "social description", { selector: "meta[property=\"og:description\"]", attribute: "content" }), test("attributeEquals", "localized social URL", { selector: "meta[property=\"og:url\"]", attribute: "content", expected: T("https://example.com/pulsaconf", "https://example.com/en/pulsaconf") }), test("attributeEquals", "repository social image", { selector: "meta[property=\"og:image\"]", attribute: "content", expected: "https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" }), test("allMatch", "social URLs are absolute", { selector: "meta[property=\"og:url\"], meta[property=\"og:image\"]", matches: "[content^=\"https://\"]" })]
      },
      {
        id: "html-08-favicon-hreflang",
        title: P("Favicon et variantes linguistiques", "Favicon and language variants"),
        brief: P("Ajoute l'icône du site et publie deux URL linguistiques absolues, chacune identifiée par son code de langue.", "Add the site icon and publish two absolute language URLs, each identified by its language code."),
        focus: T("l'identité visuelle et les variantes linguistiques", "visual identity and language variants"),
        starter: seoDocuments.openGraph,
        solution: seoDocuments.languages,
        tests: [test("attributeEquals", "local favicon", { selector: "head link[rel=\"icon\"]", attribute: "href", expected: "/assets/favicon.ico" }), test("exactSelector", "two language alternatives", "head link[rel=\"alternate\"][hreflang]", 2), test("attributeEquals", "French alternative", { selector: "link[rel=\"alternate\"][hreflang=\"fr\"]", attribute: "href", expected: "https://example.com/pulsaconf" }), test("attributeEquals", "English alternative", { selector: "link[rel=\"alternate\"][hreflang=\"en\"]", attribute: "href", expected: "https://example.com/en/pulsaconf" }), test("allMatch", "language alternatives are absolute", { selector: "link[rel=\"alternate\"]", matches: "[href^=\"https://\"]" })]
      },
      {
        id: "html-08-json-ld",
        title: P("JSON-LD simple", "Simple JSON-LD"),
        brief: P("Décris l'événement avec un bloc JSON-LD valide et cohérent avec le nom visible, sans transformer ce script en contenu d'interface.", "Describe the event with valid JSON-LD consistent with the visible name, without turning the script into interface content."),
        focus: T("les données structurées", "structured data"),
        starter: seoDocuments.languages,
        solution: seoDocuments.structured,
        tests: [test("exactSelector", "one JSON-LD graph", "head script[type=\"application/ld+json\"]", 1), test("validJsonLd", "valid event JSON-LD", { type: "Event", required: ["name", "description", "startDate", "inLanguage", "location"] }), test("contains", "offline attendance agrees with venue", "https://schema.org/OfflineEventAttendanceMode"), test("contains", "structured language agrees", T("\"inLanguage\":\"fr\"", "\"inLanguage\":\"en\"")), test("contains", "structured venue agrees", "\"name\":\"Auditorium\""), test("selector", "visible event remains", "body h1")]
      }
    ],
    quiz: "html-08-seo-quiz",
    project: "html-08-project-head"
  },
  {
    id: "html-final-audit",
    title: P("Projet final et audit", "Final project and audit"),
    vocabulary: vocab.final,
    lessons: [
      {
        id: "html-09-assemble-shell",
        title: P("Assembler le squelette final", "Assemble the final shell"),
        brief: P("Établis le contrat complet du document final, avec un ordre header-main-footer et un raccourci qui vise réellement le contenu principal.", "Establish the final document contract with header-main-footer order and a skip link that actually targets main content."),
        focus: T("le document final", "the final document"),
        starter: seoDocuments.structured,
        solution: finalDocuments.shell,
        tests: [test("documentSanity", "publishable document structure"), test("attributeEquals", "localized document language", { selector: "html", attribute: "lang", expected: T("fr", "en") }), test("exactSelector", "one working skip link", "body > a[href=\"#main-content\"]", 1), test("referenceExists", "skip link target exists", { selector: "body > a[href=\"#main-content\"]", attribute: "href" }), test("domOrder", "header main footer order", ["header", "main", "footer"]), test("exactSelector", "one main landmark", "main#main-content", 1), test("exactSelector", "one release footer", "body > footer#contact", 1), test("selector", "publishing head is preserved", "head script[type=\"application/ld+json\"]")]
      },
      {
        id: "html-09-assemble-navigation",
        title: P("Assembler la navigation", "Assemble navigation"),
        brief: P("Construis une navigation interne dont chaque href pointe vers une section existante et dont l'état courant décrit une position dans la page.", "Build in-page navigation where every href points to an existing section and current state describes a location within the page."),
        focus: T("la navigation finale", "final navigation"),
        starter: finalDocuments.shell,
        solution: finalDocuments.navigation,
        tests: [test("attributeEquals", "localized navigation name", { selector: "header nav", attribute: "aria-label", expected: T("Navigation principale", "Main navigation") }), test("exactSelector", "six purposeful navigation links", "header nav a", 6), test("validFragmentTargets", "all local links resolve"), test("uniqueIds", "navigation targets are unique"), test("selector", "current program location", "nav a[href=\"#program\"][aria-current=\"location\"]"), test("safeBlankLinks", "external link is safe"), test("contains", "new-tab warning is visible", T("nouvel onglet", "new tab")), test("domOrder", "skip link precedes navigation and content", ["body > a[href=\"#main-content\"]", "header", "main#main-content"])]
      },
      {
        id: "html-09-assemble-content",
        title: P("Assembler programme et intervenants", "Assemble program and speakers"),
        brief: P("Assemble programme et intervenants comme sections nommées contenant des articles autonomes et un plan de titres continu.", "Assemble program and speakers as named sections containing standalone articles and a continuous heading outline."),
        focus: T("le contenu central", "central content"),
        starter: finalDocuments.navigation,
        solution: finalDocuments.content,
        tests: [test("referenceExists", "section heading references", { selector: "main section[aria-labelledby]", attribute: "aria-labelledby" }), test("exactSelector", "two standalone workshops", "#program > article", 2), test("allMatch", "every workshop has a heading", { selector: "#program > article", matches: ":has(h3)" }), test("exactSelector", "three benefits", "#program > ul > li", 3), test("exactSelector", "three ordered preparation steps", "#program > ol > li", 3), test("exactSelector", "two captioned speakers", "#speakers > figure", 2), test("meaningfulAlt", "speaker alternatives are meaningful", { selector: "#speakers figure img" }), test("selector", "localized caption track", T("#speakers track[srclang=\"fr\"]", "#speakers track[srclang=\"en\"]")), test("selector", "visible video transcript", T("#speakers p:has(strong)", "#speakers p:has(strong)")), test("selector", "named schedule table", "#schedule table > caption"), test("allMatch", "table headings expose scope", { selector: "#schedule thead th", matches: "[scope=\"col\"]" }), test("exactSelector", "two machine-readable times", "#schedule time[datetime]", 2), test("exactSelector", "two machine-readable capacities", "#schedule data[value]", 2), test("domOrder", "content follows the page map", ["#program", "#speakers", "#schedule", "#register"])]
      },
      {
        id: "html-09-assemble-form-media",
        title: P("Assembler formulaire et médias", "Assemble form and media"),
        brief: P("Intègre un média légendé et un formulaire dont label, aide et statut forment des relations vérifiables au clavier et dans le DOM.", "Integrate captioned media and a form whose label, help, and status form verifiable keyboard and DOM relationships."),
        focus: T("les interactions finales", "final interactions"),
        starter: finalDocuments.content,
        solution: finalDocuments.interactions,
        tests: [test("attributeEquals", "registration endpoint", { selector: "#register > form", attribute: "action", expected: "/api/pulsaconf/register" }), test("attributeEquals", "POST submission", { selector: "#register > form", attribute: "method", expected: "post" }), test("labelsAssociated", "every visible label has one control"), test("formControlsNamed", "active controls submit named values"), test("selector", "named field group", "#register fieldset > legend"), test("selector", "required native email", "#final-email[type=\"email\"][name=\"email\"][required]"), test("referenceExists", "field help reference", { selector: "#register form [aria-describedby]", attribute: "aria-describedby" }), test("selector", "explicit submit action", "#register button[type=\"submit\"]"), test("selector", "polite atomic submission status", "#form-status[role=\"status\"][aria-live=\"polite\"][aria-atomic=\"true\"]"), test("noneMatch", "initial form has no invalid state", { selector: "#register form *", matches: "[aria-invalid]" }), test("templateSelector", "invalid snapshot explains email", { template: "#final-email-error", selector: "[aria-invalid=\"true\"][aria-describedby~=\"final-error\"]" }), test("templateSelector", "busy snapshot announces progress", { template: "#final-busy", selector: "[aria-busy=\"true\"] > [role=\"status\"]" })]
      },
      {
        id: "html-09-audit-antipatterns",
        title: P("Audit transversal du livrable", "Cross-cutting deliverable audit"),
        brief: P("Relis le document comme un livrable unique : refuse les identifiants dupliqués, les cibles absentes, les liens vagues et termine par un contact réellement actionnable.", "Review the document as one deliverable: reject duplicate identifiers, missing targets, vague links, and finish with genuinely actionable contact details."),
        focus: T("la relecture qualité", "quality review"),
        starter: finalDocuments.interactions,
        solution: finalDocuments.release,
        tests: [test("documentSanity", "publishable release structure"), test("uniqueIds", "all ids are unique"), test("validFragmentTargets", "all local links resolve"), test("safeBlankLinks", "new-tab links are safe"), test("notContainsAny", "no vague link text", [T("clique ici", "click here"), T("en savoir plus", "learn more")]), test("noneMatch", "no fake fragments", { selector: "a", matches: "[href=\"#\"]" }), test("noneMatch", "no placeholder naming", { selector: "input", matches: "[placeholder]" }), test("selector", "actionable localized contact", T("footer address a[href=\"mailto:equipe@pulsateach.dev\"]", "footer address a[href=\"mailto:team@pulsateach.dev\"]")), test("selector", "localized program download", T("footer a[href=\"/assets/programme-pulsaconf.pdf\"][download]", "footer a[href=\"/assets/pulsaconf-program.pdf\"][download]")), test("validJsonLd", "structured event remains valid", { type: "Event", required: ["name", "startDate", "location"] })]
      },
      {
        id: "html-09-final-exam",
        title: P("Examen final HTML", "Final HTML exam"),
        brief: P("Diagnostique un livrable complet en reliant chaque défaut à son impact, sa correction native et une preuve de validation observable.", "Diagnose a complete deliverable by connecting each defect to its impact, native correction, and observable validation evidence."),
        focus: T("la synthèse des décisions HTML", "the synthesis of HTML decisions"),
        starter: "",
        solution: "",
        tests: []
      }
    ],
    quiz: null,
    project: "html-09-final-project-pulsaconf"
  }
];

const projectSolutions = {
  "html-00-project-local-setup": T(
    htmlShell(`    <main id="setup-manifest">\n      <h1>Manifeste de préparation PulsaConf</h1>\n      <p>Cet artefact décrit les contrôles à effectuer localement ; il ne prétend pas les avoir exécutés.</p>\n      <section>\n        <h2>Outils et preuves</h2>\n        <dl><dt>Navigateur</dt><dd>Ouvrir les DevTools et repérer l'inspecteur DOM.</dd><dt>Éditeur</dt><dd>Ouvrir index.html et vérifier son extension.</dd><dt>Aperçu</dt><dd>Modifier un titre, sauvegarder puis recharger.</dd></dl>\n      </section>\n      <section>\n        <h2>Journal de vérification</h2>\n        <ol><li>Noter le fichier observé.</li><li>Décrire le changement attendu.</li><li>Citer le test qui confirme la structure.</li></ol>\n      </section>\n    </main>`),
    htmlShell(`    <main id="setup-manifest">\n      <h1>PulsaConf readiness manifest</h1>\n      <p>This artifact describes checks to perform locally; it does not claim they have already been performed.</p>\n      <section>\n        <h2>Tools and evidence</h2>\n        <dl><dt>Browser</dt><dd>Open DevTools and locate the DOM inspector.</dd><dt>Editor</dt><dd>Open index.html and check its extension.</dd><dt>Preview</dt><dd>Edit a heading, save the file, then reload the page.</dd></dl>\n      </section>\n      <section>\n        <h2>Verification log</h2>\n        <ol><li>Record the file you inspected.</li><li>Describe the expected change.</li><li>Name the test that confirms the structure.</li></ol>\n      </section>\n    </main>`).replace('lang="fr"', 'lang="en"')
  ),
  "html-01-project-skeleton": T(
    htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Le 18 septembre, une journée gratuite réunit débutants et mentors autour de HTML accessible.</p>\n      <p>Le programme, le lieu et l'inscription seront publiés dans ce document en français.</p>\n    </main>`, `    <meta name="description" content="PulsaConf 2026 : ateliers HTML accessibles pour débutants, le 18 septembre." />`),
    htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>On September 18, a free event brings beginners and mentors together around accessible HTML.</p>\n      <p>The program, venue, and registration details will be published in this English document.</p>\n    </main>`, `    <meta name="description" content="PulsaConf 2026: accessible HTML workshops for beginners on September 18." />`).replace('lang="fr"', 'lang="en"')
  ),
  "html-02-project-program": localizedHtmlShell(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Deux ateliers progressifs pour apprendre <abbr title="HyperText Markup Language">HTML</abbr> dans un fichier <code>index.html</code>.</p>\n      <p><strong>Inscription obligatoire.</strong> Choisis <em>ton atelier</em> avant de venir.</p>\n      <section id="program" aria-labelledby="program-title">\n        <h2 id="program-title">Programme</h2>\n        <article><h3>Structurer avant de styliser</h3><p>Maya guide la création du plan, des sections et des contenus autonomes.</p></article>\n        <article><h3>Relire avec le DOM</h3><p>Samir montre comment vérifier les relations sans dépendre du rendu visuel.</p></article>\n        <aside><h3>Matériel</h3><p>Apporte un ordinateur chargé.</p></aside>\n        <details><summary>Comment choisir un atelier ?</summary><p>Commence par la structure si tu découvres HTML.</p></details>\n      </section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML est le langage de publication du Web.</p></blockquote><p>Source : <cite>W3C, HTML et CSS</cite></p>\n      <address>Contact : <a href="mailto:equipe@pulsateach.dev">equipe@pulsateach.dev</a></address>\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Two progressive workshops for learning <abbr title="HyperText Markup Language">HTML</abbr> in an <code>index.html</code> file.</p>\n      <p><strong>Registration is required.</strong> Choose <em>your workshop</em> before attending.</p>\n      <section id="program" aria-labelledby="program-title">\n        <h2 id="program-title">Program</h2>\n        <article><h3>Structure before styling</h3><p>Maya guides the creation of the outline, sections, and standalone content.</p></article>\n        <article><h3>Review with the DOM</h3><p>Samir shows how to verify relationships without relying on visual rendering.</p></article>\n        <aside><h3>Equipment</h3><p>Bring a charged computer.</p></aside>\n        <details><summary>How should I choose a workshop?</summary><p>Start with structure if you are new to HTML.</p></details>\n      </section>\n      <blockquote cite="https://www.w3.org/standards/webdesign/htmlcss"><p>HTML is the publishing language of the Web.</p></blockquote><p>Source: <cite>W3C, HTML and CSS</cite></p>\n      <address>Contact: <a href="mailto:team@pulsateach.dev">team@pulsateach.dev</a></address>\n    </main>`
  ),
  "html-03-project-navigation": localizedHtmlShell(navigationBodies.skip.fr, navigationBodies.skip.en),
  "html-04-project-speakers-gallery": localizedHtmlShell(
    mediaBodies.video.fr.replace("pulsaconf-workshop.svg", "pulsaconf-samir.svg").replace("Trois participants travaillent autour de leurs ordinateurs", "Samir inspecte un arbre DOM pendant l'atelier").replace("Un atelier pratique en petit groupe.", "Samir accompagne la revue du DOM et de l'accessibilité."),
    mediaBodies.video.en.replace("pulsaconf-workshop.svg", "pulsaconf-samir.svg").replace("Three attendees work together around their computers", "Samir inspects a DOM tree during the workshop").replace("A hands-on workshop in a small group.", "Samir guides the DOM and accessibility review.")
  ),
  "html-05-project-schedule": localizedHtmlShell(dataBodies.machine.fr, dataBodies.machine.en),
  "html-06-project-registration-form": localizedHtmlShell(formBodies.submit.fr, formBodies.submit.en),
  "html-07-project-robust-form": localizedHtmlShell(feedbackBodies.states.fr, feedbackBodies.states.en),
  "html-08-project-head": seoDocuments.structured,
  "html-09-final-project-pulsaconf": htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><p>Une journée pour construire un web plus clair et accessible.</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#speakers">Intervenants</a><a href="#schedule">Planning</a><a href="#register">Inscription</a></nav></header>\n    <main id="main-content">\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>Structurer une page événementielle</h3><p>Maya explique comment transformer un contenu brut en plan de titres et sections autonomes.</p></article><article><h3>Rendre un formulaire robuste</h3><p>Samir relie labels, aides, erreurs et statuts sans remplacer les fonctions natives.</p></article></section>\n      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><figure><img src="/assets/maya.jpg" alt="Maya présente un plan de page sur l'écran de l'auditorium" width="640" height="360" loading="lazy" /><figcaption>Maya, développeuse front-end et mentor HTML.</figcaption></figure></section>\n      <section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2><table><caption>Horaires des ateliers PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9 h 30</time></td><td>HTML sémantique</td><td>Auditorium</td></tr><tr><td><time datetime="2026-09-18T11:00">11 h</time></td><td>Formulaires robustes</td><td>Laboratoire</td></tr></tbody></table></section>\n      <section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2><form action="/api/pulsaconf/register" method="post" aria-describedby="form-status"><fieldset><legend>Coordonnées</legend><label for="email">Adresse email</label><p id="email-help">Utilise l'adresse qui recevra l'invitation.</p><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="email-help" /></fieldset><button type="submit">Demander mon invitation PulsaConf</button><p id="form-status" role="status" aria-live="polite">Formulaire prêt à être envoyé.</p></form></section>\n    </main>\n    <footer><address>Contact : <a href="mailto:equipe@pulsateach.dev">equipe@pulsateach.dev</a></address></footer>`, `    <!-- example.com is reserved for documentation; replace this URL before publishing. -->\n    <meta name="description" content="PulsaConf 2026 propose des ateliers HTML gratuits et accessibles le 18 septembre." />\n    <link rel="canonical" href="https://example.com/pulsaconf" />\n    <meta property="og:title" content="PulsaConf 2026 - Ateliers web accessibles" />\n    <meta property="og:description" content="Une journée gratuite pour pratiquer HTML sémantique et formulaires accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />`)
};

projectSolutions["html-09-final-project-pulsaconf"] = finalDocuments.release;

const projectTests = {
  "html-00-project-local-setup": [test("selector", "setup artifact", "main#setup-manifest"), test("minSelector", "tool evidence pairs", "dl > dt", 3), test("minSelector", "local checks", "dl > dd", 3), test("minSelector", "verification journal", "ol > li", 3), test("contains", "honest limitation", "ne prétend pas")],
  "html-01-project-skeleton": [test("doctype", "standards mode", "<!doctype html>"), test("attributeEquals", "document language", { selector: "html", attribute: "lang", expected: T("fr", "en") }), test("exactSelector", "one UTF-8 declaration", "head meta[charset=\"UTF-8\"]", 1), test("attributeEquals", "mobile viewport", { selector: "meta[name=\"viewport\"]", attribute: "content", expected: "width=device-width, initial-scale=1.0" }), test("exactSelector", "one page title", "head > title", 1), test("nonEmptyAttribute", "specific description", { selector: "meta[name=\"description\"]", attribute: "content" }), test("exactSelector", "one main heading", "body h1", 1)],
  "html-02-project-program": [test("exactSelector", "one h1 convention", "h1", 1), test("referenceExists", "program name resolves", { selector: "section#program[aria-labelledby]", attribute: "aria-labelledby" }), test("exactSelector", "two standalone sessions", "#program > article", 2), test("allMatch", "session headings", { selector: "#program > article", matches: ":has(h3)" }), test("selector", "important registration", "main > p > strong"), test("selector", "stressed workshop choice", "main > p > em"), test("selector", "practical aside", "#program > aside > h3"), test("selector", "native FAQ", "#program > details > summary"), test("nonEmptyAttribute", "quotation source URL", { selector: "blockquote", attribute: "cite" }), test("selector", "visible quotation source", "blockquote + p > cite"), test("nonEmptyAttribute", "expanded HTML abbreviation", { selector: "abbr", attribute: "title" }), test("selector", "file name as code", "main code"), test("selector", "working contact", "address a[href^=\"mailto:\"]")],
  "html-03-project-navigation": [test("exactSelector", "one skip link", "body > a[href=\"#main-content\"]", 1), test("attributeEquals", "named main navigation", { selector: "header nav", attribute: "aria-label", expected: T("Navigation principale", "Main navigation") }), test("validFragmentTargets", "all local links resolve"), test("uniqueIds", "all navigation targets are unique"), test("selector", "current program location", "nav a[href=\"#program\"][aria-current=\"location\"]"), test("notContains", "not current page", "aria-current=\"page\""), test("safeBlankLinks", "safe external links"), test("contains", "new-tab warning", T("nouvel onglet", "new tab")), test("selector", "working email link", T("#contact a[href=\"mailto:equipe@pulsateach.dev\"]", "#contact a[href=\"mailto:team@pulsateach.dev\"]")), test("selector", "working phone link", "#contact a[href=\"tel:+33123456789\"]"), test("selector", "program download", T("#contact a[href=\"/assets/programme-pulsaconf.pdf\"][download]", "#contact a[href=\"/assets/pulsaconf-program.pdf\"][download]")), test("notContainsAny", "no vague link text", [T("Clique ici", "Click here"), T("En savoir plus", "Learn more")]), test("domOrder", "skip link before navigation and content", ["body > a[href=\"#main-content\"]", "header", "main#main-content"])],
  "html-04-project-speakers-gallery": [test("exactSelector", "two speaker figures", "#media > figure", 2), test("meaningfulAlt", "specific speaker alternatives", { selector: "#media figure img" }), test("allMatch", "fixed speaker dimensions", { selector: "#media figure img", matches: "[width=\"640\"][height=\"360\"]" }), test("selector", "deferred secondary speaker", "img[src=\"/assets/pulsaconf-samir.svg\"][loading=\"lazy\"]"), test("selector", "localized caption track", T("track[src=\"/assets/pulsaconf-captions-fr.vtt\"][srclang=\"fr\"]", "track[src=\"/assets/pulsaconf-captions-en.vtt\"][srclang=\"en\"]")), test("selector", "controllable audio", "audio[controls] source[type=\"audio/wav\"]"), test("selector", "visible audio download", "audio + p > a[download]"), test("selector", "visible video download", "video + p > a[download]"), test("contains", "video transcript", T("La vidéo montre", "The video shows")), test("contains", "audio transcript", T("neuf heures trente", "nine thirty"))]
  ,"html-05-project-schedule": [test("exactSelector", "three independent benefits", "#benefits > ul > li", 3), test("exactSelector", "three ordered registration steps", "#registration-steps > ol > li", 3), test("exactSelector", "three glossary pairs", "#glossary > dl > dt", 3), test("exactSelector", "three glossary definitions", "#glossary > dl > dd", 3), test("referenceExists", "schedule heading resolves", { selector: "#schedule[aria-labelledby]", attribute: "aria-labelledby" }), test("selector", "specific table caption", "#schedule table > caption"), test("allMatch", "all table headers have scope", { selector: "#schedule thead th", matches: "[scope=\"col\"]" }), test("exactSelector", "two schedule rows", "#schedule tbody > tr", 2), test("exactSelector", "two machine-readable times", "#schedule time[datetime]", 2), test("exactSelector", "two capacities", "#schedule data[value]", 2), test("attributeEquals", "first workshop capacity", { selector: "#schedule tbody tr:first-child data", attribute: "value", expected: "120" }), test("attributeEquals", "second workshop capacity", { selector: "#schedule tbody tr:last-child data", attribute: "value", expected: "40" })],
  "html-06-project-registration-form": [test("exactSelector", "one registration form", "#register > form", 1), test("referenceExists", "registration heading resolves", { selector: "#register[aria-labelledby]", attribute: "aria-labelledby" }), test("attributeEquals", "registration endpoint", { selector: "#register > form", attribute: "action", expected: "/api/pulsaconf/register" }), test("attributeEquals", "POST submission", { selector: "#register > form", attribute: "method", expected: "post" }), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("allMatch", "full name submission contract", { selector: "#full-name", matches: "[name=\"fullName\"][autocomplete=\"name\"]" }), test("allMatch", "required email contract", { selector: "#email", matches: "[type=\"email\"][name=\"email\"][autocomplete=\"email\"][required]" }), test("selector", "required workshop choice", "#workshop[name=\"workshop\"][required]"), test("exactSelector", "workshop options", "#workshop > option", 3), test("allMatch", "free-form needs contract", { selector: "#needs", matches: "[name=\"needs\"][rows=\"4\"]" }), test("exactSelector", "two named level choices", "input[type=\"radio\"][name=\"level\"][value]", 2), test("selector", "explicit required consent", "input[type=\"checkbox\"][name=\"updates\"][value=\"yes\"][required]"), test("exactSelector", "one explicit submit action", "#register button[type=\"submit\"]", 1), test("contains", "submit names its outcome", T("Demander mon invitation PulsaConf", "Request my PulsaConf invitation"))],
  "html-07-project-robust-form": [test("exactSelector", "one robust registration form", "#register > form", 1), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("referenceExists", "visible descriptive references resolve", { selector: "#register form [aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "email has persistent help", { selector: "#register form #email", attribute: "aria-describedby", expected: "email-help" }), test("noneMatch", "pristine email is not invalid", { selector: "#register form input", matches: "[aria-invalid]" }), test("noneMatch", "pristine form has no alert", { selector: "#register form *", matches: "[role=\"alert\"]" }), test("selector", "level choices have a legend", "#register form > fieldset:not([disabled]) > legend"), test("selector", "explained disabled waitlist", "#register fieldset[disabled][aria-describedby=\"waitlist-help\"] + #waitlist-help"), test("selector", "polite atomic form status", "#form-status[role=\"status\"][aria-live=\"polite\"][aria-atomic=\"true\"]"), test("noneMatch", "initial registration is not busy", { selector: "#register", matches: "[aria-busy]" }), test("templateSelector", "invalid snapshot marks email", { template: "#email-error-after-validation", selector: "input[aria-invalid=\"true\"][aria-describedby~=\"email-error\"]" }), test("templateSelector", "invalid snapshot announces email error", { template: "#email-error-after-validation", selector: "#email-error[role=\"alert\"]" }), test("templateSelector", "busy snapshot marks pending region", { template: "#registration-busy-state", selector: "section[aria-busy=\"true\"] > [role=\"status\"]" }), test("templateSelector", "failure snapshot ends busy state", { template: "#registration-failure-state", selector: "section[aria-busy=\"false\"]" }), test("templateSelector", "failure snapshot announces retry", { template: "#registration-failure-state", selector: "[role=\"alert\"]" })],
  "html-08-project-head": [test("exactSelector", "one event title", "head > title", 1), test("contains", "specific localized title", T("PulsaConf 2026 - Ateliers HTML accessibles", "PulsaConf 2026 - Accessible HTML workshops")), test("attributeEquals", "localized search description", { selector: "meta[name=\"description\"]", attribute: "content", expected: T("PulsaConf 2026 propose des ateliers gratuits sur HTML sémantique, les formulaires accessibles et l'inscription.", "PulsaConf 2026 offers free workshops on semantic HTML, accessible forms, and registration.") }), test("attributeEquals", "localized canonical placeholder", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: T("https://example.com/pulsaconf", "https://example.com/en/pulsaconf") }), test("exactSelector", "four social metadata values", "meta[property^=\"og:\"]", 4), test("attributeEquals", "localized social URL", { selector: "meta[property=\"og:url\"]", attribute: "content", expected: T("https://example.com/pulsaconf", "https://example.com/en/pulsaconf") }), test("attributeEquals", "repository social image", { selector: "meta[property=\"og:image\"]", attribute: "content", expected: "https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" }), test("attributeEquals", "repository favicon", { selector: "link[rel=\"icon\"]", attribute: "href", expected: "/assets/favicon.ico" }), test("exactSelector", "two language alternatives", "link[rel=\"alternate\"][hreflang]", 2), test("validJsonLd", "valid event JSON-LD", { type: "Event", required: ["name", "description", "startDate", "inLanguage", "location"] }), test("contains", "offline event agrees with venue", "https://schema.org/OfflineEventAttendanceMode"), test("selector", "complete visible page agrees", "main#main-content #register > form")]
};

projectTests["html-09-final-project-pulsaconf"] = [
  test("documentSanity", "publishable final document"),
  test("attributeEquals", "localized document language", { selector: "html", attribute: "lang", expected: T("fr", "en") }),
  test("uniqueIds", "all final ids are unique"),
  test("validFragmentTargets", "all final local links resolve"),
  test("safeBlankLinks", "external links are safe"),
  test("domOrder", "release landmarks are ordered", ["header", "main", "footer"]),
  test("exactSelector", "one main heading", "body h1", 1),
  test("exactSelector", "four named product sections", "main > section[aria-labelledby]", 4),
  test("exactSelector", "two program articles", "#program > article", 2),
  test("exactSelector", "two speaker figures", "#speakers > figure", 2),
  test("meaningfulAlt", "all speaker alternatives are meaningful", { selector: "#speakers img" }),
  test("selector", "localized captions", T("track[srclang=\"fr\"]", "track[srclang=\"en\"]")),
  test("allMatch", "schedule headings expose scope", { selector: "#schedule thead th", matches: "[scope=\"col\"]" }),
  test("exactSelector", "two schedule rows", "#schedule tbody > tr", 2),
  test("exactSelector", "two machine-readable times", "#schedule time[datetime]", 2),
  test("labelsAssociated", "every final label has one control"),
  test("formControlsNamed", "final controls submit named values"),
  test("referenceExists", "final descriptions resolve", { selector: "#register form [aria-describedby]", attribute: "aria-describedby" }),
  test("selector", "polite final status", "#form-status[role=\"status\"][aria-live=\"polite\"]"),
  test("templateSelector", "final invalid snapshot is inspectable", { template: "#final-email-error", selector: "[aria-invalid=\"true\"]" }),
  test("nonEmptyAttribute", "search description", { selector: "meta[name=\"description\"]", attribute: "content" }),
  test("attributeEquals", "localized canonical URL", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: T("https://example.com/pulsaconf", "https://example.com/en/pulsaconf") }),
  test("exactSelector", "complete social card", "meta[property^=\"og:\"]", 4),
  test("validJsonLd", "valid final Event JSON-LD", { type: "Event", required: ["name", "description", "startDate", "inLanguage", "location"] }),
  test("selector", "localized final contact", T("footer a[href=\"mailto:equipe@pulsateach.dev\"]", "footer a[href=\"mailto:team@pulsateach.dev\"]")),
  test("notContainsAny", "no vague final link", [T("clique ici", "click here"), T("en savoir plus", "learn more")])
];

const projectStarters = {
  "html-01-project-skeleton": T(
    `<html>\n  <head>\n    <title>À compléter</title>\n  </head>\n  <body>\n    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Présente ici la journée PulsaConf.</p>\n    </main>\n  </body>\n</html>`,
    `<html>\n  <head>\n    <title>Complete me</title>\n  </head>\n  <body>\n    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Introduce the PulsaConf event here.</p>\n    </main>\n  </body>\n</html>`
  ),
  "html-02-project-program": localizedHtmlShell(
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <!-- Assemble ici le programme, les compléments et les informations de contact. -->\n    </main>`,
    `    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <!-- Build the program, supplementary content, and contact details here. -->\n    </main>`
  ),
  "html-03-project-navigation": localizedHtmlShell(
    `    <header><p>PulsaConf 2026</p><nav aria-label="Navigation principale"><a href="#program">Programme</a><a href="#contact">Contact</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Programme</h2></section><section id="contact"><h2>Contact</h2></section></main>`,
    `    <header><p>PulsaConf 2026</p><nav aria-label="Main navigation"><a href="#program">Program</a><a href="#contact">Contact</a></nav></header>\n    <main id="main-content"><h1>PulsaConf 2026</h1><section id="program"><h2>Program</h2></section><section id="contact"><h2>Contact</h2></section></main>`
  ),
  "html-04-project-speakers-gallery": localizedHtmlShell(
    mediaBodies.figure.fr.replace("</section></main>", "<!-- Ajoute ici Samir, l'audio, la vidéo et leurs équivalents textuels. --></section></main>"),
    mediaBodies.figure.en.replace("</section></main>", "<!-- Add Samir, audio, video, and their text equivalents here. --></section></main>")
  ),
  "html-05-project-schedule": localizedHtmlShell(
    dataBodies.glossary.fr.replace("</main>", "<!-- Ajoute le planning, ses relations et ses valeurs machine ici. --></main>"),
    dataBodies.glossary.en.replace("</main>", "<!-- Add the schedule, its relationships, and machine values here. --></main>")
  ),
  "html-06-project-registration-form": localizedHtmlShell(
    formBodies.email.fr.replace("</form>", "<!-- Ajoute les choix, les besoins, le consentement et l'action d'envoi ici. --></form>"),
    formBodies.email.en.replace("</form>", "<!-- Add choices, requirements, consent, and the submit action here. --></form>")
  ),
  "html-07-project-robust-form": localizedHtmlShell(
    feedbackBodies.help.fr.replace("</form>", "<!-- Ajoute les états invalide, groupé, désactivé, status, busy et échec ici. --></form>"),
    feedbackBodies.help.en.replace("</form>", "<!-- Add invalid, grouped, disabled, status, busy, and failure states here. --></form>")
  ),
  "html-08-project-head": localizedHtmlShell(
    feedbackBodies.states.fr,
    feedbackBodies.states.en
  )
};

projectStarters["html-09-final-project-pulsaconf"] = finalDocuments.content;

function projectDef(id, vocabulary) {
  const names = {
    "html-00-project-local-setup": P("Mini-projet : poste de travail HTML", "Mini project: HTML workstation"),
    "html-01-project-skeleton": P("Mini-projet : squelette PulsaConf", "Mini project: PulsaConf skeleton"),
    "html-02-project-program": P("Mini-projet : programme PulsaConf", "Mini project: PulsaConf program"),
    "html-03-project-navigation": P("Mini-projet : navigation PulsaConf", "Mini project: PulsaConf navigation"),
    "html-04-project-speakers-gallery": P("Mini-projet : galerie intervenants", "Mini project: speaker gallery"),
    "html-05-project-schedule": P("Mini-projet : planning accessible", "Mini project: accessible schedule"),
    "html-06-project-registration-form": P("Mini-projet : formulaire d'inscription", "Mini project: registration form"),
    "html-07-project-robust-form": P("Mini-projet : formulaire robuste", "Mini project: robust form"),
    "html-08-project-head": P("Mini-projet : head publiable", "Mini project: publishable head"),
    "html-09-final-project-pulsaconf": P("Projet final : PulsaConf publiable", "Final project: publishable PulsaConf")
  };
  const title = names[id];
  const solution = projectSolutions[id];
  const final = id.includes("final-project");
  const tests = projectTests[id] || (final ? [
    test("documentSanity", "publishable document structure"), test("uniqueIds", "all ids are unique"), test("validFragmentTargets", "local links resolve"), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("nonEmptyAttribute", "search description", { selector: "meta[name=\"description\"]", attribute: "content" }), test("attributeEquals", "documented canonical placeholder", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: "https://example.com/pulsaconf" }), test("nonEmptyAttribute", "social metadata", { selector: "meta[property^=\"og:\"]", attribute: "content" }), test("selector", "current in-page location", "nav a[aria-current=\"location\"]"), test("domOrder", "release document order", ["header", "main", "footer"]), test("exactSelector", "one main heading", "h1", 1), test("referenceExists", "section headings resolve", { selector: "main section[aria-labelledby]", attribute: "aria-labelledby" }), test("exactSelector", "four product sections", "main > section", 4), test("meaningfulAlt", "informative image alternative", { selector: "figure img" }), test("allMatch", "table header scopes", { selector: "thead th", matches: "[scope=\"col\"]" }), test("referenceExists", "form descriptions resolve", { selector: "[aria-describedby]", attribute: "aria-describedby" }), test("selector", "polite submission status", "[role=\"status\"][aria-live=\"polite\"]"), test("selector", "contact address", "footer address a[href^=\"mailto:\"]"), test("notContains", "no vague link", "clique ici")
  ] : [
    test("selector", "doctype-ready html", "html[lang=\"fr\"]"), test("selector", "main", "main"), test("selector", "heading", "h1, h2"), test("minSelector", "module structures", "main *", 4), test("notContains", "no click here", "clique ici"), test("notContains", "no placeholder-only", "placeholder=\"Email\""), test("selector", "meaningful element", "section, article, form, table, figure"), test("contains", "PulsaConf", "PulsaConf")
  ]);
  return {
    id,
    title,
    brief: P(`${title[0]} transforme les compétences du module en une étape concrète et vérifiable de PulsaConf.`, `${title[1]} turns the module skills into a concrete, verifiable PulsaConf step.`),
    focus: T(`la réalisation de « ${title[0]} »`, `the delivery of “${title[1]}”`),
    starter: projectStarters[id] || htmlShell(`    <!-- Assemble la version demandée de PulsaConf ici -->`),
    solution,
    tests,
    vocabulary,
    xp: final ? 160 : 90
  };
}

const testValueTranslations = new Map([
  ["Vérification locale", "Local check"], ["Sauvegarder", "Save"], ["Recharger", "Reload"],
  ["exigence", "requirement"], ["sélecteur", "selector"], ["preuve", "evidence"],
  ["essayer jusqu'à ce que ça passe", "try until it passes"], ["Accessibilité", "Accessibility"],
  ["événement gratuit", "free event"], ["gratuite", "free"], ["Places limitées", "Limited seats"],
  ["formation HTML gratuite", "free HTML course"], ["Clique ici", "Click here"],
  ["Écrire", "Write"], ["Télécharger", "Download"], ["Transcription de la vidéo", "Video transcript"],
  ["Transcription de l'annonce", "Announcement transcript"], ["Confirmer sa présence", "Confirm attendance"],
  ["120 places", "120 seats"], ["Début : 9h30", "Start: 9:30 AM"], ["réessaie", "try again"],
  ["Conférence web gratuite", "Free web conference"], ["ne prétend pas", "does not claim"]
  , ["html[lang=\"fr\"]", "html[lang=\"en\"]"], ["nav[aria-label=\"Navigation principale\"]", "nav[aria-label=\"Main navigation\"]"],
  ["contenu principal", "main content"], ["Transcription", "Transcript"], ["neuf heures trente", "nine thirty"],
  ["Niveau actuel", "Current HTML level"], ["attributs", "attributes"],
  ["événement gratuit", "free event"], ["gratuite", "free"], ["Places limitées", "Limited seats"],
  ["Non", "No"], ["inscription", "registration"], ["Écrire", "Email"],
  ["contenu principal", "main content"], ["Maya anime", "Maya leads"],
  ["Auditorium principal", "Main auditorium"], ["Planning des ateliers", "PulsaConf workshop schedule"],
  ["J'accepte", "I agree"], ["Demander mon invitation", "Request my invitation"]
]);

function artifact(value) {
  if (!value || typeof value !== "string") return value;
  return { ...T(value, localizeArtifactCopy(value)), toString() { return this.fr; } };
}

function localizedTests(tests) {
  return tests.map((item) => ({
    ...item,
    label: typeof item.label === "string" ? T(frenchTestLabel(item.label), item.label) : item.label,
    value: localizeTestValue(item.value)
  }));
}

function localizeTestValue(value) {
  if (typeof value === "string" && testValueTranslations.has(value)) return T(value, testValueTranslations.get(value));
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  if (value.attribute === "lang" && value.expected === "fr") return { ...value, expected: T("fr", "en") };
  return value;
}

function frenchTestLabel(label) {
  const words = {
    heading: "titre", paragraph: "paragraphe", section: "section", link: "lien", image: "image",
    form: "formulaire", button: "bouton", title: "titre", description: "description", language: "langue",
    content: "contenu", transcript: "transcription", navigation: "navigation", table: "tableau",
    caption: "légende", status: "statut", error: "erreur", required: "obligatoire", proof: "preuve",
    tools: "outils", checks: "vérifications", save: "sauvegarde", reload: "rechargement", explicit: "explicite",
    current: "actuel", external: "externe", internal: "interne", accessible: "accessible", document: "document"
  };
  return `Contrôle ${label.split(" ").map((word) => words[word.toLowerCase()] || word).join(" ")}`;
}

// Artifact copy is authored as complete learner-facing phrases. Never translate individual
// words here: partial substitutions were the source of mixed-language reference files.
const englishArtifactCopy = [
  ["<html lang=\"fr\"", "<html lang=\"en\""], ["français", "English"], ["Français", "English"], ["fr-FR", "en-US"],
  ["<!-- Assemble la version demandée de PulsaConf ici -->", "<!-- Build the requested PulsaConf version here. -->"], ["<!-- Construis le squelette final -->", "<!-- Build the final document skeleton. -->"],
  ["<!-- Décris les outils et les vérifications à effectuer localement. -->", "<!-- Describe the tools and checks to perform on your own computer. -->"], ["<!-- Le fichier s'appelle encore note.txt -->", "<!-- The file is still named note.txt. -->"],
  ["Manifeste de préparation", "Readiness manifest"], ["Navigateur moderne", "Modern browser"], ["Éditeur de code", "Code editor"], ["Rôle : afficher la page. Vérification locale : ouvrir les DevTools.", "Purpose: display the page. Local check: open DevTools."],
  ["Rôle : modifier le fichier. Vérification locale : confirmer la coloration HTML.", "Purpose: edit the file. Local check: confirm HTML syntax highlighting."], ["Rôle : servir de point d'entrée. Vérification locale : contrôler le nom et l'extension du fichier.", "Purpose: act as the entry file. Local check: verify the file name and extension."],
  ["Fichier de travail :", "Working file:"], ["Premier aperçu du projet événementiel.", "First preview of the event project."], ["Boucle de travail HTML", "HTML workflow loop"], ["Modifier index.html dans l'éditeur.", "Edit index.html in the editor."], ["Sauvegarder le fichier.", "Save the file."], ["Recharger la page dans le navigateur.", "Reload the page in the browser."], ["Observer le résultat avant de continuer.", "Review the result before continuing."],
  ["Diagnostic DevTools", "DevTools diagnosis"], ["Les DevTools permettent d'inspecter le DOM, les balises et les attributs réellement compris par le navigateur.", "DevTools let you inspect the DOM, elements, and attributes the browser actually recognized."], ["Inspecter l'élément", "Inspect element"], ["Méthode de test", "Testing method"], ["Je lis chaque test comme une exigence : sélecteur attendu, texte attendu ou anti-pattern interdit.", "I read each test as a requirement: an expected selector, expected text, or forbidden anti-pattern."], ["Je cite la preuve dans le code avant de passer à l'étape suivante.", "I point to the evidence in the code before moving to the next step."],
  ["Une journée gratuite pour apprendre le web par la pratique.", "A free event for hands-on web learning."], ["Une journée pour apprendre le web", "A day to learn the web"], ["Accessibilité, données et formulaires.", "Accessibility, data, and forms."], ["Places limitées", "Limited seats"], ["Aller au contenu principal", "Skip to main content"], ["Programme", "Program"], ["Lieu", "Venue"], ["Atelier HTML accessible", "Accessible HTML workshop"], ["Construire une page accessible", "Build an accessible page"], ["Atelier guidé sur la structure HTML.", "A guided workshop on HTML structure."], ["Conseil pratique", "Practical tip"], ["Prévois un ordinateur portable chargé.", "Bring a fully charged laptop."],
  ["PulsaConf 2026, événement gratuit pour apprendre HTML, accessibilité et publication web.", "PulsaConf 2026, a free event for learning HTML, accessibility, and web publishing."], ["Une journée <strong>gratuite</strong>", "A <strong>free</strong> day"], ["gratuite", "free"], ["Débutant", "Beginner"], ["Adresse email", "Email address"], ["Envoyer", "Submit"], ["Prêt.", "Ready."],
  ["Maya présente un plan de page sur l'écran de l'auditorium", "Maya presents a page outline on the auditorium screen"], ["Deux ateliers progressifs pour construire puis relire une page événementielle.", "Two progressive workshops for building and reviewing an event page."], ["Structurer avant de styliser", "Structure before styling"], ["Maya guide la création du plan, des sections et des contenus autonomes.", "Maya guides the creation of an outline, sections, and self-contained content."], ["Relire avec le DOM", "Review with the DOM"], ["Samir montre comment vérifier les relations sans dépendre du rendu visuel.", "Samir shows how to verify relationships without relying on visual rendering."], ["Matériel", "Equipment"], ["Apporte un ordinateur chargé ; aucun prérequis technique n'est demandé.", "Bring a charged computer; no technical prerequisites are required."], ["Comment choisir un atelier ?", "How should I choose a workshop?"], ["Commence par la structure si tu découvres HTML, puis poursuis avec la revue DOM.", "Start with structure if you are new to HTML, then continue with the DOM review."],
  ["Program pratique PulsaConf", "Practical PulsaConf program"], ["Places", "Seats"], ["places", "seats"], ["HTML accessible", "Accessible HTML"], ["Workshop pratique.", "Hands-on workshop."], ["Développeuse front-end.", "Front-end developer."], ["Room PulsaConf accessible", "Accessible PulsaConf room"], ["Room principale.", "Main room."], ["Adresse utilisée pour l'invitation.", "Address used for the invitation."], ["Aller au formulaire d'inscription", "Go to the registration form"], ["Registration PulsaConf", "PulsaConf registration"],
  ["Apprendre le web devient plus simple quand chaque étape est testable.", "Learning the web is easier when every step can be tested."], ["Faut-il connaître JavaScript ?", "Do I need to know JavaScript?"], ["Non, le parcours commence par HTML.", "No, the course starts with HTML."], ["L'atelier commence par", "The workshop starts with"], ["et un fichier", "and a"], ["fichier", "file"], ["Contact :", "Contact:"],
  ["Clique ici", "Click here"], ["Découvrir la formation HTML gratuite", "Explore the free HTML course"], ["Aller à l'inscription", "Go to registration"], ["Navigation principale", "Main navigation"], ["Intervenants", "Speakers"], ["Inscription", "Registration"], ["Écrire à l'équipe", "Email the team"], ["Appeler l'accueil", "Call reception"], ["Télécharger le programme", "Download the program"], ["Consulte les ateliers du matin et de l'après-midi.", "Browse the morning and afternoon workshops."], ["Ouvrir le formulaire d'inscription PulsaConf", "Open the PulsaConf registration form"], ["Écrire à l'équipe PulsaConf", "Email the PulsaConf team"], ["Découvrir PulsaTeach", "Explore PulsaTeach"],
  ["Maya anime un atelier HTML accessible", "Maya leads an accessible HTML workshop"], ["Auditorium lumineux prêt pour PulsaConf", "Bright auditorium ready for PulsaConf"], ["Auditorium principal, accessible par ascenseur.", "Main auditorium, accessible by elevator."], ["Galerie", "Gallery"], ["Apprenants en atelier HTML", "Learners in an HTML workshop"], ["Présentation", "Presentation"], ["Transcription de la vidéo", "Video transcript"], ["Maya présente le programme : accueil à neuf heures, atelier HTML accessible puis questions dans l'auditorium.", "Maya introduces the program: welcome at nine, an accessible HTML workshop, then questions in the auditorium."], ["Présentation vidéo", "Video presentation"], ["Maya présente le plan d'une page sur un écran", "Maya presents a page outline on a screen"], ["Maya, développeuse front-end et mentor HTML.", "Maya, front-end developer and HTML mentor."], ["Samir inspecte un arbre DOM pendant un atelier", "Samir inspects a DOM tree during a workshop"], ["Samir, spécialiste accessibilité.", "Samir, accessibility specialist."], ["Maya présente l'atelier de structure à 9 h 30. Samir présente la revue du DOM à 11 h dans le laboratoire.", "Maya presents the structure workshop at 9:30 AM. Samir presents the DOM review at 11 AM in the lab."], ["Les portes ouvrent à neuf heures. L'auditorium est accessible par ascenseur.", "Doors open at nine. The auditorium is accessible by elevator."],
  ["Pourquoi venir ?", "Why attend?"], ["Ateliers guidés", "Guided workshops"], ["Supports accessibles", "Accessible materials"], ["Projet portfolio", "Portfolio project"], ["Choisir un atelier", "Choose a workshop"], ["Remplir le formulaire", "Complete the form"], ["Confirmer sa présence", "Confirm attendance"], ["Glossaire", "Glossary"], ["Zone de page identifiable.", "Identifiable page region."], ["Texte alternatif d'une image.", "Text alternative for an image."], ["Relation entre un en-tête et des cellules.", "Relationship between a header and its cells."], ["Planning", "Schedule"], ["Planning des ateliers PulsaConf", "PulsaConf workshop schedule"], ["Heure", "Time"], ["Atelier", "Workshop"], ["Salle A", "Room A"], ["Salle", "Room"], ["HTML sémantique", "Semantic HTML"], ["Début :", "Start:"], ["Places :", "Seats:"], ["places disponibles", "seats available"], ["Planning pratique PulsaConf", "Practical PulsaConf schedule"], ["Planning du 18 septembre", "September 18 schedule"], ["Les sessions suivent l'ordre de la journée ; le tableau permet de croiser heure, atelier, salle et capacité.", "Sessions follow the day's order; the table connects time, workshop, room, and capacity."], ["Horaires et capacité des ateliers PulsaConf", "PulsaConf workshop times and capacity"], ["Formulaires accessibles", "Accessible forms"], ["Laboratoire", "Lab"], ["Étapes d'inscription", "Registration steps"], ["Choisir une session.", "Choose a session."], ["Renseigner ses coordonnées.", "Enter your contact details."],
  ["Nom complet", "Full name"], ["Atelier choisi", "Selected workshop"], ["Besoins particuliers", "Additional needs"], ["À l'aise", "Comfortable"], ["J'accepte d'être contacté pour PulsaConf.", "I agree to be contacted about PulsaConf."], ["Demander mon invitation", "Request my invitation"], ["Inscription à PulsaConf 2026", "Register for PulsaConf 2026"], ["Les champs marqués obligatoires doivent être remplis avant l'envoi.", "Fields marked required must be completed before submission."], ["Atelier souhaité", "Preferred workshop"], ["Niveau actuel en HTML", "Current HTML level"], ["Besoins d'accessibilité ou alimentaires", "Accessibility or dietary requirements"], ["Recevoir les actualités de PulsaConf", "Receive PulsaConf updates"], ["Demander mon invitation PulsaConf", "Request my PulsaConf invitation"],
  ["Utilise l'adresse qui recevra ton invitation.", "Use the address that will receive your invitation."], ["Après une validation échouée, insère cet état ; il ne doit pas être présent au chargement.", "After failed validation, insert this state; it must not be present on initial load."], ["Saisis une adresse email valide.", "Enter a valid email address."], ["Liste d'attente", "Waitlist"], ["Me prévenir d'une place", "Notify me when a place opens"], ["La liste ouvrira après validation de la salle.", "The waitlist will open after the venue is confirmed."], ["Envoyer l'inscription", "Submit registration"], ["Le formulaire n'est pas encore envoyé.", "The form has not been submitted yet."], ["Le service d'inscription répond lentement, réessaie dans une minute.", "The registration service is responding slowly; try again in a minute."], ["Finaliser l'inscription PulsaConf", "Complete your PulsaConf registration"], ["Coordonnées du participant", "Participant details"], ["Utilise l'adresse qui recevra la confirmation.", "Use the address that will receive the confirmation."], ["Liste d'attente SMS", "SMS waitlist"], ["Me prévenir par SMS", "Notify me by SMS"], ["Cette option ouvrira après validation du service de messagerie.", "This option will open after the messaging service is confirmed."], ["Formulaire prêt à être envoyé.", "The form is ready to submit."],
  ["Conférence web gratuite", "Free web conference"], ["PulsaConf 2026 réunit ateliers HTML, accessibilité et publication web pour débutants.", "PulsaConf 2026 brings together HTML workshops, accessibility, and web publishing for beginners."], ["Ateliers web gratuits et accessibles.", "Free, accessible web workshops."], ["PulsaConf 2026 propose des ateliers HTML gratuits et accessibles le 18 septembre.", "PulsaConf 2026 offers free, accessible HTML workshops on September 18."], ["Ateliers web accessibles", "Accessible web workshops"], ["Apprenez HTML sémantique et les formulaires accessibles lors d'une journée gratuite.", "Learn semantic HTML and accessible forms during a free day of workshops."], ["Une journée gratuite consacrée au HTML sémantique et aux formulaires accessibles.", "A free day dedicated to semantic HTML and accessible forms."],
  ["Une journée pour construire un web plus clair et accessible.", "A day to build a clearer, more accessible web."], ["Structurer une page événementielle", "Structure an event page"], ["Maya explique comment transformer un contenu brut en plan de titres et sections autonomes.", "Maya explains how to turn raw content into a heading outline and self-contained sections."], ["Rendre un formulaire robuste", "Make a form robust"], ["Samir relie labels, aides, erreurs et statuts sans remplacer les fonctions natives.", "Samir connects labels, help text, errors, and statuses without replacing native behavior."], ["Horaires des ateliers PulsaConf", "PulsaConf workshop times"], ["Formulaires robustes", "Robust forms"], ["Coordonnées", "Contact details"], ["Utilise l'adresse qui recevra l'invitation.", "Use the address that will receive the invitation."],
  ["ne prétend pas", "does not claim"], ["Vérification locale", "Local check"], ["Transcription de l'annonce", "Announcement transcript"], ["Annonce audio", "Audio announcement"], ["Télécharger l'annonce audio", "Download the audio announcement"], ["Bienvenue à PulsaConf. Les ateliers commencent à neuf heures trente dans l'auditorium.", "Welcome to PulsaConf. Workshops start at nine thirty in the auditorium."], ["Je débute", "I am a beginner"], ["Je pratique déjà", "I already practice"]
];

function localizeArtifactCopy(value) {
  return [...englishArtifactCopy]
    .sort(([left], [right]) => right.length - left.length)
    .reduce((copy, [french, english]) => copy.replaceAll(french, english), value);
}

const quizPrompts = {
  "html-00-setup-quiz": [P("Le manifeste contient seulement <p>PulsaConf</p>. Quelle preuve de préparation manque ?", "The manifest contains only <p>PulsaConf</p>. Which readiness evidence is missing?"), P("Un collègue écrit « navigateur installé ». Quelle amélioration rend ce constat vérifiable ?", "A colleague writes 'browser installed.' Which improvement makes that claim verifiable?"), P("Quelles traces prouvent la boucle modifier, sauvegarder, recharger ?", "Which traces prove the edit, save, reload loop?"), P("Vrai ou faux : une extension qui corrige le code remplace la lecture des tests.", "True or false: an extension that fixes code replaces reading the tests."), P("Remets dans l'ordre la première vérification locale de index.html.", "Put the first local index.html check in order."), P("Quelle observation noterais-tu dans le journal de vérification ?", "Which observation would you record in the verification log?")],
  "html-01-document-quiz": [P("Ce document commence directement par <html>. Quel contrat avec le navigateur manque en premier ?", "This document starts directly with <html>. Which browser contract is missing first?"), P("Une page française affiche mal les accents sur mobile. Quelle correction du head faut-il examiner ?", "A French page displays accents badly on mobile. Which head correction should be examined?"), P("Quelles déclarations appartiennent au squelette publiable, avant le contenu ?", "Which declarations belong in the publishable shell before content?"), P("Vrai ou faux : placer h1 dans head rend le titre visible plus tôt.", "True or false: placing h1 in head makes the visible title load sooner."), P("Ordonne les éléments du document de l'extérieur vers le contenu principal.", "Order document elements from the outside toward main content."), P("Quelle assertion prouve que le viewport n'était pas déjà fourni dans le starter ?", "Which assertion proves the viewport was not already supplied in the starter?")],
  "html-02-semantics-quiz": [P("Le programme utilise deux h1 et une session dans un div. Quel défaut gêne d'abord la lecture du plan ?", "The program uses two h1s and a session in a div. Which defect first harms outline reading?"), P("Une session doit pouvoir être reprise seule dans un flux. Quelle structure porte cette autonomie ?", "A session must stand alone in a feed. Which structure carries that independence?"), P("Quelles preuves montrent que le programme reste compréhensible sans CSS ?", "Which evidence shows that the program remains understandable without CSS?"), P("Vrai ou faux : le niveau d'un titre se choisit d'après sa taille par défaut.", "True or false: a heading level is chosen by its default size."), P("Ordonne le plan : événement, programme, session, détail pratique.", "Order the outline: event, program, session, practical detail."), P("Quelle relation entre section et titre vérifierais-tu dans le DOM ?", "Which relationship between section and heading would you inspect in the DOM?")],
  "html-03-navigation-quiz": [P("Le menu contient href=\"#\" et « Clique ici ». Quel problème rencontre une personne qui parcourt les liens isolément ?", "The menu contains href=\"#\" and 'Click here.' What problem affects someone reviewing links in isolation?"), P("Le lien Programme vise #program dans la page actuelle. Quelle valeur décrit correctement son état courant ?", "The Program link targets #program on the current page. Which value correctly describes its current state?"), P("Quelles vérifications rendent le lien externe ouvert dans un nouvel onglet prévisible et sûr ?", "Which checks make an external new-tab link predictable and safe?"), P("Vrai ou faux : aria-current=\"page\" convient à une ancre vers une section de la même page.", "True or false: aria-current=\"page\" fits an anchor to a section on the same page."), P("Ordonne l'audit d'un lien interne, de son libellé à sa cible.", "Order an internal-link audit from its label to its target."), P("Quelle cible DOM prouve que le skip link fonctionne réellement ?", "Which DOM target proves that the skip link really works?")],
  "html-04-media-quiz": [P("Une fiche affiche alt=\"image\" et une vidéo sans contrôle. Quelles informations deviennent indisponibles ?", "A card uses alt=\"image\" and a video without controls. Which information becomes unavailable?"), P("La vidéo annonce aussi les horaires. Quelle correction fournit une expérience équivalente sans image ni son ?", "The video also announces times. Which correction provides an equivalent experience without image or sound?"), P("Quelles preuves faut-il vérifier pour l'image informative et la vidéo ?", "Which evidence should be checked for the informative image and video?"), P("Vrai ou faux : alt vide convient à la photo informative d'une intervenante.", "True or false: empty alt is suitable for an informative speaker photo."), P("Ordonne l'audit média : fonction, alternative, commandes, test sans média.", "Order the media audit: purpose, alternative, controls, test without media."), P("Quelle phrase de la transcription prouverait que l'horaire parlé reste disponible ?", "Which transcript sentence would prove that the spoken time remains available?")]
  ,"html-05-data-quiz": [P("Le planning est composé de paragraphes alignés avec des espaces. Quelle relation de données le balisage perd-il ?", "The schedule uses paragraphs aligned with spaces. Which data relationship does the markup lose?"), P("Pour croiser heure, atelier et salle, quelle structure native faut-il choisir ?", "To cross time, workshop, and room, which native structure should be chosen?"), P("Quelles preuves permettent d'associer les cellules aux bons en-têtes ?", "Which evidence associates cells with the correct headers?"), P("Vrai ou faux : un tableau convient à une simple liste de trois avantages.", "True or false: a table suits a simple list of three benefits."), P("Ordonne caption, thead et tbody selon leur lecture dans le tableau.", "Order caption, thead, and tbody as they are read in the table."), P("Comment vérifierais-tu qu'une heure visible reste exploitable par une machine ?", "How would you verify that a visible time remains machine-usable?")],
  "html-06-forms-quiz": [P("Un formulaire utilise placeholder=\"Email\" et un bouton OK. Quels noms et intentions disparaissent ?", "A form uses placeholder=\"Email\" and an OK button. Which names and intentions disappear?"), P("Quelle combinaison donne au navigateur validation, autocomplétion et valeur envoyable ?", "Which combination gives the browser validation, autofill, and a submittable value?"), P("Quelles relations vérifier avant d'envoyer le formulaire au serveur ?", "Which relationships should be verified before sending the form to the server?"), P("Vrai ou faux : deux radios de niveaux différents doivent avoir des name différents.", "True or false: two radios for different levels should have different names."), P("Ordonne la construction d'un champ : label, contrôle nommé, contrainte, test de soumission.", "Order field construction: label, named control, constraint, submission test."), P("Quelle preuve DOM démontre que le label Nom complet active le bon champ ?", "Which DOM evidence proves the Full name label activates the correct field?")],
  "html-07-feedback-quiz": [P("Une erreur rouge apparaît sous l'email sans relation avec le champ. Que manque-t-il hors du rendu visuel ?", "A red error appears below email without a field relationship. What is missing beyond visual rendering?"), P("Quand choisir un statut poli plutôt qu'une alerte urgente ?", "When should a polite status be chosen over an urgent alert?"), P("Quelles preuves relient simultanément aide et erreur au champ email ?", "Which evidence connects both help and error to the email field?"), P("Vrai ou faux : role=alert doit entourer dès le chargement tous les conseils du formulaire.", "True or false: role=alert should wrap every form hint from initial load."), P("Ordonne le scénario : saisie, validation, marquage invalide, annonce de l'erreur.", "Order the scenario: input, validation, invalid marking, error announcement."), P("Comment vérifierais-tu qu'un fieldset désactivé explique son indisponibilité ?", "How would you verify that a disabled fieldset explains why it is unavailable?")],
  "html-08-seo-quiz": [P("Le head annonce seulement Accueil alors que le h1 dit PulsaConf 2026. Quel défaut de publication cela crée-t-il ?", "The head only says Home while h1 says PulsaConf 2026. Which publishing defect does this create?"), P("Quelle métadonnée consolide les URL dupliquées vers la version officielle ?", "Which metadata consolidates duplicate URLs onto the official version?"), P("Quelles valeurs non vides faut-il comparer entre recherche, partage social et page visible ?", "Which non-empty values should be compared across search, social sharing, and visible page?"), P("Vrai ou faux : une URL relative est idéale pour og:image partagé hors du site.", "True or false: a relative URL is ideal for og:image shared outside the site."), P("Ordonne l'audit : contenu visible, title/description, canonical, carte sociale, JSON-LD.", "Order the audit: visible content, title/description, canonical, social card, JSON-LD."), P("Quelle incohérence JSON-LD empêcherait l'événement structuré de décrire la page ?", "Which JSON-LD inconsistency would stop structured event data from describing the page?")],
  "html-09-final-exam": [P("Le livrable passe un sélecteur mais son menu vise des id absents. Pourquoi l'audit reste-t-il en échec ?", "The deliverable passes a selector but its menu targets missing ids. Why does the audit still fail?"), P("Quelle correction prioriser quand structure visible et métadonnées racontent deux événements différents ?", "Which correction should be prioritized when visible structure and metadata describe two different events?"), P("Quelles preuves transversales couvrent navigation, tableau et formulaire sans se limiter à leur présence ?", "Which cross-cutting evidence covers navigation, table, and form without merely checking presence?"), P("Vrai ou faux : satisfaire chaque test isolément garantit une page cohérente.", "True or false: satisfying every test in isolation guarantees a coherent page."), P("Ordonne la revue finale : lecture humaine, clavier, DOM, tests automatiques, métadonnées.", "Order the final review: human reading, keyboard, DOM, automated tests, metadata."), P("Quel risque résiduel noterais-tu après la réussite des tests statiques HTML ?", "Which residual risk would you record after static HTML tests pass?")]
};

function quizDef(id, title, vocabulary, focus) {
  const profile = quizProfiles[id] || quizProfiles["html-09-final-exam"];
  const prompts = quizPrompts[id];
  const questions = [
    { type: "code-reading", prompt: prompts?.[0] || P(`Lis cet extrait : ${profile.snippet}. Quel diagnostic est prioritaire ?`, `Read this snippet: ${profile.snippet}. What is the priority diagnosis?`), choices: [["issue", profile.issue[0], profile.issue[1]], ["ok", "Le code est prêt pour publication", "The code is ready to publish"], ["css", "Modifier uniquement l'apparence suffit", "Changing only the appearance is enough"]], answer: "issue", explanation: profile.issue },
    { type: "single", prompt: prompts?.[1] || P("Quelle correction traite le problème ?", "Which correction addresses the issue?"), choices: [profile.best, profile.wrong, ["aria-all", "Ajouter des rôles ARIA à chaque élément", "Add ARIA roles to every element"], ["rename", "Changer seulement les noms de classes", "Only rename CSS classes"]], answer: profile.best[0], explanation: P(`${profile.best[1]} : cette correction rend l'intention vérifiable.`, `${profile.best[2]}: this correction makes the intent verifiable.`) },
    { type: "multiple", prompt: prompts?.[2] || P("Quelles preuves doivent accompagner la correction ?", "Which evidence should accompany the correction?"), choices: [["structure", profile.proof[0], profile.proof[1]], ["impact", "L'impact concret pour la personne qui utilise la page", "The concrete impact for the person using the page"], ["appearance", "Un rendu qui semble correct à une seule largeur", "A rendering that looks right at one width"]], answer: ["structure", "impact"], explanation: profile.proof },
    { type: "true-false", prompt: prompts?.[3] || P(`Vrai ou faux : « ${profile.wrong[1]} » convient.`, `True or false: “${profile.wrong[2]}” is suitable.`), choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false", explanation: P("Cette option masque ou déplace le problème au lieu de le résoudre dans le HTML.", "This option hides or moves the issue instead of fixing it in HTML.") },
    { type: "ordering", prompt: prompts?.[4] || P("Classe la méthode de diagnostic.", "Order the diagnostic method."), choices: [["read", "Identifier le contenu et son intention", "Identify the content and its intent"], ["choose", `Appliquer : ${profile.best[1]}`, `Apply: ${profile.best[2]}`], ["prove", "Inspecter la preuve dans le DOM", "Inspect the evidence in the DOM"], ["explain", "Expliquer l'impact utilisateur", "Explain the user impact"]], answer: ["read", "choose", "prove", "explain"], explanation: P("L'ordre relie intention, correction, preuve et impact.", "The order connects intent, correction, evidence, and impact.") },
    { type: "short-open", prompt: prompts?.[5] || P("Quelle preuve observable citerais-tu ?", "Which observable evidence would you cite?"), choices: [], answer: ["test", "attribut", "élément", "dom", "transcription"], explanation: profile.proof }
  ];
  if (id === "html-00-setup-quiz") {
    questions[2] = {
      type: "multiple",
      prompt: prompts[2],
      choices: [["saved", "Le fichier modifié a été sauvegardé", "The edited file was saved"], ["visible", "Le changement apparaît après rechargement", "The change appears after reloading"], ["installed", "Le navigateur est simplement déclaré installé", "The browser is merely declared installed"]],
      answer: ["saved", "visible"],
      explanation: P("La boucle est prouvée par une modification sauvegardée puis visible après rechargement.", "The loop is evidenced by a saved edit that becomes visible after reloading.")
    };
    questions[4] = {
      type: "ordering",
      prompt: prompts[4],
      choices: [["open", "Ouvrir index.html", "Open index.html"], ["edit", "Modifier un titre", "Edit a heading"], ["save", "Sauvegarder le fichier", "Save the file"], ["reload", "Recharger et observer", "Reload and observe"]],
      answer: ["open", "edit", "save", "reload"],
      explanation: P("Ouvre le bon fichier, effectue un changement identifiable, sauvegarde, puis vérifie le résultat dans le navigateur.", "Open the correct file, make an identifiable change, save it, then verify the result in the browser.")
    };
    questions[5] = {
      type: "short-open",
      prompt: prompts[5],
      choices: [],
      answer: ["fichier", "filename", "attendu", "expected", "observé", "observed", "rechargement", "reload", "test"],
      explanation: P("Note le fichier contrôlé, le changement attendu, le résultat observé et, si possible, le test associé.", "Record the checked file, expected change, observed result, and, when possible, the related test.")
    };
  }
  if (id === "html-01-document-quiz") {
    questions[0] = {
      type: "code-reading",
      prompt: prompts[0],
      choices: [["doctype", "La déclaration <!doctype html>", "The <!doctype html> declaration"], ["css", "Une feuille de styles", "A stylesheet"], ["script", "Un script JavaScript", "A JavaScript file"]],
      answer: "doctype",
      explanation: P("Le doctype placé en premier demande au navigateur d'utiliser son mode standard.", "A doctype placed first asks the browser to use standards mode.")
    };
    questions[1] = {
      type: "single",
      prompt: prompts[1],
      choices: [["charset", "Vérifier que meta charset=UTF-8 correspond à l'encodage réel du fichier", "Check that meta charset=UTF-8 matches the file's actual encoding"], ["viewport", "Ajouter uniquement viewport", "Only add viewport"], ["lang", "Changer uniquement lang", "Only change lang"]],
      answer: "charset",
      explanation: P("Charset indique comment décoder le fichier ; viewport règle la largeur de mise en page et lang déclare sa langue.", "Charset controls file decoding; viewport controls layout width and lang declares the language.")
    };
    questions[2] = {
      type: "multiple",
      prompt: prompts[2],
      choices: [["doctype", "<!doctype html>", "<!doctype html>"], ["lang", "L'attribut lang sur html", "The lang attribute on html"], ["charset", "meta charset=UTF-8", "meta charset=UTF-8"], ["viewport", "meta name=viewport avec son contenu", "meta name=viewport with its content"], ["h1", "Le h1 visible du contenu", "The visible content h1"]],
      answer: ["doctype", "lang", "charset", "viewport"],
      explanation: P("Ces quatre déclarations configurent le document avant son contenu ; le h1 appartient au body.", "These four declarations configure the document before its content; h1 belongs in the body.")
    };
    questions[4] = {
      type: "ordering",
      prompt: prompts[4],
      choices: [["doctype", "doctype", "doctype"], ["html", "html", "html"], ["body", "body", "body"], ["main", "main", "main"]],
      answer: ["doctype", "html", "body", "main"],
      explanation: P("Le doctype précède la racine html ; body appartient à html et main appartient à body.", "The doctype precedes the html root; body belongs to html and main belongs to body.")
    };
    questions[5] = {
      type: "short-open",
      prompt: prompts[5],
      choices: [],
      answer: ["viewport", "absent", "missing", "starter", "name=\"viewport\"", "name='viewport'"],
      explanation: P("L'assertion doit vérifier que le starter ne contient pas encore de meta dont name vaut viewport.", "The assertion should verify that the starter does not yet contain a meta whose name is viewport.")
    };
  }
  if (id === "html-02-semantics-quiz") {
    questions[0] = {
      type: "code-reading",
      prompt: prompts[0],
      choices: [["outline", "Le second h1 brouille la convention de plan choisie pour la page", "The second h1 breaks the outline convention chosen for the page"], ["color", "La session n'a pas de couleur", "The session has no color"], ["class", "Le div n'a pas de classe CSS", "The div has no CSS class"]],
      answer: "outline",
      explanation: P("Plusieurs h1 sont valides en HTML, mais ce parcours adopte un h1 unique pour rendre le plan de cette page plus prévisible.", "Multiple h1 elements are valid HTML, but this course uses one h1 to make this page's outline more predictable.")
    };
    questions[1] = {
      type: "single",
      prompt: prompts[1],
      choices: [["article", "Un article avec son propre titre", "An article with its own heading"], ["div", "Un div choisi pour son apparence", "A div chosen for its appearance"], ["strong", "Un strong autour du nom", "A strong around the name"]],
      answer: "article",
      explanation: P("Article convient lorsqu'une session forme un contenu autonome qui garde du sens hors de son contexte immédiat.", "Article fits when a session is standalone content that remains meaningful outside its immediate context.")
    };
    questions[2] = {
      type: "multiple",
      prompt: prompts[2],
      choices: [["headings", "Le plan h1, h2 et h3 reste compréhensible", "The h1, h2, and h3 outline remains understandable"], ["names", "Chaque section est nommée par un titre relié", "Each section is named by a connected heading"], ["articles", "Chaque session autonome possède son propre titre", "Each standalone session has its own heading"], ["columns", "Les colonnes visuelles sont alignées", "The visual columns are aligned"]],
      answer: ["headings", "names", "articles"],
      explanation: P("Le plan, les noms de sections et les titres des articles restent lisibles sans dépendre de la mise en forme.", "The outline, section names, and article headings remain readable without relying on styling.")
    };
    questions[3] = {
      type: "true-false",
      prompt: prompts[3],
      choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]],
      answer: "false",
      explanation: P("Le niveau décrit la place du titre dans le plan. CSS contrôle sa taille visuelle.", "The level describes the heading's place in the outline. CSS controls its visual size.")
    };
    questions[4] = {
      type: "ordering",
      prompt: prompts[4],
      choices: [["event", "h1 : PulsaConf", "h1: PulsaConf"], ["program", "h2 : Programme", "h2: Program"], ["session", "h3 : Atelier", "h3: Workshop"], ["detail", "aside : conseil pratique", "aside: practical tip"]],
      answer: ["event", "program", "session", "detail"],
      explanation: P("Le titre de page précède la section, puis la session ; aside complète ensuite le contenu principal.", "The page heading comes before the section, then the session; aside then supplements the main content.")
    };
    questions[5] = {
      type: "short-open",
      prompt: prompts[5],
      choices: [],
      answer: ["aria-labelledby", "id", "titre", "heading", "correspond", "matching", "référence", "reference"],
      explanation: P("La valeur de aria-labelledby doit correspondre à l'id unique du titre qui nomme la section.", "The aria-labelledby value must match the unique id of the heading that names the section.")
    };
  }
  if (id === "html-03-navigation-quiz") {
    questions[0] = {
      type: "code-reading",
      prompt: prompts[0],
      choices: [["unknown", "Le libellé n'annonce aucune destination et # ne vise aucun contenu précis", "The label announces no destination and # targets no specific content"], ["style", "Le lien n'a pas de classe CSS", "The link has no CSS class"], ["keyboard", "Un lien ne peut pas être activé au clavier", "A link cannot be activated with a keyboard"]],
      answer: "unknown",
      explanation: P("Un lien lu seul doit annoncer sa destination ; un fragment réduit à # ne fournit pas de cible utile.", "A link read on its own should announce its destination; a fragment containing only # provides no useful target.")
    };
    questions[1] = {
      type: "single",
      prompt: prompts[1],
      choices: [["location", "aria-current=\"location\"", "aria-current=\"location\""], ["page", "aria-current=\"page\"", "aria-current=\"page\""], ["step", "aria-current=\"step\"", "aria-current=\"step\""], ["none", "Aucun état", "No state"]],
      answer: "location",
      explanation: P("Location décrit la position courante dans le document ; page décrit le document courant dans un ensemble de pages.", "Location describes the current position within the document; page describes the current document in a set of pages.")
    };
    questions[2] = {
      type: "multiple",
      prompt: prompts[2],
      choices: [["destination", "Vérifier l'URL externe et target=_blank", "Check the external URL and target=_blank"], ["warning", "Annoncer le nouvel onglet dans le texte du lien", "Announce the new tab in the link text"], ["rel", "Appliquer la politique rel attendue", "Apply the expected rel policy"], ["color", "Changer uniquement la couleur du lien", "Only change the link color"]],
      answer: ["destination", "warning", "rel"],
      explanation: P("La destination, l'avertissement visible et la politique rel doivent décrire ensemble le changement de contexte.", "The destination, visible warning, and rel policy should describe the context change together.")
    };
    questions[3] = {
      type: "true-false",
      prompt: prompts[3],
      choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]],
      answer: "false",
      explanation: P("Page convient au document courant dans un ensemble ; location convient à la position courante dans le même document.", "Page fits the current document in a set; location fits the current position within the same document.")
    };
    questions[4] = {
      type: "ordering",
      prompt: prompts[4],
      choices: [["label", "Lire le libellé du lien isolément", "Read the link label in isolation"], ["href", "Inspecter le fragment dans href", "Inspect the fragment in href"], ["target", "Vérifier l'id unique correspondant", "Verify the matching unique id"], ["activate", "Activer le lien au clavier et observer l'arrivée", "Activate the link with the keyboard and observe the destination"]],
      answer: ["label", "href", "target", "activate"],
      explanation: P("L'audit relie le sens du libellé à la syntaxe du fragment, à sa cible unique puis au comportement réel.", "The audit connects label meaning to fragment syntax, its unique target, and then actual behavior.")
    };
    questions[5] = {
      type: "short-open",
      prompt: prompts[5],
      choices: [],
      answer: ["main-content"],
      explanation: P("Le href #main-content doit résoudre un unique main id=\"main-content\" placé après le lien d'évitement.", "The #main-content href should resolve to one unique main id=\"main-content\" placed after the skip link.")
    };
  }
  if (id === "html-04-media-quiz") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["generic", "Le rôle de l'intervenante et le contenu de la vidéo", "The speaker's role and the video's content"], ["css", "Uniquement les couleurs", "Only the colors"], ["filename", "Le nom des fichiers suffit", "The filenames are enough"]],
      answer: "generic", explanation: P("Une alternative générique ne remplace pas l'image et une vidéo sans commandes ni équivalent textuel rend son contenu inaccessible.", "A generic alternative does not replace the image, and video without controls or a text equivalent makes its content unavailable.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["captions", "Ajouter captions synchronisées et transcription visible", "Add synchronized captions and a visible transcript"], ["autoplay", "Lancer automatiquement la vidéo", "Autoplay the video"], ["title", "Ajouter seulement un attribut title", "Only add a title attribute"]],
      answer: "captions", explanation: P("Les captions rendent paroles et sons utiles pendant la lecture ; la transcription restitue aussi les horaires hors du lecteur.", "Captions preserve speech and useful sounds during playback; the transcript also preserves times outside the player.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["alt", "Un alt informatif et contextuel", "Contextual informative alt text"], ["dimensions", "Des dimensions intrinsèques", "Intrinsic dimensions"], ["captions", "Une piste captions valide", "A valid captions track"], ["transcript", "Une transcription visible", "A visible transcript"], ["color", "Une bordure colorée", "A colored border"]],
      answer: ["alt", "dimensions", "captions", "transcript"], explanation: profile.proof
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Une photo informative exige une alternative qui restitue son information ; alt vide convient seulement à une décoration.", "An informative photo needs an alternative that preserves its information; empty alt is only suitable for decoration.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["purpose", "Identifier la fonction du média", "Identify the media purpose"], ["alternative", "Choisir l'alternative adaptée", "Choose the appropriate alternative"], ["controls", "Vérifier commandes et accès au fichier", "Check controls and file access"], ["without", "Tester sans image ni son", "Test without image or sound"]],
      answer: ["purpose", "alternative", "controls", "without"], explanation: P("L'audit part du sens, choisit l'équivalent, vérifie l'interaction puis confirme que l'information survit sans le média.", "The audit starts with meaning, chooses the equivalent, checks interaction, then confirms information survives without the media.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["horaire", "time", "neuf heures trente", "nine thirty", "9 h 30", "9:30"], explanation: P("La transcription doit répéter l'horaire annoncé, par exemple : les ateliers commencent à neuf heures trente.", "The transcript should repeat the announced time, for example: workshops begin at nine thirty.")
    };
  }
  if (id === "html-05-data-quiz") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["relationships", "Les relations entre chaque heure, atelier et salle", "The relationships between each time, workshop, and room"], ["font", "La police du planning", "The schedule font"], ["language", "La langue du document", "The document language"]],
      answer: "relationships", explanation: P("Des paragraphes peuvent conserver les mots mais n'exposent pas les lignes, colonnes et en-têtes qui relient ces valeurs.", "Paragraphs may preserve the words but do not expose the rows, columns, and headers connecting those values.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["table", "Un tableau avec caption", "A table with a caption"], ["list", "Une liste non ordonnée", "An unordered list"], ["breaks", "Des retours à la ligne", "Line breaks"]],
      answer: "table", explanation: P("Un tableau représente des valeurs croisées selon des lignes et des colonnes ; son caption annonce le sujet.", "A table represents values intersecting across rows and columns; its caption announces the subject.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["headers", "Des cellules th pour les en-têtes", "th cells for headers"], ["scope", "scope=\"col\" sur chaque en-tête de colonne", "scope=\"col\" on each column header"], ["groups", "thead et tbody pour distinguer en-têtes et données", "thead and tbody to separate headers and data"], ["spaces", "Des espaces pour aligner le texte", "Spaces to align text"]],
      answer: ["headers", "scope", "groups"], explanation: P("th donne le rôle d'en-tête, scope explicite sa portée et les groupes séparent la ligne d'en-tête des données.", "th provides the header role, scope declares its reach, and row groups separate headers from data.")
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Trois avantages indépendants forment une liste ; un tableau est réservé aux données qui se croisent par lignes et colonnes.", "Three independent benefits form a list; a table is reserved for data intersecting across rows and columns.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["caption", "caption : nommer le tableau", "caption: name the table"], ["thead", "thead : présenter les en-têtes", "thead: present the headers"], ["tbody", "tbody : présenter les lignes de données", "tbody: present the data rows"]],
      answer: ["caption", "thead", "tbody"], explanation: P("Le caption précède les groupes de lignes ; thead porte les en-têtes avant les données de tbody.", "The caption precedes row groups; thead contains headers before tbody data.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["time", "datetime", "2026-09-18T09:30"], explanation: P("Vérifie un élément time dont datetime contient la valeur normalisée correspondant à l'heure visible.", "Check a time element whose datetime contains the normalized value matching the visible time.")
    };
  }
  if (id === "html-06-forms-quiz") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["names", "Le nom accessible du champ et le résultat annoncé par le bouton", "The field's accessible name and the outcome announced by the button"], ["endpoint", "Uniquement l'adresse du serveur", "Only the server address"], ["style", "Uniquement le style visuel", "Only the visual style"]],
      answer: "names", explanation: P("Un placeholder disparaît pendant la saisie et OK ne décrit pas l'action ; un label persistant et un bouton explicite conservent ces informations.", "A placeholder disappears during input and OK does not describe the action; a persistent label and explicit button preserve that information.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["native", "Label relié, input nommé, type email, autocomplete et required", "Connected label, named input, email type, autocomplete, and required"], ["placeholder", "Placeholder et classe CSS uniquement", "Only a placeholder and CSS class"], ["script", "Un script sans attributs HTML", "A script without HTML attributes"]],
      answer: "native", explanation: P("Ces attributs donnent ensemble un nom, une clé d'envoi, une validation et un indice d'autocomplétion au navigateur.", "Together these attributes provide a name, submission key, validation, and autofill hint to the browser.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["destination", "Vérifier action et method", "Check action and method"], ["labels", "Vérifier chaque relation label/contrôle", "Check every label/control relationship"], ["names", "Vérifier name et value des données envoyées", "Check names and values of submitted data"], ["constraints", "Vérifier types et contraintes natives", "Check native types and constraints"], ["colors", "Vérifier uniquement les couleurs", "Only check colors"]],
      answer: ["destination", "labels", "names", "constraints"], explanation: P("Une soumission fiable relie destination, contrôles compréhensibles, clés envoyées et validation native.", "A reliable submission connects its destination, understandable controls, submitted keys, and native validation.")
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Les radios d'une même question partagent le même name et utilisent des value différentes pour rester mutuellement exclusives.", "Radio buttons for one question share the same name and use different values to remain mutually exclusive.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["label", "Écrire le label visible", "Write the visible label"], ["control", "Relier le contrôle nommé", "Connect the named control"], ["constraint", "Ajouter la contrainte native", "Add the native constraint"], ["submit", "Tester la valeur soumise", "Test the submitted value"]],
      answer: ["label", "control", "constraint", "submit"], explanation: P("La construction part de l'intention visible, établit la relation, ajoute les règles puis vérifie les données réellement envoyées.", "Construction starts with visible intent, establishes the relationship, adds rules, then checks the data actually submitted.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["for", "full-name", "id", "correspond", "match"], explanation: P("Le label porte for=\"full-name\" et un unique input porte id=\"full-name\" ; activer le label cible donc ce contrôle.", "The label has for=\"full-name\" and one input has id=\"full-name\"; activating the label therefore targets that control.")
    };
  }
  if (id === "html-07-feedback-quiz") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["relationship", "Une relation avec le champ et un état invalide perceptible", "A relationship to the field and a perceivable invalid state"], ["color", "Une autre nuance de rouge", "Another shade of red"], ["placeholder", "Un placeholder plus long", "A longer placeholder"]],
      answer: "relationship", explanation: P("La couleur et la position ne relient pas l'erreur au champ ; aria-describedby, aria-invalid et un message explicite rendent l'état inspectable.", "Color and position do not connect the error to the field; aria-describedby, aria-invalid, and explicit copy make the state inspectable.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["polite", "Pour une progression ou confirmation qui ne demande pas d'action immédiate", "For progress or confirmation that requires no immediate action"], ["failure", "Pour une erreur qui bloque et exige une correction", "For an error that blocks and requires correction"], ["initial", "Pour lire tous les conseils dès le chargement", "To read every hint on initial load"]],
      answer: "polite", explanation: P("Role=status et aria-live=polite conviennent aux mises à jour non urgentes ; role=alert est réservé à un problème qui demande une réaction.", "role=status and aria-live=polite suit non-urgent updates; role=alert is reserved for a problem requiring a response.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["help", "aria-describedby contient email-help", "aria-describedby contains email-help"], ["error", "Après échec, aria-describedby contient email-error", "After failure, aria-describedby contains email-error"], ["invalid", "Après échec, aria-invalid vaut true", "After failure, aria-invalid is true"], ["alert", "Le nouveau message d'erreur porte role=alert", "The new error message has role=alert"], ["red", "Le texte est seulement rouge", "The text is only red"]],
      answer: ["help", "error", "invalid", "alert"], explanation: P("L'aide persiste ; l'état d'échec ajoute la référence d'erreur, le marqueur invalide et une annonce au moment de l'insertion.", "Help persists; the failure state adds the error reference, invalid marker, and an announcement when inserted.")
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Une alerte présente dès le chargement peut être annoncée trop tôt ; elle doit apparaître au moment où l'erreur exige une action.", "An alert present on initial load may be announced too early; it should appear when the error requires action.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["input", "La personne saisit une valeur", "The person enters a value"], ["validate", "Le formulaire valide la saisie", "The form validates the input"], ["invalid", "Le contrôle reçoit aria-invalid et la référence d'erreur", "The control receives aria-invalid and the error reference"], ["announce", "Le message role=alert est inséré et annoncé", "The role=alert message is inserted and announced"]],
      answer: ["input", "validate", "invalid", "announce"], explanation: P("Le message urgent suit une validation échouée ; il ne précède jamais la saisie ni la décision d'invalidité.", "The urgent message follows failed validation; it never precedes input or the invalid decision.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["disabled", "aria-describedby", "waitlist-help", "outside", "extérieur"], explanation: P("Le fieldset porte disabled et aria-describedby=\"waitlist-help\" ; le texte portant cet id reste visible hors du groupe désactivé.", "The fieldset has disabled and aria-describedby=\"waitlist-help\"; the text with that id remains visible outside the disabled group.")
    };
  }
  if (id === "html-08-seo-quiz") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["generic", "Le résultat de recherche ne distingue pas l'événement ni sa proposition", "The search result does not distinguish the event or its proposition"], ["heading", "Le h1 devient invalide", "The h1 becomes invalid"], ["style", "La page perd uniquement sa mise en forme", "The page only loses its styling"]],
      answer: "generic", explanation: P("Title doit identifier la ressource hors de son contexte ; Accueil ne reflète ni PulsaConf ni ses ateliers.", "The title must identify the resource out of context; Home reflects neither PulsaConf nor its workshops.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["canonical", "Un link rel=canonical avec une URL absolue", "A link rel=canonical with an absolute URL"], ["favicon", "Un link rel=icon", "A link rel=icon"], ["alternate", "Un seul lien hreflang sans href", "A single hreflang link without href"]],
      answer: "canonical", explanation: P("Canonical indique l'URL de référence de la version courante ; il ne remplace pas les variantes linguistiques.", "Canonical indicates the reference URL for the current version; it does not replace language variants.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["title", "Le title et le h1 identifient le même événement", "The title and h1 identify the same event"], ["description", "La description de recherche résume le contenu visible", "The search description summarizes visible content"], ["social", "og:title, og:description, og:url et og:image décrivent le même partage", "og:title, og:description, og:url, and og:image describe the same share"], ["keywords", "Une meta keywords répète tous les mots de la page", "A keywords meta tag repeats every word on the page"]],
      answer: ["title", "description", "social"], explanation: P("Les valeurs de recherche, de partage et le contenu visible doivent nommer et résumer la même ressource.", "Search and sharing values and visible content must name and summarize the same resource.")
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Une carte sociale peut être lue hors du site ; og:image doit donc utiliser une URL HTTPS absolue.", "A social card may be read outside the site, so og:image must use an absolute HTTPS URL.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["visible", "Vérifier le contenu visible", "Check visible content"], ["search", "Aligner title et description", "Align title and description"], ["canonical", "Choisir l'URL canonique", "Choose the canonical URL"], ["social", "Composer la carte sociale", "Compose the social card"], ["structured", "Valider le JSON-LD", "Validate JSON-LD"]],
      answer: ["visible", "search", "canonical", "social", "structured"], explanation: P("L'audit part de la source visible puis vérifie chaque représentation externe et structurée.", "The audit starts with the visible source, then checks each external and structured representation.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["name", "nom", "startdate", "date", "location", "lieu", "attendance", "présence", "inlanguage", "langue"], explanation: P("Le nom, la date, le mode de présence, la langue et le lieu structurés doivent correspondre aux informations visibles de PulsaConf.", "The structured name, date, attendance mode, language, and location must match the visible PulsaConf information.")
    };
  }
  if (id === "html-09-final-exam") {
    questions[0] = {
      type: "code-reading", prompt: prompts[0],
      choices: [["targets", "La présence du menu ne prouve pas que ses fragments atteignent des cibles réelles", "The menu's presence does not prove its fragments reach real targets"], ["style", "Le menu manque uniquement de couleur", "The menu only lacks color"], ["count", "Un seul sélecteur suffit pour certifier la navigation", "One selector is enough to certify navigation"]],
      answer: "targets", explanation: P("Un audit transversal vérifie la relation entre chaque href local et un id présent et unique.", "A cross-cutting audit checks the relationship between every local href and one present, unique id.")
    };
    questions[1] = {
      type: "single", prompt: prompts[1],
      choices: [["align", "Choisir les informations réelles du contenu visible puis aligner toutes les métadonnées", "Choose the real visible-content facts, then align all metadata"], ["hide", "Masquer le h1 pour conserver les métadonnées", "Hide the h1 to preserve metadata"], ["duplicate", "Ajouter un second JSON-LD contradictoire", "Add a second contradictory JSON-LD graph"]],
      answer: "align", explanation: P("Le contenu visible est la référence éditoriale ; title, partage et JSON-LD doivent raconter le même événement.", "Visible content is the editorial reference; title, sharing data, and JSON-LD must describe the same event.")
    };
    questions[2] = {
      type: "multiple", prompt: prompts[2],
      choices: [["navigation", "Chaque fragment vise un id présent et unique", "Every fragment targets one present, unique id"], ["table", "Caption, th scope, time et data exposent les relations", "Caption, th scope, time, and data expose relationships"], ["form", "Labels, name et aria-describedby résolvent vers les bons contrôles et textes", "Labels, name, and aria-describedby resolve to the correct controls and text"], ["presence", "La simple présence d'un nav, table et form", "The mere presence of nav, table, and form"]],
      answer: ["navigation", "table", "form"], explanation: P("Ces preuves contrôlent des relations utilisables plutôt que la présence isolée de balises.", "These checks verify usable relationships rather than isolated element presence.")
    };
    questions[3] = {
      type: "true-false", prompt: prompts[3], choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false",
      explanation: P("Des assertions isolées peuvent toutes passer alors que la page duplique des id, casse une cible ou décrit deux événements différents.", "Isolated assertions can all pass while the page duplicates ids, breaks a target, or describes two different events.")
    };
    questions[4] = {
      type: "ordering", prompt: prompts[4],
      choices: [["human", "Lire le livrable comme une personne", "Read the deliverable as a person"], ["keyboard", "Parcourir les actions au clavier", "Navigate actions with the keyboard"], ["dom", "Inspecter les relations dans le DOM", "Inspect relationships in the DOM"], ["automated", "Exécuter les tests automatiques", "Run automated tests"], ["metadata", "Comparer les métadonnées au contenu", "Compare metadata with content"]],
      answer: ["human", "keyboard", "dom", "automated", "metadata"], explanation: P("La revue part de l'expérience, inspecte ses preuves techniques, puis contrôle les représentations externes.", "The review starts with experience, inspects its technical evidence, then checks external representations.")
    };
    questions[5] = {
      type: "short-open", prompt: prompts[5], choices: [],
      answer: ["clavier", "keyboard", "navigateur", "browser", "mobile", "lecteur d'écran", "screen reader", "réseau", "network", "dynamique", "dynamic"], explanation: P("Un test HTML statique ne prouve pas à lui seul le focus réel, les annonces dynamiques, les différences navigateur ni l'expérience mobile ou réseau.", "A static HTML test alone does not prove real focus, dynamic announcements, browser differences, or mobile and network experience.")
    };
  }
  return {
    id,
    title,
    brief: P(`Diagnostique un vrai extrait PulsaConf : ${profile.issue[0]}`, `Diagnose a real PulsaConf snippet: ${profile.issue[1]}`),
    focus,
    vocabulary,
    questions: [
      ...questions,
      ...(id === "html-09-final-exam" ? [{ type: "single", prompt: P("Quelle preuve manque après une revue DOM réussie ?", "Which proof is still missing after a successful DOM review?"), choices: [["keyboard", "Tester la navigation réelle au clavier", "Test real keyboard navigation"], ["classes", "Ajouter des classes CSS", "Add CSS classes"], ["copy", "Copier la solution", "Copy the solution"]], answer: "keyboard", explanation: P("Le DOM ne prouve pas à lui seul le comportement du focus et du clavier.", "The DOM alone does not prove focus and keyboard behavior.") }] : [])
    ]
  };
}

let previous = null;
let stepNumber = 1;
const compiledModules = modules.map((mod) => {
  const lessons = mod.lessons.map((def) => {
    const item = def.id === "html-09-final-exam"
      ? makeQuiz(quizDef("html-09-final-exam", def.title, mod.vocabulary, def.focus), stepNumber++, previous)
      : makeLesson({ ...def, vocabulary: mod.vocabulary }, stepNumber++, previous);
    previous = item.id;
    return item;
  });
  if (mod.quiz) {
    const quiz = makeQuiz(quizDef(mod.quiz, P(`Quiz : ${mod.title[0]}`, `Quiz: ${mod.title[1]}`), mod.vocabulary, T(`les décisions de « ${mod.title[0]} »`, `the decisions in “${mod.title[1]}”`)), stepNumber++, previous);
    previous = quiz.id;
    lessons.push(quiz);
  }
  const project = makeProject(projectDef(mod.project, mod.vocabulary), stepNumber++, previous);
  lessons.push(project);
  previous = project.id;
  return module(mod.id, mod.title[0], mod.title[1], lessons);
});

const totalSteps = stepNumber - 1;
export const htmlPulsaConfModules = compiledModules.map((mod) => ({
  ...mod,
  lessons: mod.lessons.map((item) => ({ ...item, stepCount: totalSteps }))
}));
