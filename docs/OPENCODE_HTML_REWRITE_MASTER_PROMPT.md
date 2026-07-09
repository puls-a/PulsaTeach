# OpenCode — Master prompt refonte complète du parcours HTML PulsaTeach

Date : 2026-07-08  
Périmètre : parcours HTML uniquement  
Repo : PulsaTeach  
Mode attendu : agir, coder, tester, documenter, itérer.

## 0. Prompt court à coller dans l’objectif OpenCode

```text
Tu travailles dans le dépôt PulsaTeach. Refonte complète du parcours HTML uniquement.

Objectif : reconstruire le parcours HTML comme un vrai curriculum premium, progressif, bilingue FR/EN, pratique, testable, inspiré des meilleurs formats de freeCodeCamp sans copier leurs textes, consignes, tests, projets ni assets.

Agis plus que tu ne parles. Inspecte d’abord l’existant, puis implémente par lots. Ne touche pas aux autres parcours sauf nécessité technique directe. Ne touche jamais aux secrets, cookies, bots sociaux ou fichiers .env. Ne commit/push que si demandé.

Sources internes à inspecter :
- docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md
- docs/FCC_HTML_TO_PULSATEACH_MATRIX.md
- src/content/htmlTrack.js
- src/content/htmlTrackMetadata.js
- src/content/htmlModulesFoundation.js
- src/content/htmlModulesAdvanced.js
- src/content/htmlModulesWorkshop.js
- src/content/htmlModulesHardening.js
- src/content/htmlWorkshopBuilders.js
- src/htmlPedagogy.js
- scripts/audit-learning.mjs
- scripts/audit-editorial-quality.mjs
- scripts/audit-glossary.mjs
- scripts/audit-i18n.mjs

Si le clone freeCodeCamp existe localement, utilise-le uniquement comme benchmark de structure, granularité, progression, tests et UX pédagogique. Ne copie aucun contenu copyrighté. Crée un contenu original PulsaTeach.

Résultat attendu : un parcours HTML refait de zéro ou quasi zéro, avec 55 à 75 micro-leçons utiles, modules progressifs, projet fil rouge, quiz riches, mini-projets, projet final, examen/certificat compatible, vocabulaire relié, tests DOM/a11y/SEO solides, FR/EN complet et validations vertes.

Validation minimale avant de dire terminé :
npm run lint
npm run test
npm run audit:learning
npm run audit:editorial
npm run audit:glossary
npm run audit:i18n
npm run build
npm run audit:seo
npm run audit:bundle

Si une validation échoue, corrige. Si une exigence n’a pas de preuve directe, considère-la incomplète.
```

---

## 1. Rôle de l’agent

Tu es l’agent chargé de reconstruire le parcours HTML de PulsaTeach pour qu’il devienne un parcours vitrine. Tu dois produire du code réel, pas seulement un plan.

Ton attitude :

- parler peu ;
- avancer par lots ;
- vérifier chaque lot ;
- corriger les régressions ;
- préserver les données utilisateur et les autres parcours ;
- ne jamais affaiblir un audit pour faire passer du contenu médiocre ;
- ne pas remplir avec des leçons creuses ;
- préférer 55 leçons vraiment utiles à 90 étapes mécaniques.

La cible n’est pas “un cours HTML de plus”. La cible est : “un apprenant débutant peut construire une vraie page publiable, accessible, indexable, testée et compréhensible”.

---

## 2. Règle d’inspiration freeCodeCamp

freeCodeCamp peut être utilisé comme référence pédagogique, pas comme source à copier.

Ce qui est autorisé :

- observer la progression en micro-étapes ;
- observer le principe de projet fil rouge ;
- observer la répétition utile ;
- observer la manière dont un test valide une compétence précise ;
- observer les certifications/projets comme jalons ;
- observer la simplicité du wording ;
- observer le découpage en blocs progressifs.

Ce qui est interdit :

