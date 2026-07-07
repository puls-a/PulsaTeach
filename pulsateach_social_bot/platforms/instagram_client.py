import time
import random
import os
from instagrapi import Client
from core.config import IG_USERNAME, IG_PASSWORD, IG_SESSION_FILE, DRY_RUN
from core.logger import get_logger

logger = get_logger("Instagram_Client")

class InstagramBot:
    def __init__(self):
        self.dry_run = DRY_RUN
        self.client = Client()
        self.client.delay_range = [2, 5]
        
        if not self.dry_run:
            self._login()

    def _login(self):
        if not IG_USERNAME or not IG_PASSWORD:
            logger.warning("⚠️ Identifiants Instagram non configurés.")
            return
            
        try:
            if os.path.exists(IG_SESSION_FILE):
                self.client.load_settings(IG_SESSION_FILE)
                self.client.login(IG_USERNAME, IG_PASSWORD)
                try:
                    self.client.get_timeline_feed()
                    logger.info("✅ IG Connexion réussie (session restaurée).")
                except Exception:
                    logger.warning("⚠️ IG Session expirée. Reconnexion...")
                    self.client.login(IG_USERNAME, IG_PASSWORD, relogin=True)
                    self.client.dump_settings(IG_SESSION_FILE)
            else:
                self.client.login(IG_USERNAME, IG_PASSWORD)
                self.client.dump_settings(IG_SESSION_FILE)
                logger.info("✅ IG Première connexion réussie.")
        except Exception as e:
            logger.error(f"❌ Erreur connexion Instagram : {e}")

    def _delay(self):
        delay = random.uniform(5, 15)
        logger.info(f"⏳ IG Pause anti-spam de {delay:.2f}s...")
        time.sleep(delay)

    def post(self, media_path: str, caption: str, is_reel: bool = False, is_carousel: bool = False):
        if self.dry_run:
            logger.info(f"[DRY-RUN IG] Publication {media_path}\nCaption:\n{caption}")
            return True
            
        try:
            self._delay()
            if is_carousel and isinstance(media_path, list):
                self.client.album_upload(media_path, caption)
            elif is_reel:
                self.client.clip_upload(media_path, caption)
            else:
                self.client.photo_upload(media_path, caption)
                
            logger.info(f"✅ IG Publication réussie : {media_path}")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur IG Publication : {e}")
            return False
