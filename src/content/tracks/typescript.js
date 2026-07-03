import { createProfessionalTrack } from "../builders/createProfessionalTrack.js";
import { typescriptModules } from "./typescriptModules.js";

const v = {
  type: ["type", "type", "Description statique des valeurs et opérations autorisées.", "A static description of allowed values and operations."],
  inference: ["inférence", "inference", "Déduction automatique d’un type à partir du code.", "Automatic deduction of a type from code."],
  union: ["union", "union", "Type représentant plusieurs possibilités explicites.", "A type representing several explicit possibilities."],
  narrowing: ["raffinement", "narrowing", "Réduction d’une union grâce à une vérification de contrôle.", "Reduction of a union through a control-flow check."],
  interface: ["interface", "interface", "Contrat nommé décrivant la forme d’un objet.", "A named contract describing an object shape."],
  generic: ["générique", "generic", "Paramètre de type conservant une relation entre plusieurs valeurs.", "A type parameter preserving a relationship between values."],
  utility: ["type utilitaire", "utility type", "Transformation réutilisable d’un type existant.", "A reusable transformation of an existing type."],
  unknown: ["unknown", "unknown", "Type sûr pour une valeur dont la forme doit être vérifiée.", "A safe type for a value whose shape must be checked."],
  guard: ["garde de type", "type guard", "Fonction ou condition prouvant un type plus précis.", "A function or condition proving a more precise type."],
  migration: ["migration", "migration", "Adoption progressive du typage sans interrompre le produit.", "Progressive adoption of typing without stopping the product."]
};

