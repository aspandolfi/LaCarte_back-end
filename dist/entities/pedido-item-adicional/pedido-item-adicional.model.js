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
const adicional_model_1 = require("./../adicional/adicional.model");
const pedido_item_model_1 = require("../pedido-item/pedido-item.model");
const pedido_model_1 = require("../pedido/pedido.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ItemPedidoAdicional = class ItemPedidoAdicional extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        type: 'int'
    }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ItemPedidoAdicional.prototype, "quantidade", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = pedido_item_model_1.ItemPedido, itemPedido => itemPedido.adicionais),
    class_transformer_1.Type(() => pedido_model_1.Pedido),
    __metadata("design:type", pedido_item_model_1.ItemPedido)
], ItemPedidoAdicional.prototype, "itemPedido", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = adicional_model_1.Adicional, a => a.itemPedidoAdicionais),
    class_transformer_1.Type(() => adicional_model_1.Adicional),
    __metadata("design:type", adicional_model_1.Adicional)
], ItemPedidoAdicional.prototype, "adicional", void 0);
ItemPedidoAdicional = __decorate([
    typeorm_1.Entity()
], ItemPedidoAdicional);
exports.ItemPedidoAdicional = ItemPedidoAdicional;
