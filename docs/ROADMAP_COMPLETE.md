# PulsaTeach — Roadmap produit et technique complète

Version : 1.0  
Statut : source de vérité pour la reprise du projet  
Horizon : plateforme pédagogique web bilingue, sécurisée, accessible et publiable

## 1. Vision

PulsaTeach doit devenir une plateforme d’apprentissage du développement web qui relie dans un même produit :

- des parcours progressifs ;
- des leçons interactives ;
- des quiz réellement pédagogiques ;
- un vocabulaire transversal ;
- des exercices exécutables ;
- des projets portfolio ;
- une progression par compétences ;
- des certificats vérifiables ;
- un système auteur et administrateur ;
- des données utiles pour améliorer l’apprentissage.

Le produit doit rester compréhensible pour une personne débutante. Sa richesse ne doit jamais rendre le prochain objectif ambigu.

## 2. Publics cibles

### Apprenant débutant

- découvre le code ;
- a besoin d’explications courtes et progressives ;
- doit toujours savoir quoi faire ensuite ;
- apprend sur mobile ou ordinateur ;
- doit pouvoir pratiquer sans compte, puis synchroniser sa progression.

### Apprenant en reconversion

- cherche un parcours structuré ;
- veut produire des projets crédibles ;
- a besoin d’une vision claire des compétences acquises ;
- souhaite obtenir une preuve partageable de son travail.

### Auteur pédagogique

- crée des parcours, modules, leçons, quiz et projets ;
- prévisualise le résultat apprenant ;
- soumet les contenus à une relecture ;
- corrige les problèmes détectés avant publication.

### Reviewer

- contrôle la qualité pédagogique et technique ;
- évalue les projets avec des grilles explicites ;
- valide ou refuse les publications ;
- suit les notions qui provoquent le plus d’échecs.

### Administrateur

- gère les rôles et les contenus ;
- supervise la sécurité et la santé de la plateforme ;
- consulte des données agrégées ;
- exporte les données autorisées ;
- modère les contenus et les projets.

## 3. Principes non négociables

1. Aucune donnée privée ne doit être lisible ou modifiable par un autre utilisateur.
2. Toute action sensible doit être protégée côté serveur.
3. Les fonctionnalités principales doivent être accessibles au clavier et sur écran mobile.
4. Chaque leçon doit conduire à une action concrète.
5. Un quiz doit mesurer la compréhension, pas seulement la mémoire.
6. Une notion importante doit être retrouvable dans le vocabulaire global.
7. Les contenus publiés doivent être validés par un schéma et un audit pédagogique.
8. Les pages lourdes doivent être chargées à la demande.
9. Les erreurs doivent être compréhensibles et traçables.
10. Une phase n’est terminée que lorsque ses tests et critères d’acceptation passent.

## 4. État initial

### Déjà disponible

- application React/Vite bilingue ;
- API Express ;
- stockage JSON local et adaptateur Supabase ;
- authentification locale de développement et authentification Supabase ;
- parcours HTML, CSS et JavaScript ;
- 72 leçons, 8 projets et 294 tests pédagogiques ;
- lab avec éditeur, aperçu, tests, indices et correction ;
- dashboard, profil, paramètres, projets et certificats ;
- Course Studio, espace auteur et administration ;
- Web Worker pour certains exercices JavaScript ;
- iframes sandboxées pour les aperçus ;
- audit pédagogique, ESLint, build, smoke tests et E2E Playwright partiels.

### Risques et dettes actuels

- certaines lectures API privées ne sont pas assez protégées ;
- absence de rate limiting, CSP et politique CORS stricte ;
- validation des payloads incomplète ;
- bannière cookies trop intrusive sur mobile ;
- E2E fragiles ou incomplets ;
- lab et catalogue trop denses sur mobile ;
- fichiers monolithiques ;
- absence de lazy loading par route ;
- SEO limité par le routage hash et les métadonnées globales ;
- quiz limités à une question ;
- vocabulaire enfermé dans chaque leçon ;
- nouveaux parcours non industrialisés ;
- Course Studio sans cycle éditorial et versioning complets.

## 5. Architecture fonctionnelle cible

