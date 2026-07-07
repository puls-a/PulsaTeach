CONTENT_PILLARS = {
    "quick_win": {
        "label": "Astuce rapide",
        "goal": "Donner une victoire concrete en moins de 30 secondes.",
        "examples": [
            "Corrige ce bug CSS en 2 lignes",
            "La difference entre null et undefined sans blabla",
            "Un raccourci React que trop peu de juniors utilisent",
        ],
    },
    "challenge": {
        "label": "Mini-defi",
        "goal": "Declencher commentaires, essais et sauvegardes.",
        "examples": [
            "Mini-defi CSS: centre cette card sans media query",
            "Trouve le bug dans ce useEffect",
            "Refactor ce code JS en une fonction propre",
        ],
    },
    "mistake": {
        "label": "Erreur de debutant",
        "goal": "Faire resonner une douleur reelle et donner la correction.",
        "examples": [
            "Pourquoi ton portfolio ne rassure pas les recruteurs",
            "L'erreur React qui cree des re-renders inutiles",
            "Pourquoi ton CSS devient impossible a maintenir",
        ],
    },
    "career": {
        "label": "Carriere junior",
        "goal": "Aider a trouver un stage, une alternance ou un premier job.",
        "examples": [
            "Ce que ton GitHub dit de toi avant l'entretien",
            "3 projets plus forts qu'une todo list",
            "Comment expliquer un projet quand tu debutes",
        ],
    },
    "mindset": {
        "label": "Motivation utile",
        "goal": "Motiver sans promesse bullshit.",
        "examples": [
            "Tu n'as pas besoin d'etre un genie pour coder",
            "Pourquoi la regularite bat les tutos de 4h",
            "Le vrai signal que tu progresses en dev",
        ],
    },
}

X_FORMATS = {
    "value_reply": "Post principal sans lien + reponse avec lien",
    "challenge_reply": "Mini-defi dans le post + indice/ressource en reponse",
    "mistake_fix": "Erreur commune + correction concrete",
    "career_tip": "Conseil portfolio/job junior",
}

WEEKLY_MIX = [
    "mistake",
    "quick_win",
    "challenge",
    "career",
    "quick_win",
    "mindset",
    "challenge",
]


def pillar_names():
    return list(CONTENT_PILLARS.keys())


def get_pillar(pillar: str):
    return CONTENT_PILLARS.get(pillar, CONTENT_PILLARS["quick_win"])
