const t = {
  runtime: ["runtime Node", "Node runtime", "Environnement JavaScript serveur avec APIs système.", "Server JavaScript environment with system APIs."],
  package: ["package npm", "npm package", "Unité installable décrite par un package.json.", "Installable unit described by package.json."],
  module: ["module", "module", "Fichier qui expose un contrat et cache ses détails.", "File exposing a contract and hiding details."],
  request: ["requête HTTP", "HTTP request", "Message entrant avec méthode, chemin, headers et corps.", "Incoming message with method, path, headers, and body."],
  middleware: ["middleware", "middleware", "Fonction qui enrichit, refuse ou transmet une requête.", "Function enriching, rejecting, or forwarding a request."],
  schema: ["schéma de validation", "validation schema", "Contrat runtime pour données non fiables.", "Runtime contract for untrusted data."],
  service: ["service métier", "business service", "Couche qui porte les règles indépendantes d'Express.", "Layer holding rules independent from Express."],
  auth: ["contrôle d'accès", "access control", "Décision serveur sur l'identité et les permissions.", "Server decision about identity and permissions."],
  test: ["test API", "API test", "Requête automatisée qui vérifie statut, corps et isolation.", "Automated request verifying status, body, and isolation."],
  obs: ["observabilité", "observability", "Logs, métriques et traces sans secrets.", "Logs, metrics, and traces without secrets."]
};

