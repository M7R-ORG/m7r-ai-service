import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const MigrationDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrations: ['./migrations/*.js'],
  entities: ['./dist/**/*.entity.js'],
  logging: false,
});

export default MigrationDataSource;
