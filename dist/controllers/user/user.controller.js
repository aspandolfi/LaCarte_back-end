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
const user_1 = require("../../entities/user");
// import Auth from "../../config/passport";
let bcrypt = require("bcrypt");
let compression = require("compression");
const saltRounds = 0;
const myPlaintextPassword = "123"; //minha senha
const someOtherPlaintextPassword = '1234'; //senha a ser testada
// @UseBefore(() => Auth.authenticate())
let UserController = class UserController {
    httpPost(props) {
        let user = class_transformer_1.plainToClass(user_1.User, props);
        return this.userService.create(user);
    }
    httpGetAll() {
        return this.userService.readAll();
    }
    httpGet(id) {
        //testando criptografia na senha
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(myPlaintextPassword, salt);
        console.log(hash);
        console.log(bcrypt.compareSync(myPlaintextPassword, hash));
        console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash));
        return this.userService.readOne(id);
    }
    httpGetEmail(email) {
        return this.userService.readOneByEmail(email);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGetAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    routing_controllers_1.UseBefore(compression()),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGet", null);
__decorate([
    routing_controllers_1.Get("/email/:email"),
    __param(0, routing_controllers_1.Param("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "httpGetEmail", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/user")
], UserController);
exports.UserController = UserController;
