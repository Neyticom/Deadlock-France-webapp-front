# 📌 Plan de Test - Deadlock France API

## **1️⃣ Introduction**

Ce document décrit la stratégie de test de l'API **Deadlock France**. Il couvre les **tests unitaires, d'intégration et end-to-end (E2E)**, garantissant la fiabilité et la sécurité du projet.

---

## **2️⃣ Objectifs des Tests**

- ✅ Vérifier la conformité aux spécifications définies dans `CDC.md`.
- ✅ Tester la cohérence des **réponses API** et la gestion des erreurs.
- ✅ Vérifier le respect des **règles de validation** définies dans les schémas Joi.
- ✅ Garantir que les **permissions et rôles** sont bien appliqués.
- ✅ Simuler un **parcours utilisateur complet (E2E)** en environnement contrôlé.

---

## **3️⃣ Environnement de Test**

| 📌 Élément              | 🛠️ Technologie utilisée             |
| ----------------------- | ----------------------------------- |
| **Framework de test**   | Jest                                |
| **Client HTTP**         | Supertest                           |
| **Base de données**     | SQLite in-memory                    |
| **ORM**                 | Sequelize                           |
| **Validation**          | Joi                                 |
| **Exécution des tests** | `npm test` ou `npm test --coverage` |

Chaque test démarre avec une **base de données propre** via `setupTestDB.ts`.

---

## **4️⃣ Tests Unitaires**

Ces tests valident **chaque composant isolé** (services, middlewares, modèles).

| 📌 Module       | 🛠️ Fichiers de test                                                              |
| --------------- | -------------------------------------------------------------------------------- |
| **Middlewares** | `authMiddleware.test.ts`, `errorHandler.test.ts`, `validationMiddleware.test.ts` |
| **Modèles**     | `hero.test.ts`, `item.test.ts`, `patchnote.test.ts`, `user.test.ts` et autres    |
| **Services**    | `cryptoService.test.ts`, `logService.test.ts`                                    |

✔ Vérification des **modèles et contraintes** (types, relations, NOT NULL, ENUM...).  
✔ Tests des **services indépendamment des routes API**.  
✔ Gestion des **erreurs dans les middlewares** (auth, validation, logs).

---

## **5️⃣ Tests d’Intégration**

Ces tests vérifient **l’interaction entre les controllers, services et base de données**.

| 📌 Endpoint             | 🛠️ Fichier de test                            |
| ----------------------- | --------------------------------------------- |
| **Authentification**    | `auth.test.ts`                                |
| **Utilisateurs**        | `user.test.ts`                                |
| **Items & Effets**      | `item.test.ts`, `itemEffect.test.ts`          |
| **Patchnotes**          | `patchnote.test.ts`, `patchnoteEntry.test.ts` |
| **Logs & Statistiques** | `log.test.ts`, `statistic.test.ts`            |

**Remarque** : Les autres entités (ex: _Spell, Keyword..._) suivent la même logique de test.

✔ Vérification des **routes API et statuts HTTP**.  
✔ Tests de **validation avec Joi**.  
✔ Vérification des **permissions et rôles**.

---

## **6️⃣ Tests End-to-End (E2E)**

Le test **`userFlow.test.ts`** simule un **parcours utilisateur complet**.

### **📌 Parcours utilisateur testé**

1. **Connexion échoue avec un mauvais mot de passe** (`401 Unauthorized`).
2. **Inscription d’un utilisateur** (`POST /api/users`).
3. **Connexion et récupération du token JWT** (`POST /api/auth/login`).
4. **Consultation de la liste des utilisateurs (admin seulement)** (`GET /api/users`).
5. **Accès refusé à `/api/users` pour un utilisateur non-admin** (`403 Forbidden`).
6. **Création d’un patchnote (admin seulement)** (`POST /api/patchnotes`).
7. **Consultation des patchnotes (public)** (`GET /api/patchnotes`).
8. **Création d’un item (admin seulement)** (`POST /api/items`).
9. **Consultation des items par un utilisateur** (`GET /api/items`).
10. **Modification d’un item (admin seulement)** (`PATCH /api/items/:id`).
11. **Déconnexion de l’utilisateur** (`GET /api/auth/logout`).
12. **Désactivation du compte utilisateur (suppression du rôle)** (`DELETE /api/users/:id/role`).

✔ Vérification des **permissions** sur chaque action.  
✔ Simulation d’un **scénario réel du début à la fin**.  
✔ Assure que **chaque étape du parcours utilisateur fonctionne sans bug**.

---

## **7️⃣ Gestion des erreurs et scénarios négatifs**

Ces tests assurent la robustesse de l'API face aux erreurs courantes et aux comportements inattendus.

| 📌 **Cas testé**                                               | 🛠️ **Test associé**            |
| -------------------------------------------------------------- | ------------------------------ |
| **Échec d’authentification** (`401 Unauthorized`)              | `auth.test.ts`                 |
| **Inscription avec un email déjà utilisé** (`400 Bad Request`) | `user.test.ts`                 |
| **Accès interdit à une route admin** (`403 Forbidden`)         | `userFlow.test.ts`             |
| **Création d’un item sans respecter les contraintes Joi**      | `item.test.ts`                 |
| **Modification d’un item par un utilisateur non-admin**        | `item.test.ts`                 |
| **Requête sur un ID inexistant (`404 Not Found`)**             | `user.test.ts`, `item.test.ts` |
| **Tentative d'accès avec un token JWT invalide/expiré**        | `auth.test.ts`                 |
| **Données invalides envoyées à l'API** (`400 Bad Request`)     | `patchnote.test.ts`            |
| **Gestion d'erreurs internes (`500 Internal Server Error`)**   | `errorHandler.test.ts`         |

### ✔ **Validation des erreurs**

✅ Vérification des **codes d'erreur HTTP** (`400`, `401`, `403`, `404`, `500`).  
✅ Vérification des **messages d'erreur explicites**.  
✅ Tests des **protections d’accès** (authentification et permissions).  
✅ Simulation d’erreurs pour garantir une **gestion robuste des exceptions**.

---

## **8️⃣ Couverture des tests**

La couverture des tests est **un indicateur clé** pour assurer que l’ensemble du code est testé.

📌 **Commande pour générer un rapport complet et détaillé des tests** :

```sh
npm test --coverage
```

| 📌 **Type de test**   | 🎯 **Résultat obtenu** |
| --------------------- | ---------------------- |
| **Test Suites**       | ✅ 33/33 (100%)        |
| **Tests**             | ✅ 176/176 (100%)      |
| **Snapshots**         | 🚫 0 total             |
| **Temps d’exécution** | ⏳ ~77s                |
