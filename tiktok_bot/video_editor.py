import os
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
from logger import logger

def add_hook_to_video(input_path: str, output_path: str, text: str):
    """
    Incruste le texte d'accroche (hook) généré par l'IA au centre de la vidéo.
    Idéal pour retenir l'attention dans les 3 premières secondes.
    """
    try:
        logger.info(f"🎬 Édition de la vidéo : Ajout du texte '{text}'")
        
        # Charge la vidéo source
        video = VideoFileClip(input_path)
        
        # Configure le texte (Nécessite ImageMagick installé sur le serveur/PC)
        # Style TikTok classique: texte blanc, fond noir transparent ou contour
        txt_clip = TextClip(
            text, 
            fontsize=65, 
            color='white', 
            font='Arial-Bold',
            stroke_color='black',
            stroke_width=2,
            method='caption',
            size=(video.w * 0.8, None) # 80% de la largeur de l'écran
        )
        
        # Positionne le texte au centre, et l'affiche pendant toute la vidéo (ou juste 3s)
        # Ici on l'affiche pendant 5 secondes pour maximiser la rétention
        duration = min(5, video.duration)
        txt_clip = txt_clip.set_position(('center', 'center')).set_duration(duration)
        
        # Superpose le texte sur la vidéo
        result = CompositeVideoClip([video, txt_clip])
        
        # Exporte la nouvelle vidéo
        result.write_videofile(
            output_path, 
            codec="libx264", 
            audio_codec="aac", 
            temp_audiofile="temp-audio.m4a", 
            remove_temp=True,
            logger=None # Désactive les logs verbeux de moviepy
        )
        
        # Ferme les ressources
        video.close()
        result.close()
        
        logger.info(f"✅ Vidéo générée avec succès : {output_path}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Erreur lors de l'édition vidéo (ImageMagick est-il installé ?) : {e}")
        return False
