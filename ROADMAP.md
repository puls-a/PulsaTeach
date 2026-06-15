# PulsaTeach Ultra Roadmap

## Backend V1 maintenant en place

- API Express avec catalogue, roadmap, progression, stats plateforme, soumissions, revue de projets et readiness de certifications.
- Stockage JSON local pour iterer vite avant une base de donnees.
- Pages apprenant pour projets et certifications.
- Page admin pour approuver ou demander des changements sur les projets.
- Page auteur pour preparer, revoir et publier des drafts de lecons.

## Vision

PulsaTeach doit évoluer vers une plateforme type freeCodeCamp : un curriculum complet, gratuit ou freemium, interactif, progressif, mesurable, avec projets portfolio, certifications et communauté.

## Phase 1 - Socle plateforme

- Pages dédiées : Accueil, Catalogue, Lab, Dashboard, Roadmap.
- Backend Express V1.
- API catalogue, roadmap, health et progression.
- Progression locale avec synchronisation backend.
- Deep links vers les leçons.
- Lab interactif HTML/CSS/JS avec tests, notes, favoris, XP et streak.

## Phase 2 - Profondeur curriculum

- Étendre HTML/CSS/JS à 120+ leçons.
- Ajouter CodeMirror comme éditeur principal.
- Ajouter lint, formatting, raccourcis clavier, fichiers multi-tabs.
- Isoler les tests JS dans Web Workers.
- Isoler previews HTML/CSS/DOM dans iframe sandbox durcie.
- Ajouter projets transversaux notés par rubrics.

## Phase 3 - Comptes et persistance réelle

- Auth email/password + OAuth.
- Base PostgreSQL avec Prisma.
- Tables users, tracks, modules, lessons, submissions, progress, badges.
- Migration depuis localStorage vers backend.
- Sessions, rate limits, validation Zod côté API.

## Phase 4 - Communauté et portfolio

- Profils publics.
- Soumissions de projets.
- Galerie de projets.
- Review par pairs.
- Commentaires et discussions par leçon.
- Système de mentorat.

## Phase 5 - Certification

- Examens finaux par track.
- Certification Frontend Foundations.
- Génération de certificats publics vérifiables.
- Anti-triche léger : variantes de tests, projets ouverts, review humaine.

## Phase 6 - Plateforme éducative

- Dashboard enseignants.
- Cohortes/classes.
- Assignations de parcours.
- Analytics par module.
- Exports CSV.
- Mode établissement.

## Architecture cible

- Frontend : React + Vite + Tailwind + CodeMirror.
- API : Express puis Nest/Fastify si besoin.
- DB : PostgreSQL + Prisma.
- Jobs : queue légère pour évaluations longues.
- Tests code : iframe sandbox + Web Workers.
- Déploiement : frontend statique + API Node + PostgreSQL managé.
