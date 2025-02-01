/**
 * Middleware d'authentification.
 * Gère la vérification des tokens et des permissions utilisateur.
 */

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = {
	/**
	 * Vérifie la présence et la validité du token JWT.
	 * @param req - Requête Express contenant le token dans l'en-tête Authorization.
	 * @param res - Réponse Express en cas d'échec de l'authentification.
	 * @param next - Middleware suivant en cas de succès.
	 */
	verifyToken: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const token = req.headers.authorization?.split(" ")[1];

			if (!token) {
				res.status(401).json({ error: "Accès refusé, token manquant." });
				return;
			}
			// Vérification du token JWT.
			jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
				if (err) {
					res.status(401).json({ error: "Token invalide ou expiré." });
					return;
				}

				// Ajoute l'utilisateur décodé à la requête pour les prochains middlewares.
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(req as any).user = decoded;
				next();
			});
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Vérifie si l'utilisateur est un administrateur.
	 * @param req - Requête Express contenant les informations utilisateur après authentification.
	 * @param res - Réponse Express en cas de privilèges insuffisants.
	 * @param next - Middleware suivant en cas de succès.
	 */
	verifyAdmin: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			// Vérifie que le token est valide avant de vérifier le rôle.
			await authMiddleware.verifyToken(req, res, async () => {
				// Récupération de l'utilisateur depuis le token décodé.
				// biome-ignore lint/suspicious/noExplicitAny:
				const user = (req as any).user;

				if (!user || user.role !== "Admin") {
					res
						.status(403)
						.json({ error: "Accès refusé, privilèges insuffisants." });
					return;
				}

				next();
			});
		} catch (error) {
			next(error);
		}
	},
};

export default authMiddleware;
