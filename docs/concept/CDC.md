# Cahier des charges - Web App | Deadlock France

## 1 - Description du projet

Application Web desktop et mobile pour la communauté Deadlock France, pour centraliser l'information et engager la communauté.

### Objectifs (MVP)

- Un espace de référence pour la communauté Deadlock francophone
- Relayer les informations officielles (communiqués, devlogs, ...)
- Soutenir Deadlock France (donations/engagement)

### Objectifs (Évolutions)

- Attirer et guider de nouveaux joueurs vers le jeu (contenus, wiki, ...)
- Organiser des évènements pour la communauté francophone (système de tournois, ...)
- Partager le contenu de la communauté francophone (vidéos, posts, lives, ...)

## 2 - Fonctionnalités

### MVP

- Visiteurs :
  
  - Background animé sur le thème deadlock (boucle vidéo) OU image fixe pour les mauvaises connexions / les petits écrans
  - Navigation commune aux pages publiques (Accueil/Patchnotes)
  - Bouton de donation redirigeant vers un site spécialisé
  - Icones de réseaux cliquables
  - Sur la page patchnotes, possibilité de choisir une patchnote et de la consulter (par défaut, afficher la plus récente)

- Administrateurs :

  - Se connecter à l'espace administrateur en double authentification (/admin)
  - Consulter les statistiques du site une fois connecté à l'espace administrateur : nombre de visites sur le site et par page, clics sur le bouton de donation, clics sur les réseaux sociaux
  - Modifier les paramètres du site une fois connecté à l'espace administrateur : Liens des boutons/icones, titre de la page d'accueil, titre d'onglet, texte du bouton de donation
  - Gérer les patchnotes une fois connecté à l'espace administrateur : créer, modifier, visualiser, archiver, supprimer
  - Gérer les accès administrateurs une fois connecté à l'espace administrateur : ajouter, modifier, supprimer (avec historique) + historique de connexion des administrateurs (date/heure/ip)

### Évolutions

> *TODO : à compléter une fois le MVP terminé*

## 3 - Contraintes techniques

### Technologies utilisées

**Frontend :**

- React / Typescript
- SCSS

**Backend :**

- Express / Typescript
- Sequelize (ORM)

\+ PostgreSQL (BDD)

### Hébergement et sécurité

Le frontend, le backend ainsi que la BDD de l'application seront hébergés sur le VPS dédié d'une communauté partenaire par l'intermédiaire de Romain (Neyticom). L'infrastructure est déjà sécurisée (firewall, antiDDOS, fail2ban, double authentification, dockerisation, ...)

Pas de connexion ni de formulaires pour les visiteurs sur le MVP (low risk XSS).

L'accès à l'espace administrateur se fait par une connexion avec Login + Password ainsi qu'une double authentification par téléphone (probablement Google Auth).

Session administrateur avec l'utilisation du token JWT (stockage cookie).

> *TODO : durée de vie du token à définir*

### Compatibilité

L'application web doit être compatible avec les derniers navigateurs à jour, fonctionner sur un appareil mobile comme sur un ordinateur. Les utilisateurs seront principalement "desktop".

## 4 - Design

Pour la partie publique (visiteurs), le site doit rappeller l'univers de deadlock, tout en étant lisibile et accessible.

Au niveau des polices, le choix a été porté vers :

- Troika : Titres, navigation, ...
- Geist : Textes, explications, ...
- Akatab (à confirmer) : Zones de recherche, infobulles, interfaces, listes, composants de formulaires, ...

Pour la partie administrateur, le design est libre tant qu'il permet une gestion fluide et intuitive.

## 5 - Méthodologie & Organisatioon

Le projet sera divisé en deux organisations :

- Frontend : Nils et Romain
- Backend : Zack et Romain

La méthodologie choisie pour le projet est l'agile avec **Scrum**, chaque sprint est planifié et débriefé en équipe.

Trello nous servira d'outil pour backloguer et organiser les sprints, les rôles sont assignés par organisation (frontend/bakckend) et par étape (backlog/sprint/review/done).

Une réunion hebdomadaire permet d'échanger sur les problématiques rencontrées, de faire le point sur l'avancement et de faire des ajustements si besoin.

Le **[journal de bord](../devlogs.md)** permet de résumer le déroulement de l'ensemble des sprints du projet.
