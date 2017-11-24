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
const bcrypt_1 = require("bcrypt");
let ClienteService = class ClienteService {
    constructor() {
        this.clienteRepository = typeorm_1.getRepository(cliente_1.Cliente);
        this.response = new response_data_1.ResponseData();
    }
    create(props, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let cliente = yield this.clienteRepository.create(props);
            let errors = yield class_validator_1.validate(cliente);
            if (errors.length == 0) {
                cliente.senha = bcrypt_1.hashSync(cliente.senha, 0);
                let result = yield this.clienteRepository.save(cliente);
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
            const query = yield this.clienteRepository.findOneById(id)
                .catch(err => { return err; });
            if (query === undefined) {
                this.response.status = false;
                this.response.mensagens.push("Cliente não encontrado.");
                this.response.objeto = query;
                return this.response;
            }
            return query;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.readOne(props.id)
                .catch(err => { return err; });
            if (query.mensagens.length > 0) {
                this.response.status = false;
                this.response.mensagens.push("Cliente não encontrado.");
                this.response.objeto = query;
                return this.response;
            }
            let cliente = query;
            cliente.nome = props.nome;
            cliente.cnpj = props.cnpj;
            cliente.telefone = props.telefone;
            const result = yield this.clienteRepository.save(cliente)
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
            let dbCliente = yield this.clienteRepository.findOneById(id);
            if (dbCliente) {
                yield this.clienteRepository.removeById(id);
                return dbCliente;
            }
            else {
                this.response.mensagens.push("Falha ao remover cliente.");
                this.response.status = false;
                this.response.objeto = id;
                return this.response;
            }
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let clientes = yield this.clienteRepository.find();
            return clientes;
        });
    }
    findOneByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clienteRepository.findOne({ token: token });
        });
    }
};
ClienteService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ClienteService);
exports.ClienteService = ClienteService;
