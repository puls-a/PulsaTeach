import time
import random
from tiktok_uploader.upload import upload_video
from config import COOKIES_FILE, PROXY_URL
from logger import logger

class TikTokBot:
    def __init__(self):
        self.cookies = COOKIES_FILE
        self.proxy = PROXY_URL

    def random_delay(self, min_sec=10, max_sec=30):
        """Délai pour simuler un humain et éviter le shadowban."""
        delay = random.uniform(min_sec, max_sec)
        logger.info(f"⏳ Pause de {delay:.2f} secondes (Anti-spam)...")
        time.sleep(delay)

    def upload(self, video_path: str, caption: str):
        """
        Upload la vidéo sur TikTok en utilisant un navigateur Headless via Playwright.
        La bibliothèque tiktok-uploader gère le bypass des sécurités de base si on a de bons cookies.
        """
        try:
            logger.info(f"📤 Tentative d'upload sur TikTok : {video_path}")
            self.random_delay(5, 15)
            
            # Paramètres de l'upload
            options = {
                'cookies': self.cookies,
                'description': caption,
                'headless': True
            }
            
            if self.proxy:
                options['proxy'] = {'server': self.proxy}

            # Lancement de l'upload
            upload_video(video_path, **options)
            
            logger.info("✅ Vidéo uploadée avec succès sur TikTok !")
            return True
            
        except Exception as e:
            logger.error(f"❌ Échec de l'upload TikTok : {e}")
            logger.error("💡 Assure-toi que ton fichier de cookies est à jour et non expiré.")
            return False

    def auto_reply(self):
        """
        [FONCTIONNALITÉ AVANCÉE]
        L'API d'upload de TikTok ne permet pas facilement de répondre aux commentaires.
        Pour une vraie réponse auto, il faudrait utiliser un Playwright script custom 
        qui navigue sur tes notifications et répond.
        """
        logger.warning("⚠️ L'auto-réponse aux commentaires nécessite une implémentation Playwright manuelle avancée (risqué pour le ban).")
        logger.info("💡 Stratégie recommandée : Réponds manuellement aux commentaires les 30 premières minutes après publication pour booster l'algorithme.")
