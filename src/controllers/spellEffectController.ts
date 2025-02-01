/**
 * Contrôleur des effets de sorts.
 * Gère les opérations CRUD sur les effets de sorts.
 */

import type { Request, Response, NextFunction } from "express";
import SpellEffect from "../models/SpellEffect";

const spellEffectController = {
	/**
	 * Récupère tous les effets d'un sort donné.
	 * @param req - Requête Express contenant l'ID du sort.
	 * @param res - Réponse Express contenant la liste des effets.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllSpellEffects: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId } = req.params;
			const spellEffects = await SpellEffect.findAll({
				where: { spell_id: spellId },
			});

			res.status(200).json(spellEffects);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un effet spécifique d'un sort par son identifiant.
	 * @param req - Requête Express contenant l'ID du sort et de l'effet.
	 * @param res - Réponse Express contenant les données de l'effet.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getSpellEffectById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Effet de sort introuvable." });
				return;
			}

			res.status(200).json(spellEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouvel effet pour un sort.
	 * @param req - Requête Express contenant les données de l'effet.
	 * @param res - Réponse Express contenant l'effet créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId } = req.params;
			const { order, effect } = req.body;

			// Vérification des champs obligatoires.
			if (!order || !effect) {
				res
					.status(400)
					.json({ error: "Champs requis manquants : order, effect." });
				return;
			}

			const newSpellEffect = await SpellEffect.create({
				spell_id: spellId,
				order,
				effect,
			});

			res.status(201).json(newSpellEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un effet de sort existant.
	 * @param req - Requête Express contenant l'ID du sort et de l'effet.
	 * @param res - Réponse Express contenant l'effet mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Effet de sort introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedSpellEffect = await spellEffect.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedSpellEffect);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un effet de sort par son identifiant.
	 * @param req - Requête Express contenant l'ID du sort et de l'effet.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Effet de sort introuvable." });
				return;
			}

			await spellEffect.destroy();
			res.status(200).json({ message: "Effet supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default spellEffectController;
