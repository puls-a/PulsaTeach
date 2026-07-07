import json
import os
from datetime import datetime, timedelta

import requests

from core.config import CONTENT_PLAN_FILE, GEMINI_API_KEY
from core.logger import get_logger
from core.queue_manager import add_to_queue
from core.strategy import WEEKLY_MIX, get_pillar

logger = get_logger("Planner")

MODEL_NAME = "gemini-2.5-flash"


def _save_plan(items):
    os.makedirs(os.path.dirname(CONTENT_PLAN_FILE), exist_ok=True)
    existing = []
    if os.path.exists(CONTENT_PLAN_FILE):
        try:
            with open(CONTENT_PLAN_FILE, "r", encoding="utf-8") as f:
                existing = json.load(f)
        except Exception:
            existing = []
    with open(CONTENT_PLAN_FILE, "w", encoding="utf-8") as f:
        json.dump((existing + items)[-500:], f, indent=2, ensure_ascii=False)


def get_content_plan():
    if not os.path.exists(CONTENT_PLAN_FILE):
        return []
    try:
        with open(CONTENT_PLAN_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def _gemini_topics(pillar: str, count: int):
    data = get_pillar(pillar)
    examples = "\n".join(data["examples"])
    prompt = f"""
Tu es directeur editorial pour @pulsateach, compte X francophone pour apprendre le dev web.

Pilier: {data['label']}
Objectif: {data['goal']}
Exemples de qualite:
{examples}

Genere EXACTEMENT {count} sujets X en francais.
Contraintes:
- une ligne par sujet
- pas de numerotation
- concret, utile, pas generique
- adapte a HTML, CSS, JS, React, Git, portfolio, premier job
"""

    if not GEMINI_API_KEY:
        return data["examples"][:count]

    try:
        response = requests.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent",
            params={"key": GEMINI_API_KEY},
            json={"contents": [{"parts": [{"text": prompt}]}]},
            timeout=45,
        )
        response.raise_for_status()
        text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        topics = [line.strip(" -*0123456789.") for line in text.split("\n")]
        return [topic for topic in topics if len(topic) > 10][:count]
    except Exception as e:
        logger.error(f"Gemini planner indisponible ({type(e).__name__}). Fallback pilier utilise.")
        return data["examples"][:count]


def build_x_plan(days: int = 7, posts_per_day: int = 2, start_date: datetime | None = None):
    start = start_date or datetime.now() + timedelta(hours=1)
    slots = ["10:00", "17:30", "20:15"]
    planned = []

    for day_index in range(days):
        day = start.date() + timedelta(days=day_index)
        pillar = WEEKLY_MIX[day_index % len(WEEKLY_MIX)]
        topics = _gemini_topics(pillar, posts_per_day)

        for idx, topic in enumerate(topics[:posts_per_day]):
            hour, minute = map(int, slots[idx % len(slots)].split(":"))
            scheduled_at = datetime.combine(day, datetime.min.time()).replace(hour=hour, minute=minute)
            item = add_to_queue(
                "x",
                "post",
                topic,
                priority=7 if pillar in ("challenge", "mistake") else 5,
                metadata={
                    "pillar": pillar,
                    "scheduled_at": scheduled_at.isoformat(),
                    "source": "planner_v3",
                },
            )
            planned.append({**item, "scheduled_at": scheduled_at.isoformat(), "pillar": pillar})

    _save_plan(planned)
    logger.info(f"Plan X V3 cree: {len(planned)} posts sur {days} jours.")
    return planned