- copier leurs textes ;
- copier leurs instructions ;
- copier leurs noms de projets ;
- copier leurs tests ;
- copier leurs solutions ;
- copier leurs assets ;
- traduire une leçon freeCodeCamp en français en l’appelant PulsaTeach.

Chaque exercice PulsaTeach doit être original :

- contexte PulsaTeach ;
- wording PulsaTeach ;
- projet fil rouge PulsaTeach ;
- données originales ;
- tests originaux ;
- pédagogie originale.

Si tu consultes le repo freeCodeCamp local, écris seulement des conclusions structurelles dans tes notes internes, jamais du contenu copié.

---

## 3. État actuel à inspecter

Avant toute modification, inspecter :

```bash
git status --short
rg --files src/content docs scripts tests
rg "html" src/content -n
```

Puis lire au minimum :

- `docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md`
- `docs/FCC_HTML_TO_PULSATEACH_MATRIX.md`
- `src/content/htmlTrack.js`
- `src/content/htmlTrackMetadata.js`
- `src/content/htmlModulesFoundation.js`
- `src/content/htmlModulesAdvanced.js`
- `src/content/htmlModulesWorkshop.js`
- `src/content/htmlModulesHardening.js`
- `src/content/htmlWorkshopBuilders.js`
- `src/htmlPedagogy.js`
- `src/lessonRuntime.js`
- `src/features/learn/LessonWorkspace.jsx`
- `scripts/audit-learning.mjs`
- `scripts/audit-editorial-quality.mjs`
- `scripts/audit-i18n.mjs`
- `scripts/audit-glossary.mjs`
- `tests/unit/catalogConsistency.test.js`
- les E2E liés aux leçons si présents.

Ne suppose pas que les docs historiques sont encore vraies. Vérifie les fichiers actuels.

---

## 4. Objectif produit du nouveau parcours HTML

Le parcours HTML doit enseigner :

1. comprendre une page web comme document structuré ;
2. écrire un squelette HTML moderne ;
3. choisir les bons éléments sémantiques ;
4. organiser titres, sections, articles, listes, citations, détails ;
5. créer une navigation claire ;
6. gérer liens internes/externes/download/email/téléphone ;
7. intégrer images, figures, audio, vidéo et alternatives ;
8. construire tableaux accessibles ;
9. construire formulaires robustes ;
10. utiliser labels, fieldsets, aides, erreurs, autocomplete ;
11. déclarer métadonnées SEO/social ;
12. comprendre landmarks, skip links et navigation clavier ;
13. utiliser `time`, `data`, `address`, `abbr`, `code`, etc. quand pertinent ;
14. éviter les anti-patterns : `div` partout, liens vagues, placeholders comme labels, mauvais ordre de titres ;
15. produire une page finale publiable et auditable.

L’apprenant doit sortir du parcours avec une compétence claire :

> “Je sais construire une page HTML complète, sémantique, accessible, indexable, maintenable et prête à recevoir CSS/JS.”

---

## 5. Format cible du parcours HTML

Vise environ :

- 7 à 9 modules ;
- 55 à 75 leçons ;
- 1 projet fil rouge ;
- 1 mini-projet par module ;
- 1 quiz sérieux par module ;
- 1 examen final ;
- 1 projet final auditable ;
- 1 rubric claire ;
- 1 certification compatible avec l’existant ;
- FR/EN complet ;
- au moins 5 tests par exercice ;
- au moins 8 tests par mini-projet ;
- au moins 18 tests sur le projet final.

Ne pas dépasser inutilement si la qualité baisse.

---

## 6. Projet fil rouge recommandé

Projet principal : `PulsaConf`

Construire progressivement une page d’événement tech gratuite :

- page d’accueil événement ;
- programme ;
- intervenants ;
- lieu ;
- formulaire d’inscription ;
- FAQ ;
- ressources ;
- mentions utiles ;
- tableau planning ;
- médias accessibles ;
- page finale publiable.

