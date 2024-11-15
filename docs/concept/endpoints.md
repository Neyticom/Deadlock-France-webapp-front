# Endpoints (Routes backend) - Deadlock France

## Patchnotes -> patchnotesController (CRUD)

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /patchnotes | - | Tableau de patchnotes | 200 | Récupérer toutes les patchnotes |
| GET | /patchnotes/:id | - | Données d'une patchnote | 200 | Récupérer une patchnote par son id |
| POST | /patchnotes | Données d'une patchnote | Données de la patchnote créée | 201 | Créer une nouvele patchnote |
| PUT | /patchnotes/:id | Données modifiées d'une patchnote | Données de la patchnote mise à jour | 200 | Modifier une patchnote existante par son id |
| DELETE | /patchnotes/:id | - | - | 204 | Supprimer une patchnote par son id |
| GET | /patchnotes/search | Liste de mots clés | Tableau de patchnotes | 200 | Rechercher une patchnote par mot clés |

## Authentication -> authenticationController (login / 2FA)

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| POST | /auth/login | Login + Password | - | 200 | Premier facteur d'authentification (Login/Password) |
| POST | /auth/2fa | Google Auth Code | - | 200 | Second facteur d'authentification (2FA: Google Auth) |
| GET | /auth/logout | - | - | 200 | Déconnexion |

## Users -> usersController

| Méthode | Chemin | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /users | - | Tableau de users | 200 | Récupérer tous les utilisateurs |
| GET | /users/:id | - | Données d'un user | 200 | Récupérer un utilisateur par son id |
| POST | /users | Données d'un user | Données du user créé | 201 | Créer un nouvel utilisateur |
| PUT | /users/:id  | Données modifiées d'un user | Données du user mis à jour | 200 | Modifier un utilisateur par son id |
| DELETE | /users/:id | - | - | 204 | Supprimer un utilisateur par son id |

## Logs -> logsController 

| Méthode | Chemin | Request Content | Response Content | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /logs | - | Tableau de logs | 200 | Consulter tous les logs |
| GET | /logs/:userId | - | Tableau de logs concernant l'user cible | 200 | Consulter les logs d'un utilisateur par son id |
| POST | /logs | Données d'un log | Données du log créé | 201 | Ajouter une entrée aux logs |

## Stats -> statisticsController (POST : View + Interractions | GET : all)

| Méthode | Chemin | Request Content | Response Content | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /stats/views | - | Tableau de statistiques JSON | 200 | Récupèrer les vues des différentes pages du site |
| GET | /stats/clicks | - | Tableau de statistiques JSON | 200 | Récupèrer les interactions avec les différents boutons/icones du site |
| POST | /stats/views |  |  | 201 | Enregistrer une vue pour une page du site |
| POST | /stats/clicks |  |  | 201 |  | Enregistrer une interaction sur un bouton/icone du site |

## Settings -> settingsController (contenu, liens)

| Méthode | Chemin | Request Content | Response Content | Status code (OK) | Description |
| ------- | ------ | --------------- | ---------------- | ---------------- | ----------- |
| GET | /settings |  |  | 200 | Récupérer les paramètres du site |
| PUT | /settings |  |  | 200 | Modifier les paramètres du site |
| GET | /settings/links |  |  | 200 | Récupérer les liens sociaux |
| PUT | /settings/links |  |  | 200 | Modifier les liens sociaux |

<!-- Databases -->

Users
-----
id
login
password
firtname
lastname
nickname
email
role_id -> Table "Roles"

Roles
------
id
name
level

Logs
-----
id
action/type -> Table "Action"
context -> patchnote_id / user_id
date + heure (timestamp)
user_id -> "Table "User"
ip

Action
------
id
name (CONNEXION : admin, DELETE: patchnotes & accès, CREATE: accès, EDIT: accès)