/**
 * Contrôleur des objets.
 * Gère les opérations CRUD sur les objets.
 */

import type { Request, Response, NextFunction } from "express";
import Item from "../models/Item";

const itemController = {
	/**
	 * Récupère la liste complète des objets.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des objets.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllItems: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const items = await Item.findAll();
			res.status(200).json(items);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un objet spécifique par son identifiant.
	 * @param req - Requête Express contenant l'ID de l'objet.
	 * @param res - Réponse Express contenant les données de l'objet.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getItemById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const item = await Item.findByPk(id);

			if (!item) {
				res.status(404).json({ error: "Objet introuvable." });
				return;
			}

			res.status(200).json(item);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouvel objet.
	 * @param req - Requête Express contenant les données de l'objet.
	 * @param res - Réponse Express contenant l'objet créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createItem: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const {
				name,
				category,
				cost,
				common_bonus,
				active_description,
				active_duration,
				passive_description,
				passive_duration,
				parent_id,
			} = req.body;

			// Vérification des champs obligatoires.
			if (!name || !category || cost == null || common_bonus == null) {
				res.status(400).json({
					error:
						"Champs obligatoires manquants : name, category, cost, common_bonus.",
				});
				return;
			}

			const newItem = await Item.create({
				name,
				category,
				cost,
				common_bonus,
				active_description,
				active_duration: active_duration ?? 0,
				passive_description,
				passive_duration: passive_duration ?? 0,
				parent_id,
			});

			res.status(201).json(newItem);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un objet existant.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant l'objet mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateItem: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const item = await Item.findByPk(id);

			if (!item) {
				res.status(404).json({ error: "Objet introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedItem = await item.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedItem);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un objet par son identifiant.
	 * @param req - Requête Express contenant l'ID de l'objet à supprimer.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteItem: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const item = await Item.findByPk(id);

			if (!item) {
				res.status(404).json({ error: "Objet introuvable." });
				return;
			}

			await item.destroy();
			res.status(200).json({ message: "Objet supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default itemController;
