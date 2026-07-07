import json
import os
from datetime import datetime
from core.config import QUEUE_FILE, HISTORY_FILE
from core.logger import get_logger

logger = get_logger("QueueManager")

def _load_json(file_path, default):
    if not os.path.exists(file_path):
        return default
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Erreur lecture {file_path}: {e}")
        return default

def _save_json(file_path, data):
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Erreur écriture {file_path}: {e}")

# --- QUEUE (Posts en attente) ---

def get_queue():
    return _load_json(QUEUE_FILE, [])

def add_to_queue(platform: str, content_type: str, topic: str, media_path: str = None):
    queue = get_queue()
    new_item = {
        "id": int(datetime.now().timestamp() * 1000),
        "platform": platform,
        "type": content_type,
        "topic": topic,
        "media_path": media_path,
        "added_at": datetime.now().isoformat()
    }
    queue.append(new_item)
    _save_json(QUEUE_FILE, queue)
    logger.info(f"Ajouté à la file ({platform}) : {topic}")
    return new_item

def remove_from_queue(item_id: int):
    queue = get_queue()
    queue = [item for item in queue if item.get("id") != item_id]
    _save_json(QUEUE_FILE, queue)

def get_next_for_platform(platform: str):
    queue = get_queue()
    for item in queue:
        if item.get("platform") == platform:
            return item
    return None

# --- HISTORY (Anti-duplication) ---

def get_history():
    return _load_json(HISTORY_FILE, [])

def add_to_history(platform: str, topic: str):
    history = get_history()
    history.append({
        "platform": platform,
        "topic": topic,
        "posted_at": datetime.now().isoformat()
    })
    _save_json(HISTORY_FILE, history)

def is_duplicate(platform: str, topic: str):
    history = get_history()
    for item in history:
        # Simplification : vérification stricte du topic
        if item.get("platform") == platform and item.get("topic") == topic:
            return True
    return False
