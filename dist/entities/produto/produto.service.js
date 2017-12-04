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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_data_model_1 = require("./../response-data/response-data.model");
const produto_tipo_model_1 = require("./../produto-tipo/produto-tipo.model");
const produto_1 = require("../produto");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const class_validator_1 = require("class-validator");
let ProdutoService = class ProdutoService {
    constructor() {
        this.produtoRepository = typeorm_1.getRepository(produto_1.Produto);
        this.tipoProdutoRepository = typeorm_1.getRepository(produto_tipo_model_1.TipoProduto);
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idTipoProduto = params[0];
            let errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let dbTipo = yield this.tipoProdutoRepository.findOneById(idTipoProduto);
                if (dbTipo === undefined) {
                    this.response.mensagens.push("tipo não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                let restauramte = yield this.produtoRepository.create(props);
                restauramte.tipoProduto = dbTipo;
                let result = yield this.produtoRepository.save(restauramte);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar produto no banco de dados.");
                    return this.response;
                }
                this.response.objeto = result;
                this.response.mensagens.push("OK");
            }
            else {
                errors.forEach(val => this.response.mensagens.push(val.value));
                this.response.status = false;
            }
            return this.response;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.produtoRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("produto não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readOneByTipo(tipoProduto) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.produtoRepository.find({
                where: { tipoProduto: tipoProduto }
            });
            return query;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = yield class_validator_1.validate(props);
            if (errors.length > 0) {
                errors.forEach(val => this.response.mensagens.push(val.value));
                this.response.status = false;
                return this.response;
            }
            let result = yield this.produtoRepository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar produto.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.produtoRepository.findOneById(id);
            if (query === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.produtoRepository.remove(query);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao excluir.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readAll(...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.produtoRepository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar produto.");
                this.response.status = false;
                return this.response;
            }
            return query;
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", response_data_model_1.ResponseData)
], ProdutoService.prototype, "response", void 0);
ProdutoService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ProdutoService);
exports.ProdutoService = ProdutoService;
