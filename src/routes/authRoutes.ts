/**
 * Routes d'authentification.
 * Gère la connexion et la déconnexion des utilisateurs.
 */

import { Router } from "express";
import authController from "../controllers/authController";
import validationMiddleware from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import authSchema from "../schemas/auth.schema";

const authRoutes = Router();

// Connexion utilisateur
authRoutes.post(
	"/login",
	validationMiddleware(authSchema.login),
	authController.login,
);

authRoutes.get("/validate", authController.checkAuth);

// Déconnexion utilisateur
authRoutes.post("/logout", authMiddleware.verifyToken, authController.logout);

export default authRoutes;
