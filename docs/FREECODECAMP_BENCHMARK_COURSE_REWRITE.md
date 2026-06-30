# PulsaTeach — refonte des cours inspirée du benchmark freeCodeCamp

Date : 2026-06-30

Référence locale : `.external/freeCodeCamp`, commit `54147981`.

## Règle de licence et d’éthique

freeCodeCamp est une excellente référence, mais le contenu pédagogique de
`/curriculum` est indiqué comme copyright freeCodeCamp dans leur README. On
utilise donc le dépôt comme benchmark de structure, progression, validation et
UX pédagogique. On ne copie pas leurs textes, consignes, projets, assets ou
tests mot à mot.

Ce qui est autorisé pour PulsaTeach :

- reprendre des patterns généraux : micro-étapes, projet fil rouge, tests
  nombreux, blocs, certifications ;
- créer des exercices originaux avec nos propres contextes, textes, exemples,
  solutions et données ;
- citer freeCodeCamp dans la documentation interne comme source d’inspiration.

Ce qu’on évite :

- copier des descriptions, hints, tests ou solutions ;
- réutiliser leurs assets CDN ;
- utiliser leur marque pour endorsement.

## Ce que freeCodeCamp fait mieux

### 1. Granularité

Un bloc freeCodeCamp peut contenir plus de 100 micro-étapes. Exemple observé :
`learn-basic-javascript-by-building-a-role-playing-game` contient une longue
suite de `Step 1`, `Step 2`, etc., chacune validée par plusieurs assertions.

PulsaTeach est actuellement plus compact :

| Parcours | Leçons | Quiz | Projets | Tests | Tests / leçon |
|---|---:|---:|---:|---:|---:|
| HTML | 22 | 1 | 3 | 92 | 4.2 |
| CSS | 27 | 1 | 3 | 103 | 3.8 |
| JavaScript | 23 | 1 | 2 | 99 | 4.3 |
| Git | 20 | 5 | 3 | 52 | 2.6 |
| Accessibilité | 20 | 5 | 3 | 57 | 2.9 |
| Testing | 20 | 5 | 4 | 66 | 3.3 |
| TypeScript | 20 | 5 | 3 | 75 | 3.8 |
| React | 20 | 5 | 4 | 95 | 4.8 |
| Node/API | 20 | 5 | 4 | 108 | 5.4 |
| SQL/PostgreSQL | 20 | 5 | 4 | 113 | 5.7 |
| Sécurité web | 20 | 5 | 4 | 127 | 6.3 |
| Performance web | 20 | 5 | 4 | 114 | 5.7 |
| DevOps/Déploiement | 20 | 5 | 4 | 132 | 6.6 |

Conclusion : la qualité de PulsaTeach est déjà plus orientée métier, mais la
progression manque de micro-pratique répétée.

### 2. Projet fil rouge

freeCodeCamp garde souvent le même projet pendant beaucoup d’étapes. L’apprenant
voit son application grandir progressivement.

PulsaTeach doit adopter cette structure :

- chaque module démarre par un mini-projet fil rouge ;
- chaque leçon ajoute une capacité concrète au même projet ;
- le quiz vérifie les concepts ;
- la fin de module demande une variation autonome.

### 3. Assertions nombreuses et précises

Leur format inclut beaucoup de tests très ciblés : présence d’éléments,
hiérarchie, attributs, ordre, valeurs, syntaxe, comportement.

PulsaTeach doit renforcer :

- tests DOM structurels ;
- tests CSS déclaratifs ;
- tests d’accessibilité ciblés ;
- tests de comportement JS ;
- tests anti-régression sur projet final.

### 4. Certifications structurées

freeCodeCamp regroupe les projets et examens sous certifications. PulsaTeach a
déjà les certificats, mais doit rendre la progression vers le certificat plus
visible dans chaque parcours.

## Nouveau standard minimal d’un parcours PulsaTeach

Chaque parcours publié doit contenir :

- 4 à 8 modules ;
- 35 à 60 micro-leçons utiles, sauf parcours expert très ciblé ;
- 1 projet fil rouge principal ;
- 1 mini-projet par module ;
- 1 quiz exigeant par module ;
- 1 révision espacée par module ;
- 1 examen final ;
- 1 projet final original ;
- 1 rubric de correction ;
- vocabulaire lié ;
- FR/EN complet ;
- au moins 5 tests par exercice codé ;
- au moins 8 tests pour les mini-projets ;
- au moins 15 tests pour les projets finaux.

