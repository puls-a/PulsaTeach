# PulsaTeach X Bot

Bot Python pour publier du contenu éducatif sur le compte X `@pulsateach` sans spam : astuces quotidiennes, threads occasionnels et réponses aux mentions optionnelles.

## Principes

- 1 à 2 astuces par jour par défaut, à `10:00` et `18:00`.
- 1 à 2 threads par semaine selon configuration.
- Maximum volontairement bas pour respecter les règles X et éviter le spam.
- Réponses automatiques désactivées par défaut.
- Mode `dry-run` activé par défaut.
- Déduplication SQLite pour ne pas republier le même contenu.
- Logs dans `x_bot/logs/bot.log`.

## Installation

```bash
cd x_bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Sur macOS/Linux :

```bash
cd x_bot
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Configuration

Renseigne `.env` avec les credentials de ton app X Developer.

Important : l'app X doit avoir les permissions `Read and write`.

```env
X_API_KEY=...
X_API_SECRET=...
X_ACCESS_TOKEN=...
X_ACCESS_TOKEN_SECRET=...
X_BEARER_TOKEN=...
BOT_DRY_RUN=true
BOT_ENABLE_REPLIES=false
```

Quand les tests sont bons, passe `BOT_DRY_RUN=false`.

## Utilisation

Tester une astuce sans publier :

```bash
python main.py --once tip
```

Tester un thread :

```bash
python main.py --once thread
```

Lancer le planning :

```bash
python main.py --daemon
```

Tester les réponses aux mentions, si `BOT_ENABLE_REPLIES=true` :

```bash
python main.py --once replies
```

## Modifier Les Contenus

- `content/topics.py` : thèmes, liens PulsaTeach, hashtags et astuces.
- `content/templates.py` : formats de tweets, questions, motivations, threads et réponses.
- `content/generator.py` : logique de génération et variantes.

## Déploiement 24/7

### Render Worker

1. Crée un nouveau `Background Worker`.
2. Root directory : `x_bot`.
3. Build command : `pip install -r requirements.txt`.
4. Start command : `python main.py --daemon`.
5. Ajoute les variables `.env` dans Render.

### Railway

1. Crée un service depuis le repo GitHub.
2. Root directory : `x_bot`.
3. Start command : `python main.py --daemon`.
4. Ajoute les variables d'environnement.

### VPS Systemd

Exemple de service :

```ini
[Unit]
Description=PulsaTeach X Bot
After=network.target

[Service]
WorkingDirectory=/opt/PulsaTeach/x_bot
ExecStart=/opt/PulsaTeach/x_bot/.venv/bin/python main.py --daemon
Restart=always
RestartSec=10
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

Puis :

```bash
sudo systemctl daemon-reload
sudo systemctl enable pulsateach-x-bot
sudo systemctl start pulsateach-x-bot
sudo journalctl -u pulsateach-x-bot -f
```

## Bonnes Pratiques X

- Ne dépasse pas 3 à 4 publications par jour.
- Garde les réponses automatiques limitées et utiles.
- Ne réponds pas à tous les tweets contenant un mot-clé : uniquement les mentions.
- Relis régulièrement les logs et les contenus publiés.
- Ajoute manuellement des posts humains entre les posts automatisés.
