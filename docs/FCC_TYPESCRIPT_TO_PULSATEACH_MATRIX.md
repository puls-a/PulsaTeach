# Matrice d'inspiration TypeScript / Front End Libraries v9

Source consultée localement : `.external/freeCodeCamp/curriculum/structure/superblocks/front-end-development-libraries-v9.json`.

Le parcours TypeScript PulsaTeach reprend la granularité observée dans les ateliers freeCodeCamp : profils typés, toolkit, composition de types, génériques, configuration et projets. Les textes, exemples, datasets et solutions restent originaux et adaptés à PulsaTeach.

## Correspondance

| Repère freeCodeCamp | Bloc PulsaTeach | Intention PulsaTeach |
| --- | --- | --- |
| Introduction to TypeScript | `ts-v9-foundations` | Inférence, annotations utiles, readonly, unions et utilitaires |
| Type-safe user profile | `ts-v9-foundations` | Profil apprenant typé et contrats publics dérivés |
| Type-safe math/toolkit | `ts-v9-functions-generics` | Helpers de collections, contraintes, prédicats et relations génériques |
| Type composition / shape manager | `ts-v9-unions-states` | États impossibles, exhaustivité et workflows fermés |
| Generics and type narrowing | `ts-v9-boundaries` | `unknown`, guards, DOM, JSON, fetch et erreurs contrôlées |
| TypeScript configuration files | `ts-v9-config-tooling` | `strict`, `noUncheckedIndexedAccess`, `moduleResolution`, aliases, anti-`any` |
| Final labs / quiz apps | `ts-v9-migration-capstone` | Migration progressive d'un tracker d'apprentissage avec preuves |

## Résultat

- 6 modules TypeScript.
- 36 micro-leçons pratiques.
- 6 projets, dont un capstone de migration.
- 6 quiz de 5 questions.
- Contenus bilingues enrichis par `createProfessionalTrack`.

## Renforcement 2026-07-02

- Les leçons v9 dérivent maintenant davantage de preuves directement présentes dans leur solution : `unknown`, `never`, `extends`, `Record`, `Pick`, `Partial`, `Promise`, `value is`, `instanceof`, `strict`, `compilerOptions`, etc.
- Les projets ajoutent des preuves de symbole métier et de fonction de validation, en plus de `readonly`, `status`, `evidence`, `boolean` et `return`.
- Objectif : transformer les exercices TypeScript en micro-revues de contrat statique + preuve runtime, pas seulement en fragments de syntaxe.
- Résultat audit : TypeScript passe de 178 à 522 preuves, soit environ 7,7 tests par leçon.

## Garde-fous

- Aucun contenu freeCodeCamp n'est copié.
- Les scénarios sont PulsaTeach : catalogue, apprenant, progression, API, migration de tracker.
- Chaque activité relie typage statique, preuve runtime ou preuve de compilation.
