import json
import re

import requests

from core.config import GEMINI_API_KEY, URL_PULSATEACH
from core.logger import get_logger
from core.quality import score_x_post

logger = get_logger("ContentGenerator")

MODEL_NAME = "gemini-2.5-flash"

if not GEMINI_API_KEY:
    logger.warning("Cle GEMINI_API_KEY manquante. L'IA est desactivee.")


def _extract_json(text: str) -> dict:
    cleaned = text.strip().replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if not match:
            raise
        return json.loads(match.group(0))


def _gemini_json(prompt: str) -> dict:
    text = _gemini_text(prompt)
    return _extract_json(text)


def _gemini_text(prompt: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent"
    response = requests.post(
        url,
        params={"key": GEMINI_API_KEY},
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.75, "topP": 0.9},
        },
        timeout=45,
    )
    response.raise_for_status()
    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


def _truncate(text: str, limit: int = 260) -> str:
    text = " ".join((text or "").split())
    if len(text) <= limit:
        return text
    return text[: limit - 3].rstrip() + "..."


def _validate_x_content(data: dict) -> tuple[bool, list[str]]:
    issues = []
    main_post = (data.get("main_post") or "").strip()
    reply = (data.get("reply") or "").strip()

    if not main_post:
        issues.append("main_post manquant")
    if len(main_post) > 260:
        issues.append("main_post trop long")
    if "http" in main_post or "pulsateach" in main_post.lower():
        issues.append("lien ou marque dans main_post")
    if "#" in main_post:
        issues.append("hashtag dans main_post")
    if len(main_post.split()) < 18:
        issues.append("main_post trop court")
    if not reply:
        issues.append("reply manquant")
    if URL_PULSATEACH not in reply:
        issues.append("reply sans URL PulsaTeach")
    if len(reply) > 260:
        issues.append("reply trop long")

    banned = ["deviens riche", "sans effort", "hack secret", "garanti"]
    if any(term in (main_post + " " + reply).lower() for term in banned):
        issues.append("promesse trop aggressive")

    return not issues, issues


def _fallback_x_content(topic: str, reason: str = "fallback") -> dict:
    topic_clean = " ".join((topic or "dev web").split())
    main_post = _truncate(
        f"Si tu bloques sur {topic_clean}, ne cherche pas une video de plus. Prends un exemple simple, casse-le, puis explique avec tes mots pourquoi ca marche. C'est comme ca que tu progresses vraiment.",
        255,
    )
    reply = _truncate(f"Pour pratiquer gratuitement avec des cours et quiz: {URL_PULSATEACH}", 255)
    return {
        "format": "value_reply",
        "main_post": main_post,
        "reply": reply,
        "reason": reason,
        "quality_score": 7,
        "quality_notes": [reason],
    }


