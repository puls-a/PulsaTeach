# PulsaTeach V2 — démonstrations enregistrées

## Visionnage

Ouvrir `docs/media/v2/index.html` dans le navigateur. Chaque vidéo dispose d'un
master 1920 × 1080 et d'une prise verticale distincte 1080 × 1920, à 30 images/s.
Les vidéos sont accompagnées d'un fichier SRT. Les textes à l'écran expliquent
les actions ; la bande-son instrumentale est synthétisée par le script de rendu.

## Direction de montage

- Interface filmée avec Playwright, sans reconstruction des résultats.
- Cadre fixe et image entière en `object-fit: contain` pendant la démonstration.
- Les versions verticales filment le site responsive en 864 × 1152 : aucun
  agrandissement animé ou découpage d'une capture desktop pour remplir l'écran.
- Curseur visible, clics signalés, saisie progressive et pauses sur les résultats.
- Étapes synchronisées avec les actions enregistrées ; introduction courte et CTA final.
- Les interactions sont effectuées sur l'environnement local.

## Scénarios

| Fichier de base | Démonstration |
| --- | --- |
| `flexbox` | Modification des deux axes, validation du niveau 1, ouverture du niveau 2 |
| `sandbox` | Fond CSS modifié, deux clics sur le bouton, compteur à 20, validation |
| `javascript` | Échec initial, fonction corrigée, deux cibles testées, niveau suivant |
| `editor` | Ajout du doctype au clavier, exécution des tests HTML |
| `tools` | Dossier et fichier, choix de l'éditeur, enregistrement et rechargement |
| `catalog` | Recherche HTML, ouverture de la page de formation |
| `projects` | Préparation du formulaire, description, livrables, visibilité privée |
| `glossary` | Recherche cascade, définition, favori, mode bilingue |
| `review` | Question de démonstration explicitement signalée, réponse, évaluation du rappel |
| `path` | Ouverture de la prochaine leçon depuis le plan personnalisé |
| `dashboard` | Navigation depuis le tableau de bord vers une leçon |
| `world` | Consultation des badges, navigation vers Flexbox Arena |
| `certification` | Consultation des critères de délivrance ; aucun certificat simulé |
| `home` | Découverte de l'accueil et accès au catalogue |

Fichiers : `<base>.mp4` et `<base>-vertical.mp4` dans `docs/media/v2/`.
Les prises projets préparent un formulaire sans publier de soumission.
La certification présente les critères actuels, sans prétendre délivrer un certificat.

## Reproduction

```sh
npm run video:v2:capture
npm run video:v2:capture -- --vertical
npm run video:v2:render
```

Une seule partie :

```sh
node scripts/capture-video-v2.mjs flexbox
node scripts/capture-video-v2.mjs flexbox --vertical
node scripts/render-video-v2.mjs flexbox --both
```

Contrôle d'images : `node scripts/render-video-v2.mjs flexbox --both --stills`.
Le rendu utilise les ressources de `video/v2/public`, séparées du répertoire public
de l'application. Le manifeste enregistre les timings et les résultats vérifiés.
Les médias générés et le manifeste sont ignorés par Git ; les scripts les recréent.

## Vérification

Les prises échouent si une assertion fonctionnelle échoue ou si la page déclenche
une exception JavaScript. Flexbox vérifie aussi la superposition géométrique du bot
et de la cible. Chaque export est inspecté avec ffprobe : durée, dimensions,
piste H.264 et piste AAC. Les métadonnées sont dans `docs/media/v2/checks/`.

`node scripts/check-video-v2.mjs` ouvre la galerie dans Chromium, charge les
28 vidéos et décode une image au milieu puis à la fin de chaque démonstration.
Le rapport est enregistré dans `docs/media/v2/checks/playback-report.json`.
Des images séquentielles du MP4 Flexbox permettent de contrôler le déplacement
réel du bot et la transition vers le niveau suivant.
