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
const class_transformer_1 = require("class-transformer");
const pedido_model_1 = require("./../pedido/pedido.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
const class_validator_1 = require("class-validator");
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], User.prototype, "dataNascimento", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
        length: 11
    }),
    class_validator_1.Length(11, 11),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], User.prototype, "telefone", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "sobrenome", void 0);
__decorate([
    typeorm_1.Column({
        length: 20
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "tokenFacebook", void 0);
__decorate([
    typeorm_1.OneToMany(() => pedido_model_1.Pedido, pedido => pedido.user),
    class_transformer_1.Type(() => pedido_model_1.Pedido),
    __metadata("design:type", Array)
], User.prototype, "pedidos", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
