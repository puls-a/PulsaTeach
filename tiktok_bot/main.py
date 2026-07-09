import schedule
import time
import os
import random
from tiktok_client import TikTokBot
from content_generator import generate_tiktok_content
from video_editor import add_hook_to_video
from logger import logger

bot = TikTokBot()

# Base de données de tes vidéos brutes (sans texte)
PENDING_VIDEOS = [
    {
        "type": "Astuce ultra-courte",
        "path": "assets/raw_videos/video1.mp4",
        "topic": "Comment centrer une div avec Flexbox en 2 secondes"
    },
    {
        "type": "Erreur classique",
        "path": "assets/raw_videos/video2.mp4",
        "topic": "Oublier la key dans un map React (Bug classique)"
    },
    {
        "type": "POV / Motivation",
        "path": "assets/raw_videos/video3.mp4",
        "topic": "Quand tu réussis enfin à centrer ta div après 4 heures"
    }
]

def job_publish_tiktok():
    """Tâche principale : Edite, génère la caption, et upload la vidéo."""
    logger.info("🎬 Démarrage du job de publication TikTok...")
    
    if not PENDING_VIDEOS:
        logger.info("⚠️ Aucune vidéo brute en attente.")
        return

    # On récupère la première vidéo
    video_data = PENDING_VIDEOS.pop(0)
    raw_path = video_data["path"]
    
    if not os.path.exists(raw_path):
        logger.error(f"❌ Fichier vidéo introuvable : {raw_path}")
        return
        
    logger.info(f"📌 Sujet du jour : {video_data['topic']} ({video_data['type']})")

    # 1. Génération IA (Hook + Caption)
    content = generate_tiktok_content(video_data["topic"], video_data["type"])
    hook_text = content.get("hook", "Astuce Dev 🚀")
    caption = content.get("caption", "Apprends à coder sur PulsaTeach ! Lien en bio.")
    
    logger.info(f"📝 Caption générée : {caption}")

    # 2. Édition Vidéo (Incrustation du Hook)
    processed_path = f"assets/processed_videos/final_{os.path.basename(raw_path)}"
    success_edit = add_hook_to_video(raw_path, processed_path, hook_text)
    
    if not success_edit:
        logger.error("Annulation de la publication suite à une erreur d'édition.")
        return

    # 3. Upload sur TikTok
    success_upload = bot.upload(processed_path, caption)
    
    if success_upload:
        logger.info("🎉 Fin du cycle de publication.")
        # Nettoyage : On peut supprimer la vidéo processée pour gagner de l'espace
        try:
            os.remove(processed_path)
        except:
            pass
    else:
        logger.error("❌ Échec de la publication. Vidéo replacée dans la file d'attente.")
        PENDING_VIDEOS.insert(0, video_data)


def setup_scheduler():
    """
    Configuration de la routine TikTok (1 à 3 par jour).
    Heures stratégiques FR (2026) : 12h, 17h, 20h.
    """
    logger.info("📅 Initialisation du planificateur TikTok...")
    
    # 1ère vidéo : Pause déjeuner
    schedule.every().day.at("12:15").do(job_publish_tiktok)
    
    # 2ème vidéo : Sortie des cours / boulot
    schedule.every().day.at("17:45").do(job_publish_tiktok)
    
    # 3ème vidéo : Prime time (Décommenter pour 3x par jour)
    # schedule.every().day.at("20:30").do(job_publish_tiktok)

    logger.info("✅ Bot TikTok en attente...")
    
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    logger.info("🤖 Démarrage de l'agent Growth TikTok @pulsateach")
    
    # --- TEST MANUEL --- 
    # Pour tester l'upload directement (attention à avoir tes cookies prêts), décommente cette ligne :
    # job_publish_tiktok()
    
    setup_scheduler()
