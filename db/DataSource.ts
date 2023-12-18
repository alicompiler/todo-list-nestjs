import { DataSource } from 'typeorm';
import * as process from 'process';

export default new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['db/migrations/**.ts'],
  entities: [],
});
