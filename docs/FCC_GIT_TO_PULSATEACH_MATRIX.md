# Matrice benchmark Git/GitHub → PulsaTeach

Date : 1er juillet 2026  
Règle : progression inspirée des meilleurs cursus interactifs, contenu PulsaTeach
original, sans reprise de texte brut freeCodeCamp.

| Besoin pédagogique benchmark | Implémentation PulsaTeach | Preuve |
| --- | --- | --- |
| Micro-étapes courtes et vérifiables | `git-v9-safe-history`, `git-v9-branch-surgery`, `git-v9-review-collaboration`, `git-v9-release-provenance` | 20 nouvelles activités |
| Sécurité avant commandes risquées | Stash nommé, reflog, branches de récupération, force-with-lease | tests de présence sur commandes et preuves |
| Diagnostic de régression | Module bisect + lab chirurgie de branche | `git-v9-bisect`, `git-v9-branch-lab` |
| Collaboration réaliste | Série de commits, PR vérifiable, hooks anti-secrets | `git-v9-review-collaboration` |
| Livraison professionnelle | Tags annotés, changelog, provenance, smoke/rollback | `git-v9-release-provenance` |
| Labs/projets portfolio | Runbook récupération, chirurgie branche, PR équipe, release vérifiable | 4 nouveaux projets |
| Quizzes avec feedback | Quiz par module v9 | 4 nouveaux quizzes |

## Résultat du lot

- Git passe de 20 à 40 leçons.
- Git passe de 52 à 232 tests.
- Moyenne : 5,8 tests/leçon.
- `npm run audit:curriculum-depth` marque Git en `ok`.

## Limites assumées

- Les commandes restent simulées dans l’éditeur PulsaTeach : elles enseignent le
  workflow et les preuves sans manipuler le dépôt réel de l’apprenant.
- Les labs demandent une documentation de décision, pas une connexion GitHub
  réelle, pour préserver le mode local et la sécurité sandbox.
