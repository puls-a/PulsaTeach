# Matrice d'inspiration Web Security

Sources benchmark consultées localement dans `.external/freeCodeCamp` :

- `information-security-with-helmetjs.json`
- `information-security-projects.json`
- `quality-assurance-and-testing-with-chai.json`
- `lecture-working-with-code-quality-and-execution-concepts.json`
- `lecture-understanding-the-different-types-of-testing.json`

Le contenu PulsaTeach reste original : scénarios, exemples, noms, tests et projets
sont réécrits autour d'une plateforme pédagogique gratuite.

| Repère benchmark | Bloc PulsaTeach ajouté | Angle original PulsaTeach |
| --- | --- | --- |
| Infosec mindset / Helmet | `sec-v9-risk-modeling` | Actifs, frontières, abus, priorisation et preuves négatives |
| HelmetJS / browser protections | `sec-v9-browser-defenses` | XSS, CSP, cookies, CSRF, clickjacking |
| API and QA testing | `sec-v9-api-abuse` | Validation stricte, mass assignment, IDOR, RBAC, rate limit |
| Supply chain and files | `sec-v9-files-secrets` | Uploads, signatures, secrets serveur, rotation, npm audit |
| Security projects | `sec-v9-monitoring-incident` | Logs redacted, alerting, containment, post-mortem, capstone audit |

## Résultat

- 5 nouveaux modules sécurité.
- 30 micro-leçons.
- 5 projets, dont un capstone d'audit complet.
- 5 quiz de 5 questions.
- Contenu centré sur risques vérifiables, tests d'abus, preuves et exploitation.

## Garde-fous

- Aucun texte freeCodeCamp n'est copié.
- Les exemples utilisent PulsaTeach : progression, certificats, commentaires,
  ressources utilisateur, uploads, secrets et incidents.
- Chaque activité demande une preuve : `expect(400)`, `expect(403)`, CSP,
  redaction, rotation, runbook ou test inter-utilisateur.
