import json
import os
from datetime import datetime

from core.config import HISTORY_FILE, QUEUE_FILE
from core.logger import get_logger

logger = get_logger("QueueManager")


def _load_json(file_path, default):
    if not os.path.exists(file_path):
        return default
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except UnicodeDecodeError:
        logger.error(f"Encodage invalide pour {file_path}. Reinitialisation securisee.")
        return default
    except Exception as e:
        logger.error(f"Erreur lecture {file_path}: {e}")
        return default


def _save_json(file_path, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_queue(status: str = "pending"):
    items = _load_json(QUEUE_FILE, [])
    if status is None:
        return items
    return [item for item in items if item.get("status", "pending") == status]


def add_to_queue(platform: str, content_type: str, topic: str, media_path: str = None, priority: int = 5, metadata: dict | None = None):
    queue = get_queue(status=None)
    new_item = {
        "id": int(datetime.now().timestamp() * 1000),
        "platform": platform,
        "type": content_type,
        "topic": topic.strip(),
        "media_path": media_path or None,
        "priority": priority,
        "status": "pending",
        "attempts": 0,
        "metadata": metadata or {},
        "added_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }
    queue.append(new_item)
    _save_json(QUEUE_FILE, queue)
    logger.info(f"Ajoute a la file ({platform}) : {topic}")
    return new_item


def update_queue_item(item_id: int, **updates):
    queue = get_queue(status=None)
    for item in queue:
        if item.get("id") == item_id:
            item.update(updates)
            item["updated_at"] = datetime.now().isoformat()
            break
    _save_json(QUEUE_FILE, queue)


def remove_from_queue(item_id: int):
    queue = [item for item in get_queue(status=None) if item.get("id") != item_id]
    _save_json(QUEUE_FILE, queue)


def _is_due(item: dict) -> bool:
    scheduled_at = (item.get("metadata") or {}).get("scheduled_at") or item.get("scheduled_at")
    if not scheduled_at:
        return True
    try:
        return datetime.fromisoformat(scheduled_at) <= datetime.now()
    except Exception:
        return True


def get_next_for_platform(platform: str, include_future: bool = False):
    candidates = [item for item in get_queue() if item.get("platform") == platform]
    if not include_future:
        candidates = [item for item in candidates if _is_due(item)]
    if not candidates:
        return None
    return sorted(candidates, key=lambda item: (-int(item.get("priority", 5)), item.get("added_at", "")))[0]


def mark_attempt(item_id: int):
    queue = get_queue(status=None)
    for item in queue:
        if item.get("id") == item_id:
            item["attempts"] = int(item.get("attempts", 0)) + 1
            item["updated_at"] = datetime.now().isoformat()
            break
    _save_json(QUEUE_FILE, queue)


def get_history():
    return _load_json(HISTORY_FILE, [])


def add_to_history(platform: str, topic: str, content: dict | None = None):
    history = get_history()
    history.append({
        "platform": platform,
        "topic": topic,
        "content": content or {},
        "posted_at": datetime.now().isoformat(),
    })
    _save_json(HISTORY_FILE, history)


def normalize_topic(topic: str) -> str:
    return " ".join((topic or "").lower().strip().split())


def is_duplicate(platform: str, topic: str):
    normalized = normalize_topic(topic)
    for item in get_history():
        if item.get("platform") == platform and normalize_topic(item.get("topic")) == normalized:
            return True
    return False