```text
Découvrir
├── Accueil
├── Catalogue
├── Détail d’un parcours
└── Vocabulaire global

Apprendre
├── Parcours
├── Module
├── Leçon
├── Quiz
├── Révision
└── Examen

Pratiquer
├── Playground
├── Défis
├── Projets
└── Portfolio

Progresser
├── Dashboard
├── Compétences
├── Historique
├── Badges
└── Certifications

Créer et administrer
├── Course Studio
├── Workflow éditorial
├── Reviews
├── Analytics
└── Administration
```

## 6. Phase 0 — Sécurisation et stabilisation

Priorité : P0  
Dépendance : aucune  
Objectif : rendre la base sûre avant toute extension de contenu.

### API et confidentialité

- exiger une identité valide pour les données de progression, profil, paramètres, tentatives, soumissions et certificats privés ;
- empêcher la lecture d’un autre `userId`, même si son identifiant est connu ;
- réserver les listes globales aux rôles autorisés ;
- utiliser un mode invité explicite limité au développement/local ;
- séparer clairement routes publiques, authentifiées, auteur, reviewer et admin ;
- normaliser les réponses :
  - succès : `{ data, meta? }` ;
  - erreur : `{ error: { code, message, details? }, requestId }`.

### Durcissement HTTP

- CORS limité aux origines configurées ;
- en-têtes de sécurité avec Helmet ou équivalent ;
- Content Security Policy compatible avec Vite, Supabase et les iframes sandboxées ;
- rate limiting global et limites renforcées sur auth, inscription, événements et uploads ;
- limite de taille adaptée par endpoint ;
- validation stricte des URLs et des uploads ;
- désactivation des informations serveur inutiles ;
- journalisation structurée sans secrets ni données personnelles complètes.

### Validation

- ajouter Zod ou une solution équivalente ;
- créer un schéma par ressource ;
- rejeter les champs inconnus sur les écritures sensibles ;
- borner longueurs, nombres, tableaux et objets imbriqués ;
- valider les transitions de statut ;
- centraliser les erreurs de validation.

### Données

- éviter les écritures JSON concurrentes non atomiques ;
- ajouter une couche repository/service ;
- utiliser Supabase strict en production ;
- prévoir migrations, index et contraintes ;
- ajouter une stratégie de sauvegarde et restauration ;
- documenter la suppression et l’export des données personnelles.

### Critères d’acceptation

- aucun endpoint privé ne répond sans identité autorisée en production ;
- aucun utilisateur ne peut lire ou modifier les données d’un autre ;
- tests API couvrant 401, 403, 404, validation et rôle ;
- CSP, CORS et rate limiting testés ;
- secrets absents du bundle frontend ;
- `npm audit`, lint, build et smoke passent.

## 7. Phase 1 — Fondation de tests et qualité continue

Priorité : P0  
Dépendance : phase 0 en cours  
Objectif : rendre chaque évolution vérifiable.

### Tests à ajouter

- Vitest pour les fonctions pures ;
- React Testing Library pour les composants critiques ;
- Supertest pour l’API ;
- Playwright pour les parcours complets ;
- axe-core pour l’accessibilité automatisée ;
- tests du schéma de contenu ;
- tests du moteur de quiz ;
- tests des migrations et adaptateurs de stockage.

### Parcours E2E obligatoires

1. visite anonyme et consentement ;
2. création de compte ;
3. onboarding ;
4. ouverture d’une leçon ;
5. exécution des tests ;
6. validation d’un quiz ;
7. sauvegarde et reprise de progression ;
8. soumission d’un projet ;
9. review par reviewer ;
10. émission et vérification d’un certificat ;
11. création, review et publication d’un parcours ;
12. refus d’accès à chaque zone sensible.

### CI

- installation déterministe ;
- lint ;
- tests unitaires ;
- tests API ;
- audit pédagogique ;
- build ;
- E2E desktop et mobile ;
- rapport d’accessibilité ;
- artefacts de traces et captures sur échec.

### Critères d’acceptation

- suite locale reproductible avec une commande ;
- aucun test dépendant d’un ordre implicite ;
- fixtures isolées et nettoyées ;
- couverture prioritaire des règles métier et parcours critiques ;
- E2E stables sur Chromium desktop et mobile.

