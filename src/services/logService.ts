/**
 * Service de gestion des logs.
 * Enregistre les actions des utilisateurs dans la base de données.
 */

import Log from "../models/Log";
import type { Request } from "express";

const logService = {
	/**
	 * Crée un log d'activité pour un utilisateur.
	 * @param userId - ID de l'utilisateur concerné.
	 * @param action - Type d'action effectuée (ex: LOGIN, CREATE, DELETE).
	 * @param message - Message descriptif de l'action.
	 * @param req - Requête Express pour récupérer l'IP et l'user-agent.
	 */
	async createLog(userId: number | null, action: "LOGIN" | "CREATE" | "DELETE" | "EDIT", context: string, req: Request) {
		try {
			const ip = req.ip || req.headers["x-forwarded-for"] || "UNKNOWN";
			return await Log.create({
				user_id: userId,
				action,
				context,
				ip: typeof ip === "string" ? ip : "UNKNOWN",
			});
		} catch (error) {
			console.error("❌ Erreur lors de la création du log :", error);
			throw error;
		}
	},
};

export default logService;
