import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = ROOT_DIR / "data"
LOG_DIR = ROOT_DIR / "logs"


@dataclass(frozen=True)
class BotConfig:
    api_key: str
    api_secret: str
    access_token: str
    access_token_secret: str
    bearer_token: str
    dry_run: bool
    timezone: str
    daily_times: list[str]
    thread_days: list[str]
    thread_time: str
    enable_replies: bool
    max_replies_per_run: int
    account_username: str


def _bool(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _csv(name: str, default: str) -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


def load_config() -> BotConfig:
    load_dotenv(ROOT_DIR / ".env")
    DATA_DIR.mkdir(exist_ok=True)
    LOG_DIR.mkdir(exist_ok=True)

    return BotConfig(
        api_key=os.getenv("X_API_KEY", ""),
        api_secret=os.getenv("X_API_SECRET", ""),
        access_token=os.getenv("X_ACCESS_TOKEN", ""),
        access_token_secret=os.getenv("X_ACCESS_TOKEN_SECRET", ""),
        bearer_token=os.getenv("X_BEARER_TOKEN", ""),
        dry_run=_bool("BOT_DRY_RUN", True),
        timezone=os.getenv("BOT_TIMEZONE", "Europe/Paris"),
        daily_times=_csv("BOT_DAILY_TIMES", "10:00,18:00"),
        thread_days=[day.lower() for day in _csv("BOT_THREAD_DAYS", "tuesday,thursday")],
        thread_time=os.getenv("BOT_THREAD_TIME", "11:30"),
        enable_replies=_bool("BOT_ENABLE_REPLIES", False),
        max_replies_per_run=int(os.getenv("BOT_MAX_REPLIES_PER_RUN", "3")),
        account_username=os.getenv("BOT_ACCOUNT_USERNAME", "pulsateach"),
    )
