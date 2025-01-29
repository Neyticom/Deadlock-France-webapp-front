import { Router } from "express";
import itemController from "../controllers/itemController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import itemSchema from "../schemas/item.schema";

const itemRoutes = Router();

// Récupérer tous les objets
itemRoutes.get("/", itemController.getAllItems);

// Récupérer un objet par ID
itemRoutes.get("/:id", itemController.getItemById);

// Créer un nouvel objet
itemRoutes.post(
	"/",
	authMiddleware.verifyToken,
	validationMiddleware(itemSchema.createItem),
	itemController.createItem,
);

// Mettre à jour un objet
itemRoutes.patch(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(itemSchema.updateItem),
	itemController.updateItem,
);

// Supprimer un objet
itemRoutes.delete(
	"/:id",
	authMiddleware.verifyToken,
	itemController.deleteItem,
);

export default itemRoutes;
