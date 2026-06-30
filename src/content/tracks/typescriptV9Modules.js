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
    id: "ts-v9-foundations",
    title: ["Premiers contrats TypeScript", "First TypeScript contracts"],
    description: ["Utiliser l'inférence, annoter les frontières et refuser le bruit inutile.", "Use inference, annotate boundaries, and avoid unnecessary noise."],
    vocabulary: [terms.type, terms.inference, terms.utility],
    lessons: [
      ["infer-const", "Laisser inférer les constantes", "Garde les types littéraux utiles sans tout annoter.", "const level = 'starter' as const;", ["as const", "level"]],
      ["public-function", "Annoter une fonction publique", "Rends le contrat d'entrée et de sortie visible pour l'équipe.", "export function formatXp(xp: number): string { return `${xp} XP`; }", ["xp: number", "): string"]],
      ["object-model", "Créer un modèle lisible", "Décris une formation sans any ni propriétés ambiguës.", "type Track = { id: string; title: string; lessons: number; free: boolean };", ["type Track", "free: boolean"]],
      ["readonly-list", "Protéger une liste", "Accepte une liste en lecture seule dans les fonctions de calcul.", "function count(items: readonly Track[]): number { return items.length; }", ["readonly Track[]", "number"]],
      ["literal-union", "Limiter les variantes", "Remplace string libre par une union métier.", "type Level = 'débutant' | 'intermédiaire' | 'avancé';", ["type Level", "'avancé'"]],
      ["utility-pick", "Dériver un résumé", "Crée un type de carte depuis le modèle canonique.", "type TrackCard = Pick<Track, 'id' | 'title' | 'lessons'>;", ["Pick<Track", "'lessons'"]]
    ],
    project: ["ts-v9-profile-project", "Mini-projet : profil apprenant typé", "Modélise profil, objectifs, préférences et carte publique sans duplication.", "LearnerProfile", ["type LearnerProfile", "readonly", "Pick<", "Level"]],
    quiz: ["ts-v9-foundations-quiz", "Quiz : contrats TS", "typescript-foundations"]
  },
  {
    id: "ts-v9-unions-states",
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
    project: ["ts-v9-workflow-project", "Mini-projet : workflow de publication", "Modélise brouillon, review, publié, rejeté et archivé sans combinaison impossible.", "PublicationWorkflow", ["status: 'draft'", "status: 'published'", "assertNever", "message"]],
    quiz: ["ts-v9-unions-quiz", "Quiz : unions", "typescript-unions"]
  },
  {
    id: "ts-v9-functions-generics",
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
    project: ["ts-v9-toolkit-project", "Mini-projet : toolkit de collections", "Crée groupBy, indexBy, uniqueBy et isDefined avec preuves de types.", "CollectionToolkit", ["groupBy", "indexBy", "extends", "value is"]],
    quiz: ["ts-v9-generics-quiz", "Quiz : génériques", "typescript-generics"]
  },
  {
    id: "ts-v9-boundaries",
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
    project: ["ts-v9-api-client-project", "Mini-projet : client API validé", "Charge des formations avec pagination, Result, guards et erreurs typées.", "SafeCatalogClient", ["unknown", "value is", "Promise<Result", "instanceof Error"]],
    quiz: ["ts-v9-boundaries-quiz", "Quiz : frontières externes validées", "typescript-boundaries"]
  },
  {
    id: "ts-v9-config-tooling",
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
    project: ["ts-v9-config-project", "Mini-projet : tsconfig de production", "Prépare une configuration stricte avec aliases, noUncheckedIndexedAccess et règles anti-any.", "ProductionTsconfig", ["strict", "noUncheckedIndexedAccess", "moduleResolution", "unknown"]],
    quiz: ["ts-v9-config-quiz", "Quiz : configuration", "typescript-config"]
  },
  {
    id: "ts-v9-migration-capstone",
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
    project: ["ts-v9-final-capstone", "Projet final : migration d'un tracker d'apprentissage", "Migre modèles, API, formulaires, état, tests et tsconfig vers un mode strict prouvé.", "LearningTrackerMigration", ["strict", "unknown", "value is", "expect", "MigrationDebt"], true],
    quiz: ["ts-v9-migration-quiz", "Quiz : migration stricte", "typescript-migration"]
  }
];

export const typescriptV9Modules = modules.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [...module.lessons.map((item, index) => lesson(module, item, index)), project(module.project, module), quiz(module.quiz)]
}));

function lesson(module, [slug, title, brief, solution, requirements], index) {
  return { id: `${module.id}-${slug}`, type: "typescript", title: [title, title], brief: [brief, `Practice: ${brief}`], solution, requirements, skills: [module.quiz[2], `ts-v9-${index + 1}`], vocabulary: module.vocabulary, durationMin: 30, xp: 36 };
}

function project([id, title, brief, symbol, requirements, finalProject = false], module) {
  return { id, project: true, exerciseType: "typescript", title: [title, title], brief: [brief, `Build and prove: ${brief}`], solution: `type ${symbol} = {\n  readonly id: string;\n  status: 'draft' | 'validated';\n  evidence: readonly string[];\n};\n\nexport function validate${symbol}(value: ${symbol}): boolean {\n  return value.evidence.length > 0;\n}`, requirements, skills: [module.quiz[2], "typescript-project", finalProject ? "capstone" : "module-project"], vocabulary: module.vocabulary, durationMin: finalProject ? 230 : 125, xp: finalProject ? 180 : 95 };
}

function quiz([id, title, skill]) {
  return { id, type: "quiz", title: [title, title], brief: ["Réponds avec l'œil d'une revue TypeScript stricte : moins de magie, plus de preuves.", "Answer with a strict TypeScript review mindset: less magic, more evidence."], purpose: "module-review", passingScore: 75, questions: [
    q(`${id}-1`, "Quelle décision améliore vraiment la sûreté ?", "Garder l'extérieur en unknown puis prouver sa forme", ["Ajouter any", "Caster avec as partout", "Désactiver strict"], skill),
    q(`${id}-2`, "Quel type évite le mieux un état impossible ?", "Une union discriminée reliée aux données valides", ["Un objet avec tout optionnel", "Un string libre", "Un commentaire"], skill),
    q(`${id}-3`, "Quand utiliser un générique ?", "Quand il conserve une relation utile entre valeurs", ["Pour faire plus professionnel", "Pour remplacer une validation runtime", "Pour cacher une erreur"], skill),
    q(`${id}-4`, "Quelle preuve accompagne une migration saine ?", "Compilation stricte, tests ciblés et dette documentée", ["Un renommage massif seul", "Une capture d'écran", "Une promesse orale"], skill),
    q(`${id}-5`, "Pourquoi limiter les assertions as ?", "Elles contournent le compilateur sans preuve runtime", ["Elles ralentissent toujours l'app", "Elles changent le HTML", "Elles empêchent les imports"], skill)
  ] };
}

function q(id, prompt, answer, distractors, skill) {
  return { id, type: "single", prompt: [prompt, prompt], choices: [answer, ...distractors].map((label) => ({ id: label, label: [label, label] })), answer, explanation: ["La réponse durable garde le contrat statique aligné avec les preuves runtime.", "A durable answer keeps the static contract aligned with runtime evidence."], points: 1, skills: [skill], glossaryTerms: [] };
}
