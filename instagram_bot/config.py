import os
from dotenv import load_dotenv

load_dotenv()

IG_USERNAME = os.getenv("IG_USERNAME")
IG_PASSWORD = os.getenv("IG_PASSWORD")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Fichier utilisé pour sauvegarder la session Instagram
# CRITIQUE : Cela empêche les déconnexions/bans liés aux logins répétés
SESSION_FILE = "session.json"
