import { getPedagogy } from "./pedagogy.js";
import { lesson, module, projectLesson, quizLesson, test } from "./trackBuilders.js";

const threadId = "html-pulsaconf-premium";

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
      intro: "Tu prépares ton poste comme un vrai environnement d'apprentissage : un navigateur moderne, un éditeur, un dossier de projet et un fichier d'entrée. Rien d'exotique, mais chaque outil a une responsabilité claire.",
      section: "La boîte à outils minimale",
      trap: "Installer dix extensions avant de comprendre le flux de travail crée plus de bruit que d'aide. Commence avec le navigateur, VS Code et un fichier clair."
    },
    en: {
      intro: "You prepare your machine like a real learning environment: a modern browser, an editor, a project folder, and an entry file. Nothing exotic, but every tool has a clear responsibility.",
      section: "The minimal toolkit",
      trap: "Installing ten extensions before understanding the workflow creates more noise than help. Start with the browser, VS Code, and a clear file."
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
      intro: "Le champ email est le premier endroit où PulsaConf peut éviter une erreur coûteuse : une invitation envoyée au mauvais format. Le navigateur sait déjà vérifier ce cas si tu choisis le bon type et une contrainte claire.",
      section: "Validation native avant JavaScript",
      trap: "Un input de type texte avec le placeholder « email » peut sembler correct, mais il n'apporte ni validation native de l'adresse ni signal sémantique fiable."
    },
    en: {
      intro: "The email field is the first place where PulsaConf can avoid a costly mistake: sending an invitation to an invalid format. The browser already knows how to check this if you choose the right type and a clear constraint.",
      section: "Native validation before JavaScript",
      trap: "A text input with an 'email' placeholder may look correct, but it provides neither native email validation nor a reliable semantic signal."
    }
  },
  "html-08-open-graph": {
    fr: {
      intro: "PulsaConf sera partagé avant d'être lu. Cette étape prépare la carte que les réseaux affichent : titre, résumé et image ne sont pas décoratifs, ils décident si quelqu'un comprend le lien.",
      section: "La page hors de ton site",
      trap: "Se contenter du title de l'onglet laisse souvent les réseaux inventer un aperçu pauvre ou incohérent."
    },
    en: {
      intro: "PulsaConf will be shared before it is read. This step prepares the card social networks display: title, summary, and image are not merely decorative: they determine whether someone understands the link.",
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
    best: ["nav-safe", "Nommer nav, écrire un texte explicite, ajouter rel noopener noreferrer", "Name nav, write explicit text, add rel noopener noreferrer"],
    wrong: ["icon-only", "Remplacer les textes par des icônes seules", "Replace texts with icons only"],
    proof: P("Les tests cherchent `nav[aria-label]`, des href réels et l'absence de 'clique ici'.", "Tests look for `nav[aria-label]`, real href values, and no 'click here'.")
  },
  "html-04-media-quiz": {
    snippet: "<img src=\"speaker.jpg\" alt=\"image\"><video src=\"intro.mp4\"></video>",
    issue: P("L'alt est générique et la vidéo n'a ni controls ni captions.", "The alt text is generic and the video has neither controls nor captions."),
    best: ["media-a11y", "Décrire l'image, ajouter dimensions, controls et track captions", "Describe the image, add dimensions, controls, and a captions track"],
    wrong: ["hide-all", "Mettre alt vide sur toutes les images", "Set empty alt on every image"],
    proof: P("La preuve combine `img[alt]` spécifique, dimensions et `track[kind=captions]`.", "Evidence combines specific `img[alt]`, dimensions, and `track[kind=captions]`.")
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
  return enrich(lesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    course: courseForStep(def.id, title, def.focus, def.solution.slice(0, 260), def.vocabulary),
    starterCode: def.starter,
    solution: def.solution,
    tests: def.tests,
    hint: P("Cherche l'élément ou l'attribut nommé dans le premier test qui échoue.", "Look for the element or attribute named by the first failing test."),
    xp: def.xp || 30
  }), stepNumber, buildsOn, def.focus, def.solution.slice(0, 260), def.vocabulary);
}

