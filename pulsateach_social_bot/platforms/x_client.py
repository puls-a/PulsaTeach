import json
import os
import random
import time

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright

from core.config import DRY_RUN, X_COOKIES_FILE
from core.logger import get_logger

logger = get_logger("X_Client_Playwright")


class XBot:
    def __init__(self):
        self.dry_run = DRY_RUN
        self.cookies_file = X_COOKIES_FILE

        if not self.dry_run and not os.path.exists(self.cookies_file):
            logger.warning(f"Fichier de cookies X introuvable ({self.cookies_file}).")

    def _load_cookies(self):
        with open(self.cookies_file, "r", encoding="utf-8") as f:
            cookies = json.load(f)

        valid_samesite = {"Strict", "Lax", "None"}
        cleaned = []
        for cookie in cookies:
            cookie = dict(cookie)
            if cookie.get("sameSite") not in valid_samesite:
                cookie.pop("sameSite", None)
            cleaned.append(cookie)
        return cleaned

    def _type_like_human(self, page, text: str):
        page.keyboard.type(text, delay=random.randint(12, 28))
        time.sleep(random.uniform(0.8, 1.5))

    def _wait_post_sent(self, page, timeout_ms: int = 15000) -> bool:
        try:
            page.locator('[data-testid="toast"]').filter(
                has_text="sent"
            ).first.wait_for(timeout=timeout_ms)
            return True
        except PlaywrightTimeoutError:
            pass

        try:
            page.locator('[data-testid="toast"]').filter(
                has_text="envoye"
            ).first.wait_for(timeout=3000)
            return True
        except PlaywrightTimeoutError:
            return False

    def _compose_and_send(self, page, text: str) -> bool:
        page.goto("https://x.com/compose/post", timeout=60000)
        page.wait_for_selector('div[data-testid="tweetTextarea_0"]', timeout=30000)
        time.sleep(random.uniform(1.5, 2.5))
        page.click('div[data-testid="tweetTextarea_0"]')
        self._type_like_human(page, text)

        button = page.locator('[data-testid="tweetButton"]').first
        if not button.is_enabled():
            logger.error("Bouton de publication X desactive. Texte probablement invalide ou trop long.")
            return False

        button.click(force=True)
        sent = self._wait_post_sent(page)
        if not sent:
            page.screenshot(path="assets/x_post_failed.png", full_page=True)
            logger.error("X n'a pas confirme l'envoi du post principal. Screenshot: assets/x_post_failed.png")
        return sent

    def _open_sent_post_from_toast(self, page) -> bool:
        try:
            toast = page.locator('[data-testid="toast"]').first
            view_link = toast.get_by_text("View", exact=False)
            if view_link.count() > 0:
                view_link.first.click(timeout=5000)
                page.wait_for_load_state("domcontentloaded", timeout=15000)
                return True
        except Exception:
            pass

        try:
            toast = page.locator('[data-testid="toast"]').first
            voir_link = toast.get_by_text("Voir", exact=False)
            if voir_link.count() > 0:
                voir_link.first.click(timeout=5000)
                page.wait_for_load_state("domcontentloaded", timeout=15000)
                return True
        except Exception:
            pass

        logger.warning("Impossible d'ouvrir le post depuis le toast. Le post principal est quand meme envoye.")
        return False

    def _reply_to_current_post(self, page, reply_text: str) -> bool:
        try:
            page.locator('[data-testid="reply"]').first.click(timeout=10000)
            page.wait_for_selector('div[data-testid="tweetTextarea_0"]', timeout=15000)
            page.click('div[data-testid="tweetTextarea_0"]')
            self._type_like_human(page, reply_text)

            button = page.locator('[data-testid="tweetButton"]').first
            if not button.is_enabled():
                logger.error("Bouton de reponse X desactive.")
                return False
            button.click(force=True)

            sent = self._wait_post_sent(page)
            if not sent:
                page.screenshot(path="assets/x_reply_failed.png", full_page=True)
                logger.error("X n'a pas confirme l'envoi de la reponse. Screenshot: assets/x_reply_failed.png")
            return sent
        except Exception as e:
            page.screenshot(path="assets/x_reply_exception.png", full_page=True)
            logger.error(f"Erreur pendant la reponse X: {e}")
            return False

    def post_value_with_reply(self, main_post: str, reply: str | None = None) -> bool:
        if self.dry_run:
            logger.info(f"[DRY-RUN X] Post principal:\n{main_post}")
            if reply:
                logger.info(f"[DRY-RUN X] Reponse:\n{reply}")
            return True

        if not os.path.exists(self.cookies_file):
            logger.error("Fichier de cookies manquant pour X.")
            return False

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                context = browser.new_context()
                context.add_cookies(self._load_cookies())
                page = context.new_page()

                logger.info("Publication X: post principal sans lien...")
                main_sent = self._compose_and_send(page, main_post)
                if not main_sent:
                    browser.close()
                    return False

                reply_sent = True
                if reply:
                    opened = self._open_sent_post_from_toast(page)
                    if opened:
                        logger.info("Publication X: reponse avec lien...")
                        reply_sent = self._reply_to_current_post(page, reply)
                    else:
                        reply_sent = False

                browser.close()
                return main_sent and reply_sent
        except Exception as e:
            logger.error(f"Erreur critique Playwright sur X: {e}")
            return False

    def post_thread(self, tweets: list, media_path: str = None, poll_options: list = None):
        main_post = tweets[0] if tweets else ""
        reply = tweets[1] if len(tweets) > 1 else None
        return self.post_value_with_reply(main_post, reply)
