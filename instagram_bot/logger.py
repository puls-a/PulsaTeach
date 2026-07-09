import logging
import sys

# Configuration du logger pour garder une trace détaillée des actions (anti-spam, erreurs, etc.)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(message)s",
    handlers=[
        logging.FileHandler("bot.log", encoding="utf-8"),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("PulsaTeachBot")
