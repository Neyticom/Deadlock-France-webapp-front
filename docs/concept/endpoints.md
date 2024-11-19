# Endpoints (Routes backend) - Deadlock France

## Patchnotes -> patchnotesController

| Méthode | Chemin               | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | -------------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/patchnotes      | -                         | Tableau de patchnotes       | 200              | Récupérer toutes les patchnotes        |
| GET     | /api/patchnotes/:id  | -                         | Données d'une patchnote     | 200              | Récupérer une patchnote par son id     |
| POST    | /api/patchnotes      | Données d'une patchnote   | Données de la patchnote créée | 201            | Créer une nouvelle patchnote           |
| PUT     | /api/patchnotes/:id  | Données modifiées d'une patchnote | Données de la patchnote mise à jour | 200  | Modifier une patchnote existante par son id |
| DELETE  | /api/patchnotes/:id  | -                         | -                           | 204              | Supprimer une patchnote par son id     |
| GET     | /api/patchnotes/search | Liste de mots clés       | Tableau de patchnotes       | 200              | Rechercher une patchnote par mots-clés |

## Authentication - authenticationController (login / 2FA)

| Méthode | Chemin                 | Request Body (JSON)           | Response Body (JSON)        | Status code (OK) | Description                                  |
| ------- | ---------------------- | ----------------------------- | --------------------------- | ---------------- | -------------------------------------------- |
| POST    | /api/auth/login        | Login + Password              | -                           | 200              | Premier facteur d'authentification (Login/Password) |
| POST    | /api/auth/2fa          | Google Auth Code              | -                           | 200              | Second facteur d'authentification (2FA: Google Auth) |
| POST    | /api/auth/2fa-reset:id | -                             | Données de l'utilisateur mis à jour | 200          | Réinitialiser un accès administrateur 2FA   |
| POST    | /api/auth/recovery     | Email + Identifiant           | -                           | 200              | Envoyer une demande de réinitialisation du mot de passe |
| GET     | /api/auth/logout       | -                             | -                           | 200              | Déconnexion                                 |

## Users - usersController

| Méthode | Chemin            | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ----------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/users        | -                         | Tableau de users            | 200              | Récupérer tous les utilisateurs        |
| GET     | /api/users/:id    | -                         | Données d'un user           | 200              | Récupérer un utilisateur par son id    |
| POST    | /api/users        | Données d'un user         | Données du user créé         | 201              | Créer un nouvel utilisateur            |
| PUT     | /api/users/:id    | Données modifiées d'un user | Données du user mis à jour  | 200              | Modifier un utilisateur par son id     |
| DELETE  | /api/users/:id    | -                         | -                           | 204              | Supprimer un utilisateur par son id    |

## Logs - logsController 

| Méthode | Chemin           | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ---------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/logs        | -                         | Tableau de logs             | 200              | Consulter tous les logs                |
| GET     | /api/logs/:userId | -                        | Tableau de logs concernant l'user cible | 200         | Consulter les logs d'un utilisateur par son id |
| POST    | /api/logs        | Données d'un log          | Données du log créé          | 201              | Ajouter une entrée aux logs            |

## Stats - statisticsController

| Méthode | Chemin           | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ---------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/stats/views | -                         | Tableau de statistiques     | 200              | Récupérer les vues des différentes pages du site |
| GET     | /api/stats/clicks | -                        | Tableau de statistiques     | 200              | Récupérer les interactions avec les différents boutons/icônes du site |
| PUT + POST (findOrCreate) | /api/stats/views | count + 1 | Données de l'interaction mise à jour | 201 | Incrémenter le compteur de vues |
| PUT + POST (findOrCreate) | /api/stats/clicks | count + 1 | Données de l'interaction mise à jour | 201 | Incrémenter le compteur de clics |

## Settings - settingsController

| Méthode | Chemin           | Request Body (JSON)       | Response Body (JSON)        | Status code (OK) | Description                            |
| ------- | ---------------- | ------------------------- | --------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/settings    | -                         | Tableau de paramètres du site | 200            | Récupérer les paramètres du site       |
| PUT     | /api/settings:key | Données modifiées d'un paramètre | Données du paramètre modifié | 200          | Modifier les paramètres du site        |
