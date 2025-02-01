/**
 * Contrôleur des effets d'objets.
 * Gère les opérations CRUD sur les effets liés aux objets.
 */

import type { Request, Response, NextFunction } from "express";
import ItemEffect from "../models/ItemEffect";

const itemEffectController = {
	/**
	 * Récupère tous les effets associés à un objet.
	 * @param req - Requête Express contenant l'ID de l'objet.
	 * @param res - Réponse Express contenant la liste des effets.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllItemEffects: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId } = req.params;
			const itemEffects = await ItemEffect.findAll({
				where: { item_id: itemId },
			});

			if (itemEffects.length === 0) {
				res.status(404).json({ error: "Aucun effet trouvé pour cet objet." });
				return;
			}

			res.status(200).json(itemEffects);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un effet spécifique d'un objet par son identifiant.
	 * @param req - Requête Express contenant l'ID de l'objet et de l'effet.
	 * @param res - Réponse Express contenant les données de l'effet.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getItemEffectById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId, id: effectId } = req.params;
			const itemEffect = await ItemEffect.findOne({
				where: { id: effectId, item_id: itemId },
			});

			if (!itemEffect) {
				res.status(404).json({ error: "Effet d'objet introuvable." });
				return;
			}

			res.status(200).json(itemEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouvel effet pour un objet.
	 * @param req - Requête Express contenant les données de l'effet.
	 * @param res - Réponse Express contenant l'effet créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createItemEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId } = req.params;
			const { type, effect } = req.body;

			// Vérification des champs obligatoires.
			if (!type || !effect) {
				res
					.status(400)
					.json({ error: "Champs obligatoires manquants : type, effect." });
				return;
			}

			const newItemEffect = await ItemEffect.create({
				item_id: itemId,
				type,
				effect,
			});

			res.status(201).json(newItemEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un effet d'objet existant.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant l'effet mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateItemEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId, id: effectId } = req.params;
			const itemEffect = await ItemEffect.findOne({
				where: { id: effectId, item_id: itemId },
			});

			if (!itemEffect) {
				res.status(404).json({ error: "Effet d'objet introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedItemEffect = await itemEffect.update(req.body, {
				fields: Object.keys(req.body),
			});

			res.status(200).json(updatedItemEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un effet d'objet par son identifiant.
	 * @param req - Requête Express contenant l'ID de l'objet et de l'effet.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteItemEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId, id: effectId } = req.params;
			const itemEffect = await ItemEffect.findOne({
				where: { id: effectId, item_id: itemId },
			});

			if (!itemEffect) {
				res.status(404).json({ error: "Effet d'objet introuvable." });
				return;
			}

			await itemEffect.destroy();
			res.status(200).json({ message: "Effet d'objet supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default itemEffectController;
