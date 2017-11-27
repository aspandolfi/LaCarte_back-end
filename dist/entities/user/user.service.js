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
const class_validator_1 = require("class-validator");
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
            const errors = yield class_validator_1.validate(props);
            if (errors.length == 0) {
                let newUser = yield this.repository.create(props);
                newUser.senha = bcrypt_1.hashSync(props.senha, 0);
                let result = yield this.repository.save(newUser);
                if (result === undefined) {
                    this.response.mensagens.push("Erro ao salvar usuário no banco de dados.");
                    this.response.status = false;
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
        let promise = new Promise((resolve, reject) => {
            resolve(this.repository.findOneById(id));
            let response = new response_data_1.ResponseData();
            response.mensagens.push("Id não encontrado.");
            response.status = false;
            reject(response);
        });
        return promise;
    }
    readOneToToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.passportUserRepository.findOneById(id);
            if (result === undefined) {
                this.response.mensagens.push("Id não encontrado.");
                this.response.status = false;
            }
            return result;
        });
    }
    readOneByEmail(email) {
        let promise = new Promise((resolve, reject) => {
            resolve(this.repository.findOne({ email: email }));
            let response = new response_data_1.ResponseData();
            response.mensagens.push("email não encontrado.");
            response.status = false;
            reject(response);
        });
        return promise;
    }
    update(props) {
        return this.repository.preload(props);
    }
    drop(id) {
        let user;
        this.readOne(id).then((res) => (user = res));
        return this.repository.remove(user);
    }
    readAll() {
        return this.repository
            .find();
    }
    findOneByToken(token) {
        return this.repository.findOne({ token: token });
    }
    doLogin(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUser = yield this.passportUserRepository.findOne({ email: userLogin.email });
            if (dbUser === undefined) {
                return "Usuário não encontrado.";
            }
            if (bcrypt_1.compareSync(userLogin.senha, dbUser.senha)) {
                let payload = { id: dbUser.id };
                // let token = encode(payload, config.jwt.jwtSecret);
                let token = jsonwebtoken_1.sign(payload, config_1.config.jwt.jwtSecret, { algorithm: "HS512", expiresIn: config_1.config.jwt.jwtExpiration * 3600 * 24 });
                return token;
            }
            else {
                return "E-mail ou senha inválido.";
            }
        });
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
