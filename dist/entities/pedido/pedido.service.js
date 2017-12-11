"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const pedido_model_1 = require("./pedido.model");
const response_data_1 = require("../response-data");
let PedidoService = class PedidoService {
    constructor() {
        this.repository = typeorm_1.getRepository(pedido_model_1.Pedido);
        this.response = new response_data_1.ResponseData();
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = params[0];
            let response = new response_data_1.ResponseData();
            return class_validator_1.validate(props).then(errors => {
                if (errors.length > 0) {
                    errors.forEach(function (val) {
                        response.mensagens.push(val.value);
                    });
                    response.status = false;
                    response.objeto = props;
                }
                else {
                    response.mensagens.push("OK!");
                    response.objeto = this.repository.create(props);
                }
                return response;
            });
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                result = this.repository
                    .findOneById(id)
                    .then()
                    .catch(res => (result = res));
            }
            catch (_a) {
                // console.log(Error);
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.preload(props);
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                result = this.readOne(id)
                    .then(res => (result = res))
                    .catch(res => (result = res));
                result = this.repository.remove(result)
                    .then()
                    .catch(res => (result = res));
            }
            catch (_a) {
                // console.log(Error);
            }
            return result;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
};
PedidoService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], PedidoService);
exports.PedidoService = PedidoService;
