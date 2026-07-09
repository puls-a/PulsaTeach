# 🚀 PulsaTeach Instagram Growth Bot

Un bot complet en Python pour automatiser et faire grandir le compte Instagram éducatif `@pulsateach`.

## ✨ Fonctionnalités
- Publication automatique via `instagrapi`.
- Support complet pour les **Reels**, **Carrousels**, et **Photos**.
- Légendes (captions) générées par IA avec appels à l'action vers `https://pulsateach.vercel.app`.
- Session persistante pour éviter les blocages Instagram (anti-spam).
- Délais aléatoires entre les actions pour simuler le comportement humain.
- Système de logs détaillé.

## 📂 Structure du projet
- `assets/` : Place tes images et vidéos ici.
- `templates/` : Si tu utilises un script After Effects ou Canva pour tes assets.
- `main.py` : Point d'entrée, gère la file d'attente et le planificateur (`schedule`).
- `instagram_client.py` : Logique de connexion et publication via l'API.
- `content_generator.py` : Intelligence Artificielle (Gemini/Claude) pour générer des légendes engageantes.
- `config.py` : Gestion des variables d'environnement.
- `logger.py` : Trace toutes les actions dans `bot.log`.

## ⚙️ Installation (Local ou VPS)

1. **Prérequis** : Python 3.9+ 
2. Installer les dépendances :
   ```bash
   pip install -r requirements.txt
   ```
3. Configurer l'environnement :
   - Renomme le fichier `.env.example` en `.env`.
   - Remplis tes identifiants Instagram.
   - Ajoute ta clé d'API Gemini (Gratuit via Google AI Studio).

## 🚀 Utilisation

Pour lancer le bot, exécute simplement :
```bash
python main.py
```
*Note : Par défaut, le script tourne indéfiniment et attend les heures définies dans `setup_scheduler()` pour publier. Pour un test direct, décommente `publish_next_content()` à la fin du fichier `main.py`.*

---

## 📈 Stratégie de Fréquence Recommandée (2026)
L'algorithme Instagram priorise la rétention vidéo et les partages.
* **Reels** : 1 par jour (ou 1 tous les 2 jours minimum). Le Reel doit durer entre 15 et 30 secondes maximum, avec un "hook" (accroche) fort dans les 3 premières secondes (ex: "Arrête d'utiliser create-react-app").
* **Carrousels** : 2 par semaine. Parfait pour les tutoriels "étapes par étapes" ou "Top 5". Demande toujours aux gens d'enregistrer le post à la fin.
* **Posts simples/Citations** : 1 à 2 par semaine pour aérer le feed. 
* **Stories** : 2-3 par jour (Manuel recommandé avec des sondages, ou automatisable avec `bot.post_story`).

## ☁️ Conseils pour héberger le Bot H24 (24/7)

Pour que ton bot publie à des heures précises sans que ton PC ne soit allumé, tu dois l'héberger :

1. **Render (Recommandé - Simple)**
   - Crée un nouveau "Background Worker" sur Render.
   - Lie ton repo GitHub.
   - Définis la commande : `pip install -r requirements.txt && python main.py`
   - Ajoute tes variables d'environnement (`IG_USERNAME`, etc.) dans les paramètres Render.
   *(Attention à persister le fichier `session.json` pour éviter les bans. Utilise un Render Disk ou stocke la session en base de données).*

2. **VPS Linux (DigitalOcean / Hetzner / Hostinger) (Le Plus Robuste)**
   - Un VPS à 4€/mois est parfait.
   - Connecte-toi en SSH.
   - Clone le repo, installe un environnement virtuel Python.
   - Lance le script en tâche de fond avec `tmux` ou **`pm2`** (oui, PM2 marche avec Python) :
     `pm2 start main.py --name "PulsateachIG"`

3. **Railway.app**
   - Comme Render, très facile avec un `Dockerfile` ou Nixpacks.

**Sécurité / Anti-Spam** :
Laisse la génération IA faire des variations de hashtags. Le système de persistance de session `session.json` est *critique* : ne te reconnecte jamais sans.
