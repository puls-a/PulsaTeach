# PulsaTeach - Roadmap stratégique complète

## Positionnement

PulsaTeach doit devenir une plateforme pédagogique interactive de niveau portfolio professionnel : un produit qui prouve des compétences en UX, React, architecture frontend, backend Node, sécurité, data, pédagogie, accessibilité, testing et déploiement.

Le but n'est pas seulement d'avoir beaucoup de pages. Le but est de montrer un système cohérent : apprendre, pratiquer, sauvegarder, mesurer, certifier, publier du contenu et administrer la plateforme.

## Diagnostic actuel

### Ce qui est déjà solide

- Application React/Vite fonctionnelle.
- Navigation principale, catalogue, lab interactif, dashboard, profil, projets, certification, authoring, admin et roadmap.
- Backend Express avec endpoints catalogue, progression, stats, analytics, soumissions, drafts et certificats.
- Persistance locale JSON côté serveur avec option Supabase.
- Formations HTML, CSS et JavaScript enrichies :
  - HTML : 22 leçons, 4 modules, 3 projets, 92 tests.
  - CSS : 27 leçons, 6 modules, 3 projets, 103 tests.
  - JavaScript : 23 leçons, 5 modules, 2 projets, 99 tests.
- Script d'audit pédagogique.
- Build Vite valide.

### Ce qui empêche le projet de paraître professionnel

- Risque d'encodage à surveiller sur les textes français, notamment après génération ou édition via terminal.
- `README.md` quasi vide.
- Pas de configuration ESLint.
- Pas de tests unitaires, composants ou E2E.
- Smoke test dépend de serveurs déjà lancés.
- Gros fichiers difficiles à maintenir :
  - `src/learningContent.js`
  - `src/InteractiveLearning.jsx`
  - `src/pages.jsx`
  - `server/index.js`
- Exécution JavaScript utilisateur isolée dans un Web Worker côté navigateur ; il reste à durcir les scénarios avancés et à étendre les tests E2E.
- Routes admin/auteur et exports insuffisamment protégés par rôles.
- Auth locale utile pour prototype mais insuffisante pour production.
- Certification calculée mais pas émise, vérifiable ni signée.
- Course Studio et Authoring existent mais ne publient pas réellement dans le curriculum.
- UX encore dense dans le lab : trop d'informations affichées en une seule page.
- Analytics encore trop génériques pour piloter une vraie plateforme pédagogique.

## Niveau cible

PulsaTeach doit pouvoir être présenté comme :

- une plateforme éducative interactive ;
- un LMS léger orienté code ;
- un produit full-stack ;
- un projet portfolio montrant une capacité à concevoir, structurer, sécuriser, tester et faire évoluer un produit réel.

## Principes de refonte

1. Moins de bricolage visible, plus de système.
2. Chaque fonctionnalité importante doit avoir un parcours utilisateur clair.
3. Toute action sensible doit être protégée côté serveur.
4. Le contenu pédagogique doit être profond, progressif et testable.
5. Les tests doivent couvrir les parcours critiques, pas seulement le build.
6. Le design doit être cohérent : un seul langage visuel, pas un assemblage de styles.
7. Le code doit être découpé par domaine, pas accumulé dans des fichiers géants.

## Phase 0 - Stabilisation immédiate

Objectif : enlever les signaux faibles qui font amateur.

### Qualité texte et encodage

- Corriger tous les textes corrompus.
- Vérifier l'encodage UTF-8 de tous les fichiers.
- Ajouter une règle/documentation pour éviter les régressions d'encodage.
- Relire les textes français visibles dans :
  - navigation ;
  - catalogue ;
  - lab ;
  - dashboard ;
  - profil ;
  - admin ;
  - authoring ;
  - roadmap ;
  - erreurs API.

### Documentation

- Remplacer le README minimal par une documentation complète :
  - vision produit ;
  - fonctionnalités ;
  - stack ;
  - installation ;
  - variables d'environnement ;
  - commandes ;
  - architecture ;
  - scripts de validation ;
  - sécurité ;
  - roadmap ;
  - captures d'écran.
- Ajouter une section "Pourquoi ce projet est intéressant techniquement".
- Ajouter une section "Limites connues et prochaines étapes".

### Scripts

