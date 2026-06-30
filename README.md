# PulsaTeach

PulsaTeach est une plateforme gratuite et bilingue pour apprendre le développement web par la pratique : cours progressifs, lab interactif, quiz multi-types, révisions, projets, certificats vérifiables, Course Studio et API sécurisée.

Site production : https://pulsateach.vercel.app

## Ce que le produit propose

- Landing page claire avec CTA vers les formations et une première leçon HTML.
- Catalogue de 13 formations : HTML, CSS, JavaScript, Git, Accessibilité, Testing, TypeScript, React, Node/API, SQL/PostgreSQL, Sécurité web, Performance web et Déploiement.
- 272 leçons bilingues reliées à un glossaire global de 357 termes.
- Quiz approfondis avec questions variées, justification, reprise et feedback.
- Lab interactif avec exemples, exercices, tests, notes et sauvegarde.
- Dashboard, profil, révisions espacées, projets et certificats vérifiables.
- Course Studio protégé par rôles pour les auteurs/reviewers/admins.
- Backend Express avec validation, sécurité HTTP, rate limiting, CORS strict et readiness checks.
- SEO/PWA : sitemap, robots, pages publiques pré-rendues, données structurées, favicon ICO, Apple Touch Icon PNG et image Open Graph 1200×630.

## Stack

- Frontend : React 19, Vite, Tailwind CSS, Lucide.
- Backend : Node.js, Express, Zod.
- Auth/persistance production : Supabase strict.
- Tests : Vitest, Supertest, Playwright, axe.
- Déploiement : Vercel.

## Installation

```bash
npm ci
```

En développement local sans Supabase :

```bash
PULSATEACH_STORAGE=json
PULSATEACH_ADMIN_KEY=dev-admin-key
VITE_ADMIN_ACCESS_KEY=dev-admin-key
```

Sous PowerShell :

```powershell
$env:PULSATEACH_STORAGE="json"
```

## Commandes utiles

```bash
npm run dev              # Frontend Vite
npm run server           # API Express
npm run dev:full         # Frontend + API
npm run lint             # ESLint
npm test                 # Tests unitaires
npm run test:api         # Tests API/sécurité
npm run test:e2e         # Playwright
npm run test:a11y        # Accessibilité
npm run audit:learning   # Audit pédagogique
npm run audit:glossary   # Audit vocabulaire
npm run audit:seo        # Sitemap + pré-rendu public
npm run validate         # Suite qualité principale
npm run smoke:production # Smoke test production
```

## Architecture

```text
src/
  App.jsx                         Navigation SPA, routes propres, guards auteur
  LandingPage.jsx                 Landing publique /
  CurriculumHub.jsx               Catalogue des formations
  features/learn/                 Expérience d’apprentissage
  features/quizzes/               Moteur de quiz
  features/glossary/              Glossaire global
  security/sandboxPolicy.js       Politique iframe/CSP des previews
  content/allTrackRegistry.js     Registre complet des formations
server/
  index.js                        API Express
  routes/                         Routes métier
  security.js                     Headers, CORS, rate limits
  validation.js                   Schémas Zod
scripts/
  prerender-public.mjs            Pré-rendu /, catalogue, glossaire, leçons
  generate-sitemap.mjs            Sitemap public
  smoke-production.mjs            Smoke test prod
```

## Production

La production doit rester en Supabase strict :

```bash
PULSATEACH_STORAGE=supabase-strict
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<public-anon-key>
VITE_AUTH_MODE=supabase
```

Ne jamais exposer de clé service ou admin dans le frontend. Les rôles de production doivent venir des metadata Supabase (`role` ou `roles`).

## Documents principaux

- Roadmap complète : [`docs/ROADMAP_COMPLETE.md`](./docs/ROADMAP_COMPLETE.md)
- Preuves roadmap : [`docs/ROADMAP_EVIDENCE.md`](./docs/ROADMAP_EVIDENCE.md)
- Exploitation : [`docs/OPERATIONS.md`](./docs/OPERATIONS.md)
- Risques produit/CTO : [`docs/PRODUCT_RISK_ACTION_PLAN.md`](./docs/PRODUCT_RISK_ACTION_PLAN.md)
- Référentiel éditorial : [`docs/EDITORIAL_QUALITY_SOURCES.md`](./docs/EDITORIAL_QUALITY_SOURCES.md)

## Priorités actuelles

Le socle production est solide. Les prochaines priorités sont surtout la qualité perçue, la profondeur éditoriale, la recherche catalogue, le lazy-load Supabase hors auth, le service worker PWA et la maintenance long terme.
