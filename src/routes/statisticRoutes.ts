import { Router } from 'express';
import statisticController from '../controllers/statisticController';
import validationMiddleware from '../middlewares/validationMiddleware';
import statisticSchema from '../schemas/statistic.schema';

const statisticRoutes = Router();

// Récupérer toutes les stats
statisticRoutes.get('/', statisticController.getAllStats);

// Rechercher des stats avec filtres (intervalle de dates + action)
statisticRoutes.get('/search', statisticController.searchStats);

// Ajouter ou mettre à jour une statistique (findOrCreate)
statisticRoutes.post('/', validationMiddleware(statisticSchema.upsertStatistic), statisticController.upsertStatistic);
statisticRoutes.put('/', validationMiddleware(statisticSchema.upsertStatistic), statisticController.upsertStatistic);

export default statisticRoutes;