import google.generativeai as genai
from config import GEMINI_API_KEY, URL_PULSATEACH
from logger import logger

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Gemini 1.5 Flash (très rapide et opti pour le texte court)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None
    logger.warning("⚠️ Clé GEMINI_API_KEY manquante. L'IA est désactivée.")

def generate_tiktok_content(topic: str, content_type: str) -> dict:
    """
    Génère à la fois le texte incrusté (hook) et la description de la vidéo TikTok.
    """
    if not model:
        return {
            "hook": topic,
            "caption": f"🚀 Apprends le dev web gratuitement sur {URL_PULSATEACH} #DevWeb #PulsaTeach"
        }

    prompt = f"""
    Tu es le community manager TikTok de PulsaTeach, une plateforme gratuite pour apprendre le développement web.
    Ton audience : les débutants francophones, jeunes (16-25 ans).
    Le type de vidéo est : {content_type}.
    Le sujet exact est : '{topic}'.
    
    Donne-moi ta réponse strictement sous le format JSON suivant, rien d'autre :
    {{
        "hook": "Le texte court (3 à 6 mots ultra percutants) à afficher sur la vidéo",
        "caption": "La description TikTok. 1 phrase d'accroche + emojis stratégiques + CTA ('Lien en bio pour la formation gratuite') + 4 à 6 hashtags (#DevWeb #HTML #CSS...)"
    }}
    
    Exemple de hook : "Fix ce bug CSS 🐛" ou "POV: Tu commences React"
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace("```json", "").replace("```", "").strip()
        import json
        data = json.loads(text)
        logger.info(f"✅ Contenu IA généré pour : {topic}")
        return data
    except Exception as e:
        logger.error(f"❌ Erreur lors de la génération IA : {e}")
        return {
            "hook": "Astuce Web Dev 🔥",
            "caption": f"Apprends le code avec nous ! Lien en bio 🚀 #DevWeb #PulsaTeach"
        }
