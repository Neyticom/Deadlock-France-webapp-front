/**
 * Contrôleur des entrées de patchnotes.
 * Gère les opérations CRUD sur les entrées de patchnotes.
 */

import type { Request, Response, NextFunction } from "express";
import PatchnoteEntry from "../models/PatchnoteEntry";

const patchnoteEntryController = {
	/**
	 * Récupère toutes les entrées d'un patchnote donné.
	 * @param req - Requête Express contenant l'ID du patchnote.
	 * @param res - Réponse Express contenant la liste des entrées du patchnote.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllEntries: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: patchnoteId } = req.params;
			const entries = await PatchnoteEntry.findAll({
				where: { patchnote_id: patchnoteId },
			});
			res.status(200).json(entries);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère une entrée spécifique d'un patchnote par son identifiant.
	 * @param req - Requête Express contenant l'ID du patchnote et de l'entrée.
	 * @param res - Réponse Express contenant les données de l'entrée.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getEntryById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: patchnoteId, id: entryId } = req.params;
			const entry = await PatchnoteEntry.findOne({
				where: { id: entryId, patchnote_id: patchnoteId },
			});

			if (!entry) {
				res.status(404).json({ error: "Entrée de patchnote introuvable." });
				return;
			}

			res.status(200).json(entry);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée une nouvelle entrée pour un patchnote.
	 * @param req - Requête Express contenant les données de l'entrée.
	 * @param res - Réponse Express contenant l'entrée créée.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	createEntry: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: patchnoteId } = req.params;
			const newEntry = await PatchnoteEntry.create({
				...req.body,
				patchnote_id: patchnoteId,
			});
			res.status(201).json(newEntry);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour une entrée de patchnote existante.
	 * @param req - Requête Express contenant l'ID et les nouvelles données.
	 * @param res - Réponse Express contenant l'entrée mise à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateEntry: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: patchnoteId, id: entryId } = req.params;
			const entry = await PatchnoteEntry.findOne({
				where: { id: entryId, patchnote_id: patchnoteId },
			});

			if (!entry) {
				res.status(404).json({ error: "Entrée de patchnote introuvable." });
				return;
			}

			// Mise à jour partielle (PATCH).
			const updatedEntry = await entry.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedEntry);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Supprime une entrée de patchnote par son identifiant.
	 * @param req - Requête Express contenant l'ID du patchnote et de l'entrée.
	 * @param res - Réponse Express confirmant la suppression.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteEntry: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: patchnoteId, id: entryId } = req.params;
			const entry = await PatchnoteEntry.findOne({
				where: { id: entryId, patchnote_id: patchnoteId },
			});

			if (!entry) {
				res.status(404).json({ error: "Entrée de patchnote introuvable." });
				return;
			}

			await entry.destroy();
			res.status(200).json({ message: "Entrée de patchnote supprimée." });
		} catch (error) {
			next(error);
		}
	},
};

export default patchnoteEntryController;
