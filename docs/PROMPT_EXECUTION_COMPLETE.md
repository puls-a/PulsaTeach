# Objectif

Transformer intégralement PulsaTeach conformément à `docs/ROADMAP_COMPLETE.md` en une plateforme pédagogique sécurisée, maintenable, accessible, responsive et prête pour la production : API protégée, architecture modulaire, tests complets, UX améliorée, quiz avancés, révisions espacées, vocabulaire bilingue, parcours riches, compétences, projets, certifications, Course Studio, analytics respectueux de la vie privée, performances et SEO.

# Prompt

Tu travailles dans le dépôt PulsaTeach. Implémente intégralement `docs/ROADMAP_COMPLETE.md`, qui constitue la source de vérité. Lis-la entièrement, inspecte l’état réel du dépôt et conserve l’objectif complet actif jusqu’à ce que chaque exigence soit directement prouvée.

Commence par les P0 : confidentialité des données, authentification et rôles, validation des entrées, CORS, CSP et en-têtes de sécurité, rate limiting, limites d’upload, logs sans secrets, Supabase strict en production, tests 401/403 et accès inter-utilisateurs, réparation des E2E et bannière cookies mobile. Sépare explicitement développement et production, ne place aucun secret dans le frontend et utilise des migrations versionnées.

Travaille ensuite dans l’ordre de la roadmap :

1. sécurisation et tests ;
2. découpage frontend/backend et schémas de contenu ;
3. catalogue, lab, dashboard, responsive et accessibilité ;
4. moteur de quiz, examens, sauvegarde, reprise, scoring, feedback, randomisation et révisions espacées ;
5. vocabulaire canonique bilingue avec recherche, filtres, URLs, relations, favoris, liens vers leçons/quiz et audit des doublons ou termes manquants ;
6. amélioration des parcours HTML/CSS/JavaScript ;
7. nouveaux parcours prévus ;
8. compétences, progression et gamification ;
9. projets, reviews, portfolio et certificats ;
10. Course Studio avec workflow, versioning, publication et rollback ;
11. analytics privés, performance, SEO, internationalisation et production.

Tout parcours doit posséder prérequis, compétences, modules progressifs, vocabulaire relié, quiz par module, révisions, exercices, mini-projets, projet final avec rubric, examen, certificat, contenus français/anglais, audit pédagogique et tests. Ne crée aucun contenu creux.

Ne t’arrête pas à l’analyse : planifie puis implémente par lots cohérents. Pour chaque lot, modifie réellement le code, ajoute les tests, exécute les validations pertinentes, corrige les régressions et actualise la documentation. Préserve les fonctionnalités et données existantes. N’affaiblis jamais une exigence ou un test pour obtenir un résultat vert. Ne commit, push ou déploie rien sans autorisation explicite.

Teste l’accessibilité et le responsive à 375, 768, 1024 et 1440 px : clavier, focus, modales, menus, formulaires, annonces, contraste, zoom, reduced motion et axe. Ajoute le chargement différé par route et parcours, des budgets de bundle, des routes propres, des métadonnées par page, canonical, Open Graph, manifest, robots, sitemap et données structurées pertinentes.

Avant de terminer, relis la roadmap et construis une matrice exigence → preuve. Lance installation déterministe, audit des dépendances, lint, tests unitaires/API/composants, audits pédagogique et vocabulaire, build, smoke, E2E desktop/mobile et accessibilité. Inspecte les pages critiques, erreurs console, débordements et autorisations. Prouve qu’un parcours créé dans Course Studio peut être publié, appris, évalué puis certifié, et que tous les parcours respectent le standard.

Si une exigence manque de preuve directe, elle reste incomplète : continue. À la fin seulement, fournis le résultat, les décisions d’architecture, fichiers et migrations, validations obtenues, matrice de conformité et limites externes réellement invérifiables.