- Ajouter `lint`.
- Ajouter `test`.
- Ajouter `test:e2e`.
- Ajouter `smoke:full` qui lance API + preview automatiquement.
- Garder `audit:learning`.

### Critères de fin

- `npm run build` passe.
- `npm run audit:learning` passe.
- `npm run lint` passe.
- `npm run smoke:full` passe.
- README exploitable par un recruteur ou un développeur externe.

## Phase 1 - Sécurité et confiance

Objectif : empêcher les critiques évidentes en revue technique.

### Auth et rôles

- Définir les rôles :
  - `learner`
  - `author`
  - `reviewer`
  - `admin`
- Protéger côté serveur :
  - exports admin ;
  - liste globale des soumissions ;
  - review de projets ;
  - création/modification/publication de drafts ;
  - analytics sensibles.
- Ajouter un middleware `requireAuth`.
- Ajouter un middleware `requireRole`.
- Refuser les actions sensibles sans session valide.

### Validation API

- Ajouter Zod ou équivalent.
- Valider strictement :
  - settings utilisateur ;
  - progression ;
  - attempts ;
  - submissions ;
  - reviews ;
  - lesson drafts ;
  - enrollments.
- Centraliser les erreurs API.
- Normaliser les réponses :
  - `{ data }`
  - `{ error: { code, message, details } }`

### Protection runtime

- Déplacer l'exécution JS utilisateur dans un Web Worker.
- Ajouter timeout d'exécution.
- Interdire accès direct au vrai `localStorage`.
- Fournir un stockage simulé.
- Fournir un `fetch` simulé pour les exercices API.
- Bloquer boucles infinies autant que possible.

### Critères de fin

- Impossible d'accéder aux routes admin sans rôle.
- Impossible de modifier les données d'un autre utilisateur.
- Le code utilisateur ne s'exécute plus dans le thread principal.
- Les erreurs API sont claires et prévisibles.

## Phase 2 - Architecture maintenable

Objectif : transformer le prototype en codebase lisible.

### Découpage frontend

Découper `src/InteractiveLearning.jsx` :

- `LearningPage`
- `LearningSidebar`
- `LessonHeader`
- `LessonTheory`
- `VocabularyPanel`
- `GuidedPractice`
- `CodeEditor`
- `PreviewPanel`
- `TestRunner`
- `CorrectionPanel`
- `NotesPanel`
- `LessonNavigation`
- hooks :
  - `useLessonRoute`
  - `useLessonProgress`
  - `useLessonCode`
  - `useBookmarks`
  - `useTestRunner`

Découper `src/pages.jsx` :

- `pages/DashboardPage.jsx`
- `pages/ProfilePage.jsx`
- `pages/SettingsPage.jsx`
- `pages/PathPage.jsx`
- `pages/ProjectsPage.jsx`
- `pages/CertificationPage.jsx`
- `pages/AnalyticsPage.jsx`
- `pages/AuthorPage.jsx`
- `pages/AdminPage.jsx`
- `pages/RoadmapPage.jsx`

### Découpage contenu

Découper `learningContent.js` :

- `content/tracks/html.js`
- `content/tracks/css.js`
- `content/tracks/javascript.js`
- `content/shared/tests.js`
- `content/shared/pedagogy.js`
- `content/shared/builders.js`
- `content/schema.js`

Puis migrer progressivement vers un format contenu versionnable :

- JSON ou MDX structuré ;
- validation schema ;
- import automatique ;
- audit pédagogique par fichier.

### Découpage backend

Découper `server/index.js` :

- `server/app.js`
- `server/routes/catalog.js`
- `server/routes/progress.js`
- `server/routes/submissions.js`
- `server/routes/certificates.js`
- `server/routes/admin.js`
- `server/routes/analytics.js`
- `server/routes/drafts.js`
- `server/middleware/auth.js`
- `server/middleware/errors.js`
- `server/storage/jsonStore.js`
- `server/storage/supabaseStore.js`
- `server/services/certificationService.js`
- `server/services/studyPlanService.js`

### Critères de fin

- Aucun fichier principal au-dessus de 500 lignes sauf contenu généré.
- Les domaines métier sont séparés.
- Les tests ciblent des fonctions pures.
- Les nouveaux cours peuvent être ajoutés sans toucher au lab.

