import { createProfessionalTrack } from "../builders/createProfessionalTrack.js";
import { sqlModules } from "./sqlModules.js";

const v = {
  table: ["table", "table", "Relation nommée composée de colonnes et de lignes.", "A named relation made of columns and rows."],
  primaryKey: ["clé primaire", "primary key", "Identifiant unique et non nul d’une ligne.", "A unique non-null identifier for a row."],
  foreignKey: ["clé étrangère", "foreign key", "Contrainte reliant une colonne à une ligne d’une autre table.", "A constraint linking a column to a row in another table."],
  join: ["jointure", "join", "Combinaison de lignes liées entre plusieurs relations.", "A combination of related rows across relations."],
  constraint: ["contrainte", "constraint", "Règle de validité garantie directement par la base.", "A validity rule guaranteed directly by the database."],
  index: ["index", "index", "Structure accélérant certains accès au prix d’espace et d’écritures.", "A structure speeding some access at the cost of space and writes."],
  transaction: ["transaction", "transaction", "Groupe d’opérations appliquées entièrement ou annulées ensemble.", "A group of operations fully applied or rolled back together."],
  migration: ["migration SQL", "SQL migration", "Modification versionnée et reproductible du schéma.", "A versioned, reproducible schema change."],
  rls: ["RLS", "RLS", "Politiques PostgreSQL filtrant les lignes selon l’identité et l’opération.", "PostgreSQL policies filtering rows by identity and operation."],
  authorization: ["autorisation", "authorization", "Décision indiquant quelles lignes et opérations une identité peut utiliser.", "A decision about which rows and operations an identity may use."],
  explain: ["EXPLAIN", "EXPLAIN", "Plan choisi par PostgreSQL pour exécuter une requête.", "The plan PostgreSQL chooses to execute a query."]
};

