import express from "express";
import type { Request, Response } from "express";
import router from "./routes/router";
import database from "./models/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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
