import time
import random
import json
import os
from playwright.sync_api import sync_playwright
from core.config import X_COOKIES_FILE, DRY_RUN
from core.logger import get_logger

logger = get_logger("X_Client_Playwright")

class XBot:
    def __init__(self):
        self.dry_run = DRY_RUN
        self.cookies_file = X_COOKIES_FILE
        
        if not self.dry_run and not os.path.exists(self.cookies_file):
            logger.warning(f"⚠️ Fichier de cookies X introuvable ({self.cookies_file}). Le bot ne pourra pas tweeter.")

    def post_thread(self, tweets: list, media_path: str = None, poll_options: list = None):
        if not tweets:
            logger.error("❌ La liste des tweets est vide.")
            return False

        if self.dry_run:
            logger.info(f"[DRY-RUN X] Mega-Thread simulé ({len(tweets)} tweets) :\n" + "\n---\n".join(tweets))
            if poll_options:
                logger.info(f"[DRY-RUN X] Sondage inclus : {poll_options}")
            return True

        if not os.path.exists(self.cookies_file):
            logger.error("❌ Fichier de cookies manquant pour X.")
            return False

        try:
            logger.info(f"🤖 Lancement de Playwright pour un Thread de {len(tweets)} tweets...")
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                context = browser.new_context()
                
                try:
                    with open(self.cookies_file, 'r', encoding='utf-8') as f:
                        cookies = json.load(f)
                    
                    valid_samesite = ["Strict", "Lax", "None"]
                    for cookie in cookies:
                        if "sameSite" in cookie and cookie["sameSite"] not in valid_samesite:
                            del cookie["sameSite"]
                                
                    context.add_cookies(cookies)
                except Exception as e:
                    logger.error(f"❌ Erreur cookies X : {e}")
                    browser.close()
                    return False
                
                page = context.new_page()
                page.goto("https://x.com/compose/tweet", timeout=60000)
                
                logger.info("⏳ Attente de l'interface X...")
                page.wait_for_selector('div[data-testid="tweetTextarea_0"]', timeout=30000)
                time.sleep(random.uniform(2, 3))
                
                for i, text in enumerate(tweets):
                    logger.info(f"✍️ Rédaction du Tweet {i+1}/{len(tweets)}...")
                    
                    if i > 0:
                        logger.info("➕ Ajout d'un tweet au thread...")
                        page.click('[data-testid="addTweetButton"]')
                        time.sleep(random.uniform(1, 2))

                    textarea_selector = f'div[data-testid="tweetTextarea_{i}"]'
                    page.click(textarea_selector)
                    time.sleep(0.5)
                    page.keyboard.type(text, delay=20)
                    time.sleep(random.uniform(1, 2))
                    
                    # Ajout de l'image uniquement sur le PREMIER tweet
                    if i == 0 and media_path and os.path.exists(media_path):
                        logger.info(f"📸 Upload du média : {media_path}")
                        page.set_input_files('input[data-testid="fileInput"]', media_path)
                        time.sleep(random.uniform(2, 4))
                        
                    # Ajout du SONDAGE uniquement sur le PREMIER tweet
                    if i == 0 and poll_options and isinstance(poll_options, list) and len(poll_options) >= 2:
                        logger.info(f"📊 Création du sondage : {poll_options}")
                        page.click('[data-testid="createPollButton"]')
                        time.sleep(1)
                        # Remplissage des options du sondage (max 4 sur X)
                        for j, option in enumerate(poll_options[:4]):
                            if j >= 2:
                                # Il faut cliquer sur "+" pour ajouter l'option 3 et 4
                                page.click('[data-testid="addPollChoice"]')
                                time.sleep(0.5)
                            page.fill(f'input[name="Choice{j+1}"]', option)
                        time.sleep(1)

                logger.info("🖱️ Clic sur le bouton de publication finale...")
                page.click('[data-testid="tweetButton"]')
                
                time.sleep(random.uniform(5, 8))
                logger.info("✅ Mega-Thread publié avec succès !")
                browser.close()
                return True
                
        except Exception as e:
            logger.error(f"❌ Erreur critique Playwright sur X : {e}")
            return False