## 8. Phase 2 — Architecture maintenable

Priorité : P0/P1  
Dépendance : socle de tests minimal  
Objectif : permettre l’ajout de dizaines de parcours sans agrandir les fichiers monolithiques.

### Frontend

```text
src/
├── app/
│   ├── router/
│   ├── layout/
│   └── providers/
├── features/
│   ├── auth/
│   ├── catalog/
│   ├── learning/
│   ├── quizzes/
│   ├── glossary/
│   ├── projects/
│   ├── certificates/
│   ├── authoring/
│   └── admin/
├── components/
├── hooks/
├── lib/
└── styles/
```

- remplacer le routeur manuel par React Router ou un routeur équivalent ;
- lazy-loader les pages et fonctionnalités lourdes ;
- ajouter des error boundaries ;
- séparer état serveur et état local ;
- isoler les appels API par domaine ;
- découper le lab en composants et hooks testables.

### Backend

```text
server/
├── app.js
├── config/
├── middleware/
├── routes/
├── controllers/
├── services/
├── repositories/
├── schemas/
└── errors/
```

- aucune logique métier importante directement dans les routes ;
- repositories séparés pour JSON et Supabase ;
- services dédiés à la progression, aux quiz, aux certificats et à la publication ;
- middleware d’authentification et d’autorisation centralisé ;
- gestion d’erreur unique.

### Contenu

```text
content/
├── tracks/
│   ├── html/
│   ├── css/
│   ├── javascript/
│   └── ...
├── glossary/
├── quizzes/
├── projects/
├── schemas/
└── indexes/
```

- un fichier ou dossier par parcours/module ;
- identifiants stables ;
- version du contenu ;
- schéma commun ;
- index générés automatiquement ;
- audit de liens, prérequis, vocabulaire et compétences.

### Critères d’acceptation

- aucun fichier métier principal supérieur à environ 500 lignes ;
- ajout d’un parcours sans modifier le moteur du lab ;
- contenu importé dynamiquement par parcours ;
- backend testable sans démarrer le serveur HTTP ;
- aucune régression fonctionnelle.

## 9. Phase 3 — UX apprenant et responsive

Priorité : P1  
Dépendance : sécurité et tests principaux  
Objectif : rendre le produit évident et confortable.

### Navigation

- zones limitées à Découvrir, Apprendre, Pratiquer et Progresser ;
- zones auteur/admin invisibles sans rôle ;
- menu clavier complet ;
- focus trap et restitution du focus ;
- fermeture Escape, backdrop et navigation ;
- liens profonds partageables.

### Consentement et authentification

- bannière compacte sur mobile ;
- ne jamais masquer le formulaire principal ;
- préférences accessibles dans une feuille ou modale scrollable ;
- E2E basé sur rôles et labels accessibles ;
- erreurs rattachées aux champs ;
- état de service indisponible avec action de reprise.

### Catalogue

- cartes de parcours condensées ;
- page détail par parcours ;
- filtres niveau, durée, compétence, statut et technologie ;
- recherche ;
- comparaison légère ;
- projet final et prérequis visibles ;
- accordéons fermés par défaut sur mobile.

### Lab v2

- progression par étapes :
  1. objectif ;
  2. vocabulaire ;
  3. cours ;
  4. exemple ;
  5. pratique guidée ;
  6. exercice ;
  7. quiz ou tests ;
  8. correction ;
  9. synthèse ;
- mode focus ;
- sidebar repliable ;
- éditeur et preview en onglets sur mobile ;
- sauvegarde automatique visible ;
- reprise exacte de la dernière section ;
- raccourcis clavier documentés.

### Dashboard

- prochaine action dominante ;
- objectif hebdomadaire ;
- progression par compétence ;
- notions à revoir ;
- quiz recommandés ;
- projets et certificats en cours ;
- activité récente utile, pas décorative.

### Critères d’acceptation

- prochaine action comprise en moins de 10 secondes ;
- parcours principal utilisable à 375 px ;
- aucune modale ne masque une action sans possibilité claire de fermeture ;
- aucun scroll horizontal ;
- lab utilisable au clavier et sur écran tactile.

## 10. Phase 4 — Moteur de quiz complet

