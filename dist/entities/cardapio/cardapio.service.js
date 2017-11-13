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
const produto_1 = require("../produto");
const restaurante_model_1 = require("./../restaurante/restaurante.model");
const typedi_1 = require("typedi");
const cardapio_model_1 = require("./cardapio.model");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let CardapioService = class CardapioService {
    constructor() {
        this.repository = typeorm_1.getRepository(cardapio_model_1.Cardapio);
        this.restauranteRepository = typeorm_1.getRepository(restaurante_model_1.Restaurante);
        this.produtoRepository = typeorm_1.getRepository(produto_1.Produto);
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idRestaurante = params[0];
            let responseData = new response_data_1.ResponseData();
            return class_validator_1.validate(props).then(errors => {
                if (errors.length > 0) {
                    errors.forEach(function (val) {
                        responseData.mensagens.push(val.value);
                    });
                    responseData.status = false;
                    responseData.objeto = props;
                }
                else {
                    // let restaurante: Restaurante;
                    // this.restauranteRepository
                    //   .findOneById(idRestaurante)
                    //   .then(res => (restaurante = res))
                    //   .catch(err => {
                    //     responseData.mensagens.push(err);
                    //     responseData.status = false;
                    //   });
                    //verifica se não ocorreu erro ao buscar o restaurante
                    if (responseData.mensagens.length == 0) {
                        responseData.mensagens.push("OK!");
                        // props.restaurante = restaurante;
                        responseData.objeto = this.repository.create(props);
                    }
                }
                return responseData;
            });
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                resolve(this.repository.findOneById(id));
                let response = new response_data_1.ResponseData();
                response.mensagens.push("id não encontrado.");
                response.status = false;
                reject(response);
            });
            return promise;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.preload(props);
        });
    }
    //funcao modificada
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cardapio;
            this.readOne(id).then((res) => (cardapio = res));
            return this.repository.remove(cardapio);
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.repository.find();
            let produtos = [];
            return produtos;
        });
    }
};
CardapioService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], CardapioService);
exports.CardapioService = CardapioService;
