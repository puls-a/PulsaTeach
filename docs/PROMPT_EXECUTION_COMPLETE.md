# Objectif

Transformer PulsaTeach conformément à `docs/MASTER_EXECUTION_PLAN.md` en un produit éducatif public fiable, utile et honnête, sans confondre quantité générée, audits structurels et qualité réellement vérifiée.

# Prompt

Tu travailles dans le dépôt PulsaTeach. Exécute `docs/MASTER_EXECUTION_PLAN.md`, qui constitue la source de vérité active. Lis-le entièrement, inspecte l’état réel du dépôt et conserve l’objectif complet actif jusqu’à ce que chaque exigence soit directement prouvée.

Prends le premier chantier incomplet de plus haute priorité dans le plan. L'ordre actuel est : certification humaine des parcours publics HTML, CSS et JavaScript ; renforcement des audits ; parcours utilisateur de bout en bout ; interface responsive et accessible ; backend et exploitation ; validation externe ; release propre.

Tout parcours doit posséder prérequis, compétences, modules progressifs, vocabulaire relié, quiz par module, révisions, exercices, mini-projets, projet final avec rubric, examen, certificat, contenus français/anglais, audit pédagogique et tests. Ne crée aucun contenu creux.

Ne t’arrête pas à l’analyse : planifie puis implémente par lots cohérents. Pour chaque lot, modifie réellement le code, ajoute les tests, exécute les validations pertinentes, corrige les régressions et actualise la documentation. Préserve les fonctionnalités et données existantes. N’affaiblis jamais une exigence ou un test pour obtenir un résultat vert. Ne commit, push ou déploie rien sans autorisation explicite.

Teste l’accessibilité et le responsive à 375, 768, 1024 et 1440 px : clavier, focus, modales, menus, formulaires, annonces, contraste, zoom, reduced motion et axe. Ajoute le chargement différé par route et parcours, des budgets de bundle, des routes propres, des métadonnées par page, canonical, Open Graph, manifest, robots, sitemap et données structurées pertinentes.

Avant de terminer, relis le plan directeur et construis une matrice exigence → preuve. Lance installation déterministe, audit des dépendances, lint, tests unitaires/API/composants, audits pédagogique et vocabulaire, build, smoke, E2E desktop/mobile et accessibilité. Inspecte les pages critiques, erreurs console, débordements et autorisations. Ne déclare aucun parcours conforme tant que son contenu, ses artefacts bilingues, son quiz et son projet n'ont pas été vérifiés directement.

Si une exigence manque de preuve directe, elle reste incomplète : continue. À la fin seulement, fournis le résultat, les décisions d’architecture, fichiers et migrations, validations obtenues, matrice de conformité et limites externes réellement invérifiables.
