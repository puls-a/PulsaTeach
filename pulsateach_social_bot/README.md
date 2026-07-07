# PulsaTeach Social Bot V3

V3 transforme le bot en systeme editorial operable : strategie, planning, quality checks, garde-fous, health checks et publication X fiable.

## Nouveautes V3

- Planning editorial X sur 1 a 30 jours.
- Piliers de contenu : quick win, mini-defi, erreur junior, carriere, mindset.
- Queue planifiee avec `scheduled_at`, priorite et tentatives.
- Quality scoring local + quality check Gemini.
- Fallback local si Gemini est en quota temporaire (`429`).
- Health check systeme : cookies, cle Gemini, dossiers, plateformes.
- Dashboard V3 : planning, health, quality reports, failed queue, metrics.
- X fiable : post principal sans lien + reponse avec lien tracke.
- UTM automatique via `tracked_url()`.

## Installation

```bash
cd pulsateach_social_bot
py -m pip install -r requirements.txt
py -m playwright install
```

## Configuration

Copie `.env.example` vers `.env`.

Variables principales :

```env
DRY_RUN=True
GEMINI_API_KEY=...
URL_PULSATEACH=https://pulsateach.vercel.app

X_ENABLED=True
X_COOKIES_FILE=data/x_cookies.json
X_DAILY_LIMIT=3
X_MIN_MINUTES_BETWEEN_POSTS=90

INSTAGRAM_ENABLED=False
TIKTOK_ENABLED=False
```

Pour X, exporte tes cookies au format JSON dans `data/x_cookies.json`.

## Commandes CLI

Health check :

```bash
py main.py health
```

Generer un planning X de 7 jours avec 2 posts/jour :

```bash
py main.py plan-x 7 2
```

Forcer une publication X :

```bash
py main.py force x
```

Lancer le scheduler :

```bash
py main.py
```

Lancer le dashboard :

```bash
py -m streamlit run app.py
```

## Strategie X V3

Le bot ne publie plus de mega-threads automatiques par defaut. Ils etaient trop instables via UI X.

Nouveau format :

1. Post principal court, utile, sans lien, sans hashtag.
2. Premiere reponse avec lien PulsaTeach tracke.
3. Verification reelle de X avant succes.
4. Historique seulement si post + reponse sont confirmes.

Pourquoi : X penalise les liens externes dans le post principal et les threads UI automatises cassent facilement avec Playwright.

## Fichiers data

- `data/queue.json` : queue active.
- `data/history.json` : publications confirmees.
- `data/failed.json` : echecs apres retries.
- `data/metrics.json` : stats.
- `data/quality_reports.json` : quality checks.
- `data/content_plan.json` : planning editorial.
- `data/system_health.json` : dernier health check.
- `data/social_bot.log` : logs.

## Regles de qualite X

- 180 a 260 caracteres pour le post principal.
- Tutoiement obligatoire.
- 0 hashtag.
- Aucun lien dans le post principal.
- Pas de promesse bullshit.
- Une idee claire par post.
- CTA uniquement en reponse.

## Passage en production

1. Verifie le dashboard.
2. Lance `py main.py health`.
3. Fais un test avec `DRY_RUN=True`.
4. Passe `DRY_RUN=False`.
5. Lance `py main.py force x`.
6. Si OK, lance `py main.py` en continu.
