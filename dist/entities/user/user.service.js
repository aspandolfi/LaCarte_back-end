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
const config_1 = require("./../../config/config");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const response_data_1 = require("../response-data");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let UserService = class UserService {
    constructor() {
        this.repository = typeorm_1.getRepository(user_model_1.User);
        this.passportUserRepository = typeorm_1.getRepository(user_model_1.User, "passport");
        this.response = new response_data_1.ResponseData();
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            // const errors = await validate(props);
            const errors = this.validate(props);
            if (errors.length == 0) {
                let newUser = yield this.repository.create(props);
                newUser.senha = bcrypt_1.hashSync(props.senha, 0);
                let result = yield this.repository.save(newUser);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar usuário no banco de dados.");
                    this.response.status = false;
                    return this.response;
                }
                result = yield this.doLogin({ email: props.email, senha: props.senha });
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
            let result = yield this.passportUserRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readOneToToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.passportUserRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("Id não encontrado.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    readOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.passportUserRepository.findOne({ email: email });
            if (result === undefined) {
                this.response.mensagens.push("Email não encontrado.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUser = yield this.repository.findOneById(props.id);
            if (dbUser === undefined) {
                this.response.mensagens.push("Usuário não encontrado.");
                this.response.status = false;
                return this.response;
            }
            dbUser.cpf = props.cpf;
            dbUser.email = props.email;
            dbUser.nome = props.nome;
            dbUser.dataNascimento = props.dataNascimento;
            dbUser.telefone = props.telefone;
            let result = yield this.repository.save(dbUser);
            if (result === undefined) {
                this.response.mensagens.push("Falha ao atualizar usuário.");
                this.response.status = false;
                return this.response;
            }
            return result;
        });
    }
    drop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.repository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("Usuário não encontrado.");
                this.response.status = false;
                return this.response;
            }
            return yield this.repository.remove(result);
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    findOneByToken(token) {
        return this.repository.findOne({ token: token });
    }
    doLogin(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUser = yield this.passportUserRepository.findOne({ email: userLogin.email });
            if (dbUser === undefined) {
                this.response.mensagens.push("Usuário não encontrado.");
                this.response.status = false;
                return this.response;
            }
            if (bcrypt_1.compareSync(userLogin.senha, dbUser.senha)) {
                let payload = { id: dbUser.id };
                let token = jsonwebtoken_1.sign(payload, config_1.config.jwt.jwtSecret, { algorithm: "HS512", expiresIn: config_1.config.jwt.jwtExpiration * 3600 * 24 });
                yield this.passportUserRepository.update({ id: dbUser.id }, { token: token });
                this.response.objeto = token;
                return this.response;
            }
            else {
                this.response.mensagens.push("E-mail ou senha inválido.");
                this.response.status = false;
                return this.response;
            }
        });
    }
    validate(user) {
        let errors = [];
        let emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        if (user.nome == undefined || user.nome == null) {
            errors.push("Nome é obrigatório.");
        }
        if (user.email == undefined || user.email == null) {
            errors.push("E-mail é obrigatório.");
        }
        if (!user.email.search(emailRegex)) {
            errors.push("E-mail inválido.");
        }
        return errors;
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
