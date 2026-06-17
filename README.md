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
npm run audit:learning
npm run validate     # Lint + audit pédagogique + build
npm run smoke        # Vérifie routes/endpoints avec serveurs déjà lancés
npm run smoke:full   # Lance API + preview puis exécute le smoke test
```

## Architecture

```text
src/
  App.jsx                  Navigation et routage hash
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
```

Le smoke test simple suppose que le frontend et l'API sont déjà démarrés. Le smoke test complet démarre l'API et le preview Vite automatiquement.

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

Les migrations sont versionnées dans `supabase/migrations/`. La configuration Auth autorise `https://pulsateach.vercel.app` et `http://127.0.0.1:5173` comme URLs de redirection.

## Points techniques importants

- Le curriculum est audité automatiquement pour vérifier la présence des sections pédagogiques obligatoires.
- Les exercices CSS et JavaScript sont validés par tests statiques ou expressions exécutées.
- Le backend peut fonctionner en JSON local ou avec Supabase. La production doit rester en `supabase-strict`.
- Les endpoints admin/auteur/review sont protégés par rôles côté serveur.
- En développement JSON local, `PULSATEACH_ADMIN_KEY` et `VITE_ADMIN_ACCESS_KEY` permettent de tester ces écrans sans Supabase.
- En production, les rôles doivent venir des metadata Supabase (`role` ou `roles`) et la clé dev ne doit pas être exposée au navigateur.
- Les certificats sont pour l'instant calculés comme éligibilité ; la roadmap prévoit une émission vérifiable.
- L'exécution JavaScript utilisateur du lab navigateur passe par un Web Worker avec timeout, stockage simulé et `fetch` simulé.

## Limites connues

- Les pages admin/auteur sont protégées côté API, mais leur expérience produit reste à renforcer.
- Le Course Studio ne publie pas encore réellement dans le curriculum actif.
- Les gros fichiers doivent être découpés par domaine.
- Il manque encore des tests unitaires/composants/E2E.
- Le README documente l'état actuel, mais la roadmap décrit le niveau cible.

## Roadmap

La roadmap complète est dans [`ROADMAP.md`](./ROADMAP.md). Les priorités immédiates :

1. Sécuriser admin/auteur/export.
2. Isoler l'exécution JavaScript utilisateur.
3. Découper le lab et le contenu.
4. Améliorer l'expérience mobile et le menu burger.
5. Ajouter tests E2E/accessibilité.
6. Transformer Course Studio en vrai système de publication.

## Présentation portfolio

PulsaTeach montre la construction d'une plateforme d'apprentissage complète : produit, pédagogie, frontend, backend, persistance, tests, administration et certification. Le projet est volontairement ambitieux pour démontrer une capacité à penser au-delà d'une simple collection d'exercices.
