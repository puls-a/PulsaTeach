import streamlit as st
import pandas as pd
import os
import json
from datetime import datetime

# Importer les modules core
from core.queue_manager import get_queue, get_history, add_to_queue, remove_from_queue
from core.content_generator import generate_social_content
from core.config import LOG_FILE, DRY_RUN

# Configuration de la page Streamlit
st.set_page_config(page_title="PulsaTeach Social Bot", page_icon="🚀", layout="wide")

st.title("🚀 PulsaTeach Social Media Bot")
st.markdown(f"**Mode Dry-Run :** `{'Activé (Test)' if DRY_RUN else 'Désactivé (Prod)'}`")

tab1, tab2, tab3, tab4 = st.tabs(["📊 Dashboard", "✍️ Nouveau Post", "📅 File d'attente", "📜 Logs"])

# --- TAB 1 : DASHBOARD ---
with tab1:
    st.header("Statistiques Globales")
    history = get_history()
    
    col1, col2, col3 = st.columns(3)
    with col1:
        x_posts = len([p for p in history if p["platform"] == "x"])
        st.metric("Posts X (Twitter)", x_posts)
    with col2:
        ig_posts = len([p for p in history if p["platform"] == "instagram"])
        st.metric("Posts Instagram", ig_posts)
    with col3:
        tk_posts = len([p for p in history if p["platform"] == "tiktok"])
        st.metric("Posts TikTok", tk_posts)
        
    if history:
        st.subheader("Derniers posts publiés")
        df_history = pd.DataFrame(history)
        st.dataframe(df_history.sort_values(by="posted_at", ascending=False).head(10), use_container_width=True)
    else:
        st.info("Aucun historique pour le moment.")

# --- TAB 2 : NOUVEAU POST ---
with tab2:
    st.header("Planifier un nouveau contenu")
    
    with st.form("new_post_form"):
        col1, col2 = st.columns(2)
        with col1:
            platform = st.selectbox("Plateforme", ["x", "instagram", "tiktok"])
            content_type = st.selectbox("Type de contenu", ["post", "reel", "carousel", "thread"])
        with col2:
            topic = st.text_input("Sujet du post (ex: Centrer une div CSS)")
            media_path = st.text_input("Chemin du média (ex: assets/images/img1.jpg)", value="")
            
        submit_btn = st.form_submit_button("Ajouter à la file d'attente 📅")
        
        if submit_btn:
            if topic:
                add_to_queue(platform, content_type, topic, media_path)
                st.success(f"Post ajouté à la file d'attente pour {platform.upper()} !")
            else:
                st.error("Le sujet est obligatoire.")
                
    st.divider()
    st.subheader("Générateur d'Aperçu IA 🧠")
    preview_topic = st.text_input("Sujet pour tester l'IA")
    preview_plat = st.selectbox("Voir le rendu pour :", ["x", "instagram", "tiktok"])
    if st.button("Générer l'aperçu"):
        with st.spinner("Génération via Gemini..."):
            res = generate_social_content(preview_plat, preview_topic, "post")
            st.json(res)

# --- TAB 3 : FILE D'ATTENTE ---
with tab3:
    st.header("Posts en attente (Queue)")
    queue = get_queue()
    
    if queue:
        for item in queue:
            with st.expander(f"[{item['platform'].upper()}] {item['topic']} - {item.get('added_at', '')[:10]}"):
                st.write(f"**Type:** {item['type']}")
                st.write(f"**Média:** {item.get('media_path', 'Aucun')}")
                if st.button(f"Supprimer le post #{item['id']}", key=f"del_{item['id']}"):
                    remove_from_queue(item['id'])
                    st.rerun()
    else:
        st.success("La file d'attente est vide.")

# --- TAB 4 : LOGS ---
with tab4:
    st.header("Logs système en temps réel")
    if st.button("Rafraîchir les logs 🔄"):
        st.rerun()
        
    try:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                logs = f.readlines()
                # Afficher les 50 dernières lignes
                st.code("".join(logs[-50:]), language="log")
        else:
            st.info("Fichier de log introuvable.")
    except Exception as e:
        st.error(f"Erreur lecture logs: {e}")
