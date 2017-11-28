"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
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
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "lacarte",
    },
    jwt: {
        jwtSecret: "l@Cart3A$$PirE$%T/s",
        jwtSession: { session: false },
        jwtExpiration: 5
    }
};
