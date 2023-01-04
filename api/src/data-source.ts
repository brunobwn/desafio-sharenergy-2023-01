import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, '../.env') });

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  //   url: process.env.MONGODB_URL,
  //   useNewUrlParser: true,
  synchronize: false,
  logging: false,
  entities: ['src/app/models/*.ts'],
  migrations: ['src/database/migration/*.ts'],
  driver: process.env.TYPEORM_DRIVER_EXTRA,
});
