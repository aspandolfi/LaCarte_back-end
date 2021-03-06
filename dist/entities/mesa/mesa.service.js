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
const mesa_model_1 = require("./mesa.model");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let MesaService = class MesaService {
    constructor() {
        this.mesaRepository = typeorm_1.getRepository(mesa_model_1.Mesa);
        this.restauranteRepository = typeorm_1.getRepository(restaurante_model_1.Restaurante);
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
                let mesa = yield this.mesaRepository.create(props);
                mesa.restaurante = dbRestaurante;
                let result = yield this.mesaRepository.save(mesa);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar mesa no banco de dados.");
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
            let result = yield this.mesaRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("mesa não encontrado");
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
            let result = yield this.mesaRepository.save(props);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar mesa.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let mesa = yield this.mesaRepository.findOneById(id);
            if (mesa === undefined) {
                this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            let result = yield this.mesaRepository.remove(mesa);
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
            let query = yield this.mesaRepository.find();
            if (query === undefined) {
                this.response.mensagens.push("Falha ao buscar mesa.");
                this.response.status = false;
                return this.response;
            }
            return query;
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", response_data_1.ResponseData)
], MesaService.prototype, "response", void 0);
MesaService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], MesaService);
exports.MesaService = MesaService;