const modules = [
  {
    id: "node-v9-runtime-npm",
    title: ["Node, npm et modules maintenables", "Node, npm, and maintainable modules"],
    description: ["Comprendre le runtime, isoler la configuration et créer des modules testables.", "Understand the runtime, isolate configuration, and create testable modules."],
    vocabulary: [t.runtime, t.package, t.module],
    lessons: [
      ["process-env", "Lire l'environnement sans fuite", "Charge PORT et DATABASE_URL sans jamais logger le secret.", "loadConfig", ["process.env", "DATABASE_URL", "throw new Error"]],
      ["package-scripts", "Écrire des scripts npm utiles", "Sépare dev, test, lint, build et start pour éviter les commandes floues.", "packageScripts", ["scripts", "test", "start"]],
      ["esm-module", "Créer une frontière ESM", "Expose une fonction publique et garde la normalisation privée.", "createInvoice", ["export function", "normalize", "return"]],
      ["core-fs", "Lire un fichier avec node:fs/promises", "Parse un JSON d'import en traitant erreurs et format attendu.", "readImportFile", ["node:fs/promises", "JSON.parse", "Array.isArray"]],
      ["crypto-id", "Générer un id serveur", "Utilise crypto.randomUUID au lieu de faire confiance au client.", "createServerId", ["crypto.randomUUID", "id"]],
      ["async-flow", "Paralléliser deux lectures", "Utilise Promise.all seulement pour des opérations indépendantes.", "buildSummary", ["Promise.all", "await", "catch"]]
    ],
    project: ["node-v9-importer-project", "Mini-projet : importeur de données", "Crée un importeur CLI qui lit, valide, classe accepté/rejeté et retourne un résumé.", "ProjectImporter", ["readFile", "JSON.parse", "accepted", "rejected"]],
    quiz: ["node-v9-runtime-quiz", "Quiz : runtime Node", "node-runtime"]
  },
  {
    id: "node-v9-http-express",
    title: ["Serveur HTTP et Express", "HTTP server and Express"],
    description: ["Construire des routes lisibles, des réponses cohérentes et un flux middleware simple.", "Build readable routes, coherent responses, and a simple middleware flow."],
    vocabulary: [t.request, t.middleware, t.schema],
    lessons: [
      ["create-app", "Exporter app sans listen", "Sépare création d'application et démarrage réseau.", "createApp", ["express()", "return app", "listen"]],
      ["health", "Créer une route health", "Retourne statut, version et uptime sans exposer l'environnement.", "healthRoute", ["app.get('/health'", "uptime", "status"]],
      ["json-limit", "Limiter le JSON entrant", "Configure une taille maximale pour réduire les abus.", "jsonLimit", ["express.json", "limit"]],
      ["route-params", "Valider un paramètre", "Refuse un projectId invalide avant le service.", "validateProjectId", ["request.params", "status(400)", "next"]],
      ["status-codes", "Choisir les codes HTTP", "Utilise 200, 201, 204, 400, 404 selon le contrat.", "projectRoutes", ["status(201)", "status(204)", "status(404)"]],
      ["async-handler", "Éviter les try/catch copiés", "Centralise la propagation des erreurs async.", "asyncHandler", ["Promise.resolve", "catch(next)"]]
    ],
    project: ["node-v9-express-project", "Mini-projet : API météo pédagogique", "Crée une API Express avec health, recherche, détail, erreurs et limites JSON.", "WeatherLearningApi", ["createApp", "app.get", "express.json", "asyncHandler"]],
    quiz: ["node-v9-http-quiz", "Quiz : Express et HTTP", "express-http"]
  },
  {
    id: "node-v9-validation-errors",
    title: ["Validation, erreurs et contrats", "Validation, errors, and contracts"],
    description: ["Transformer les entrées non fiables en valeurs validées et erreurs stables.", "Transform untrusted input into validated values and stable errors."],
    vocabulary: [t.schema, t.request, ["erreur stable", "stable error", "Code d'erreur documenté qui ne révèle pas l'interne.", "Documented error code that does not reveal internals."]],
    lessons: [
      ["body-schema", "Valider request.body", "Parse le body et remplace-le par la valeur nettoyée.", "validateBody", ["safeParse", "request.body", "VALIDATION_ERROR"]],
      ["query-schema", "Valider la query", "Transforme page et limit en nombres bornés.", "validateQuery", ["request.query", "Number", "max"]],
      ["domain-error", "Créer une erreur métier", "Distingue erreur attendue et bug serveur.", "DomainError", ["class DomainError", "code", "status"]],
      ["error-handler", "Centraliser errorHandler", "Mappe les erreurs connues et masque les stacks en réponse.", "errorHandler", ["status(500)", "requestId", "stack"]],
      ["not-found", "Ajouter notFound", "Réponds 404 avec contrat JSON commun.", "notFoundHandler", ["status(404)", "NOT_FOUND"]],
      ["problem-details", "Documenter le format erreur", "Rends code, message, issues et requestId prévisibles.", "errorContract", ["error", "issues", "requestId"]]
    ],
    project: ["node-v9-validation-project", "Mini-projet : validation complète", "Ajoute validation body/query/params et erreurs sûres à un CRUD projets.", "ValidationLayer", ["validateBody", "validateQuery", "DomainError", "errorHandler"]],
    quiz: ["node-v9-validation-quiz", "Quiz : validation serveur", "server-validation"]
  },
  {
    id: "node-v9-architecture-auth",
    title: ["Architecture, auth et isolation", "Architecture, auth, and isolation"],
    description: ["Séparer transport, métier et stockage puis prouver l'isolation utilisateur.", "Separate transport, business, and storage, then prove user isolation."],
    vocabulary: [t.service, t.auth, ["repository", "repository", "Contrat d'accès aux données indépendant du transport.", "Data access contract independent from transport."]],
    lessons: [
      ["layers", "Découper controller/service/repository", "Place HTTP, règles et persistance dans des couches distinctes.", "createProjectService", ["repository", "service", "controller"]],
      ["dependency", "Injecter les dépendances", "Passe repositories et logger au lieu d'importer partout.", "createServices", ["dependencies", "logger", "repositories"]],
      ["bearer", "Lire un Bearer token", "Refuse l'absence de token avec 401 stable.", "authenticate", ["Authorization", "Bearer", "status(401)"]],
      ["roles", "Vérifier un rôle", "Autorise admin sans ouvrir les ressources privées.", "requireRole", ["roles.includes", "status(403)"]],
      ["owner", "Vérifier le propriétaire", "Charge la ressource serveur avant de décider.", "requireOwner", ["ownerId", "request.auth.userId", "status(403)"]],
      ["cross-user", "Tester l'accès croisé", "Prouve qu'un utilisateur B ne lit pas les données A.", "crossUserTest", ["expect(403)", "user-a", "user-b"]]
    ],
    project: ["node-v9-auth-project", "Mini-projet : API multi-tenant", "Protège lecture, modification et suppression avec 401/403/404 et tests inter-utilisateurs.", "TenantSafeApi", ["authenticate", "requireOwner", "expect(401)", "expect(403)"]],
    quiz: ["node-v9-auth-quiz", "Quiz : auth et isolation", "api-auth"]
  },
  {
    id: "node-v9-data-testing",
    title: ["Données, tests API et contrats", "Data, API tests, and contracts"],
    description: ["Tester les routes comme un client réel et garder la persistance remplaçable.", "Test routes like a real client and keep persistence replaceable."],
    vocabulary: [t.test, t.service, ["fixture", "fixture", "Donnée de test contrôlée et reproductible.", "Controlled, reproducible test data."]],
    lessons: [
      ["repo-memory", "Créer un repository mémoire", "Utilise une Map pour tester sans base externe.", "createMemoryRepository", ["new Map", "insert", "findById"]],
      ["supertest", "Tester une route", "Vérifie statut et body avec une requête réelle.", "routeTest", ["request(app)", "expect(200)", "body"]],
      ["validation-test", "Tester 400", "Envoie un body invalide et vérifie le code stable.", "validationTest", ["send({})", "expect(400)", "VALIDATION_ERROR"]],
      ["auth-test", "Tester 401/403", "Couvre identité absente et permission refusée.", "authTest", ["expect(401)", "expect(403)"]],
      ["contract-test", "Vérifier le shape JSON", "Teste les champs publics sans dépendre de l'ordre interne.", "contractTest", ["toMatchObject", "projects"]],
      ["seed-cleanup", "Isoler les données de test", "Réinitialise fixtures et repository entre tests.", "testIsolation", ["beforeEach", "clear", "fixtures"]]
    ],
    project: ["node-v9-api-tests-project", "Mini-projet : suite de tests API", "Couvre health, CRUD, validation, auth, accès croisé et erreurs sûres.", "ApiTestSuite", ["request(app)", "expect(201)", "expect(400)", "expect(403)"]],
    quiz: ["node-v9-tests-quiz", "Quiz : tests API", "api-testing"]
  },
  {
    id: "node-v9-production-ops",
    title: ["Sécurité HTTP, observabilité et livraison", "HTTP security, observability, and delivery"],
    description: ["Préparer une API exploitable : headers, CORS, rate limit, logs et runbook.", "Prepare an operable API: headers, CORS, rate limit, logs, and runbook."],
    vocabulary: [t.obs, t.middleware, ["rate limit", "rate limit", "Limite de requêtes pour réduire les abus simples.", "Request limit reducing basic abuse."]],
    lessons: [
      ["helmet", "Ajouter des headers sûrs", "Désactive x-powered-by et applique helmet.", "securityHeaders", ["helmet", "disable('x-powered-by')"]],
      ["cors", "Configurer CORS strict", "Autorise seulement les origines prévues par environnement.", "corsPolicy", ["cors", "allowedOrigins", "credentials"]],
      ["rate-limit", "Limiter les abus", "Ajoute un quota par fenêtre et par IP.", "rateLimiter", ["windowMs", "limit", "429"]],
      ["request-id", "Attacher un requestId", "Génère ou relaie un identifiant par requête.", "requestContext", ["X-Request-Id", "crypto.randomUUID"]],
      ["safe-logs", "Logger sans secret", "Évite tokens, cookies et corps complet dans les logs.", "safeLogger", ["requestId", "durationMs", "statusCode"]],
      ["runbook", "Écrire un runbook incident", "Documente symptômes, requêtes de diagnostic, rollback et contact.", "incidentRunbook", ["symptom", "rollback", "owner"]]
    ],
    project: ["node-v9-final-capstone", "Projet final : API PulsaBoard sécurisée", "Livre une API projets avec validation, auth, tests, headers, logs, rate limit et runbook.", "PulsaBoardApi", ["helmet", "cors", "rateLimit", "requestId", "expect(403)"], true],
    quiz: ["node-v9-production-quiz", "Quiz : production API", "api-production"]
  }
];

