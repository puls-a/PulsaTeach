import json
import os
from datetime import datetime, timedelta

from core.config import FAILED_FILE, HISTORY_FILE, METRICS_FILE, PLATFORM_DAILY_LIMITS, QUALITY_FILE, X_MIN_MINUTES_BETWEEN_POSTS
from core.logger import get_logger

logger = get_logger("State")


def _load_json(path, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Erreur lecture {path}: {e}")
        return default


def _save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def today_key():
    return datetime.now().strftime("%Y-%m-%d")


def get_metrics():
    return _load_json(METRICS_FILE, {"by_day": {}, "totals": {}})


def increment_metric(platform: str, metric: str):
    data = get_metrics()
    day = today_key()
    data.setdefault("by_day", {}).setdefault(day, {}).setdefault(platform, {})
    data["by_day"][day][platform][metric] = data["by_day"][day][platform].get(metric, 0) + 1
    data.setdefault("totals", {}).setdefault(platform, {})
    data["totals"][platform][metric] = data["totals"][platform].get(metric, 0) + 1
    _save_json(METRICS_FILE, data)


def posts_today(platform: str) -> int:
    history = _load_json(HISTORY_FILE, [])
    today = today_key()
    return sum(1 for item in history if item.get("platform") == platform and item.get("posted_at", "").startswith(today))


def last_post_time(platform: str):
    history = [i for i in _load_json(HISTORY_FILE, []) if i.get("platform") == platform]
    if not history:
        return None
    latest = max(history, key=lambda x: x.get("posted_at", ""))
    try:
        return datetime.fromisoformat(latest["posted_at"])
    except Exception:
        return None


def can_publish(platform: str, forced: bool = False) -> tuple[bool, str]:
    limit = PLATFORM_DAILY_LIMITS.get(platform)
    if limit is not None and posts_today(platform) >= limit and not forced:
        return False, f"limite journaliere atteinte ({limit})"

    if platform == "x" and not forced:
        last = last_post_time(platform)
        if last and datetime.now() - last < timedelta(minutes=X_MIN_MINUTES_BETWEEN_POSTS):
            return False, f"intervalle minimum X non respecte ({X_MIN_MINUTES_BETWEEN_POSTS} min)"

    return True, "ok"


def add_failed(item: dict, reason: str):
    failed = _load_json(FAILED_FILE, [])
    record = dict(item or {})
    record["failed_at"] = datetime.now().isoformat()
    record["reason"] = reason
    failed.append(record)
    _save_json(FAILED_FILE, failed)
    increment_metric(record.get("platform", "unknown"), "failed")


def get_failed():
    return _load_json(FAILED_FILE, [])


def add_quality_report(platform: str, topic: str, report: dict):
    reports = _load_json(QUALITY_FILE, [])
    reports.append({
        "platform": platform,
        "topic": topic,
        "created_at": datetime.now().isoformat(),
        **(report or {}),
    })
    _save_json(QUALITY_FILE, reports[-300:])


def get_quality_reports():
    return _load_json(QUALITY_FILE, [])
