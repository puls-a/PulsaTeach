# PulsaTeach - plan directeur d'achevement

Statut : source de verite active
Derniere mise a jour : 2026-11-17
Objectif : transformer PulsaTeach en produit educatif public fiable, utile et honnete.

## Mandat

L'assistant prend en charge le chantier de bout en bout : audit, priorisation,
implementation, tests, documentation, verification et preparation des releases.
Il avance sans demander de micro-decisions lorsque le choix est reversible et
technique. Il demande une decision uniquement pour un cout, un secret, une
action externe irreversible ou un choix produit qui engage l'utilisateur.

Les validations automatiques ne constituent jamais, seules, une preuve de
qualite pedagogique. Une affirmation de conformite doit etre soutenue par une
lecture humaine, un test comportemental ou une mesure de production adaptee.

## Evaluation de depart

- Produit local : environ 45 % d'un excellent produit public.
- Production : environ 38 %, car les changements locaux recents ne sont pas livres.
- Risque principal : quantite de contenu superieure a la qualite effectivement relue.
- Signal d'alerte : les audits i18n et editoriaux ont passe alors que des textes
  mixtes, des quiz desalignees et des exercices pre-resolus existaient encore.

Ces pourcentages sont des estimations de pilotage, pas des metriques marketing.

Un audit expert externe du 17 novembre 2026 (`PulsaTeach-Audit.md`, fourni par l'utilisateur hors dépôt) note **7/10 le seul premier parcours HTML public observé**. Cette note ne mesure ni la qualité du site entier, ni une réussite d'apprenants ; elle ne remplace pas ces estimations et les modifications locales ci-dessous ne sont pas encore en production.

## Regles non negociables

1. Une lecon n'est terminee que si consigne, cours, starter, solution, indice et tests racontent la meme chose.
2. Une solution doit passer tous ses tests en francais et en anglais.
3. Un starter doit echouer de maniere utile sans fournir la reponse.
4. Un quiz mesure la question affichee, pas un gabarit generique reutilise.
5. Un projet couvre reellement les acquis annonces dans son module.
6. L'anglais est redige comme un contenu complet, jamais fabrique par substitutions partielles.
7. Les exemples du cours ne copient pas la solution de l'exercice.
8. Les parcours debutants n'introduisent pas de notion avancee avant de l'expliquer.
9. Les tests verifient des relations semantiques ou des comportements, pas seulement des mots presents.
10. Une fonctionnalite critique est testee sur mobile, desktop, clavier, erreur et reprise.
11. Aucune promesse de certification, progression ou resultat ne depasse ce que le produit prouve.
12. Aucun document ne declare le produit conforme sans date, commande et limite connues.

## Definition de termine

### Lecon

- contenu FR et EN relu ;
- exactitude technique verifiee ;
- prerequis coherents avec la progression ;
- starter non resolu et solution valide ;
- indice specifique a l'erreur probable ;
- tests assez precis pour refuser un faux positif evident ;
- exemple distinct de la solution ;
- navigation clavier ou comportement manuel precise lorsque necessaire.

### Module

- progression cumulative ou independance explicitement annoncee ;
- chaque quiz possede des choix et reponses alignes ;
- projet couvrant les objectifs annonces ;
- solutions et starters executes dans les deux langues ;
- tests de non-regression dedies ;
- aucune traduction mixte dans les artefacts apprenant.

### Fonctionnalite

- etats chargement, vide, succes, erreur et nouvelle tentative ;
- comportement invite, authentifie et non autorise lorsque pertinent ;
- mobile 375 px et desktop ;
- clavier, focus et lecteur d'ecran controles ;
- donnees concurrentes et requetes obsoletes gerees ;
- journalisation sans secret ni donnee personnelle inutile.

### Release

- worktree compris et changements sans rapport exclus ;
- `npm run validate` reussi ;
- tests API, E2E, accessibilite et smoke pertinents executes ;
- migration testee localement avant application distante ;
- production verifiee apres deploiement ;
- rollback identifie ;
- document d'etat mis a jour avec limites restantes.

## Ordre d'execution

### P0 - Fiabiliser les parcours publics

1. Terminer l'audit manuel HTML, modules 03 a 09.
2. Auditer integralement le parcours CSS public.
3. Auditer integralement le parcours JavaScript public.
4. Verifier que catalogue, reprise, progression, quiz et projets fonctionnent de bout en bout.
5. Refuser toute publication de lecon qui ne respecte pas la definition de termine.

### P1 - Retablir la confiance dans les controles

1. Remplacer les audits de presence par des controles semantiques.
2. Detecter le francais residuel dans les artefacts anglais.
3. Tester automatiquement que solutions et starters ont le comportement attendu.
4. Ajouter des controles d'alignement quiz/prompt/reponse.
5. Produire un rapport qui distingue quantite generee et contenu humainement relu.

### P2 - Parcours utilisateur reel

1. Tester decouverte sans compte, premiere lecon, reprise et validation.
2. Tester inscription, connexion, deconnexion et recuperation d'erreur.
3. Tester progression locale puis synchronisee.
4. Tester quiz, projet, revision et certificat sans promesse trompeuse.
5. Simplifier toute page dont l'action suivante reste ambigue.

### P3 - Qualite d'interface

1. Revue mobile et desktop de toutes les routes publiques.
2. Revue clavier, focus, contrastes, zoom et reduced motion.
3. Harmonisation typographique, espacement, formulaires et messages d'erreur.
4. Suppression des textes abstraits et des statistiques non prouvees.
5. Controle des performances avec appareils et reseaux modestes.

### P4 - Backend, donnees et exploitation

1. Revalider autorisations, RLS, validation des payloads et rate limits.
2. Tester conflits, idempotence, reprises et migrations.
3. Verifier logs, alertes, healthchecks, sauvegarde et restauration.
4. Eliminer les ecarts entre schema local, Supabase et code client.
5. Documenter les procedures de panne et de rollback reellement testees.

### P5 - Validation externe

1. Preparer un protocole pour 5 a 10 debutants.
2. Mesurer comprehension, temps de blocage, abandon et reprise.
3. Observer sans aider pendant la premiere lecon et le premier quiz.
4. Corriger les trois blocages les plus frequents avant toute expansion.
5. Recalculer l'estimation de maturite a partir des resultats observes.

### P6 - Release propre

1. Separer changements produit, contenu et medias sociaux.
2. Exclure rendus lourds et secrets.
3. Produire des commits logiques apres autorisation explicite.
4. Deployer apres autorisation explicite.
5. Verifier la production et consigner la version livree.

## Etat courant

| Chantier | Etat | Preuve | Suite |
| --- | --- | --- | --- |
| Introduction HTML 00 | Relu localement | tests bilingues et quiz specialises | conserver sous regression |
| Document HTML 01 | Relu localement | progression cumulative et projet incomplet au depart | conserver sous regression |
| Textes et sections HTML 02 | Relu localement | artefacts bilingues, projet complet, quiz specialise | conserver sous regression |
| Navigation HTML 03 | Relu localement | fragments resolus, liens cumulatifs, quiz et projet specialises | conserver sous regression |
| Medias HTML 04 | Relu localement | progression cumulative, assets locaux, alternatives, captions, transcriptions, quiz et projet bilingues | conserver sous regression |
| Listes et donnees HTML 05 | Relu localement | progression cumulative, anglais redige, quiz aligne, projet couvrant listes, tableau et valeurs machine | conserver sous regression |
| Formulaires natifs HTML 06 | Relu localement | progression cumulative, contrat de soumission, controles nommes, contraintes, quiz et projet bilingues | conserver sous regression |
| Feedback accessible HTML 07 | Relu localement | etats initiaux et dynamiques separes, templates inspectes, quiz et projet bilingues | conserver sous regression |
| SEO, partage et publication HTML 08 | Relu localement | head cumulatif bilingue, URLs coherentes, assets reels, JSON-LD valide, quiz et projet specialises | conserver sous regression |
| Projet final et audit HTML 09 | Relu localement | progression cumulative depuis HTML 08, examen specialise, projet final bilingue et audit transversal | conserver sous regression |
| Introduction CSS 00 | Relu localement | progression cumulative, preview bilingue, declarations et media queries semantiques, quiz et projet alignes | conserver sous regression |
| Selecteurs, cascade et couleurs CSS 01 | Relu localement | huit etapes cumulatives, valeurs exactes, preview bilingue, quiz et projet alignes | conserver sous regression |
| Box model et typographie CSS 02 | Relu localement | huit etapes cumulatives, contenu extreme, valeurs exactes, quiz et lab public alignes | conserver sous regression |
| Flexbox et mise en page CSS 03 | Relu localement | huit etapes cumulatives depuis CSS 02, preview mobile/desktop, ordre clavier, quiz et lab specialises | conserver sous regression |
| Grid et compositions CSS 04 | Relu localement | huit etapes cumulatives depuis CSS 03, pistes intrinseques, ordre source, quiz et lab specialises | conserver sous regression |
| Architecture de selecteurs CSS 05 | Relu localement | huit etapes cumulatives depuis CSS 04, portee et contre-exemples, quiz, projet et preuve navigateur mobile/desktop | conserver sous regression |
| Box model avance CSS 06 | Relu localement | huit etapes cumulatives depuis CSS 05, axes logiques, tokens, contenu extreme, quiz, projet et preuve navigateur | conserver sous regression |
| Navigation Flexbox CSS 07 | Relu localement | huit etapes cumulatives depuis CSS 06, sizing des groupes, repli responsive, quiz et projet avec ordre clavier | conserver sous regression |
| Zones et placement Grid CSS 08 | Relu localement | huit etapes cumulatives depuis CSS 07, zones nommees, placement sans reordonner le DOM, empilement responsive et preuve navigateur | conserver sous regression |
| Responsive mobile-first CSS 09 | Relu localement | huit etapes cumulatives depuis CSS 08, breakpoints, clamp, conteneurs, medias stables et preuve navigateur desktop/mobile | conserver sous regression |
| États interactifs accessibles CSS 10 | Relu localement | huit etapes cumulatives depuis CSS 09, focus clavier, hover, disabled, cibles de 44px et forced-colors | conserver sous regression |
| Mouvement responsable CSS 11 | Relu localement | huit etapes cumulatives depuis CSS 10, transitions et animations bornées, mouvement réduit sans perte d'information et preuve navigateur | conserver sous regression |
| Capstone CSS 12 | Relu localement | huit decisions cumulatives depuis CSS 11, integration viewport/conteneur/media, forced-colors, reduced motion et audit desktop/mobile | conserver sous regression |
| CSS public restant | Audité transversalement localement | 15 modules dans l'ordre publié ; chargeurs complets et par module alignés ; 20 E2E CSS desktop/mobile réussis | conserver sous regression |
| JavaScript public | Audité localement | solutions/starters bilingues, exemples distincts, quiz, 16 projets exécutables, previews DOM et 18 routes de module vérifiés ; E2E desktop/mobile | conserver sous régression et préparer l'observation par de vrais apprenants |
| P1 — qualité des contrôles pédagogiques | En cours | module JS Validation robuste repris sans tests de présence : scénarios métier, refus de données invalides et seuil de score réel | étendre aux autres modules, mesurer les faux positifs et documenter les preuves |
| Parcours d’apprentissage public de bout en bout | Vérifié localement | catalogue → programme → première leçon réussie → progression réellement sauvegardée → reprise au dashboard ; résultat d'examen persistant et soumission de projet depuis la leçon | conserver sous régression ; prolonger avec observation apprenant réelle |
| Premier exercice HTML — audit expert externe PT-01 à PT-06 | Lot technique terminé localement ; PT-06 non reproduit | CTA et durée à ~15 min, 5 tests précis FR/EN, solution vierge, sauvegarde et fusion facultative, liens programme nommés ; E2E desktop/mobile | retester en production après release autorisée ; observer 5 vrais utilisateurs selon `docs/USER_TEST_PROTOCOL.md` |
| Catalogue et reprise | Revu localement | aide au choix preservee, recherche bilingue et reprise mobile testees | prochaine release controlee |
| Interface publique | Corrigee localement | tiroir mobile plein viewport, focus, scroll et breakpoint desktop couverts par E2E | livrer puis verifier sur telephone reel |
| Anciens Reels | Retires localement | sources V3/V4, rendus, voix, campagne et publisher dedie supprimes ; videos produit V2 preservees | repartir d'un storyboard et d'une direction visuelle neufs |
| Reel HTML | Rendu localement | capture mobile reelle, doctype saisi, 5 checks valides, master vertical et SRT controles | verifier sur telephone puis publier manuellement |
| Reel nouvelle UI | Rendu localement | recit en huit actes depuis les captures accueil, catalogue et atelier ; master vertical de 41 secondes, 1 230 images decodees, SRT et quatorze images cles controlees | verifier sur telephone puis publier manuellement |
| Reel Flexbox | Brouillon non retenu | sujet écarté suite au retour utilisateur (« déjà fait ») ; master local conservé, non utilisé comme livrable de cette reprise | ne pas réutiliser pour la prochaine publication |
| Reel Sandbox | Rendu local vérifié | capture réelle : CSS change la carte, JavaScript monte à 20 XP, validation de mission ; carton de marque avec logo, URL Playground et contenu maintenu dans la zone sûre verticale | revue humaine sur téléphone avant publication manuelle |
| Reel JavaScript | Rendu local vérifié | récit réel échec→correction→2 cas réussis ; master 1080 × 1920, SRT, sept images clés, logo/CTA dans la zone centrale | revue humaine sur téléphone avant publication manuelle |
| Reel Révision active | Rendu local vérifié | session de démonstration : question, réponse vérifiée, évaluation et prochaine révision planifiée ; carton logo/CTA et zones sûres | revue humaine sur téléphone avant publication manuelle |
| Reel Défi label HTML | Prêt pour publication manuelle | hook puzzle 3 s ; interaction réelle dans `html-06-label-input-text`, mismatch `for`/`id` délibéré détecté, correction et checks 5/5 ; master 17,26 s en 1080 × 1920, SRT, logo/CTA et safe zones | placer l'URL exacte en bio, vérifier sur téléphone puis publier manuellement |
| Domaine `pulsateach.com` | Verifie en production | domaines Vercel et HTTPS valides, `www` en 308, DNS Cloudflare non proxifie, CORS et Auth Supabase alignes | conserver sous monitoring et regression |
| Securite Supabase | Verifiee en production | 15 tables serveur sans privilege client, politiques RLS explicites et TOTP actif ; advisors RLS/MFA resolus | conserver sous regression ; HaveIBeenPwned exige le plan Pro |
| Production | Vérifiée le 17 novembre 2026 | commit produit `bf65e2d`, déploiement `dpl_5xds4bnV9b85J7mQ8VEvCJEGZtbo` READY sur `pulsateach.com`, smoke sur 7 routes et 28 leçons | surveiller les erreurs et faire observer les parcours à de vrais apprenants ; rollback : `dpl_2oAKeuWrtyxVZCaNafaUjA5zByLM` |
| Tests utilisateurs | Protocole prêt, sessions non effectuées | `docs/USER_TEST_PROTOCOL.md` adapté du document externe fourni ; aucune personne recrutée ni observée | cinq séances (3 débutants, 2 avec notions HTML), puis revue des blocages |
| Release publique HTML/CSS/JavaScript | Livrée et vérifiée techniquement | 211 E2E réussis / 45 ignorés, 468 unitaires, 31 API ; déploiement `bf65e2d`, smoke production 7 routes / 28 leçons, CORS VTT/vidéo vérifié sur `pulsateach.com` | observation de vrais apprenants encore à mener |

## Protocole de reprise automatique

Au debut de chaque session :

1. lire ce document ;
2. inspecter `git status` sans modifier les changements inconnus ;
3. prendre le premier chantier non termine de plus haute priorite ;
4. auditer avant d'editer ;
5. implementer le plus petit lot coherent ;
6. ajouter les tests qui prouvent la correction ;
7. executer les validations pertinentes puis `npm run validate` ;
8. mettre a jour la table d'etat et le journal ci-dessous ;
9. ne pas s'arreter sur une simple analyse si une correction est faisable.

## Commandes de controle

```bash
npm run validate
npm run test:api
npm run test:e2e
npm run test:a11y
npm run smoke:full
npm run audit:lighthouse
```

Toutes ne doivent pas etre lancees apres chaque modification. La commande doit
correspondre au risque modifie, mais une release exige la chaine complete utile.

## Journal

### 2026-11-05

- creation du plan directeur ;
- ajout de `AGENTS.md` pour imposer ce plan lors des reprises futures ;
- constat officiel que les anciennes matrices de conformite surestiment la qualite ;
- modules HTML 00, 01 et 02 repris manuellement ;
- validation locale avant le module 03 : 53 fichiers de tests et 291 tests reussis ;
- module HTML 03 repris : fragments uniques, navigation nommee, position courante, liens externes, contact, telechargement et skip link ;
- audit des compteurs rendu dynamique pour le glossaire ;
- validation locale actuelle : 53 fichiers de tests et 296 tests reussis ;
- module HTML 04 repris : alternatives informatives et decoratives, figures, dimensions, lazy loading, audio, video, captions, telechargements et transcriptions ;
- ajout d'assets locaux reels en FR/EN, dont SVG, WAV, WebM, VTT et programmes PDF, avec test d'existence des fichiers references ;
- suppression des fuites de correction dans les exemples et comparaisons de la pedagogie generique ;
- quiz et mini-projet medias realignes sur les objectifs du module, avec starters en echec utile et solutions valides dans les deux langues ;
- validation locale actuelle : 53 fichiers de tests et 301 tests reussis, audits, build et 229 pages prerendues valides ;
- module HTML 05 repris : choix entre ul, ol et dl, tableau nomme, thead/tbody, scope, time et data dans une progression cumulative ;
- mini-projet du planning et quiz reecrits en francais et en anglais pour couvrir toutes les relations annoncees ;
- correction d'un faux positif dans les tests HTML 00 a 04 : le filtre utilisait le type inexistant `lesson` au lieu du type reel `html` ;
- ajout de tests refusant listes de mauvais type, en-tetes sans scope, datetime absent et glossaire remplace par un div ;
- validation locale actuelle : 54 fichiers de tests et 308 tests reussis, audits, build et 229 pages prerendues valides ;
- module HTML 06 repris : action/method, labels, name/value, email requis, autocomplete, select, textarea, radios, checkbox et submit dans un formulaire cumulatif ;
- quiz et mini-projet reecrits en francais et en anglais avec quinze preuves couvrant la destination, les donnees soumises, les contraintes et l'action finale ;
- ajout de tests refusant method GET, label casse, mauvais type email, controle sans name, radios non groupes et bouton non submit ;
- validation locale actuelle : 55 fichiers de tests et 315 tests reussis, audits, build et 229 pages prerendues valides ;
- module HTML 07 repris : aide persistante, erreur apres validation, fieldset/legend, groupe desactive explique, statut poli, busy et alerte dans une progression cumulative ;
- `fieldset` retire de HTML 06 pour ne plus pre-resoudre la lecon de groupement accessible du module suivant ;
- ajout du test runtime `templateSelector` afin de verifier les instantanes invalide, busy et echec places dans des templates ;
- quiz et mini-projet reecrits en francais et en anglais avec separation explicite entre etat initial et etats apres interaction ;
- validation locale actuelle : 56 fichiers de tests et 324 tests reussis, audits, build et 229 pages prerendues valides ;
- module HTML 08 repris : title, description, canonical localise, carte Open Graph, favicon, hreflang et JSON-LD Event dans un head cumulatif ;
- metadonnees de recherche, partage et donnees structurees alignees sur le contenu visible, le lieu hors ligne et les deux URL linguistiques ;
- quiz et mini-projet reecrits en francais et en anglais, avec starters en echec utile, solutions valides et exemples distincts des corrections ;
- ajout de tests refusant titre generique, description incoherente, URL relative, image sociale locale, hreflang relatif et mauvais mode de presence ;
- verification explicite de l'existence du favicon et de l'image Open Graph dans `public/assets` ;
- delais portes a 15 secondes uniquement pour les audits HTML exhaustifs sous charge parallele, sans reduire leurs assertions ;
- stabilisation du test API de publication planifiee : marge temporelle portee de 100 ms a 1 s pour eviter qu'une requete chargee depasse sa propre date ;
- validation locale actuelle : 57 fichiers de tests et 332 tests reussis, audits, build et 229 pages prerendues valides ;
- module HTML 09 repris comme un seul livrable cumulatif depuis le head certifie en HTML 08 : squelette, navigation, contenu, interactions puis audit transversal ;
- remplacement des fragments independants et de l'image inexistante par des assets locaux, des cibles uniques, des sections nommees, deux intervenants, une video sous-titree et un planning machine-readable ;
- formulaire final redige en francais et en anglais avec controles nommes, aide resolue, statut poli et instantanes invalid/busy separes dans des templates ;
- projet final et examen specialises pour verifier relations de navigation, tableau, formulaire, feedback, metadonnees et risques residuels au lieu de simples presences de balises ;
- correction des formulations anglaises mixtes dans les metadonnees des modules HTML 08 et 09 ;
- ajout de tests refusant footer absent, fragment casse, mauvais scope, label rompu et contact factice, ainsi que de controles d'existence des medias et telechargements ;
- audit manuel local HTML 00 a 09 termine ; les tests automatiques restent une preuve de regression et non une observation utilisateur ;
- validation locale actuelle : 58 fichiers de tests et 340 tests reussis, audits, build et 229 pages prerendues valides ;
- module CSS 00 repris : role de CSS, feuille styles.css fournie par le lab, preuve visible de chargement, inspection de cascade, specificite, focus et media query dans une progression cumulative ;
- suppression des fausses preuves `rel=stylesheet`, `href=styles.css` et `DevTools` encodees dans des variables CSS ;
- preview, starters, indices, cours et exemples rediges en francais et en anglais sans recopier les solutions ;
- runtime CSS renforce : `cssDeclaration` peut verifier une valeur exacte et `cssMediaDeclaration` prouve qu'une declaration appartient a la bonne media query ;
- quiz repare avec reponse ouverte localisee et projet cumulatif couvrant variables, cascade, focus et largeur desktop ;
- point d'entree catalogue et chargeur CSS realignes sur `css-getting-started` au lieu de commencer silencieusement au module suivant ;
- ajout de tests refusant texte de mots-cles, mauvaise valeur, surcharge incoherente et declaration responsive placee hors media query ;
- validation locale actuelle : 59 fichiers de tests et 348 tests reussis, audits, build et 229 pages prerendues valides ;
- prochain chantier : module CSS `css-selectors-colors`.

### 2026-11-06

- module CSS 01 `css-selectors-colors` repris en huit etapes cumulatives : couleur, fond, bordure, graisse, lien, focus, ombre et attenuation ;
- starters raccordes au projet CSS 00 et chaque solution raccordee a l'etape suivante sans perdre la media query desktop certifiee ;
- tests runtime fondes sur selecteur, propriete et valeur exacts, avec refus des token soups, valeurs plausibles mais fausses et cibles trop larges ;
- preview, cours, erreurs frequentes, indices et exemples rediges en francais et en anglais sans fuite de correction ;
- quiz specialise sur portee, cascade, contraste et focus, puis projet cumulatif couvrant les huit decisions ;
- projet ajoute au chunk public et chargeur CSS corrige pour conserver l'ordre complet `css-getting-started`, `css-selectors-colors`, `css-box-type` ;
- ajout de `tests/unit/cssSelectorsColorsModule.test.js` avec huit regressions de structure, comportement, localisation, quiz, projet et parite runtime ;
- stabilisation des seuls workflows API et audits HTML exhaustifs qui depassaient leurs anciens budgets sous charge parallele, sans reduire leurs assertions ;
- compteurs documentaires realignes sur 584 termes bilingues et fichier de curriculum CSS declare comme contenu long dans l'audit d'architecture ;
- validation locale actuelle : 60 fichiers de tests et 356 tests reussis, tous les audits, build et 229 pages prerendues valides ;
- limite restante : avertissement non bloquant du budget CSS, avec 3,9 kB disponibles ;
- prochain chantier : module CSS `css-box-type`.
- module CSS 02 `css-box-type` repris en huit etapes cumulatives depuis le lab CSS 01 : box-sizing, padding, margin, mesure, interligne, titre fluide, contenu extreme et rayon ;
- preview bilingue enrichie avec texte long, identifiant sans espace et cartes voisines pour rendre taille, espace interieur, marge et debordement observables ;
- tests lexicaux remplaces par des declarations exactes sur la bonne cible, conservation des acquis CSS 01 et de la media query CSS 00, avec refus des mauvaises valeurs et cibles ;
- quiz specialise sur border-box, padding contre margin, mesure, line-height, clamp et overflow-wrap ;
- lab public restaure dans `cssTrackBoxTypeChunk` afin que la route indexee ne retombe plus silencieusement sur la premiere lecon ;
- ajout de `tests/unit/cssBoxTypeModule.test.js` couvrant continuite, starters, solutions FR/EN, mutations negatives, preview, quiz, lab et parite statique/runtime ;
- compteurs documentaires realignes sur 587 termes bilingues ;
- validation locale actuelle : 61 fichiers de tests et 364 tests reussis, tous les audits, build et 229 pages prerendues valides ;
- limite restante : avertissement non bloquant du budget CSS, avec 3,9 kB disponibles ;
- prochain chantier : module CSS `css-flex-layout`.
- commit produit `4b5358e` pousse sur `origin/main` et deploye automatiquement sur `https://pulsateach.vercel.app` ;
- verification production reussie : smoke sur 7 routes et 28 lecons a 375 px et 1440 px, puis controle direct de `css-box-type-lab` avec le nouveau contenu cumulatif ;
- limite d'exploitation : le token local de la CLI Vercel est expire, mais l'integration Git de production reste operationnelle.

### 2026-11-07

- direction visuelle publique reprise comme un atelier editorial : fond papier chaud, typographie serif de titre, surfaces plus plates, separateurs nets et indigo reserve aux actions ;
- accueil reecrit autour d'une preuve concrete consigne, code et tests, sans statistiques decoratives ni promesse abstraite ;
- catalogue transforme en liste lisible de formations, avec recherche, acces direct aux programmes et aide au choix conservee apres la liste ;
- page formation simplifiee autour des acquis, criteres, prerequis et modules, avec criteres de certification visibles avant evaluation ;
- workspace mobile corrige : premiere visite sur la consigne, reprise dans l'editeur seulement apres un travail reel, onglets et actions sticky, rappel de tache et hauteur CodeMirror adaptee ;
- contraste AA restaure pour les textes secondaires sur le nouveau fond et landmark `main` imbrique retire de l'accueil ;
- tests E2E realignes sur les contenus HTML certifies et sur le nouveau flux mobile, sans relacher les controles clavier, reprise, examen ou accessibilite ;
- controle visuel local effectue sur accueil, catalogue, formation HTML et lecon JavaScript, en desktop et mobile Chromium ;
- validation navigateur : 150 tests E2E reussis, 44 ignores intentionnellement selon projet ou disponibilite des parcours prives ;
- validation locale : 61 fichiers de tests et 364 tests reussis, tous les audits, build et 229 pages prerendues valides ;
- limite de release : les changements sociaux et video presents dans le worktree restent exclus de ce lot.
- commit produit `34ded0d` pousse sur `origin/main` et deploye automatiquement par Vercel ;
- verification production reussie : nouvelle interface hydratee controlee visuellement, puis smoke sur 7 routes et 28 lecons a 375 px et 1440 px ;
- limites CI independantes du lot : `npm audit` bloque sur les dependances deja signalees et le job Supabase refuse encore l'ancienne section `[inbucket]` de `supabase/config.toml`.

### 2026-11-09

- module CSS 03 `css-flex-layout` remplace par huit etapes cumulatives depuis le lab CSS 02 : conteneur flex, gap, axe transversal, distribution, wrap, axe responsive, ordre visuel limite au statut et largeur minimale du libelle ;
- starter, solutions, cours, indices, erreurs frequentes et exemples rediges en francais et en anglais autour d'une barre d'actions PulsaConf avec contenu long ;
- quiz specialise sur axes, wrap, ordre clavier et largeur minimale, puis lab public couvrant les huit decisions sans perdre les acquis CSS 00 a 02 ;
- ajout de `tests/unit/cssFlexLayoutModule.test.js` couvrant continuite, echec utile, solutions bilingues, mauvaises valeurs, mauvais breakpoint, mauvaise cible, preview, quiz, lab et parite statique/runtime ;
- controle Chromium direct de la solution a 375 px et 1440 px : aucun debordement horizontal, colonne sur mobile, ligne sur desktop, statut visuellement deplace sans changer l'ordre des boutons ;
- compteurs documentaires realignes sur 589 termes bilingues ; validation locale actuelle : 62 fichiers de tests et 372 tests reussis, audits, build et 229 pages prerendues valides ;
- les anciens Reels V3/V4, prototypes, rendus, voix, briefs et campagne Instagram automatisee ont ete retires afin de repartir d'une direction plus travaillee ; les demonstrations produit V2 et promos generiques restent disponibles ;
- regression du menu mobile reproduite : `backdrop-filter` sur le header limitait les descendants fixes a 72 px de haut ; blur retire du contenant et fermeture ajoutee au passage au breakpoint desktop ;
- tests E2E renforces sur couverture du viewport, backdrop, verrouillage/restauration du scroll, focus et redimensionnement ; controles responsive et accessibilite valides sur Chromium desktop/mobile ;
- `pulsateach.com` prepare comme origine canonique dans SEO, sitemap, robots, emails, contenus, videos et bots, avec alias Vercel conserve comme secours et callbacks Supabase doubles ;
- runbook `docs/CLOUDFLARE_DOMAIN_CUTOVER.md` ajoute ; la zone Cloudflare repond avec ses nameservers mais ne publie encore aucun A, AAAA ou CNAME, la cible DNS exacte doit etre obtenue apres ajout du domaine dans Vercel ;
- validation locale finale : 61 fichiers de tests et 364 tests reussis, audits, build, SEO, bundle et 229 pages prerendered valides ; 54 controles responsive/accessibilite reussis et 12 ignores selon projet ;
- module CSS 04 `css-grid-layout` repris en huit etapes cumulatives depuis CSS 03 : activation de Grid, pistes explicites, repeat, auto-fit/minmax, gap, flux par ligne, alignement des cellules et ancrage des pistes ;
- `grid-auto-flow: dense` remplace par un flux qui preserve l'ordre source ; starters, solutions, cours, quiz et lab rediges en francais et en anglais autour d'une galerie avec contenus variables ;
- ajout de `tests/unit/cssGridLayoutModule.test.js` couvrant continuite, echec utile, solutions bilingues, token soup, valeurs rigides, mauvaise cible, remplissage dense, preview, quiz, lab et parite statique/runtime ;
- controle Chromium direct de la solution a 375 px et 1440 px : une puis cinq colonnes, aucun debordement horizontal, alignement attendu et ordre source inchange ;
- validation locale actuelle : 62 fichiers de tests et 372 tests reussis, tous les audits, build et 229 pages prerendered valides ;
- MCP officiels Vercel et Cloudflare ajoutes a la configuration globale OpenCode et authentifies par OAuth, sans jeton stocke dans le projet ;
- `pulsateach.com` et `www.pulsateach.com` attaches au projet Vercel `pulsateach`, avec redirection permanente de `www` vers l'apex ;
- zone Cloudflare activee avec deux A d'apex et un CNAME `www` fournis par Vercel, en mode DNS only et TTL automatique ; propagation publique, HTTPS et certificat verifies ;
- variable Vercel Production `PULSATEACH_ALLOWED_ORIGINS` alignee sur le domaine principal et l'alias de secours ; le smoke pre-release confirme que le build precedent doit encore etre remplace pour publier le canonical ;
- release `a8182b4` poussee sur `main` et deployee avec succes par Vercel ; canonical principal servi aussi depuis l'alias de secours ;
- smoke production reussi sur 7 routes et 28 lecons, a 375 px et 1440 px, avec callback Auth, CORS, HTTPS et redirection `www` verifies ;
- configuration Auth Supabase distante alignee sur `https://pulsateach.com` et ses callbacks sans modifier Discord, OAuth Server, SMS ni pooler ; section locale obsolete `[inbucket]` renommee `[local_smtp]` ;
- migration RLS testee par deux reconstructions locales completes puis appliquee en production : 15 politiques de refus explicites, aucun privilege `anon`/`authenticated`, acces `service_role` preserve et advisor RLS vide ;
- MFA TOTP active sans SMS ni cout additionnel et advisor MFA resolu ; protection HaveIBeenPwned non activable sur le plan Supabase Free, maintien du plan confirme par l'utilisateur ;
- trois index peu utilises restent sous observation : leur suppression sur une production encore peu chargee ne serait pas justifiee par le seul advisor informatif ;
- nouveau Reel HTML produit depuis une capture responsive actuelle : hook anti-tutoriel passif, saisie reelle du doctype, preuve `Tests 5/5`, CTA `Montre ton essai`, master 1080 x 1920 de 17 secondes et SRT ;
- Reel de presentation de la nouvelle UI reconstruit apres un second retour sur sa duree et sa finition : huit actes distincts sur le probleme, les principes, l'accueil, la recherche, le programme, l'atelier, la preuve 5/5 et le feedback ; bande-son stereo arrangee par sequence, master 1080 x 1920 de 41 secondes, SRT et quatorze images cles controlees ;
- pipeline UI renforce : le rendu est refuse si `ffprobe` ne decode pas exactement les 1 230 images attendues ;
- master UI lu jusqu'a la fin dans Chromium en 1080 x 1920 ; validation locale finale : 62 fichiers de tests et 372 tests reussis, tous les audits, build et 229 pages prerendered valides ;
- module `css-selectors` repris en huit etapes cumulatives depuis le lab Grid : portee de composant, enfant direct, variante, attribut, regroupement, exclusion, focus visible et faible specificite ;
- anciennes definitions statique et runtime divergentes supprimees au profit d'une source partagee, d'un chunk public dedie, d'un quiz bilingue de six questions et d'un projet couvrant les huit decisions ;
- validation CSS durcie contre les proprietes prefixees factices ; starters en echec utile, solutions FR/EN, mauvaises cibles, token soup, focus masque, continuite Grid et parite statique/runtime couverts par huit tests unitaires ;
- preuve Chromium desktop et mobile reussie : portee locale, enfant direct, carte partenaire intacte, focus clavier visible et absence de debordement ;
- compteurs publics realignes sur 883 lecons totales, 217 lecons publiques, 234 URLs et 588 termes bilingues ; validation locale actuelle : 63 fichiers et 380 tests reussis, tous les audits, build et 234 pages prerendered valides ;
- module `css-box-model` repris en huit etapes cumulatives depuis le projet Selecteurs : border-box, interligne, token d'espace, inline-size, contenu sans espace, padding logique, taille intrinseque et rayon ;
- anciennes definitions statique et runtime divergentes supprimees au profit d'une source partagee et d'un chunk public dedie ; cinq IDs publics conserves, trois pratiques ajoutees, quiz bilingue de six questions et projet transversal ;
- huit tests unitaires couvrent continuite CSS 05, starters en echec utile, solutions FR/EN, mauvaises cibles et valeurs, token soup, masquage interdit, quiz, projet et parite statique/runtime ;
- preuve Chromium desktop et mobile reussie : token calcule, padding logique, taille bornee, identifiant complet, carte partenaire intacte, Grid, focus clavier et absence de debordement ;
- compteurs publics realignes sur 886 lecons totales, 220 lecons publiques, 237 URLs et 585 termes bilingues ; validation locale actuelle : 64 fichiers et 388 tests reussis, tous les audits, build et 237 pages prerendered valides ;
- module `css-flexbox` repris comme navigation PulsaConf cumulative depuis le projet Box Model : conteneur, gap, alignement, distribution, repli, flex sizing des groupes et axe mobile/desktop ;
- definitions statique/runtime dupliquees retirees et route dediee creee ; trois IDs d'exercices existants conserves, cinq pratiques ajoutees, quiz bilingue specialise et projet avec rubric a quatre preuves ;
- huit tests unitaires couvrent continuite, echec utile, solutions localisees, valeurs et cibles, quiz, projet et parite runtime ; E2E Chromium desktop/mobile confirme axe responsive, label complet, controles non compresses et ordre Tab ;
- compteurs publics realignes sur 891 lecons totales, 225 lecons publiques, 242 URLs et 578 termes bilingues ; validation locale actuelle : 65 fichiers et 396 tests reussis, tous les audits, build et 242 pages prerendered valides ;
- module `css-grid` repris après `css-grid-layout` comme parcours de placement éditorial : zones nommées, colonnes utiles, placement de régions, alignement et template mobile à une colonne ;
- ancien module statique/runtime réduit à trois exercices supprimé au profit d'une source partagée et d'un chunk dédié ; trois IDs historiques conservés, cinq pratiques ajoutées, quiz bilingue et projet final ;
- huit tests unitaires vérifient continuité CSS 07, solutions FR/EN, starters en échec utile, mutations de zones et valeurs, ordre source, quiz, projet et parité runtime ; Playwright desktop/mobile valide template calculé, placement, DOM et tabulation ;
- compteurs publics recalculés : 896 leçons totales, 230 leçons publiques, 247 URLs et 578 termes bilingues ; validation locale actuelle : 66 fichiers et 404 tests réussis, tous les audits, build et 247 pages prérendues valides ;
- module `css-responsive` repris en huit étapes cumulatives depuis le projet Grid : largeur bornée avec box-sizing, mesure de texte et image robuste, breakpoint, fallback mobile, clamp, container-type/query et auto-fit ;
- validation runtime `cssContainerDeclaration` ajoutée pour vérifier le sélecteur, la propriété et la condition dans le bon conteneur ; le script d'audit pédagogique vérifie aussi ce test dans les solutions ;
- huit tests unitaires couvrent IDs publics, chaîne cumulative CSS 08, starters FR/EN, mutations de breakpoint et conteneur, quiz, lab et parité ; Playwright desktop/mobile confirme absence de débordement, ratio média et reflow quand la largeur de carte change ;
- compteurs publics confirmés à 896 leçons totales, 230 leçons publiques, 247 URLs et 580 termes bilingues ; validation locale actuelle : 67 fichiers et 412 tests réussis, tous les audits, build et 247 pages prérendues valides ;
- module `css-a11y-states` repris en huit étapes cumulatives depuis Responsive : focus-visible, contour et offset, hover sans reflow, état disabled explicite, cible minimale, contraste lisible et forced-colors ;
- définition générée remplacée par un module spécialisé dans le chunk responsive, en gardant les huit IDs de pratique et le quiz public ; les nouvelles règles utilisent une classe d'exercice dédiée pour laisser le focus certifié précédent vérifiable ;
- huit tests unitaires vérifient la chaîne CSS 09, solutions bilingues, starters en échec utile, mauvais état/cible, quiz, lab et parité ; Playwright Chromium desktop/mobile teste hover, focus visible, action disabled non tabulable et focus en forced-colors ;
- compteurs publics confirmés à 896 leçons totales, 230 leçons publiques, 247 URLs et 580 termes bilingues ; validation locale actuelle : 68 fichiers et 420 tests réussis, tous les audits, build et 247 pages prérendues valides ;
- module `css-motion` repris en huit étapes cumulatives depuis États accessibles : transition ciblée, transform sans reflow, hover informatif, reduced-motion, animation finie, origine, will-change prudent et réduction du mouvement des actions ;
- ancien contenu générique remplacé par une source partagée dans le chunk responsive ; huit IDs de pratique préservés, quiz spécialisé et lab qui conserve le statut et le focus ;
- huit tests unitaires couvrent progression, starters bilingues, mauvaises propriétés, animation infinie, désactivation du mouvement et parité statique/runtime ; Playwright desktop/mobile vérifie hover normal, animation bornée, préférence réduite et absence de débordement ;
- audit dupliqué du registre CSS corrigé en retirant l'entrée Motion ajoutée au mauvais groupe ; les statistiques restent à 896 leçons totales, 230 publiques, 247 URLs et 580 termes ;
- budget bundle spécialisé pour le contenu CSS ajouté : 300 Ko brut et 100 Ko gzip, tout en maintenant les budgets globaux et de routes ; `npm run validate` passe avec 69 fichiers et 428 tests, tous les audits et build ;
- `css-capstone` repris comme projet de fin de parcours au lieu de huit tests de présence : système intégrant tokens, pistes fluides, container queries, médias, focus, forced-colors et reduced-motion ; IDs d'exercices et `css-capstone-lab` conservés ;
- ajout de huit tests unitaires de progression, mutations ciblées, quiz, contenu et parité runtime ; Playwright desktop/mobile vérifie 375px, composition, dimensionnement du conteneur, média, tabulation, forced-colors et reduced motion ;
- métadonnées pédagogiques dédiées ; `npm run validate` réussi : 70 fichiers, 436 tests, tous les audits et build de 247 pages ; les compteurs catalogue et glossaire restent inchangés ;
- prochain chantier produit : module CSS `css-responsive-motion` ; un troisième format social attendra les premiers résultats observés des deux Reels.

### 2026-11-14

- reprise du pipeline Reels après inspection du worktree : changements préexistants Supabase, CSS, scripts, briefs et médias laissés en place ; aucun artefact ignoré n'a été supprimé ;
- le plan demandait d'attendre des retours observés sur les deux premiers Reels ; aucun résultat de publication n'étant présent dans le dépôt, le nouveau lot reste une démonstration produit vérifiable et ne formule aucune affirmation d'audience ;
- concept proposé à partir des captures réelles disponibles : « Deux axes. Une cible. », démonstration verticale de l'arène Flexbox avec saisie de `justify-content` et `align-items`, niveau 1 validé et niveau 2 ouvert ;
- ajout de `video/reels/FlexboxProof.jsx`, `scripts/render-reel-flexbox-proof.mjs`, commande `video:reel:flexbox` et brief `docs/social/PULSATEACH_REEL_FLEXBOX.md` ; le rendu est configuré en 1080 × 1920, 30 i/s, H.264/AAC stéréo, 1 050 images, SRT et sept images clés ;
- rendu vérifié avec ffprobe : 35,05 s, 1 050 images H.264 1080 × 1920 à 30 i/s, AAC 48 kHz stéréo ; sept images clés contrôlées visuellement, SRT aligné sur les repères de capture ;
- master lu jusqu'au marqueur `ended` dans Chromium (35,05 s, 1080 × 1920) ; reflet du titre partiellement coupé masqué dans le cadre de capture et texte de repère maintenu visible ;
- vérification restante avant diffusion : revue humaine sur un téléphone réel et collecte de retours ; publication Instagram manuelle uniquement.
- retour utilisateur sur la première proposition : le sujet Flexbox avait déjà été traité et le carton final manquait de marge Instagram et du logo ; le brouillon Flexbox reste localement conservé mais n'est pas retenu pour ce livrable ;
- remplacement du sujet par le Playground Sandbox, à partir de la capture verticale source : modification CSS observée, compteur XP à 20 après deux clics et mission effectivement validée ;
- nouveau master `pulsateach-sandbox-proof.mp4` : 1 097 images, 36,63 s, 1080 × 1920 à 30 i/s, H.264 et AAC stéréo 48 kHz ; SRT, sept images clés et musique originale générée ;
- direction et fin retravaillées : logo couleur en plaque claire, cartouche code/rendu, CTA `Essaie le Playground`, URL `pulsateach.com/playground` ; textes et actions clés entre y=250 et y=1580 pour garder les marges haut/bas des Reels ;
- ffprobe confirme l'export ; lecture complète Chromium jusqu'à `ended` à 36,63 s et sept captures de lecture inspectées, dont la dernière frame avec logo et URL CTA ;
- `npm run validate` réussi après cette reprise : 70 fichiers/436 tests, audits, build et pré-rendu de 247 pages ; vérifications de syntaxe vidéo et lecture Chromium terminées ;
- seule vérification avant diffusion : revue humaine sur un téléphone réel ; publication Instagram manuelle uniquement.
- demande de qualité sur le prochain Reel : construire un vrai arc narratif échec→correction→preuve, conserver davantage de marge Instagram et améliorer le carton final de marque ; sujet choisi à partir de la vraie capture JS Arena, distinct du Reel Sandbox ;
- nouvelle composition `video/reels/JavaScriptProof.jsx` : hook « Toujours right ? », échec observable, correction de `target.x > 50`, validation réelle des deux coordonnées et carton final avec logo, code corrigé, cas gauche/droite, CTA et URL `/js-arena` ; éléments importants composés dans la zone centrale verticale ;
- nouveau pipeline `scripts/render-reel-javascript-proof.mjs` et commande `video:reel:javascript` ; master `pulsateach-javascript-proof.mp4` de 1 014 images, 33,86 s, 1080 × 1920 à 30 i/s, H.264/AAC stéréo ; SRT et sept images clés ;
- scènes inspectées : état initial avec alerte de test, logique corrigée, test vert des deux cas et dernier écran de marque ; lecture Chromium jusqu'à `ended`, durée 33,856 s et sept captures de lecture revues ;
- `npm run validate` réussi après le Reel JavaScript : 70 fichiers de tests, 436 tests, audits, build et pré-rendu 247 pages ; vérifications de syntaxe des scripts vidéo réussies ;
- vérification restante : revue humaine sur téléphone avant toute diffusion ; publication Instagram manuelle uniquement.
- nouveau sujet demandé ensuite : révision active, avec une narration courte et sans reprendre Sandbox, JavaScript ou Flexbox ; la session source est signalée comme démonstration pour ne pas la présenter comme un résultat apprenant réel ;
- nouvelle composition `video/reels/ReviewProof.jsx` : hook par question, carte à réviser, réponse sélectionnée puis vérifiée, évaluation du rappel et planification de la prochaine révision ; carton final distinct avec logo, trois étapes et URL `/review` ;
- ajout de `scripts/render-reel-review-proof.mjs`, commande `video:reel:review` et brief `docs/social/PULSATEACH_REEL_REVIEW.md` ; master `pulsateach-review-proof.mp4`, 754 images, 25,19 s, 1080 × 1920 à 30 i/s, H.264/AAC stéréo, SRT et sept images clés ;
- vérification ffprobe réussie ; lecture Chromium jusqu'à `ended` à 25,195 s, résolution 1080 × 1920 et sept captures Chromium inspectées, dont la fin avec logo et URL CTA ;
- `scripts/verify-reel-chromium.mjs` accepte maintenant des Reels courts dès 20 s afin de vérifier le master Révision ;
- `npm run validate` réussi après cette composition : 70 fichiers de tests, 436 tests, audits, build et pré-rendu de 247 pages ; lecture Chromium et captures de scène complètes ;
- revue humaine sur téléphone avant diffusion ; publication Instagram manuelle uniquement.
- reprise après demande de carte blanche pour un Reel orienté clics : format défi pour débutants, hook « Le label ne fait rien ? », énigme `for`/`id`, clic réel, échec des checks puis réussite 5/5 après correction ; le défaut est injecté uniquement dans la démonstration, il ne décrit pas un bug de production ;
- capture dédiée de la leçon `/learn/html/html-native-forms/html-06-label-input-text` générée par `scripts/capture-reel-label-challenge.mjs` ; le script vérifie dans Chromium que le mauvais couple ne transfère pas le focus, que la correction passe les tests et produit 5/5 ;
- composition `video/reels/LabelChallengeProof.jsx` et pipeline `scripts/render-reel-label-challenge.mjs`, commande `npm run video:reel:label-challenge` ; master `pulsateach-label-challenge.mp4`, 516 images, 17,26 s, 1080 × 1920 à 30 i/s, H.264/AAC stéréo, SRT et huit images clés ;
- la légende invite à répondre avant la révélation ; commentaire de correction prêt à épingler ; URL bio documentée : `https://pulsateach.com/learn/html/html-native-forms/html-06-label-input-text` ;
- ffprobe confirme les caractéristiques ; Chromium lit le master jusqu'à `ended` à 17,258 s, puis les sept captures de lecture sont inspectées, notamment le hook, l'échec, la réussite et la dernière image ;
- limite de diffusion : le bio link doit être mis à jour et la publication doit être effectuée manuellement par l'utilisateur ; cette session n'a pas d'accès Instagram ; aucune publication n'a été faite.
- module CSS `css-responsive-motion` repris comme intégration finale responsive et mouvement : huit étapes cumulatives depuis les acquis du capstone, conteneur distinct du viewport, médias stables, identifiant extrême, hover sans reflow et préférence reduced-motion ; IDs d'exercices, quiz et projet final conservés ; ancienne définition concurrente retirée du chunk public ;
- ajout de tests unitaires bilingues sur starters non résolus, solutions, mutations de breakpoint/conteneur/média/mouvement, alignement des six questions, rubric du projet et parité du chargeur ; E2E Chromium desktop/mobile confirme reflow de carte à 20/30rem, ratio média, visibilité du statut, hover réduit et absence de débordement ;
- l'audit CSS exécute désormais les tests runtime des solutions en français et anglais ; cette vérification a révélé que le starter du premier exercice Capstone contenait déjà toutes les corrections : limité au scaffold initial pour rétablir une progression réellement cumulative ;
- compteurs recalculés : 900 leçons totales, 145 leçons CSS, 234 leçons publiques, 251 URLs et 579 termes bilingues ; `npm run validate` réussi : 71 fichiers et 444 tests, tous les audits et build/prérendu de 251 pages ;
- prochain chantier : `css-advanced-responsive`, puis audit transversal des routes CSS avant JavaScript public.
- module CSS `css-advanced-responsive` réécrit en cinq exercices cumulatifs depuis le projet Responsive-Motion : échelles fluides, token d'espacement, cadrage média, conteneur nommé et navigation défilable ; IDs historiques des exercices, quiz et projet conservés ; ancienne définition générique retirée ; route dédiée au module ajoutée ;
- tests unitaires bilingues vérifient les starters non résolus, la continuité, les mutations sémantiques, les choix du quiz, les preuves du projet et le chargeur ; E2E Chromium desktop/mobile vérifie ratio/cadrage image, reflow de la carte à 16/20rem, overflow contenu et navigation clavier ;
- le remplacement de contenu change le glossaire courant de 579 à 573 termes; README et `ROADMAP_EVIDENCE.md` réalignés ; les compteurs restent à 900 leçons globales, 145 CSS, 234 leçons publiques et 251 URLs ;
- le nouveau contenu CSS pousse le chunk brut à 318,2 kB avec 86,5 kB gzip ; plafond brut du chunk de contenu avancé porté de 300 à 330 kB, en conservant la limite de transfert gzip à 100 kB ; bundle, route maximale gzip à 277,9 kB et toutes les validations passent ;
- `npm run validate` réussi : 72 fichiers, 451 tests, tous les audits, build et pré-rendu de 251 pages ;
- prochain chantier : audit CSS transversal de toutes les routes publiques avant la reprise complète du parcours JavaScript.
- audit CSS transversal effectué : registre, ordre publié, chargement complet, chargeur direct des 15 modules, ID de départ catalogue et séquences de leçons concordent ; smoke complet : 23 routes et 12 endpoints API ; 20 E2E CSS réussis sur Chromium desktop/mobile ;
- `npm run validate` réussi après ajout du contrôle transversal : 73 fichiers et 454 tests, tous les audits, build et pré-rendu de 251 pages ;
- prochain chantier prioritaire : audit complet du parcours JavaScript public.
- première passe de l'audit JavaScript : le helper `starterFrom` livrait la solution entière pour les snippets courts ; les 39 starters exacts ont été convertis en vrais points de départ, les cinq projets manuels complétés et le comportement testé ;
- les modules JavaScript générés couvrent maintenant les résultats d'exécution pour variables, conditions, collections, chaînes, async, stockage et capstone ; exemples de cours vérifiés distincts des solutions ; examen des quiz confirme prompts bilingues, réponses valides et types variés ;
- false positives corrigés : retrait des checklists de tokens ajoutées aux solutions des modules de hardening, contrôles recentrés sur les contrats réels, solutions du dashboard API et du lab final complétées avec données et états nécessaires ; rubrics anglaises des projets étendues à quatre critères ;
- le worker JavaScript attend maintenant les assertions asynchrones, restreint `fetch` aux routes de mock locales et prend en charge les signaux console ; E2E réels vérifient client API, compteur, modale clavier/Escape, renderer, formulaires, événements storage et preview capstone : 22 tests desktop/mobile réussis ;
- `npm run validate` réussi : 74 fichiers, 459 tests, tous les audits, build et pré-rendu de 251 pages ; `npm run smoke:full` réussit sur 23 routes et 12 endpoints API ;
- audit local JavaScript terminé pour cette passe : 18 routes d'ouverture vérifiées desktop/mobile, solutions bilingues et starters en échec utile vérifiés pour les 141 leçons, quiz alignés, exemples distincts et 16 projets munis d'assertions comportementales ;
- P0 parcours public vérifié localement par scénarios complémentaires ; prochaine priorité : P1, remplacer les tests de présence restants par des assertions comportementales et des validations de contenu plus précises.
- le test `learner-flow.spec.js` ne sème plus artificiellement une progression : il part du catalogue HTML, ouvre le programme, réussit réellement les cinq assertions de la première leçon, confirme le stockage de la progression puis reprend la leçon suivante depuis le dashboard ;
- `quiz.spec.js` vérifie la persistance locale du score et de l'évidence de réussite sans exposer le score dans le payload d'examen ; `project-review.spec.js` suit le CTA depuis un projet réellement passé et vérifie le préremplissage de son ID canonique ;
- les parcours catalogue→leçon→reprise, examen et soumission de projet passent sur Chromium desktop/mobile ; smoke complet : 23 routes et 12 endpoints API ;
- `npm run validate` réussi après les scénarios : 74 fichiers de tests, 459 tests, tous les audits, build et pré-rendu de 251 pages ; les prochains retours qualité devront venir d'observations avec de vrais apprenants.

### 2026-11-17 — retour d'audit externe sur l'entrée HTML

- Trois documents fournis dans Téléchargements ont été lus : `PulsaTeach-Audit.md` (navigation expert Chrome FR sans compte, avis 7/10 limité au premier parcours), `PulsaTeach-Brief-Agents.md` (PT-01 à PT-06) et `PulsaTeach-Tests-Utilisateurs.md` (protocole proposé, aucune session menée). Leur diagnostic est confronté au code local plutôt que traité comme une conformité établie.
- PT-01 confirmé : les deux CTA annonçaient 10 min alors que le premier exercice durait 40 min. Les deux désignent désormais explicitement le **premier exercice** estimé à ~15 min, durée du contenu alignée ; les compteurs « 1/79 étapes du projet PulsaConf » et « 0/83 leçons de la formation » sont distingués dans l'atelier FR/EN.
- PT-02/PT-04 confirmés : le test h1 n'imposait pas `main` contrairement au libellé « Contrôle main titre » ; premier exercice et retour reformulés autour des balises h1/p et de leurs textes exacts. Le starter échoue 3/5, les cas avec/sans `main` réussissent 5/5, les mauvaises cibles ou style/script sont refusés. Les exemples ne reprennent plus la solution, la correction décrit ces deux rôles et l'aide d'échec indique l'action minimale FR/EN.
- PT-03 confirmé et corrigé dans la consigne : sauvegarde automatique locale, validation des tests et fusion facultative de version sont désormais distinguées. E2E : code sauvegardé et repris sans fusion après navigation/rechargement, XP stable après deuxième validation, double fusion identique sans nouvelle version ; une modification ultérieure garde la possibilité d'un nouveau jalon (test unitaire).
- PT-05 confirmé et corrigé : chaque lien « Voir le programme / View curriculum » expose maintenant le nom de sa formation. PT-06 : le HTML pré-rendu local contient d'emblée le bon titre et la bonne description, et les titres hydratés FR/EN sont corrects en navigateur ; le flash transitoire rapporté en production n'est pas reproduit par ces tests et reste à recontrôler sur la version publiée.
- Tests : `npx vitest run tests/unit/htmlFirstEntryAudit.test.js tests/unit/projectThreadDocument.test.js`, 7 tests réussis ; `npx playwright test tests/e2e/html-first-entry-audit.spec.js --workers=2`, 8 réussis desktop/mobile FR/EN ; `npm run validate`, 75 fichiers/464 tests, audits et build de 251 pages réussis. Deux avertissements ESLint non bloquants concernent un script de Reel tiers préexistant au lot. `docs/USER_TEST_PROTOCOL.md` décrit les cinq séances et les métriques de première modification/test après modification, sans revendiquer d'observation humaine.
- Clôture du lot technique : la validation d'un code fraîchement saisi sauvegarde maintenant immédiatement la version courante avant la navigation (indépendamment du délai d'autosauvegarde) ; scénario de sortie rapide et retour après rechargement ajouté sur desktop/mobile. `npx playwright test tests/e2e/html-first-entry-audit.spec.js --workers=2` : 10 réussites ; `npm run validate` : 75 fichiers, 464 tests, audits et build réussis sans avertissement ESLint. Le comportement utilisateur réel et le flash transitoire signalé en production ne peuvent être conclus depuis ces seuls contrôles locaux ; release et tests humains restent des étapes distinctes.

