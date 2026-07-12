const t = {
  component: ["composant", "component", "Brique d'interface isolée par responsabilité.", "A UI unit isolated by responsibility."],
  jsx: ["JSX", "JSX", "Syntaxe qui décrit l'interface comme un arbre déclaratif.", "Syntax describing the UI as a declarative tree."],
  prop: ["prop", "prop", "Donnée transmise à un composant pour configurer son rendu.", "Data passed to a component to configure its rendering."],
  state: ["état", "state", "Donnée locale qui change avec l'usage.", "Local data that changes with usage."],
  effect: ["effet", "effect", "Synchronisation avec un système extérieur au rendu.", "Synchronization with a system outside rendering."],
  hook: ["hook", "hook", "Fonction qui compose une capacité React réutilisable.", "Function composing a reusable React capability."],
  form: ["formulaire contrôlé", "controlled form", "Formulaire dont les valeurs et erreurs sont pilotées par React.", "A form whose values and errors are driven by React."],
  async: ["état asynchrone", "async state", "Modèle explicite pour chargement, succès, vide et erreur.", "Explicit model for loading, success, empty, and error."],
  route: ["route", "route", "Lien entre une URL, un écran et son état initial.", "A link between a URL, a screen, and its initial state."],
  test: ["test utilisateur", "user test", "Test qui vérifie un comportement observable.", "A test verifying observable behavior."],
  perf: ["budget de rendu", "render budget", "Limite mesurable pour garder l'interface fluide.", "A measurable limit keeping the UI responsive."],
  store: ["store", "store", "État partagé structuré par actions, sélecteurs et règles d'écriture.", "Shared state structured by actions, selectors, and write rules."]
};

