import google.generativeai as genai
import json
from core.config import GEMINI_API_KEY, URL_PULSATEACH
from core.logger import get_logger

logger = get_logger("ContentGenerator")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
else:
    model = None
    logger.warning("Clé GEMINI_API_KEY manquante. L'IA est désactivée.")

def generate_social_content(platform: str, topic: str, content_type: str = "post") -> dict:
    """
    Génère le texte adapté à la plateforme demandée.
    Retourne un dict avec 'caption' et éventuellement 'hook' (pour TikTok/Reels) ou 'thread' (pour X).
    """
    if not model:
        return {"caption": f"🚀 Astuce : {topic} sur {URL_PULSATEACH}"}

    prompts = {
        "x": f"""
            Tu es un développeur web Senior et un créateur de contenu star sur Twitter/X.
            Sujet du jour : '{topic}'.
            
            Tu dois écrire un contenu adapté au sujet. Renvoie STRICTEMENT une réponse en format JSON :
            {{
                "tweets": [
                    "Le tout premier tweet. Accroche fracassante.",
                    "Le dernier tweet qui est l'Auto-Plug : '👉 Maîtrise le dev web avec PulsaTeach : {URL_PULSATEACH}'"
                ],
                "poll_options": ["Option 1", "Option 2", "Option 3"] 
            }}
            
            Règles :
            1. Le champ "poll_options" est optionnel. N'ajoute un sondage (de 2 à 4 options max) que si le sujet s'y prête parfaitement (ex: un débat entre React et Vue). Sinon, omet ce champ. Si un sondage est présent, il sera attaché au TOUT PREMIER tweet.
            2. Ne mets AUCUN hashtag. 1 ou 2 emojis max par tweet.
        """,
        "instagram": f"""
            Tu gères le compte Insta @pulsateach. Écris la légende pour un {content_type} sur '{topic}'.
            Ton: éducatif, motivant.
            Structure: 
            - 1 phrase d'accroche.
            - Texte aéré avec emojis.
            - CTA clair: "Lien en bio (ou {URL_PULSATEACH})".
            - 10-12 hashtags pertinents (#DevWeb #HTML #CSS).
            Ne renvoie que le texte exact de la légende.
        """,
        "tiktok": f"""
            Tu gères le TikTok @pulsateach. Sujet: '{topic}'.
            Génère une réponse STRICTEMENT en JSON :
            {{
                "hook": "Accroche visuelle super courte (3-5 mots, ex: 'Fix ce bug 🐛')",
                "caption": "Description courte + CTA vers {URL_PULSATEACH} + 5 hashtags (#DevWeb etc.)"
            }}
        """
    }

    prompt = prompts.get(platform.lower())
    if not prompt:
        raise ValueError(f"Plateforme non supportée pour la génération : {platform}")

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        if platform.lower() in ["tiktok", "x"]:
            # Parsing JSON pour TikTok et X
            text = text.replace("```json", "").replace("```", "").strip()
            return json.loads(text)
        else:
            return {"caption": text}
            
    except Exception as e:
        logger.error(f"Erreur IA pour {platform} - {topic}: {e}")
        return {"tweet_1": f"🚀 Découvre tout sur {topic} !", "tweet_2": f"Lien : {URL_PULSATEACH}"} if platform.lower() == "x" else {"caption": f"🚀 Découvre tout sur {topic} ! Lien en bio : {URL_PULSATEACH}"}
