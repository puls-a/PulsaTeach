const t = {
  psql: ["psql", "psql", "Client terminal interactif pour PostgreSQL.", "Interactive terminal client for PostgreSQL."],
  flag: ["flag CLI", "CLI flag", "Option passée à une commande pour en modifier le comportement.", "Option passed to a command to modify behavior."],
  script: ["script bash", "bash script", "Fichier exécutable automatisant des commandes.", "Executable file automating commands."],
  crud: ["CRUD", "CRUD", "Acronyme pour Create, Read, Update, Delete.", "Acronym for Create, Read, Update, Delete."],
  type: ["type PostgreSQL", "PostgreSQL type", "Règle stricte limitant la nature des données d'une colonne.", "Strict rule bounding the nature of column data."],
  window: ["fonction de fenêtrage", "window function", "Fonction effectuant un calcul sur un ensemble de lignes associées à la ligne courante.", "Function performing a calculation across a set of table rows related to the current row."],
  cte: ["CTE", "CTE", "Expression de table commune (WITH), simplifiant les requêtes complexes.", "Common Table Expression (WITH), simplifying complex queries."],
  normalize: ["normalisation", "normalization", "Organisation des données pour réduire la redondance et l'incohérence.", "Data organization to reduce redundancy and inconsistency."],
  role: ["rôle", "role", "Identité PostgreSQL pouvant posséder des objets et des privilèges.", "PostgreSQL identity that can own objects and privileges."],
  grant: ["GRANT", "GRANT", "Instruction SQL pour accorder des droits d'accès.", "SQL statement to grant access privileges."]
};

