/**
 * Routes des mots-clés.
 * Gère la récupération, la création, la mise à jour et la suppression des mots-clés associés aux ressources.
 */

import { Router } from "express";
import keywordController from "../controllers/keywordController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import keywordSchema from "../schemas/keyword.schema";

const keywordRoutes = Router();

// Récupérer tous les mots-clés
keywordRoutes.get(
	"/",
	authMiddleware.verifyToken,
	keywordController.getAllKeywords,
);

// Récupérer un mot-clé par ID
keywordRoutes.get(
	"/:id",
	authMiddleware.verifyToken,
	keywordController.getKeywordById,
);

// Ajouter un mot-clé
keywordRoutes.post(
	"/",
	authMiddleware.verifyToken,
	validationMiddleware(keywordSchema.createKeyword),
	keywordController.createKeyword,
);

// Mettre à jour un mot-clé
keywordRoutes.patch(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(keywordSchema.updateKeyword),
	keywordController.updateKeyword,
);

// Supprimer un mot-clé
keywordRoutes.delete(
	"/:id",
	authMiddleware.verifyToken,
	keywordController.deleteKeyword,
);

export default keywordRoutes;