Priorité : P1  
Dépendance : schéma de contenu et architecture learning  
Objectif : transformer les quiz isolés en système d’évaluation et de révision.

### Types de questions

- choix unique ;
- choix multiple ;
- vrai/faux avec justification ;
- association terme/définition ;
- classement dans l’ordre ;
- texte à trous ;
- lecture de code ;
- prédiction de résultat ;
- identification d’erreur ;
- correction de code ;
- question ouverte courte ;
- mini-défi exécuté par les moteurs HTML/CSS/JS.

### Modèle de quiz

```js
{
  id,
  trackId,
  moduleId,
  title: { fr, en },
  purpose: "lesson-check | module-review | spaced-review | exam",
  passingScore,
  timeLimitSeconds: null,
  randomizeQuestions: true,
  questionPool: [],
  feedbackMode: "immediate | end",
  attemptsPolicy: {
    maxAttempts: null,
    cooldownMinutes: 0,
    keepBestScore: true
  }
}
```

### Modèle de question

```js
{
  id,
  type,
  prompt: { fr, en },
  code: null,
  choices: [],
  answer,
  explanation: { fr, en },
  distractorFeedback: {},
  difficulty: "starter | intermediate | advanced",
  skills: [],
  glossaryTerms: [],
  points: 1
}
```

### Expérience quiz

- une question à la fois sur mobile ;
- navigation claire entre questions ;
- progression visible ;
- sauvegarde automatique du brouillon ;
- résultat par compétence ;
- explication de chaque erreur ;
- lien direct vers la leçon et le terme de vocabulaire concernés ;
- possibilité de créer une session de révision avec les erreurs ;
- accessibilité clavier complète ;
- aucune validation reposant uniquement sur la couleur.

### Banque de questions

- minimum 8 à 15 questions par module ;
- variantes de questions ;
- distracteurs liés aux erreurs fréquentes ;
- tags de difficulté et compétences ;
- détection de doublons ;
- audit de couverture ;
- statistiques anonymisées par question.

### Révision espacée

- file de notions à revoir ;
- priorisation selon erreurs, ancienneté et confiance ;
- sessions de 5, 10 ou 20 questions ;
- révision inter-parcours ;
- maîtrise calculée par compétence, pas uniquement par score global.

### Examens

- examen de fin de parcours ;
- questions tirées d’un pool ;
- seuil par compétence critique ;
- sauvegarde de tentative ;
- reprise contrôlée après interruption ;
- rapport final détaillé ;
- examen requis pour certains certificats.

### Critères d’acceptation

- quiz multi-questions et multi-types ;
- scores persistés côté serveur ;
- reprise d’un quiz interrompu ;
- explications pédagogiques pour toute réponse ;
- sessions de révision générées depuis les erreurs ;
- auteur capable de créer et prévisualiser un quiz ;
- tests unitaires sur scoring, randomisation et reprise.

## 11. Phase 5 — Page vocabulaire globale

Priorité : P1  
Dépendance : index de contenu  
Objectif : rendre toutes les notions retrouvables indépendamment des leçons.

### Route et navigation

- route publique `/glossary` ou `/vocabulary` ;
- entrée principale dans Découvrir ;
- liens contextuels depuis les leçons, quiz, corrections et compétences ;
- URL partageable par terme : `/glossary/:slug`.

### Contenu d’un terme

```js
{
  id,
  slug,
  term: { fr, en },
  aliases: { fr: [], en: [] },
  definition: { fr, en },
  shortDefinition: { fr, en },
  category,
  languages: [],
  difficulty,
  examples: [],
  counterExamples: [],
  commonMistakes: [],
  relatedTerms: [],
  lessonIds: [],
  quizQuestionIds: [],
  externalReferences: []
}
```

### Fonctionnalités

- recherche tolérante aux accents et variantes ;
- index alphabétique ;
- filtres par technologie, catégorie, difficulté et parcours ;
- termes associés ;
- exemple et contre-exemple ;
- bouton écouter la prononciation si pertinent ;
- copie du lien ;
- favoris ;
- historique des termes consultés ;
- mini-quiz depuis un terme ;
- liste « à réviser » ;
- affichage bilingue optionnel côte à côte.

### Catégories initiales

