import hashlib
import sqlite3
from pathlib import Path


class BotStorage:
    def __init__(self, path: Path):
        self.path = path
        self.path.parent.mkdir(exist_ok=True)
        self.connection = sqlite3.connect(self.path)
        self.connection.execute(
            "CREATE TABLE IF NOT EXISTS posts (hash TEXT PRIMARY KEY, kind TEXT NOT NULL, text TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
        )
        self.connection.execute(
            "CREATE TABLE IF NOT EXISTS state (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
        )
        self.connection.commit()

    @staticmethod
    def hash_text(text: str) -> str:
        normalized = " ".join(text.lower().split())
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()

    def already_posted(self, text: str) -> bool:
        post_hash = self.hash_text(text)
        row = self.connection.execute("SELECT 1 FROM posts WHERE hash = ?", (post_hash,)).fetchone()
        return row is not None

    def record_post(self, kind: str, text: str) -> None:
        post_hash = self.hash_text(text)
        self.connection.execute(
            "INSERT OR IGNORE INTO posts (hash, kind, text) VALUES (?, ?, ?)",
            (post_hash, kind, text),
        )
        self.connection.commit()

    def get_state(self, key: str, default: str = "") -> str:
        row = self.connection.execute("SELECT value FROM state WHERE key = ?", (key,)).fetchone()
        return row[0] if row else default

    def set_state(self, key: str, value: str) -> None:
        self.connection.execute("INSERT OR REPLACE INTO state (key, value) VALUES (?, ?)", (key, value))
        self.connection.commit()
