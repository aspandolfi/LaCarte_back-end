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
const produto_tipo_model_1 = require("./produto-tipo.model");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
let TipoProdutoService = class TipoProdutoService {
    constructor() {
        this.repository = typeorm_1.getRepository(produto_tipo_model_1.TipoProduto);
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = props.validate(props);
            if (errors.length == 0) {
                let tipoProduto = yield this.repository.create(props);
                let result = yield this.repository.save(tipoProduto);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar tipo do produto no banco de dados.");
                    return this.response;
                }
                this.response.objeto = result;
                this.response.mensagens.push("OK");
            }
            else {
                errors.forEach(val => this.response.mensagens.push(val));
                this.response.status = false;
            }
            return this.response;
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.repository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("tipo do produto não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = props.validate(props);
            if (errors.length > 0) {
                errors.forEach(val => this.response.mensagens.push(val));
                this.response.status = false;
                return this.response;
            }
            let result = yield this.repository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar tipo do produto.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let tipo = yield this.repository.findOneById(id);
            if (tipo === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.repository.remove(tipo);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao excluir.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.repository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar tipo do produto.");
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
], TipoProdutoService.prototype, "response", void 0);
TipoProdutoService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], TipoProdutoService);
exports.TipoProdutoService = TipoProdutoService;
