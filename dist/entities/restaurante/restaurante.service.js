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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const restaurante_model_1 = require("./restaurante.model");
const cliente_1 = require("../cliente");
const response_data_1 = require("../response-data");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let RestauranteService = class RestauranteService {
    constructor(restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
        this.clienteRepository = typeorm_1.getRepository(cliente_1.Cliente, "default");
        this.response = new response_data_1.ResponseData();
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let idCliente = params[0];
            let errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let dbCliente = yield this.clienteRepository.findOneById(idCliente);
                if (dbCliente === undefined) {
                    this.response.mensagens.push("Cliente não encontrado.");
                    this.response.status = false;
                    return this.response;
                }
                props.cliente = dbCliente;
                let result = yield this.restauranteRepository.persist(props);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar restaurante no banco de dados.");
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
            let result = yield this.restauranteRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("Objeto não encontrado");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.restauranteRepository.persist(props);
            }
            catch (e) {
                this.response.status = false;
                this.response.mensagens.push(e);
            }
            return this.response;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                result = this.readOne(id)
                    .then(res => (result = res))
                    .catch(res => (result = res));
                result = this.restauranteRepository
                    .remove(result)
                    .then()
                    .catch(res => (result = res));
            }
            catch (_a) {
                // console.log(Error);
            }
            return result;
        });
    }
    readAll(...params) {
        return this.restauranteRepository.find();
    }
};
RestauranteService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository(restaurante_model_1.Restaurante)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RestauranteService);
exports.RestauranteService = RestauranteService;
