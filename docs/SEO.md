# SEO PulsaTeach

PulsaTeach génère automatiquement son sitemap avant chaque build. Il contient
les pages publiques et toutes les leçons publiées. Les espaces personnels,
l’administration, les révisions privées et les outils d’auteur restent en
`noindex` et sont exclus du sitemap.

## Commandes

- `npm run audit:seo` régénère puis contrôle le sitemap et les balises clés.
- `npm run build` régénère le sitemap avant le build Vite.

## Métadonnées

`src/appMetadata.js` maintient les titres, descriptions, URL canoniques, cartes
Open Graph/Twitter et les données structurées `WebSite`, `Organization`,
`WebPage`, `BreadcrumbList` et `Course`. Chaque URL de leçon obtient un titre,
une description et une URL canonique propres.

## Mise en ligne et indexation

Après un déploiement stable :

1. ajouter `https://pulsateach.vercel.app` dans Google Search Console ;
2. valider la propriété avec la méthode proposée par Google ;
3. soumettre `https://pulsateach.vercel.app/sitemap.xml` ;
4. inspecter `/`, `/catalog` et plusieurs leçons de parcours différents ;
5. demander l’indexation uniquement après vérification du rendu ;
6. surveiller les pages indexées, Core Web Vitals et erreurs de données structurées.

La vérification Search Console nécessite un compte propriétaire et ne peut pas
être automatisée depuis le dépôt sans jeton fourni explicitement.
