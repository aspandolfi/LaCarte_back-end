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
const response_data_1 = require("../response-data");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const class_validator_1 = require("class-validator");
let ProdutoService = class ProdutoService {
    constructor() {
        this.repository = typeorm_1.getRepository(produto_1.Produto);
    }
    create(props, ...params) {
        let responseData = new response_data_1.ResponseData();
        return class_validator_1.validate(props).then(errors => {
            if (errors.length > 0) {
                errors.forEach(function (val) {
                    responseData.mensagens.push(val.value);
                });
                responseData.objeto = props;
            }
            else {
                responseData.mensagens.push("OK!");
                responseData.objeto = this.repository.create(props);
            }
            return responseData;
        });
    }
    readOne(id) {
        return this.repository.findOneById(id);
    }
    readOneByTipo(tipoProduto) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.repository.find({ where: { tipoProduto: tipoProduto } });
            return query;
        });
    }
    update(props) {
        return this.repository.preload(props);
    }
    drop(id) {
        return new Promise((resolve, reject) => {
            this.readOne(id)
                .then(res => { return resolve(true); })
                .catch(error => {
                return reject(false);
            });
        });
    }
    readAll() {
        return this.repository.find();
    }
};
ProdutoService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ProdutoService);
exports.ProdutoService = ProdutoService;
