# Matrice d'inspiration Node/API

Sources benchmark consultées localement dans `.external/freeCodeCamp` :

- `basic-node-and-express.json`
- `managing-packages-with-npm.json`
- `lecture-working-with-nodejs-and-event-driven-architecture.json`
- `lecture-working-with-node-core-modules.json`
- `lecture-working-with-express.json`
- `lecture-understanding-routing-in-express-js.json`
- `lecture-express-middleware.json`
- `back-end-development-and-apis-projects.json`
- `quality-assurance-and-testing-with-chai.json`

Le contenu PulsaTeach ne copie pas freeCodeCamp. Il reprend la granularité :
micro-leçons, workshops, labs, quiz fréquents et projets vérifiables.

| Repère benchmark | Bloc PulsaTeach ajouté | Angle original PulsaTeach |
| --- | --- | --- |
| Node runtime, REPL, core modules, npm scripts | `node-v9-runtime-npm` | Config serveur, modules ESM, fs/promises, crypto, scripts utiles |
| Express basics, routing and JSON APIs | `node-v9-http-express` | `createApp`, health, limites JSON, params, statuts, async handler |
| Middleware and error handling | `node-v9-validation-errors` | Validation body/query/params, erreurs stables, requestId |
| Advanced Node/Express and auth | `node-v9-architecture-auth` | Controller/service/repository, bearer, rôles, owner, accès croisé |
| QA/API testing | `node-v9-data-testing` | Repositories mémoire, Supertest, 400/401/403, fixtures isolées |
| Security and production APIs | `node-v9-production-ops` | Helmet, CORS strict, rate limit, logs sans secrets, runbook |

## Résultat

- 6 nouveaux modules Node/API.
- 36 micro-leçons.
- 6 projets, dont un capstone API sécurisée.
- 6 quiz de 5 questions.
- Parcours orienté sécurité, validation, isolation utilisateur et exploitation.

## Garde-fous

- Pas de texte freeCodeCamp copié.
- Les exemples utilisent des scénarios PulsaTeach : projets, apprentissage,
  imports, API PulsaBoard, multi-tenant.
- Chaque activité demande une preuve : statut HTTP, contrat JSON, log, test,
  validation, 401/403 ou requestId.