### 2026-11-17 — Reel défi HTML orienté interaction

- format choisi en autonomie après autorisation « carte blanche » : mini-défi « Le label ne fait rien ? », conçu pour susciter une réponse avant la révélation, plutôt qu'une visite de fonctionnalités ;
- sujet audité dans la leçon réelle `html-06-label-input-text` : `label[for]` doit référencer l'`input[id]` ; capture produite par clic Playwright dans l'aperçu et par les tests natifs de la leçon ; le mismatch est volontairement injecté pour le défi, pas issu de la production ;
- état faux : clic du label sans transfert de focus, 0/5 checks ; correction du seul `id` puis validation 5/5 ; la démo vérifie ces états et s'arrête si la preuve n'apparaît pas ;
- master `docs/media/reels/pulsateach-label-challenge.mp4` : 516 images, 17,258 s, 1080 × 1920 à 30 i/s, H.264/AAC stéréo, SRT et huit images de contrôle ; carton final avant/après, logo, CTA « Trouve le bug · lien en bio » et marges Instagram ;
- légende, commentaire épinglé, texte alternatif et destination du lien de bio préparés dans `docs/social/PULSATEACH_REEL_LABEL_CHALLENGE.md` ;
- ffprobe confirme la vidéo ; Chromium termine la lecture à 17,258 s et sept captures de lecture ont été inspectées ; `npm run validate` réussi : 75 fichiers/464 tests, audits et build de 251 pages ; `npm run lint` relancé sans avertissement après retrait de deux variables inutilisées du renderer ;
- aucune publication effectuée : placer la leçon `/learn/html/html-native-forms/html-06-label-input-text` dans la bio, prévisualiser sur un téléphone puis publier manuellement ; aucun accès Instagram n'est disponible dans cette session.
- hook enrichi pour un puzzle de 3 secondes : les snippets `for="full-name"` et `id="display-name"` sont visibles ensemble avant que la démo produit montre le défaut ;
- dernière passe ffprobe/Chromium : source native 864 × 1152 de 9,2 s ; master 516 images, 17,258667 s, 1080 × 1920 à 30 i/s, H.264/AAC stéréo ; lecture jusqu'à `ended` et sept captures Chromium inspectées ;
- `npm run validate` réussi sans avertissements ESLint : 75 fichiers/464 tests, audits et build de 251 pages ; aucune publication distante effectuée.

