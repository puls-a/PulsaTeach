# Prompt objectif pour agent IA

Tu travailles dans PulsaTeach. Objectif : refondre tous les cours en profondeur en
t’inspirant de la structure pédagogique de freeCodeCamp, surtout
`javascript_v9_compact.md` et `javascript_v9_contenu_complet.md`, sans copier le
texte brut. Parle très peu, agis beaucoup, ne t’arrête pas après une analyse.

Règles :

1. Lis `docs/FREECODECAMP_JS_REWRITE_ROADMAP.md`.
2. Vérifie le dépôt, les tests et l’état Git.
3. Utilise freeCodeCamp comme benchmark : granularité, micro-steps, labs, quizzes,
   projets, tests, progression, éditeur/sandbox.
4. Réécris tout à la sauce PulsaTeach : exemples, noms, datasets, projets,
   explications et tests originaux. Pas de copier-coller non attribué.
5. Commence par JavaScript v9 PulsaTeach : 80+ micro-leçons utiles, 12+ quizzes,
   8+ labs/projets, examen final, vocabulaire, FR/EN, tests.
6. Allège l’interface de cours : consigne, éditeur, résultat/tests, mode focus
   mobile, feedback clair.
7. Garde la sécurité sandbox stricte.
8. Mets à jour SEO, sitemap, pré-rendu, dates de dernière mise en ligne.
9. Ne commit pas `.external/freeCodeCamp` ni les sources benchmark brutes si elles
   ne doivent pas être publiées.
10. Après chaque lot : lint, tests, audit learning, audit curriculum depth, build,
    SEO, bundle, E2E et Lighthouse.
11. Corrige les régressions au lieu d’affaiblir les tests.
12. Déploie seulement quand tout est vert et indique l’URL de prod.

Compte rendu final court : changements, fichiers clés, validations, limites,
prochain lot.

Commence maintenant par construire la matrice freeCodeCamp JavaScript v9 →
PulsaTeach, puis implémente le premier gros bloc JavaScript sans t’arrêter.
