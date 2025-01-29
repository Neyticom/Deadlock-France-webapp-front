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

// Déconnexion utilisateur
authRoutes.get("/logout", authMiddleware.verifyToken, authController.logout);

export default authRoutes;
