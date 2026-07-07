import logging
from typing import Optional

import tweepy

from config import BotConfig


class XClient:
    def __init__(self, config: BotConfig):
        self.config = config
        self.client: Optional[tweepy.Client] = None
        if not config.dry_run:
            self._validate_credentials()
            self.client = tweepy.Client(
                bearer_token=config.bearer_token,
                consumer_key=config.api_key,
                consumer_secret=config.api_secret,
                access_token=config.access_token,
                access_token_secret=config.access_token_secret,
                wait_on_rate_limit=True,
            )

    def _validate_credentials(self) -> None:
        missing = [
            name
            for name, value in {
                "X_API_KEY": self.config.api_key,
                "X_API_SECRET": self.config.api_secret,
                "X_ACCESS_TOKEN": self.config.access_token,
                "X_ACCESS_TOKEN_SECRET": self.config.access_token_secret,
                "X_BEARER_TOKEN": self.config.bearer_token,
            }.items()
            if not value
        ]
        if missing:
            raise RuntimeError(f"Missing X credentials: {', '.join(missing)}")

    def create_tweet(self, text: str, reply_to_tweet_id: Optional[str] = None) -> Optional[str]:
        if self.config.dry_run:
            logging.info("DRY RUN tweet%s:\n%s", f" reply_to={reply_to_tweet_id}" if reply_to_tweet_id else "", text)
            return None
        assert self.client is not None
        response = self.client.create_tweet(text=text, in_reply_to_tweet_id=reply_to_tweet_id)
        tweet_id = str(response.data["id"])
        logging.info("Published tweet id=%s", tweet_id)
        return tweet_id

    def get_my_user_id(self) -> Optional[str]:
        if self.config.dry_run:
            return None
        assert self.client is not None
        user = self.client.get_user(username=self.config.account_username)
        return str(user.data.id) if user and user.data else None

    def get_mentions(self, user_id: str, since_id: str = "", max_results: int = 10):
        if self.config.dry_run:
            logging.info("DRY RUN mentions lookup skipped")
            return []
        assert self.client is not None
        kwargs = {"max_results": max_results, "tweet_fields": ["author_id", "created_at", "conversation_id"]}
        if since_id:
            kwargs["since_id"] = since_id
        response = self.client.get_users_mentions(user_id, **kwargs)
        return list(response.data or [])
