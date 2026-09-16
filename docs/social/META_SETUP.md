# Connecter @pulsateach_ à Meta

Le propriétaire a confirmé le compte professionnel `@pulsateach_`.
La configuration du publisher et le calendrier local utilisent désormais ce nom.
L'application Meta n'a pas encore été créée et aucun jeton n'est configuré.

## Création dans la session du propriétaire

1. Ouvrir https://developers.facebook.com/apps/ et se connecter.
2. Si nécessaire, terminer l'inscription Meta for Developers dans cette session.
3. Choisir « Créer une application ». Nom proposé : **PulsaTeach Social**.
4. Sélectionner le cas d'utilisation Instagram permettant de gérer contenu et
   messages. Selon l'interface, le parcours peut être « Autre », type « Business »,
   puis ajout du produit Instagram. Les intitulés peuvent varier.
5. Dans la configuration Instagram, choisir **API setup with Instagram login**.

## Ajouter le compte et autoriser la publication

Dans le panneau Instagram, ajouter `pulsateach_` puis suivre le parcours de
connexion proposé. Si Meta demande un rôle testeur, l'ajouter et accepter
l'invitation depuis le compte Instagram avant de générer le jeton.

Permissions nécessaires à notre pipeline :
- `instagram_business_basic` : identité du compte ;
- `instagram_business_content_publish` : publication des Reels ;
- `instagram_business_manage_comments` : collecte des commentaires.

Pour le compte propriétaire associé à l'application, commencer avec les accès
de test/standard disponibles. Suivre les exigences indiquées par Meta pour ce
compte et ces permissions ; ne pas supposer qu'une autorisation ou une revue est acquise.

## Configurer localement

Utiliser la génération de jeton du tableau de bord si elle est proposée. Renseigner
dans le `.env` racine local, sans afficher le jeton dans la conversation :

```dotenv
IG_ACCESS_TOKEN=<jeton obtenu dans Meta>
IG_ACCOUNT_ID=<identifiant Instagram indiqué par Meta>
IG_API_VERSION=<version Graph utilisée par l'application>
IG_EXPECTED_USERNAME=pulsateach_
IG_PUBLISH_ENABLED=false
```

Noter la durée de validité réellement indiquée par Meta. Ne pas supposer que tous
les jetons ont la même durée. `IG_ACCOUNT_ID` est l'identifiant du compte Instagram,
pas l'identifiant de l'application Meta.

Vérification en lecture seule : `npm run instagram:doctor -- --online`.
Le résultat doit identifier `pulsateach_`. La connexion du compte, l'hébergement
HTTPS des vidéos et l'activation du planificateur sont trois étapes distinctes.

Documentation officielle :
https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/
