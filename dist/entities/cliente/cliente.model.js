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
const restaurante_model_1 = require("../restaurante/restaurante.model");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
let Cliente = class Cliente extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        length: 20,
        unique: true
    }),
    class_validator_1.Length(14, 20),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Cliente.prototype, "cnpj", void 0);
__decorate([
    typeorm_1.Column({
        length: 50
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Cliente.prototype, "senha", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], Cliente.prototype, "telefone", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Cliente.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Cliente.prototype, "token", void 0);
__decorate([
    typeorm_1.OneToMany((type) => restaurante_model_1.Restaurante, r => r.cliente, {
        lazy: true
    }),
    class_transformer_1.Type(() => restaurante_model_1.Restaurante),
    __metadata("design:type", Array)
], Cliente.prototype, "restaurantes", void 0);
Cliente = __decorate([
    typeorm_1.Entity()
], Cliente);
exports.Cliente = Cliente;
