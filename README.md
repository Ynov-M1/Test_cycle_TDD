# Test Cycle TDD – React + Vite

Ce projet est un exemple d’application React configurée avec Vite, intégrant :

- Tests unitaires et d’intégration avec Jest et React Testing Library
- Suivi de couverture de code via Codecov
- Génération automatique de documentation technique avec JSDoc
- Workflow CI/CD GitHub Actions pour build, tests et déploiement sur GitHub Pages

## Liens rapides

- Dépôt GitHub : https://github.com/Ynov-M1/Test_cycle_TDD
- Application déployée : https://ynov-m1.github.io/Test_cycle_TDD/
- Documentation technique (JSDoc) : https://ynov-m1.github.io/Test_cycle_TDD/docs/
- Tableau de bord Codecov : https://codecov.io/gh/Ynov-M1/Test_cycle_TDD

## Prérequis

- Node.js ≥ 20.x recommandé
- pnpm
- Git

## Installation et exécution en local

Clonez le dépôt :
```
git clone https://github.com/Ynov-M1/Test_cycle_TDD.git
```

Accédez au dossier de l’application :
```
cd Test_cycle_TDD/app
```

Installez les dépendances :
```
pnpm install
```

Lancez l’application en mode développement :
```
pnpm run dev
```

Ouvrez votre navigateur à l’adresse indiquée par Vite (par défaut : http://localhost:5173)

## Exécution des tests

Lancer tous les tests unitaires et d’intégration avec rapport de couverture:
```
pnpm run test
```

Les rapports sont générés dans app/coverage et envoyés automatiquement sur Codecov via GitHub Actions.

## Documentation technique

La documentation est générée automatiquement avec JSDoc à chaque build CI/CD.

Pour la générer manuellement :
```
cd app  
pnpm run doc
```
