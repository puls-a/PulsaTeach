<p align="center">
  <a href="https://pulsateach.vercel.app">
    <img src="public/assets/logo_horizontale_optimized.webp" alt="PulsaTeach" width="360" />
  </a>
</p>

<h1 align="center">PulsaTeach</h1>

<p align="center">
  Plateforme gratuite et bilingue pour apprendre le développement web par la pratique : cours guidés, lab interactif, quiz, projets, certificats, Course Studio et API sécurisée.
</p>

<p align="center">
  <a href="https://pulsateach.vercel.app"><strong>Ouvrir le site</strong></a>
  ·
  <a href="https://discord.gg/pnAdQQggUg">Discord</a>
  ·
  <a href="https://www.tiktok.com/@pulsateach">TikTok</a>
  ·
  <a href="https://www.instagram.com/pulsateach_/">Instagram</a>
  ·
  <a href="https://x.com/pulsateach">X</a>
</p>

<p align="center">
  <a href="https://github.com/pulsaflow/PulsaTeach/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/pulsaflow/PulsaTeach/actions/workflows/ci.yml/badge.svg?branch=main" /></a>
  <a href="https://github.com/pulsaflow/PulsaTeach/actions/workflows/uptime.yml"><img alt="Production uptime" src="https://github.com/pulsaflow/PulsaTeach/actions/workflows/uptime.yml/badge.svg?branch=main" /></a>
  <a href="https://pulsateach.vercel.app/api/health/ready"><img alt="Production ready" src="https://img.shields.io/badge/production-ready-16a34a?style=flat" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react&logoColor=111827" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?style=flat&logo=vite&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-strict-3ecf8e?style=flat&logo=supabase&logoColor=white" />
</p>

<p align="center">
  <img src="public/assets/og-pulsateach.png" alt="PulsaTeach preview" width="900" />
</p>

## Pourquoi PulsaTeach

PulsaTeach transforme l'apprentissage web en parcours testable : chaque leçon pousse à produire, valider, corriger et comprendre. Le produit combine une expérience apprenant publique, un backend sécurisé, un studio de création de cours et une chaîne qualité automatisée.

## Produit

- 13 formations : HTML, CSS, JavaScript, Git, Accessibilité, Testing, TypeScript, React, Node/API, SQL/PostgreSQL, Sécurité web, Performance web et Déploiement.
- 812 leçons bilingues avec exercices, ateliers, quiz, projets et feedback contextualisé.
- 616 termes de glossaire reliés aux leçons et aux quiz.
- Lab interactif avec éditeur, aperçu, tests, sauvegarde locale et progression.
- Dashboard apprenant, révisions espacées, projets, certificats vérifiables et profil.
- Course Studio avec workflow brouillon, review, approval, publication, versioning et rollback.
- API Express sécurisée : validation Zod, Helmet, CORS strict, rate limiting, readiness/liveness checks.
- SEO public : sitemap, pré-rendu, metadata dynamiques, Open Graph, données structurées et pages formation dédiées.

## Réseaux Et Contact

- Email : <mailto:pulsateach@gmail.com>
- Discord : <https://discord.gg/pnAdQQggUg>
- TikTok : <https://www.tiktok.com/@pulsateach>
- Instagram : <https://www.instagram.com/pulsateach_/>
- X : <https://x.com/pulsateach>
- Powered by PulsaFlow : <https://pulsaflow.fr>

## Stack

| Couche | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, Tailwind CSS, Lucide |
| Backend | Node.js, Express 5, Zod, Helmet, CORS |
| Auth & stockage | Supabase en production stricte, JSON en développement local |
| Tests | Vitest, Supertest, Playwright, axe-core |
| Qualité | audits architecture, catalogue, learning, éditorial, i18n, migrations, SEO, bundle |
| Déploiement | Vercel, GitHub Actions, smoke tests production |

## Démarrage Local

```bash
npm ci
npm run dev:full
```

