import { Router } from "express";
import patchnoteEntryController from "../controllers/patchnoteEntryController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import patchnoteEntrySchema from "../schemas/patchnoteEntry.schema";

const patchnoteEntryRoutes = Router();

// Récupérer toutes les entrées d'un patchnote
patchnoteEntryRoutes.get(
	"/:id/entries",
	patchnoteEntryController.getAllEntries,
);

// Récupérer une entrée spécifique d'un patchnote
patchnoteEntryRoutes.get(
	"/:id/entries/:id",
	patchnoteEntryController.getEntryById,
);

// Ajouter une entrée à un patchnote
patchnoteEntryRoutes.post(
	"/:id/entries",
	authMiddleware.verifyToken,
	validationMiddleware(patchnoteEntrySchema.createPatchnoteEntry),
	patchnoteEntryController.createEntry,
);

// Mettre à jour une entrée d'un patchnote
patchnoteEntryRoutes.patch(
	"/:id/entries/:id",
	authMiddleware.verifyToken,
	validationMiddleware(patchnoteEntrySchema.updatePatchnoteEntry),
	patchnoteEntryController.updateEntry,
);

// Supprimer une entrée d'un patchnote
patchnoteEntryRoutes.delete(
	"/:id/entries/:id",
	authMiddleware.verifyToken,
	patchnoteEntryController.deleteEntry,
);

export default patchnoteEntryRoutes;
