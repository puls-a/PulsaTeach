# Matrice benchmark freeCodeCamp → PulsaTeach — DevOps & Déploiement

Date de mise à jour : 2026-06-30

Objectif : renforcer le parcours DevOps avec la granularité “apprendre en
faisant” observée dans freeCodeCamp, sans copier les textes ni les exercices.
PulsaTeach adapte les compétences à son contexte : Vite, API Node, Supabase,
Vercel, CI, sécurité, previews, monitoring et rollback.

## Sources benchmark inspectées

- `lecture-understanding-the-command-line-and-working-with-bash.json`
- `lecture-understanding-bash-scripting.json`
- `learn-bash-scripting-by-building-five-programs.json`
- `lecture-introduction-to-npm.json`
- `lecture-working-with-npm-scripts.json`
- `managing-packages-with-npm.json`
- `lecture-working-with-code-reviews-branching-deployment-and-ci-cd.json`
- `lecture-working-with-code-quality-and-execution-concepts.json`
- `lecture-understanding-the-different-types-of-testing.json`

## Adaptation PulsaTeach

| Compétence benchmark | Adaptation PulsaTeach | Preuves dans le dépôt |
| --- | --- | --- |
| Bash/terminal et scripts | Scripts PowerShell/npm de release, hash, artefacts, smoke post-release | `src/content/tracks/devopsDeploymentV9Modules.js` |
| npm et dépendances | `npm ci`, audit, outdated, lockfile, inventaire dépendances prod, exceptions datées | `src/content/tracks/devopsDeploymentV9Modules.js` |
| Qualité et tests | Gates lint/tests/audits/build/E2E/Lighthouse avant promotion | `src/content/tracks/devops-deployment.js` |
| CI/CD | Workflow GitHub Actions, permissions minimales, artefact unique, preview puis production | `src/content/tracks/devops-deployment.js` |
| Déploiement | Environnements local/preview/prod, secrets, CORS, Supabase strict, Vercel | `src/content/tracks/devops-deployment.js`, `devopsDeploymentV9Modules.js` |
| Sécurité livraison | Secrets serveur seulement, SBOM, supply-chain, preview isolée, headers versionnés | `src/content/tracks/devopsDeploymentV9Modules.js` |
| Exploitation | Health checks, SLO, logs corrélés, alertes, runbooks, post-mortem, rollback drill | `src/content/tracks/devops-deployment.js`, `devopsDeploymentV9Modules.js` |

## Principes éditoriaux appliqués

- Les exercices sont contextualisés pour PulsaTeach : sitemap, catalogue, leçons,
  API, Course Studio, progression et certificats.
- Les commandes sont conçues pour être vérifiables localement ou en CI.
- Les secrets ne sont jamais exposés au frontend.
- Les migrations et rollbacks sont traités comme des sujets de production, pas
  comme une étape optionnelle.
- Les incidents sont travaillés avec communication, timeline et post-mortem
  sans blâme.

## Écarts assumés

- PulsaTeach n’intègre pas les projets Bash freeCodeCamp : il en reprend la
  logique d’automatisation progressive, mais l’applique aux releases web.
- Les exemples IaC restent génériques pour ne pas enfermer le cours dans un seul
  fournisseur cloud.
