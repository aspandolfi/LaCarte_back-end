"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
require("reflect-metadata");
require("es6-shim");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
typeorm_1.useContainer(typedi_1.Container);
const port = process.env.port || 8082;
typeorm_1.createConnection().then(() => http
    .createServer(app_1.app)
    .listen(port, () => console.log('Server started on port ' + port))).catch((err) => console.error(err.message));
