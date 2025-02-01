/**
 * Contrôleur des sorts.
 * Gère les opérations CRUD sur les sorts.
 */

import type { Request, Response, NextFunction } from "express";
import Spell from "../models/Spell";

const spellController = {
	/**
	 * Récupère tous les sorts disponibles.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des sorts.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllSpells: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const spells = await Spell.findAll();
			res.status(200).json(spells);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un sort spécifique par son identifiant.
	 * @param req - Requête Express contenant l'ID du sort.
	 * @param res - Réponse Express contenant les données du sort.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getSpellById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const spell = await Spell.findByPk(id);

			if (!spell) {
				res.status(404).json({ error: "Sort introuvable." });
				return;
			}

			res.status(200).json(spell);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouveau sort.
	 * @param req - Requête Express contenant les données du sort.
	 * @param res - Réponse Express contenant le sort créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createSpell: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { hero_id, name, order, description, passive, charge, cooldown } =
				req.body;

			// Vérification des champs obligatoires.
			if (
				!hero_id ||
				!name ||
				!order ||
				!description ||
				passive === undefined ||
				charge === undefined ||
				!cooldown
			) {
				res.status(400).json({
					error:
						"Champs requis manquants : hero_id, name, order, description, passive, charge, cooldown.",
				});
				return;
			}

			const newSpell = await Spell.create(req.body);
			res.status(201).json(newSpell);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un sort existant.
	 * @param req - Requête Express contenant l'ID du sort et les nouvelles données.
	 * @param res - Réponse Express contenant le sort mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateSpell: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const spell = await Spell.findByPk(id);

			if (!spell) {
				res.status(404).json({ error: "Sort introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedSpell = await spell.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedSpell);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un sort par son identifiant.
	 * @param req - Requête Express contenant l'ID du sort.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteSpell: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const spell = await Spell.findByPk(id);

			if (!spell) {
				res.status(404).json({ error: "Sort introuvable." });
				return;
			}

			await spell.destroy();
			res.status(200).json({ message: "Sort supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default spellController;
