import { Router } from "express";
import patchnoteController from "../controllers/patchnoteController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import patchnoteSchema from "../schemas/patchnote.schema";

const patchnoteRoutes = Router();

// Rechercher un patchnote
patchnoteRoutes.get("/search", patchnoteController.searchPatchnotes);

// Récupérer tous les patchnotes
patchnoteRoutes.get("/", patchnoteController.getAllPatchnotes);

// Récupérer un patchnote par ID
patchnoteRoutes.get("/:id", patchnoteController.getPatchnoteById);

// Ajouter un patchnote
patchnoteRoutes.post(
	"/",
	authMiddleware.verifyToken,
	validationMiddleware(patchnoteSchema.createPatchnote),
	patchnoteController.createPatchnote,
);

// Mettre à jour un patchnote
patchnoteRoutes.patch(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(patchnoteSchema.updatePatchnote),
	patchnoteController.updatePatchnote,
);

// Remplacer un patchnote
patchnoteRoutes.put(
	"/:id",
	authMiddleware.verifyToken,
	validationMiddleware(patchnoteSchema.replacePatchnote),
	patchnoteController.replacePatchnote,
);

// Supprimer un patchnote
patchnoteRoutes.delete(
	"/:id",
	authMiddleware.verifyToken,
	patchnoteController.deletePatchnote,
);

export default patchnoteRoutes;