- HTML et sémantique ;
- CSS, layout et responsive ;
- JavaScript et programmation ;
- DOM et navigateur ;
- accessibilité ;
- Git et collaboration ;
- tests et qualité ;
- TypeScript ;
- React ;
- Node/API ;
- bases de données ;
- sécurité web ;
- déploiement et performance.

### Industrialisation

- extraire automatiquement le vocabulaire des leçons ;
- détecter les définitions divergentes ;
- exiger un identifiant de terme plutôt qu’une chaîne libre ;
- signaler les termes utilisés mais non définis ;
- signaler les termes orphelins ;
- générer l’index de recherche au build.

### Critères d’acceptation

- tous les termes des parcours publiés sont indexés ;
- recherche instantanée et accessible ;
- chaque terme renvoie vers les leçons associées ;
- aucun doublon évident ;
- page utilisable sur mobile ;
- audit automatique du vocabulaire intégré à `validate`.

## 12. Phase 6 — Parcours existants premium

Priorité : P1  
Dépendance : moteur de quiz et vocabulaire  
Objectif : rendre HTML, CSS et JavaScript exemplaires avant de multiplier les parcours.

### HTML

- quiz par module ;
- révisions sémantique, formulaires, médias, tableaux, SEO et accessibilité ;
- davantage de lecture et correction de code ;
- projets : profil, article, formulaire, événement ;
- examen HTML Foundations ;
- certificat dédié.

### CSS

- cascade, spécificité et héritage ;
- box model ;
- Flexbox et Grid ;
- responsive mobile-first ;
- design tokens ;
- architecture CSS ;
- animations accessibles ;
- debugging de layout ;
- projets : landing responsive, galerie, dashboard ;
- examen CSS Responsive Designer.

### JavaScript

- types, conditions, boucles et fonctions ;
- tableaux, objets et immutabilité ;
- erreurs et debugging ;
- DOM et événements ;
- modules ;
- localStorage ;
- async, fetch et gestion d’erreurs ;
- sécurité côté navigateur ;
- tests de logique ;
- projets : gestionnaire de tâches, dashboard API, mini-app ;
- examen JavaScript Fundamentals.

### Critères d’acceptation

- chaque module possède quiz, révision et vocabulaire relié ;
- chaque parcours possède au moins trois projets progressifs ;
- projet final avec rubric ;
- examen et certificat ;
- aucun contenu superficiel ou dupliqué.

## 13. Phase 7 — Nouveaux parcours

Priorité : P1/P2  
Dépendance : système de contenu industrialisé  
Objectif : construire un catalogue cohérent, pas une collection de cours isolés.

### Ordre recommandé

#### 1. Git et GitHub

- terminal essentiel ;
- dépôt, commit et historique ;
- branches ;
- merge et conflits ;
- remote, clone, fetch, pull et push ;
- issues et pull requests ;
- code review ;
- README et portfolio ;
- GitHub Actions introductif ;
- projet : contribuer à un dépôt simulé.

#### 2. Accessibilité web

- handicaps et technologies d’assistance ;
- structure sémantique ;
- clavier et focus ;
- formulaires ;
- images et médias ;
- contrastes ;
- ARIA utile ;
- annonces dynamiques ;
- audits manuels et axe ;
- projet : rendre une application accessible.

#### 3. Testing frontend

- pyramide de tests ;
- tests unitaires ;
- Vitest ;
- composants React ;
- mocks et fixtures ;
- tests d’intégration ;
- Playwright ;
- accessibilité automatisée ;
- CI ;
- projet : sécuriser une application existante.

#### 4. TypeScript

- types primitifs ;
- objets et tableaux ;
- unions et narrowing ;
- fonctions ;
- interfaces et types ;
- generics ;
- utilitaires ;
- typage DOM et API ;
- migration JavaScript vers TypeScript ;
- projet : application typée.

#### 5. React

- composants et JSX ;
- props ;
- state ;
- événements ;
- listes et formulaires ;
- hooks ;
- effets ;
- composition ;
- routing ;
- requêtes et états asynchrones ;
- accessibilité ;
- tests ;
- performance ;
- projet : application métier complète.

#### 6. Node.js et API

