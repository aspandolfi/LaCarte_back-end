"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
require("reflect-metadata");
require("es6-shim");
const app_1 = require("./app");
const port = process.env.PORT || 8082;
http.createServer(app_1.app).listen(port, () => console.log('Server started on port ' + port));
