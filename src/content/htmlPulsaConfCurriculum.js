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

const customNarratives = {
  "html-00-what-html-does": {
    fr: {
      intro: "Avant d'écrire PulsaConf, tu clarifies le rôle de HTML : ce n'est ni le design, ni l'interactivité, mais la structure du contenu. Une page solide commence quand chaque morceau de texte a une intention lisible.",
      section: "Le contenu avant l'apparence",
      trap: "Chercher tout de suite une belle mise en page pousse à choisir des balises pour leur rendu par défaut. Ici, tu apprends d'abord à nommer le contenu."
    },
    en: {
      intro: "Before writing PulsaConf, you clarify HTML's job: it is not design or interactivity, but content structure. A solid page starts when every piece of text has a readable intent.",
      section: "Content before appearance",
      trap: "Trying to make the page look good immediately pushes you to choose tags for their default rendering. Here, you first learn to name content."
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
      intro: "Le fichier index.html devient la porte d'entrée de PulsaConf. Ce nom n'est pas magique pour toi, mais il est conventionnel pour les serveurs, les outils de preview et les hébergeurs.",
      section: "Le premier fichier que les outils cherchent",
      trap: "Un fichier nommé page finale.html ou index.txt peut contenir du HTML, mais il ne sera pas reconnu comme point d'entrée web fiable."
    },
    en: {
      intro: "The index.html file becomes the entry point for PulsaConf. The name is not magic for you, but it is conventional for servers, preview tools, and hosts.",
      section: "The first file tools look for",
      trap: "A file named final page.html or index.txt may contain HTML, but it will not be recognized as a reliable web entry point."
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
      intro: "PulsaTeach ne te demande pas de deviner : les tests décrivent les preuves attendues. Apprendre HTML avec des tests, c'est apprendre à transformer une consigne humaine en structure observable.",
      section: "Les tests comme contrat de livraison",
      trap: "Copier la solution sans lire les tests donne une réussite fragile. Le vrai progrès vient quand tu sais quel élément satisfait quelle exigence."
    },
    en: {
      intro: "PulsaTeach does not ask you to guess: tests describe the expected evidence. Learning HTML with tests means learning to turn a human instruction into observable structure.",
      section: "Tests as a delivery contract",
      trap: "Copying the solution without reading tests gives fragile success. Real progress comes when you know which element satisfies which requirement."
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
  const narrative = narrativeFor(id);
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
          example
        },
        {
          title: narrative.fr.decisionTitle,
          paragraphs: [
            narrative.fr.decision,
            custom?.fr?.trap || `Évite de traiter ${focus.fr} comme un simple détail visuel : le choix doit rester compréhensible dans le DOM et justifiable en revue de code.`
          ],
          example: "<div>Bloc visuel sans rôle clair</div>"
        },
        {
          title: narrative.fr.validationTitle,
          paragraphs: [
            narrative.fr.validation,
            `Pour ${id}, commence par le premier test en échec et relie son message à l'élément, l'attribut ou la relation concernée.`
          ],
          example: "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Titre</h2>\n</section>"
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
          example
        },
        {
          title: narrative.en.decisionTitle,
          paragraphs: [
            narrative.en.decision,
            custom?.en?.trap || `Do not treat ${focus.en} as a visual detail: the choice must remain understandable in the DOM and defensible in code review.`
          ],
          example: "<div>Visual block with no clear role</div>"
        },
        {
          title: narrative.en.validationTitle,
          paragraphs: [
            narrative.en.validation,
            `For ${id}, start with the first failing test and connect its message to the relevant element, attribute, or relationship.`
          ],
          example: "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Title</h2>\n</section>"
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
  return {
    fr: {
      objectives: custom?.fr?.objectives || [
        `Construire ${focus.fr} avec un élément HTML adapté.`,
        "Ajouter les attributs qui rendent la structure testable.",
        "Expliquer l'impact utilisateur de la décision prise."
      ],
      prerequisites: [
        "Savoir reconnaître une balise ouvrante et fermante.",
        "Comprendre qu'un attribut précise le rôle ou la relation d'un élément.",
        "Avoir lu les tests comme une liste d'exigences."
      ],
      steps: custom?.fr?.steps || [
        `Repère où ${focus.fr} appartient dans PulsaConf.`,
        "Écris l'élément natif demandé avant de compléter le texte.",
        "Ajoute les attributs reliés, puis lance les tests du plus simple au plus précis."
      ],
      mistakes: custom?.fr?.mistakes || [
        `Pour ${id}, remplacer « ${title.fr} » par un bloc générique sans relation testable.`,
        "Copier une solution complète sans savoir quel test chaque ligne satisfait.",
        "Ajouter de l'ARIA alors qu'un élément HTML natif suffisait."
      ]
    },
    en: {
      objectives: custom?.en?.objectives || [
        `Build ${focus.en} with an appropriate HTML element.`,
        "Add attributes that make the structure testable.",
        "Explain the user impact of the decision."
      ],
      prerequisites: [
        "Recognize opening and closing tags.",
        "Understand that attributes refine an element's role or relationship.",
        "Read tests as a list of requirements."
      ],
      steps: custom?.en?.steps || [
        `Find where ${focus.en} belongs in PulsaConf.`,
        "Write the required native element before filling in the text.",
        "Add connected attributes, then run tests from the simplest to the most specific."
      ],
      mistakes: custom?.en?.mistakes || [
        `For ${id}, replacing “${title.en}” with a generic block that has no testable relationship.`,
        "Copying a full solution without knowing which test each line satisfies.",
        "Adding ARIA when a native HTML element was enough."
      ]
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
  return enrich(lesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    course: courseForStep(def.id, title, def.focus, def.solution.slice(0, 260), def.vocabulary),
    starterCode,
    solution,
    tests: localizedTests(def.tests),
    hint: P("Cherche l'élément ou l'attribut nommé dans le premier test qui échoue.", "Look for the element or attribute named by the first failing test."),
    xp: def.xp || 30
  }), stepNumber, buildsOn, def.focus, def.solution.slice(0, 260), def.vocabulary);
}

function makeProject(def, stepNumber, buildsOn) {
  const starterCode = artifact(def.starter);
  const solution = artifact(def.solution);
  return enrich(projectLesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    starterCode,
    solution,
    tests: localizedTests(def.tests),
    xp: def.xp || 80
  }), stepNumber, buildsOn, def.focus, def.solution.slice(0, 260), def.vocabulary);
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
    randomizeQuestions: false,
    feedbackMode: "immediate"
  };
  return enrich(item, stepNumber, buildsOn, def.focus, "", def.vocabulary);
}