const blueprints = [
  {
    id: "sql-cli-psql",
    title: ["Terminal et fondamentaux psql", "Terminal and psql fundamentals"],
    description: ["Se connecter à PostgreSQL en ligne de commande, utiliser les variables et automatiser via bash.", "Connect to PostgreSQL from CLI, use variables, and automate via bash."],
    vocabulary: [t.psql, t.flag, t.script],
    lessons: [
      ["psql-connect", "Se connecter avec des flags", "Utilise -U et -d pour spécifier l'utilisateur et la base cible.", "connectDB", "psql -U freecodecamp -d postgres"],
      ["psql-meta", "Naviguer avec les méta-commandes", "Liste bases, tables et décris les schémas avec \\l, \\dt et \\d.", "describeTables", "\\d users"],
      ["psql-vars", "Interpoler des variables psql", "Utilise -v pour passer une valeur sans la hardcoder dans le script.", "usePsqlVars", "psql -v username='camper'"],
      ["bash-automation", "Automatiser un script psql", "Crée un bash script qui exécute un fichier SQL de façon répétable.", "runBashScript", "#!/bin/bash", "psql -f setup.sql"],
      ["csv-import", "Importer des données de test", "Utilise la commande \\copy pour charger un CSV massif.", "importCSV", "\\copy projects FROM 'data.csv' WITH CSV"],
      ["db-dump", "Sauvegarder avec pg_dump", "Exporte le schéma et les données d'une table avec pg_dump.", "backupTable", "pg_dump -t courses > courses.sql"]
    ],
    project: ["sql-psql-project", "Mini-projet : Bash et imports massifs", "Écris un script bash qui recrée la base, importe un fichier CSV avec psql et fait un dump.", "BashDbImporter", ["#!/bin/bash", "\\copy", "pg_dump", "DROP DATABASE"]],
    quiz: ["sql-psql-quiz", "Quiz : Terminal psql", "sql-psql"]
  },
  {
    id: "sql-crud-fundamentals",
    title: ["Syntaxe SQL et types robustes", "SQL syntax and robust types"],
    description: ["Sécuriser les insertions, exploiter les types avancés et gérer les dates sans erreur.", "Secure inserts, leverage advanced types, and handle dates safely."],
    vocabulary: [t.crud, t.type],
    lessons: [
      ["insert-returning", "Récupérer la ligne insérée", "Utilise RETURNING pour obtenir l'ID généré immédiatement.", "insertRow", "INSERT INTO", "RETURNING id"],
      ["upsert", "Gérer les doublons avec ON CONFLICT", "Mets à jour une ligne si elle existe déjà (upsert).", "upsertData", "ON CONFLICT (email)", "DO UPDATE SET"],
      ["type-jsonb", "Stocker des données souples", "Utilise JSONB pour des métadonnées optionnelles et indexables.", "jsonbColumn", "metadata JSONB", "->>"],
      ["type-timestamptz", "Gérer les fuseaux horaires", "Préfère TIMESTAMPTZ pour éviter les décalages inattendus.", "timestampTZ", "TIMESTAMPTZ", "DEFAULT NOW()"],
      ["type-enum", "Restreindre à des valeurs fixes", "Crée un type ENUM pour le statut d'un cours.", "enumStatus", "CREATE TYPE", "ENUM"],
      ["delete-cascade", "Supprimer proprement", "Comprends ON DELETE CASCADE vs RESTRICT pour nettoyer les orphelins.", "deleteSafe", "ON DELETE CASCADE", "RESTRICT"]
    ],
    project: ["sql-crud-project", "Mini-projet : Moteur CRUD sécurisé", "Modélise un catalogue avec Enum, Jsonb et une logique d'upsert robuste.", "CrudEngine", ["INSERT INTO", "ON CONFLICT", "JSONB", "RETURNING"]],
    quiz: ["sql-crud-quiz", "Quiz : SQL CRUD", "sql-crud"]
  },
  {
    id: "sql-advanced-queries",
    title: ["Requêtes analytiques et jointures complexes", "Analytic queries and complex joins"],
    description: ["Simplifier le code avec des CTE, utiliser les fonctions de fenêtrage et faire du reporting.", "Simplify code with CTEs, use window functions, and do reporting."],
    vocabulary: [t.cte, t.window],
    lessons: [
      ["cte-basic", "Clarifier avec WITH (CTE)", "Découpe une requête complexe en étapes nommées.", "useCte", "WITH recent_users AS", "SELECT * FROM recent_users"],
      ["window-rank", "Classer avec RANK()", "Utilise RANK() OVER() pour faire un leaderboard par catégorie.", "rankUsers", "RANK() OVER (PARTITION BY", "ORDER BY xp DESC)"],
      ["window-lag", "Comparer au mois précédent", "Utilise LAG() pour voir l'évolution des inscriptions.", "compareLag", "LAG(enrollments, 1)", "OVER (ORDER BY month)"],
      ["group-rollup", "Agréger avec ROLLUP", "Génère des sous-totaux automatiquement dans le résultat.", "rollupTotals", "GROUP BY ROLLUP", "COALESCE"],
      ["join-lateral", "Exécuter des sous-requêtes latérales", "Utilise LEFT JOIN LATERAL pour récupérer les 3 derniers projets de chaque utilisateur.", "lateralJoin", "LEFT JOIN LATERAL", "LIMIT 3"],
      ["explain-analyze", "Lire un plan d'exécution analytique", "Détecte si le tri de la fonction de fenêtrage coûte trop cher.", "explainWindow", "EXPLAIN ANALYZE", "WindowAgg"]
    ],
    project: ["sql-analytics-project", "Mini-projet : Dashboard Analytique", "Conçois une requête complexe qui combine CTE, ROLLUP et RANK() pour un rapport de croissance.", "GrowthDashboard", ["WITH", "RANK() OVER", "ROLLUP", "LEFT JOIN LATERAL"]],
    quiz: ["sql-analytics-quiz", "Quiz : Requêtes complexes", "sql-analytics"]
  },
  {
    id: "sql-modeling-normalization",
    title: ["Normalisation et conception de schéma", "Normalization and schema design"],
    description: ["Organiser la base pour éviter les anomalies de modification et la redondance.", "Organize the database to prevent modification anomalies and redundancy."],
    vocabulary: [t.normalize, ["clé étrangère composite", "composite foreign key", "Liaison utilisant plusieurs colonnes simultanément.", "Link using multiple columns simultaneously."]],
    lessons: [
      ["first-nf", "Première Forme Normale (1NF)", "Élimine les colonnes répétitives et garantis l'atomicité.", "normalize1nf", "CREATE TABLE", "PRIMARY KEY"],
      ["second-nf", "Deuxième Forme Normale (2NF)", "Sors les données qui ne dépendent que d'une partie de la clé composite.", "normalize2nf", "REFERENCES", "id uuid"],
      ["third-nf", "Troisième Forme Normale (3NF)", "Sépare les données qui dépendent d'autres colonnes non-clés.", "normalize3nf", "FOREIGN KEY", "UNIQUE"],
      ["composite-fk", "Gérer une clé étrangère composite", "Garantis l'intégrité quand une relation dépend de deux axes.", "compositeFk", "FOREIGN KEY (a, b)", "REFERENCES table(a, b)"],
      ["schema-migration", "Modifier un schéma en production", "Sépare les renommages de colonnes en étapes non-bloquantes.", "safeRename", "ADD COLUMN", "NOT VALID"],
      ["erd-design", "Traduire un besoin métier en ERD", "Identifie les tables de jonction pour les relations many-to-many.", "designErd", "CREATE TABLE junction", "ON DELETE CASCADE"]
    ],
    project: ["sql-modeling-project", "Mini-projet : Système d'inventaire mondial", "Passe un fichier plat jusqu'en 3NF et ajoute des contraintes composites.", "GlobalInventory", ["REFERENCES", "PRIMARY KEY (a, b)", "UNIQUE", "NOT NULL"]],
    quiz: ["sql-modeling-quiz", "Quiz : Normalisation", "sql-modeling"]
  },
  {
    id: "sql-roles-security",
    title: ["Rôles, Sécurité et Audit", "Roles, Security, and Auditing"],
    description: ["Protéger les données à la racine via le système de droits PostgreSQL natif.", "Protect data at the root via PostgreSQL native rights system."],
    vocabulary: [t.role, t.grant, ["fonction trigger", "trigger function", "Fonction appelée automatiquement lors d'un événement SQL.", "Function called automatically on an SQL event."]],
    lessons: [
      ["create-role", "Créer un rôle restrictif", "Crée un utilisateur sans pouvoir de connexion pour une API.", "createApiRole", "CREATE ROLE api_user", "NOLOGIN"],
      ["grant-revoke", "Accorder les moindres privilèges", "Limite le rôle aux SELECT et INSERT sur des tables précises.", "grantPrivileges", "GRANT SELECT ON users", "REVOKE ALL"],
      ["rls-policies", "Isoler par tenant avec RLS", "Force une clause WHERE automatique invisible pour l'API.", "rlsIsolation", "ENABLE ROW LEVEL SECURITY", "CREATE POLICY"],
      ["audit-trigger", "Créer un trigger d'audit", "Enregistre automatiquement l'ancien et le nouvel état dans un log.", "auditLog", "CREATE TRIGGER", "EXECUTE FUNCTION"],
      ["search-path", "Sécuriser le search_path", "Empêche l'escalade de privilèges en forçant le schéma cible.", "secureSearchPath", "SET search_path", "pg_catalog"],
      ["connection-limit", "Limiter les connexions", "Évite les DoS en restreignant les connexions par rôle.", "limitConn", "ALTER ROLE", "CONNECTION LIMIT"]
    ],
    project: ["sql-security-project", "Mini-projet : Espace de travail sécurisé", "Configure Rôles, RLS et Trigger d'audit pour des documents partagés.", "SecureWorkspace", ["CREATE ROLE", "GRANT", "CREATE POLICY", "CREATE TRIGGER"]],
    quiz: ["sql-security-quiz", "Quiz : Sécurité avancée", "sql-security"]
  }
];

