import { Router } from "express";
import logController from "../controllers/logController";
import authMiddleware from "../middlewares/authMiddleware";

const logRoutes = Router();

// Rechercher des logs avec filtres (intervalle de dates, action, user_id)
logRoutes.get("/search", authMiddleware.verifyAdmin, logController.searchLogs);

// Récupérer tous les logs
logRoutes.get("/", authMiddleware.verifyAdmin, logController.getAllLogs);

// Récupérer un log par ID
logRoutes.get("/:id", authMiddleware.verifyAdmin, logController.getLogById);

export default logRoutes;
