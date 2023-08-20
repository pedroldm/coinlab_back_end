import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_DATABASE as string, process.env.PG_USER as string, process.env.PG_PASSWORD as string, {
  host: process.env.PG_HOST || 'localhost',
  dialect: 'postgres',
  port: parseInt(process.env.PG_PORT ?? '5432'),
  logging: true,
});

export default sequelize;