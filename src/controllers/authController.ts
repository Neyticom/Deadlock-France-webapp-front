/**
 * Contrôleur d'authentification.
 * Gère la connexion et la déconnexion des utilisateurs.
 */

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import Role from "../models/Role";
import cryptoService from "../services/cryptoService";

dotenv.config();

const authController = {
	/**
	 * Gère la connexion d'un utilisateur.
	 * Vérifie les identifiants, génère un token JWT en cas de succès.
	 * @param req - Requête Express contenant les identifiants.
	 * @param res - Réponse Express.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	login: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { login, password } = req.body;

			// Recherche de l'utilisateur avec son rôle associé.
			const user = await User.findOne({
				where: { login },
				include: [
					{
						model: Role, // Jointure avec la table Role.
						as: "roles", // Alias défini dans models/index.ts.
						attributes: ["name"], // Récupère uniquement le nom du rôle.
					},
				],
			});

			if (!user) {
				res.status(401).json({ error: "Identifiants incorrects." });
				return;
			}

			// Vérification du mot de passe.
			const isPasswordValid = await cryptoService.comparePassword(
				password,
				user.getDataValue("password"),
			);

			if (!isPasswordValid) {
				res.status(401).json({ error: "Identifiants incorrects." });
				return;
			}

			// Récupération du rôle utilisateur.
			const userRole = user.getDataValue("roles")?.[0]?.name || "User";

			// Génération du token JWT.
			const token = jwt.sign(
				{
					id: user.getDataValue("id"),
					login: user.getDataValue("login"),
					role: userRole,
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: process.env.TOKEN_EXPIRATION || "1h" },
			);

			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Gère la déconnexion d'un utilisateur.
	 * Actuellement, le token JWT étant stateless, seule une confirmation est renvoyée.
	 * @param req - Requête Express.
	 * @param res - Réponse Express.
	 */
	logout: async (req: Request, res: Response): Promise<void> => {
		res.status(200).json({ message: "Déconnexion réussie." });
	},
};

export default authController;
