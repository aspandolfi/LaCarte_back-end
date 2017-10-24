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
const produto_model_1 = require("./../produto/produto.model");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base-entity");
// import  Produto  from "../produto";
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let TipoProduto = class TipoProduto extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        length: 20
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TipoProduto.prototype, "nome", void 0);
__decorate([
    typeorm_1.OneToMany(type => type = produto_model_1.Produto, produtos => produtos.tipoProduto),
    class_transformer_1.Type(() => produto_model_1.Produto),
    __metadata("design:type", Array)
], TipoProduto.prototype, "produtos", void 0);
TipoProduto = __decorate([
    typeorm_1.Entity()
], TipoProduto);
exports.TipoProduto = TipoProduto;
