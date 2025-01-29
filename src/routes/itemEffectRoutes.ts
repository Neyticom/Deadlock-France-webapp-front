import { Router } from "express";
import itemEffectController from "../controllers/itemEffectController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import itemEffectSchema from "../schemas/itemEffect.schema";

const itemEffectRoutes = Router();

// Récupérer tous les effets d'un objet
itemEffectRoutes.get("/:id/effects", itemEffectController.getAllItemEffects);

// Récupérer un effet spécifique d'un objet
itemEffectRoutes.get(
	"/:id/effects/:id",
	itemEffectController.getItemEffectById,
);

// Ajouter un effet à un objet
itemEffectRoutes.post(
	"/:id/effects",
	authMiddleware.verifyToken,
	validationMiddleware(itemEffectSchema.createItemEffect),
	itemEffectController.createItemEffect,
);

// Mettre à jour un effet d'un objet
itemEffectRoutes.patch(
	"/:id/effects/:id",
	authMiddleware.verifyToken,
	validationMiddleware(itemEffectSchema.updateItemEffect),
	itemEffectController.updateItemEffect,
);

// Supprimer un effet d'un objet
itemEffectRoutes.delete(
	"/:id/effects/:id",
	authMiddleware.verifyToken,
	itemEffectController.deleteItemEffect,
);

export default itemEffectRoutes;
