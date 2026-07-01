# Matrice benchmark Accessibilité → PulsaTeach

Date : 1er juillet 2026  
Règle : granularité inspirée de cursus interactifs, contenu PulsaTeach original,
sans reprise de texte brut freeCodeCamp.

| Besoin pédagogique benchmark | Implémentation PulsaTeach | Preuve |
| --- | --- | --- |
| Tests au-delà de l'outil automatique | Modules lecteur d'écran, clavier, axe, preuves manuelles | `a11y-v9-accessibility-tree`, `a11y-v9-wcag-remediation` |
| Composants dynamiques | Modale, live regions, onglets, états ARIA | `a11y-v9-complex-components` |
| Mobile réel | 430×932, zoom 200 %, cibles tactiles, reduced motion | `a11y-v9-mobile-motion` |
| Audit reproductible | Matrice défaut → critère → preuve → retest | `a11y-v9-final-audit` |
| Labs/projets | Arbre accessible, composant interactif, audit mobile, audit WCAG | 4 nouveaux labs/projets |
| Quizzes fréquents | Quiz par module + examen v9 | 4 quizzes v9 |

## Résultat du lot

- Accessibilité passe de 20 à 40 leçons.
- Accessibilité passe de 57 à 202 tests.
- Moyenne : 5 tests/leçon.
- `npm run audit:curriculum-depth` marque Accessibilité en `ok`.

## Limites assumées

- Les tests lecteur d'écran sont documentés et simulés par preuve textuelle :
  l'exécution réelle NVDA/VoiceOver reste une vérification humaine externe.
- Les labs enseignent la matrice de preuve et la correction ; ils ne forcent pas
  une dépendance externe payante ou un compte tiers.
