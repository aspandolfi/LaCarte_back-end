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
const restaurante_model_1 = require("./restaurante.model");
// import { Cliente } from "../cliente";
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let RestauranteService = class RestauranteService {
    // @OrmRepository(Cliente) private clienteRepository: Repository<Restaurante>;
    create(props, ...params) {
        let idCliente = params[0];
        let responseData = new response_data_1.ResponseData();
        return class_validator_1.validate(props).then(errors => {
            if (errors.length > 0) {
                errors.forEach(function (val) {
                    responseData.mensagens.push(val.value);
                    idCliente.mensagens.push(val.value);
                });
                responseData.status = false;
                responseData.objeto = props;
            }
            else {
                responseData.mensagens.push("OK!");
                props.cliente = idCliente;
                responseData.objeto = this.restauranteRepository.persist(props);
                // idCliente.objeto = this.clienteRepository.persist(props);
            }
            return responseData;
        });
    }
    readOne(id) {
        let result = {};
        try {
            result = this.restauranteRepository
                .findOneById(id)
                .then()
                .catch(res => (result = res));
        }
        catch (_a) {
            // console.log(Error);
        }
        return result;
    }
    update(props) {
        return this.restauranteRepository.persist(props);
    }
    drop(id) {
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
    }
    readAll(...params) {
        return this.restauranteRepository.find();
    }
};
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(restaurante_model_1.Restaurante),
    __metadata("design:type", typeorm_1.Repository)
], RestauranteService.prototype, "restauranteRepository", void 0);
RestauranteService = __decorate([
    typedi_1.Service()
], RestauranteService);
exports.RestauranteService = RestauranteService;
