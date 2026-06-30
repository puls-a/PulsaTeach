# PulsaTeach — réponses aux rapports CTO / produit

Date : 2026-06-30

Ce document transforme les deux rapports externes en décisions concrètes. Les
rapports contenaient aussi des hypothèses incorrectes : PulsaTeach n’est pas une
application Next.js, mais une application Vite/React avec API Express.

## 1. Exécution de code utilisateur — P0

État appliqué dans le code :

- les aperçus HTML/CSS/DOM tournent dans des `iframe` `srcDoc` ;
- la sandbox canonique est centralisée dans `src/security/sandboxPolicy.js` ;
- la sandbox autorise uniquement les scripts : `sandbox="allow-scripts"` ;
- `allow-same-origin`, `allow-forms`, `allow-modals` et `allow-popups` sont
  exclus ;
- chaque preview reçoit une CSP interne :
  - `default-src 'none'` ;
  - `connect-src 'none'` ;
  - `form-action 'none'` ;
  - `object-src 'none'` ;
  - scripts/styles inline uniquement pour permettre l’exercice local ;
- les messages `postMessage` de la preview live sont acceptés seulement depuis
  la fenêtre de l’iframe contrôlée ;
- le Worker JavaScript est tué au timeout côté client ;
- le `fetch` pédagogique du Worker ne fait aucun réseau réel et refuse les URLs
  non mockées.

Limite assumée :

- `srcDoc` garde le rendu dans le navigateur de l’apprenant. Pour un niveau
  SaaS entreprise, l’étape suivante serait un domaine isolé dédié, par exemple
  `sandbox.pulsateach.app`, avec headers spécifiques et monitoring séparé.

Preuves :

- `tests/unit/sandboxPolicy.test.js`
- `src/security/sandboxPolicy.js`
- `src/components/LivePlayground.jsx`
- `src/features/learn/LessonWorkspace.jsx`
- `src/jsSandboxWorker.js`

## 2. Monétisation / freemium

Décision recommandée, non implémentée automatiquement :

- garder l’apprentissage de base gratuit ;
- monétiser uniquement les éléments à forte valeur perçue :
  - certificat vérifiable premium ;
  - export PDF premium ;
  - review de projet avancée ;
  - dashboard école/équipe ;
  - mentor IA ou correction guidée.

À ne pas faire sans décision produit :

- ajouter Stripe immédiatement sans page pricing, offre, CGV de vente, gestion
  des remboursements, facturation, support et conformité.

Prochaine action recommandée :

1. écrire une page `/pricing` en mode “coming soon / liste d’attente” ;
2. mesurer les clics sur “certificat pro” ;
3. valider la volonté de payer avant d’ajouter paiement réel.

## 3. Architecture contenu

État actuel :

- le contenu est versionné dans le dépôt, structuré par registres et builders ;
- Course Studio existe pour créer/publier des parcours côté produit ;
- ce modèle reste acceptable tant que la contribution éditoriale est petite.

Risque réel :

- à plusieurs rédacteurs ou 500+ leçons, le contenu doit devenir une source
  pilotée comme une base : statuts, versions, ownership, audit, traduction,
  review et publication.

Option recommandée :

- court terme : renforcer Course Studio comme CMS interne ;
- moyen terme : stocker les parcours publiés dans une base versionnée ;
- long terme : headless CMS seulement si l’équipe éditoriale dépasse le modèle
  interne.

## 4. Différenciation / moat

Angles à renforcer :

- francophone sérieux, pas infantilisant ;
- progression par preuves : quiz, projets, corrections, certificats ;
- accessibilité, sécurité, tests, performance dès les bases ;
- future review IA et partenariats écoles/bootcamps francophones.

Priorité produit :

1. sécuriser l’interactif ;
2. rendre les quiz/projets plus exigeants ;
3. créer une boucle de rétention : streak, révisions, objectifs hebdo ;
4. tester une offre certificat/review premium.
