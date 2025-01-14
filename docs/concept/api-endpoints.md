# Endpoints (Routes backend) - Deadlock France

## Table des matières

- [Patchnotes](#patchnotes---patchnotecontroller)
- [Patchnote Entries](#patchnote-entries---patchnoteentrycontroller)
- [Authentication](#authentication---authcontroller)
- [Users](#users---usercontroller)
- [Roles](#roles---rolecontroller)
- [Heroes](#heroes---herocontroller)
- [Spells](#spells---spellcontroller)
- [Spell Effects](#spell-effects---spelleffectcontroller)
- [Items](#items---itemcontroller)
- [Item Effects](#item-effects---itemeffectcontroller)
- [Keywords](#keywords---keywordcontroller)
- [Logs](#logs---logcontroller)
- [Statistics](#statistics---statisticscontroller)
- [Settings](#settings---settingscontroller)

## Patchnotes - patchnoteController

| Méthode | Chemin                 | Request Body (JSON)     | Response Body (JSON)                | Status code (OK) | Description                            |
| ------- | ---------------------- | ----------------------- | ----------------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/patchnotes        | -                       | Tableau de patchnotes               | 200              | Récupérer toutes les patchnotes        |
| GET     | /api/patchnotes/:id    | -                       | Données d'une patchnote             | 200              | Récupérer une patchnote par son id     |
| POST    | /api/patchnotes        | Données d'une patchnote | Données de la patchnote créée       | 201              | Créer une nouvelle patchnote           |
| PATCH   | /api/patchnotes/:id    | Champs spécifiques      | Données de la patchnote mise à jour | 200              | Modifier partiellement une patchnote   |
| PUT     | /api/patchnotes/:id    | Données complètes       | Données de la patchnote mise à jour | 200              | Remplacer totalement une patchnote     |
| DELETE  | /api/patchnotes/:id    | -                       | {"message": "Patchnote supprimée"}  | 200              | Supprimer une patchnote par son id     |
| GET     | /api/patchnotes/search | Liste de mots clés      | Tableau de patchnotes               | 200              | Rechercher une patchnote par mots-clés |

## Patchnote Entries - patchnoteEntryController

| Méthode | Chemin                          | Request Body (JSON)           | Response Body (JSON)                      | Status Code (OK) | Description                                    |
| ------- | ------------------------------- | ----------------------------- | ----------------------------------------- | ---------------- | ---------------------------------------------- |
| GET     | /api/patchnotes/:id/entries     | -                             | Tableau de patchnote entries              | 200              | Récupérer toutes les entrées d'une patchnote   |
| GET     | /api/patchnotes/:id/entries/:id | -                             | Données d'une patchnote entry             | 200              | Récupérer une entrée de patchnote par son ID   |
| POST    | /api/patchnotes/:id/entries     | Données d'une patchnote entry | Données de la patchnote entry créée       | 201              | Créer une nouvelle entrée pour une patchnote   |
| PATCH   | /api/patchnotes/:id/entries/:id | Champs spécifiques            | Données de la patchnote entry mise à jour | 200              | Modifier partiellement une entrée de patchnote |
| DELETE  | /api/patchnotes/:id/entries/:id | -                             | {"message": "Entrée supprimée"}           | 200              | Supprimer une entrée de patchnote              |

## Authentication - authController

| Méthode | Chemin                  | Request Body (JSON) | Response Body (JSON)                | Status code (OK) | Description                                         |
| ------- | ----------------------- | ------------------- | ----------------------------------- | ---------------- | --------------------------------------------------- |
| POST    | /api/auth/login         | Login + Password    | -                                   | 200              | Premier facteur d'authentification (Login/Password) |
| POST    | /api/auth/2fa           | Google Auth Code    | -                                   | 200              | Second facteur d'authentification (2FA)             |
| POST    | /api/auth/2fa-reset/:id | -                   | Données de l'utilisateur mis à jour | 200              | Réinitialiser un accès administrateur 2FA           |
| POST    | /api/auth/recovery      | Email + Identifiant | -                                   | 200              | Envoyer une demande de réinitialisation             |
| GET     | /api/auth/logout        | -                   | {"message": "Déconnexion réussie"}  | 200              | Déconnexion                                         |

## Users - userController

| Méthode | Chemin         | Request Body (JSON) | Response Body (JSON)                | Status code (OK) | Description                           |
| ------- | -------------- | ------------------- | ----------------------------------- | ---------------- | ------------------------------------- |
| GET     | /api/users     | -                   | Tableau de users                    | 200              | Récupérer tous les utilisateurs       |
| GET     | /api/users/:id | -                   | Données d'un user                   | 200              | Récupérer un utilisateur par son id   |
| POST    | /api/users     | Données d'un user   | Données du user créé                | 201              | Créer un nouvel utilisateur           |
| PATCH   | /api/users/:id | Champs spécifiques  | Données du user mis à jour          | 200              | Modifier partiellement un utilisateur |
| PUT     | /api/users/:id | Données complètes   | Données du user mis à jour          | 200              | Remplacer totalement un utilisateur   |
| DELETE  | /api/users/:id | -                   | {"message": "Utilisateur supprimé"} | 200              | Supprimer un utilisateur par son id   |

## Roles - roleController

| Méthode | Chemin                       | Request Body (JSON)         | Response Body (JSON)         | Status code (OK) | Description                          |
| ------- | ---------------------------- | --------------------------- | ---------------------------- | ---------------- | ------------------------------------ |
| GET     | /api/roles                   | -                           | Tableau de rôles             | 200              | Récupérer tous les rôles disponibles |
| POST    | /api/roles                   | Données d'un rôle           | Données du rôle créé         | 201              | Créer un nouveau rôle                |
| DELETE  | /api/roles/:id               | -                           | {"message": "Rôle supprimé"} | 200              | Supprimer un rôle                    |
| GET     | /api/users/:id/roles         | -                           | Liste des rôles attribués    | 200              | Récupérer les rôles d'un utilisateur |
| POST    | /api/users/:id/roles         | Liste des rôles à attribuer | Données du user mis à jour   | 200              | Ajouter des rôles à un utilisateur   |
| DELETE  | /api/users/:id/roles/:roleId | -                           | Données du user mis à jour   | 200              | Retirer un rôle spécifique           |

## Heroes - heroController

| Méthode | Chemin          | Request Body (JSON) | Response Body (JSON)          | Status code (OK) | Description                     |
| ------- | --------------- | ------------------- | ----------------------------- | ---------------- | ------------------------------- |
| GET     | /api/heroes     | -                   | Tableau de héros              | 200              | Récupérer tous les héros        |
| GET     | /api/heroes/:id | -                   | Données d'un héros            | 200              | Récupérer un héros par son ID   |
| POST    | /api/heroes     | Données d'un héros  | Données du héros créé         | 201              | Créer un nouveau héros          |
| PATCH   | /api/heroes/:id | Champs spécifiques  | Données du héros mis à jour   | 200              | Modifier partiellement un héros |
| DELETE  | /api/heroes/:id | -                   | {"message": "Héros supprimé"} | 200              | Supprimer un héros              |

## Spells - spellController

| Méthode | Chemin          | Request Body (JSON) | Response Body (JSON)         | Status code (OK) | Description                    |
| ------- | --------------- | ------------------- | ---------------------------- | ---------------- | ------------------------------ |
| GET     | /api/spells     | -                   | Tableau de sorts             | 200              | Récupérer tous les sorts       |
| GET     | /api/spells/:id | -                   | Données d'un sort            | 200              | Récupérer un sort par son ID   |
| POST    | /api/spells     | Données d'un sort   | Données du sort créé         | 201              | Créer un nouveau sort          |
| PATCH   | /api/spells/:id | Champs spécifiques  | Données du sort mis à jour   | 200              | Modifier partiellement un sort |
| DELETE  | /api/spells/:id | -                   | {"message": "Sort supprimé"} | 200              | Supprimer un sort              |

## Spell Effects - spellEffectController

| Méthode | Chemin                      | Request Body (JSON)       | Response Body (JSON)               | Status Code (OK) | Description                             |
| ------- | --------------------------- | ------------------------- | ---------------------------------- | ---------------- | --------------------------------------- |
| GET     | /api/spells/:id/effects     | -                         | Tableau de spell effects           | 200              | Récupérer tous les effets d'un sort     |
| GET     | /api/spells/:id/effects/:id | -                         | Données d'un spell effect          | 200              | Récupérer un effet de sort par son ID   |
| POST    | /api/spells/:id/effects     | Données d'un spell effect | Données du spell effect créé       | 201              | Créer un nouvel effet pour un sort      |
| PATCH   | /api/spells/:id/effects/:id | Champs spécifiques        | Données du spell effect mis à jour | 200              | Modifier partiellement un effet de sort |
| DELETE  | /api/spells/:id/effects/:id | -                         | {"message": "Effet supprimé"}      | 200              | Supprimer un effet de sort              |

## Items - itemController

| Méthode | Chemin         | Request Body (JSON) | Response Body (JSON)         | Status code (OK) | Description                    |
| ------- | -------------- | ------------------- | ---------------------------- | ---------------- | ------------------------------ |
| GET     | /api/items     | -                   | Tableau d'items              | 200              | Récupérer tous les items       |
| GET     | /api/items/:id | -                   | Données d'un item            | 200              | Récupérer un item par son ID   |
| POST    | /api/items     | Données d'un item   | Données de l'item créé       | 201              | Créer un nouvel item           |
| PATCH   | /api/items/:id | Champs spécifiques  | Données de l'item mis à jour | 200              | Modifier partiellement un item |
| DELETE  | /api/items/:id | -                   | {"message": "Item supprimé"} | 200              | Supprimer un item              |

## Item Effects - itemEffectController

| Méthode | Chemin                     | Request Body (JSON)      | Response Body (JSON)              | Status Code (OK) | Description                            |
| ------- | -------------------------- | ------------------------ | --------------------------------- | ---------------- | -------------------------------------- |
| GET     | /api/items/:id/effects     | -                        | Tableau d'item effects            | 200              | Récupérer tous les effets d'un item    |
| GET     | /api/items/:id/effects/:id | -                        | Données d'un item effect          | 200              | Récupérer un effet d'item par son ID   |
| POST    | /api/items/:id/effects     | Données d'un item effect | Données du item effect créé       | 201              | Créer un nouvel effet pour un item     |
| PATCH   | /api/items/:id/effects/:id | Champs spécifiques       | Données du item effect mis à jour | 200              | Modifier partiellement un effet d'item |
| DELETE  | /api/items/:id/effects/:id | -                        | {"message": "Effet supprimé"}     | 200              | Supprimer un effet d'item              |

## Keywords - keywordController

| Méthode | Chemin            | Request Body (JSON)  | Response Body (JSON)           | Status Code (OK) | Description                       |
| ------- | ----------------- | -------------------- | ------------------------------ | ---------------- | --------------------------------- |
| GET     | /api/keywords     | -                    | Tableau de keywords            | 200              | Récupérer tous les mots-clés      |
| GET     | /api/keywords/:id | -                    | Données d'un keyword           | 200              | Récupérer un mot-clé par son ID   |
| POST    | /api/keywords     | Données d'un keyword | Données du keyword créé        | 201              | Créer un nouveau mot-clé          |
| PATCH   | /api/keywords/:id | Champs spécifiques   | Données du keyword mis à jour  | 200              | Modifier partiellement un mot-clé |
| DELETE  | /api/keywords/:id | -                    | {"message": "Keyword deleted"} | 200              | Supprimer un mot-clé par son ID   |

## Logs - logController

| Méthode | Chemin            | Request Body (JSON) | Response Body (JSON)        | Status code (OK) | Description                                    |
| ------- | ----------------- | ------------------- | --------------------------- | ---------------- | ---------------------------------------------- |
| GET     | /api/logs         | -                   | Tableau de logs             | 200              | Récupérer tous les logs                        |
| GET     | /api/logs/:userId | -                   | Logs d'un utilisateur       | 200              | Récupérer les logs d'un utilisateur spécifique |
| POST    | /api/logs         | Données d'un log    | Log créé                    | 201              | Ajouter une entrée aux logs                    |
| DELETE  | /api/logs/:id     | -                   | {"message": "Log supprimé"} | 200              | Supprimer une entrée de log                    |

## Statistics - statisticsController

| Méthode             | Chemin            | Request Body (JSON) | Response Body (JSON)    | Status code (OK) | Description                                |
| ------------------- | ----------------- | ------------------- | ----------------------- | ---------------- | ------------------------------------------ |
| GET                 | /api/stats/views  | -                   | Statistiques des vues   | 200              | Récupérer les vues du site                 |
| GET                 | /api/stats/clicks | -                   | Statistiques des clics  | 200              | Récupérer les clics sur les boutons/icônes |
| POST (findOrCreate) | /api/stats/views  | count + 1           | Mise à jour du compteur | 201              | Incrémenter les vues                       |
| POST (findOrCreate) | /api/stats/clicks | count + 1           | Mise à jour du compteur | 201              | Incrémenter les clics                      |

## Settings - settingsController

| Méthode | Chemin             | Request Body (JSON) | Response Body (JSON) | Status code (OK) | Description                         |
| ------- | ------------------ | ------------------- | -------------------- | ---------------- | ----------------------------------- |
| GET     | /api/settings      | -                   | Liste des paramètres | 200              | Récupérer les paramètres du site    |
| PATCH   | /api/settings/:key | Données modifiées   | Paramètre mis à jour | 200              | Modifier partiellement un paramètre |
| PUT     | /api/settings/:key | Données complètes   | Paramètre mis à jour | 200              | Remplacer totalement un paramètre   |