Pourquoi PulsaConf :

- assez réaliste ;
- permet navigation, sections, listes, cards, tableaux, formulaires, médias, SEO ;
- simple à comprendre pour débutants ;
- compatible portfolio ;
- cohérent avec PulsaTeach.

Chaque module doit ajouter une partie concrète à PulsaConf ou une variation directement utile.

---

## 7. Architecture pédagogique cible

Chaque leçon doit contenir :

- `id` stable ;
- `type`;
- `title.fr` et `title.en`;
- `brief.fr` et `brief.en`;
- `course.fr` et `course.en`;
- `pedagogy.fr` et `pedagogy.en`;
- `guide.fr` et `guide.en`;
- `starterCode`;
- `solution`;
- `tests`;
- `skills`;
- `vocabulary`;
- `difficulty`;
- `durationMin`;
- `xp`;
- si utile : `projectThreadId`, `stepNumber`, `buildsOn`.

Chaque leçon doit répondre à cette question :

> “Quelle capacité observable l’apprenant gagne-t-il ici ?”

Si la réponse est vague, réécris la leçon.

---

## 8. Standard d’une leçon PulsaTeach premium

Une bonne leçon HTML PulsaTeach :

- commence par un contexte court ;
- explique pourquoi l’élément existe ;
- montre un bon exemple ;
- montre un piège fréquent ;
- demande une modification courte ;
- teste la structure réelle ;
- donne un feedback utile ;
- relie au projet fil rouge ;
- prépare l’étape suivante.

Exemple de niveau attendu :

Mauvais :

> Ajoute un h1.

Bon :

> La page PulsaConf doit avoir un titre principal unique pour que les lecteurs d’écran, moteurs de recherche et utilisateurs comprennent immédiatement le sujet. Ajoute un `h1` dans `main`, puis garde les titres de section en `h2` pour former un plan lisible.

Tests attendus :

- présence de `main`;
- présence d’un seul `h1`;
- texte du `h1` non vide ;
- présence de `h2` pour sections ;
- interdiction de plusieurs `h1`;
- ordre logique `h1` avant `h2`.

---

## 9. Modules recommandés

### Module 1 — Document HTML moderne

Objectif : comprendre la structure minimale d’une page.

Leçons possibles :

1. doctype et mode standard ;
2. racine `html` et `lang`;
3. `head` vs `body`;
4. charset UTF-8 ;
5. viewport ;
6. title utile ;
7. meta description ;
8. mini-projet : squelette PulsaConf ;
9. quiz : anatomie d’un document.

Compétences :

- document-metadata ;
- language ;
- title-description ;
- viewport ;
- document-skeleton.

Tests :

- `<!doctype html>`;
- `html[lang]`;
- `meta[charset="UTF-8"]`;
- `meta[name="viewport"]`;
- `title`;
- `body`;
- absence de contenu visible dans `head`.

### Module 2 — Texte, titres et sections

Objectif : organiser le contenu pour humains et machines.

Leçons possibles :

1. `main` et titre principal ;
2. hiérarchie `h1` → `h2` → `h3`;
3. paragraphes ;
4. emphase réelle vs décorative ;
5. `section` avec nom accessible ;
6. `article` pour contenu autonome ;
7. `aside` pour contenu complémentaire ;
8. `blockquote` et citation ;
9. `details` / `summary`;
10. mini-projet : page programme PulsaConf ;
11. quiz : structure sémantique.

Tests :

- un seul `h1`;
- sections nommées ;
- ordre des titres ;
- `article` autonome ;
- pas de `div` comme remplacement systématique ;
- `summary` premier enfant de `details`.

### Module 3 — Navigation et liens

Objectif : créer des chemins clairs et accessibles.

Leçons possibles :

