import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'deadlock_france',
  username: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  models: ['/../models'],
  logging: false,
});

export default sequelize;
