"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    sql: {
        autoSchemaSync: true,
        autoMigrationsRun: false,
        driver: {
            // database: 'dblacarte',
            // host: 'us-cdbr-azure-southcentral-f.cloudapp.net',
            // password: 'dceb4557',
            // port: 3306,
            // type: 'mysql',
            // username: 'bd957709ee8ba0'
            // type: "postgres",
            // host: "localhost",
            // port: 5432,
            // username: "postgres",
            // password: "123456",
            // database: "test",
            type: "postgres",
            host: "stampy.db.elephantsql.com",
            port: 5432,
            username: "gxiubqwv",
            password: "Eor0v0XVSaO5EkcKrqGwSL2tlWo_huxc",
            database: "gxiubqwv",
        },
        dropSchemaOnConnection: false
    },
    jwt: {
        jwtSecret: "l@Cart3A$$PiE$%T/s",
        jwtSession: { session: false }
    }
};
