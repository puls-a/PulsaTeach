# Mise en service de pulsateach.com

## Etat prepare dans le depot

- origine canonique : `https://pulsateach.com` ;
- alias de secours : `https://pulsateach.vercel.app` ;
- sitemap, robots, Open Graph, JSON-LD, emails et liens publics alignes ;
- callback direct `/auth/callback` route vers l'application ;
- Supabase local autorise le domaine principal et l'alias ;
- le smoke de production controle domaine principal, callback, CORS et canonical de l'alias.

Le 9 novembre 2026, la zone repond avec les nameservers Cloudflare mais ne publie
encore aucun enregistrement A, AAAA ou CNAME pour `pulsateach.com`.

## Ordre de bascule

1. Dans Vercel, ouvrir le projet PulsaTeach puis **Settings > Domains**.
2. Ajouter `pulsateach.com`, puis `www.pulsateach.com` si le sous-domaine est souhaite.
3. Copier exactement les enregistrements DNS affiches par Vercel. Ne pas reutiliser
   une IP trouvee dans un ancien tutoriel : la cible fournie au projet fait foi.
4. Dans Cloudflare **DNS > Records**, creer ces enregistrements en mode **DNS only**
   (nuage gris) avec TTL Auto.
5. Attendre que Vercel valide le domaine et emette le certificat TLS.
6. Configurer une seule redirection permanente de `www` vers l'apex, de preference
   dans Vercel. Ne pas dupliquer cette redirection dans Cloudflare.
7. Dans les variables Production Vercel, definir :
   `PULSATEACH_ALLOWED_ORIGINS=https://pulsateach.com,https://pulsateach.vercel.app`.
8. Redeployer le build valide apres la modification de l'environnement.
9. Dans Supabase **Authentication > URL Configuration**, definir :
   - Site URL : `https://pulsateach.com` ;
   - Redirect URLs : les deux domaines avec et sans `/auth/callback` ;
   - conserver uniquement les callbacks locaux et previews reellement utilises.
10. Verifier les fournisseurs OAuth. Leur callback Supabase `/auth/v1/callback` ne
    doit pas etre remplace par le callback frontend.

## Cloudflare apres validation

Garder **DNS only** est le chemin le plus simple avec Vercel. Si le proxy Cloudflare
est active plus tard, utiliser SSL/TLS **Full (strict)**, ne pas mettre en cache
`/api/*` ni `/auth/*`, conserver les query strings OAuth et refaire tous les smokes.

## Verification

```bash
npm run smoke:production
curl -I https://pulsateach.com/
curl -I https://pulsateach.com/auth/callback
curl https://pulsateach.com/sitemap.xml
curl https://pulsateach.com/api/health/ready
```

Verifier ensuite : inscription, magic link, recuperation, Discord OAuth, canonical
sur l'apex et l'alias, pages a 375 px et 1440 px, Search Console et certificat.

## Rollback

Si l'apex echoue, remettre les enregistrements Cloudflare precedents ou les supprimer,
conserver l'alias Vercel disponible et remettre temporairement les liens de campagne
en pause. Ne pas retirer l'alias ni les redirects Supabase avant stabilisation.

References :
- https://vercel.com/docs/domains/working-with-domains/add-a-domain
- https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/
