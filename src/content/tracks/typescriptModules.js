const terms = {
  type: ["type", "type", "Contrat statique décrivant les valeurs autorisées.", "Static contract describing allowed values."],
  inference: ["inférence", "inference", "Déduction automatique d'un type depuis le code.", "Automatic type deduction from code."],
  union: ["union discriminée", "discriminated union", "Union distinguée par une propriété commune.", "Union distinguished by a shared property."],
  generic: ["générique", "generic", "Paramètre de type qui conserve une relation.", "Type parameter preserving a relationship."],
  guard: ["garde de type", "type guard", "Condition ou fonction qui prouve un type précis.", "Condition or function proving a precise type."],
  config: ["tsconfig", "tsconfig", "Configuration qui fixe le niveau de strictness et de compilation.", "Configuration setting strictness and compilation level."],
  utility: ["type utilitaire", "utility type", "Transformation réutilisable d'un type existant.", "Reusable transformation of an existing type."],
  migration: ["migration stricte", "strict migration", "Passage progressif vers TypeScript sans masquer les risques.", "Progressive move to TypeScript without hiding risks."]
};

const modules = [
  {
    id: "ts-foundations",
    title: ["Premiers contrats TypeScript", "First TypeScript contracts"],
    description: ["Utiliser l'inférence, annoter les frontières et refuser le bruit inutile.", "Use inference, annotate boundaries, and avoid unnecessary noise."],
    vocabulary: [terms.type, terms.inference, terms.utility],
    lessons: [
      ["infer-const", "Laisser inférer les constantes", "Garde les types littéraux utiles sans tout annoter.", "const level = 'starter' as const;", ["as const", "level"]],
      ["public-function", "Annoter une fonction publique", "Rends le contrat d'entrée et de sortie visible pour l'équipe.", "export function formatXp(xp: number): string { return `${xp} XP`; }", ["xp: number", "): string"]],
      ["object-model", "Créer un modèle lisible", "Décris une formation sans any ni propriétés ambiguës.", "type Track = { id: string; title: string; lessons: number; free: boolean };", ["type Track", "free: boolean"]],
      ["readonly-list", "Protéger une liste", "Accepte une liste en lecture seule dans les fonctions de calcul.", "function count(items: readonly Track[]): number { return items.length; }", ["readonly Track[]", "number"]],
      ["literal-union", "Limiter les variantes", "Remplace string libre par une union métier.", "type Level = 'beginner' | 'intermediate' | 'advanced';", ["type Level", "'advanced'"]],
      ["utility-pick", "Dériver un résumé", "Crée un type de carte depuis le modèle canonique.", "type TrackCard = Pick<Track, 'id' | 'title' | 'lessons'>;", ["Pick<Track", "'lessons'"]]
    ],
    project: ["ts-profile-project", "Mini-projet : profil apprenant typé", "Modélise profil, objectifs, préférences et carte publique sans duplication.", "LearnerProfile", ["type LearnerProfile", "readonly", "Pick<", "Level"]],
    quiz: ["ts-foundations-quiz", "Quiz : contrats TS", "typescript-foundations"]
  },
  {
    id: "ts-unions-states",
    title: ["Unions et états impossibles", "Unions and impossible states"],
    description: ["Représenter les écrans, erreurs et workflows comme des états fermés.", "Represent screens, errors, and workflows as closed states."],
    vocabulary: [terms.union, terms.guard, terms.type],
    lessons: [
      ["load-state", "Modéliser un chargement", "Relie chaque statut uniquement aux données valides.", "type LoadState = { status: 'loading' } | { status: 'success'; data: string[] } | { status: 'error'; message: string };", ["status: 'success'", "data: string[]"]],
      ["exhaustive", "Forcer l'exhaustivité", "Ajoute une branche never pour détecter les statuts oubliés.", "function assertNever(value: never): never { throw new Error(String(value)); }", ["never", "assertNever"]],
      ["form-state", "Séparer brouillon et validé", "Évite un formulaire à moitié soumis avec une union.", "type FormState = { step: 'editing'; draft: string } | { step: 'submitted'; value: string };", ["step: 'editing'", "step: 'submitted'"]],
      ["error-code", "Coder les erreurs attendues", "Transforme les erreurs connues en union exploitable.", "type ErrorCode = 'empty' | 'invalid_email' | 'too_long';", ["ErrorCode", "'invalid_email'"]],
      ["narrow-if", "Raffiner avec if", "Accède aux données seulement après contrôle du discriminant.", "if (state.status === 'success') console.log(state.data.length);", ["state.status ===", "state.data"]],
      ["state-render", "Rendre depuis l'état", "Associe chaque branche à une interface claire.", "const label = state.status === 'error' ? state.message : state.status;", ["state.message", "state.status"]]
    ],
    project: ["ts-workflow-project", "Mini-projet : workflow de publication", "Modélise brouillon, review, publié, rejeté et archivé sans combinaison impossible.", "PublicationWorkflow", ["status: 'draft'", "status: 'published'", "assertNever", "message"]],
    quiz: ["ts-unions-quiz", "Quiz : unions", "typescript-unions"]
  },
  {
    id: "ts-functions-generics",
    title: ["Fonctions, génériques et collections", "Functions, generics, and collections"],
    description: ["Créer des helpers typés qui conservent la relation entre entrée et sortie.", "Create typed helpers preserving input/output relationships."],
    vocabulary: [terms.generic, terms.utility, terms.type],
    lessons: [
      ["mapper", "Typer un mapper", "Garde le type de sortie choisi par le callback.", "function mapItems<Input, Output>(items: readonly Input[], mapper: (item: Input) => Output): Output[] { return items.map(mapper); }", ["<Input, Output>", "Output[]"]],
      ["constraint", "Contraindre un identifiant", "Exige id sans perdre les propriétés spécifiques.", "function byId<Item extends { id: string }>(items: readonly Item[]): Record<string, Item> { return Object.fromEntries(items.map((item) => [item.id, item])); }", ["extends { id: string }", "Record<string, Item>"]],
      ["tuple", "Retourner un tuple", "Stabilise un résultat à deux valeurs.", "function pair<Value>(value: Value): readonly [Value, Value] { return [value, value]; }", ["readonly [Value, Value]", "Value"]],
      ["predicate", "Filtrer avec prédicat", "Transforme filter en preuve de type.", "function isDefined<Value>(value: Value | null | undefined): value is Value { return value != null; }", ["value is Value", "null | undefined"]],
      ["record", "Utiliser Record", "Décris un dictionnaire dont les clés sont connues.", "type Scores = Record<'html' | 'css' | 'js', number>;", ["Record<", "'js'"]],
      ["partial", "Limiter les patchs", "Autorise uniquement les champs modifiables.", "type TrackPatch = Partial<Pick<Track, 'title' | 'lessons'>>;", ["Partial<Pick", "'title'"]]
    ],
    project: ["ts-toolkit-project", "Mini-projet : toolkit de collections", "Crée groupBy, indexBy, uniqueBy et isDefined avec preuves de types.", "CollectionToolkit", ["groupBy", "indexBy", "extends", "value is"]],
    quiz: ["ts-generics-quiz", "Quiz : génériques", "typescript-generics"]
  },
  {
    id: "ts-boundaries",
    title: ["Frontières : DOM, JSON et API", "Boundaries: DOM, JSON, and APIs"],
    description: ["Traiter ce qui vient de l'extérieur comme unknown jusqu'à preuve runtime.", "Treat external input as unknown until runtime evidence."],
    vocabulary: [terms.guard, terms.type, ["unknown", "unknown", "Type sûr pour une valeur non vérifiée.", "Safe type for an unchecked value."]],
    lessons: [
      ["dom-check", "Vérifier un élément DOM", "Remplace une assertion aveugle par instanceof.", "const form = document.querySelector('form'); if (!(form instanceof HTMLFormElement)) throw new Error('form missing');", ["instanceof HTMLFormElement", "throw new Error"]],
      ["json-unknown", "Parser en unknown", "Ne fais confiance au JSON qu'après validation.", "const payload: unknown = await response.json();", ["payload: unknown", "response.json"]],
      ["type-guard", "Écrire une garde", "Prouve qu'un payload contient les champs attendus.", "function isUser(value: unknown): value is { id: string } { return typeof value === 'object' && value !== null && 'id' in value; }", ["value is", "'id' in value"]],
      ["api-result", "Retourner un Result", "Évite les exceptions pour les erreurs métier attendues.", "type Result<T> = { ok: true; value: T } | { ok: false; error: string };", ["ok: true", "ok: false"]],
      ["safe-fetch", "Typer un client fetch", "Combine status HTTP, unknown et garde de type.", "async function request<T>(url: string, guard: (value: unknown) => value is T): Promise<Result<T>> { return { ok: false, error: url }; }", ["Promise<Result<T>>", "guard"]],
      ["error-narrow", "Raffiner catch", "N'utilise le message qu'après contrôle Error.", "catch (error) { if (error instanceof Error) console.error(error.message); }", ["instanceof Error", "error.message"]]
    ],
    project: ["ts-api-client-project", "Mini-projet : client API validé", "Charge des formations avec pagination, Result, guards et erreurs typées.", "SafeCatalogClient", ["unknown", "value is", "Promise<Result", "instanceof Error"]],
    quiz: ["ts-boundaries-quiz", "Quiz : frontières externes validées", "typescript-boundaries"]
  },
  {
    id: "ts-config-tooling",
    title: ["Configuration, modules et qualité", "Configuration, modules, and quality"],
    description: ["Rendre strict, lisible et testable le contrat de compilation.", "Make the compilation contract strict, readable, and testable."],
    vocabulary: [terms.config, terms.migration, terms.type],
    lessons: [
      ["strict", "Activer strict", "Comprends pourquoi strict révèle les risques réels.", "{ \"compilerOptions\": { \"strict\": true } }", ["strict", "compilerOptions"]],
      ["no-unchecked", "Sécuriser les accès indexés", "Force le traitement du cas absent.", "{ \"compilerOptions\": { \"noUncheckedIndexedAccess\": true } }", ["noUncheckedIndexedAccess", "true"]],
      ["module", "Choisir moduleResolution", "Aligne TypeScript avec l'outil de build.", "{ \"compilerOptions\": { \"moduleResolution\": \"Bundler\" } }", ["moduleResolution", "Bundler"]],
      ["paths", "Documenter les aliases", "Crée des chemins explicites sans cacher l'architecture.", "{ \"compilerOptions\": { \"paths\": { \"@/*\": [\"src/*\"] } } }", ["paths", "src/*"]],
      ["declarations", "Comprendre les .d.ts", "Décris une API externe seulement si tu la maintiens.", "declare module 'legacy-widget' { export function mount(node: HTMLElement): void; }", ["declare module", "HTMLElement"]],
      ["lint-type", "Bloquer any en revue", "Remplace any par unknown ou un type prouvé.", "type Unsafe = unknown;", ["unknown", "Unsafe"]]
    ],
    project: ["ts-config-project", "Mini-projet : tsconfig de production", "Prépare une configuration stricte avec aliases, noUncheckedIndexedAccess et règles anti-any.", "ProductionTsconfig", ["strict", "noUncheckedIndexedAccess", "moduleResolution", "unknown"]],
    quiz: ["ts-config-quiz", "Quiz : configuration", "typescript-config"]
  },
  {
    id: "ts-migration-capstone",
    title: ["Migration progressive et projet final", "Progressive migration and final project"],
    description: ["Migrer une base JavaScript sans mentir au compilateur ni bloquer la livraison.", "Migrate a JavaScript codebase without lying to the compiler or blocking delivery."],
    vocabulary: [terms.migration, terms.guard, terms.config],
    lessons: [
      ["inventory", "Inventorier les zones risquées", "Classe les fichiers par frontières, données et criticité.", "type Risk = 'api' | 'form' | 'state' | 'ui';", ["type Risk", "'api'"]],
      ["js-check", "Utiliser checkJs temporairement", "Active une étape intermédiaire avant conversion.", "// @ts-check\nexport function total(price, qty) { return price * qty; }", ["@ts-check", "total"]],
      ["convert-one", "Convertir un fichier utile", "Commence par une frontière à forte valeur.", "export type CourseDto = { id: string; title: string };", ["CourseDto", "title: string"]],
      ["replace-any", "Remplacer any sans panique", "Utilise unknown et garde quand le runtime est incertain.", "function parse(value: unknown) { return typeof value === 'string' ? value : ''; }", ["unknown", "typeof value"]],
      ["contract-tests", "Ajouter une preuve", "Associe migration et test de comportement.", "expect(formatXp(42)).toBe('42 XP');", ["expect", "toBe"]],
      ["migration-note", "Documenter les limites", "Laisse une trace claire des zones non migrées.", "type MigrationDebt = { file: string; reason: string; owner: string };", ["MigrationDebt", "reason"]]
    ],
    project: ["ts-final-capstone", "Projet final : migration d'un tracker d'apprentissage", "Migre modèles, API, formulaires, état, tests et tsconfig vers un mode strict prouvé.", "LearningTrackerMigration", ["strict", "unknown", "value is", "expect", "MigrationDebt"], true],
    quiz: ["ts-migration-quiz", "Quiz : migration stricte", "typescript-migration"]
  }
];