- runtime Node ;
- modules et asynchronisme ;
- Express ;
- routing ;
- validation ;
- architecture contrôleur/service/repository ;
- authentification ;
- autorisation ;
- erreurs ;
- logs ;
- tests API ;
- projet : API sécurisée.

#### 7. SQL et PostgreSQL

- tables et types ;
- requêtes CRUD ;
- filtres, tris et agrégations ;
- relations et jointures ;
- contraintes ;
- index ;
- transactions ;
- migrations ;
- sécurité et RLS ;
- projet : modèle de données d’une plateforme.

#### 8. Sécurité web

- modèle de menace ;
- validation ;
- XSS ;
- CSRF ;
- authentification et sessions ;
- autorisation ;
- secrets ;
- CORS et CSP ;
- uploads ;
- dépendances ;
- logs et réponse aux incidents ;
- projet : audit et correction d’une application.

#### 9. Performance web

- métriques Web Vitals ;
- réseau et cache ;
- images ;
- CSS critique ;
- JavaScript et code splitting ;
- React performance ;
- bases de données et API ;
- mesure Lighthouse ;
- projet : budget de performance.

#### 10. Déploiement et DevOps

- environnements ;
- variables et secrets ;
- build ;
- Docker introductif ;
- CI/CD ;
- Vercel et hébergement API ;
- migrations ;
- logs ;
- monitoring ;
- rollback ;
- projet : déploiement reproductible.

### Parcours composés

- Frontend Foundations : HTML + CSS + JavaScript ;
- Frontend Professional : Git + accessibilité + testing + TypeScript + React ;
- Full-stack JavaScript : React + Node/API + SQL + sécurité ;
- Quality Engineer : testing + accessibilité + performance + CI ;
- Web Production : Git + sécurité + déploiement + monitoring.

### Standard minimal d’un parcours

- promesse et public cible ;
- prérequis ;
- carte de compétences ;
- 4 à 8 modules ;
- 20 à 40 leçons ;
- quiz par module ;
- révisions espacées ;
- vocabulaire indexé ;
- exercices guidés et autonomes ;
- 2 mini-projets ;
- 1 projet final ;
- examen ;
- certificat ;
- durée estimée réaliste ;
- version française et anglaise validée.

## 14. Phase 8 — Compétences, progression et gamification

Priorité : P2  
Dépendance : quiz et parcours normalisés  
Objectif : montrer une progression crédible sans transformer le produit en machine à points.

### Modèle de compétence

- identifiant stable ;
- nom et description bilingues ;
- niveau attendu ;
- relations de prérequis ;
- preuves :
  - leçons terminées ;
  - quiz réussis ;
  - exercices validés ;
  - projets approuvés ;
  - examens réussis.

### Progression

- progression par parcours, module et compétence ;
- maîtrise calculée avec récence et répétition ;
- distinction « découvert », « pratiqué », « maîtrisé » ;
- recommandations fondées sur lacunes et objectifs ;
- temps d’apprentissage estimé ;
- reprise multi-appareils.

### Gamification responsable

- XP pour effort réel ;
- badges liés à des compétences ou projets ;
- séries flexibles sans punition excessive ;
- défis hebdomadaires ;
- niveaux purement informatifs ;
- aucune mécanique aléatoire payante ;
- possibilité de masquer la gamification.

### Critères d’acceptation

- chaque score a une preuve identifiable ;
- recommandations explicables ;
- pas de double attribution d’XP ;
- progression locale et distante fusionnée sans perte ;
- préférences de gamification respectées.

## 15. Phase 9 — Projets, portfolio et review

Priorité : P2  
Dépendance : rôles et rubrics  
Objectif : transformer l’apprentissage en réalisations visibles.

### Projets

- brief ;
- contraintes ;
- étapes ;
- critères de réussite ;
- starter optionnel ;
- livrables ;
- rubric ;
- auto-évaluation ;
- soumission URL, dépôt ou archive autorisée ;
- historique de versions.

### Review

- score par critère ;
- commentaire contextualisé ;
- statut soumis, en review, changements demandés, approuvé ;
- seconde soumission ;
- journal de décisions ;
- modèles de feedback ;
- notifications.

### Portfolio

- profil public optionnel ;
- sélection de projets ;
- compétences démontrées ;
- certificats ;
- description et captures ;
- contrôle de visibilité ;
- export partageable.

