# Matrice d'inspiration Web Security

Sources benchmark consultées localement dans `.external/freeCodeCamp` :

- `information-security-with-helmetjs.json`
- `information-security-projects.json`
- Quality Assurance / tests d'abus.

Le contenu PulsaTeach reste original : scénarios, exemples, noms, tests et projets sont réécrits autour d'une plateforme pédagogique gratuite.

## Correspondance

| Repère benchmark | Bloc PulsaTeach | Angle original PulsaTeach |
| --- | --- | --- |
| Infosec mindset / Helmet | `sec-v9-risk-modeling` | Actifs, frontières, abus, priorisation et preuves négatives |
| HelmetJS / browser protections | `sec-v9-browser-defenses` | XSS, CSP, cookies, CSRF, clickjacking |
| API and QA testing | `sec-v9-api-abuse` | Validation stricte, mass assignment, IDOR, RBAC, rate limit |
| Supply chain and files | `sec-v9-files-secrets` | Uploads, signatures, secrets serveur, rotation, npm audit |
| Security projects | `sec-v9-monitoring-incident` | Logs redacted, alerting, containment, post-mortem, capstone audit |

## Résultat

- 9 modules Web Security.
- 60 micro-leçons.
- 9 projets, dont un capstone d'audit complet.
- 10 quiz dont examen final.
- Contenu centré sur risques vérifiables, tests d'abus, preuves et exploitation.

## Renforcement 2026-07-02

- Les modules v9 exposent maintenant des preuves de sécurité concrètes : `requestId`, `statusCode`, `expect(400)`, `expect(403)`, redaction, abuse tests, no-secret, CSP, CSRF, IDOR, uploads, rotation et incident.
- Les projets incluent risques, contrôles, preuves, statut de refus et redaction de `authorization`, `cookie`, `token`, `secret`.
- Résultat audit : Web Security passe de 241 à 811 preuves, soit environ 13,5 tests par leçon.

## Garde-fous

- Aucun texte freeCodeCamp n'est copié.
- Les exemples utilisent PulsaTeach : progression, certificats, commentaires, ressources utilisateur, uploads, secrets et incidents.
- Chaque activité demande une preuve : `expect(400)`, `expect(403)`, CSP, redaction, rotation, runbook ou test inter-utilisateur.
