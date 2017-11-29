import { IConfig } from './config.interface';

export const config: IConfig = {
  sql: {
    // database: 'dblacarte',
    // host: 'us-cdbr-azure-southcentral-f.cloudapp.net',
    // password: 'dceb4557',
    // port: 3306,
    // type: 'mysql',
    // username: 'bd957709ee8ba0',
    // synchronize: true,
    logging: "all",
    dropSchema: true,

    // entities: ['src/entities/**/*.model.js'],

    // type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "123456",
    // database: "lacarte",
    type: "postgres",
    host: "stampy.db.elephantsql.com",
    port: 5432,
    username: "gxiubqwv",
    password: "Eor0v0XVSaO5EkcKrqGwSL2tlWo_huxc",
    database: "gxiubqwv"
  },
  jwt: {
    jwtSecret: "l@Cart3A$$PirE$%T/s",
    jwtSession: { session: false },
    jwtExpiration: 5
  }

}
