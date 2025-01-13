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
const { error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`⚠️ Configuration error: ${error.message}`);
}

// Création de l'instance Sequelize avec les variables validées
const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Joi garantit que ces variables existent
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || 'localhost', // Valeur par défaut
    port: Number(process.env.DB_PORT) || 5432, // Conversion explicite en nombre
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Désactive les logs en production
    pool: {
      max: 10, // Connexions max
      min: 0,
      acquire: 30000, // Temps max pour une connexion
      idle: 10000, // Temps d'inactivité
    },
    define: {
      timestamps: true, // Ajout automatique de createdAt et updatedAt
      underscored: true, // Noms de colonnes en snake_case
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
