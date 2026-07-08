# Matrice benchmark freeCodeCamp → PulsaTeach — HTML

Date de mise à jour : 2026-07-08

Objectif : renforcer HTML avec la granularité atelier de freeCodeCamp, sans
copier ses textes. PulsaTeach adapte les exercices à PulsaConf, aux pages de
cours publiques, au SEO, aux mentions légales, aux formulaires et à
l’accessibilité.

## Adaptation PulsaTeach

| Compétence benchmark | Adaptation PulsaTeach | Preuves |
| --- | --- | --- |
| Premiers pas HTML | Rôle de HTML, installation navigateur/VS Code, création de `index.html`, boucle sauvegarder/recharger, DevTools et lecture des tests | `src/content/htmlPulsaConfCurriculum.js`, module `html-getting-started` |
| Squelette HTML | Doctype, `lang`, `charset`, viewport, `title`, description et séparation `head`/`body` | `src/content/htmlPulsaConfCurriculum.js`, module `html-modern-document` |
| Contenu sémantique | `main`, h1 unique, hiérarchie de titres, `section`, `article`, `aside`, `blockquote`, `details`, `address`, `abbr`, `code` | module `html-text-sections` |
| Navigation | Liens explicites, ancres internes, `nav aria-label`, `aria-current`, liens externes sûrs, email/téléphone/download, skip link | module `html-navigation-links` |
| Médias | `img alt`, images décoratives, `figure/figcaption`, dimensions, lazy loading, audio fallback, vidéo captions | module `html-media-content` |
| Données riches | `ul`, `ol`, `dl`, tableaux avec `caption`, `thead`, `tbody`, `th scope`, `time datetime`, `data value` | module `html-data-tables` |
| Formulaires natifs | `form action/method`, labels reliés, `input`, `email`, `required`, `autocomplete`, `textarea`, `select`, radio, checkbox, submit | module `html-native-forms` |
| Accessibilité formulaires | `aria-describedby`, erreurs, `fieldset/legend`, disabled expliqué, `role=status`, `aria-live`, `role=alert`, `aria-busy` | module `html-accessible-feedback` |
| SEO/publication | Title SEO, meta description, canonical absolu, Open Graph, favicon, hreflang conceptuel, JSON-LD simple | module `html-seo-publication` |
| Projet final | Page PulsaConf publiable et auditable : landmarks, navigation, médias, tableau, formulaire, feedback, SEO et anti-patterns bloqués | module `html-final-audit`, `html-09-final-project-pulsaconf` |

## Résultat du lot

- HTML passe à 79 items, 10 modules, 10 quiz/examen et 10 projets/labs.
- 399 critères de validation déclarés dans les leçons HTML.
- Ratio moyen `5.1 tests/item`, avec mini-projets à 8 tests et projet final à 22 tests.
- Projet fil rouge unique : PulsaConf, construit module par module.
- Audits `learning`, `editorial`, `i18n` et `glossary` verts après refonte.
- Contenu original PulsaTeach, aucun texte freeCodeCamp copié ; freeCodeCamp reste uniquement un benchmark de granularité et de validation.
