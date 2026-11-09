# Connecter @pulsateach_ à Meta

Le propriétaire a confirmé le compte professionnel `@pulsateach_`. L'ancien publisher
de Reels a été retiré. L'application Meta n'a pas encore été créée et aucun jeton n'est
configuré.

## Création dans la session du propriétaire

1. Ouvrir https://developers.facebook.com/apps/ et se connecter.
2. Si nécessaire, terminer l'inscription Meta for Developers dans cette session.
3. Créer une application nommée **PulsaTeach Social**.
4. Choisir le cas d'utilisation Instagram adapté au futur besoin réel.
5. Ajouter `pulsateach_` et suivre le parcours d'autorisation proposé par Meta.

## Garde-fous

Ne demander des permissions de publication que lorsqu'un nouveau pipeline aura été
conçu et audité. Il devra fournir au minimum un mode lecture seule, une simulation, une
validation humaine avant publication et une reprise sans double envoi.

Les secrets resteront dans le `.env` local et ne devront jamais apparaître dans les
sources, journaux ou conversations. La durée de validité réellement indiquée par Meta
doit être consignée au moment de la configuration.

Documentation officielle :
https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/
