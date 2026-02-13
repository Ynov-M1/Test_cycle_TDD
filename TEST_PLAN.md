# TEST_PLAN.md

## 1. Objectif

Ce document décrit le plan de tests pour valider les modules de validation (`validator.js`, `module.js`, `errorMessages.js`) et le formulaire `PersonForm`.  

Objectifs principaux :
- Vérifier toutes les validations unitaires.
- Vérifier l’affichage des erreurs dans le DOM.
- Vérifier le comportement global du formulaire : activation/désactivation du bouton, sauvegarde dans `localStorage`, affichage du toast de succès.

---

## 2. Portée

### 2.1 Unit Tests (UT)
- `calculateAge`
- `validatePerson`
- `validateAge`
- `validateZipCode`
- `validateCity`
- `validateName`
- `validateEmail`
- `getErrorMessage`

### 2.2 Integration Tests (IT)
- Composant `PersonForm`
- Gestion des erreurs dans le DOM
- Activation/désactivation du bouton submit
- Sauvegarde dans `localStorage`
- Affichage du toast de succès
- Vérification des messages d’erreur

---

## 3. Stratégie de test

### 3.1 Tests Unitaires (UT)

- **calculateAge**
    - Retourne l’âge correct pour un objet `{ birth: Date }`
    - Gestion des erreurs : paramètre manquant, type incorrect, champ `birth` absent, date invalide

- **validatePerson**
    - Cas positif : objet `person` complet et valide
    - Cas négatifs : paramètre manquant, champs manquants, mauvais type de champs

- **validateAge**
    - Cas positif : adulte ≥ 18 ans
    - Cas négatifs : âge < 18, date invalide, date future

- **validateZipCode**
    - Cas positif : 5 chiffres
    - Cas négatifs : moins ou plus de chiffres, lettres, null

- **validateCity**
    - Cas positif : noms de ville corrects (lettres, accents)
    - Cas négatifs : chiffres, symboles, XSS

- **validateName**
    - Cas positif : lettres, accents, tirets
    - Cas négatifs : chiffres, symboles, XSS, type invalide

- **validateEmail**
    - Cas positif : email correct
    - Cas négatifs : format incorrect, null

- **getErrorMessage**
  - Cas positif : erreur reconnue
  - Cas négatifs : erreur inconnue

---

### 3.2 Tests d’intégration (IT)

- **Formulaire complet**
  - Champs vides → bouton `Soumettre` désactivé
  - Saisie de valeurs invalides → affichage du message d’erreur sous le champ
  - Correction progressive → disparition des erreurs
  - Formulaire valide → bouton `Soumettre` activé
  - Soumission → toast de succès visible
  - Soumission → `localStorage` mis à jour
  - Soumission → champs vidés après soumission

- **Cas spécifiques**
  - Age < 18 → message `"Vous devez avoir au moins 18 ans"`
  - Date future → message `"La date de naissance ne peut pas être dans le futur"`
  - Zip invalide → message `"Le code postal doit contenir 5 chiffres"`
  - Ville invalide → message `"Le nom de la ville n'est pas valide"`
  - Email invalide → message `"L'email n'est pas valide"`
  - Injection XSS (firstName / city) → message `"Caractères interdits détectés"`

---

### 3.3 Objectifs de couverture

- Couverture maximale **unit tests** : toutes les validations.
- Couverture maximale **integration tests** : tous les flux utilisateurs, erreurs, corrections et Soumission.
- Vérification du toast et de `localStorage`.