export const sqlModules = blueprints.map((module) => ({
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

function lesson(module, [slug, titleFr, briefFr, component, first, second], index) {
  const id = `${module.id}-${slug}`;
  return {
    id,
    type: "sql",
    title: [titleFr, titleFr.replace("é", "e")],
    brief: [briefFr, `Learn to: ${briefFr}`],
    solution: `-- Requirement check\nSELECT 1;\n-- ${component}\n${first}\n${second}`,
    requirements: [first, second],
    skills: [module.quiz[2], `sql-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 20 + (index % 3) * 5,
    xp: 35
  };
}

function project([id, titleFr, briefFr, component, requirements], module) {
  return {
    id,
    project: true,
    exerciseType: "sql",
    title: [titleFr, titleFr.replace("Mini-projet", "Mini-project")],
    brief: [briefFr, `Build: ${briefFr}`],
    solution: `-- ${component} implementation\n${requirements.join("\n")}`,
    requirements,
    skills: [module.quiz[2], "sql-project"],
    vocabulary: module.vocabulary,
    durationMin: 120,
    xp: 90
  };
}

function quiz([id, titleFr, skill]) {
  return {
    id,
    type: "quiz",
    title: [titleFr, titleFr.replace("Quiz :", "Quiz:")],
    brief: ["Vérifie les concepts fondamentaux du module.", "Check fundamental module concepts."],
    purpose: "module-review",
    passingScore: 80,
    questions: [
      q(`${id}-1`, "Quel est le risque de ne pas utiliser ce concept ?", "Perte d'intégrité, d'isolation ou de maintenabilité.", ["Le CSS sera cassé", "Il n'y a pas de risque", "Une erreur de compilation React"], skill),
      q(`${id}-2`, "Comment prouver que la règle s'applique ?", "Via EXPLAIN ou en testant des requêtes invalides aux limites.", ["En regardant le code de l'API", "En demandant au navigateur", "En rechargeant la page"], skill),
      q(`${id}-3`, "Pourquoi privilégier la base de données pour cette responsabilité ?", "La base de données est la dernière frontière de vérité partagée.", ["Parce que le JS est lent", "Pour le SEO", "Pour des raisons de couleurs"], skill),
      q(`${id}-4`, "Dans quel cas cette approche est-elle excessive ?", "Pour une donnée jetable ou entièrement gérée en local côté client.", ["Pour des données financières", "Pour des identifiants", "Pour des transactions métier"], skill),
      q(`${id}-5`, "Que garantit un test de validation ici ?", "Que tout chemin d'accès (même sans API) respectera le contrat.", ["Que le client a cliqué", "Que l'écran est vert", "Que le serveur est lancé"], skill)
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
    explanation: ["La base de données protège la donnée indépendamment de l'application cliente.", "The database protects data independently of the client app."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}
