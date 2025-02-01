/**
 * Routes des utilisateurs.
 * Gère la récupération, la création, la mise à jour, la suppression et la gestion des rôles des utilisateurs.
 */

import { Router } from "express";
import userController from "../controllers/userController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import userRoleSchema from "../schemas/userRole.schema";

const userRoutes = Router();

// Routes pour les utilisateurs
userRoutes.get("/", authMiddleware.verifyAdmin, userController.getAllUsers);
userRoutes.get("/:id", authMiddleware.verifyAdmin, userController.getUserById);
userRoutes.post(
	"/",
	/* authMiddleware.verifyAdmin, */ // Désactivé temporairement car créer un utilisateur nécessite un accès admin, mais aucun compte admin n'existe encore.
	validationMiddleware(userRoleSchema.createUser),
	userController.createUser,
);
userRoutes.patch(
	"/:id",
	authMiddleware.verifyAdmin,
	validationMiddleware(userRoleSchema.updateUser),
	userController.updateUser,
);

// Routes pour la gestion des rôles
userRoutes.get(
	"/:id/role",
	authMiddleware.verifyAdmin,
	userController.getUserRole,
);
userRoutes.patch(
	"/:id/role",
/*	authMiddleware.verifyAdmin, */ // Désactivé temporairement car attribuer un rôle nécessite un accès admin, mais aucun compte admin n'existe encore.
	validationMiddleware(userRoleSchema.updateUserRole),
	userController.updateUserRole,
);
userRoutes.delete(
	"/:id/role",
	authMiddleware.verifyAdmin,
	userController.deleteUserRole,
);

export default userRoutes;
