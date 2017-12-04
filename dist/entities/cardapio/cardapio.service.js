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
const restaurante_model_1 = require("./../restaurante/restaurante.model");
const typedi_1 = require("typedi");
const cardapio_model_1 = require("./cardapio.model");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let CardapioService = class CardapioService {
    constructor() {
        this.cardapioRepository = typeorm_1.getRepository(cardapio_model_1.Cardapio);
        this.restauranteRepository = typeorm_1.getRepository(restaurante_model_1.Restaurante);
        this.response = new response_data_1.ResponseData();
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idRestaurante = params[0];
            let errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let dbRestaurante = yield this.restauranteRepository.findOneById(idRestaurante);
                if (dbRestaurante === undefined) {
                    this.response.mensagens.push("restaurante não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                let cardapio = yield this.cardapioRepository.create(props);
                cardapio.restaurante = dbRestaurante;
                let result = yield this.cardapioRepository.save(cardapio);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar cardapio no banco de dados.");
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
            let result = yield this.cardapioRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("cardapio não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
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
            let result = yield this.cardapioRepository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar cardapio.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cardapio = yield this.cardapioRepository.findOneById(id);
            if (cardapio === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.cardapioRepository.remove(cardapio);
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
            let query = yield this.cardapioRepository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar cardapios.");
                this.response.status = false;
                return this.response;
            }
            return query;
        });
    }
};
CardapioService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], CardapioService);
exports.CardapioService = CardapioService;