def generate_x_content(topic: str, content_type: str = "post") -> dict:
    if not GEMINI_API_KEY:
        return {
            "format": "value_reply",
            "main_post": _truncate(f"Erreur de debutant: apprendre sans construire. Choisis une mini-feature, code-la, casse-la, puis recommence. C'est comme ca que tu progresses vraiment en dev web."),
            "reply": f"Pour pratiquer gratuitement: {URL_PULSATEACH}",
            "quality_score": 7,
            "quality_notes": ["fallback sans IA"],
        }

    prompt = f"""
Tu es le redacteur X du compte educatif tech francophone @pulsateach.

Objectif: attirer des debutants qui veulent apprendre le developpement web gratuitement.
Sujet: {topic}
Format demande: {content_type}

Contexte X 2026 a respecter:
- Le post principal ne doit PAS contenir de lien externe.
- Le lien va dans la premiere reponse pour eviter la penalite de reach.
- 0 hashtag.
- Ton: senior dev bienveillant, direct, concret, pas vendeur.
- Tutoiement obligatoire. Ne vouvoie jamais.
- Audience: francophones debutants/intermediaires en HTML, CSS, JS, React.
- Evite les promesses type "deviens riche", "sans effort", "garanti".

Ecris un contenu en 2 parties:
1. main_post: un seul post X, 180 a 255 caracteres, sans URL, sans hashtag.
   Structure: hook fort + insight concret + mini-action.
   Style: phrase courte, naturelle, comme un dev qui parle a un autre dev.
   Il doit pouvoir etre publie seul et donner de la valeur.
2. reply: premiere reponse courte avec CTA naturel vers PulsaTeach et l'URL exacte.

Renvoie STRICTEMENT ce JSON:
{{
  "format": "value_reply",
  "main_post": "...",
  "reply": "... {URL_PULSATEACH}",
  "reason": "pourquoi ce post devrait fonctionner"
}}
"""

    try:
        data = _gemini_json(prompt)
    except Exception as e:
        logger.error(f"Gemini indisponible pour X ({type(e).__name__}). Fallback local utilise.")
        return _fallback_x_content(topic, "gemini_unavailable")
    data["main_post"] = _truncate(data.get("main_post", ""), 260)
    data["reply"] = _truncate(data.get("reply", f"Apprends gratuitement ici: {URL_PULSATEACH}"), 260)

    valid, issues = _validate_x_content(data)
    if not valid:
        logger.warning(f"Quality check X echoue: {issues}. Re-ecriture Gemini...")
        repair_prompt = f"""
Repare ce contenu X en corrigeant ces problemes: {issues}

Contenu actuel:
{json.dumps(data, ensure_ascii=False)}

Contraintes non negociables:
- main_post entre 180 et 255 caracteres.
- main_post sans URL, sans hashtag, sans mention PulsaTeach.
- reply contient exactement cette URL: {URL_PULSATEACH}
- style naturel, utile, francais.
- tutoiement obligatoire.

Renvoie STRICTEMENT le meme JSON corrige.
"""
        try:
            data = _gemini_json(repair_prompt)
        except Exception as e:
            logger.error(f"Reparation Gemini indisponible ({type(e).__name__}). Fallback local utilise.")
            return _fallback_x_content(topic, "gemini_repair_unavailable")
        data["main_post"] = _truncate(data.get("main_post", ""), 260)
        data["reply"] = _truncate(data.get("reply", f"Apprends gratuitement ici: {URL_PULSATEACH}"), 260)
        valid, issues = _validate_x_content(data)

    data["quality_score"] = 9 if valid else 6
    data["quality_notes"] = [] if valid else issues
    local_score = score_x_post(data.get("main_post", ""), data.get("reply", ""), URL_PULSATEACH)
    data["local_quality"] = local_score
    data["quality_score"] = min(data["quality_score"], local_score["score"])
    if local_score["issues"]:
        data["quality_notes"] = list(set(data.get("quality_notes", []) + local_score["issues"]))
    logger.info(f"X quality score: {data['quality_score']} | notes: {data['quality_notes']}")
    return data


def generate_social_content(platform: str, topic: str, content_type: str = "post") -> dict:
    platform = platform.lower()
    if platform == "x":
        return generate_x_content(topic, content_type)

    if not GEMINI_API_KEY:
        return {"caption": f"Astuce : {topic} sur {URL_PULSATEACH}"}

    prompts = {
        "instagram": f"""
Tu geres le compte Insta @pulsateach. Ecris la legende pour un {content_type} sur '{topic}'.
Ton educatif, motivant, proche des etudiants.
Ajoute un CTA vers {URL_PULSATEACH} et 10 hashtags pertinents.
Renvoie uniquement le texte final.
""",
        "tiktok": f"""
Tu geres le TikTok @pulsateach. Sujet: '{topic}'.
Renvoie STRICTEMENT ce JSON:
{{
  "hook": "Accroche visuelle 3-5 mots",
  "caption": "Description courte + CTA vers {URL_PULSATEACH} + 5 hashtags"
}}
""",
    }

    prompt = prompts.get(platform)
    if not prompt:
        raise ValueError(f"Plateforme non supportee pour la generation : {platform}")

    try:
        text = _gemini_text(prompt).strip()
        if platform == "tiktok":
            return _extract_json(text)
        return {"caption": text}
    except Exception as e:
        logger.error(f"Erreur IA pour {platform} - {topic}: {e}")
        return {"caption": f"Decouvre tout sur {topic}. Lien en bio : {URL_PULSATEACH}"}
