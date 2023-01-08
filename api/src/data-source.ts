import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.TYPEORM_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`],
});
