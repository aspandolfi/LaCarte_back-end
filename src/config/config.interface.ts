import { ConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface IConfig {
  sql: PostgresConnectionOptions;
  jwt: { jwtSecret: string, jwtSession: { session: boolean }, jwtExpiration: number };
}