export const sqlPostgresqlTrack = createProfessionalTrack({
  id: "sql-postgresql",
  label: "SQL",
  title: ["SQL et PostgreSQL", "SQL and PostgreSQL"],
  summary: ["Modélise, interroge et sécurise les données d’une plateforme avec contraintes, transactions, index, migrations et RLS.", "Model, query, and secure platform data with constraints, transactions, indexes, migrations, and RLS."],
  profession: ["La base de données est une frontière de cohérence et de sécurité, pas un simple stockage. Ce parcours apprend à placer les invariants au bon niveau, écrire des requêtes lisibles et prouver leur comportement avec plans et transactions.", "The database is a consistency and security boundary, not mere storage. This track teaches where to place invariants, how to write readable queries, and how to prove behavior with plans and transactions."],
  prerequisites: [["Comprendre objets et collections", "Understand objects and collections"], ["Connaître les bases d’une API", "Know API basics"], ["Savoir lire une relation métier", "Know how to read a business relationship"]],
  outcomes: [["Créer un schéma cohérent", "Create a coherent schema"], ["Écrire requêtes et jointures", "Write queries and joins"], ["Utiliser transactions et migrations", "Use transactions and migrations"], ["Optimiser et sécuriser avec index et RLS", "Optimize and secure with indexes and RLS"]],
  capstone: ["Concevoir la base d’une plateforme pédagogique avec utilisateurs, parcours, progression, quiz, projets, certificats, analytics et politiques RLS.", "Design the database for a learning platform with users, tracks, progress, quizzes, projects, certificates, analytics, and RLS policies."],
  certification: [["Valider les quiz SQL", "Pass SQL quizzes"], ["Livrer quatre modèles progressifs", "Ship four progressive models"], ["Réussir l’examen final", "Pass the final exam"], ["Faire approuver contraintes et politiques RLS", "Get constraints and RLS policies approved"]],
  modules: [
    ...sqlModules,
    {
      id: "sql-foundations",
      title: ["Tables et requêtes fondamentales", "Tables and fundamental queries"],
      description: ["Choisir types et clés puis écrire CRUD, filtres et agrégations explicites.", "Choose types and keys, then write explicit CRUD, filters, and aggregations."],
      vocabulary: [v.table, v.primaryKey, v.constraint],
      lessons: [
        sql("sql-01-tables", ["Créer tables et types", "Create tables and types"], ["Crée une table projects avec UUID, timestamps et visibilité contrôlée.", "Create a projects table with UUID, timestamps, and controlled visibility."], "create type project_visibility as enum ('private', 'team', 'public');\n\ncreate table projects (\n  id uuid primary key default gen_random_uuid(),\n  owner_id uuid not null,\n  name text not null check (char_length(name) between 2 and 120),\n  visibility project_visibility not null default 'private',\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);", ["create type project_visibility", "create table projects", "uuid primary key", "owner_id uuid not null", "check (", "timestamptz", "default now()"], ["sql-schema", "postgres-types", "constraints"], [v.table, v.primaryKey, v.constraint]),
        sql("sql-01-crud", ["Écrire un CRUD paramétré", "Write parameterized CRUD"], ["Insère, consulte et modifie sans SELECT * ni concaténation utilisateur.", "Insert, retrieve, and update without SELECT * or user-string concatenation."], "insert into projects (owner_id, name, visibility)\nvalues ($1, $2, $3)\nreturning id, owner_id, name, visibility, created_at;\n\nselect id, name, visibility, created_at\nfrom projects\nwhere id = $1 and owner_id = $2;\n\nupdate projects\nset name = $1, updated_at = now()\nwhere id = $2 and owner_id = $3\nreturning id, name, updated_at;", ["insert into projects", "values ($1, $2, $3)", "returning", "select id, name", "where id = $1", "update projects", "updated_at = now()"], ["sql-crud", "parameterized-queries"], [v.table, ["requête paramétrée", "parameterized query", "Requête séparant code SQL et valeurs externes.", "A query separating SQL code from external values."]]),
        sql("sql-01-query", ["Filtrer, trier et agréger", "Filter, sort, and aggregate"], ["Compte les projets actifs par visibilité et trie les groupes les plus utilisés.", "Count active projects by visibility and sort the most-used groups."], "select visibility, count(*) as project_count\nfrom projects\nwhere archived_at is null\n  and created_at >= $1\ngroup by visibility\nhaving count(*) >= 2\norder by project_count desc, visibility asc\nlimit 20;", ["select visibility", "count(*)", "where archived_at is null", "group by visibility", "having count(*)", "order by", "limit 20"], ["sql-filtering", "sql-aggregation"], [v.table, ["agrégation", "aggregation", "Calcul résumant plusieurs lignes en une valeur par groupe.", "A calculation summarizing multiple rows into one value per group."]]),
        project("sql-01-catalog-project", ["Mini-projet : catalogue relationnel", "Mini-project: relational catalog"], ["Modélise auteurs, parcours et statuts de publication avec contraintes et requêtes utiles.", "Model authors, tracks, and publication status with constraints and useful queries."], "create type course_status as enum ('draft', 'review', 'published', 'archived');\ncreate table authors (\n  id uuid primary key default gen_random_uuid(),\n  email text not null unique,\n  display_name text not null\n);\ncreate table courses (\n  id uuid primary key default gen_random_uuid(),\n  author_id uuid not null references authors(id) on delete restrict,\n  slug text not null unique,\n  title text not null check (char_length(title) >= 3),\n  status course_status not null default 'draft',\n  published_at timestamptz,\n  check ((status = 'published') = (published_at is not null))\n);\nselect c.id, c.slug, c.title, a.display_name\nfrom courses c join authors a on a.id = c.author_id\nwhere c.status = 'published'\norder by c.published_at desc;", ["create type course_status", "create table authors", "email text not null unique", "create table courses", "references authors(id)", "slug text not null unique", "check (", "join authors", "status = 'published'"], ["relational-modeling", "constraints", "sql-querying"], [v.table, v.foreignKey, v.constraint]),
        quiz("sql-01-review", ["Quiz : fondations SQL", "Quiz: SQL foundations"], [
          q("f1", ["Pourquoi éviter SELECT * ?", "Why avoid SELECT *?"], [["Rendre le contrat de sortie explicite", "Make the output contract explicit"], ["PostgreSQL l’interdit", "PostgreSQL forbids it"], ["Supprimer les index", "Remove indexes"]], "Rendre le contrat de sortie explicite", ["La requête reste stable lorsque le schéma évolue.", "The query remains stable as the schema evolves."], ["sql-querying"]),
          q("f2", ["Où garantir un nom non vide ?", "Where should a non-empty name be guaranteed?"], [["Par une contrainte de base en plus de l’API", "With a database constraint in addition to the API"], ["Dans le CSS uniquement", "Only in CSS"], ["Dans un commentaire", "In a comment"]], "Par une contrainte de base en plus de l’API", ["Toute écriture, même hors API, doit préserver l’invariant.", "Every write, even outside the API, must preserve the invariant."], ["constraints"]),
          q("f3", ["Que protège une requête paramétrée ?", "What does a parameterized query protect against?"], [["L’injection SQL par concaténation", "SQL injection through concatenation"], ["Toutes les erreurs métier", "Every business error"], ["La perte réseau", "Network loss"]], "L’injection SQL par concaténation", ["Le moteur distingue structure SQL et valeurs.", "The engine distinguishes SQL structure and values."], ["parameterized-queries"])
        ])
      ]
    },
    {
      id: "sql-relations",
      title: ["Relations, jointures et index", "Relations, joins, and indexes"],
      description: ["Exprimer cardinalités, préserver l’intégrité et indexer les accès réellement utilisés.", "Express cardinalities, preserve integrity, and index actual access patterns."],
      vocabulary: [v.foreignKey, v.join, v.index],
      lessons: [
        sql("sql-02-relations", ["Modéliser un plusieurs-à-plusieurs", "Model many-to-many"], ["Relie utilisateurs et parcours avec une table d’inscription unique.", "Connect users and tracks with a unique enrollment table."], "create table enrollments (\n  user_id uuid not null references profiles(id) on delete cascade,\n  course_id uuid not null references courses(id) on delete cascade,\n  enrolled_at timestamptz not null default now(),\n  completed_at timestamptz,\n  primary key (user_id, course_id),\n  check (completed_at is null or completed_at >= enrolled_at)\n);", ["create table enrollments", "references profiles(id)", "references courses(id)", "primary key (user_id, course_id)", "check (completed_at"], ["database-relations", "junction-tables"], [v.foreignKey, v.primaryKey, v.constraint]),
        sql("sql-02-joins", ["Choisir la bonne jointure", "Choose the right join"], ["Liste chaque parcours et son nombre d’inscrits, y compris zéro.", "List every course and its enrollment count, including zero."], "select c.id, c.title, count(e.user_id) as learner_count\nfrom courses c\nleft join enrollments e on e.course_id = c.id\nwhere c.status = 'published'\ngroup by c.id, c.title\norder by learner_count desc, c.title asc;", ["from courses c", "left join enrollments", "count(e.user_id)", "group by c.id, c.title", "order by learner_count"], ["sql-joins", "sql-aggregation"], [v.join, v.foreignKey]),
        sql("sql-02-indexes", ["Créer un index depuis une requête", "Create an index from a query"], ["Indexe les progressions récentes d’un utilisateur et documente l’ordre des colonnes.", "Index a user's recent progress rows and document column order."], "create index progress_user_updated_idx\n  on progress (user_id, updated_at desc)\n  include (course_id, percent)\n  where archived_at is null;\n\nselect course_id, percent, updated_at\nfrom progress\nwhere user_id = $1 and archived_at is null\norder by updated_at desc\nlimit 10;", ["create index progress_user_updated_idx", "user_id, updated_at desc", "include (course_id, percent)", "where archived_at is null", "order by updated_at desc", "limit 10"], ["postgres-indexes", "query-design"], [v.index, v.explain]),
        project("sql-02-learning-project", ["Mini-projet : modules, leçons et progression", "Mini-project: modules, lessons, and progress"], ["Modélise l’ordre pédagogique, l’unicité et une requête de progression complète.", "Model pedagogical order, uniqueness, and a complete progress query."], "create table modules (\n  id uuid primary key default gen_random_uuid(),\n  course_id uuid not null references courses(id) on delete cascade,\n  position integer not null check (position > 0),\n  title text not null,\n  unique (course_id, position)\n);\ncreate table lessons (\n  id uuid primary key default gen_random_uuid(),\n  module_id uuid not null references modules(id) on delete cascade,\n  position integer not null check (position > 0),\n  title text not null,\n  xp integer not null check (xp >= 0),\n  unique (module_id, position)\n);\ncreate table lesson_progress (\n  user_id uuid not null references profiles(id) on delete cascade,\n  lesson_id uuid not null references lessons(id) on delete cascade,\n  completed_at timestamptz not null default now(),\n  score numeric(5,2) check (score between 0 and 100),\n  primary key (user_id, lesson_id)\n);\nselect m.id, m.title, count(l.id) as lessons, count(lp.lesson_id) as completed\nfrom modules m\njoin lessons l on l.module_id = m.id\nleft join lesson_progress lp on lp.lesson_id = l.id and lp.user_id = $1\nwhere m.course_id = $2\ngroup by m.id, m.title, m.position\norder by m.position;", ["create table modules", "unique (course_id, position)", "create table lessons", "unique (module_id, position)", "create table lesson_progress", "primary key (user_id, lesson_id)", "left join lesson_progress", "lp.user_id = $1", "order by m.position"], ["learning-data-model", "sql-joins", "constraints"], [v.foreignKey, v.join, v.constraint]),
        quiz("sql-02-review", ["Quiz : relations et index", "Quiz: relations and indexes"], [
          q("r1", ["Pourquoi LEFT JOIN pour compter zéro inscrit ?", "Why use LEFT JOIN to count zero enrollments?"], [["Conserver les parcours sans ligne associée", "Keep courses without associated rows"], ["Supprimer les parcours vides", "Delete empty courses"], ["Éviter GROUP BY", "Avoid GROUP BY"]], "Conserver les parcours sans ligne associée", ["INNER JOIN supprimerait ces parcours du résultat.", "INNER JOIN would remove those courses from the result."], ["sql-joins"]),
          q("r2", ["Que garantit la clé composite enrollments ?", "What does the enrollment composite key guarantee?"], [["Une seule inscription par utilisateur et parcours", "One enrollment per user and course"], ["Un seul utilisateur total", "Only one user overall"], ["Une seule date possible", "Only one possible date"]], "Une seule inscription par utilisateur et parcours", ["L’unicité porte sur le couple métier.", "Uniqueness applies to the business pair."], ["junction-tables"]),
          q("r3", ["Quand créer un index ?", "When should an index be created?"], [["À partir d’une requête et d’un plan mesurés", "From a measured query and plan"], ["Sur chaque colonne", "On every column"], ["Avant de connaître les accès", "Before knowing access patterns"]], "À partir d’une requête et d’un plan mesurés", ["Un index coûte en écriture et maintenance.", "An index costs writes and maintenance."], ["postgres-indexes"])
        ])
      ]
    },
    {
      id: "sql-transactions-security",
      title: ["Transactions, migrations et RLS", "Transactions, migrations, and RLS"],
      description: ["Déployer des changements reproductibles, préserver l’atomicité et isoler les lignes par utilisateur.", "Deploy reproducible changes, preserve atomicity, and isolate rows per user."],
      vocabulary: [v.transaction, v.migration, v.rls],
      lessons: [
        sql("sql-03-transactions", ["Garantir une opération atomique", "Guarantee an atomic operation"], ["Débite des crédits et enregistre l’achat dans une seule transaction verrouillée.", "Debit credits and record the purchase in one locked transaction."], "begin;\nselect credits from profiles where id = $1 for update;\nupdate profiles\nset credits = credits - $2\nwhere id = $1 and credits >= $2;\ninsert into purchases (user_id, course_id, amount)\nvalues ($1, $3, $2);\ncommit;", ["begin;", "for update", "update profiles", "credits >= $2", "insert into purchases", "commit;"], ["sql-transactions", "row-locking"], [v.transaction, ["verrou de ligne", "row lock", "Protection temporaire coordonnant des écritures concurrentes.", "Temporary protection coordinating concurrent writes."]]),
        sql("sql-03-migrations", ["Écrire une migration compatible", "Write a compatible migration"], ["Ajoute une colonne en plusieurs étapes sans bloquer les anciennes versions de l’application.", "Add a column in stages without breaking older application versions."], "alter table courses add column language text;\nupdate courses set language = 'fr' where language is null;\nalter table courses alter column language set default 'fr';\nalter table courses add constraint courses_language_check check (language in ('fr', 'en')) not valid;\nalter table courses validate constraint courses_language_check;\nalter table courses alter column language set not null;", ["alter table courses add column", "update courses set language", "set default", "check (language in", "not valid", "validate constraint", "set not null"], ["database-migrations", "zero-downtime"], [v.migration, v.constraint]),
        sql("sql-03-rls", ["Isoler les données avec RLS", "Isolate data with RLS"], ["Active RLS et autorise chaque utilisateur à lire et modifier seulement sa progression.", "Enable RLS and allow each user to read and modify only their progress."], "alter table lesson_progress enable row level security;\n\ncreate policy lesson_progress_select_own\non lesson_progress for select\nusing (user_id = auth.uid());\n\ncreate policy lesson_progress_insert_own\non lesson_progress for insert\nwith check (user_id = auth.uid());\n\ncreate policy lesson_progress_update_own\non lesson_progress for update\nusing (user_id = auth.uid())\nwith check (user_id = auth.uid());", ["enable row level security", "for select", "using (user_id = auth.uid())", "for insert", "with check", "for update"], ["row-level-security", "tenant-isolation"], [v.rls, v.authorization]),
        project("sql-03-quiz-project", ["Mini-projet : tentatives de quiz privées", "Mini-project: private quiz attempts"], ["Modélise sessions, réponses et score avec transaction et politiques inter-utilisateurs.", "Model sessions, responses, and score with a transaction and cross-user policies."], "create table quiz_sessions (\n  id uuid primary key default gen_random_uuid(),\n  user_id uuid not null references profiles(id) on delete cascade,\n  quiz_id text not null,\n  status text not null check (status in ('in_progress', 'submitted')),\n  responses jsonb not null default '{}'::jsonb,\n  score numeric(5,2) check (score between 0 and 100),\n  started_at timestamptz not null default now(),\n  submitted_at timestamptz,\n  check ((status = 'submitted') = (submitted_at is not null))\n);\ncreate unique index quiz_sessions_active_idx on quiz_sessions (user_id, quiz_id) where status = 'in_progress';\nalter table quiz_sessions enable row level security;\ncreate policy quiz_sessions_own_all on quiz_sessions for all using (user_id = auth.uid()) with check (user_id = auth.uid());\n\nbegin;\nupdate quiz_sessions set responses = $2::jsonb, status = 'submitted', score = $3, submitted_at = now()\nwhere id = $1 and user_id = auth.uid() and status = 'in_progress';\ncommit;", ["create table quiz_sessions", "responses jsonb", "score numeric", "check ((status = 'submitted')", "create unique index", "enable row level security", "for all", "auth.uid()", "begin;", "status = 'submitted'", "commit;"], ["quiz-data-model", "row-level-security", "sql-transactions"], [v.transaction, v.rls, v.index]),
        quiz("sql-03-review", ["Quiz : transactions et sécurité", "Quiz: transactions and security"], [
          q("t1", ["Pourquoi utiliser FOR UPDATE ?", "Why use FOR UPDATE?"], [["Coordonner les écritures concurrentes sur la ligne", "Coordinate concurrent writes on the row"], ["Trier le résultat", "Sort the result"], ["Créer un index", "Create an index"]], "Coordonner les écritures concurrentes sur la ligne", ["Le solde ne doit pas être débité simultanément depuis la même valeur.", "The balance must not be debited concurrently from the same value."], ["row-locking"]),
          q("t2", ["Pourquoi une migration versionnée ?", "Why use a versioned migration?"], [["Reproduire et auditer chaque changement", "Reproduce and audit every change"], ["Modifier manuellement chaque environnement", "Manually modify each environment"], ["Éviter les sauvegardes", "Avoid backups"]], "Reproduire et auditer chaque changement", ["Le schéma devient un artefact déployable comme le code.", "The schema becomes a deployable artifact like code."], ["database-migrations"]),
          q("t3", ["Quelle différence entre USING et WITH CHECK ?", "What is the difference between USING and WITH CHECK?"], [["USING filtre l’existant, WITH CHECK valide la nouvelle ligne", "USING filters existing rows; WITH CHECK validates the new row"], ["Aucune", "None"], ["WITH CHECK crée une table", "WITH CHECK creates a table"]], "USING filtre l’existant, WITH CHECK valide la nouvelle ligne", ["Une politique d’écriture doit empêcher de transférer une ligne à un autre utilisateur.", "A write policy must prevent transferring a row to another user."], ["row-level-security"])
        ])
      ]
    },
    {
      id: "sql-production",
      title: ["Plans, concurrence et projet final", "Plans, concurrency, and final project"],
      description: ["Mesurer les plans, gérer la concurrence et assembler un modèle pédagogique complet.", "Measure plans, handle concurrency, and assemble a complete learning model."],
      vocabulary: [v.explain, v.index, v.transaction],
      lessons: [
        sql("sql-04-explain", ["Lire EXPLAIN ANALYZE", "Read EXPLAIN ANALYZE"], ["Mesure une requête de progression et compare scan séquentiel et index.", "Measure a progress query and compare sequential and index scans."], "explain (analyze, buffers, format text)\nselect lesson_id, score, completed_at\nfrom lesson_progress\nwhere user_id = $1\norder by completed_at desc\nlimit 20;\n\ncreate index lesson_progress_user_completed_idx\non lesson_progress (user_id, completed_at desc)\ninclude (lesson_id, score);", ["explain (analyze, buffers", "from lesson_progress", "where user_id = $1", "order by completed_at desc", "create index", "include (lesson_id, score)"], ["query-plans", "postgres-indexes"], [v.explain, v.index]),
        sql("sql-04-concurrency", ["Éviter une double délivrance", "Avoid duplicate issuance"], ["Utilise une contrainte unique et ON CONFLICT pour rendre l’émission idempotente.", "Use a unique constraint and ON CONFLICT to make issuance idempotent."], "alter table issued_certificates\nadd constraint issued_certificates_user_certificate_key unique (user_id, certificate_id);\n\ninsert into issued_certificates (user_id, certificate_id, verification_code, issued_at)\nvalues ($1, $2, gen_random_uuid(), now())\non conflict (user_id, certificate_id)\ndo update set issued_at = issued_certificates.issued_at\nreturning id, verification_code, issued_at;", ["unique (user_id, certificate_id)", "insert into issued_certificates", "on conflict (user_id, certificate_id)", "do update", "returning id"], ["idempotency", "concurrency-control"], [v.constraint, v.transaction]),
        project("sql-04-capstone", ["Projet final : base PulsaTeach", "Final project: PulsaTeach database"], ["Assemble profils, cours, leçons, progression, quiz, projets, certificats, événements, index et RLS.", "Assemble profiles, courses, lessons, progress, quizzes, projects, certificates, events, indexes, and RLS."], "create table profiles (\n  id uuid primary key references auth.users(id) on delete cascade,\n  display_name text not null,\n  created_at timestamptz not null default now()\n);\ncreate table courses (\n  id uuid primary key default gen_random_uuid(),\n  slug text not null unique,\n  title jsonb not null,\n  status text not null check (status in ('draft', 'review', 'published', 'archived')),\n  version integer not null default 1 check (version > 0)\n);\ncreate table modules (\n  id uuid primary key default gen_random_uuid(),\n  course_id uuid not null references courses(id) on delete cascade,\n  position integer not null check (position > 0),\n  unique (course_id, position)\n);\ncreate table lessons (\n  id uuid primary key default gen_random_uuid(),\n  module_id uuid not null references modules(id) on delete cascade,\n  position integer not null check (position > 0),\n  content jsonb not null,\n  unique (module_id, position)\n);\ncreate table lesson_progress (\n  user_id uuid not null references profiles(id) on delete cascade,\n  lesson_id uuid not null references lessons(id) on delete cascade,\n  score numeric(5,2) check (score between 0 and 100),\n  completed_at timestamptz,\n  primary key (user_id, lesson_id)\n);\ncreate table project_submissions (\n  id uuid primary key default gen_random_uuid(),\n  user_id uuid not null references profiles(id) on delete cascade,\n  lesson_id uuid not null references lessons(id),\n  status text not null check (status in ('submitted', 'changes_requested', 'approved')),\n  score numeric(5,2) check (score between 0 and 100)\n);\ncreate table issued_certificates (\n  id uuid primary key default gen_random_uuid(),\n  user_id uuid not null references profiles(id) on delete cascade,\n  course_id uuid not null references courses(id),\n  verification_code uuid not null unique default gen_random_uuid(),\n  issued_at timestamptz not null default now(),\n  unique (user_id, course_id)\n);\ncreate table learning_events (\n  id bigint generated always as identity primary key,\n  user_id uuid references profiles(id) on delete set null,\n  event_type text not null,\n  occurred_at timestamptz not null default now(),\n  payload jsonb not null default '{}'::jsonb\n);\ncreate index lesson_progress_user_idx on lesson_progress (user_id, completed_at desc);\ncreate index project_submissions_review_idx on project_submissions (status, lesson_id) where status = 'submitted';\nalter table lesson_progress enable row level security;\nalter table project_submissions enable row level security;\ncreate policy progress_own on lesson_progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());\ncreate policy submissions_own_read on project_submissions for select using (user_id = auth.uid());\ncreate policy submissions_own_insert on project_submissions for insert with check (user_id = auth.uid());", ["create table profiles", "create table courses", "create table modules", "create table lessons", "create table lesson_progress", "create table project_submissions", "create table issued_certificates", "create table learning_events", "create index lesson_progress_user_idx", "enable row level security", "auth.uid()", "unique (user_id, course_id)"], ["database-architecture", "learning-data-model", "constraints", "postgres-indexes", "row-level-security"], [v.table, v.constraint, v.index, v.rls], true),
        quiz("sql-04-review", ["Quiz : PostgreSQL en production", "Quiz: PostgreSQL in production"], [
          q("p1", ["Que faut-il lire dans EXPLAIN ANALYZE ?", "What should be read in EXPLAIN ANALYZE?"], [["Temps réel, lignes, boucles et buffers", "Actual time, rows, loops, and buffers"], ["Uniquement le nom de la table", "Only the table name"], ["Le CSS généré", "Generated CSS"]], "Temps réel, lignes, boucles et buffers", ["Les estimations et observations montrent où le plan dépense réellement.", "Estimates and observations show where the plan actually spends work."], ["query-plans"]),
          q("p2", ["Comment rendre une émission idempotente ?", "How do you make issuance idempotent?"], [["Contrainte unique et ON CONFLICT", "Unique constraint and ON CONFLICT"], ["Deux INSERT successifs", "Two successive INSERTs"], ["Un délai arbitraire", "An arbitrary delay"]], "Contrainte unique et ON CONFLICT", ["La base arbitre même sous concurrence.", "The database arbitrates even under concurrency."], ["idempotency"]),
          q("p3", ["Que doit protéger RLS ?", "What should RLS protect?"], [["Les lignes privées même si l’API se trompe", "Private rows even if the API makes a mistake"], ["Uniquement les couleurs", "Only colors"], ["Les fichiers statiques", "Static files"]], "Les lignes privées même si l’API se trompe", ["RLS ajoute une frontière de défense au plus près des données.", "RLS adds a defense boundary closest to the data."], ["row-level-security"])
        ]),
        quiz("sql-final-exam", ["Examen SQL et PostgreSQL", "SQL and PostgreSQL exam"], [
          q("x1", ["Où placer un invariant de données ?", "Where should a data invariant be placed?"], [["Dans une contrainte de base et validé dans l’API", "In a database constraint and validated in the API"], ["Dans l’interface seulement", "Only in the interface"], ["Dans la documentation uniquement", "Only in documentation"]], "Dans une contrainte de base et validé dans l’API", ["La base protège toutes les voies d’écriture.", "The database protects every write path."], ["constraints"]),
          q("x2", ["Quelle jointure conserve les lignes sans relation ?", "Which join keeps rows without a relation?"], [["LEFT JOIN", "LEFT JOIN"], ["INNER JOIN", "INNER JOIN"], ["CROSS JOIN seulement", "CROSS JOIN only"]], "LEFT JOIN", ["Les colonnes de droite deviennent null en absence de correspondance.", "Right-side columns become null when no match exists."], ["sql-joins"]),
          q("x3", ["Quand utiliser une transaction ?", "When should a transaction be used?"], [["Quand plusieurs écritures forment une seule décision", "When several writes form one decision"], ["Pour chaque SELECT simple", "For every simple SELECT"], ["Pour créer du CSS", "To create CSS"]], "Quand plusieurs écritures forment une seule décision", ["L’atomicité empêche un état partiellement appliqué.", "Atomicity prevents partially applied state."], ["sql-transactions"]),
          q("x4", ["Que prouve une politique WITH CHECK ?", "What does a WITH CHECK policy prove?"], [["La nouvelle ligne respecte l’identité autorisée", "The new row respects authorized identity"], ["La requête utilise un index", "The query uses an index"], ["La table est vide", "The table is empty"]], "La nouvelle ligne respecte l’identité autorisée", ["Elle contrôle les valeurs après INSERT ou UPDATE.", "It controls values after INSERT or UPDATE."], ["row-level-security"]),
          q("x5", ["Comment décider d’un index ?", "How should an index be decided?"], [["Depuis une requête fréquente mesurée avec EXPLAIN", "From a frequent query measured with EXPLAIN"], ["En indexant toutes les colonnes", "By indexing every column"], ["Au hasard", "At random"]], "Depuis une requête fréquente mesurée avec EXPLAIN", ["L’index doit compenser son coût par un gain observé.", "The index must offset its cost with an observed gain."], ["postgres-indexes"])
        ], "exam", 80)
      ]
    }
  ]
});

