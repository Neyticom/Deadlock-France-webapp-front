import { Router } from "express";
import statisticController from "../controllers/statisticController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import statisticSchema from "../schemas/statistic.schema";

const statisticRoutes = Router();

// Récupérer toutes les stats
statisticRoutes.get(
	"/",
	authMiddleware.verifyAdmin,
	statisticController.getAllStats,
);

// Rechercher des stats avec filtres (intervalle de dates + action)
statisticRoutes.get(
	"/search",
	authMiddleware.verifyAdmin,
	statisticController.searchStats,
);

// Ajouter ou mettre à jour une statistique (findOrCreate)
statisticRoutes.post(
	"/",
	authMiddleware.verifyAdmin,
	validationMiddleware(statisticSchema.upsertStatistic),
	statisticController.upsertStatistic,
);
statisticRoutes.put(
	"/",
	authMiddleware.verifyAdmin,
	validationMiddleware(statisticSchema.upsertStatistic),
	statisticController.upsertStatistic,
);

export default statisticRoutes;
