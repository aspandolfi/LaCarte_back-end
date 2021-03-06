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
const class_transformer_1 = require("class-transformer");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_1 = require("../../entities/user");
const auth_1 = require("../../config/auth");
let bcrypt = require("bcrypt");
let compression = require("compression");
const saltRounds = 0;
const myPlaintextPassword = "123"; //minha senha
const someOtherPlaintextPassword = '1234'; //senha a ser testada
let UserController = class UserController {
    httpPost(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = class_transformer_1.plainToClass(user_1.User, props);
            const result = yield this.userService.create(user);
            return class_transformer_1.classToPlain(result);
        });
    }
    httpGetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.readAll();
            return class_transformer_1.classToPlain(users);
        });
    }
    httpPut(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = class_transformer_1.plainToClass(user_1.User, props);
            const result = yield this.userService.update(user);
            return class_transformer_1.classToPlain(result);
        });
    }
    httpGet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.readOne(id);
        });
    }
    httpGetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.readOneByEmail(email);
        });
    }
    httpToken(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.doLogin(props);
        });
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", user_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body({
        required: true
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpPost", null);
__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseBefore(auth_1.Auth.Authorize()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGetAll", null);
__decorate([
    routing_controllers_1.Put(),
    routing_controllers_1.UseBefore(auth_1.Auth.Authorize()),
    __param(0, routing_controllers_1.Body({
        required: true
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpPut", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    routing_controllers_1.UseBefore(auth_1.Auth.Authorize()),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGet", null);
__decorate([
    routing_controllers_1.Get("/email/:email"),
    routing_controllers_1.UseBefore(auth_1.Auth.Authorize()),
    __param(0, routing_controllers_1.Param("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGetEmail", null);
__decorate([
    routing_controllers_1.Post("/token"),
    __param(0, routing_controllers_1.Body({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpToken", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/user")
], UserController);
exports.UserController = UserController;
