import google.generativeai as genai
import random
from core.config import GEMINI_API_KEY
from core.logger import get_logger
from core.queue_manager import add_to_queue

from core.tech_news import get_latest_tech_news

logger = get_logger("AutoIdeation")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
else:
    model = None

def auto_fill_queue(platform: str, count: int = 3):
    """
    Génère automatiquement de nouvelles idées si la file d'attente est vide.
    """
    if not model:
        logger.error("Impossible de générer des idées : Clé IA manquante.")
        return False

    logger.info(f"🧠 File d'attente vide pour {platform}. Génération de {count} sujets...")

    # Tirage au sort de la stratégie de contenu (A/B Testing)
    strategies = [
        "Un tutoriel technique étape par étape (Mega-Thread).",
        "Une opinion très controversée ou 'Hot Take' sur le monde du dev.",
        "Une erreur classique de développeur junior et comment la corriger.",
        "Un coup de gueule motivant sur la recherche du premier job en tech.",
        "NEWS_JACKING" # Nouvelle stratégie
    ]
    selected_strategy = random.choice(strategies)
    logger.info(f"🎯 Stratégie sélectionnée par l'IA : {selected_strategy}")

    if selected_strategy == "NEWS_JACKING":
        latest_news = get_latest_tech_news()
        if latest_news:
            prompt = f"""
            Voici les 3 articles les plus tendances du jour dans le monde du développement web :
            {latest_news}
            
            Crée EXACTEMENT {count} idées de posts très courts pour {platform} qui résument ou débattent de ces actualités.
            Règle absolue : Renvoie UNIQUEMENT une liste de textes séparés par des retours à la ligne. Pas de blabla.
            """
        else:
            selected_strategy = "Une astuce ultra courte" # Fallback
            prompt = f"Donne-moi EXACTEMENT {count} idées d'astuces de dev web pour {platform}. Renvoie juste la liste."
    else:
        prompt = f"""
        Tu es un expert en création de contenu pour développeurs web.
        Donne-moi EXACTEMENT {count} idées de sujets pour des posts sur {platform}.
        
        Format imposé pour cette session : {selected_strategy}
        Sujets possibles : HTML, CSS, JavaScript, React, NextJS, ou la vie d'un dev (trouver un job, portfolio).
        
        Règle absolue : Renvoie UNIQUEMENT une liste de textes séparés par des retours à la ligne. Pas de blabla.
        """

    try:
        response = model.generate_content(prompt)
        ideas = response.text.strip().split('\n')
        
        # Nettoyage des puces éventuelles (1., -, *, etc.)
        clean_ideas = []
        for idea in ideas:
            clean_idea = idea.strip(' 1234567890.*-')
            if len(clean_idea) > 10: # Ignorer les lignes trop courtes ou vides
                clean_ideas.append(clean_idea)

        added = 0
        for topic in clean_ideas[:count]:
            content_type = "thread" if platform == "x" else "post"
            add_to_queue(platform, content_type, topic)
            added += 1
            
        logger.info(f"✅ {added} nouvelles idées ajoutées à la file d'attente pour {platform} !")
        return True
        
    except Exception as e:
        logger.error(f"❌ Erreur lors de la génération d'idées : {e}")
        return False
