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
const mesa_model_1 = require("./../mesa/mesa.model");
const pedido_item_model_1 = require("./../pedido-item/pedido-item.model");
const user_model_1 = require("../user/user.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Pedido = class Pedido extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        nullable: true,
        precision: 10
    }),
    class_validator_1.IsNumber({ message: "Deve ser um número do tipo inteiro." }),
    __metadata("design:type", Number)
], Pedido.prototype, "valorTotal", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Pedido.prototype, "fechado", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = user_model_1.User, user => user.pedidos),
    class_transformer_1.Type(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Pedido.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = mesa_model_1.Mesa, mesa => mesa.pedidos),
    class_transformer_1.Type(() => mesa_model_1.Mesa),
    __metadata("design:type", mesa_model_1.Mesa)
], Pedido.prototype, "mesa", void 0);
__decorate([
    typeorm_1.OneToMany(type => type = pedido_item_model_1.ItemPedido, item => item.pedido),
    class_transformer_1.Type(() => pedido_item_model_1.ItemPedido),
    __metadata("design:type", Array)
], Pedido.prototype, "itens", void 0);
Pedido = __decorate([
    typeorm_1.Entity()
], Pedido);
exports.Pedido = Pedido;
