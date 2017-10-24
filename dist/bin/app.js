"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const controllers_1 = require("../controllers");
const cliente_1 = require("../entities/cliente");
const passport_1 = require("../config/passport");
routing_controllers_1.useContainer(typedi_1.Container);
class_validator_1.useContainer(typedi_1.Container);
const config = express();
config
    .use(morgan('dev'))
    .use(helmet())
    .use(passport_1.default.initialize())
    .use(body_parser_1.urlencoded({
    extended: true
}));
const app = routing_controllers_1.useExpressServer(config, {
    controllers: [
        controllers_1.UserController,
        controllers_1.CardapioController
    ],
    authorizationChecker: (action, roles) => __awaiter(this, void 0, void 0, function* () {
        const token = action.request.headers["authorization"];
        const user = yield typedi_1.Container.get(cliente_1.ClienteService).findOneByToken(token);
        if (user /*&& !roles.length*/)
            return true;
        // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
        //   return true;
        return false;
    }),
    routePrefix: '/api/v1',
    validation: true
});
exports.app = app;
