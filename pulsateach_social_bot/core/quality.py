import re

BAD_PHRASES = [
    "deviens riche",
    "sans effort",
    "garanti",
    "hack secret",
    "incroyable opportunite",
]

WEAK_WORDS = ["peut-etre", "globalement", "en quelque sorte", "il faut savoir que"]


def score_x_post(main_post: str, reply: str, url: str) -> dict:
    score = 10
    issues = []
    suggestions = []
    main = main_post or ""
    rep = reply or ""

    if len(main) < 170:
        score -= 2
        issues.append("main_post trop court")
        suggestions.append("Ajoute un exemple concret ou une mini-action.")
    if len(main) > 260:
        score -= 3
        issues.append("main_post trop long")
    if "http" in main or "pulsateach" in main.lower():
        score -= 4
        issues.append("lien/marque dans main_post")
    if "#" in main:
        score -= 2
        issues.append("hashtag dans main_post")
    if url not in rep:
        score -= 4
        issues.append("reply sans URL")
    if len(rep) > 260:
        score -= 2
        issues.append("reply trop longue")
    if any(p in (main + " " + rep).lower() for p in BAD_PHRASES):
        score -= 4
        issues.append("promesse abusive")
    if any(w in main.lower() for w in WEAK_WORDS):
        score -= 1
        issues.append("formulation faible")
    if not re.search(r"\b(tu|ton|ta|tes|toi)\b", main.lower()):
        score -= 1
        issues.append("pas assez direct/tutoiement faible")
    if main.count("\n") > 4:
        score -= 1
        issues.append("trop de retours ligne")

    return {
        "score": max(score, 0),
        "issues": issues,
        "suggestions": suggestions,
        "passed": score >= 7 and not any(i in issues for i in ["lien/marque dans main_post", "reply sans URL"]),
    }
