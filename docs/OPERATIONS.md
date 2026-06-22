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
Les migrations versionnées de `supabase/migrations/` sont appliquées avant la
release applicative.

## Monitoring

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
9. appliquer les migrations ;
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
