# État des preuves de qualité — PulsaTeach

Date : 17 novembre 2026. Ce rapport sépare **inventaire**, **preuves automatisées**, **relecture locale** et **usage réel**. Les comptes d'un audit ne sont ni une note du site ni une preuve de compréhension par un apprenant. `docs/MASTER_EXECUTION_PLAN.md` reste la source active pour les priorités et le suivi détaillé.

| Dimension | Ce qui est effectivement prouvé | Limite actuelle |
| --- | --- | --- |
| Inventaire | 14 parcours dans le registre, 900 leçons, dont 234 routes de leçons indexées pour les trois formations visibles dans le catalogue ; 251 URLs publiques. | Le volume ne mesure pas la qualité ni l'achèvement de chaque leçon. |
| Code local | `npm run validate` vérifie lint, tests unitaires, audits de catalogue, apprentissage, i18n, sécurité, build et SEO. Les solutions HTML/CSS et les scénarios JavaScript concernés passent leurs vérifications ; des E2E ciblés couvrent desktop et mobile. | Certains contrôles dans les autres modules restent des tests de présence ; la conformité pédagogique ne peut être inférée des seuls tests verts. |
| Relecture éditoriale | Les modules HTML d'introduction à l'audit final et le parcours CSS ont été repris localement. Le parcours JavaScript a reçu un audit transversal et des preuves de fonctionnement ciblées ; le module « Validation robuste » possède maintenant des tests nominaux et négatifs pour ses trois exercices et son projet, et un quiz sur ses limites. | La relecture individuelle de toutes les leçons des onze autres parcours n'est pas attestée. Même une leçon relue localement doit être observée en usage. |
| Production | Le dernier état de production consigné dans le plan correspond au commit `34ded0d` et à un smoke antérieur. | Les modifications de ce worktree ne sont pas publiées ni vérifiées en production. Aucune maturité « 100 % » ne peut être annoncée à partir du build local. |
| Apprentissage humain | `docs/USER_TEST_PROTOCOL.md` décrit cinq séances pour la première leçon HTML, les mesures et les conditions de retest. | Aucune séance humaine, compréhension autonome ou taux de réussite réel observé. |

## Conditions pour réévaluer le produit

1. Pour chaque module revendiqué comme prêt, conserver consigne, starter en échec utile, solution FR/EN, exemples distincts, quiz aligné, cas négatifs et projet couvrant ses objectifs.
2. Vérifier la chaîne publiée sur mobile et desktop après une release contrôlée, y compris les comportements authentifiés et les erreurs réseau.
3. Réaliser et consigner les cinq séances du protocole HTML, puis corriger et retester les trois blocages les plus fréquents. Aucun résultat humain ne sera inventé.
4. Réviser la maturité globale seulement à partir de ce croisement entre revue, comportement, production et retours observés ; ne pas transformer les 900 leçons ou les tests passés en pourcentage de complétude.
