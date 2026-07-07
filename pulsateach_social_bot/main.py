import sys
import json

from core.health import run_health_check
from core.logger import get_logger
from core.planner import build_x_plan
from core.scheduler import run_scheduler, process_queue_for_platform

logger = get_logger("MainApp")

if __name__ == "__main__":
    logger.info("🤖 Démarrage de PulsaTeach Social Bot (Mode Headless)")
    
    if len(sys.argv) > 1 and sys.argv[1] == "health":
        print(json.dumps(run_health_check(), ensure_ascii=False, indent=2))
    elif len(sys.argv) > 1 and sys.argv[1] == "plan-x":
        days = int(sys.argv[2]) if len(sys.argv) > 2 else 7
        posts_per_day = int(sys.argv[3]) if len(sys.argv) > 3 else 2
        plan = build_x_plan(days=days, posts_per_day=posts_per_day)
        print(json.dumps({"created": len(plan), "days": days, "posts_per_day": posts_per_day}, ensure_ascii=False, indent=2))
    elif len(sys.argv) > 1 and sys.argv[1] == "deploy-post":
        from core.queue_manager import add_to_queue

        topic = "Nouvelle amélioration PulsaTeach déployée pour aider les débutants à apprendre le dev web plus efficacement"
        add_to_queue("x", "post", topic, priority=10, metadata={"source": "deploy_post"})
        logger.info("🚀 Post de déploiement ajouté à la queue X")
        process_queue_for_platform("x", forced=True)
    # Si on lance avec un argument, on peut forcer une exécution immédiate
    # ex: python main.py force tiktok
    elif len(sys.argv) > 1 and sys.argv[1] == "force":
        platform = sys.argv[2] if len(sys.argv) > 2 else "x"
        logger.info(f"⚡ Exécution forcée pour {platform}")
        process_queue_for_platform(platform, forced=True)
    else:
        # Lancement classique du scheduler bloquant
        try:
            run_scheduler()
        except KeyboardInterrupt:
            logger.info("🛑 Arrêt du bot demandé par l'utilisateur.")
            sys.exit(0)