## 16. Phase 10 — Certifications

Priorité : P2  
Dépendance : examens et projets  
Objectif : produire des preuves vérifiables.

- certificat par parcours ;
- certificats composés ;
- identifiant et URL publique ;
- date, version du parcours et compétences ;
- preuves associées ;
- statut valide, expiré ou révoqué ;
- page imprimable accessible ;
- QR code optionnel ;
- génération PDF optionnelle ;
- examen et projet requis selon le certificat ;
- endpoint public limité aux données nécessaires.

## 17. Phase 11 — Course Studio et CMS pédagogique

Priorité : P2  
Dépendance : schémas de contenu stabilisés  
Objectif : publier sans modifier le code source.

### Édition

- parcours ;
- modules ;
- leçons ;
- quiz et pools de questions ;
- vocabulaire ;
- projets et rubrics ;
- examens ;
- compétences ;
- certificats ;
- traductions.

### Workflow

```text
draft → review → changes_requested → approved → scheduled/published → archived
```

- droits par transition ;
- commentaires de review ;
- preview apprenant ;
- validation automatique ;
- versioning ;
- diff ;
- rollback ;
- planification de publication ;
- archivage sans casser les progressions existantes.

### Critères d’acceptation

- création d’un parcours complet depuis l’interface ;
- prévisualisation fidèle ;
- publication visible dans le catalogue ;
- rollback fonctionnel ;
- historique d’auteur et reviewer.

## 18. Phase 12 — Analytics pédagogiques et administration

Priorité : P2  
Dépendance : taxonomie d’événements et consentement  
Objectif : améliorer les contenus sans surveiller inutilement les personnes.

### Événements

- parcours consulté ;
- leçon commencée ;
- section terminée ;
- indice ouvert ;
- test exécuté ;
- quiz répondu ;
- leçon terminée ;
- révision effectuée ;
- projet soumis et reviewé ;
- certificat émis.

### Indicateurs

- activation après inscription ;
- première leçon terminée ;
- complétion par parcours ;
- taux d’échec par question et test ;
- notions fragiles ;
- abandons ;
- temps médian ;
- utilisation des indices ;
- progression des cohortes ;
- qualité des contenus.

### Confidentialité

- consentement respecté ;
- agrégation et minimisation ;
- rétention documentée ;
- export et suppression ;
- pas de contenu de code personnel dans les logs analytics ;
- séparation analytics produit et données de compte.

## 19. Phase 13 — Accessibilité, performance et SEO

Priorité : continue, gate final P1/P2  
Dépendance : aucune pour commencer

### Accessibilité

- WCAG 2.2 AA comme cible ;
- landmarks et titres cohérents ;
- navigation clavier ;
- focus visible, trap et restitution ;
- lecteurs d’écran ;
- erreurs et statuts annoncés ;
- contraste ;
- zoom 200 % ;
- reduced motion ;
- éditeur utilisable sans souris ;
- axe dans la CI et audits manuels.

### Performance

- routes lazy-loadées ;
- Supabase chargé uniquement si nécessaire ;
- contenu chargé par parcours ;
- bundles surveillés avec budget ;
- cache API ;
- compression ;
- images optimisées ;
- mesure Lighthouse et Web Vitals ;
- pas de requêtes en double sous StrictMode.

### SEO et partage

- routes sans hash ;
- titre et description par page ;
- canonical ;
- Open Graph et Twitter cards ;
- favicon et manifest ;
- robots.txt et sitemap ;
- données structurées Course/Breadcrumb selon pertinence ;
- pages publiques rendues indexables ;
- pages privées non indexables.

### Budgets cibles

- aucun débordement horizontal à 375 px ;
- score Lighthouse raisonnable sur les pages publiques ;
- bundle initial limité et suivi ;
- LCP, CLS et INP surveillés ;
- aucune violation axe critique.

## 20. Phase 14 — Internationalisation

Priorité : P2  
Objectif : fiabiliser le français et l’anglais, puis préparer d’autres langues.

