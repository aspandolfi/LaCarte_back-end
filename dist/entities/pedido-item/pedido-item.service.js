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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_item_model_1 = require("./pedido-item.model");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const response_data_1 = require("../response-data");
const class_validator_1 = require("class-validator");
const index_1 = require("../index");
let ItemPedidoService = class ItemPedidoService {
    constructor(repository) {
        this.repository = repository;
        this.PedidoRepository = typeorm_1.getRepository(index_1.Pedido, "default");
        this.ProdutoRepository = typeorm_1.getRepository(index_1.Produto, "default");
    }
    create(props, ...params) {
        let idPedido = params[0];
        let idProduto = params[1];
        let responseData = new response_data_1.ResponseData();
        return class_validator_1.validate(props).then(errors => {
            if (errors.length > 0) {
                errors.forEach(function (val) {
                    responseData.mensagens.push(val.value);
                });
                responseData.status = false;
                responseData.objeto = props;
            }
            else {
                responseData.mensagens.push("OK!");
                responseData.objeto = this.repository.persist(props);
            }
            return responseData;
        });
    }
    readOne(id) {
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
    }
    update(props) {
        return this.repository.persist(props);
    }
    drop(id) {
        let result = {};
        try {
            result = this.readOne(id)
                .then(res => (result = res))
                .catch(res => (result = res));
            result = this.repository
                .remove(result)
                .then()
                .catch(res => (result = res));
        }
        catch (_a) {
            // console.log(Error);
        }
        return result;
    }
    readAll() {
        return this.repository.find();
    }
};
ItemPedidoService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository(pedido_item_model_1.ItemPedido)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ItemPedidoService);
exports.ItemPedidoService = ItemPedidoService;