function makeProject(def, stepNumber, buildsOn) {
  return enrich(projectLesson({
    id: def.id,
    title: def.title,
    brief: def.brief,
    starterCode: def.starter,
    solution: def.solution,
    tests: def.tests,
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
    fr: [["doctype", "Déclaration qui active le mode standard du navigateur."], ["head", "Zone des métadonnées non visibles."], ["body", "Zone du contenu visible et interactif."], ["charset", "Encodage utilisé pour afficher correctement le texte."], ["viewport", "Réglage qui adapté la page aux écrans mobiles."]],
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
        title: P("Installer la boîte à outils", "Install the toolkit"),
        brief: P("Prépare navigateur, éditeur et dossier de projet sans te perdre dans les extensions.", "Prepare browser, editor, and project folder without getting lost in extensions."),
        focus: T("l'environnement minimal de codage", "the minimal coding environment"),
        starter: `<ul>\n  <li>À compléter</li>\n</ul>`,
        solution: `<section aria-labelledby="tools-title">\n  <h2 id="tools-title">Outils à installer</h2>\n  <ul>\n    <li>Un navigateur moderne : Firefox, Chrome ou Edge.</li>\n    <li>Visual Studio Code pour éditer les fichiers.</li>\n    <li>Un dossier PulsaConf avec un fichier index.html.</li>\n  </ul>\n</section>`,
        tests: [test("selector", "tools section", "section[aria-labelledby=\"tools-title\"]"), test("selector", "tools title", "#tools-title"), test("contains", "browser", "navigateur moderne"), test("contains", "vscode", "Visual Studio Code"), test("contains", "index", "index.html")]
      },
      {
        id: "html-00-create-index-file",
        title: P("Créer index.html", "Create index.html"),
        brief: P("Transforme une note PulsaConf en premier fichier web reconnu par les outils.", "Turn a PulsaConf note into the first web file recognized by tools."),
        focus: T("le fichier d'entrée du projet", "the project entry file"),
        starter: `<!-- Le fichier s'appelle encore note.txt -->\nPulsaConf`,
        solution: `<!-- Fichier : index.html -->\n<h1>PulsaConf 2026</h1>\n<p>Premier aperçu du projet événementiel.</p>`,
        tests: [test("contains", "file comment", "Fichier : index.html"), test("selector", "heading", "h1"), test("selector", "intro paragraph", "p"), test("contains", "event", "PulsaConf 2026"), test("notContains", "no txt", "note.txt")]
      },
      {
        id: "html-00-open-in-browser",
        title: P("Ouvrir, sauvegarder, recharger", "Open, save, reload"),
        brief: P("Décris la boucle de travail qui évite les faux bugs de débutant.", "Describe the workflow loop that avoids beginner false bugs."),
        focus: T("la boucle de feedback navigateur", "the browser feedback loop"),
        starter: `<ol>\n  <li>Écrire du code</li>\n</ol>`,
        solution: `<ol aria-label="Boucle de travail HTML">\n  <li>Modifier index.html dans l'éditeur.</li>\n  <li>Sauvegarder le fichier.</li>\n  <li>Recharger la page dans le navigateur.</li>\n  <li>Observer le résultat avant de continuer.</li>\n</ol>`,
        tests: [test("selector", "ordered workflow", "ol[aria-label]"), test("minSelector", "four steps", "li", 4), test("contains", "save", "Sauvegarder"), test("contains", "reload", "Recharger"), test("contains", "observe", "Observer")]
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
        starter: htmlShell(`    <main>\n      <h1>PulsaConf 2026</h1>\n    </main>`, ""),
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
        solution: htmlShell(`    <nav aria-label="Navigation principale">\n      <a href="#program" aria-current="page">Programme</a>\n      <a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">PulsaTeach</a>\n    </nav>`),
        tests: [test("selector", "current page", "a[aria-current=\"page\"]"), test("selector", "external target", "a[target=\"_blank\"]"), test("contains", "noopener", "noopener"), test("contains", "noreferrer", "noreferrer"), test("selector", "https link", "a[href^=\"https://\"]")]
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
        solution: htmlShell(`    <header>\n      <img src="/assets/wave.svg" alt="" aria-hidden="true" width="120" height="40" />\n      <h1>PulsaConf</h1>\n    </header>`),
        tests: [test("selector", "empty alt", "img[alt=\"\"]"), test("selector", "hidden decoration", "img[aria-hidden=\"true\"]"), test("selector", "heading remains", "h1"), test("selector", "width", "img[width]"), test("selector", "height", "img[height]")]
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
        solution: htmlShell(`    <section aria-labelledby="audio-title">\n      <h2 id="audio-title">Annonce audio</h2>\n      <audio controls src="/assets/pulsaconf-intro.mp3">\n        <a href="/assets/pulsaconf-intro.mp3">Télécharger l'annonce audio</a>\n      </audio>\n    </section>`),
        tests: [test("selector", "audio controls", "audio[controls]"), test("selector", "audio source", "audio[src]"), test("selector", "fallback link", "audio a[href]"), test("contains", "download text", "Télécharger"), test("selector", "labelled section", "section[aria-labelledby]")]
      },
      {
        id: "html-04-video-captions",
        title: P("Vidéo avec captions", "Video with captions"),
        brief: P("Publie une vidéo de présentation avec piste de captions.", "Publish an intro video with a captions track."),
        focus: T("la vidéo compréhensible sans son", "video understandable without sound"),
        starter: htmlShell(`    <section><h2>Présentation</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="video-title">\n      <h2 id="video-title">Présentation</h2>\n      <video controls width="720" height="405">\n        <source src="/assets/pulsaconf.mp4" type="video/mp4" />\n        <track kind="captions" src="/assets/pulsaconf-captions.vtt" srclang="fr" label="Français" default />\n      </video>\n    </section>`),
        tests: [test("selector", "video controls", "video[controls]"), test("selector", "source", "video source[type=\"video/mp4\"]"), test("selector", "captions", "track[kind=\"captions\"]"), test("selector", "srclang", "track[srclang=\"fr\"]"), test("selector", "default track", "track[default]")]
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
        brief: P("Liste les bénéfices de PulsaConf sans ordre imposé.", "List PulsaConf benefits without required order."),
        focus: T("les bénéfices indépendants", "independent benefits"),
        starter: htmlShell(`    <section><h2>Pourquoi venir ?</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="benefits-title">\n      <h2 id="benefits-title">Pourquoi venir ?</h2>\n      <ul>\n        <li>Ateliers guidés</li>\n        <li>Supports accessibles</li>\n        <li>Projet portfolio</li>\n      </ul>\n    </section>`),
        tests: [test("selector", "ul", "ul"), test("minSelector", "three items", "li", 3), test("contains", "guided", "Ateliers guidés"), test("selector", "labelled section", "section[aria-labelledby]"), test("notContains", "no fake bullets", "•")]
      },
      {
        id: "html-05-ordered-steps",
        title: P("Liste ordonnée", "Ordered list"),
        brief: P("Présente les étapes d'inscription dans l'ordre.", "Present registration steps in order."),
        focus: T("une procédure séquentielle", "a sequential procedure"),
        starter: htmlShell(`    <section><h2>Inscription</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="steps-title">\n      <h2 id="steps-title">Inscription</h2>\n      <ol>\n        <li>Choisir un atelier</li>\n        <li>Remplir le formulaire</li>\n        <li>Confirmer sa présence</li>\n      </ol>\n    </section>`),
        tests: [test("selector", "ol", "ol"), test("minSelector", "three ordered items", "ol li", 3), test("contains", "first step", "Choisir"), test("contains", "confirm", "Confirmer"), test("selector", "heading", "#steps-title")]
      },
      {
        id: "html-05-definition-list",
        title: P("Liste de définitions", "Description list"),
        brief: P("Définis trois termes utiles pour les débutants.", "Define three useful beginner terms."),
        focus: T("un glossaire court", "a short glossary"),
        starter: htmlShell(`    <section><h2>Glossaire</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="glossary-title">\n      <h2 id="glossary-title">Glossaire</h2>\n      <dl>\n        <dt>Landmark</dt><dd>Zone de page identifiable.</dd>\n        <dt>Alt</dt><dd>Texte alternatif d'une image.</dd>\n        <dt>Scope</dt><dd>Relation entre un en-tête et des cellules.</dd>\n      </dl>\n    </section>`),
        tests: [test("selector", "dl", "dl"), test("minSelector", "terms", "dt", 3), test("minSelector", "definitions", "dd", 3), test("contains", "landmark", "Landmark"), test("selector", "labelled", "section[aria-labelledby]")]
      },
      {
        id: "html-05-table-caption",
        title: P("Tableau avec caption", "Table with caption"),
        brief: P("Crée le planning de PulsaConf avec un titre de tableau.", "Create the PulsaConf schedule with a table title."),
        focus: T("des données vraiment tabulaires", "truly tabular data"),
        starter: htmlShell(`    <section><h2>Planning</h2></section>`),
        solution: htmlShell(`    <section aria-labelledby="schedule-title">\n      <h2 id="schedule-title">Planning</h2>\n      <table>\n        <caption>Planning des ateliers PulsaConf</caption>\n        <tr><th>Heure</th><th>Atelier</th></tr>\n        <tr><td>09:30</td><td>HTML sémantique</td></tr>\n      </table>\n    </section>`),
        tests: [test("selector", "table", "table"), test("selector", "caption", "table caption"), test("contains", "caption text", "Planning des ateliers"), test("selector", "header cells", "th"), test("selector", "data cells", "td")]
      },
      {
        id: "html-05-thead-tbody-scope",
        title: P("thead, tbody et scope", "thead, tbody, and scope"),
        brief: P("Renforce les relations d'en-têtes dans le planning.", "Strengthen header relationships in the schedule."),
        focus: T("les relations du tableau", "table relationships"),
        starter: htmlShell(`    <table><caption>Planning</caption><tr><th>Heure</th><th>Atelier</th></tr></table>`),
        solution: htmlShell(`    <table>\n      <caption>Planning des ateliers PulsaConf</caption>\n      <thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th><th scope="col">Salle</th></tr></thead>\n      <tbody><tr><td>09:30</td><td>HTML sémantique</td><td>Salle A</td></tr></tbody>\n    </table>`),
        tests: [test("selector", "thead", "thead"), test("selector", "tbody", "tbody"), test("minSelector", "scope col", "th[scope=\"col\"]", 3), test("selector", "caption", "caption"), test("selector", "body row", "tbody tr")]
      },
      {
        id: "html-05-time-data",
        title: P("time et data", "time and data"),
        brief: P("Ajoute des valeurs lisibles par machine aux horaires et jauges.", "Add machine-readable values to times and capacity."),
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
        brief: P("Crée le formulaire d'inscription avec une destination explicite.", "Create the registration form with an explicit destination."),
        focus: T("l'envoi natif du formulaire", "native form submission"),
        starter: htmlShell(`    <section id="register"><h2>Inscription</h2></section>`),
        solution: htmlShell(`    <section id="register" aria-labelledby="register-title">\n      <h2 id="register-title">Inscription</h2>\n      <form action="/api/pulsaconf/register" method="post"></form>\n    </section>`),
        tests: [test("selector", "form", "form"), test("selector", "action", "form[action=\"/api/pulsaconf/register\"]"), test("selector", "method", "form[method=\"post\"]"), test("selector", "register section", "#register"), test("selector", "labelled section", "section[aria-labelledby]")]
      },
      {
        id: "html-06-label-input-text",
        title: P("Label relié au champ texte", "Label connected to text input"),
        brief: P("Ajoute le champ nom complet avec un label réel.", "Add the full name field with a real label."),
        focus: T("le nom accessible d'un champ", "the accessible name of a field"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="full-name">Nom complet</label>\n      <input id="full-name" name="fullName" type="text" autocomplete="name" />\n    </form>`),
        tests: [test("selector", "label for", "label[for=\"full-name\"]"), test("selector", "input id", "input#full-name"), test("selector", "name", "input[name=\"fullName\"]"), test("selector", "type text", "input[type=\"text\"]"), test("selector", "autocomplete", "input[autocomplete=\"name\"]")]
      },
      {
        id: "html-06-email-required",
        title: P("Email requis", "Required email"),
        brief: P("Ajoute un email validé par le navigateur.", "Add an email validated by the browser."),
        focus: T("la saisie email fiable", "reliable email input"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="email">Email</label>\n      <input id="email" name="email" type="email" autocomplete="email" required />\n    </form>`),
        tests: [test("selector", "email label", "label[for=\"email\"]"), test("selector", "email input", "input#email[type=\"email\"]"), test("selector", "required", "input[required]"), test("selector", "autocomplete", "input[autocomplete=\"email\"]"), test("selector", "name", "input[name=\"email\"]")]
      },
      {
        id: "html-06-textarea-select",
        title: P("Textarea et select", "Textarea and select"),
        brief: P("Permets de choisir un atelier et de préciser un besoin.", "Allow choosing a workshop and describing a need."),
        focus: T("les champs longs et les choix contrôlés", "long fields and controlled choices"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label for="workshop">Atelier choisi</label>\n      <select id="workshop" name="workshop" required>\n        <option value="">Choisir un atelier</option>\n        <option value="html">HTML accessible</option>\n      </select>\n      <label for="needs">Besoins particuliers</label>\n      <textarea id="needs" name="needs" rows="4"></textarea>\n    </form>`),
        tests: [test("selector", "select label", "label[for=\"workshop\"]"), test("selector", "select", "select#workshop[name=\"workshop\"]"), test("selector", "required select", "select[required]"), test("selector", "textarea label", "label[for=\"needs\"]"), test("selector", "textarea", "textarea#needs[name=\"needs\"]")]
      },
      {
        id: "html-06-radio-checkbox",
        title: P("Radio et checkbox", "Radio and checkbox"),
        brief: P("Ajoute un choix de niveau et un consentement explicite.", "Add a level choice and explicit consent."),
        focus: T("les choix de formulaire", "form choices"),
        starter: htmlShell(`    <form action="/api/pulsaconf/register" method="post"></form>`),
        solution: htmlShell(`    <form action="/api/pulsaconf/register" method="post">\n      <label><input type="radio" name="level" value="beginner" required /> Débutant</label>\n      <label><input type="radio" name="level" value="comfortable" /> À l'aise</label>\n      <label for="consent"><input id="consent" type="checkbox" name="consent" required /> J'accepte d'être contacté pour PulsaConf.</label>\n    </form>`),
        tests: [test("minSelector", "radios", "input[type=\"radio\"][name=\"level\"]", 2), test("selector", "radio required", "input[type=\"radio\"][required]"), test("selector", "checkbox", "input[type=\"checkbox\"]#consent"), test("selector", "consent required", "input#consent[required]"), test("contains", "consent text", "J'accepte")]
      },
      {
        id: "html-06-submit-button",
        title: P("Bouton submit", "Submit button"),
        brief: P("Termine le formulaire avec une action d'envoi claire.", "Finish the form with a clear submit action."),
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
        brief: P("Relie un champ email à son texte d'aide.", "Connect an email field to its help text."),
        focus: T("la relation champ/aide", "the field/help relationship"),
        starter: htmlShell(`    <form><label for="email">Email</label><input id="email" type="email"></form>`),
        solution: htmlShell(`    <form>\n      <label for="email">Email</label>\n      <p id="email-help">Utilise l'adresse qui recevra ton invitation.</p>\n      <input id="email" name="email" type="email" aria-describedby="email-help" required />\n    </form>`),
        tests: [test("selector", "help id", "#email-help"), test("selector", "describedby", "input[aria-describedby=\"email-help\"]"), test("selector", "label", "label[for=\"email\"]"), test("selector", "required", "input[required]"), test("contains", "help text", "invitation")]
      },
      {
        id: "html-07-error-message",
        title: P("Erreur de champ identifiable", "Identifiable field error"),
        brief: P("Ajoute un message d'erreur relié au champ email.", "Add an error message connected to the email field."),
        focus: T("l'erreur explicite d'un champ", "an explicit field error"),
        starter: htmlShell(`    <form><label for="email">Email</label><input id="email" type="email"></form>`),
        solution: htmlShell(`    <form>\n      <label for="email">Email</label>\n      <p id="email-error" role="alert">Saisis une adresse email valide.</p>\n      <input id="email" name="email" type="email" aria-describedby="email-error" aria-invalid="true" />\n    </form>`),
        tests: [test("selector", "error id", "#email-error"), test("selector", "alert", "[role=\"alert\"]"), test("selector", "aria invalid", "input[aria-invalid=\"true\"]"), test("selector", "describedby", "input[aria-describedby=\"email-error\"]"), test("contains", "error text", "email valide")]
      },
      {
        id: "html-07-fieldset-legend",
        title: P("Fieldset et legend", "Fieldset and legend"),
        brief: P("Regroupe les choix de niveau avec un nom de groupe.", "Group level choices with a group name."),
        focus: T("le groupe de choix nommé", "the named choice group"),
        starter: htmlShell(`    <form></form>`),
        solution: htmlShell(`    <form>\n      <fieldset>\n        <legend>Niveau actuel en HTML</legend>\n        <label><input type="radio" name="level" value="new" /> Je débute</label>\n        <label><input type="radio" name="level" value="practice" /> Je pratique déjà</label>\n      </fieldset>\n    </form>`),
        tests: [test("selector", "fieldset", "fieldset"), test("selector", "legend", "fieldset > legend"), test("minSelector", "radio group", "fieldset input[type=\"radio\"][name=\"level\"]", 2), test("minSelector", "labels", "fieldset label", 2), test("contains", "legend text", "Niveau actuel")]
      },
      {
        id: "html-07-disabled-state",
        title: P("État désactivé expliqué", "Explained disabled state"),
        brief: P("Désactive un choix complet en expliquant pourquoi.", "Disable a complete choice while explaining why."),
        focus: T("un état indisponible compréhensible", "an understandable unavailable state"),
        starter: htmlShell(`    <form></form>`),
        solution: htmlShell(`    <form>\n      <fieldset disabled aria-describedby="waitlist-help">\n        <legend>Liste d'attente</legend>\n        <label><input type="checkbox" name="waitlist" /> Me prévenir d'une place</label>\n      </fieldset>\n      <p id="waitlist-help">La liste ouvrira après validation de la salle.</p>\n    </form>`),
        tests: [test("selector", "disabled fieldset", "fieldset[disabled]"), test("selector", "legend", "legend"), test("selector", "help", "#waitlist-help"), test("selector", "describedby", "fieldset[aria-describedby=\"waitlist-help\"]"), test("contains", "reason", "ouvrira")]
      },
      {
        id: "html-07-status-live",
        title: P("Statut aria-live poli", "Polite aria-live status"),
        brief: P("Prépare un statut qui pourra annoncer l'envoi du formulaire.", "Prepare a status that can announce form submission."),
        focus: T("le feedback non intrusif", "non-intrusive feedback"),
        starter: htmlShell(`    <form><button type="submit">Envoyer</button></form>`),
        solution: htmlShell(`    <form aria-describedby="form-status">\n      <button type="submit">Envoyer l'inscription</button>\n      <p id="form-status" role="status" aria-live="polite">Le formulaire n'est pas encore envoyé.</p>\n    </form>`),
        tests: [test("selector", "status", "[role=\"status\"]"), test("selector", "live polite", "[aria-live=\"polite\"]"), test("selector", "status id", "#form-status"), test("selector", "form described", "form[aria-describedby=\"form-status\"]"), test("contains", "status text", "pas encore envoyé")]
      },
      {
        id: "html-07-busy-alert",
        title: P("Busy et alert", "Busy and alert"),
        brief: P("Expose un état de chargement et une alerte critique.", "Expose a loading state and a critical alert."),
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
        brief: P("Écris un title qui décrit réellement la page PulsaConf.", "Write a title that really describes the PulsaConf page."),
        focus: T("le titre indexable", "the indexable title"),
        starter: htmlShell(`    <main><h1>PulsaConf</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`).replace("<title>PulsaConf 2026</title>", "<title>PulsaConf 2026 - Conférence web gratuite</title>"),
        tests: [test("selector", "title", "title"), test("contains", "pulsaconf", "PulsaConf 2026"), test("contains", "free conference", "Conférence web gratuite"), test("selector", "h1", "h1"), test("notContains", "not generic", "<title>Accueil</title>")]
      },
      {
        id: "html-08-meta-description",
        title: P("Meta description unique", "Unique meta description"),
        brief: P("Ajoute une description claire pour les résultats de recherche.", "Add a clear description for search results."),
        focus: T("le résumé de la page", "the page summary"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <meta name="description" content="PulsaConf 2026 réunit ateliers HTML, accessibilité et publication web pour débutants." />`),
        tests: [test("selector", "description", "meta[name=\"description\"]"), test("contains", "description text", "ateliers HTML"), test("contains", "beginner", "débutants"), test("selector", "title", "title"), test("selector", "h1", "h1")]
      },
      {
        id: "html-08-canonical",
        title: P("Canonical absolu", "Absolute canonical"),
        brief: P("Indique l'URL officielle de PulsaConf.", "Indicate the official PulsaConf URL."),
        focus: T("l'URL canonique", "the canonical URL"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <link rel="canonical" href="https://pulsateach.vercel.app/pulsaconf" />`),
        tests: [test("selector", "canonical", "link[rel=\"canonical\"]"), test("contains", "absolute", "https://pulsateach.vercel.app/pulsaconf"), test("notContains", "no relative canonical", "href=\"/pulsaconf\""), test("selector", "title", "title"), test("selector", "main", "main")]
      },
      {
        id: "html-08-open-graph",
        title: P("Open Graph complet", "Complete Open Graph"),
        brief: P("Prépare un aperçu social lisible de PulsaConf.", "Prepare a readable social preview for PulsaConf."),
        focus: T("les métadonnées de partage", "sharing metadata"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <meta property="og:title" content="PulsaConf 2026" />\n    <meta property="og:description" content="Ateliers web gratuits et accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/cardx-v2.png" />`),
        tests: [test("selector", "og title", "meta[property=\"og:title\"]"), test("selector", "og description", "meta[property=\"og:description\"]"), test("selector", "og image", "meta[property=\"og:image\"]"), test("contains", "image url", "https://pulsateach.vercel.app/assets/"), test("contains", "description", "Ateliers web")]
      },
      {
        id: "html-08-favicon-hreflang",
        title: P("Favicon et hreflang conceptuel", "Favicon and conceptual hreflang"),
        brief: P("Ajoute l'icône et prépare les variantes de langue.", "Add the icon and prepare language variants."),
        focus: T("les signaux de publication", "publishing signals"),
        starter: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`),
        solution: htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <link rel="icon" href="/assets/favicon.ico" />\n    <link rel="alternate" hreflang="fr" href="https://pulsateach.vercel.app/pulsaconf" />\n    <link rel="alternate" hreflang="en" href="https://pulsateach.vercel.app/en/pulsaconf" />`),
        tests: [test("selector", "favicon", "link[rel=\"icon\"]"), test("contains", "favicon path", "favicon.ico"), test("selector", "fr alternate", "link[hreflang=\"fr\"]"), test("selector", "en alternate", "link[hreflang=\"en\"]"), test("contains", "absolute alternate", "https://pulsateach.vercel.app")]
      },
      {
        id: "html-08-json-ld",
        title: P("JSON-LD simple", "Simple JSON-LD"),
        brief: P("Décris PulsaConf comme un événement structuré.", "Describe PulsaConf as structured event data."),
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
        brief: P("Pose la base complète du livrable PulsaConf.", "Set up the complete PulsaConf deliverable base."),
        focus: T("le document final", "the final document"),
        starter: `<!-- Construis le squelette final -->`,
        solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1></header>\n    <main id="main-content"></main>\n    <footer>© PulsaTeach</footer>`),
        tests: [test("doctype", "doctype", "<!doctype html>"), test("selector", "lang", "html[lang=\"fr\"]"), test("selector", "skip", "a[href=\"#main-content\"]"), test("selector", "main", "main#main-content"), test("selector", "footer", "footer")]
      },
      {
        id: "html-09-assemble-navigation",
        title: P("Assembler la navigation", "Assemble navigation"),
        brief: P("Relie les grandes zones de la page finale.", "Connect the major areas of the final page."),
        focus: T("la navigation finale", "final navigation"),
        starter: htmlShell(`    <header><h1>PulsaConf 2026</h1></header>\n    <main id="main-content"></main>`),
        solution: htmlShell(`    <header>\n      <h1>PulsaConf 2026</h1>\n      <nav aria-label="Navigation principale">\n        <a href="#program" aria-current="page">Programme</a>\n        <a href="#speakers">Intervenants</a>\n        <a href="#register">Inscription</a>\n      </nav>\n    </header>\n    <main id="main-content"></main>`),
        tests: [test("selector", "nav", "nav[aria-label]"), test("minSelector", "links", "nav a", 3), test("selector", "current", "a[aria-current=\"page\"]"), test("selector", "program link", "a[href=\"#program\"]"), test("selector", "register link", "a[href=\"#register\"]")]
      },
      {
        id: "html-09-assemble-content",
        title: P("Assembler programme et intervenants", "Assemble program and speakers"),
        brief: P("Ajoute les sections principales avec titres et cartes autonomes.", "Add main sections with headings and standalone cards."),
        focus: T("le contenu central", "central content"),
        starter: htmlShell(`    <main id="main-content"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>HTML accessible</h3><p>Atelier pratique.</p></article></section>\n      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><article><h3>Maya</h3><p>Développeuse front-end.</p></article></section>\n    </main>`),
        tests: [test("selector", "program", "#program[aria-labelledby]"), test("selector", "speakers", "#speakers[aria-labelledby]"), test("minSelector", "articles", "article", 2), test("minSelector", "h2", "h2", 2), test("selector", "article h3", "article h3")]
      },
      {
        id: "html-09-assemble-form-media",
        title: P("Assembler formulaire et médias", "Assemble form and media"),
        brief: P("Ajoute les zones interactives et médias accessibles.", "Add accessible interactive and media areas."),
        focus: T("les interactions finales", "final interactions"),
        starter: htmlShell(`    <main id="main-content"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <figure><img src="/assets/venue.jpg" alt="Salle PulsaConf accessible" width="800" height="450" /><figcaption>Salle principale.</figcaption></figure>\n      <form action="/api/pulsaconf/register" method="post" aria-describedby="form-status">\n        <label for="email">Email</label><input id="email" name="email" type="email" required aria-describedby="email-help" />\n        <p id="email-help">Adresse utilisée pour l'invitation.</p>\n        <button type="submit">Demander mon invitation</button><p id="form-status" role="status" aria-live="polite">Prêt.</p>\n      </form>\n    </main>`),
        tests: [test("selector", "figure", "figure figcaption"), test("selector", "img alt", "img[alt]"), test("selector", "form", "form[action][method]"), test("selector", "label", "label[for=\"email\"]"), test("selector", "status", "[role=\"status\"][aria-live=\"polite\"]")]
      },
      {
        id: "html-09-audit-antipatterns",
        title: P("Audit anti-pattern", "Anti-pattern audit"),
        brief: P("Supprime les pièges qui rendent le HTML fragile.", "Remove traps that make HTML fragile."),
        focus: T("la relecture qualité", "quality review"),
        starter: htmlShell(`    <main><a href="#">clique ici</a><input placeholder="Email"></main>`),
        solution: htmlShell(`    <main id="main-content">\n      <a href="#register">Aller au formulaire d'inscription</a>\n      <label for="email">Email</label>\n      <input id="email" name="email" type="email" autocomplete="email" />\n    </main>`),
        tests: [test("notContains", "no click here", "clique ici"), test("notContains", "no empty anchor", "href=\"#\""), test("selector", "real target", "a[href=\"#register\"]"), test("selector", "label", "label[for=\"email\"]"), test("selector", "input id", "input#email")]
      },
      {
        id: "html-09-final-exam",
        title: P("Examen final HTML", "Final HTML exam"),
        brief: P("Vérifie les décisions de production avant le projet final.", "Check production decisions before the final project."),
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
  "html-00-project-local-setup": htmlShell(`    <main id="setup-checklist">\n      <h1>Préparer PulsaConf</h1>\n      <section aria-labelledby="install-title">\n        <h2 id="install-title">Installation</h2>\n        <ul>\n          <li>Navigateur moderne installé.</li>\n          <li>Visual Studio Code installé.</li>\n          <li>Dossier PulsaConf créé avec index.html.</li>\n        </ul>\n      </section>\n      <section aria-labelledby="workflow-title">\n        <h2 id="workflow-title">Méthode</h2>\n        <ol aria-label="Boucle de travail">\n          <li>Modifier index.html.</li>\n          <li>Sauvegarder.</li>\n          <li>Recharger le navigateur.</li>\n          <li>Inspecter le DOM avec les DevTools.</li>\n          <li>Relire les tests comme des exigences.</li>\n        </ol>\n      </section>\n    </main>`),
  "html-01-project-skeleton": htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <p>Une journée gratuite pour apprendre HTML, accessibilité et publication web.</p>\n    </main>`, `    <meta name="description" content="PulsaConf 2026, événement gratuit pour apprendre HTML." />`),
  "html-02-project-program": htmlShell(`    <main id="main-content">\n      <h1>PulsaConf 2026</h1>\n      <section id="program" aria-labelledby="program-title">\n        <h2 id="program-title">Programme</h2>\n        <article><h3>Atelier HTML accessible</h3><p>Construire une page publiable.</p></article>\n        <details><summary>Pré-requis</summary><p>Aucun prérequis technique.</p></details>\n      </section>\n    </main>`),
  "html-03-project-navigation": htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><nav aria-label="Navigation principale"><a href="#program" aria-current="page">Programme</a><a href="#register">Inscription</a><a href="https://pulsateach.vercel.app" target="_blank" rel="noopener noreferrer">PulsaTeach</a></nav></header>\n    <main id="main-content"><section id="program"><h2>Programme</h2></section><section id="register"><h2>Inscription</h2></section></main>`),
  "html-04-project-speakers-gallery": htmlShell(`    <main id="main-content">\n      <section id="speakers" aria-labelledby="speakers-title">\n        <h2 id="speakers-title">Intervenants</h2>\n        <figure><img src="/assets/maya.jpg" alt="Maya présente un atelier HTML" width="640" height="360" loading="lazy" /><figcaption>Maya, mentor HTML.</figcaption></figure>\n        <video controls width="720" height="405"><source src="/assets/pulsaconf.mp4" type="video/mp4" /><track kind="captions" src="/assets/captions.vtt" srclang="fr" label="Français" default /></video>\n      </section>\n    </main>`),
  "html-05-project-schedule": htmlShell(`    <main id="main-content">\n      <section id="schedule" aria-labelledby="schedule-title">\n        <h2 id="schedule-title">Planning</h2>\n        <ul><li>Accueil</li><li>Ateliers</li><li>Questions</li></ul>\n        <table><caption>Planning PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9h30</time></td><td><data value="120">120 places</data></td></tr></tbody></table>\n      </section>\n    </main>`),
  "html-06-project-registration-form": htmlShell(`    <main id="main-content">\n      <form action="/api/pulsaconf/register" method="post">\n        <label for="full-name">Nom complet</label><input id="full-name" name="fullName" type="text" autocomplete="name" required />\n        <label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required />\n        <label for="workshop">Atelier</label><select id="workshop" name="workshop" required><option value="html">HTML accessible</option></select>\n        <label for="needs">Besoins particuliers</label><textarea id="needs" name="needs"></textarea>\n        <button type="submit">Demander mon invitation</button>\n      </form>\n    </main>`),
  "html-07-project-robust-form": htmlShell(`    <main id="main-content">\n      <form action="/api/pulsaconf/register" method="post" aria-describedby="form-status">\n        <fieldset><legend>Profil participant</legend><label for="email">Email</label><p id="email-help">Adresse utilisée pour l'invitation.</p><input id="email" name="email" type="email" required aria-describedby="email-help" /></fieldset>\n        <p id="form-status" role="status" aria-live="polite">Prêt à envoyer.</p>\n        <p id="form-error" role="alert">Corrige les champs signalés avant l'envoi.</p>\n        <button type="submit">Envoyer l'inscription</button>\n      </form>\n    </main>`),
  "html-08-project-head": htmlShell(`    <main><h1>PulsaConf 2026</h1></main>`, `    <meta name="description" content="PulsaConf 2026, ateliers HTML gratuits et accessibles." />\n    <link rel="canonical" href="https://pulsateach.vercel.app/pulsaconf" />\n    <meta property="og:title" content="PulsaConf 2026" />\n    <meta property="og:description" content="Ateliers web gratuits et accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/cardx-v2.png" />\n    <link rel="icon" href="/assets/favicon.ico" />\n    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"PulsaConf 2026"}</script>`),
  "html-09-final-project-pulsaconf": htmlShell(`    <a href="#main-content">Aller au contenu principal</a>\n    <header><h1>PulsaConf 2026</h1><nav aria-label="Navigation principale"><a href="#program" aria-current="page">Programme</a><a href="#speakers">Intervenants</a><a href="#schedule">Planning</a><a href="#register">Inscription</a></nav></header>\n    <main id="main-content">\n      <section id="program" aria-labelledby="program-title"><h2 id="program-title">Programme</h2><article><h3>HTML accessible</h3><p>Atelier pratique.</p></article></section>\n      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><figure><img src="/assets/maya.jpg" alt="Maya anime PulsaConf" width="640" height="360" loading="lazy" /><figcaption>Maya, mentor accessibilité.</figcaption></figure></section>\n      <section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Planning</h2><table><caption>Planning PulsaConf</caption><thead><tr><th scope="col">Heure</th><th scope="col">Atelier</th></tr></thead><tbody><tr><td><time datetime="2026-09-18T09:30">9h30</time></td><td>HTML sémantique</td></tr></tbody></table></section>\n      <section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2><form action="/api/pulsaconf/register" method="post" aria-describedby="form-status"><fieldset><legend>Coordonnées</legend><label for="email">Email</label><p id="email-help">Adresse utilisée pour l'invitation.</p><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="email-help" /></fieldset><button type="submit">Demander mon invitation</button><p id="form-status" role="status" aria-live="polite">Prêt à envoyer.</p><p role="alert">Corrige les champs signalés si nécessaire.</p></form></section>\n    </main>\n    <footer><address>Contact : equipe@pulsateach.dev</address></footer>`, `    <meta name="description" content="PulsaConf 2026, ateliers HTML gratuits et accessibles." />\n    <link rel="canonical" href="https://pulsateach.vercel.app/pulsaconf" />\n    <meta property="og:title" content="PulsaConf 2026" />\n    <meta property="og:description" content="Ateliers web gratuits et accessibles." />\n    <meta property="og:image" content="https://pulsateach.vercel.app/assets/cardx-v2.png" />`)
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
  const solution = projectSolutions[id];
  const final = id.includes("final-project");
  const tests = final ? [
    test("doctype", "doctype", "<!doctype html>"), test("selector", "lang", "html[lang=\"fr\"]"), test("selector", "charset", "meta[charset=\"UTF-8\"]"), test("selector", "viewport", "meta[name=\"viewport\"]"), test("selector", "description", "meta[name=\"description\"]"), test("selector", "canonical", "link[rel=\"canonical\"]"), test("selector", "og title", "meta[property=\"og:title\"]"), test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "nav", "nav[aria-label]"), test("selector", "main", "main#main-content"), test("exactSelector", "one h1", "h1", 1), test("minSelector", "sections", "main section[aria-labelledby]", 4), test("selector", "figure", "figure figcaption"), test("selector", "image alt", "img[alt]"), test("selector", "table", "table caption"), test("selector", "scope", "th[scope=\"col\"]"), test("selector", "form", "form[action][method]"), test("selector", "fieldset", "fieldset legend"), test("selector", "help", "input[aria-describedby]"), test("selector", "status", "[role=\"status\"][aria-live=\"polite\"]"), test("selector", "footer", "footer address"), test("notContains", "no click here", "clique ici")
  ] : [
    test("selector", "doctype-ready html", "html[lang=\"fr\"]"), test("selector", "main", "main"), test("selector", "heading", "h1, h2"), test("minSelector", "module structures", "main *", 4), test("notContains", "no click here", "clique ici"), test("notContains", "no placeholder-only", "placeholder=\"Email\""), test("selector", "meaningful element", "section, article, form, table, figure"), test("contains", "PulsaConf", "PulsaConf")
  ];
  return {
    id,
    title: names[id],
    brief: P("Assemble les compétences du module dans une version cohérente de PulsaConf.", "Assemble the module skills into a coherent PulsaConf version."),
    focus: T("un livrable de module", "a module deliverable"),
    starter: htmlShell(`    <!-- Assemble la version demandée de PulsaConf ici -->`),
    solution,
    tests,
    vocabulary,
    xp: final ? 160 : 90
  };
}

function quizDef(id, title, vocabulary, focus) {
  const profile = quizProfiles[id] || quizProfiles["html-09-final-exam"];
  return {
    id,
    title,
    brief: P(`Diagnostique un vrai extrait PulsaConf : ${profile.issue[0]}`, `Diagnose a real PulsaConf snippet: ${profile.issue[1]}`),
    focus,
    vocabulary,
    questions: [
      { type: "code-reading", prompt: P(`Lis cet extrait : ${profile.snippet}. Quel diagnostic est prioritaire ?`, `Read this snippet: ${profile.snippet}. What is the priority diagnosis?`), choices: [["issue", profile.issue[0], profile.issue[1]], ["ok", "Le code est prêt pour production", "The code is production-ready"], ["css", "Le seul problème concerne la couleur", "The only issue is color"]], answer: "issue", explanation: profile.issue },
      { type: "single", prompt: P("Quelle correction traite le problème sans bricolage visuel ?", "Which correction addresses the issue without a visual workaround?"), choices: [profile.best, profile.wrong, ["aria-all", "Ajouter des rôles ARIA partout sans changer le HTML", "Add ARIA roles everywhere without changing the HTML"], ["comment", "Ajouter un commentaire pour expliquer le défaut", "Add a comment explaining the defect"]], answer: profile.best[0], explanation: P(`${profile.best[1]} : c'est la correction qui rend l'intention vérifiable.`, `${profile.best[2]}: this is the correction that makes intent verifiable.`) },
      { type: "multiple", prompt: P("Quelles preuves doivent accompagner la correction ?", "Which evidence should accompany the correction?"), choices: [["structure", "Un élément ou attribut vérifiable dans le DOM", "A verifiable element or attribute in the DOM"], ["impact", "Une explication de l'impact utilisateur", "An explanation of the user impact"], ["screenshot", "Une capture d'écran comme seule preuve", "A screenshot as the only proof"]], answer: ["structure", "impact"], explanation: P("Une preuve robuste combine structure observable et raison utilisateur.", "Robust evidence combines observable structure and user reason.") },
      { type: "true-false", prompt: P(`Vrai ou faux : « ${profile.wrong[1]} » est une correction acceptable pour PulsaConf.`, `True or false: “${profile.wrong[2]}” is an acceptable correction for PulsaConf.`), choices: [["true", "Vrai", "True"], ["false", "Faux", "False"]], answer: "false", explanation: P("Cette option masque ou déplace le problème au lieu de le résoudre dans le HTML.", "This option hides or moves the issue instead of fixing it in HTML.") },
      { type: "ordering", prompt: P("Classe la méthode de diagnostic la plus fiable.", "Order the most reliable diagnostic method."), choices: [["read", "Lire le snippet et nommer le défaut", "Read the snippet and name the defect"], ["choose", `Choisir : ${profile.best[1]}`, `Choose: ${profile.best[2]}`], ["prove", "Associer la correction à un test ou une relation DOM", "Connect the correction to a test or DOM relationship"], ["explain", "Expliquer l'impact pour l'apprenant ou l'utilisateur", "Explain the learner or user impact"]], answer: ["read", "choose", "prove", "explain"], explanation: P("Cette méthode évite de répondre par mémorisation ou apparence.", "This method avoids answering by memory or appearance.") },
      { type: "short-open", prompt: P("Quelle preuve observable citerais-tu en revue de code ?", "What observable evidence would you cite in code review?"), choices: [], answer: ["test", "attribut", "élément"], explanation: profile.proof }
    ]
  };
}

export const htmlPulsaConfModules = modules.map((mod, moduleIndex) => {
  let previous = null;
  let stepNumber = moduleIndex * 8 + 1;
  const lessons = mod.lessons.map((def) => {
    const item = def.id === "html-09-final-exam"
      ? makeQuiz(quizDef("html-09-final-exam", def.title, mod.vocabulary, def.focus), stepNumber++, previous)
      : makeLesson({ ...def, vocabulary: mod.vocabulary }, stepNumber++, previous);
    previous = item.id;
    return item;
  });
  if (mod.quiz) {
    const quiz = makeQuiz(quizDef(mod.quiz, P(`Quiz : ${mod.title[0]}`, `Quiz: ${mod.title[1]}`), mod.vocabulary, T("les décisions du module", "the module decisions")), stepNumber++, previous);
    previous = quiz.id;
    lessons.push(quiz);
  }
  const project = makeProject(projectDef(mod.project, mod.vocabulary), stepNumber++, previous);
  lessons.push(project);
  return module(mod.id, mod.title[0], mod.title[1], lessons);
});
