# User Stories - Deadlock France

| **En tant que ...** | **Je peux ...** | **Contexte (accès)**  | **Contraintes (connexion/note importante/...)** |
| :------------------- |:--------------- | :-------------------- | :--------------------------------------------- |
| **Users**            |                 |                       |                                               |
| "                    | Consulter la page d'accueil (Dernière patchnote affichée par défaut) | via l'URL `/api/` | Incrémenter le compteur de visites de la page |
| "                    | Consulter le détail d'une patchnote | via l'URL `/api/patchnotes/:id` | `id` doit être valide <br/> incrémenter le compteur de visites de la page |
| "                    | Rechercher une patchnote par mots-clés | via `/api/patchnotes/search` | Une barre de recherche pour filtrer par mots-clés, date, version, ou contenu |
| "                    | Accéder à un système de donations | via un bouton global | Incrémenter le compteur de clics |
| "                    | Accéder aux réseaux sociaux | via des boutons globaux | Incrémenter le compteur de clics sur les icônes |
| **Administrateurs**  |                 |                       |                                               |
| "                    | **Connexion**   |                       |                                               |
| "                    | S'authentifier de façon sécurisée | via `/api/auth/login` et `/api/auth/2fa` | Nécessite un compte administrateur <br/> Stocker la tentative de connexion (succès/échec) avec : date, heure, ip |
| "                    | Accéder au panneau d'administration | via `/api/admin/panel` | Connexion requise |
|                      | **Gestion des comptes** |               |                                               |
| "                    | Modifier ses propres informations | via `/api/users/:id` | Connexion requise <br/> Modifier un formulaire (login, email, password, pseudo) |
|                      | **Patchnotes** |                      |                                               |
| "                    | Créer une patchnote | via `/api/patchnotes` | Connexion requise <br/> Utilisation d'un éditeur Markdown <br/> Date de création enregistrée automatiquement |
| "                    | Modifier une patchnote | via `/api/patchnotes/:id` | Connexion requise <br/> Date de modification enregistrée automatiquement |
| "                    | Supprimer une patchnote | via `/api/patchnotes/:id` | Connexion requise <br/> Stocker l'opération avec : id de l'utilisateur, date, heure <br/> Confirmation de suppression |
| "                    | Rechercher une patchnote | via `/api/patchnotes/search` | Connexion requise |
|                      | **Logs**       |                      |                                               |
| "                    | Consulter les logs | via `/api/logs` ou `/api/logs/:userId` | Connexion requise <br/> Mettre en forme les logs avec pagination |
|                      | **Statistiques** |                    |                                               |
| "                    | Consulter les statistiques du site | via `/api/stats/views` et `/api/stats/clicks` | Connexion requise <br/> Affichage sous forme de tableaux ou graphiques |
| "                    | Enregistrer une vue ou un clic | via `/api/stats/views` et `/api/stats/clicks` (POST) | Incrémenter le compteur |
|                      | **Paramètres** |                     |                                               |
| "                    | Modifier les paramètres du site | via `/api/settings` | Connexion requise <br/> Modifier un formulaire pour les paramètres clés |
| **Propriétaire (root-user)** | Créer un accès administrateur | via `/api/users` | Connexion requise <br/> Remplir un formulaire complet (login, email, etc.) |
| "                           | Modifier un accès administrateur | via `/api/users/:id` | Connexion requise <br/> Stocker l'opération avec : id de l'éditeur, date, heure |
| "                           | Supprimer un accès administrateur | via `/api/users/:id` | Connexion requise <br/> Confirmation requise avant suppression <br/> Stocker l'opération avec : id de l'effaceur, date, heure |
