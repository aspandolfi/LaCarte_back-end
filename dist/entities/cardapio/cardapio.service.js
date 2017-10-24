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
const restaurante_model_1 = require("./../restaurante/restaurante.model");
const typedi_1 = require("typedi");
const cardapio_model_1 = require("./cardapio.model");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let CardapioService = class CardapioService {
    create(props, ...params) {
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
                let restaurante;
                this.restauranteRepository
                    .findOneById(idRestaurante)
                    .then(res => (restaurante = res))
                    .catch(err => {
                    responseData.mensagens.push(err);
                    responseData.status = false;
                });
                //verifica se não ocorreu erro ao buscar o restaurante
                if (responseData.mensagens.length == 0) {
                    responseData.mensagens.push("OK!");
                    props.restaurante = restaurante;
                    responseData.objeto = this.repository.persist(props);
                }
            }
            return responseData;
        });
    }
    readOne(id) {
        let promise = new Promise((resolve, reject) => {
            resolve(this.repository.findOneById(id));
            let response = new response_data_1.ResponseData();
            response.mensagens.push("id não encontrado.");
            response.status = false;
            reject(response);
        });
        return promise;
    }
    update(props) {
        return this.repository.persist(props);
    }
    //funcao modificada
    drop(id) {
        let cardapio;
        this.readOne(id).then((res) => (cardapio = res));
        return this.repository.remove(cardapio);
    }
    readAll() {
        return this.repository.find();
    }
};
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(cardapio_model_1.Cardapio),
    __metadata("design:type", typeorm_1.Repository)
], CardapioService.prototype, "repository", void 0);
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(restaurante_model_1.Restaurante),
    __metadata("design:type", typeorm_1.Repository)
], CardapioService.prototype, "restauranteRepository", void 0);
CardapioService = __decorate([
    typedi_1.Service()
], CardapioService);
exports.CardapioService = CardapioService;
