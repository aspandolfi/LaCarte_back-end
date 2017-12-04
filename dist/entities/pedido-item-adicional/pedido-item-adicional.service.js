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
const adicional_model_1 = require("./../adicional/adicional.model");
const pedido_item_model_1 = require("./../pedido-item/pedido-item.model");
const pedido_item_adicional_model_1 = require("./pedido-item-adicional.model");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const response_data_1 = require("../response-data");
const class_validator_1 = require("class-validator");
let ItemPedidoAdicionalService = class ItemPedidoAdicionalService {
    constructor() {
        this.itemPedidoAdicionalRepository = typeorm_1.getRepository(pedido_item_adicional_model_1.ItemPedidoAdicional);
        this.itemPedidoRepository = typeorm_1.getRepository(pedido_item_model_1.ItemPedido);
        this.adicionalRepository = typeorm_1.getRepository(adicional_model_1.Adicional);
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idItemPedido = params[0];
            let idAdicional = params[1];
            let errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let dbItemPedido = yield this.itemPedidoRepository.findOneById(idItemPedido);
                let dbAdicional = yield this.adicionalRepository.findOneById(idAdicional);
                if (dbItemPedido === undefined) {
                    this.response.mensagens.push("pedido item não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                if (dbAdicional === undefined) {
                    this.response.mensagens.push("adicional não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                let itemPedido = yield this.itemPedidoAdicionalRepository.create(props);
                itemPedido.itemPedido = dbItemPedido;
                itemPedido.adicional = dbAdicional;
                let result = yield this.itemPedidoAdicionalRepository.save(itemPedido);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao pedido item adicional no banco de dados.");
                    return this.response;
                }
                this.response.objeto = result;
                this.response.mensagens.push("OK");
            }
            else {
                errors.forEach(val => this.response.mensagens.push(val.value));
                this.response.status = false;
            }
            return this.response;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.itemPedidoAdicionalRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("pedido item adicional não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = yield class_validator_1.validate(props);
            if (errors.length > 0) {
                errors.forEach(val => this.response.mensagens.push(val.value));
                this.response.status = false;
                return this.response;
            }
            let result = yield this.itemPedidoAdicionalRepository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar pedido item adicional.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.itemPedidoAdicionalRepository.findOneById(id);
            if (query === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.itemPedidoAdicionalRepository.remove(query);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao excluir.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readAll(...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.itemPedidoAdicionalRepository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar pedido item adicional.");
                this.response.status = false;
                return this.response;
            }
            return query;
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", response_data_1.ResponseData)
], ItemPedidoAdicionalService.prototype, "response", void 0);
ItemPedidoAdicionalService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ItemPedidoAdicionalService);
exports.ItemPedidoAdicionalService = ItemPedidoAdicionalService;
