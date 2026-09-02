# Matrice de conformité PulsaTeach

État vérifié le 3 juillet 2026 sur la branche `codex/platform-roadmap-release`.

| Phase | État | Preuves principales | Reste à faire |
| --- | --- | --- | --- |
| 0 — Sécurité | Conforme | `server/security.js`, `server/auth.js`, `server/validation.js`, `tests/api/security.test.js`, démarrage production strict, E2E Supabase réel | — |
| 1 — Tests | Conforme | Vitest, React Testing Library, Supertest, Playwright, axe; `tests/unit`, `tests/components`, `tests/api`, `tests/e2e`, scénario Supabase réel | — |
| 2 — Architecture | Conforme | routes backend par domaine, helpers métier séparés, features frontend lazy-loadées, lab découpé, contenu par parcours; audit de taille | — |
| 3 — UX responsive | Conforme | catalogue, dashboard, lab, navigation clavier; `responsive.spec.js`, `accessibility.spec.js`, captures desktop/mobile | — |
| 4 — Quiz | Conforme | `quizEngine.js`, sessions privées, reprise, scoring, randomisation, examens et révisions; tests unitaires/API/E2E | — |
| 5 — Vocabulaire | Conforme | index canonique, recherche/filtres/URLs/favoris/révision; `audit-glossary.mjs` | — |
| 6 — HTML/CSS/JS | Conforme | quiz, projets, examens, rubrics, certificats et enrichissements pédagogiques FR/EN | — |
| 7 — Nouveaux parcours | Conforme | Git, accessibilité, testing, TypeScript, React, Node/API, SQL, sécurité, performance, DevOps | — |
| 8 — Compétences | Conforme | progression, mastery, preuves et révisions espacées; `skillEvidence.test.js`, E2E review/path | — |
| 9 — Projets/reviews | Conforme | versions, resoumission, rubric, commentaires contextuels, rôles reviewer/admin | — |
| 10 — Certificats | Conforme | preuves versionnées, page publique, impression et révocation | — |
| 11 — Course Studio | Conforme | workflow, verrouillage optimiste, snapshots, diff, publication planifiée et rollback; migration appliquée en production | — |
| 12 — Analytics | Conforme | consentement, agrégation, seuil de cohorte, pseudonymisation, rétention 180 jours, logs structurés et healthchecks | — |
| 13 — A11y/perf/SEO | Conforme | axe, 375/768/1024/1440, routes propres, chunks, budget bundle, canonical, OG, sitemap, JSON-LD, audit Lighthouse | — |
| 14 — Internationalisation | Conforme | contenu central et pédagogie enrichie FR/EN, détection des traductions manquantes ou identiques, `lang`, formats localisés | — |
| 15 — Production | Conforme | Vercel READY, healthcheck Supabase strict, cinq migrations alignées, logs, export admin, rollback, monitoring planifié, runbook de sauvegarde, captures et vidéo | — |

## Gates

| Gate | État | Preuve |
| --- | --- | --- |
| Sécurité | Conforme | tests 401/403/inter-utilisateurs, CORS/CSP/rate limit, scan des secrets, Supabase réel |
| Qualité | Conforme | `npm run validate`, `npm run smoke:full`, Playwright desktop/mobile, audits contenu/glossaire/i18n/migrations/Lighthouse |
| Pédagogique | Conforme | 14 parcours, 878 leçons, quiz par module, projets finaux, examens, 586 termes reliés |
| UX | Conforme | tests responsive, clavier, focus, modales, reduced motion, absence de débordement |
| Production | Conforme | alias `https://pulsateach.vercel.app` READY, Supabase strict, migrations alignées, monitoring et procédures d’exploitation |

## Commandes de preuve

```bash
npm ci
npm audit
npm run validate
npm run test:api
npm run smoke:full
npm run smoke:production
npm run test:e2e
npm run test:a11y
npm run test:e2e:supabase
npm run audit:lighthouse
```

La suite Supabase utilise un compte E2E isolé, publie un parcours dynamique,
vérifie le catalogue et nettoie systématiquement les données créées.