1. lien explicite ;
2. lien interne avec ancre ;
3. navigation principale `nav aria-label`;
4. `aria-current`;
5. lien externe sûr ;
6. lien email/téléphone ;
7. lien de téléchargement ;
8. skip link ;
9. mini-projet : navigation PulsaConf ;
10. quiz : liens et navigation.

Tests :

- `nav`;
- `aria-label`;
- liens non vagues ;
- `href` réel ;
- `aria-current="page"`;
- `target="_blank"` accompagné de `rel`;
- skip link vers `#main-content`.

### Module 4 — Images, médias et contenu riche

Objectif : intégrer des médias sans casser accessibilité/perf.

Leçons possibles :

1. `img` avec `alt` utile ;
2. image décorative avec `alt=""`;
3. `figure` et `figcaption`;
4. largeur/hauteur pour éviter layout shift ;
5. `loading="lazy"` quand pertinent ;
6. audio avec fallback ;
7. vidéo avec captions ;
8. mini-projet : galerie intervenants ;
9. quiz : alternatives médias.

Tests :

- `img[alt]`;
- alt non générique ;
- `figure > img + figcaption`;
- `width` et `height`;
- `audio controls`;
- `video controls`;
- `track[kind="captions"]`.

### Module 5 — Listes, tableaux et données structurées

Objectif : représenter de l’information organisée.

Leçons possibles :

1. liste non ordonnée ;
2. liste ordonnée ;
3. liste de définitions ;
4. tableau simple ;
5. `caption`;
6. `thead`, `tbody`;
7. `th scope`;
8. `time datetime`;
9. `data value`;
10. mini-projet : planning PulsaConf ;
11. quiz : choisir la bonne structure.

Tests :

- `ul`/`ol` pertinents ;
- `dl/dt/dd`;
- `table`;
- `caption`;
- `th[scope]`;
- `time[datetime]`;
- `data[value]`.

### Module 6 — Formulaires HTML natifs

Objectif : construire un formulaire utilisable sans JS.

Leçons possibles :

1. `form` action/method ;
2. label relié `for/id`;
3. input text/email ;
4. required/minlength/pattern ;
5. autocomplete ;
6. textarea ;
7. select ;
8. radio group ;
9. checkbox consentement ;
10. button submit ;
11. mini-projet : inscription PulsaConf ;
12. quiz : contrôles natifs.

Tests :

- `form`;
- `label[for]`;
- `input[id]`;
- `name`;
- `type="email"`;
- `required`;
- `autocomplete`;
- `button[type="submit"]`;
- pas de placeholder comme seul label.

### Module 7 — Formulaires accessibles et feedback

Objectif : gérer aide, erreurs et statuts.

Leçons possibles :

1. texte d’aide avec `aria-describedby`;
2. erreurs champ ;
3. `fieldset` / `legend`;
4. groupes radio ;
5. état désactivé ;
6. `aria-live` poli ;
7. `role="alert"` ;
8. `aria-busy` ;
9. mini-projet : formulaire robuste ;
10. quiz : feedback accessible.

Tests :

- `fieldset`;
- `legend`;
- `aria-describedby`;
- id référencé existant ;
- `role="status"`;
- `aria-live="polite"`;
- `role="alert"`;
- relation label/champ.

### Module 8 — SEO, partage et publication

Objectif : rendre la page compréhensible par moteurs et réseaux.

Leçons possibles :

1. title SEO ;
2. meta description ;
3. canonical ;
4. Open Graph title/description/image ;
5. favicon ;
6. robots basique côté page si nécessaire ;
7. données structurées simples ;
8. langue et hreflang conceptuel ;
9. mini-projet : head complet PulsaConf ;
10. quiz : SEO HTML.

Tests :

- `title` spécifique ;
- description unique ;
- canonical absolu ;
- `og:title`;
- `og:description`;
- `og:image`;
- favicon ;
- JSON-LD valide si présent.

### Module 9 — Projet final et audit

Objectif : livrer une page complète.

