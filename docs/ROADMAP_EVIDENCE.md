# Matrice de conformité PulsaTeach

État vérifié le 21 juin 2026 sur la branche `codex/platform-roadmap-release`.

| Phase | État | Preuves principales | Reste à faire |
| --- | --- | --- | --- |
| 0 — Sécurité | Conforme localement | `server/security.js`, `server/auth.js`, `server/validation.js`, `tests/api/security.test.js`, démarrage production strict | Rejouer les contrôles avec la base Supabase de production |
| 1 — Tests | Conforme localement | Vitest, React Testing Library, Supertest, Playwright, axe; `tests/unit`, `tests/components`, `tests/api`, `tests/e2e` | Exécuter les scénarios Supabase réels non disponibles sans secrets |
| 2 — Architecture | Partiel | repositories JSON/Supabase, services de quiz/workflow, features lazy-loadées, catalogue par parcours | `server/index.js`, `InteractiveLearning.jsx` et `learningContent.js` restent au-dessus de la cible indicative de 500 lignes |
| 3 — UX responsive | Conforme localement | catalogue, dashboard, lab, navigation clavier; `responsive.spec.js`, `accessibility.spec.js` | Audit lecteur d’écran humain à répéter avant chaque release majeure |
| 4 — Quiz | Conforme | `quizEngine.js`, sessions privées, reprise, scoring, randomisation, examens et révisions; tests unitaires/API/E2E | — |
| 5 — Vocabulaire | Conforme | index canonique, recherche/filtres/URLs/favoris/révision; `audit-glossary.mjs` | — |
| 6 — HTML/CSS/JS | Conforme | quiz, projets, examens, rubrics, certificats, audits pédagogiques | Traduire progressivement les enrichissements spécialisés encore couverts par le fallback français |
| 7 — Nouveaux parcours | Conforme | Git, accessibilité, testing, TypeScript, React, Node/API, SQL, sécurité, performance, DevOps | — |
| 8 — Compétences | Conforme | progression, mastery, preuves et révisions espacées; `skillEvidence.test.js`, E2E review/path | — |
| 9 — Projets/reviews | Conforme | versions, resoumission, rubric, commentaires contextuels, rôles reviewer/admin | — |
| 10 — Certificats | Conforme | preuves versionnées, page publique, impression et révocation | — |
| 11 — Course Studio | Conforme localement | workflow, verrouillage optimiste, snapshots, diff, publication planifiée et rollback | Appliquer `20260621200000_course_workflow_versions.sql` en production |
| 12 — Analytics | Conforme | consentement, agrégation, seuil de cohorte, pseudonymisation, rétention 180 jours | Brancher un service externe de suivi d’erreurs si souhaité |
| 13 — A11y/perf/SEO | Conforme localement | axe, 375/768/1024/1440, routes propres, chunks, budget bundle, canonical, OG, sitemap, JSON-LD | Mesure Lighthouse/Web Vitals sur la release finale |
| 14 — Internationalisation | Conforme avec fallback documenté | contenu central FR/EN, `audit-i18n.mjs`, `lang`, formats localisés | Enrichissements pédagogiques historiques HTML/CSS/JS encore parfois uniquement français |
| 15 — Production | Partiel | Vercel, healthcheck, Supabase strict, logs, export admin, rollback documenté | Migration production, E2E Supabase, monitoring externe et redéploiement final |

## Gates

| Gate | État | Preuve |
| --- | --- | --- |
| Sécurité | Conforme localement | tests 401/403/inter-utilisateurs, CORS/CSP/rate limit, scan des secrets |
| Qualité | Conforme localement | `npm run validate`, `npm run smoke:full`, Playwright desktop/mobile, audits contenu/glossaire/i18n/migrations |
| Pédagogique | Conforme | 13 parcours, 272 leçons, quiz par module, projets finaux, examens, 357 termes reliés |
| UX | Conforme localement | tests responsive, clavier, focus, modales, reduced motion, absence de débordement |
| Production | En attente | migration Supabase et validations externes nécessaires avant la promotion de `cba76f2` et suivants |

## Commandes de preuve

```bash
npm ci
npm audit
npm run validate
npm run test:api
npm run smoke:full
npm run test:e2e
npm run test:a11y
npm run test:e2e:supabase
```

La dernière commande requiert les identifiants Supabase E2E. Une phase marquée
« partiel » ne doit pas être présentée comme terminée tant que sa colonne
« reste à faire » n’est pas résolue.
