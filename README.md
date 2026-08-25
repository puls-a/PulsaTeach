<p align="center">
  <a href="https://pulsateach.vercel.app">
    <img src="public/assets/logo_horizontale_optimized.webp" alt="PulsaTeach" width="380" />
  </a>
</p>

<h1 align="center">PulsaTeach</h1>

<p align="center">
  Plateforme d'apprentissage web bilingue, testable et prête production : cours guidés, labs interactifs, quiz techniques, projets, certificats, Course Studio, API sécurisée et chaîne qualité automatisée.
</p>

<p align="center">
  <a href="https://pulsateach.vercel.app"><strong>Ouvrir la production</strong></a>
  ·
  <a href="https://pulsateach.vercel.app/catalog">Catalogue</a>
  ·
  <a href="https://discord.gg/pnAdQQggUg">Discord</a>
  ·
  <a href="https://x.com/pulsateach">X</a>
  ·
  <a href="mailto:pulsateach@gmail.com">Contact</a>
</p>

<p align="center">
  <a href="https://github.com/puls-a/PulsaTeach/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/puls-a/PulsaTeach/actions/workflows/ci.yml/badge.svg?branch=main" /></a>
  <a href="https://github.com/puls-a/PulsaTeach/actions/workflows/uptime.yml"><img alt="Production uptime" src="https://github.com/puls-a/PulsaTeach/actions/workflows/uptime.yml/badge.svg?branch=main" /></a>
  <a href="https://pulsateach.vercel.app/api/health/ready"><img alt="Production ready" src="https://img.shields.io/badge/production-ready-16a34a?style=flat" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react&logoColor=111827" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?style=flat&logo=vite&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-strict-3ecf8e?style=flat&logo=supabase&logoColor=white" />
</p>

<p align="center">
  <img src="public/assets/og-pulsateach.png" alt="Aperçu PulsaTeach" width="900" />
</p>

## Vision

PulsaTeach n'est pas une bibliothèque de cours statiques. C'est un système complet pour apprendre le développement web comme dans une vraie équipe produit : comprendre, coder, exécuter, tester, corriger, documenter et livrer.

Le produit combine une expérience apprenant publique, un catalogue pédagogique riche, un lab sécurisé, un backend strict, un studio de création de cours et des audits qui empêchent les régressions de contenu, de sécurité et de production.

## Chiffres Clés

| Indicateur | État actuel |
| --- | --- |
| Curriculum source | 14 parcours web et outillage |
| Catalogue public | 3 parcours, 208 leçons pré-rendues et indexées |
| URLs publiques | 223 URLs dans le sitemap |
| Tests automatisés | Vitest, Supertest, Playwright, Supabase E2E, Lighthouse |
| Glossaire | 586 termes bilingues reliés au catalogue |
| Qualité | `npm run validate` bloque lint, tests, audits, build, SEO et bundle |

## Expérience Produit

PulsaTeach couvre l'ensemble du parcours apprenant : découverte, pratique, progression, révision, projet et preuve finale.

| Zone | Ce qui est livré |
| --- | --- |
| Catalogue | Pages formation SEO, résumés, niveaux, objectifs et parcours publics |
| Learning workspace | Éditeur, aperçu, tests, feedback, progression locale et sauvegarde |
| Quiz | Questions typées, feedback bilingue, score, examens et révisions |
| Projets | Rubrics, validations, livrables, review et versions immuables |
| Certificats | Preuves publiques, révocation et impression |
| Course Studio | Brouillon, review, approval, publication, versioning, diff et rollback |
| Analytics | Consentement, agrégation, pseudonymisation et seuils de cohorte |

## Parcours

| Fondations | Professionnalisation | Production |
| --- | --- | --- |
| Outils, HTML, CSS, JavaScript | Git, Accessibilité, Testing, TypeScript, React | Node/API, SQL/PostgreSQL, Sécurité web, Performance web, DevOps |

Les parcours HTML, CSS et JavaScript sont enrichis avec quiz variés, labs progressifs, projets concrets, guides bilingues, erreurs fréquentes, rubrics et preuves de validation.

## Stack

| Couche | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, Tailwind CSS, Lucide |
| Backend | Node.js, Express 5, Zod, Helmet, CORS, rate limiting |
| Données | Supabase strict en production, stockage JSON isolé en local |
| Tests | Vitest, Supertest, Playwright, axe-core, Lighthouse |
| Qualité | Audits architecture, catalogue, learning, éditorial, glossaire, i18n, migrations, SEO, bundle |
| Déploiement | Vercel, GitHub Actions, health checks, smoke tests production |

## Démarrage Local

```bash
npm ci
npm run dev:full
```

Le frontend Vite écoute par défaut sur `127.0.0.1`. L'API Express peut aussi être lancée seule avec `npm run server`.

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