## Phase 3 - UX produit niveau plateforme

Objectif : rendre l'expérience claire pour un débutant complet.

### Navigation

- Clarifier les zones :
  - apprendre ;
  - pratiquer ;
  - créer ;
  - progresser ;
  - administrer.
- Masquer les zones auteur/admin aux utilisateurs non autorisés.
- Améliorer le menu burger :
  - focus trap ;
  - fermeture Escape ;
  - fermeture après navigation ;
  - état actif clair ;
  - sections plus lisibles ;
  - boutons compte visibles ;
  - pas de scroll parasite.

### Lab pédagogique

- Remplacer la page unique dense par une progression par étapes :
  1. Introduction.
  2. Vocabulaire.
  3. Explication.
  4. Exemples.
  5. Pratique guidée.
  6. Exercice autonome.
  7. Tests.
  8. Correction.
  9. Synthèse.
- Ajouter un sommaire de leçon sticky.
- Ajouter un indicateur d'avancement interne à la leçon.
- Ajouter "reprendre où j'en étais".
- Ajouter un mode focus pour masquer la sidebar.
- Ajouter un mode correction après réussite ou demande explicite.

### Dashboard

- Remplacer les simples stats par un vrai cockpit :
  - prochaine leçon recommandée ;
  - objectif hebdomadaire ;
  - temps estimé restant ;
  - compétences maîtrisées ;
  - compétences fragiles ;
  - projets à terminer ;
  - certificats en cours.

### Catalogue

- Ajouter filtres :
  - niveau ;
  - durée ;
  - compétence ;
  - projet final ;
  - statut commencé/terminé.
- Ajouter pages détail formation.
- Ajouter aperçu clair du projet final.

### Critères de fin

- Un débutant sait quoi faire en moins de 10 secondes.
- Le lab ne submerge pas.
- Mobile utilisable sur 375px.
- Les espaces admin/auteur ne polluent pas l'expérience apprenant.

## Phase 4 - Curriculum premium

Objectif : faire du contenu un vrai avantage produit.

### Formations existantes à renforcer

HTML :

- Ajouter plus de révisions espacées.
- Ajouter exercices de lecture de code.
- Ajouter mini-projets réalistes :
  - page profil ;
  - article structuré ;
  - landing événement ;
  - formulaire complet.

CSS :

- Renforcer responsive avec cas réels :
  - navbar responsive ;
  - cartes fluides ;
  - dashboard responsive ;
  - galerie responsive ;
  - audit mobile-first.
- Ajouter design tokens.
- Ajouter architecture CSS.
- Ajouter animations accessibles.

JavaScript :

- Ajouter plus de debugging.
- Ajouter plus de DOM réel.
- Ajouter modules.
- Ajouter async/API plus complet.
- Ajouter tests de logique plus robustes.
- Ajouter projet final plus ambitieux.

### Nouvelles formations prioritaires

1. Git et GitHub
   - commits ;
   - branches ;
   - pull requests ;
   - résolution de conflits ;
   - README ;
   - issues ;
   - portfolio.

2. Accessibilité web
   - navigation clavier ;
   - lecteurs d'écran ;
   - contrastes ;
   - formulaires ;
   - ARIA utile ;
   - audit axe.

3. Testing frontend
   - tests unitaires ;
   - tests composants ;
   - tests E2E ;
   - fixtures ;
   - mocks ;
   - CI.

4. TypeScript
   - types primitifs ;
   - objets ;
   - unions ;
   - fonctions ;
   - generics simples ;
   - typage API.

5. React
   - composants ;
   - props ;
   - state ;
   - hooks ;
   - formulaires ;
   - routing ;
   - data fetching ;
   - projet final.

6. Backend Node/API
   - Express/Fastify ;
   - routes ;
   - validation ;
   - auth ;
   - base de données ;
   - erreurs ;
   - tests API.

7. Déploiement
   - variables d'environnement ;
   - build ;
   - preview ;
   - hébergement frontend ;
   - hébergement API ;
   - logs ;
   - monitoring.

### Critères de qualité d'une leçon

Chaque leçon doit contenir :

