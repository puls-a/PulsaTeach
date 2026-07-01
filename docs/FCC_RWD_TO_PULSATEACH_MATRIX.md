# Matrice freeCodeCamp Responsive Web Design → PulsaTeach

Source benchmark locale : `responsive_web_design_v9_compact.md`  
Règle : structure et granularité inspirées, contenu PulsaTeach original.

| Benchmark RWD/FCC | Module PulsaTeach cible | Statut |
| --- | --- | --- |
| Basic HTML + document structure | Déjà couvert par HTML + PulsaConf | Couvert |
| Basic CSS, selectors, colors | `css-v9-selectors-colors` | Renforcé |
| Box model, spacing, typography | `css-v9-box-type` | Renforcé |
| Flexbox | `css-v9-flex-layout` | Renforcé |
| CSS Grid | `css-v9-grid-layout` | Renforcé |
| Responsive design | `css-v9-responsive` | Renforcé |
| Accessibility + forms visual states | `css-v9-a11y-states` | Renforcé |
| Motion, transforms, reduced motion | `css-v9-motion` | Renforcé |
| Capstone responsive page | `css-v9-capstone` | Renforcé |

## Premier bloc ajouté

- 8 modules CSS/RWD.
- 64 micro-leçons originales.
- 8 quizzes de module.
- 6 labs/projets.
- Contenu FR/EN, tests automatiques et pré-rendu SEO via le pipeline existant.

## Renforcement du 1er juillet 2026

- Les micro-leçons CSS v9 passent de tests de présence isolés à 6 preuves par
  exercice : sélecteur ciblé, motif CSS, propriété, valeur attendue, garde
  responsive/accessibilité et structure courte de composant.
- Le parcours CSS passe à 525 tests pour 105 leçons, soit 5 tests/leçon.
- `npm run audit:curriculum-depth` marque maintenant CSS en `ok`.

## Prochain approfondissement

1. Ajouter un vrai aperçu visuel par scénario responsive.
2. Ajouter une page SEO “Certification responsive web design gratuite”.
3. Continuer HTML/RWD à partir du benchmark local sans importer le texte brut.
