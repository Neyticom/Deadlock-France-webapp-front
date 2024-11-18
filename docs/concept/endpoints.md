# Endpoints (Routes backend) - Deadlock France

## Patchnotes -> patchnotesController

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /patchnotes | - | Tableau de patchnotes | 200 | Récupérer toutes les patchnotes |
| GET | /patchnotes/:id | - | Données d'une patchnote | 200 | Récupérer une patchnote par son id |
| POST | /patchnotes | Données d'une patchnote | Données de la patchnote créée | 201 | Créer une nouvele patchnote |
| PUT | /patchnotes/:id | Données modifiées d'une patchnote | Données de la patchnote mise à jour | 200 | Modifier une patchnote existante par son id |
| DELETE | /patchnotes/:id | - | - | 204 | Supprimer une patchnote par son id |
| GET | /patchnotes/search | Liste de mots clés | Tableau de patchnotes | 200 | Rechercher une patchnote par mot clés |

## Authentication - authenticationController (login / 2FA)

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| POST | /auth/login | Login + Password | - | 200 | Premier facteur d'authentification (Login/Password) |
| POST | /auth/2fa | Google Auth Code | - | 200 | Second facteur d'authentification (2FA: Google Auth) |
| POST | /auth/2fa-reset:id | - | Données de l'utilisateur mis à jour | 200 | Repasser un accès administrateur sur false en 2fa |
| POST | /auth/recovery | Email + Identifiant | - | 200 | Envoyer une demande de réinitialisation du mot de passe |
| GET | /auth/logout | - | - | 200 | Déconnexion |

## Users - usersController

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /users | - | Tableau de users | 200 | Récupérer tous les utilisateurs |
| GET | /users/:id | - | Données d'un user | 200 | Récupérer un utilisateur par son id |
| POST | /users | Données d'un user | Données du user créé | 201 | Créer un nouvel utilisateur |
| PUT | /users/:id  | Données modifiées d'un user | Données du user mis à jour | 200 | Modifier un utilisateur par son id |
| DELETE | /users/:id | - | - | 204 | Supprimer un utilisateur par son id |

## Logs - logsController 

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /logs | - | Tableau de logs | 200 | Consulter tous les logs |
| GET | /logs/:userId | - | Tableau de logs concernant l'user cible | 200 | Consulter les logs d'un utilisateur par son id |
| POST | /logs | Données d'un log | Données du log créé | 201 | Ajouter une entrée aux logs |

## Stats - statisticsController

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /stats/views | - | Tableau de statistiques | 200 | Récupèrer les vues des différentes pages du site |
| GET | /stats/clicks | - | Tableau de statistiques | 200 | Récupèrer les interactions avec les différents boutons/icones du site |
| PUT + POST (findOrCreate) | /stats/views | count + 1 | Données de l'interraction mise à jour | 201 | Incrémenter le compteur de vues pour l'heure actuelle sur une page du site |
| PUT + POST (findOrCreate) | /stats/clicks | count + 1  | Données de l'interraction mise à jour | 201 | Incrémenter le compteur d'interractions sur un bouton/icone pour l'heure actuelle sur une page du site |

## Settings - settingsController

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /settings | - | Tableau de paramètres du site | 200 | Récupérer les paramètres du site |
| PUT | /settings:key | Données modifiées d'un paramètre | Données du paramètre modifié | 200 | Modifier les paramètres du site |