## Priorités de refonte par parcours

### P0 — HTML, CSS, JavaScript

Ce sont les portes d’entrée SEO et produit. Ils doivent devenir exemplaires.

HTML :

- transformer le parcours en projet fil rouge “site événement / portfolio
  accessible” ;
- passer de 22 à environ 45 micro-leçons ;
- ajouter plus de tests de structure : ordre, hiérarchie, landmarks, labels,
  attributs, SEO minimal ;
- renforcer les mini-projets : carte profil, formulaire, tableau accessible,
  page article, page événement.

CSS :

- transformer le parcours en projet fil rouge “design system responsive” ;
- passer de 27 à environ 50 micro-leçons ;
- ajouter ateliers courts sur cascade, specificity, layout, overflow,
  responsive, container queries, reduced motion ;
- créer plus de variations visuelles autonomes.

JavaScript :

- transformer le parcours en projet fil rouge “task dashboard / mini app” ;
- passer de 23 à environ 55 micro-leçons ;
- découper davantage variables, conditions, fonctions, tableaux, objets, DOM,
  events, async, localStorage, erreurs ;
- ajouter tests comportementaux plus précis.

### P1 — React, TypeScript, Node/API, SQL

React :

- fil rouge : dashboard de formation ;
- renforcer états, formulaires, effets, routing, composants accessibles, tests.

TypeScript :

- fil rouge : SDK typé PulsaTeach ;
- ajouter exercices de narrowing, discriminated unions, generics simples,
  erreurs de refactor.

Node/API :

- fil rouge : API projets/reviews ;
- renforcer auth, validation, erreurs, pagination, tests d’abus.

SQL :

- fil rouge : base pédagogique analytics/progression ;
- renforcer index, contraintes, migrations, requêtes de reporting.

### P2 — Git, Testing, Accessibilité, Sécurité, Performance, DevOps

Ces parcours sont différenciants. Ils doivent rester orientés métier, mais
ajouter plus de scénarios réalistes :

- Git : conflits, branches, PR review, tags, rollback ;
- Testing : unit, API, composants, E2E, fixtures, flaky tests ;
- Accessibilité : audits clavier/lecteur écran/contraste/formulaires ;
- Sécurité : sandbox, CSP, auth, RBAC, secrets, rate limits, incidents ;
- Performance : budgets, lazy loading, Web Vitals, profiling ;
- DevOps : preview/prod, migrations, smoke, monitoring, rollback drill.

## Architecture de contenu à ajouter

Pour éviter d’écrire 300 leçons à la main sans cadre :

1. créer un modèle “workshop step” ;
2. ajouter un générateur de micro-leçons par module ;
3. permettre un `projectThreadId` pour relier les étapes d’un même projet ;
4. enrichir les tests :
   - `domOrder`;
   - `attributeEquals`;
   - `ariaRelation`;
   - `cssComputed`;
   - `jsBehavior`;
   - `a11yRule`;
5. ajouter un audit `audit:curriculum-depth`.

## Plan d’exécution recommandé

### Lot 1 — Cadre technique

- ajouter `projectThreadId`, `stepNumber`, `buildsOn` aux leçons ;
- ajouter les nouveaux types de tests ;
- ajouter `audit:curriculum-depth` ;
- afficher la progression “atelier fil rouge” dans l’UI.

### Lot 2 — Refonte HTML

- créer 45 micro-leçons originales ;
- garder le capstone PulsaConf mais le construire progressivement ;
- ajouter tests DOM/a11y/SEO plus précis.

### Lot 3 — Refonte CSS

- créer 50 micro-leçons originales ;
- construire un design system responsive ;
- ajouter plus de tests responsive/overflow.

### Lot 4 — Refonte JavaScript

- créer 55 micro-leçons originales ;
- construire un dashboard persistant ;
- ajouter tests JS comportementaux.

### Lot 5 — Refonte parcours avancés

- React, TypeScript, Node/API, SQL ;
- puis Git, Testing, Accessibilité, Sécurité, Performance, DevOps.

## Critère de réussite

PulsaTeach ne doit pas devenir un clone de freeCodeCamp. Le bon résultat est :

- même rigueur de progression ;
- plus fort sur contexte métier francophone ;
- plus fort sur accessibilité, sécurité, performance et projets vérifiables ;
- contenu original, bilingue, maintenable et testable.
