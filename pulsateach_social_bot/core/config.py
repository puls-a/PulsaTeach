import os
from dotenv import load_dotenv

load_dotenv()

# Mode Test (si True, n'envoie rien sur les réseaux)
DRY_RUN = os.getenv("DRY_RUN", "True").lower() in ("true", "1", "yes")
BOT_VERSION = "3.0.0"

# IA
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# X (Twitter) via Playwright (Contournement de l'API payante)
X_COOKIES_FILE = os.getenv("X_COOKIES_FILE", "data/x_cookies.json")
X_ENABLED = os.getenv("X_ENABLED", "True").lower() in ("true", "1", "yes")
X_DAILY_LIMIT = int(os.getenv("X_DAILY_LIMIT", "3"))
X_MIN_MINUTES_BETWEEN_POSTS = int(os.getenv("X_MIN_MINUTES_BETWEEN_POSTS", "90"))

# Instagram
IG_USERNAME = os.getenv("IG_USERNAME")
IG_PASSWORD = os.getenv("IG_PASSWORD")
IG_SESSION_FILE = "data/ig_session.json"
INSTAGRAM_ENABLED = os.getenv("INSTAGRAM_ENABLED", "False").lower() in ("true", "1", "yes")
INSTAGRAM_DAILY_LIMIT = int(os.getenv("INSTAGRAM_DAILY_LIMIT", "2"))

# TikTok
TIKTOK_COOKIES_FILE = os.getenv("TIKTOK_COOKIES_FILE", "data/tiktok_cookies.txt")
TIKTOK_PROXY = os.getenv("TIKTOK_PROXY")
TIKTOK_ENABLED = os.getenv("TIKTOK_ENABLED", "False").lower() in ("true", "1", "yes")
TIKTOK_DAILY_LIMIT = int(os.getenv("TIKTOK_DAILY_LIMIT", "2"))

# Global
URL_PULSATEACH = os.getenv("URL_PULSATEACH", "https://pulsateach.vercel.app")
UTM_SOURCE = os.getenv("UTM_SOURCE", "x")
UTM_MEDIUM = os.getenv("UTM_MEDIUM", "social")
UTM_CAMPAIGN = os.getenv("UTM_CAMPAIGN", "organic_growth")
LOG_FILE = "data/social_bot.log"
QUEUE_FILE = "data/queue.json"
HISTORY_FILE = "data/history.json"
FAILED_FILE = "data/failed.json"
METRICS_FILE = "data/metrics.json"
QUALITY_FILE = "data/quality_reports.json"
CONTENT_PLAN_FILE = "data/content_plan.json"
SYSTEM_HEALTH_FILE = "data/system_health.json"

PLATFORM_ENABLED = {
    "x": X_ENABLED,
    "instagram": INSTAGRAM_ENABLED,
    "tiktok": TIKTOK_ENABLED,
}

PLATFORM_DAILY_LIMITS = {
    "x": X_DAILY_LIMIT,
    "instagram": INSTAGRAM_DAILY_LIMIT,
    "tiktok": TIKTOK_DAILY_LIMIT,
}


def tracked_url(platform: str = "x", campaign: str | None = None):
    campaign_name = campaign or UTM_CAMPAIGN
    return (
        f"{URL_PULSATEACH}?utm_source={platform}"
        f"&utm_medium={UTM_MEDIUM}&utm_campaign={campaign_name}"
    )
