import time
import random
import os
from tiktok_uploader.upload import upload_video
from core.config import TIKTOK_COOKIES_FILE, TIKTOK_PROXY, DRY_RUN
from core.logger import get_logger

# Import optionnel de moviepy pour l'incrustation de texte
try:
    from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
    HAS_MOVIEPY = True
except ImportError:
    HAS_MOVIEPY = False

logger = get_logger("TikTok_Client")

class TikTokBot:
    def __init__(self):
        self.dry_run = DRY_RUN
        self.cookies = TIKTOK_COOKIES_FILE
        self.proxy = TIKTOK_PROXY
        
        if not self.dry_run and not os.path.exists(self.cookies):
            logger.warning(f"⚠️ Fichier de cookies TikTok introuvable ({self.cookies}). Upload impossible hors dry-run.")

    def add_hook_text(self, input_path: str, output_path: str, text: str):
        """Incruste un hook textuel sur la vidéo si moviepy est dispo."""
        if not HAS_MOVIEPY:
            logger.warning("MoviePy non disponible. Hook ignoré.")
            return input_path
            
        try:
            logger.info(f"🎬 Édition TikTok : Ajout du Hook '{text}'")
            video = VideoFileClip(input_path)
            txt_clip = TextClip(text, fontsize=65, color='white', font='Arial-Bold', stroke_color='black', stroke_width=2)
            txt_clip = txt_clip.set_position(('center', 'center')).set_duration(min(5, video.duration))
            result = CompositeVideoClip([video, txt_clip])
            result.write_videofile(output_path, codec="libx264", audio_codec="aac", logger=None)
            video.close()
            result.close()
            return output_path
        except Exception as e:
            logger.error(f"❌ Erreur édition vidéo: {e}")
            return input_path

    def post(self, video_path: str, caption: str, hook_text: str = None):
        final_video = video_path
        
        if hook_text and not self.dry_run:
            processed_path = f"assets/processed_videos/tk_{os.path.basename(video_path)}"
            final_video = self.add_hook_text(video_path, processed_path, hook_text)

        if self.dry_run:
            logger.info(f"[DRY-RUN TikTok] Vidéo {final_video}\nHook: {hook_text}\nCaption: {caption}")
            return True

        try:
            logger.info(f"📤 Upload TikTok : {final_video}")
            delay = random.uniform(5, 15)
            time.sleep(delay)
            
            options = {
                'cookies': self.cookies,
                'description': caption,
                'headless': True
            }
            if self.proxy:
                options['proxy'] = {'server': self.proxy}

            upload_video(final_video, **options)
            logger.info("✅ TikTok publié avec succès !")
            
            # Clean up
            if final_video != video_path and os.path.exists(final_video):
                os.remove(final_video)
            return True
        except Exception as e:
            logger.error(f"❌ Erreur Upload TikTok: {e}")
            return False
