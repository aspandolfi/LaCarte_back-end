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
const produto_model_1 = require("./../produto/produto.model");
const produto_tipo_1 = require("../produto-tipo");
const base_entity_1 = require("../base-entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ProdutoAdicionais = class ProdutoAdicionais extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        precision: 10,
        scale: 2
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ProdutoAdicionais.prototype, "valor", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = produto_model_1.Produto, produto => produto.produtosAdicionais),
    class_transformer_1.Type(() => produto_model_1.Produto),
    __metadata("design:type", produto_model_1.Produto)
], ProdutoAdicionais.prototype, "produto", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type = adicional_model_1.Adicional, adicionais => adicionais.produtosAdicionais),
    class_transformer_1.Type(() => produto_tipo_1.TipoProduto),
    __metadata("design:type", adicional_model_1.Adicional)
], ProdutoAdicionais.prototype, "adicionais", void 0);
ProdutoAdicionais = __decorate([
    typeorm_1.Entity()
], ProdutoAdicionais);
exports.ProdutoAdicionais = ProdutoAdicionais;
