# Reels V3 : format orienté rétention

## Pourquoi changer

Le premier Reel a atteint environ 750 vues, puis le suivant environ 37. Deux posts ne
suffisent pas pour attribuer une cause certaine, mais le format V2 présente des risques
clairs : démonstrations de 20 à 34 secondes, accroche courte et générique, interface
souvent statique, légendes petites et même bande-son sur tous les sujets.

Le sujet Flexbox possède aussi un résultat visuel immédiat. Un éditeur ou un formulaire
demande davantage de contexte. La V3 ne suppose donc plus que l'interface se suffit à
elle-même : elle montre le résultat avant l'explication.

## Contrat V3

- 11 à 18 secondes, 1080 × 1920, H.264 et AAC.
- Résultat réel visible dès la première seconde derrière un hook spécifique.
- Hook lisible sans le son, puis démonstration réelle accélérée entre x1 et x2.
- Interface plein cadre et légendes brûlées de 43 px minimum.
- Une seule promesse, une seule preuve et un CTA lié au sujet.
- Zones sûres conservées en haut et en bas pour l'interface Instagram.
- Couverture, image de démonstration et CTA exportés pour chaque contrôle visuel.

## Publication

Publier les fichiers de `docs/media/reels-v3/<sujet>-vertical.mp4`. Ajouter si possible
une musique native adaptée dans Instagram, sans couvrir les signaux audio du montage.
Ne pas republier immédiatement le Reel faible à l'identique : utiliser le nouveau
sandbox comme variation créative et modifier aussi la couverture et la première phrase.

## Mesure

Comparer après 24 h et 7 jours : vues, portée, temps moyen, rétention à 3 secondes,
taux de complétion, relectures, sauvegardes, partages, visites de profil et clics UTM.
Changer un seul facteur principal par test : hook, sujet, couverture ou créneau.

Après six publications, conserver les deux structures qui maximisent la rétention à
3 secondes et le taux de complétion. Ne pas conclure uniquement à partir des vues.

## Commandes

```sh
npm run video:reels
npm run video:reels -- sandbox
```

Chaque rendu produit le MP4, trois images de contrôle et les métadonnées ffprobe.
