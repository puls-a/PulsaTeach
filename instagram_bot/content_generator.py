import google.generativeai as genai
from config import GEMINI_API_KEY
from logger import logger

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Utilisation de Gemini 1.5 Flash (rapide, pas cher et excellent pour les textes courts)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None
    logger.warning("⚠️ Aucune clé GEMINI_API_KEY trouvée. Génération IA désactivée.")

def generate_caption(topic: str, content_type: str = "post") -> str:
    """
    Génère une caption optimisée pour l'algorithme avec emojis, hashtags et CTA.
    """
    if not model:
        # Fallback si l'IA n'est pas configurée
        return f"🔥 Astuce du jour : {topic}\n\n🚀 Apprends à coder de 0 à pro sur https://pulsateach.vercel.app\n\n#webdev #programmation #pulsateach"

    prompt = f"""
    Tu es un expert en growth Instagram tech et tu gères le compte éducatif @pulsateach.
    Crée une légende (caption) très engageante pour un {content_type} Instagram concernant : '{topic}'.
    
    Règles strictes :
    1. Ton : éducatif, motivant, proche des étudiants, moderne (tech).
    2. Langue : Français uniquement.
    3. Style : Ajoute des emojis pertinents. Fais des sauts de ligne pour aérer le texte (pas de gros blocs).
    4. Call-to-action (OBLIGATOIRE) : Incite à visiter le lien "https://pulsateach.vercel.app" pour apprendre le dev web.
    5. Hashtags : Ajoute exactement 12 à 15 hashtags très ciblés à la fin (ex: #webdev #javascript #htmlcss #apprendreacoder #pulsateach).
    6. Ne mets JAMAIS de texte d'introduction (ex: "Voici votre légende :"). Donne-moi UNIQUEMENT le texte final à copier-coller.
    """
    
    try:
        response = model.generate_content(prompt)
        caption = response.text.strip()
        logger.info(f"✅ Caption IA générée pour : {topic}")
        return caption
    except Exception as e:
        logger.error(f"❌ Erreur lors de la génération IA : {e}")
        return f"🚀 {topic}\n\nRejoins-nous sur https://pulsateach.vercel.app ! #webdev #pulsateach"

def generate_hook_ideas(topic: str) -> list:
    """
    Génère des idées de phrases d'accroche (hooks) pour les Reels.
    À utiliser manuellement pour préparer les tournages.
    """
    if not model:
        return []
    
    prompt = f"Génère 5 hooks (phrases d'accroche pour les 3 premières secondes) très viraux pour un Reel Instagram sur : {topic}."
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Erreur : {e}"
