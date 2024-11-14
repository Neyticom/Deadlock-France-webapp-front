# User Stories - Deadlock France

| En tant que ... | Je peux ... | Contexte (accès)  | Contraintes (connexion/note importante/...) |
| :---: |:------:| :-------: | :-------: |
| **Visiteurs** |   |   |   |
| " | Consulter la page d'accueil (Dernière patchnote affichée par défaut) | via l'url de base (/) | Incrémenter le compteur de visites de la page |
| " | Consulter le détail d'un patchnote | via l'url `/patchnotes/:id` | `id` doit être valide <br/> (Dernière patchnote affichée par défaut) <br/> incrémenter le compteur de visite de la page |
| " | Rechercher une patchnote par mots-clés | sur la page "patchnotes" | Une barre de rechercher pour filtrer parmi les dates, versions et contenus des patchnotes, seuls les patchnotes correspondantes (et la patchnote active) sont affichées dans la liste |
| " | Accéder à un système de donations | Via un bouton présent sur toutes les pages publiques (ouverture de lien dans un nouvel onglet) | Incrémenter le compteur de clics sur le bouton |
| " | Accéder aux réseaux sociaux | Via des boutons présents sur toutes les pages publiques | Incrémenter le compteur de clics sur les icones sociaux |
| **Administrateurs** |   |   |   |
|   | **Connexion**  |   |   |
| " | S'authentifier de façon sécurisée   | via la page `/admin/login`    | Nécessite un compte administrateur </br> Le protocole doit utiliser une double authentification (2FA) <br/> stocker la tentative de connexion (réussie ou non) : date / heure / ip |
| " | Accéder au panneau d'administration | via l'url `/admin/pannel`     | Connexion requise |
|   | **Compte**  |   |   |
| " | Modifier ses propres informations   | via l'url `/admin/profile`    | Connexion requise <br/> modifier un formulaire (Login, Email, Password, Pseudo) |
|   | **Patchnotes**  |   |   |
| " | Créer une patchnote | via l'url `/admin/patchnotes` | Connexion requise <br/> utilisation d'un éditeur markdown <br/> date et heure de création enregistré automatiquement|
| " | Modifier une patchnote | via l'url `/admin/patchnotes` | Connexion requise <br/> utilisation d'un éditeur markdown <br/> date et heure de modification enregistré automatiquement |
| " | Supprimer une patchnote | via l'url `/admin/patchnotes` | Connexion requise <br/> stocker l'opération + id de l'effacteur + date et heure <br/> confirmation de l'action et proposer l'archivage |
| " | Archiver une patchnote | via l'url `/admin/patchnotes` | Connexion requise |
| " | Retirer une patchnote des archives | via l'url `/admin/patchnotes` | Connexion requise |
| " | Visualiser une patchnote | via l'url `/admin/patchnotes` | Connexion requise <br/> Générer une fausse page "patchnotes" pour avoir un rendu fidèle |
|   | **Gestion du site**  |   |   |
| " | Modifier les paramètres du site (ex : liens vers les réseaux sociaux, titres, etc) | via l'url `/admin/params` | Connexion requise <br/> remplir un formulaire |
| " | Consulter les statistiques du site  | via l'url `/admin/stats`      | Connexion requise <br/> mise en forme (tableaux/graphique ?) |
| **Propriétaire (root-user)** |   |   |   |
| " | Créer un accès administrateur | via l'url `/admin/access` | Connexion requise <br/> remplir un formulaire (Login, Email, Password, Nom, Prénom, Pseudo) <br/> enregistrer l'opération avec l'id du créditeur d'accès + date et heure |
| " | Modifier un accès administrateur | via l'url `/admin/access` | Connexion requise <br/> modifier un formulaire (Login, Email, Password, Nom, Prénom, Pseudo) <br/> enregistrer l'opération avec l'id de l'éditeur d'accès + date et heure |
| " | Supprimer un accès administrateur | via l'url `/admin/access` | Connexion requise <br/> demander une confirmation <br/> enregistrer l'id de l'effaceur d'accès + date et heure |
