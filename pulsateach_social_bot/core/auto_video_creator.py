import os
import random
import asyncio
from core.logger import get_logger

# edge-tts pour générer la voix
import edge_tts

# moviepy pour assembler le tout
try:
    from moviepy.editor import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip
    HAS_MOVIEPY = True
except ImportError:
    HAS_MOVIEPY = False

logger = get_logger("AutoVideoCreator")

B_ROLL_DIR = "assets/b_rolls"
PROCESSED_DIR = "assets/processed_videos"
TEMP_AUDIO = "assets/temp_audio.mp3"

# On s'assure que les dossiers existent
os.makedirs(B_ROLL_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

async def _generate_audio(text: str, output_path: str):
    """Utilise edge-tts pour générer une voix fluide (Voix de 'Denise' en Français)"""
    logger.info("🎙️ Génération de la voix IA (edge-tts)...")
    voice = "fr-FR-DeniseNeural" # Voix très naturelle souvent utilisée sur TikTok FR
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    logger.info("✅ Audio généré avec succès.")

def create_faceless_video(topic: str, hook_text: str, body_text: str) -> str:
    """
    Crée une vidéo complète: B-Roll aléatoire + Voix IA + Texte à l'écran.
    Retourne le chemin vers la vidéo finale.
    """
    if not HAS_MOVIEPY:
        logger.error("❌ MoviePy n'est pas installé ou mal configuré.")
        return None

    # 1. Sélectionner un B-Roll au hasard
    b_rolls = [f for f in os.listdir(B_ROLL_DIR) if f.endswith(('.mp4', '.mov'))]
    if not b_rolls:
        logger.warning(f"⚠️ Aucun B-Roll trouvé dans {B_ROLL_DIR}. Mets quelques vidéos .mp4 dedans !")
        return None
        
    selected_broll = os.path.join(B_ROLL_DIR, random.choice(b_rolls))
    logger.info(f"🎞️ B-Roll sélectionné : {selected_broll}")

    # 2. Générer l'audio avec le texte de la vidéo (Hook + Body)
    spoken_text = f"{hook_text}. {body_text}"
    
    # On exécute la fonction asynchrone edge-tts
    try:
        asyncio.run(_generate_audio(spoken_text, TEMP_AUDIO))
    except Exception as e:
        logger.error(f"❌ Erreur lors de la génération de l'audio : {e}")
        return None

    if not os.path.exists(TEMP_AUDIO):
        return None

    # 3. Assemblage Video + Audio + Texte
    try:
        logger.info("🎬 Montage vidéo en cours...")
        audio_clip = AudioFileClip(TEMP_AUDIO)
        video_clip = VideoFileClip(selected_broll)
        
        # Si la vidéo est plus courte que l'audio, on la fait boucler (loop)
        if video_clip.duration < audio_clip.duration:
            import moviepy.video.fx.all as vfx
            video_clip = video_clip.fx(vfx.loop, duration=audio_clip.duration)
        else:
            # Sinon on la coupe à la durée de l'audio
            video_clip = video_clip.subclip(0, audio_clip.duration)
            
        # Ajouter l'audio généré à la vidéo
        video_clip = video_clip.set_audio(audio_clip)
        
        # Ajouter le texte d'accroche (Hook) au centre
        txt_clip = TextClip(hook_text, fontsize=70, color='white', font='Arial-Bold', stroke_color='black', stroke_width=2)
        # On l'affiche pendant les 4 premières secondes ou la durée de la vidéo si elle est plus courte
        txt_duration = min(4, video_clip.duration)
        txt_clip = txt_clip.set_position(('center', 'center')).set_duration(txt_duration)
        
        final_video = CompositeVideoClip([video_clip, txt_clip])
        
        # Sauvegarde
        output_filename = f"tiktok_auto_{int(time.time())}.mp4"
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        logger.info(f"⏳ Rendu de la vidéo finale : {output_path} (cela peut prendre un peu de temps)")
        final_video.write_videofile(output_path, codec="libx264", audio_codec="aac", logger=None)
        
        # Libérer les ressources
        audio_clip.close()
        video_clip.close()
        final_video.close()
        
        # Nettoyer l'audio temporaire
        if os.path.exists(TEMP_AUDIO):
            os.remove(TEMP_AUDIO)
            
        logger.info("🎉 Vidéo montée et prête à être publiée !")
        return output_path
        
    except Exception as e:
        logger.error(f"❌ Erreur lors du montage vidéo : {e}")
        return None
