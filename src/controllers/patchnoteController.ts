/**
 * Contrôleur des patchnotes.
 * Gère les opérations CRUD et la recherche des patchnotes.
 */

import { Op } from "sequelize";
import type { Request, Response, NextFunction } from "express";
import Patchnote from "../models/Patchnote";

const patchnoteController = {
	/**
	 * Récupère la liste complète des patchnotes.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des patchnotes.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllPatchnotes: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const patchnotes = await Patchnote.findAll();
			res.status(200).json(patchnotes);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un patchnote spécifique par son identifiant.
	 * @param req - Requête Express contenant l'ID du patchnote.
	 * @param res - Réponse Express contenant les données du patchnote.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getPatchnoteById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const patchnote = await Patchnote.findByPk(id);

			if (!patchnote) {
				res.status(404).json({ error: "Patchnote introuvable." });
				return;
			}

			res.status(200).json(patchnote);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouveau patchnote.
	 * @param req - Requête Express contenant les données du patchnote.
	 * @param res - Réponse Express contenant le patchnote créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createPatchnote: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { version, title, date, author, content, state } = req.body;

			// Vérification des champs obligatoires.
			if (!version || !title || !date || !state) {
				res.status(400).json({
					error: "Champs obligatoires manquants : version, title, date, state.",
				});
				return;
			}

			const newPatchnote = await Patchnote.create({
				version,
				title,
				date,
				author,
				content,
				state,
			});
			res.status(201).json(newPatchnote);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un patchnote existant.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant le patchnote mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updatePatchnote: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const patchnote = await Patchnote.findByPk(id);

			if (!patchnote) {
				res.status(404).json({ error: "Patchnote introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedPatchnote = await patchnote.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedPatchnote);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Remplace complètement un patchnote.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant le patchnote remplacé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	replacePatchnote: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const patchnote = await Patchnote.findByPk(id);

			if (!patchnote) {
				res.status(404).json({ error: "Patchnote introuvable." });
				return;
			}

			// Remplacement complet (PUT)
			const replacedPatchnote = await patchnote.update(req.body);
			res.status(200).json(replacedPatchnote);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un patchnote par son identifiant.
	 * @param req - Requête Express contenant l'ID du patchnote à supprimer.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deletePatchnote: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const patchnote = await Patchnote.findByPk(id);

			if (!patchnote) {
				res.status(404).json({ error: "Patchnote introuvable." });
				return;
			}

			await patchnote.destroy();
			res.status(200).json({ message: "Patchnote supprimé." });
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Recherche des patchnotes contenant au moins un mot-clé donné.
	 * @param req - Requête Express contenant les mots-clés en paramètre de requête.
	 * @param res - Réponse Express contenant la liste des patchnotes correspondants.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	searchPatchnotes: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { keywords } = req.query;

			if (!keywords || typeof keywords !== "string") {
				res.status(400).json({
					error:
						"Veuillez fournir des mots-clés dans les paramètres de requête (exemple: ?keywords=update,patch).",
				});
				return;
			}

			// Suppression des espaces inutiles.
			const keywordList = keywords
				.split(",")
				.map((keyword) => keyword.trim())
				.filter((keyword) => keyword !== "");

			if (keywordList.length === 0) {
				res.status(400).json({ error: "Liste de mots-clés vide ou invalide." });
				return;
			}

			// Recherche dans la base de données (match au moins un mot-clé).
			const patchnotes = await Patchnote.findAll({
				where: {
					[Op.or]: keywordList.map((keyword) => ({
						content: { [Op.iLike]: `%${keyword}%` },
					})),
				},
			});

			if (patchnotes.length === 0) {
				res.status(200).json({
					message: "Aucun contenu ne correspond aux mots-clés recherchés.",
				});
				return;
			}

			res.status(200).json(patchnotes);
		} catch (error) {
			next(error);
		}
	},
};

export default patchnoteController;
