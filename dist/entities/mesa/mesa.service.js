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
const console = require("console");
const restaurante_model_1 = require("./../restaurante/restaurante.model");
const mesa_model_1 = require("./mesa.model");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let MesaService = class MesaService {
    constructor(mesaRepository) {
        this.mesaRepository = mesaRepository;
        this.restauranteRepository = typeorm_1.getRepository(restaurante_model_1.Restaurante, "default");
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(params[0]);
            let idRestaurante = params[0];
            const responseData = new response_data_1.ResponseData();
            let errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let restaurante = yield this.restauranteRepository.findOneById(idRestaurante);
                if (restaurante) {
                    props.restaurante = restaurante;
                    let result = yield this.mesaRepository.persist(props)
                        .then(res => {
                        return res;
                    })
                        .catch(err => {
                        return err;
                    });
                    if (result.message) {
                        responseData.mensagens.push(result.message);
                    }
                    else {
                        responseData.mensagens.push("OK");
                    }
                }
                else {
                    errors.forEach(val => responseData.mensagens.push(val.value));
                    responseData.status = false;
                }
                return responseData;
            }
        });
    }
    readOne(id) {
        return this.mesaRepository.findOneById(id);
    }
    update(props) {
        return this.mesaRepository.persist(props);
    }
    drop(id) {
        let result = {};
        try {
            result = this.readOne(id)
                .then(res => (result = res))
                .catch(res => (result = res));
            result = this.mesaRepository
                .remove(result)
                .then()
                .catch(res => (result = res));
        }
        catch (_a) {
            // console.log(Error);
        }
        return result;
    }
    readAll() {
        return this.mesaRepository.find();
    }
};
MesaService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository(mesa_model_1.Mesa)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MesaService);
exports.MesaService = MesaService;