- pourquoi la notion existe ;
- vocabulaire ;
- explication progressive ;
- exemples courts ;
- exemples réalistes ;
- erreurs fréquentes ;
- exercice guidé ;
- exercice autonome ;
- indices progressifs ;
- tests compréhensibles ;
- correction expliquée ;
- transition vers la suite.

### Critères de fin

- Chaque formation a un vrai projet final.
- Les quiz deviennent multi-questions.
- Les projets ont rubrics.
- Les corrections expliquent les choix, pas seulement le code.

## Phase 5 - Certification sérieuse

Objectif : transformer les badges en preuve vérifiable.

### Certification

- Créer des certificats par parcours :
  - HTML Foundations ;
  - CSS Responsive Designer ;
  - JavaScript Fundamentals ;
  - Frontend Foundations.
- Ajouter un examen final par parcours.
- Ajouter une soumission de projet final.
- Ajouter review humaine ou semi-automatique.
- Générer un certificat public.
- Ajouter URL vérifiable.
- Stocker l'émission du certificat, pas seulement l'éligibilité.

### Anti-triche raisonnable

- Variantes de tests.
- Projets ouverts difficiles à copier exactement.
- Review par critères.
- Historique des attempts.
- Explication demandée sur certaines réponses.

### Critères de fin

- Un certificat a :
  - identifiant unique ;
  - date ;
  - compétences validées ;
  - projets associés ;
  - lien public ;
  - statut vérifiable.

## Phase 6 - Course Studio réel

Objectif : montrer une vraie compétence produit/admin.

### Authoring

- Créer un éditeur de formation complet :
  - track ;
  - modules ;
  - leçons ;
  - tests ;
  - starter code ;
  - solution ;
  - rubrics ;
  - durée ;
  - difficulté ;
  - compétences.
- Ajouter preview de leçon avant publication.
- Ajouter validation pédagogique automatique.
- Ajouter workflow :
  - draft ;
  - review ;
  - changes requested ;
  - published ;
  - archived.

### Publication

- Les drafts publiés doivent alimenter le catalogue réel.
- Ajouter versioning.
- Ajouter historique.
- Ajouter rollback.

### Critères de fin

- On peut créer une vraie leçon depuis l'interface.
- On peut la prévisualiser.
- On peut la publier.
- Elle apparaît dans le lab sans modifier le code source.

## Phase 7 - Data et analytics pédagogiques

Objectif : prouver une capacité à piloter un produit par les données.

### Events

Définir une taxonomie :

- `lesson_started`
- `section_completed`
- `hint_revealed`
- `test_run`
- `test_passed`
- `test_failed`
- `lesson_completed`
- `project_submitted`
- `project_reviewed`
- `certificate_issued`

### Analytics utiles

- Taux de complétion par leçon.
- Taux d'échec par test.
- Indices les plus ouverts.
- Temps moyen par leçon.
- Points de décrochage.
- Compétences faibles.
- Cohortes si mode école.

### Critères de fin

- Analytics utiles pour améliorer le curriculum.
- Dashboard admin lisible.
- Export CSV.
- Données non sensibles anonymisées quand possible.

## Phase 8 - Accessibilité, responsive et performance

Objectif : atteindre un niveau qualité visible immédiatement.

### Accessibilité

- Audit axe automatisé.
- Navigation clavier complète.
- Focus trap dans modales/menus.
- Labels sur tous les champs.
- Messages d'erreur liés aux champs.
- Aucun feedback uniquement par couleur.
- Contrastes vérifiés.

### Responsive

- Tester :
  - 375px ;
  - 768px ;
  - 1024px ;
  - 1440px.
- Corriger :
  - lab mobile ;
  - sidebar ;
  - menu ;
  - tableaux ;
  - panels admin ;
  - éditeur.

### Performance

- Réduire le bundle initial.
- Lazy-load pages lourdes.
- Lazy-load Supabase si auth nécessaire.
- Lazy-load contenu pédagogique par track.
- Ajouter route-level code splitting.

### Critères de fin

- Pas de scroll horizontal mobile.
- Lighthouse respectable.
- Bundle initial réduit.
- Les pages lourdes sont chargées à la demande.

## Phase 9 - Déploiement et démonstration portfolio

Objectif : rendre le projet montrable.

### Déploiement

