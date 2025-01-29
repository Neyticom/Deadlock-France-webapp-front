import { Router } from "express";
import heroController from "../controllers/heroController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import heroSchema from "../schemas/hero.schema";

const heroRoutes = Router();

// Récupérer tous les héros
heroRoutes.get("/", heroController.getAllHeroes);

// Récupérer un héros par ID
heroRoutes.get("/:id", heroController.getHeroById);

// Créer un nouveau héros
heroRoutes.post(
	"/",
	authMiddleware.verifyToken,
	validationMiddleware(heroSchema.createHero),
	heroController.createHero,
);

// Mettre à jour un héros
heroRoutes.patch(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(heroSchema.updateHero),
	heroController.updateHero,
);

// Supprimer un héros
heroRoutes.delete(
	"/:id",
	authMiddleware.verifyToken,
	heroController.deleteHero,
);

export default heroRoutes;