const blueprints = [
  {
    id: "react-jsx-components",
    title: ["JSX moderne et composants lisibles", "Modern JSX and readable components"],
    description: ["Construire des composants courts, nommés, sémantiques et faciles à relire.", "Build short, named, semantic components that are easy to review."],
    vocabulary: [t.component, t.jsx, t.prop],
    lessons: [
      ["element-jsx", "Décrire une carte en JSX", "Écris une carte de formation avec titre, résumé et lien accessible.", "CourseCard", "article", "aria-label"],
      ["fragment", "Retourner plusieurs zones sans div inutile", "Regroupe en-tête et contenu avec un fragment pour garder un DOM propre.", "LessonLayout", "Fragment", "main"],
      ["class-name", "Nommer les styles sans perdre le sens", "Ajoute des classes explicites tout en conservant les balises sémantiques.", "StatusBadge", "className", "data-tone"],
      ["self-closing", "Utiliser les balises autofermantes", "Crée un composant Icon avec titre optionnel et fallback textuel.", "Icon", "aria-hidden", "title"],
      ["comments", "Documenter une décision JSX", "Ajoute un commentaire court pour une branche métier non évidente.", "PricingHint", "/*", "condition"],
      ["semantic-contract", "Rendre la sémantique vérifiable", "Expose des landmarks et titres que les tests pourront retrouver.", "PageShell", "header", "h1"]
    ],
    project: ["react-component-library", "Mini-projet : bibliothèque UI propre", "Crée Header, CourseCard, Badge et EmptyState avec contrats de props et sémantique stable.", "DesignSystemPreview", ["Header", "CourseCard", "EmptyState", "aria-label"]],
    quiz: ["react-components-quiz", "Quiz : JSX et composants", "component-contracts"]
  },
  {
    id: "react-props-composition",
    title: ["Props, children et composition", "Props, children, and composition"],
    description: ["Remplacer les composants géants par des contrats explicites et des slots lisibles.", "Replace giant components with explicit contracts and readable slots."],
    vocabulary: [t.prop, t.component, ["children", "children", "Contenu passé entre deux balises de composant.", "Content passed between a component's tags."]],
    lessons: [
      ["props-minimal", "Concevoir un contrat de props minimal", "Ne garde que les données utiles au rendu et évite les options ambiguës.", "TrackCard", "title", "href"],
      ["default-props", "Prévoir des valeurs par défaut sûres", "Utilise des valeurs par défaut pour les variantes non critiques.", "LevelPill", "level = 'beginner'", "data-level"],
      ["array-props", "Recevoir une liste typée", "Affiche des objectifs en conservant une clé stable.", "OutcomeList", "map", "key"],
      ["children-slot", "Composer avec children", "Crée un panneau réutilisable sans imposer son contenu.", "Panel", "children", "section"],
      ["compound", "Créer des sous-composants cohérents", "Découpe une carte riche en Header, Body et Actions.", "RichCard", "RichCardHeader", "RichCardActions"],
      ["callback-prop", "Remonter une intention utilisateur", "Passe un callback nommé par intention plutôt qu'un détail technique.", "FavoriteButton", "onFavorite", "button"]
    ],
    project: ["react-composition-project", "Mini-projet : dashboard de cartes", "Assemble un dashboard avec filtres visuels, cartes composées et actions clavier.", "LearningDashboard", ["children", "onFavorite", "key", "aria-label"]],
    quiz: ["react-props-quiz", "Quiz : props et composition", "composition"]
  },
  {
    id: "react-state-events",
    title: ["État, événements et rendu conditionnel", "State, events, and conditional rendering"],
    description: ["Modéliser un état minimal puis afficher chaque situation sans duplication fragile.", "Model minimal state and render every situation without fragile duplication."],
    vocabulary: [t.state, ["événement", "event", "Signal produit par une interaction ou le navigateur.", "Signal produced by an interaction or the browser."], ["état dérivé", "derived state", "Valeur recalculée depuis une source de vérité.", "Value recalculated from a source of truth."]],
    lessons: [
      ["minimal-state", "Garder une seule source de vérité", "Stocke la liste brute et dérive les compteurs visibles.", "TaskBoard", "useState", "filter"],
      ["functional-update", "Mettre à jour sans mutation", "Ajoute une tâche avec une mise à jour fonctionnelle.", "AddTask", "setTasks((current)", "concat"],
      ["toggle", "Basculer un détail", "Ouvre et ferme une aide sans perdre le focus du bouton.", "HelpToggle", "aria-expanded", "setOpen"],
      ["counter", "Construire un compteur robuste", "Bloque les valeurs négatives et annonce le résultat.", "PracticeCounter", "Math.max", "role=\"status\""],
      ["conditional", "Choisir la bonne branche d'affichage", "Affiche vide, succès ou action suivante selon les données.", "NextStep", "if", "return"],
      ["list-keys", "Stabiliser les listes", "Utilise une clé métier et non l'index visible.", "LessonList", "lesson.id", "key="]
    ],
    project: ["react-state-project", "Mini-projet : planificateur d'étude", "Crée une liste de tâches d'apprentissage avec ajout, toggle, filtre et état vide.", "StudyPlanner", ["useState", "setTasks", "aria-expanded", "role=\"status\""]],
    quiz: ["react-state-quiz", "Quiz : état et événements", "react-state"]
  },
  {
    id: "react-forms-a11y",
    title: ["Formulaires accessibles", "Accessible forms"],
    description: ["Construire des formulaires qui guident, valident et restent utilisables au clavier.", "Build forms that guide, validate, and remain keyboard usable."],
    vocabulary: [t.form, ["validation", "validation", "Vérification explicite avant acceptation d'une donnée.", "Explicit check before accepting data."], ["message d'erreur", "error message", "Aide reliée au champ concerné.", "Help connected to the relevant field."]],
    lessons: [
      ["controlled-input", "Piloter un champ contrôlé", "Relie value, onChange, label et id sans placeholder trompeur.", "NameField", "value={name}", "htmlFor"],
      ["field-error", "Relier une erreur au champ", "Utilise aria-describedby et aria-invalid quand la donnée est refusée.", "EmailField", "aria-invalid", "aria-describedby"],
      ["submit", "Valider au submit", "Empêche l'envoi vide et affiche une correction actionnable.", "SignupForm", "preventDefault", "setErrors"],
      ["fieldset", "Regrouper des choix", "Utilise fieldset et legend pour un groupe radio.", "LevelChoice", "fieldset", "legend"],
      ["focus-error", "Replacer le focus après erreur", "Envoie le focus vers le premier champ invalide.", "CourseRequest", "ref", "focus"],
      ["status", "Annoncer la réussite", "Affiche un message de confirmation non intrusif.", "SubmitStatus", "role=\"status\"", "Thank you"]
    ],
    project: ["react-form-project", "Mini-projet : inscription à une cohorte", "Crée un formulaire complet avec labels, erreurs reliées, focus et confirmation.", "CohortForm", ["form", "aria-describedby", "fieldset", "role=\"status\""]],
    quiz: ["react-forms-quiz", "Quiz : formulaires React", "accessible-forms"]
  },
  {
    id: "react-effects-hooks",
    title: ["Effets, références et hooks personnalisés", "Effects, refs, and custom hooks"],
    description: ["Utiliser les effets uniquement pour synchroniser puis extraire des capacités réutilisables.", "Use effects only for synchronization, then extract reusable capabilities."],
    vocabulary: [t.effect, t.hook, ["ref", "ref", "Référence stable vers un nœud ou une valeur mutable.", "Stable reference to a node or mutable value."]],
    lessons: [
      ["document-title", "Synchroniser le titre de page", "Modifie document.title et restaure la valeur précédente.", "PageTitle", "useEffect", "document.title"],
      ["timer-cleanup", "Nettoyer un timer", "Démarre un intervalle et l'arrête au démontage.", "Countdown", "setInterval", "clearInterval"],
      ["outside-click", "Gérer un clic extérieur", "Ajoute puis retire un écouteur global correctement.", "Popover", "addEventListener", "removeEventListener"],
      ["use-previous", "Créer usePrevious", "Conserve la valeur précédente sans relancer de rendu inutile.", "usePrevious", "useRef", "current"],
      ["local-storage", "Créer usePersistentState", "Initialise depuis localStorage puis sérialise à chaque changement.", "usePersistentState", "localStorage", "JSON.stringify"],
      ["effect-deps", "Lire les dépendances", "Explique pourquoi chaque dépendance est présente.", "SearchSync", "[query, page]", "fetchResults"]
    ],
    project: ["react-hooks-project", "Mini-projet : préférences persistantes", "Crée un panneau de préférences avec thème, langue, stockage local et cleanup.", "PreferencesPanel", ["useEffect", "useRef", "localStorage", "return () =>"]],
    quiz: ["react-effects-quiz", "Quiz : effets et hooks", "react-effects"]
  },
  {
    id: "react-async-routing",
    title: ["Données asynchrones et routing", "Asynchronous data and routing"],
    description: ["Charger des données sans course, rendre les statuts et connecter les URLs aux écrans.", "Load data without races, render statuses, and connect URLs to screens."],
    vocabulary: [t.async, t.route, ["AbortController", "AbortController", "API d'annulation d'une opération compatible.", "API for canceling a compatible operation."]],
    lessons: [
      ["loading-error", "Modéliser loading/success/error", "Affiche un statut clair pour chaque état réseau.", "ResourceState", "status", "role=\"alert\""],
      ["abort-fetch", "Annuler une requête obsolète", "Utilise AbortController au changement de paramètre.", "ProjectLoader", "AbortController", "controller.abort"],
      ["empty-state", "Traiter le résultat vide", "Différencie vide réel et chargement en cours.", "SearchResults", "items.length", "No results"],
      ["retry", "Prévoir une action de retry", "Expose un bouton de nouvelle tentative sans recharger la page.", "RetryPanel", "onRetry", "button"],
      ["route-param", "Lire un paramètre d'URL", "Charge un détail depuis un identifiant de route.", "ProjectRoute", "useParams", "projectId"],
      ["route-focus", "Rendre la navigation perceptible", "Déplace le focus vers le h1 après changement d'écran.", "RouteHeading", "tabIndex={-1}", "focus"]
    ],
    project: ["react-routing-project", "Mini-projet : explorateur de formations", "Crée un catalogue avec recherche, détail routé, états réseau et focus de navigation.", "TrackExplorer", ["useParams", "AbortController", "role=\"status\"", "tabIndex={-1}"]],
    quiz: ["react-routing-quiz", "Quiz : données et routing", "react-routing"]
  },
  {
    id: "react-state-management",
    title: ["Gestion d'état partagée", "Shared state management"],
    description: ["Choisir entre état local, contexte, reducer ou store sans sur-ingénierie.", "Choose between local state, context, reducer, or store without over-engineering."],
    vocabulary: [t.store, ["reducer", "reducer", "Fonction pure qui calcule le prochain état depuis une action.", "Pure function computing next state from an action."], ["sélecteur", "selector", "Fonction qui lit une vue stable de l'état.", "Function reading a stable view of state."]],
    lessons: [
      ["local-first", "Commencer local", "Garde l'état près de l'usage tant qu'il n'est pas partagé.", "LocalFilters", "useState", "filters"],
      ["reducer-actions", "Nommer les actions", "Décris les intentions avec un type et une charge utile.", "tasksReducer", "switch", "action.type"],
      ["no-mutation", "Écrire sans mutation", "Retourne de nouveaux tableaux et objets au lieu de modifier l'existant.", "completeTask", "map", "{ ...task"],
      ["context-provider", "Distribuer par contexte", "Expose un provider pour préférence globale stable.", "PreferencesProvider", "createContext", "Provider"],
      ["selector", "Lire avec un sélecteur", "Isole une lecture dérivée pour limiter les dépendances.", "selectOpenTasks", "filter", "return"],
      ["external-store", "Savoir quand sortir de React", "Identifie les signaux qui justifient un store dédié.", "StateDecision", "shared", "server"]
    ],
    project: ["react-store-project", "Mini-projet : store de progression", "Crée un store reducer pour progression, favoris, objectifs et sélecteurs.", "ProgressStore", ["reducer", "dispatch", "createContext", "selectOpenTasks"]],
    quiz: ["react-store-quiz", "Quiz : état partagé", "state-management"]
  },
  {
    id: "react-quality-performance",
    title: ["Tests, performance et livraison", "Testing, performance, and delivery"],
    description: ["Prouver les parcours importants, mesurer avant d'optimiser et livrer sans régression.", "Prove important journeys, measure before optimizing, and ship without regression."],
    vocabulary: [t.test, t.perf, ["Suspense", "Suspense", "Frontière de chargement pour code ou données.", "Loading boundary for code or data."]],
    lessons: [
      ["user-test", "Tester le comportement utilisateur", "Teste les rôles et actions plutôt que l'implémentation interne.", "CourseCardTest", "getByRole", "userEvent"],
      ["form-test", "Tester une erreur de formulaire", "Vérifie message, aria-invalid et correction.", "FormErrorTest", "aria-invalid", "toHaveTextContent"],
      ["mock-api", "Simuler une API", "Teste succès, erreur et retry sans dépendre du réseau réel.", "ApiMockTest", "server.use", "retry"],
      ["memo-measure", "Mesurer avant memo", "Ajoute memo seulement autour d'un rendu coûteux prouvé.", "SlowList", "memo", "Profiler"],
      ["lazy-route", "Découper par route", "Charge une page lourde avec lazy et fallback accessible.", "LazyRoutes", "lazy(", "Suspense"],
      ["release-check", "Préparer une checklist release", "Vérifie clavier, console, bundle, erreurs et métriques.", "ReleaseChecklist", "axe", "lighthouse"]
    ],
    project: ["react-final-capstone", "Projet final : app React de suivi d'apprentissage", "Livre une app avec catalogue, progression, formulaire, routing, cache, tests et budget performance.", "LearningTrackerApp", ["lazy(", "getByRole", "role=\"status\"", "memo", "createContext"], true],
    quiz: ["react-quality-quiz", "Quiz : qualité React", "react-quality"]
  }
];

