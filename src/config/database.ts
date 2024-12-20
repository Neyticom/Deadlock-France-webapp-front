import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Joi from 'joi';

// Charger les variables d'environnement
dotenv.config();

// Schéma de validation des variables d'environnement
const envSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
})
  .unknown(true) // Permet les autres variables non spécifiées
  .required();

// Validation des variables d'environnement
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`⚠️ Configuration error: ${error.message}`);
}

// Création de l'instance Sequelize avec la configuration validée
const sequelize = new Sequelize(
  envVars.DB_NAME,
  envVars.DB_USER,
  envVars.DB_PASSWORD,
  {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: 'postgres',
    logging: envVars.NODE_ENV === 'development' ? console.log : false, // Désactive les logs en production
    pool: {
      max: 10, // Connexions max
      min: 0,
      acquire: 30000, // Temps max pour une connexion
      idle: 10000, // Temps d'inactivité
    },
    define: {
      timestamps: true, // Ajout automatique de createdAt et updatedAt
      underscored: true, // Noms de colonnes snake_case
    },
  }
);

// Test de connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  }
})();

export default sequelize;
