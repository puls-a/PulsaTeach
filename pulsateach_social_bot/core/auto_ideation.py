import random

import requests

from core.config import GEMINI_API_KEY
from core.logger import get_logger
from core.queue_manager import add_to_queue
from core.tech_news import get_latest_tech_news

logger = get_logger("AutoIdeation")

MODEL_NAME = "gemini-2.5-flash"


def _gemini_text(prompt: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent"
    response = requests.post(
        url,
        params={"key": GEMINI_API_KEY},
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.8, "topP": 0.9},
        },
        timeout=45,
    )
    response.raise_for_status()
    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


def auto_fill_queue(platform: str, count: int = 3):
    """Genere automatiquement de nouvelles idees si la file est vide."""
    if not GEMINI_API_KEY:
        logger.error("Impossible de generer des idees : cle IA manquante.")
        return False

    logger.info(f"File d'attente vide pour {platform}. Generation de {count} sujets...")

    strategies = [
        "mini-defi pratique avec correction",
        "erreur classique de debutant et correction",
        "astuce concrete JavaScript/CSS/React",
        "conseil portfolio ou premier job",
        "news-jacking webdev",
    ]
    selected_strategy = random.choice(strategies)
    logger.info(f"Strategie selectionnee: {selected_strategy}")

    if selected_strategy == "news-jacking webdev":
        latest_news = get_latest_tech_news()
        news_context = "\n".join(latest_news) if latest_news else ""
        prompt = f"""
Voici des titres recents webdev:
{news_context}

Genere EXACTEMENT {count} idees de posts X en francais, utiles pour des debutants web.
Chaque idee doit etre specifique, pas generique, et tenir sur une ligne.
Pas de numerotation, pas de markdown, pas de blabla.
"""
    else:
        prompt = f"""
Tu trouves des sujets X pour @pulsateach, compte educatif francophone dev web.

Strategie: {selected_strategy}
Themes: HTML, CSS, JavaScript, React, Git, portfolio, premier job, projets juniors.

Genere EXACTEMENT {count} idees de posts.
Chaque idee doit etre precise, actionnable, et tenir sur une ligne.
Exemples de qualite:
Corrige ce useEffect qui boucle a l'infini
Pourquoi ton portfolio ne rassure pas les recruteurs
Mini-defi CSS: reproduis ce layout sans media queries

Pas de numerotation, pas de markdown, pas de blabla.
"""

    try:
        ideas = _gemini_text(prompt).strip().split("\n")

        clean_ideas = []
        for idea in ideas:
            clean_idea = idea.strip(" 1234567890.*-–—")
            if len(clean_idea) > 10:
                clean_ideas.append(clean_idea)

        added = 0
        for topic in clean_ideas[:count]:
            add_to_queue(platform, "post", topic)
            added += 1

        logger.info(f"{added} nouvelles idees ajoutees a la file pour {platform}.")
        return added > 0
    except Exception as e:
        logger.error(f"Erreur generation idees : {e}")
        return False
