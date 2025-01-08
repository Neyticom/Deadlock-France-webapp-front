# Endpoints (Routes backend) - Deadlock France

## Table des matières
- [Patchnotes](#patchnotes---patchnotecontroller)
- [Authentication](#authentication---authcontroller)
- [Users](#users---usercontroller)
- [Roles](#roles---rolecontroller)
- [Heroes](#heroes---herocontroller)
- [Spells](#spells---spellcontroller)
- [Items](#items---itemcontroller)
- [Logs](#logs---logcontroller)
- [Statistics](#statistics---statisticscontroller)
- [Settings](#settings---settingscontroller)

## Patchnotes - patchnoteController

| Méthode | Chemin                   | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ------------------------ | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/patchnotes          | -                         | Tableau de patchnotes       | 200              | Récupérer toutes les patchnotes        |
| GET     | /api/patchnotes/:id      | -                         | Données d'une patchnote     | 200              | Récupérer une patchnote par son id     |
| POST    | /api/patchnotes          | Données d'une patchnote   | Données de la patchnote créée | 201              | Créer une nouvelle patchnote           |
| PATCH   | /api/patchnotes/:id      | Champs spécifiques        | Données de la patchnote mise à jour | 200  | Modifier partiellement une patchnote  |
| PUT     | /api/patchnotes/:id      | Données complètes         | Données de la patchnote mise à jour | 200  | Remplacer totalement une patchnote    |
| DELETE  | /api/patchnotes/:id      | -                         | {"message": "Patchnote supprimée"} | 200              | Supprimer une patchnote par son id     |
| GET     | /api/patchnotes/search   | Liste de mots clés        | Tableau de patchnotes       | 200              | Rechercher une patchnote par mots-clés |

## Authentication - authController

| Méthode | Chemin                 | Request Body (JSON)           | Response Body (JSON)        | Status code (OK) | Description                                  |
| ------- | ---------------------- | ----------------------------- | --------------------------- | ---------------- | -------------------------------------------- |
| POST    | /api/auth/login        | Login + Password              | -                           | 200              | Premier facteur d'authentification (Login/Password) |
| POST    | /api/auth/2fa          | Google Auth Code              | -                           | 200              | Second facteur d'authentification (2FA)      |
| POST    | /api/auth/2fa-reset/:id| -                             | Données de l'utilisateur mis à jour | 200          | Réinitialiser un accès administrateur 2FA   |
| POST    | /api/auth/recovery     | Email + Identifiant           | -                           | 200              | Envoyer une demande de réinitialisation      |
| GET     | /api/auth/logout       | -                             | {"message": "Déconnexion réussie"} | 200          | Déconnexion                                 |

## Users - userController

| Méthode | Chemin                  | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/users              | -                         | Tableau de users            | 200              | Récupérer tous les utilisateurs        |
| GET     | /api/users/:id          | -                         | Données d'un user           | 200              | Récupérer un utilisateur par son id    |
| POST    | /api/users              | Données d'un user         | Données du user créé        | 201              | Créer un nouvel utilisateur            |
| PATCH   | /api/users/:id          | Champs spécifiques        | Données du user mis à jour  | 200              | Modifier partiellement un utilisateur  |
| PUT     | /api/users/:id          | Données complètes         | Données du user mis à jour  | 200              | Remplacer totalement un utilisateur    |
| DELETE  | /api/users/:id          | -                         | {"message": "Utilisateur supprimé"} | 200          | Supprimer un utilisateur par son id    |

## Roles - roleController

| Méthode | Chemin                  | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/roles              | -                         | Tableau de rôles            | 200              | Récupérer tous les rôles disponibles   |
| POST    | /api/roles              | Données d'un rôle         | Données du rôle créé        | 201              | Créer un nouveau rôle                  |
| DELETE  | /api/roles/:id          | -                         | {"message": "Rôle supprimé"} | 200             | Supprimer un rôle                     |
| GET     | /api/users/:id/roles    | -                         | Liste des rôles attribués   | 200              | Récupérer les rôles d'un utilisateur   |
| POST    | /api/users/:id/roles    | Liste des rôles à attribuer | Données du user mis à jour  | 200              | Ajouter des rôles à un utilisateur     |
| DELETE  | /api/users/:id/roles/:roleId | -                      | Données du user mis à jour  | 200              | Retirer un rôle spécifique            |

## Heroes - heroController

| Méthode | Chemin                  | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/heroes             | -                         | Tableau de héros            | 200              | Récupérer tous les héros               |
| POST    | /api/heroes             | Données d'un héros        | Données du héros créé       | 201              | Créer un nouveau héros                 |
| PATCH   | /api/heroes/:id         | Champs spécifiques        | Données du héros mis à jour | 200              | Modifier partiellement un héros       |
| DELETE  | /api/heroes/:id         | -                         | {"message": "Héros supprimé"} | 200            | Supprimer un héros                    |

## Spells - spellController

| Méthode | Chemin                  | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/spells             | -                         | Tableau de sorts            | 200              | Récupérer tous les sorts               |
| POST    | /api/spells             | Données d'un sort         | Données du sort créé        | 201              | Créer un nouveau sort                 |
| PATCH   | /api/spells/:id         | Champs spécifiques        | Données du sort mis à jour  | 200              | Modifier partiellement un sort        |
| DELETE  | /api/spells/:id         | -                         | {"message": "Sort supprimé"} | 200             | Supprimer un sort                     |

## Items - itemController

| Méthode | Chemin                  | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/items              | -                         | Tableau d'items             | 200              | Récupérer tous les items               |
| POST    | /api/items              | Données d'un item         | Données de l'item créé      | 201              | Créer un nouvel item                  |
| PATCH   | /api/items/:id          | Champs spécifiques        | Données de l'item mis à jour| 200              | Modifier partiellement un item        |
| DELETE  | /api/items/:id          | -                         | {"message": "Item supprimé"} | 200             | Supprimer un item                     |

## Logs - logController

| Méthode | Chemin                   | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ------------------------ | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/logs                | -                         | Tableau de logs             | 200              | Récupérer tous les logs                |
| GET     | /api/logs/:userId        | -                         | Logs d'un utilisateur       | 200              | Récupérer les logs d'un utilisateur spécifique |
| POST    | /api/logs                | Données d'un log          | Log créé                    | 201              | Ajouter une entrée aux logs            |
| DELETE  | /api/logs/:id            | -                         | {"message": "Log supprimé"} | 200              | Supprimer une entrée de log            |

## Statistics - statisticsController

| Méthode | Chemin                   | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ------------------------ | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/stats/views         | -                         | Statistiques des vues       | 200              | Récupérer les vues du site             |
| GET     | /api/stats/clicks        | -                         | Statistiques des clics      | 200              | Récupérer les clics sur les boutons/icônes |
| POST (findOrCreate) | /api/stats/views         | count + 1                 | Mise à jour du compteur     | 201              | Incrémenter les vues                  |
| POST (findOrCreate) | /api/stats/clicks        | count + 1                 | Mise à jour du compteur     | 201              | Incrémenter les clics                 |

## Settings - settingsController

| Méthode | Chemin                   | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ------------------------ | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/settings            | -                         | Liste des paramètres        | 200              | Récupérer les paramètres du site       |
| PATCH   | /api/settings/:key       | Données modifiées         | Paramètre mis à jour        | 200              | Modifier partiellement un paramètre   |
| PUT     | /api/settings/:key       | Données complètes         | Paramètre mis à jour        | 200              | Remplacer totalement un paramètre     |