import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [TikTokBot] - [%(levelname)s] - %(message)s",
    handlers=[
        logging.FileHandler("tiktok_bot.log", encoding="utf-8"),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("PulsaTeachTikTok")
