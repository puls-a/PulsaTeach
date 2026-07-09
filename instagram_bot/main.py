import schedule
import time
import os
import random
from instagram_client import InstagramBot
from content_generator import generate_caption
from logger import logger

# Variable globale pour stocker l'instance du bot et éviter les reconnexions inutiles
bot_instance = None

def get_bot():
    global bot_instance
    if not bot_instance:
        bot_instance = InstagramBot()
    return bot_instance

# -------------------------------------------------------------
# BASE DE DONNÉES SIMULÉE (À remplacer par Notion / BDD / JSON)
# -------------------------------------------------------------
# Astuce: Place tes médias dans le dossier "assets" correspondant.
PENDING_CONTENT = [
    {
        "type": "reel",
        "path": "assets/videos/hook_css.mp4", 
        "topic": "Astuce CSS : Comment centrer n'importe quel élément avec Flexbox en 3 lignes",
        "thumbnail": None
    },
    {
        "type": "carousel",
        "path": ["assets/images/slide1.jpg", "assets/images/slide2.jpg", "assets/images/slide3.jpg"],
        "topic": "5 extensions VSCode incontournables pour développeur React"
    },
    {
        "type": "post",
        "path": "assets/images/quote_motivation.jpg",
        "topic": "Citation motivationnelle sur l'apprentissage du code et la discipline"
    }
]

def publish_next_content():
    """Fonction principale pour récupérer le prochain contenu, générer la légende et publier."""
    logger.info("🔍 Recherche de contenu à publier...")
    
    if not PENDING_CONTENT:
        logger.info("⚠️ Aucun contenu en file d'attente.")
        return

    # On extrait le premier élément de la liste
    content = PENDING_CONTENT.pop(0)
    logger.info(f"🚀 Préparation d'un {content['type']} - Sujet : {content['topic']}")

    # 1. Génération de la légende avec l'IA
    caption = generate_caption(content['topic'], content['type'])
    logger.info(f"📝 Légende générée (longueur : {len(caption)} chars)")

    # 2. Récupération de l'instance du bot Instagram
    bot = get_bot()

    # 3. Publication selon le type
    success = False
    
    if content['type'] == 'post':
        if os.path.exists(content['path']):
            success = bot.post_photo(content['path'], caption)
        else:
            logger.error(f"❌ Fichier introuvable : {content['path']}")
            
    elif content['type'] == 'reel':
        if os.path.exists(content['path']):
            success = bot.post_reel(content['path'], caption, content.get('thumbnail'))
        else:
            logger.error(f"❌ Fichier introuvable : {content['path']}")
            
    elif content['type'] == 'carousel':
        # Vérifier que toutes les images du carrousel existent
        if all(os.path.exists(p) for p in content['path']):
            success = bot.post_carousel(content['path'], caption)
        else:
            logger.error(f"❌ Certains fichiers du carrousel sont introuvables : {content['path']}")

    if success:
        logger.info("🎉 Fin de la publication avec succès.")
        # Simuler un délai bonus après publication
        time.sleep(random.randint(60, 180))
    else:
        logger.error("❌ Échec de la publication.")
        # On remet le contenu dans la liste pour la prochaine fois
        PENDING_CONTENT.insert(0, content)

def setup_scheduler():
    """
    Configuration de la planification.
    Stratégie recommandée :
    - 1 Reel par jour (ex: 18h00 - pic d'audience)
    - 5 à 7 Feed posts / Carrousels répartis (ex: 12h00)
    """
    logger.info("📅 Initialisation du planificateur de publications...")
    
    # Exemples de planification (à ajuster selon l'heure locale du serveur)
    # Reels journaliers (18h00)
    schedule.every().day.at("18:00").do(publish_next_content)
    
    # Posts / Carrousels (Lundi, Mercredi, Vendredi à 12h30)
    schedule.every().monday.at("12:30").do(publish_next_content)
    schedule.every().wednesday.at("12:30").do(publish_next_content)
    schedule.every().friday.at("12:30").do(publish_next_content)
    
    # Variante aléatoire: publier 1 fois par jour à une heure fixe
    # schedule.every().day.at("17:45").do(publish_next_content)

    logger.info("✅ Planificateur prêt. Le bot tourne et attend l'heure définie...")
    
    while True:
        schedule.run_pending()
        time.sleep(30) # Vérifie le calendrier toutes les 30s

if __name__ == "__main__":
    logger.info("🤖 Démarrage de l'agent Instagram PulsaTeach (Growth)")
    
    # Décommenter la ligne suivante pour forcer une publication immédiate pour tester :
    # publish_next_content()
    
    # Démarrage de la boucle planifiée (bloquante)
    setup_scheduler()
