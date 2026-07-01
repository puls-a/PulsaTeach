# Matrice d'inspiration SQL / PostgreSQL

Sources benchmark consultées localement dans `.external/freeCodeCamp` :

- `relational-databases-v9.json`
- lectures SQL, bases relationnelles, Bash et scripts.

Le contenu PulsaTeach ne copie pas freeCodeCamp. Il reprend la granularité : micro-leçons, workshops, labs, quiz fréquents et projets vérifiables.

## Correspondance

| Repère benchmark | Bloc PulsaTeach | Angle original PulsaTeach |
| --- | --- | --- |
| Bash fundamentals & psql basics | `sql-cli-psql` | `psql`, variables, flags, imports CSV, dump et scripts répétables |
| Basic SQL / CRUD | `sql-crud-fundamentals` | `INSERT`, `RETURNING`, `ON CONFLICT`, JSONB, timestamps et enums |
| Advanced queries & joins | `sql-advanced-queries` | CTE, window functions, ROLLUP, LATERAL et `EXPLAIN ANALYZE` |
| Database design & normalization | `sql-modeling-normalization` | 1NF-3NF, clés composites, contraintes, migrations compatibles |
| Security & roles | `sql-roles-security` | rôles, `GRANT`/`REVOKE`, RLS, triggers d'audit |
| PostgreSQL production | modules avancés `sql-*` | transactions, index, RLS, plans, concurrence et capstone PulsaTeach |

## Résultat

- 9 modules SQL/PostgreSQL.
- 60 micro-leçons.
- 9 projets.
- 10 quiz dont examen final.
- Parcours orienté modélisation propre, requêtes analytiques, intégrité, performance et sécurité.

## Renforcement 2026-07-02

- Les leçons SQL ajoutent des preuves de requête et de revue : `SELECT`, `WHERE`, contraintes, intégrité, rollback-safe, `EXPLAIN`, `RLS`, policy.
- Les modules PostgreSQL avancés détectent les preuves réelles dans les solutions : `create table`, `primary key`, `foreign key`, `check`, `unique`, index, jointures, transactions, `ON CONFLICT`, `EXPLAIN`, RLS et `auth.uid()`.
- Résultat audit : SQL/PostgreSQL passe de 198 à 956 preuves, soit environ 15,9 tests par leçon.

## Garde-fous

- Pas de texte freeCodeCamp copié.
- Les exemples utilisent des scénarios PulsaTeach : projets, catalogue, progression, quiz, certificats, analytics, multi-tenant.
- Chaque activité demande une preuve : requête valide, contrainte, plan d'exécution, transaction, index ou politique RLS.
