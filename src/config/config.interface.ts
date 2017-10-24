import { ConnectionOptions } from 'typeorm';

export interface IConfig {
  sql: ConnectionOptions;
  jwt: { jwtSecret: string, jwtSession: { session: boolean } };
}
