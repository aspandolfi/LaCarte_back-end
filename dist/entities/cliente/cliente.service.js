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
const cliente_1 = require("../cliente");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const response_data_1 = require("../response-data");
let ClienteService = class ClienteService {
    constructor() {
        this.repository = typeorm_1.getRepository(cliente_1.Cliente);
        this.response = new response_data_1.ResponseData();
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    responseData.mensagens.push("OK!");
                    responseData.objeto = this.repository.create(props);
                }
                return responseData;
            });
        });
    }
    readOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository
                .findOneById(id)
                .catch(err => { return err; });
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.readOne(props.id)
                .catch(err => { return err; });
            if (query.message) {
                this.response.status = false;
                this.response.mensagens.push("Cliente não encontrado.");
                this.response.objeto = query;
                return this.response;
            }
            let cliente = query;
            cliente.nome = props.nome;
            cliente.cnpj = props.cnpj;
            cliente.telefone = props.telefone;
            const result = yield this.repository.save(cliente)
                .catch(err => { return err; });
            if (result.message) {
                this.response.status = false;
                this.response.mensagens.push("Falha ao atualizar cliente.");
                this.response.objeto = result;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                result = this.readOne(id)
                    .then(res => (result = res))
                    .catch(res => (result = res));
                result = this.repository
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
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let clientes = yield this.repository.find();
            return clientes;
        });
    }
    findOneByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ token: token });
        });
    }
};
ClienteService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ClienteService);
exports.ClienteService = ClienteService;
