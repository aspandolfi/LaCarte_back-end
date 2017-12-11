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
const pedido_item_model_1 = require("./pedido-item.model");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const response_data_1 = require("../response-data");
const index_1 = require("../index");
let ItemPedidoService = class ItemPedidoService {
    constructor() {
        this.PedidoRepository = typeorm_1.getRepository(index_1.Pedido);
        this.ProdutoRepository = typeorm_1.getRepository(index_1.Produto);
        this.PedidoItemRepository = typeorm_1.getRepository(pedido_item_model_1.ItemPedido);
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idPedido = params[0];
            let idProduto = params[1];
            let errors = props.validate(props);
            if (errors.length == 0) {
                let dbPedido = yield this.PedidoRepository.findOneById(idPedido);
                let dbProduto = yield this.ProdutoRepository.findOneById(idProduto);
                if (dbPedido === undefined) {
                    this.response.mensagens.push("pedido não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                if (dbProduto === undefined) {
                    this.response.mensagens.push("produto não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                let pedidoItem = yield this.PedidoItemRepository.create(props);
                pedidoItem.pedido = dbPedido;
                pedidoItem.produto = dbProduto;
                let result = yield this.PedidoItemRepository.save(pedidoItem);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar pedido item no banco de dados.");
                    return this.response;
                }
                this.response.objeto = result;
                this.response.mensagens.push("OK");
            }
            else {
                errors.forEach(val => this.response.mensagens.push(val));
                this.response.status = false;
            }
            return this.response;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.PedidoItemRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("pedido item não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = props.validate(props);
            if (errors.length > 0) {
                errors.forEach(val => this.response.mensagens.push(val));
                this.response.status = false;
                return this.response;
            }
            let result = yield this.PedidoItemRepository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar pedido item.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.PedidoItemRepository.findOneById(id);
            if (query === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.PedidoItemRepository.remove(query);
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
            let query = yield this.PedidoItemRepository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar pedido item.");
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
], ItemPedidoService.prototype, "response", void 0);
ItemPedidoService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ItemPedidoService);
exports.ItemPedidoService = ItemPedidoService;
