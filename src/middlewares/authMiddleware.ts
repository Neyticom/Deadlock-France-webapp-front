import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = {
	verifyToken: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const token = req.headers.authorization?.split(" ")[1];

			if (!token) {
				res.status(401).json({ error: "Accès refusé, token manquant" });
				return;
			}

			jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
				if (err) {
					res.status(401).json({ error: "Token invalide ou expiré" });
					return;
				}

				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(req as any).user = decoded;
				next();
			});
		} catch (error) {
			next(error);
		}
	},

	verifyAdmin: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			// Vérifie que le token est valide avant de vérifier le rôle
			await authMiddleware.verifyToken(req, res, async () => {
				// biome-ignore lint/suspicious/noExplicitAny:
				const user = (req as any).user;

				if (!user || user.role !== "Admin") {
					res
						.status(403)
						.json({ error: "Accès refusé, privilèges insuffisants" });
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
