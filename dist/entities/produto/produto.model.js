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
const pedido_item_model_1 = require("../pedido-item/pedido-item.model");
const produto_adicionais_model_1 = require("../produto-adicionais/produto-adicionais.model");
const cardapio_1 = require("../cardapio");
const produto_tipo_1 = require("../produto-tipo");
const base_entity_1 = require("../base-entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Produto = class Produto extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        length: 50
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Produto.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column({
        length: 100,
        nullable: true
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Produto.prototype, "valor", void 0);
__decorate([
    typeorm_1.Column({
        length: 256
    }),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], Produto.prototype, "urlImagem", void 0);
__decorate([
    typeorm_1.Column({
        default: true
    }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], Produto.prototype, "ativo", void 0);
__decorate([
    typeorm_1.ManyToMany(type => cardapio_1.Cardapio),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Produto.prototype, "cardapios", void 0);
__decorate([
    typeorm_1.ManyToOne(type => (type = produto_tipo_1.TipoProduto), tipoProduto => tipoProduto.produtos),
    class_transformer_1.Type(() => produto_tipo_1.TipoProduto),
    __metadata("design:type", produto_tipo_1.TipoProduto)
], Produto.prototype, "tipoProduto", void 0);
__decorate([
    typeorm_1.OneToMany(type => (type = produto_adicionais_model_1.ProdutoAdicionais), produtoAdicionais => produtoAdicionais.produto),
    class_transformer_1.Type(() => produto_adicionais_model_1.ProdutoAdicionais),
    __metadata("design:type", Array)
], Produto.prototype, "produtosAdicionais", void 0);
__decorate([
    typeorm_1.OneToMany(type => (type = pedido_item_model_1.ItemPedido), itemPedido => itemPedido.produto),
    class_transformer_1.Type(() => pedido_item_model_1.ItemPedido),
    __metadata("design:type", Array)
], Produto.prototype, "itensPedido", void 0);
Produto = __decorate([
    typeorm_1.Entity()
], Produto);
exports.Produto = Produto;