### 2026-11-17 — P1 : validation robuste JavaScript

- Après l'audit P0, `js-validation-hardening` restait vérifié principalement par une liste de mots-clés ; le score acceptait notamment des valeurs impossibles et confondait un taux réel de 69,5 % avec son affichage arrondi à 70 %. Trois exercices, le projet et le quiz conservent leurs IDs et sont repris dans `src/content/jsValidationModule.js` avec contrats explicites et sorties testées, sans exiger l'emploi artificiel de `map`, `filter` ou `structuredClone`.
- Scénarios nominaux et négatifs en FR/EN : nom/email nettoyés sans mutation, XP numérique non négatif, titre/slug/niveau normalisés, scores entiers dans `[0, total]`, seuil de passage sur la proportion brute et blocage de toute inscription dont l'un des trois contrôles échoue. Les starters FR/EN restent non résolus et les exemples ne recopient pas les solutions. Les anciennes implémentations de validation non utilisées ont été retirées du générateur.
- `tests/unit/jsValidationModule.test.js` refuse aussi les mutations qui laissent passer XP négatif, slug invalide, scores au-delà du total, seuil arrondi et inscription invalide ; `tests/e2e/js-validation-hardening.spec.js` rejoue score et projet sur Chromium desktop/mobile (4 réussites). Les métadonnées du module reflètent le seuil 69,5/70/100 % ; le glossaire courant compte 574 termes bilingues.
- `npm run validate` réussi : 76 fichiers, 468 tests, audits, build et 251 pages pré-rendues. `docs/QUALITY_EVIDENCE.md` sépare maintenant inventaire, preuves automatiques, relectures locales, production et apprentissage humain ; il ne présente pas ces chiffres comme un pourcentage de maturité. Le reste du P1, les sessions avec de vrais utilisateurs et une release contrôlée restent des chantiers distincts.