Leçons possibles :

1. assembler le squelette ;
2. assembler la navigation ;
3. assembler programme/intervenants ;
4. assembler formulaire ;
5. assembler médias ;
6. assembler SEO ;
7. audit accessibilité ;
8. audit anti-pattern ;
9. examen final ;
10. projet final PulsaConf publiable.

Tests projet final :

- doctype ;
- lang ;
- charset ;
- viewport ;
- title ;
- description ;
- canonical ;
- landmarks ;
- skip link ;
- nav nommée ;
- main unique ;
- h1 unique ;
- ordre des titres ;
- images alt ;
- figure/figcaption ;
- tableau caption/scope ;
- form labels ;
- fieldset/legend ;
- aria-describedby ;
- status/alert ;
- footer ;
- absence de `clique ici`;
- absence de placeholder-only ;
- liens réels.

---

## 10. Quiz HTML : niveau attendu

Chaque quiz doit avoir 6 à 12 questions selon module.

Types de questions :

- choix unique ;
- choix multiple ;
- vrai/faux ;
- court ouvert ;
- ordre logique ;
- diagnostic de code ;
- “quel élément choisir ?” ;
- “quel bug accessibilité/SEO ?”.

Mauvaises réponses :

- crédibles ;
- liées à des erreurs fréquentes ;
- jamais absurdes gratuitement.

Chaque question doit avoir :

- feedback FR ;
- feedback EN ;
- compétence liée ;
- éventuellement vocabulaire lié.

Exemple :

Question faible :

> Quel élément fait un lien ?

Question forte :

> Dans une navigation principale, quel lien indique clairement la page active sans changer le texte visible ?

Réponses :

- `aria-current="page"` sur le lien actif ;
- `target="_blank"` sur tous les liens ;
- un `div` avec une classe active ;
- un placeholder dans le menu.

Feedback :

> `aria-current="page"` expose l’état courant aux technologies d’assistance et clarifie la navigation.

---

## 11. Tests : exigences techniques

Ne crée pas des tests faciles qui passent avec n’importe quel code.

Préférer :

- tests DOM structurels ;
- tests d’attributs ;
- tests d’ordre ;
- tests de relation `for/id`;
- tests de relation `aria-describedby`;
- tests de texte interdit ;
- tests de nombre d’éléments ;
- tests sur liens ;
- tests sur head/meta.

Si les helpers existants ne suffisent pas, ajouter proprement de nouveaux types de tests dans `lessonRuntime.js` et les couvrir en unit tests.

Types utiles à envisager :

- `countSelector`;
- `attributeEquals`;
- `attributeIncludes`;
- `domOrder`;
- `uniqueSelector`;
- `notSelector`;
- `notContains`;
- `ariaReferenceExists`;
- `labelForInput`;
- `headingOutline`.

Ne pas ajouter ces types si les tests actuels suffisent, mais ne pas brider la pédagogie à cause de limites techniques.

---

## 12. Vocabulaire à relier

Créer ou vérifier les termes :

- HTML ;
- doctype ;
- élément ;
- attribut ;
- balise ;
- document ;
- head ;
- body ;
- charset ;
- viewport ;
- title ;
- meta description ;
- semantic HTML ;
- landmark ;
- main ;
- nav ;
- section ;
- article ;
- aside ;
- heading ;
- accessible name ;
- alt text ;
- figure ;
- figcaption ;
- form ;
- label ;
- input ;
- fieldset ;
- legend ;
- autocomplete ;
- constraint validation ;
- aria-describedby ;
- aria-live ;
- status ;
- alert ;
- table ;
- caption ;
- scope ;
- time ;
- canonical ;
- Open Graph ;
- favicon ;
- JSON-LD.

Chaque terme doit être bilingue et relié à au moins une leçon utile.

---

## 13. Fichiers à modifier en priorité

Probable :

