TRACKS = [
    {
        "id": "html",
        "name": "HTML",
        "url": "https://pulsateach.vercel.app/formations/html",
        "hashtags": ["#HTML", "#DevWeb", "#ApprendreAProgrammer"],
        "tips": [
            {
                "title": "Un seul h1 par intention de page",
                "explanation": "Ton h1 doit annoncer le sujet principal. Les h2 et h3 organisent ensuite le contenu comme un plan lisible.",
            },
            {
                "title": "Un label explicite vaut mieux qu'un placeholder",
                "explanation": "Le placeholder disparaît quand on écrit. Un label reste visible et améliore l'accessibilité du formulaire.",
            },
            {
                "title": "La sémantique aide aussi le SEO",
                "explanation": "header, nav, main, section et footer donnent une structure claire aux humains, lecteurs d'écran et moteurs.",
            },
        ],
    },
    {
        "id": "css",
        "name": "CSS",
        "url": "https://pulsateach.vercel.app/formations/css",
        "hashtags": ["#CSS", "#DevWeb", "#Frontend"],
        "tips": [
            {
                "title": "Commence mobile-first",
                "explanation": "Écris d'abord le layout simple, puis ajoute les media queries quand le contenu en a vraiment besoin.",
            },
            {
                "title": "gap est souvent plus propre que margin",
                "explanation": "Sur flex ou grid, gap gère l'espacement entre enfants sans créer d'effets de bord aux extrémités.",
            },
            {
                "title": "Le focus visible n'est pas optionnel",
                "explanation": "Si tu retires outline, remplace-le par un style clavier au moins aussi visible.",
            },
        ],
    },
    {
        "id": "javascript",
        "name": "JavaScript",
        "url": "https://pulsateach.vercel.app/formations/javascript",
        "hashtags": ["#JavaScript", "#DevWeb", "#ApprendreAProgrammer"],
        "tips": [
            {
                "title": "Nomme les valeurs avant de complexifier",
                "explanation": "Une variable bien nommée transforme une condition difficile en phrase lisible.",
            },
            {
                "title": "Sépare calcul et affichage",
                "explanation": "Une fonction qui calcule sans toucher au DOM est plus simple à tester et à réutiliser.",
            },
            {
                "title": "Gère les erreurs réseau dès le début",
                "explanation": "fetch peut échouer, répondre lentement ou retourner un statut HTTP inattendu. Prévois loading, data et error.",
            },
        ],
    },
    {
        "id": "react",
        "name": "React",
        "url": "https://pulsateach.vercel.app/formations/react",
        "hashtags": ["#React", "#JavaScript", "#Frontend"],
        "tips": [
            {
                "title": "Un composant doit avoir une responsabilité claire",
                "explanation": "S'il gère trop d'état, trop d'affichage et trop d'effets, commence par séparer les intentions.",
            },
            {
                "title": "L'état minimal évite beaucoup de bugs",
                "explanation": "Ne stocke pas une valeur que tu peux dériver proprement depuis les props ou un autre état.",
            },
            {
                "title": "Teste le comportement, pas l'implémentation",
                "explanation": "Un bon test React vérifie ce que l'utilisateur voit ou fait, pas le nom d'une fonction interne.",
            },
        ],
    },
    {
        "id": "typescript",
        "name": "TypeScript",
        "url": "https://pulsateach.vercel.app/formations/typescript",
        "hashtags": ["#TypeScript", "#JavaScript", "#DevWeb"],
        "tips": [
            {
                "title": "unknown est plus sûr que any",
                "explanation": "unknown force à vérifier la donnée avant de l'utiliser. any désactive justement la protection recherchée.",
            },
            {
                "title": "Type les frontières de ton app",
                "explanation": "API, localStorage, formulaires et URL sont les endroits où les données deviennent incertaines.",
            },
            {
                "title": "Un type métier vaut mieux qu'un string partout",
                "explanation": "Un union type comme 'draft' | 'published' évite des états impossibles ou mal orthographiés.",
            },
        ],
    },
    {
        "id": "git",
        "name": "Git",
        "url": "https://pulsateach.vercel.app/formations/git",
        "hashtags": ["#Git", "#GitHub", "#DevWeb"],
        "tips": [
            {
                "title": "Commite une intention, pas une journée entière",
                "explanation": "Un bon commit raconte une décision cohérente. Il se relit, se revert et se review facilement.",
            },
            {
                "title": "git status avant toute commande risquée",
                "explanation": "Savoir ce qui est modifié, ajouté ou non suivi évite beaucoup de pertes de travail.",
            },
            {
                "title": "Une branche courte réduit les conflits",
                "explanation": "Plus une branche vit longtemps, plus elle accumule divergence, contexte oublié et merge compliqué.",
            },
        ],
    },
    {
        "id": "accessibility",
        "name": "Accessibilité",
        "url": "https://pulsateach.vercel.app/formations/accessibility",
        "hashtags": ["#Accessibilite", "#A11y", "#Frontend"],
        "tips": [
            {
                "title": "Teste au clavier avant d'ajouter du JavaScript",
                "explanation": "Tab, Entrée, Espace et Échap révèlent vite si ton interface est vraiment utilisable.",
            },
            {
                "title": "Un bouton déclenche une action",
                "explanation": "Un lien navigue. Un bouton agit. Cette différence aide le navigateur et les technologies d'assistance.",
            },
            {
                "title": "Le nom accessible doit être clair",
                "explanation": "Un lecteur d'écran doit annoncer une action compréhensible, pas seulement 'cliquer ici' ou 'icône'.",
            },
        ],
    },
    {
        "id": "web-performance",
        "name": "Performance web",
        "url": "https://pulsateach.vercel.app/formations/web-performance",
        "hashtags": ["#WebPerf", "#Performance", "#DevWeb"],
        "tips": [
            {
                "title": "Mesure avant d'optimiser",
                "explanation": "Lighthouse, Web Vitals et le réseau DevTools évitent de travailler sur le mauvais goulot.",
            },
            {
                "title": "Le JavaScript le plus rapide est celui qu'on ne charge pas",
                "explanation": "Lazy-load, découpage de chunks et routes dédiées réduisent le coût initial.",
            },
            {
                "title": "Les images doivent avoir une taille réservée",
                "explanation": "width, height ou aspect-ratio limitent les décalages visuels et améliorent le CLS.",
            },
        ],
    },
]

GENERAL_HASHTAGS = ["#FormationGratuite", "#DevWeb", "#ApprendreAProgrammer"]