- retirer les textes métier des composants ;
- catalogue de traductions ;
- fallback explicite ;
- détection des clés manquantes ;
- validation de toutes les traductions avant publication ;
- formats de date, nombre et durée localisés ;
- contenu et interface séparés ;
- glossaire bilingue cohérent ;
- URLs et métadonnées localisées si SEO multilingue.

## 21. Phase 15 — Déploiement, exploitation et portfolio

Priorité : P1/P2  
Objectif : rendre le projet publiable et démontrable.

- environnements local, preview et production ;
- configuration validée au démarrage ;
- Supabase strict en production ;
- CI/CD ;
- migrations avant déploiement ;
- healthcheck ;
- logs structurés ;
- suivi d’erreurs ;
- monitoring de disponibilité ;
- sauvegardes ;
- procédure de rollback ;
- comptes et données de démonstration isolés ;
- README complet ;
- diagrammes d’architecture ;
- captures desktop/mobile ;
- vidéo courte ;
- décisions techniques documentées.

## 22. Ordre d’exécution global

### Lot A — Bloquants production

1. confidentialité API ;
2. auth et rôles ;
3. validation ;
4. sécurité HTTP ;
5. tests API ;
6. réparation E2E ;
7. consentement mobile.

### Lot B — Fondation maintenable

1. découpage backend ;
2. découpage frontend ;
3. routeur ;
4. schéma de contenu ;
5. séparation des parcours ;
6. CI complète.

### Lot C — Expérience apprenant

1. catalogue compact ;
2. pages détail ;
3. lab v2 ;
4. dashboard ;
5. mobile et accessibilité ;
6. performances.

### Lot D — Système pédagogique

1. moteur de quiz ;
2. banque de questions ;
3. révision espacée ;
4. vocabulaire global ;
5. compétences ;
6. examens.

### Lot E — Contenu

1. remise à niveau HTML/CSS/JS ;
2. Git/GitHub ;
3. accessibilité ;
4. testing ;
5. TypeScript ;
6. React ;
7. Node/API ;
8. SQL ;
9. sécurité ;
10. performance et déploiement.

### Lot F — Preuves et publication

1. projets et reviews ;
2. certifications ;
3. portfolio ;
4. Course Studio ;
5. analytics ;
6. déploiement public.

## 23. Gates de validation

### Gate sécurité

- tests d’autorisation complets ;
- aucun secret frontend ;
- CSP/CORS/rate limit actifs ;
- données utilisateur isolées.

### Gate qualité

- lint, unit, API, audit contenu, build et E2E passent ;
- aucune erreur console ;
- migrations testées ;
- documentation à jour.

### Gate pédagogique

- chaque leçon respecte le standard ;
- chaque module a un quiz ;
- chaque terme est indexé ;
- chaque parcours a projet final et examen ;
- corrections et feedbacks sont expliqués.

### Gate UX

- 375, 768, 1024 et 1440 px testés ;
- clavier et lecteur d’écran contrôlés ;
- aucune action essentielle masquée ;
- prochaine étape évidente.

### Gate production

- environnement strict ;
- monitoring et sauvegardes ;
- rollback documenté ;
- démo et README disponibles.

## 24. Indicateurs de réussite

- 0 accès non autorisé connu ;
- 0 route critique cassée ;
- 0 violation d’accessibilité critique automatisée ;
- 100 % des parcours publiés avec quiz par module ;
- 100 % des termes pédagogiques indexés ;
- 100 % des parcours avec projet final et examen ;
- parcours inscription → première réussite couvert en E2E ;
- progression reprise sur un autre appareil ;
- publication d’un parcours sans modification du code ;
- certificat public vérifiable ;
- catalogue mobile utilisable et lisible ;
- documentation suffisante pour un nouveau développeur.

## 25. Définition globale de terminé

La roadmap n’est pas terminée parce que les pages existent. Elle est terminée lorsque :

- la sécurité est prouvée par des tests ;
- les parcours principaux fonctionnent de bout en bout ;
- les contenus sont industrialisés ;
- les quiz, le vocabulaire et les compétences sont reliés ;
- l’expérience est accessible et responsive ;
- les nouveaux parcours respectent tous le même standard ;
- la publication est réalisable depuis le Course Studio ;
- la production est observable, sauvegardée et documentée ;
- tous les gates de validation passent sur l’état réel du dépôt.