- `src/content/htmlTrackMetadata.js`
- `src/content/htmlTrack.js`
- `src/content/htmlModulesFoundation.js`
- `src/content/htmlModulesAdvanced.js`
- `src/content/htmlModulesWorkshop.js`
- `src/content/htmlModulesHardening.js`
- `src/content/htmlWorkshopBuilders.js`
- `src/htmlPedagogy.js`

Possible :

- `src/lessonRuntime.js`
- `scripts/audit-learning.mjs`
- `scripts/audit-glossary.mjs`
- `scripts/audit-i18n.mjs`
- `tests/unit/*`
- `tests/e2e/*`
- `docs/FCC_HTML_TO_PULSATEACH_MATRIX.md`
- `docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md`

Éviter sauf nécessité :

- autres tracks ;
- auth ;
- social bots ;
- cookies ;
- `.env`;
- fichiers dans `pulsateach_social_bot/data`.

---

## 14. Plan d’exécution recommandé

### Lot 0 — Audit HTML réel

Faire :

```bash
npm run audit:learning
npm run audit:editorial
npm run audit:i18n
npm run audit:glossary
```

Puis produire une mini-matrice interne :

- module actuel ;
- nombre de leçons ;
- points faibles ;
- ce qui est conservé ;
- ce qui est remplacé ;
- nouveaux modules cibles.

Ne pas s’arrêter à l’audit. Continuer.

### Lot 1 — Fondations techniques

Objectif : s’assurer que le modèle peut porter un parcours plus riche.

Actions possibles :

- vérifier `projectThreadId`, `stepNumber`, `buildsOn`;
- renforcer helper workshop si utile ;
- ajouter helpers HTML pour générer course/pedagogy sans duplication ;
- vérifier que l’UI affiche correctement le fil rouge ;
- ajouter tests runtime si nécessaire.

Validation :

```bash
npm run lint
npm run test
npm run audit:architecture
```

### Lot 2 — Modules 1 à 3

Refaire :

- document moderne ;
- texte/sections ;
- navigation/liens.

Livrable :

- 20 à 25 leçons ;
- 3 quiz ;
- 3 mini-projets ;
- tests solides.

Validation :

```bash
npm run audit:learning
npm run audit:i18n
npm run test
```

### Lot 3 — Modules 4 à 7

Refaire :

- médias ;
- données/tableaux ;
- formulaires natifs ;
- formulaires accessibles.

Livrable :

- 25 à 35 leçons supplémentaires ;
- 4 quiz ;
- 4 mini-projets ;
- vocabulaire enrichi.

Validation :

```bash
npm run audit:learning
npm run audit:glossary
npm run audit:editorial
npm run audit:i18n
npm run test
```

### Lot 4 — SEO/publication/projet final

Refaire :

- SEO HTML ;
- Open Graph ;
- favicon ;
- canonical ;
- JSON-LD simple ;
- audit final ;
- capstone.

Livrable :

- projet final PulsaConf ;
- examen final ;
- rubric ;
- certificat compatible ;
- tests projet final forts.

Validation :

```bash
npm run audit:learning
npm run audit:seo
npm run build
```

### Lot 5 — E2E et finition

Actions :

- vérifier `/catalog`;
- vérifier `/learn/html`;
- vérifier une leçon HTML fondation ;
- vérifier un quiz HTML ;
- vérifier projet final HTML ;
- vérifier responsive mobile ;
- vérifier absence d’erreurs console si tests E2E existants.

Commandes :

```bash
npm run validate
npm run test:e2e
```

Si `test:e2e` est long, lancer au minimum les E2E ciblés disponibles, puis documenter.

---

## 15. Prompt détaillé pour Lot 0

