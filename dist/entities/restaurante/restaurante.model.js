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
const cliente_model_1 = require("../cliente/cliente.model");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const base_entity_1 = require("../base-entity");
const cardapio_1 = require("../cardapio");
const mesa_model_1 = require("../mesa/mesa.model");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Restaurante = class Restaurante extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_2.Column({
        length: 100
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Restaurante.prototype, "nome", void 0);
__decorate([
    typeorm_2.Column({
        length: 150,
        nullable: true
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Restaurante.prototype, "descricao", void 0);
__decorate([
    typeorm_2.Column({
        length: 150
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Restaurante.prototype, "endereco", void 0);
__decorate([
    typeorm_2.Column({
        length: 20
    }),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Restaurante.prototype, "telefone", void 0);
__decorate([
    typeorm_2.Column({ nullable: true }),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], Restaurante.prototype, "site", void 0);
__decorate([
    typeorm_2.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], Restaurante.prototype, "ativo", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = cliente_model_1.Cliente, c => c.restaurantes),
    class_transformer_1.Type(() => cliente_model_1.Cliente),
    __metadata("design:type", cliente_model_1.Cliente)
], Restaurante.prototype, "cliente", void 0);
__decorate([
    typeorm_2.OneToMany(type => type = cardapio_1.Cardapio, cardapio => cardapio.restaurante, {
        lazy: true
    }),
    class_transformer_1.Type(() => cardapio_1.Cardapio),
    __metadata("design:type", Array)
], Restaurante.prototype, "cardapios", void 0);
__decorate([
    typeorm_2.OneToMany(type => type = mesa_model_1.Mesa, mesa => mesa.restaurante, {
        lazy: true
    }),
    class_transformer_1.Type(() => mesa_model_1.Mesa),
    __metadata("design:type", Array)
], Restaurante.prototype, "mesas", void 0);
Restaurante = __decorate([
    typeorm_2.Entity()
], Restaurante);
exports.Restaurante = Restaurante;
