import Log from "../models/Log";
import type { Request } from "express";

const logService = {
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
			console.error("Failed to create log:", error);
			throw error;
		}
	},
};

export default logService;
