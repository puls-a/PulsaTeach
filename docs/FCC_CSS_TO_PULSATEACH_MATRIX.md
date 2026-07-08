# Matrice benchmark freeCodeCamp -> PulsaTeach - CSS

Date de mise a jour : 2026-07-08

Objectif : amener CSS au meme niveau pedagogique que HTML. freeCodeCamp sert de benchmark de granularite : micro-etapes, consignes courtes, seed, solution et tests. PulsaTeach conserve un contenu original, centre sur PulsaConf, la preuve visuelle, le responsive et l'accessibilite.

## Adaptation PulsaTeach

| Competence benchmark | Adaptation PulsaTeach | Preuves |
| --- | --- | --- |
| Premiers pas CSS | Role de CSS, creation de `styles.css`, lien `rel="stylesheet"`, DevTools Styles, cascade et boucle mobile/desktop/focus | `src/content/cssTrackFoundationChunk.js`, module `css-getting-started` |
| Selecteurs et cascade | Classes, selecteurs directs, etats, specificite et effets de bord limites | modules `css-selectors-colors`, `css-selectors` |
| Couleurs et lisibilite | Couleur, fond, bordure, contraste, focus visible, opacite responsable | module `css-selectors-colors` |
| Box model et typographie | `box-sizing`, padding, margin, largeur fluide, line-height, font-size, overflow-wrap | modules `css-box-type`, `css-box-model` |
| Flexbox | Alignement, distribution, gap, wrap, direction, ordre et navbar responsive | modules `css-flex-layout`, `css-flexbox` |
| Grid | Grilles adaptatives, `repeat`, `minmax`, auto-fit, gap et centrage | modules `css-grid-layout`, `css-grid` |
| Responsive | Mobile-first, media queries, container queries, clamp, images robustes et navigation adaptative | modules `css-responsive`, `css-responsive-motion`, `css-advanced-responsive` |
| Etats accessibles | `:focus-visible`, hover, disabled, cursor, contrast-color et forced colors | module `css-a11y-states` |
| Motion responsable | Transition, transform, animation, `prefers-reduced-motion` et reduction des effets | module `css-motion` |
| Projet final | Landing responsive et audit complet : textes longs, medias, conteneurs et plusieurs largeurs | `css-capstone`, `css-07-responsive-audit-project` |

## Resultat du lot

- CSS passe a 123 items, 15 modules, 15 quiz et 15 projets/labs.
- 594 criteres de validation declares dans les lecons CSS.
- Chaque module CSS possede maintenant son checkpoint et son lab/projet de fin de module.
- Le parcours commence maintenant par une vraie installation de methode CSS, pas directement par les selecteurs.
- Les audits `learning`, `editorial`, `i18n` et `glossary` sont verts apres ajout du module.
- Contenu original PulsaTeach, aucun texte freeCodeCamp copie ; freeCodeCamp reste uniquement un benchmark de granularite et de validation.
