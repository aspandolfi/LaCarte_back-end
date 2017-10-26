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
const pedido_item_1 = require("../../entities/pedido-item");
// @UseBefore(() => Auth.authenticate())
let pedidoItem = class pedidoItem {
    httpPost(props) {
        let itemPedido = class_transformer_1.plainToClass(pedido_item_1.ItemPedido, props);
        return this.itemPedidoService.create(itemPedido);
    }
    httpGetAll() {
        return this.itemPedidoService.readAll();
    }
    httpGet(id) {
        return this.itemPedidoService.readOne(id);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", pedido_item_1.ItemPedidoService)
], pedidoItem.prototype, "itemPedidoService", void 0);
__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body({
        required: true
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], pedidoItem.prototype, "httpPost", null);
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], pedidoItem.prototype, "httpGetAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], pedidoItem.prototype, "httpGet", null);
pedidoItem = __decorate([
    routing_controllers_1.JsonController("/pedidoitem")
], pedidoItem);
exports.pedidoItem = pedidoItem;
