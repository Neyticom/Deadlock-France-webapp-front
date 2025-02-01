/**
 * Contrôleur des mots-clés.
 * Gère les opérations CRUD sur les mots-clés.
 */

import type { Request, Response, NextFunction } from "express";
import Keyword from "../models/Keyword";

const keywordController = {
	/**
	 * Récupère la liste complète des mots-clés.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des mots-clés.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllKeywords: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const keywords = await Keyword.findAll();
			res.status(200).json(keywords);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un mot-clé spécifique par son identifiant.
	 * @param req - Requête Express contenant l'ID du mot-clé.
	 * @param res - Réponse Express contenant les données du mot-clé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getKeywordById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const keyword = await Keyword.findByPk(id);

			if (!keyword) {
				res.status(404).json({ error: "Mot-clé introuvable." });
				return;
			}

			res.status(200).json(keyword);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouveau mot-clé.
	 * @param req - Requête Express contenant les données du mot-clé.
	 * @param res - Réponse Express contenant le mot-clé créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createKeyword: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { ressource_type, ressource_id, value } = req.body;

			// Vérification des champs obligatoires.
			if (!ressource_type || !ressource_id || !value) {
				res.status(400).json({
					error:
						"Champs obligatoires manquants : ressource_type, ressource_id, value.",
				});
				return;
			}

			const newKeyword = await Keyword.create({
				ressource_type,
				ressource_id,
				value,
			});
			res.status(201).json(newKeyword);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un mot-clé existant.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant le mot-clé mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateKeyword: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const keyword = await Keyword.findByPk(id);

			if (!keyword) {
				res.status(404).json({ error: "Mot-clé introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedKeyword = await keyword.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedKeyword);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un mot-clé par son identifiant.
	 * @param req - Requête Express contenant l'ID du mot-clé à supprimer.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteKeyword: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const keyword = await Keyword.findByPk(id);

			if (!keyword) {
				res.status(404).json({ error: "Mot-clé introuvable." });
				return;
			}

			await keyword.destroy();
			res.status(200).json({ message: "Mot-clé supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default keywordController;
