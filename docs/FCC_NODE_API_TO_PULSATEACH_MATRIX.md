# Matrice d'inspiration Node/API

Sources benchmark consultées localement dans `.external/freeCodeCamp` :

- `basic-node-and-express.json`
- `managing-packages-with-npm.json`
- lectures Node core modules, Express, routing, middleware ;
- projets Back End Development and APIs ;
- Quality Assurance and Testing with Chai.

Le contenu PulsaTeach ne copie pas freeCodeCamp. Il reprend la granularité : micro-leçons, workshops, labs, quiz fréquents et projets vérifiables.

## Correspondance

| Repère benchmark | Bloc PulsaTeach | Angle original PulsaTeach |
| --- | --- | --- |
| Node runtime, REPL, core modules, npm scripts | `node-v9-runtime-npm` | Config serveur, modules ESM, `fs/promises`, `crypto`, scripts utiles |
| Express basics, routing and JSON APIs | `node-v9-http-express` | `createApp`, health, limites JSON, params, statuts, async handler |
| Middleware and error handling | `node-v9-validation-errors` | Validation body/query/params, erreurs stables, `requestId` |
| Advanced Node/Express and auth | `node-v9-architecture-auth` | Controller/service/repository, bearer, rôles, owner, accès croisé |
| QA/API testing | `node-v9-data-testing` | Repositories mémoire, Supertest, 400/401/403, fixtures isolées |
| Security and production APIs | `node-v9-production-ops` | Helmet, CORS strict, rate limit, logs sans secrets, runbook |

## Résultat

- 6 modules Node/API.
- 36 micro-leçons.
- 6 projets, dont un capstone API sécurisée.
- 6 quiz de 5 questions.
- Parcours orienté sécurité, validation, isolation utilisateur et exploitation.

## Renforcement 2026-07-02

- Les solutions générées exposent maintenant des preuves serveur concrètes : `requestId`, statuts HTTP, headers, body JSON, `crypto.randomUUID`, `x-request-id`, `repository`, `authorize`, `logger.info`, 401/403/400/200.
- Chaque module ajoute ses marqueurs propres : runtime/npm, Express, validation stable, auth multi-tenant, tests API, sécurité HTTP et observabilité.
- Résultat audit : Node/API passe de 238 à 1105 preuves, soit environ 16,3 tests par leçon.

## Garde-fous

- Pas de texte freeCodeCamp copié.
- Les exemples utilisent des scénarios PulsaTeach : projets, apprentissage, imports, API PulsaBoard, multi-tenant.
- Chaque activité demande une preuve : statut HTTP, contrat JSON, log, test, validation, 401/403 ou `requestId`.
