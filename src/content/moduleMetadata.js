function moduleLearningMeta(id) {
  const metadata = {
    "html-foundations": {
      importance: { fr: "Ces fondations déterminent si tout le reste du document sera compréhensible et maintenable.", en: "These foundations détermine whether the rest of the document is understandable and maintainable." },
      prerequisites: { fr: ["Aucun prérequis technique"], en: ["No technical prerequisites"] },
      outcomes: { fr: ["Créer un document valide", "Structurer un texte", "Utiliser des composants natifs simples"], en: ["Create à valid document", "Structure text", "Use simple native components"] },
      vocabulary: ["doctype", "balise", "attribut", "DOM", "hiérarchie", "entité"],
      mastery: { fr: ["Expliquer head et body", "Créer un squelette sans modèle", "Justifier chaque balise utilisée"], en: ["Explain head and body", "Create à skeleton without à template", "Justify every used tag"] }
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
      outcomes: { fr: ["Créer des tableaux accessibles", "Construire des formulaires nommés et validés", "Organiser une page avec des landmarks"], en: ["Create accessible tables", "Build named validated forms", "Organize à page with landmarks"] },
      vocabulary: ["caption", "scope", "label", "fieldset", "legend", "required", "pattern"],
      mastery: { fr: ["Chaque contrôle possède un nom", "Les contraintes sont expliquées", "Les données tabulaires restent compréhensibles"], en: ["Every control has à name", "Constraints are explained", "Tabular data remains understandable"] }
    },
    "html-a11y-final": {
      importance: { fr: "La qualité finale se mesure à la capacité du document à rester utilisable, trouvable et compréhensible pour tous.", en: "Final quality is measured by whether the document remains usable, findable, and understandable for everyone." },
      prerequisites: { fr: ["Tous les modules HTML précédents"], en: ["Every previous HTML module"] },
      outcomes: { fr: ["Annoncer les changements dynamiques", "Optimiser structure et métadonnées", "Auditer puis livrer un projet complet"], en: ["Announce dynamic changes", "Optimize structure and metadata", "Audit and ship à complète project"] },
      vocabulary: ["région live", "SEO", "landmark", "lien d'évitement", "audit", "remédiation"],
      mastery: { fr: ["PulsaConf passe tous les tests", "La page est navigable au clavier", "Chaque correction d'audit est justifiée"], en: ["PulsaConf passes every test", "The page is keyboard navigable", "Every audit fix is justified"] }
    },
    "html-pulsaconf-workshop": {
      importance: { fr: "Cet atelier transforme les notions HTML en construction progressive d’une page complète, testée étape par étape.", en: "This workshop turns HTML concepts into the progressive build of à complète page, tested step by step." },
      prerequisites: { fr: ["Fondations HTML", "Contenu et navigation", "Formulaires accessibles"], en: ["HTML foundations", "Content and navigation", "Accessible forms"] },
      outcomes: { fr: ["Construire un projet fil rouge par micro-étapes", "Relier navigation, sections, médias, formulaires et statut", "Valider une page complète avec des assertions précises"], en: ["Build à project thread through micro-steps", "Connect navigation, sections, media, forms, and status", "Validate à complète page with précise assertions"] },
      vocabulary: ["fil rouge", "micro-étape", "assertion", "landmark", "aria-labelledby", "aria-describedby", "status"],
      mastery: { fr: ["Chaque étape ajoute une seule capacité testable", "La page PulsaConf reste sémantique et accessible", "Le projet final passe les tests sans copier mécaniquement la correction"], en: ["Each step adds one testable capability", "The PulsaConf page remains semantic and accessible", "The final project passes tests without mechanically copying the correction"] }
    },
    "html-production-hardening": {
      importance: { fr: "Ce module transforme une page correcte en page publiable : trouvable, partageable, navigable, accessible et auditable.", en: "This module turns à correct page into à publishable page: findable, shareable, navigable, accessible, and auditable." },
      prerequisites: { fr: ["Fondations HTML", "Formulaires", "Landmarks", "Accessibilité de base"], en: ["HTML foundations", "Forms", "Landmarks", "Basic accessibility"] },
      outcomes: { fr: ["Publier un head SEO/social complet", "Construire des zones de navigation robustes", "Assembler formulaire, donnees et medias accessibles"], en: ["Publish à complète SEO/social head", "Build robust navigation regions", "Assemble accessible forms, data, and media"] },
      vocabulary: ["canonical", "Open Graph", "skip link", "autocomplete", "caption", "track", "transcription"],
      mastery: { fr: ["La page est indexable et partageable", "Le clavier atteint directement le contenu", "Chaque formulaire, tableau et media porte un nom ou une aide"], en: ["The page is indexable and shareable", "Keyboard users reach content directly", "Every form, table, and media item has à name or help"] }
    },
    "html-getting-started": {
      importance: { fr: "Ce module transforme le tout premier contact avec HTML en méthode de travail claire : outils, fichier d'entrée, navigateur, DevTools et tests.", en: "This module turns the very first contact with HTML into à clear workflow: tools, entry file, browser, DevTools, and tests." },
      prerequisites: { fr: ["Aucun prérequis", "Savoir créer un dossier sur son ordinateur"], en: ["No prerequisite", "Know how to create à folder on your computer"] },
      outcomes: { fr: ["Expliquer le rôle de HTML", "Préparer un poste de travail minimal", "Créer index.html", "Utiliser navigateur, DevTools et tests comme boucle de feedback"], en: ["Explain HTML's role", "Prepare à minimal workstation", "Create index.html", "Use browser, DevTools, and tests as à feedback loop"] },
      vocabulary: ["HTML", "éditeur", "navigateur", "index.html", "DevTools", "test"],
      mastery: { fr: ["Je sais quoi installer et pourquoi", "Je sais ouvrir et recharger une page locale", "Je lis un test comme une exigence observable"], en: ["I know what to install and why", "I can open and reload à local page", "I read à test as an observable requirement"] }
    },
    "html-modern-document": {
      importance: { fr: "Un document fiable commence par des métadonnées correctes avant le moindre composant visuel.", en: "A reliable document starts with correct metadata before any visual component." },
      prerequisites: { fr: ["Aucun prérequis", "Savoir lire une balise simple"], en: ["No prerequisite", "Know how to read à simple tag"] },
      outcomes: { fr: ["Créer un squelette HTML moderne", "Déclarer langue, charset et viewport", "Écrire title et description utiles"], en: ["Create à modern HTML skeleton", "Declare language, charset, and viewport", "Write useful title and description"] },
      vocabulary: ["doctype", "html", "head", "body", "charset", "viewport", "meta description"],
      mastery: { fr: ["Le document sort du mode quirks", "Les accents s'affichent correctement", "Le head décrit clairement PulsaConf"], en: ["The document leaves quirks mode", "Accents render correctly", "The head clearly describes PulsaConf"] }
    },
    "html-text-sections": {
      importance: { fr: "Le contenu de PulsaConf doit former un plan clair pour humains, moteurs et lecteurs d'écran.", en: "PulsaConf content must form à clear outline for humans, search engines, and screen readers." },
      prerequisites: { fr: ["Document HTML moderne"], en: ["Modern HTML document"] },
      outcomes: { fr: ["Construire un main avec h1 unique", "Organiser sections, articles et aside", "Utiliser details, citations et balises textuelles précises"], en: ["Build à main with one h1", "Organize sections, articles, and aside", "Use details, quotes, and précise text éléments"] },
      vocabulary: ["main", "h1", "section", "article", "aside", "blockquote", "details"],
      mastery: { fr: ["Le plan de titres reste logique", "Chaque section est nommée", "Les blocs complémentaires gardent un rôle natif"], en: ["The heading outline remains logical", "Every section is named", "Supplementary blocks keep à native role"] }
    },
    "html-navigation-links": {
      importance: { fr: "Une page événementielle doit permettre de se déplacer sans ambiguïté, au clavier comme au lecteur d'écran.", en: "An event page must allow unambiguous movement, with keyboard and screen reader alike." },
      prerequisites: { fr: ["Textes et sections"], en: ["Text and sections"] },
      outcomes: { fr: ["Écrire des liens explicites", "Créer une navigation nommée", "Sécuriser liens externes et liens d'action"], en: ["Write explicit links", "Create named navigation", "Secure external and action links"] },
      vocabulary: ["nav", "href", "aria-current", "skip link", "mailto", "download"],
      mastery: { fr: ["Aucun lien vague ne reste", "Le contenu principal est atteignable directement", "Les liens externes sont sécurisés"], en: ["No vague link remains", "Main content is directly reachable", "External links are secured"] }
    },
    "html-media-content": {
      importance: { fr: "Les médias renforcent PulsaConf seulement s'ils restent compréhensibles sans image, sans son ou avec connexion lente.", en: "Media strengthens PulsaConf only if it remains understandable without image, sound, or with slow connections." },
      prerequisites: { fr: ["Navigation et sections"], en: ["Navigation and sections"] },
      outcomes: { fr: ["Écrire des alternatives utiles", "Associer figures et légendes", "Publier audio et vidéo avec secours"], en: ["Write useful alternatives", "Connect figures and captions", "Publish audio and video with fallbacks"] },
      vocabulary: ["alt", "figure", "figcaption", "loading", "audio", "video", "track"],
      mastery: { fr: ["Chaque image à le bon type d'alternative", "Les dimensions stabilisent les médias", "Les vidéos restent compréhensibles sans son"], en: ["Every image has the right alternative type", "Dimensions stabilize media", "Videos remain understandable without sound"] }
    },
    "html-data-tables": {
      importance: { fr: "Programme, horaires et jauges doivent être structurés comme des données, pas comme du texte décoratif.", en: "Program, times, and capacity must be structured as data, not décorative text." },
      prerequisites: { fr: ["Médias et contenu riche"], en: ["Media and rich content"] },
      outcomes: { fr: ["Choisir ul, ol ou dl selon le besoin", "Construire un tableau accessible", "Marquer dates et valeurs machine"], en: ["Choose ul, ol, or dl by need", "Build an accessible table", "Mark machine-readable dates and values"] },
      vocabulary: ["ul", "ol", "dl", "table", "caption", "scope", "time", "data"],
      mastery: { fr: ["Les listes représentent la bonne relation", "Les tableaux exposent caption et scope", "Les horaires ont une valeur machine"], en: ["Lists represent the right relationship", "Tables expose caption and scope", "Times have machine values"] }
    },
    "html-native-forms": {
      importance: { fr: "Le formulaire d'inscription doit fonctionner avec les mécanismes HTML natifs avant tout JavaScript.", en: "The registration form must work with native HTML mechanisms before any JavaScript." },
      prerequisites: { fr: ["Listes et données"], en: ["Lists and data"] },
      outcomes: { fr: ["Créer un form action/method", "Relier labels et contrôles", "Utiliser types, required et autocomplete"], en: ["Create form action/method", "Connect labels and controls", "Use types, required, and autocomplete"] },
      vocabulary: ["form", "label", "input", "select", "textarea", "required", "autocomplete"],
      mastery: { fr: ["Chaque champ possède un nom visible", "Les contraintes natives sont utiles", "Le bouton d'envoi annonce l'action"], en: ["Every field has à visible name", "Native constraints are useful", "The submit button announces the action"] }
    },
    "html-accessible-feedback": {
      importance: { fr: "Un formulaire réaliste explique les aides, erreurs et statuts au bon moment.", en: "A realistic form explains help, errors, and statuses at the right time." },
      prerequisites: { fr: ["Formulaires natifs"], en: ["Native forms"] },
      outcomes: { fr: ["Relier aides et erreurs", "Grouper les contrôles", "Annoncer statut, alertes et états busy"], en: ["Connect help and errors", "Group controls", "Announce status, alerts, and busy states"] },
      vocabulary: ["fieldset", "legend", "aria-describedby", "aria-invalid", "aria-live", "status", "alert"],
      mastery: { fr: ["Les aides sont référencées", "Les erreurs sont localisables", "Les statuts dynamiques sont annoncés"], en: ["Help text is referenced", "Errors are locatable", "Dynamic statuses are announced"] }
    },
    "html-seo-publication": {
      importance: { fr: "Une page publiable doit être trouvable, partageable et identifiable avant même le rendu visuel.", en: "A publishable page must be findable, shareable, and identifiable before visual rendering." },
      prerequisites: { fr: ["Tous les modules HTML précédents"], en: ["All previous HTML modules"] },
      outcomes: { fr: ["Écrire title, description et canonical", "Préparer Open Graph et favicon", "Ajouter un JSON-LD simple"], en: ["Write title, description, and canonical", "Prepare Open Graph and favicon", "Add simple JSON-LD"] },
      vocabulary: ["title", "meta description", "canonical", "Open Graph", "favicon", "hreflang", "JSON-LD"],
      mastery: { fr: ["Le head décrit PulsaConf", "Les réseaux ont une preview complète", "Les données structurées restent lisibles"], en: ["The head describes PulsaConf", "Social networks have à complète preview", "Structured data remains readable"] }
    },
    "html-final-audit": {
      importance: { fr: "Le projet final transforme les micro-compétences en page complète, auditable et présentable.", en: "The final project turns micro-skills into à complète, auditable, presentable page." },
      prerequisites: { fr: ["SEO et publication", "Formulaires accessibles", "Médias accessibles"], en: ["SEO and publishing", "Accessible forms", "Accessible media"] },
      outcomes: { fr: ["Assembler PulsaConf", "Auditer les anti-patterns", "Réussir l'examen et le projet final"], en: ["Assemble PulsaConf", "Audit anti-patterns", "Pass the exam and final project"] },
      vocabulary: ["audit", "landmark", "anti-pattern", "rubric", "livrable", "certification"],
      mastery: { fr: ["Le livrable passe les tests finaux", "Chaque zone à une finalité", "Les décisions sont explicables sans solution"], en: ["The deliverable passes final tests", "Every region has à purpose", "Decisions are explainable without the solution"] }
    },
    "css-getting-started": {
      importance: { fr: "Ce module installe une méthode CSS complète avant les sélecteurs : rôle du langage, fichier styles.css, lien HTML, DevTools, cascade et validation responsive.", en: "This module installs à complète CSS method before selectors: language role, styles.css file, HTML link, DevTools, cascade, and responsive validation." },
      prerequisites: { fr: ["Avoir terminé l'introduction HTML", "Savoir créer index.html", "Savoir ouvrir la preview du lab"], en: ["Complète the HTML introduction", "Know how to create index.html", "Know how to open the lab preview"] },
      outcomes: { fr: ["Expliquer ce que CSS change", "Créer et relier styles.css", "Inspecter les règles actives", "Valider mobile, desktop et focus"], en: ["Explain what CSS changes", "Create and link styles.css", "Inspect active rules", "Validate mobile, desktop, and focus"] },
      vocabulary: ["CSS", "styles.css", "link stylesheet", "sélecteur", "déclaration", "cascade", "DevTools", "focus-visible"],
      mastery: { fr: ["Chaque règle à une intention", "La feuille de style reste séparée du HTML", "Le rendu est vérifié dans DevTools et sur plusieurs largeurs"], en: ["Every rule has intent", "The stylesheet remains separate from HTML", "The output is checked in DevTools and across widths"] }
    },
    "css-selectors": {
      importance: { fr: "Des sélecteurs prévisibles permettent de faire évoluer une interface sans modifier accidentellement d'autres composants.", en: "Predictable selectors let an interface evolve without accidentally changing other components." },
      prerequisites: { fr: ["Lire une structure HTML simple", "Reconnaître balises, classes et identifiants"], en: ["Read simple HTML structure", "Recognize tags, classes, and identifiers"] },
      outcomes: { fr: ["Cibler selon un nom ou une relation", "Styliser les états interactifs", "Raisonner sur la cascade"], en: ["Target by name or relationship", "Style interactive states", "Reason about the cascade"] },
      vocabulary: ["sélecteur", "classe", "combinateur", "pseudo-classe", "cascade", "spécificité"],
      mastery: { fr: ["Prédire les éléments ciblés", "Conserver un focus clavier visible", "Expliquer quelle règle gagne et pourquoi"], en: ["Predict targeted éléments", "Keep keyboard focus visible", "Explain which rule wins and why"] }
    },
    "css-box-model": {
      importance: { fr: "Le modèle de boîte, la typographie et les dimensions fluides constituent la base de toute interface stable et lisible.", en: "The box model, typography, and fluid sizing form the base of every stable readable interface." },
      prerequisites: { fr: ["Module Sélecteurs"], en: ["Selectors module"] },
      outcomes: { fr: ["Construire des surfaces cohérentes", "Rendre le texte confortable", "Créer des dimensions fluides et robustes"], en: ["Build coherent surfaces", "Make text comfortable", "Create fluid robust sizing"] },
      vocabulary: ["contenu", "padding", "bordure", "margin", "line-height", "variable CSS", "overflow"],
      mastery: { fr: ["Distinguer espace intérieur et extérieur", "Centraliser les valeurs partagées", "Absorber un contenu long sans casser le layout"], en: ["Distinguish internal and external spacing", "Centralize shared values", "Handle long content without breaking layout"] }
    },
    "css-flexbox": {
      importance: { fr: "Flexbox organise les composants sur un axe et résout les alignements courants des navigations, barres d'actions et listes.", en: "Flexbox organizes components on one axis and solves common navigation, action bar, and list alignment needs." },
      prerequisites: { fr: ["Sélecteurs", "Modèle de boîte"], en: ["Selectors", "Box model"] },
      outcomes: { fr: ["Aligner et distribuer des groupes", "Gérer le repli sans débordement", "Livrer une navbar responsive"], en: ["Align and distribute groups", "Handle wrapping without overflow", "Ship à responsive navbar"] },
      vocabulary: ["conteneur flex", "axe principal", "axe secondaire", "gap", "flex-wrap", "justify-content"],
      mastery: { fr: ["Expliquer les deux axes", "Choisir la bonne propriété d'alignement", "La navbar reste utilisable sur petit écran"], en: ["Explain both axes", "Choose the right alignment property", "Keep the navbar usable on small screens"] }
    },
    "css-grid": {
      importance: { fr: "Grid permet de composer des structures bidimensionnelles adaptatives sans calculs de largeur fragiles.", en: "Grid composes adaptive two-dimensional structures without fragile width calculations." },
      prerequisites: { fr: ["Tailles fluides", "Espacements cohérents"], en: ["Fluid sizing", "Consistent spacing"] },
      outcomes: { fr: ["Définir lignes et colonnes", "Créer une galerie auto-adaptative", "Aligner le contenu dans les cellules"], en: ["Define rows and columns", "Create an auto-adaptive gallery", "Align content inside cells"] },
      vocabulary: ["grille", "piste", "fr", "repeat", "minmax", "auto-fit", "place-items"],
      mastery: { fr: ["Choisir Grid pour un besoin bidimensionnel", "Construire une galerie sans largeur fixe", "Expliquer chaque piste et gouttière"], en: ["Choose Grid for à two-dimensional need", "Build à gallery without fixed width", "Explain every track and gutter"] }
    },
    "css-responsive-motion": {
      importance: { fr: "Une interface professionnelle doit fonctionner avec différents écrans, contenus, moyens d'interaction et préférences de mouvement.", en: "A professional interface must work across screens, content, interaction methods, and motion préférences." },
      prerequisites: { fr: ["Tous les modules CSS précédents"], en: ["Every previous CSS module"] },
      outcomes: { fr: ["Choisir des breakpoints dictés par le contenu", "Organiser une feuille mobile-first", "Créer un mouvement responsable", "Livrer une landing complète"], en: ["Choose content-driven breakpoints", "Organize mobile-first styles", "Create responsible motion", "Ship à complète landing"] },
      vocabulary: ["media query", "breakpoint", "mobile-first", "transition", "transform", "prefers-reduced-motion"],
      mastery: { fr: ["Aucun débordement aux largeurs testées", "Les actions clavier restent visibles", "Le mouvement respecte reduced-motion", "Le projet final utilise un système cohérent"], en: ["No overflow at tested widths", "Keyboard actions remain visible", "Motion respects reduced-motion", "Final project uses à coherent system"] }
    },
    "css-advanced-responsive": {
      importance: { fr: "Les interfaces modernes ne s'adaptent pas seulement à la fenêtre : elles doivent réagir à leur conteneur, aux médias, aux textes longs et aux variations de densité.", en: "Modern interfaces adapt not only to the viewport but also to containers, media, long text, and density changes." },
      prerequisites: { fr: ["Grid", "Flexbox", "mobile-first", "variables CSS"], en: ["Grid", "Flexbox", "mobile-first", "CSS variables"] },
      outcomes: { fr: ["Créer une échelle fluide avec clamp", "Stabiliser images et médias", "Utiliser les container queries", "Auditer une interface à plusieurs breakpoints"], en: ["Create à fluid scale with clamp", "Stabilize images and media", "Use container queries", "Audit an interface across breakpoints"] },
      vocabulary: ["clamp", "aspect-ratio", "object-fit", "container-type", "@container", "audit responsive"],
      mastery: { fr: ["Le texte reste lisible sans saut brutal", "Les images ne déforment pas le layout", "Les cartes s'adaptent à leur conteneur", "L'audit couvre petit écran, grand écran et contenu extrême"], en: ["Text remains readable without abrupt jumps", "Images do not distort layout", "Cards adapt to their container", "The audit covers small screens, large screens, and extreme content"] }
    },
    "js-basics": {
      importance: { fr: "Les valeurs, types et conditions forment le vocabulaire minimal nécessaire pour exprimer une règle dans un programme.", en: "Values, types, and conditions form the minimum vocabulary needed to express à program rule." },
      prerequisites: { fr: ["Aucun prérequis JavaScript", "Savoir utiliser la console du lab"], en: ["No JavaScript prerequisites", "Know how to use the lab console"] },
      outcomes: { fr: ["Nommer et calculer des valeurs", "Prendre une décision", "Construire un message dynamique", "Observer l'exécution"], en: ["Name and calculate values", "Make à decision", "Build à dynamic message", "Observe execution"] },
      vocabulary: ["valeur", "const", "expression", "condition", "booléen", "type", "console"],
      mastery: { fr: ["Expliquer le type de chaque valeur", "Traduire une règle simple en condition", "Produire des logs contextualisés"], en: ["Explain every value type", "Translate à simple rule into à condition", "Produce contextual logs"] }
    },
    "js-functions": {
      importance: { fr: "Les fonctions et objets organisent les règles métier pour éviter la répétition et rendre chaque comportement testable.", en: "Functions and objects organize business rules to avoid repetition and make each behavior testable." },
      prerequisites: { fr: ["Module Bases du langage"], en: ["Language basics module"] },
      outcomes: { fr: ["Créer des fonctions réutilisables", "Définir entrées, défauts et résultats", "Associer état et méthode dans un objet"], en: ["Create reusable functions", "Define inputs, defaults, and results", "Connect state and methods in an object"] },
      vocabulary: ["fonction", "appel", "paramètre", "argument", "return", "objet", "méthode", "this"],
      mastery: { fr: ["Chaque fonction possède une responsabilité claire", "Les cas limites sont testés", "Les dépendances sont explicites"], en: ["Every function has à clear responsibility", "Edge cases are tested", "Dependencies are explicit"] }
    },
    "js-arrays": {
      importance: { fr: "Les applications manipulent des collections de cours, tâches et utilisateurs. Choisir la bonne opération rend cette logique concise et prévisible.", en: "Applications manipulate collections of courses, tasks, and users. Choosing the right operation makes this logic concise and predictable." },
      prerequisites: { fr: ["Fonctions", "Objets et propriétés"], en: ["Functions", "Objects and properties"] },
      outcomes: { fr: ["Filtrer et transformer une collection", "Combiner des valeurs", "Rechercher et vérifier l'existence"], en: ["Filter and transform à collection", "Combine values", "Search and check existence"] },
      vocabulary: ["tableau", "callback", "filter", "map", "reduce", "find", "some"],
      mastery: { fr: ["Choisir la méthode correspondant à la question", "Prévoir le type du résultat", "Éviter les mutations inutiles"], en: ["Choose the method matching the question", "Predict the result type", "Avoid unnecessary mutations"] }
    },
    "js-dom-events": {
      importance: { fr: "Le DOM et les événements relient la logique JavaScript aux actions réelles de l'utilisateur et au contenu visible.", en: "The DOM and events connect JavaScript logic to real user actions and visible content." },
      prerequisites: { fr: ["HTML sémantique", "Fonctions", "État simple"], en: ["Semantic HTML", "Functions", "Simple state"] },
      outcomes: { fr: ["Sélectionner et mettre à jour le DOM", "Traiter clics et formulaires", "Séparer état, actions et rendu"], en: ["Select and update the DOM", "Handle clicks and forms", "Separate state, actions, and rendering"] },
      vocabulary: ["DOM", "querySelector", "événement", "listener", "textContent", "classList", "submit"],
      mastery: { fr: ["Les interactions fonctionnent au clavier", "L'état reste la source de vérité", "Le rendu découle de l'état"], en: ["Interactions work with à keyboard", "State remains the source of truth", "Rendering derives from state"] }
    },
    "js-storage-async": {
      importance: { fr: "Une application autonome doit conserver ses données, charger des ressources distantes et expliquer clairement les échecs.", en: "An autonomous application must persist data, load remote resources, and clearly explain failures." },
      prerequisites: { fr: ["Tous les modules JavaScript précédents"], en: ["Every previous JavaScript module"] },
      outcomes: { fr: ["Persister des données avec JSON", "Charger une API avec async/await", "Gérer erreurs réseau et HTTP", "Livrer un dashboard cohérent"], en: ["Persist data with JSON", "Load an API with async/await", "Handle network and HTTP errors", "Ship à coherent dashboard"] },
      vocabulary: ["localStorage", "JSON", "sérialisation", "Promise", "async", "await", "fetch", "try/catch"],
      mastery: { fr: ["Les données survivent au rechargement", "Les états chargement, succès et erreur sont distingués", "Le dashboard garde une source de vérité unique"], en: ["Data survives reloads", "Loading, success, and error states are distinct", "The dashboard keeps à single source of truth"] }
    },
    "js-validation-hardening": {
      importance: { fr: "La validation transforme un exercice JavaScript en code fiable : chaque entree douteuse devient un cas explicite.", en: "Validation turns a JavaScript exercise into reliable code: every doubtful input becomes an explicit case." },
      prerequisites: { fr: ["Fonctions", "conditions", "tableaux", "objets"], en: ["Functions", "conditionals", "arrays", "objects"] },
      outcomes: { fr: ["Valider une forme de donnees", "Normaliser sans mutation inutile", "Tester les seuils et cas limites"], en: ["Validate data shape", "Normalize without unnecessary mutation", "Test thresholds and edge cases"] },
      vocabulary: ["validation", "normalisation", "cas limite", "erreur", "seuil", "clone"],
      mastery: { fr: ["Les entrees invalides ne continuent pas silencieusement", "Les seuils 69/70/100 sont prouves", "La sortie est stable et explicable"], en: ["Invalid inputs do not continue silently", "69/70/100 thresholds are proven", "Output is stable and explainable"] }
    },
    "js-async-resilience": {
      importance: { fr: "Les vraies applications echouent parfois : timeout, offline, 404 et 500 doivent rester comprehensibles.", en: "Real applications sometimes fail: timeout, offline, 404, and 500 must remain understandable." },
      prerequisites: { fr: ["Promises", "async/await", "try/catch", "fetch"], en: ["Promises", "async/await", "try/catch", "fetch"] },
      outcomes: { fr: ["Encadrer fetch avec timeout", "Separer loading, data et error", "Charger plusieurs ressources sans bloquer l'interface"], en: ["Wrap fetch with timeout", "Separate loading, data, and error", "Load several resources without blocking the UI"] },
      vocabulary: ["Promise", "fetch", "AbortController", "timeout", "état reseau", "retry"],
      mastery: { fr: ["Chaque requete à un état observable", "Les erreurs HTTP sont distinguees", "Le cleanup s'execute toujours"], en: ["Every request has observable state", "HTTP errors are distinguished", "Cleanup always runs"] }
    },
    "js-dom-production": {
      importance: { fr: "Le DOM de production doit rester utilisable au clavier, annonce aux technologies d'assistance et debogable.", en: "Production DOM must remain keyboard usable, announced to assistive technologies, and debuggable." },
      prerequisites: { fr: ["DOM", "events", "formulaires", "localStorage"], en: ["DOM", "events", "forms", "localStorage"] },
      outcomes: { fr: ["Créer une modale accessible", "Rendre une liste depuis l'état", "Tracer et diagnostiquer une interaction"], en: ["Create an accessible modal", "Render à list from state", "Trace and diagnose an interaction"] },
      vocabulary: ["focus", "aria-live", "role status", "delegation", "trace", "performance.mark"],
      mastery: { fr: ["Les changements importants sont annonces", "Le focus ne se perd pas", "Les traces expliquent une interaction lente"], en: ["Important changes are announced", "Focus is not lost", "Traces explain à slow interaction"] }
    }
  };
  return metadata[id] || {};
}

