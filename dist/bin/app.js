"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const controllers_1 = require("../controllers");
const config_1 = require("../config");
routing_controllers_1.useContainer(typedi_1.Container);
class_validator_1.useContainer(typedi_1.Container);
const config = express();
config
    .use(morgan("dev"))
    .use(helmet())
    .use(config_1.Auth.Initialize())
    .use(body_parser_1.urlencoded({
    extended: true
}));
const app = routing_controllers_1.useExpressServer(config, {
    controllers: [
        controllers_1.UserController,
        controllers_1.CardapioController,
        controllers_1.PedidoController,
        controllers_1.pedidoItem,
        controllers_1.AdicionalController,
        controllers_1.ClienteController,
        controllers_1.MesaController,
        controllers_1.PedidoItemAdicionalController,
        controllers_1.ProdutoAdicionaisController,
        controllers_1.ProdutoTipoController,
        controllers_1.RestauranteController,
        controllers_1.ProdutoController
    ],
    routePrefix: "/api/v1",
    cors: true
});
exports.app = app;
