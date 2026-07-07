import argparse
import logging
import random
import time
from datetime import datetime

import schedule

from config import DATA_DIR, LOG_DIR, load_config
from content.generator import generate_reply, generate_thread, generate_tip
from storage import BotStorage
from x_client import XClient


def configure_logging() -> None:
    LOG_DIR.mkdir(exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=[
            logging.FileHandler(LOG_DIR / "bot.log", encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )


def publish_unique_tip(client: XClient, storage: BotStorage, max_attempts: int = 20) -> None:
    for _ in range(max_attempts):
        post = generate_tip()
        if not storage.already_posted(post.text):
            client.create_tweet(post.text)
            if not client.config.dry_run:
                storage.record_post(post.kind, post.text)
            logging.info("Tip published track=%s", post.metadata.get("track"))
            return
    logging.warning("No fresh tip found after %s attempts", max_attempts)


def publish_thread(client: XClient, storage: BotStorage) -> None:
    posts = generate_thread()
    signature = "\n".join(post.text for post in posts)
    if storage.already_posted(signature):
        logging.info("Thread skipped because it was already posted")
        return

    reply_to = None
    for post in posts:
        reply_to = client.create_tweet(post.text, reply_to_tweet_id=reply_to)
        if not client.config.dry_run:
            storage.record_post(post.kind, post.text)
        time.sleep(3)
    if not client.config.dry_run:
        storage.record_post("thread_signature", signature)
    logging.info("Thread published with %s tweets", len(posts))


def handle_mentions(client: XClient, storage: BotStorage, max_replies: int) -> None:
    user_id = client.get_my_user_id()
    if not user_id:
        return
    since_id = storage.get_state("last_mention_id")
    mentions = client.get_mentions(user_id, since_id=since_id, max_results=max(5, max_replies))
    if not mentions:
        logging.info("No new mentions")
        return

    replied = 0
    newest_id = since_id
    for mention in sorted(mentions, key=lambda item: int(item.id)):
        newest_id = str(mention.id)
        if replied >= max_replies:
            continue
        reply = generate_reply(getattr(mention, "text", ""))
        if storage.already_posted(f"reply:{mention.id}:{reply.text}"):
            continue
        client.create_tweet(reply.text, reply_to_tweet_id=str(mention.id))
        if not client.config.dry_run:
            storage.record_post("reply", f"reply:{mention.id}:{reply.text}")
        replied += 1
        time.sleep(random.randint(5, 15))

    if newest_id:
        storage.set_state("last_mention_id", newest_id)
    logging.info("Replied to %s mention(s)", replied)


def run_scheduler(client: XClient, storage: BotStorage, config) -> None:
    for publish_time in config.daily_times:
        schedule.every().day.at(publish_time, config.timezone).do(publish_unique_tip, client=client, storage=storage)
        logging.info("Scheduled daily tip at %s", publish_time)

    for day in config.thread_days:
        job = getattr(schedule.every(), day, None)
        if job is None:
            logging.warning("Invalid thread day ignored: %s", day)
            continue
        job.at(config.thread_time, config.timezone).do(publish_thread, client=client, storage=storage)
        logging.info("Scheduled thread on %s at %s", day, config.thread_time)

    if config.enable_replies:
        schedule.every(2).hours.do(handle_mentions, client=client, storage=storage, max_replies=config.max_replies_per_run)
        logging.info("Scheduled mention replies every 2 hours")

    logging.info("Scheduler started at %s", datetime.now().isoformat(timespec="seconds"))
    while True:
        schedule.run_pending()
        time.sleep(30)


def main() -> None:
    parser = argparse.ArgumentParser(description="PulsaTeach X automation bot")
    parser.add_argument("--once", choices=["tip", "thread", "replies"], help="Run one action then exit")
    parser.add_argument("--daemon", action="store_true", help="Run scheduled jobs forever")
    args = parser.parse_args()

    configure_logging()
    config = load_config()
    storage = BotStorage(DATA_DIR / "bot.sqlite3")
    client = XClient(config)

    logging.info("Bot started dry_run=%s replies=%s", config.dry_run, config.enable_replies)

    if args.once == "tip":
        publish_unique_tip(client, storage)
    elif args.once == "thread":
        publish_thread(client, storage)
    elif args.once == "replies":
        handle_mentions(client, storage, config.max_replies_per_run)
    elif args.daemon:
        run_scheduler(client, storage, config)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
