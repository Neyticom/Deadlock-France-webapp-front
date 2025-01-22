import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Joi from "joi";

// Charge le bon fichier .env selon NODE_ENV
dotenv.config();

// Schéma de validation des variables d'environnement
const envSchema = Joi.object({
	DB_NAME: Joi.string().required(),
	DB_USER: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_HOST: Joi.string().default("localhost"),
	DB_PORT: Joi.number().default(5432),
	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),
}).unknown(true); // Permet les autres variables

// Validation des variables d'environnement
const { error } = envSchema.validate(process.env);
if (error) {
	throw new Error(`⚠️ Configuration error: ${error.message}`);
}

// Création de Sequelize en fonction de NODE_ENV
const sequelize =
	process.env.NODE_ENV === "test"
		? new Sequelize({
				dialect: "sqlite",
				storage: ":memory:", // Base temporaire pour les tests
				logging: false, // Pas de logs SQL en mode test
			})
		: new Sequelize(
				process.env.DB_NAME as string,
				process.env.DB_USER as string,
				process.env.DB_PASSWORD as string,
				{
					host: process.env.DB_HOST || "localhost",
					port: Number(process.env.DB_PORT) || 5432,
					dialect: "postgres",
					logging: process.env.NODE_ENV === "development" ? console.log : false, // Désactive les logs en prod/test
					pool: {
						max: 10,
						min: 0,
						acquire: 30000,
						idle: 10000,
					},
					define: {
						timestamps: true,
						underscored: true,
					},
				},
			);

// Vérification de la connexion (sauf en mode test pour éviter des erreurs Jest)
if (process.env.NODE_ENV !== "test") {
	(async () => {
		try {
			await sequelize.authenticate();
			console.log("✅ Database connection has been established successfully.");
		} catch (err) {
			console.error("❌ Unable to connect to the database:", err);
			process.exit(1);
		}
	})();
}

export default sequelize;
