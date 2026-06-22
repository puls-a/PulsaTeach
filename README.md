# PulsaTeach

PulsaTeach est une plateforme pédagogique full-stack pour apprendre le développement web avec des cours progressifs, un éditeur interactif, des tests automatiques, une progression sauvegardée, des projets évalués et une base d'administration.

Le projet vise un niveau portfolio professionnel : il montre à la fois une réflexion produit, une interface React, un backend Express, une persistance locale/Supabase, un système de contenu pédagogique et une roadmap de plateforme complète.

## Fonctionnalités

- Catalogue de formations HTML, CSS et JavaScript.
- Lab interactif avec cours, vocabulaire, exemples, éditeur, aperçu live, tests, indices et correction expliquée.
- Progression locale avec synchronisation backend quand l'API est disponible.
- Dashboard apprenant, profil, paramètres, parcours recommandé et activité récente.
- Soumission de projets et préparation de certifications.
- Pages auteur/admin pour préparer le futur workflow de publication.
- API Express pour catalogue, progression, analytics, soumissions, drafts et certificats.
- Audit pédagogique automatisé du curriculum.

## Curriculum actuel

| Formation | Modules | Leçons | Projets | Tests | Durée estimée |
| --- | ---: | ---: | ---: | ---: | ---: |
| HTML | 4 | 22 | 3 | 92 | 18 h |
| CSS | 6 | 27 | 3 | 103 | 23 h |
| JavaScript | 5 | 23 | 2 | 99 | 18 h |

Total : 72 leçons, 8 projets et 294 tests.

## Stack

- Frontend : React 19, Vite, Tailwind CSS, Lucide React.
- Backend : Node.js, Express.
- Auth/persistance optionnelle : Supabase.
- Stockage de développement : fichiers JSON locaux dans `data/`.
- Qualité : ESLint, audit pédagogique, build Vite, smoke tests.

## Installation

```bash
npm install
```

Copier les variables d'environnement si nécessaire :

```bash
cp .env.example .env
```

En développement local sans Supabase, utiliser :

```bash
PULSATEACH_STORAGE=json
PULSATEACH_ADMIN_KEY=dev-admin-key
VITE_ADMIN_ACCESS_KEY=dev-admin-key
```

Sous PowerShell :

```powershell
$env:PULSATEACH_STORAGE="json"
```

## Commandes

```bash
npm run dev          # Frontend Vite
npm run server       # API Express
npm run dev:full     # Frontend + API
npm run build        # Build production
npm run lint         # Analyse ESLint
npm run test         # Tests unitaires et API avec Vitest
npm run test:api     # Tests de sécurité et validation API
npm run test:e2e     # Parcours Playwright desktop et mobile
npm run test:a11y    # Audit axe des pages critiques
npm run audit:learning
npm run validate     # Lint + audit pédagogique + build
npm run smoke        # Vérifie routes/endpoints avec serveurs déjà lancés
npm run smoke:full   # Lance API + preview puis exécute le smoke test
```

## Architecture

```text
src/
  App.jsx                  Navigation SPA et routes propres avec compatibilité hash
  InteractiveLearning.jsx  Lab pédagogique interactif
  CurriculumHub.jsx        Catalogue des formations
  pages.jsx                Pages dashboard, profil, admin, auteur, etc.
  learningContent.js       Curriculum et exercices
  *Pedagogy.js             Génération de contenu pédagogique spécialisé
server/
  index.js                 API Express
  supabaseServer.js        Adaptateur Supabase
  roadmap.js               Roadmap exposée par l'API
scripts/
  audit-learning.mjs       Audit structurel des formations
  smoke.mjs                Smoke test HTTP
  smoke-full.mjs           Smoke test autonome avec serveurs lancés
```

## Validation

Avant de pousser une modification importante :

```bash
npm run validate
npm run smoke:full
npm run smoke:production
```

Le smoke test simple suppose que le frontend et l'API sont déjà démarrés. Le smoke test complet démarre l'API et le preview Vite automatiquement.

La matrice exigence → preuve et les limites vérifiées sont maintenues dans
[`docs/ROADMAP_EVIDENCE.md`](./docs/ROADMAP_EVIDENCE.md).

## Production Supabase

La production Vercel doit utiliser Supabase en mode strict :

```bash
PULSATEACH_STORAGE=supabase-strict
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<public-anon-key>
VITE_AUTH_MODE=supabase
```

Les migrations sont versionnées dans `supabase/migrations/` et doivent être appliquées avant le déploiement applicatif. La migration `20260621200000_course_workflow_versions.sql` ajoute le workflow éditorial, l’historique Course Studio, les soumissions versionnées et les preuves de certificat. La configuration Auth autorise `https://pulsateach.vercel.app` et `http://127.0.0.1:5173` comme URLs de redirection.

## Points techniques importants

- Le curriculum est audité automatiquement pour vérifier la présence des sections pédagogiques obligatoires.
- Les exercices CSS et JavaScript sont validés par tests statiques ou expressions exécutées.
- Le backend peut fonctionner en JSON local ou avec Supabase. La production doit rester en `supabase-strict`.
- Les endpoints admin/auteur/review sont protégés par rôles côté serveur.
- En développement JSON local, `PULSATEACH_ADMIN_KEY` et `VITE_ADMIN_ACCESS_KEY` permettent de tester ces écrans sans Supabase.
- En production, les rôles doivent venir des metadata Supabase (`role` ou `roles`) et la clé dev ne doit pas être exposée au navigateur.
- Les certificats sont émis avec un code public, une version, les compétences et preuves associées ; ils peuvent être révoqués sans exposer les données privées du compte.
- Course Studio suit `draft → review → changes_requested/approved → scheduled/published → archived`, avec contrôle des rôles, verrouillage optimiste, diff et rollback.
- L'exécution JavaScript utilisateur du lab navigateur passe par un Web Worker avec timeout, stockage simulé et `fetch` simulé.

## Limites connues

- Les anciens favoris `#/...` sont conservés par migration automatique vers les routes propres.
- Le déploiement du workflow éditorial exige l’application préalable de sa migration Supabase.
- Les intégrations d’alerte supplémentaires peuvent être branchées au-delà du monitoring GitHub Actions fourni.
- Les captures et la vidéo de démonstration sont versionnées dans `docs/media/`.

## Roadmap

La roadmap historique est dans [`ROADMAP.md`](./ROADMAP.md). La nouvelle source de vérité détaillée, incluant le moteur de quiz, le vocabulaire global et les futurs parcours, est dans [`docs/ROADMAP_COMPLETE.md`](./docs/ROADMAP_COMPLETE.md).

Un prompt maître prêt à lancer pour exécuter cette roadmap se trouve dans [`docs/PROMPT_EXECUTION_COMPLETE.md`](./docs/PROMPT_EXECUTION_COMPLETE.md).

Les procédures de monitoring, sauvegarde, restauration et rollback sont
documentées dans [`docs/OPERATIONS.md`](./docs/OPERATIONS.md).

## Présentation portfolio

PulsaTeach montre la construction d'une plateforme d'apprentissage complète : produit, pédagogie, frontend, backend, persistance, tests, administration et certification. Le projet est volontairement ambitieux pour démontrer une capacité à penser au-delà d'une simple collection d'exercices.