### 2026-11-17 — préparation de la release publique

- Suite E2E exhaustive sous deux workers : 211 réussites, 45 scénarios ignorés selon projet ou disponibilité, aucun échec ; correction de la synchronisation éditeur/état, tests mobile et validation d'un code saisi immédiatement.
- Aperçu HTML isolé : images et vidéo chargées depuis l'origine applicative ; les pistes VTT dans `about:srcdoc` exigeaient en outre CORS. Les vidéos avec piste sont chargées en mode anonyme, et seuls les médias statiques `.vtt`, `.webm`, `.wav` ont un en-tête CORS en développement et dans la configuration de livraison. E2E vérifie le chargement réel de la piste sur desktop et mobile ; la CSP continue de refuser les connexions réseau du code utilisateur et l'iframe garde une origine opaque.
- `npm run validate` réussi : 76 fichiers, 468 tests, audits d'architecture/sécurité/contenu, build et 251 pages pré-rendues ; `npm run test:api` : 31 réussites ; `npm run smoke:full` : 23 routes et 12 endpoints API. Ces contrôles ne constituent pas une observation d'apprenants réels.
- Reste à isoler les fichiers produit de la campagne Reels et des changements Supabase locaux, livrer la version autorisée et vérifier le site en production.
- Commit produit `478bd5b` poussé sur `main`, en excluant les travaux Reels et Supabase. Le déclenchement explicite du build Vercel a refusé le motif générique d'en-tête (`invalid_header`) avant de créer un déploiement ; la configuration a été réduite aux cinq chemins de médias PulsaConf exacts. Le correctif doit être livré et vérifié avant toute déclaration de mise en production.
- Correctif `bf65e2d` poussé et déployé explicitement depuis ce SHA : `dpl_5xds4bnV9b85J7mQ8VEvCJEGZtbo` est READY, alias `pulsateach.com` attaché sans erreur. `npm run smoke:production` réussit sur 7 routes principales et 28 leçons à 375 et 1440 px ; les réponses HTTPS de la piste française (`text/vtt`) et de la vidéo (`video/webm`) renvoient 200 avec `Access-Control-Allow-Origin: *`. Ancienne version production `dpl_2oAKeuWrtyxVZCaNafaUjA5zByLM` conservée comme cible de rollback. Les 45 E2E ignorés et les tests humains non menés ne sont pas comptés comme preuves de réussite.
