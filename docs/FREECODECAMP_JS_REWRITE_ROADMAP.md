# Roadmap refonte cours PulsaTeach inspirée freeCodeCamp

Date de référence : 30 juin 2026  
Sources locales de benchmark :

- `.external/freeCodeCamp` à titre de référence architecture/curriculum ;
- `javascript_v9_compact.md` pour la structure complète JavaScript v9 ;
- `javascript_v9_contenu_complet.md` pour le contenu long.

## Règle de licence et d’originalité

Ne pas copier-coller le texte freeCodeCamp dans PulsaTeach. Utiliser le cours comme
benchmark de progression, granularité, types d’exercices, labs, quizzes et projets.
Réécrire les explications, exemples, datasets, personnages, projets et tests à la
sauce PulsaTeach. Si un contenu adapté reste très proche d’une ressource
freeCodeCamp, ajouter une attribution claire et vérifier la licence applicable.

## Écart principal observé

PulsaTeach a une bonne base produit, SEO et sécurité, mais les cours sont encore
trop condensés. Le parcours JavaScript actuel contient environ 23 leçons, alors que
le benchmark JavaScript v9 fonctionne avec beaucoup plus de micro-étapes, quizzes,
labs, projets courts et validations progressives.

## Standard cible pour chaque parcours

Chaque parcours doit contenir :

- modules nombreux mais lisibles ;
- micro-leçons courtes avec un objectif testable ;
- ateliers fil rouge en 10 à 30 étapes ;
- labs autonomes ;
- quizzes fréquents avec feedback ;
- projets portfolio ;
- examen final ;
- vocabulaire relié ;
- tests automatiques ;
- version française et anglaise ;
- métadonnées SEO propres ;
- rendu mobile léger.

## Phase 1 — JavaScript v9 PulsaTeach

Objectif : transformer le parcours JavaScript en vraie certification progressive.

Structure cible :

1. Introduction, variables, types, strings, console, commentaires.
2. Booléens, nombres, opérateurs, comparaisons, conditions.
3. Fonctions, paramètres, retours, scope, fonctions fléchées.
4. Arrays, objets, méthodes, boucles, transformations.
5. DOM, événements, formulaires, validation, accessibilité.
6. Strings avancées, regex, dates, erreurs.
7. Async, fetch, JSON, API, état de chargement, erreurs réseau.
8. LocalStorage, cookies pédagogiques, état persistant.
9. Debugging, call stack, mental models.
10. Projets finaux : dashboard persistant, quiz app, fetch directory, mini-jeu.

Exigences :

- importer la structure de `javascript_v9_compact.md` dans un audit local ;
- produire une matrice FCC section → module PulsaTeach ;
- créer au moins 80 micro-leçons JS utiles ;
- créer au moins 12 quizzes de module ;
- créer au moins 8 labs/projets ;
- conserver un bundle raisonnable via chargement par parcours ;
- ne pas dépasser 500 lignes par fichier source ;
- ajouter tests unitaires pour scoring, validation JS et reprise.

## Phase 2 — Éditeur / sandbox

Objectif : se rapprocher de l’expérience freeCodeCamp sans surcharger l’écran.

Actions :

- interface leçon en 3 zones simples : consigne, éditeur, résultat/tests ;
- mode focus mobile : une seule zone visible à la fois ;
- panneau tests plus lisible ;
- feedback immédiat mais non bruyant ;
- historique de tentatives ;
- bouton “voir l’indice” progressif ;
- sauvegarde automatique du code ;
- sandbox stricte inchangée : pas d’accès aux données privées.

## Phase 3 — Refonte des autres parcours

Ordre recommandé :

1. HTML : finir le modèle atelier PulsaConf.
2. CSS : ateliers Flexbox/Grid/responsive avec rendu visuel.
3. JavaScript : certification v9 complète.
4. React : composants, état, effets, formulaires, routing, tests.
5. Node/API : routes, validation, auth, erreurs, DB, tests API.
6. SQL/PostgreSQL : requêtes, relations, agrégations, indexes, transactions.
7. Security/Performance/DevOps : labs pratiques et audits.

## Phase 4 — SEO éditorial

- pages publiques par certification ;
- pages “apprendre JavaScript gratuitement”, “cours HTML interactif”, etc. ;
- schema Course/ItemList/FAQ par parcours ;
- extraits statiques pré-rendus ;
- maillage interne cours ↔ vocabulaire ↔ projets ↔ certificats ;
- dates de dernière mise en ligne visibles dans le footer et/ou mentions légales.

## Phase 5 — Qualité continue

Chaque lot doit terminer avec :

- `npm run validate`;
- E2E routes critiques ;
- Lighthouse `/`, `/catalog`, `/about`, et une page `/learn/...`;
- audit curriculum depth ;
- vérification mobile 430 px ;
- zéro copie brute non attribuée de freeCodeCamp.

