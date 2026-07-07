import urllib.request
import xml.etree.ElementTree as ET
from core.logger import get_logger

logger = get_logger("TechNews")

def get_latest_tech_news():
    """
    Récupère les 3 articles les plus tendances du moment sur Dev.to (Tag: WebDev).
    C'est gratuit, sans API key, et ultra fiable grâce au flux RSS.
    """
    try:
        logger.info("🌍 Scraping des dernières actualités Web Dev sur Dev.to...")
        url = "https://dev.to/feed/tag/webdev"
        # Ajout d'un faux User-Agent pour ne pas se faire bloquer
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        with urllib.request.urlopen(req) as response:
            xml_data = response.read()
            
        root = ET.fromstring(xml_data)
        news = []
        
        # Récupère les 3 premiers articles
        for item in root.findall('./channel/item')[:3]:
            title = item.find('title').text
            news.append(title)
            
        logger.info(f"✅ {len(news)} actualités récupérées !")
        return news
    except Exception as e:
        logger.error(f"❌ Erreur lors du scraping des news : {e}")
        return []
