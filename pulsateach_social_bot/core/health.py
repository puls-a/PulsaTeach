import json
import os
from datetime import datetime

from core.config import DRY_RUN, GEMINI_API_KEY, PLATFORM_ENABLED, SYSTEM_HEALTH_FILE, TIKTOK_COOKIES_FILE, X_COOKIES_FILE


def run_health_check():
    checks = []

    def add(name, ok, detail=""):
        checks.append({"name": name, "ok": bool(ok), "detail": detail})

    add("mode", True, "DRY_RUN active" if DRY_RUN else "PRODUCTION")
    add("gemini_key", bool(GEMINI_API_KEY), "GEMINI_API_KEY presente" if GEMINI_API_KEY else "cle manquante")
    add("x_enabled", PLATFORM_ENABLED.get("x", False), "X active" if PLATFORM_ENABLED.get("x") else "X desactive")
    add("x_cookies", os.path.exists(X_COOKIES_FILE), X_COOKIES_FILE)
    add("instagram_enabled", PLATFORM_ENABLED.get("instagram", False), "Instagram active" if PLATFORM_ENABLED.get("instagram") else "Instagram desactive")
    add("tiktok_enabled", PLATFORM_ENABLED.get("tiktok", False), "TikTok active" if PLATFORM_ENABLED.get("tiktok") else "TikTok desactive")
    add("tiktok_cookies", os.path.exists(TIKTOK_COOKIES_FILE), TIKTOK_COOKIES_FILE)
    add("data_dir", os.path.exists("data"), "data/")
    add("assets_dir", os.path.exists("assets"), "assets/")

    result = {
        "checked_at": datetime.now().isoformat(),
        "ok": all(c["ok"] for c in checks if c["name"] in ("gemini_key", "data_dir", "assets_dir")),
        "checks": checks,
    }

    os.makedirs(os.path.dirname(SYSTEM_HEALTH_FILE), exist_ok=True)
    with open(SYSTEM_HEALTH_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    return result


def get_last_health_check():
    if not os.path.exists(SYSTEM_HEALTH_FILE):
        return None
    try:
        with open(SYSTEM_HEALTH_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None
