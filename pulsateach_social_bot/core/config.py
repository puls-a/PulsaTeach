import os
from dotenv import load_dotenv

load_dotenv()

# Mode Test (si True, n'envoie rien sur les réseaux)
DRY_RUN = os.getenv("DRY_RUN", "True").lower() in ("true", "1", "yes")

# IA
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# X (Twitter) via Playwright (Contournement de l'API payante)
X_COOKIES_FILE = os.getenv("X_COOKIES_FILE", "data/x_cookies.json")

# Instagram
IG_USERNAME = os.getenv("IG_USERNAME")
IG_PASSWORD = os.getenv("IG_PASSWORD")
IG_SESSION_FILE = "data/ig_session.json"

# TikTok
TIKTOK_COOKIES_FILE = os.getenv("TIKTOK_COOKIES_FILE", "data/tiktok_cookies.txt")
TIKTOK_PROXY = os.getenv("TIKTOK_PROXY")

# Global
URL_PULSATEACH = os.getenv("URL_PULSATEACH", "https://pulsateach.vercel.app")
LOG_FILE = "data/social_bot.log"
QUEUE_FILE = "data/queue.json"
HISTORY_FILE = "data/history.json"
