# Matrice benchmark freeCodeCamp → PulsaTeach — Web Performance

Date de mise à jour : 2026-06-30

Objectif : utiliser freeCodeCamp comme repère de profondeur pédagogique, sans
copier ses contenus. Les blocs consultés servent à identifier les compétences
attendues : compréhension de la performance web, quiz de performance, qualité
de code, tests et projets QA. PulsaTeach reformule tout sous forme de parcours
professionnel mesurable, bilingue, relié aux audits et aux projets.

## Sources benchmark inspectées

- `lecture-understanding-performance-in-web-applications.json`
- `review-web-performance.json`
- `quiz-web-performance.json`
- `lecture-working-with-code-quality-and-execution-concepts.json`
- `lecture-understanding-the-different-types-of-testing.json`
- `quality-assurance-projects.json`

## Adaptation PulsaTeach

| Compétence benchmark | Adaptation PulsaTeach | Preuves dans le dépôt |
| --- | --- | --- |
| Comprendre les métriques de performance | Baseline reproductible, LCP, INP, CLS, variance et limites des scores | `src/content/tracks/web-performance.js` |
| Diagnostiquer avant d’optimiser | Waterfall, traces, User Timing, Coverage, priorisation impact/effort/risque | `src/content/tracks/webPerformanceV9Modules.js` |
| Optimiser rendu et ressources | Images responsive, polices, resource hints, CSS critique, stabilité visuelle | `src/content/tracks/web-performance.js`, `webPerformanceV9Modules.js` |
| Réduire JavaScript et coût React | Route-level code splitting, Suspense, Profiler, memoisation mesurée, budgets bundle | `src/content/tracks/web-performance.js` |
| Optimiser API et SQL | Cache HTTP, ETag, pagination curseur, EXPLAIN, index ciblés, payload borné | `src/content/tracks/web-performance.js` |
| Exploitation production | Lighthouse, RUM, service worker prudent, alertes p75, runbook d’incident | `src/content/tracks/webPerformanceV9Modules.js` |
| Évaluer réellement | Quiz par module, labs, projets et examen final avec exigences vérifiables | fichiers de contenu + audits pédagogiques |

## Principes éditoriaux appliqués

- Aucun texte de cours freeCodeCamp n’est recopié.
- Les exemples sont adaptés à PulsaTeach : catalogue, landing, parcours, quiz,
  certificats, Course Studio et API.
- Chaque notion importante possède une activité pratique ou un quiz.
- La sécurité prime sur la performance : les données privées restent en
  `no-store`, les métriques RUM excluent email, texte saisi et identifiant brut.
- Les optimisations doivent être mesurées avant/après et protégées par budget.

## Écarts assumés

- PulsaTeach ne reproduit pas l’éditeur freeCodeCamp à l’identique : le parcours
  privilégie un lab plus compact, orienté audit et production.
- Les métriques RUM sont décrites pédagogiquement ; l’activation réelle dépend
  de l’infrastructure d’exploitation choisie.
