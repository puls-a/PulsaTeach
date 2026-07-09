# 🎵 PulsaTeach - Automate TikTok Growth (2026)

Ce bot gère l'édition vidéo de base (ajout de hooks texte) et l'upload automatique sur TikTok via Playwright (bypass des anti-bots) pour rediriger le trafic vers la plateforme éducative.

## 📁 Architecture
- `assets/raw_videos/` : Mets ici tes vidéos tournées "brutes" (sans texte, sans musique ajoutée, juste toi ou ton écran).
- `assets/processed_videos/` : Dossier temporaire où le script va créer la vidéo avec le texte avant de l'upload.
- `cookies/` : Stocke ici ton fichier `tiktok_cookies.txt` (format Netscape).

## ⚙️ Prérequis et Installation
1. **Python et ImageMagick** : 
   - Installe Python 3.10+
   - Installe `ImageMagick` sur ton système (nécessaire pour MoviePy pour écrire du texte).
2. **Dépendances** :
   ```bash
   pip install -r requirements.txt
   playwright install  # CRITIQUE: Installe les navigateurs requis pour l'upload
   ```
3. **Récupération des Cookies (Le plus important)** :
   - Connecte-toi à ton compte TikTok depuis un navigateur Chrome/Firefox classique.
   - Utilise une extension comme *EditThisCookie* ou *Cookie-Editor* et exporte les cookies au format **Netscape** ou **JSON**.
   - Sauvegarde-les dans `cookies/tiktok_cookies.txt`.
4. **.env** : Renomme `.env.example` en `.env` et mets ta clé API Gemini.

## 🚀 Utilisation
```bash
python main.py
```

## 📅 Stratégie TikTok Recommandée (Plan 30 Jours)

TikTok demande de la **quantité** au début pour comprendre à qui montrer ton contenu (le "Graph" TikTok).

- **Jours 1 à 10 (Phase d'exploration)** : 
  - 1 vidéo par jour.
  - *Sujets* : Erreurs de débutants, POV humoristiques ("Quand le CSS pète tout").
  - *But* : Faire comprendre à l'algo que tu fais du Dev Web.

- **Jours 11 à 20 (Phase d'autorité)** : 
  - 2 vidéos par jour.
  - *Sujets* : Mini-tutos ultra rapides (15s). "Comment faire X en HTML".
  - *Le secret* : La vidéo doit boucler (loop) pendant que les gens lisent le texte au centre. Rétention = Viralité.

- **Jours 21 à 30 (Conversion & Trafic)** : 
  - 3 vidéos par jour.
  - *Sujets* : Des challenges ("Essaie de coder ça"), et tu pointes intensément vers `pulsateach.vercel.app` dans les vidéos.
  - *Call-to-action* : "J'ai créé une formation gratuite 100% interactive. Le lien est sur mon profil."

## ☁️ Hébergement 24/7 (Botting TikTok)
L'hébergement des bots TikTok est délicat car TikTok bloque les adresses IP des Datacenters (AWS, DigitalOcean, etc.).

1. **Solution 1 (L'idéal pour débuter)** : Fais tourner le bot sur ton propre PC ou un vieux Raspberry Pi chez toi. Ton IP domestique est "Trustée" par TikTok. Le script va s'allumer avec le Scheduler.
2. **Solution 2 (VPS + Proxy 4G)** : Prends un VPS (ex: Hetzner), mais dans `.env`, renseigne absolument un `PROXY_URL` qui provient d'un fournisseur de Proxy Mobile/4G (ex: IPRoyal, BrightData). C'est la seule façon d'éviter le shadowban si tu héberges sur un Cloud.

## 💬 Gestion des commentaires
Les API d'upload ne permettent pas l'auto-réponse native facilement sans risque sévère de ban.
*Conseil* : Ouvre l'appli TikTok sur ton téléphone juste après que le bot publie (vers 17h50). Les **30 premières minutes** sont critiques. Réponds au premier commentaire avec une vidéo, ou épingle ton propre commentaire rappelant la gratuité de la plateforme !