```text
Commence par auditer uniquement le parcours HTML actuel.

Lis :
- docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md
- docs/FCC_HTML_TO_PULSATEACH_MATRIX.md
- src/content/htmlTrack.js
- src/content/htmlTrackMetadata.js
- src/content/htmlModulesFoundation.js
- src/content/htmlModulesAdvanced.js
- src/content/htmlModulesWorkshop.js
- src/content/htmlModulesHardening.js
- src/htmlPedagogy.js
- scripts/audit-learning.mjs
- scripts/audit-i18n.mjs
- scripts/audit-glossary.mjs

Puis lance :
npm run audit:learning
npm run audit:editorial
npm run audit:i18n
npm run audit:glossary

Écris une courte matrice interne :
- leçons à garder ;
- leçons à remplacer ;
- modules à fusionner ;
- modules à créer ;
- tests insuffisants ;
- vocabulaire manquant.

Ne t’arrête pas à l’audit : prépare ensuite le Lot 1.
```

---

## 16. Prompt détaillé pour Lot 1

```text
Implémente les fondations techniques nécessaires pour reconstruire HTML proprement.

Objectif :
- supporter un projet fil rouge HTML PulsaConf ;
- éviter la duplication de gros objets course/pedagogy ;
- rendre les leçons HTML plus faciles à écrire et maintenir ;
- permettre des tests DOM/a11y/SEO plus précis si nécessaire.

Travaille dans :
- src/content/htmlWorkshopBuilders.js
- src/content/htmlModules*.js
- src/lessonRuntime.js si nécessaire
- tests/unit si nouveaux tests runtime

Ajoute seulement ce qui est utile. Ne construis pas une usine à gaz.

Validation :
npm run lint
npm run test
npm run audit:architecture
```

---

## 17. Prompt détaillé pour Lot 2

```text
Refais les modules HTML 1 à 3 :
1. document HTML moderne ;
2. texte, titres, sections ;
3. navigation et liens.

Objectif :
- créer environ 20 à 25 micro-leçons utiles ;
- introduire PulsaConf comme projet fil rouge ;
- ajouter un mini-projet par module ;
- ajouter un quiz riche par module ;
- garder FR/EN complet ;
- lier vocabulaire ;
- ajouter au moins 5 tests par exercice.

Ne copie aucun texte freeCodeCamp. Inspire-toi seulement de la granularité et des validations.

Les leçons doivent être concrètes, non bateau, progressives et validables.

Validation :
npm run audit:learning
npm run audit:i18n
npm run audit:glossary
npm run test
```

---

## 18. Prompt détaillé pour Lot 3

```text
Refais les modules HTML 4 à 7 :
4. images, médias et alternatives ;
5. listes, tableaux et données ;
6. formulaires HTML natifs ;
7. formulaires accessibles et feedback.

Objectif :
- ajouter 25 à 35 leçons supplémentaires ;
- renforcer les tests DOM et accessibilité ;
- créer des mini-projets réalistes ;
- enrichir les quiz avec diagnostics de code ;
- relier vocabulaire, compétences et révisions.

Chaque leçon doit apprendre une compétence observable.
Chaque mini-projet doit assembler plusieurs compétences du module.

Validation :
npm run audit:learning
npm run audit:editorial
npm run audit:i18n
npm run audit:glossary
npm run test
```

---

## 19. Prompt détaillé pour Lot 4

```text
Refais la fin du parcours HTML :
8. SEO, partage et publication ;
9. projet final, examen et audit.

Objectif :
- enseigner head SEO, canonical, Open Graph, favicon, JSON-LD simple ;
- créer un examen final sérieux ;
- créer un projet final PulsaConf publiable ;
- ajouter une rubric premium ;
- ajouter au moins 18 tests sur le projet final ;
- vérifier que le parcours prépare bien au certificat.

Le projet final doit exiger :
- document complet ;
- landmarks ;
- navigation nommée ;
- skip link ;
- sections bien titrées ;
- médias accessibles ;
- tableau accessible ;
- formulaire accessible ;
- feedback accessible ;
- SEO/social metadata ;
- liens non vagues ;
- footer.

Validation :
npm run audit:learning
npm run audit:seo
npm run build
```

