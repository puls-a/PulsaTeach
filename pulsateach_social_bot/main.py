import threading
import sys
from core.logger import get_logger
from core.scheduler import run_scheduler, process_queue_for_platform

logger = get_logger("MainApp")

if __name__ == "__main__":
    logger.info("🤖 Démarrage de PulsaTeach Social Bot (Mode Headless)")
    
    # Si on lance avec un argument, on peut forcer une exécution immédiate
    # ex: python main.py force tiktok
    if len(sys.argv) > 1 and sys.argv[1] == "force":
        platform = sys.argv[2] if len(sys.argv) > 2 else "x"
        logger.info(f"⚡ Exécution forcée pour {platform}")
        process_queue_for_platform(platform)
    else:
        # Lancement classique du scheduler bloquant
        try:
            run_scheduler()
        except KeyboardInterrupt:
            logger.info("🛑 Arrêt du bot demandé par l'utilisateur.")
            sys.exit(0)