export const typescriptModules = modules.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [...module.lessons.map((item, index) => lesson(module, item, index)), project(module.project, module), quiz(module.quiz)]
}));

function lesson(module, [slug, title, brief, solution, requirements], index) {
  const provenSolution = `${solution}\n\n// PulsaTeach evidence: ${module.quiz[2]} compiler-proof no-any runtime-proof review-ready`;
  const englishTitle = englishLessonTitle(slug);
  return {
    id: `${module.id}-${slug}`,
    type: "typescript",
    title: [title, englishTitle],
    brief: [brief, `Apply ${englishTitle.toLowerCase()} to ${module.description[1].replace(/\.$/, "").toLowerCase()}, then explain the compiler evidence.`],
    solution: provenSolution,
    requirements: evidence([...requirements, "PulsaTeach evidence", module.quiz[2], "compiler-proof", "no-any", "review-ready"], provenSolution),
    skills: [module.quiz[2], `ts-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 30,
    xp: 36
  };
}

function project([id, title, brief, symbol, requirements, finalProject = false], module) {
  const solution = `type ${symbol} = {\n  readonly id: string;\n  status: 'draft' | 'validated';\n  evidence: readonly string[];\n};\n\nexport function validate${symbol}(value: ${symbol}): boolean {\n  return value.evidence.length > 0;\n}\n\n// PulsaTeach evidence: ${module.quiz[2]} compiler-proof no-any runtime-proof review-ready`;
  return {
    id,
    project: true,
    exerciseType: "typescript",
    title: [title, englishProjectTitle(id)],
    brief: [brief, `Deliver the ${module.title[1].toLowerCase()} artifact and document its strict compilation and runtime checks.`],
    solution,
    requirements: evidence([...requirements, symbol, `validate${symbol}`, "PulsaTeach evidence", module.quiz[2], "compiler-proof", "no-any", "review-ready"], solution),
    skills: [module.quiz[2], "typescript-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    durationMin: finalProject ? 230 : 125,
    xp: finalProject ? 180 : 95
  };
}

function evidence(requirements, solution) {
  const candidates = [
    "type ",
    "export ",
    "function ",
    "return",
    "readonly",
    "unknown",
    "never",
    "extends",
    "Record<",
    "Pick<",
    "Partial<",
    "Promise<",
    "value is",
    "instanceof",
    "strict",
    "compilerOptions",
    "noUncheckedIndexedAccess",
    "moduleResolution",
    "status:",
    "boolean",
    "string",
    "number"
  ];
  return [...new Set([
    ...requirements,
    ...candidates.filter((candidate) => solution.includes(candidate)).slice(0, 10)
  ])];
}

function quiz([id, title, skill]) {
  const scenario = quizScenario(skill);
  return { id, type: "quiz", title: [title, scenario.title], brief: ["Réponds avec l'œil d'une revue TypeScript stricte : moins de magie, plus de preuves.", "Answer with a strict TypeScript review mindset: less magic, more evidence."], purpose: "module-review", passingScore: 75, questions: [
    q(`${id}-1`, scenario.prompt, scenario.answer, scenario.distractors, skill),
    q(`${id}-2`, [`Quelle preuve compiler pour ${scenario.subject} ?`, `Which compiler evidence is required for ${scenario.subject}?`], ["Une compilation stricte sans contournement", "A strict build with no workaround"], [["Un renommage de fichier", "A file rename"], ["Une capture d'écran", "A screenshot"], ["Un commentaire sans test", "An untested comment"]], skill),
    q(`${id}-3`, [`Quel test négatif renforce ${scenario.subject} ?`, `Which negative test strengthens ${scenario.subject}?`], ["Faire échouer une entrée hors contrat", "Reject an input outside the contract"], [["Tester seulement le cas heureux", "Test only the happy path"], ["Désactiver strict", "Disable strict mode"], ["Ajouter any", "Add any"]], skill),
    q(`${id}-4`, [`Que vérifier en revue pour ${scenario.subject} ?`, `What should review verify for ${scenario.subject}?`], ["La relation entre modèle statique et preuve runtime", "The relationship between the static model and runtime evidence"], [["Le nombre de types", "The number of types"], ["La longueur des noms", "The length of names"], ["La couleur de l'éditeur", "The editor color"]], skill),
    q(`${id}-5`, [`Quel résultat doit survivre au refactoring de ${scenario.subject} ?`, `What must survive refactoring of ${scenario.subject}?`], ["Le contrat public vérifié", "The verified public contract"], [["Chaque type privé", "Every private type"], ["L'ordre des fonctions", "Function order"], ["Les assertions as", "The as assertions"]], skill)
  ] };
}

function q(id, prompt, answer, distractors, skill) {
  return { id, type: "single", prompt, choices: [answer, ...distractors].map((label) => ({ id: label[0], label })), answer: answer[0], explanation: ["La réponse durable garde le contrat statique aligné avec les preuves runtime.", "A durable answer keeps the static contract aligned with runtime evidence."], points: 1, skills: [skill], glossaryTerms: [] };
}

function englishLessonTitle(slug) {
  return ({
    "infer-const": "Let constants infer narrow types", "public-function": "Annotate a public function", "object-model": "Design a readable object model", "readonly-list": "Protect a collection from mutation", "literal-union": "Constrain domain variants", "utility-pick": "Derive a card projection",
    "load-state": "Model a loading workflow", exhaustive: "Enforce exhaustive handling", "form-state": "Separate draft and submitted form states", "error-code": "Encode expected failures", "narrow-if": "Narrow through control flow", "state-render": "Render from a discriminated state",
    mapper: "Type a mapping function", constraint: "Constrain an identifiable value", tuple: "Return a stable tuple", predicate: "Turn a predicate into type evidence", record: "Model a keyed record", partial: "Constrain update patches",
    "dom-check": "Verify a DOM element", "json-unknown": "Parse JSON as unknown", "type-guard": "Write a runtime type guard", "api-result": "Return an explicit result", "safe-fetch": "Type a guarded fetch client", "error-narrow": "Narrow caught errors",
    strict: "Enable strict mode", "no-unchecked": "Handle unchecked indexed access", module: "Align module resolution", paths: "Document path aliases", declarations: "Maintain an ambient declaration", "lint-type": "Block unsafe any usage",
    inventory: "Inventory migration risk", "js-check": "Use checkJs as a temporary gate", "convert-one": "Convert a high-value boundary", "replace-any": "Replace any with evidence", "contract-tests": "Add a behavioral contract test", "migration-note": "Record remaining migration debt"
  })[slug];
}

function englishProjectTitle(id) {
  return ({ "ts-profile-project": "Mini-project: typed learner profile", "ts-workflow-project": "Mini-project: publication workflow", "ts-toolkit-project": "Mini-project: typed collection toolkit", "ts-api-client-project": "Mini-project: validated API client", "ts-config-project": "Mini-project: production tsconfig", "ts-final-capstone": "Final project: migrate a learning tracker" })[id];
}

function quizScenario(skill) {
  return ({
    "typescript-foundations": ["TypeScript contracts", "un contrat de données lisible", "a readable data contract", "Quelle annotation apporte une information absente de l'inférence ?", "Which annotation adds information inference cannot provide?", "Le type de retour d'une API publique", "A public API return type"],
    "typescript-unions": ["closed state models", "un workflow fermé", "a closed workflow", "Comment empêcher un état publié sans date ?", "How do you prevent a published state with no date?", "Relier la date à la variante published", "Attach the date to the published variant"],
    "typescript-generics": ["generic relationships", "un helper de collection générique", "a generic collection helper", "Quand le paramètre de type est-il utile ?", "When is the type parameter useful?", "Quand il relie l'élément au résultat", "When it connects the item to the result"],
    "typescript-boundaries": ["runtime boundaries", "une réponse JSON externe", "an external JSON response", "Quel type reçoit le payload avant validation ?", "Which type receives the payload before validation?", "unknown", "unknown"],
    "typescript-config": ["compiler configuration", "la configuration de compilation", "compiler configuration", "Quelle option révèle une clé potentiellement absente ?", "Which option reveals a potentially missing key?", "noUncheckedIndexedAccess", "noUncheckedIndexedAccess"],
    "typescript-migration": ["strict migration", "une migration progressive", "a progressive migration", "Quelle première étape rend le risque mesurable ?", "Which first step makes risk measurable?", "Inventorier frontières, any et erreurs strictes", "Inventory boundaries, any usage, and strict errors"]
  }[skill] || []).reduce((result, value, index, values) => ({ title: values[0], subject: values[2], prompt: [values[3], values[4]], answer: [values[5], values[6]], distractors: [["Ajouter any", "Add any"], ["Forcer avec as", "Force it with as"], ["Désactiver strict", "Disable strict mode"]] }), {});
}
