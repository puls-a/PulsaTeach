from instagrapi import Client
import time
import random
import os
from config import IG_USERNAME, IG_PASSWORD, SESSION_FILE
from logger import logger

class InstagramBot:
    def __init__(self):
        if not IG_USERNAME or not IG_PASSWORD:
            raise ValueError("⚠️ Les identifiants Instagram ne sont pas configurés dans le .env")
            
        self.client = Client()
        
        # Configuration des délais (anti-spam Instagrapi)
        self.client.delay_range = [2, 5]
        
        self.login()

    def random_delay(self, min_sec=15, max_sec=45):
        """Délai aléatoire pour imiter un comportement humain (anti-bot)"""
        delay = random.uniform(min_sec, max_sec)
        logger.info(f"⏳ Pause anti-spam de {delay:.2f} secondes...")
        time.sleep(delay)

    def login(self):
        """Gère la connexion et la persistance de session."""
        try:
            if os.path.exists(SESSION_FILE):
                # Restauration de session
                self.client.load_settings(SESSION_FILE)
                self.client.login(IG_USERNAME, IG_PASSWORD)
                
                # Vérification que la session est toujours valide
                try:
                    self.client.get_timeline_feed()
                    logger.info("✅ Connexion réussie (session restaurée).")
                except Exception:
                    logger.warning("⚠️ Session expirée. Reconnexion...")
                    # Si échoué, on relog classique
                    self.client.login(IG_USERNAME, IG_PASSWORD, relogin=True)
                    self.client.dump_settings(SESSION_FILE)
                    logger.info("✅ Reconnexion réussie (nouvelle session sauvegardée).")
            else:
                # Première connexion
                logger.info("🔑 Première connexion. Création de session...")
                self.client.login(IG_USERNAME, IG_PASSWORD)
                self.client.dump_settings(SESSION_FILE)
                logger.info("✅ Connexion réussie et session sauvegardée.")
        except Exception as e:
            logger.error(f"❌ Erreur critique de connexion : {e}")
            raise

    def post_photo(self, image_path: str, caption: str):
        """Publie une image simple."""
        try:
            self.random_delay(15, 30)
            self.client.photo_upload(image_path, caption)
            logger.info(f"✅ Post publié : {image_path}")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur de publication photo : {e}")
            return False

    def post_reel(self, video_path: str, caption: str, thumbnail_path: str = None):
        """Publie un Reel (Le format phare)."""
        try:
            self.random_delay(20, 45)
            # Instagrapi upload de reel
            self.client.clip_upload(video_path, caption, thumbnail=thumbnail_path)
            logger.info(f"✅ Reel publié : {video_path}")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur de publication Reel : {e}")
            return False

    def post_carousel(self, image_paths: list, caption: str):
        """Publie un carrousel (Album)."""
        try:
            self.random_delay(15, 35)
            self.client.album_upload(image_paths, caption)
            logger.info(f"✅ Carrousel publié avec {len(image_paths)} slides.")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur de publication carrousel : {e}")
            return False

    def post_story(self, image_path: str):
        """Publie une photo en Story."""
        try:
            self.random_delay(5, 15)
            self.client.photo_upload_to_story(image_path)
            logger.info(f"✅ Story publiée : {image_path}")
            return True
        except Exception as e:
            logger.error(f"❌ Erreur de publication Story : {e}")
            return False