## Commandes Utiles

| Commande | Usage |
| --- | --- |
| `npm run dev` | Lance le frontend Vite |
| `npm run server` | Lance l'API Express |
| `npm run dev:full` | Lance frontend et API ensemble |
| `npm run build` | Génère sitemap, build Vite et pré-rendu public |
| `npm run test` | Lance les tests unitaires Vitest |
| `npm run test:api` | Lance les tests API et sécurité |
| `npm run test:e2e` | Lance les parcours Playwright |
| `npm run test:e2e:supabase` | Vérifie le scénario Supabase réel |
| `npm run audit:lighthouse` | Contrôle Lighthouse automatisé |
| `npm run smoke:production` | Vérifie la production déployée |
| `npm run validate` | Lance la gate qualité complète |

## Gate Qualité

`npm run validate` est la commande de référence avant livraison. Elle exécute lint, tests, audit architecture, cohérence catalogue, audit pédagogique, qualité éditoriale, glossaire, i18n, migrations, build, SEO et budgets bundle.

La CI ajoute les E2E navigateur, les E2E Supabase et Lighthouse. Un workflow séparé vérifie régulièrement la production, le sitemap, les headers et `/api/health/ready`.

## Architecture

```text
src/
  App.jsx                         Shell SPA, routes et guards
  CurriculumHub.jsx               Catalogue des formations
  features/catalog/               Pages publiques /formations/:trackId
  features/learn/                 Workspace d'apprentissage
  features/quizzes/               Moteur quiz, review et feedback
  features/glossary/              Glossaire et révisions
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
  audit-*.mjs                     Audits qualité, contenu et production
supabase/
  migrations/                     Contrats persistants ordonnés
```

## Sécurité

La production doit rester en stockage Supabase strict :

```bash
PULSATEACH_STORAGE=supabase-strict
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<public-anon-key>
VITE_AUTH_MODE=supabase
```

Règles non négociables : `SUPABASE_SERVICE_ROLE_KEY`, clés admin, cookies de bot et secrets serveur restent exclusivement côté serveur ou GitHub Secrets. Les rôles production viennent des metadata Supabase (`role` ou `roles`).

## Exploitation

| Contrôle | Preuve |
| --- | --- |
| Liveness | `/api/health/live` |
| Readiness | `/api/health/ready` |
| SEO | `public/sitemap.xml`, `scripts/audit-seo.mjs`, pré-rendu public |
| Monitoring | Workflow `Production uptime` |
| Rollback contenu | Course Studio versioning et rollback |
| Rollback infra | Vercel deployments et migrations Supabase ordonnées |

## Documentation

| Document | Rôle |
| --- | --- |
| [`docs/BACKEND.md`](docs/BACKEND.md) | Architecture API, stockage, sécurité et workflows backend |
| [`docs/SEO.md`](docs/SEO.md) | Stratégie SEO, sitemap, metadata et Search Console |
| [`docs/OPERATIONS.md`](docs/OPERATIONS.md) | Procédures d'exploitation, monitoring et incidents |
| [`docs/ROADMAP_EVIDENCE.md`](docs/ROADMAP_EVIDENCE.md) | Matrice de conformité et preuves de livraison |
| [`docs/PRODUCT_RISK_ACTION_PLAN.md`](docs/PRODUCT_RISK_ACTION_PLAN.md) | Risques produit, priorités et plan CTO |
| [`docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md`](docs/FREECODECAMP_BENCHMARK_COURSE_REWRITE.md) | Benchmark pédagogique et réécritures |
| [`docs/EDITORIAL_QUALITY_SOURCES.md`](docs/EDITORIAL_QUALITY_SOURCES.md) | Sources et exigences éditoriales |

## Réseaux Et Contact

| Canal | Lien |
| --- | --- |
| Email | <pulsateach@gmail.com> |
| Discord | <https://discord.gg/pnAdQQggUg> |
| TikTok | <https://www.tiktok.com/@pulsateach> |
| Instagram | <https://www.instagram.com/pulsateach_/> |
| X | <https://x.com/pulsateach> |
| PulsaFlow | <https://pulsaflow.fr> |

## Statut Du Dépôt

PulsaTeach est open source sous licence [MIT](LICENSE). Les contributions, corrections pédagogiques et retours produit sont bienvenus : lis [`CONTRIBUTING.md`](CONTRIBUTING.md) avant d'ouvrir une issue ou une pull request, et utilise [`SECURITY.md`](SECURITY.md) pour signaler une vulnérabilité sans l'exposer publiquement.

---

<p align="center">
  Conçu et maintenu par <a href="https://pulsaflow.fr">PulsaFlow</a> · <a href="mailto:pulsateach@gmail.com">pulsateach@gmail.com</a>
</p>
