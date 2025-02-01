/**
 * Contrôleur des statistiques.
 * Gère les opérations de récupération et de mise à jour des statistiques.
 */

import type { Request, Response, NextFunction } from "express";
import { Op, Sequelize } from "sequelize";
import Statistic from "../models/Statistic";

const statisticController = {
	/**
	 * Récupère toutes les statistiques.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des statistiques.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getAllStats: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const stats = await Statistic.findAll();
			res.status(200).json(stats);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Recherche des statistiques avec filtres (dates, heures, type).
	 * @param req - Requête Express contenant les paramètres de recherche.
	 * @param res - Réponse Express contenant les statistiques filtrées.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	searchStats: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { startDate, endDate, type, startHour, endHour } = req.query;

			// Initialisation de l'objet de filtre.
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const whereClause: any = {};

			// Filtre par date.
			if (startDate || endDate) {
				whereClause.date = {};

				if (startDate) {
					const parsedStart = new Date(startDate as string);
					parsedStart.setUTCHours(0, 0, 0, 0); // Début de la journée.

					if (!Number.isNaN(parsedStart.getTime())) {
						whereClause.date[Op.gte] = parsedStart;
					}

					// Si "endDate" est absent, "startDate" filtre uniquement cette journée.
					if (!endDate) {
						const parsedEnd = new Date(parsedStart);
						parsedEnd.setUTCHours(23, 59, 59, 999);
						whereClause.date[Op.lte] = parsedEnd;
					}
				}

				if (endDate) {
					const parsedEnd = new Date(endDate as string);
					parsedEnd.setUTCHours(23, 59, 59, 999); // Fin de la journée.

					if (!Number.isNaN(parsedEnd.getTime())) {
						whereClause.date[Op.lte] = parsedEnd;
					}
				}
			}

			// Filtre par heure.
			if (startHour || endHour) {
				whereClause[Op.and] = [];

				if (startHour) {
					whereClause[Op.and].push(
						Sequelize.where(
							Sequelize.fn("DATE_PART", "hour", Sequelize.col("date")),
							">=",
							Number(startHour),
						),
					);
				}

				if (endHour) {
					whereClause[Op.and].push(
						Sequelize.where(
							Sequelize.fn("DATE_PART", "hour", Sequelize.col("date")),
							"<=",
							Number(endHour),
						),
					);
				}
			}

			// Filtre par type.
			if (type) {
				whereClause.type = (type as string).toUpperCase();
			}

			// Exécution de la requête.
			const stats = await Statistic.findAll({ where: whereClause });

			res.status(200).json(stats);
		} catch (error) {
			console.error("❌ Erreur dans searchStats :", error);
			next(error);
		}
	},

	/**
	 * Ajoute ou met à jour une statistique (findOrCreate).
	 * @param req - Requête Express contenant les données de la statistique.
	 * @param res - Réponse Express contenant la statistique ajoutée ou mise à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	upsertStatistic: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { origin, date, type } = req.body;

			// Vérification des champs obligatoires.
			if (!origin || !date || !type) {
				res.status(400).json({
					error: "Les champs 'origin', 'date' et 'type' sont obligatoires.",
				});
				return;
			}

			// Uniformisation du type en majuscule.
			const formattedType = (type as string).toUpperCase();
			if (!["CLICK", "VIEW"].includes(formattedType)) {
				res.status(400).json({ error: "Le type doit être 'CLICK' ou 'VIEW'." });
				return;
			}

			// Vérification et conversion de la date.
			const parsedDate = new Date(date);
			if (Number.isNaN(parsedDate.getTime())) {
				res.status(400).json({ error: "Format de date invalide." });
				return;
			}

			// Arrondir la date à l'heure près (ex: 14h25 → 14h00).
			parsedDate.setUTCHours(parsedDate.getUTCHours(), 0, 0, 0);

			// Trouver ou créer la statistique.
			const [statistic, created] = await Statistic.findOrCreate({
				where: { origin, date: parsedDate, type: formattedType },
				defaults: { count: 1 },
			});

			// Si l'entrée existait déjà, incrémenter `count`.
			if (!created) {
				await statistic.increment("count");
			}

			res.status(200).json(statistic);
		} catch (error) {
			console.error("❌ Erreur dans upsertStatistic :", error);
			next(error);
		}
	},
};

export default statisticController;
