import type { Request, Response, NextFunction } from "express";
import ItemEffect from "../models/ItemEffect";

const itemEffectController = {
	// Récupérer tous les effets d'un item
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
				res.status(404).json({ error: "No item effects found for this item" });
				return;
			}

			res.status(200).json(itemEffects);
		} catch (error) {
			next(error);
		}
	},

	// Récupérer un effet d'item par son ID
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
				res.status(404).json({ error: "Item effect not found" });
				return;
			}

			res.status(200).json(itemEffect);
		} catch (error) {
			next(error);
		}
	},

	// Créer un nouvel effet pour un item
	createItemEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: itemId } = req.params;
			const { type, effect } = req.body;

			if (!type || !effect) {
				res
					.status(400)
					.json({ error: "Missing required fields: type, effect" });
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

	// Modifier partiellement un effet d'item
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
				res.status(404).json({ error: "Item effect not found" });
				return;
			}

			const updatedItemEffect = await itemEffect.update(req.body, {
				fields: Object.keys(req.body),
			});

			res.status(200).json(updatedItemEffect);
		} catch (error) {
			next(error);
		}
	},

	// Supprimer un effet d'item
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
				res.status(404).json({ error: "Item effect not found" });
				return;
			}

			await itemEffect.destroy();
			res.status(200).json({ message: "Item effect deleted" });
		} catch (error) {
			next(error);
		}
	},
};

export default itemEffectController;