---

## 20. Prompt détaillé pour Lot 5

```text
Finalise et durcis la refonte HTML.

Actions :
- lance npm run validate ;
- lance npm run test:e2e si possible ;
- corrige toutes les régressions ;
- vérifie une leçon HTML sur desktop et mobile ;
- vérifie un quiz HTML ;
- vérifie le projet final ;
- vérifie le rendu catalogue/parcours ;
- mets à jour docs/FCC_HTML_TO_PULSATEACH_MATRIX.md ;
- documente ce qui a changé.

Ne déclare pas terminé si :
- audit learning rouge ;
- i18n incomplet ;
- vocabulaire orphelin ;
- build cassé ;
- E2E critique cassé ;
- contenu creux ajouté pour gonfler les chiffres.
```

---

## 21. Définition de “terminé”

La refonte HTML est terminée si :

- le parcours HTML a une progression claire ;
- chaque module a une finalité ;
- chaque leçon a un objectif observable ;
- les quiz sont sérieux ;
- le projet final assemble réellement les compétences ;
- les tests empêchent les réponses superficielles ;
- FR/EN complet ;
- vocabulaire relié ;
- audits verts ;
- build vert ;
- pas de changements hors scope ;
- documentation mise à jour.

Commandes minimales :

```bash
npm run lint
npm run test
npm run audit:architecture
npm run audit:catalog
npm run audit:learning
npm run audit:editorial
npm run audit:glossary
npm run audit:i18n
npm run audit:migrations
npm run build
npm run audit:seo
npm run audit:bundle
```

Idéal :

```bash
npm run validate
npm run test:e2e
```

---

## 22. Compte rendu attendu par OpenCode

À la fin, l’agent doit fournir :

- nombre de modules HTML ;
- nombre de leçons HTML ;
- nombre de quiz ;
- nombre de mini-projets ;
- nombre de tests HTML ;
- fichiers modifiés ;
- nouveaux helpers éventuels ;
- validations lancées ;
- résultats ;
- limites restantes ;
- prochaines recommandations.

Format recommandé :

```text
Résultat :
- HTML reconstruit en X modules, Y leçons, Z quiz, N projets.

Décisions :
- projet fil rouge PulsaConf ;
- tests DOM renforcés ;
- quiz par module ;
- vocabulaire relié.

Fichiers principaux :
- ...

Validations :
- npm run validate : OK/KO
- npm run test:e2e : OK/KO/skipped

Limites :
- ...
```

---

## 23. Interdictions explicites

Ne pas :

- modifier les bots sociaux ;
- lire ou pousser des cookies ;
- lire ou pousser `.env`;
- modifier `pulsateach_social_bot/data`;
- faire un commit sans demande ;
- pousser sans demande ;
- copier freeCodeCamp ;
- baisser les audits ;
- supprimer des tests pour passer ;
- remplacer une leçon par un contenu générique ;
- changer les autres parcours sans raison technique claire.

---

## 24. Note importante pour le style PulsaTeach

Le style doit être :

- clair ;
- moderne ;
- direct ;
- encourageant sans être enfantin ;
- orienté pratique ;
- sérieux ;
- accessible aux débutants ;
- utile pour une vraie production web.

Éviter :

- “HTML est un langage de balisage” répété 40 fois ;
- exercices purement décoratifs ;
- leçons qui ne demandent qu’un mot ;
- quiz trivia ;
- exemples sans contexte ;
- textes trop longs qui noient l’action.

Préférer :

- “Tu construis la section Programme de PulsaConf” ;
- “Ce test vérifie que le formulaire reste utilisable sans JavaScript” ;
- “Ce lien est mauvais parce que ‘clique ici’ ne donne aucun contexte” ;
- “Le `label` donne un nom accessible au champ, le placeholder ne le remplace pas”.

