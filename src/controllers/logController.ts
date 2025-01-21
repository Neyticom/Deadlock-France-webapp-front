import type { Request, Response, NextFunction } from "express";
import { Op, Sequelize } from "sequelize";
import Log from "../models/Log";

const logController = {
	// Récupérer tous les logs
	getAllLogs: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const logs = await Log.findAll();
			res.status(200).json(logs);
		} catch (error) {
			next(error);
		}
	},

	// Récupérer un log par ID
	getLogById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const log = await Log.findByPk(id);

			if (!log) {
				res.status(404).json({ error: "Log non trouvé" });
				return;
			}

			res.status(200).json(log);
		} catch (error) {
			next(error);
		}
	},

	// Rechercher des logs avec filtres (dates, heures, actions, user_id)
	searchLogs: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { startDate, endDate, action, startHour, endHour, user_id } =
				req.query;

			// Initialisation de l'objet de filtre
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const whereClause: any = {};

			// Filtre par date
			if (startDate || endDate) {
				whereClause.createdAt = {};

				if (startDate) {
					const parsedStart = new Date(startDate as string);
					parsedStart.setUTCHours(0, 0, 0, 0); // Début de la journée

					if (!Number.isNaN(parsedStart.getTime())) {
						whereClause.createdAt[Op.gte] = parsedStart;
					}

					// Si "endDate" est absent, "startDate" filtre uniquement cette journée.
					if (!endDate) {
						const parsedEnd = new Date(parsedStart);
						parsedEnd.setUTCHours(23, 59, 59, 999);
						whereClause.createdAt[Op.lte] = parsedEnd;
					}
				}

				if (endDate) {
					const parsedEnd = new Date(endDate as string);
					parsedEnd.setUTCHours(23, 59, 59, 999); // Fin de la journée

					if (!Number.isNaN(parsedEnd.getTime())) {
						whereClause.createdAt[Op.lte] = parsedEnd;
					}
				}
			}

			// Filtre par heure
			if (startHour || endHour) {
				whereClause[Op.and] = [];

				if (startHour) {
					whereClause[Op.and].push(
						Sequelize.where(
							Sequelize.fn("DATE_PART", "hour", Sequelize.col("created_at")),
							">=",
							Number(startHour),
						),
					);
				}

				if (endHour) {
					whereClause[Op.and].push(
						Sequelize.where(
							Sequelize.fn("DATE_PART", "hour", Sequelize.col("created_at")),
							"<=",
							Number(endHour),
						),
					);
				}
			}

			// Filtre par action
			if (action) {
				whereClause.action = (action as string).toUpperCase();
			}

			// Filtre par user_id
			if (user_id) {
				whereClause.user_id = Number(user_id);
			}

			// Exécution de la requête
			const logs = await Log.findAll({ where: whereClause });

			res.status(200).json(logs);
		} catch (error) {
			console.error("❌ ERROR in searchLogs:", error);
			next(error);
		}
	},
};

export default logController;
