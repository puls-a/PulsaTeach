# Exploitation PulsaTeach

## Architecture de production

```text
Navigateur
   │ HTTPS
   ▼
Vercel (React/Vite + fonctions API Express)
   │ JWT utilisateur / clé serveur uniquement côté API
   ▼
Supabase (Auth + PostgreSQL)
```

La production refuse de démarrer sans `PULSATEACH_STORAGE=supabase-strict`.
Les migrations versionnées de `supabase/migrations/` sont la source de vérité et
sont appliquées avant la release applicative. `supabase/schema.sql` ne sert pas
à initialiser un environnement.

## Monitoring

### Sondes et alertes

- `GET /api/health/live` vérifie uniquement que le runtime répond.
- `GET /api/health/ready` vérifie Supabase et renvoie `503` lorsque la
  production n'est pas prête à servir du trafic.
- `GET /api/health` reste le résumé compatible avec les anciens contrôles.
- Le workflow `uptime.yml` contrôle toutes les 15 minutes la page publique, la
  readiness, le sitemap, la CSP et HSTS.
- Après échec et retries, le workflow ouvre ou complète automatiquement une
  issue `Production monitoring incident`. Il la ferme après récupération.
- Le navigateur remonte `LCP`, `CLS`, `INP` et des empreintes anonymisées
  d'erreurs vers `POST /api/telemetry`. Aucun message saisi, email, token ou
  contenu de cours n'est envoyé.

### Seuils opérationnels

- disponibilité : échec après deux retries ;
- readiness : Supabase inaccessible ou stockage différent de
  `supabase-strict` ;
- performance terrain : LCP supérieur à 2,5 s, INP supérieur à 200 ms ou CLS
  supérieur à 0,1 ;
- erreurs : nouvelle empreinte `client_error` ou hausse des réponses 5xx.

### Première réponse à incident

1. ouvrir l'issue créée par le monitoring et le run GitHub Actions associé ;
2. vérifier `/api/health/live`, puis `/api/health/ready` ;
3. filtrer les logs Vercel par `requestId`, `client_error` et statut 5xx ;
4. contrôler Supabase et la dernière migration appliquée ;
5. restaurer le dernier déploiement Vercel sain si la régression est applicative ;
6. documenter cause, impact, correction et prévention dans l'issue.

- `GET /api/health` vérifie le runtime et le mode de stockage.
- `GET /api/supabase/status` contrôle les tables attendues.
- `.github/workflows/uptime.yml` sonde la page publique et le healthcheck toutes
  les 15 minutes. Un échec rend le workflow rouge et déclenche les notifications
  GitHub configurées pour le dépôt.
- Les logs API sont structurés avec `requestId`, sans jeton ni secret.

## Sauvegarde et restauration

Supabase reste la source de vérité. Avant une migration ou une release majeure :

```bash
npx supabase db dump --db-url "$SUPABASE_DB_URL" --file backup.sql
```

Le fichier est chiffré et conservé hors du dépôt selon la politique de rétention
du projet. Pour tester une restauration sur un environnement isolé :

```bash
psql "$RESTORE_DATABASE_URL" --single-transaction --file backup.sql
npm run audit:migrations
```

Les snapshots immuables de `course_versions` permettent aussi le rollback
fonctionnel d’un parcours depuis Course Studio. Ils ne remplacent pas une
sauvegarde de base complète.

## Release et rollback

1. `npm ci`
2. `npm audit`
3. `npm run validate`
4. `npm run test:api`
5. `npm run test:e2e`
6. `npm run test:e2e:supabase`
7. `npm run smoke:full`
8. `npm run audit:lighthouse`
9. appliquer les migrations sur un environnement isolé, puis en production ;
10. déployer l’artefact validé ;
11. `npm run smoke:production`.

En cas de régression, restaurer le déploiement Vercel précédent. Si une migration
est impliquée, restaurer d’abord une sauvegarde dans un projet isolé, vérifier
les invariants, puis basculer. Ne jamais improviser une migration destructive en
production.

## Données de démonstration

Les tests Supabase créent un compte `ci-<timestamp>@pulsateach.dev`, publient un
parcours isolé, puis suppriment parcours, données et utilisateur dans un bloc de
nettoyage systématique.
