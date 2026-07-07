import os

import pandas as pd
import streamlit as st

from core.config import BOT_VERSION, DRY_RUN, LOG_FILE, PLATFORM_DAILY_LIMITS, PLATFORM_ENABLED
from core.content_generator import generate_social_content
from core.health import get_last_health_check, run_health_check
from core.planner import build_x_plan, get_content_plan
from core.queue_manager import add_to_queue, get_history, get_queue, remove_from_queue
from core.state import get_failed, get_metrics, get_quality_reports, posts_today

st.set_page_config(page_title="PulsaTeach Social Bot V2", page_icon="🚀", layout="wide")

st.title("PulsaTeach Social Bot V2")
st.caption("Automation social media fiable, modulaire, avec quality checks et garde-fous.")

mode = "DRY-RUN / TEST" if DRY_RUN else "PRODUCTION"
st.info(f"Version: {BOT_VERSION} | Mode: {mode}")

tab_dashboard, tab_create, tab_plan, tab_queue, tab_quality, tab_logs = st.tabs([
    "Dashboard",
    "Créer",
    "Planning V3",
    "Queue",
    "Qualité",
    "Logs",
])

with tab_dashboard:
    st.header("Vue d'ensemble")
    history = get_history()
    metrics = get_metrics()

    cols = st.columns(3)
    for idx, platform in enumerate(["x", "instagram", "tiktok"]):
        with cols[idx]:
            enabled = "ON" if PLATFORM_ENABLED.get(platform) else "OFF"
            limit = PLATFORM_DAILY_LIMITS.get(platform, "-")
            today = posts_today(platform)
            st.metric(platform.upper(), f"{today}/{limit}", help=f"Plateforme: {enabled}")
            st.caption(f"Statut: {enabled}")

    st.subheader("Totaux")
    totals = metrics.get("totals", {})
    if totals:
        st.dataframe(pd.DataFrame(totals).fillna(0).astype(int), use_container_width=True)
    else:
        st.write("Aucune métrique pour le moment.")

    st.subheader("Dernières publications")
    if history:
        st.dataframe(pd.DataFrame(history).sort_values("posted_at", ascending=False).head(20), use_container_width=True)
    else:
        st.write("Aucune publication historique.")

    st.subheader("Health check")
    if st.button("Lancer health check"):
        st.json(run_health_check())
    else:
        health = get_last_health_check()
        if health:
            st.json(health)
        else:
            st.caption("Aucun health check encore lancé.")

with tab_create:
    st.header("Ajouter un contenu")
    with st.form("new_post_form"):
        c1, c2 = st.columns(2)
        with c1:
            platform = st.selectbox("Plateforme", ["x", "instagram", "tiktok"])
            content_type = st.selectbox("Type", ["post", "reel", "carousel", "challenge", "tip"])
            priority = st.slider("Priorité", 1, 10, 5)
        with c2:
            topic = st.text_input("Sujet", placeholder="Ex: Pourquoi ton portfolio ne rassure pas les recruteurs")
            media_path = st.text_input("Média optionnel", placeholder="assets/images/code.png")

        if st.form_submit_button("Ajouter à la queue"):
            if not topic.strip():
                st.error("Le sujet est obligatoire.")
            else:
                add_to_queue(platform, content_type, topic, media_path or None, priority=priority)
                st.success("Ajouté à la queue.")

    st.divider()
    st.header("Aperçu Gemini")
    preview_topic = st.text_input("Sujet à tester", key="preview_topic")
    preview_platform = st.selectbox("Plateforme preview", ["x", "instagram", "tiktok"])
    if st.button("Générer aperçu"):
        if not preview_topic.strip():
            st.warning("Ajoute un sujet.")
        else:
            with st.spinner("Génération + quality check..."):
                st.json(generate_social_content(preview_platform, preview_topic, "post"))

with tab_plan:
    st.header("Planning éditorial X")
    c1, c2 = st.columns(2)
    with c1:
        days = st.number_input("Nombre de jours", min_value=1, max_value=30, value=7)
    with c2:
        posts_per_day = st.number_input("Posts X par jour", min_value=1, max_value=3, value=2)

    if st.button("Générer un planning X"):
        with st.spinner("Création du planning éditorial..."):
            plan = build_x_plan(days=int(days), posts_per_day=int(posts_per_day))
            st.success(f"{len(plan)} posts ajoutés à la queue.")

    plan = get_content_plan()
    if plan:
        st.dataframe(pd.DataFrame(plan).tail(50), use_container_width=True)
    else:
        st.write("Aucun planning généré.")

with tab_queue:
    st.header("Queue active")
    queue = get_queue(status=None)
    pending = [item for item in queue if item.get("status", "pending") == "pending"]
    if pending:
        for item in sorted(pending, key=lambda x: (-int(x.get("priority", 5)), x.get("added_at", ""))):
            label = f"[{item['platform'].upper()}] P{item.get('priority', 5)} - {item['topic']}"
            with st.expander(label):
                st.json(item)
                if st.button("Supprimer", key=f"del_{item['id']}"):
                    remove_from_queue(item["id"])
                    st.rerun()
    else:
        st.success("Queue vide.")

    st.header("Échecs")
    failed = get_failed()
    if failed:
        st.dataframe(pd.DataFrame(failed).tail(50), use_container_width=True)
    else:
        st.write("Aucun échec enregistré.")

with tab_quality:
    st.header("Quality reports")
    reports = get_quality_reports()
    if reports:
        df = pd.DataFrame(reports).sort_values("created_at", ascending=False)
        st.dataframe(df.head(50), use_container_width=True)
        latest = reports[-1]
        st.subheader("Dernier contenu X")
        st.write("Score:", latest.get("score"))
        st.write("Notes:", latest.get("notes"))
        st.code(latest.get("main_post", ""))
        st.code(latest.get("reply", ""))
    else:
        st.write("Aucun rapport qualité.")

with tab_logs:
    st.header("Logs")
    if st.button("Rafraîchir"):
        st.rerun()
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            st.code("".join(f.readlines()[-120:]), language="log")
    else:
        st.write("Aucun log.")
