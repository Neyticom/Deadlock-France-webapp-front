import express from "express";
import helmet from "helmet";
import cors from 'cors';
import compression from "compression";
import type { Request, Response } from "express";
import router from "./routes/router";
import database from "./models/index";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
	origin: ["http://localhost:5173","http://localhost:5174"],
	credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use("/api", router);

/**
 * @route GET /
 * @description Point d'entrée principal de l'API
 * @returns {string} - Message indiquant que l'API est active
 */
app.get("/", (req: Request, res: Response) => {
	res.send("Deadlock France API");
});

/**
 * Initialise la base de données et démarre le serveur Express.
 * Assure que tous les modèles Sequelize sont bien synchronisés avant de lancer l'application.
 */
database.sequelize
	.sync()
	.then(() => {
		console.log("✅ Modèles de la base de données initialisés avec succès");
		app.listen(PORT, () => {
			console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("❌ Erreur lors de l'initialisation de la base de données :", error);
	});
