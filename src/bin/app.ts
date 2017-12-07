import { urlencoded } from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { useContainer as useContainerClassValidator } from "class-validator";
import { useContainer as useContainerClassRouting, useExpressServer, Action } from "routing-controllers";
import { Container } from "typedi";
import {
  UserController,
  CardapioController,
  PedidoController,
  pedidoItem,
  AdicionalController,
  ClienteController,
  MesaController,
  PedidoItemAdicionalController,
  ProdutoAdicionaisController,
  ProdutoTipoController,
  RestauranteController,
  ProdutoController
} from "../controllers";
import { Auth } from "../config";

useContainerClassRouting(Container);

useContainerClassValidator(Container);

const config: express.Application = express();

config
  .use(morgan("dev"))
  .use(helmet())
  .use(Auth.Initialize())
  .use(
  urlencoded({
    extended: true
  })
  );

const app: express.Application = useExpressServer(config, {
  controllers: [
    UserController,
    CardapioController,
    PedidoController,
    pedidoItem,
    AdicionalController,
    ClienteController,
    MesaController,
    PedidoItemAdicionalController,
    ProdutoAdicionaisController,
    ProdutoTipoController,
    RestauranteController,
    ProdutoController
  ],
  routePrefix: "/api/v1"
});

export { app };