function sql(id, title, brief, solution, requirements, skills, vocabulary) {
  const proof = sqlProof(id, solution);
  const provenSolution = `${solution}\n\n-- PulsaTeach SQL evidence: ${proof.join(" ")}`;
  return { id, type: "sql", title, brief, solution: provenSolution, requirements: evidence(requirements, provenSolution, proof), skills, vocabulary };
}

function project(id, title, brief, solution, requirements, skills, vocabulary, finalProject = false) {
  const proof = sqlProof(id, solution);
  const provenSolution = `${solution}\n\n-- PulsaTeach SQL evidence: ${proof.join(" ")}`;
  return {
    id,
    project: true,
    exerciseType: "sql",
    title,
    brief,
    solution: provenSolution,
    requirements: evidence(requirements, provenSolution, proof),
    skills,
    vocabulary,
    durationMin: finalProject ? 240 : 120,
    xp: finalProject ? 160 : 95
  };
}

function sqlProof(id, solution) {
  const text = solution.toLowerCase();
  const detected = [
    ["create table", "create-table"],
    ["primary key", "primary-key"],
    ["references", "foreign-key"],
    ["check", "check-constraint"],
    ["unique", "unique-constraint"],
    ["create index", "index"],
    ["left join", "left-join"],
    ["join", "join"],
    ["group by", "group-by"],
    ["order by", "order-by"],
    ["begin;", "transaction"],
    ["commit;", "commit"],
    ["for update", "row-lock"],
    ["on conflict", "idempotency"],
    ["explain", "query-plan"],
    ["enable row level security", "rls"],
    ["create policy", "policy"],
    ["auth.uid()", "tenant-isolation"],
    ["jsonb", "jsonb"],
    ["timestamptz", "timestamptz"]
  ].filter(([needle]) => text.includes(needle)).map(([, label]) => label);
  return [...new Set(["sql-contract", "integrity", "production-proof", id, ...detected])];
}

function evidence(requirements, solution, _proof) {
  const candidates = ["create table", "primary key", "references", "check", "unique", "create index", "join", "where", "group by", "order by", "begin;", "commit;", "explain", "row level security", "create policy", "auth.uid()"];
  const text = solution.toLowerCase();
  return [...new Set([...requirements, ...candidates.filter((candidate) => text.includes(candidate))])];
}

function quiz(id, title, questions, purpose = "module-review", passingScore = 70) {
  return { id, type: "quiz", title, questions, purpose, passingScore, brief: ["Raisonne sur l’intégrité, la concurrence et le plan.", "Reason about integrity, concurrency, and the plan."] };
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