const vocab = {
  setup: {
    fr: [["HTML", "Langage de balisage qui décrit la structure du contenu."], ["éditeur", "Application utilisée pour écrire les fichiers du projet."], ["navigateur", "Application qui interprète HTML et affiche la page."], ["index.html", "Fichier d'entrée conventionnel d'une page web."], ["DevTools", "Outils du navigateur pour inspecter le DOM et diagnostiquer la page."], ["test", "Vérification automatique d'une preuve attendue."]],
    en: [["HTML", "Markup language that describes content structure."], ["editor", "Application used to write project files."], ["browser", "Application that interprets HTML and displays the page."], ["index.html", "Conventional entry file for a web page."], ["DevTools", "Browser tools for inspecting the DOM and diagnosing the page."], ["test", "Automated check for expected evidence."]]
  },
  document: {
    fr: [["doctype", "Déclaration qui active le mode standard du navigateur."], ["head", "Zone des métadonnées non visibles."], ["body", "Zone du contenu visible et interactif."], ["charset", "Encodage utilisé pour afficher correctement le texte."], ["viewport", "Réglage qui adapte la page aux écrans mobiles."]],
    en: [["doctype", "Declaration enabling browser standards mode."], ["head", "Metadata area that is not visible content."], ["body", "Visible and interactive content area."], ["charset", "Encoding used to display text correctly."], ["viewport", "Setting that adapts the page to mobile screens."]]
  },
  semantics: {
    fr: [["main", "Landmark du contenu principal."], ["section", "Regroupement thématique nommé."], ["article", "Contenu autonome réutilisable."], ["heading", "Titre qui structure le plan."], ["details", "Zone d'information dépliable native."]],
    en: [["main", "Landmark for the main content."], ["section", "Named thematic grouping."], ["article", "Standalone reusable content."], ["heading", "Title that structures the outline."], ["details", "Native expandable information area."]]
  },
  navigation: {
    fr: [["nav", "Zone de navigation."], ["href", "Destination d'un lien."], ["ancre", "Cible interne identifiée par un id."], ["aria-current", "Attribut qui indique l'élément actif."], ["skip link", "Lien permettant d'aller directement au contenu principal."]],
    en: [["nav", "Navigation region."], ["href", "Link destination."], ["anchor", "Internal target identified by an id."], ["aria-current", "Attribute indicating the active item."], ["skip link", "Link that jumps directly to main content."]]
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
        title: P("Créer index.html", "Create index.html"),
        brief: P("Transforme une note PulsaConf en premier fichier web reconnu par les outils.", "Turn a PulsaConf note into the first web file recognized by tools."),
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
        starter: `<ol>\n  <li>Écrire du code</li>\n</ol>`,
        solution: `<h2>Boucle de travail HTML</h2>\n<ol>\n  <li>Modifier index.html dans l'éditeur.</li>\n  <li>Sauvegarder le fichier.</li>\n  <li>Recharger la page dans le navigateur.</li>\n  <li>Observer le résultat avant de continuer.</li>\n</ol>`,
        tests: [test("selector", "workflow heading", "h2"), test("selector", "ordered workflow", "ol"), test("minSelector", "four steps", "li", 4), test("contains", "save", "Sauvegarder"), test("contains", "reload", "Recharger")]
      },
      {
        id: "html-00-devtools-inspector",
        title: P("Inspecter avec les DevTools", "Inspect with DevTools"),
        brief: P("Ajoute une note qui explique pourquoi l'inspecteur DOM complète l'aperçu visuel.", "Add a note explaining why the DOM inspector complements the visual preview."),
        focus: T("l'observation du DOM réel", "observing the real DOM"),
        starter: `<p>La page s'affiche.</p>`,
        solution: `<aside aria-label="Diagnostic DevTools">\n  <p>Les DevTools permettent d'inspecter le DOM, les balises et les attributs réellement compris par le navigateur.</p>\n  <code>Inspecter l'élément</code>\n</aside>`,
        tests: [test("selector", "diagnostic aside", "aside[aria-label]"), test("contains", "devtools", "DevTools"), test("contains", "dom", "DOM"), test("contains", "attributes", "attributs"), test("selector", "inspect code", "code")]
      },
      {
        id: "html-00-read-tests",
        title: P("Lire les tests comme des exigences", "Read tests as requirements"),
        brief: P("Relie une consigne PulsaTeach à une preuve HTML observable.", "Connect a PulsaTeach instruction to observable HTML evidence."),
        focus: T("la méthode de validation", "the validation method"),
        starter: `<p>Je vais essayer jusqu'à ce que ça passe.</p>`,
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
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        tests: [test("doctype", "doctype", "<!doctype html>"), test("selector", "html root", "html"), test("selector", "head exists", "head"), test("selector", "body exists", "body"), test("notContains", "no quirks uppercase", "<!DOCTYPE HTML PUBLIC")]
      },
      {
        id: "html-01-root-lang",
        title: P("Racine html et langue", "HTML root and language"),
        brief: P("Déclare que PulsaConf est une page en français.", "Declare PulsaConf as a French page."),
        focus: T("la langue principale du document", "the document primary language"),
        starter: `<!doctype html>\n<html>\n  <head></head>\n  <body></body>\n</html>`,
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        tests: [test("doctype", "doctype", "<!doctype html>"), test("selector", "html lang", "html[lang=\"fr\"]"), test("notContains", "no empty lang", "lang=\"\""), test("selector", "body exists", "body"), test("selector", "main exists", "main")]
      },
      {
        id: "html-01-head-body-roles",
        title: P("Head pour les métadonnées, body pour le contenu", "Head for metadata, body for content"),
        brief: P("Place le titre visible de PulsaConf dans body, pas dans head.", "Place the visible PulsaConf title in body, not head."),
        focus: T("la séparation métadonnées/contenu", "the metadata/content separation"),
        starter: htmlShell(`    <!-- Ajoute le contenu visible ici -->`),
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée gratuite pour apprendre le web par la pratique.</p>\n    </main>`),
        tests: [test("selector", "main", "body main"), test("selector", "visible h1", "body h1"), test("exactSelector", "one h1", "h1", 1), test("selector", "paragraph", "main p"), test("notContains", "no h1 in head", "<head>\n    <h1>")]
      },
      {
        id: "html-01-charset-utf8",
        title: P("Charset UTF-8", "UTF-8 charset"),
        brief: P("Protège les accents et symboles du contenu PulsaConf.", "Protect accents and symbols in PulsaConf content."),
        focus: T("l'encodage fiable du texte", "reliable text encoding"),
        starter: `<!doctype html>\n<html lang="fr">\n  <head>\n    <title>PulsaConf</title>\n  </head>\n  <body></body>\n</html>`,
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n      <p>Accessibilité, données et formulaires.</p>\n    </main>`),
        tests: [test("selector", "charset", "meta[charset=\"UTF-8\"]"), test("selector", "title", "title"), test("selector", "lang", "html[lang=\"fr\"]"), test("selector", "body", "body"), test("contains", "accented content", "Accessibilité")]
      },
      {
        id: "html-01-viewport-mobile",
        title: P("Viewport mobile", "Mobile viewport"),
        brief: P("Prépare la page à être lisible sur téléphone.", "Prepare the page to be readable on phones."),
        focus: T("l'adaptation mobile minimale", "the minimal mobile adaptation"),
        starter: `<!doctype html>\n<html lang="fr">\n  <head>\n    <meta charset="UTF-8" />\n    <title>PulsaConf 2026</title>\n  </head>\n  <body>\n    <main><h1>PulsaConf 2026</h1></main>\n  </body>\n</html>`,
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        tests: [test("selector", "viewport", "meta[name=\"viewport\"]"), test("contains", "width device", "width=device-width"), test("contains", "initial scale", "initial-scale=1.0"), test("selector", "charset", "meta[charset=\"UTF-8\"]"), test("selector", "title", "title")]
      },
      {
        id: "html-01-title-description",
        title: P("Title et description utiles", "Useful title and description"),
        brief: P("Décris PulsaConf dans le head avec un titre et une description précis.", "Describe PulsaConf in the head with a precise title and description."),
        focus: T("l'identité de la page dans le head", "the page identity in the head"),
        starter: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`, `    <meta name="description" content="PulsaConf 2026, événement gratuit pour apprendre HTML, accessibilité et publication web." />`),
        tests: [test("selector", "title", "title"), test("contains", "title text", "PulsaConf 2026"), test("selector", "description", "meta[name=\"description\"]"), test("contains", "description content", "événement gratuit"), test("selector", "h1", "body h1")]
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
        starter: htmlShell(`    <h1>PulsaConf 2026</h1>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        tests: [test("selector", "main id", "main#main-content"), test("exactSelector", "one h1", "h1", 1), test("selector", "h1 inside main", "main h1"), test("contains", "event title", "PulsaConf 2026"), test("notContains", "no second h1", "</h1>\n      <h1>")]
      },
      {
        id: "html-02-heading-outline",
        title: P("Hiérarchie h1, h2, h3", "H1, h2, h3 hierarchy"),
        brief: P("Ajoute deux sections avec des titres de niveau logique.", "Add two sections with logical heading levels."),
        focus: T("le plan lisible de PulsaConf", "the readable PulsaConf outline"),
        starter: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section aria-labelledby="program-title">\n        <h2 id="program-title">Programme</h2>\n        <h3>Atelier HTML accessible</h3>\n      </section>\n      <section aria-labelledby="venue-title">\n        <h2 id="venue-title">Lieu</h2>\n      </section>\n    </main>`),
        tests: [test("exactSelector", "one h1", "h1", 1), test("minSelector", "two h2", "h2", 2), test("selector", "h3 detail", "h3"), test("selector", "labelled program", "section[aria-labelledby=\"program-title\"]"), test("selector", "venue title id", "#venue-title")]
      },
      {
        id: "html-02-paragraphs-emphasis",
        title: P("Paragraphes et emphase réelle", "Paragraphs and real emphasis"),
        brief: P("Ajoute une accroche lisible avec une emphase qui change le sens.", "Add a readable intro with emphasis that changes meaning."),
        focus: T("l'introduction éditoriale de l'événement", "the editorial event introduction"),
        starter: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée <strong>gratuite</strong> pour apprendre le web avec des ateliers concrets.</p>\n      <p><em>Places limitées</em> pour garantir un accompagnement réel.</p>\n    </main>`),
        tests: [test("minSelector", "paragraphs", "main p", 2), test("selector", "strong", "strong"), test("selector", "emphasis", "em"), test("contains", "free", "gratuite"), test("contains", "limited", "Places limitées")]
      },
      {
        id: "html-02-section-article-aside",
        title: P("Section, article et aside", "Section, article, and aside"),
        brief: P("Sépare le programme, une session autonome et une note pratique.", "Separate the program, a standalone session, and a practical note."),
        focus: T("les blocs sémantiques du programme", "the semantic program blocks"),
        starter: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section aria-labelledby="program-title">\n        <h2 id="program-title">Programme</h2>\n        <article>\n          <h3>Construire une page accessible</h3>\n          <p>Atelier guidé sur la structure HTML.</p>\n        </article>\n        <aside aria-label="Conseil pratique">Prévois un ordinateur portable chargé.</aside>\n      </section>\n    </main>`),
        tests: [test("selector", "section labelled", "section[aria-labelledby]"), test("selector", "article", "article"), test("selector", "article heading", "article h3"), test("selector", "aside label", "aside[aria-label]"), test("notContains", "no generic div", "<div>")]
      },
      {
        id: "html-02-quote-details",
        title: P("Citation, details et summary", "Quote, details, and summary"),
        brief: P("Ajoute une citation et une FAQ dépliable native.", "Add a quote and a native expandable FAQ."),
        focus: T("les compléments de contenu natifs", "native supplementary content"),
        starter: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <blockquote cite="https://pulsateach.vercel.app">\n        <p>Apprendre le web devient plus simple quand chaque étape est testable.</p>\n      </blockquote>\n      <details>\n        <summary>Faut-il connaître JavaScript ?</summary>\n        <p>Non, le parcours commence par HTML.</p>\n      </details>\n    </main>`),
        tests: [test("selector", "blockquote cite", "blockquote[cite]"), test("selector", "quote paragraph", "blockquote p"), test("selector", "details", "details"), test("selector", "summary", "details > summary"), test("contains", "faq answer", "Non")]
      },
      {
        id: "html-02-address-abbr-code",
        title: P("address, abbr et code", "address, abbr, and code"),
        brief: P("Marque les informations de contact et les termes techniques.", "Mark up contact information and technical terms."),
        focus: T("les détails textuels précis", "precise textual details"),
        starter: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>L'atelier commence par <abbr title="HyperText Markup Language">HTML</abbr> et un fichier <code>index.html</code>.</p>\n      <address>Contact : equipe@pulsateach.dev</address>\n    </main>`),
        tests: [test("selector", "abbr title", "abbr[title]"), test("contains", "html", "HTML"), test("selector", "code", "code"), test("selector", "address", "address"), test("contains", "email text", "equipe@pulsateach.dev")]
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
        starter: htmlShell(`    <main id="main-content">\n      <a href="/formations/html">Clique ici</a>\n    </main>`),
        solution: htmlShell(`    <main id="main-content">\n      <a href="/formations/html">Découvrir la formation HTML gratuite</a>\n    </main>`),
        tests: [test("selector", "real href", "a[href=\"/formations/html\"]"), test("contains", "explicit text", "formation HTML gratuite"), test("notContains", "no click here", "Clique ici"), test("selector", "link in main", "main a"), test("notContains", "no empty href", "href=\"\"")]
      },
      {
        id: "html-03-internal-anchor",
        title: P("Lien interne avec ancre", "Internal anchor link"),
        brief: P("Relie un bouton de navigation à la section inscription.", "Connect a navigation link to the registration section."),
        focus: T("la circulation dans la page", "movement within the page"),
        starter: htmlShell(`    <main id="main-content">\n      <section id="register"><h2>Inscription</h2></section>\n    </main>`),
        solution: htmlShell(`    <a href="#register">Aller à l'inscription</a>\n    <main id="main-content">\n      <section id="register"><h2>Inscription</h2></section>\n    </main>`),
        tests: [test("selector", "anchor link", "a[href=\"#register\"]"), test("selector", "target id", "#register"), test("contains", "clear text", "inscription"), test("selector", "section heading", "#register h2"), test("notContains", "no empty target", "href=\"#\"")]
      },
      {
        id: "html-03-nav-aria-label",
        title: P("Navigation principale nommée", "Named main navigation"),
        brief: P("Crée une navigation principale identifiable.", "Create identifiable main navigation."),
        focus: T("le menu principal", "the main menu"),
        starter: htmlShell(`    <header>\n      <h1>PulsaConf 2026</h1>\n    </header>`),
        solution: htmlShell(`    <header>\n      <h1>PulsaConf 2026</h1>\n      <nav aria-label="Navigation principale">\n        <a href="#program">Programme</a>\n        <a href="#speakers">Intervenants</a>\n        <a href="#register">Inscription</a>\n      </nav>\n    </header>`),
        tests: [test("selector", "nav label", "nav[aria-label=\"Navigation principale\"]"), test("minSelector", "three links", "nav a", 3), test("selector", "program link", "a[href=\"#program\"]"), test("selector", "register link", "a[href=\"#register\"]"), test("notContains", "no div nav", "<div class=\"nav\"")]
      },
      {
        id: "html-03-current-external-safe",
        title: P("Page active et lien externe sûr", "Current page and safe external link"),
        brief: P("Expose la page active et sécurise un lien externe.", "Expose the active page and secure an external link."),
        focus: T("les états et destinations de navigation", "navigation states and destinations"),
        starter: htmlShell(`    <nav aria-label="Navigation principale">\n      <a href="#program">Programme</a>\n      <a href="https://pulsateach.vercel.app" target="_blank">PulsaTeach</a>\n    </nav>`),
        solution: htmlShell(`    <nav aria-label="Navigation principale">\n      <a href="#program" aria-current="location">Programme</a>\n      <a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">PulsaTeach</a>\n    </nav>\n    <main><section id="program"><h1>Programme PulsaConf</h1></section></main>`),
        tests: [test("selector", "current location", "a[aria-current=\"location\"]"), test("notContains", "not a separate current page", "aria-current=\"page\""), test("selector", "matching target", "section#program"), test("selector", "external target", "a[target=\"_blank\"]"), test("contains", "noopener", "noopener")]
      },
      {
        id: "html-03-contact-download-links",
        title: P("Liens email, téléphone et téléchargement", "Email, phone, and download links"),
        brief: P("Ajoute des actions de contact réellement utilisables.", "Add contact actions that actually work."),
        focus: T("les liens d'action de l'événement", "event action links"),
        starter: htmlShell(`    <section id="contact"><h2>Contact</h2></section>`),
        solution: htmlShell(`    <section id="contact">\n      <h2>Contact</h2>\n      <a href="mailto:equipe@pulsateach.dev">Écrire à l'équipe</a>\n      <a href="tel:+33123456789">Appeler l'accueil</a>\n      <a href="/assets/programme-pulsaconf.pdf" download>Télécharger le programme</a>\n    </section>`),
        tests: [test("selector", "mailto", "a[href^=\"mailto:\"]"), test("selector", "tel", "a[href^=\"tel:\"]"), test("selector", "download", "a[download]"), test("contains", "email label", "Écrire"), test("contains", "download label", "Télécharger")]
      },
      {
        id: "html-03-skip-link",
        title: P("Lien d'évitement", "Skip link"),
        brief: P("Permets aux utilisateurs clavier d'aller directement au contenu.", "Let keyboard users jump directly to content."),
        focus: T("l'accès rapide au contenu", "quick access to content"),
        starter: htmlShell(`    <header><nav aria-label="Navigation principale"></nav></header>\n    <main id="main-content"><h1>PulsaConf</h1></main>`),
        solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><nav aria-label="Navigation principale"></nav></header>\n    <main id="main-content"><h1>PulsaConf</h1></main>`),
        tests: [test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "main target", "main#main-content"), test("contains", "skip text", "contenu principal"), test("selector", "nav", "nav[aria-label]"), test("selector", "h1", "main h1")]
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
        starter: htmlShell(`    <main><img src="/assets/speaker-frontend.png" /></main>`),
        solution: htmlShell(`    <main>\n      <img src="/assets/speaker-frontend.png" alt="Maya anime un atelier HTML accessible" width="640" height="360" />\n    </main>`),
        tests: [test("selector", "img alt", "img[alt]"), test("contains", "specific alt", "Maya anime"), test("selector", "width", "img[width]"), test("selector", "height", "img[height]"), test("notContains", "no generic image", "alt=\"image")]
      },
      {
        id: "html-04-décorative-image-alt-empty",
        title: P("Image décorative ignorée", "Ignored decorative image"),
        brief: P("Marque une forme décorative pour qu'elle ne pollue pas la lecture.", "Mark a decorative shape so it does not pollute reading."),
        focus: T("le silence utile pour les décorations", "useful silence for decoration"),
        starter: htmlShell(`    <header><img src="/assets/wave.svg"><h1>PulsaConf</h1></header>`),
        solution: htmlShell(`    <header>\n      <img src="/assets/wave.svg" alt="" width="120" height="40" />\n      <h1>PulsaConf</h1>\n    </header>`),
        tests: [test("selector", "empty alt", "img[alt=\"\"]"), test("notContains", "no redundant aria hidden", "aria-hidden"), test("selector", "heading remains", "h1"), test("selector", "width", "img[width]"), test("selector", "height", "img[height]")]
      },
      {
        id: "html-04-figure-caption",
        title: P("Figure et figcaption", "Figure and figcaption"),
        brief: P("Associe une photo de scène à une légende lisible.", "Connect a venue photo to a readable caption."),
        focus: T("la relation média/légende", "the media/caption relationship"),
        starter: htmlShell(`    <main><img src="/assets/venue.jpg" alt="Auditorium"></main>`),
        solution: htmlShell(`    <main>\n      <figure>\n        <img src="/assets/venue.jpg" alt="Auditorium lumineux prêt pour PulsaConf" width="800" height="450" />\n        <figcaption>Auditorium principal, accessible par ascenseur.</figcaption>\n      </figure>\n    </main>`),
        tests: [test("selector", "figure", "figure"), test("selector", "figure image", "figure > img"), test("selector", "caption", "figure figcaption"), test("contains", "caption text", "Auditorium principal"), test("selector", "alt", "img[alt]")]
      },
      {
        id: "html-04-lazy-dimensions",
        title: P("Dimensions et chargement différé", "Dimensions and lazy loading"),
        brief: P("Stabilise une image non critique de galerie.", "Stabilize a non-critical gallery image."),
        focus: T("la performance d'une image secondaire", "secondary image performance"),
        starter: htmlShell(`    <section><h2>Galerie</h2><img src="/assets/workshop.jpg" alt="Atelier"></section>`),
        solution: htmlShell(`    <section aria-labelledby="gallery-title">\n      <h2 id="gallery-title">Galerie</h2>\n      <img src="/assets/workshop.jpg" alt="Apprenants en atelier HTML" width="640" height="360" loading="lazy" />\n    </section>`),
        tests: [test("selector", "lazy", "img[loading=\"lazy\"]"), test("selector", "width", "img[width=\"640\"]"), test("selector", "height", "img[height=\"360\"]"), test("selector", "labelled section", "section[aria-labelledby]"), test("selector", "alt", "img[alt]")]
      },
      {
        id: "html-04-audio-fallback",
        title: P("Audio avec fallback", "Audio with fallback"),
        brief: P("Ajoute un extrait audio contrôlable et un lien de secours.", "Add controllable audio and a fallback link."),
        focus: T("l'écoute accessible d'une annonce", "accessible listening to an announcement"),
        starter: htmlShell(`    <section><h2>Annonce audio</h2></section>`),
        solution: htmlShell(`    <section>\n      <h2>Annonce audio</h2>\n      <audio controls src="/assets/pulsaconf-intro.mp3">\n        <a href="/assets/pulsaconf-intro.mp3">Télécharger l'annonce audio</a>\n      </audio>\n      <h3>Transcription</h3>\n      <p>Bienvenue à PulsaConf. Les ateliers commencent à neuf heures trente dans l'auditorium.</p>\n    </section>`),
        tests: [test("selector", "audio controls", "audio[controls]"), test("selector", "audio source", "audio[src]"), test("selector", "fallback link", "audio a[href]"), test("contains", "transcript heading", "Transcription"), test("contains", "equivalent announcement", "neuf heures trente")]
      },
      {
        id: "html-04-video-captions",
        title: P("Vidéo avec sous-titres", "Video with captions"),
        brief: P("Publie une vidéo de présentation avec une piste de sous-titres.", "Publish an intro video with a captions track."),
        focus: T("la vidéo compréhensible sans son", "video understandable without sound"),
        starter: htmlShell(`    <section><h2>Présentation</h2></section>`),
        solution: htmlShell(`    <section>\n      <h2>Présentation</h2>\n      <video controls width="720" height="405">\n        <source src="/assets/pulsaconf.mp4" type="video/mp4" />\n        <track kind="captions" src="/assets/pulsaconf-captions.vtt" srclang="fr" label="Français" default />\n      </video>\n      <h3>Transcription de la vidéo</h3>\n      <p>Maya présente le programme : accueil à neuf heures, atelier HTML accessible puis questions dans l'auditorium.</p>\n    </section>`),
        tests: [test("selector", "video controls", "video[controls]"), test("selector", "source", "video source[type=\"video/mp4\"]"), test("selector", "captions", "track[kind=\"captions\"]"), test("selector", "default track", "track[default]"), test("contains", "equivalent transcript", "Transcription de la vidéo")]
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
        starter: htmlShell(`    <section><h2>Pourquoi venir ?</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="benefits-title">\n      <h2 id="benefits-title">Pourquoi venir ?</h2>\n      <ul>\n        <li>Ateliers guidés</li>\n        <li>Supports accessibles</li>\n        <li>Projet portfolio</li>\n      </ul>\n    </section>`),
        tests: [test("selector", "benefits list", "section > ul"), test("exactSelector", "three benefits", "ul > li", 3), test("referenceExists", "section heading reference", { selector: "section[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "heading before list", ["#benefits-title", "ul"]), test("notContains", "no fake bullets", "•")]
      },
      {
        id: "html-05-ordered-steps",
        title: P("Liste ordonnée", "Ordered list"),
        brief: P("Encode la procédure d'inscription dans l'ordre où une personne doit réellement l'exécuter, du choix à la confirmation.", "Encode registration in the order a person must actually perform it, from choosing to confirming."),
        focus: T("une procédure séquentielle", "a sequential procedure"),
        starter: htmlShell(`    <section><h2>Inscription</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="steps-title">\n      <h2 id="steps-title">Inscription</h2>\n      <ol>\n        <li>Choisir un atelier</li>\n        <li>Remplir le formulaire</li>\n        <li>Confirmer sa présence</li>\n      </ol>\n    </section>`),
        tests: [test("selector", "ordered procedure", "section > ol"), test("exactSelector", "three ordered steps", "ol > li", 3), test("referenceExists", "procedure heading reference", { selector: "section[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "procedure sequence", ["ol > li:first-child", "ol > li:nth-child(2)", "ol > li:last-child"]), test("contains", "confirmation step", "Confirmer sa présence")]
      },
      {
        id: "html-05-definition-list",
        title: P("Liste de définitions", "Description list"),
        brief: P("Associe chaque terme technique à sa définition pour créer un glossaire qui reste compréhensible en lecture linéaire.", "Pair each technical term with its definition to create a glossary that remains understandable in linear reading."),
        focus: T("un glossaire court", "a short glossary"),
        starter: htmlShell(`    <section><h2>Glossaire</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="glossary-title">\n      <h2 id="glossary-title">Glossaire</h2>\n      <dl>\n        <dt>Landmark</dt><dd>Zone de page identifiable.</dd>\n        <dt>Alt</dt><dd>Texte alternatif d'une image.</dd>\n        <dt>Scope</dt><dd>Relation entre un en-tête et des cellules.</dd>\n      </dl>\n    </section>`),
        tests: [test("selector", "description list", "section > dl"), test("exactSelector", "three terms", "dl > dt", 3), test("exactSelector", "three definitions", "dl > dd", 3), test("referenceExists", "glossary heading reference", { selector: "section[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "first term before definition", ["dt:first-of-type", "dd:first-of-type"])]
      },
      {
        id: "html-05-table-caption",
        title: P("Tableau avec caption", "Table with caption"),
        brief: P("Présente des horaires croisés avec des ateliers dans un tableau dont le caption annonce précisément le sujet.", "Present times crossed with workshops in a table whose caption precisely announces its subject."),
        focus: T("des données vraiment tabulaires", "truly tabular data"),
        starter: htmlShell(`    <section><h2>Planning</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="schedule-title">\n      <h2 id="schedule-title">Planning</h2>\n      <table>\n        <caption>Planning des ateliers PulsaConf</caption>\n        <tr><th>Heure</th><th>Atelier</th></tr>\n        <tr><td>09:30</td><td>HTML sémantique</td></tr>\n      </table>\n    </section>`),
        tests: [test("selector", "table", "table"), test("selector", "caption", "table caption"), test("contains", "caption text", "Planning des ateliers"), test("selector", "header cells", "th"), test("selector", "data cells", "td")]
      },
      {
        id: "html-05-thead-tbody-scope",
        title: P("thead, tbody et scope", "thead, tbody, and scope"),
        brief: P("Sépare en-têtes et données du planning, puis déclare la portée de chaque en-tête de colonne pour la lecture assistée.", "Separate schedule headers from data, then declare each column header's scope for assistive reading."),
        focus: T("les relations du tableau", "table relationships"),
        starter: htmlShell(`    <table><caption>Planning</caption><tr><th>Heure</th><th>Atelier</th></tr></table>`),
        solution: htmlShell(`    <table>\n      <caption>Planning des ateliers PulsaConf</caption>\n      <thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th></tr></thead>\n      <tbody><tr><td>09:30</td><td>HTML sémantique</td><td>Salle A</td></tr></tbody>\n    </table>`),
        tests: [test("selector", "table caption", "table > caption"), test("selector", "header group", "table > thead"), test("selector", "body group", "table > tbody"), test("allMatch", "all headers scope columns", { selector: "thead th", matches: "[scope=\"col\"]" }), test("domOrder", "caption headers then data", ["caption", "thead", "tbody"])]
      },
      {
        id: "html-05-time-data",
        title: P("time et data", "time and data"),
        brief: P("Conserve un libellé humain tout en exposant une date et une capacité normalisées aux outils qui réutilisent les données.", "Keep a human-readable label while exposing a normalized date and capacity to tools that reuse the data."),
        focus: T("les données exploitables", "machine-usable data"),
        starter: htmlShell(`    <p>Début : 9h30. Places : 120.</p>`),
        solution: htmlShell(`    <p>Début : <time datetime="2026-09-18T09:30">9h30</time>.</p>\n    <p>Places : <data value="120">120 places disponibles</data>.</p>`),
        tests: [test("selector", "time", "time[datetime]"), test("contains", "machine date", "2026-09-18T09:30"), test("selector", "data", "data[value=\"120\"]"), test("contains", "visible places", "120 places"), test("notContains", "no bare date only", "Début : 9h30")]
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
        starter: htmlShell(`    <section id="register"><h2>Inscription</h2></section>`),
        solution: htmlShell(`    <section id="register" aria-labelledby="register-title">\n      <h2 id="register-title">Inscription</h2>\n      <form action="/api/pulsaconf/register" method="post"></form>\n    </section>`),
        tests: [test("attributeEquals", "registration endpoint", { selector: "form", attribute: "action", expected: "/api/pulsaconf/register" }), test("attributeEquals", "POST submission", { selector: "form", attribute: "method", expected: "post" }), test("referenceExists", "registration heading reference", { selector: "section[aria-labelledby]", attribute: "aria-labelledby" }), test("domOrder", "heading before form", ["#register-title", "form"]), test("noneMatch", "no nested form", { selector: "form", matches: "form form" })]
      },
      {
        id: "html-06-label-input-text",
        title: P("Label relié au champ texte", "Label connected to text input"),
        brief: P("Donne au champ de nom un libellé visible relié par for/id, un nom de soumission et un indice d'autocomplétion adapté.", "Give the name field a visible for/id label, a submission name, and an appropriate autocomplete hint."),
        focus: T("le nom accessible d'un champ", "the accessible name of a field"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="full-name">Nom complet</label>\n      <input id="full-name" name="fullName" type="text" autocomplete="name" />\n    </form>`),
        tests: [test("labelForControl", "label connected to a control", { selector: "label[for]" }), test("attributeEquals", "submitted field name", { selector: "#full-name", attribute: "name", expected: "fullName" }), test("attributeEquals", "text control type", { selector: "#full-name", attribute: "type", expected: "text" }), test("attributeEquals", "name autofill token", { selector: "#full-name", attribute: "autocomplete", expected: "name" }), test("domOrder", "label before name field", ["label[for=\"full-name\"]", "#full-name"])]
      },
      {
        id: "html-06-email-required",
        title: P("Email requis", "Required email"),
        brief: P("Configure une adresse obligatoire avec validation native, nom de soumission et autocomplétion sans remplacer le label par un placeholder.", "Configure a required address with native validation, a submission name, and autofill without replacing the label with a placeholder."),
        focus: T("la saisie email fiable", "reliable email input"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="email">Email</label>\n      <input id="email" name="email" type="email" autocomplete="email" required />\n    </form>`),
        tests: [test("labelForControl", "email label connection", { selector: "label[for]" }), test("allMatch", "email is required and named", { selector: "input#email", matches: "[type=\"email\"][name=\"email\"][required]" }), test("attributeEquals", "email autofill token", { selector: "#email", attribute: "autocomplete", expected: "email" }), test("noneMatch", "no placeholder-only naming", { selector: "input", matches: "[placeholder]:not([aria-label])" }), test("domOrder", "label before email field", ["label[for=\"email\"]", "#email"])]
      },
      {
        id: "html-06-textarea-select",
        title: P("Textarea et select", "Textarea and select"),
        brief: P("Choisis select pour une liste fermée d'ateliers et textarea pour une réponse libre potentiellement longue, avec des noms envoyables.", "Choose select for a closed workshop list and textarea for a potentially long free response, with submittable names."),
        focus: T("les champs longs et les choix contrôlés", "long fields and controlled choices"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="workshop">Atelier choisi</label>\n      <select id="workshop" name="workshop" required>\n        <option value="">Choisir un atelier</option>\n        <option value="html">HTML accessible</option>\n      </select>\n      <label for="needs">Besoins particuliers</label>\n      <textarea id="needs" name="needs" rows="4"></textarea>\n    </form>`),
        tests: [test("labelForControl", "every explicit label resolves", { selector: "label[for]" }), test("allMatch", "controls have submission names", { selector: "select, textarea", matches: "[name]" }), test("selector", "required workshop choice", "select#workshop[required]"), test("attributeEquals", "textarea rows", { selector: "#needs", attribute: "rows", expected: "4" }), test("domOrder", "choice before free-form needs", ["#workshop", "#needs"])]
      },
      {
        id: "html-06-radio-checkbox",
        title: P("Radio et checkbox", "Radio and checkbox"),
        brief: P("Utilise un même name pour rendre les niveaux mutuellement exclusifs, puis une case séparée pour un consentement explicite.", "Use one shared name to make levels mutually exclusive, then a separate checkbox for explicit consent."),
        focus: T("les choix de formulaire", "form choices"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label><input type="radio" name="level" value="beginner" required /> Débutant</label>\n      <label><input type="radio" name="level" value="comfortable" /> À l'aise</label>\n      <label for="consent"><input id="consent" type="checkbox" name="consent" required /> J'accepte d'être contacté pour PulsaConf.</label>\n    </form>`),
        tests: [test("minSelector", "radios", "input[type=\"radio\"][name=\"level\"]", 2), test("selector", "radio required", "input[type=\"radio\"][required]"), test("selector", "checkbox", "input[type=\"checkbox\"]#consent"), test("selector", "consent required", "input#consent[required]"), test("contains", "consent text", "J'accepte")]
      },
      {
        id: "html-06-submit-button",
        title: P("Bouton submit", "Submit button"),
        brief: P("Termine le parcours par un bouton submit dont le texte annonce le résultat attendu plutôt qu'une commande vague comme OK.", "Finish the flow with a submit button whose text announces the expected result rather than a vague command such as OK."),
        focus: T("l'action finale du formulaire", "the form final action"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="email">Email</label>\n      <input id="email" name="email" type="email" required autocomplete="email" />\n      <button type="submit">Demander mon invitation</button>\n    </form>`),
        tests: [test("selector", "submit", "button[type=\"submit\"]"), test("contains", "button text", "Demander mon invitation"), test("selector", "email", "input[type=\"email\"]"), test("selector", "required", "input[required]"), test("notContains", "no button vague", ">OK<")]
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
        starter: htmlShell(`    <form><label for="email">Email</label><input id="email" type="email"></form>`),
        solution: htmlShell(`    <form>\n      <label for="email">Email</label>\n      <p id="email-help">Utilise l'adresse qui recevra ton invitation.</p>\n      <input id="email" name="email" type="email" aria-describedby="email-help" required />\n    </form>`),
        tests: [test("labelForControl", "email label connection", { selector: "label[for]" }), test("referenceExists", "help reference resolves", { selector: "input[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "email includes help id", { selector: "#email", attribute: "aria-describedby", expected: "email-help" }), test("nonEmptyAttribute", "help id is non-empty", { selector: "#email-help", attribute: "id" }), test("domOrder", "label help then field", ["label[for=\"email\"]", "#email-help", "#email"])]
      },
      {
        id: "html-07-error-message",
        title: P("Erreur de champ identifiable", "Identifiable field error"),
        brief: P("Expose une erreur visible, relie-la au champ invalide et réserve role=alert au message injecté après une validation échouée.", "Expose a visible error, connect it to the invalid field, and reserve role=alert for a message injected after failed validation."),
        focus: T("l'erreur explicite d'un champ", "an explicit field error"),
        starter: htmlShell(`    <form><label for="email">Email</label><input id="email" type="email"></form>`),
        solution: htmlShell(`    <form>\n      <label for="email">Email</label>\n      <p id="email-help">Utilise l'adresse qui recevra ton invitation.</p>\n      <input id="email" name="email" type="email" required aria-describedby="email-help" />\n    </form>\n    <!-- Après une validation échouée, insère cet état ; il ne doit pas être présent au chargement. -->\n    <template id="email-error-after-validation">\n      <p id="email-error" role="alert">Saisis une adresse email valide.</p>\n      <input id="email" name="email" type="email" required aria-invalid="true" aria-describedby="email-help email-error" />\n    </template>`),
        tests: [test("noneMatch", "pristine email is not invalid", { selector: "form input", matches: "[aria-invalid]" }), test("noneMatch", "pristine form has no alert", { selector: "form", matches: "[role=\"alert\"]" }), test("referenceExists", "help reference resolves", { selector: "#email[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "email includes help id", { selector: "#email", attribute: "aria-describedby", expected: "email-help" }), test("labelForControl", "email keeps its label", { selector: "label[for]" })]
      },
      {
        id: "html-07-fieldset-legend",
        title: P("Fieldset et legend", "Fieldset and legend"),
        brief: P("Donne un nom commun aux boutons radio avec fieldset et legend afin que la question reste disponible sur chaque option.", "Give radio buttons a shared name with fieldset and legend so the question remains available on every option."),
        focus: T("le groupe de choix nommé", "the named choice group"),
        starter: htmlShell(`    <form></form>`),
        solution: htmlShell(`    <form>\n      <fieldset>\n        <legend>Niveau actuel en HTML</legend>\n        <label><input type="radio" name="level" value="new" /> Je débute</label>\n        <label><input type="radio" name="level" value="practice" /> Je pratique déjà</label>\n      </fieldset>\n    </form>`),
        tests: [test("selector", "fieldset", "fieldset"), test("selector", "legend", "fieldset > legend"), test("minSelector", "radio group", "fieldset input[type=\"radio\"][name=\"level\"]", 2), test("minSelector", "labels", "fieldset label", 2), test("contains", "legend text", "Niveau actuel")]
      },
      {
        id: "html-07-disabled-state",
        title: P("État désactivé expliqué", "Explained disabled state"),
        brief: P("Désactive temporairement tout un groupe natif et relie une explication visible, sans faire passer cet état pour une erreur.", "Temporarily disable an entire native group and connect a visible explanation without presenting the state as an error."),
        focus: T("un état indisponible compréhensible", "an understandable unavailable state"),
        starter: htmlShell(`    <form></form>`),
        solution: htmlShell(`    <form>\n      <fieldset disabled aria-describedby="waitlist-help">\n        <legend>Liste d'attente</legend>\n        <label><input type="checkbox" name="waitlist" /> Me prévenir d'une place</label>\n      </fieldset>\n      <p id="waitlist-help">La liste ouvrira après validation de la salle.</p>\n    </form>`),
        tests: [test("selector", "disabled group", "fieldset[disabled] > legend"), test("referenceExists", "unavailability reason resolves", { selector: "fieldset[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "group includes reason id", { selector: "fieldset", attribute: "aria-describedby", expected: "waitlist-help" }), test("domOrder", "group before explanation", ["fieldset", "#waitlist-help"]), test("noneMatch", "reason is not an error alert", { selector: "#waitlist-help", matches: "[role=\"alert\"]" })]
      },
      {
        id: "html-07-status-live",
        title: P("Statut aria-live poli", "Polite aria-live status"),
        brief: P("Prépare une région de statut persistante dont le texte pourra changer après l'envoi sans interrompre immédiatement la personne.", "Prepare a persistent status region whose text can change after submission without immediately interrupting the person."),
        focus: T("le feedback non intrusif", "non-intrusive feedback"),
        starter: htmlShell(`    <form><button type="submit">Envoyer</button></form>`),
        solution: htmlShell(`    <form aria-describedby="form-status">\n      <button type="submit">Envoyer l'inscription</button>\n      <p id="form-status" role="status" aria-live="polite">Le formulaire n'est pas encore envoyé.</p>\n    </form>`),
        tests: [test("selector", "polite status", "#form-status[role=\"status\"][aria-live=\"polite\"]"), test("referenceExists", "form status reference resolves", { selector: "form[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "form includes status id", { selector: "form", attribute: "aria-describedby", expected: "form-status" }), test("domOrder", "submit before status", ["button[type=\"submit\"]", "#form-status"]), test("noneMatch", "status is not urgent", { selector: "#form-status", matches: "[role=\"alert\"]" })]
      },
      {
        id: "html-07-busy-alert",
        title: P("Busy et alert", "Busy and alert"),
        brief: P("Signale qu'une région est en mise à jour et utilise une alerte seulement pour l'échec qui demande une nouvelle tentative.", "Mark a region as updating and use an alert only for the failure that requires another attempt."),
        focus: T("les états dynamiques importants", "important dynamic states"),
        starter: htmlShell(`    <section id="register"><h2>Inscription</h2></section>`),
        solution: htmlShell(`    <section id="register" aria-busy="true" aria-labelledby="register-title">\n      <h2 id="register-title">Inscription</h2>\n      <p role="alert">Le service d'inscription répond lentement, réessaie dans une minute.</p>\n    </section>`),
        tests: [test("selector", "busy", "section[aria-busy=\"true\"]"), test("selector", "alert", "[role=\"alert\"]"), test("selector", "labelled", "section[aria-labelledby]"), test("contains", "retry", "réessaie"), test("selector", "heading", "#register-title")]
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
        starter: htmlShell(`    <main><h1>PulsaConf</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`).replace("<title>PulsaConf 2026</title>", "<title>PulsaConf 2026 - Conférence web gratuite</title>"),
        tests: [test("selector", "title", "title"), test("contains", "pulsaconf", "PulsaConf 2026"), test("contains", "free conference", "Conférence web gratuite"), test("selector", "h1", "h1"), test("notContains", "not generic", "<title>Accueil</title>")]
      },
      {
        id: "html-08-meta-description",
        title: P("Meta description unique", "Unique meta description"),
        brief: P("Résume honnêtement le contenu de la page dans un attribut content non vide destiné aux aperçus de recherche.", "Honestly summarize the page content in a non-empty content attribute intended for search previews."),
        focus: T("le résumé de la page", "the page summary"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <meta name="description" content="PulsaConf 2026 réunit ateliers HTML, accessibilité et publication web pour débutants." />`),
        tests: [test("exactSelector", "one meta description", "meta[name=\"description\"]", 1), test("nonEmptyAttribute", "description content", { selector: "meta[name=\"description\"]", attribute: "content" }), test("allMatch", "description names HTML", { selector: "meta[name=\"description\"]", matches: "[content*=\"HTML\"]" }), test("exactSelector", "one page title", "title", 1), test("exactSelector", "one visible h1", "h1", 1)]
      },
      {
        id: "html-08-canonical",
        title: P("Canonical absolu", "Absolute canonical"),
        brief: P("Déclare une seule URL canonique absolue pour consolider les variantes d'accès vers la ressource officielle.", "Declare one absolute canonical URL to consolidate access variants onto the official resource."),
        focus: T("l'URL canonique", "the canonical URL"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <!-- example.com is reserved for documentation; replace it before publishing. -->\n    <link rel="canonical" href="https://example.com/pulsaconf" />`),
        tests: [test("exactSelector", "one canonical", "link[rel=\"canonical\"]", 1), test("nonEmptyAttribute", "canonical URL", { selector: "link[rel=\"canonical\"]", attribute: "href" }), test("attributeEquals", "documented canonical placeholder", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: "https://example.com/pulsaconf" }), test("noneMatch", "canonical is not relative", { selector: "link[rel=\"canonical\"]", matches: "[href^=\"/\"]" }), test("selector", "visible event content", "main > h1")]
      },
      {
        id: "html-08-open-graph",
        title: P("Open Graph complet", "Complete Open Graph"),
        brief: P("Compose une carte sociale cohérente avec un titre, un résumé et une image absolue possédant chacun un contenu non vide.", "Compose a coherent social card with a title, summary, and absolute image, each carrying non-empty content."),
        focus: T("les métadonnées de partage", "sharing metadata"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <meta property="og:title" content="PulsaConf 2026" />\n    <meta property="og:description" content="Ateliers web gratuits et accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />`),
        tests: [test("nonEmptyAttribute", "Open Graph title", { selector: "meta[property=\"og:title\"]", attribute: "content" }), test("nonEmptyAttribute", "Open Graph description", { selector: "meta[property=\"og:description\"]", attribute: "content" }), test("nonEmptyAttribute", "Open Graph image", { selector: "meta[property=\"og:image\"]", attribute: "content" }), test("allMatch", "Open Graph entries live in head", { selector: "meta[property^=\"og:\"]", matches: "head meta" }), test("attributeEquals", "repository social image", { selector: "meta[property=\"og:image\"]", attribute: "content", expected: "https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" })]
      },
      {
        id: "html-08-favicon-hreflang",
        title: P("Favicon et variantes linguistiques", "Favicon and language variants"),
        brief: P("Ajoute l'icône du site et publie deux URL linguistiques absolues, chacune identifiée par son code de langue.", "Add the site icon and publish two absolute language URLs, each identified by its language code."),
        focus: T("l'identité visuelle et les variantes linguistiques", "visual identity and language variants"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <link rel="icon" href="/assets/favicon.ico" />\n    <!-- example.com is reserved for documentation; replace these URLs before publishing. -->\n    <link rel="alternate" hreflang="fr" href="https://example.com/pulsaconf" />\n    <link rel="alternate" hreflang="en" href="https://example.com/en/pulsaconf" />`),
        tests: [test("selector", "favicon", "link[rel=\"icon\"]"), test("contains", "favicon path", "favicon.ico"), test("selector", "fr alternate", "link[hreflang=\"fr\"]"), test("selector", "en alternate", "link[hreflang=\"en\"]"), test("contains", "documented absolute alternate", "https://example.com")]
      },
      {
        id: "html-08-json-ld",
        title: P("JSON-LD simple", "Simple JSON-LD"),
        brief: P("Décris l'événement avec un bloc JSON-LD valide et cohérent avec le nom visible, sans transformer ce script en contenu d'interface.", "Describe the event with valid JSON-LD consistent with the visible name, without turning the script into interface content."),
        focus: T("les données structurées", "structured data"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <script type="application/ld+json">\n      {"@context":"https://schema.org","@type":"Event","name":"PulsaConf 2026","eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode"}\n    </script>`),
        tests: [test("selector", "json ld", "script[type=\"application/ld+json\"]"), test("contains", "schema context", "https://schema.org"), test("contains", "event type", "\"@type\":\"Event\""), test("contains", "event name", "PulsaConf 2026"), test("selector", "h1", "h1")]
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
        starter: `<!-- Construis le squelette final -->`,
        solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1></header>\n    <main id="main-content"></main>\n    <footer>© PulsaTeach</footer>`),
        tests: [test("doctype", "standards mode", "<!doctype html>"), test("attributeEquals", "French document language", { selector: "html", attribute: "lang", expected: "fr" }), test("referenceExists", "skip link target exists", { selector: "a[href=\"#main-content\"]", attribute: "href" }), test("domOrder", "header main footer order", ["header", "main", "footer"]), test("exactSelector", "one main landmark", "main#main-content", 1)]
      },
      {
        id: "html-09-assemble-navigation",
        title: P("Assembler la navigation", "Assemble navigation"),
        brief: P("Construis une navigation interne dont chaque href pointe vers une section existante et dont l'état courant décrit une position dans la page.", "Build in-page navigation where every href points to an existing section and current state describes a location within the page."),
        focus: T("la navigation finale", "final navigation"),
        starter: htmlShell(`    <header><h1>PulsaConf 2026</h1></header>\n    <main id="main-content"></main>`),
        solution: htmlShell(`    <header>\n      <h1>PulsaConf 2026</h1>\n      <nav aria-label="Navigation principale">\n        <a href="#program" aria-current="location">Programme</a>\n        <a href="#speakers">Intervenants</a>\n        <a href="#register">Inscription</a>\n      </nav>\n    </header>\n    <main id="main-content"><section id="program"><h2>Programme</h2></section><section id="speakers"><h2>Intervenants</h2></section><section id="register"><h2>Inscription</h2></section></main>`),
        tests: [test("nonEmptyAttribute", "named navigation", { selector: "nav", attribute: "aria-label" }), test("exactSelector", "three navigation links", "nav a", 3), test("allMatch", "all links have destinations", { selector: "nav a", matches: "[href]" }), test("referenceExists", "all navigation targets exist", { selector: "nav a", attribute: "href" }), test("selector", "current in-page location", "a[aria-current=\"location\"]")]
      },
      {
        id: "html-09-assemble-content",
        title: P("Assembler programme et intervenants", "Assemble program and speakers"),
        brief: P("Assemble programme et intervenants comme sections nommées contenant des articles autonomes et un plan de titres continu.", "Assemble program and speakers as named sections containing standalone articles and a continuous heading outline."),
        focus: T("le contenu central", "central content"),
        starter: htmlShell(`    <main id="main-content"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>HTML accessible</h3><p>Atelier pratique.</p></article></section>\n      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><article><h3>Maya</h3><p>Développeuse front-end.</p></article></section>\n    </main>`),
        tests: [test("referenceExists", "section heading references", { selector: "main section[aria-labelledby]", attribute: "aria-labelledby" }), test("exactSelector", "two named sections", "main > section", 2), test("exactSelector", "two standalone cards", "section > article", 2), test("allMatch", "every card has a heading", { selector: "article", matches: ":has(h3)" }), test("domOrder", "program before speakers", ["#program", "#speakers"])]
      },
      {
        id: "html-09-assemble-form-media",
        title: P("Assembler formulaire et médias", "Assemble form and media"),
        brief: P("Intègre un média légendé et un formulaire dont label, aide et statut forment des relations vérifiables au clavier et dans le DOM.", "Integrate captioned media and a form whose label, help, and status form verifiable keyboard and DOM relationships."),
        focus: T("les interactions finales", "final interactions"),
        starter: htmlShell(`    <main id="main-content"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <figure><img src="/assets/venue.jpg" alt="Salle PulsaConf accessible" width="800" height="450" /><figcaption>Salle principale.</figcaption></figure>\n      <form action="/api/pulsaconf/register" method="post" aria-describedby="form-status">\n        <label for="email">Email</label><input id="email" name="email" type="email" required aria-describedby="email-help" />\n        <p id="email-help">Adresse utilisée pour l'invitation.</p>\n        <button type="submit">Demander mon invitation</button><p id="form-status" role="status" aria-live="polite">Prêt.</p>\n      </form>\n    </main>`),
        tests: [test("selector", "captioned venue image", "figure > img + figcaption"), test("nonEmptyAttribute", "informative image alternative", { selector: "figure img", attribute: "alt" }), test("labelForControl", "form label connection", { selector: "form label[for]" }), test("referenceExists", "field help reference", { selector: "input[aria-describedby]", attribute: "aria-describedby" }), test("selector", "polite submission status", "[role=\"status\"][aria-live=\"polite\"]")]
      },
      {
        id: "html-09-audit-antipatterns",
        title: P("Audit des anti-patterns", "Anti-pattern audit"),
        brief: P("Remplace destination factice, texte de lien vague et placeholder utilisé comme label par des relations natives inspectables.", "Replace a fake destination, vague link text, and placeholder used as a label with inspectable native relationships."),
        focus: T("la relecture qualité", "quality review"),
        starter: htmlShell(`    <main><a href="#">clique ici</a><input placeholder="Email"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <a href="#register">Aller au formulaire d'inscription</a>\n      <section id="register"><h1>Inscription PulsaConf</h1>\n        <label for="email">Email</label>\n        <input id="email" name="email" type="email" autocomplete="email" />\n      </section>\n    </main>`),
        tests: [test("notContains", "no vague link", "clique ici"), test("noneMatch", "no fake fragment", { selector: "a", matches: "[href=\"#\"]" }), test("referenceExists", "link target exists", { selector: "a[href^=\"#\"]", attribute: "href" }), test("labelForControl", "email label resolves", { selector: "label[for]" }), test("noneMatch", "no placeholder naming", { selector: "input", matches: "[placeholder]" })]
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
  "html-00-project-local-setup": htmlShell(`    <main id="setup-manifest">\n      <h1>Manifeste de préparation PulsaConf</h1>\n      <p>Cet artefact décrit les contrôles à effectuer localement ; il ne prétend pas les avoir exécutés.</p>\n      <section>\n        <h2>Outils et preuves</h2>\n        <dl><dt>Navigateur</dt><dd>Ouvrir les DevTools et repérer l'inspecteur DOM.</dd><dt>Éditeur</dt><dd>Ouvrir index.html et vérifier son extension.</dd><dt>Aperçu</dt><dd>Modifier un titre, sauvegarder puis recharger.</dd></dl>\n      </section>\n      <section>\n        <h2>Journal de vérification</h2>\n        <ol><li>Noter le fichier observé.</li><li>Décrire le changement attendu.</li><li>Citer le test qui confirme la structure.</li></ol>\n      </section>\n    </main>`),
  "html-01-project-skeleton": htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Le 18 septembre, une journée gratuite réunit débutants et mentors autour de HTML accessible.</p>\n      <p>Le programme, le lieu et l'inscription seront publiés dans ce document en français.</p>\n    </main>`, `    <meta name="description" content="PulsaConf 2026 : ateliers HTML accessibles pour débutants, le 18 septembre." />`),
  "html-02-project-program": htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Deux ateliers progressifs pour construire puis relire une page événementielle.</p>\n      <section id="program">\n        <h2>Programme</h2>\n        <article><h3>Structurer avant de styliser</h3><p>Maya guide la création du plan, des sections et des contenus autonomes.</p><p><time datetime="2026-09-18T09:30">9 h 30</time>, auditorium.</p></article>\n        <article><h3>Relire avec le DOM</h3><p>Samir montre comment vérifier les relations sans dépendre du rendu visuel.</p><p><time datetime="2026-09-18T11:00">11 h</time>, laboratoire.</p></article>\n        <aside><h3>Matériel</h3><p>Apporte un ordinateur chargé ; aucun prérequis technique n'est demandé.</p></aside>\n        <details><summary>Comment choisir un atelier ?</summary><p>Commence par la structure si tu découvres HTML, puis poursuis avec la revue DOM.</p></details>\n      </section>\n    </main>`),
  "html-03-project-navigation": htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#register">Inscription</a><a href="#contact">Contact</a></nav></header>\n    <main id="main-content"><section id="program"><h2>Programme</h2><p>Consulte les ateliers du matin et de l'après-midi.</p></section><section id="register"><h2>Inscription</h2><a href="/pulsaconf/inscription">Ouvrir le formulaire d'inscription PulsaConf</a></section><section id="contact"><h2>Contact</h2><a href="mailto:equipe@pulsateach.dev">Écrire à l'équipe PulsaConf</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">Découvrir PulsaTeach</a></section></main>`),
  "html-04-project-speakers-gallery": htmlShell(`    <main id="main-content">\n      <section id="speakers">\n        <h1>Intervenants PulsaConf</h1>\n        <figure><img src="/assets/maya.jpg" alt="Maya présente le plan d'une page sur un écran" width="640" height="360" /><figcaption>Maya, développeuse front-end et mentor HTML.</figcaption></figure>\n        <figure><img src="/assets/samir.jpg" alt="Samir inspecte un arbre DOM pendant un atelier" width="640" height="360" loading="lazy" /><figcaption>Samir, spécialiste accessibilité.</figcaption></figure>\n        <h2>Présentation vidéo</h2>\n        <video controls width="720" height="405"><source src="/assets/pulsaconf.mp4" type="video/mp4" /><track kind="captions" src="/assets/captions.vtt" srclang="fr" label="Français" default /></video>\n        <h3>Transcription de la vidéo</h3><p>Maya présente l'atelier de structure à 9 h 30. Samir présente la revue du DOM à 11 h dans le laboratoire.</p>\n        <h2>Annonce audio</h2><audio controls src="/assets/pulsaconf-intro.mp3"><a href="/assets/pulsaconf-intro.mp3">Télécharger l'annonce audio</a></audio>\n        <h3>Transcription de l'annonce</h3><p>Les portes ouvrent à neuf heures. L'auditorium est accessible par ascenseur.</p>\n      </section>\n    </main>`),
  "html-05-project-schedule": htmlShell(`    <main id="main-content">\n      <h1>Programme pratique PulsaConf</h1>\n      <section id="schedule" aria-labelledby="schedule-title">\n        <h2 id="schedule-title">Planning du 18 septembre</h2>\n        <p>Les sessions suivent l'ordre de la journée ; le tableau permet de croiser heure, atelier, salle et capacité.</p>\n        <table>\n          <caption>Horaires et capacité des ateliers PulsaConf</caption>\n          <thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th><th scope="col">Places</th></tr></thead>\n          <tbody><tr><td><time datetime="2026-09-18T09:30">9 h 30</time></td><td>HTML sémantique</td><td>Auditorium</td><td><data value="120">120 places</data></td></tr><tr><td><time datetime="2026-09-18T11:00">11 h</time></td><td>Formulaires accessibles</td><td>Laboratoire</td><td><data value="40">40 places</data></td></tr></tbody>\n        </table>\n        <h2>Étapes d'inscription</h2><ol><li>Choisir une session.</li><li>Renseigner ses coordonnées.</li><li>Confirmer sa présence.</li></ol>\n      </section>\n    </main>`),
  "html-06-project-registration-form": htmlShell(`    <main id="main-content">\n      <h1>Inscription à PulsaConf 2026</h1>\n      <p>Les champs marqués obligatoires doivent être remplis avant l'envoi.</p>\n      <form action="/api/pulsaconf/register" method="post">\n        <label for="full-name">Nom complet</label><input id="full-name" name="fullName" type="text" autocomplete="name" required />\n        <label for="email">Adresse email</label><input id="email" name="email" type="email" autocomplete="email" required />\n        <label for="workshop">Atelier souhaité</label><select id="workshop" name="workshop" required><option value="">Choisir un atelier</option><option value="html">HTML sémantique</option><option value="forms">Formulaires accessibles</option></select>\n        <fieldset><legend>Niveau actuel en HTML</legend><label><input type="radio" name="level" value="beginner" required /> Je débute</label><label><input type="radio" name="level" value="practice" /> Je pratique déjà</label></fieldset>\n        <label for="needs">Besoins d'accessibilité ou alimentaires</label><textarea id="needs" name="needs" rows="4"></textarea>\n        <label><input type="checkbox" name="updates" value="yes" /> Recevoir les actualités de PulsaConf</label>\n        <button type="submit">Demander mon invitation PulsaConf</button>\n      </form>\n    </main>`),
  "html-07-project-robust-form": htmlShell(`    <main id="main-content">\n      <h1>Finaliser l'inscription PulsaConf</h1>\n      <form action="/api/pulsaconf/register" method="post" aria-describedby="form-status">\n        <fieldset><legend>Coordonnées du participant</legend>\n          <label for="email">Adresse email</label><p id="email-help">Utilise l'adresse qui recevra la confirmation.</p>\n          <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-help" />\n        </fieldset>\n        <fieldset disabled aria-describedby="waitlist-help"><legend>Liste d'attente SMS</legend><label><input type="checkbox" name="waitlist" /> Me prévenir par SMS</label></fieldset>\n        <p id="waitlist-help">Cette option ouvrira après validation du service de messagerie.</p>\n        <button type="submit">Envoyer l'inscription</button>\n        <p id="form-status" role="status" aria-live="polite">Formulaire prêt à être envoyé.</p>\n      </form>\n      <!-- Après une validation échouée, insère cet état ; il ne doit pas être présent au chargement. -->\n      <template id="email-error-after-validation"><p id="email-error" role="alert">Saisis une adresse email valide.</p><input id="email" name="email" type="email" required aria-invalid="true" aria-describedby="email-help email-error" /></template>\n    </main>`),
  "html-08-project-head": htmlShell(`    <main id="main-content"><h1>PulsaConf 2026</h1><p>Une journée gratuite consacrée au HTML sémantique et aux formulaires accessibles.</p></main>`, `    <meta name="description" content="PulsaConf 2026 propose des ateliers HTML gratuits et accessibles le 18 septembre." />\n    <!-- example.com is reserved for documentation; replace these URLs before publishing. -->\n    <link rel="canonical" href="https://example.com/pulsaconf" />\n    <meta property="og:title" content="PulsaConf 2026 - Ateliers web accessibles" />\n    <meta property="og:description" content="Apprenez HTML sémantique et les formulaires accessibles lors d'une journée gratuite." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />\n    <link rel="icon" href="/assets/favicon.ico" />\n    <link rel="alternate" hreflang="fr" href="https://example.com/pulsaconf" />\n    <link rel="alternate" hreflang="en" href="https://example.com/en/pulsaconf" />\n    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"PulsaConf 2026","startDate":"2026-09-18","eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode","location":{"@type":"Place","name":"Auditorium PulsaTeach"}}</script>`),
  "html-09-final-project-pulsaconf": htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><p>Une journée pour construire un web plus clair et accessible.</p><nav aria-label="Navigation principale"><a href="#program" aria-current="location">Programme</a><a href="#speakers">Intervenants</a><a href="#schedule">Planning</a><a href="#register">Inscription</a></nav></header>\n    <main id="main-content">\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>Structurer une page événementielle</h3><p>Maya explique comment transformer un contenu brut en plan de titres et sections autonomes.</p></article><article><h3>Rendre un formulaire robuste</h3><p>Samir relie labels, aides, erreurs et statuts sans remplacer les fonctions natives.</p></article></section>\n      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><figure><img src="/assets/maya.jpg" alt="Maya présente un plan de page sur l'écran de l'auditorium" width="640" height="360" loading="lazy" /><figcaption>Maya, développeuse front-end et mentor HTML.</figcaption></figure></section>\n      <section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2><table><caption>Horaires des ateliers PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9 h 30</time></td><td>HTML sémantique</td><td>Auditorium</td></tr><tr><td><time datetime="2026-09-18T11:00">11 h</time></td><td>Formulaires robustes</td><td>Laboratoire</td></tr></tbody></table></section>\n      <section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2><form action="/api/pulsaconf/register" method="post" aria-describedby="form-status"><fieldset><legend>Coordonnées</legend><label for="email">Adresse email</label><p id="email-help">Utilise l'adresse qui recevra l'invitation.</p><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="email-help" /></fieldset><button type="submit">Demander mon invitation PulsaConf</button><p id="form-status" role="status" aria-live="polite">Formulaire prêt à être envoyé.</p></form></section>\n    </main>\n    <footer><address>Contact : <a href="mailto:equipe@pulsateach.dev">equipe@pulsateach.dev</a></address></footer>`, `    <!-- example.com is reserved for documentation; replace this URL before publishing. -->\n    <meta name="description" content="PulsaConf 2026 propose des ateliers HTML gratuits et accessibles le 18 septembre." />\n    <link rel="canonical" href="https://example.com/pulsaconf" />\n    <meta property="og:title" content="PulsaConf 2026 - Ateliers web accessibles" />\n    <meta property="og:description" content="Une journée gratuite pour pratiquer HTML sémantique et formulaires accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/og-pulsateach-v2.png" />`)
};

const projectTests = {
  "html-00-project-local-setup": [test("selector", "setup artifact", "main#setup-manifest"), test("minSelector", "tool evidence pairs", "dl > dt", 3), test("minSelector", "local checks", "dl > dd", 3), test("minSelector", "verification journal", "ol > li", 3), test("contains", "honest limitation", "ne prétend pas")],
  "html-01-project-skeleton": [test("doctype", "standards mode", "<!doctype html>"), test("selector", "French document", "html[lang=\"fr\"]"), test("selector", "UTF-8", "meta[charset=\"UTF-8\"]"), test("selector", "mobile viewport", "meta[name=\"viewport\"]"), test("selector", "specific description", "meta[name=\"description\"]"), test("exactSelector", "one main heading", "h1", 1)],
  "html-02-project-program": [test("selector", "program section", "section#program"), test("exactSelector", "one h1", "h1", 1), test("minSelector", "two standalone sessions", "article", 2), test("minSelector", "session headings", "article > h3", 2), test("minSelector", "machine-readable times", "time[datetime]", 2), test("selector", "practical aside", "aside > h3"), test("selector", "native FAQ", "details > summary")],
  "html-03-project-navigation": [test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "named navigation", "nav[aria-label=\"Navigation principale\"]"), test("validFragmentTargets", "local links resolve"), test("selector", "current in-page location", "a[aria-current=\"location\"]"), test("notContains", "not current page", "aria-current=\"page\""), test("selector", "program target", "section#program"), test("selector", "safe external link", "a[target=\"_blank\"][rel=\"noopener noreferrer\"]"), test("selector", "working email link", "a[href^=\"mailto:\"]")],
  "html-04-project-speakers-gallery": [test("minSelector", "two speaker figures", "figure", 2), test("minSelector", "specific image alternatives", "figure img[alt]", 2), test("minSelector", "fixed image dimensions", "img[width][height]", 2), test("selector", "captioned video", "video track[kind=\"captions\"][default]"), test("selector", "controllable audio", "audio[controls]"), test("contains", "video transcript", "Transcription de la vidéo"), test("contains", "audio transcript", "Transcription de l'annonce")]
  ,"html-05-project-schedule": [test("referenceExists", "schedule heading resolves", { selector: "#schedule[aria-labelledby]", attribute: "aria-labelledby" }), test("selector", "specific table caption", "table > caption"), test("allMatch", "all table headers have scope", { selector: "thead th", matches: "[scope=\"col\"]" }), test("exactSelector", "two schedule rows", "tbody > tr", 2), test("exactSelector", "two machine-readable times", "time[datetime]", 2), test("exactSelector", "two capacities", "data[value]", 2)],
  "html-06-project-registration-form": [test("exactSelector", "one registration heading", "h1", 1), test("attributeEquals", "registration endpoint", { selector: "form", attribute: "action", expected: "/api/pulsaconf/register" }), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("selector", "named radio group", "fieldset input[type=\"radio\"][name=\"level\"]"), test("selector", "explicit submit action", "button[type=\"submit\"]")],
  "html-07-project-robust-form": [test("exactSelector", "one robust form heading", "h1", 1), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("referenceExists", "all descriptive references resolve", { selector: "[aria-describedby]", attribute: "aria-describedby" }), test("attributeIncludes", "email has help", { selector: "#email", attribute: "aria-describedby", expected: "email-help" }), test("noneMatch", "pristine email is not invalid", { selector: "form input", matches: "[aria-invalid]" }), test("noneMatch", "pristine form has no alert", { selector: "form", matches: "[role=\"alert\"]" }), test("selector", "polite form status", "#form-status[role=\"status\"][aria-live=\"polite\"]"), test("selector", "explained disabled group", "fieldset[disabled][aria-describedby]")],
  "html-08-project-head": [test("exactSelector", "one event title", "title", 1), test("nonEmptyAttribute", "search description", { selector: "meta[name=\"description\"]", attribute: "content" }), test("attributeEquals", "documented canonical placeholder", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: "https://example.com/pulsaconf" }), test("nonEmptyAttribute", "social metadata", { selector: "meta[property^=\"og:\"]", attribute: "content" }), test("exactSelector", "two language alternatives", "link[rel=\"alternate\"][hreflang]", 2), test("selector", "event JSON-LD", "script[type=\"application/ld+json\"]"), test("selector", "visible content agrees", "main#main-content > h1")]
};

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
    test("documentSanity", "publishable document structure"), test("uniqueIds", "all ids are unique"), test("validFragmentTargets", "local links resolve"), test("labelsAssociated", "every label has one control"), test("formControlsNamed", "active controls submit named values"), test("nonEmptyAttribute", "search description", { selector: "meta[name=\"description\"]", attribute: "content" }), test("attributeEquals", "documented canonical placeholder", { selector: "link[rel=\"canonical\"]", attribute: "href", expected: "https://example.com/pulsaconf" }), test("nonEmptyAttribute", "social metadata", { selector: "meta[property^=\"og:\"]", attribute: "content" }), test("selector", "current in-page location", "nav a[aria-current=\"location\"]"), test("domOrder", "release document order", ["header", "main", "footer"]), test("exactSelector", "one main heading", "h1", 1), test("referenceExists", "section headings resolve", { selector: "main section[aria-labelledby]", attribute: "aria-labelledby" }), test("exactSelector", "four product sections", "main > section", 4), test("nonEmptyAttribute", "informative image alternative", { selector: "figure img", attribute: "alt" }), test("allMatch", "table header scopes", { selector: "thead th", matches: "[scope=\"col\"]" }), test("referenceExists", "form descriptions resolve", { selector: "[aria-describedby]", attribute: "aria-describedby" }), test("selector", "polite submission status", "[role=\"status\"][aria-live=\"polite\"]"), test("selector", "contact address", "footer address a[href^=\"mailto:\"]"), test("notContains", "no vague link", "clique ici")
  ] : [
    test("selector", "doctype-ready html", "html[lang=\"fr\"]"), test("selector", "main", "main"), test("selector", "heading", "h1, h2"), test("minSelector", "module structures", "main *", 4), test("notContains", "no click here", "clique ici"), test("notContains", "no placeholder-only", "placeholder=\"Email\""), test("selector", "meaningful element", "section, article, form, table, figure"), test("contains", "PulsaConf", "PulsaConf")
  ]);
  return {
    id,
    title,
    brief: P(`${title[0]} transforme les compétences du module en une étape concrète et vérifiable de PulsaConf.`, `${title[1]} turns the module skills into a concrete, verifiable PulsaConf step.`),
    focus: T(`la réalisation de « ${title[0]} »`, `the delivery of “${title[1]}”`),
    starter: htmlShell(`    <!-- Assemble la version demandée de PulsaConf ici -->`),
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

// Artifact copy is authored as complete learner-facing phrases. Do not add word-level
// substitutions here: partial substitutions were the source of mixed-language reference files.
const englishArtifactCopy = [
  ["<html lang=\"fr\"", "<html lang=\"en\""], ["français", "English"], ["Français", "English"], ["fr-FR", "en-US"],
  ["Écrire du code", "Write code"], ["La page s'affiche.", "The page is displayed."], ["Je vais essayer jusqu'à ce que ça passe.", "I will keep trying until it passes."],
  ["<!-- Assemble la version demandée de PulsaConf ici -->", "<!-- Build the requested PulsaConf version here. -->"], ["<!-- Construis le squelette final -->", "<!-- Build the final document skeleton. -->"],
  ["<!-- Ajoute le contenu visible ici -->", "<!-- Add visible content here. -->"], ["<!-- Décris les outils et les vérifications à effectuer localement. -->", "<!-- Describe the tools and checks to perform on your own computer. -->"], ["<!-- Le fichier s'appelle encore note.txt -->", "<!-- The file is still named note.txt. -->"],
  ["Manifeste de préparation", "Readiness manifest"], ["Navigateur moderne", "Modern browser"], ["Éditeur de code", "Code editor"], ["Rôle : afficher la page. Vérification locale : ouvrir les DevTools.", "Purpose: display the page. Local check: open DevTools."],
  ["Rôle : modifier le fichier. Vérification locale : confirmer la coloration HTML.", "Purpose: edit the file. Local check: confirm HTML syntax highlighting."], ["Rôle : servir de point d'entrée. Vérification locale : contrôler le nom et l'extension du fichier.", "Purpose: act as the entry file. Local check: verify the file name and extension."],
  ["Fichier de travail :", "Working file:"], ["Premier aperçu du projet événementiel.", "First preview of the event project."], ["Boucle de travail HTML", "HTML workflow loop"], ["Modifier index.html dans l'éditeur.", "Edit index.html in the editor."], ["Sauvegarder le fichier.", "Save the file."], ["Recharger la page dans le navigateur.", "Reload the page in the browser."], ["Observer le résultat avant de continuer.", "Review the result before continuing."],
  ["Diagnostic DevTools", "DevTools diagnosis"], ["Les DevTools permettent d'inspecter le DOM, les balises et les attributs réellement compris par le navigateur.", "DevTools let you inspect the DOM, elements, and attributes the browser actually recognized."], ["Inspecter l'élément", "Inspect element"], ["Méthode de test", "Testing method"], ["Je lis chaque test comme une exigence : sélecteur attendu, texte attendu ou anti-pattern interdit.", "I read each test as a requirement: an expected selector, expected text, or forbidden anti-pattern."], ["Je cite la preuve dans le code avant de passer à l'étape suivante.", "I point to the evidence in the code before moving to the next step."],
  ["Une journée gratuite pour apprendre le web par la pratique.", "A free event for hands-on web learning."], ["Une journée <strong>gratuite</strong> pour apprendre le web avec des ateliers concrets.", "A <strong>free</strong> day for learning the web through practical workshops."], ["<em>Places limitées</em> pour garantir un accompagnement réel.", "<em>Limited seats</em> ensure meaningful guidance."], ["Une journée pour apprendre le web", "A day to learn the web"], ["Accessibilité, données et formulaires.", "Accessibility, data, and forms."], ["Places limitées", "Limited seats"], ["Aller au contenu principal", "Skip to main content"], ["Programme", "Program"], ["Lieu", "Venue"], ["Atelier HTML accessible", "Accessible HTML workshop"], ["Construire une page accessible", "Build an accessible page"], ["Atelier guidé sur la structure HTML.", "A guided workshop on HTML structure."], ["Conseil pratique", "Practical tip"], ["Prévois un ordinateur portable chargé.", "Bring a fully charged laptop."],
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
  ["Une journée pour construire un web plus clair et accessible.", "A day to build a clearer, more accessible web."], ["Une journée gratuite pour pratiquer HTML sémantique et formulaires accessibles.", "A free day to practice semantic HTML and accessible forms."], ["Structurer une page événementielle", "Structure an event page"], ["Maya explique comment transformer un contenu brut en plan de titres et sections autonomes.", "Maya explains how to turn raw content into a heading outline and self-contained sections."], ["Rendre un formulaire robuste", "Make a form robust"], ["Samir relie labels, aides, erreurs et statuts sans remplacer les fonctions natives.", "Samir connects labels, help text, errors, and statuses without replacing native behavior."], ["Horaires des ateliers PulsaConf", "PulsaConf workshop times"], ["Formulaires robustes", "Robust forms"], ["Coordonnées", "Contact details"], ["Utilise l'adresse qui recevra l'invitation.", "Use the address that will receive the invitation."],
  ["Cet artefact décrit les contrôles à effectuer localement ; il ne prétend pas les avoir exécutés.", "This artifact describes checks to perform locally; it does not claim they were completed."], ["Outils et preuves", "Tools and evidence"], ["Navigateur", "Browser"], ["Ouvrir les DevTools et repérer l'inspecteur DOM.", "Open DevTools and locate the DOM inspector."], ["Éditeur", "Editor"], ["Ouvrir index.html et vérifier son extension.", "Open index.html and verify its extension."], ["Aperçu", "Preview"], ["Modifier un titre, sauvegarder puis recharger.", "Change a heading, save, then reload."], ["Journal de vérification", "Verification log"], ["Noter le fichier observé.", "Record the file you observed."], ["Décrire le changement attendu.", "Describe the expected change."], ["Citer le test qui confirme la structure.", "Name the test that confirms the structure."],
  ["Le 18 septembre, une journée gratuite réunit débutants et mentors autour de HTML accessible.", "On September 18, a free day brings beginners and mentors together around accessible HTML."], ["Le programme, le lieu et l'inscription seront publiés dans ce document en français.", "The program, venue, and registration details will be published in this English document."], ["PulsaConf 2026 : ateliers HTML accessibles pour débutants, le 18 septembre.", "PulsaConf 2026: accessible HTML workshops for beginners on September 18."], ["9 h 30", "9:30 AM"], ["11 h", "11 AM"],
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
  return {
    id,
    title,
    brief: P(`Diagnostique un vrai extrait PulsaConf : ${profile.issue[0]}`, `Diagnose a real PulsaConf snippet: ${profile.issue[1]}`),
    focus,
    vocabulary,
    questions: [
      { type: "code-reading", prompt: prompts?.[0] || P(`Lis cet extrait : ${profile.snippet}. Quel diagnostic est prioritaire ?`, `Read this snippet: ${profile.snippet}. What is the priority diagnosis?`), choices: [["issue", profile.issue[0], profile.issue[1]], ["ok", "Le code est prêt pour publication", "The code is ready to publish"], ["css", "Modifier uniquement l'apparence suffit", "Changing only the appearance is enough"]], answer: "issue", explanation: profile.issue },
      { type: "single", prompt: prompts?.[1] || P("Quelle correction traite le problème ?", "Which correction addresses the issue?"), choices: [profile.best, profile.wrong, ["aria-all", "Ajouter des rôles ARIA à chaque élément", "Add ARIA roles to every element"], ["rename", "Changer seulement les noms de classes", "Only rename CSS classes"]], answer: profile.best[0], explanation: P(`${profile.best[1]} : cette correction rend l'intention vérifiable.`, `${profile.best[2]}: this correction makes the intent verifiable.`) },
      { type: "multiple", prompt: prompts?.[2] || P("Quelles preuves doivent accompagner la correction ?", "Which evidence should accompany the correction?"), choices: [["structure", profile.proof[0], profile.proof[1]], ["impact", "L'impact concret pour la personne qui utilise la page", "The concrete impact for the person using the page"], ["appearance", "Un rendu qui semble correct à une seule largeur", "A rendering that looks right at one width"]], answer: ["structure", "impact"], explanation: profile.proof },
      { type: "true-false", prompt: prompts?.[3] || P(`Vrai ou faux : « ${profile.wrong[1]} » convient.`, `True or false: “${profile.wrong[2]}” is suitable.`), choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false", explanation: P("Cette option masque ou déplace le problème au lieu de le résoudre dans le HTML.", "This option hides or moves the issue instead of fixing it in HTML.") },
      { type: "ordering", prompt: prompts?.[4] || P("Classe la méthode de diagnostic.", "Order the diagnostic method."), choices: [["read", "Identifier le contenu et son intention", "Identify the content and its intent"], ["choose", `Appliquer : ${profile.best[1]}`, `Apply: ${profile.best[2]}`], ["prove", "Inspecter la preuve dans le DOM", "Inspect the evidence in the DOM"], ["explain", "Expliquer l'impact utilisateur", "Explain the user impact"]], answer: ["read", "choose", "prove", "explain"], explanation: P("L'ordre relie intention, correction, preuve et impact.", "The order connects intent, correction, evidence, and impact.") },
      { type: "short-open", prompt: prompts?.[5] || P("Quelle preuve observable citerais-tu ?", "Which observable evidence would you cite?"), choices: [], answer: ["test", "attribut", "élément", "dom", "transcription"], explanation: profile.proof }
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
