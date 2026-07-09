import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
PROXY_URL = os.getenv("PROXY_URL")
COOKIES_FILE = os.getenv("COOKIES_FILE", "cookies/tiktok_cookies.txt")

# Configuration de base
URL_PULSATEACH = "https://pulsateach.vercel.app"
