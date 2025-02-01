/*
 * Configuration et connexion à la base de données.
 * Utilise Sequelize pour PostgreSQL (ou SQLite en mode test).
 */

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Joi from "joi";

// ===============================
// Chargement des variables d'environnement
// ===============================
dotenv.config();

/**
 * Validation des variables d'environnement avec Joi.
 * Assure que toutes les variables requises sont présentes et bien formatées.
 */
const envSchema = Joi.object({
	DB_NAME: Joi.string().required(),
	DB_USER: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_HOST: Joi.string().default("localhost"),
	DB_PORT: Joi.number().default(5432),
	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),
}).unknown(true); // Autorise d'autres variables d'environnement.

// Vérification des variables d'environnement.
const { error } = envSchema.validate(process.env);
if (error) {
	throw new Error(`⚠️ Configuration error: ${error.message}`);
}

// ===============================
// Configuration de la base de données
// ===============================
/**
 * Configure la connexion à la base de données avec Sequelize.
 * - Mode test : SQLite en mémoire (sans logs).
 * - Autres modes : PostgreSQL avec gestion du pool de connexions.
 */
const sequelize =
	process.env.NODE_ENV === "test"
		? new Sequelize({
				dialect: "sqlite",
				storage: ":memory:", // Base temporaire pour les tests.
				logging: false, // Désactive les logs en mode test.
			})
		: new Sequelize(
				process.env.DB_NAME as string,
				process.env.DB_USER as string,
				process.env.DB_PASSWORD as string,
				{
					host: process.env.DB_HOST || "localhost",
					port: Number(process.env.DB_PORT) || 5432,
					dialect: "postgres",
					logging: process.env.NODE_ENV === "development" ? console.log : false, // Désactive les logs en production/test.
					pool: {
						max: 10, // Nombre maximum de connexions simultanées.
						min: 0, // Nombre minimum de connexions.
						acquire: 30000, // Temps maximum pour obtenir une connexion.
						idle: 10000, // Temps avant fermeture d'une connexion inactive.
					},
					define: {
						timestamps: true, // Active les champs createdAt et updatedAt par défaut.
						underscored: true, // Utilise le format snake_case pour les colonnes.
					},
				},
			);

// ===============================
// Vérification de la connexion à la base de données
// ===============================
/**
 * Vérifie que la connexion à la base de données est bien établie.
 * Cette vérification est ignorée en mode test pour éviter les erreurs Jest.
 */
if (process.env.NODE_ENV !== "test") {
	(async () => {
		try {
			await sequelize.authenticate();
			console.log("✅ La connexion à la base de données a été établie avec succès.");
		} catch (err) {
			console.error("❌ Impossible de se connecter à la base de données :", err);
			process.exit(1);
		}
	})();
}

export default sequelize;
