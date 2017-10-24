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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const cardapio_1 = require("../../entities/cardapio");
const passport_1 = require("../../config/passport");
let CardapioController = class CardapioController {
    httpPost(props) {
        let cardapio = class_transformer_1.plainToClass(cardapio_1.Cardapio, props);
        return this.cardapioService.create(cardapio);
    }
    httpGetAll() {
        return this.cardapioService.readAll();
    }
    httpGet(id) {
        return this.cardapioService.readOne(id);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", cardapio_1.CardapioService)
], CardapioController.prototype, "cardapioService", void 0);
__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body({
        required: true
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardapioController.prototype, "httpPost", null);
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardapioController.prototype, "httpGetAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CardapioController.prototype, "httpGet", null);
CardapioController = __decorate([
    routing_controllers_1.UseBefore(() => passport_1.default.authenticate()),
    routing_controllers_1.JsonController("/cardapio")
], CardapioController);
exports.CardapioController = CardapioController;
