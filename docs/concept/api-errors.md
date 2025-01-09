# Gestion des Erreurs - Deadlock France

## Table des matières
- [Codes d'erreurs génériques](#codes-derreurs-génériques)
- [Détails des erreurs par contrôleur](#détails-des-erreurs-par-contrôleur)
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
  
## Codes d'erreurs génériques :
Ces codes d'erreurs s'appliquent à tous les endpoints sauf mention contraire dans les contrôleurs spécifiques.

| Code  | Description                                 | Exemple de réponse JSON                       |
|-------|---------------------------------------------|------------------------------------------------|
| 400   | Requête invalide                            | {"error": "Données invalides"}                  |
| 401   | Non authentifié                             | {"error": "Accès non autorisé"}                 |
| 403   | Accès refusé                                | {"error": "Accès interdit"}                     |
| 404   | Ressource non trouvée                       | {"error": "Ressource introuvable"}              |
| 409   | Conflit (ex : doublon de données)           | {"error": "Conflit de données"}                 |
| 500   | Erreur interne du serveur                   | {"error": "Erreur interne, réessayez plus tard"}|

## Détails des erreurs par contrôleur :
Certains contrôleurs peuvent renvoyer des erreurs spécifiques en plus des erreurs génériques.

### **Patchnotes - patchnoteController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de création/modification invalides | {"error": "Format de patchnote incorrect"}     |
| 404   | Patchnote introuvable                     | {"error": "Patchnote non trouvée"}             |
| 409   | Version de patchnote déjà existante       | {"error": "Conflit, version déjà créée"}       |

### **Authentication - authController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Requête mal formée                        | {"error": "Données invalides"}                 |
| 401   | Identifiants incorrects                   | {"error": "Identifiants incorrects"}           |
| 403   | Échec 2FA                                 | {"error": "Code 2FA invalide"}                 |
| 404   | Utilisateur non trouvé                    | {"error": "Utilisateur introuvable"}           |

### **Users - userController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de création/modification invalides | {"error": "Format utilisateur incorrect"}      |
| 404   | Utilisateur introuvable                   | {"error": "Utilisateur non trouvé"}            |
| 409   | Email ou login déjà utilisé               | {"error": "Email déjà pris"}                   |

### **Roles - roleController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Requête mal formée                        | {"error": "Format de rôle invalide"}           |
| 404   | Rôle non trouvé                           | {"error": "Rôle non trouvé"}                   |
| 409   | Rôle déjà attribué                        | {"error": "Conflit, rôle déjà attribué"}       |

### **Heroes - heroController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de création/modification invalides | {"error": "Format de héros incorrect"}         |
| 404   | Héros non trouvé                          | {"error": "Héros introuvable"}                 |
| 409   | Nom de héros déjà existant                | {"error": "Héros avec ce nom existe déjà"}     |

### **Spells - spellController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de création/modification invalides | {"error": "Format de sort incorrect"}          |
| 404   | Sort non trouvé                           | {"error": "Sort introuvable"}                  |
| 409   | Nom de sort déjà existant                 | {"error": "Sort avec ce nom existe déjà"}      |

### **Items - itemController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de création/modification invalides | {"error": "Format d'item incorrect"}           |
| 404   | Item non trouvé                           | {"error": "Item introuvable"}                  |
| 409   | Nom d'item déjà existant                  | {"error": "Item avec ce nom existe déjà"}      |

### **Logs - logController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de log invalides                  | {"error": "Format de log incorrect"}           |
| 404   | Log non trouvé                            | {"error": "Log introuvable"}                   |

### **Statistics - statisticsController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Requête de statistiques invalide          | {"error": "Données invalides"}                 |
| 404   | Statistiques non disponibles              | {"error": "Aucune statistique trouvée"}        |

### **Settings - settingsController :**
| Code  | Scénario                                  | Exemple de réponse JSON                       |
|-------|-------------------------------------------|------------------------------------------------|
| 400   | Données de modification invalides         | {"error": "Format de paramètres incorrect"}    |
| 404   | Clé de paramètre introuvable              | {"error": "Clé de paramètre non trouvée"}      |
