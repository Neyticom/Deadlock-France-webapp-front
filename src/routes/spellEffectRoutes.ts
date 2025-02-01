/**
 * Routes des effets de sorts.
 * Gère la récupération, la création, la mise à jour et la suppression des effets appliqués aux sorts.
 */

import { Router } from "express";
import spellEffectController from "../controllers/spellEffectController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import spellEffectSchema from "../schemas/spellEffect.schema";

const spellEffectRoutes = Router();

// Récupérer tous les effets d'un sort
spellEffectRoutes.get("/:id/effects", spellEffectController.getAllSpellEffects);

// Récupérer un effet spécifique d'un sort
spellEffectRoutes.get(
	"/:id/effects/:id",
	spellEffectController.getSpellEffectById,
);

// Ajouter un effet à un sort
spellEffectRoutes.post(
	"/:id/effects",
	authMiddleware.verifyToken,
	validationMiddleware(spellEffectSchema.createSpellEffect),
	spellEffectController.createSpellEffect,
);

// Mettre à jour un effet d'un sort
spellEffectRoutes.patch(
	"/:id/effects/:id",
	authMiddleware.verifyToken,
	validationMiddleware(spellEffectSchema.updateSpellEffect),
	spellEffectController.updateSpellEffect,
);

// Supprimer un effet d'un sort
spellEffectRoutes.delete(
	"/:id/effects/:id",
	authMiddleware.verifyToken,
	spellEffectController.deleteSpellEffect,
);

export default spellEffectRoutes;
