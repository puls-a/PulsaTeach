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
      ["default-props", "Prévoir des valeurs par défaut sûres", "Utilise des valeurs par défaut pour les variantes non critiques.", "LevelPill", "level = 'Débutant'", "data-level"],
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
      ["status", "Annoncer la réussite", "Affiche un message de confirmation non intrusif.", "SubmitStatus", "role=\"status\"", "Merci"]
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
      ["empty-state", "Traiter le résultat vide", "Différencie vide réel et chargement en cours.", "SearchResults", "items.length", "Aucun résultat"],
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

export const reactModules = blueprints.map((module) => ({
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

function lesson(module, [slug, title, brief, component, first, second], index) {
  const id = `${module.id}-${slug}`;
  return {
    id,
    type: "react",
    title: [title, title.replace("É", "E")],
    brief: [brief, `Practice: ${brief}`],
    solution: `export function ${component}() {\n  const items = [{ id: "${slug}", label: "${title}" }];\n  return (\n    <section aria-label="${title}">\n      <h2>${title}</h2>\n      <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>\n    </section>\n  );\n}`,
    requirements: [component, first, second, "key={item.id}", "<section", "aria-label", "<h2>", "<ul>", "items.map"],
    skills: [module.quiz[2], `react-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 28 + (index % 3) * 4,
    xp: 36
  };
}

function project([id, title, brief, component, requirements, finalProject = false], module) {
  const proofRequirements = [...new Set([...requirements, component, "<main>", "<h1>", "<section", "aria-label"])];
  return {
    id,
    project: true,
    exerciseType: "react",
    title: [title, title.replace("Mini-projet", "Mini-project").replace("Projet final", "Final project")],
    brief: [brief, `Build and review: ${brief}`],
    solution: `export function ${component}() {\n  return (\n    <main>\n      <h1>${title}</h1>\n      <section aria-label="Preuves"><p>Parcours clavier, états, données et tests documentés.</p></section>\n    </main>\n  );\n}`,
    requirements: proofRequirements,
    skills: [module.quiz[2], "react-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    durationMin: finalProject ? 240 : 130,
    xp: finalProject ? 180 : 100
  };
}

function quiz([id, title, skill]) {
  return {
    id,
    type: "quiz",
    title: [title, title.replace("Quiz :", "Quiz:")],
    brief: ["Réponds comme en revue de code : priorité au contrat utilisateur, à la preuve et à la maintenabilité.", "Answer like in code review: prioritize user contract, evidence, and maintainability."],
    purpose: "module-review",
    passingScore: 75,
    questions: [
      q(`${id}-1`, "Quelle décision protège le mieux l'utilisateur ?", "Un comportement vérifiable avec nom, rôle et état explicites", ["Un style ajouté sans test", "Une variable globale partagée", "Un rendu copié dans trois composants"], skill),
      q(`${id}-2`, "Quand faut-il extraire une abstraction ?", "Quand deux usages partagent une intention stable, pas seulement du code ressemblant", ["Dès qu'une ligne se répète", "Avant d'avoir un second usage", "Pour cacher une erreur de conception"], skill),
      q(`${id}-3`, "Quelle preuve est la plus solide avant livraison ?", "Un test utilisateur complété par une vérification clavier et console", ["Une capture d'écran seule", "Un nom de fonction agréable", "Un commentaire TODO"], skill),
      q(`${id}-4`, "Quel signal indique une sur-ingénierie ?", "La solution ajoute plus d'états et de chemins que le besoin réel", ["Le composant a un titre", "Le code utilise une balise sémantique", "Le test lit un rôle accessible"], skill),
      q(`${id}-5`, "Que doit contenir une correction durable ?", "La cause, le changement, la preuve et la limite connue", ["Seulement le code final", "Seulement une explication orale", "Seulement une optimisation memo"], skill)
    ]
  };
}

function q(id, promptFr, answerFr, distractorsFr, skill) {
  const choices = [answerFr, ...distractorsFr].map((label) => ({ id: label, label: [label, label] }));
  return {
    id,
    type: "single",
    prompt: [promptFr, promptFr],
    choices,
    answer: answerFr,
    explanation: ["La bonne réponse relie intention, accessibilité, preuve et maintenance.", "The correct answer connects intent, accessibility, evidence, and maintenance."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}
