import { Router } from "express";
import spellController from "../controllers/spellController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import spellSchema from "../schemas/spell.schema";

const spellRoutes = Router();

// Récupérer tous les sorts
spellRoutes.get("/", spellController.getAllSpells);

// Récupérer un sort par ID
spellRoutes.get("/:id", spellController.getSpellById);

// Ajouter un sort
spellRoutes.post(
	"/",
	authMiddleware.verifyToken,
	validationMiddleware(spellSchema.createSpell),
	spellController.createSpell,
);

// Mettre à jour un sort
spellRoutes.patch(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(spellSchema.updateSpell),
	spellController.updateSpell,
);

// Supprimer un sort
spellRoutes.delete(
	"/:id",
	authMiddleware.verifyToken,
	spellController.deleteSpell,
);

export default spellRoutes;