export const typescriptTrack = createProfessionalTrack({
  id: "typescript",
  label: "TS",
  title: ["TypeScript professionnel", "Professional TypeScript"],
  summary: ["Modélise les données, sécurise les frontières et migre une application JavaScript vers un TypeScript strict.", "Model data, secure boundaries, and migrate a JavaScript application to strict TypeScript."],
  profession: ["TypeScript n’est pas une collection d’annotations : c’est un outil de conception. Ce parcours apprend à représenter les états possibles, garder les données externes inconnues jusqu’à validation et faire évoluer une base JavaScript sans mensonge de type.", "TypeScript is not a collection of annotations: it is a design tool. This track teaches how to represent possible states, keep external data unknown until validation, and evolve a JavaScript codebase without type lies."],
  prerequisites: [["Maîtriser variables, fonctions et objets JavaScript", "Know JavaScript variables, functions, and objects"], ["Comprendre modules et promesses", "Understand modules and promises"], ["Savoir lire une erreur de compilation", "Know how to read a compiler error"]],
  outcomes: [["Modéliser objets et états métier", "Model business objects and states"], ["Écrire fonctions et génériques sûrs", "Write safe functions and generics"], ["Typer DOM, requêtes et erreurs", "Type DOM, requests, and errors"], ["Planifier une migration stricte", "Plan a strict migration"]],
  capstone: ["Migrer une application de suivi de tâches vers TypeScript strict avec modèle métier, API validée, états exhaustifs et preuves de compilation.", "Migrate a task-tracking application to strict TypeScript with a domain model, validated API, exhaustive states, and compilation evidence."],
  certification: [["Valider les quatre quiz", "Pass all four quizzes"], ["Livrer trois projets typés", "Ship three typed projects"], ["Réussir l’examen final à 80 %", "Pass the final exam at 80%"], ["Documenter zéro contournement any", "Document zero any workarounds"]],
  modules: [
    ...typescriptModules,
    {
      id: "typescript-foundations",
      title: ["Fondations et modèles", "Foundations and models"],
      description: ["Utiliser l’inférence, les objets et les unions pour représenter uniquement des états valides.", "Use inference, objects, and unions to represent only valid states."],
      vocabulary: [v.type, v.inference, v.union],
      lessons: [
        ts("ts-01-inference", ["Inférence et annotations utiles", "Inference and useful annotations"], ["Laisse TypeScript inférer les constantes et annote les frontières publiques.", "Let TypeScript infer constants and annotate public boundaries."], "const taxRate = 0.2;\n\nexport function total(price: number, quantity: number): number {\n  return price * quantity * (1 + taxRate);\n}", ["const taxRate", "price: number", "quantity: number", "): number"], ["type-inference", "function-types"], [v.type, v.inference]),
        ts("ts-01-objects", ["Objets, tableaux et readonly", "Objects, arrays, and readonly"], ["Décris un produit immutable et une liste qui refuse les mutations accidentelles.", "Describe an immutable product and a list that rejects accidental mutations."], "type Product = {\n  readonly id: string;\n  name: string;\n  price: number;\n};\n\nconst catalog: readonly Product[] = [];", ["type Product", "readonly id", "price: number", "readonly Product[]"], ["object-types", "immutability"], [v.type, ["readonly", "readonly", "Modificateur empêchant une mutation via ce contrat.", "A modifier preventing mutation through this contract."]]),
        ts("ts-01-unions", ["Unions littérales et raffinement", "Literal unions and narrowing"], ["Modélise un statut fermé puis affine-le avant d’accéder à sa donnée.", "Model a closed status and narrow it before accessing its data."], "type LoadState =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: string[] }\n  | { status: 'error'; message: string };\n\nfunction label(state: LoadState): string {\n  if (state.status === 'success') return `${state.data.length} résultats`;\n  if (state.status === 'error') return state.message;\n  return state.status;\n}", ["type LoadState", "status: 'success'", "state.status === 'success'", "state.data"], ["discriminated-unions", "narrowing"], [v.union, v.narrowing]),
        project("ts-01-model-project", ["Mini-projet : modèle de commande", "Mini-project: order model"], ["Modélise lignes, réduction, paiement et cycle de commande sans état impossible.", "Model lines, discount, payment, and order lifecycle without impossible states."], "type OrderLine = { readonly productId: string; quantity: number; unitPrice: number };\ntype Payment = { kind: 'card'; last4: string } | { kind: 'invoice'; dueAt: string };\ntype OrderState =\n  | { status: 'draft'; lines: readonly OrderLine[] }\n  | { status: 'paid'; lines: readonly OrderLine[]; payment: Payment }\n  | { status: 'shipped'; trackingNumber: string };\n\nfunction orderTotal(lines: readonly OrderLine[]): number {\n  return lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);\n}", ["type OrderLine", "type Payment", "type OrderState", "status: 'paid'", "readonly OrderLine[]", "orderTotal"], ["domain-modeling", "discriminated-unions", "immutability"], [v.type, v.union, v.narrowing]),
        quiz("ts-01-review", ["Quiz : modélisation", "Quiz: modeling"], [
          q("m1", ["Quand ajouter une annotation explicite ?", "When should you add an explicit annotation?"], [["À une frontière publique ou ambiguë", "At a public or ambiguous boundary"], ["Sur chaque constante évidente", "On every obvious constant"], ["Pour remplacer les tests", "To replace tests"]], "À une frontière publique ou ambiguë", ["L’inférence réduit le bruit ; les frontières rendent le contrat visible.", "Inference reduces noise; boundaries make the contract visible."], ["type-inference"]),
          q("m2", ["Pourquoi une union discriminée est-elle utile ?", "Why is a discriminated union useful?"], [["Elle relie chaque état à ses données valides", "It connects each state to its valid data"], ["Elle rend tout optionnel", "It makes everything optional"], ["Elle désactive strict", "It disables strict mode"]], "Elle relie chaque état à ses données valides", ["Le discriminant empêche les combinaisons incohérentes.", "The discriminant prevents inconsistent combinations."], ["discriminated-unions"]),
          q("m3", ["Que garantit readonly ?", "What does readonly guarantee?"], [["Le contrat interdit la mutation via cette référence", "The contract prevents mutation through that reference"], ["La valeur est chiffrée", "The value is encrypted"], ["L’objet est validé à l’exécution", "The object is runtime validated"]], "Le contrat interdit la mutation via cette référence", ["readonly agit au niveau statique, pas comme validation runtime.", "readonly acts statically, not as runtime validation."], ["immutability"])
        ])
      ]
    },
    {
      id: "typescript-functions",
      title: ["Fonctions, interfaces et génériques", "Functions, interfaces, and generics"],
      description: ["Exprimer des contrats réutilisables sans perdre la relation entre entrées et sorties.", "Express reusable contracts without losing the relationship between inputs and outputs."],
      vocabulary: [v.interface, v.generic, v.utility],
      lessons: [
        ts("ts-02-functions", ["Signatures et callbacks", "Signatures and callbacks"], ["Type une transformation et son callback sans dupliquer la forme des données.", "Type a transformation and its callback without duplicating data shapes."], "type Mapper<Input, Output> = (value: Input, index: number) => Output;\n\nfunction mapValues<Input, Output>(values: readonly Input[], mapper: Mapper<Input, Output>): Output[] {\n  return values.map(mapper);\n}", ["type Mapper", "<Input, Output>", "readonly Input[]", "Output[]"], ["function-types", "generics"], [v.type, v.generic]),
        ts("ts-02-interfaces", ["Interfaces et composition", "Interfaces and composition"], ["Sépare identité, horodatage et profil pour composer un contrat métier.", "Separate identity, timestamps, and profile to compose a business contract."], "interface Identified { id: string }\ninterface Timestamped { createdAt: string; updatedAt: string }\ninterface UserProfile extends Identified, Timestamped {\n  displayName: string;\n  locale: 'fr' | 'en';\n}", ["interface Identified", "interface Timestamped", "extends Identified, Timestamped", "locale: 'fr' | 'en'"], ["interface-design", "composition"], [v.interface, v.union]),
        ts("ts-02-generics", ["Génériques contraints", "Constrained generics"], ["Préserve le type exact tout en exigeant un identifiant.", "Preserve the exact type while requiring an identifier."], "function indexById<Item extends { id: string }>(items: readonly Item[]): Record<string, Item> {\n  return Object.fromEntries(items.map((item) => [item.id, item]));\n}", ["Item extends", "readonly Item[]", "Record<string, Item>", "item.id"], ["generics", "constraints"], [v.generic, v.interface]),
        ts("ts-02-utilities", ["Types utilitaires ciblés", "Focused utility types"], ["Dérive les contrats de création et de mise à jour depuis le modèle canonique.", "Derive create and update contracts from the canonical model."], "interface Course { id: string; title: string; publishedAt: string | null; authorId: string }\ntype CourseCreate = Omit<Course, 'id' | 'publishedAt'>;\ntype CoursePatch = Partial<Pick<Course, 'title' | 'publishedAt'>>;\ntype PublishedCourse = Course & { publishedAt: string };", ["Omit<Course", "Partial<Pick<Course", "PublishedCourse", "publishedAt: string"], ["utility-types", "domain-modeling"], [v.utility, v.interface]),
        quiz("ts-02-review", ["Quiz : contrats réutilisables", "Quiz: reusable contracts"], [
          q("f1", ["Que conserve un bon générique ?", "What does a good generic preserve?"], [["Une relation de type utile", "A useful type relationship"], ["Le mot any", "The word any"], ["Une valeur secrète", "A secret value"]], "Une relation de type utile", ["Un générique relie les types des paramètres et du résultat.", "A generic connects parameter and result types."], ["generics"]),
          q("f2", ["Quand préférer une contrainte extends ?", "When should you prefer an extends constraint?"], [["Quand l’algorithme exige une capacité minimale", "When the algorithm requires a minimum capability"], ["Pour rendre toute propriété optionnelle", "To make every property optional"], ["Pour exécuter une validation runtime", "To run runtime validation"]], "Quand l’algorithme exige une capacité minimale", ["La contrainte autorise plusieurs formes tout en garantissant ce que l’algorithme utilise.", "The constraint allows many shapes while guaranteeing what the algorithm uses."], ["constraints"]),
          q("f3", ["Pourquoi dériver CoursePatch ?", "Why derive CoursePatch?"], [["Éviter la divergence avec le modèle canonique", "Avoid divergence from the canonical model"], ["Supprimer la vérification statique", "Remove static checking"], ["Créer une base de données", "Create a database"]], "Éviter la divergence avec le modèle canonique", ["Pick et Partial gardent le contrat relié à sa source.", "Pick and Partial keep the contract connected to its source."], ["utility-types"])
        ])
      ]
    },
    {
      id: "typescript-boundaries",
      title: ["DOM, API et données externes", "DOM, APIs, and external data"],
      description: ["Traiter le DOM, les réponses réseau et les erreurs comme des frontières à vérifier.", "Treat the DOM, network responses, and errors as boundaries to verify."],
      vocabulary: [v.unknown, v.guard, ["promesse", "promise", "Valeur représentant un résultat asynchrone futur.", "A value representing a future asynchronous result."]],
      lessons: [
        ts("ts-03-dom", ["Typer le DOM sans assertion aveugle", "Type the DOM without blind assertions"], ["Vérifie l’existence et la classe de l’élément avant de l’utiliser.", "Check element existence and class before using it."], "const form = document.querySelector('#profile-form');\nif (!(form instanceof HTMLFormElement)) {\n  throw new Error('Profile form is missing');\n}\nform.addEventListener('submit', (event: SubmitEvent) => event.preventDefault());", ["querySelector", "instanceof HTMLFormElement", "throw new Error", "SubmitEvent"], ["dom-types", "narrowing"], [v.narrowing, v.guard]),
        ts("ts-03-unknown", ["Garder l’extérieur en unknown", "Keep external data unknown"], ["Parse une réponse JSON puis valide sa forme avant de la retourner.", "Parse a JSON response and validate its shape before returning it."], "type Profile = { id: string; displayName: string };\n\nfunction isProfile(value: unknown): value is Profile {\n  if (typeof value !== 'object' || value === null) return false;\n  return 'id' in value && 'displayName' in value;\n}\n\nasync function loadProfile(): Promise<Profile> {\n  const response = await fetch('/api/profile');\n  const payload: unknown = await response.json();\n  if (!isProfile(payload)) throw new Error('Invalid profile payload');\n  return payload;\n}", ["value: unknown", "value is Profile", "payload: unknown", "Promise<Profile>", "isProfile(payload)"], ["runtime-validation", "type-guards", "async-types"], [v.unknown, v.guard]),
        ts("ts-03-errors", ["Erreurs et résultats explicites", "Errors and explicit results"], ["Modélise succès et échec lorsque l’appelant doit traiter les deux cas.", "Model success and failure when the caller must handle both cases."], "type Result<Value, ErrorCode extends string> =\n  | { ok: true; value: Value }\n  | { ok: false; error: ErrorCode };\n\nfunction parseQuantity(input: string): Result<number, 'empty' | 'invalid'> {\n  if (!input.trim()) return { ok: false, error: 'empty' };\n  const value = Number(input);\n  return Number.isFinite(value) ? { ok: true, value } : { ok: false, error: 'invalid' };\n}", ["type Result", "ok: true", "ok: false", "'empty' | 'invalid'", "Number.isFinite"], ["result-types", "error-modeling"], [v.union, v.generic]),
        project("ts-03-api-project", ["Mini-projet : client API sûr", "Mini-project: safe API client"], ["Construis un client qui vérifie status HTTP, payload inconnu, pagination et erreurs métier.", "Build a client that verifies HTTP status, unknown payload, pagination, and business errors."], "type Page<Item> = { items: Item[]; nextCursor: string | null };\ntype ApiError = { code: 'unauthorized' | 'invalid_payload' | 'network'; message: string };\ntype ApiResult<Value> = { ok: true; value: Value } | { ok: false; error: ApiError };\n\nfunction isPage<Item>(value: unknown, isItem: (item: unknown) => item is Item): value is Page<Item> {\n  if (typeof value !== 'object' || value === null || !('items' in value)) return false;\n  return Array.isArray(value.items) && value.items.every(isItem);\n}\n\nasync function requestPage<Item>(url: string, isItem: (item: unknown) => item is Item): Promise<ApiResult<Page<Item>>> {\n  const response = await fetch(url);\n  if (!response.ok) return { ok: false, error: { code: 'network', message: String(response.status) } };\n  const payload: unknown = await response.json();\n  return isPage(payload, isItem) ? { ok: true, value: payload } : { ok: false, error: { code: 'invalid_payload', message: 'Unexpected response' } };\n}", ["type Page", "type ApiResult", "value: unknown", "value is Page<Item>", "response.ok", "payload: unknown", "Promise<ApiResult<Page<Item>>>"], ["api-contracts", "runtime-validation", "generics"], [v.unknown, v.guard, v.generic]),
        quiz("ts-03-review", ["Quiz : frontières sûres", "Quiz: safe boundaries"], [
          q("b1", ["Quel type donner directement à response.json() ?", "What type should response.json() receive directly?"], [["unknown", "unknown"], ["Profile sans contrôle", "Profile without checking"], ["never", "never"]], "unknown", ["Le réseau ne garantit pas le contrat statique de l’application.", "The network does not guarantee the application's static contract."], ["runtime-validation"]),
          q("b2", ["Pourquoi préférer instanceof pour un élément DOM ?", "Why prefer instanceof for a DOM element?"], [["Il vérifie réellement la classe à l’exécution", "It verifies the class at runtime"], ["Il désactive null", "It disables null"], ["Il transforme le HTML", "It transforms HTML"]], "Il vérifie réellement la classe à l’exécution", ["L’assertion as ne fournit aucune preuve runtime.", "An as assertion provides no runtime evidence."], ["dom-types"]),
          q("b3", ["Quand un Result est-il utile ?", "When is a Result useful?"], [["Quand l’appelant doit traiter des échecs attendus", "When callers must handle expected failures"], ["Pour masquer toute erreur", "To hide every error"], ["Pour remplacer Promise", "To replace Promise"]], "Quand l’appelant doit traiter des échecs attendus", ["L’union rend les branches de succès et d’échec explicites.", "The union makes success and failure branches explicit."], ["error-modeling"])
        ])
      ]
    },
    {
      id: "typescript-production",
      title: ["Strict, migration et production", "Strict mode, migration, and production"],
      description: ["Configurer le compilateur, supprimer les mensonges de type et migrer progressivement une application réelle.", "Configure the compiler, remove type lies, and progressively migrate a real application."],
      vocabulary: [v.migration, ["strict", "strict", "Ensemble d’options renforçant les garanties du compilateur.", "A set of options strengthening compiler guarantees."], ["exhaustivité", "exhaustiveness", "Preuve que tous les cas d’une union ont été traités.", "Proof that every union case has been handled."]],
      lessons: [
        ts("ts-04-config", ["Configurer un projet strict", "Configure a strict project"], ["Choisis des options modernes et interdit les accès potentiellement indéfinis.", "Choose modern options and reject potentially undefined access."], "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Bundler\",\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"exactOptionalPropertyTypes\": true,\n    \"noEmit\": true\n  }\n}", ["\"strict\": true", "\"noUncheckedIndexedAccess\": true", "\"exactOptionalPropertyTypes\": true", "\"noEmit\": true"], ["typescript-config", "strict-mode"], [v.type, v.migration]),
        ts("ts-04-exhaustive", ["Garantir l’exhaustivité", "Guarantee exhaustiveness"], ["Ajoute une fonction assertNever pour détecter tout nouvel état non traité.", "Add an assertNever function to detect every newly unhandled state."], "type Role = 'learner' | 'author' | 'admin';\n\nfunction assertNever(value: never): never {\n  throw new Error(`Unhandled value: ${value}`);\n}\n\nfunction permissions(role: Role): string[] {\n  switch (role) {\n    case 'learner': return ['learn'];\n    case 'author': return ['learn', 'write'];\n    case 'admin': return ['learn', 'write', 'manage'];\n    default: return assertNever(role);\n  }\n}", ["value: never", "switch (role)", "case 'admin'", "assertNever(role)"], ["exhaustive-checking", "authorization-modeling"], [v.union, v.narrowing]),
        project("ts-04-migration-project", ["Projet : plan de migration progressive", "Project: progressive migration plan"], ["Planifie les étapes, frontières, métriques et règles anti-any d’une migration JavaScript.", "Plan the stages, boundaries, metrics, and anti-any rules of a JavaScript migration."], "type MigrationStage = 'inventory' | 'boundaries' | 'domain' | 'strict' | 'complete';\ntype MigrationMetric = { typedFiles: number; totalFiles: number; anyCount: number; strictErrors: number };\ntype MigrationGate = { stage: MigrationStage; requiredChecks: readonly string[]; owner: string };\n\nconst gates: readonly MigrationGate[] = [\n  { stage: 'inventory', requiredChecks: ['baseline build', 'test suite'], owner: 'tech-lead' },\n  { stage: 'boundaries', requiredChecks: ['API payload guards', 'DOM checks'], owner: 'frontend' },\n  { stage: 'strict', requiredChecks: ['strict true', 'anyCount = 0'], owner: 'team' }\n];\n\nfunction completion(metric: MigrationMetric): number {\n  return metric.totalFiles ? Math.round(metric.typedFiles / metric.totalFiles * 100) : 0;\n}", ["type MigrationStage", "type MigrationMetric", "type MigrationGate", "readonly MigrationGate[]", "anyCount", "strict true", "completion"], ["migration-planning", "quality-gates", "strict-mode"], [v.migration, v.unknown, v.guard]),
        quiz("ts-04-review", ["Quiz : TypeScript en production", "Quiz: TypeScript in production"], [
          q("p1", ["Que révèle noUncheckedIndexedAccess ?", "What does noUncheckedIndexedAccess reveal?"], [["Un index peut retourner undefined", "An index may return undefined"], ["Chaque nombre est négatif", "Every number is negative"], ["Le bundle est trop grand", "The bundle is too large"]], "Un index peut retourner undefined", ["L’option force à traiter l’absence possible d’une clé ou position.", "The option forces handling a potentially missing key or position."], ["strict-mode"]),
          q("p2", ["Pourquoi limiter any pendant une migration ?", "Why limit any during migration?"], [["Il propage une absence de vérification", "It spreads a lack of checking"], ["Il ralentit toujours le réseau", "It always slows the network"], ["Il empêche Git", "It prevents Git"]], "Il propage une absence de vérification", ["unknown oblige à prouver la forme avant usage, contrairement à any.", "unknown requires proof before use, unlike any."], ["migration-planning"]),
          q("p3", ["Que détecte assertNever ?", "What does assertNever detect?"], [["Un cas d’union oublié", "A forgotten union case"], ["Une erreur HTTP uniquement", "An HTTP error only"], ["Un fichier CSS vide", "An empty CSS file"]], "Un cas d’union oublié", ["Le compilateur signale qu’une valeur non-never atteint la branche finale.", "The compiler reports that a non-never value reaches the final branch."], ["exhaustive-checking"])
        ]),
        quiz("ts-final-exam", ["Examen TypeScript professionnel", "Professional TypeScript exam"], [
          q("x1", ["Quelle règle guide l’inférence ?", "What rule guides inference?"], [["Inférer localement, annoter les frontières", "Infer locally, annotate boundaries"], ["Annoter chaque littéral", "Annotate every literal"], ["Utiliser any par défaut", "Use any by default"]], "Inférer localement, annoter les frontières", ["Cette règle maximise la lisibilité sans cacher les contrats publics.", "This rule maximizes readability without hiding public contracts."], ["type-inference"]),
          q("x2", ["Comment représenter chargement, succès et erreur ?", "How should loading, success, and error be represented?"], [["Une union discriminée", "A discriminated union"], ["Trois booléens indépendants", "Three independent booleans"], ["Un objet any", "An any object"]], "Une union discriminée", ["Elle interdit les combinaisons impossibles et guide le raffinement.", "It forbids impossible combinations and guides narrowing."], ["discriminated-unions"]),
          q("x3", ["Que faire d’un payload externe ?", "What should you do with an external payload?"], [["Le garder unknown puis le valider", "Keep it unknown, then validate it"], ["L’asserter directement avec as", "Assert it directly with as"], ["Ignorer sa forme", "Ignore its shape"]], "Le garder unknown puis le valider", ["Le type statique ne valide pas le réseau à l’exécution.", "Static typing does not validate the network at runtime."], ["runtime-validation"]),
          q("x4", ["Quel générique est justifié ?", "Which generic is justified?"], [["Celui qui relie entrée et sortie", "One that connects input and output"], ["Celui nommé T sans relation", "One named T with no relationship"], ["Celui qui cache any", "One that hides any"]], "Celui qui relie entrée et sortie", ["La relation apporte l’information utile au consommateur.", "The relationship provides useful information to consumers."], ["generics"]),
          q("x5", ["Quel signal prouve une migration achevée ?", "What signal proves a migration is complete?"], [["Build strict, tests verts et any justifiés à zéro", "Strict build, green tests, and zero unjustified any"], ["Extensions .ts uniquement", ".ts extensions only"], ["Plus aucun commentaire", "No comments left"]], "Build strict, tests verts et any justifiés à zéro", ["Renommer des fichiers ne prouve ni les contrats ni le comportement.", "Renaming files proves neither contracts nor behavior."], ["migration-planning"])
        ], "exam", 80)
      ]
    }
  ]
});

function ts(id, title, brief, solution, requirements, skills, vocabulary) {
  return { id, type: "typescript", title, brief, solution, requirements, skills, vocabulary };
}

function project(id, title, brief, solution, requirements, skills, vocabulary) {
  return {
    id,
    project: true,
    exerciseType: "typescript",
    title,
    brief,
    solution,
    requirements,
    skills,
    vocabulary,
    durationMin: id.includes("migration") ? 180 : 110,
    xp: id.includes("migration") ? 140 : 90
  };
}

function quiz(id, title, questions, purpose = "module-review", passingScore = 70) {
  return { id, type: "quiz", title, questions, purpose, passingScore, brief: ["Analyse le contrat avant de choisir.", "Analyze the contract before choosing."] };
}

function q(id, prompt, options, answer, explanation, skills) {
  return {
    id,
    type: "single",
    prompt,
    choices: options.map((option) => ({ id: option[0], label: option })),
    answer,
    explanation,
    points: 1,
    skills,
    glossaryTerms: []
  };
}
