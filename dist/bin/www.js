"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
require("reflect-metadata");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
const entities_1 = require("../entities");
const app_1 = require("./app");
typeorm_1.useContainer(typedi_1.Container);
const port = process.env.port || 8082;
typeorm_1.createConnection(Object.assign({}, config_1.config.sql, { entities: [
        entities_1.BaseEntity,
        entities_1.User,
        entities_1.Adicional,
        entities_1.ItemPedidoAdicional,
        entities_1.Pedido,
        entities_1.ItemPedido,
        entities_1.Produto,
        entities_1.ProdutoAdicionais,
        entities_1.TipoProduto,
        entities_1.Mesa,
        entities_1.Cliente,
        entities_1.Cardapio,
        entities_1.Restaurante
    ] })).then(() => http
    .createServer(app_1.app)
    .listen(port, () => console.log('Server started on port ' + port))).catch((err) => console.error(err.message));
