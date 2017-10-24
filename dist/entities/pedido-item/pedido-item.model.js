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
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_item_adicional_model_1 = require("../pedido-item-adicional/pedido-item-adicional.model");
const produto_model_1 = require("../produto/produto.model");
const pedido_model_1 = require("../pedido/pedido.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ItemPedido = class ItemPedido extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        type: 'int'
    }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ItemPedido.prototype, "quantidade", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ItemPedido.prototype, "valorDesconto", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = pedido_model_1.Pedido, p => p.itens),
    class_transformer_1.Type(() => pedido_model_1.Pedido),
    __metadata("design:type", pedido_model_1.Pedido)
], ItemPedido.prototype, "pedido", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = produto_model_1.Produto, produto => produto.itensPedido),
    class_transformer_1.Type(() => produto_model_1.Produto),
    __metadata("design:type", produto_model_1.Produto)
], ItemPedido.prototype, "produto", void 0);
__decorate([
    typeorm_1.OneToMany(type => type = pedido_item_adicional_model_1.ItemPedidoAdicional, i => i.itemPedido),
    class_transformer_1.Type(() => pedido_item_adicional_model_1.ItemPedidoAdicional),
    __metadata("design:type", Array)
], ItemPedido.prototype, "adicionais", void 0);
ItemPedido = __decorate([
    typeorm_1.Entity()
], ItemPedido);
exports.ItemPedido = ItemPedido;
