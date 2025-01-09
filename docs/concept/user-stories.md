# User Stories - Deadlock France

| **En tant que ...** | **Je peux ...** | **Contexte (accès)**  | **Contraintes (connexion/note importante/...)** |
| :------------------- |:--------------- | :-------------------- | :--------------------------------------------- |
| **Users**            |                 |                       |                                               |
| "                    | Consulter la page d'accueil (Dernière patchnote affichée par défaut) | via l'URL `/api/` | Incrémenter le compteur de visites de la page |
| "                    | Consulter le détail d'une patchnote | via l'URL `/api/patchnotes/:id` | `id` doit être valide <br/> Incrémenter le compteur de visites de la page |
| "                    | Rechercher une patchnote par mots-clés | via `/api/patchnotes/search` | Barre de recherche filtrant par mots-clés, date, version, ou contenu |
| "                    | Accéder à un système de donations | via un bouton global | Incrémenter le compteur de clics |
| "                    | Accéder aux réseaux sociaux | via des boutons globaux | Incrémenter le compteur de clics sur les icônes |
|                      | Consulter les statistiques publiques | via `/api/stats/public` | Accessible sans authentification |
|                      | Participer au système de soutien | via `/api/support` | Redirection vers une plateforme externe |
| **Administrateurs**  |                 |                       |                                               |
| "                    | **Connexion et Sécurité**   |                       |                                               |
| "                    | S'authentifier de façon sécurisée (2FA) | via `/api/auth/login` et `/api/auth/2fa` | Nécessite un compte administrateur <br/> Stocker la tentative de connexion avec : date, heure, ip |
| "                    | Accéder au panneau d'administration | via `/api/admin/panel` | Connexion requise |
|                      | **Gestion des Comptes et Rôles** |               |                                               |
| "                    | Créer un nouvel utilisateur | via `/api/users` | Remplir un formulaire complet (login, email, password, rôle) |
| "                    | Modifier les informations d'un utilisateur | via `/api/users/:id` | Connexion requise <br/> Modification des champs du formulaire |
| "                    | Gérer les rôles des utilisateurs | via `/api/roles/assign` | Associer ou retirer un rôle à un utilisateur existant |
| "                    | Supprimer un utilisateur | via `/api/users/:id` | Connexion requise <br/> Confirmation avant suppression |
|                      | **Patchnotes** |                      |                                               |
| "                    | Créer une patchnote | via `/api/patchnotes` | Connexion requise <br/> Utilisation d'un éditeur Markdown <br/> Date de création enregistrée automatiquement |
| "                    | Modifier une patchnote | via `/api/patchnotes/:id` | Connexion requise <br/> Historique de modification conservé |
| "                    | Supprimer une patchnote | via `/api/patchnotes/:id` | Connexion requise <br/> Stocker l'opération avec : id utilisateur, date, heure <br/> Confirmation requise |
| "                    | Rechercher une patchnote | via `/api/patchnotes/search` | Connexion requise <br/> Résultats filtrés |
|                      | **Logs**       |                      |                                               |
| "                    | Consulter les logs système | via `/api/logs` ou `/api/logs/:userId` | Connexion requise <br/> Pagination activée |
|                      | **Statistiques** |                    |                                               |
| "                    | Consulter les statistiques internes | via `/api/stats/admin` | Connexion requise <br/> Affichage sous forme de tableaux ou graphiques |
| "                    | Enregistrer une vue ou un clic | via `/api/stats/views` et `/api/stats/clicks` (POST) | Incrémenter le compteur après une action utilisateur |
|                      | **Gestion du Contenu** |                     |                                               |
| "                    | Gérer les héros, sorts et items | via `/api/content` | Ajouter, modifier ou supprimer des entités de jeu |
|                      | **Paramètres du Site** |                     |                                               |
| "                    | Modifier les paramètres du site | via `/api/settings` | Connexion requise <br/> Modification des paramètres clés |
| **Propriétaire (root-user)** | Créer un accès administrateur | via `/api/users` | Remplir un formulaire complet (login, email, password, rôle admin) |
| "                           | Modifier un administrateur | via `/api/users/:id` | Connexion requise <br/> Stockage de l'opération avec : id, date, heure |
| "                           | Supprimer un administrateur | via `/api/users/:id` | Connexion requise <br/> Confirmation requise avant suppression |
