import * as http from 'http';
import 'reflect-metadata';
import 'es6-shim';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { config } from './src/config/config';
import {
    BaseEntity,
    User,
    Cardapio,
    Adicional,
    Cliente,
    Mesa,
    Pedido,
    ItemPedido,
    ItemPedidoAdicional,
    Produto,
    ProdutoAdicionais,
    TipoProduto,
    Restaurante
} from './src/entities';
import { app } from './src/bin/app';

useContainer(Container);

const port = process.env.port || 8082;

http.createServer(app).listen(port, () => console.log('Server started on port ' + port));

// createConnection().then(
//     () => http
//         .createServer(app)
//         .listen(port, () => console.log('Server started on port ' + port))
// ).catch(
//     (err: Error) => console.error(err.message)
//     );
