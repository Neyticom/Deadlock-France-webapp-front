import type { Request, Response, NextFunction } from "express";
import { Op, Sequelize } from "sequelize";
import Statistic from "../models/Statistic";

const statisticController = {
	// Récupérer toutes les statistiques
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

	// Récupérer des statistiques avec des filtres (dates, heures, type d'action)
	searchStats: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { startDate, endDate, action, startHour, endHour } = req.query;

			// Initialisation de l'objet de filtre
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const whereClause: any = {};

			// Filtre par date
			if (startDate || endDate) {
				whereClause.date = {}; // On initialise l'objet date

				if (startDate) {
					const parsedStart = new Date(startDate as string);
					parsedStart.setUTCHours(0, 0, 0, 0); // Début de la journée

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
					parsedEnd.setUTCHours(23, 59, 59, 999); // Fin de la journée

					if (!Number.isNaN(parsedEnd.getTime())) {
						whereClause.date[Op.lte] = parsedEnd;
					}
				}
			}

			// Filtre par heure
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

			// Filtre par action
			if (action) {
				whereClause.type = (action as string).toUpperCase();
			}

			// Exécution de la requête
			const stats = await Statistic.findAll({ where: whereClause });

			res.status(200).json(stats);
		} catch (error) {
			console.error("❌ ERROR in searchStats:", error);
			next(error);
		}
	},

	// Ajouter ou mettre à jour une statistique (findOrCreate)
	upsertStatistic: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { origin, date, action } = req.body;

			// Vérification des champs obligatoires
			if (!origin || !date || !action) {
				res.status(400).json({
					error: "Les champs 'origin', 'date' et 'action' sont obligatoires.",
				});
				return;
			}

			// Uniformisation de l'action en majuscule
			const formattedAction = (action as string).toUpperCase();
			if (!["CLICK", "VIEW"].includes(formattedAction)) {
				res
					.status(400)
					.json({ error: "L'action doit être 'CLICK' ou 'VIEW'." });
				return;
			}

			// Vérification et conversion de la date
			const parsedDate = new Date(date);
			if (Number.isNaN(parsedDate.getTime())) {
				res.status(400).json({ error: "Format de date invalide." });
				return;
			}

			// Arrondir la date à l'heure près (ex: 14h25 → 14h00)
			parsedDate.setUTCHours(parsedDate.getUTCHours(), 0, 0, 0);

			// Trouver ou créer la statistique
			const [statistic, created] = await Statistic.findOrCreate({
				where: { origin, date: parsedDate, type: formattedAction },
				defaults: { count: 1 },
			});

			// Si l'entrée existait déjà, incrémenter `count`
			if (!created) {
				await statistic.increment("count");
			}

			res.status(200).json(statistic);
		} catch (error) {
			console.error("❌ ERROR in upsertStatistic:", error);
			next(error);
		}
	},
};

export default statisticController;
