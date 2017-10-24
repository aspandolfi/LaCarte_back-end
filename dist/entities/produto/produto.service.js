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
const produto_1 = require("../produto");
const response_data_1 = require("../response-data");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typedi_1 = require("typedi");
const class_validator_1 = require("class-validator");
let ProdutoService = class ProdutoService {
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
                responseData.objeto = this.repository.persist(props);
            }
            return responseData;
        });
    }
    readOne(id) {
        let result = {};
        try {
            result = this.repository
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
        return this.repository.persist(props);
    }
    drop(id) {
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
    }
    readAll(...params) {
        let idCardapio = params[0];
        return this.repository.find({ cardapio: idCardapio });
    }
};
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(produto_1.Produto),
    __metadata("design:type", typeorm_1.Repository)
], ProdutoService.prototype, "repository", void 0);
ProdutoService = __decorate([
    typedi_1.Service()
], ProdutoService);
exports.ProdutoService = ProdutoService;
