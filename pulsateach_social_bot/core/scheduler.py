import time
import schedule
from core.config import PLATFORM_ENABLED
from core.queue_manager import add_to_history, get_next_for_platform, is_duplicate, mark_attempt, remove_from_queue
from core.content_generator import generate_social_content
from core.auto_ideation import auto_fill_queue
from core.logger import get_logger
from core.state import add_failed, add_quality_report, can_publish, increment_metric
from platforms.x_client import XBot
from platforms.instagram_client import InstagramBot
from platforms.tiktok_client import TikTokBot
import os

# Import du créateur de vidéo autonome
try:
    from core.auto_video_creator import create_faceless_video
    HAS_VIDEO_CREATOR = True
except ImportError:
    HAS_VIDEO_CREATOR = False

logger = get_logger("Scheduler")

# Initialisation des clients (Lazy loading pour éviter les plantages au démarrage si configs manquantes)
clients = {}

def get_client(platform):
    if platform not in clients:
        if platform == "x":
            clients["x"] = XBot()
        elif platform == "instagram":
            clients["instagram"] = InstagramBot()
        elif platform == "tiktok":
            clients["tiktok"] = TikTokBot()
    return clients.get(platform)

def process_queue_for_platform(platform: str, forced: bool = False):
    """Récupère le prochain post de la file pour une plateforme et le publie."""
    logger.info(f"🔍 Vérification de la file d'attente pour {platform}...")

    if not PLATFORM_ENABLED.get(platform, False) and not forced:
        logger.info(f"Plateforme {platform} desactivee. Skip.")
        return False

    allowed, reason = can_publish(platform, forced=forced)
    if not allowed:
        logger.warning(f"Publication bloquee pour {platform}: {reason}")
        return False
    
    item = get_next_for_platform(platform)
    
    # 🧠 LE CERVEAU AUTONOME : Si la file est vide, on génère des idées tout seul !
    if not item:
        logger.info(f"⚠️ La file est vide pour {platform}. Activation de l'IA d'idéation...")
        success_fill = auto_fill_queue(platform, count=3)
        if success_fill:
            # On retente de prendre le premier élément fraîchement généré
            item = get_next_for_platform(platform)
        
        if not item:
            logger.error(f"❌ Impossible de générer du contenu pour {platform}. Abandon.")
            return False

    topic = item.get("topic")
    content_type = item.get("type", "post")
    media_path = item.get("media_path")

    # Anti-duplication check
    if is_duplicate(platform, topic):
        logger.warning(f"⚠️ Sujet '{topic}' déjà publié sur {platform}. Suppression de la file.")
        remove_from_queue(item["id"])
        return False

    logger.info(f"🚀 Préparation publication {platform} : {topic}")
    mark_attempt(item["id"])
    
    # 1. Génération IA
    ai_content = generate_social_content(platform, topic, content_type)
    caption = ai_content.get("caption", "")
    hook = ai_content.get("hook", None)

    # 2. Publication
    client = get_client(platform)
    success = False

    if platform == "x":
        main_post = ai_content.get("main_post") or ai_content.get("caption") or ""
        reply = ai_content.get("reply")
        add_quality_report("x", topic, {
            "score": ai_content.get("quality_score"),
            "notes": ai_content.get("quality_notes", []),
            "format": ai_content.get("format"),
            "main_post": main_post,
            "reply": reply,
        })
        success = client.post_value_with_reply(main_post, reply)
    elif platform == "instagram":
        is_reel = content_type == "reel"
        is_carousel = content_type == "carousel"
        success = client.post(media_path, caption, is_reel=is_reel, is_carousel=is_carousel)
    elif platform == "tiktok":
        # 🎬 GÉNÉRATION VIDÉO AUTONOME (Si aucun média n'est fourni)
        if not media_path and HAS_VIDEO_CREATOR:
            logger.info("🤖 Création vidéo autonome (Faceless + IA Voice) en cours...")
            generated_video = create_faceless_video(topic, hook, caption)
            if generated_video:
                media_path = generated_video
            else:
                logger.error("❌ Échec de la création vidéo autonome.")
                
        # On passe directement la vidéo à TikTok (plus besoin que TikTokBot ajoute le hook, car la vidéo a déjà le hook incrusté ET la voix !)
        if media_path and os.path.exists(media_path):
            # hook_text est mis à None car le texte est déjà incrusté dans l'étape 'create_faceless_video'
            success = client.post(media_path, caption, hook_text=None)
        else:
            logger.error("❌ Impossible de publier sur TikTok : Vidéo introuvable.")

    # 3. Post-traitement
    if success:
        logger.info(f"🎉 Succès publication {platform}. Ajout à l'historique.")
        add_to_history(platform, topic, ai_content)
        increment_metric(platform, "published")
        remove_from_queue(item["id"])
        
        # Nettoyage si la vidéo a été générée par le bot
        if platform == "tiktok" and media_path and "tiktok_auto_" in media_path:
            try:
                os.remove(media_path)
            except:
                pass
        return True
    else:
        logger.error(f"❌ Échec de la publication pour {platform}. Le post reste dans la file.")
        increment_metric(platform, "failed")
        if int(item.get("attempts", 0)) >= 3:
            add_failed(item, "3 tentatives echouees")
            remove_from_queue(item["id"])
        return False

def setup_schedules():
    """Planification intelligente des publications."""
    logger.info("📅 Configuration du planificateur central...")

    # TIKTOK : Matin et Soir (Vidéos courtes)
    schedule.every().day.at("08:30").do(process_queue_for_platform, "tiktok")
    schedule.every().day.at("18:30").do(process_queue_for_platform, "tiktok")

    # X (Twitter) : Tout au long de la journée
    schedule.every().day.at("10:00").do(process_queue_for_platform, "x")
    schedule.every().day.at("14:00").do(process_queue_for_platform, "x")
    schedule.every().day.at("20:00").do(process_queue_for_platform, "x")

    # INSTAGRAM : Début d'après-midi (Carrousels, Reels, Posts)
    schedule.every().day.at("12:30").do(process_queue_for_platform, "instagram")
    schedule.every().day.at("17:45").do(process_queue_for_platform, "instagram")

def run_scheduler():
    setup_schedules()
    logger.info("✅ Planificateur démarré. En attente...")
    while True:
        schedule.run_pending()
        time.sleep(60)
