# Matrice benchmark freeCodeCamp → PulsaTeach — Testing

Date de mise à jour : 2026-06-30

Objectif : utiliser freeCodeCamp comme repère de progression sur tests, debug et
qualité, sans reprendre ses textes. PulsaTeach reformule les compétences autour
de Vitest, React Testing Library, Playwright, MSW, axe, CI et risques produit.

## Sources benchmark inspectées

- `lecture-understanding-the-different-types-of-testing.json`
- `review-testing.json`
- `quiz-testing.json`
- `quality-assurance-and-testing-with-chai.json`
- `quality-assurance-projects.json`
- `lecture-working-with-code-quality-and-execution-concepts.json`
- `lecture-debugging-techniques.json`
- `review-debugging-javascript.json`

## Adaptation PulsaTeach

| Compétence benchmark | Adaptation PulsaTeach | Preuves dans le dépôt |
| --- | --- | --- |
| Types de tests | Pyramide, unitaires, composants, API, E2E, accessibilité, visuel | `src/content/tracks/testing.js`, `src/content/tracks/testingV9Modules.js` |
| Assertions utiles | Frontières, cas limites, mutation testing, anti-régression | `src/content/tracks/testingV9Modules.js` |
| API et intégration | Contrats Zod, MSW, erreurs réseau, retry et routes privées | `src/content/tracks/testingV9Modules.js` |
| Debug | Flaky runbook, traces, logs, screenshots, suppression des timeouts fixes | `src/content/tracks/testing.js`, `testingV9Modules.js` |
| Qualité continue | CI, artefacts, couverture par risque, stratégie de preuve | `src/content/tracks/testing.js` |
| Responsive/accessibilité | Viewports 430/768/1440, axe + clavier/focus/annonces, screenshots ciblés | `src/content/tracks/testingV9Modules.js` |

## Principes éditoriaux appliqués

- Chaque ajout protège un risque PulsaTeach concret : progression privée, quiz,
  certificat, sitemap, route privée, UI mobile et modales.
- Les mocks restent proches du réseau réel via MSW.
- Les tests visuels sont encadrés pour ne pas devenir bruyants.
- Les retries ne sont pas une stratégie de qualité : ils doivent mener à une
  correction de cause.

## Écarts assumés

- Les exemples Chai freeCodeCamp sont adaptés à Vitest, l’outil utilisé ici.
- PulsaTeach met davantage l’accent sur Playwright, accessibilité et CI car ce
  sont les points de douleur actuels du produit.
