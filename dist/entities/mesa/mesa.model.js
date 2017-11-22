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
const restaurante_1 = require("../restaurante");
const pedido_model_1 = require("../pedido/pedido.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Mesa = class Mesa extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        unique: true
    }),
    class_validator_1.IsNotEmpty({ message: "Número não pode ser vazio." }),
    class_validator_1.IsNumber({ message: "Deve ser um número do tipo inteiro." }),
    __metadata("design:type", Number)
], Mesa.prototype, "numero", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Mesa.prototype, "qrcode", void 0);
__decorate([
    typeorm_1.OneToMany(type => pedido_model_1.Pedido, pedido => pedido.mesa),
    class_transformer_1.Type(() => pedido_model_1.Pedido),
    __metadata("design:type", Array)
], Mesa.prototype, "pedidos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => restaurante_1.Restaurante, restaurante => restaurante.mesas),
    class_transformer_1.Type(() => restaurante_1.Restaurante),
    __metadata("design:type", restaurante_1.Restaurante)
], Mesa.prototype, "restaurante", void 0);
Mesa = __decorate([
    typeorm_1.Entity()
], Mesa);
exports.Mesa = Mesa;