- Frontend sur Vercel/Netlify.
- API sur Render/Fly/Railway.
- PostgreSQL/Supabase configuré proprement.
- Variables d'environnement documentées.
- Logs et healthcheck.

### Démo

- Ajouter données de démonstration.
- Créer un compte démo learner.
- Créer un compte démo admin.
- Ajouter captures et GIFs.
- Ajouter une vidéo courte :
  - inscription ;
  - choix formation ;
  - leçon ;
  - tests ;
  - projet ;
  - certification ;
  - admin review.

### Portfolio

- README avec screenshots.
- Architecture diagram.
- Decisions techniques.
- Problèmes résolus.
- Roadmap.
- Liens live.

### Critères de fin

- Un recruteur peut lancer le projet.
- Un recruteur peut comprendre l'architecture.
- Un recruteur peut tester une leçon en moins de 2 minutes.
- Le projet montre une vraie ambition full-stack.

## Backlog priorisé

### P0 - À faire avant toute grosse extension

- Corriger l'encodage.
- Écrire un README complet.
- Ajouter ESLint.
- Ajouter smoke test autonome.
- Protéger admin/auteur/export.
- Durcir l'exécution JS isolée en Worker avec davantage de scénarios E2E.
- Découper `InteractiveLearning.jsx`.
- Corriger certification CSS responsive.

### P1 - Produit sérieux

- Refaire UX du lab en étapes.
- Améliorer menu mobile.
- Ajouter tests Playwright.
- Ajouter audit axe.
- Découper backend.
- Découper contenu.
- Ajouter vrais quiz multi-questions.
- Améliorer dashboard apprenant.

### P2 - Différenciation portfolio

- Course Studio publiant réellement.
- Certificats vérifiables.
- Analytics pédagogiques.
- Formation Git/GitHub.
- Formation Accessibilité.
- Formation Testing.
- Formation React.
- Déploiement public propre.

### P3 - Ambition plateforme

- Cohortes/classes.
- Review par pairs.
- Profils publics.
- Galerie de projets.
- Commentaires par leçon.
- Mentorat.
- Marketplace de formations.

## Roadmap d'exécution recommandée

### Sprint 1 - Nettoyage pro

- Encodage.
- README.
- ESLint.
- Smoke autonome.
- Build/audit/lint dans un script `validate`.

### Sprint 2 - Sécurité

- Middleware auth.
- Middleware rôle.
- Protection admin/auteur.
- Validation Zod.
- Erreurs API propres.

### Sprint 3 - Lab v2

- Découpage composants.
- Stepper pédagogique.
- Sommaire sticky.
- Mode focus.
- Web Worker JS.

### Sprint 4 - UX responsive

- Menu mobile.
- Dashboard.
- Catalogue.
- Lab mobile.
- Audit 375/768/1024/1440.

### Sprint 5 - Tests sérieux

- Vitest.
- Testing Library.
- Playwright.
- axe.
- CI GitHub Actions.

### Sprint 6 - Content system

- Découper contenu.
- Schéma de leçon.
- Import par track.
- Quiz multi-questions.
- Projets/rubrics renforcés.

### Sprint 7 - Certification

- Modèle certificat.
- Émission.
- Vérification publique.
- PDF ou page partageable.

### Sprint 8 - Course Studio

- Création complète d'une leçon.
- Preview.
- Review.
- Publication.
- Versioning.

### Sprint 9 - Nouvelles formations

- Git/GitHub.
- Accessibilité.
- Testing.
- TypeScript.
- React.

### Sprint 10 - Démo publique

- Déploiement.
- Données démo.
- Screenshots.
- Vidéo.
- README final portfolio.

## Indicateurs de réussite

- 0 route critique cassée.
- 0 texte corrompu visible.
- 0 endpoint admin public.
- 80%+ des parcours critiques couverts par E2E.
- Toutes les formations ont projet final et certification.
- Lab utilisable sur mobile.
- README compréhensible sans contexte externe.
- Projet déployé avec compte démo.

## Phrase de présentation portfolio

PulsaTeach est une plateforme pédagogique full-stack pour apprendre le développement web grâce à des cours progressifs, un éditeur interactif, des tests automatiques, une progression persistante, des projets évalués, un système auteur/admin et des certifications vérifiables.
