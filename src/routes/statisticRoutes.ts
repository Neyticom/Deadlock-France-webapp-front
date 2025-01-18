import { Router } from 'express';
import statisticController from '../controllers/statisticController';

const statisticRoutes = Router();

// Récupérer toutes les stats
statisticRoutes.get('/', statisticController.getAllStats);

// Rechercher des stats avec filtres (intervalle de dates + action)
statisticRoutes.get('/search', statisticController.searchStats);

// Ajouter ou mettre à jour une statistique (findOrCreate)
statisticRoutes.post('/', statisticController.upsertStatistic);
statisticRoutes.put('/', statisticController.upsertStatistic);

export default statisticRoutes;