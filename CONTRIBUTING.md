# Contribuer a PulsaTeach

Merci de vouloir ameliorer PulsaTeach. Les contributions utiles vont des corrections de contenu aux ameliorations d'accessibilite, de performance et de securite.

## Avant de commencer

1. Consulte les issues ouvertes et cree une issue pour les changements importants.
2. Cree une branche courte et descriptive depuis `main`, par exemple `fix/catalog-mobile`.
3. Ne place jamais de secret, cle de service ou donnees personnelles dans le depot.

## Developpement

```bash
npm ci
npm run dev:full
npm run validate
```

Les changements pedagogiques doivent conserver les versions francaise et anglaise, les objectifs d'apprentissage et les validations associees.

## Pull requests

Une PR doit rester centree sur un changement, expliquer son impact et inclure les tests adaptes. Avant de demander une revue, execute au minimum `npm run lint` et `npm run test`; `npm run validate` est requis avant fusion.

En contribuant, vous acceptez que votre travail soit distribue sous la licence MIT du depot.