Par défaut, le frontend Vite tourne sur `127.0.0.1` et l'API Express peut être lancée avec `npm run server`.

Configuration locale simple sans Supabase :

```bash
PULSATEACH_STORAGE=json
PULSATEACH_ADMIN_KEY=dev-admin-key
VITE_ADMIN_ACCESS_KEY=dev-admin-key
```

PowerShell :

```powershell
$env:PULSATEACH_STORAGE="json"
$env:PULSATEACH_ADMIN_KEY="dev-admin-key"
$env:VITE_ADMIN_ACCESS_KEY="dev-admin-key"
```

## Scripts

| Commande | Usage |
| --- | --- |
| `npm run dev` | Lance le frontend Vite |
| `npm run server` | Lance l'API Express |
| `npm run dev:full` | Lance frontend + API |
| `npm run build` | Génère sitemap, build Vite et pré-rendu public |
| `npm run lint` | Analyse ESLint |
| `npm run test` | Tests unitaires Vitest |
| `npm run test:api` | Tests API et sécurité |
| `npm run test:e2e` | Parcours Playwright |
| `npm run test:a11y` | Audit accessibilité E2E |
| `npm run audit:seo` | Sitemap + audit SEO public |
| `npm run audit:bundle` | Budgets JS/CSS générés |
| `npm run validate` | Suite qualité complète |
| `npm run smoke:production` | Smoke test production |

## Qualité Production

`npm run validate` regroupe les contrôles bloquants : lint, tests, architecture, cohérence catalogue, profondeur learning, qualité éditoriale, glossaire, i18n, migrations, build, SEO et budget bundle.

La CI GitHub lance aussi les tests E2E et Lighthouse. Un workflow séparé vérifie régulièrement la disponibilité production, le sitemap, les headers de sécurité et `/api/health/ready`.

## Architecture

```text
src/
  App.jsx                         Shell SPA, routes propres, guards
  LandingPage.jsx                 Landing publique
  CurriculumHub.jsx               Catalogue des formations
  features/catalog/               Pages publiques /formations/:trackId
  features/learn/                 Expérience d'apprentissage et workspace
  features/quizzes/               Quiz, review et feedback
  features/glossary/              Glossaire global
  content/                        Parcours pédagogiques et loaders lazy
  security/sandboxPolicy.js       Politique iframe/CSP des previews
server/
  index.js                        API Express
  routes/                         Routes métier
  security.js                     Headers, CORS, rate limits
  validation.js                   Schémas Zod
scripts/
  generate-sitemap.mjs            Sitemap public
  prerender-public.mjs            Pré-rendu des pages publiques
  audit-*.mjs                     Audits qualité et production
```

## Production

La production doit rester en stockage Supabase strict :

```bash
PULSATEACH_STORAGE=supabase-strict
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<public-anon-key>
VITE_AUTH_MODE=supabase
```

Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY`, clé admin ou secret serveur dans le frontend. Les rôles de production doivent venir des metadata Supabase (`role` ou `roles`).

## Documentation

- [Architecture backend](docs/BACKEND.md)
- [SEO](docs/SEO.md)
- [Exploitation](docs/OPERATIONS.md)
- [Roadmap complète](docs/ROADMAP_COMPLETE.md)
- [Preuves roadmap](docs/ROADMAP_EVIDENCE.md)
- [Plan risques produit/CTO](docs/PRODUCT_RISK_ACTION_PLAN.md)
- [Benchmark freeCodeCamp](docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md)
- [Référentiel éditorial](docs/EDITORIAL_QUALITY_SOURCES.md)

## Statut Du Dépôt

Ce dépôt contient le produit PulsaTeach complet. Le code est préparé pour consultation publique, mais aucune licence open source n'est publiée pour le moment. Sans fichier `LICENSE`, tous droits réservés par défaut.

---

<p align="center">
  Fait avec exigence par <a href="https://pulsaflow.fr">PulsaFlow</a> · <a href="mailto:pulsateach@gmail.com">pulsateach@gmail.com</a>
</p>