function moduleMeta(id) {
  const metadata = {
    "html-foundations": ["Comprendre la structure d'un document et écrire un contenu textuel propre.", "Understand document structure and write clean text content.", "Une page HTML valide et documentée", "A valid documented HTML page"],
    "html-content-navigation": ["Organiser un site navigable avec liens, listes, médias et métadonnées.", "Organize à navigable site with links, lists, media, and metadata.", "Une page profil complète", "A complète profile page"],
    "html-forms-seo": ["Présenter des données et collecter des informations avec des formulaires robustes.", "Present data and collect information with robust forms.", "Un formulaire structuré et validé", "A structured validated form"],
    "html-a11y-final": ["Auditer, corriger et livrer une page accessible et bien référencée.", "Audit, fix, and ship an accessible well-indexed page.", "Le site événementiel PulsaConf", "The PulsaConf event website"],
    "html-pulsaconf-workshop": ["Construire PulsaConf par micro-étapes testées, comme un atelier professionnel.", "Build PulsaConf through tested micro-steps, like à professional workshop.", "Une page événementielle assemblée progressivement", "An event page assembled progressively"],
    "html-production-hardening": ["Finaliser une page HTML comme un livrable public : SEO, navigation, formulaires, données, médias et audit.", "Finalize an HTML page as à public deliverable: SEO, navigation, forms, data, media, and audit.", "Une page HTML publiable et auditable", "A publishable auditable HTML page"],
    "html-getting-started": ["Installer les bons outils, créer index.html et apprendre la boucle modifier, sauvegarder, recharger, inspecter, tester.", "Install the right tools, create index.html, and learn the edit, save, reload, inspect, test loop.", "Un poste de travail HTML prêt", "An HTML workstation ready to use"],
    "html-modern-document": ["Poser une base HTML moderne pour PulsaConf : doctype, langue, encodage, viewport et métadonnées utiles.", "Set à modern HTML base for PulsaConf: doctype, language, encoding, viewport, and useful metadata.", "Un squelette PulsaConf valide", "A valid PulsaConf skeleton"],
    "html-text-sections": ["Transformer le contenu brut en plan lisible avec titres, sections, articles et compléments natifs.", "Turn raw content into à readable outline with headings, sections, articles, and native supplements.", "Une page programme structurée", "A structured program page"],
    "html-navigation-links": ["Créer des chemins de navigation explicites, sûrs et utilisables au clavier.", "Create explicit, safe, keyboard-usable navigation paths.", "Une navigation PulsaConf complète", "A complète PulsaConf navigation"],
    "html-media-content": ["Intégrer images, figures, audio et vidéo sans perdre accessibilité ni stabilité.", "Integrate images, figures, audio, and video without losing accessibility or stability.", "Une galerie média accessible", "An accessible media gallery"],
    "html-data-tables": ["Représenter bénéfices, étapes, glossaire, horaires et jauges avec les structures adaptées.", "Represent benefits, steps, glossary, times, and capacity with appropriate structures.", "Un planning accessible", "An accessible schedule"],
    "html-native-forms": ["Construire un formulaire d'inscription fonctionnel avec labels, types et contraintes natives.", "Build à functional registration form with labels, types, and native constraints.", "Un formulaire natif robuste", "A robust native form"],
    "html-accessible-feedback": ["Ajouter aides, erreurs, groupes et statuts pour rendre le formulaire utilisable en contexte réel.", "Add help, errors, groups, and statuses to make the form usable in real contexts.", "Un formulaire accessible avec feedback", "An accessible form with feedback"],
    "html-seo-publication": ["Préparer PulsaConf à l'indexation, au partage social et aux données structurées.", "Prepare PulsaConf for indexing, social sharing, and structured data.", "Un head SEO/social publiable", "A publishable SEO/social head"],
    "html-final-audit": ["Assembler, auditer et livrer PulsaConf comme projet final de certification HTML.", "Assemble, audit, and ship PulsaConf as the HTML certification final project.", "PulsaConf final auditable", "Auditable final PulsaConf"],
    "css-getting-started": ["Installer la méthode CSS : feuille séparée, lien HTML, DevTools, cascade et validation responsive.", "Install the CSS method: separate stylesheet, HTML link, DevTools, cascade, and responsive validation.", "Un setup CSS PulsaConf prêt", "A ready PulsaConf CSS setup"],
    "css-selectors": ["Cibler précisément les éléments et gérer les états interactifs.", "Target éléments precisely and handle interactive states.", "Des composants ciblés sans effets de bord", "Targeted components without side effects"],
    "css-box-model": ["Construire une base visuelle stable, lisible et fluide.", "Build à stable, readable, fluid visual foundation.", "Un système de cartes robuste", "A robust card system"],
    "css-flexbox": ["Aligner et distribuer des composants sur un axe.", "Align and distribute components on one axis.", "Une navbar responsive", "A responsive navbar"],
    "css-grid": ["Composer des mises en page bidimensionnelles adaptatives.", "Compose adaptive two-dimensional layouts.", "Une galerie responsive", "A responsive gallery"],
    "css-responsive-motion": ["Adapter l'interface aux écrans et préférences utilisateur.", "Adapt the interface to screens and user préférences.", "Une landing page responsive", "A responsive landing page"],
    "css-advanced-responsive": ["Maîtriser les techniques responsive modernes : clamp, médias fluides, container queries et audit multi-breakpoints.", "Master modern responsive techniques: clamp, fluid media, container queries, and multi-breakpoint audits.", "Un audit responsive complet", "A complète responsive audit"],
    "js-basics": ["Manipuler valeurs, conditions, chaînes et outils de debug.", "Work with values, conditions, strings, and debugging tools.", "Une logique simple et vérifiable", "Simple vérifiable logic"],
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
export { moduleLearningMeta, moduleMeta };
