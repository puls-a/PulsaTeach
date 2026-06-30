# Matrice freeCodeCamp JavaScript v9 → PulsaTeach

Date de mise à jour : 2026-06-30

Sources benchmark locales :

- `javascript_v9_compact.md` pour la structure JavaScript v9 ;
- `javascript_v9_contenu_complet.md` pour le niveau de détail ;
- `.external/freeCodeCamp` pour la granularité curriculum/labs/quizzes.

Règle : PulsaTeach s’inspire de la progression, de la densité de micro-étapes et
des types d’exercices, mais ne copie pas le texte brut freeCodeCamp.

| Benchmark FCC JS v9 | Module PulsaTeach | Statut |
| --- | --- | --- |
| Variables, data types, strings, console, comments | `js-v9-variables-strings` | Ajouté |
| Booleans, numbers, operators, comparisons, conditionals | `js-v9-booleans-numbers` | Ajouté |
| Functions, parameters, return, scope, arrow functions | `js-v9-functions-scope` | Ajouté |
| Arrays, objects, loops, transformations | `js-v9-collections-loops` | Ajouté |
| DOM, events, forms, validation | `js-v9-dom-forms` | Ajouté |
| String methods, regex, dates, errors | `js-v9-strings-regex-errors` | Ajouté |
| Async, fetch, JSON, loading/error states | `js-v9-async-fetch` | Ajouté |
| Storage, persistence, cookies/local state | `js-v9-storage-state` | Ajouté |
| Debugging, call stack, mental models | `js-v9-debugging` | Ajouté |
| Capstone apps: quiz, directory, dashboard, game | `js-v9-capstone` | Ajouté |
| Validation, edge cases, resilient async, accessible DOM, debug practice | `js-v9-validation-hardening`, `js-v9-async-resilience`, `js-v9-dom-production` | Approfondissement ajouté |

## Standard atteint

- 80+ micro-leçons JavaScript originales.
- 12+ quizzes/checkpoints.
- 8+ labs/projets.
- Vocabulaire et contenus français/anglais.
- Tests locaux et critères vérifiables.
- Chargement par parcours pour préserver le bundle.
- Aucun contenu freeCodeCamp brut publié.

## Approfondissement JavaScript hardening

Nouveaux modules ajoutés :

- `js-v9-validation-hardening` : validation de profils, normalisation de cours,
  scoring aux limites et lab moteur de validation ;
- `js-v9-async-resilience` : fetch avec timeout, états réseau complets,
  dashboard parallèle et client API résilient ;
- `js-v9-dom-production` : modale accessible, renderer de tâches, traces de
  debug et mini-dashboard final.

Ces modules renforcent la partie “micro-tests” : chaque activité contient une
forte densité de critères de validation, avec des exemples propres à PulsaTeach
— profils apprenants, catalogue, progression, quiz, dashboard, statut accessible,
stockage local et erreurs réseau.

## Prochains approfondissements possibles

1. Remplacer davantage de tests `contains` par des tests runtime.
2. Ajouter un audit automatique qui extrait la table des matières depuis
   `javascript_v9_compact.md`.
3. Continuer la refonte de l’éditeur en mode focus mobile.
4. Créer une page SEO dédiée “Certification JavaScript gratuite”.
