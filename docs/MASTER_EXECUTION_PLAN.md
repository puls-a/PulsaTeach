# PulsaTeach - plan directeur d'achevement

Statut : source de verite active
Derniere mise a jour : 2026-11-09
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
| CSS public restant | Non certifie | profondeur automatique seulement | continuer avec `css-selectors` |
| JavaScript public | Non certifie | profondeur automatique seulement | audit complet apres CSS |
| Catalogue et reprise | Revu localement | aide au choix preservee, recherche bilingue et reprise mobile testees | prochaine release controlee |
| Interface publique | Corrigee localement | tiroir mobile plein viewport, focus, scroll et breakpoint desktop couverts par E2E | livrer puis verifier sur telephone reel |
| Anciens Reels | Retires localement | sources V3/V4, rendus, voix, campagne et publisher dedie supprimes ; videos produit V2 preservees | repartir d'un storyboard et d'une direction visuelle neufs |
| Domaine `pulsateach.com` | DNS actif | domaines Vercel verifies, `www` redirige en 308, DNS Cloudflare non proxifie et CORS production configure | deployer le build canonique puis executer le smoke complet |
| Production | Verifiee | commit produit `34ded0d`, statut Vercel reussi et smoke production sur 7 routes et 28 lecons | poursuivre CSS puis prochaine release controlee |
| Tests utilisateurs | Non effectues | aucune observation documentee | protocole puis sessions |

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
- prochain chantier produit : module CSS `css-selectors` ; les nouveaux formats sociaux repartiront ensuite d'un storyboard et d'une validation visuelle neufs.
