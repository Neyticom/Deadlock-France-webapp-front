# Gestion des patch notes

1. **En tant qu'administrateur, je veux pouvoir ajouter une nouvelle patch note**
   - **Critères d'acceptation** :
     - L'administrateur peut créer un nouveau patch note en utilisant une syntaxe markdown.
     - Le patch note est automatiquement enregistré avec la date de publication.
     - Le patch note est visible sur la page dédiée aux utilisateurs.

2. **En tant qu'administrateur, je veux pouvoir modifier une patch note existante**
   - **Critères d'acceptation** :
     - L'administrateur peut éditer une patch note en utilisant une syntaxe markdown.
     - Les modifications sont enregistrées et visibles pour les utilisateurs.

3. **En tant qu'administrateur, je veux pouvoir supprimer une patch note**
   - **Critères d'acceptation** :
     - L'administrateur peut supprimer une patch note.
     - La patch note n'apparaît plus dans la liste visible par les utilisateurs.

4. **En tant qu'utilisateur, je veux pouvoir visualiser les patch notes**
   - **Critères d'acceptation** :
     - Par défaut, la dernière patch note est affichée.
     - Une navigation permet de consulter les versions précédentes.

5. **En tant qu'utilisateur, je veux pouvoir rechercher des patch notes par mot-clé**
   - **Critères d'acceptation** :
     - Une barre de recherche permet de filtrer les patch notes par mots-clés.
     - Les résultats de recherche affichent les patch notes correspondantes.

# Gestion des statistiques du site

6. **En tant qu'administrateur, je veux pouvoir consulter les statistiques de vues du site**
   - **Critères d'acceptation** :
     - Les statistiques de vues du site (nombre de visiteurs, pages consultées, etc.) sont accessibles dans l'espace administrateur.
     - Les données sont présentées sous forme de graphiques ou de tableaux.

# Gestion des paramètres du site

7. **En tant qu'administrateur, je veux pouvoir modifier les paramètres du site**
   - **Critères d'acceptation** :
     - Une section dédiée dans l'espace administrateur permet de configurer les paramètres du site (ex : fond d’écran animé, liens vers les réseaux sociaux, etc.).
     - Les modifications sont appliquées en temps réel ou après validation.

# Gestion des accès administrateur

8. **En tant qu'administrateur, je veux pouvoir gérer les accès des autres administrateurs**
   - **Critères d'acceptation** :
     - Possibilité de créer un nouvel accès administrateur.
     - Possibilité de modifier les informations d'un accès existant.
     - Possibilité de supprimer un accès administrateur.
     - Chaque administrateur doit être authentifié via une double authentification (2FA).

# Authentification et sécurité

9. **En tant qu'administrateur, je veux pouvoir m'authentifier de manière sécurisée**
   - **Critères d'acceptation** :
     - L'authentification doit utiliser une double authentification (2FA).
     - Un administrateur non authentifié ne peut pas accéder aux fonctionnalités de gestion.

# Gestion du bouton de soutien

10. **En tant qu'utilisateur, je veux pouvoir accéder à un site de contribution/don pour soutenir Deadlock France**
    - **Critères d'acceptation** :
      - Un bouton redirige vers un site de contribution ou de don.
      - La redirection est sécurisée et adaptée au support.