export const nodeApiV9Modules = modules.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [...module.lessons.map((item, index) => lesson(module, item, index)), project(module.project, module), quiz(module.quiz)]
}));

function lesson(module, [slug, title, brief, symbol, requirements], index) {
  return {
    id: `${module.id}-${slug}`,
    type: "node",
    title: [title, title],
    brief: [brief, `Practice: ${brief}`],
    solution: `export function ${symbol}(input = {}) {\n  const requestId = input.requestId || crypto.randomUUID?.() || "local-request";\n  return { ok: true, requestId, contract: "${slug}" };\n}`,
    requirements,
    skills: [module.quiz[2], `node-v9-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 32,
    xp: 38
  };
}

function project([id, title, brief, symbol, requirements, finalProject = false], module) {
  return {
    id,
    project: true,
    exerciseType: "node",
    title: [title, title],
    brief: [brief, `Build and prove: ${brief}`],
    solution: `export function create${symbol}({ repository, logger }) {\n  return {\n    async handle(request) {\n      logger.info({ requestId: request.id, route: "${id}" });\n      const result = await repository.listForUser(request.auth.userId);\n      return { status: 200, body: { items: result, requestId: request.id } };\n    }\n  };\n}`,
    requirements,
    skills: [module.quiz[2], "node-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    durationMin: finalProject ? 240 : 130,
    xp: finalProject ? 180 : 100
  };
}

function quiz([id, title, skill]) {
  return {
    id,
    type: "quiz",
    title: [title, title],
    brief: ["Réponds comme en revue backend : frontière, sécurité, preuve et diagnostic.", "Answer like in backend review: boundary, security, evidence, and diagnosis."],
    purpose: "module-review",
    passingScore: 75,
    questions: [
      q(`${id}-1`, "Quelle donnée serveur ne doit jamais partir au navigateur ?", "Un secret, token ou stack interne", ["Un requestId", "Un code d'erreur stable", "Un statut HTTP"], skill),
      q(`${id}-2`, "Où valider une entrée HTTP ?", "Au bord serveur, avant le service métier", ["Dans le CSS", "Après l'écriture en base", "Seulement dans le frontend"], skill),
      q(`${id}-3`, "Que prouve un bon test API ?", "Statut, body public et effet de sécurité observable", ["Le nombre de lignes", "La couleur du bouton", "Le nom exact d'une variable privée"], skill),
      q(`${id}-4`, "Quelle décision rend l'API maintenable ?", "Séparer route, service, repository et tests", ["Mettre toute la logique dans app.js", "Logger le body complet", "Utiliser any côté serveur"], skill),
      q(`${id}-5`, "Comment diagnostiquer sans exposer ?", "Logs structurés avec requestId, durée, route et statut", ["Retourner la stack au client", "Afficher les cookies", "Publier DATABASE_URL"], skill)
    ]
  };
}

function q(id, prompt, answer, distractors, skill) {
  return {
    id,
    type: "single",
    prompt: [prompt, prompt],
    choices: [answer, ...distractors].map((label) => ({ id: label, label: [label, label] })),
    answer,
    explanation: ["La bonne réponse protège la frontière serveur et laisse une preuve reproductible.", "The correct answer protects the server boundary and leaves reproducible evidence."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}
