import random
from dataclasses import dataclass

from .templates import MOTIVATION_TEMPLATES, QUESTION_TEMPLATES, REPLY_TEMPLATES, THREADS, TIP_TEMPLATES
from .topics import GENERAL_HASHTAGS, TRACKS


@dataclass(frozen=True)
class GeneratedPost:
    kind: str
    text: str
    metadata: dict


def _hashtags(track: dict, limit: int = 4) -> str:
    tags = []
    for tag in [*track.get("hashtags", []), *GENERAL_HASHTAGS]:
        if tag not in tags:
            tags.append(tag)
    return " ".join(tags[:limit])


def _fit_tweet(text: str, max_length: int = 275) -> str:
    if len(text) <= max_length:
        return text
    cut = text[: max_length - 1].rsplit(" ", 1)[0]
    return f"{cut}…"


def generate_tip() -> GeneratedPost:
    track = random.choice(TRACKS)
    tip = random.choice(track["tips"])
    template_pool = TIP_TEMPLATES + QUESTION_TEMPLATES + MOTIVATION_TEMPLATES
    template = random.choice(template_pool)

    if "{topic}" in template:
        text = template.format(
            topic=track["name"],
            title=tip["title"],
            explanation=tip["explanation"],
            url=track["url"],
            hashtags=_hashtags(track),
        )
    else:
        text = template

    return GeneratedPost(
        kind="tip",
        text=_fit_tweet(text),
        metadata={"track": track["id"], "title": tip["title"]},
    )


def generate_thread() -> list[GeneratedPost]:
    thread = random.choice(THREADS)
    return [
        GeneratedPost(kind="thread", text=_fit_tweet(tweet), metadata={"thread": thread["title"], "index": index})
        for index, tweet in enumerate(thread["tweets"])
    ]


def generate_reply(mention_text: str) -> GeneratedPost:
    text = mention_text.lower()
    if "react" in text:
        reply = "Pour React, commence par composants, props, état minimal et formulaires. Parcours gratuit : https://pulsateach.vercel.app/formations/react"
    elif "javascript" in text or "js" in text:
        reply = "Pour JavaScript, vise une notion courte par jour : fonctions, tableaux, DOM, puis API. Parcours gratuit : https://pulsateach.vercel.app/formations/javascript"
    elif "css" in text:
        reply = "Pour CSS, travaille box model, Flexbox, Grid et responsive avec rendu visuel. Parcours gratuit : https://pulsateach.vercel.app/formations/css"
    elif "html" in text:
        reply = "Pour HTML, commence par structure, sémantique, formulaires et accessibilité. Parcours gratuit : https://pulsateach.vercel.app/formations/html"
    else:
        reply = random.choice(REPLY_TEMPLATES)
    return GeneratedPost(kind="reply", text=_fit_tweet(reply), metadata={})
