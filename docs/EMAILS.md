# Emails transactionnels PulsaTeach

Les modèles HTML sont versionnés dans `supabase/templates/`.

## Variables requises

- `RESEND_API_KEY`
- `PULSATEACH_EMAIL_FROM`, par exemple `PulsaTeach <bonjour@learn.pulsateach.fr>`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_ADMIN_EMAIL`

Le domaine de l'expéditeur doit être validé chez Resend avant d'utiliser une adresse PulsaTeach.

## Supabase Auth

Après configuration du SMTP, décommenter les sections suivantes dans `supabase/config.toml` :

- `[auth.email.smtp]`
- `[auth.email.template.confirmation]`
- `[auth.email.template.recovery]`

Puis exécuter :

```bash
npx supabase config push --yes
```

Supabase utilisera alors les modèles PulsaTeach pour la confirmation et la récupération.

## Bienvenue

L'API envoie l'email de bienvenue via Resend lorsque l'onboarding passe pour la première fois à `onboardingCompleted: true`.
