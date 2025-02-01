/**
 * Contrôleur des héros.
 * Gère les opérations CRUD sur les héros.
 */

import type { Request, Response, NextFunction } from "express";
import Hero from "../models/Hero";

const heroController = {
	/**
	 * Récupère la liste complète des héros.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des héros.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllHeroes: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const heroes = await Hero.findAll();
			res.status(200).json(heroes);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère un héros spécifique par son identifiant.
	 * @param req - Requête Express contenant l'ID du héros.
	 * @param res - Réponse Express contenant les données du héros.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getHeroById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const hero = await Hero.findByPk(id);

			if (!hero) {
				res.status(404).json({ error: "Héros introuvable." });
				return;
			}

			res.status(200).json(hero);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouveau héros.
	 * @param req - Requête Express contenant les données du héros.
	 * @param res - Réponse Express contenant le héros créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createHero: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { name, resume, description, img_path, video_path } = req.body;

			// Vérification des champs obligatoires.
			if (!name || !resume || !description) {
				res.status(400).json({
					error: "Champs obligatoires manquants : name, resume, description.",
				});
				return;
			}

			const newHero = await Hero.create({
				name,
				resume,
				description,
				img_path,
				video_path,
			});
			res.status(201).json(newHero);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour un héros existant.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant le héros mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateHero: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const hero = await Hero.findByPk(id);

			if (!hero) {
				res.status(404).json({ error: "Héros introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedHero = await hero.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedHero);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime un héros par son identifiant.
	 * @param req - Requête Express contenant l'ID du héros à supprimer.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteHero: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const hero = await Hero.findByPk(id);

			if (!hero) {
				res.status(404).json({ error: "Héros introuvable." });
				return;
			}

			await hero.destroy();
			res.status(200).json({ message: "Héros supprimé." });
		} catch (error) {
			next(error);
		}
	},
};

export default heroController;