export let reactModules;

function lesson(module, [slug, title, brief, component, first, second], index) {
  const english = reactLessonEnglish[slug];
  const id = `${module.id}-${slug}`;
  return {
    id,
    type: "react",
    title: [title, english?.title || title],
    brief: [brief, english?.brief || brief],
    solution: `export function ${component}() {\n  const items = [{ id: "${slug}", label: "${english?.title || component}" }];\n  return (\n    <section aria-label="${english?.title || component}">\n      <h2>${english?.title || component}</h2>\n      <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>\n    </section>\n  );\n}`,
    requirements: [component, first, second, "key={item.id}", "<section", "aria-label", "<h2>", "<ul>", "items.map"],
    skills: [module.quiz[2], `react-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 28 + (index % 3) * 4,
    xp: 36
  };
}

function project([id, title, brief, component, requirements, finalProject = false], module) {
  const english = reactProjectEnglish[id];
  const proofRequirements = [...new Set([...requirements, component, "<main>", "<h1>", "<section", "aria-label"])];
  return {
    id,
    project: true,
    exerciseType: "react",
    title: [title, english.title],
    brief: [brief, english.brief],
    solution: `export function ${component}() {\n  return (\n    <main>\n      <h1>${english.title}</h1>\n      <section aria-label="Evidence"><p>Document keyboard flow, states, data, and tests.</p></section>\n    </main>\n  );\n}`,
    requirements: proofRequirements,
    skills: [module.quiz[2], "react-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    durationMin: finalProject ? 240 : 130,
    xp: finalProject ? 180 : 100
  };
}

function quiz([id, title, skill]) {
  const scenarios = reactQuizScenarios[skill];
  return {
    id,
    type: "quiz",
    title: [title, `Quiz: ${scenarios.topic}`],
    brief: ["Réponds comme en revue de code : priorité au contrat utilisateur, à la preuve et à la maintenabilité.", "Answer like in code review: prioritize user contract, evidence, and maintainability."],
    purpose: "module-review",
    passingScore: 75,
    questions: [
      ...scenarios.questions.map((question, index) => q(`${id}-${index + 1}`, question, skill))
    ]
  };
}

function q(id, [promptFr, promptEn, answerFr, answerEn, ...distractors], skill) {
  const choices = [[answerFr, answerEn], ...distractors].map((label) => ({ id: label[0], label }));
  return {
    id,
    type: "single",
    prompt: [promptFr, promptEn],
    choices,
    answer: answerFr,
    explanation: ["La réponse conserve le contrat observable propre à ce module.", "The answer preserves this module's observable contract."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}

const reactLessonEnglish = {
  "element-jsx": { title: "Describe a course card with JSX", brief: "Build a course card with a heading, summary, and descriptive link." },
  fragment: { title: "Return sibling regions without a wrapper div", brief: "Group the header and content in a fragment while preserving clean landmarks." },
  "class-name": { title: "Name styles without losing meaning", brief: "Add explicit classes while retaining semantic elements and a readable variant." },
  "self-closing": { title: "Use self-closing elements", brief: "Create an icon with an optional title and a safe decorative fallback." },
  comments: { title: "Document a JSX decision", brief: "Explain one non-obvious pricing branch without narrating the syntax." },
  "semantic-contract": { title: "Make semantics testable", brief: "Expose landmarks and headings that assistive technology and tests can locate." },
  "props-minimal": { title: "Design a minimal prop contract", brief: "Keep only rendering inputs and remove ambiguous configuration flags." },
  "default-props": { title: "Choose safe defaults", brief: "Default a non-critical variant while keeping exceptional states explicit." },
  "array-props": { title: "Render a typed collection", brief: "Display outcomes with stable business keys." },
  "children-slot": { title: "Compose through children", brief: "Create a reusable panel that does not dictate its content." },
  compound: { title: "Build coherent compound components", brief: "Split a rich card into header, body, and action responsibilities." },
  "callback-prop": { title: "Lift a user intention", brief: "Name the callback after the user action rather than an implementation detail." },
  "minimal-state": { title: "Keep one source of truth", brief: "Store raw tasks and derive visible counters during rendering." },
  "functional-update": { title: "Update state without mutation", brief: "Append a task with a functional update that remains correct under batching." },
  toggle: { title: "Toggle disclosure state", brief: "Open and close help while preserving the trigger's focus and expanded state." },
  counter: { title: "Build a bounded counter", brief: "Prevent negative practice counts and announce the updated value." },
  conditional: { title: "Render the meaningful branch", brief: "Distinguish empty, completed, and next-action states without duplicated markup." },
  "list-keys": { title: "Preserve list identity", brief: "Use a domain identifier rather than the visible array position." },
  "controlled-input": { title: "Control an input", brief: "Connect value, change handling, label, and id without relying on a placeholder." },
  "field-error": { title: "Connect an error to its field", brief: "Expose invalid state and descriptive help when the value is rejected." },
  submit: { title: "Validate on submission", brief: "Block an empty submission and offer a correction the learner can act on." },
  fieldset: { title: "Group related choices", brief: "Give a radio group its programmatic name with fieldset and legend." },
  "focus-error": { title: "Focus the first invalid field", brief: "Move focus only after a failed submission so the correction starts in context." },
  status: { title: "Announce successful submission", brief: "Publish confirmation through a polite status without stealing focus." },
  "document-title": { title: "Synchronize the document title", brief: "Update the external document title and restore its previous value on cleanup." },
  "timer-cleanup": { title: "Clean up a timer", brief: "Start one interval and stop that exact interval when the component unmounts." },
  "outside-click": { title: "Manage an outside interaction", brief: "Register and remove a global listener with the same function reference." },
  "use-previous": { title: "Build usePrevious", brief: "Retain the previous committed value without triggering an extra render." },
  "local-storage": { title: "Build usePersistentState", brief: "Read storage lazily and serialize only when the key or value changes." },
  "effect-deps": { title: "Reason about effect dependencies", brief: "Justify each dependency from the external synchronization contract." },
  "loading-error": { title: "Model request states", brief: "Render distinct loading, success, empty, and failure outcomes." },
  "abort-fetch": { title: "Cancel a stale request", brief: "Abort the previous fetch when the route parameter changes." },
  "empty-state": { title: "Distinguish empty from pending", brief: "Show no-results content only after a successful empty response." },
  retry: { title: "Offer a retry action", brief: "Let the user repeat the failed request without reloading the page." },
  "route-param": { title: "Read a route parameter", brief: "Load a detail view from the URL's project identifier." },
  "route-focus": { title: "Make navigation perceptible", brief: "Focus the new page heading after a client-side route transition." },
  "local-first": { title: "Start with local state", brief: "Keep filters near their only consumer until sharing is demonstrated." },
  "reducer-actions": { title: "Name reducer actions by intent", brief: "Represent each transition with an explicit action and payload." },
  "no-mutation": { title: "Preserve reducer immutability", brief: "Return new objects only along the branch that changed." },
  "context-provider": { title: "Distribute a stable dependency", brief: "Expose a provider for preferences needed across one subtree." },
  selector: { title: "Derive state through a selector", brief: "Centralize a meaningful read without duplicating derived state." },
  "external-store": { title: "Recognize the boundary for an external store", brief: "Choose a store only when ownership, update rate, and consumers require it." },
  "user-test": { title: "Test observable behavior", brief: "Drive the interface through roles and user actions rather than component internals." },
  "form-test": { title: "Test a form correction", brief: "Verify the message, invalid relationship, and successful correction path." },
  "mock-api": { title: "Control API scenarios", brief: "Exercise success, failure, and retry with deterministic network handlers." },
  "memo-measure": { title: "Measure before memoizing", brief: "Add memo only after profiling identifies an expensive repeated render." },
  "lazy-route": { title: "Split code at a route boundary", brief: "Load a heavy page lazily behind an accessible pending state." },
  "release-check": { title: "Run a release review", brief: "Check keyboard flow, console errors, bundle cost, and field metrics before shipping." }
};

const reactProjectEnglish = {
  "react-component-library": { title: "Mini-project: semantic UI library", brief: "Deliver Header, CourseCard, Badge, and EmptyState with explicit props and stable semantics." },
  "react-composition-project": { title: "Mini-project: composed learning dashboard", brief: "Assemble filters, compound cards, keyboard actions, and a documented component API." },
  "react-state-project": { title: "Mini-project: study planner", brief: "Build task creation, toggling, filtering, and an announced empty state without duplicated state." },
  "react-form-project": { title: "Mini-project: cohort enrollment", brief: "Deliver labels, connected validation, error focus, grouped choices, and confirmation." },
  "react-hooks-project": { title: "Mini-project: persistent preferences", brief: "Synchronize theme and language with storage while proving initialization and cleanup." },
  "react-routing-project": { title: "Mini-project: course explorer", brief: "Combine search, routed details, canceled requests, retry, and navigation focus." },
  "react-store-project": { title: "Mini-project: progress store", brief: "Model progress and favorites with reducer actions, context ownership, and tested selectors." },
  "react-final-capstone": { title: "Final project: learning tracker", brief: "Ship catalog, progress, forms, routing, cache, user tests, and a measured performance budget." }
};

const sharedDistractors = [["Une convention visuelle sans comportement", "A visual convention with no behavior"], ["Un état global ajouté par défaut", "Global state added by default"], ["Une assertion sur un détail interne", "An assertion on an internal detail"]];
const reactQuizScenarios = Object.fromEntries([
  ["component-contracts", "JSX and components", "Quel contrat permet de retrouver une carte sans connaître ses classes ?", "Which contract locates a card without knowing its classes?", "Un article nommé par son titre", "An article named by its heading"],
  ["composition", "props and composition", "Comment éviter des combinaisons de props incohérentes ?", "How do you prevent inconsistent prop combinations?", "Composer des sous-composants aux rôles explicites", "Compose subcomponents with explicit roles"],
  ["react-state", "state transitions", "Quelle valeur doit rester dérivée de la liste de tâches ?", "Which value should remain derived from the task list?", "Le nombre de tâches visibles", "The visible task count"],
  ["accessible-forms", "accessible forms", "Que faire après un submit contenant deux champs invalides ?", "What should happen after submitting two invalid fields?", "Relier les erreurs puis focaliser le premier champ invalide", "Connect errors, then focus the first invalid field"],
  ["react-effects", "effects and cleanup", "Quand l'effet du timer doit-il retourner un cleanup ?", "When should the timer effect return cleanup?", "Dès qu'il démarre une ressource à arrêter", "Whenever it starts a resource that must be stopped"],
  ["react-routing", "data and routing", "Une recherche change avant la réponse réseau : quelle protection appliquer ?", "Search changes before the response arrives: what protection is needed?", "Annuler la requête précédente", "Abort the previous request"],
  ["state-management", "shared state", "Quand déplacer des filtres locaux vers un contexte ?", "When should local filters move into context?", "Quand plusieurs descendants ont démontré ce besoin", "When multiple descendants demonstrably need them"],
  ["react-quality", "quality and delivery", "Quel signal justifie memo autour d'une liste ?", "What signal justifies memo around a list?", "Un profilage montre des rendus coûteux avec props stables", "Profiling shows expensive renders with stable props"]
].map(([skill, topic, fr, en, answerFr, answerEn]) => [skill, { topic, questions: [
  [fr, en, answerFr, answerEn, ...sharedDistractors],
  [`Quelle preuve valide « ${answerFr} » ?`, `Which evidence validates “${answerEn}”?`, "Un test du comportement observable", "A test of observable behavior", ...sharedDistractors],
  [`Quel risque ${topic} ce module réduit-il en priorité ?`, `Which ${topic} risk does this module primarily reduce?`, `Un contrat ${topic} ambigu ou non vérifié`, `An ambiguous or unverified ${topic} contract`, ...sharedDistractors],
  [`Quelle revue demander avant d'intégrer ce travail ${topic} ?`, `Which review should happen before integrating this ${topic} work?`, "Expliquer le choix et reproduire sa preuve", "Explain the choice and reproduce its evidence", ...sharedDistractors],
  [`Quel contrat ${topic} conserver lors d'un refactoring ?`, `Which ${topic} contract must survive a refactor?`, "Le comportement perçu par l'utilisateur", "The behavior perceived by the user", ...sharedDistractors]
] }]));

reactModules = blueprints.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [
    ...module.lessons.map((item, index) => lesson(module, item, index)),
    project(module.project, module),
    quiz(module.quiz, module)
  ]
}));
