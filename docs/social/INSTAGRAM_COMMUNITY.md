# PulsaTeach : publication et communauté

## Ligne éditoriale

Public : francophones qui commencent HTML/CSS et veulent pratiquer avec du feedback.
Promesse : une notion, un essai concret, une discussion utile. Signature : « Montre ton essai ».

La campagne contient 14 Reels V3 : trois par semaine, mardi, jeudi et
dimanche à 17:30 UTC. Ces créneaux sont une hypothèse à tester, pas une garantie de portée.
Le calendrier local exact et les légendes sont dans `data/instagram/campaign.json`.

## Rituels de communauté

- Mardi : une notion appliquée. Question précise en fin de légende.
- Jeudi : un mini-défi. Inviter à essayer une variante, puis expliquer la solution.
- Dimanche : bilan de la semaine et question sur le prochain sujet.
- Chaque jour : deux créneaux de 15 minutes pour lire et répondre aux commentaires.
- Après chaque Reel : répondre aux questions de fond ; relever les incompréhensions
  pour préparer le prochain tutoriel. Éviter les réponses génériques répétées.
- Stories : trois rendez-vous hebdomadaires avec sondage natif, coulisses et solution.
- Avec l'accord explicite de la personne, valoriser ses réalisations en story.
- Un rendez-vous de questions/réponses toutes les deux semaines, selon les questions reçues.

## Réponses utiles

« Ça ne marche pas » : demander le code minimal et le résultat attendu, proposer un
premier test concret. Ne pas demander d'identifiants ou d'informations privées.

« Je débute » : orienter vers une seule première leçon et proposer un petit objectif.

« Voici ma solution » : commenter un choix précis, puis suggérer une amélioration.

Ces exemples guident les réponses humaines. Le pipeline collecte les commentaires
mais n'envoie pas de réponses génériques, de DM de prospection ou de faux engagements.

## Mesure hebdomadaire

Consigner portée, vues, temps de visionnage disponible, sauvegardes, partages,
visites du profil, nouveaux abonnés et clics UTM depuis les statistiques Instagram.
Le rapport API actuel collecte les liens des posts, likes, nombre de commentaires
et les 50 premiers commentaires par publication ; il signale une pagination restante.
Ce rapport n'est pas un export complet des insights.

Suivre aussi les questions posées, participants récurrents et réalisations partagées.
Comparer les sujets après quatre semaines ; adapter les hooks et les horaires selon
les résultats observés. La programmation ne remplace pas l'animation de la communauté.

## Connexion officielle requise

1. Compte confirmé par le propriétaire : `@pulsateach_`, déjà professionnel.
2. Dans Meta for Developers, configurer Instagram API avec Instagram Login et autoriser
   le compte. Selon le mode de l'application et les comptes concernés, une revue Meta
   et des niveaux d'accès supplémentaires peuvent être nécessaires.
3. Permissions publication : `instagram_business_basic` et
   `instagram_business_content_publish`. Ajouter `instagram_business_manage_comments`
   pour collecter les commentaires. Conserver le jeton et suivre sa date d'expiration.
4. Déposer les 14 MP4 verticaux de `docs/media/reels-v3/` sur un hébergement HTTPS public accessible à Meta.
   Les fichiers locaux ignorés par Git ne sont pas accessibles à Instagram.
5. Ajouter au `.env` racine les variables de `social/instagram/.env.example`.

Documentation Meta :
https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/content-publishing

## Commandes

```sh
node social/instagram/cli.mjs doctor
node social/instagram/cli.mjs init
node social/instagram/cli.mjs plan
node social/instagram/cli.mjs assets
node social/instagram/cli.mjs doctor --online
node social/instagram/cli.mjs run
node social/instagram/cli.mjs report
```

`run` simule tant que `IG_PUBLISH_ENABLED` n'est pas `true`. Une fois activé, il
vérifie le nom du compte, crée le conteneur, attend son traitement puis publie lors
d'un passage suivant. Aucune requête d'écriture ambiguë n'est répétée automatiquement.
Le verrou local empêche deux processus simultanés et l'état est enregistré avant
chaque écriture distante. Une seule machine doit gérer cette file.

Planificateur Windows après connexion :
`powershell -File social/instagram/install-scheduler.ps1 -Enable`.
Le PC doit rester allumé, connecté et la tâche autorisée pour la session concernée.
Le planificateur vérifie la file toutes les cinq minutes ; les horaires ne sont donc
pas garantis à la seconde. Pour du 24/7, déployer ce même worker sur un hôte persistant.

## Reprise après incident

- Jeton expiré : renouveler par le mécanisme officiel Meta, remplacer le secret local.
- `needs_review`, `creating` ou `publishing` après incident : consulter le conteneur
  Meta et le compte avant toute nouvelle tentative. Confirmer le média publié et
  renseigner son identifiant dans l'état ; ne jamais effacer aveuglément la file.
- Verrou restant après arrêt brutal : vérifier qu'aucun worker ne tourne avant de
  retirer `data/instagram/publisher.lock`.
- Créneau dépassé de six heures : replanifier explicitement dans le calendrier.
- Désactivation : `IG_PUBLISH_ENABLED=false`, puis désactiver la tâche Windows.

Le pipeline et le calendrier sont locaux. Connexion, hébergement des MP4 et activation
du planificateur doivent être terminés pour que des publications puissent partir.
