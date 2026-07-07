# 🚀 PulsaTeach Social Bot (Unified V1)

Un outil centralisé pour automatiser ta présence sur **X (Twitter), Instagram et TikTok** depuis une interface unique.

## 🌟 Fonctionnalités
- **Architecture unifiée** : Gère tes 3 réseaux depuis un seul projet Python.
- **Interface Web (Streamlit)** : Un dashboard complet pour voir tes stats, gérer ta file d'attente et tester les prompts IA.
- **Générateur IA contextuel** : Gemini adapte automatiquement le texte selon la plateforme (ex: Hook très court pour TikTok, Thread punchy pour X, Légende aérée + Hashtags pour Instagram).
- **Anti-Duplication** : Le bot se souvient des sujets déjà traités dans `data/history.json` et évite les reposts exacts.
- **Mode Dry-Run** : Parfait pour tester le planning sans rien publier publiquement.

---

## 🛠 Installation

1. **Prérequis** : Python 3.11+ et ImageMagick (pour l'édition vidéo TikTok).
2. **Installer les dépendances** :
   ```bash
   cd pulsateach_social_bot
   pip install -r requirements.txt
   playwright install  # Requis pour l'upload TikTok
   ```
3. **Configuration `.env`** :
   - Renomme `.env.example` en `.env`.
   - Remplis **absolument** la clé `GEMINI_API_KEY`.
   - Remplis tes identifiants de réseaux.
   - Si tu veux tester en toute sécurité, laisse `DRY_RUN=True`. Pour la prod, mets `DRY_RUN=False`.

---

## 🚀 Utilisation

Ce projet utilise 2 processus distincts pour une fiabilité maximale.

### 1. Le Dashboard Utilisateur (Streamlit)
C'est ton interface de gestion. Lance cette commande :
```bash
streamlit run app.py
```
*Ouvre ton navigateur sur `http://localhost:8501`. Tu pourras y ajouter tes idées de vidéos, générer des aperçus IA et voir les logs.*

### 2. Le Moteur de Publication (Scheduler Headless)
C'est le "cerveau" qui tourne en fond 24/7 et publie aux heures dites. Lance-le dans un autre terminal (ou via PM2/Screen sur un VPS) :
```bash
python main.py
```

*Note : Pour forcer une publication immédiate sans attendre l'heure prévue (pratique pour tester) :*
```bash
python main.py force tiktok
```

---

## 📅 Stratégie 30 Jours Intégrée

L'horaire de `core/scheduler.py` est optimisé pour les développeurs web francophones :
* **TikTok** : Matin (08:30) et Soir (18:30) ➔ Pour toucher les gens dans les transports ou après les cours/boulot.
* **X (Twitter)** : 3x par jour (10:00, 14:00, 20:00) ➔ Les tweets ont une durée de vie très courte, il faut spammer de la valeur.
* **Instagram** : 12:30 et 17:45 ➔ Parfait pour le format Carrousel (lecture longue).

**Quoi mettre dans le planificateur (Via l'onglet UI "Nouveau Post") :**
- **Semaine 1-2** : Fokus *Astuces courtes*. Sujets : `Centrer une Div`, `Var vs Let`, `Map en React`. (Format: Reels IG, TikTok, Tweet).
- **Semaine 3-4** : Fokus *Carrousels & Threads*. Sujets : `Les 5 extensions VSCode`, `Ma roadmap Frontend 2026`. (Format: Carrousel IG, Thread X).
- Ajoute toujours le chemin exact de ton image/vidéo (ex: `assets/raw_videos/react_tip.mp4`).

## ☁️ Hébergement
Héberge ce dossier complet sur un **VPS (ex: Contabo ou Hetzner à 5€/mois)**. 
Utilise `tmux` pour lancer le `streamlit run app.py` dans une fenêtre, et `python main.py` dans une autre.
Si tu es banni sur TikTok, ajoute une proxy résidentiel dans la variable `.env` : `TIKTOK_PROXY`.
