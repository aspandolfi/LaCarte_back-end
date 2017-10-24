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
const passport = require("passport");
const passportJWT = require("passport-jwt");
const user_1 = require("../entities/user");
const config_1 = require("../config");
const typedi_1 = require("typedi");
class Auth {
    constructor() {
        this.ExtractJwt = passportJWT.ExtractJwt;
        this.Strategy = passportJWT.Strategy;
        this.params = {
            secretOrKey: config_1.config.jwt.jwtSecret,
            jwtFromRequest: this.ExtractJwt.fromAuthHeader()
        };
        const strategy = new this.Strategy(this.params, (payload, done) => {
            let user;
            this.userService
                .readOne(payload.id)
                .then((res) => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                else {
                    return done(new Error("usuario nao encontrado"), null);
                }
            })
                .catch(error => done(new Error("usuario nao encontrado"), null));
        });
        passport.use(strategy);
    }
    static initialize() {
        return passport.initialize();
    }
    static authenticate() {
        return passport.authenticate("jwt", config_1.config.jwt.jwtSession);
    }
}
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", user_1.UserService)
], Auth.prototype, "userService", void 0);
exports.default = Auth;
